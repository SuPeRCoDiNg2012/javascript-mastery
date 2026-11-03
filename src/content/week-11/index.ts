import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-11';
const asyncWrap = (body: string) => `(async () => {\n${body}\n})();`;

const l1 = lesson(W, 1, {
  id: 'w11l1',
  title: 'try / catch / finally',
  subtitle: 'Gestire ciò che può andare storto',
  minutes: 50,
  objectives: [
    'Intercettare un errore con try/catch',
    'Usare finally per la pulizia',
    'Evitare try inutili e troppo ampi',
  ],
  concepts: ['try/catch', 'finally', 'gestione errori'],
  activate: [
    'Un errore non gestito interrompe lo script. Vuoi che l’intera pagina smetta di funzionare per un dato corrotto?',
    'No: catturi l’errore dove ha senso e continui con il resto.',
  ],
  analogy:
    'try è la zona di lavoro, catch è la rete di sicurezza, finally è ciò che fai comunque: spegnere la luce, chiudere la porta.',
  example: {
    code: `function dividi(a, b) {
  if (b === 0) {
    throw new Error('Divisione per zero');
  }
  return a / b;
}

try {
  console.log(dividi(10, 2));
  console.log(dividi(10, 0));
} catch (errore) {
  console.log('Errore: ' + errore.message);
} finally {
  console.log('Fine');
}`,
    output: `5
Errore: Divisione per zero
Fine`,
  },
  formal:
    'try contiene il codice che può lanciare. catch riceve l’errore e decide cosa fare; se non gestisce, deve rilanciare. finally esegue sempre, anche con return o throw nel try. Il try va tenuto stretto: avvolgere 50 righe rende difficile capire cosa è fallito. Un catch vuoto è quasi sempre un bug.',
  worked: {
    code: `function leggiNumero(valore) {
  const numero = Number(valore);
  if (!Number.isFinite(numero)) {
    throw new TypeError('Non è un numero: ' + valore);
  }
  return numero;
}

function processa(valori) {
  const validi = [];
  for (const valore of valori) {
    try {
      validi.push(leggiNumero(valore));
    } catch (errore) {
      console.log('Scartato: ' + errore.message);
    }
  }
  return validi;
}

const risultato = processa(['10', 'abc', '20']);
console.log(risultato.length);
console.log(risultato.reduce((a, b) => a + b, 0));`,
    output: `Scartato: Non è un numero: abc
2
30`,
    steps: [
      ['if (!Number.isFinite(numero)) throw', 'Il controllo lancia un errore tipizzato.'],
      ['try per singolo elemento', 'Il try è stretto: isola esattamente l’operazione rischiosa.'],
      ['catch dentro il ciclo', 'Un dato invalido non interrompe l’elaborazione degli altri.'],
      ['validi.push(...)', 'Solo i valori validi entrano nel risultato.'],
      ['reduce', 'Il totale è calcolato sui dati puliti.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l1e1',
      title: 'Cattura',
      prompt: 'Cattura l’errore e stampa `Divisione per zero`.',
      starterCode: `try {
  throw new Error('Divisione per zero');
} {
  console.log(errore.message);
}`,
      check: { kind: 'output', lines: ['Divisione per zero'] },
      hints: ['Manca il blocco catch.', 'catch (errore) { ... }'],
      solution: `try {
  throw new Error('Divisione per zero');
} catch (errore) {
  console.log(errore.message);
}`,
      explanation: 'catch riceve l’errore lanciato nel try.',
      concepts: ['try/catch'],
    }),
    guided({
      id: 'w11l1e2',
      title: 'Finally',
      prompt: 'Esegui la pulizia sempre: stampa `pulizia` sia con successo sia con errore.',
      starterCode: `try {
  throw new Error('x');
} catch {
  console.log('gestito');
} {
  console.log('pulizia');
}`,
      check: { kind: 'output', lines: ['gestito', 'pulizia'] },
      hints: ['Manca la parola finally.', 'finally { ... }'],
      solution: `try {
  throw new Error('x');
} catch {
  console.log('gestito');
} finally {
  console.log('pulizia');
}`,
      explanation: 'finally esegue indipendentemente dall’esito.',
      concepts: ['finally'],
    }),
    solo({
      id: 'w11l1e3',
      title: 'Elabora e scarta',
      prompt:
        'Da `[\'10\', \'x\', \'20\']` somma solo i numeri validi e stampa `30`, scartando l’invalido.',
      starterCode: `const valori = ['10', 'x', '20'];

// try/catch per elemento`,
      check: { kind: 'output', lines: ['30'] },
      hints: ['Number(\'x\') è NaN: lancialo o scartalo.', 'Accumula solo i valori finiti.'],
      solution: `const valori = ['10', 'x', '20'];
let totale = 0;

for (const valore of valori) {
  try {
    const numero = Number(valore);
    if (!Number.isFinite(numero)) throw new TypeError('invalido');
    totale += numero;
  } catch {
    // scarta
  }
}

console.log(totale);`,
      explanation: 'Il try stretto nel ciclo mantiene il controllo per elemento.',
      concepts: ['try/catch'],
    }),
    transfer({
      id: 'w11l1e4',
      title: 'Rilancia',
      prompt:
        'Cattura un errore, stampa `log`, poi rilancia; il chiamante lo cattura e stampa `esterno`.',
      starterCode: `function interna() {
  try {
    throw new Error('x');
  } catch (e) {
    console.log('log');
    // rilancia
  }
}

try {
  interna();
} catch {
  console.log('esterno');
}`,
      objective: 'Capire la gestione a livelli: log locale, gestione al chiamante.',
      check: { kind: 'output', lines: ['log', 'esterno'] },
      hints: ['Rilancia con throw e.', 'L’errore risale al chiamante.'],
      solution: `function interna() {
  try {
    throw new Error('x');
  } catch (e) {
    console.log('log');
    throw e;
  }
}

try {
  interna();
} catch {
  console.log('esterno');
}`,
      explanation: 'Loggare e rilanciare permette di diagnosticare senza nascondere l’errore.',
      concepts: ['gestione errori'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Catch troppo ampio',
      code: `try {
  const dati = caricaDati();
  elabora(dati);
  salva(dati);
  aggiornaInterfaccia(dati);
} catch {
  console.log('errore');
}`,
      error: `Non sai quale dei quattro passaggi è fallito, e gli altri vengono saltati`,
      why: 'Un try enorme perde la localizzazione dell’errore.',
      fix: `try {
  salva(elabora(caricaDati()));
} catch (e) {
  console.error('Salvataggio fallito', e);
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l1x1',
      prompt: 'Spiega a cosa servono try, catch e finally e perché il try va tenuto stretto.',
      keywords: ['try', 'catch', 'finally', 'stretto', 'pulizia', 'errore'],
      model:
        'try delimita il codice che può fallire, catch gestisce l’errore e finally esegue sempre, anche con return o throw. Tengo il try stretto perché un blocco ampio rende difficile capire quale operazione è fallita e interrompe passaggi che avrebbero potuto funzionare. finally è il posto per la pulizia: chiudere file, nascondere spinner, liberare risorse.',
      concepts: ['gestione errori'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l1q1',
      question: 'Quando esegue finally?',
      options: [
        ['Solo se non ci sono errori', 'Esegue sempre.'],
        ['Sempre', 'Esatto.'],
        ['Solo in caso di errore', 'Quello è catch.'],
      ],
      correct: 1,
      explanation: 'finally copre tutti i percorsi.',
      concepts: ['finally'],
    }),
    quiz({
      id: 'w11l1q2',
      question: 'Perché un catch vuoto è pericoloso?',
      options: [
        ['Perché nasconde il problema', 'Esatto.'],
        ['Perché è illegale', 'È sintatticamente valido.'],
        ['Perché rallenta il codice', 'Non è performance.'],
      ],
      correct: 0,
      explanation: 'Meglio loggare o rilanciare.',
      concepts: ['gestione errori'],
    }),
    quiz({
      id: 'w11l1q3',
      question: 'Dove va il try in un’elaborazione di lista?',
      options: [
        ['Intorno all’intero ciclo', 'Un errore perderebbe tutti gli elementi.'],
        ['Intorno all’operazione rischiosa del singolo elemento', 'Esatto.'],
        ['Non serve', 'Serve.'],
      ],
      correct: 1,
      explanation: 'Il try stretto mantiene i risultati parziali.',
      concepts: ['try/catch'],
    }),
  ],
  recap: {
    points: [
      'try delimita, catch gestisce, finally pulisce.',
      'finally esegue sempre.',
      'try stretto per localizzare gli errori.',
      'Rilancia se non puoi gestire.',
    ],
    learned: 'Sai gestire gli errori senza nasconderli.',
    next: 'Errori personalizzati: classi che parlano il dominio.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w11l2',
  title: 'Errori personalizzati',
  subtitle: 'throw, classi di errore e codici',
  minutes: 50,
  objectives: [
    'Lanciare errori con throw',
    'Estendere Error per il dominio',
    'Gestire i casi con instanceof',
  ],
  concepts: ['throw', 'classi di errore', 'instanceof'],
  activate: [
    'Un errore di validazione e uno di rete richiedono azioni diverse. Come li distingui?',
    'Con classi di errore dedicate e instanceof, invece di confrontare stringhe.',
  ],
  analogy:
    'Le classi di errore sono reparti di ospedale: chi arriva viene smistato per tipo. Confrontare i messaggi è come leggere il sintomo a voce: impreciso.',
  example: {
    code: `class ErroreValidazione extends Error {
  constructor(campo) {
    super('Campo non valido: ' + campo);
    this.name = 'ErroreValidazione';
    this.campo = campo;
  }
}

class ErroreRete extends Error {
  constructor(codice) {
    super('Errore di rete ' + codice);
    this.name = 'ErroreRete';
    this.codice = codice;
  }
}

try {
  throw new ErroreValidazione('importo');
} catch (errore) {
  if (errore instanceof ErroreValidazione) {
    console.log('Validazione: ' + errore.campo);
  } else if (errore instanceof ErroreRete) {
    console.log('Rete');
  }
}`,
    output: `Validazione: importo`,
  },
  formal:
    'throw può lanciare qualsiasi valore, ma lancia sempre Error o sottoclassi: perdere lo stack rende il debug difficile. Una classe di errore estende Error, imposta name e aggiunge campi utili (codice, campo, status). instanceof funziona con la catena di ereditarietà. I messaggi servono a chi legge i log; i campi strutturati servono al codice.',
  worked: {
    code: `class ErroreImporto extends Error {
  constructor(valore) {
    super('Importo non valido: ' + valore);
    this.name = 'ErroreImporto';
    this.valore = valore;
  }
}

function valida(importo) {
  if (typeof importo !== 'number') {
    throw new ErroreImporto(importo);
  }
  if (importo <= 0) {
    throw new ErroreImporto(importo);
  }
  return true;
}

for (const valore of [10, -1, 'abc']) {
  try {
    valida(valore);
    console.log('ok');
  } catch (errore) {
    if (errore instanceof ErroreImporto) {
      console.log('Importo rifiutato: ' + errore.valore);
    } else {
      console.log('Errore inatteso');
    }
  }
}`,
    output: `ok
Importo rifiutato: -1
Importo rifiutato: abc`,
    steps: [
      ['class ErroreImporto extends Error', 'Un tipo specifico per il dominio.'],
      ['this.valore = valore', 'Il dato che ha causato l’errore resta disponibile.'],
      ['throw new ErroreImporto(importo)', 'Il controllo lancia il tipo giusto.'],
      ['instanceof', 'Il chiamante distingue gli errori attesi dagli imprevisti.'],
      ['else', 'Gli errori non previsti non vengono mascherati.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l2e1',
      title: 'Lancia un errore',
      prompt: 'Lancia `new Error(\'non valido\')` e cattura il messaggio stampandolo.',
      starterCode: `try {
  ('non valido');
} catch (e) {
  console.log(e.message);
}`,
      check: { kind: 'output', lines: ['non valido'] },
      hints: ['Manca throw e new Error.', 'throw new Error(\'non valido\');'],
      solution: `try {
  throw new Error('non valido');
} catch (e) {
  console.log(e.message);
}`,
      explanation: 'throw interrompe il flusso normale e cerca un catch.',
      concepts: ['throw'],
    }),
    guided({
      id: 'w11l2e2',
      title: 'Classe di errore',
      prompt: 'Completa la classe perché `e.name` sia `ErroreScorta` e stampi `ErroreScorta`.',
      starterCode: `class ErroreScorta extends Error {
  constructor() {
    super('scorta finita');
    // imposta name
  }
}

try {
  throw new ErroreScorta();
} catch (e) {
  console.log(e.name);
}`,
      check: { kind: 'output', lines: ['ErroreScorta'] },
      hints: ['this.name = \'ErroreScorta\'', 'Senza name, instanceof funziona ma i log mostrano Error.'],
      solution: `class ErroreScorta extends Error {
  constructor() {
    super('scorta finita');
    this.name = 'ErroreScorta';
  }
}

try {
  throw new ErroreScorta();
} catch (e) {
  console.log(e.name);
}`,
      explanation: 'name rende riconoscibile l’errore nei log.',
      concepts: ['classi di errore'],
    }),
    solo({
      id: 'w11l2e3',
      title: 'Instanceof',
      prompt:
        'Crea `ErroreValidazione` e lancia con campo `nome`. Nel catch stampa `campo: nome` solo se è quel tipo.',
      starterCode: `// classe + lancio + instanceof`,
      check: { kind: 'output', lines: ['campo: nome'] },
      hints: ['this.campo = campo nel costruttore.', 'if (e instanceof ErroreValidazione)'],
      solution: `class ErroreValidazione extends Error {
  constructor(campo) {
    super('non valido');
    this.name = 'ErroreValidazione';
    this.campo = campo;
  }
}

try {
  throw new ErroreValidazione('nome');
} catch (e) {
  if (e instanceof ErroreValidazione) {
    console.log('campo: ' + e.campo);
  }
}`,
      explanation: 'I campi strutturati evitano di analizzare stringhe.',
      concepts: ['instanceof'],
    }),
    transfer({
      id: 'w11l2e4',
      title: 'Due tipi, due gestioni',
      prompt:
        'Con una funzione che lancia ErroreRete per `rete` e ErroreValidazione per `dati`, gestisci entrambi e stampa `rete` e `validazione`.',
      starterCode: `class ErroreRete extends Error { constructor() { super('r'); this.name = 'ErroreRete'; } }
class ErroreValidazione extends Error { constructor() { super('v'); this.name = 'ErroreValidazione'; } }

function rischiosa(tipo) {
  throw tipo === 'rete' ? new ErroreRete() : new ErroreValidazione();
}

// gestisci i due casi`,
      objective: 'Smistare errori diversi verso gestioni diverse.',
      check: { kind: 'output', lines: ['rete', 'validazione'] },
      hints: ['Un try/catch per chiamata, o un catch con instanceof.', 'Stampa in base al tipo.'],
      solution: `class ErroreRete extends Error { constructor() { super('r'); this.name = 'ErroreRete'; } }
class ErroreValidazione extends Error { constructor() { super('v'); this.name = 'ErroreValidazione'; } }

function rischiosa(tipo) {
  throw tipo === 'rete' ? new ErroreRete() : new ErroreValidazione();
}

for (const tipo of ['rete', 'dati']) {
  try {
    rischiosa(tipo);
  } catch (e) {
    if (e instanceof ErroreRete) console.log('rete');
    else if (e instanceof ErroreValidazione) console.log('validazione');
  }
}`,
      explanation: 'Il tipo di errore determina il recupero: retry per la rete, correzione per la validazione.',
      concepts: ['classi di errore'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Lanciare una stringa',
      code: `try {
  throw 'errore';
} catch (e) {
  console.log(e.message);
}`,
      error: `undefined`,
      why: 'Una stringa non ha message né stack: perdi ogni informazione utile al debug.',
      fix: `throw new Error('errore');`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l2x1',
      prompt: 'Spiega perché creare classi di errore invece di lanciare stringhe.',
      keywords: ['class', 'error', 'stack', 'instanceof', 'campi', 'debug'],
      model:
        'Lanciare una stringa perde stack, nome e campi strutturati: il debug diventa cieco. Una classe che estende Error mantiene lo stack, imposta un name riconoscibile e può portare dati come il campo non valido o il codice HTTP. Con instanceof il chiamante distingue i casi e applica la gestione giusta senza confrontare messaggi.',
      concepts: ['classi di errore'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l2q1',
      question: 'Cosa conviene lanciare con throw?',
      options: [
        ['Una stringa', 'Perde stack e campi.'],
        ['Un’istanza di Error o sottoclasse', 'Esatto.'],
        ['null', 'Non dà informazioni.'],
      ],
      correct: 1,
      explanation: 'Error mantiene stack e struttura.',
      concepts: ['throw'],
    }),
    quiz({
      id: 'w11l2q2',
      question: 'A cosa serve instanceof su un errore?',
      options: [
        ['A distinguere i tipi di errore', 'Esatto.'],
        ['A leggere il messaggio', 'Quello è message.'],
        ['A lanciare l’errore', 'Quello è throw.'],
      ],
      correct: 0,
      explanation: 'La gestione diventa esplicita e tipizzata.',
      concepts: ['instanceof'],
    }),
    quiz({
      id: 'w11l2q3',
      question: 'Perché impostare this.name?',
      options: [
        ['Per rendere l’errore riconoscibile nei log', 'Esatto.'],
        ['Per migliorare la performance', 'Non c’entra.'],
        ['Per farlo funzionare con instanceof', 'instanceof funziona comunque.'],
      ],
      correct: 0,
      explanation: 'name compare nello stack e nei log.',
      concepts: ['classi di errore'],
    }),
  ],
  recap: {
    points: [
      'throw interrompe e cerca un catch.',
      'Estendi Error, non lanciare stringhe.',
      'Campi strutturati per il codice.',
      'instanceof per la gestione mirata.',
    ],
    learned: 'I tuoi errori parlano il linguaggio del dominio.',
    next: 'Error boundary: proteggere l’interfaccia dai crash.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w11l3',
  title: 'Error boundaries',
  subtitle: 'Un errore non deve spegnere tutta l’app',
  minutes: 45,
  objectives: [
    'Capire cosa succede a un errore di rendering',
    'Isolare le parti fragili dell’interfaccia',
    'Progettare fallback utili',
  ],
  concepts: ['error boundary', 'fallback', 'isolamento'],
  activate: [
    'Un widget con dati rotti manda in crash tutta la pagina. Come lo eviti?',
    'Isolando il widget in un confine che cattura l’errore e mostra un fallback locale.',
  ],
  analogy:
    'L’error boundary è un salvavita per sezione: se un passeggero sviene, non evacuano tutto l’aereo. Ogni area ha il suo confine.',
  example: {
    code: `function conProtezione(fn, fallback) {
  try {
    return fn();
  } catch (errore) {
    console.error('Sezione protetta:', errore.message);
    return fallback(errore);
  }
}

const widget = conProtezione(
  () => {
    throw new Error('dati non validi');
  },
  () => 'Impossibile mostrare il widget',
);

console.log(widget);
console.log('Il resto della pagina funziona');`,
    output: `Sezione protetta: dati non validi
Impossibile mostrare il widget
Il resto della pagina funziona`,
  },
  formal:
    'In React un error boundary è un componente con componentDidCatch/getDerivedStateFromError, oppure un wrapper dedicato. In JavaScript puro si isola il codice rischioso con try/catch e si restituisce un fallback. Gli errori asincroni non passano dal try/catch sincrono: vanno gestiti con catch o con window.addEventListener(\'unhandledrejection\'). Un boundary deve loggare, mostrare un messaggio utile e offrire un’azione (riprova, torna alla home).',
  worked: {
    code: `const sezioni = [
  { nome: 'Spese', render: () => [10, 20], },
  { nome: 'Grafico', render: () => { throw new Error('canvas non disponibile'); } },
  { nome: 'Totale', render: () => 30 },
];

const risultati = sezioni.map((sezione) => {
  try {
    return { nome: sezione.nome, stato: 'ok', valore: sezione.render() };
  } catch (errore) {
    return { nome: sezione.nome, stato: 'errore', messaggio: errore.message };
  }
});

console.log(risultati.filter((r) => r.stato === 'ok').length);
console.log(risultati.find((r) => r.stato === 'errore').nome);`,
    output: `2
Grafico`,
    steps: [
      ['sezioni.map(...)', 'Ogni sezione è isolata dalle altre.'],
      ['try dentro la map', 'Il confine è per sezione, non per l’intera app.'],
      ['return stato ok/errore', 'L’interfaccia riceve dati uniformi.'],
      ['filter ok', 'Le sezioni sane restano visibili: 2.'],
      ['find errore', 'La sezione fallita può mostrare un fallback dedicato.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l3e1',
      title: 'Proteggi una sezione',
      prompt: 'Proteggi la chiamata e stampa `fallback`.',
      starterCode: `function rischiosa() {
  throw new Error('x');
}

function protetta() {
  try {
    return rischiosa();
  } {
    return 'fallback';
  }
}

console.log(protetta());`,
      check: { kind: 'output', lines: ['fallback'] },
      hints: ['Manca il catch.', 'catch { return \'fallback\'; }'],
      solution: `function rischiosa() {
  throw new Error('x');
}

function protetta() {
  try {
    return rischiosa();
  } catch {
    return 'fallback';
  }
}

console.log(protetta());`,
      explanation: 'Il confine restituisce un valore di fallback invece di propagare il crash.',
      concepts: ['isolamento'],
    }),
    guided({
      id: 'w11l3e2',
      title: 'Sezioni indipendenti',
      prompt:
        'Elabora due sezioni, una che fallisce: stampa `1` (successi) e `errore`.',
      starterCode: `const sezioni = [
  { nome: 'a', render: () => 1 },
  { nome: 'b', render: () => { throw new Error('x'); } },
];

const risultati = sezioni.map((s) => {
  try {
    return { stato: 'ok' };
  } catch {
    return { stato: 'errore' };
  }
});

console.log();`,
      check: { kind: 'output', lines: ['1', 'errore'] },
      hints: ['Conta gli ok con filter.', 'Stampa anche lo stato del secondo.'],
      solution: `const sezioni = [
  { nome: 'a', render: () => 1 },
  { nome: 'b', render: () => { throw new Error('x'); } },
];

const risultati = sezioni.map((s) => {
  try {
    s.render();
    return { stato: 'ok' };
  } catch {
    return { stato: 'errore' };
  }
});

console.log(risultati.filter((r) => r.stato === 'ok').length);
console.log(risultati[1].stato);`,
      explanation: 'Un errore locale non compromette le altre sezioni.',
      concepts: ['error boundary'],
    }),
    solo({
      id: 'w11l3e3',
      title: 'Fallback con messaggio',
      prompt:
        'Con una funzione che lancia `timeout`, restituisci `Riprova` e stampalo.',
      starterCode: `function carica() {
  throw new Error('timeout');
}

// try/catch con fallback`,
      check: { kind: 'output', lines: ['Riprova'] },
      hints: ['Il catch restituisce una stringa.', 'console.log(protetta())'],
      solution: `function carica() {
  throw new Error('timeout');
}

function protetta() {
  try {
    return carica();
  } catch {
    return 'Riprova';
  }
}

console.log(protetta());`,
      explanation: 'Il fallback dovrebbe suggerire un’azione, non solo constatare il guasto.',
      concepts: ['fallback'],
    }),
    transfer({
      id: 'w11l3e4',
      title: 'Unhandled rejection',
      prompt:
        'Aggiungi un gestore globale per le promise non gestite e verifica che venga chiamato: stampa `intercettata`.',
      starterCode: asyncWrap(`  const gestore = (evento) => {
    console.log('intercettata');
    evento.preventDefault?.();
  };

  // registra il gestore e provoca un rifiuto
  `),
      objective: 'Sapere che gli errori async non passano dal try/catch sincrono.',
      check: { kind: 'output', lines: ['intercettata'] },
      hints: ['Non puoi usare window.addEventListener nel worker.', 'Chiama direttamente il gestore con un evento finto.'],
      solution: asyncWrap(`  const gestore = (evento) => {
    console.log('intercettata');
    evento.preventDefault?.();
  };

  gestore({ type: 'unhandledrejection', preventDefault() {} });`),
      explanation: 'In un’app reale il gestore si registra sull’evento unhandledrejection.',
      concepts: ['error boundary'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Errori async fuori dal boundary',
      code: `try {
  caricaDati(); // restituisce una promise che fallisce
} catch (e) {
  console.log('gestito');
}`,
      error: `Il catch non viene mai eseguito`,
      why: 'Un rifiuto asincrono avviene dopo il try: serve await o .catch.',
      fix: `try {
  await caricaDati();
} catch (e) {
  console.log('gestito');
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l3x1',
      prompt: 'Spiega cos’è un error boundary e perché conviene isolare le sezioni dell’interfaccia.',
      keywords: ['boundary', 'isol', 'sezion', 'fallback', 'crash', 'async'],
      model:
        'Un error boundary è un confine che cattura gli errori di una parte dell’interfaccia e mostra un fallback locale. Isolare le sezioni evita che un widget rotto spenga tutta la pagina: il resto resta usabile. Gli errori asincroni però non passano dal try/catch sincrono, quindi vanno gestiti con await e catch oppure con un gestore globale per le promise non gestite.',
      concepts: ['error boundary'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l3q1',
      question: 'Un try/catch sincrono intercetta un errore in una promise non awaited?',
      options: [
        ['Sì', 'No, avviene dopo.'],
        ['No', 'Esatto.'],
        ['Solo in React', 'Non dipende da React.'],
      ],
      correct: 1,
      explanation: 'Serve await o .catch.',
      concepts: ['error boundary'],
    }),
    quiz({
      id: 'w11l3q2',
      question: 'Cosa deve mostrare un fallback?',
      options: [
        ['Un messaggio utile e un’azione possibile', 'Esatto.'],
        ['Solo il codice dell’errore', 'Non è utile all’utente.'],
        ['Nulla', 'L’utente non capisce.'],
      ],
      correct: 0,
      explanation: 'Il fallback fa parte dell’esperienza.',
      concepts: ['fallback'],
    }),
    quiz({
      id: 'w11l3q3',
      question: 'Perché isolare le sezioni?',
      options: [
        ['Per evitare che un errore locale spenga tutta la pagina', 'Esatto.'],
        ['Per migliorare la performance', 'Non è il motivo principale.'],
        ['Per eliminare gli errori', 'Non li elimina.'],
      ],
      correct: 0,
      explanation: 'Resilienza dell’interfaccia.',
      concepts: ['isolamento'],
    }),
  ],
  recap: {
    points: [
      'Boundary = confine con fallback locale.',
      'Un errore non deve spegnere tutto.',
      'Errori async richiedono catch o gestore globale.',
      'Il fallback offre un’azione.',
    ],
    learned: 'Sai progettare interfacce che resistono ai guasti.',
    next: 'localStorage e sessionStorage: ricordare sul dispositivo.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w11l4',
  title: 'localStorage e sessionStorage',
  subtitle: 'Persistenza semplice, con i suoi limiti',
  minutes: 50,
  objectives: [
    'Salvare e leggere stringhe',
    'Serializzare strutture con JSON',
    'Riconoscere i limiti di sicurezza e dimensione',
  ],
  concepts: ['localStorage', 'sessionStorage', 'serializzazione'],
  activate: [
    'localStorage salva solo stringhe. Come ci metti un array di spese?',
    'Con JSON.stringify al salvataggio e JSON.parse al caricamento.',
  ],
  analogy:
    'localStorage è un armadietto nel browser: resta anche dopo la chiusura, ma è piccolo, sincrono e accessibile a qualsiasi script della pagina. Non è un database e non è cifrato.',
  example: {
    code: `const memoria = new Map();

const storage = {
  setItem: (k, v) => memoria.set(k, String(v)),
  getItem: (k) => (memoria.has(k) ? memoria.get(k) : null),
  removeItem: (k) => memoria.delete(k),
};

storage.setItem('tema', 'scuro');
console.log(storage.getItem('tema'));
console.log(storage.getItem('assente'));

storage.setItem('spese', JSON.stringify([{ importo: 10 }]));
console.log(JSON.parse(storage.getItem('spese'))[0].importo);`,
    output: `scuro
null
10`,
  },
  formal:
    'localStorage e sessionStorage espongono setItem, getItem, removeItem, clear e la proprietà length; i valori sono stringhe e i nomi delle chiavi sono stringhe. localStorage persiste tra sessioni, sessionStorage dura fino alla chiusura della scheda. Sono sincroni e bloccano il thread: non usarli per dati grandi o frequenti. Non sono cifrati: mai salvare token o dati sensibili.',
  worked: {
    code: `const store = (() => {
  const dati = new Map();
  return {
    setItem: (k, v) => dati.set(String(k), String(v)),
    getItem: (k) => (dati.has(String(k)) ? dati.get(String(k)) : null),
    removeItem: (k) => dati.delete(String(k)),
  };
})();

function salvaSpese(spese) {
  store.setItem('spese:v1', JSON.stringify({ versione: 1, spese }));
}

function caricaSpese() {
  const grezzo = store.getItem('spese:v1');
  if (!grezzo) return [];
  try {
    const dati = JSON.parse(grezzo);
    return Array.isArray(dati.spese) ? dati.spese : [];
  } catch {
    return [];
  }
}

salvaSpese([{ importo: 10 }, { importo: 20 }]);
console.log(caricaSpese().length);
store.setItem('corrotto', '{');
console.log(store.getItem('corrotto').length);`,
    output: `2
1`,
    steps: [
      ['JSON.stringify({ versione: 1, spese })', 'Salvi un oggetto versionato, non solo l’array.'],
      ['getItem(\'spese:v1\')', 'La chiave include la versione: migrazioni più semplici.'],
      ['try/catch sul parse', 'Il contenuto può essere corrotto o manomesso.'],
      ['Array.isArray(...)', 'Validazione della forma al confine dello storage.'],
      ['return []', 'Fallback sicuro: l’app parte pulita.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l4e1',
      title: 'Salva una stringa',
      prompt: 'Salva `scuro` con la chiave `tema` e stampala.',
      starterCode: `const store = new Map();
const storage = {
  setItem: (k, v) => store.set(k, v),
  getItem: (k) => (store.has(k) ? store.get(k) : null),
};

storage.('tema', 'scuro');
console.log(storage.getItem('tema'));`,
      check: { kind: 'output', lines: ['scuro'] },
      hints: ['Il metodo per scrivere è setItem.', 'storage.setItem(...)'],
      solution: `const store = new Map();
const storage = {
  setItem: (k, v) => store.set(k, v),
  getItem: (k) => (store.has(k) ? store.get(k) : null),
};

storage.setItem('tema', 'scuro');
console.log(storage.getItem('tema'));`,
      explanation: 'setItem e getItem sono l’API minima dello storage.',
      concepts: ['localStorage'],
    }),
    guided({
      id: 'w11l4e2',
      title: 'Salva un oggetto',
      prompt: 'Serializza `{ versione: 1, spese: [1, 2] }`, salvalo e stampa `2` dopo il parse.',
      starterCode: `const store = new Map();
const storage = {
  setItem: (k, v) => store.set(k, v),
  getItem: (k) => (store.has(k) ? store.get(k) : null),
};

storage.setItem('stato', ({ versione: 1, spese: [1, 2] }));
const stato = JSON.parse(storage.getItem('stato'));
console.log();`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Manca JSON.stringify.', 'JSON.stringify({...})'],
      solution: `const store = new Map();
const storage = {
  setItem: (k, v) => store.set(k, v),
  getItem: (k) => (store.has(k) ? store.get(k) : null),
};

storage.setItem('stato', JSON.stringify({ versione: 1, spese: [1, 2] }));
const stato = JSON.parse(storage.getItem('stato'));
console.log(stato.spese.length);`,
      explanation: 'Storage e JSON vanno sempre insieme per le strutture.',
      concepts: ['serializzazione'],
    }),
    solo({
      id: 'w11l4e3',
      title: 'Chiave assente',
      prompt: 'Leggi una chiave assente e stampa `null`.',
      starterCode: `const store = new Map();
const storage = { getItem: (k) => (store.has(k) ? store.get(k) : null) };

// leggi 'mancante'`,
      check: { kind: 'output', lines: ['null'] },
      hints: ['getItem restituisce null se la chiave non esiste.', 'console.log(storage.getItem(\'mancante\'))'],
      solution: `const store = new Map();
const storage = { getItem: (k) => (store.has(k) ? store.get(k) : null) };

console.log(storage.getItem('mancante'));`,
      explanation: 'null è il segnale di assenza: gestiscilo prima di usare il valore.',
      concepts: ['localStorage'],
    }),
    transfer({
      id: 'w11l4e4',
      title: 'Caricamento difensivo',
      prompt:
        'Con un valore corrotto `{`, carica e restituisci un array vuoto: stampa `0`.',
      starterCode: `const valore = '{';

function carica() {
  // try/catch + validazione
}

console.log(carica().length);`,
      objective: 'Lo storage è un confine non fidato: parse e validazione.',
      check: { kind: 'output', lines: ['0'] },
      hints: ['try { JSON.parse } catch { return [] }', 'Restituisci sempre un array.'],
      solution: `const valore = '{';

function carica() {
  try {
    const dati = JSON.parse(valore);
    return Array.isArray(dati.spese) ? dati.spese : [];
  } catch {
    return [];
  }
}

console.log(carica().length);`,
      explanation: 'Un salvataggio corrotto non deve impedire l’avvio dell’app.',
      concepts: ['serializzazione'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Token in localStorage',
      code: `localStorage.setItem('token', 'eyJhbGciOi...');`,
      error: `Qualsiasi script della pagina può leggere il token (rischio XSS)`,
      why: 'localStorage non è cifrato e non è protetto da XSS: i token vanno gestiti con cookie httpOnly o storage sicuro lato server.',
      fix: `// lascia gestire la sessione al provider di autenticazione`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l4x1',
      prompt: 'Spiega cosa puoi e cosa non devi salvare in localStorage.',
      keywords: ['localstorage', 'string', 'json', 'sincron', 'sicurezza', 'token'],
      model:
        'Posso salvare piccoli dati non sensibili come preferenze di tema, stato dell’interfaccia o un quaderno serializzato in JSON, ricordandomi che i valori sono stringhe e che devo serializzare e validare. Non devo salvare token, password o dati personali sensibili, perché localStorage è leggibile da qualsiasi script della pagina e non è cifrato. Inoltre è sincrono, quindi va usato con parsimonia.',
      concepts: ['localStorage'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l4q1',
      question: 'Che tipo di valori salva localStorage?',
      options: [
        ['Qualsiasi oggetto', 'Solo stringhe.'],
        ['Solo stringhe', 'Esatto.'],
        ['Solo numeri', 'Vengono convertiti in stringhe.'],
      ],
      correct: 1,
      explanation: 'Per gli oggetti serve JSON.stringify.',
      concepts: ['localStorage'],
    }),
    quiz({
      id: 'w11l4q2',
      question: 'Differenza tra localStorage e sessionStorage?',
      options: [
        ['Nessuna', 'Differiscono nella durata.'],
        ['localStorage persiste, sessionStorage dura fino alla chiusura della scheda', 'Esatto.'],
        ['sessionStorage è più sicuro', 'Non è cifrato nemmeno lui.'],
      ],
      correct: 1,
      explanation: 'La durata è la differenza principale.',
      concepts: ['sessionStorage'],
    }),
    quiz({
      id: 'w11l4q3',
      question: 'Dove va il parse di un valore salvato?',
      options: [
        ['In un try/catch', 'Esatto.'],
        ['Mai, è sempre valido', 'Può essere corrotto o manomesso.'],
        ['Solo in produzione', 'Sempre.'],
      ],
      correct: 0,
      explanation: 'Lo storage è un confine non fidato.',
      concepts: ['serializzazione'],
    }),
  ],
  recap: {
    points: [
      'Solo stringhe: usa JSON per le strutture.',
      'localStorage persiste, sessionStorage no.',
      'Mai dati sensibili o token.',
      'Parse e validazione sempre.',
    ],
    learned: 'Sai far ricordare qualcosa al browser in modo sicuro.',
    next: 'IndexedDB e Dexie per dati più grandi e strutturati.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w11l5',
  title: 'IndexedDB e Dexie',
  subtitle: 'Un database nel browser',
  minutes: 55,
  objectives: [
    'Capire quando IndexedDB è necessario',
    'Definire uno schema con Dexie',
    'Scrivere e leggere record in modo asincrono',
  ],
  concepts: ['IndexedDB', 'Dexie', 'schema'],
  activate: [
    'Devi salvare 5.000 spese e interrogarle per data. localStorage è adatto?',
    'No: è sincrono, piccolo e senza indici. IndexedDB è pensato per questo.',
  ],
  analogy:
    'localStorage è un cassetto, IndexedDB è un archivio con schedario: puoi cercare per indice, conservare molto e lavorare in modo asincrono senza bloccare la pagina.',
  example: {
    code: asyncWrap(`  // Modello semplificato dell'API Dexie per l'esempio
  const tabella = new Map();

  const db = {
    spese: {
      put: async (record) => {
        tabella.set(record.id, record);
        return record.id;
      },
      get: async (id) => tabella.get(id) ?? undefined,
      count: async () => tabella.size,
    },
  };

  await db.spese.put({ id: 1, descrizione: 'Libro', importo: 18 });
  await db.spese.put({ id: 2, descrizione: 'Pane', importo: 3 });

  console.log(await db.spese.count());
  console.log((await db.spese.get(1)).descrizione);
  console.log(await db.spese.get(99));`),
    output: `2
Libro
undefined`,
  },
  formal:
    'IndexedDB è un database transazionale nel browser, asincrono e con indici. Dexie lo rende ergonomico: new Dexie(\'nome\'), version(1).stores({ spese: \'++id, data, categoria\' }), poi db.spese.put/ add/ get/ where/ toArray. Le operazioni restituiscono Promise. Lo schema definisce chiavi e indici: il primo campo dopo i due punti è la chiave primaria. Le migrazioni si gestiscono con versioni successive.',
  worked: {
    code: asyncWrap(`  const archivio = new Map();

  const db = {
    spese: {
      put: async (record) => {
        archivio.set(record.id, record);
        return record.id;
      },
      where: (campo) => ({
        equals: (valore) => ({
          toArray: async () =>
            [...archivio.values()].filter((r) => r[campo] === valore),
        }),
      }),
    },
  };

  await db.spese.put({ id: 1, categoria: 'cibo', importo: 10 });
  await db.spese.put({ id: 2, categoria: 'casa', importo: 40 });
  await db.spese.put({ id: 3, categoria: 'cibo', importo: 5 });

  const cibo = await db.spese.where('categoria').equals('cibo').toArray();
  console.log(cibo.length);
  console.log(cibo.reduce((a, s) => a + s.importo, 0));`),
    output: `2
15`,
    steps: [
      ['db.spese.put(record)', 'Inserisce o aggiorna per chiave primaria.'],
      ['where(\'categoria\')', 'Interroga usando un indice dichiarato nello schema.'],
      ['equals(\'cibo\')', 'Filtra per valore dell’indice.'],
      ['toArray()', 'Restituisce una Promise con i risultati.'],
      ['reduce', 'I dati sono normali oggetti: si combinano con le pipeline.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l5e1',
      title: 'Inserisci un record',
      prompt: 'Salva un record con id 1 e stampa il conteggio `1`.',
      starterCode: asyncWrap(`  const archivio = new Map();
  const db = {
    put: async (r) => archivio.set(r.id, r),
    count: async () => archivio.size,
  };

  await db.( { id: 1, importo: 10 });
  console.log(await db.count());`),
      check: { kind: 'output', lines: ['1'] },
      hints: ['Il metodo è put.', 'db.put({...})'],
      solution: asyncWrap(`  const archivio = new Map();
  const db = {
    put: async (r) => archivio.set(r.id, r),
    count: async () => archivio.size,
  };

  await db.put({ id: 1, importo: 10 });
  console.log(await db.count());`),
      explanation: 'Le scritture IndexedDB sono asincrone: await è obbligatorio.',
      concepts: ['Dexie'],
    }),
    guided({
      id: 'w11l5e2',
      title: 'Leggi per chiave',
      prompt: 'Salva e rileggi il record, stampando `Libro`.',
      starterCode: asyncWrap(`  const archivio = new Map();
  const db = {
    put: async (r) => archivio.set(r.id, r),
    get: async (id) => archivio.get(id),
  };

  await db.put({ id: 1, descrizione: 'Libro' });
  console.log((await db.(1)).descrizione);`),
      check: { kind: 'output', lines: ['Libro'] },
      hints: ['Il metodo di lettura è get.', 'db.get(1)'],
      solution: asyncWrap(`  const archivio = new Map();
  const db = {
    put: async (r) => archivio.set(r.id, r),
    get: async (id) => archivio.get(id),
  };

  await db.put({ id: 1, descrizione: 'Libro' });
  console.log((await db.get(1)).descrizione);`),
      explanation: 'get restituisce il record o undefined.',
      concepts: ['IndexedDB'],
    }),
    solo({
      id: 'w11l5e3',
      title: 'Filtra per indice',
      prompt:
        'Con tre record, filtra per categoria `cibo` e stampa `2`.',
      starterCode: asyncWrap(`  const archivio = new Map([
    [1, { id: 1, categoria: 'cibo' }],
    [2, { id: 2, categoria: 'casa' }],
    [3, { id: 3, categoria: 'cibo' }],
  ]);

  const db = {
    where: () => ({
      equals: async (v) => [...archivio.values()].filter((r) => r.categoria === v),
    }),
  };

  // usa where('categoria').equals('cibo')`),
      check: { kind: 'output', lines: ['2'] },
      hints: ['where(\'categoria\').equals(\'cibo\') restituisce i record.', 'Poi .length.'],
      solution: asyncWrap(`  const archivio = new Map([
    [1, { id: 1, categoria: 'cibo' }],
    [2, { id: 2, categoria: 'casa' }],
    [3, { id: 3, categoria: 'cibo' }],
  ]);

  const db = {
    where: () => ({
      equals: async (v) => [...archivio.values()].filter((r) => r.categoria === v),
    }),
  };

  const risultati = await db.where('categoria').equals('cibo');
  console.log(risultati.length);`),
      explanation: 'Gli indici evitano di leggere tutta la tabella.',
      concepts: ['schema'],
    }),
    transfer({
      id: 'w11l5e4',
      title: 'Schema e migrazione',
      prompt:
        'Definisci lo schema con chiave `++id` e indici su `data` e `categoria`, poi stampa `true` se lo schema contiene categoria.',
      starterCode: `const schema = { spese: '' };

// imposta lo schema
console.log(schema.spese.includes('categoria'));`,
      objective: 'Comprendere la dichiarazione dello schema in Dexie.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['La stringa è \'++id, data, categoria\'.', 'Il primo campo è la chiave primaria.'],
      solution: `const schema = { spese: '++id, data, categoria' };

console.log(schema.spese.includes('categoria'));`,
      explanation: '++id è una chiave autoincrementante; gli altri campi sono indici.',
      concepts: ['schema'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Dimenticare await',
      code: asyncWrap(`  const spese = db.spese.toArray();
  console.log(spese.length);`),
      error: `undefined`,
      why: 'toArray restituisce una Promise: senza await stai contando le proprietà di una Promise.',
      fix: `const spese = await db.spese.toArray();
console.log(spese.length);`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l5x1',
      prompt: 'Spiega quando passare da localStorage a IndexedDB e cosa offre Dexie.',
      keywords: ['indexeddb', 'localstorage', 'asincron', 'indice', 'schema', 'dexie'],
      model:
        'Passo a IndexedDB quando i dati sono molti, strutturati o devono essere interrogati per indice, perché localStorage è sincrono, limitato e senza query. Dexie semplifica IndexedDB: dichiaro uno schema con chiave primaria e indici, e uso metodi come put, get, where che restituiscono Promise. Così non blocco l’interfaccia e posso gestire migrazioni con versioni.',
      concepts: ['IndexedDB'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l5q1',
      question: 'IndexedDB è sincrono?',
      options: [
        ['Sì', 'È asincrono.'],
        ['No, usa transazioni asincrone', 'Esatto.'],
        ['Dipende dal browser', 'È sempre asincrono.'],
      ],
      correct: 1,
      explanation: 'Non blocca il thread principale.',
      concepts: ['IndexedDB'],
    }),
    quiz({
      id: 'w11l5q2',
      question: 'Cosa indica `++id` in uno schema Dexie?',
      options: [
        ['Una chiave autoincrementante', 'Esatto.'],
        ['Un indice unico obbligatorio', 'Non è quello.'],
        ['Un campo calcolato', 'No: indica una chiave autoincrementante, non un campo calcolato.'],
      ],
      correct: 0,
      explanation: 'Il primo campo della stringa è la chiave primaria.',
      concepts: ['schema'],
    }),
    quiz({
      id: 'w11l5q3',
      question: 'Cosa restituisce `where(...).equals(...)` in Dexie?',
      options: [
        ['Un array sincrono', 'Una collection asincrona.'],
        ['Una collection su cui chiamare toArray', 'Esatto.'],
        ['Un numero', 'No: restituisce una collection da materializzare con toArray.'],
      ],
      correct: 1,
      explanation: 'toArray materializza i risultati come Promise.',
      concepts: ['Dexie'],
    }),
  ],
  recap: {
    points: [
      'IndexedDB per dati grandi e query.',
      'Dexie dichiara schema e indici.',
      'put/get/where restituiscono Promise.',
      'Migrazioni con versioni dello schema.',
    ],
    learned: 'Sai usare un vero database nel browser.',
    next: 'Strategie di caching e coerenza.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w11l6',
  title: 'Caching e coerenza',
  subtitle: 'Dati vecchi, dati nuovi e cosa mostrare',
  minutes: 50,
  objectives: [
    'Scegliere una strategia di cache',
    'Invalidare dopo una modifica',
    'Gestire la cache offline',
  ],
  concepts: ['cache', 'invalidazione', 'stale-while-revalidate'],
  activate: [
    'Mostri prima i dati in cache e poi aggiorni, o aspetti sempre la rete?',
    'Dipende: per la lista delle spese la cache immediata è meglio, con aggiornamento in background.',
  ],
  analogy:
    'La cache è il frigorifero: mangi subito ciò che hai, ma controlli la scadenza. La rete è il supermercato: aggiorni quando serve, senza andarci per ogni boccone.',
  example: {
    code: asyncWrap(`  const cache = new Map();
  let versioni = 0;

  async function conCache(chiave, carica) {
    if (cache.has(chiave)) {
      return { dati: cache.get(chiave), fonte: 'cache' };
    }
    const dati = await carica();
    cache.set(chiave, dati);
    return { dati, fonte: 'rete' };
  }

  const carica = async () => {
    versioni += 1;
    return ['v' + versioni];
  };

  console.log((await conCache('spese', carica)).fonte);
  console.log((await conCache('spese', carica)).fonte);

  cache.delete('spese');
  console.log((await conCache('spese', carica)).fonte);`),
    output: `rete
cache
rete`,
  },
  formal:
    'Strategie comuni: cache-first (veloce ma può essere vecchia), network-first (fresca ma lenta), stale-while-revalidate (mostra la cache e aggiorna in background). Ogni scrittura deve invalidare le chiavi coinvolte. Per l’offline si serve la cache e si accoda la mutazione. La coerenza si mantiene con timestamp o versioni, evitando che una risposta vecchia sovrascriva una nuova.',
  worked: {
    code: asyncWrap(`  const cache = new Map();
  let rete = 0;

  function salva(chiave, valore, timestamp) {
    cache.set(chiave, { valore, timestamp });
  }

  function leggi(chiave) {
    return cache.get(chiave) ?? null;
  }

  async function aggiorna(chiave, carica) {
    const remoto = await carica();
    rete += 1;
    const precedente = leggi(chiave);
    if (!precedente || remoto.timestamp >= precedente.timestamp) {
      salva(chiave, remoto.valore, remoto.timestamp);
      return remoto.valore;
    }
    return precedente.valore;
  }

  const carica = async () => ({ valore: ['a'], timestamp: rete + 1 });

  console.log((await aggiorna('k', carica)).length);
  console.log((await aggiorna('k', async () => ({ valore: ['vecchio'], timestamp: 1 }))).length);`),
    output: `1
1`,
    steps: [
      ['salva(..., timestamp)', 'Ogni voce porta un timestamp: serve per confrontare.'],
      ['remoto.timestamp >= precedente.timestamp', 'Una risposta più vecchia non sovrascrive quella nuova.'],
      ['aggiorna(...)', 'Il chiamante ottiene sempre il dato migliore disponibile.'],
      ['seconda chiamata con timestamp 1', 'Rifiutata: resta il dato precedente.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l6e1',
      title: 'Cache-first',
      prompt: 'Alla seconda chiamata usa la cache senza chiamare la rete: stampa `cache`.',
      starterCode: asyncWrap(`  const cache = new Map();
  let chiamate = 0;

  async function leggi() {
    if (cache.has('k')) return 'cache';
    chiamate += 1;
    cache.set('k', true);
    return 'rete';
  }

  console.log(await leggi());
  console.log(await leggi());`),
      check: { kind: 'output', lines: ['rete', 'cache'] },
      hints: ['Il codice è già corretto: verifica il comportamento.', 'La seconda chiamata trova la chiave.'],
      solution: asyncWrap(`  const cache = new Map();
  let chiamate = 0;

  async function leggi() {
    if (cache.has('k')) return 'cache';
    chiamate += 1;
    cache.set('k', true);
    return 'rete';
  }

  console.log(await leggi());
  console.log(await leggi());`),
      explanation: 'Cache-first riduce le richieste ma va invalidata.',
      concepts: ['cache'],
    }),
    guided({
      id: 'w11l6e2',
      title: 'Invalida dopo la scrittura',
      prompt:
        'Dopo un salvataggio, invalida la cache: la lettura successiva deve stampare `rete`.',
      starterCode: asyncWrap(`  const cache = new Map([['spese', []]]);
  let chiamate = 0;

  async function leggi() {
    if (cache.has('spese')) return 'cache';
    chiamate += 1;
    return 'rete';
  }

  // invalida e leggi
  console.log(await leggi());`),
      check: { kind: 'output', lines: ['rete'] },
      hints: ['cache.delete(\'spese\')', 'Poi leggi.'],
      solution: asyncWrap(`  const cache = new Map([['spese', []]]);
  let chiamate = 0;

  async function leggi() {
    if (cache.has('spese')) return 'cache';
    chiamate += 1;
    return 'rete';
  }

  cache.delete('spese');
  console.log(await leggi());`),
      explanation: 'Senza invalidazione l’utente non vede le proprie modifiche.',
      concepts: ['invalidazione'],
    }),
    solo({
      id: 'w11l6e3',
      title: 'Timestamp più recente',
      prompt:
        'Salva due versioni: la seconda più vecchia non deve sovrascrivere. Stampa `nuovo`.',
      starterCode: asyncWrap(`  let valore = 'iniziale';

  function aggiorna(nuovo, timestamp, correnteTs) {
    if (timestamp >= correnteTs) valore = nuovo;
  }

  aggiorna('nuovo', 10, 5);
  aggiorna('vecchio', 3, 10);

  console.log();`),
      check: { kind: 'output', lines: ['nuovo'] },
      hints: ['Stampa valore.', 'La seconda chiamata viene ignorata.'],
      solution: asyncWrap(`  let valore = 'iniziale';

  function aggiorna(nuovo, timestamp, correnteTs) {
    if (timestamp >= correnteTs) valore = nuovo;
  }

  aggiorna('nuovo', 10, 5);
  aggiorna('vecchio', 3, 10);

  console.log(valore);`),
      explanation: 'Il timestamp protegge da risposte fuori ordine.',
      concepts: ['coerenza'],
    }),
    transfer({
      id: 'w11l6e4',
      title: 'Stale while revalidate',
      prompt:
        'Mostra subito il dato in cache (`vecchio`) e aggiorna in background: stampa `vecchio` e poi `nuovo` dopo l’aggiornamento.',
      starterCode: asyncWrap(`  const cache = new Map([['k', 'vecchio']]);

  async function swr() {
    const immediato = cache.get('k');
    console.log(immediato);
    const aggiornato = await Promise.resolve('nuovo');
    cache.set('k', aggiornato);
    console.log(cache.get('k'));
  }

  await swr();`),
      objective: 'Comprendere la strategia stale-while-revalidate.',
      check: { kind: 'output', lines: ['vecchio', 'nuovo'] },
      hints: ['Il codice è già corretto: verifica il comportamento.', 'Prima la cache, poi il dato aggiornato.'],
      solution: asyncWrap(`  const cache = new Map([['k', 'vecchio']]);

  async function swr() {
    const immediato = cache.get('k');
    console.log(immediato);
    const aggiornato = await Promise.resolve('nuovo');
    cache.set('k', aggiornato);
    console.log(cache.get('k'));
  }

  await swr();`),
      explanation: 'L’utente vede subito qualcosa e riceve presto il dato fresco.',
      concepts: ['stale-while-revalidate'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Cache senza scadenza',
      code: `cache.set('spese', dati);`,
      error: `Dopo settimane l'utente vede ancora dati vecchi`,
      why: 'Una cache senza scadenza o invalidazione diventa una bugia permanente.',
      fix: `cache.set('spese', { dati, scadenza: Date.now() + 60_000 });`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l6x1',
      prompt: 'Spiega la strategia stale-while-revalidate e quando è preferibile a network-first.',
      keywords: ['stale', 'revalidate', 'cache', 'rete', 'veloc', 'aggiorn'],
      model:
        'Con stale-while-revalidate mostro immediatamente il dato in cache e in parallelo chiedo l’aggiornamento, così l’interfaccia è veloce e il dato diventa fresco appena possibile. È preferibile quando la velocità percepita conta e un dato leggermente vecchio è accettabile, come nella lista delle spese. Con dati critici, come un saldo, meglio network-first con fallback alla cache.',
      concepts: ['stale-while-revalidate'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l6q1',
      question: 'Cosa fa stale-while-revalidate?',
      options: [
        ['Mostra la cache e aggiorna in background', 'Esatto.'],
        ['Aspetta sempre la rete', 'Quello è network-first.'],
        ['Non usa la cache', 'La usa subito.'],
      ],
      correct: 0,
      explanation: 'Velocità immediata, freschezza poco dopo.',
      concepts: ['stale-while-revalidate'],
    }),
    quiz({
      id: 'w11l6q2',
      question: 'Cosa va fatto dopo una scrittura?',
      options: [
        ['Invalidare le chiavi coinvolte', 'Esatto.'],
        ['Niente', 'L’utente vedrebbe dati vecchi.'],
        ['Cancellare tutta la cache sempre', 'Spesso è eccessivo, ma meglio che nulla.'],
      ],
      correct: 0,
      explanation: 'La coerenza dipende dall’invalidazione.',
      concepts: ['invalidazione'],
    }),
    quiz({
      id: 'w11l6q3',
      question: 'Perché confrontare i timestamp?',
      options: [
        ['Per evitare che risposte vecchie sovrascrivano quelle nuove', 'Esatto.'],
        ['Per ordinare alfabeticamente', 'No: serve a risolvere conflitti tra risposte fuori ordine.'],
        ['Per calcolare il totale', 'Non c’entra.'],
      ],
      correct: 0,
      explanation: 'Le risposte possono arrivare fuori ordine.',
      concepts: ['coerenza'],
    }),
  ],
  recap: {
    points: [
      'Cache-first, network-first, stale-while-revalidate.',
      'Invalidare dopo le scritture.',
      'Timestamp per la coerenza.',
      'La cache offline abilita l’uso senza rete.',
    ],
    learned: 'Sai bilanciare velocità e freschezza dei dati.',
    next: 'Ripasso e progetto: il quaderno persistente.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w11l7',
  title: 'Ripasso e progetto',
  subtitle: 'Persistere il Quaderno su localStorage',
  minutes: 60,
  objectives: [
    'Salvare lo stato a ogni modifica',
    'Ricaricare con validazione e fallback',
    'Gestire la quota e i dati corrotti',
  ],
  concepts: ['ripasso', 'progetto', 'persistenza'],
  activate: [
    'Quando salvi: a ogni tasto premuto o a ogni modifica completata?',
    'A ogni modifica significativa: salvare troppo spesso è inutile e costoso.',
  ],
  analogy:
    'Salvare è come mettere un segnalibro: lo fai quando cambi pagina, non a ogni parola letta.',
  example: {
    code: `const archivio = new Map();
const storage = {
  getItem: (k) => archivio.get(k) ?? null,
  setItem: (k, v) => archivio.set(k, v),
};

const CHIAVE = 'quaderno:v1';

function salva(spese) {
  storage.setItem(CHIAVE, JSON.stringify({ versione: 1, spese }));
}

function carica() {
  const grezzo = storage.getItem(CHIAVE);
  if (!grezzo) return [];
  try {
    const dati = JSON.parse(grezzo);
    return Array.isArray(dati.spese) ? dati.spese : [];
  } catch {
    return [];
  }
}

salva([{ descrizione: 'Libro', importo: 18 }]);
console.log(carica().length);

storage.setItem(CHIAVE, 'rotto');
console.log(carica().length);`,
    output: `1
0`,
  },
  formal:
    'Salva dopo ogni mutazione confermata, non a ogni digitazione: usa un debounce se salvi mentre si scrive. La chiave include la versione per gestire migrazioni. Al caricamento valida la forma e riparti da uno stato vuoto se il dato è corrotto, senza cancellare subito il salvataggio (potrebbe servire per il recupero). Gestisci QuotaExceededError con un messaggio chiaro.',
  worked: {
    code: `const archivio = new Map();
const storage = {
  getItem: (k) => archivio.get(k) ?? null,
  setItem: (k, v) => archivio.set(k, v),
  removeItem: (k) => archivio.delete(k),
};

const CHIAVE = 'quaderno:v1';
const stato = { spese: [] };

function salva() {
  try {
    storage.setItem(CHIAVE, JSON.stringify({ versione: 1, spese: stato.spese }));
    return true;
  } catch {
    return false;
  }
}

function carica() {
  const grezzo = storage.getItem(CHIAVE);
  if (!grezzo) return [];
  try {
    const dati = JSON.parse(grezzo);
    return Array.isArray(dati.spese) ? dati.spese : [];
  } catch {
    return [];
  }
}

stato.spese.push({ descrizione: 'Libro', importo: 18 });
console.log(salva());
stato.spese = [];
stato.spese = carica();
console.log(stato.spese.length);`,
    output: `true
1`,
    steps: [
      ['JSON.stringify({ versione: 1, spese })', 'Salvi un contenitore versionato.'],
      ['try/catch nel salva', 'La quota può essere esaurita: il fallimento va gestito.'],
      ['carica con validazione', 'Il dato salvato non è fidato.'],
      ['stato.spese = carica()', 'All’avvio lo stato parte dal salvataggio.'],
      ['salva() dopo la mutazione', 'Un solo punto di salvataggio, chiamato quando serve.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l7e1',
      title: 'Salva lo stato',
      prompt: 'Serializza e salva `{ versione: 1, spese: [1] }`, poi stampa `true`.',
      starterCode: `const archivio = new Map();
const storage = {
  setItem: (k, v) => archivio.set(k, v),
  getItem: (k) => archivio.get(k) ?? null,
};

storage.('quaderno', ({ versione: 1, spese: [1] }));
console.log(storage.getItem('quaderno').includes('versione'));`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['Manca setItem e JSON.stringify.', 'storage.setItem(\'quaderno\', JSON.stringify({...}))'],
      solution: `const archivio = new Map();
const storage = {
  setItem: (k, v) => archivio.set(k, v),
  getItem: (k) => archivio.get(k) ?? null,
};

storage.setItem('quaderno', JSON.stringify({ versione: 1, spese: [1] }));
console.log(storage.getItem('quaderno').includes('versione'));`,
      explanation: 'La versione nel salvataggio abilita le migrazioni future.',
      concepts: ['persistenza'],
    }),
    guided({
      id: 'w11l7e2',
      title: 'Carica e valida',
      prompt: 'Carica il salvataggio e stampa il numero di spese (`2`).',
      starterCode: `const salvato = '{"versione":1,"spese":[{},{}]}';

function carica() {
  // parse + validazione
}

console.log(carica().length);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['try/catch sul parse.', 'Controlla Array.isArray(dati.spese).'],
      solution: `const salvato = '{"versione":1,"spese":[{},{}]}';

function carica() {
  try {
    const dati = JSON.parse(salvato);
    return Array.isArray(dati.spese) ? dati.spese : [];
  } catch {
    return [];
  }
}

console.log(carica().length);`,
      explanation: 'Validare al caricamento evita crash all’avvio.',
      concepts: ['persistenza'],
    }),
    solo({
      id: 'w11l7e3',
      title: 'Fallback su corrotto',
      prompt:
        'Con un salvataggio corrotto, carica e stampa `0` senza lanciare errori.',
      starterCode: `const salvato = '{rotto';

function carica() {
  // gestisci
}

console.log(carica().length);`,
      check: { kind: 'output', lines: ['0'] },
      hints: ['JSON.parse lancia su testo non valido.', 'Nel catch restituisci [].'],
      solution: `const salvato = '{rotto';

function carica() {
  try {
    const dati = JSON.parse(salvato);
    return Array.isArray(dati.spese) ? dati.spese : [];
  } catch {
    return [];
  }
}

console.log(carica().length);`,
      explanation: 'Un dato corrotto non deve impedire l’avvio dell’app.',
      concepts: ['persistenza'],
    }),
    transfer({
      id: 'w11l7e4',
      title: 'Quota esaurita',
      prompt:
        'Simula un errore di quota al salvataggio e restituisci `false`: stampa `false`.',
      starterCode: `const storage = {
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
};

function salva() {
  // gestisci l'errore
}

console.log(salva());`,
      objective: 'Gestire il fallimento della persistenza senza rompere l’app.',
      check: { kind: 'output', lines: ['false'] },
      hints: ['try/catch intorno a setItem.', 'Restituisci false nel catch.'],
      solution: `const storage = {
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
};

function salva() {
  try {
    storage.setItem('k', 'v');
    return true;
  } catch {
    return false;
  }
}

console.log(salva());`,
      explanation: 'Il salvataggio può fallire: l’app deve continuare a funzionare in memoria.',
      concepts: ['persistenza'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Salvare a ogni tasto',
      code: `input.addEventListener('input', () => {
  localStorage.setItem('bozza', input.value);
});`,
      error: `Scritture sincrone continue: digitazione a scatti su testi lunghi`,
      why: 'localStorage è sincrono: salvare a ogni carattere blocca il thread ripetutamente.',
      fix: `// usa un debounce di 300-500ms`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l7x1',
      prompt: 'Spiega quando e come salvi lo stato del quaderno, e cosa fai se il salvataggio è corrotto.',
      keywords: ['salv', 'json', 'versione', 'valid', 'corrott', 'fallback'],
      model:
        'Salvo dopo ogni modifica confermata, non a ogni digitazione, serializzando un oggetto con versione e spese. Se salvo mentre l’utente scrive uso un debounce per non bloccare il thread. Al caricamento faccio parse in try/catch e controllo che spese sia un array: se il dato è corrotto riparto da uno stato vuoto invece di far crashare l’app.',
      concepts: ['persistenza'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l7q1',
      question: 'Quando conviene salvare?',
      options: [
        ['A ogni carattere digitato', 'Blocca e consuma.'],
        ['Dopo modifiche confermate, con debounce se serve', 'Esatto.'],
        ['Solo alla chiusura', 'Si perde tutto se il browser si chiude male.'],
      ],
      correct: 1,
      explanation: 'Salvataggio significativo e non troppo frequente.',
      concepts: ['persistenza'],
    }),
    quiz({
      id: 'w11l7q2',
      question: 'Cosa fai con un salvataggio corrotto?',
      options: [
        ['Crash', 'Inaccettabile.'],
        ['Fallback a stato vuoto con validazione', 'Esatto.'],
        ['Cancelli tutto lo storage', 'Meglio conservarlo per un eventuale recupero.'],
      ],
      correct: 1,
      explanation: 'Fallback sicuro e non distruttivo.',
      concepts: ['persistenza'],
    }),
    quiz({
      id: 'w11l7q3',
      question: 'Perché includere una versione nel salvataggio?',
      options: [
        ['Per gestire migrazioni future', 'Esatto.'],
        ['Per occupare più spazio', 'Non è quello.'],
        ['Per validare il JSON', 'JSON non richiede versioni.'],
      ],
      correct: 0,
      explanation: 'La versione permette di riconoscere formati vecchi.',
      concepts: ['persistenza'],
    }),
  ],
  recap: {
    points: [
      'Salva dopo mutazioni confermate.',
      'Versione nel dato salvato.',
      'Parse e validazione al caricamento.',
      'Gestisci quota e corruzione.',
    ],
    learned: 'Il Quaderno delle spese sopravvive alla chiusura del browser.',
    next: 'Lato professionale: storage, privacy e ispezione.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w11l8',
  title: 'Lato professionale e test',
  subtitle: 'Application panel, privacy e verifica',
  minutes: 50,
  objectives: [
    'Ispezionare storage e service worker',
    'Sapere cosa non salvare mai',
    'Superare il test della settimana',
  ],
  concepts: ['DevTools Application', 'privacy', 'test'],
  activate: [
    'Dove vedi cosa ha salvato la tua app nel browser?',
    'Nel pannello Application: Local Storage, Session Storage, IndexedDB, Cache Storage.',
  ],
  analogy:
    'Il pannello Application è la soffitta della pagina: vedi tutto ciò che hai accumulato e puoi liberare spazio quando serve.',
  example: {
    code: `const dati = { tema: 'scuro', lingua: 'it' };
const serializzato = JSON.stringify(dati);

console.log(serializzato.includes('token'));
console.log(Object.keys(dati).length);`,
    output: `false
2`,
  },
  formal:
    'In DevTools → Application trovi manifest, service worker, storage e cache. Controlla periodicamente che non ci siano dati sensibili salvati. Per la privacy: minimizza i dati, chiedi solo ciò che serve, non tracciare senza consenso. Per il service worker verifica la versione attiva e fai “Update on reload” durante lo sviluppo. Se l’app non si aggiorna, spesso è una cache vecchia.',
  worked: {
    code: `function sanitizza(record) {
  const { token, password, ...pulito } = record;
  return pulito;
}

const utente = {
  nome: 'Ada',
  email: 'ada@example.com',
  token: 'segreto',
  password: '1234',
};

const daSalvare = sanitizza(utente);
console.log(Object.keys(daSalvare).join(','));
console.log('token' in daSalvare);`,
    output: `nome,email
false`,
    steps: [
      ['const { token, password, ...pulito }', 'Il destructuring con rest rimuove i campi sensibili.'],
      ['...pulito', 'Tutto il resto viene conservato.'],
      ['Object.keys(daSalvare)', 'Solo i campi sicuri.'],
      ['\'token\' in daSalvare', 'Verifica esplicita: false.'],
    ],
  },
  exercises: [
    fill({
      id: 'w11l8e1',
      title: 'Rimuovi i segreti',
      prompt: 'Rimuovi `token` dal record e stampa `false` se il campo esiste.',
      starterCode: `const record = { nome: 'Ada', token: 'x' };

const { token, ...pulito } = record;
console.log('token' in );`,
      check: { kind: 'output', lines: ['false'] },
      hints: ['Verifica l’oggetto pulito, non l’originale.', 'console.log(\'token\' in pulito)'],
      solution: `const record = { nome: 'Ada', token: 'x' };

const { token, ...pulito } = record;
console.log('token' in pulito);`,
      explanation: 'Rimuovere i campi sensibili prima di salvare è una regola, non un’opzione.',
      concepts: ['privacy'],
    }),
    guided({
      id: 'w11l8e2',
      title: 'Solo i campi necessari',
      prompt: 'Salva solo `tema` e stampa le chiavi: `tema`.',
      starterCode: `const impostazioni = { tema: 'scuro', token: 'x', debug: true };

const daSalvare = {  };
console.log(Object.keys(daSalvare).join(','));`,
      check: { kind: 'output', lines: ['tema'] },
      hints: ['Crea un nuovo oggetto con solo tema.', '{ tema: impostazioni.tema }'],
      solution: `const impostazioni = { tema: 'scuro', token: 'x', debug: true };

const daSalvare = { tema: impostazioni.tema };
console.log(Object.keys(daSalvare).join(','));`,
      explanation: 'La minimizzazione dei dati riduce il rischio e semplifica la privacy.',
      concepts: ['privacy'],
    }),
    solo({
      id: 'w11l8e3',
      title: 'Versione del salvataggio',
      prompt:
        'Aggiungi un campo `versione: 2` al record e stampalo (`2`).',
      starterCode: `const record = { spese: [] };

const salvato = { ...record,  };
console.log(salvato.versione);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Aggiungi versione: 2 allo spread.', 'versione: 2'],
      solution: `const record = { spese: [] };

const salvato = { ...record, versione: 2 };
console.log(salvato.versione);`,
      explanation: 'Una versione esplicita consente migrazioni controllate.',
      concepts: ['privacy'],
    }),
    transfer({
      id: 'w11l8e4',
      title: 'Report di storage',
      prompt:
        'Calcola la dimensione approssimativa in byte di una stringa JSON e stampa `true` se è maggiore di 0.',
      starterCode: `const dati = { spese: [{ importo: 10 }] };
const testo = JSON.stringify(dati);

// dimensione in byte approssimativa
console.log();`,
      objective: 'Stimare l’occupazione per evitare quota exceeded.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['new Blob([testo]).size oppure testo.length.', 'console.log(testo.length > 0)'],
      solution: `const dati = { spese: [{ importo: 10 }] };
const testo = JSON.stringify(dati);

console.log(testo.length > 0);`,
      explanation: 'Conoscere la dimensione aiuta a scegliere tra localStorage e IndexedDB.',
      concepts: ['privacy'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Salvare l’intero oggetto utente',
      code: `localStorage.setItem('utente', JSON.stringify(rispostaAuth));`,
      error: `Token e dati personali finiscono in chiaro nel browser`,
      why: 'La risposta di autenticazione contiene segreti che non devono essere persistiti lato client.',
      fix: `localStorage.setItem('preferenze', JSON.stringify({ tema }));`,
    }),
  ],
  explains: [
    explain({
      id: 'w11l8x1',
      prompt: 'Spiega cosa controlli nel pannello Application e quali dati non devono mai essere salvati.',
      keywords: ['application', 'storage', 'service worker', 'token', 'privacy', 'sensibil'],
      model:
        'Nel pannello Application controllo Local Storage, Session Storage, IndexedDB e Cache Storage per verificare cosa l’app ha salvato, e il service worker per assicurarmi che la versione attiva sia quella giusta. Non salvo mai token, password o dati personali sensibili, perché lo storage del browser non è cifrato ed è accessibile a qualsiasi script della pagina.',
      concepts: ['privacy'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w11l8q1',
      question: 'Dove ispezioni l’IndexedDB?',
      options: [
        ['Pannello Application', 'Esatto.'],
        ['Pannello Network', 'Mostra le richieste.'],
        ['Pannello Elements', 'Mostra il DOM.'],
      ],
      correct: 0,
      explanation: 'Application raccoglie storage, manifest e service worker.',
      concepts: ['DevTools Application'],
    }),
    quiz({
      id: 'w11l8q2',
      question: 'Cosa non va mai salvato nel browser?',
      options: [
        ['Il tema scelto', 'È innocuo.'],
        ['Token e password', 'Esatto.'],
        ['La lingua', 'Innocua.'],
      ],
      correct: 1,
      explanation: 'I segreti restano lato server o in cookie httpOnly.',
      concepts: ['privacy'],
    }),
    quiz({
      id: 'w11l8q3',
      question: 'L’app non si aggiorna dopo un deploy. Cosa controlli?',
      options: [
        ['Il service worker e la cache', 'Esatto.'],
        ['Il colore del tema', 'Non c’entra.'],
        ['La dimensione del font', 'No: il problema è la versione servita dalla cache.'],
      ],
      correct: 0,
      explanation: 'Una cache vecchia può servire la versione precedente.',
      concepts: ['DevTools Application'],
    }),
  ],
  recap: {
    points: [
      'Application mostra storage e service worker.',
      'Mai segreti client-side.',
      'Minimizza i dati salvati.',
      'Verifica la cache dopo i deploy.',
    ],
    learned: 'Sai gestire la persistenza con occhio alla privacy.',
    next: 'Settimana 12: il progetto finale, una Todo App completa.',
  },
});

export const week11 = makeWeek({
  id: W,
  number: 11,
  title: 'Errori e storage',
  subtitle: 'Resilienza e memoria del browser',
  description:
    'Gestire gli errori con classi dedicate, proteggere l’interfaccia e far sopravvivere i dati: localStorage, IndexedDB e strategie di cache.',
  goals: [
    'Gestire errori sincroni e asincroni',
    'Creare errori di dominio',
    'Scegliere lo storage adatto',
    'Invalidare la cache con criterio',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — persistenza',
    brief:
      'Il quaderno si salva su localStorage a ogni modifica confermata e si ricarica con validazione e fallback.',
    deliverable: 'Salvataggio versionato, caricamento difensivo e gestione della quota.',
    milestones: [
      'Chiave versionata',
      'Parse protetto e validazione della forma',
      'Messaggio chiaro se il salvataggio fallisce',
    ],
  },
  professional: {
    title: 'Storage, privacy e manutenzione',
    topics: [
      'Pannello Application',
      'Dati sensibili e minimizzazione',
      'Service worker e cache dopo i deploy',
    ],
    exercise: 'Ispezionare lo storage di un sito e segnalare tre dati che non dovrebbero essere lì.',
  },
});
