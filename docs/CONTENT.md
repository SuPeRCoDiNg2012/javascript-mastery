# Contenuti

## Dove vivono

```
src/content/
  authoring.ts        # helper tipizzati: lesson(), fill(), quiz(), explain()...
  index.ts            # registry: weeks, lessons, lookup, test settimanali
  week-01/index.ts    # una settimana per file
  ...
  week-12/index.ts
  content.test.ts     # contratto strutturale del corso
```

Un file settimana esporta `weekNN = makeWeek({ ... })`. Le lezioni si costruiscono con `lesson(weekId, number, input)`, gli esercizi con `fill` / `guided` / `solo` / `transfer`.

## Aggiungere una settimana

1. Crea `src/content/week-13/index.ts` copiando la struttura di una settimana esistente.
2. Esporta `week13 = makeWeek({ id: 'week-13', number: 13, ... })` con otto lezioni.
3. Importala in `src/content/index.ts` e aggiungila all'array `weeks`.
4. Se vuoi che compaia nella sidebar, il numero è già generato da `Array.from({ length: 12 })`: aggiorna quel valore o derivalo da `weeks.length`.
5. Esegui `npm test`: il test dei contenuti verifica struttura, id univoci, fasi e limiti.

> La UI non contiene testi del corso: se una lezione non appare, il problema è nel registry, non nei componenti.

## Modificare un esercizio

```ts
fill({
  id: 'w3l2e1',                 // stabile e univoco: è la chiave dei progressi
  title: '...',
  prompt: '...',
  starterCode: '...',
  check: { kind: 'output', lines: ['...'] },
  hints: ['indizio generale', 'indizio specifico'],
  solution: '...',
  explanation: '...',
  concepts: ['map'],
})
```

Regole:

- **Non cambiare `id`** di un esercizio già pubblicato: perderebbe i progressi. Se il contenuto cambia davvero, aggiungi un nuovo id.
- `check.kind: 'output'` confronta le righe stampate, normalizzando gli spazi finali. `unordered: true` ignora l'ordine.
- `check.kind: 'source'` verifica `mustInclude` / `mustExclude` sul codice: usalo per moduli o costrutti non eseguibili.
- `check.kind: 'manual'` è una checklist autovalutata.
- Gli esercizi DOM devono dichiarare `runtime: 'dom'` e usare solo la fixture documentata in `src/lib/dom-runner.ts`.
- Gli esercizi asincroni vanno avvolti in `(async () => { ... })();`, perché il runner usa `new Function` e non supporta il top-level await.

Gli indizi sono due: il primo è concettuale, il secondo è operativo. Il terzo livello ("Mostra soluzione") è automatico dopo cinque errori.

## Quiz e self-explanation

Ogni opzione di un quiz porta il proprio feedback:

```ts
quiz({
  id: 'w2l3q1',
  question: '...',
  options: [
    ['Risposta giusta', 'Perché è corretta.'],
    ['Distrattore', 'Perché è sbagliata.'],
  ],
  correct: 0,
  explanation: 'Sintesi finale.',
  concepts: ['return'],
})
```

Le spiegazioni attive usano parole chiave (stem lowercase, confronto senza accenti) e una soglia di caratteri: il feedback elenca i concetti menzionati e quelli che mancano, senza giudicare la sintassi.

## Contratto automatico

`src/content/content.test.ts` verifica:

- 12 settimane × 8 lezioni;
- id univoci per lezioni, esercizi e quiz;
- almeno 3 esercizi, 1 contrasto, 1 spiegazione e 2 quiz per lezione;
- feedback non vuoto su ogni opzione;
- massimo 3 concetti nuovi per lezione.

Se aggiungi una regola pedagogica, aggiungi anche il test che la protegge.

## Formato denso (lezioni lunghe)

La lezione `w1l1` è il riferimento del formato completo: 8 sezioni, 7 esempi eseguibili, 3 casi reali, 3 trace, 2 misconception, una tabella, 5 errori spiegati, un mini-progetto e la chiusura operativa.

Campi opzionali di `Lesson`:

```ts
sections?: LessonSection[];   // teoria, analogia, esempio, mondo reale, trace, cosa NON è, tip, tabella
errors?: LessonError[];       // codice sbagliato, messaggio, perché, fix, come riconoscerlo
project?: LessonProject;      // mini-progetto con passi e starter
consolidate?: string;         // "cosa fare adesso"
```

Tipi di sezione utili:

| `kind` | Uso |
| --- | --- |
| `theory` | Spiegazione breve, una idea per paragrafo |
| `analogy` | Analogia del mondo reale, con la differenza rispetto alla realtà |
| `example` | Esempio eseguibile (il renderer aggiunge “Esegui”) |
| `world` | Caso d'uso reale, riconoscibile dal callout |
| `trace` | “Cosa fa il computer, passo per passo” |
| `misconception` | “Cosa NON è”, con codice corretto |
| `table` | Classificazioni e confronti |
| `tip` | Consiglio pratico, una riga |

### Checklist di densità

`src/features/content/density.ts` misura automaticamente: sezioni ≥ 6, esempi ≥ 5, casi reali ≥ 3, trace ≥ 1, misconception ≥ 1, tabelle ≥ 1, errori ≥ 4, esercizi ≥ 4, quiz ≥ 2, spiegazioni ≥ 1, riepilogo ≥ 4 punti, parole ≥ 2000 (target editoriale 3000–5000).

```bash
npm run content:report
```

Il test asserisce i minimi su ogni lezione che dichiara `sections`. Le lezioni non ancora migrate restano nel formato compatto e vengono contate nel report: la migrazione è incrementale e non rompe i progressi, perché gli id non cambiano.

### Migrare una lezione

1. Crea `src/content/week-XX/rich-lYY.ts` che esporta `Pick<Lesson, 'sections' | 'errors' | 'project' | 'consolidate'>`.
2. Scrivi prima il trace del concetto, poi gli esempi, poi gli errori reali.
3. Aggiungi un caso reale per ogni concetto principale.
4. Unisci in `index.ts`: `{ ...lY, ...lYDense }`.
5. Esegui `npm run content:report`: se ci sono gap, la lezione non è pronta.

## Stile di scrittura

- Contenuti in **italiano**, codice e commenti nel codice in **inglese**.
- Frasi brevi, esempi concreti, nessun gergo non spiegato.
- Gli errori si presentano come informazioni, mai come colpe.
- Ogni lezione chiude con "cosa hai imparato" e "prossimo passo", non con un punto finale.

## Migrazioni di contenuto

La chiave dei progressi è `userId:weekId:lessonId:exerciseId`. Se rinomini una settimana o una lezione, i vecchi progressi restano nel database ma non vengono più letti. Per una migrazione:

1. aggiungi una funzione in `src/lib/db.ts` con una nuova `version()` di Dexie;
2. mappa le vecchie chiavi sulle nuove;
3. mantieni le righe completate (union), non sovrascriverle;
4. verifica con un test che i conteggi non calino.
