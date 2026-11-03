# Sincronizzazione

## Modello

- **Fonte di verità operativa**: IndexedDB (Dexie), sempre aggiornata per prima.
- **Fonte di verità condivisa**: Postgres su Supabase, raggiunta tramite coda.
- **Conflitti**: last-write-wins per `updated_at`, con due eccezioni conservative:
  - un esercizio `completed` non torna mai `in_progress`;
  - un achievement guadagnato non viene rimosso.

## Tabelle locali (Dexie)

`progress`, `quizResults`, `explainResults`, `streaks`, `spaced`, `achievements`, `sessions`, `activity`, `notes`, `settings`, `queue`, `meta`.

Le chiavi sono composite e includono `userId`, così lo stesso dispositivo può ospitare ospite e account senza mescolare i dati:

```
progress:      `${userId}:${weekId}:${lessonId}:${exerciseId ?? 'lesson'}`
quizResults:   `${userId}:${quizId}`
explainResults:`${userId}:${explainId}`
spaced:        `${userId}:${conceptId}`
sessions:      `${userId}:${lessonId}`
settings:      `${userId}:settings`
```

## Coda

`enqueue(operation)` aggiunge una riga a `queue` con `userId`, `createdAt`, `retries`, `lastError`.

`flushQueue(userId)`:

- non fa nulla se Supabase non è configurato, se è offline o se un flush è già in corso;
- invia in ordine di creazione con `upsert`;
- in caso di errore incrementa `retries` e si ferma sugli errori di autenticazione (ritentare senza sessione è inutile);
- elimina la riga solo dopo un invio riuscito.

Il flush parte al boot, al ritorno online, ogni 30 secondi e dopo il login. `pruneQueue()` elimina le operazioni corrotte dopo otto tentativi.

## Pull e merge

`pullRemote(userId)` legge tutte le tabelle dell'utente e le unisce in Dexie:

| Tabella | Regola |
| --- | --- |
| `user_progress` | LWW, ma `completed` vince sempre |
| `user_quiz_results` | LWW, ma `is_correct` vince |
| `user_explain_results` | LWW, ma `completed` vince |
| `user_spaced_repetition` | LWW |
| `user_streaks` | LWW sul record |
| `user_achievements` | union |
| `user_activity` | LWW |
| `user_sessions` | LWW (include posizione e scroll) |
| `user_notes` | LWW |
| `user_settings` | LWW |

Il pull è idempotente: può essere eseguito a ogni evento realtime senza effetti collaterali.

## Realtime

`subscribeToRemote(userId)` apre un canale Supabase e ascolta `postgres_changes` filtrato per `user_id` sulle tabelle di progresso. Ogni evento avvia un `pullRemote`, non applica patch parziali: meno casi limite, stesso risultato percepito.

Realtime è un suggerimento di freschezza, non la verità: se il canale cade, il prossimo pull o il prossimo flush riallineano tutto.

## Migrazione ospite → account

Al primo login:

1. `migrateGuestData('guest', userId)` rinumera le chiavi e imposta `userId`;
2. le righe vengono accodate come operazioni dell'account;
3. `syncNow()` svuota la coda e fa un pull;
4. il merge union impedisce che i progressi locali sovrascrivano quelli remoti più completi.

La migrazione è intenzionalmente semplice e conservativa: nessuna cancellazione dei dati ospite finché il login non è confermato.

## Export/import

`exportProgress(userId)` produce un JSON con `format: "javascript-mastery/export"`, versione, progressi, quiz, spiegazioni, streak, SM-2, achievement, sessioni, attività, note e impostazioni.

`importProgress(userId, raw)` valida il formato, rimappa le chiavi sull'utente corrente e unisce: i completamenti non vengono mai retrocessi. È il modo per spostare i progressi senza account (accettazione esplicita del corso).

## Schema SQL

`supabase/schema.sql` contiene:

- tabelle con chiavi primarie coerenti con le chiavi locali;
- indici per `user_id`, `updated_at` e `next_review_at`;
- RLS su tutte le tabelle con policy `select/insert/update/delete` basate su `auth.uid() = user_id`;
- trigger `handle_new_user` che crea profilo, impostazioni, streak e stats;
- `refresh_user_stats` per i totali;
- pubblicazione realtime delle tabelle osservate.

## Verifica manuale

1. Apri due finestre, una in incognito.
2. Accedi con lo stesso account in entrambe.
3. Completa un esercizio nella prima: la seconda deve aggiornarsi entro pochi secondi.
4. Metti offline la prima, completa un altro esercizio: lo stato resta locale e la sidebar mostra "Offline · progressi salvati in locale".
5. Torna online: la coda si svuota e la seconda finestra riceve l'aggiornamento.
6. Esporta da una, importa nell'altra: i conteggi non devono diminuire.
