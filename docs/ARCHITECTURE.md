# Architettura

## Principi

1. **La pedagogia decide l'architettura**, non il contrario. Ogni schermata esiste per far praticare, non per mostrare.
2. **Local-first**: la verità operativa è IndexedDB. La rete è un miglioramento, mai un prerequisito.
3. **Contenuto come dato**: lezioni, esercizi e quiz sono oggetti tipizzati, non JSX. Questo li rende testabili, riusabili dal motore di ripasso e modificabili senza toccare i componenti.
4. **Una sola direzione dei dati**: azione → nuovo stato → render → persistenza. Nessun componente legge la verità dal DOM.

## Flusso di un'esercizio

```
Utente scrive codice
  └─ ExerciseCard (components/lesson)
       ├─ runJavaScript()  → Web Worker, 2s di timeout
       │    oppure runDomJavaScript() → iframe sandbox, fixture HTML
       ├─ evaluateExercise() (features/lesson/check)
       │    ├─ output: confronto righe normalizzate
       │    ├─ source: presenza/assenza di costrutti
       │    └─ manual: checklist
       └─ recordExerciseAttempt() (app/progress)
            ├─ Dexie: progress row (attempts, status, completedAt)
            ├─ enqueue(): upsert remoto
            ├─ touchStreak() se è il primo successo
            ├─ bumpActivity() (esercizi/minuti del giorno)
            ├─ recordConceptReview() (SM-2 sui concetti)
            ├─ refreshLessonCompletion() (mastery gating)
            └─ evaluateAchievements()
```

Il componente non aspetta la rete: `recordExerciseAttempt` scrive in locale e accoda. La UI si aggiorna perché `useLiveQuery` osserva Dexie.

## Moduli

### `src/app`

| File | Responsabilità |
| --- | --- |
| `store.ts` | Identità locale (`guest` o `user.id`), impostazioni, stato online, coda. |
| `progress.ts` | Motore: tentativi, quiz, spiegazioni, streak, attività, SM-2, achievement, sessioni, note. |
| `selectors.ts` | Read model derivati: progresso lezione/settimana, gating, resume, statistiche. |
| `settings.ts` | Persistenza impostazioni, export/import JSON. |
| `useBootstrap.ts` | Identità → impostazioni → tema → connettività → sync. |
| `router.tsx` | Code splitting per route e gate di onboarding. |

### `src/lib`

- `db.ts` — schema Dexie versionato, `clearLocalData`.
- `code-worker.ts` / `code-runner.ts` — sandbox worker, cattura console, await delle promise, timeout 2s e terminate.
- `dom-runner.ts` — iframe `sandbox="allow-scripts"` con fixture e bootstrap che intercetta `console`.
- `offline-queue.ts` — mapping riga locale → tabella remota, flush idempotente, stop su errori di auth.
- `supabase.ts` — client creato **solo** se le due variabili pubbliche esistono.
- `theme.ts` / `i18n.ts` — tema e stringhe UI.

### Sandbox: perché due runner

Un Web Worker non ha `document`, quindi le settimane 5–6 (DOM ed eventi) girano in un iframe senza `allow-same-origin`. Il codice utente riceve una fixture stabile (`#app`, `#lista`, `#messaggio`, `#btn`, `#input`, `#form`, `#nome`, `#invia`) e comunica i log via `postMessage`.

Entrambi i runner:

- non usano mai `eval` nel main thread;
- terminano l'esecuzione dopo 2 secondi;
- partono da un ambiente pulito a ogni run;
- restituiscono `{ logs, error, timedOut, message, durationMs }`.

Il worker fa `await` del valore restituito e concede 60 ms ai microtask/timer: senza questo, gli esercizi su promise delle settimane 9–10 non stamperebbero nulla.

## Gating

`isLessonUnlocked` confronta la lezione con quella precedente nell'elenco globale. La prima lezione è sempre aperta. Una settimana si apre di conseguenza quando la sua prima lezione è sbloccata.

Una lezione è **completa** quando:

- tutti gli esercizi hanno una riga `completed`;
- tutti i quiz hanno una risposta corretta;
- tutte le spiegazioni sono `completed`.

Solo allora viene scritta la riga `exercise_id = null`, che è ciò che sblocca la lezione successiva.

Il checkpoint settimanale richiede tutte e otto le lezioni e passa con ≥ 80% di risposte corrette.

## Stato e ri-render

- **Zustand** per lo stato applicativo globale (identità, impostazioni, online).
- **Dexie + useLiveQuery** per tutto ciò che è progresso: nessun duplicato in memoria, nessun refresh manuale.
- **TanStack Query** è configurato come livello di cache per eventuali fetch remoti e per il futuro; il corso non fa fetch di contenuti, perché sono bundlati (requisito offline).
- **React Hook Form + Zod** sono disponibili per form complessi; i form del corso sono semplici e usano stato controllato, con validazione pura in `features/lesson`.

## Scelte deliberate

- **Nessun video, nessun contenuto passivo.**
- **Nessuna classifica**, nessun confronto sociale, nessun punto ossessivo.
- **Nessuna scadenza**: il gating è di padronanza, non di tempo.
- **Nessun dato sensibile nel browser**: niente token in localStorage; la sessione è gestita da Supabase.
- **Un solo accento visivo** (indigo) e una palette neutra; il design non compete con il codice.

## Estensioni previste

- Seconda lingua: aggiungere `resources` in `lib/i18n.ts` e una cartella `content/<lang>/`.
- Nuovi tipi di esercizio: estendere `ExerciseCheck` e `evaluateExercise`, poi il renderer.
- Analytics privacy-first: evento `lesson_completed` e `exercise_attempt` verso Plausible/Umami, senza identificatori personali.
- Error tracking: `ErrorBoundary` è già il punto in cui collegare Sentry.
