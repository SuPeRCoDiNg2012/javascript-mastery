# Contribuire

Grazie per l'interesse. Questo progetto è un corso di JavaScript: la priorità non è aggiungere funzioni, è **non rompere la chiarezza per chi impara**.

## Setup

```bash
npm install
npm run dev
```

Node 20 o superiore. Il progetto usa npm e il lockfile va mantenuto.

## Prima di aprire una pull request

Esegui tutti i controlli:

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

Se tocchi i contenuti, aggiungi anche:

```bash
npm run content:report
```

Una pull request che fallisce uno di questi comandi non è pronta.

## Stile del codice

- TypeScript **strict**, nessun `any` esplicito.
- Componenti in PascalCase, hook con prefisso `use`.
- Import con alias `@/`.
- Testi dell'interfaccia in **italiano**, identificatori e commenti nel codice in **inglese**.
- Nessuna dipendenza nuova senza una ragione concreta e senza aggiornare il README.

## Stile dei contenuti

- Una lezione non è un riassunto: ogni concetto va spiegato, esemplificato, esercitato.
- Frasi corte, voce attiva, seconda persona. Niente “ovviamente”, “semplicemente”, “basta solo”.
- Ogni errore spiegato contiene: codice sbagliato, messaggio reale, perché, correzione, come riconoscerlo.
- Gli errori non si giudicano: si spiegano.
- Non cambiare gli `id` di lezioni, esercizi e quiz già pubblicati: sono le chiavi dei progressi degli utenti.
- Il formato denso è descritto in [`docs/CONTENT.md`](docs/CONTENT.md); `src/content/week-01/rich-l1.ts` è il riferimento.

## Commit

Messaggi in italiano, forma consigliata:

```
feat: aggiunge la lezione sugli oggetti
fix: corregge il gating della settimana 4
docs: aggiorna la guida al deploy
content: riscrive la lezione 2 nel formato denso
test: copre il recupero della streak
```

Un commit, una ragione. Niente commit con “varie” o “fix”.

## Pull request

Descrivi:

1. **Cosa** cambia.
2. **Perché** serve a chi studia.
3. **Come** l'hai verificato (comandi eseguiti).
4. Eventuali **limiti** noti.

Se la modifica è visiva, allega uno screenshot della pagina interessata, in tema chiaro e scuro.

## Segnalazioni

Per un bug, indica:

- browser e versione;
- pagina o lezione;
- cosa hai fatto, cosa ti aspettavi, cosa è successo;
- messaggio d'errore completo, se presente.

Per un problema di contenuto, indica la lezione e la frase esatta. Le correzioni di contenuto sono benvenute quanto quelle di codice.
