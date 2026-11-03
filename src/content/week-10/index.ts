import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-10';
const asyncWrap = (body: string) => `(async () => {\n${body}\n})();`;

const l1 = lesson(W, 1, {
  id: 'w10l1',
  title: 'async / await',
  subtitle: 'Asincrono che si legge come sincrono',
  minutes: 50,
  objectives: [
    'Dichiarare una funzione async',
    'Usare await per attendere una Promise',
    'Gestire gli errori con try/catch',
  ],
  concepts: ['async', 'await', 'try/catch'],
  activate: [
    'Una catena di tre then è leggibile, ma con condizioni e errori diventa faticosa. C’è un modo per scriverla come codice normale?',
    'Sì: async/await. Il codice asincrono si legge dall’alto in basso.',
  ],
  analogy:
    'await è il “fermati qui finché non arriva”: il codice sembra sincrono, ma la pagina resta libera di respirare. async è l’etichetta che permette alla funzione di usare await e restituire sempre una Promise.',
  example: {
    code: asyncWrap(`  function carica() {
    return new Promise((r) => setTimeout(() => r([10, 20]), 10));
  }

  async function mostraTotale() {
    const spese = await carica();
    const totale = spese.reduce((a, b) => a + b, 0);
    console.log(totale);
  }

  await mostraTotale();`),
    output: `30`,
  },
  formal:
    'Una funzione async restituisce sempre una Promise: il valore di return diventa il valore risolto, un throw diventa un rifiuto. await sospende la funzione (non il thread) e restituisce il valore risolto, oppure lancia il motivo del rifiuto. Gli errori si gestiscono con try/catch. await funziona solo dentro funzioni async o nei moduli top-level.',
  worked: {
    code: asyncWrap(`  const api = {
    lista: () => Promise.resolve([{ importo: 10 }, { importo: 20 }]),
  };

  async function riepilogo() {
    try {
      const spese = await api.lista();
      const totale = spese.reduce((acc, s) => acc + s.importo, 0);
      return 'Totale: ' + totale;
    } catch (errore) {
      return 'Errore: ' + errore.message;
    } finally {
      console.log('Caricamento terminato');
    }
  }

  console.log(await riepilogo());`),
    output: `Caricamento terminato
Totale: 30`,
    steps: [
      ['async function riepilogo()', 'La funzione restituisce sempre una Promise.'],
      ['await api.lista()', 'Aspetta il risultato senza bloccare il browser.'],
      ['reduce(...)', 'Il calcolo è codice normalissimo.'],
      ['catch (errore)', 'Gestisce sia i rifiuti sia gli errori lanciati nel try.'],
      ['finally', 'Esegue sempre, prima del return.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l1e1',
      title: 'Attendi il valore',
      prompt: 'Completa l’await e stampa `42`.',
      starterCode: asyncWrap(`  const p = Promise.resolve(42);
  const valore = await ;
  console.log(valore);`),
      check: { kind: 'output', lines: ['42'] },
      hints: ['await precede la Promise.', 'await p'],
      solution: asyncWrap(`  const p = Promise.resolve(42);
  const valore = await p;
  console.log(valore);`),
      explanation: 'await restituisce il valore risolto della Promise.',
      concepts: ['await'],
    }),
    guided({
      id: 'w10l1e2',
      title: 'Funzione async',
      prompt: 'Scrivi una funzione async `doppio` che restituisce il doppio e stampa `10`.',
      starterCode: asyncWrap(`  // definisci doppio
  console.log(await doppio(5));`),
      check: { kind: 'output', lines: ['10'] },
      hints: ['async function doppio(n) { return n * 2; }', 'La funzione restituisce una Promise risolta con il valore.'],
      solution: asyncWrap(`  async function doppio(n) {
    return n * 2;
  }

  console.log(await doppio(5));`),
      explanation: 'Il return di una funzione async diventa il valore risolto.',
      concepts: ['async'],
    }),
    solo({
      id: 'w10l1e3',
      title: 'Try/catch',
      prompt: 'Con `Promise.reject(new Error(\'no\'))`, cattura e stampa `Errore: no`.',
      starterCode: asyncWrap(`  // try/catch con await`),
      check: { kind: 'output', lines: ['Errore: no'] },
      hints: ['try { await Promise.reject(...) } catch (e) { ... }', 'Stampa e.message.'],
      solution: asyncWrap(`  try {
    await Promise.reject(new Error('no'));
  } catch (e) {
    console.log('Errore: ' + e.message);
  }`),
      explanation: 'Con await il rifiuto diventa un’eccezione catturabile.',
      concepts: ['try/catch'],
    }),
    transfer({
      id: 'w10l1e4',
      title: 'Da then ad await',
      prompt:
        'Riscrivi la catena con async/await ottenendo lo stesso risultato: `30`.',
      starterCode: asyncWrap(`  const valore = await Promise.resolve(10)
    .then((n) => n + 20);

  console.log(valore);`),
      objective: 'Convertire una catena in codice sequenziale leggibile.',
      check: { kind: 'output', lines: ['30'] },
      hints: ['const dieci = await Promise.resolve(10);', 'Poi console.log(dieci + 20).'],
      solution: asyncWrap(`  const dieci = await Promise.resolve(10);
  console.log(dieci + 20);`),
      explanation: 'await elimina l’annidamento e rende esplicito l’ordine.',
      concepts: ['await'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'await fuori da async',
      code: `function carica() {
  const dati = await fetch('/api');
  return dati;
}`,
      error: `SyntaxError: await is only valid in async functions and the top level bodies of modules`,
      why: 'await richiede un contesto async: la funzione deve essere dichiarata async.',
      fix: `async function carica() {
  const dati = await fetch('/api');
  return dati;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l1x1',
      prompt: 'Spiega cosa fa await e perché non blocca il browser.',
      keywords: ['await', 'async', 'promise', 'sospend', 'thread', 'blocc'],
      model:
        'await sospende solo la funzione async corrente, restituendo il controllo all’event loop: il browser resta libero di gestire eventi e rendering. Quando la promise si risolve, la funzione riprende dal punto in cui si era fermata. Non è un’attesa attiva: è una pausa coordinata.',
      concepts: ['await'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l1q1',
      question: 'Cosa restituisce una funzione async?',
      options: [
        ['Il valore diretto', 'Restituisce una Promise.'],
        ['Sempre una Promise', 'Esatto.'],
        ['undefined', 'Solo se non c’è return.'],
      ],
      correct: 1,
      explanation: 'Il return diventa il valore risolto.',
      concepts: ['async'],
    }),
    quiz({
      id: 'w10l1q2',
      question: 'Cosa succede se la promise awaited viene rifiutata?',
      options: [
        ['await restituisce undefined', 'Lancia l’errore.'],
        ['Viene lanciata un’eccezione catturabile con try/catch', 'Esatto.'],
        ['Il programma termina', 'Solo se non è gestita.'],
      ],
      correct: 1,
      explanation: 'await trasforma il rifiuto in eccezione.',
      concepts: ['try/catch'],
    }),
    quiz({
      id: 'w10l1q3',
      question: 'await blocca il thread principale?',
      options: [
        ['Sì, come un ciclo while', 'No: sospende solo la funzione.'],
        ['No, sospende la funzione e libera l’event loop', 'Esatto.'],
        ['Dipende dal browser', 'Il comportamento è standard.'],
      ],
      correct: 1,
      explanation: 'La pagina resta interattiva.',
      concepts: ['await'],
    }),
  ],
  recap: {
    points: [
      'async rende la funzione una Promise.',
      'await attende senza bloccare.',
      'try/catch gestisce i rifiuti.',
      'Il codice si legge dall’alto in basso.',
    ],
    learned: 'Scrivi asincrono con la chiarezza del sincrono.',
    next: 'fetch: parlare con un’API REST.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w10l2',
  title: 'fetch e API REST',
  subtitle: 'Richiedere dati nel modo giusto',
  minutes: 55,
  objectives: [
    'Fare una richiesta GET con fetch',
    'Controllare lo stato HTTP',
    'Inviare dati con POST e JSON',
  ],
  concepts: ['fetch', 'HTTP', 'REST'],
  activate: [
    'Una richiesta va a buon fine ma il server risponde 404. fetch lancia un errore?',
    'No: fetch rifiuta solo per errori di rete. Gli stati 4xx e 5xx vanno controllati con response.ok.',
  ],
  analogy:
    'fetch è un corriere: consegna la richiesta e ti riporta la risposta così com’è. Sta a te leggere il codice di stato: 200 è “ok”, 404 è “indirizzo sbagliato”, 500 è “il destinatario è guasto”.',
  example: {
    code: asyncWrap(`  // Simula fetch per funzionare offline
  const risposta = {
    ok: true,
    status: 200,
    json: async () => ({ spese: [{ importo: 10 }] }),
  };

  const dati = await risposta.json();
  console.log(dati.spese.length);
  console.log(risposta.ok);`),
    output: `1
true`,
  },
  formal:
    'fetch(url, opzioni) restituisce una Promise che si risolve con una Response anche per stati 404/500. Per una GET basta fetch(url); per inviare dati: method POST, headers Content-Type application/json, body JSON.stringify(dati). Il corpo si legge una volta sola, con response.json() o response.text(). response.ok è true per gli stati 200-299.',
  worked: {
    code: asyncWrap(`  async function caricaSpese(fetchFinto) {
    const risposta = await fetchFinto('/api/spese');

    if (!risposta.ok) {
      throw new Error('HTTP ' + risposta.status);
    }

    const dati = await risposta.json();
    return dati.spese;
  }

  const fetchFinto = async (url) => {
    if (url === '/api/spese') {
      return { ok: true, status: 200, json: async () => ({ spese: [{ importo: 10 }, { importo: 20 }] }) };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  console.log((await caricaSpese(fetchFinto)).length);

  try {
    await caricaSpese(async () => ({ ok: false, status: 404, json: async () => ({}) }));
  } catch (e) {
    console.log(e.message);
  }`),
    output: `2
HTTP 404`,
    steps: [
      ['await fetchFinto(...)', 'La richiesta è asincrona: await restituisce la Response.'],
      ['if (!risposta.ok)', 'Controllo esplicito: fetch non fallisce per 404.'],
      ['throw new Error(\'HTTP \' + status)', 'Trasformiamo lo stato in un errore gestibile.'],
      ['await risposta.json()', 'Il corpo va letto con un metodo asincrono.'],
      ['try/catch', 'L’errore applicativo risale al chiamante.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l2e1',
      title: 'Leggi la risposta',
      prompt: 'Leggi il JSON e stampa `3`.',
      starterCode: asyncWrap(`  const risposta = { ok: true, json: async () => ({ totale: 3 }) };

  const dati = await risposta.();
  console.log(dati.totale);`),
      check: { kind: 'output', lines: ['3'] },
      hints: ['Il metodo è json().', 'await risposta.json()'],
      solution: asyncWrap(`  const risposta = { ok: true, json: async () => ({ totale: 3 }) };

  const dati = await risposta.json();
  console.log(dati.totale);`),
      explanation: 'json() è asincrono perché legge il corpo come stream.',
      concepts: ['fetch'],
    }),
    guided({
      id: 'w10l2e2',
      title: 'Controlla ok',
      prompt:
        'Se la risposta non è ok, lancia un errore; stampa `HTTP 500` catturandolo.',
      starterCode: asyncWrap(`  const risposta = { ok: false, status: 500, json: async () => ({}) };

  try {
    if (!risposta.ok) {
      // lancia
    }
  } catch (e) {
    console.log(e.message);
  }`),
      check: { kind: 'output', lines: ['HTTP 500'] },
      hints: ['throw new Error(\'HTTP \' + risposta.status)', 'Il messaggio deve essere HTTP 500.'],
      solution: asyncWrap(`  const risposta = { ok: false, status: 500, json: async () => ({}) };

  try {
    if (!risposta.ok) {
      throw new Error('HTTP ' + risposta.status);
    }
  } catch (e) {
    console.log(e.message);
  }`),
      explanation: 'fetch non lancia per 4xx/5xx: il controllo è tuo.',
      concepts: ['HTTP'],
    }),
    solo({
      id: 'w10l2e3',
      title: 'POST con JSON',
      prompt:
        'Prepara il body JSON per inviare `{ importo: 10 }` e stampa la stringa esatta `{"importo":10}`.',
      starterCode: `const dati = { importo: 10 };

// JSON.stringify`,
      check: { kind: 'output', lines: ['{"importo":10}'] },
      hints: ['Il body deve essere una stringa JSON.', 'console.log(JSON.stringify(dati))'],
      solution: `const dati = { importo: 10 };
console.log(JSON.stringify(dati));`,
      explanation: 'Il body di una richiesta HTTP è testo: l’oggetto va serializzato.',
      concepts: ['REST'],
    }),
    transfer({
      id: 'w10l2e4',
      title: 'Client con gestione errori',
      prompt:
        'Scrivi `carica(api)` che controlla ok, legge json e restituisce `dati.spese`. Con un’API che restituisce 2 spese stampa `2`.',
      starterCode: asyncWrap(`  const api = async () => ({ ok: true, status: 200, json: async () => ({ spese: [1, 2] }) });

  async function carica(fn) {
    // richiesta + controlli
  }

  console.log((await carica(api)).length);`),
      objective: 'Scrivere un client robusto con controllo dello stato.',
      check: { kind: 'output', lines: ['2'] },
      hints: ['await fn(), controlla ok, await risposta.json().', 'Restituisci dati.spese.'],
      solution: asyncWrap(`  const api = async () => ({ ok: true, status: 200, json: async () => ({ spese: [1, 2] }) });

  async function carica(fn) {
    const risposta = await fn();
    if (!risposta.ok) throw new Error('HTTP ' + risposta.status);
    const dati = await risposta.json();
    return dati.spese;
  }

  console.log((await carica(api)).length);`),
      explanation: 'Un client con controlli espliciti è la base per qualunque API reale.',
      concepts: ['fetch'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Dimenticare il controllo ok',
      code: asyncWrap(`  const risposta = await fetch('/api/inesistente');
  const dati = await risposta.json();
  console.log(dati);`),
      error: `Nessun errore: 404 viene trattato come successo e dati contiene il corpo d'errore`,
      why: 'fetch risolve anche per 404: senza response.ok il codice prosegue con dati sbagliati.',
      fix: `if (!risposta.ok) throw new Error('HTTP ' + risposta.status);`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l2x1',
      prompt: 'Spiega perché bisogna controllare response.ok e come si inviano dati con POST.',
      keywords: ['ok', 'status', 'fetch', 'post', 'json', 'body'],
      model:
        'fetch risolve la promise anche quando il server risponde con un errore HTTP, quindi devo controllare response.ok, che è vero solo per gli stati 2xx, e lanciare un errore per gli altri. Per inviare dati uso method POST, l’header Content-Type application/json e un body ottenuto con JSON.stringify, poi leggo la risposta con json().',
      concepts: ['fetch'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l2q1',
      question: 'fetch lancia un errore per una risposta 404?',
      options: [
        ['Sì', 'Rifiuta solo per errori di rete.'],
        ['No, devi controllare response.ok', 'Esatto.'],
        ['Solo se usi await', 'Non cambia nulla.'],
      ],
      correct: 1,
      explanation: 'Gli stati HTTP non sono errori di rete.',
      concepts: ['HTTP'],
    }),
    quiz({
      id: 'w10l2q2',
      question: 'Cosa va nel body di una POST JSON?',
      options: [
        ['Un oggetto', 'Deve essere testo JSON.'],
        ['JSON.stringify(dati)', 'Esatto.'],
        ['Un FormData sempre', 'Solo per form multipart.'],
      ],
      correct: 1,
      explanation: 'Il body è una stringa.',
      concepts: ['REST'],
    }),
    quiz({
      id: 'w10l2q3',
      question: 'Quante volte puoi leggere il body di una Response?',
      options: [
        ['Una', 'Il body è uno stream consumabile una volta.'],
        ['Illimitate', 'Va clonata se serve rileggerla.'],
        ['Due', 'Non è garantito.'],
      ],
      correct: 0,
      explanation: 'Se serve rileggere, usa response.clone() prima.',
      concepts: ['fetch'],
    }),
  ],
  recap: {
    points: [
      'fetch non fallisce per 4xx/5xx.',
      'Controlla response.ok e status.',
      'json() legge il corpo una volta.',
      'POST: method, headers, body serializzato.',
    ],
    learned: 'Sai parlare con un’API REST in modo affidabile.',
    next: 'Gestire risposte, errori e dati parziali.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w10l3',
  title: 'Risposte e JSON',
  subtitle: 'Validare ciò che arriva dalla rete',
  minutes: 50,
  objectives: [
    'Leggere una risposta JSON in sicurezza',
    'Validare la forma dei dati',
    'Gestire risposte vuote o inattese',
  ],
  concepts: ['response.json', 'validazione', 'dati esterni'],
  activate: [
    'Un’API cambia improvvisamente il nome di un campo. Il tuo codice continua a funzionare?',
    'Solo se valida la forma dei dati invece di fidarsi ciecamente.',
  ],
  analogy:
    'I dati esterni sono pacchi: controlli che ci sia il contenuto dichiarato prima di usarli. Se manca, non vai avanti sperando.',
  example: {
    code: asyncWrap(`  const risposta = { ok: true, json: async () => ({ spese: [{ importo: 10 }] }) };

  const dati = await risposta.json();
  const spese = Array.isArray(dati.spese) ? dati.spese : [];
  console.log(spese.length);

  const vuota = await Promise.resolve({});
  console.log(Array.isArray(vuota.spese) ? vuota.spese.length : 'assente');`),
    output: `1
assente`,
  },
  formal:
    'response.json() può fallire se il corpo non è JSON: va in try/catch. La validazione controlla tipo e presenza dei campi: Array.isArray per le liste, typeof per numeri e stringhe, controlli sui valori ammessi. Non fidarti dei campi opzionali: usa default e optional chaining. Se l’API è instabile, isola la normalizzazione in una funzione dedicata.',
  worked: {
    code: asyncWrap(`  function normalizzaSpesa(grezza) {
    if (!grezza || typeof grezza !== 'object') return null;

    const importo = Number(grezza.importo);
    if (!Number.isFinite(importo) || importo <= 0) return null;

    return {
      descrizione: String(grezza.descrizione ?? 'Senza descrizione'),
      importo,
      categoria: String(grezza.categoria ?? 'altro'),
    };
  }

  const rispostaGrezza = [
    { descrizione: 'Libro', importo: '18' },
    { importo: -3 },
    null,
    { descrizione: 'Pranzo', importo: 12, categoria: 'cibo' },
  ];

  const spese = rispostaGrezza.map(normalizzaSpesa).filter(Boolean);
  console.log(spese.length);
  console.log(spese[0].importo);
  console.log(spese[1].categoria);`),
    output: `2
18
cibo`,
    steps: [
      ['if (!grezza || typeof grezza !== \'object\')', 'Scarta i valori assurdi prima di leggere proprietà.'],
      ['Number(grezza.importo)', 'Converte e valida: l’API potrebbe mandare stringhe.'],
      ['return null', 'Un singolo elemento invalido non deve buttare via tutta la risposta.'],
      ['filter(Boolean)', 'Rimuove i normalizzati falliti.'],
      ['spese[0].importo', 'Ora i dati sono tipizzati e sicuri da usare.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l3e1',
      title: 'Lista o default',
      prompt: 'Usa un array vuoto se `dati.spese` non è un array. Stampa `0`.',
      starterCode: asyncWrap(`  const dati = { spese: null };
  const spese = Array.(dati.spese) ? dati.spese : [];
  console.log(spese.length);`),
      check: { kind: 'output', lines: ['0'] },
      hints: ['Il metodo è isArray.', 'Array.isArray(...)'],
      solution: asyncWrap(`  const dati = { spese: null };
  const spese = Array.isArray(dati.spese) ? dati.spese : [];
  console.log(spese.length);`),
      explanation: 'La validazione della forma evita TypeError a valle.',
      concepts: ['validazione'],
    }),
    guided({
      id: 'w10l3e2',
      title: 'Normalizza importo',
      prompt:
        'Con importo come stringa `\'18\'`, convertilo in numero e stampa `18`.',
      starterCode: asyncWrap(`  const grezza = { importo: '18' };

  const importo = ;
  console.log(importo);`),
      check: { kind: 'output', lines: ['18'] },
      hints: ['Usa Number(...).', 'const importo = Number(grezza.importo)'],
      solution: asyncWrap(`  const grezza = { importo: '18' };

  const importo = Number(grezza.importo);
  console.log(importo);`),
      explanation: 'Le API spesso mandano numeri come stringhe: convertire è routine.',
      concepts: ['dati esterni'],
    }),
    solo({
      id: 'w10l3e3',
      title: 'Scarta gli invalidi',
      prompt:
        'Normalizza `[{importo:10}, {importo:-1}, null]` scartando gli invalidi e stampa `1`.',
      starterCode: asyncWrap(`  const grezze = [{ importo: 10 }, { importo: -1 }, null];

  // map + filter`),
      check: { kind: 'output', lines: ['1'] },
      hints: ['Una funzione che restituisce null per gli invalidi.', 'Poi filter(Boolean).'],
      solution: asyncWrap(`  const grezze = [{ importo: 10 }, { importo: -1 }, null];

  const valide = grezze
    .map((g) => {
      if (!g || !Number.isFinite(Number(g.importo)) || Number(g.importo) <= 0) return null;
      return { importo: Number(g.importo) };
    })
    .filter(Boolean);

  console.log(valide.length);`),
      explanation: 'Un dato invalido non deve compromettere l’intera risposta.',
      concepts: ['validazione'],
    }),
    transfer({
      id: 'w10l3e4',
      title: 'JSON non valido',
      prompt:
        'Simula un json() che lancia e gestisci l’errore stampando `Risposta non valida`.',
      starterCode: asyncWrap(`  const risposta = {
    ok: true,
    json: async () => {
      throw new SyntaxError('bad json');
    },
  };

  // try/catch`),
      objective: 'Proteggere il parse di una risposta reale.',
      check: { kind: 'output', lines: ['Risposta non valida'] },
      hints: ['Il parse è dentro try/catch.', 'await risposta.json() nel try.'],
      solution: asyncWrap(`  const risposta = {
    ok: true,
    json: async () => {
      throw new SyntaxError('bad json');
    },
  };

  try {
    await risposta.json();
  } catch {
    console.log('Risposta non valida');
  }`),
      explanation: 'Anche una risposta 200 può avere un corpo corrotto.',
      concepts: ['dati esterni'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Fidarsi della forma',
      code: asyncWrap(`  const dati = await (await fetch('/api')).json();
  console.log(dati.spese.length);`),
      error: `TypeError: Cannot read properties of undefined (reading 'length')`,
      why: 'L’API può rispondere con un oggetto di errore senza il campo spese.',
      fix: `const spese = Array.isArray(dati.spese) ? dati.spese : [];
console.log(spese.length);`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l3x1',
      prompt: 'Spiega come validi i dati che arrivano da un’API e perché è necessario.',
      keywords: ['valid', 'array', 'tipo', 'json', 'default', 'estern'],
      model:
        'Controllo che la risposta sia un oggetto e che i campi che uso abbiano il tipo atteso: Array.isArray per le liste, Number per gli importi, String per le descrizioni. Applico default per i campi opzionali e scarto gli elementi invalidi invece di far fallire tutto. È necessario perché i dati esterni cambiano e non sono sotto il mio controllo, e un TypeError a valle è molto più difficile da diagnosticare.',
      concepts: ['validazione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l3q1',
      question: 'Come verifichi che un campo sia una lista?',
      options: [
        ['typeof x === \'array\'', 'typeof non restituisce "array".'],
        ['Array.isArray(x)', 'Esatto.'],
        ['x.length > 0', 'Va in errore se x è null.'],
      ],
      correct: 1,
      explanation: 'Array.isArray è l’unico controllo affidabile.',
      concepts: ['validazione'],
    }),
    quiz({
      id: 'w10l3q2',
      question: 'Perché normalizzare gli importi?',
      options: [
        ['Perché le API possono inviarli come stringhe', 'Esatto.'],
        ['Perché i numeri sono più belli', 'Non è estetica.'],
        ['Per evitare il JSON', 'Non c’entra.'],
      ],
      correct: 0,
      explanation: 'La conversione esplicita evita concatenazioni accidentali.',
      concepts: ['dati esterni'],
    }),
    quiz({
      id: 'w10l3q3',
      question: 'Cosa fare con un elemento invalido in una lista?',
      options: [
        ['Far fallire tutta la risposta', 'Perdi dati validi.'],
        ['Scartarlo e continuare', 'Esatto.'],
        ['Ignorare il problema', 'Va gestito, non ignorato.'],
      ],
      correct: 1,
      explanation: 'Robustezza per elemento.',
      concepts: ['validazione'],
    }),
  ],
  recap: {
    points: [
      'json() può fallire: try/catch.',
      'Valida forma e tipi prima dell’uso.',
      'Default per i campi opzionali.',
      'Scarta i singoli elementi invalidi.',
    ],
    learned: 'Sai rendere robusto il confine con il mondo esterno.',
    next: 'Errori asincroni: try/catch, cause e messaggi utente.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w10l4',
  title: 'Errori async',
  subtitle: 'try/catch, cause e messaggi per l’utente',
  minutes: 50,
  objectives: [
    'Gestire errori in funzioni async',
    'Distinguere errori tecnici e messaggi utente',
    'Rilanciare con contesto',
  ],
  concepts: ['try/catch async', 'cause', 'messaggi'],
  activate: [
    'Un utente vede “TypeError: failed to fetch”. Cosa capisce?',
    'Nulla. Il messaggio tecnico va nei log; all’utente serve un messaggio azionabile.',
  ],
  analogy:
    'L’errore tecnico è la diagnosi del meccanico; il messaggio utente è il cartello “officina chiusa, torna alle 15”. Servono entrambi, ma non sono la stessa cosa.',
  example: {
    code: asyncWrap(`  async function carica() {
    try {
      throw new TypeError('failed to fetch');
    } catch (tecnico) {
      throw new Error('Impossibile caricare le spese. Riprova.', { cause: tecnico });
    }
  }

  try {
    await carica();
  } catch (e) {
    console.log(e.message);
    console.log(e.cause.name);
  }`),
    output: `Impossibile caricare le spese. Riprova.
TypeError`,
  },
  formal:
    'In async, try/catch intercetta sia i rifiuti sia le eccezioni sincrone. Un catch può tradurre l’errore tecnico in un errore applicativo con cause, così i log restano diagnostici e l’interfaccia riceve un messaggio comprensibile. Evita di mostrare message tecnici all’utente; non nascondere l’errore nei log. Per gli errori attesi usa classi dedicate e instanceof.',
  worked: {
    code: asyncWrap(`  class ErroreValidazione extends Error {
    constructor(campo) {
      super('Il campo ' + campo + ' non è valido');
      this.name = 'ErroreValidazione';
      this.campo = campo;
    }
  }

  async function salva(dati) {
    if (!dati.descrizione) {
      throw new ErroreValidazione('descrizione');
    }
    return { ok: true };
  }

  try {
    await salva({ importo: 10 });
  } catch (e) {
    if (e instanceof ErroreValidazione) {
      console.log('Errore utente: ' + e.message);
      console.log('Campo: ' + e.campo);
    } else {
      console.log('Errore tecnico');
    }
  }`),
    output: `Errore utente: Il campo descrizione non è valido
Campo: descrizione`,
    steps: [
      ['class ErroreValidazione extends Error', 'Un tipo dedicato agli errori attesi.'],
      ['this.campo = campo', 'Informazioni strutturate, non solo testo.'],
      ['if (!dati.descrizione) throw ...', 'La validazione lancia un errore specifico.'],
      ['e instanceof ErroreValidazione', 'Gestione mirata per tipo.'],
      ['else', 'Gli errori imprevisti seguono un percorso diverso.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l4e1',
      title: 'Messaggio utente',
      prompt: 'Traduci l’errore tecnico in un messaggio comprensibile e stampalo: `Caricamento non riuscito`.',
      starterCode: asyncWrap(`  try {
    throw new Error('ECONNRESET');
  } catch (tecnico) {
    throw new Error();
  }`),
      check: { kind: 'output', lines: ['Caricamento non riuscito'] },
      hints: ['Passa il messaggio al costruttore.', 'Manca il blocco esterno che stampa: aggiungilo.'],
      solution: asyncWrap(`  try {
    try {
      throw new Error('ECONNRESET');
    } catch (tecnico) {
      throw new Error('Caricamento non riuscito', { cause: tecnico });
    }
  } catch (e) {
    console.log(e.message);
  }`),
      explanation: 'Il messaggio utente sostituisce il dettaglio tecnico senza perdere la causa.',
      concepts: ['messaggi'],
    }),
    guided({
      id: 'w10l4e2',
      title: 'Cause',
      prompt: 'Rilancia con cause e stampa il nome della causa (`SyntaxError`).',
      starterCode: asyncWrap(`  try {
    JSON.parse('{');
  } catch (tecnico) {
    const errore = new Error('Dati non validi', { : tecnico });
    console.log(errore.cause.name);
  }`),
      check: { kind: 'output', lines: ['SyntaxError'] },
      hints: ['La proprietà dell’oggetto opzioni è cause.', '{ cause: tecnico }'],
      solution: asyncWrap(`  try {
    JSON.parse('{');
  } catch (tecnico) {
    const errore = new Error('Dati non validi', { cause: tecnico });
    console.log(errore.cause.name);
  }`),
      explanation: 'cause conserva l’errore originale per il debug.',
      concepts: ['cause'],
    }),
    solo({
      id: 'w10l4e3',
      title: 'Classe di errore',
      prompt:
        'Crea `ErroreValidazione` e lancia con campo `importo`. Stampa `ErroreValidazione: importo non valido`.',
      starterCode: asyncWrap(`  // classe + lancio + catch`),
      check: { kind: 'output', lines: ['ErroreValidazione: importo non valido'] },
      hints: ['super(\'importo non valido\')', 'this.name = \'ErroreValidazione\'.'],
      solution: asyncWrap(`  class ErroreValidazione extends Error {
    constructor(campo) {
      super(campo + ' non valido');
      this.name = 'ErroreValidazione';
      this.campo = campo;
    }
  }

  try {
    throw new ErroreValidazione('importo');
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }`),
      explanation: 'Gli errori di dominio hanno nomi e campi propri.',
      concepts: ['try/catch async'],
    }),
    transfer({
      id: 'w10l4e4',
      title: 'Recupero parziale',
      prompt:
        'Se il caricamento delle spese fallisce, restituisci un array vuoto e stampa `0` e `Dati non disponibili`.',
      starterCode: asyncWrap(`  async function carica() {
    throw new Error('rete');
  }

  try {
    const dati = await carica();
    console.log(dati.length);
  } catch {
    // fallback
  }`),
      objective: 'Recuperare da un errore con un fallback esplicito.',
      check: { kind: 'output', lines: ['0', 'Dati non disponibili'] },
      hints: ['Nel catch assegna [] a una variabile e stampa.', 'Poi stampa il messaggio all’utente.'],
      solution: asyncWrap(`  async function carica() {
    throw new Error('rete');
  }

  let dati = [];
  try {
    dati = await carica();
  } catch {
    console.log('Dati non disponibili');
  }
  console.log(dati.length);`),
      explanation: 'Un fallback permette all’interfaccia di continuare a funzionare.',
      concepts: ['try/catch async'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Messaggio tecnico all’utente',
      code: asyncWrap(`  try {
    await fetch('/api');
  } catch (e) {
    document.body.textContent = e.message;
  }`),
      error: `L’utente legge “Failed to fetch”: inutile e spaventoso`,
      why: 'Il messaggio è diagnostico, non azionabile per chi usa l’app.',
      fix: `document.body.textContent = 'Connessione assente. Riprova quando torna la rete.';`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l4x1',
      prompt: 'Spiega la differenza tra errore tecnico e messaggio utente e come usi cause.',
      keywords: ['tecnico', 'utente', 'cause', 'messaggio', 'log', 'comprensibil'],
      model:
        'L’errore tecnico contiene dettagli per chi sviluppa: tipo, messaggio originale, stack. Il messaggio utente dice cosa è successo e cosa fare, senza gergo. Nel catch traduco l’errore tecnico in uno applicativo con un messaggio comprensibile e passo l’originale in cause, così i log restano diagnostici e l’interfaccia resta chiara.',
      concepts: ['messaggi'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l4q1',
      question: 'Cosa mostra `cause`?',
      options: [
        ['Il messaggio per l’utente', 'Quello è message.'],
        ['L’errore originale che ha causato quello nuovo', 'Esatto.'],
        ['Lo stack della pagina', 'Non è quello.'],
      ],
      correct: 1,
      explanation: 'cause collega gli errori senza perdere informazione.',
      concepts: ['cause'],
    }),
    quiz({
      id: 'w10l4q2',
      question: 'Perché usare instanceof su una classe di errore?',
      options: [
        ['Per gestire in modo diverso errori attesi e imprevisti', 'Esatto.'],
        ['Per confrontare stringhe', 'Non serve.'],
        ['Per migliorare le performance', 'Non è il punto.'],
      ],
      correct: 0,
      explanation: 'La gestione mirata evita di trattare tutto allo stesso modo.',
      concepts: ['try/catch async'],
    }),
    quiz({
      id: 'w10l4q3',
      question: 'Cosa deve fare un catch che non sa gestire l’errore?',
      options: [
        ['Ignorarlo', 'Nasconde il problema.'],
        ['Rilanciarlo o loggarlo con contesto', 'Esatto.'],
        ['Restituire null', 'Sposta il bug.'],
      ],
      correct: 1,
      explanation: 'Meglio un errore visibile che uno silenzioso.',
      concepts: ['messaggi'],
    }),
  ],
  recap: {
    points: [
      'try/catch gestisce rifiuti e throw.',
      'Messaggio utente ≠ messaggio tecnico.',
      'cause conserva l’originale.',
      'Classi di errore per gestioni mirate.',
    ],
    learned: 'Sai gestire gli errori senza perdere diagnosi né chiarezza.',
    next: 'Parallelismo controllato nelle richieste reali.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w10l5',
  title: 'Parallelismo controllato',
  subtitle: 'Richieste in parallelo senza sovraccaricare',
  minutes: 50,
  objectives: [
    'Distinguere parallelo e concorrenza limitata',
    'Elaborare una lista con limite',
    'Gestire errori parziali',
  ],
  concepts: ['parallelo', 'limite', 'allSettled'],
  activate: [
    'Un browser permette circa 6 connessioni per host. Lanciare 100 richieste insieme è utile?',
    'No: le altre aspettano comunque, aggiungendo solo complessità e timeout.',
  ],
  analogy:
    'Il limite di concorrenza è il numero di casse aperte al supermercato: più code non fanno servire prima, servono più casse fino a un limite utile.',
  example: {
    code: asyncWrap(`  let attivi = 0;
  let picco = 0;

  async function richiesta(id) {
    attivi += 1;
    picco = Math.max(picco, attivi);
    await new Promise((r) => setTimeout(r, 5));
    attivi -= 1;
    return 'ok-' + id;
  }

  async function conLimite(lista, limite) {
    const risultati = [];
    let i = 0;
    async function worker() {
      while (i < lista.length) {
        const corrente = lista[i++];
        risultati.push(await richiesta(corrente));
      }
    }
    await Promise.all(Array.from({ length: limite }, worker));
    return risultati;
  }

  const risultati = await conLimite([1, 2, 3, 4, 5], 2);
  console.log(risultati.length);
  console.log(picco <= 2);`),
    output: `5
true`,
  },
  formal:
    'Il pool di worker è il pattern standard: N worker condividono un indice, ognuno prende il prossimo elemento quando è libero. Con Promise.all si attende la fine di tutti. Se un elemento può fallire e voglio continuare, gestisco l’errore nel worker con try/catch e registro l’esito. Per annullare tutte le richieste si usa AbortController (lezione 6).',
  worked: {
    code: asyncWrap(`  async function conLimite(elementi, limite, fn) {
    const esiti = [];
    let indice = 0;

    async function worker() {
      while (indice < elementi.length) {
        const corrente = indice++;
        try {
          esiti.push({ ok: true, valore: await fn(elementi[corrente]) });
        } catch (errore) {
          esiti.push({ ok: false, errore: errore.message });
        }
      }
    }

    await Promise.all(Array.from({ length: limite }, worker));
    return esiti;
  }

  const esiti = await conLimite(
    [1, 2, 3],
    2,
    async (n) => {
      if (n === 2) throw new Error('fallito ' + n);
      return n * 10;
    },
  );

  console.log(esiti.filter((e) => e.ok).length);
  console.log(esiti.some((e) => !e.ok));`),
    output: `2
true`,
    steps: [
      ['indice = 0', 'Stato condiviso tra i worker: chi è libero prende il prossimo.'],
      ['const corrente = indice++', 'Incremento atomico in un solo thread: nessuna race condition.'],
      ['try/catch per elemento', 'Un fallimento non interrompe gli altri.'],
      ['esiti.push({ ok, ... })', 'Risultato strutturato, non un array di valori misti.'],
      ['await Promise.all(workers)', 'Attende che la coda sia vuota.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l5e1',
      title: 'Pool di due',
      prompt: 'Completa i worker per elaborare 4 elementi con limite 2 e stampa `4`.',
      starterCode: asyncWrap(`  const elementi = [1, 2, 3, 4];
  let indice = 0;
  const risultati = [];

  async function worker() {
    while (indice < elementi.length) {
      const corrente = indice;
      indice += 1;
      risultati.push(await Promise.resolve(elementi[corrente] * 2));
    }
  }

  await Promise.all([worker(), ()]);
  console.log(risultati.length);`),
      check: { kind: 'output', lines: ['4'] },
      hints: ['Servono due worker identici.', 'Promise.all([worker(), worker()])'],
      solution: asyncWrap(`  const elementi = [1, 2, 3, 4];
  let indice = 0;
  const risultati = [];

  async function worker() {
    while (indice < elementi.length) {
      const corrente = indice;
      indice += 1;
      risultati.push(await Promise.resolve(elementi[corrente] * 2));
    }
  }

  await Promise.all([worker(), worker()]);
  console.log(risultati.length);`),
      explanation: 'Due worker bastano per rispettare il limite di concorrenza.',
      concepts: ['limite'],
    }),
    guided({
      id: 'w10l5e2',
      title: 'Errore parziale',
      prompt:
        'Elabora [1,2,3] con una funzione che fallisce su 2: stampa `2` successi e `1` errore.',
      starterCode: asyncWrap(`  const esiti = [];
  for (const n of [1, 2, 3]) {
    try {
      esiti.push(await Promise.resolve(n));
    } catch {
      esiti.push('errore');
    }
  }

  console.log();`),
      check: { kind: 'output', lines: ['2', '1'] },
      hints: ['Conta gli errori con filter.', 'esiti.filter(e => e === \'errore\').length'],
      solution: asyncWrap(`  const esiti = [];
  for (const n of [1, 2, 3]) {
    try {
      esiti.push(n === 2 ? await Promise.reject(new Error('errore')) : await Promise.resolve(n));
    } catch {
      esiti.push('errore');
    }
  }

  console.log(esiti.filter((e) => e !== 'errore').length);
  console.log(esiti.filter((e) => e === 'errore').length);`),
      explanation: 'Gestire l’errore per elemento mantiene i risultati parziali.',
      concepts: ['allSettled'],
    }),
    solo({
      id: 'w10l5e3',
      title: 'Concorrenza misurata',
      prompt:
        'Misura il picco di concorrenza con limite 3 su 6 elementi e stampa `true` se il picco è ≤ 3.',
      starterCode: asyncWrap(`  let attivi = 0;
  let picco = 0;

  async function lavora(n) {
    attivi += 1;
    picco = Math.max(picco, attivi);
    await new Promise((r) => setTimeout(r, 3));
    attivi -= 1;
    return n;
  }

  // pool con limite 3
  console.log();`),
      check: { kind: 'output', lines: ['true'] },
      hints: ['Crea 3 worker con Array.from({ length: 3 }, worker).', 'Poi stampa picco <= 3.'],
      solution: asyncWrap(`  let attivi = 0;
  let picco = 0;

  async function lavora(n) {
    attivi += 1;
    picco = Math.max(picco, attivi);
    await new Promise((r) => setTimeout(r, 3));
    attivi -= 1;
    return n;
  }

  const elementi = [1, 2, 3, 4, 5, 6];
  let indice = 0;

  async function worker() {
    while (indice < elementi.length) {
      const corrente = indice++;
      await lavora(elementi[corrente]);
    }
  }

  await Promise.all(Array.from({ length: 3 }, () => worker()));
  console.log(picco <= 3);`),
      explanation: 'Il picco misurato dimostra che il limite funziona.',
      concepts: ['parallelo'],
    }),
    transfer({
      id: 'w10l5e4',
      title: 'Sequenza o parallelo',
      prompt:
        'Hai 3 richieste indipendenti: eseguile in parallelo e stampa `3` (numero di risultati).',
      starterCode: asyncWrap(`  const richieste = [1, 2, 3].map((n) => Promise.resolve(n));

  // esegui in parallelo`),
      objective: 'Scegliere il parallelismo quando le richieste sono indipendenti.',
      check: { kind: 'output', lines: ['3'] },
      hints: ['Le promise sono già state create: Promise.all le attende tutte.', 'const risultati = await Promise.all(richieste)'],
      solution: asyncWrap(`  const richieste = [1, 2, 3].map((n) => Promise.resolve(n));

  const risultati = await Promise.all(richieste);
  console.log(risultati.length);`),
      explanation: 'Creare le promise avvia il lavoro; all raccoglie i risultati.',
      concepts: ['parallelo'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Promise.all su cento richieste',
      code: asyncWrap(`  const url = ['/a', '/b'];
  await Promise.all(url.map((u) => fetch(u)));`),
      error: `Con centinaia di URL il browser accoda le richieste e i timeout si moltiplicano`,
      why: 'Lanciare tutto insieme non è parallelo infinito: il browser ha limiti e le richieste in eccesso restano appese.',
      fix: `// usa un pool con limite, per esempio 6 richieste concorrenti`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l5x1',
      prompt: 'Spiega come funziona un pool di concorrenza e perché è meglio lanciare tutto insieme solo per piccoli numeri.',
      keywords: ['pool', 'worker', 'indice', 'limite', 'concorrenz', 'browser'],
      model:
        'Un pool crea N worker asincroni che condividono un indice: ognuno prende il prossimo elemento appena ha finito, così non ci sono mai più di N operazioni attive. Con pochi elementi lanciare tutto con Promise.all è più semplice, ma con centinaia di richieste il browser le accoda comunque e i timeout si accumulano, quindi il limite esplicito rende il comportamento prevedibile.',
      concepts: ['limite'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l5q1',
      question: 'Perché il pool usa un indice condiviso?',
      options: [
        ['Per assegnare il prossimo elemento al worker libero', 'Esatto.'],
        ['Per ordinare i risultati', 'L’ordine non è garantito dal push.'],
        ['Per evitare le Promise', 'Le usa eccome.'],
      ],
      correct: 0,
      explanation: 'È una coda distribuita tra worker.',
      concepts: ['limite'],
    }),
    quiz({
      id: 'w10l5q2',
      question: 'Cosa succede se un elemento del pool fallisce?',
      options: [
        ['Tutto il pool si ferma', 'Dipende dal try/catch nel worker.'],
        ['Puoi gestirlo per elemento e continuare', 'Esatto, con try/catch nel worker.'],
        ['Promise.all ignora l’errore', 'all fallisce al primo errore.'],
      ],
      correct: 1,
      explanation: 'La gestione per elemento mantiene i risultati parziali.',
      concepts: ['allSettled'],
    }),
    quiz({
      id: 'w10l5q3',
      question: 'Lanciare 100 richieste insieme è consigliato?',
      options: [
        ['Sì, è sempre più veloce', 'Il browser le accoda comunque.'],
        ['No, meglio limitare la concorrenza', 'Esatto.'],
        ['Dipende dal colore del sito', 'Non ha senso.'],
      ],
      correct: 1,
      explanation: 'Il limite rende il comportamento prevedibile.',
      concepts: ['parallelo'],
    }),
  ],
  recap: {
    points: [
      'Pool di worker con indice condiviso.',
      'try/catch per elemento.',
      'allSettled per esiti parziali.',
      'Limite esplicito per molte richieste.',
    ],
    learned: 'Sai orchestrare richieste reali senza sovraccaricare.',
    next: 'AbortController: cancellare richieste e timeout.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w10l6',
  title: 'AbortController',
  subtitle: 'Annullare richieste e gestire timeout',
  minutes: 50,
  objectives: [
    'Annullare una fetch con AbortController',
    'Distinguere l’annullamento da un errore',
    'Implementare un timeout di richiesta',
  ],
  concepts: ['AbortController', 'timeout', 'cancellazione'],
  activate: [
    'L’utente cambia pagina mentre una richiesta è in corso. Cosa fai con la risposta?',
    'La annulli con AbortController: eviti lavoro inutile e aggiornamenti su componenti smontati.',
  ],
  analogy:
    'AbortController è il pulsante di stop della lavatrice: la richiesta non deve finire per forza, puoi interromperla e liberare risorse.',
  example: {
    code: asyncWrap(`  const controller = new AbortController();
  console.log(controller.signal.aborted);
  controller.abort();
  console.log(controller.signal.aborted);

  try {
    await Promise.reject(Object.assign(new Error('aborted'), { name: 'AbortError' }));
  } catch (e) {
    console.log(e.name === 'AbortError' ? 'Annullata' : 'Altro errore');
  }`),
    output: `false
true
Annullata`,
  },
  formal:
    'new AbortController() espone signal, da passare a fetch(url, { signal }). abort() causa il rifiuto con un DOMException named AbortError. L’annullamento è normale, non un errore da mostrare. Per un timeout si combina un timer che chiama abort con AbortSignal.timeout(ms) quando disponibile. Un controller può annullare più richieste se condividono lo stesso signal.',
  worked: {
    code: asyncWrap(`  function richiestaFinta(ms, signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve('risposta'), ms);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        const errore = new Error('aborted');
        errore.name = 'AbortError';
        reject(errore);
      });
    });
  }

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10);

  try {
    await richiestaFinta(100, controller.signal);
  } catch (e) {
    console.log(e.name);
  }`),
    output: `AbortError`,
    steps: [
      ['signal.addEventListener(\'abort\', ...)', 'La richiesta ascolta l’annullamento.'],
      ['clearTimeout(timer)', 'Libera il timer: nessun lavoro residuo.'],
      ['controller.abort()', 'Annulla dopo 10ms, prima della risposta a 100ms.'],
      ['catch (e)', 'L’errore ha name AbortError: va trattato come esito atteso.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l6e1',
      title: 'Annulla',
      prompt: 'Annulla il controller e stampa `true` leggendo signal.aborted.',
      starterCode: asyncWrap(`  const controller = new AbortController();

  // annulla
  console.log(controller.signal.aborted);`),
      check: { kind: 'output', lines: ['true'] },
      hints: ['Il metodo è abort().', 'controller.abort()'],
      solution: asyncWrap(`  const controller = new AbortController();

  controller.abort();
  console.log(controller.signal.aborted);`),
      explanation: 'signal.aborted diventa true immediatamente dopo abort.',
      concepts: ['AbortController'],
    }),
    guided({
      id: 'w10l6e2',
      title: 'Riconosci AbortError',
      prompt:
        'Cattura l’errore e stampa `annullata` se il nome è AbortError.',
      starterCode: asyncWrap(`  const errore = new Error('aborted');
  errore.name = 'AbortError';

  try {
    throw errore;
  } catch (e) {
    console.log(e.name === 'AbortError' ? '' : 'altro');
  }`),
      check: { kind: 'output', lines: ['annullata'] },
      hints: ['Sostituisci la stringa vuota con annullata.', 'Il ternario è già impostato.'],
      solution: asyncWrap(`  const errore = new Error('aborted');
  errore.name = 'AbortError';

  try {
    throw errore;
  } catch (e) {
    console.log(e.name === 'AbortError' ? 'annullata' : 'altro');
  }`),
      explanation: 'L’annullamento va distinto dagli errori reali.',
      concepts: ['cancellazione'],
    }),
    solo({
      id: 'w10l6e3',
      title: 'Timeout',
      prompt:
        'Annulla una richiesta lenta con un timeout di 10ms e stampa `timeout`.',
      starterCode: asyncWrap(`  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10);

  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve('ok'), 50);
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timer);
        const e = new Error('aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  } catch (e) {
    // stampa
  }`),
      check: { kind: 'output', lines: ['timeout'] },
      hints: ['Nel catch, se name è AbortError stampa timeout.', 'Non stampare l’errore tecnico.'],
      solution: asyncWrap(`  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10);

  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve('ok'), 50);
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timer);
        const e = new Error('aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  } catch (e) {
    if (e.name === 'AbortError') console.log('timeout');
  }`),
      explanation: 'Il timeout è un annullamento programmato: la richiesta non resta appesa.',
      concepts: ['timeout'],
    }),
    transfer({
      id: 'w10l6e4',
      title: 'Condividi il signal',
      prompt:
        'Due richieste condividono lo stesso signal: annulla e stampa `2` (entrambe annullate).',
      starterCode: asyncWrap(`  const controller = new AbortController();
  let annullate = 0;

  function richiesta(signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 50);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        annullate += 1;
        const e = new Error('aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  }

  const a = richiesta(controller.signal).catch(() => {});
  const b = richiesta(controller.signal).catch(() => {});
  controller.abort();
  await Promise.allSettled([a, b]);
  console.log();`),
      objective: 'Capire che un signal può annullare un gruppo di richieste.',
      check: { kind: 'output', lines: ['2'] },
      hints: ['Stampa annullate.', 'Entrambe le richieste condividono il signal.'],
      solution: asyncWrap(`  const controller = new AbortController();
  let annullate = 0;

  function richiesta(signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 50);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        annullate += 1;
        const e = new Error('aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  }

  const a = richiesta(controller.signal).catch(() => {});
  const b = richiesta(controller.signal).catch(() => {});
  controller.abort();
  await Promise.allSettled([a, b]);
  console.log(annullate);`),
      explanation: 'Un solo abort annulla tutte le richieste collegate: cleanup in blocco.',
      concepts: ['AbortController'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Mostrare l’annullamento come errore',
      code: asyncWrap(`  try {
    await fetch('/api', { signal: controller.signal });
  } catch (e) {
    alert('Errore grave: ' + e.message);
  }`),
      error: `L’utente vede un errore quando ha solo cambiato pagina`,
      why: 'AbortError è un esito atteso, non un guasto.',
      fix: `catch (e) {
  if (e.name !== 'AbortError') alert('Connessione non riuscita');
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l6x1',
      prompt: 'Spiega come annulli una richiesta e perché AbortError non va mostrato come errore.',
      keywords: ['abortcontroller', 'signal', 'abort', 'annull', 'timeout', 'normale'],
      model:
        'Creo un AbortController, passo il suo signal alla fetch e chiamo abort quando la richiesta non serve più. La promise viene rifiutata con un errore chiamato AbortError. Non è un guasto: è un’azione voluta, quindi la gestisco separatamente e non mostro un messaggio d’errore all’utente. Lo stesso signal può annullare più richieste insieme.',
      concepts: ['AbortController'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l6q1',
      question: 'Come si annulla una fetch?',
      options: [
        ['Con controller.abort()', 'Esatto.'],
        ['Con fetch.abort()', 'fetch non ha abort.'],
        ['Con clearTimeout', 'Non annulla la richiesta.'],
      ],
      correct: 0,
      explanation: 'abort rifiuta la promise con AbortError.',
      concepts: ['AbortController'],
    }),
    quiz({
      id: 'w10l6q2',
      question: 'Come riconosci un annullamento?',
      options: [
        ['e.name === \'AbortError\'', 'Esatto.'],
        ['e.message === \'abort\'', 'Il nome è più affidabile.'],
        ['e instanceof Promise', 'No: un annullamento è un errore DOMException, non una Promise.'],
      ],
      correct: 0,
      explanation: 'Il nome dell’errore identifica l’annullamento.',
      concepts: ['cancellazione'],
    }),
    quiz({
      id: 'w10l6q3',
      question: 'Un signal può annullare più richieste?',
      options: [
        ['No, una sola', 'Può annullarne quante lo condividono.'],
        ['Sì, tutte quelle che lo condividono', 'Esatto.'],
        ['Solo con AbortSignal.timeout', 'No: anche un controller condiviso annulla più richieste.'],
      ],
      correct: 1,
      explanation: 'Un solo abort per un gruppo.',
      concepts: ['AbortController'],
    }),
  ],
  recap: {
    points: [
      'AbortController annulla richieste e listener.',
      'AbortError è un esito atteso.',
      'Timeout = abort programmato.',
      'Un signal per più richieste.',
    ],
    learned: 'Sai cancellare il lavoro inutile e gestire i timeout.',
    next: 'Ripasso e progetto: caricare spese da un’API finta.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w10l7',
  title: 'Ripasso e progetto',
  subtitle: 'Caricare spese da un’API finta',
  minutes: 60,
  objectives: [
    'Unire fetch simulata, validazione e stato',
    'Gestire caricamento, errore e stato vuoto',
    'Annullare una richiesta superata',
  ],
  concepts: ['ripasso', 'progetto', 'stati di caricamento'],
  activate: [
    'Quali stati deve avere un’interfaccia che carica dati?',
    'Caricamento, successo con dati, successo vuoto, errore. Ognuno merita un messaggio.',
  ],
  analogy:
    'Gli stati di caricamento sono i semafori dell’interfaccia: l’utente deve sapere se sta aspettando, se è arrivato qualcosa o se deve riprovare.',
  example: {
    code: asyncWrap(`  const api = {
    lista: async () => {
      await new Promise((r) => setTimeout(r, 5));
      return { ok: true, json: async () => ({ spese: [{ importo: 10 }, { importo: 20 }] }) };
    },
  };

  async function carica() {
    const risposta = await api.lista();
    if (!risposta.ok) throw new Error('HTTP');
    const dati = await risposta.json();
    return Array.isArray(dati.spese) ? dati.spese : [];
  }

  const spese = await carica();
  console.log(spese.length);
  console.log(spese.reduce((a, s) => a + s.importo, 0));`),
    output: `2
30`,
  },
  formal:
    'Un caricamento ben progettato espone almeno tre stati: loading, error, data. Il render dipende dallo stato, non da variabili sparse. Se l’utente cambia richiesta, quella precedente va annullata per evitare che una risposta vecchia sovrascriva quella nuova. Il `finally` riporta sempre loading a false.',
  worked: {
    code: asyncWrap(`  const stato = { loading: false, errore: null, spese: [] };

  async function carica(api, signal) {
    stato.loading = true;
    stato.errore = null;
    try {
      const risposta = await api(signal);
      if (!risposta.ok) throw new Error('HTTP ' + risposta.status);
      const dati = await risposta.json();
      stato.spese = Array.isArray(dati.spese) ? dati.spese : [];
    } catch (e) {
      if (e.name === 'AbortError') return;
      stato.errore = 'Caricamento non riuscito';
    } finally {
      stato.loading = false;
    }
  }

  const api = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ spese: [{ importo: 5 }, { importo: 15 }] }),
  });

  await carica(api);
  console.log(stato.loading);
  console.log(stato.spese.length);`),
    output: `false
2`,
    steps: [
      ['stato.loading = true', 'L’interfaccia sa che deve mostrare uno spinner.'],
      ['stato.errore = null', 'Reset dell’errore precedente.'],
      ['if (!risposta.ok) throw ...', 'Gli stati HTTP diventano errori gestiti.'],
      ['finally', 'loading torna false in ogni caso.'],
      ['AbortError → return', 'Un annullamento non è un errore da mostrare.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l7e1',
      title: 'Stato di caricamento',
      prompt: 'Imposta loading a true, poi a false nel finally, e stampa `false`.',
      starterCode: asyncWrap(`  const stato = { loading: false };

  async function carica() {
    stato.loading = true;
    try {
      await Promise.resolve();
    } finally {
      // ripristina
    }
  }

  await carica();
  console.log(stato.loading);`),
      check: { kind: 'output', lines: ['false'] },
      hints: ['Nel finally imposta loading a false.', 'stato.loading = false'],
      solution: asyncWrap(`  const stato = { loading: false };

  async function carica() {
    stato.loading = true;
    try {
      await Promise.resolve();
    } finally {
      stato.loading = false;
    }
  }

  await carica();
  console.log(stato.loading);`),
      explanation: 'finally garantisce che lo spinner sparisca anche in caso di errore.',
      concepts: ['stati di caricamento'],
    }),
    guided({
      id: 'w10l7e2',
      title: 'Errore leggibile',
      prompt:
        'Se la risposta non è ok, imposta `stato.errore` a `Riprova più tardi` e stampalo.',
      starterCode: asyncWrap(`  const stato = { loading: false, errore: null };
  const api = async () => ({ ok: false, status: 500, json: async () => ({}) });

  try {
    const r = await api();
    if (!r.ok) throw new Error('HTTP');
  } catch {
    // messaggio utente
  }

  console.log(stato.errore);`),
      check: { kind: 'output', lines: ['Riprova più tardi'] },
      hints: ['Nel catch assegna il messaggio allo stato.', 'stato.errore = \'Riprova più tardi\'.'],
      solution: asyncWrap(`  const stato = { loading: false, errore: null };
  const api = async () => ({ ok: false, status: 500, json: async () => ({}) });

  try {
    const r = await api();
    if (!r.ok) throw new Error('HTTP');
  } catch {
    stato.errore = 'Riprova più tardi';
  }

  console.log(stato.errore);`),
      explanation: 'Lo stato dell’errore è un dato, non un alert.',
      concepts: ['stati di caricamento'],
    }),
    solo({
      id: 'w10l7e3',
      title: 'Stato vuoto',
      prompt:
        'Con una risposta senza spese, stampa `0` e `Nessuna spesa` senza errori.',
      starterCode: asyncWrap(`  const risposta = { ok: true, json: async () => ({}) };

  const dati = await risposta.json();
  const spese = Array.isArray(dati.spese) ? dati.spese : [];

  // stampa
  `),
      check: { kind: 'output', lines: ['0', 'Nessuna spesa'] },
      hints: ['spese.length', 'Se 0, stampa il messaggio.'],
      solution: asyncWrap(`  const risposta = { ok: true, json: async () => ({}) };

  const dati = await risposta.json();
  const spese = Array.isArray(dati.spese) ? dati.spese : [];

  console.log(spese.length);
  if (spese.length === 0) console.log('Nessuna spesa');`),
      explanation: 'Il vuoto è uno stato legittimo e va comunicato.',
      concepts: ['stati di caricamento'],
    }),
    transfer({
      id: 'w10l7e4',
      title: 'Annulla la precedente',
      prompt:
        'Due richieste con lo stesso controller: annulla la prima e stampa `annullata` per lei e `ok` per la seconda.',
      starterCode: asyncWrap(`  const controller1 = new AbortController();
  const controller2 = new AbortController();

  function richiesta(signal, valore) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => resolve(valore), 5);
      signal.addEventListener('abort', () => {
        clearTimeout(t);
        const e = new Error('aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  }

  const p1 = richiesta(controller1.signal, 'ok').catch((e) => (e.name === 'AbortError' ? 'annullata' : 'errore'));
  const p2 = richiesta(controller2.signal, 'ok');
  controller1.abort();

  console.log(await p1);
  console.log(await p2);`),
      objective: 'Capire come evitare che una risposta vecchia sovrascriva quella nuova.',
      check: { kind: 'output', lines: ['annullata', 'ok'] },
      hints: ['Non serve modificare il codice.', 'controller1 annulla solo la prima richiesta.'],
      solution: asyncWrap(`  const controller1 = new AbortController();
  const controller2 = new AbortController();

  function richiesta(signal, valore) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => resolve(valore), 5);
      signal.addEventListener('abort', () => {
        clearTimeout(t);
        const e = new Error('aborted');
        e.name = 'AbortError';
        reject(e);
      });
    });
  }

  const p1 = richiesta(controller1.signal, 'ok').catch((e) => (e.name === 'AbortError' ? 'annullata' : 'errore'));
  const p2 = richiesta(controller2.signal, 'ok');
  controller1.abort();

  console.log(await p1);
  console.log(await p2);`),
      explanation: 'Ogni richiesta ha il suo controller: annullare la vecchia non tocca la nuova.',
      concepts: ['cancellazione'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Risposta vecchia che sovrascrive',
      code: asyncWrap(`  const prima = apiLenta();
  const seconda = apiVeloce();
  const a = await prima;
  const b = await seconda;
  stato.spese = a.spese; // sbagliato: vince la prima arrivata
  stato.spese = b.spese;`),
      error: `Se la prima risposta arriva dopo, può sovrascrivere dati più recenti`,
      why: 'Senza annullamento o controllo di versione, l’ordine di arrivo non è garantito.',
      fix: `// annulla la richiesta precedente quando ne parte una nuova`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l7x1',
      prompt: 'Spiega come gestisci gli stati di un caricamento e perché annulli la richiesta precedente.',
      keywords: ['loading', 'errore', 'vuoto', 'annull', 'stato', 'render'],
      model:
        'Mantengo uno stato con loading, errore e dati. Il render mostra lo spinner durante loading, il messaggio di errore se presente, il messaggio di vuoto se la lista è vuota, altrimenti i dati. Quando parte una nuova richiesta annullo la precedente con AbortController, così una risposta vecchia e lenta non può sovrascrivere quella nuova.',
      concepts: ['stati di caricamento'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l7q1',
      question: 'Quali stati deve distinguere un caricamento?',
      options: [
        ['Solo successo ed errore', 'Manca il caricamento e il vuoto.'],
        ['Caricamento, errore, vuoto, dati', 'Esatto.'],
        ['Solo dati', 'Insufficiente.'],
      ],
      correct: 1,
      explanation: 'Ogni stato merita un messaggio.',
      concepts: ['stati di caricamento'],
    }),
    quiz({
      id: 'w10l7q2',
      question: 'Perché annullare la richiesta precedente?',
      options: [
        ['Per evitare che una risposta vecchia sovrascriva quella nuova', 'Esatto.'],
        ['Per risparmiare memoria del server', 'Non è il motivo principale.'],
        ['Perché fetch non permette due richieste', 'Le permette.'],
      ],
      correct: 0,
      explanation: 'L’ordine di arrivo non è garantito.',
      concepts: ['cancellazione'],
    }),
    quiz({
      id: 'w10l7q3',
      question: 'Dove riporti loading a false?',
      options: [
        ['Nel finally', 'Esatto.'],
        ['Solo nel ramo di successo', 'Con un errore resterebbe true.'],
        ['Mai', 'Lo spinner non sparirebbe.'],
      ],
      correct: 0,
      explanation: 'finally copre tutti gli esiti.',
      concepts: ['stati di caricamento'],
    }),
  ],
  recap: {
    points: [
      'Stati espliciti: loading, error, empty, data.',
      'finally per chiudere il caricamento.',
      'AbortController per le richieste superate.',
      'Validazione al confine dei dati.',
    ],
    learned: 'Il quaderno carica dati come un’app reale.',
    next: 'Lato professionale: osservare le richieste di rete.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w10l8',
  title: 'Lato professionale e test',
  subtitle: 'Network panel, cache e verifica della settimana',
  minutes: 50,
  objectives: [
    'Leggere una richiesta nel pannello Network',
    'Capire status, timing e payload',
    'Superare il test della settimana',
  ],
  concepts: ['DevTools Network', 'cache', 'test'],
  activate: [
    'Una richiesta “fallisce” ma il server diziona 200. Dove guardi per capire?',
    'Nel pannello Network: status, headers, payload e risposta reale.',
  ],
  analogy:
    'Il pannello Network è il registro dei corrieri: ogni pacco, il suo stato, quanto ha impiegato e cosa conteneva. Senza registro, si indovina.',
  example: {
    code: asyncWrap(`  const risposta = {
    ok: true,
    status: 200,
    headers: new Map([['content-type', 'application/json']]),
    json: async () => ({ spese: [] }),
  };

  console.log(risposta.status);
  console.log(risposta.headers.get('content-type'));
  console.log(Array.isArray((await risposta.json()).spese));`),
    output: `200
application/json
true`,
  },
  formal:
    'Nel pannello Network vedi metodo, URL, status, tempo, dimensione e risposta. “Disable cache” nelle opzioni evita risultati falsati durante lo sviluppo. La colonna Timing separa DNS, connessione, attesa del server e download. Un payload JSON si ispeziona nel tab Response. Per le API pubbliche leggi sempre la documentazione su MDN o sul sito ufficiale, non fidarti dei tutorial vecchi.',
  worked: {
    code: asyncWrap(`  const cache = new Map();

  async function conCache(chiave, carica) {
    if (cache.has(chiave)) {
      return { fonte: 'cache', dati: cache.get(chiave) };
    }
    const dati = await carica();
    cache.set(chiave, dati);
    return { fonte: 'rete', dati };
  }

  const prima = await conCache('spese', () => Promise.resolve([1, 2]));
  const seconda = await conCache('spese', () => Promise.resolve([3]));

  console.log(prima.fonte);
  console.log(seconda.fonte);
  console.log(seconda.dati.length);`),
    output: `rete
cache
2`,
    steps: [
      ['cache.has(chiave)', 'La cache evita richieste ripetute.'],
      ['cache.get(chiave)', 'Restituisce il valore memorizzato.'],
      ['cache.set(chiave, dati)', 'Salva il risultato dopo la prima richiesta.'],
      ['seconda chiamata', 'Non chiama il caricatore: restituisce la cache.'],
      ['fonte', 'Distinguere la fonte è utile per il debug e per l’interfaccia.'],
    ],
  },
  exercises: [
    fill({
      id: 'w10l8e1',
      title: 'Status',
      prompt: 'Stampa `200` leggendo lo status della risposta.',
      starterCode: asyncWrap(`  const risposta = { status: 200, ok: true };

  console.log(risposta.);`),
      check: { kind: 'output', lines: ['200'] },
      hints: ['La proprietà è status.', 'risposta.status'],
      solution: asyncWrap(`  const risposta = { status: 200, ok: true };

  console.log(risposta.status);`),
      explanation: 'Lo status è il primo dato da controllare nel Network.',
      concepts: ['DevTools Network'],
    }),
    guided({
      id: 'w10l8e2',
      title: 'Content type',
      prompt: 'Con headers come Map, stampa il content-type (`application/json`).',
      starterCode: asyncWrap(`  const headers = new Map([['content-type', 'application/json']]);

  console.log(headers.());`),
      check: { kind: 'output', lines: ['application/json'] },
      hints: ['Map legge con get.', 'headers.get(\'content-type\')'],
      solution: asyncWrap(`  const headers = new Map([['content-type', 'application/json']]);

  console.log(headers.get('content-type'));`),
      explanation: 'Il content-type dice come interpretare il corpo.',
      concepts: ['DevTools Network'],
    }),
    solo({
      id: 'w10l8e3',
      title: 'Cache semplice',
      prompt:
        'Implementa una cache: la seconda chiamata deve restituire dalla cache. Stampa `rete` e `cache`.',
      starterCode: asyncWrap(`  const cache = new Map();
  let chiamate = 0;

  async function carica() {
    if (cache.has('k')) return 'cache';
    chiamate += 1;
    cache.set('k', true);
    return 'rete';
  }

  console.log(await carica());
  console.log();`),
      check: { kind: 'output', lines: ['rete', 'cache'] },
      hints: ['La seconda chiamata restituisce cache.', 'console.log(await carica())'],
      solution: asyncWrap(`  const cache = new Map();
  let chiamate = 0;

  async function carica() {
    if (cache.has('k')) return 'cache';
    chiamate += 1;
    cache.set('k', true);
    return 'rete';
  }

  console.log(await carica());
  console.log(await carica());`),
      explanation: 'La cache è una scelta di prodotto: va invalidata quando i dati cambiano.',
      concepts: ['cache'],
    }),
    transfer({
      id: 'w10l8e4',
      title: 'Timing',
      prompt:
        'Misura con performance.now() una richiesta finta e stampa `true` se la durata è un numero finito.',
      starterCode: asyncWrap(`  const inizio = performance.now();
  await new Promise((r) => setTimeout(r, 10));

  // calcola e stampa
  `),
      objective: 'Misurare il tempo di una richiesta come nel pannello Network.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['const durata = performance.now() - inizio;', 'console.log(Number.isFinite(durata))'],
      solution: asyncWrap(`  const inizio = performance.now();
  await new Promise((r) => setTimeout(r, 10));

  const durata = performance.now() - inizio;
  console.log(Number.isFinite(durata));`),
      explanation: 'Misurare è il primo passo per capire se un caricamento è lento.',
      concepts: ['DevTools Network'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Cache senza invalidazione',
      code: asyncWrap(`  const cache = new Map();
  async function carica() {
    if (cache.has('spese')) return cache.get('spese');
    const dati = await api();
    cache.set('spese', dati);
    return dati;
  }`),
      error: `Dopo aver aggiunto una spesa, la lista mostra ancora i vecchi dati`,
      why: 'La cache non viene invalidata quando i dati cambiano.',
      fix: `// invalida la chiave dopo una mutation: cache.delete('spese');`,
    }),
  ],
  explains: [
    explain({
      id: 'w10l8x1',
      prompt: 'Spiega cosa controlli nel pannello Network quando una richiesta non funziona come previsto.',
      keywords: ['network', 'status', 'headers', 'payload', 'timing', 'cache'],
      model:
        'Controllo prima lo status per capire se il server ha accettato la richiesta, poi il metodo e l’URL per verificare che siano corretti, quindi headers e content-type per capire il formato e infine il payload inviato e la risposta ricevuta. Se il comportamento sembra casuale, disattivo la cache e guardo i tempi per capire se c’è un timeout o una risposta vecchia.',
      concepts: ['DevTools Network'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w10l8q1',
      question: 'Dove vedi il corpo di una risposta?',
      options: [
        ['Nel tab Response del pannello Network', 'Esatto.'],
        ['Nel pannello Elements', 'Mostra il DOM.'],
        ['Nella console sempre', 'Solo se lo logghi.'],
      ],
      correct: 0,
      explanation: 'Response contiene il payload ricevuto.',
      concepts: ['DevTools Network'],
    }),
    quiz({
      id: 'w10l8q2',
      question: 'Cosa fa “Disable cache” in DevTools?',
      options: [
        ['Evita che la cache falsi i test durante lo sviluppo', 'Esatto.'],
        ['Cancella il database', 'No: svuota la cache HTTP, non il database.'],
        ['Disabilita il service worker per sempre', 'Solo mentre il pannello è aperto.'],
      ],
      correct: 0,
      explanation: 'La cache può nascondere modifiche recenti.',
      concepts: ['cache'],
    }),
    quiz({
      id: 'w10l8q3',
      question: 'Perché una cache va invalidata?',
      options: [
        ['Per mostrare dati aggiornati dopo una modifica', 'Esatto.'],
        ['Per occupare meno memoria', 'È l’opposto.'],
        ['Perché il browser la cancella da solo', 'Non sempre.'],
      ],
      correct: 0,
      explanation: 'La cache è utile solo se i dati restano coerenti.',
      concepts: ['cache'],
    }),
  ],
  recap: {
    points: [
      'Network mostra status, payload e tempi.',
      'Disable cache durante lo sviluppo.',
      'La cache va invalidata dopo le modifiche.',
      'Leggi la documentazione ufficiale delle API.',
    ],
    learned: 'Sai diagnosticare le richieste come un professionista.',
    next: 'Settimana 11: errori, storage e persistenza.',
  },
});

export const week10 = makeWeek({
  id: W,
  number: 10,
  title: 'Async avanzato e API',
  subtitle: 'async/await, fetch e richieste reali',
  description:
    'Dal codice asincrono alla comunicazione con un’API: await, fetch, validazione delle risposte, errori, concorrenza limitata e annullamento.',
  goals: [
    'Scrivere codice async leggibile',
    'Consumare un’API REST in sicurezza',
    'Gestire errori tecnici e messaggi utente',
    'Annullare richieste superate',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — API finta',
    brief:
      'Il quaderno carica spese da un’API simulata, con stati di caricamento, validazione e annullamento delle richieste superate.',
    deliverable: 'Flusso completo: loading, errore, vuoto, dati e retry.',
    milestones: [
      'Client API con controllo ok',
      'Stati di caricamento espliciti',
      'AbortController sulla richiesta precedente',
    ],
  },
  professional: {
    title: 'Osservare la rete',
    topics: [
      'Pannello Network: status, headers, payload, timing',
      'Cache e invalidazione',
      'Leggere la documentazione di un’API',
    ],
    exercise: 'Individuare in Network una risposta lenta e una in cache, spiegando la differenza nei tempi.',
  },
});
