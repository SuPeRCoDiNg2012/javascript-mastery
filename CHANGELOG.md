# Changelog

Tutte le modifiche rilevanti del progetto. Formato ispirato a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/), versioni secondo [Semantic Versioning](https://semver.org/lang/it/).

## [1.0.0] — 2026-11-03

Prima versione completa del corso.

### Aggiunto

- **Corso**: 12 settimane × 8 lezioni (96 lezioni) in italiano, dal primo `console.log` alla Todo App finale, con il progetto conduttore “Quaderno delle spese”.
- **Pedagogia**: otto fasi per lezione, fading a quattro esercizi, mastery gating, self-explanation con parole chiave, quiz con feedback per ogni opzione, checkpoint settimanali.
- **Ripasso**: SM-2 vincolato alla scala 1/3/7/14/30/90 giorni, con pagina Ripassi e concetti in scadenza.
- **Gamification gentile**: streak con freeze settimanale e recupero di 24 ore, quest giornaliera, 12 achievement, record personali, messaggio di bentornato.
- **Esecuzione sicura**: Web Worker con timeout di 2 secondi, iframe sandbox per le lezioni DOM, nessun `eval` nel main thread.
- **Local-first**: Dexie, coda offline, last-write-wins con unione dei completamenti, export/import JSON.
- **Sincronizzazione**: schema Supabase con RLS, realtime, migrazione ospite → account.
- **PWA**: manifest, service worker, precache dell'intero corso, installabile su desktop e mobile.
- **UI**: design monocromo stile Obsidian, fondo bianco, inchiostro nero, colore riservato ai box di feedback; tema scuro opzionale.
- **Formato denso**: nuova struttura `sections` / `errors` / `project` / `consolidate`, renderer dedicato, scala degli errori a sei livelli. La lezione 1 della Settimana 1 è il riferimento completo.

### Verificato

- `npm run typecheck`, `npm test` (21 test), `npm run lint`, `npm run build`.
- Flusso in browser: onboarding, lezione, editor CodeMirror, esecuzione in sandbox, progresso persistente dopo il reload.

### Limiti noti

- 95 lezioni su 96 sono ancora nel formato compatto e vanno migrate allo standard denso.
- Sincronizzazione Supabase non verificata contro un progetto reale: mancano le credenziali.
- Test end-to-end Playwright presenti ma non eseguiti in questo ambiente.
- Bundle iniziale ~338 kB gzip: i contenuti delle 12 settimane sono nel chunk iniziale.
