import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-03';

const l1 = lesson(W, 1, {
  id: 'w3l1',
  title: 'Array: le basi',
  subtitle: 'Indici, length, push/pop, includes',
  minutes: 45,
  objectives: [
    'Creare e leggere un array',
    'Aggiungere e rimuovere elementi alle estremità',
    'Verificare la presenza di un valore',
  ],
  concepts: ['array', 'indici', 'metodi base'],
  activate: [
    'Devi conservare le spese di un mese: una variabile per ciascuna, o una sola variabile che le contiene tutte?',
    'Un array contiene una sequenza ordinata: un nome solo, tanti valori.',
  ],
  analogy:
    'Un array è un casellario numerato: ogni casella ha un indice, e il primo indice è 0. push aggiunge in fondo, pop toglie dal fondo, shift toglie dall’inizio, unshift aggiunge all’inizio. La lunghezza del casellario è length.',
  example: {
    code: `const spese = [12.5, 4, 30];

console.log(spese.length);
console.log(spese[0]);
console.log(spese[spese.length - 1]);

spese.push(9);
console.log(spese);`,
    output: `3
12.5
30
[12.5, 4, 30, 9]`,
  },
  formal:
    'Un array si crea con [elemento1, elemento2]. L’accesso avviene per indice, da 0 a length - 1. push aggiunge in coda e restituisce la nuova lunghezza; pop rimuove e restituisce l’ultimo; shift rimuove il primo; unshift aggiunge in testa. includes(valore) restituisce true/false. indexOf restituisce l’indice o -1. Gli array sono mutabili: push modifica l’originale.',
  worked: {
    code: `const carrello = ['pane', 'latte'];

carrello.push('caffè');
console.log(carrello);

const ultimo = carrello.pop();
console.log('Rimosso: ' + ultimo);
console.log(carrello);

carrello.unshift('mele');
console.log(carrello);

console.log('Contiene latte?', carrello.includes('latte'));
console.log('Indice di pane:', carrello.indexOf('pane'));`,
    output: `['pane', 'latte', 'caffè']
Rimosso: caffè
['pane', 'latte']
['mele', 'pane', 'latte']
Contiene latte? true
Indice di pane: 1`,
    steps: [
      ['const carrello = [\'pane\', \'latte\'];', 'Un array di stringhe: const impedisce la riassegnazione, non la mutazione.'],
      ['carrello.push(\'caffè\');', 'Aggiunge in coda: il carrello ora ha tre elementi.'],
      ['const ultimo = carrello.pop();', 'pop toglie l’ultimo e lo restituisce: “caffè”.'],
      ['carrello.unshift(\'mele\');', 'unshift aggiunge in testa: “mele” diventa l’indice 0.'],
      ['carrello.indexOf(\'pane\')', 'Dopo unshift, pane è al secondo posto: indice 1.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l1e1',
      title: 'Leggi l’ultimo',
      prompt: 'Stampa l’ultimo elemento senza scrivere l’indice a mano. Output: `30`.',
      starterCode: `const spese = [12.5, 4, 30];

console.log(spese[]);`,
      check: { kind: 'output', lines: ['30'] },
      hints: ['L’ultimo indice è length - 1.', 'spese[spese.length - 1]'],
      solution: `const spese = [12.5, 4, 30];
console.log(spese[spese.length - 1]);`,
      explanation: 'Usare length rende il codice robusto quando l’array cambia dimensione.',
      concepts: ['array', 'indici'],
    }),
    guided({
      id: 'w3l1e2',
      title: 'Aggiungi e conta',
      prompt: 'Aggiungi `45` al fondo e stampa prima la nuova lunghezza (`4`), poi l’elemento aggiunto.',
      starterCode: `const spese = [10, 20, 30];

// push e stampa
console.log(spese.length);
console.log();`,
      check: { kind: 'output', lines: ['4', '45'] },
      hints: ['push restituisce la nuova lunghezza, ma puoi leggerla con length.', 'L’elemento aggiunto è spese[3].'],
      solution: `const spese = [10, 20, 30];

spese.push(45);
console.log(spese.length);
console.log(spese[3]);`,
      explanation: 'push muta l’array e length si aggiorna: l’indice del nuovo elemento è 3.',
      concepts: ['metodi base'],
    }),
    solo({
      id: 'w3l1e3',
      title: 'Lista della spesa',
      prompt:
        'Crea `const lista = [\'latte\', \'pane\']`, aggiungi `\'uova\'` in coda, rimuovi il primo elemento e stampa l’array risultante. Output: `[\'pane\', \'uova\']` (formato console).',
      starterCode: `// scrivi da zero`,
      check: { kind: 'output', lines: ["['pane', 'uova']"] },
      hints: ['shift rimuove il primo elemento.', 'push aggiunge in coda.'],
      solution: `const lista = ['latte', 'pane'];
lista.push('uova');
lista.shift();
console.log(lista);`,
      explanation: 'La combinazione push + shift modifica l’array in place, mantenendo l’ordine.',
      concepts: ['metodi base'],
    }),
    transfer({
      id: 'w3l1e4',
      title: 'Controllo di presenza',
      prompt:
        'Stampa `true` se la lista contiene `\'pane\'` e `false` se contiene `\'burro\'`. Due righe, usando includes.',
      starterCode: `const lista = ['latte', 'pane', 'uova'];

// due console.log con includes`,
      objective: 'Usare includes per le verifiche, senza cicli scritti a mano.',
      check: { kind: 'output', lines: ['true', 'false'] },
      hints: ['includes restituisce un booleano.', 'lista.includes(\'burro\') è false.'],
      solution: `const lista = ['latte', 'pane', 'uova'];
console.log(lista.includes('pane'));
console.log(lista.includes('burro'));`,
      explanation: 'includes è un metodo di ricerca: più espressivo di un ciclo con if.',
      concepts: ['metodi base'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Indice fuori range',
      code: `const a = [1, 2, 3];
console.log(a[3]);`,
      error: `undefined`,
      why: 'Non esiste l’indice 3: l’array va da 0 a 2. Nessun errore, solo undefined, che poi rompe i calcoli a valle.',
      fix: `console.log(a[a.length - 1]);`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l1x1',
      prompt: 'Spiega perché il primo indice di un array è 0 e come usi length per accedere all’ultimo.',
      keywords: ['indice', 'zero', 'length', 'ultimo', 'array'],
      model:
        'Gli indici partono da 0 perché rappresentano l’offset dall’inizio: il primo elemento è a distanza zero. length è il numero di elementi, quindi l’ultimo indice valido è length - 1. Usare length - 1 evita di scrivere un numero fisso che si rompe quando l’array cambia.',
      concepts: ['indici'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l1q1',
      question: 'Cosa stampa `console.log([10, 20, 30].length)`?',
      options: [
        ['2', 'Gli indici arrivano a 2, ma gli elementi sono 3.'],
        ['3', 'Esatto: length conta gli elementi.'],
        ['30', '30 è l’ultimo elemento, non la lunghezza.'],
      ],
      correct: 1,
      explanation: 'length non è un indice: è la quantità di elementi.',
      concepts: ['array'],
    }),
    quiz({
      id: 'w3l1q2',
      question: 'Quale metodo aggiunge in fondo a un array?',
      options: [
        ['push', 'Esatto.'],
        ['pop', 'pop rimuove dal fondo.'],
        ['unshift', 'unshift aggiunge in testa.'],
      ],
      correct: 0,
      explanation: 'push aggiunge, pop rimuove: entrambi lavorano in coda.',
      concepts: ['metodi base'],
    }),
    quiz({
      id: 'w3l1q3',
      question: 'Cosa restituisce `[\'a\', \'b\'].includes(\'c\')`?',
      options: [
        ['-1', 'Quello è indexOf.'],
        ['false', 'Esatto: includes restituisce un booleano.'],
        ['undefined', 'Restituisce false, non undefined.'],
      ],
      correct: 1,
      explanation: 'includes: true/false. indexOf: indice o -1.',
      concepts: ['metodi base'],
    }),
  ],
  recap: {
    points: [
      'Array = sequenza ordinata, indici da 0.',
      'push/pop in coda, unshift/shift in testa.',
      'length è la quantità, l’ultimo indice è length - 1.',
      'includes per la presenza, indexOf per la posizione.',
    ],
    learned: 'Sai conservare e modificare una lista di valori.',
    next: 'La svolta: forEach e map, cioè elaborare ogni elemento senza cicli espliciti.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w3l2',
  title: 'forEach e map',
  subtitle: 'Iterare per effetto e trasformare per valore',
  minutes: 50,
  objectives: [
    'Distinguere forEach da map',
    'Usare map per trasformare una lista',
    'Capire che map restituisce un nuovo array',
  ],
  concepts: ['forEach', 'map', 'immutabilità'],
  activate: [
    'Hai una lista di prezzi e vuoi una lista di prezzi con IVA. Vuoi modificare l’originale o crearne una nuova?',
    'Creare una nuova lista è più sicuro: map fa esattamente questo.',
  ],
  analogy:
    'forEach è un giro di controllo: passi accanto a ogni elemento e fai qualcosa, ma non costruisci nulla di nuovo. map è una catena di montaggio: ogni elemento entra, viene trasformato e esce in un array nuovo, con la stessa lunghezza.',
  example: {
    code: `const prezzi = [10, 20, 30];

prezzi.forEach((prezzo) => {
  console.log('Prezzo: ' + prezzo);
});

const ivati = prezzi.map((prezzo) => prezzo * 1.22);
console.log(ivati);
console.log(prezzi);`,
    output: `Prezzo: 10
Prezzo: 20
Prezzo: 30
[12.2, 24.4, 36.6]
[10, 20, 30]`,
  },
  formal:
    'forEach(callback) esegue la callback per ogni elemento e restituisce undefined. map(callback) restituisce un nuovo array con i valori restituiti dalla callback, della stessa lunghezza. In entrambi la callback riceve (elemento, indice, array). map non modifica l’originale. Regola pratica: se ti serve un risultato, usa map; se ti serve un effetto (stampa, salvataggio), forEach.',
  worked: {
    code: `const prodotti = [
  { nome: 'Pane', prezzo: 3 },
  { nome: 'Latte', prezzo: 2 },
];

const etichette = prodotti.map((prodotto) => {
  return prodotto.nome + ': ' + prodotto.prezzo + ' €';
});

console.log(etichette);

prodotti.forEach((prodotto, indice) => {
  console.log(indice + ' - ' + prodotto.nome);
});`,
    output: `['Pane: 3 €', 'Latte: 2 €']
0 - Pane
1 - Latte`,
    steps: [
      ['prodotti.map((prodotto) => {', 'La callback riceve un elemento e restituisce la sua trasformazione.'],
      ['return prodotto.nome + \': \' + prodotto.prezzo + \' €\';', 'Il valore restituito finisce nel nuovo array.'],
      ['const etichette = ...', 'etichette è un nuovo array: prodotti resta intatto.'],
      ['prodotti.forEach((prodotto, indice) => {', 'forEach riceve anche l’indice come secondo parametro.'],
      ['console.log(indice + \' - \' + prodotto.nome);', 'Effetto collaterale: stampa, non costruisce un nuovo array.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l2e1',
      title: 'Raddoppia con map',
      prompt: 'Completa la map per ottenere `[2, 4, 6]`.',
      starterCode: `const numeri = [1, 2, 3];
const doppi = numeri.map((n) => );

console.log(doppi);`,
      check: { kind: 'output', lines: ['[2, 4, 6]'] },
      hints: ['La callback deve restituire n * 2.', 'Con return implicito basta l’espressione.'],
      solution: `const numeri = [1, 2, 3];
const doppi = numeri.map((n) => n * 2);

console.log(doppi);`,
      explanation: 'map costruisce un nuovo array con un valore per ogni elemento.',
      concepts: ['map'],
    }),
    guided({
      id: 'w3l2e2',
      title: 'Etichette di prezzo',
      prompt: 'Trasforma `[10, 20]` in `[\'10 €\', \'20 €\']` con map e un template literal.',
      starterCode: `const prezzi = [10, 20];

const etichette = prezzi.map((prezzo) => {
  // restituisci la stringa
});

console.log(etichette);`,
      check: { kind: 'output', lines: ["['10 €', '20 €']"] },
      hints: ['Il template literal è `${prezzo} €`.', 'Devi restituire la stringa.'],
      solution: `const prezzi = [10, 20];

const etichette = prezzi.map((prezzo) => \`\${prezzo} €\`);

console.log(etichette);`,
      explanation: 'La trasformazione può essere di tipo: da numeri a stringhe.',
      concepts: ['map'],
    }),
    solo({
      id: 'w3l2e3',
      title: 'forEach per stampare',
      prompt:
        'Con `const nomi = [\'Ada\', \'Linus\']`, stampa `Ciao, Ada!` e `Ciao, Linus!` usando forEach.',
      starterCode: `const nomi = ['Ada', 'Linus'];

// forEach`,
      check: { kind: 'output', lines: ['Ciao, Ada!', 'Ciao, Linus!'] },
      hints: ['La callback riceve un nome alla volta.', 'console.log(`Ciao, ${nome}!`)'],
      solution: `const nomi = ['Ada', 'Linus'];
nomi.forEach((nome) => {
  console.log(\`Ciao, \${nome}!\`);
});`,
      explanation: 'forEach è la scelta giusta quando devi solo produrre un effetto.',
      concepts: ['forEach'],
    }),
    transfer({
      id: 'w3l2e4',
      title: 'Prezzi con IVA',
      prompt:
        'Trasforma `[100, 50]` in `[122, 61]` con map (IVA 22%) e stampa sia il nuovo array sia quello originale.',
      starterCode: `const prezzi = [100, 50];

// map con IVA, poi stampa nuovo e originale`,
      objective: 'Verificare l’immutabilità: l’originale non cambia.',
      check: { kind: 'output', lines: ['[122, 61]', '[100, 50]'] },
      hints: ['prezzo * 1.22', 'Stampa prima il nuovo array, poi prezzi.'],
      solution: `const prezzi = [100, 50];
const ivati = prezzi.map((prezzo) => prezzo * 1.22);
console.log(ivati);
console.log(prezzi);`,
      explanation: 'map non tocca l’originale: la lista di partenza resta riutilizzabile.',
      concepts: ['map', 'immutabilità'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'map senza return',
      code: `const numeri = [1, 2, 3];
const doppi = numeri.map((n) => {
  n * 2;
});

console.log(doppi);`,
      error: `[undefined, undefined, undefined]`,
      why: 'La callback non restituisce nulla: map costruisce un array di undefined, senza errori visibili.',
      fix: `const doppi = numeri.map((n) => n * 2);`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l2x1',
      prompt: 'Spiega la differenza tra forEach e map e quando scegli l’uno o l’altro.',
      keywords: ['foreach', 'map', 'nuovo array', 'restitu', 'effetto', 'trasform'],
      model:
        'forEach esegue una funzione per ogni elemento e non restituisce nulla: serve per effetti come stampare o salvare. map restituisce un nuovo array con i valori prodotti dalla callback, della stessa lunghezza: serve per trasformare. Se mi serve un risultato da usare dopo, uso map; se devo solo fare qualcosa, forEach.',
      concepts: ['forEach', 'map'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l2q1',
      question: 'Cosa restituisce forEach?',
      options: [
        ['Un nuovo array', 'Quello è map.'],
        ['undefined', 'Esatto: forEach è pensato per gli effetti.'],
        ['La lunghezza dell’array', 'Alcuni metodi lo fanno, forEach no.'],
      ],
      correct: 1,
      explanation: 'forEach non restituisce un risultato utilizzabile.',
      concepts: ['forEach'],
    }),
    quiz({
      id: 'w3l2q2',
      question: 'Cosa stampa `[1, 2, 3].map((n) => n * 2)`?',
      options: [
        ['[1, 2, 3]', 'map non modifica l’originale.'],
        ['[2, 4, 6]', 'Esatto.'],
        ['6', 'map restituisce un array, non la somma.'],
      ],
      correct: 1,
      explanation: 'Ogni elemento viene trasformato e raccolto in un nuovo array.',
      concepts: ['map'],
    }),
    quiz({
      id: 'w3l2q3',
      question: 'Quale metodo è più adatto per stampare ogni elemento?',
      options: [
        ['map', 'Costruirebbe un array di undefined: inutile.'],
        ['forEach', 'Esatto: l’obiettivo è un effetto.'],
        ['filter', 'filter seleziona, non stampa.'],
      ],
      correct: 1,
      explanation: 'La scelta dipende dall’intenzione: risultato (map) o effetto (forEach).',
      concepts: ['forEach', 'map'],
    }),
  ],
  recap: {
    points: [
      'forEach non restituisce nulla: effetti.',
      'map restituisce un nuovo array: trasformazioni.',
      'La callback riceve elemento, indice, array.',
      'map non muta l’originale.',
    ],
    learned: 'Sai elaborare una lista senza scrivere cicli espliciti.',
    next: 'Selezionare invece di trasformare: filter e find.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w3l3',
  title: 'filter e find',
  subtitle: 'Scegliere elementi con un predicato',
  minutes: 45,
  objectives: [
    'Usare filter per selezionare elementi',
    'Usare find per il primo match',
    'Scrivere un predicato leggibile',
  ],
  concepts: ['filter', 'find', 'predicato'],
  activate: [
    'Da una lista di spese vuoi solo quelle sopra 20 euro. E vuoi solo la prima spesa di una certa categoria: sono la stessa operazione?',
    'No: una restituisce tutti i match, l’altra solo il primo.',
  ],
  analogy:
    'filter è un setaccio: passa solo ciò che soddisfa la condizione, e restituisce tutto il resto in una lista nuova. find è un metal detector: si ferma al primo oggetto trovato e lo restituisce così com’è.',
  example: {
    code: `const spese = [5, 25, 12, 40];

const grandi = spese.filter((spesa) => spesa > 20);
console.log(grandi);

const primaGrande = spese.find((spesa) => spesa > 20);
console.log(primaGrande);

console.log(spese);`,
    output: `[25, 40]
25
[5, 25, 12, 40]`,
  },
  formal:
    'filter(callback) restituisce un nuovo array con gli elementi per cui la callback è true. find(callback) restituisce il primo elemento che soddisfa la condizione, oppure undefined. Entrambi non modificano l’originale. La callback è un predicato: deve restituire un booleano (o qualcosa di truthy/falsy). Per verificare se esiste almeno un match si usa some, che vedremo più avanti.',
  worked: {
    code: `const spese = [
  { descrizione: 'Libro', importo: 18, categoria: 'studio' },
  { descrizione: 'Pranzo', importo: 12, categoria: 'cibo' },
  { descrizione: 'Corso', importo: 90, categoria: 'studio' },
];

const studio = spese.filter((spesa) => spesa.categoria === 'studio');
console.log(studio.length);

const primaCibo = spese.find((spesa) => spesa.categoria === 'cibo');
console.log(primaCibo.descrizione);

const sopra50 = spese.filter((spesa) => spesa.importo > 50);
console.log(sopra50.length);`,
    output: `2
Pranzo
1`,
    steps: [
      ['spesa.categoria === \'studio\'', 'Il predicato confronta una proprietà con un valore atteso.'],
      ['const studio = spese.filter(...)', 'Restituisce un array di oggetti, non di importi: filter conserva l’elemento intero.'],
      ['spese.find((spesa) => spesa.categoria === \'cibo\')', 'find si ferma al primo match: “Pranzo”.'],
      ['primaCibo.descrizione', 'Se nessun elemento corrisponde, find restituisce undefined: qui il match esiste.'],
      ['spese.filter((spesa) => spesa.importo > 50)', 'Condizione numerica: solo il corso supera 50.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l3e1',
      title: 'Solo i positivi',
      prompt: 'Completa il filter per ottenere `[1, 3]`.',
      starterCode: `const numeri = [-2, 1, -5, 3];
const positivi = numeri.filter((n) => );

console.log(positivi);`,
      check: { kind: 'output', lines: ['[1, 3]'] },
      hints: ['La condizione è n > 0.', 'Il predicato deve restituire un booleano.'],
      solution: `const numeri = [-2, 1, -5, 3];
const positivi = numeri.filter((n) => n > 0);

console.log(positivi);`,
      explanation: 'filter tiene solo gli elementi per cui il predicato è vero.',
      concepts: ['filter'],
    }),
    guided({
      id: 'w3l3e2',
      title: 'Primo sopra soglia',
      prompt: 'Trova e stampa la prima spesa maggiore di 15. Output: `25`.',
      starterCode: `const spese = [8, 25, 40];

// usa find
console.log();`,
      check: { kind: 'output', lines: ['25'] },
      hints: ['find restituisce il primo elemento che soddisfa la condizione.', 'spese.find((s) => s > 15)'],
      solution: `const spese = [8, 25, 40];
console.log(spese.find((s) => s > 15));`,
      explanation: 'find si ferma al primo match: 25, non 40.',
      concepts: ['find'],
    }),
    solo({
      id: 'w3l3e3',
      title: 'Filtra per categoria',
      prompt:
        'Da `[{n:\'A\', c:\'cibo\'}, {n:\'B\', c:\'casa\'}, {n:\'C\', c:\'cibo\'}]`, estrai i nomi delle spese di categoria `cibo` e stampali. Output: `A`, `C`.',
      starterCode: `const spese = [
  { n: 'A', c: 'cibo' },
  { n: 'B', c: 'casa' },
  { n: 'C', c: 'cibo' },
];

// filter + forEach`,
      check: { kind: 'output', lines: ['A', 'C'] },
      hints: ['Prima filter, poi forEach per stampare.', 'Puoi anche usare map + forEach.'],
      solution: `const spese = [
  { n: 'A', c: 'cibo' },
  { n: 'B', c: 'casa' },
  { n: 'C', c: 'cibo' },
];

spese.filter((spesa) => spesa.c === 'cibo').forEach((spesa) => console.log(spesa.n));`,
      explanation: 'Due passaggi chiari: selezionare e poi agire.',
      concepts: ['filter'],
    }),
    transfer({
      id: 'w3l3e4',
      title: 'Utente inesistente',
      prompt:
        'Cerca l’utente con id 99 in una lista che non lo contiene e stampa `Utente non trovato` usando ?? o un if.',
      starterCode: `const utenti = [{ id: 1, nome: 'Ada' }];

// find + fallback`,
      objective: 'Gestire il caso in cui find restituisce undefined.',
      check: { kind: 'output', lines: ['Utente non trovato'] },
      hints: ['find restituisce undefined se non trova nulla.', 'L’oggetto trovato?.nome ?? \'Utente non trovato\''],
      solution: `const utenti = [{ id: 1, nome: 'Ada' }];
const trovato = utenti.find((utente) => utente.id === 99);
console.log(trovato?.nome ?? 'Utente non trovato');`,
      explanation: 'find non lancia errori: restituisce undefined, quindi il caso va gestito esplicitamente.',
      concepts: ['find', '?? e ?.'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'filter non è find',
      code: `const numeri = [5, 12, 20];
const risultato = numeri.filter((n) => n > 10);
console.log(risultato);`,
      error: `[12, 20]`,
      why: 'Se ti serviva un solo valore, filter restituisce un array: usarlo come se fosse un numero produce confronti e calcoli sbagliati.',
      fix: `const risultato = numeri.find((n) => n > 10); // 12`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l3x1',
      prompt: 'Spiega la differenza tra filter e find e cosa restituisce find quando non trova nulla.',
      keywords: ['filter', 'find', 'array', 'primo', 'undefined', 'predicat'],
      model:
        'filter restituisce un nuovo array con tutti gli elementi che soddisfano il predicato. find restituisce il primo elemento che lo soddisfa, oppure undefined se nessuno lo soddisfa. Uso filter quando voglio una sottolista, find quando cerco un singolo elemento.',
      concepts: ['filter', 'find'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l3q1',
      question: 'Cosa restituisce `find` se nessun elemento corrisponde?',
      options: [
        ['Un array vuoto', 'Quello è filter.'],
        ['undefined', 'Esatto: va gestito con un fallback.'],
        ['null', 'null è un valore esplicito: find restituisce undefined.'],
      ],
      correct: 1,
      explanation: 'find restituisce undefined quando non trova match.',
      concepts: ['find'],
    }),
    quiz({
      id: 'w3l3q2',
      question: 'Quale metodo usi per ottenere tutte le spese sopra 20 €?',
      options: [
        ['find', 'Restituisce solo la prima.'],
        ['filter', 'Esatto.'],
        ['forEach', 'Non restituisce una lista filtrabile.'],
      ],
      correct: 1,
      explanation: 'Tutti i match = filter.',
      concepts: ['filter'],
    }),
    quiz({
      id: 'w3l3q3',
      question: 'Cosa stampa `[1, 2, 3].filter((n) => n > 1)`?',
      options: [
        ['2', 'filter restituisce un array.'],
        ['[2, 3]', 'Esatto.'],
        ['[1, 2, 3]', 'Il predicato esclude 1.'],
      ],
      correct: 1,
      explanation: 'filter conserva tutti gli elementi che soddisfano la condizione.',
      concepts: ['filter'],
    }),
  ],
  recap: {
    points: [
      'filter restituisce tutti i match in un array nuovo.',
      'find restituisce il primo match o undefined.',
      'Il predicato deve esprimere una condizione chiara.',
      'Nessuno dei due modifica l’originale.',
    ],
    learned: 'Sai selezionare dati da una lista con precisione.',
    next: 'Ridurre una lista a un solo valore: reduce.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w3l4',
  title: 'reduce',
  subtitle: 'Accumulatore, valore iniziale e raggruppamento',
  minutes: 60,
  objectives: [
    'Usare reduce con un accumulatore esplicito',
    'Scegliere sempre un valore iniziale',
    'Raggruppare elementi per chiave',
  ],
  concepts: ['reduce', 'accumulatore', 'raggruppamento'],
  activate: [
    'Hai imparato a sommare con un ciclo e un accumulatore. Dove vive quell’accumulatore? Può diventare un parametro?',
    'Sì: reduce astrae esattamente quel pattern — accumulatore, elemento, risultato.',
  ],
  analogy:
    'reduce è una centrifuga: a ogni giro riceve il risultato parziale e il nuovo elemento, e restituisce un nuovo parziale. Alla fine resta un solo valore: una somma, una media, un oggetto con i gruppi.',
  example: {
    code: `const numeri = [1, 2, 3, 4];

const somma = numeri.reduce((acc, n) => acc + n, 0);
console.log(somma);

const perCategoria = ['cibo', 'casa', 'cibo'].reduce((acc, cat) => {
  acc[cat] = (acc[cat] || 0) + 1;
  return acc;
}, {});

console.log(perCategoria);`,
    output: `10
{ cibo: 2, casa: 1 }`,
  },
  formal:
    'reduce((accumulatore, elemento, indice, array) => nuovoAccumulatore, valoreIniziale). Il valore iniziale è quasi sempre necessario: senza, reduce usa il primo elemento e parte dal secondo, e su un array vuoto lancia un errore. Il tipo dell’accumulatore può essere qualsiasi cosa: numero, stringa, array, oggetto. Per il raggruppamento si usa un oggetto e si aggiorna la chiave con (acc[chiave] || 0) + 1.',
  worked: {
    code: `const spese = [
  { categoria: 'cibo', importo: 12 },
  { categoria: 'casa', importo: 40 },
  { categoria: 'cibo', importo: 8 },
];

const totale = spese.reduce((acc, spesa) => acc + spesa.importo, 0);
console.log('Totale:', totale);

const perCategoria = spese.reduce((acc, spesa) => {
  acc[spesa.categoria] = (acc[spesa.categoria] || 0) + spesa.importo;
  return acc;
}, {});

console.log(perCategoria);`,
    output: `Totale: 60
{ cibo: 20, casa: 40 }`,
    steps: [
      ['reduce((acc, spesa) => acc + spesa.importo, 0)', 'acc parte da 0; a ogni giro diventa il totale parziale.'],
      ['acc + spesa.importo', 'Il valore restituito è il nuovo accumulatore.'],
      ['acc[spesa.categoria] = ...', 'L’accumulatore qui è un oggetto: accumula somme per chiave.'],
      ['(acc[spesa.categoria] || 0) + spesa.importo', 'Se la categoria non esiste ancora, parte da 0.'],
      ['return acc;', 'Obbligatorio: senza, il giro successivo riceve undefined.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l4e1',
      title: 'Somma con reduce',
      prompt: 'Completa la reduce per ottenere `15`.',
      starterCode: `const numeri = [1, 2, 3, 4, 5];
const totale = numeri.reduce((acc, n) => , 0);

console.log(totale);`,
      check: { kind: 'output', lines: ['15'] },
      hints: ['La callback deve restituire acc + n.', 'Non dimenticare il valore iniziale 0.'],
      solution: `const numeri = [1, 2, 3, 4, 5];
const totale = numeri.reduce((acc, n) => acc + n, 0);

console.log(totale);`,
      explanation: 'Il valore restituito dalla callback diventa l’accumulatore del giro successivo.',
      concepts: ['reduce', 'accumulatore'],
    }),
    guided({
      id: 'w3l4e2',
      title: 'Massimo con reduce',
      prompt: 'Trova il numero più grande con reduce (senza Math.max). Output: `9`.',
      starterCode: `const numeri = [3, 9, 2, 7];

const massimo = numeri.reduce((acc, n) => {
  // confronta e restituisci il maggiore
}, numeri[0]);

console.log(massimo);`,
      check: { kind: 'output', lines: ['9'] },
      hints: ['Se n > acc, il nuovo accumulatore è n, altrimenti acc.', 'Puoi usare un ternario: n > acc ? n : acc'],
      solution: `const numeri = [3, 9, 2, 7];

const massimo = numeri.reduce((acc, n) => (n > acc ? n : acc), numeri[0]);

console.log(massimo);`,
      explanation: 'L’accumulatore non deve essere una somma: qui porta con sé il massimo visto finora.',
      concepts: ['reduce'],
    }),
    solo({
      id: 'w3l4e3',
      title: 'Conta le categorie',
      prompt:
        'Con `[\'cibo\', \'casa\', \'cibo\']`, costruisci un oggetto di conteggi e stampa `{ cibo: 2, casa: 1 }`.',
      starterCode: `const categorie = ['cibo', 'casa', 'cibo'];

// reduce con accumulatore oggetto`,
      check: { kind: 'output', lines: ['{ cibo: 2, casa: 1 }'] },
      hints: [
        'Parti da un oggetto vuoto: {} come valore iniziale.',
        'acc[cat] = (acc[cat] || 0) + 1; poi return acc;',
      ],
      solution: `const categorie = ['cibo', 'casa', 'cibo'];

const conteggi = categorie.reduce((acc, cat) => {
  acc[cat] = (acc[cat] || 0) + 1;
  return acc;
}, {});

console.log(conteggi);`,
      explanation: 'Il raggruppamento con reduce è il pattern che userai per le statistiche del quaderno.',
      concepts: ['raggruppamento'],
    }),
    transfer({
      id: 'w3l4e4',
      title: 'Totale per categoria',
      prompt:
        'Con spese `[{c:\'cibo\', i:10}, {c:\'casa\', i:30}, {c:\'cibo\', i:5}]`, stampa `{ cibo: 15, casa: 30 }`.',
      starterCode: `const spese = [
  { c: 'cibo', i: 10 },
  { c: 'casa', i: 30 },
  { c: 'cibo', i: 5 },
];

// reduce che somma per categoria`,
      objective: 'Trasferire il raggruppamento da conteggio a somma.',
      check: { kind: 'output', lines: ['{ cibo: 15, casa: 30 }'] },
      hints: ['Come il conteggio, ma sommi spesa.i invece di 1.', 'acc[spesa.c] = (acc[spesa.c] || 0) + spesa.i'],
      solution: `const spese = [
  { c: 'cibo', i: 10 },
  { c: 'casa', i: 30 },
  { c: 'cibo', i: 5 },
];

const totali = spese.reduce((acc, spesa) => {
  acc[spesa.c] = (acc[spesa.c] || 0) + spesa.i;
  return acc;
}, {});

console.log(totali);`,
      explanation: 'Stesso schema, operazione diversa: il reduce è un modello, non un caso singolo.',
      concepts: ['raggruppamento', 'reduce'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Dimenticare il return nel reduce',
      code: `const totale = [1, 2, 3].reduce((acc, n) => {
  acc + n;
}, 0);
console.log(totale);`,
      error: `undefined`,
      why: 'La callback non restituisce nulla: al secondo giro acc è undefined e il risultato finale è undefined.',
      fix: `[1, 2, 3].reduce((acc, n) => acc + n, 0);`,
    }),
    contrast({
      title: 'reduce senza valore iniziale',
      code: `const totale = [].reduce((acc, n) => acc + n);
console.log(totale);`,
      error: `TypeError: Reduce of empty array with no initial value`,
      why: 'Senza valore iniziale reduce non sa da dove partire su un array vuoto.',
      fix: `[].reduce((acc, n) => acc + n, 0);`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l4x1',
      prompt: 'Spiega cos’è l’accumulatore in reduce e perché il valore iniziale è importante.',
      keywords: ['accumulator', 'valore iniziale', 'reduce', 'array vuoto', 'parzial', 'restitu'],
      model:
        'L’accumulatore è il risultato parziale che passa di giro in giro: parte dal valore iniziale e ogni callback lo trasforma. Il valore iniziale è importante perché definisce il tipo del risultato e perché senza di esso reduce usa il primo elemento come accumulatore, e su un array vuoto lancia un errore. Con 0 sommo, con {} raggruppo, con [] costruisco una lista.',
      concepts: ['reduce', 'accumulatore'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l4q1',
      question: 'Cosa restituisce `[1, 2, 3].reduce((acc, n) => acc + n, 10)`?',
      options: [
        ['6', 'Il valore iniziale fa parte del risultato.'],
        ['16', 'Esatto: 10 + 1 + 2 + 3.'],
        ['13', 'Sarebbe partendo da 7, non da 10.'],
      ],
      correct: 1,
      explanation: 'L’accumulatore parte dal valore iniziale.',
      concepts: ['reduce'],
    }),
    quiz({
      id: 'w3l4q2',
      question: 'Perché serve `return acc` nel reduce di raggruppamento?',
      options: [
        ['Perché altrimenti il giro successivo riceve undefined', 'Esatto: la callback definisce il nuovo accumulatore.'],
        ['Perché reduce richiede un return booleano', 'Il tipo dipende dall’accumulatore.'],
        ['Solo per leggibilità', 'Senza, il codice non funziona.'],
      ],
      correct: 0,
      explanation: 'Ogni giro deve consegnare il parziale aggiornato al giro successivo.',
      concepts: ['raggruppamento'],
    }),
    quiz({
      id: 'w3l4q3',
      question: 'Qual è un buon valore iniziale per contare occorrenze per categoria?',
      options: [
        ['0', 'Poi non potresti assegnare chiavi.'],
        ['{}', 'Esatto: un oggetto vuoto da riempire.'],
        ['[]', 'Un array non supporta chiavi nominali come proprietà.'],
      ],
      correct: 1,
      explanation: 'L’accumulatore deve avere la forma del risultato desiderato.',
      concepts: ['raggruppamento'],
    }),
  ],
  recap: {
    points: [
      'reduce porta un accumulatore attraverso la lista.',
      'Il valore iniziale definisce tipo e sicurezza.',
      'La callback deve restituire il nuovo accumulatore.',
      'Con un oggetto puoi raggruppare e sommare per chiave.',
    ],
    learned: 'Sai ridurre una lista a qualsiasi struttura ti serva.',
    next: 'Ordinare, tagliare e unire: sort, slice, spread e join.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w3l5',
  title: 'sort, slice, spread e join',
  subtitle: 'Ordinare senza mutare, copiare e comporre',
  minutes: 50,
  objectives: [
    'Ordinare numeri con un comparatore',
    'Copiare un array e tagliarlo con slice',
    'Unire e trasformare in stringa con spread e join',
  ],
  concepts: ['sort', 'slice', 'spread'],
  activate: [
    '`[10, 9, 100].sort()` produce `[10, 100, 9]`. Perché?',
    'Perché sort senza comparatore converte in stringhe e ordina alfabeticamente.',
  ],
  analogy:
    'sort è un ordinatore; slice è una fotocopiatrice che prende una porzione senza toccare l’originale; spread è un nastro trasportatore che riversa gli elementi in un nuovo contenitore; join è la colla che unisce gli elementi in una stringa.',
  example: {
    code: `const numeri = [10, 9, 100];

console.log([...numeri].sort((a, b) => a - b));
console.log(numeri.sort());
console.log(numeri.slice(0, 2));
console.log([0, ...numeri].join(' - '));`,
    output: `[9, 10, 100]
[10, 100, 9]
[10, 100]
0 - 10 - 100 - 9`,
  },
  formal:
    'sort() ordina in place convertendo in stringhe: per i numeri serve un comparatore (a, b) => a - b (crescente) o b - a (decrescente). slice(inizio, fine) restituisce una copia della porzione, fine esclusa, senza mutare l’originale. concat unisce array. Lo spread [...a, ...b] crea un nuovo array. join(separatore) unisce in stringa. reverse inverte in place: copia prima con [...a] se non vuoi mutare.',
  worked: {
    code: `const spese = [
  { descrizione: 'Libro', importo: 18 },
  { descrizione: 'Corso', importo: 90 },
  { descrizione: 'Pranzo', importo: 12 },
];

const ordinate = [...spese].sort((a, b) => b.importo - a.importo);
console.log(ordinate.map((s) => s.descrizione));

const primeDue = ordinate.slice(0, 2);
console.log(primeDue.length);

const descrizioni = ordinate.map((s) => s.descrizione).join(', ');
console.log(descrizioni);`,
    output: `['Corso', 'Libro', 'Pranzo']
2
Corso, Libro, Pranzo`,
    steps: [
      ['[...spese]', 'Copia superficiale: sort muta, quindi ordino la copia e lascio l’originale intatto.'],
      ['(a, b) => b.importo - a.importo', 'Comparatore decrescente: b - a mette i più grandi davanti.'],
      ['ordinate.slice(0, 2)', 'Prende i primi due elementi (indici 0 e 1), fine esclusa.'],
      ['ordinate.map(...).join(\', \')', 'map produce stringhe, join le unisce: catena di trasformazioni.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l5e1',
      title: 'Ordina i numeri',
      prompt: 'Ordina in modo crescente e stampa `[2, 5, 9]`.',
      starterCode: `const numeri = [9, 2, 5];
const ordinati = [...numeri].sort();

console.log(ordinati);`,
      check: { kind: 'output', lines: ['[2, 5, 9]'] },
      hints: ['Con numeri a una cifra funziona, ma il comparatore è la scelta corretta.', 'sort((a, b) => a - b)'],
      solution: `const numeri = [9, 2, 5];
const ordinati = [...numeri].sort((a, b) => a - b);

console.log(ordinati);`,
      explanation: 'Il comparatore rende l’ordinamento numerico e prevedibile.',
      concepts: ['sort'],
    }),
    guided({
      id: 'w3l5e2',
      title: 'Prendi una fetta',
      prompt: 'Stampa `[20, 30]` estraendo gli elementi centrali con slice, senza modificare l’array.',
      starterCode: `const valori = [10, 20, 30, 40];

// slice(1, 3)
console.log();`,
      check: { kind: 'output', lines: ['[20, 30]'] },
      hints: ['slice(inizio, fine) esclude la fine.', 'slice(1, 3) prende gli indici 1 e 2.'],
      solution: `const valori = [10, 20, 30, 40];
console.log(valori.slice(1, 3));`,
      explanation: 'slice restituisce una copia: l’originale resta di quattro elementi.',
      concepts: ['slice'],
    }),
    solo({
      id: 'w3l5e3',
      title: 'Unisci due liste',
      prompt: 'Unisci `[1, 2]` e `[3, 4]` con lo spread e stampa `[1, 2, 3, 4]`.',
      starterCode: `const a = [1, 2];
const b = [3, 4];

// spread`,
      check: { kind: 'output', lines: ['[1, 2, 3, 4]'] },
      hints: ['Crea un nuovo array: [...a, ...b].', 'Spread “apre” gli array dentro il nuovo contenitore.'],
      solution: `const a = [1, 2];
const b = [3, 4];
console.log([...a, ...b]);`,
      explanation: 'Lo spread è il modo moderno e non mutante di concatenare.',
      concepts: ['spread'],
    }),
    transfer({
      id: 'w3l5e4',
      title: 'Report in una riga',
      prompt: 'Da `[\'pane\', \'latte\', \'uova\']` produci `pane, latte, uova` con join e stampalo.',
      starterCode: `const lista = ['pane', 'latte', 'uova'];

// join`,
      objective: 'Comporre array e stringhe per l’output.',
      check: { kind: 'output', lines: ['pane, latte, uova'] },
      hints: ['join(\', \') usa virgola e spazio come separatore.', 'console.log(lista.join(\', \'))'],
      solution: `const lista = ['pane', 'latte', 'uova'];
console.log(lista.join(', '));`,
      explanation: 'join evita concatenazioni con cicli: un metodo, un risultato.',
      concepts: ['join'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'sort muta l’originale',
      code: `const originale = [3, 1, 2];
const ordinato = originale.sort();
console.log(originale);`,
      error: `[1, 2, 3] (l’originale è cambiato)`,
      why: 'sort ordina in place e restituisce lo stesso array: “ordinato” e “originale” sono lo stesso oggetto.',
      fix: `const ordinato = [...originale].sort();`,
    }),
    contrast({
      title: 'sort alfabetico sui numeri',
      code: `console.log([10, 9, 100].sort());`,
      error: `[10, 100, 9]`,
      why: 'Senza comparatore sort confronta le stringhe: “10” < “100” < “9” in ordine alfabetico.',
      fix: `[10, 9, 100].sort((a, b) => a - b);`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l5x1',
      prompt: 'Spiega perché `[10, 9, 100].sort()` dà un risultato inatteso e come si corregge.',
      keywords: ['sort', 'string', 'comparator', 'numer', 'a - b', 'alfabetic'],
      model:
        'Senza comparatore sort converte gli elementi in stringhe e li ordina alfabeticamente: “10” viene prima di “100” e “9” finisce in fondo. Per ordinare numericamente serve un comparatore che restituisca a - b per l’ordine crescente. Inoltre sort muta l’array, quindi se voglio preservare l’originale lo copio prima con lo spread.',
      concepts: ['sort'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l5q1',
      question: 'Quale comparatore ordina dal più grande al più piccolo?',
      options: [
        ['(a, b) => a - b', 'Questo ordina crescente.'],
        ['(a, b) => b - a', 'Esatto: inverso.'],
        ['(a, b) => a + b', 'La somma non è un criterio di ordinamento valido.'],
      ],
      correct: 1,
      explanation: 'Il segno del comparatore decide il verso.',
      concepts: ['sort'],
    }),
    quiz({
      id: 'w3l5q2',
      question: 'Cosa restituisce `[1, 2, 3, 4].slice(1, 3)`?',
      options: [
        ['[1, 2, 3]', 'La fine è esclusa e l’inizio è incluso.'],
        ['[2, 3]', 'Esatto.'],
        ['[2, 3, 4]', 'L’indice 3 è escluso.'],
      ],
      correct: 1,
      explanation: 'slice(inizio, fine): inizio incluso, fine esclusa.',
      concepts: ['slice'],
    }),
    quiz({
      id: 'w3l5q3',
      question: 'Cosa produce `[1, 2].join(\'-\')`?',
      options: [
        ['[1-2]', 'join restituisce una stringa.'],
        ['"1-2"', 'Esatto.'],
        ['"12"', 'Il separatore viene inserito tra gli elementi.'],
      ],
      correct: 1,
      explanation: 'join restituisce una stringa, non un array.',
      concepts: ['join'],
    }),
  ],
  recap: {
    points: [
      'sort senza comparatore ordina come stringhe e muta l’originale.',
      'slice è una copia di una porzione.',
      'Lo spread crea nuovi array senza mutare.',
      'join unisce in stringa con un separatore.',
    ],
    learned: 'Sai ordinare, copiare e comporre liste senza effetti collaterali.',
    next: 'Chaining, some, every e flat: lavorare su liste di liste.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w3l6',
  title: 'Chaining, some, every e flat',
  subtitle: 'Pipeline di trasformazioni e controlli aggregati',
  minutes: 55,
  objectives: [
    'Concatenare map, filter e reduce',
    'Usare some ed every per domande booleane',
    'Appiattire liste annidate con flat',
  ],
  concepts: ['chaining', 'some/every', 'flat'],
  activate: [
    'Vuoi sapere se almeno una spesa supera 100 euro, e se tutte sono sopra zero. Serve una lista filtrata o solo un sì/no?',
    'Solo un booleano: some ed every evitano di costruire array intermedi.',
  ],
  analogy:
    'Il chaining è una catena di montaggio: ogni stazione riceve il pezzo lavorato dalla precedente. some è un allarme che suona al primo caso; every è un controllo qualità che si ferma al primo difetto. flat schiaccia le scatole dentro le scatole.',
  example: {
    code: `const spese = [12, 45, 8, 120];

console.log(spese.filter((s) => s > 10).map((s) => s * 2));

console.log(spese.some((s) => s > 100));
console.log(spese.every((s) => s > 0));

const annidati = [[1, 2], [3, [4]]];
console.log(annidati.flat());
console.log(annidati.flat(2));`,
    output: `[24, 90, 240]
true
true
[1, 2, 3, [4]]
[1, 2, 3, 4]`,
  },
  formal:
    'Il chaining funziona perché ogni metodo restituisce un nuovo array: filter(...).map(...).reduce(...). some(callback) restituisce true se almeno un elemento soddisfa il predicato; every restituisce true se tutti lo soddisfano (e su un array vuoto è true). flat(profondità) appiattisce gli array annidati; flatMap unisce map + flat(1). Il chaining è leggibile se lo spezzi su più righe.',
  worked: {
    code: `const spese = [
  { categoria: 'cibo', importo: 12 },
  { categoria: 'casa', importo: 40 },
  { categoria: 'cibo', importo: 8 },
  { categoria: 'trasporti', importo: 25 },
];

const totaleCibo = spese
  .filter((spesa) => spesa.categoria === 'cibo')
  .map((spesa) => spesa.importo)
  .reduce((acc, importo) => acc + importo, 0);

console.log('Totale cibo:', totaleCibo);
console.log('Qualche spesa > 30?', spese.some((s) => s.importo > 30));
console.log('Tutte > 5?', spese.every((s) => s.importo > 5));`,
    output: `Totale cibo: 20
Qualche spesa > 30? true
Tutte > 5? true`,
    steps: [
      ['spese.filter(...)', 'Prima selezione: solo categoria cibo.'],
      ['  .map((spesa) => spesa.importo)', 'Poi trasformazione: da oggetti a numeri.'],
      ['  .reduce((acc, importo) => acc + importo, 0)', 'Infine aggregazione: la somma.'],
      ['spese.some((s) => s.importo > 30)', 'some si ferma al primo true: casa vale 40.'],
      ['spese.every((s) => s.importo > 5)', 'every richiede che tutte siano vere: qui lo sono.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l6e1',
      title: 'Almeno uno',
      prompt: 'Stampa `true` se c’è almeno un numero negativo in `[1, -2, 3]`.',
      starterCode: `const numeri = [1, -2, 3];

console.log(numeri.((n) => n < 0));`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['Il metodo che verifica “almeno uno” è some.', 'numeri.some(...)'],
      solution: `const numeri = [1, -2, 3];
console.log(numeri.some((n) => n < 0));`,
      explanation: 'some restituisce un booleano e si ferma al primo match.',
      concepts: ['some/every'],
    }),
    guided({
      id: 'w3l6e2',
      title: 'Tutti positivi',
      prompt: 'Stampa `false` perché non tutti i numeri sono positivi.',
      starterCode: `const numeri = [1, -2, 3];

// usa every
console.log();`,
      check: { kind: 'output', lines: ['false'] },
      hints: ['every verifica che tutti soddisfino la condizione.', 'numeri.every((n) => n > 0)'],
      solution: `const numeri = [1, -2, 3];
console.log(numeri.every((n) => n > 0));`,
      explanation: 'every si ferma al primo elemento che non soddisfa il predicato.',
      concepts: ['some/every'],
    }),
    solo({
      id: 'w3l6e3',
      title: 'Catena completa',
      prompt:
        'Da `[5, 12, 20, 3]`, tieni i maggiori di 10, raddoppiali e somma: stampa `64`.',
      starterCode: `const numeri = [5, 12, 20, 3];

// filter -> map -> reduce`,
      check: { kind: 'output', lines: ['64'] },
      hints: ['filter(n => n > 10) → [12, 20]', 'map(n => n * 2) → [24, 40], poi reduce a 0.'],
      solution: `const numeri = [5, 12, 20, 3];

const risultato = numeri
  .filter((n) => n > 10)
  .map((n) => n * 2)
  .reduce((acc, n) => acc + n, 0);

console.log(risultato);`,
      explanation: 'Ogni passaggio produce un nuovo array: la catena si legge dall’alto in basso.',
      concepts: ['chaining'],
    }),
    transfer({
      id: 'w3l6e4',
      title: 'Liste annidate',
      prompt: 'Appiattisci `[[1, 2], [3, [4, 5]]]` completamente e stampa `[1, 2, 3, 4, 5]`.',
      starterCode: `const annidati = [[1, 2], [3, [4, 5]]];

// flat con profondità sufficiente`,
      objective: 'Capire che flat ha una profondità e che flat(Infinity) appiattisce tutto.',
      check: { kind: 'output', lines: ['[1, 2, 3, 4, 5]'] },
      hints: ['flat(1) toglie un livello, qui ne servono 2.', 'Puoi usare flat(2) o flat(Infinity).'],
      solution: `const annidati = [[1, 2], [3, [4, 5]]];
console.log(annidati.flat(2));`,
      explanation: 'flat(profondità) controlla quanti livelli rimuovere: senza argomento ne rimuove uno.',
      concepts: ['flat'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'every su array vuoto',
      code: `console.log([].every((n) => n > 0));`,
      error: `true`,
      why: 'every è vero quando non esiste un controesempio: su una lista vuota non ce ne sono. Sembra strano, ma è coerente.',
      fix: `if (lista.length > 0 && lista.every(...)) { ... }`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l6x1',
      prompt: 'Spiega la differenza tra some ed every e cosa restituiscono su un array vuoto.',
      keywords: ['some', 'every', 'almeno', 'tutti', 'vuoto', 'booleano'],
      model:
        'some restituisce true se almeno un elemento soddisfa il predicato, every se tutti lo soddisfano. Su un array vuoto some è false perché non c’è nessun caso vero, mentre every è true perché non c’è nessun controesempio. Entrambi restituiscono un booleano e si fermano appena possono.',
      concepts: ['some/every'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l6q1',
      question: 'Cosa restituisce `[].some((n) => n > 0)`?',
      options: [
        ['true', 'some è true solo se esiste almeno un match.'],
        ['false', 'Esatto: nessun elemento soddisfa.'],
        ['undefined', 'some restituisce sempre un booleano.'],
      ],
      correct: 1,
      explanation: 'Nessun elemento = nessun match = false.',
      concepts: ['some/every'],
    }),
    quiz({
      id: 'w3l6q2',
      question: 'Cosa produce `[[1], [2, 3]].flat()`?',
      options: [
        ['[[1], [2, 3]]', 'Senza argomento flat rimuove un livello.'],
        ['[1, 2, 3]', 'Esatto.'],
        ['[1, [2, 3]]', 'Rimuove un livello da ciascun elemento.'],
      ],
      correct: 1,
      explanation: 'flat() di default appiattisce di un livello.',
      concepts: ['flat'],
    }),
    quiz({
      id: 'w3l6q3',
      question: 'Quale catena calcola la somma dei doppi dei numeri pari?',
      options: [
        ['filter pari → map doppio → reduce somma', 'Esatto.'],
        ['map doppio → filter pari → reduce somma', 'Funziona, ma filtreresti dopo aver trasformato: qui è equivalente, ma l’ordine conta in casi reali.'],
        ['reduce somma → filter pari', 'Dopo reduce hai un numero, non un array.'],
      ],
      correct: 0,
      explanation: 'L’ordine delle trasformazioni deve rispettare l’intenzione.',
      concepts: ['chaining'],
    }),
  ],
  recap: {
    points: [
      'Chaining: ogni metodo restituisce un array.',
      'some = almeno uno, every = tutti.',
      'flat appiattisce di un livello per default.',
      'Spezza le catene lunghe su più righe.',
    ],
    learned: 'Sai comporre pipeline di dati leggibili.',
    next: 'Ripasso e progetto: spese come oggetti e analisi per categoria.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w3l7',
  title: 'Ripasso e progetto',
  subtitle: 'Spese come oggetti, totali per categoria',
  minutes: 60,
  objectives: [
    'Combinare filter, map e reduce su dati reali',
    'Raggruppare importi per categoria',
    'Calcolare statistiche del Quaderno delle spese',
  ],
  concepts: ['ripasso', 'progetto', 'analisi dati'],
  activate: [
    'Senza guardare: cosa restituisce filter se nessun elemento passa? E find?',
    'filter restituisce [], find restituisce undefined. La differenza conta nel codice che scrivi.',
  ],
  analogy:
    'Il quaderno ora ragiona: non solo somma, ma chiede “quanto ho speso per il cibo?” e “qual è la spesa più grande?”. Sono domande che si rispondono con le pipeline.',
  example: {
    code: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const perCategoria = spese.reduce((acc, s) => {
  acc[s.cat] = (acc[s.cat] ?? 0) + s.importo;
  return acc;
}, {});

console.log(perCategoria);

const categoriaPiuCostosa = Object.entries(perCategoria).sort((a, b) => b[1] - a[1])[0];
console.log(categoriaPiuCostosa);`,
    output: `{ cibo: 20, casa: 40 }
['casa', 40]`,
  },
  formal:
    'Object.entries(oggetto) trasforma le proprietà in coppie [chiave, valore]. Ordinare le coppie e prendere la prima è il modo più diretto per trovare il massimo. Attenzione all’indice [0] su un array: se l’oggetto è vuoto, Object.entries restituisce [] e l’accesso è undefined.',
  worked: {
    code: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const totale = spese.reduce((acc, s) => acc + s.importo, 0);
const media = spese.length > 0 ? totale / spese.length : 0;
const massima = spese.reduce((max, s) => (s.importo > max.importo ? s : max), spese[0]);

console.log('Totale:', totale);
console.log('Media:', media.toFixed(2));
console.log('Massima:', massima.importo);

const categorie = [...new Set(spese.map((s) => s.cat))];
console.log('Categorie:', categorie.join(', '));`,
    output: `Totale: 60
Media: 20.00
Massima: 40
Categorie: cibo, casa`,
    steps: [
      ['reduce((acc, s) => acc + s.importo, 0)', 'La somma come sempre: l’accumulatore è un numero.'],
      ['spese.length > 0 ? ... : 0', 'Guardia contro la divisione per zero, in forma compatta.'],
      ['reduce((max, s) => (s.importo > max.importo ? s : max), spese[0])', 'Accumulatore oggetto: conserva l’intera spesa più grande.'],
      ['[...new Set(...)]', 'Set elimina i duplicati; lo spread lo riporta ad array.'],
      ['categorie.join(\', \')', 'Presentazione: da array a stringa leggibile.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l7e1',
      title: 'Totale con reduce',
      prompt: 'Calcola e stampa il totale `60` delle spese per importo.',
      starterCode: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const totale = spese.reduce((acc, s) => , 0);
console.log(totale);`,
      check: { kind: 'output', lines: ['60'] },
      hints: ['Somma s.importo.', 'acc + s.importo'],
      solution: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const totale = spese.reduce((acc, s) => acc + s.importo, 0);
console.log(totale);`,
      explanation: 'Oggetti nell’array, ma l’accumulatore resta un numero: il tipo dipende dall’obiettivo.',
      concepts: ['reduce'],
    }),
    guided({
      id: 'w3l7e2',
      title: 'Spese di una categoria',
      prompt: 'Calcola il totale della categoria `cibo` (atteso `20`) con filter + reduce.',
      starterCode: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

// filter + reduce
console.log();`,
      check: { kind: 'output', lines: ['20'] },
      hints: ['Prima filter su cat === \'cibo\'.', 'Poi reduce sull’array filtrato.'],
      solution: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const totaleCibo = spese
  .filter((s) => s.cat === 'cibo')
  .reduce((acc, s) => acc + s.importo, 0);

console.log(totaleCibo);`,
      explanation: 'Selezionare prima, aggregare dopo: la pipeline resta leggibile.',
      concepts: ['chaining'],
    }),
    solo({
      id: 'w3l7e3',
      title: 'Conteggio per categoria',
      prompt:
        'Stampa `{ cibo: 2, casa: 1 }` contando le spese per categoria.',
      starterCode: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

// reduce di conteggio`,
      check: { kind: 'output', lines: ['{ cibo: 2, casa: 1 }'] },
      hints: ['Accumulatore oggetto vuoto.', 'acc[s.cat] = (acc[s.cat] || 0) + 1'],
      solution: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const conteggi = spese.reduce((acc, s) => {
  acc[s.cat] = (acc[s.cat] || 0) + 1;
  return acc;
}, {});

console.log(conteggi);`,
      explanation: 'Il conteggio è il primo passo dell’analisi per categoria.',
      concepts: ['raggruppamento'],
    }),
    transfer({
      id: 'w3l7e4',
      title: 'Spesa più grande',
      prompt:
        'Trova e stampa l’importo della spesa più grande (atteso `40`) usando reduce o sort.',
      starterCode: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

// trova il massimo`,
      objective: 'Scegliere tra due strategie equivalenti e motivare la scelta.',
      check: { kind: 'output', lines: ['40'] },
      hints: [
        'Con reduce: confronta s.importo con acc.importo.',
        'Con sort: [...spese].sort((a, b) => b.importo - a.importo)[0].importo.',
      ],
      solution: `const spese = [
  { cat: 'cibo', importo: 12 },
  { cat: 'casa', importo: 40 },
  { cat: 'cibo', importo: 8 },
];

const massima = spese.reduce((max, s) => (s.importo > max.importo ? s : max), spese[0]);
console.log(massima.importo);`,
      explanation: 'reduce è O(n) e non muta; sort è più leggibile ma O(n log n). Su liste piccole conta la chiarezza.',
      concepts: ['reduce', 'sort'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Object.entries su oggetto vuoto',
      code: `const perCategoria = {};
const top = Object.entries(perCategoria).sort((a, b) => b[1] - a[1])[0];
console.log(top[0]);`,
      error: `TypeError: Cannot read properties of undefined (reading '0')`,
      why: 'Su un oggetto vuoto non c’è nessuna coppia: [0] è undefined e leggerne [0] fallisce.',
      fix: `const top = Object.entries(perCategoria).sort((a, b) => b[1] - a[1])[0];
if (top) console.log(top[0]);`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l7x1',
      prompt: 'Spiega come hai calcolato il totale per categoria e perché hai scelto quell’approccio.',
      keywords: ['reduce', 'categoria', 'accumulator', 'oggetto', 'chiave', 'somma'],
      model:
        'Ho usato reduce con un oggetto vuoto come valore iniziale: per ogni spesa ho letto la categoria e ho sommato l’importo alla chiave corrispondente, partendo da zero se la chiave non esisteva. Ogni giro restituisce l’oggetto aggiornato, così alla fine ottengo i totali per categoria in un unico passaggio.',
      concepts: ['raggruppamento'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l7q1',
      question: 'Cosa restituisce `[].filter(() => true)`?',
      options: [
        ['undefined', 'filter restituisce sempre un array.'],
        ['[]', 'Esatto.'],
        ['Errore', 'Nessun errore su un array vuoto.'],
      ],
      correct: 1,
      explanation: 'Nessun elemento che passa = array vuoto.',
      concepts: ['filter'],
    }),
    quiz({
      id: 'w3l7q2',
      question: 'Perché `[...new Set(array)]` elimina i duplicati?',
      options: [
        ['Perché Set accetta solo numeri', 'Accetta qualsiasi valore.'],
        ['Perché Set tiene valori unici e lo spread lo riconverte in array', 'Esatto.'],
        ['Perché sort rimuove i doppioni', 'sort non c’entra.'],
      ],
      correct: 1,
      explanation: 'Set deduplica per definizione; lo spread riporta ad array.',
      concepts: ['spread'],
    }),
    quiz({
      id: 'w3l7q3',
      question: 'Cosa stampa `[{i:1},{i:2}].map((x) => x.i).join(\'+\')`?',
      options: [
        ['"1+2"', 'Esatto.'],
        ['3', 'join restituisce una stringa, non una somma.'],
        ['"3"', 'Nessuna somma avviene: join unisce i valori.'],
      ],
      correct: 0,
      explanation: 'join unisce, non calcola: per sommare serve reduce.',
      concepts: ['join'],
    }),
  ],
  recap: {
    points: [
      'filter → map → reduce è la pipeline standard.',
      'Object.entries converte un oggetto in coppie.',
      'Set elimina i duplicati.',
      'Le guardie sui casi vuoti evitano TypeError.',
    ],
    learned: 'Il Quaderno delle spese analizza i dati per categoria.',
    next: 'Lato professionale: performance e leggibilità delle pipeline.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w3l8',
  title: 'Lato professionale e test',
  subtitle: 'Performance, immutabilità e verifica della settimana',
  minutes: 50,
  objectives: [
    'Riconoscere quando una pipeline è inefficiente',
    'Evitare mutazioni accidentali degli array',
    'Superare il test della settimana',
  ],
  concepts: ['performance', 'immutabilità', 'test'],
  activate: [
    'Su 10 elementi la performance non conta. Su 10.000, una catena di tre metodi può costare tre passaggi completi. Quando vale la pena ottimizzare?',
    'Solo dopo aver misurato: prima la chiarezza, poi la performance mirata.',
  ],
  analogy:
    'Una pipeline è una catena di montaggio: ogni stazione costa un passaggio. Se il pezzo è piccolo e le stazioni tante, il costo si somma. A volte conviene un solo giro (reduce) invece di tre stazioni.',
  example: {
    code: `const numeri = Array.from({ length: 5 }, (_, i) => i + 1);

const pipeline = numeri
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10)
  .reduce((acc, n) => acc + n, 0);

const unicoGiro = numeri.reduce((acc, n) => (n % 2 === 0 ? acc + n * 10 : acc), 0);

console.log(pipeline);
console.log(unicoGiro);`,
    output: `60
60`,
  },
  formal:
    'La maggior parte delle pipeline è abbastanza veloce: la chiarezza vince. Quando il dataset è grande o la funzione è chiamata spesso, un reduce singolo riduce i passaggi. L’immutabilità è più importante della micro-ottimizzazione: sort, reverse, push e splice mutano, quindi copia prima. Misura con performance.now() o DevTools prima di ottimizzare.',
  worked: {
    code: `const spese = [12, 40, 8];

const originale = [...spese];
const ordinate = spese.slice().sort((a, b) => b - a);

console.log(ordinate);
console.log(spese);

// Misura: piccola ma onesta
const inizio = performance.now();
let somma = 0;
for (let i = 0; i < 100000; i++) {
  somma += i;
}
console.log('Somma:', somma);
console.log('Tempo:', Math.round(performance.now() - inizio) + 'ms');`,
    output: `[40, 12, 8]
[12, 40, 8]
Somma: 4999950000
Tempo: 3ms`,
    steps: [
      ['const originale = [...spese];', 'Copia difensiva prima di qualsiasi operazione distruttiva.'],
      ['spese.slice().sort(...)', 'slice() senza argomenti è un’altra copia: sort lavora sulla copia.'],
      ['console.log(spese);', 'L’originale è intatto: nessun bug a distanza.'],
      ['performance.now()', 'Il modo standard per misurare un blocco di codice.'],
      ['Tempo:', 'Il valore varia a ogni esecuzione: non è un numero assoluto, è un ordine di grandezza.'],
    ],
  },
  exercises: [
    fill({
      id: 'w3l8e1',
      title: 'Copia prima di ordinare',
      prompt:
        'Ordina `spese` in modo decrescente senza mutare l’originale. Stampa prima l’array ordinato `[40, 12, 8]`, poi l’originale `[12, 40, 8]`.',
      starterCode: `const spese = [12, 40, 8];

const ordinate = spese.().sort((a, b) => b - a);

console.log(ordinate);
console.log(spese);`,
      check: { kind: 'output', lines: ['[40, 12, 8]', '[12, 40, 8]'] },
      hints: ['Serve una copia: slice() oppure [...spese].', 'spese.slice().sort(...)'],
      solution: `const spese = [12, 40, 8];

const ordinate = spese.slice().sort((a, b) => b - a);

console.log(ordinate);
console.log(spese);`,
      explanation: 'La copia protegge l’originale: è la regola d’oro delle pipeline.',
      concepts: ['immutabilità'],
    }),
    guided({
      id: 'w3l8e2',
      title: 'Un solo giro',
      prompt:
        'Ottieni `60` con un solo reduce: tieni i pari, moltiplica per 10 e somma. Non usare filter o map.',
      starterCode: `const numeri = [1, 2, 3, 4];

const totale = numeri.reduce((acc, n) => {
  // pari? acc + n * 10 : acc
}, 0);

console.log(totale);`,
      check: { kind: 'output', lines: ['60'] },
      hints: ['Un ternario dentro il reduce: n % 2 === 0.', 'Se pari acc + n * 10, altrimenti acc.'],
      solution: `const numeri = [1, 2, 3, 4];

const totale = numeri.reduce((acc, n) => (n % 2 === 0 ? acc + n * 10 : acc), 0);

console.log(totale);`,
      explanation: 'Un unico passaggio evita due array intermedi: utile su liste grandi.',
      concepts: ['performance', 'reduce'],
    }),
    solo({
      id: 'w3l8e3',
      title: 'Nessuna mutazione',
      prompt:
        'Aggiungi `4` a una copia di `[1, 2, 3]` e stampa la copia `[1, 2, 3, 4]` e l’originale `[1, 2, 3]`.',
      starterCode: `const originali = [1, 2, 3];

// copia + push`,
      check: { kind: 'output', lines: ['[1, 2, 3, 4]', '[1, 2, 3]'] },
      hints: ['Copia con spread: const copia = [...originali];', 'Poi copia.push(4).'],
      solution: `const originali = [1, 2, 3];
const copia = [...originali];
copia.push(4);
console.log(copia);
console.log(originali);`,
      explanation: 'push muta: applicarlo a una copia mantiene intatto il dato originale.',
      concepts: ['immutabilità'],
    }),
    transfer({
      id: 'w3l8e4',
      title: 'Top 2',
      prompt:
        'Da `[{n:\'a\',v:5},{n:\'b\',v:20},{n:\'c\',v:12}]`, stampa i nomi delle prime due voci per valore decrescente, separate da virgola: `b, c`.',
      starterCode: `const voci = [
  { n: 'a', v: 5 },
  { n: 'b', v: 20 },
  { n: 'c', v: 12 },
];

// sort su copia + slice + map + join`,
      objective: 'Comporre una pipeline completa con immutabilità.',
      check: { kind: 'output', lines: ['b, c'] },
      hints: [
        'Copia e ordina per v decrescente.',
        'slice(0, 2).map(v => v.n).join(\', \')',
      ],
      solution: `const voci = [
  { n: 'a', v: 5 },
  { n: 'b', v: 20 },
  { n: 'c', v: 12 },
];

const top = [...voci]
  .sort((x, y) => y.v - x.v)
  .slice(0, 2)
  .map((voce) => voce.n)
  .join(', ');

console.log(top);`,
      explanation: 'Copia, ordina, taglia, trasforma, unisci: ogni passaggio ha un solo compito.',
      concepts: ['chaining', 'immutabilità'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Mutazione a distanza',
      code: `const a = [3, 1, 2];
const b = a.sort();

console.log(a);
console.log(b);`,
      error: `[1, 2, 3]
[1, 2, 3]`,
      why: 'a e b puntano allo stesso array: sort ha mutato entrambi. Non è un errore di sintassi, è un alias.',
      fix: `const b = [...a].sort();`,
    }),
  ],
  explains: [
    explain({
      id: 'w3l8x1',
      prompt: 'Spiega perché è rischioso usare sort direttamente su un array ricevuto come parametro.',
      keywords: ['sort', 'muta', 'copia', 'effett', 'original', 'parametr'],
      model:
        'sort ordina in place: se lo applico a un array ricevuto come parametro, modifico il dato di chi me l’ha passato. Il chiamante non se lo aspetta e può avere bug difficili da trovare. La soluzione è copiare prima, con lo spread o slice, e ordinare la copia.',
      concepts: ['immutabilità'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w3l8q1',
      question: 'Quale metodo NON muta l’array?',
      options: [
        ['sort', 'sort muta in place.'],
        ['slice', 'Esatto: restituisce una copia.'],
        ['reverse', 'reverse inverte in place.'],
      ],
      correct: 1,
      explanation: 'slice è non distruttivo; sort e reverse mutano.',
      concepts: ['immutabilità'],
    }),
    quiz({
      id: 'w3l8q2',
      question: 'Quando conviene sostituire filter+map con un reduce unico?',
      options: [
        ['Sempre, è più elegante', 'Spesso è meno leggibile.'],
        ['Quando il dataset è grande o la funzione è critica per le performance', 'Esatto, dopo aver misurato.'],
        ['Mai', 'A volte è la scelta giusta.'],
      ],
      correct: 1,
      explanation: 'Prima si misura, poi si ottimizza dove serve.',
      concepts: ['performance'],
    }),
    quiz({
      id: 'w3l8q3',
      question: 'Cosa fa `performance.now()`?',
      options: [
        ['Restituisce l’ora corrente come stringa', 'Restituisce un timestamp numerico ad alta precisione.'],
        ['Misura il tempo in millisecondi per i benchmark', 'Esatto.'],
        ['Cancella la cache', 'Non ha nulla a che vedere con la cache.'],
      ],
      correct: 1,
      explanation: 'È lo strumento standard per misurare un blocco di codice.',
      concepts: ['performance'],
    }),
  ],
  recap: {
    points: [
      'La chiarezza precede l’ottimizzazione.',
      'sort e reverse mutano: copia prima.',
      'Un reduce unico può evitare array intermedi.',
      'Misura con performance.now() prima di cambiare.',
    ],
    learned: 'Sai scrivere pipeline corrette e consapevoli dei costi.',
    next: 'Settimana 4: gli oggetti, il modo in cui modellerai i dati veri.',
  },
});

export const week03 = makeWeek({
  id: W,
  number: 3,
  title: 'Array',
  subtitle: 'Liste, trasformazioni e analisi dei dati',
  description:
    'La settimana che cambia il modo di scrivere codice: niente più cicli a mano, ma pipeline leggibili su liste di dati reali.',
  goals: [
    'Leggere e modificare array',
    'Trasformare con map, selezionare con filter',
    'Aggregare e raggruppare con reduce',
    'Ordinare senza mutare',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — analisi per categoria',
    brief:
      'Le spese diventano oggetti con categoria e importo. Il quaderno calcola totali per categoria, media, massimo e conteggi.',
    deliverable: 'Un report che elenca i totali per categoria e la spesa più grande.',
    milestones: [
      'Spese come array di oggetti',
      'Totale per categoria con reduce',
      'Top spesa e categorie distinte',
    ],
  },
  professional: {
    title: 'Performance e immutabilità',
    topics: [
      'Quando una pipeline è troppo costosa',
      'Metodi che mutano e metodi che no',
      'Misurare prima di ottimizzare',
    ],
    exercise: 'Riscrivere una catena filter+map+reduce come singolo reduce e confrontare i tempi.',
  },
});
