# JavaScript Mastery

Corso interattivo di JavaScript **da zero alla padronanza in 12 settimane**. Non un catalogo di video: 96 lezioni, oltre 300 esercizi eseguiti in sandbox, quiz con feedback per ogni risposta, spiegazioni attive, ripasso a intervalli e un progetto che cresce settimana dopo settimana.

Funziona **offline**, si installa come **PWA**, sincronizza i progressi tra dispositivi quando Supabase è configurato. Senza configurazione resta un'app locale completa: nessun account obbligatorio.

---

## Indice

- [Cosa c'è dentro](#cosa-cè-dentro)
- [Avvio rapido](#avvio-rapido)
- [Script](#script)
- [Stack](#stack)
- [Come è fatta](#come-è-fatta)
- [Pedagogia](#pedagogia)
- [Psicologia anti-abbandono](#psicologia-anti-abbandono)
- [Offline e sincronizzazione](#offline-e-sincronizzazione)
- [Contenuti](#contenuti)
- [Test](#test)
- [Deploy](#deploy)
- [Accessibilità e performance](#accessibilità-e-performance)
- [Limiti noti](#limiti-noti)
- [Documentazione tecnica](#documentazione-tecnica)

---

## Cosa c'è dentro

**Il corso**
- 12 settimane × 8 lezioni (45–60 minuti ciascuna), in italiano.
- 8 fasi pedagogiche per lezione: attivazione, spiegazione concreta, esempio lavorato, fading a 4 esercizi, contrasto sugli errori, self-explanation, quiz, chiusura metacognitiva.
- Un progetto conduttore, il **Quaderno delle spese**, che cresce dalla settimana 1 alla 11; nella 12 si costruisce una **Todo App** completa.
- Un blocco "Lato professionale" per settimana (DevTools, MDN, debug, performance) e un checkpoint di fine settimana.

**L'esperienza**
- Editor CodeMirror 6 con evidenziazione, auto-chiusura parentesi e tema che segue l'app.
- Esecuzione sicura del codice in **Web Worker** con timeout di 2 secondi e messaggio "Attenzione: possibile ciclo infinito". Mai `eval` nel main thread.
- Le lezioni su DOM ed eventi girano in un **iframe sandbox** con una fixture HTML, perché un worker non ha DOM.
- Indizi progressivi: 1° errore messaggio incoraggiante, 2° indizio generale, 3° indizio specifico, 5° pulsante "Mostra soluzione".
- Streak gentile con freeze e finestra di recupero di 24 ore, quest giornaliera, achievement calibrati, record personali, messaggio di bentornato senza colpe.
- Sync local-first: Dexie + coda offline + last-write-wins con unione delle cose completate. Supabase Realtime per la freschezza tra dispositivi.

**Design e contenuti**
- Interfaccia monocroma stile Obsidian: fondo bianco, inchiostro nero, bordi a filo. Il colore è riservato ai box di feedback (errori, avvisi, risposte corrette).
- Formato denso per le lezioni: la Settimana 1, Lezione 1 è il riferimento (11 sezioni, 8 esempi eseguibili, 3 casi reali, 5 errori spiegati, 2.878 parole). Le altre 95 lezioni sono nel formato compatto e vengono migrate incrementalmente; `npm run content:report` misura i gap.

## Avvio rapido

```bash
git clone <repo>
cd javascript-mastery
npm install
npm run dev
```

Apri http://localhost:5173. L'app parte in modalità ospite: nessuna variabile d'ambiente necessaria.

Per attivare account e sincronizzazione:

```bash
cp .env.example .env.local
# compila VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
```

Poi applica `supabase/schema.sql` nel SQL editor del progetto Supabase e abilita i provider di autenticazione che ti servono (email, magic link, Google).

> **Nota:** solo la chiave **anon/public** va nel client. Una `service_role` in un progetto Vite finisce nel bundle: non farlo mai.

## Script

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Dev server Vite con HMR |
| `npm run build` | Typecheck (`tsc -b`) + build di produzione in `dist/` |
| `npm run preview` | Serve la build locale |
| `npm run typecheck` | Solo TypeScript, strict |
| `npm run lint` | ESLint su `src` (zero warning ammessi) |
| `npm test` | Vitest (unit + integrità dei contenuti) |
| `npm run test:e2e` | Playwright, flusso principale desktop + mobile |
| `npm run format` | Prettier |

## Stack

Vite · React 18 · TypeScript strict · React Router v6 · Tailwind CSS · primitive UI in stile shadcn/ui (Radix) · Framer Motion · Zustand · TanStack Query · CodeMirror 6 · React Hook Form + Zod · Recharts · Sonner · date-fns · Dexie · vite-plugin-pwa · lucide-react · Supabase · Vitest + Testing Library · Playwright · ESLint + Prettier · Husky.

## Come è fatta

```
src/
  app/            # bootstrap, router, store Zustand, motore dei progressi, selettori
  components/
    ui/           # primitive (button, card, dialog, tabs, ...)
    layout/       # shell, sidebar 300px, bottom nav, header, indice lezione
    lesson/       # editor, output, esercizi, quiz, explain, contrasti, celebrazione
  content/        # 12 settimane + authoring helpers + registry
  features/
    gamification/ # streak, achievement, quest
    lesson/       # verifica esercizi
    progress/     # chiavi composite
    spaced-repetition/ # SM-2 vincolato alla scala 1/3/7/14/30/90
    sync/         # pull/push, merge, realtime, migrazione ospite
  lib/            # db Dexie, runner worker/DOM, coda offline, tema, i18n, utils
  pages/          # Home, Percorso, Settimana, Lezione, Checkpoint, Ripassi, Stats, ...
  test/           # setup Vitest
e2e/              # Playwright
supabase/         # schema SQL + RLS
docs/             # architettura, contenuti, deploy, sync
```

Dettagli in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Pedagogia

- **Fading**: ogni lezione ha quattro esercizi con supporto decrescente (completa → traccia → da zero → transfer).
- **Mastery gating**: la lezione successiva si apre solo quando esercizi, quiz e spiegazione sono completi. Le settimane si aprono di conseguenza.
- **Spaced repetition**: ogni concetto completato entra in un programma SM-2 con intervalli fissi 1, 3, 7, 14, 30, 90 giorni. I ripassi sono in `/review`.
- **Interleaving**: i ripassi mescolano concetti di settimane diverse invece di riproporre lo stesso capitolo.
- **Cognitive load**: massimo tre concetti nuovi per lezione, verificato da un test automatico sul contenuto.
- **Errori come indizi**: ogni verifica spiega *cosa* differisce e *perché*, mai solo "sbagliato".
- **Self-explanation**: feedback per parole chiave, non per sintassi; confronto con una spiegazione modello.

## Psicologia anti-abbandono

- Streak gentile: un giorno coperto ogni sette; se salti, hai 24 ore di recupero; il messaggio di ritorno non colpevolizza.
- Quest giornaliera deterministica, piccola e finibile.
- Achievement rari (12 in tutto il corso) e nessuna classifica.
- Record personali e traguardi visibili in `/stats`.
- Sessioni brevi: ogni lezione è divisa in blocchi, e "5 minuti di ripasso" è sempre a un click.
- Trasparenza sul tempo: timer di sessione e tempo per settimana nelle statistiche.
- Nessuna scadenza, nessuna notifica push invadente: i promemoria sono opt-in e locali.

## Offline e sincronizzazione

1. Ogni azione scrive prima su **IndexedDB** (Dexie): è immediata e sopravvive alla chiusura.
2. La stessa riga viene accodata in `queue` per Supabase.
3. Quando torni online la coda viene svuotata in background.
4. Conflitti: last-write-wins per timestamp, con unione di esercizi completati e achievement (non si perdono mai).
5. Realtime su Supabase: ogni cambiamento remoto avvia un pull idempotente.
6. La posizione nell'ultima lezione e il rapporto di scroll vengono salvati, così "Riprendi dove avevi lasciato" funziona anche su un altro dispositivo.
7. Export/import JSON in Impostazioni per spostare i progressi senza account.

Dettagli e modello dati in [`docs/SYNC.md`](docs/SYNC.md).

## Contenuti

Tutto il corso è dato tipizzato in `src/content/week-XX/index.ts`, costruito con gli helper di `src/content/authoring.ts`. Nessun contenuto è scritto dentro i componenti.

Per aggiungere o modificare una lezione: [`docs/CONTENT.md`](docs/CONTENT.md).

## Test

```bash
npm test          # 21 test: SM-2, streak, verifica esercizi, integrità e densità dei contenuti
npm run test:e2e  # Playwright: onboarding → lezione → esercizio → quiz → reload
```

I test dei contenuti controllano struttura (12×8), unicità degli id, presenza delle otto fasi, feedback su ogni opzione dei quiz e limite di tre concetti per lezione. Un test dedicato misura la densità delle lezioni migrate: sezioni, esempi, casi reali, trace, errori e parole minime.

## Deploy

Frontend su Vercel, database e auth su Supabase. Istruzioni passo-passo, variabili, RLS e checklist in [`docs/DEPLOY.md`](docs/DEPLOY.md).

```bash
npm i -g vercel
vercel --prod
```

`vercel.json` include il rewrite SPA, cache immutabile per gli asset e header di sicurezza.

## Accessibilità e performance

- Contrasto WCAG AA, focus visibili, skip link, `aria-label` sulle azioni icona, `aria-live` su output e feedback.
- `prefers-reduced-motion` rispettato: le animazioni diventano istantanee e la celebrazione perde i coriandoli.
- Layout mobile-first testato a 360px, senza scroll orizzontale.
- Code splitting per route, chunk separati per editor e grafici, precache PWA dell'intero corso.

## Limiti noti

- **Deploy e account reali non sono inclusi**: senza credenziali Supabase/Vercel il repository è completo e verificato in locale, ma nessuna istanza pubblica è stata creata. La modalità ospite è pienamente funzionante.
- Il login Google richiede la configurazione del provider su Supabase e degli URL di redirect.
- I promemoria sono un'opzione salvata ma non inviano notifiche push: scelta deliberata per non essere invadenti.
- Le lezioni su DOM usano una fixture HTML fissa: alcuni esercizi liberi richiederebbero un documento personalizzato.
- **Migrazione dei contenuti in corso**: 1 lezione su 96 è nel formato denso completo; le altre 95 sono nel formato compatto e vanno riscritte secondo lo standard in [`docs/CONTENT.md`](docs/CONTENT.md).
- **Bundle iniziale ~338 kB gzip** (entry 271 + React 67): i contenuti delle 12 settimane sono nel chunk iniziale. La separazione è il prossimo intervento di performance.
- Lighthouse e i budget di bundle vanno misurati su un deploy reale; la configurazione è pronta ma la misura non è inclusa qui.

## Documentazione tecnica

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — flusso dati, scelte, sandbox, gating.
- [`docs/CONTENT.md`](docs/CONTENT.md) — come aggiungere una settimana, modificare un esercizio, validare i contenuti.
- [`docs/SYNC.md`](docs/SYNC.md) — schema, coda, merge, migrazione, realtime.
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — Supabase, Vercel, PWA, verifica.
- [`docs/GITHUB.md`](docs/GITHUB.md) — creare il repository, primo push, SSH e token.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — setup, stile, commit, pull request.
- [`CHANGELOG.md`](CHANGELOG.md) — storia delle versioni.
