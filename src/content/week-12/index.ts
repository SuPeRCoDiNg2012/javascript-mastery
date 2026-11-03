import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-12';

const l1 = lesson(W, 1, {
  id: 'w12l1',
  title: 'Architettura di una Todo App',
  subtitle: 'Stato, eventi e rendering in un’unica direzione',
  minutes: 55,
  objectives: [
    'Definire lo stato minimo dell’app',
    'Separare dati, azioni e rendering',
    'Progettare prima di scrivere',
  ],
  concepts: ['architettura', 'stato', 'rendering'],
  activate: [
    'Cosa deve contenere lo stato di una Todo App? Solo le cose che non puoi derivare.',
    'Le cose: id, testo, completata. I contatori e i filtri sono derivati.',
  ],
  analogy:
    'L’app è una redazione: lo stato è l’archivio, le azioni sono i giornalisti che lo aggiornano, il render è la stampa. La stampa non modifica l’archivio.',
  example: {
    code: `const stato = {
  todo: [
    { id: 1, testo: 'Studiare', completata: false },
    { id: 2, testo: 'Riposare', completata: true },
  ],
  filtro: 'tutte',
};

const derivati = {
  totale: stato.todo.length,
  completate: stato.todo.filter((t) => t.completata).length,
  visibili: stato.todo.filter((t) => stato.filtro === 'tutte' || (stato.filtro === 'attive' ? !t.completata : t.completata)),
};

console.log(derivati.totale);
console.log(derivati.completate);
console.log(derivati.visibili.length);`,
    output: `2
1
2`,
  },
  formal:
    'Lo stato contiene solo i dati primari: lista e filtro. Tutto il resto è derivato in fase di render: conteggi, liste filtrate, messaggi di stato vuoto. Le azioni sono funzioni che ricevono lo stato e restituiscono un nuovo stato (o lo mutano in modo controllato) e poi chiamano render. In questo modo il flusso è unidirezionale e prevedibile.',
  worked: {
    code: `function creaApp() {
  let stato = { todo: [], filtro: 'tutte', prossimoId: 1 };

  function aggiungi(testo) {
    const pulito = testo.trim();
    if (pulito.length === 0) return false;
    stato = {
      ...stato,
      todo: [...stato.todo, { id: stato.prossimoId, testo: pulito, completata: false }],
      prossimoId: stato.prossimoId + 1,
    };
    return true;
  }

  function toggle(id) {
    stato = {
      ...stato,
      todo: stato.todo.map((t) => (t.id === id ? { ...t, completata: !t.completata } : t)),
    };
  }

  return {
    aggiungi,
    toggle,
    get stato() {
      return stato;
    },
  };
}

const app = creaApp();
app.aggiungi('Studiare');
app.aggiungi('Riposare');
app.toggle(1);

console.log(app.stato.todo.length);
console.log(app.stato.todo[0].completata);
console.log(app.stato.todo[1].completata);`,
    output: `2
true
false`,
    steps: [
      ['let stato = { ... }', 'Lo stato è un unico oggetto: facile da serializzare e confrontare.'],
      ['aggiungi(testo)', 'Valida e crea un nuovo stato senza mutare l’originale.'],
      ['stato = { ...stato, todo: [...] }', 'Aggiornamento immutabile: il render può confrontare i riferimenti.'],
      ['toggle(id) con map', 'Trasforma solo l’elemento interessato.'],
      ['get stato()', 'Espone lo stato in sola lettura logica.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l1e1',
      title: 'Stato minimo',
      prompt: 'Crea lo stato iniziale con una lista vuota e stampa `0`.',
      starterCode: `const stato = {
  todo: [],
  filtro: 'tutte',
};

console.log(stato.todo.);`,
      check: { kind: 'output', lines: ['0'] },
      hints: ['length della lista.', 'stato.todo.length'],
      solution: `const stato = {
  todo: [],
  filtro: 'tutte',
};

console.log(stato.todo.length);`,
      explanation: 'Lo stato iniziale è esplicito e serializzabile.',
      concepts: ['stato'],
    }),
    guided({
      id: 'w12l1e2',
      title: 'Derivato',
      prompt: 'Calcola quante todo sono completate e stampa `1`.',
      starterCode: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

const completate = todo.((t) => t.completata);
console.log(completate.length);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['filter seleziona.', 'todo.filter(...)'],
      solution: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

const completate = todo.filter((t) => t.completata);
console.log(completate.length);`,
      explanation: 'I conteggi sono derivati: non si salvano nello stato.',
      concepts: ['rendering'],
    }),
    solo({
      id: 'w12l1e3',
      title: 'Aggiunta immutabile',
      prompt:
        'Aggiungi una todo a una lista esistente senza mutarla e stampa la lunghezza originale (`1`) e la nuova (`2`).',
      starterCode: `const todo = [{ id: 1, testo: 'a' }];

// nuovo array + nuovo stato
console.log(todo.length);
console.log();`,
      check: { kind: 'output', lines: ['1', '2'] },
      hints: ['const nuovo = [...todo, { id: 2, testo: \'b\' }];', 'Stampa nuovo.length.'],
      solution: `const todo = [{ id: 1, testo: 'a' }];

const nuovo = [...todo, { id: 2, testo: 'b' }];
console.log(todo.length);
console.log(nuovo.length);`,
      explanation: 'L’immutabilità rende prevedibile ogni aggiornamento.',
      concepts: ['architettura'],
    }),
    transfer({
      id: 'w12l1e4',
      title: 'Filtro derivato',
      prompt:
        'Con filtro `attive`, mostra solo le non completate e stampa `1`.',
      starterCode: `const stato = {
  filtro: 'attive',
  todo: [
    { testo: 'a', completata: true },
    { testo: 'b', completata: false },
  ],
};

const visibili = stato.todo.filter((t) =>
  stato.filtro === 'attive' ? !t.completata : true,
);

console.log();`,
      objective: 'Derivare la vista dallo stato senza duplicarlo.',
      check: { kind: 'output', lines: ['1'] },
      hints: ['Stampa visibili.length.', 'Il filtro è già applicato.'],
      solution: `const stato = {
  filtro: 'attive',
  todo: [
    { testo: 'a', completata: true },
    { testo: 'b', completata: false },
  ],
};

const visibili = stato.todo.filter((t) =>
  stato.filtro === 'attive' ? !t.completata : true,
);

console.log(visibili.length);`,
      explanation: 'La vista è una funzione dello stato, non uno stato separato.',
      concepts: ['rendering'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Stato duplicato',
      code: `const stato = {
  todo: [],
  totale: 0,
  completate: 0,
};`,
      error: `I contatori restano indietro appena dimentichi un aggiornamento`,
      why: 'I valori derivati salvati a parte divergono inevitabilmente dai dati.',
      fix: `const totale = stato.todo.length;
const completate = stato.todo.filter((t) => t.completata).length;`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l1x1',
      prompt: 'Spiega quali dati tieni nello stato di una Todo App e quali calcoli invece di salvare.',
      keywords: ['stato', 'derivat', 'contegg', 'filtro', 'lista', 'immutabil'],
      model:
        'Nello stato tengo solo i dati primari: la lista delle todo con id, testo e completata, più il filtro attivo. Conteggi, liste filtrate e messaggi di stato vuoto sono derivati e li calcolo nel render, così non possono divergere. Aggiorno lo stato in modo immutabile, creando nuovi array e oggetti, e poi ridisegno l’interfaccia.',
      concepts: ['architettura'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l1q1',
      question: 'Quale dato NON deve stare nello stato?',
      options: [
        ['Il testo di una todo', 'È un dato primario.'],
        ['Il numero di todo completate', 'È derivabile.'],
        ['Il filtro attivo', 'È uno stato dell’interfaccia.'],
      ],
      correct: 1,
      explanation: 'I derivati si calcolano, non si salvano.',
      concepts: ['stato'],
    }),
    quiz({
      id: 'w12l1q2',
      question: 'Perché aggiornare lo stato in modo immutabile?',
      options: [
        ['Per poter confrontare i riferimenti e ridisegnare in modo prevedibile', 'Esatto.'],
        ['Per consumare meno memoria', 'Consuma di più.'],
        ['Perché JavaScript lo impone', 'Non è obbligatorio.'],
      ],
      correct: 0,
      explanation: 'L’immutabilità rende il flusso prevedibile.',
      concepts: ['immutabilità'],
    }),
    quiz({
      id: 'w12l1q3',
      question: 'Cosa fa il render rispetto allo stato?',
      options: [
        ['Lo modifica', 'Non deve modificarlo.'],
        ['Lo legge e produce interfaccia', 'Esatto.'],
        ['Lo salva su disco', 'Quello è un’altra responsabilità.'],
      ],
      correct: 1,
      explanation: 'Render = proiezione dello stato.',
      concepts: ['rendering'],
    }),
  ],
  recap: {
    points: [
      'Stato minimo e serializzabile.',
      'Derivati calcolati, non salvati.',
      'Aggiornamenti immutabili.',
      'Render in una sola direzione.',
    ],
    learned: 'Hai il progetto della Todo App prima di scriverla.',
    next: 'Rendering dinamico e stato in azione.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w12l2',
  title: 'Rendering dinamico',
  subtitle: 'Una funzione che disegna lo stato',
  minutes: 55,
  objectives: [
    'Scrivere una funzione render completa',
    'Gestire gli stati vuoti e i filtri',
    'Evitare duplicazioni nel DOM',
  ],
  concepts: ['render', 'stato vuoto', 'filtri'],
  activate: [
    'Quante funzioni di rendering diverse servono per “tutte”, “attive” e “completate”?',
    'Una sola: cambia il filtro nello stato, non il codice di render.',
  ],
  analogy:
    'Il render è una stampante: riceve il documento (stato) e produce la pagina. Non decide cosa stampare: lo decide il documento.',
  example: {
    code: `const stato = {
  filtro: 'attive',
  todo: [
    { id: 1, testo: 'Studiare', completata: true },
    { id: 2, testo: 'Riposare', completata: false },
  ],
};

function visibili(stato) {
  if (stato.filtro === 'attive') return stato.todo.filter((t) => !t.completata);
  if (stato.filtro === 'completate') return stato.todo.filter((t) => t.completata);
  return stato.todo;
}

const lista = visibili(stato);
console.log(lista.length);
console.log(lista[0].testo);

const vuota = visibili({ filtro: 'attive', todo: [{ completata: true }] });
console.log(vuota.length === 0 ? 'Nessuna attività' : 'lista');`,
    output: `1
Riposare
Nessuna attività`,
  },
  formal:
    'Il render riceve lo stato, calcola i visibili, svuota il contenitore e ricrea i nodi. I filtri sono una funzione pura dallo stato alla lista. Lo stato vuoto ha sempre un messaggio. Con molti elementi si usa un DocumentFragment. Il render non deve leggere valori dal DOM: tutto ciò che serve viene dallo stato.',
  worked: {
    code: `const stato = {
  filtro: 'tutte',
  todo: [
    { id: 1, testo: 'Studiare', completata: false },
    { id: 2, testo: 'Riposare', completata: true },
  ],
};

function conta(stato) {
  return {
    totale: stato.todo.length,
    attive: stato.todo.filter((t) => !t.completata).length,
    completate: stato.todo.filter((t) => t.completata).length,
  };
}

function render(stato) {
  const c = conta(stato);
  const righe = [];
  righe.push('Totale: ' + c.totale);
  righe.push('Attive: ' + c.attive);
  righe.push('Completate: ' + c.completate);
  if (c.totale === 0) righe.push('Nessuna attività');
  return righe.join(' | ');
}

console.log(render(stato));
console.log(render({ filtro: 'tutte', todo: [] }));`,
    output: `Totale: 2 | Attive: 1 | Completate: 1
Totale: 0 | Attive: 0 | Completate: 0 | Nessuna attività`,
    steps: [
      ['function conta(stato)', 'Un solo posto per i derivati, riusabile dal render.'],
      ['function render(stato)', 'Nessuna variabile globale: tutto dipende dal parametro.'],
      ['c.totale === 0', 'Lo stato vuoto aggiunge un messaggio esplicito.'],
      ['return righe.join(...)', 'Il render restituisce dati pronti; il chiamante decide dove mostrarli.'],
      ['render({ todo: [] })', 'Lo stesso codice gestisce lo stato vuoto senza rami duplicati.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l2e1',
      title: 'Lista visibile',
      prompt: 'Filtra le attive e stampa `1`.',
      starterCode: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

const attive = todo.filter((t) => !t.completata);
console.log(attive.);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['length', 'attive.length'],
      solution: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

const attive = todo.filter((t) => !t.completata);
console.log(attive.length);`,
      explanation: 'Il filtro è una funzione pura sui dati.',
      concepts: ['filtri'],
    }),
    guided({
      id: 'w12l2e2',
      title: 'Stato vuoto',
      prompt: 'Con lista vuota e filtro attive, stampa `Nessuna attività`.',
      starterCode: `const stato = { filtro: 'attive', todo: [] };

const visibili = stato.filtro === 'attive' ? stato.todo.filter((t) => !t.completata) : stato.todo;

console.log(visibili.length === 0 ? '' : 'lista');`,
      check: { kind: 'output', lines: ['Nessuna attività'] },
      hints: ['Sostituisci la stringa vuota con il messaggio.', 'Va mostrato quando non ci sono visibili.'],
      solution: `const stato = { filtro: 'attive', todo: [] };

const visibili = stato.filtro === 'attive' ? stato.todo.filter((t) => !t.completata) : stato.todo;

console.log(visibili.length === 0 ? 'Nessuna attività' : 'lista');`,
      explanation: 'Lo stato vuoto dipende dai visibili, non dal totale.',
      concepts: ['stato vuoto'],
    }),
    solo({
      id: 'w12l2e3',
      title: 'Render di righe',
      prompt:
        'Renderizza due todo come `[x] a` e `[ ] b`, una per riga, in base a completata.',
      starterCode: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

// map + console.log
`,
      check: { kind: 'output', lines: ['[x] a', '[ ] b'] },
      hints: ['La stringa dipende da completata.', 'console.log((t.completata ? \'[x] \' : \'[ ] \') + t.testo)'],
      solution: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

todo.forEach((t) => {
  console.log((t.completata ? '[x] ' : '[ ] ') + t.testo);
});`,
      explanation: 'Il render traduce lo stato in rappresentazione, senza logica di business.',
      concepts: ['render'],
    }),
    transfer({
      id: 'w12l2e4',
      title: 'Un render per tutti i filtri',
      prompt:
        'Con filtro completate, stampa `1`; con tutte, stampa `2`.',
      starterCode: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

function visibili(filtro) {
  if (filtro === 'attive') return todo.filter((t) => !t.completata);
  if (filtro === 'completate') return todo.filter((t) => t.completata);
  return todo;
}

console.log();
console.log();`,
      objective: 'Un’unica funzione di filtro per tutte le viste.',
      check: { kind: 'output', lines: ['1', '2'] },
      hints: ['visibili(\'completate\').length', 'visibili(\'tutte\').length'],
      solution: `const todo = [
  { testo: 'a', completata: true },
  { testo: 'b', completata: false },
];

function visibili(filtro) {
  if (filtro === 'attive') return todo.filter((t) => !t.completata);
  if (filtro === 'completate') return todo.filter((t) => t.completata);
  return todo;
}

console.log(visibili('completate').length);
console.log(visibili('tutte').length);`,
      explanation: 'Il filtro è un parametro: il render non cambia.',
      concepts: ['filtri'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Render che legge il DOM',
      code: `function conta() {
  return document.querySelectorAll('#lista li').length;
}`,
      error: `Il conteggio ignora le todo non ancora renderizzate`,
      why: 'Il DOM è una proiezione parziale: la verità è nello stato.',
      fix: `const totale = stato.todo.length;`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l2x1',
      prompt: 'Spiega perché il render non deve leggere lo stato dal DOM.',
      keywords: ['render', 'dom', 'stato', 'proiezion', 'verità', 'derivat'],
      model:
        'Se il render legge dal DOM, il dato dipende da cosa è stato disegnato: una lista filtrata sembrerebbe più corta della realtà e i conteggi mentirebbero. Lo stato è la fonte di verità, il DOM è solo la sua proiezione. Il render calcola tutto dallo stato e poi ricostruisce i nodi, così ogni vista è coerente.',
      concepts: ['render'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l2q1',
      question: 'Da dove il render prende i dati?',
      options: [
        ['Dallo stato passato come parametro', 'Esatto.'],
        ['Dal DOM corrente', 'Sarebbe una proiezione parziale.'],
        ['Da variabili globali sparse', 'Rende il render imprevedibile.'],
      ],
      correct: 0,
      explanation: 'Render = funzione dello stato.',
      concepts: ['render'],
    }),
    quiz({
      id: 'w12l2q2',
      question: 'Quando mostri “Nessuna attività”?',
      options: [
        ['Quando la lista visibile è vuota', 'Esatto.'],
        ['Quando la lista totale è vuota', 'Con un filtro può essere vuota anche senza esserlo.'],
        ['Mai', 'L’utente non capirebbe.'],
      ],
      correct: 0,
      explanation: 'Lo stato vuoto dipende dalla vista.',
      concepts: ['stato vuoto'],
    }),
    quiz({
      id: 'w12l2q3',
      question: 'Quanti render servono per tre filtri?',
      options: [
        ['Uno', 'Esatto.'],
        ['Tre', 'Duplicherebbe la logica.'],
        ['Dipende dai dati', 'Non è necessario.'],
      ],
      correct: 0,
      explanation: 'Il filtro è un dato, non un ramo nel render.',
      concepts: ['filtri'],
    }),
  ],
  recap: {
    points: [
      'Render = funzione pura dello stato.',
      'Un solo render per tutti i filtri.',
      'Lo stato vuoto dipende dalla vista.',
      'Non leggere la verità dal DOM.',
    ],
    learned: 'Sai disegnare l’interfaccia da un unico stato.',
    next: 'Form, validazione ed errori nella Todo App.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w12l3',
  title: 'Form e validazione',
  subtitle: 'Inserire dati puliti e mostrare errori utili',
  minutes: 50,
  objectives: [
    'Validare l’input prima di aggiungere',
    'Mostrare errori accessibili',
    'Mantenere il testo in caso di errore',
  ],
  concepts: ['validazione', 'form', 'errori'],
  activate: [
    'Un utente inserisce una todo vuota. Cosa deve succedere?',
    'Un messaggio chiaro, il campo resta attivo e nulla viene aggiunto.',
  ],
  analogy:
    'La validazione è il filtro all’ingresso: nessun dato sporco entra nell’archivio, e chi è stato respinto sa perché.',
  example: {
    code: `function valida(testo, esistenti) {
  const pulito = testo.trim();

  if (pulito.length === 0) return { ok: false, errore: 'Scrivi qualcosa' };
  if (pulito.length > 80) return { ok: false, errore: 'Massimo 80 caratteri' };
  if (esistenti.some((t) => t.testo.toLowerCase() === pulito.toLowerCase())) {
    return { ok: false, errore: 'Attività già presente' };
  }

  return { ok: true, valore: pulito };
}

console.log(valida('', []).errore);
console.log(valida('Studiare', []).valore);
console.log(valida('studiare', [{ testo: 'Studiare' }]).errore);`,
    output: `Scrivi qualcosa
Studiare
Attività già presente`,
  },
  formal:
    'Una funzione di validazione restituisce un risultato strutturato: ok, valore normalizzato ed eventuale errore. La validazione vive fuori dal rendering e può essere testata da sola. Il messaggio va associato al campo con aria-describedby e mostrato senza cancellare l’input. Dopo un invio riuscito si svuota il campo e si riporta il focus.',
  worked: {
    code: `function creaValidatore(esistenti) {
  return (testo) => {
    const valore = testo.trim();
    if (valore.length < 2) return { ok: false, errore: 'Almeno 2 caratteri', campo: 'testo' };
    if (valore.length > 80) return { ok: false, errore: 'Massimo 80 caratteri', campo: 'testo' };
    const duplicato = esistenti.some((t) => t.toLowerCase() === valore.toLowerCase());
    if (duplicato) return { ok: false, errore: 'Già presente', campo: 'testo' };
    return { ok: true, valore };
  };
}

const valida = creaValidatore(['studiare']);

for (const input of ['', 'a', 'studiare', 'Riposare']) {
  const esito = valida(input);
  console.log(esito.ok ? 'ok: ' + esito.valore : 'errore: ' + esito.errore);
}`,
    output: `errore: Almeno 2 caratteri
errore: Almeno 2 caratteri
errore: Già presente
ok: Riposare`,
    steps: [
      ['creaValidatore(esistenti)', 'La validazione dipende dai dati correnti: una factory.'],
      ['return (testo) => ...', 'Restituisce una funzione pura e testabile.'],
      ['trim()', 'Normalizza prima di controllare.'],
      ['some(...toLowerCase())', 'Il confronto ignora maiuscole e minuscole.'],
      ['{ ok, valore | errore }', 'Risultato strutturato: il chiamante decide come mostrarlo.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l3e1',
      title: 'Campo vuoto',
      prompt: 'Valida l’input e stampa `Scrivi qualcosa` se è vuoto.',
      starterCode: `const testo = '   ';

const errore = testo.trim().length === 0 ? '' : null;
console.log(errore ?? 'ok');`,
      check: { kind: 'output', lines: ['Scrivi qualcosa'] },
      hints: ['La stringa del messaggio va nel ramo vuoto.', 'Usa \'Scrivi qualcosa\'.'],
      solution: `const testo = '   ';

const errore = testo.trim().length === 0 ? 'Scrivi qualcosa' : null;
console.log(errore ?? 'ok');`,
      explanation: 'trim considera uno spazio come campo vuoto.',
      concepts: ['validazione'],
    }),
    guided({
      id: 'w12l3e2',
      title: 'Lunghezza massima',
      prompt: 'Con testo di 5 caratteri e massimo 3, stampa `Massimo 3 caratteri`.',
      starterCode: `const testo = 'abcde';
const massimo = 3;

if (testo.length > massimo) {
  console.log();
}`,
      check: { kind: 'output', lines: ['Massimo 3 caratteri'] },
      hints: ['Usa il valore di massimo nella stringa.', '`Massimo ${massimo} caratteri`'],
      solution: `const testo = 'abcde';
const massimo = 3;

if (testo.length > massimo) {
  console.log(\`Massimo \${massimo} caratteri\`);
}`,
      explanation: 'Un messaggio che cita il limite è più utile di uno generico.',
      concepts: ['errori'],
    }),
    solo({
      id: 'w12l3e3',
      title: 'Duplicati',
      prompt:
        'Con `[\'studiare\']` e input `Studiare`, rileva il duplicato e stampa `Già presente`.',
      starterCode: `const esistenti = ['studiare'];
const input = 'Studiare';

// confronto case-insensitive`,
      check: { kind: 'output', lines: ['Già presente'] },
      hints: ['some + toLowerCase.', 'esistenti.some(t => t.toLowerCase() === input.toLowerCase())'],
      solution: `const esistenti = ['studiare'];
const input = 'Studiare';

const duplicato = esistenti.some((t) => t.toLowerCase() === input.toLowerCase());
if (duplicato) console.log('Già presente');`,
      explanation: 'La normalizzazione evita duplicati solo apparentemente diversi.',
      concepts: ['validazione'],
    }),
    transfer({
      id: 'w12l3e4',
      title: 'Risultato strutturato',
      prompt:
        'Scrivi `valida(testo)` che restituisce `{ ok, valore }` o `{ ok, errore }`. Con `\'a\'` stampa `errore: troppo corto`.',
      starterCode: `function valida(testo) {
  // minimo 2 caratteri
}

const esito = valida('a');
console.log(esito.ok ? 'ok' : 'errore: ' + esito.errore);`,
      objective: 'Restituire esiti strutturati invece di stampare dentro la validazione.',
      check: { kind: 'output', lines: ['errore: troppo corto'] },
      hints: ['Se testo.trim().length < 2 restituisci { ok: false, errore: \'troppo corto\' }.', 'Altrimenti { ok: true, valore }.'],
      solution: `function valida(testo) {
  const valore = testo.trim();
  if (valore.length < 2) return { ok: false, errore: 'troppo corto' };
  return { ok: true, valore };
}

const esito = valida('a');
console.log(esito.ok ? 'ok' : 'errore: ' + esito.errore);`,
      explanation: 'Il risultato strutturato rende la validazione riusabile e testabile.',
      concepts: ['errori'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Errore che cancella il campo',
      code: `if (testo.trim() === '') {
  input.value = '';
  mostraErrore();
}`,
      error: `L’utente perde ciò che aveva scritto e deve ricominciare`,
      why: 'L’errore deve aiutare a correggere, non distruggere l’input.',
      fix: `if (testo.trim() === '') {
  mostraErrore('Scrivi qualcosa');
  input.focus();
  return;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l3x1',
      prompt: 'Spiega come progetti una validazione che restituisce errori utili e non perde i dati.',
      keywords: ['valid', 'errore', 'struttur', 'input', 'messaggio', 'normalizz'],
      model:
        'La validazione normalizza l’input con trim e restituisce un oggetto con ok, valore oppure errore. Non stampa e non tocca il DOM: così è testabile. L’interfaccia mostra il messaggio, mantiene il testo e riporta il focus, poi svuota il campo solo dopo un successo. I messaggi citano il limite concreto, per esempio il numero massimo di caratteri.',
      concepts: ['validazione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l3q1',
      question: 'Cosa deve restituire una funzione di validazione?',
      options: [
        ['Un booleano', 'Perde il messaggio e il valore normalizzato.'],
        ['Un risultato strutturato con ok, valore o errore', 'Esatto.'],
        ['Niente', 'Serve un esito.'],
      ],
      correct: 1,
      explanation: 'Struttura esplicita, facile da usare e testare.',
      concepts: ['validazione'],
    }),
    quiz({
      id: 'w12l3q2',
      question: 'Cosa fai in caso di errore?',
      options: [
        ['Svuoti il campo', 'Perde il lavoro dell’utente.'],
        ['Mostri il messaggio e lasci il testo', 'Esatto.'],
        ['Ricarichi la pagina', 'Non serve.'],
      ],
      correct: 1,
      explanation: 'L’errore deve aiutare la correzione.',
      concepts: ['errori'],
    }),
    quiz({
      id: 'w12l3q3',
      question: 'Perché confrontare in lowercase per i duplicati?',
      options: [
        ['Per evitare duplicati solo apparentemente diversi', 'Esatto.'],
        ['Per ordinare alfabeticamente', 'Non c’entra.'],
        ['Per migliorare la performance', 'No: normalizza il testo per confrontarlo, non per performance.'],
      ],
      correct: 0,
      explanation: 'La normalizzazione è parte della validazione.',
      concepts: ['validazione'],
    }),
  ],
  recap: {
    points: [
      'Validazione pura e strutturata.',
      'Messaggi concreti e azionabili.',
      'Non cancellare l’input in caso di errore.',
      'Normalizza prima di confrontare.',
    ],
    learned: 'La Todo App accetta solo dati puliti.',
    next: 'Filtri, ricerca e ordinamento.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w12l4',
  title: 'Filtri, ricerca e ordinamento',
  subtitle: 'Una pipeline per la vista',
  minutes: 50,
  objectives: [
    'Combinare filtro e ricerca',
    'Ordinare senza mutare lo stato',
    'Evitare ricalcoli inutili',
  ],
  concepts: ['filtri', 'ricerca', 'ordinamento'],
  activate: [
    'Filtro per stato, ricerca per testo, ordinamento per data: quante funzioni scrivi?',
    'Una pipeline: filter, filter, sort su copia. Ogni passaggio ha un compito.',
  ],
  analogy:
    'La vista è un imbuto: entra la lista completa, passano il filtro di stato, poi la ricerca, poi l’ordinamento. Ciò che esce è esattamente ciò che l’utente vede.',
  example: {
    code: `const todo = [
  { testo: 'Studiare JS', completata: false, creato: 2 },
  { testo: 'Riposare', completata: true, creato: 3 },
  { testo: 'Studiare CSS', completata: false, creato: 1 },
];

const vista = todo
  .filter((t) => !t.completata)
  .filter((t) => t.testo.toLowerCase().includes('studiare'))
  .sort((a, b) => a.creato - b.creato)
  .map((t) => t.testo);

console.log(vista.length);
console.log(vista.join(' | '));
console.log(todo[0].testo);`,
    output: `2
Studiare CSS | Studiare JS
Studiare JS`,
  },
  formal:
    'La pipeline della vista è composta da trasformazioni pure: filter per stato, filter per ricerca (case-insensitive), sort su una copia e map per la presentazione. sort muta, quindi va applicato a [...lista]. Se il dataset è grande, si può calcolare una volta per render e memoizzare. La ricerca su testo normalizza con toLowerCase e trim.',
  worked: {
    code: `function vista(todo, { filtro = 'tutte', ricerca = '', ordine = 'creazione' } = {}) {
  const query = ricerca.trim().toLowerCase();

  const filtrate = todo.filter((t) => {
    if (filtro === 'attive' && t.completata) return false;
    if (filtro === 'completate' && !t.completata) return false;
    if (query && !t.testo.toLowerCase().includes(query)) return false;
    return true;
  });

  const copia = [...filtrate];
  if (ordine === 'alfabetico') {
    copia.sort((a, b) => a.testo.localeCompare(b.testo));
  } else {
    copia.sort((a, b) => a.creato - b.creato);
  }

  return copia;
}

const todo = [
  { testo: 'Zeta', completata: false, creato: 1 },
  { testo: 'Alfa', completata: false, creato: 2 },
  { testo: 'Beta', completata: true, creato: 3 },
];

console.log(vista(todo).length);
console.log(vista(todo, { ordine: 'alfabetico' }).map((t) => t.testo).join(','));
console.log(vista(todo, { filtro: 'attive', ricerca: 'a' }).length);`,
    output: `3
Alfa,Beta,Zeta
2`,
    steps: [
      ['const query = ricerca.trim().toLowerCase()', 'Normalizza una volta sola.'],
      ['filter con tre condizioni', 'Un solo passaggio invece di tre filter: più leggibile e più veloce.'],
      ['[...filtrate]', 'Copia prima di sort: lo stato resta intatto.'],
      ['localeCompare', 'Ordinamento alfabetico consapevole della lingua.'],
      ['vista(todo, { filtro: \'attive\', ricerca: \'a\' })', 'Le opzioni sono parametri, non varianti del codice.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l4e1',
      title: 'Filtro e ricerca',
      prompt: 'Filtra per testo contenente `js` (case-insensitive) e stampa `2`.',
      starterCode: `const todo = [
  { testo: 'Studiare JS' },
  { testo: 'CSS' },
  { testo: 'JS avanzato' },
];

const risultati = todo.filter((t) => t.testo.().includes('js'));
console.log(risultati.length);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Serve toLowerCase.', 't.testo.toLowerCase()'],
      solution: `const todo = [
  { testo: 'Studiare JS' },
  { testo: 'CSS' },
  { testo: 'JS avanzato' },
];

const risultati = todo.filter((t) => t.testo.toLowerCase().includes('js'));
console.log(risultati.length);`,
      explanation: 'La ricerca deve essere case-insensitive.',
      concepts: ['ricerca'],
    }),
    guided({
      id: 'w12l4e2',
      title: 'Ordina su copia',
      prompt: 'Ordina per `creato` senza mutare l’originale: stampa `1` e poi il primo testo `a`.',
      starterCode: `const todo = [
  { testo: 'b', creato: 2 },
  { testo: 'a', creato: 1 },
];

const ordinate = [...todo].sort((x, y) => x.creato - y.creato);

console.log(todo[0].creato);
console.log();`,
      check: { kind: 'output', lines: ['2', 'a'] },
      hints: ['Stampa ordinate[0].testo.', 'L’originale resta invariato.'],
      solution: `const todo = [
  { testo: 'b', creato: 2 },
  { testo: 'a', creato: 1 },
];

const ordinate = [...todo].sort((x, y) => x.creato - y.creato);

console.log(todo[0].creato);
console.log(ordinate[0].testo);`,
      explanation: 'La copia protegge lo stato: sort muta.',
      concepts: ['ordinamento'],
    }),
    solo({
      id: 'w12l4e3',
      title: 'Pipeline completa',
      prompt:
        'Da tre todo, tieni le attive, cerca `a`, ordina alfabeticamente e stampa i testi uniti: `Alfa`.',
      starterCode: `const todo = [
  { testo: 'Zeta', completata: false },
  { testo: 'Alfa', completata: false },
  { testo: 'Beta', completata: true },
];

// filter -> filter -> sort -> map -> join`,
      check: { kind: 'output', lines: ['Alfa'] },
      hints: ['La ricerca \'a\' esclude Zeta? No: Zeta non contiene a.', 'Tieni attive e contenenti a, poi ordina.'],
      solution: `const todo = [
  { testo: 'Zeta', completata: false },
  { testo: 'Alfa', completata: false },
  { testo: 'Beta', completata: true },
];

const testi = todo
  .filter((t) => !t.completata)
  .filter((t) => t.testo.toLowerCase().includes('a'))
  .sort((a, b) => a.testo.localeCompare(b.testo))
  .map((t) => t.testo);

console.log(testi.join(' | '));`,
      explanation: 'La pipeline rende la vista dichiarativa e componibile.',
      concepts: ['filtri'],
    }),
    transfer({
      id: 'w12l4e4',
      title: 'Opzioni della vista',
      prompt:
        'Implementa `vista(todo, opzioni)` con filtro e ricerca: con filtro attive e ricerca `a` su due attive (`Alfa`, `Beta`) stampa `2`.',
      starterCode: `const todo = [
  { testo: 'Alfa', completata: false },
  { testo: 'Beta', completata: false },
  { testo: 'Gamma', completata: true },
];

function vista(lista, { filtro = 'tutte', ricerca = '' } = {}) {
  // implementa
}

console.log(vista(todo, { filtro: 'attive', ricerca: 'a' }).length);`,
      objective: 'Un’unica funzione parametrica per tutte le viste.',
      check: { kind: 'output', lines: ['2'] },
      hints: ['Applica entrambi i filtri nella stessa filter.', 'La ricerca è case-insensitive.'],
      solution: `const todo = [
  { testo: 'Alfa', completata: false },
  { testo: 'Beta', completata: false },
  { testo: 'Gamma', completata: true },
];

function vista(lista, { filtro = 'tutte', ricerca = '' } = {}) {
  const query = ricerca.trim().toLowerCase();
  return lista.filter((t) => {
    if (filtro === 'attive' && t.completata) return false;
    if (filtro === 'completate' && !t.completata) return false;
    if (query && !t.testo.toLowerCase().includes(query)) return false;
    return true;
  });
}

console.log(vista(todo, { filtro: 'attive', ricerca: 'a' }).length);`,
      explanation: 'Le opzioni sostituiscono le varianti duplicate del codice.',
      concepts: ['filtri'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'sort sullo stato',
      code: `stato.todo.sort((a, b) => a.creato - b.creato);`,
      error: `L’ordine di salvataggio cambia e la lista originale non è più ripristinabile`,
      why: 'sort muta l’array dello stato: l’ordinamento della vista diventa permanente.',
      fix: `const vista = [...stato.todo].sort((a, b) => a.creato - b.creato);`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l4x1',
      prompt: 'Spiega come costruisci la vista combinando filtro, ricerca e ordinamento senza mutare lo stato.',
      keywords: ['filter', 'ricerca', 'sort', 'copia', 'stato', 'pipeline'],
      model:
        'Applico i filtri in un’unica funzione pura: stato della todo e testo cercato, normalizzato in lowercase. Poi copio l’array con lo spread e ordino la copia, perché sort muta. Infine trasformo in ciò che serve mostrare. Lo stato originale non viene mai toccato, quindi cambiare filtro o ordine è sempre reversibile.',
      concepts: ['ordinamento'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l4q1',
      question: 'Perché copiare prima di sort?',
      options: [
        ['Perché sort muta l’array', 'Esatto.'],
        ['Perché sort è lento', 'Non è il motivo.'],
        ['Perché sort non funziona sugli oggetti', 'Funziona.'],
      ],
      correct: 0,
      explanation: 'La vista non deve alterare lo stato.',
      concepts: ['ordinamento'],
    }),
    quiz({
      id: 'w12l4q2',
      question: 'Come rendi la ricerca case-insensitive?',
      options: [
        ['Con toLowerCase su entrambi i termini', 'Esatto.'],
        ['Con ===', 'Sarebbe case-sensitive.'],
        ['Con parseInt', 'Non c’entra.'],
      ],
      correct: 0,
      explanation: 'Normalizza prima del confronto.',
      concepts: ['ricerca'],
    }),
    quiz({
      id: 'w12l4q3',
      question: 'Quanti filter servono per stato e ricerca?',
      options: [
        ['Uno, con entrambe le condizioni', 'Esatto, più efficiente.'],
        ['Sempre due', 'Funziona ma è ridondante.'],
        ['Nessuno', 'Serve filtrare.'],
      ],
      correct: 0,
      explanation: 'Un solo passaggio con condizioni combinate.',
      concepts: ['filtri'],
    }),
  ],
  recap: {
    points: [
      'Pipeline: filtro, ricerca, ordinamento.',
      'sort su copia, mai sullo stato.',
      'Ricerca normalizzata.',
      'Opzioni invece di varianti duplicate.',
    ],
    learned: 'La vista è una funzione pura dei dati e delle preferenze.',
    next: 'Persistenza: la Todo App ricorda tutto.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w12l5',
  title: 'Persistenza della Todo App',
  subtitle: 'Salvare, migrare e ripristinare',
  minutes: 55,
  objectives: [
    'Salvare stato versionato',
    'Migrare un formato vecchio',
    'Ripristinare senza perdere dati',
  ],
  concepts: ['persistenza', 'migrazione', 'versione'],
  activate: [
    'Domani cambi la forma dei dati. I salvataggi esistenti devono continuare a funzionare. Come?',
    'Con una versione nel salvataggio e una funzione di migrazione.',
  ],
  analogy:
    'La migrazione è un traduttore: il documento vecchio viene letto e riscritto nel formato nuovo, senza perdere il contenuto.',
  example: {
    code: `function migra(dati) {
  if (!dati || typeof dati.versione !== 'number') return { versione: 2, todo: [] };
  if (dati.versione === 1) {
    return {
      versione: 2,
      todo: dati.items.map((testo) => ({ id: testo, testo, completata: false })),
    };
  }
  return dati;
}

const vecchio = { versione: 1, items: ['Studiare'] };
const nuovo = migra(vecchio);

console.log(nuovo.versione);
console.log(nuovo.todo[0].testo);
console.log(nuovo.todo[0].completata);`,
    output: `2
Studiare
false`,
  },
  formal:
    'Un salvataggio versionato permette di riconoscere il formato e migrarlo. La migrazione è una funzione pura che riceve i dati vecchi e restituisce quelli nuovi, con default per i campi mancanti. Va eseguita al caricamento, prima della validazione finale. Si conserva una copia del dato originale finché la migrazione non è verificata, per non perdere informazioni.',
  worked: {
    code: `function normalizza(dati) {
  if (!dati || typeof dati !== 'object') return { versione: 2, todo: [] };

  if (dati.versione === 1 && Array.isArray(dati.items)) {
    return {
      versione: 2,
      todo: dati.items.map((testo, i) => ({
        id: i + 1,
        testo: String(testo),
        completata: false,
      })),
    };
  }

  if (dati.versione === 2 && Array.isArray(dati.todo)) {
    return {
      versione: 2,
      todo: dati.todo
        .filter((t) => t && typeof t.testo === 'string')
        .map((t, i) => ({
          id: Number.isFinite(t.id) ? t.id : i + 1,
          testo: t.testo,
          completata: Boolean(t.completata),
        })),
    };
  }

  return { versione: 2, todo: [] };
}

console.log(normalizza({ versione: 1, items: ['a', 'b'] }).todo.length);
console.log(normalizza({ versione: 2, todo: [{ testo: 'x', completata: 1 }] }).todo[0].completata);
console.log(normalizza('rotto').todo.length);`,
    output: `2
true
0`,
    steps: [
      ['dati.versione === 1', 'Riconosce il formato vecchio e lo traduce.'],
      ['map((testo, i) => ...)', 'La migrazione crea gli id mancanti.'],
      ['versione === 2', 'Il formato corrente viene validato e normalizzato.'],
      ['Boolean(t.completata)', 'Converte valori non booleani in modo prevedibile.'],
      ['return { versione: 2, todo: [] }', 'Qualsiasi cosa inattesa produce uno stato valido.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l5e1',
      title: 'Versione',
      prompt: 'Migra il formato 1 a 2 e stampa la versione (`2`).',
      starterCode: `function migra(dati) {
  if (dati.versione === 1) {
    return { versione: 2, todo: dati.items.map((testo) => ({ testo, completata: false })) };
  }
  return dati;
}

console.log(migra({ versione: 1, items: [] }).);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['La proprietà della versione.', '.versione'],
      solution: `function migra(dati) {
  if (dati.versione === 1) {
    return { versione: 2, todo: dati.items.map((testo) => ({ testo, completata: false })) };
  }
  return dati;
}

console.log(migra({ versione: 1, items: [] }).versione);`,
      explanation: 'La versione guida la migrazione.',
      concepts: ['migrazione'],
    }),
    guided({
      id: 'w12l5e2',
      title: 'Migra gli item',
      prompt: 'Migra `items` in `todo` con testo e completata false: stampa `a`.',
      starterCode: `const vecchio = { versione: 1, items: ['a', 'b'] };

const nuovo = {
  versione: 2,
  todo: vecchio.items.map((testo) => ({ testo,  })),
};

console.log(nuovo.todo[0].testo);`,
      check: { kind: 'output', lines: ['a'] },
      hints: ['Ogni todo deve avere completata.', 'completata: false'],
      solution: `const vecchio = { versione: 1, items: ['a', 'b'] };

const nuovo = {
  versione: 2,
  todo: vecchio.items.map((testo) => ({ testo, completata: false })),
};

console.log(nuovo.todo[0].testo);`,
      explanation: 'La migrazione aggiunge i campi nuovi con default sicuri.',
      concepts: ['migrazione'],
    }),
    solo({
      id: 'w12l5e3',
      title: 'Normalizza il corrente',
      prompt:
        'Normalizza `{ versione: 2, todo: [{ testo: \'x\', completata: 1 }] }` e stampa `true`.',
      starterCode: `const dati = { versione: 2, todo: [{ testo: 'x', completata: 1 }] };

function normalizza(d) {
  // converti completata in booleano
}

console.log(normalizza(dati).todo[0].completata);`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['Boolean(1) è true.', 'Mappa i todo convertendo completata.'],
      solution: `const dati = { versione: 2, todo: [{ testo: 'x', completata: 1 }] };

function normalizza(d) {
  return {
    versione: 2,
    todo: d.todo.map((t) => ({ testo: t.testo, completata: Boolean(t.completata) })),
  };
}

console.log(normalizza(dati).todo[0].completata);`,
      explanation: 'Anche il formato corrente va validato: i dati possono essere manomessi.',
      concepts: ['persistenza'],
    }),
    transfer({
      id: 'w12l5e4',
      title: 'Fallback totale',
      prompt:
        'Con dati `null`, restituisci uno stato vuoto valido e stampa `0`.',
      starterCode: `function normalizza(d) {
  // gestisci null e forme inattese
}

console.log(normalizza(null).todo.length);`,
      objective: 'Un caricamento non deve mai produrre uno stato invalido.',
      check: { kind: 'output', lines: ['0'] },
      hints: ['Se !d restituisci { versione: 2, todo: [] }.', 'Stampa todo.length.'],
      solution: `function normalizza(d) {
  if (!d || typeof d !== 'object' || !Array.isArray(d.todo)) {
    return { versione: 2, todo: [] };
  }
  return d;
}

console.log(normalizza(null).todo.length);`,
      explanation: 'Fallback totale = app sempre avviabile.',
      concepts: ['persistenza'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Cambiare formato senza migrazione',
      code: `const todo = JSON.parse(localStorage.getItem('todo'));
console.log(todo[0].testo);`,
      error: `TypeError: Cannot read properties of undefined`,
      why: 'I salvataggi vecchi hanno un’altra forma: senza migrazione il codice nuova non li capisce.',
      fix: `const dati = normalizza(JSON.parse(localStorage.getItem('todo')));`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l5x1',
      prompt: 'Spiega come gestisci un cambio di formato nei dati salvati.',
      keywords: ['version', 'migrazion', 'formato', 'default', 'valid', 'fallback'],
      model:
        'Includo una versione nel salvataggio e, al caricamento, una funzione di migrazione che riconosce il formato e lo converte in quello corrente, aggiungendo default per i campi nuovi. Dopo la migrazione valido la forma e, se qualcosa non torna, restituisco uno stato vuoto valido. Così un cambio di formato non rompe i dati esistenti né l’avvio dell’app.',
      concepts: ['migrazione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l5q1',
      question: 'A cosa serve la versione nel salvataggio?',
      options: [
        ['A riconoscere il formato e migrarlo', 'Esatto.'],
        ['A contare le modifiche', 'Non è quello.'],
        ['A validare il JSON', 'JSON non la richiede.'],
      ],
      correct: 0,
      explanation: 'La versione è il contratto del formato.',
      concepts: ['versione'],
    }),
    quiz({
      id: 'w12l5q2',
      question: 'Cosa deve fare una migrazione con campi mancanti?',
      options: [
        ['Lasciarli undefined', 'Il codice nuovo fallirebbe.'],
        ['Applicare default sicuri', 'Esatto.'],
        ['Cancellare il salvataggio', 'Perdita di dati.'],
      ],
      correct: 1,
      explanation: 'I default rendono la migrazione non distruttiva.',
      concepts: ['migrazione'],
    }),
    quiz({
      id: 'w12l5q3',
      question: 'Cosa restituisci per dati inattesi?',
      options: [
        ['Un errore non gestito', 'L’app non partirebbe.'],
        ['Uno stato vuoto valido', 'Esatto.'],
        ['undefined', 'Sposta il problema.'],
      ],
      correct: 1,
      explanation: 'Il caricamento deve sempre produrre uno stato valido.',
      concepts: ['persistenza'],
    }),
  ],
  recap: {
    points: [
      'Versione nel salvataggio.',
      'Migrazione pura con default.',
      'Validazione anche del formato corrente.',
      'Fallback a stato vuoto valido.',
    ],
    learned: 'La Todo App sopravvive ai cambi di formato.',
    next: 'Testing e debugging del progetto.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w12l6',
  title: 'Testing e debugging',
  subtitle: 'Verificare la logica senza aprire il browser',
  minutes: 55,
  objectives: [
    'Scrivere test su funzioni pure',
    'Scegliere casi limite significativi',
    'Leggere un test fallito',
  ],
  concepts: ['test', 'casi limite', 'debug'],
  activate: [
    'Quali funzioni della Todo App puoi testare senza DOM?',
    'Validazione, filtri, ordinamento, migrazione: tutta la logica pura.',
  ],
  analogy:
    'I test sono i collaudatori: provano i casi normali e quelli limite, e ti dicono esattamente dove il comportamento non corrisponde alle attese.',
  example: {
    code: `function assertEqual(atteso, reale, messaggio) {
  if (atteso !== reale) {
    throw new Error(messaggio + ': atteso ' + atteso + ', ottenuto ' + reale);
  }
}

function visibili(todo, filtro) {
  if (filtro === 'attive') return todo.filter((t) => !t.completata);
  if (filtro === 'completate') return todo.filter((t) => t.completata);
  return todo;
}

const todo = [{ completata: true }, { completata: false }];
assertEqual(1, visibili(todo, 'attive').length, 'attive');
assertEqual(1, visibili(todo, 'completate').length, 'completate');
assertEqual(0, visibili([], 'tutte').length, 'vuoto');
console.log('Tutti i test passano');`,
    output: `Tutti i test passano`,
  },
  formal:
    'Un test ha tre parti: preparazione (arrange), azione (act), verifica (assert). Testare funzioni pure è semplice perché non servono DOM o rete. I casi limite più utili: lista vuota, valori mancanti, duplicati, testi con spazi, input non validi. Un test che fallisce mostra atteso e ottenuto: leggi prima quello, poi il codice. Non modificare il test per farlo passare se il comportamento atteso è corretto.',
  worked: {
    code: `function assertEqual(atteso, reale, nome) {
  if (JSON.stringify(atteso) !== JSON.stringify(reale)) {
    throw new Error(nome + ' — atteso ' + JSON.stringify(atteso) + ', ottenuto ' + JSON.stringify(reale));
  }
}

function valida(testo, esistenti) {
  const valore = String(testo).trim();
  if (valore.length < 2) return { ok: false };
  if (esistenti.some((t) => t.toLowerCase() === valore.toLowerCase())) return { ok: false };
  return { ok: true, valore };
}

assertEqual({ ok: false }, valida('a', []), 'troppo corto');
assertEqual(true, valida('  ab  ', []).valore === 'ab', 'trim');
assertEqual(false, valida('AB', ['ab']).ok, 'duplicato');

let falliti = 0;
try {
  assertEqual(1, 2, 'esempio');
} catch (errore) {
  falliti += 1;
}

console.log('Passati: 3');
console.log('Falliti: ' + falliti);`,
    output: `Passati: 3
Falliti: 1`,
    steps: [
      ['assertEqual(atteso, reale, nome)', 'Un assert minimo: confronto e messaggio utile.'],
      ['valida(\'a\', [])', 'Caso limite: testo troppo corto.'],
      ['valida(\'  ab  \', [])', 'Verifica la normalizzazione, non solo il caso felice.'],
      ['valida(\'AB\', [\'ab\'])', 'Verifica il confronto case-insensitive.'],
      ['try/catch sul test fallito', 'Un fallimento è un’informazione, non un disastro.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l6e1',
      title: 'Primo assert',
      prompt: 'Completa l’assert perché il test passi e stampi `ok`.',
      starterCode: `function assertEqual(atteso, reale) {
  if (atteso !== reale) throw new Error('fallito');
}

assertEqual(2 + 2, );
console.log('ok');`,
      check: { kind: 'output', lines: ['ok'] },
      hints: ['Devi passare il valore reale 4.', 'assertEqual(4, 4)'],
      solution: `function assertEqual(atteso, reale) {
  if (atteso !== reale) throw new Error('fallito');
}

assertEqual(2 + 2, 4);
console.log('ok');`,
      explanation: 'Un test verifica un comportamento atteso con un confronto esplicito.',
      concepts: ['test'],
    }),
    guided({
      id: 'w12l6e2',
      title: 'Caso limite',
      prompt: 'Verifica che una lista vuota produca `0` visibili e stampa `0`.',
      starterCode: `function visibili(todo, filtro) {
  return filtro === 'attive' ? todo.filter((t) => !t.completata) : todo;
}

const risultato = visibili([], 'attive').length;
console.log();`,
      check: { kind: 'output', lines: ['0'] },
      hints: ['Stampa il risultato.', 'console.log(risultato)'],
      solution: `function visibili(todo, filtro) {
  return filtro === 'attive' ? todo.filter((t) => !t.completata) : todo;
}

const risultato = visibili([], 'attive').length;
console.log(risultato);`,
      explanation: 'La lista vuota è il caso limite più frequente e più trascurato.',
      concepts: ['casi limite'],
    }),
    solo({
      id: 'w12l6e3',
      title: 'Test che fallisce',
      prompt:
        'Cattura un test fallito e stampa il messaggio `atteso 3, ottenuto 2`.',
      starterCode: `function assertEqual(atteso, reale) {
  if (atteso !== reale) throw new Error('atteso ' + atteso + ', ottenuto ' + reale);
}

try {
  assertEqual(3, 2);
} catch (e) {
  // stampa
}`,
      check: { kind: 'output', lines: ['atteso 3, ottenuto 2'] },
      hints: ['Stampa e.message.', 'Il messaggio contiene già i valori.'],
      solution: `function assertEqual(atteso, reale) {
  if (atteso !== reale) throw new Error('atteso ' + atteso + ', ottenuto ' + reale);
}

try {
  assertEqual(3, 2);
} catch (e) {
  console.log(e.message);
}`,
      explanation: 'Il messaggio di fallimento deve dire atteso e ottenuto.',
      concepts: ['debug'],
    }),
    transfer({
      id: 'w12l6e4',
      title: 'Test della validazione',
      prompt:
        'Testa `valida` con tre casi (vuoto, valido, duplicato) e stampa `3`.',
      starterCode: `function valida(testo, esistenti) {
  const v = String(testo).trim();
  if (v.length < 2) return false;
  if (esistenti.includes(v)) return false;
  return true;
}

let passati = 0;
// tre assert manuali con if
console.log();`,
      objective: 'Coprire caso normale e casi limite senza framework.',
      check: { kind: 'output', lines: ['3'] },
      hints: ['if (valida(\'\', []) === false) passati++.', 'Aggiungi altri due casi.'],
      solution: `function valida(testo, esistenti) {
  const v = String(testo).trim();
  if (v.length < 2) return false;
  if (esistenti.includes(v)) return false;
  return true;
}

let passati = 0;
if (valida('', []) === false) passati++;
if (valida('ab', []) === true) passati++;
if (valida('ab', ['ab']) === false) passati++;

console.log(passati);`,
      explanation: 'Tre casi ben scelti coprono la maggior parte dei bug di validazione.',
      concepts: ['test'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Test modificato per farlo passare',
      code: `assertEqual(3, somma(1, 1)); // fallisce
// "aggiusto" il test
assertEqual(2, somma(1, 1));`,
      error: `Il test passa ma il bug resta: somma(1,1) doveva fare 3? No, il test era sbagliato?`,
      why: 'Se il comportamento atteso è corretto, il test non va cambiato: va corretto il codice.',
      fix: `// verifica l'aspettativa, poi correggi l'implementazione`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l6x1',
      prompt: 'Spiega come scrivi un test utile e quali casi limite scegli per una Todo App.',
      keywords: ['test', 'assert', 'caso limite', 'vuoto', 'duplicat', 'atteso'],
      model:
        'Un test prepara i dati, esegue la funzione e confronta il risultato con l’atteso, con un messaggio che mostra entrambi. Per una Todo App scelgo lista vuota, testo con soli spazi, duplicati con maiuscole diverse e testo troppo lungo: sono i casi in cui la logica si rompe più spesso. Se un test fallisce e l’atteso è corretto, correggo il codice, mai il test.',
      concepts: ['test'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l6q1',
      question: 'Quali funzioni sono più facili da testare?',
      options: [
        ['Quelle pure, senza DOM o rete', 'Esatto.'],
        ['Quelle che leggono il DOM', 'Richiedono un ambiente.'],
        ['Quelle che usano setTimeout', 'Richiedono attese.'],
      ],
      correct: 0,
      explanation: 'Input e output espliciti.',
      concepts: ['test'],
    }),
    quiz({
      id: 'w12l6q2',
      question: 'Cosa deve mostrare un test fallito?',
      options: [
        ['Solo “fallito”', 'Inutile.'],
        ['Atteso e ottenuto', 'Esatto.'],
        ['Lo stack completo sempre', 'Utile ma non sufficiente da solo.'],
      ],
      correct: 1,
      explanation: 'La differenza è l’informazione chiave.',
      concepts: ['debug'],
    }),
    quiz({
      id: 'w12l6q3',
      question: 'Qual è un caso limite importante?',
      options: [
        ['Lista vuota', 'Esatto.'],
        ['Solo il caso felice', 'Non basta.'],
        ['Un testo qualsiasi', 'Poco significativo.'],
      ],
      correct: 0,
      explanation: 'I limiti rivelano i bug.',
      concepts: ['casi limite'],
    }),
  ],
  recap: {
    points: [
      'Arrange, act, assert.',
      'Testa prima di tutto le funzioni pure.',
      'Casi limite: vuoto, duplicati, spazi.',
      'Non piegare il test al bug.',
    ],
    learned: 'Sai verificare la logica senza aprire il browser.',
    next: 'Il progetto completo, pezzo per pezzo.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w12l7',
  title: 'Il progetto completo',
  subtitle: 'Todo App: dalla struttura all’ultimo dettaglio',
  minutes: 60,
  objectives: [
    'Integrare stato, render, eventi e persistenza',
    'Gestire il ciclo completo di una todo',
    'Chiudere i dettagli di accessibilità',
  ],
  concepts: ['progetto', 'integrazione', 'accessibilità'],
  activate: [
    'Quali pezzi hai già costruito che puoi riusare nella Todo App?',
    'Quasi tutti: stato, render, validazione, filtri, storage. Il progetto è la loro composizione.',
  ],
  analogy:
    'Il progetto finale è un’orchestra: ogni strumento è stato provato da solo, ora suonano insieme. Il direttore è il flusso unidirezionale dei dati.',
  example: {
    code: `function creaTodoApp(initial = []) {
  let stato = { todo: initial, filtro: 'tutte', prossimoId: initial.length + 1 };

  const visibili = () =>
    stato.todo.filter((t) => {
      if (stato.filtro === 'attive') return !t.completata;
      if (stato.filtro === 'completate') return t.completata;
      return true;
    });

  return {
    aggiungi(testo) {
      const valore = testo.trim();
      if (!valore) return { ok: false, errore: 'Vuoto' };
      const duplicato = stato.todo.some((t) => t.testo.toLowerCase() === valore.toLowerCase());
      if (duplicato) return { ok: false, errore: 'Duplicato' };
      stato = {
        ...stato,
        todo: [...stato.todo, { id: stato.prossimoId, testo: valore, completata: false }],
        prossimoId: stato.prossimoId + 1,
      };
      return { ok: true };
    },
    toggle(id) {
      stato = {
        ...stato,
        todo: stato.todo.map((t) => (t.id === id ? { ...t, completata: !t.completata } : t)),
      };
    },
    rimuovi(id) {
      stato = { ...stato, todo: stato.todo.filter((t) => t.id !== id) };
    },
    setFiltro(filtro) {
      stato = { ...stato, filtro };
    },
    get visibili() {
      return visibili();
    },
    get totale() {
      return stato.todo.length;
    },
  };
}

const app = creaTodoApp();
app.aggiungi('Studiare');
app.aggiungi('Riposare');
app.toggle(1);
app.setFiltro('attive');

console.log(app.totale);
console.log(app.visibili.length);
console.log(app.aggiungi('').errore);`,
    output: `2
1
Vuoto`,
  },
  formal:
    'La Todo App completa compone: stato unico, azioni che producono un nuovo stato, derivati calcolati, render che ricostruisce la lista, eventi delegati, form validato, persistenza versionata e messaggi di stato vuoto. I dettagli che fanno la differenza: focus visibile, etichette, aria-live per gli aggiornamenti, testi alternativi per i pulsanti icona.',
  worked: {
    code: `function creaApp() {
  let stato = { todo: [], filtro: 'tutte', prossimoId: 1 };

  function aggiorna(patch) {
    stato = { ...stato, ...patch };
  }

  function aggiungi(testo) {
    const valore = testo.trim();
    if (valore.length < 2) return { ok: false, errore: 'Almeno 2 caratteri' };
    if (stato.todo.some((t) => t.testo.toLowerCase() === valore.toLowerCase())) {
      return { ok: false, errore: 'Già presente' };
    }
    aggiorna({
      todo: [...stato.todo, { id: stato.prossimoId, testo: valore, completata: false }],
      prossimoId: stato.prossimoId + 1,
    });
    return { ok: true };
  }

  function conta() {
    return {
      totale: stato.todo.length,
      attive: stato.todo.filter((t) => !t.completata).length,
      completate: stato.todo.filter((t) => t.completata).length,
    };
  }

  function seriale() {
    return JSON.stringify({ versione: 2, todo: stato.todo });
  }

  return { aggiungi, conta, seriale, get stato() { return stato; } };
}

const app = creaApp();
app.aggiungi('Studiare');
app.aggiungi('Riposare');
console.log(app.conta().attive);
console.log(JSON.parse(app.seriale()).versione);
console.log(app.aggiungi('studiare').errore);`,
    output: `2
2
Già presente`,
    steps: [
      ['let stato = { ... }', 'Un unico stato per tutta la vista.'],
      ['aggiorna(patch)', 'Un solo punto di aggiornamento immutabile.'],
      ['aggiungi con validazione', 'Nessun dato invalido entra nello stato.'],
      ['conta()', 'I derivati hanno un nome e un posto.'],
      ['seriale()', 'La persistenza è una funzione a sé, testabile.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l7e1',
      title: 'Toggle',
      prompt: 'Completa `toggle` e stampa `true`.',
      starterCode: `const app = {
  todo: [{ id: 1, completata: false }],
  toggle(id) {
    this.todo = this.todo.map((t) => (t.id === id ? { ...t, : !t.completata } : t));
  },
};

app.toggle(1);
console.log(app.todo[0].completata);`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['La proprietà è completata.', 'completata: !t.completata'],
      solution: `const app = {
  todo: [{ id: 1, completata: false }],
  toggle(id) {
    this.todo = this.todo.map((t) => (t.id === id ? { ...t, completata: !t.completata } : t));
  },
};

app.toggle(1);
console.log(app.todo[0].completata);`,
      explanation: 'L’aggiornamento immutabile mantiene solo l’elemento interessato.',
      concepts: ['integrazione'],
    }),
    guided({
      id: 'w12l7e2',
      title: 'Rimuovi',
      prompt: 'Rimuovi l’elemento con id 1 e stampa `1`.',
      starterCode: `let todo = [{ id: 1 }, { id: 2 }];

todo = todo.( (t) => t.id !== 1 );

console.log(todo.length);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['Serve filter.', 'todo.filter(...)'],
      solution: `let todo = [{ id: 1 }, { id: 2 }];

todo = todo.filter((t) => t.id !== 1);

console.log(todo.length);`,
      explanation: 'Rimuovere è filtrare per esclusione, senza mutare.',
      concepts: ['integrazione'],
    }),
    solo({
      id: 'w12l7e3',
      title: 'Contatori',
      prompt:
        'Con due todo (una completata), stampa `2`, `1`, `1`.',
      starterCode: `const todo = [
  { completata: false },
  { completata: true },
];

const conta = {
  totale: todo.length,
  attive: todo.filter((t) => !t.completata).length,
  completate: todo.filter((t) => t.completata).length,
};

// stampa i tre valori`,
      check: { kind: 'output', lines: ['2', '1', '1'] },
      hints: ['Stampa conta.totale, conta.attive, conta.completate.', 'Tre console.log.'],
      solution: `const todo = [
  { completata: false },
  { completata: true },
];

const conta = {
  totale: todo.length,
  attive: todo.filter((t) => !t.completata).length,
  completate: todo.filter((t) => t.completata).length,
};

console.log(conta.totale);
console.log(conta.attive);
console.log(conta.completate);`,
      explanation: 'I contatori sono derivati e coerenti per costruzione.',
      concepts: ['integrazione'],
    }),
    transfer({
      id: 'w12l7e4',
      title: 'Stato serializzato',
      prompt:
        'Serializza lo stato con versione 2 e rileggi il numero di todo (`1`).',
      starterCode: `const stato = { todo: [{ id: 1, testo: 'a' }] };

const json = JSON.stringify({ versione: 2, todo: stato.todo });
const riletto = JSON.parse(json);

console.log();`,
      objective: 'Chiudere il ciclo di persistenza del progetto.',
      check: { kind: 'output', lines: ['1'] },
      hints: ['Leggi riletto.todo.length.', 'La versione è già inclusa.'],
      solution: `const stato = { todo: [{ id: 1, testo: 'a' }] };

const json = JSON.stringify({ versione: 2, todo: stato.todo });
const riletto = JSON.parse(json);

console.log(riletto.todo.length);`,
      explanation: 'Serializzazione e versione chiudono il ciclo del progetto.',
      concepts: ['progetto'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Filtro salvato nello stato sbagliato',
      code: `stato.todo = stato.todo.filter((t) => !t.completata);`,
      error: `Le todo completate spariscono per sempre`,
      why: 'Stai applicando il filtro della vista allo stato: i dati vengono distrutti.',
      fix: `const visibili = stato.todo.filter((t) => !t.completata);`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l7x1',
      prompt: 'Riassumi l’architettura della Todo App e il percorso di un’azione dall’utente allo schermo.',
      keywords: ['stato', 'azione', 'render', 'valid', 'persistenza', 'derivat'],
      model:
        'L’utente compie un’azione, per esempio invia il form. Il gestore valida, produce un nuovo stato immutabile e invalida la cache. Poi chiama render, che ricalcola i derivati e ricostruisce la lista dal nuovo stato. Infine salva lo stato versionato nello storage. Ogni passo ha una sola responsabilità e lo stato resta l’unica fonte di verità.',
      concepts: ['progetto'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l7q1',
      question: 'Cosa succede dopo un’azione valida?',
      options: [
        ['Nuovo stato, render, salvataggio', 'Esatto.'],
        ['Solo render', 'Lo stato non cambierebbe.'],
        ['Solo salvataggio', 'L’interfaccia resterebbe vecchia.'],
      ],
      correct: 0,
      explanation: 'Il flusso è unidirezionale e completo.',
      concepts: ['progetto'],
    }),
    quiz({
      id: 'w12l7q2',
      question: 'Dove si applica il filtro della vista?',
      options: [
        ['Sui derivati, mai sullo stato', 'Esatto.'],
        ['Sullo stato, per risparmiare memoria', 'Distrugge i dati.'],
        ['Nel salvataggio', 'Non serve.'],
      ],
      correct: 0,
      explanation: 'La vista filtra, lo stato conserva tutto.',
      concepts: ['progetto'],
    }),
    quiz({
      id: 'w12l7q3',
      question: 'Quale dettaglio di accessibilità è essenziale per i pulsanti icona?',
      options: [
        ['aria-label', 'Esatto.'],
        ['Un colore diverso', 'Non basta.'],
        ['Un tooltip al passaggio del mouse', 'Non accessibile da tastiera.'],
      ],
      correct: 0,
      explanation: 'Il nome accessibile è obbligatorio.',
      concepts: ['accessibilità'],
    }),
  ],
  recap: {
    points: [
      'Stato unico, azioni, derivati, render.',
      'Filtri sulla vista, non sullo stato.',
      'Persistenza versionata.',
      'Accessibilità come parte del progetto.',
    ],
    learned: 'Hai costruito una Todo App completa e coerente.',
    next: 'Review finale: cosa hai imparato e cosa fare adesso.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w12l8',
  title: 'Review e prossimi passi',
  subtitle: 'Dove sei arrivato e cosa costruire adesso',
  minutes: 55,
  objectives: [
    'Riconoscere le competenze acquisite',
    'Scegliere il prossimo progetto con criterio',
    'Sapere dove trovare risposte affidabili',
  ],
  concepts: ['review', 'percorso', 'risorse'],
  activate: [
    'All’inizio sapevi scrivere un console.log. Cosa sai fare adesso che non avresti immaginato?',
    'Questo è il momento di guardare il percorso intero, non l’ultima lezione.',
  ],
  analogy:
    'Il corso è una palestra: ora conosci gli attrezzi e la tecnica. La forza arriva continuando ad allenarti su problemi veri, non rileggendo il programma.',
  example: {
    code: `const competenze = [
  'leggere e scrivere JavaScript moderno',
  'modellare dati con oggetti, array e classi',
  'gestire asincronia e API',
  'costruire interfacce accessibili',
  'persistere dati e sincronizzarli',
  'testare la logica',
];

console.log(competenze.length);
console.log(competenze.filter((c) => c.includes('async')).length);`,
    output: `6
0`,
  },
  formal:
    'Le competenze si consolidano con progetti reali: aggiungi funzionalità, rompi qualcosa, ripara. Il percorso successivo consigliato: TypeScript per la sicurezza dei tipi, un framework (React o Vue) per le interfacce, Node per il backend, test end-to-end. Risorse affidabili: MDN, la documentazione ufficiale delle librerie, javascript.info per approfondire. Leggi codice reale su GitHub: è la palestra migliore.',
  worked: {
    code: `const piano = [
  { settimana: 1, obiettivo: 'Todo App con TypeScript', tipo: 'progetto' },
  { settimana: 2, obiettivo: 'Test con Vitest', tipo: 'qualità' },
  { settimana: 3, obiettivo: "Una fetch reale su un'API pubblica", tipo: 'integrazione' },
  { settimana: 4, obiettivo: 'Deploy e feedback di una persona reale', tipo: 'rilascio' },
];

const perTipo = piano.reduce((acc, tappa) => {
  acc[tappa.tipo] = (acc[tappa.tipo] ?? 0) + 1;
  return acc;
}, {});

console.log(piano.length);
console.log(Object.keys(perTipo).length);
console.log(piano.map((t) => t.obiettivo).join(' | '));`,
    output: `4
4
Todo App con TypeScript | Test con Vitest | Una fetch reale su un'API pubblica | Deploy e feedback di una persona reale`,
    steps: [
      ['piano con scadenze morbide', 'Un piano di 4 settimane è realistico e verificabile.'],
      ['reduce per tipo', 'Anche il piano è un dato: puoi analizzarlo.'],
      ['map + join', 'La presentazione è separata dai dati.'],
      ['feedback reale', 'Il giudizio di una persona vera vale più di dieci tutorial.'],
    ],
  },
  exercises: [
    fill({
      id: 'w12l8e1',
      title: 'Il tuo piano',
      prompt: 'Crea un piano di due obiettivi e stampa `2`.',
      starterCode: `const piano = [
  { obiettivo: 'TypeScript' },
  { obiettivo: 'React' },
];

console.log(piano.);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['length', 'piano.length'],
      solution: `const piano = [
  { obiettivo: 'TypeScript' },
  { obiettivo: 'React' },
];

console.log(piano.length);`,
      explanation: 'Un piano scritto è più probabile di un’intenzione vaga.',
      concepts: ['percorso'],
    }),
    guided({
      id: 'w12l8e2',
      title: 'Filtra per tipo',
      prompt: 'Filtra le tappe di tipo `progetto` e stampa `1`.',
      starterCode: `const piano = [
  { tipo: 'progetto' },
  { tipo: 'qualità' },
];

const progetti = piano.filter((t) => t.tipo === 'progetto');
console.log();`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['Stampa progetti.length.', 'Filtro già applicato.'],
      solution: `const piano = [
  { tipo: 'progetto' },
  { tipo: 'qualità' },
];

const progetti = piano.filter((t) => t.tipo === 'progetto');
console.log(progetti.length);`,
      explanation: 'Le stesse pipeline che hai imparato analizzano anche i tuoi piani.',
      concepts: ['percorso'],
    }),
    solo({
      id: 'w12l8e3',
      title: 'Risorsa giusta',
      prompt:
        'Crea un array di tre risorse affidabili e stampa `3`.',
      starterCode: `// MDN, documentazione ufficiale, javascript.info`,
      check: { kind: 'output', lines: ['3'] },
      hints: ['Crea un array e stampane length.', 'const risorse = [\'MDN\', \'docs\', \'javascript.info\'];'],
      solution: `const risorse = ['MDN', 'documentazione ufficiale', 'javascript.info'];
console.log(risorse.length);`,
      explanation: 'Sapere dove cercare è una competenza, non un ripiego.',
      concepts: ['risorse'],
    }),
    transfer({
      id: 'w12l8e4',
      title: 'Il prossimo passo',
      prompt:
        'Scrivi una funzione `prossimoPasso(competenze)` che restituisce `TypeScript` se manca, altrimenti `React`. Con `[\'javascript\']` stampa `TypeScript`.',
      starterCode: `function prossimoPasso(competenze) {
  // logica semplice
}

console.log(prossimoPasso(['javascript']));`,
      objective: 'Tradurre la review in un piano concreto.',
      check: { kind: 'output', lines: ['TypeScript'] },
      hints: ['includes(\'typescript\') controlla la presenza.', 'Se manca, restituisci TypeScript.'],
      solution: `function prossimoPasso(competenze) {
  if (!competenze.includes('typescript')) return 'TypeScript';
  return 'React';
}

console.log(prossimoPasso(['javascript']));`,
      explanation: 'Un passo alla volta: il percorso continua con ciò che manca.',
      concepts: ['percorso'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Tutorial infiniti',
      code: `// Guardare 20 corsi senza mai costruire nulla
const avanzamento = 0;`,
      error: `La sensazione di sapere cresce, la capacità di fare no`,
      why: 'La conoscenza passiva non sopravvive al primo problema reale.',
      fix: `// costruisci una cosa piccola, rompila, riparala`,
    }),
  ],
  explains: [
    explain({
      id: 'w12l8x1',
      prompt: 'Spiega cosa farai nelle prossime quattro settimane e perché hai scelto questi obiettivi.',
      keywords: ['progetto', 'typescript', 'test', 'api', 'feedback', 'deploy'],
      model:
        'Nelle prossime settimane porterò la Todo App in TypeScript per consolidare i tipi, aggiungerò test con Vitest, collegherò una fetch reale su un’API pubblica e pubblicherò il progetto per ricevere feedback. Ho scelto obiettivi piccoli e verificabili perché la competenza cresce costruendo, non rileggendo: ogni tappa produce qualcosa che posso mostrare e migliorare.',
      concepts: ['percorso'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w12l8q1',
      question: 'Qual è il modo migliore per consolidare JavaScript?',
      options: [
        ['Costruire progetti reali e riparare i bug', 'Esatto.'],
        ['Rileggere gli appunti', 'Utile ma insufficiente.'],
        ['Guardare video senza scrivere codice', 'Passivo.'],
      ],
      correct: 0,
      explanation: 'La pratica deliberata consolida.',
      concepts: ['percorso'],
    }),
    quiz({
      id: 'w12l8q2',
      question: 'Qual è una fonte affidabile?',
      options: [
        ['MDN e documentazione ufficiale', 'Esatto.'],
        ['Un post senza data', 'Rischio di obsolescenza.'],
        ['Un video di cinque anni fa', 'Spesso superato.'],
      ],
      correct: 0,
      explanation: 'Le fonti primarie invecchiano meglio.',
      concepts: ['risorse'],
    }),
    quiz({
      id: 'w12l8q3',
      question: 'Perché chiedere feedback a una persona reale?',
      options: [
        ['Perché rivela problemi che non vedi', 'Esatto.'],
        ['Per ottenere voti', 'Non è una gara.'],
        ['Per evitare i test', 'I test restano utili.'],
      ],
      correct: 0,
      explanation: 'Il feedback reale è il test più onesto.',
      concepts: ['percorso'],
    }),
  ],
  recap: {
    points: [
      'Hai chiuso 12 settimane di pratica attiva.',
      'Il percorso continua con TypeScript, framework e backend.',
      'Costruisci, rompi, ripara.',
      'Fonti primarie e feedback reale.',
    ],
    learned: 'Non “il corso è finito”: hai un metodo e un progetto da far crescere.',
    next: 'Scegli un progetto, mettilo online, chiedi a qualcuno di usarlo. Poi torna sui concetti che ti hanno fatto faticare.',
  },
});

export const week12 = makeWeek({
  id: W,
  number: 12,
  title: 'Progetto finale',
  subtitle: 'Una Todo App completa, poi il percorso continua',
  description:
    'Tutto ciò che hai imparato converge in una Todo App: architettura, rendering, form, filtri, persistenza, test e review finale.',
  goals: [
    'Progettare prima di scrivere',
    'Comporre stato, render ed eventi',
    'Persistere e migrare i dati',
    'Testare la logica e pianificare i prossimi passi',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Todo App completa',
    brief:
      'Un progetto nuovo: aggiungi, completa, elimina, filtra, cerca, ordina e salva. Con validazione, stati vuoti e migrazione.',
    deliverable: 'Todo App funzionante, persistente, accessibile e testata nelle funzioni pure.',
    milestones: [
      'Stato unico e render derivato',
      'Form validato con messaggi utili',
      'Filtri, ricerca e ordinamento',
      'Persistenza versionata con migrazione',
    ],
  },
  professional: {
    title: 'Review e prossimi passi',
    topics: [
      'Cosa hai imparato e cosa resta da consolidare',
      'TypeScript, framework, backend e testing',
      'Fonti affidabili e feedback reale',
    ],
    exercise: 'Scrivere un piano di 4 settimane con obiettivi verificabili e una persona a cui mostrare il progetto.',
  },
});
