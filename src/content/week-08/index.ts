import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-08';

const l1 = lesson(W, 1, {
  id: 'w8l1',
  title: 'Map e Set',
  subtitle: 'Collezioni con chiavi vere e valori unici',
  minutes: 50,
  objectives: [
    'Usare Map per chiavi non stringa',
    'Usare Set per eliminare duplicati',
    'Scegliere tra oggetto e Map',
  ],
  concepts: ['Map', 'Set', 'collezioni'],
  activate: [
    'Con un oggetto, la chiave 1 e la chiave "1" sono la stessa cosa. Ti serve distinguerle?',
    'Map conserva il tipo delle chiavi; Set conserva valori unici in ordine di inserimento.',
  ],
  analogy:
    'Map è un archivio con etichette di qualsiasi materiale: numeri, oggetti, stringhe. Set è una lista d’ingresso: se il nome è già dentro, non lo aggiunge. Entrambi ricordano l’ordine di inserimento.',
  example: {
    code: `const conteggi = new Map();
conteggi.set('cibo', 2);
conteggi.set('casa', 1);
conteggi.set('cibo', 3);

console.log(conteggi.get('cibo'));
console.log(conteggi.size);
console.log(conteggi.has('casa'));

const categorie = new Set(['cibo', 'casa', 'cibo']);
console.log(categorie.size);
console.log([...categorie]);`,
    output: `3
2
true
2
['cibo', 'casa']`,
  },
  formal:
    'Map ha set/get/has/delete/clear e size, itera con for...of su [chiave, valore] e mantiene l’ordine. Accetta qualsiasi valore come chiave, oggetti compresi, e distingue 1 da "1". Set ha add/has/delete/clear e size; add di un duplicato non ha effetto. Per convertire: [...set], [...map], Array.from. JSON non serializza Map e Set: vanno convertiti in array o oggetti prima.',
  worked: {
    code: `const movimenti = [
  { categoria: 'cibo', importo: 12 },
  { categoria: 'casa', importo: 40 },
  { categoria: 'cibo', importo: 8 },
];

const totali = new Map();
movimenti.forEach((m) => {
  totali.set(m.categoria, (totali.get(m.categoria) ?? 0) + m.importo);
});

console.log(totali.get('cibo'));

for (const [categoria, totale] of totali) {
  console.log(categoria + ': ' + totale);
}

const uniche = new Set(movimenti.map((m) => m.categoria));
console.log(uniche.size);`,
    output: `20
cibo: 20
casa: 40
2`,
    steps: [
      ['new Map()', 'Una mappa vuota: chiavi e valori.'],
      ['totali.get(...) ?? 0', 'Se la chiave non esiste, get restituisce undefined: il default evita NaN.'],
      ['totali.set(categoria, ...)', 'Sovrascrive se la chiave esiste già.'],
      ['for (const [categoria, totale] of totali)', 'Destructuring direttamente sulle coppie.'],
      ['new Set(...)', 'Le categorie distinte: il duplicato viene ignorato.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l1e1',
      title: 'Set e get',
      prompt: 'Imposta `punti` a 10 nella Map e stampa il valore.',
      starterCode: `const mappa = new Map();

mappa.('punti', 10);
console.log(mappa.get('punti'));`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['Il metodo per inserire è set.', 'mappa.set(\'punti\', 10)'],
      solution: `const mappa = new Map();

mappa.set('punti', 10);
console.log(mappa.get('punti'));`,
      explanation: 'set inserisce o aggiorna; get legge.',
      concepts: ['Map'],
    }),
    guided({
      id: 'w8l1e2',
      title: 'Deduplica',
      prompt: 'Elimina i duplicati da `[\'a\', \'b\', \'a\']` con Set e stampa `a,b`.',
      starterCode: `const valori = ['a', 'b', 'a'];

const unici = [...new ()];
unici.add('a');
// oppure: const unici = [...new Set(valori)];

console.log(unici.join(','));`,
      check: { kind: 'output', lines: ['a,b'] },
      hints: ['Set accetta un iterabile nel costruttore.', 'new Set(valori)'],
      solution: `const valori = ['a', 'b', 'a'];

const unici = [...new Set(valori)];

console.log(unici.join(','));`,
      explanation: 'Set elimina i duplicati e lo spread lo riporta ad array.',
      concepts: ['Set'],
    }),
    solo({
      id: 'w8l1e3',
      title: 'Conteggio con Map',
      prompt:
        'Conta le occorrenze di `[\'cibo\', \'casa\', \'cibo\']` con una Map e stampa `2` per cibo.',
      starterCode: `const categorie = ['cibo', 'casa', 'cibo'];
const conteggi = new Map();

// conta`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Per ogni categoria: conteggi.set(c, (conteggi.get(c) ?? 0) + 1).', 'Infine get(\'cibo\').'],
      solution: `const categorie = ['cibo', 'casa', 'cibo'];
const conteggi = new Map();

categorie.forEach((c) => {
  conteggi.set(c, (conteggi.get(c) ?? 0) + 1);
});

console.log(conteggi.get('cibo'));`,
      explanation: 'Con Map il conteggio è esplicito e non richiede conversioni di chiave.',
      concepts: ['Map'],
    }),
    transfer({
      id: 'w8l1e4',
      title: 'Chiavi di tipo diverso',
      prompt:
        'Nella stessa Map salva `1` con valore `numero` e `\'1\'` con valore `stringa`. Stampa le due dimensioni (`2`) e il valore della chiave numerica.',
      starterCode: `const m = new Map();
// set con 1 e '1'
console.log(m.size);
console.log();`,
      objective: 'Capire il vantaggio delle chiavi tipizzate rispetto agli oggetti.',
      check: { kind: 'output', lines: ['2', 'numero'] },
      hints: ['m.set(1, \'numero\') e m.set(\'1\', \'stringa\').', 'console.log(m.get(1))'],
      solution: `const m = new Map();
m.set(1, 'numero');
m.set('1', 'stringa');

console.log(m.size);
console.log(m.get(1));`,
      explanation: 'Un oggetto avrebbe convertito la chiave in stringa, perdendo la distinzione.',
      concepts: ['Map'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Chiavi di oggetto convertite',
      code: `const o = {};
o[1] = 'numero';
o['1'] = 'stringa';
console.log(Object.keys(o).length);`,
      error: `1`,
      why: 'Le chiavi di un oggetto sono sempre stringhe: 1 e "1" collidono.',
      fix: `const m = new Map();
m.set(1, 'numero');
m.set('1', 'stringa');`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l1x1',
      prompt: 'Spiega quando useresti una Map invece di un oggetto.',
      keywords: ['map', 'chiav', 'oggetto', 'tipo', 'ordine', 'size'],
      model:
        'Uso una Map quando le chiavi non sono stringhe, per esempio numeri o oggetti, o quando devo aggiungere e rimuovere chiavi di frequente. Map conserva il tipo delle chiavi, mantiene l’ordine di inserimento e ha size. L’oggetto resta comodo per strutture fisse e per la serializzazione JSON.',
      concepts: ['Map'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l1q1',
      question: 'Cosa restituisce `map.get` per una chiave assente?',
      options: [
        ['null', 'get restituisce undefined.'],
        ['undefined', 'Esatto.'],
        ['Un errore', 'Nessun errore.'],
      ],
      correct: 1,
      explanation: 'Per questo si usa ?? con un default.',
      concepts: ['Map'],
    }),
    quiz({
      id: 'w8l1q2',
      question: 'Cosa fa `set.add` con un valore già presente?',
      options: [
        ['Non cambia nulla', 'Esatto.'],
        ['Genera un errore', 'No: Set ignora silenziosamente il duplicato.'],
        ['Duplica il valore', 'Set non ammette duplicati.'],
      ],
      correct: 0,
      explanation: 'Set mantiene valori unici.',
      concepts: ['Set'],
    }),
    quiz({
      id: 'w8l1q3',
      question: 'Map e Set si serializzano direttamente con JSON.stringify?',
      options: [
        ['Sì', 'Diventano {} o simili.'],
        ['No, vanno convertiti in array o oggetti', 'Esatto.'],
        ['Solo Set', 'Nessuno dei due.'],
      ],
      correct: 1,
      explanation: 'JSON non conosce Map e Set.',
      concepts: ['collezioni'],
    }),
  ],
  recap: {
    points: [
      'Map: chiavi di qualsiasi tipo e size.',
      'Set: valori unici, ordine di inserimento.',
      'Conversione con spread o Array.from.',
      'JSON non serializza Map e Set.',
    ],
    learned: 'Sai scegliere la collezione adatta al problema.',
    next: 'Iteratori e generatori: produrre valori su richiesta.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w8l2',
  title: 'Iteratori e generatori',
  subtitle: 'Sequenze pigre con function*',
  minutes: 55,
  objectives: [
    'Riconoscere il protocollo iteratore',
    'Scrivere un generatore con yield',
    'Consumare un generatore con for...of',
  ],
  concepts: ['iteratore', 'generatore', 'yield'],
  activate: [
    'Se una sequenza è infinita, come fai a leggerne solo i primi tre elementi?',
    'Con un generatore: produce un valore alla volta, solo quando lo chiedi.',
  ],
  analogy:
    'Un generatore è una macchina distributrice: premi e ottieni un prodotto, senza che la macchina produca tutto in anticipo. yield è il momento in cui consegna e si mette in pausa.',
  example: {
    code: `function* numeri() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numeri();
console.log(gen.next());
console.log(gen.next().value);
console.log([...numeri()]);`,
    output: `{ value: 1, done: false }
2
[1, 2, 3]`,
  },
  formal:
    'Un iteratore ha next() che restituisce { value, done }. Un generatore (function*) implementa automaticamente il protocollo e sospende l’esecuzione a ogni yield. for...of consuma un iterabile fino a done. Il valore passato a next(valore) diventa il risultato dello yield corrente. I generatori sono utili per sequenze potenzialmente infinite, paginazione e lazy evaluation.',
  worked: {
    code: `function* contatore(limite) {
  let n = 1;
  while (n <= limite) {
    yield n;
    n += 1;
  }
}

for (const n of contatore(3)) {
  console.log(n);
}

const infinito = contatore(Infinity);
console.log(infinito.next().value);
console.log(infinito.next().value);

function* coppie() {
  yield ['a', 1];
  yield ['b', 2];
}

for (const [lettera, numero] of coppie()) {
  console.log(lettera + numero);
}`,
    output: `1
2
3
1
2
a1
b2`,
    steps: [
      ['function* contatore(limite)', 'L’asterisco dichiara un generatore.'],
      ['yield n;', 'Consegna il valore e mette in pausa, conservando lo stato locale.'],
      ['for (const n of contatore(3))', 'for...of chiama next() finché done è false.'],
      ['contatore(Infinity)', 'La sequenza è potenzialmente infinita: leggiamo solo ciò che serve.'],
      ['for (const [lettera, numero] of coppie())', 'Le coppie si destrutturano come qualsiasi iterabile.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l2e1',
      title: 'Primo yield',
      prompt: 'Completa il generatore e stampa `1`.',
      starterCode: `function* uno() {
  1;
}

console.log(uno().next().value);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['Bisogna sospendere con yield.', 'yield 1;'],
      solution: `function* uno() {
  yield 1;
}

console.log(uno().next().value);`,
      explanation: 'yield produce il valore e sospende il generatore.',
      concepts: ['generatore'],
    }),
    guided({
      id: 'w8l2e2',
      title: 'Generatore con limite',
      prompt: 'Scrivi `function* finoA(n)` che produca 1..n. Con 3 stampa `1 2 3`.',
      starterCode: `function* finoA(n) {
  // ciclo + yield
}

console.log([...finoA(3)].join(' '));`,
      check: { kind: 'output', lines: ['1 2 3'] },
      hints: ['For da 1 a n dentro il generatore.', 'yield i a ogni giro.'],
      solution: `function* finoA(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

console.log([...finoA(3)].join(' '));`,
      explanation: 'Lo spread consuma il generatore fino alla fine.',
      concepts: ['generatore'],
    }),
    solo({
      id: 'w8l2e3',
      title: 'Infinito ma pigro',
      prompt:
        'Crea un generatore infinito di numeri naturali e leggi i primi tre con next(). Stampa `0`, `1`, `2` su righe separate.',
      starterCode: `function* naturali() {
  let n = 0;
  while (true) {
    yield n;
    n += 1;
  }
}

// tre next`,
      check: { kind: 'output', lines: ['0', '1', '2'] },
      hints: ['const g = naturali();', 'console.log(g.next().value) tre volte.'],
      solution: `function* naturali() {
  let n = 0;
  while (true) {
    yield n;
    n += 1;
  }
}

const g = naturali();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);`,
      explanation: 'Il generatore non calcola l’infinito: produce solo i valori richiesti.',
      concepts: ['iteratore'],
    }),
    transfer({
      id: 'w8l2e4',
      title: 'Paginazione',
      prompt:
        'Scrivi `function* pagine(elementi, dimensione)` che produce array di al massimo `dimensione` elementi. Con `[1,2,3,4,5]` e 2, stampa `2` (numero di pagine piene) e `1` (ultima).',
      starterCode: `function* pagine(elementi, dimensione) {
  // usa slice
}

const p = [...pagine([1, 2, 3, 4, 5], 2)];
console.log(p.length);
console.log(p[2].length);`,
      objective: 'Applicare i generatori a un caso reale: suddividere dati in blocchi.',
      check: { kind: 'output', lines: ['3', '1'] },
      hints: ['For da 0 a elementi.length con passo dimensione.', 'yield elementi.slice(i, i + dimensione).'],
      solution: `function* pagine(elementi, dimensione) {
  for (let i = 0; i < elementi.length; i += dimensione) {
    yield elementi.slice(i, i + dimensione);
  }
}

const p = [...pagine([1, 2, 3, 4, 5], 2)];
console.log(p.length);
console.log(p[2].length);`,
      explanation: 'La paginazione pigra è più efficiente quando l’utente carica una pagina alla volta.',
      concepts: ['generatore'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Funzione normale al posto del generatore',
      code: `function numeri() {
  yield 1;
}
console.log(numeri());`,
      error: `SyntaxError: Unexpected number`,
      why: 'yield è valido solo dentro una funzione generatore: manca l’asterisco.',
      fix: `function* numeri() {
  yield 1;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l2x1',
      prompt: 'Spiega come funziona un generatore e in cosa differisce da una funzione che restituisce un array.',
      keywords: ['generator', 'yield', 'pausa', 'pigr', 'next', 'array'],
      model:
        'Una funzione normale calcola e restituisce tutto subito. Un generatore si sospende a ogni yield e riprende quando chiami next, conservando lo stato locale: i valori vengono prodotti uno alla volta, solo su richiesta. Questo permette sequenze infinite o costose senza calcolare tutto in anticipo.',
      concepts: ['generatore'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l2q1',
      question: 'Cosa restituisce next() di un iteratore?',
      options: [
        ['Il valore puro', 'Restituisce un oggetto.'],
        ['Un oggetto { value, done }', 'Esatto.'],
        ['Una Promise', 'Non necessariamente.'],
      ],
      correct: 1,
      explanation: 'Il protocollo prevede value e done.',
      concepts: ['iteratore'],
    }),
    quiz({
      id: 'w8l2q2',
      question: 'Cosa fa yield?',
      options: [
        ['Restituisce un valore e termina il generatore', 'Sospende, non termina.'],
        ['Produce un valore e sospende', 'Esatto.'],
        ['Crea un array', 'Non crea array.'],
      ],
      correct: 1,
      explanation: 'La funzione riprende dal punto di sospensione.',
      concepts: ['yield'],
    }),
    quiz({
      id: 'w8l2q3',
      question: 'Un generatore infinito è utilizzabile?',
      options: [
        ['No, va in crash', 'È utilizzabile proprio perché è pigro.'],
        ['Sì, se leggi un numero finito di valori', 'Esatto.'],
        ['Solo con for...of', 'Anche con next().'],
      ],
      correct: 1,
      explanation: 'La pigrizia permette di consumare solo ciò che serve.',
      concepts: ['generatore'],
    }),
  ],
  recap: {
    points: [
      'Iteratore: next() → { value, done }.',
      'function* e yield sospendono e riprendono.',
      'for...of consuma fino a done.',
      'Generatori per sequenze infinite e paginazione.',
    ],
    learned: 'Sai produrre valori su richiesta, senza calcolare tutto.',
    next: 'Moduli: dividere il codice in file importabili.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w8l3',
  title: 'Moduli',
  subtitle: 'import, export e confini tra file',
  minutes: 50,
  objectives: [
    'Esportare valori con export',
    'Importare con import e rinominare',
    'Riconoscere un export default e i suoi rischi',
  ],
  concepts: ['ES modules', 'export', 'import'],
  activate: [
    'Un file da 800 righe è più facile da mantenere di quattro file da 200?',
    'I moduli danno confini espliciti: ogni file dichiara cosa offre e cosa usa.',
  ],
  analogy:
    'Un modulo è una stanza con una porta: ciò che esporti è sul tavolo vicino alla porta, il resto resta dentro. Chi importa vede solo ciò che hai deciso di mostrare.',
  example: {
    code: `// math.js
export function somma(a, b) {
  return a + b;
}

export const PI = 3.14;

// app.js
import { somma, PI } from './math.js';

console.log(somma(2, 3));
console.log(PI);`,
    output: `5
3.14`,
  },
  formal:
    'export nome dichiara un’esportazione nominata; import { nome } la consuma. export default esporta un valore principale, importato senza graffe (nome scelto da chi importa). export { a as b } rinomina. import * as ns raccoglie tutto in un namespace. I moduli sono valutati una volta sola e hanno scope proprio: le variabili non sono globali. Nei browser serve type="module"; con Vite i percorsi sono risolti dal bundler.',
  worked: {
    code: `// --- modulo spese.js ---
const spese = [];

export function aggiungi(importo) {
  spese.push(importo);
  return spese.length;
}

export function totale() {
  return spese.reduce((acc, n) => acc + n, 0);
}

export default { aggiungi, totale };

// --- modulo app.js ---
import riepilogo, { aggiungi, totale } from './spese.js';

aggiungi(10);
aggiungi(20);

console.log(totale());
console.log(typeof riepilogo.aggiungi);`,
    output: `30
function`,
    steps: [
      ['export function aggiungi(importo)', 'export rende la funzione visibile fuori dal modulo.'],
      ['export default { aggiungi, totale }', 'Un default opzionale raccoglie l’API principale in un oggetto.'],
      ['import riepilogo, { aggiungi, totale }', 'Import nominale e default convivono nella stessa riga.'],
      ['aggiungi(10); aggiungi(20);', 'Lo stato del modulo è privato e condiviso da chi lo importa.'],
      ['console.log(totale())', 'Il modulo somma i valori che ha ricevuto: 30.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l3e1',
      title: 'Esporta una funzione',
      prompt:
        'Aggiungi la parola chiave che rende `somma` importabile da un altro file. Verifica con un controllo sul codice (non serve eseguirlo).',
      starterCode: `function somma(a, b) {
  return a + b;
}`,
      check: { kind: 'source', mustInclude: ['export function somma'] },
      hints: ['Basta anteporre export alla dichiarazione.', 'export function somma(a, b) {'],
      solution: `export function somma(a, b) {
  return a + b;
}`,
      explanation: 'export rende il binding visibile agli altri moduli.',
      concepts: ['export'],
    }),
    guided({
      id: 'w8l3e2',
      title: 'Import nominato',
      prompt:
        'Scrivi la riga di import di `somma` e `PI` dal modulo `./math.js`.',
      starterCode: `// scrivi l'import nominato
console.log(somma(1, 2), PI);`,
      check: { kind: 'source', mustInclude: ['import { somma, PI } from'] },
      hints: ['Le esportazioni nominate richiedono le graffe.', 'import { somma, PI } from \'./math.js\';'],
      solution: `import { somma, PI } from './math.js';

console.log(somma(1, 2), PI);`,
      explanation: 'Le graffe elencano i nomi esportati, non i percorsi.',
      concepts: ['import'],
    }),
    solo({
      id: 'w8l3e3',
      title: 'Rinomina',
      prompt: 'Importa `somma` come `add` dal modulo `./math.js`.',
      starterCode: `// import con rinomina
console.log(add(1, 2));`,
      check: { kind: 'source', mustInclude: ['as add'] },
      hints: ['La sintassi è import { nome as alias }.', 'import { somma as add } from \'./math.js\';'],
      solution: `import { somma as add } from './math.js';

console.log(add(1, 2));`,
      explanation: 'La rinomina evita conflitti tra moduli diversi.',
      concepts: ['import'],
    }),
    transfer({
      id: 'w8l3e4',
      title: 'Default e nominati',
      prompt:
        'Esporta `creaReport` come default e `formatta` come nominato, poi importa entrambi.',
      starterCode: `// modulo report.js
function creaReport() {}
function formatta() {}

// scrivi gli export e un import di esempio`,
      objective: 'Distinguere esportazioni nominate e default nello stesso modulo.',
      check: { kind: 'source', mustInclude: ['export default creaReport', 'export function formatta', 'import creaReport'] },
      hints: [
        'export default può precedere la funzione.',
        'Per il default nell’import non servono graffe: import creaReport, { formatta } from ...',
      ],
      solution: `export default function creaReport() {}
export function formatta() {}

// in un altro file:
// import creaReport, { formatta } from './report.js';`,
      explanation: 'Default e nominati possono convivere, ma un solo default per modulo.',
      concepts: ['export'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Import senza graffe di un export nominato',
      code: `// math.js: export function somma() {}
import somma from './math.js';`,
      error: `SyntaxError: The requested module does not provide an export named 'default'`,
      why: 'somma è un’esportazione nominata: richiede le graffe.',
      fix: `import { somma } from './math.js';`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l3x1',
      prompt: 'Spiega la differenza tra export nominato e export default.',
      keywords: ['export', 'default', 'nominat', 'graff', 'rinomin', 'modul'],
      model:
        'Un export nominato mantiene il nome dichiarato e si importa con le graffe, con possibilità di rinominarlo: import { somma as add }. Un export default esporta un valore principale e si importa senza graffe, con il nome che sceglie chi importa. Preferisco i nominati perché rendono esplicito cosa si usa e funzionano meglio con il refactoring automatico.',
      concepts: ['ES modules'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l3q1',
      question: 'Come si importa un export nominato?',
      options: [
        ['import somma from \'./m.js\'', 'Senza graffe è il default.'],
        ['import { somma } from \'./m.js\'', 'Esatto.'],
        ['import * somma from \'./m.js\'', 'Sintassi errata.'],
      ],
      correct: 1,
      explanation: 'I nominati richiedono le graffe.',
      concepts: ['import'],
    }),
    quiz({
      id: 'w8l3q2',
      question: 'Quanti export default può avere un modulo?',
      options: [
        ['Uno', 'Esatto.'],
        ['Illimitati', 'Solo uno.'],
        ['Dipende dal bundler', 'È una regola del linguaggio.'],
      ],
      correct: 0,
      explanation: 'Il default è unico per modulo.',
      concepts: ['export'],
    }),
    quiz({
      id: 'w8l3q3',
      question: 'Le variabili di un modulo sono globali?',
      options: [
        ['Sì', 'No, hanno scope di modulo.'],
        ['No, restano nello scope del modulo', 'Esatto.'],
        ['Solo se esportate', 'Anche se esportate non diventano globali.'],
      ],
      correct: 1,
      explanation: 'I moduli hanno il proprio scope: niente collisioni accidentali.',
      concepts: ['ES modules'],
    }),
  ],
  recap: {
    points: [
      'export nominato → import con graffe.',
      'Un solo export default per modulo.',
      'Scope di modulo: niente variabili globali.',
      'La rinomina con as evita conflitti.',
    ],
    learned: 'Sai dividere il codice in moduli con confini chiari.',
    next: 'WeakMap e WeakSet: memorie che si liberano da sole.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w8l4',
  title: 'WeakMap e WeakSet',
  subtitle: 'Riferimenti deboli e dati privati per oggetto',
  minutes: 45,
  objectives: [
    'Capire cosa significa riferimento debole',
    'Usare WeakMap per associare dati a oggetti',
    'Sapere cosa non si può fare con WeakMap',
  ],
  concepts: ['WeakMap', 'WeakSet', 'garbage collection'],
  activate: [
    'Se una Map usa un oggetto come chiave, quell’oggetto può essere liberato dalla memoria?',
    'Con una Map no: la chiave resta referenziata. WeakMap non impedisce la raccolta.',
  ],
  analogy:
    'WeakMap è un post-it attaccato a un oggetto: quando l’oggetto viene buttato, il post-it sparisce con lui. Una Map normale è un archivio che tiene in vita tutti gli oggetti elencati.',
  example: {
    code: `const meta = new WeakMap();
let utente = { nome: 'Ada' };

meta.set(utente, { visitato: true });
console.log(meta.get(utente).visitato);

console.log(meta.has(utente));
utente = null;
console.log('Ora il GC può liberare l’oggetto');`,
    output: `true
true
Ora il GC può liberare l’oggetto`,
  },
  formal:
    'WeakMap accetta solo oggetti come chiavi e non è iterabile: non ha size né keys. I riferimenti alle chiavi sono deboli: se non ci sono altri riferimenti all’oggetto, la voce viene rimossa dal garbage collector. WeakSet contiene solo oggetti e serve a marcare elementi senza impedirne la liberazione. Casi d’uso: cache per oggetto, dati privati associati, evitare memory leak.',
  worked: {
    code: `const cache = new WeakMap();

function analizza(oggetto) {
  if (cache.has(oggetto)) {
    return 'dalla cache';
  }
  const risultato = Object.keys(oggetto).length;
  cache.set(oggetto, risultato);
  return 'calcolato: ' + risultato;
}

const spesa = { descrizione: 'Libro', importo: 18 };
console.log(analizza(spesa));
console.log(analizza(spesa));

const visitati = new WeakSet();
const nodo = { id: 1 };
visitati.add(nodo);
console.log(visitati.has(nodo));`,
    output: `calcolato: 2
dalla cache
true`,
    steps: [
      ['new WeakMap()', 'Nessun metodo di iterazione: solo get/set/has/delete.'],
      ['cache.has(oggetto)', 'La chiave è l’oggetto stesso, non un id.'],
      ['cache.set(oggetto, risultato)', 'Il valore può essere qualsiasi cosa.'],
      ['analizza(spesa) due volte', 'La seconda volta il risultato è memorizzato.'],
      ['WeakSet.add(nodo)', 'Marca l’oggetto senza trattenerlo in memoria.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l4e1',
      title: 'Associa un dato',
      prompt: 'Salva `{ ruolo: \'admin\' }` per l’oggetto e stampa `admin`.',
      starterCode: `const meta = new WeakMap();
const utente = { nome: 'Ada' };

meta.(utente, { ruolo: 'admin' });
console.log(meta.get(utente).ruolo);`,
      check: { kind: 'output', lines: ['admin'] },
      hints: ['Il metodo per inserire è set.', 'meta.set(utente, {...})'],
      solution: `const meta = new WeakMap();
const utente = { nome: 'Ada' };

meta.set(utente, { ruolo: 'admin' });
console.log(meta.get(utente).ruolo);`,
      explanation: 'WeakMap associa dati a un oggetto senza trattenerlo.',
      concepts: ['WeakMap'],
    }),
    guided({
      id: 'w8l4e2',
      title: 'Cache per oggetto',
      prompt:
        'Usa WeakMap per memorizzare il conteggio delle chiavi: la seconda chiamata deve stampare `cache`.',
      starterCode: `const cache = new WeakMap();
const dati = { a: 1 };

function conta(oggetto) {
  if (cache.has(oggetto)) return 'cache';
  cache.(oggetto, Object.keys(oggetto).length);
  return 'calcolato';
}

console.log(conta(dati));
console.log(conta(dati));`,
      check: { kind: 'output', lines: ['calcolato', 'cache'] },
      hints: ['Dentro il ramo di calcolo serve set.', 'cache.set(oggetto, ...)'],
      solution: `const cache = new WeakMap();
const dati = { a: 1 };

function conta(oggetto) {
  if (cache.has(oggetto)) return 'cache';
  cache.set(oggetto, Object.keys(oggetto).length);
  return 'calcolato';
}

console.log(conta(dati));
console.log(conta(dati));`,
      explanation: 'La cache per oggetto non impedisce la liberazione quando l’oggetto non serve più.',
      concepts: ['WeakMap'],
    }),
    solo({
      id: 'w8l4e3',
      title: 'WeakSet come marca',
      prompt:
        'Marca un oggetto come visitato con WeakSet e stampa `true` con has.',
      starterCode: `const visitati = new WeakSet();
const nodo = { id: 1 };

// marca e verifica`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['visitati.add(nodo)', 'Poi visitati.has(nodo).'],
      solution: `const visitati = new WeakSet();
const nodo = { id: 1 };

visitati.add(nodo);
console.log(visitati.has(nodo));`,
      explanation: 'WeakSet è utile per marcare elementi già elaborati senza trattenerli.',
      concepts: ['WeakSet'],
    }),
    transfer({
      id: 'w8l4e4',
      title: 'Limiti di WeakMap',
      prompt:
        'Verifica che WeakMap non abbia size: `typeof new WeakMap().size` deve stampare `undefined`.',
      starterCode: `// stampa il tipo di .size di una WeakMap`,
      check: { kind: 'output', lines: ['undefined'] },
      hints: ['WeakMap non è iterabile e non ha size.', 'console.log(typeof new WeakMap().size)'],
      solution: `console.log(typeof new WeakMap().size);`,
      explanation: 'L’assenza di size è una conseguenza dei riferimenti deboli: le voci possono sparire quando il GC lavora.',
      concepts: ['WeakMap'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'WeakMap con chiave primitiva',
      code: `const m = new WeakMap();
m.set('chiave', 1);`,
      error: `TypeError: Invalid value used as weak map key`,
      why: 'I riferimenti deboli hanno senso solo per oggetti: le stringhe non sono gestite dal GC allo stesso modo.',
      fix: `m.set({ chiave: true }, 1);`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l4x1',
      prompt: 'Spiega cosa significa riferimento debole e perché WeakMap evita memory leak.',
      keywords: ['weak', 'riferiment', 'garbage', 'memoria', 'chiave', 'oggetto'],
      model:
        'Un riferimento debole non impedisce al garbage collector di liberare un oggetto: se non ci sono altri riferimenti forti, l’oggetto e la sua voce nella WeakMap spariscono. Con una Map normale le chiavi restano referenziate e gli oggetti non vengono mai liberati, causando memory leak nelle cache di lunga durata.',
      concepts: ['WeakMap'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l4q1',
      question: 'Quali chiavi accetta WeakMap?',
      options: [
        ['Solo stringhe', 'Solo oggetti.'],
        ['Solo oggetti', 'Esatto.'],
        ['Qualsiasi valore', 'Solo oggetti, per via dei riferimenti deboli.'],
      ],
      correct: 1,
      explanation: 'Le chiavi devono essere oggetti.',
      concepts: ['WeakMap'],
    }),
    quiz({
      id: 'w8l4q2',
      question: 'WeakMap è iterabile?',
      options: [
        ['Sì, con for...of', 'No: WeakMap non espone chiavi, valori né size.'],
        ['No, non ha keys/values/size', 'Esatto.'],
        ['Solo con entries', 'Non ha entries.'],
      ],
      correct: 1,
      explanation: 'L’iterazione non è possibile perché le voci possono sparire.',
      concepts: ['WeakMap'],
    }),
    quiz({
      id: 'w8l4q3',
      question: 'A cosa serve WeakSet?',
      options: [
        ['A memorizzare valori unici primitivi', 'Solo oggetti.'],
        ['A marcare oggetti senza impedirne la liberazione', 'Esatto.'],
        ['A serializzare in JSON', 'Non è serializzabile.'],
      ],
      correct: 1,
      explanation: 'Utile per “già visitato” senza trattenere gli oggetti.',
      concepts: ['WeakSet'],
    }),
  ],
  recap: {
    points: [
      'WeakMap/WeakSet non impediscono la garbage collection.',
      'Solo oggetti come chiavi o elementi.',
      'Nessuna iterazione, nessun size.',
      'Ideali per cache e marcature.',
    ],
    learned: 'Sai usare riferimenti deboli per evitare memory leak.',
    next: 'Symbol e tagged templates: personalizzare il comportamento del linguaggio.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w8l5',
  title: 'Symbol e meta-programmazione',
  subtitle: 'Chiavi uniche e protocolli',
  minutes: 50,
  objectives: [
    'Creare Symbol unici',
    'Usare Symbol come chiave di proprietà',
    'Riconoscere i well-known symbols',
  ],
  concepts: ['Symbol', 'well-known symbols', 'meta-programmazione'],
  activate: [
    'Due moduli aggiungono la proprietà `id` allo stesso oggetto. Come eviti collisioni?',
    'Con un Symbol: ogni Symbol è unico, anche con la stessa descrizione.',
  ],
  analogy:
    'Un Symbol è una chiave fisica unica: due chiavi identiche all’apparenza aprono porte diverse. I well-known symbols sono protocolli standard che il linguaggio consulta automaticamente.',
  example: {
    code: `const id = Symbol('id');
const altro = Symbol('id');

const oggetto = { [id]: 123 };
console.log(oggetto[id]);
console.log(id === altro);
console.log(Object.keys(oggetto));
console.log(typeof id);`,
    output: `123
false
[]
symbol`,
  },
  formal:
    'Symbol(descrizione) crea un valore primitivo unico; Symbol.for(chiave) usa un registro globale. Le proprietà con chiave Symbol non compaiono in Object.keys né in JSON.stringify. I well-known symbols (Symbol.iterator, Symbol.toPrimitive, Symbol.toStringTag) permettono di personalizzare il comportamento del linguaggio: implementando Symbol.iterator un oggetto diventa iterabile con for...of.',
  worked: {
    code: `const META = Symbol('meta');

const spesa = {
  descrizione: 'Libro',
  importo: 18,
  [META]: { creata: '2024-01-01' },
};

console.log(spesa[META].creata);
console.log(Object.keys(spesa).join(','));

const iterabile = {
  valori: [10, 20],
  [Symbol.iterator]() {
    return this.valori[Symbol.iterator]();
  },
};

console.log([...iterabile]);`,
    output: `2024-01-01
descrizione,importo
[10, 20]`,
    steps: [
      ['const META = Symbol(\'meta\')', 'Una chiave unica: nessun altro modulo può collidere.'],
      ['[META]: { ... }', 'La sintassi calcolata usa il Symbol come chiave.'],
      ['Object.keys(spesa)', 'Le chiavi Symbol sono invisibili all’enumerazione ordinaria.'],
      ['[Symbol.iterator]()', 'Implementa il protocollo di iterazione.'],
      ['[...iterabile]', 'Ora lo spread funziona: l’oggetto è iterabile.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l5e1',
      title: 'Crea un Symbol',
      prompt: 'Crea un Symbol e usalo come chiave. Stampa `123`.',
      starterCode: `const chiave = ('chiave');
const o = { [chiave]: 123 };

console.log(o[chiave]);`,
      check: { kind: 'output', lines: ['123'] },
      hints: ['Il costruttore è Symbol.', 'Symbol(\'chiave\')'],
      solution: `const chiave = Symbol('chiave');
const o = { [chiave]: 123 };

console.log(o[chiave]);`,
      explanation: 'Symbol crea un identificatore unico utilizzabile come chiave.',
      concepts: ['Symbol'],
    }),
    guided({
      id: 'w8l5e2',
      title: 'Invisibile alle chiavi',
      prompt: 'Stampa le chiavi ordinarie dell’oggetto: deve apparire solo `nome`.',
      starterCode: `const segreto = Symbol('segreto');
const utente = { nome: 'Ada', [segreto]: 'x' };

console.log(Object.keys(utente).join(','));
console.log(utente[]);`,
      check: { kind: 'output', lines: ['nome', 'x'] },
      hints: ['Per leggere il valore usa la variabile del Symbol.', 'utente[segreto]'],
      solution: `const segreto = Symbol('segreto');
const utente = { nome: 'Ada', [segreto]: 'x' };

console.log(Object.keys(utente).join(','));
console.log(utente[segreto]);`,
      explanation: 'Le proprietà Symbol non sono enumerate: la lettura esplicita funziona.',
      concepts: ['Symbol'],
    }),
    solo({
      id: 'w8l5e3',
      title: 'Unicità',
      prompt: 'Crea due Symbol con la stessa descrizione e stampa `false` confrontandoli con ===.',
      starterCode: `// due Symbol uguali in descrizione`,
      check: { kind: 'output', lines: ['false'] },
      hints: ['Symbol(\'x\') due volte.', 'console.log(a === b)'],
      solution: `const a = Symbol('x');
const b = Symbol('x');
console.log(a === b);`,
      explanation: 'La descrizione è solo un’etichetta di debug: l’identità resta unica.',
      concepts: ['Symbol'],
    }),
    transfer({
      id: 'w8l5e4',
      title: 'Iterabile personalizzato',
      prompt:
        'Rendi iterabile `{ valori: [1, 2] }` implementando Symbol.iterator e stampa `1,2` con lo spread.',
      starterCode: `const raccolta = {
  valori: [1, 2],
  // implementa Symbol.iterator
};

console.log([...raccolta].join(','));`,
      objective: 'Personalizzare il comportamento del linguaggio con un well-known symbol.',
      check: { kind: 'output', lines: ['1,2'] },
      hints: ['[Symbol.iterator]() deve restituire un iteratore.', 'return this.valori[Symbol.iterator]();'],
      solution: `const raccolta = {
  valori: [1, 2],
  [Symbol.iterator]() {
    return this.valori[Symbol.iterator]();
  },
};

console.log([...raccolta].join(','));`,
      explanation: 'Implementando il protocollo, l’oggetto funziona con spread, for...of e destructuring.',
      concepts: ['meta-programmazione'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Symbol in JSON',
      code: `const s = Symbol('x');
const o = { [s]: 1 };
console.log(JSON.stringify(o));`,
      error: `{}`,
      why: 'Le proprietà con chiave Symbol non fanno parte della serializzazione JSON.',
      fix: `// serializza esplicitamente i campi che devono sopravvivere`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l5x1',
      prompt: 'Spiega a cosa servono i Symbol e perché le loro proprietà non compaiono in Object.keys.',
      keywords: ['symbol', 'unic', 'chiave', 'protocoll', 'enumer', 'collision'],
      model:
        'Un Symbol è un identificatore unico: due Symbol con la stessa descrizione sono diversi, quindi evitano collisioni tra moduli. Le proprietà con chiave Symbol sono escluse dall’enumerazione ordinaria e da JSON per non interferire con il codice che scorre le proprietà. I well-known symbols permettono di personalizzare comportamenti del linguaggio, come l’iterazione.',
      concepts: ['Symbol'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l5q1',
      question: 'Due Symbol con la stessa descrizione sono uguali?',
      options: [
        ['Sì', 'La descrizione non determina l’identità.'],
        ['No', 'Esatto.'],
        ['Solo con Symbol.for', 'Symbol.for usa il registro globale, ma non rende uguali i Symbol creati con Symbol().'],
      ],
      correct: 1,
      explanation: 'Ogni Symbol() è unico.',
      concepts: ['Symbol'],
    }),
    quiz({
      id: 'w8l5q2',
      question: 'Le chiavi Symbol compaiono in Object.keys?',
      options: [
        ['Sì', 'No: Symbol resta fuori da Object.keys.'],
        ['No', 'Esatto.'],
        ['Solo se enumerabili', 'Sono sempre escluse dall’enumerazione ordinaria.'],
      ],
      correct: 1,
      explanation: 'Restano fuori dalle API di enumerazione standard.',
      concepts: ['Symbol'],
    }),
    quiz({
      id: 'w8l5q3',
      question: 'Cosa permette Symbol.iterator?',
      options: [
        ['Di rendere un oggetto iterabile con for...of', 'Esatto.'],
        ['Di clonare un oggetto', 'Non c’entra.'],
        ['Di serializzare in JSON', 'No: JSON ignora i Symbol.'],
      ],
      correct: 0,
      explanation: 'È il protocollo dell’iterazione.',
      concepts: ['meta-programmazione'],
    }),
  ],
  recap: {
    points: [
      'Symbol = identificatore unico.',
      'Proprietà Symbol non enumerabili.',
      'Well-known symbols personalizzano il linguaggio.',
      'Symbol.iterator abilita for...of.',
    ],
    learned: 'Sai usare chiavi uniche e protocolli del linguaggio.',
    next: 'Tagged templates: trasformare stringhe con una funzione.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w8l6',
  title: 'Tagged templates',
  subtitle: 'Funzioni che ricevono stringhe ed espressioni',
  minutes: 45,
  objectives: [
    'Scrivere un tag template',
    'Separare parti statiche ed espressioni',
    'Usare un tag per escaping e formattazione',
  ],
  concepts: ['tagged template', 'strings', 'escaping'],
  activate: [
    'Vuoi evidenziare in sicurezza le parti variabili di una stringa HTML. Cosa ti serve?',
    'Un tagged template: riceve le parti statiche e le espressioni separate, così puoi trasformare solo le espressioni.',
  ],
  analogy:
    'Un tagged template è un revisore: riceve la frase già divisa in parti fisse e parole variabili, e decide come ricomporla. Può proteggere le variabili, colorarle o formattarle.',
  example: {
    code: `function evidenzia(strings, ...valori) {
  return strings.reduce((acc, parte, i) => {
    const valore = valori[i];
    return acc + parte + (valore === undefined ? '' : '[' + valore + ']');
  }, '');
}

const nome = 'Ada';
console.log(evidenzia\`Ciao \${nome}, benvenuta\`);`,
    output: `Ciao [Ada], benvenuta`,
  },
  formal:
    'Un tag è una funzione chiamata con un template literal: riceve un array di stringhe statiche e gli altri argomenti sono le espressioni. L’array ha una proprietà raw con le stringhe non processate (utile per escape). Il tag può restituire qualsiasi valore, non solo stringhe. I tagged template si usano per escaping HTML, traduzioni, query SQL parametrizzate e DSL.',
  worked: {
    code: `function safe(strings, ...valori) {
  const escape = (v) =>
    String(v)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

  return strings.reduce((acc, parte, i) => {
    const valore = valori[i];
    return acc + parte + (valore === undefined ? '' : escape(valore));
  }, '');
}

const input = '<script>';
console.log(safe\`<p>\${input}</p>\`);
console.log(safe\`Nessuna espressione\`);`,
    output: `<p>&lt;script&gt;</p>
Nessuna espressione`,
    steps: [
      ['function safe(strings, ...valori)', 'strings contiene le parti fisse, valori le espressioni.'],
      ['strings.reduce(...)', 'Ricompone interleavando parti e valori.'],
      ['valori[i]', 'Per la parte i-esima il valore i-esimo, se esiste.'],
      ['escape(valore)', 'Solo le espressioni vengono trasformate: le parti statiche restano.'],
      ['safe`Nessuna espressione`', 'Con una sola parte statica il reduce restituisce quella.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l6e1',
      title: 'Primo tag',
      prompt: 'Completa il tag perché stampi `Ciao Ada`.',
      starterCode: `function maiuscolo(strings, ...valori) {
  return strings.reduce((acc, parte, i) => {
    const valore = valori[i] === undefined ? '' : String(valori[i]).toUpperCase();
    return acc + parte + valore;
  }, '');
}

const nome = 'ada';
console.log(maiuscolo\`Ciao \${nome}\`);`,
      check: { kind: 'output', lines: ['Ciao ADA'] },
      hints: ['Il valore va trasformato in maiuscolo.', 'String(valori[i]).toUpperCase() è già scritto: verifica il resto.'],
      solution: `function maiuscolo(strings, ...valori) {
  return strings.reduce((acc, parte, i) => {
    const valore = valori[i] === undefined ? '' : String(valori[i]).toUpperCase();
    return acc + parte + valore;
  }, '');
}

const nome = 'ada';
console.log(maiuscolo\`Ciao \${nome}\`);`,
      explanation: 'Il tag riceve le parti statiche e le espressioni separate.',
      concepts: ['tagged template'],
    }),
    guided({
      id: 'w8l6e2',
      title: 'Conta le espressioni',
      prompt: 'Scrivi un tag `conta` che restituisce il numero di espressioni. Con due espressioni stampa `2`.',
      starterCode: `function conta(strings, ...valori) {
  // restituisci la lunghezza di valori
}

console.log(conta\`\${1} e \${2}\`);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Il tag può restituire un numero.', 'return valori.length;'],
      solution: `function conta(strings, ...valori) {
  return valori.length;
}

console.log(conta\`\${1} e \${2}\`);`,
      explanation: 'Un tag non deve per forza restituire una stringa.',
      concepts: ['tagged template'],
    }),
    solo({
      id: 'w8l6e3',
      title: 'Separatore',
      prompt:
        'Tag `elenco` che unisce le espressioni con ` / `: con `elenco`${`\'a\'`}${`\'b\'`}`` stampa `a / b`.',
      starterCode: `function elenco(strings, ...valori) {
  // unisci i valori
}

console.log(elenco\`\${'a'}\${'b'}\`);`,
      check: { kind: 'output', lines: ['a / b'] },
      hints: ['Basta valori.join(\' / \').', 'Non servono le parti statiche, qui sono vuote.'],
      solution: `function elenco(strings, ...valori) {
  return valori.join(' / ');
}

console.log(elenco\`\${'a'}\${'b'}\`);`,
      explanation: 'Il tag riceve le espressioni già separate: unirle è immediato.',
      concepts: ['tagged template'],
    }),
    transfer({
      id: 'w8l6e4',
      title: 'Escape di sicurezza',
      prompt:
        'Usa il tag `safe` per stampare `<b>&lt;script&gt;</b>` con input `<script>`.',
      starterCode: `function safe(strings, ...valori) {
  const escape = (v) => String(v).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return strings.reduce((acc, parte, i) => {
    const valore = valori[i];
    return acc + parte + (valore === undefined ? '' : escape(valore));
  }, '');
}

// chiama safe con input '<script>'`,
      objective: 'Applicare il tagged template alla sicurezza dell’output.',
      check: { kind: 'output', lines: ['<b>&lt;script&gt;</b>'] },
      hints: ['Il template è `<b>${input}</b>`.', 'safe`<b>${input}</b>`'],
      solution: `function safe(strings, ...valori) {
  const escape = (v) => String(v).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return strings.reduce((acc, parte, i) => {
    const valore = valori[i];
    return acc + parte + (valore === undefined ? '' : escape(valore));
  }, '');
}

const input = '<script>';
console.log(safe\`<b>\${input}</b>\`);`,
      explanation: 'Le parti statiche restano markup fidato, le espressioni vengono neutralizzate.',
      concepts: ['escaping'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Tag chiamato con parentesi',
      code: `function tag(strings) { return strings.length; }
console.log(tag('ciao'));`,
      error: `1`,
      why: 'Con le parentesi tonde non è un tagged template: ricevi una stringa normale, non l’array delle parti.',
      fix: `console.log(tag\`ciao\`); // ricevi l'array delle parti statiche`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l6x1',
      prompt: 'Spiega come un tag riceve gli argomenti e perché è utile per l’escaping.',
      keywords: ['tag', 'strings', 'valor', 'static', 'escaping', 'espression'],
      model:
        'Un tag riceve come primo argomento l’array delle parti statiche e poi le espressioni come argomenti separati. Questo permette di distinguere ciò che è testo scritto dallo sviluppatore da ciò che arriva dall’utente: posso lasciare intatto il markup statico e neutralizzare solo le espressioni. È la base dei template HTML sicuri e delle query parametrizzate.',
      concepts: ['tagged template'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l6q1',
      question: 'Cosa riceve un tag come primo argomento?',
      options: [
        ['Una stringa già interpolata', 'Riceve le parti separate.'],
        ['Un array delle parti statiche', 'Esatto.'],
        ['Un oggetto con i valori', 'I valori sono argomenti successivi.'],
      ],
      correct: 1,
      explanation: 'La separazione è il punto di forza dei tagged template.',
      concepts: ['tagged template'],
    }),
    quiz({
      id: 'w8l6q2',
      question: 'Un tag deve restituire una stringa?',
      options: [
        ['Sì, sempre', 'Può restituire qualsiasi valore.'],
        ['No, può restituire qualsiasi valore', 'Esatto.'],
        ['Solo se il template è statico', 'Non è un vincolo.'],
      ],
      correct: 1,
      explanation: 'Il tag è una funzione: il valore di ritorno è libero.',
      concepts: ['tagged template'],
    }),
    quiz({
      id: 'w8l6q3',
      question: 'Perché i tagged template aiutano nell’escaping?',
      options: [
        ['Separano le parti statiche dalle espressioni', 'Esatto.'],
        ['Convertendo tutto in numeri', 'Non c’entra.'],
        ['Bloccando il template', 'Non blocca nulla.'],
      ],
      correct: 0,
      explanation: 'Puoi trattare solo le espressioni non fidate.',
      concepts: ['escaping'],
    }),
  ],
  recap: {
    points: [
      'Il tag riceve strings + espressioni.',
      'Può restituire qualsiasi valore.',
      'La separazione abilita escaping mirato.',
      'strings.raw contiene le stringhe grezze.',
    ],
    learned: 'Sai creare funzioni che controllano la composizione delle stringhe.',
    next: 'Ripasso e progetto: dividere il quaderno in moduli.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w8l7',
  title: 'Ripasso e progetto',
  subtitle: 'Modularizzare il Quaderno delle spese',
  minutes: 60,
  objectives: [
    'Dividere il codice in moduli con responsabilità chiare',
    'Definire un’API di modulo stabile',
    'Comporre dati con Map e Set',
  ],
  concepts: ['ripasso', 'progetto', 'architettura'],
  activate: [
    'Se domani volessi cambiare il formato di salvataggio, quanti file dovresti toccare?',
    'Con moduli ben separati, uno: quello che si occupa della persistenza.',
  ],
  analogy:
    'I moduli sono stanze di una casa: ognuna ha la sua funzione, ma le porte sono i contratti. Se cambi il divano in salotto, non devi rifare il bagno.',
  example: {
    code: `// spese/model.js
export function creaSpesa(descrizione, importo) {
  return { descrizione, importo };
}

// spese/stats.js
export function totale(spese) {
  return spese.reduce((acc, s) => acc + s.importo, 0);
}

// app.js
import { creaSpesa } from './spese/model.js';
import { totale } from './spese/stats.js';

const spese = [creaSpesa('Libro', 18), creaSpesa('Pane', 3)];
console.log(totale(spese));`,
    output: `21`,
  },
  formal:
    'Una struttura modulare tipica: model (creazione e validazione dei dati), stats (calcoli derivati), storage (persistenza), ui (rendering). Ogni modulo esporta funzioni pure dove possibile, così è testabile senza DOM. Le dipendenze vanno in una sola direzione: ui → model/stats → storage. Evita import circolari: sono difficili da seguire e rompono l’ordine di inizializzazione.',
  worked: {
    code: `// --- model.js ---
function creaSpesa(descrizione, importo) {
  if (!descrizione || importo <= 0) throw new Error('Spesa non valida');
  return { descrizione, importo };
}

// --- stats.js ---
function totaliPerCategoria(spese) {
  const mappa = new Map();
  spese.forEach((s) => {
    mappa.set(s.categoria ?? 'altro', (mappa.get(s.categoria ?? 'altro') ?? 0) + s.importo);
  });
  return mappa;
}

function categorieDistinte(spese) {
  return new Set(spese.map((s) => s.categoria ?? 'altro'));
}

// --- app.js ---
const spese = [
  creaSpesa('Libro', 18),
  creaSpesa('Pranzo', 12),
  creaSpesa('Corso', 90),
];

console.log(totaliPerCategoria(spese).get('altro'));
console.log(categorieDistinte(spese).size);`,
    output: `120
1`,
    steps: [
      ['creaSpesa(...)', 'Il modello valida e crea: un unico punto di ingresso per i dati.'],
      ['totaliPerCategoria(spese)', 'Le statistiche non conoscono il DOM: solo dati.'],
      ['new Map()', 'Le categorie come chiavi, con totali aggiornabili.'],
      ['new Set(...)', 'Le categorie distinte senza duplicati.'],
      ['app.js', 'Il livello applicativo compone i moduli: nessuna logica duplicata.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l7e1',
      title: 'Esporta il modello',
      prompt: 'Rendi `creaSpesa` esportabile e verifica il codice con il controllo statico.',
      starterCode: `function creaSpesa(descrizione, importo) {
  return { descrizione, importo };
}`,
      check: { kind: 'source', mustInclude: ['export function creaSpesa'] },
      hints: ['Anteponi export alla funzione.', 'export function creaSpesa(...)'],
      solution: `export function creaSpesa(descrizione, importo) {
  return { descrizione, importo };
}`,
      explanation: 'Il modello è il primo modulo da esportare: definisce la forma dei dati.',
      concepts: ['progetto'],
    }),
    guided({
      id: 'w8l7e2',
      title: 'Totali con Map',
      prompt: 'Calcola i totali per categoria con una Map e stampa il totale di `cibo` (`20`).',
      starterCode: `const spese = [
  { categoria: 'cibo', importo: 12 },
  { categoria: 'cibo', importo: 8 },
  { categoria: 'casa', importo: 40 },
];

const totali = new Map();

// accumula
console.log(totali.get('cibo'));`,
      check: { kind: 'output', lines: ['20'] },
      hints: ['Per ogni spesa: totali.set(cat, (get(cat) ?? 0) + importo).', 'Poi get(\'cibo\').'],
      solution: `const spese = [
  { categoria: 'cibo', importo: 12 },
  { categoria: 'cibo', importo: 8 },
  { categoria: 'casa', importo: 40 },
];

const totali = new Map();
spese.forEach((s) => {
  totali.set(s.categoria, (totali.get(s.categoria) ?? 0) + s.importo);
});

console.log(totali.get('cibo'));`,
      explanation: 'Map rende esplicito il raggruppamento senza convertire chiavi.',
      concepts: ['Map'],
    }),
    solo({
      id: 'w8l7e3',
      title: 'Categorie distinte',
      prompt: 'Stampa il numero di categorie distinte (`2`) usando un Set.',
      starterCode: `const spese = [
  { categoria: 'cibo' },
  { categoria: 'casa' },
  { categoria: 'cibo' },
];

// Set`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['new Set(spese.map(s => s.categoria))', 'Poi .size.'],
      solution: `const spese = [
  { categoria: 'cibo' },
  { categoria: 'casa' },
  { categoria: 'cibo' },
];

console.log(new Set(spese.map((s) => s.categoria)).size);`,
      explanation: 'Set è la struttura giusta per l’unicità.',
      concepts: ['Set'],
    }),
    transfer({
      id: 'w8l7e4',
      title: 'Modulo di storage',
      prompt:
        'Scrivi una funzione `serializza(spese)` che restituisce JSON con versione e array, e `deserializza(testo)` con fallback. Stampa `1` per un array di una spesa e `0` per testo corrotto.',
      starterCode: `function serializza(spese) {
  // { versione: 1, spese }
}

function deserializza(testo) {
  // try/catch + validazione
}

console.log(deserializza(serializza([{ importo: 10 }])).spese.length);
console.log(deserializza('rotto').spese.length);`,
      objective: 'Un modulo di persistenza con API stabile e robusta.',
      check: { kind: 'output', lines: ['1', '0'] },
      hints: ['JSON.stringify({ versione: 1, spese })', 'Nel catch restituisci { versione: 1, spese: [] }.'],
      solution: `function serializza(spese) {
  return JSON.stringify({ versione: 1, spese });
}

function deserializza(testo) {
  try {
    const dati = JSON.parse(testo);
    if (!Array.isArray(dati.spese)) return { versione: 1, spese: [] };
    return dati;
  } catch {
    return { versione: 1, spese: [] };
  }
}

console.log(deserializza(serializza([{ importo: 10 }])).spese.length);
console.log(deserializza('rotto').spese.length);`,
      explanation: 'Lo storage resta isolato: l’interfaccia non sa come i dati vengono salvati.',
      concepts: ['progetto'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Import circolare',
      code: `// a.js
import { b } from './b.js';
export const a = 'a';

// b.js
import { a } from './a.js';
export const b = 'b';`,
      error: `Uno dei due binding può essere undefined al momento dell'uso`,
      why: 'I moduli si inizializzano in ordine: con una dipendenza circolare uno dei valori non è ancora pronto.',
      fix: `// estrai la parte condivisa in un terzo modulo comune.js`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l7x1',
      prompt: 'Spiega come hai diviso il quaderno in moduli e quali dipendenze hai permesso.',
      keywords: ['modul', 'model', 'stats', 'storage', 'ui', 'dipendenz'],
      model:
        'Ho separato il modello dei dati, le statistiche, lo storage e l’interfaccia. Le statistiche ricevono array di spese e restituiscono numeri o mappe, senza toccare il DOM; lo storage serializza e valida; l’interfaccia compone i moduli. Le dipendenze vanno in una direzione sola, così ogni modulo è testabile e una modifica allo storage non tocca il modello.',
      concepts: ['architettura'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l7q1',
      question: 'Dove va la logica di calcolo dei totali?',
      options: [
        ['In un modulo di statistiche, senza DOM', 'Esatto.'],
        ['Nel modulo che gestisce i click', 'Mescolerebbe responsabilità.'],
        ['In index.html', 'Non è un posto per la logica.'],
      ],
      correct: 0,
      explanation: 'Funzioni pure = testabili e riusabili.',
      concepts: ['architettura'],
    }),
    quiz({
      id: 'w8l7q2',
      question: 'Perché evitare import circolari?',
      options: [
        ['Perché rendono l’ordine di inizializzazione imprevedibile', 'Esatto.'],
        ['Perché il browser li blocca sempre', 'A volte funzionano, ma sono fragili.'],
        ['Perché consumano più memoria', 'Il problema è la correttezza.'],
      ],
      correct: 0,
      explanation: 'Le dipendenze devono avere una direzione.',
      concepts: ['architettura'],
    }),
    quiz({
      id: 'w8l7q3',
      question: 'Quale struttura per categorie distinte?',
      options: [
        ['Set', 'Esatto.'],
        ['Map', 'Map è per chiavi-valore.'],
        ['Array con includes in loop', 'Funziona ma è più lento e verboso.'],
      ],
      correct: 0,
      explanation: 'Set esprime l’unicità.',
      concepts: ['Set'],
    }),
  ],
  recap: {
    points: [
      'Moduli: model, stats, storage, ui.',
      'Dipendenze in una sola direzione.',
      'Funzioni pure per i calcoli.',
      'API di modulo stabili e validate.',
    ],
    learned: 'Il Quaderno delle spese è ora un’architettura modulare.',
    next: 'Lato professionale: organizzare un progetto reale.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w8l8',
  title: 'Lato professionale e test',
  subtitle: 'Struttura di progetto e verifica della settimana',
  minutes: 50,
  objectives: [
    'Organizzare cartelle per responsabilità',
    'Riconoscere i segnali di un modulo troppo grande',
    'Superare il test della settimana',
  ],
  concepts: ['struttura progetto', 'tree shaking', 'test'],
  activate: [
    'Apri un progetto sconosciuto: come capisci dove si trova la logica dei dati?',
    'Dalla struttura delle cartelle e dai nomi dei file: l’architettura è comunicazione.',
  ],
  analogy:
    'La struttura del progetto è la segnaletica di un edificio: se manca, ogni visita richiede una guida. Nomi e cartelle chiare riducono il tempo per trovare le cose.',
  example: {
    code: `// Struttura consigliata per il progetto
// src/
//   features/spese/model.js      → creazione e validazione
//   features/spese/stats.js      → totali e raggruppamenti
//   features/spese/storage.js    → localStorage / JSON
//   features/spese/ui.js         → rendering e form
//   shared/money.js              → formattazione importi

export function formatEuro(valore) {
  return valore.toFixed(2) + ' €';
}

console.log(formatEuro(12.5));`,
    output: `12.50 €`,
  },
  formal:
    'Organizza per funzionalità (feature) più che per tipo di file: tutto ciò che riguarda le spese vive in features/spese. I moduli condivisi stanno in shared o lib. I file di test stanno accanto al modulo (model.test.js). Il tree shaking funziona meglio con export nominati e codice senza effetti collaterali all’import: un modulo non dovrebbe eseguire logica pesante solo perché è stato importato.',
  worked: {
    code: `// shared/money.js
function formatEuro(valore) {
  return valore.toFixed(2) + ' €';
}

// features/spese/model.js
function creaSpesa(descrizione, importo) {
  return { descrizione, importo };
}

// features/spese/stats.js
function totale(spese) {
  return spese.reduce((acc, s) => acc + s.importo, 0);
}

// composition
const spese = [creaSpesa('Libro', 18), creaSpesa('Pane', 3.5)];
console.log(formatEuro(totale(spese)));`,
    output: `21.50 €`,
    steps: [
      ['shared/money.js', 'Un modulo piccolo e condiviso: formattazione.'],
      ['features/spese/model.js', 'La creazione dei dati appartiene alla feature spese.'],
      ['features/spese/stats.js', 'I calcoli sono separati dalla presentazione.'],
      ['Import nominati', 'Chiarezza e tree shaking più efficace.'],
      ['composizione', 'Nessun modulo conosce l’intero sistema.'],
    ],
  },
  exercises: [
    fill({
      id: 'w8l8e1',
      title: 'Export nominato',
      prompt: 'Rendi `formatEuro` un export nominato (controllo statico).',
      starterCode: `function formatEuro(valore) {
  return valore.toFixed(2) + ' €';
}`,
      check: { kind: 'source', mustInclude: ['export function formatEuro'] },
      hints: ['Basta export davanti alla funzione.', 'export function formatEuro(valore)'],
      solution: `export function formatEuro(valore) {
  return valore.toFixed(2) + ' €';
}`,
      explanation: 'Gli export nominati rendono esplicito il confine pubblico del modulo.',
      concepts: ['struttura progetto'],
    }),
    guided({
      id: 'w8l8e2',
      title: 'Modulo senza effetti',
      prompt:
        'Il modulo deve esportare `doppio` senza eseguire nulla all’import: nessuna chiamata a console fuori dalla funzione.',
      starterCode: `export function doppio(n) {
  return n * 2;
}

// nessun console.log qui fuori`,
      check: { kind: 'source', mustInclude: ['export function doppio'], mustExclude: ['console.log'] },
      hints: ['Rimuovi qualsiasi console.log fuori dalla funzione.', 'Il controllo vieta console.log nel file.'],
      solution: `export function doppio(n) {
  return n * 2;
}`,
      explanation: 'I moduli senza effetti collaterali sono più sicuri da importare e facili da testare.',
      concepts: ['struttura progetto'],
    }),
    solo({
      id: 'w8l8e3',
      title: 'Import e uso',
      prompt:
        'Scrivi l’import di `totale` da `./stats.js` e `formatEuro` da `../shared/money.js`, poi stampa `30.00 €`.',
      starterCode: `// import
const spese = [{ importo: 10 }, { importo: 20 }];
console.log(formatEuro(totale(spese)));`,
      check: { kind: 'source', mustInclude: ['import { totale } from', 'import { formatEuro } from'] },
      hints: ['Due righe di import nominato.', 'I percorsi sono quelli indicati nel prompt.'],
      solution: `import { totale } from './stats.js';
import { formatEuro } from '../shared/money.js';

const spese = [{ importo: 10 }, { importo: 20 }];
console.log(formatEuro(totale(spese)));`,
      explanation: 'La direzione degli import racconta l’architettura: feature verso shared.',
      concepts: ['struttura progetto'],
    }),
    transfer({
      id: 'w8l8e4',
      title: 'Testabile senza DOM',
      prompt:
        'Scrivi `totalePari(numeri)` come funzione pura e verifica: con `[2, 5, 8]` deve stampare `10`.',
      starterCode: `// funzione pura + verifica`,
      objective: 'Scrivere logica testabile indipendente dall’interfaccia.',
      check: { kind: 'output', lines: ['10'] },
      hints: ['Nessun accesso al DOM.', 'filter(n => n % 2 === 0).reduce(...)'],
      solution: `function totalePari(numeri) {
  return numeri.filter((n) => n % 2 === 0).reduce((acc, n) => acc + n, 0);
}

console.log(totalePari([2, 5, 8]));`,
      explanation: 'Le funzioni pure si testano con input e output, senza browser.',
      concepts: ['test'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Effetti all’import',
      code: `// modulo.js
localStorage.setItem('inizializzato', 'true');
export const x = 1;`,
      error: `Il modulo tocca l’ambiente appena importato: test e SSR si rompono`,
      why: 'Gli effetti collaterali all’import rendono il modulo non prevedibile e difficile da testare.',
      fix: `export function inizializza() {
  localStorage.setItem('inizializzato', 'true');
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w8l8x1',
      prompt: 'Spiega come strutturare le cartelle di un progetto medio e perché gli export nominati aiutano il tree shaking.',
      keywords: ['struttura', 'feature', 'cartell', 'export', 'tree shaking', 'modul'],
      model:
        'Organizzo per funzionalità: ogni feature contiene modello, calcoli, storage e interfaccia, mentre utility condivise stanno in shared. Gli export nominati rendono esplicito cosa viene usato e permettono al bundler di eliminare ciò che non serve, cioè il tree shaking. Evito effetti collaterali all’import così i moduli restano prevedibili e testabili.',
      concepts: ['struttura progetto'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w8l8q1',
      question: 'Come organizzare un progetto per feature?',
      options: [
        ['Tutti i modelli in una cartella, tutte le UI in un’altra', 'Organizzazione per tipo: meno coesa.'],
        ['Ogni feature con modello, calcoli, storage e UI', 'Esatto.'],
        ['Tutti i file nella root', 'Non scala.'],
      ],
      correct: 1,
      explanation: 'La coesione per funzionalità riduce i salti tra cartelle.',
      concepts: ['struttura progetto'],
    }),
    quiz({
      id: 'w8l8q2',
      question: 'Cosa favorisce il tree shaking?',
      options: [
        ['Export nominati e assenza di effetti collaterali', 'Esatto.'],
        ['Export default ovunque', 'Non aiuta il refactoring.'],
        ['Un solo file enorme', 'Non aiuta.'],
      ],
      correct: 0,
      explanation: 'Il bundler può eliminare gli export inutilizzati.',
      concepts: ['struttura progetto'],
    }),
    quiz({
      id: 'w8l8q3',
      question: 'Perché evitare logica all’import di un modulo?',
      options: [
        ['Perché rende il modulo imprevedibile e difficile da testare', 'Esatto.'],
        ['Perché il browser lo vieta', 'Non lo vieta.'],
        ['Perché consuma memoria', 'Il problema è la prevedibilità.'],
      ],
      correct: 0,
      explanation: 'Importare non dovrebbe eseguire effetti.',
      concepts: ['test'],
    }),
  ],
  recap: {
    points: [
      'Struttura per feature, non per tipo.',
      'Export nominati e moduli senza effetti.',
      'Funzioni pure facili da testare.',
      'Le dipendenze puntano verso shared.',
    ],
    learned: 'Sai organizzare un progetto che resta leggibile crescendo.',
    next: 'Settimana 9: callback, Promise ed event loop.',
  },
});

export const week08 = makeWeek({
  id: W,
  number: 8,
  title: 'ES6+ avanzato',
  subtitle: 'Collezioni, iteratori, moduli e protocolli',
  description:
    'Gli strumenti che rendono il codice espressivo e modulare: Map, Set, generatori, moduli, riferimenti deboli e tagged template.',
  goals: [
    'Scegliere la collezione giusta',
    'Produrre valori con i generatori',
    'Dividere il codice in moduli',
    'Usare Symbol e tagged template con criterio',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — moduli',
    brief:
      'Il quaderno viene diviso in modello, statistiche, storage e interfaccia. Le statistiche usano Map e Set.',
    deliverable: 'Quattro moduli con API esplicite e nessuna dipendenza circolare.',
    milestones: [
      'Model con validazione',
      'Stats con Map e Set',
      'Storage isolato e testabile',
    ],
  },
  professional: {
    title: 'Strutturare un progetto reale',
    topics: [
      'Cartelle per feature',
      'Tree shaking ed export nominati',
      'Moduli senza effetti collaterali',
    ],
    exercise: 'Riorganizzare un file unico in quattro moduli con dipendenze in una sola direzione.',
  },
});
