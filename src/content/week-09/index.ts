import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-09';

const asyncWrap = (body: string) => `(async () => {\n${body}\n})();`;

const l1 = lesson(W, 1, {
  id: 'w9l1',
  title: 'Callback e callback hell',
  subtitle: 'Quando il codice asincrono annida troppo',
  minutes: 45,
  objectives: [
    'Riconoscere quando un’operazione è asincrona',
    'Passare una callback e gestire il risultato',
    'Riconoscere la piramide delle callback',
  ],
  concepts: ['callback', 'asincronia', 'callback hell'],
  activate: [
    'Una richiesta di rete può durare 200ms o 2 secondi: come fai a usare il risultato senza bloccare la pagina?',
    'Con una callback: “quando il risultato è pronto, chiama questa funzione”.',
  ],
  analogy:
    'Ordini al bar e ti danno un numero: non resti a fissare il bancone bloccando la coda, torni quando ti chiamano. La callback è il numero che ti permette di fare altro nel frattempo.',
  example: {
    code: `function caricaDati(url, callback) {
  console.log('Richiesta a ' + url);
  callback({ ok: true, dati: [1, 2, 3] });
}

caricaDati('/api/spese', (risposta) => {
  console.log('Ricevuti: ' + risposta.dati.length);
});`,
    output: `Richiesta a /api/spese
Ricevuti: 3`,
  },
  formal:
    'Una callback è una funzione passata a un’altra funzione, chiamata quando il lavoro è finito. Il primo argomento è spesso l’errore (error-first callback). Il problema nasce quando una callback dipende da un’altra: l’annidamento cresce, la gestione degli errori si duplica e il flusso diventa difficile da leggere. È il “callback hell”, che le Promise sono nate per risolvere.',
  worked: {
    code: `function leggiUtente(id, callback) {
  callback({ id, nome: 'Ada' });
}

function leggiSpese(utente, callback) {
  callback([{ importo: 10 }, { importo: 20 }]);
}

function calcolaTotale(spese, callback) {
  callback(spese.reduce((acc, s) => acc + s.importo, 0));
}

leggiUtente(1, (utente) => {
  leggiSpese(utente, (spese) => {
    calcolaTotale(spese, (totale) => {
      console.log('Utente: ' + utente.nome);
      console.log('Totale: ' + totale);
    });
  });
});`,
    output: `Utente: Ada
Totale: 30`,
    steps: [
      ['leggiUtente(1, (utente) => {', 'La prima operazione passa il risultato alla callback.'],
      ['leggiSpese(utente, (spese) => {', 'La seconda dipende dalla prima: annidamento.'],
      ['calcolaTotale(spese, (totale) => {', 'La terza dipende dalla seconda: la piramide cresce.'],
      ['console.log(...)', 'Il codice utile sta tre livelli in profondità.'],
      ['Errore non gestito', 'Qui nessuna callback riceve un errore: in produzione servirebbe il ramo error-first.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l1e1',
      title: 'Chiama la callback',
      prompt: 'Completa `esegui` perché chiami la callback con `42` e stampi `42`.',
      starterCode: `function esegui(callback) {
  // chiama la callback
}

esegui((valore) => console.log(valore));`,
      check: { kind: 'output', lines: ['42'] },
      hints: ['La chiamata è callback(42).', 'Dentro esegui non serve return.'],
      solution: `function esegui(callback) {
  callback(42);
}

esegui((valore) => console.log(valore));`,
      explanation: 'Chi riceve la callback decide quando e con quali argomenti chiamarla.',
      concepts: ['callback'],
    }),
    guided({
      id: 'w9l1e2',
      title: 'Flusso annidato',
      prompt:
        'Completa le callback per stampare `utente`, poi `spese`, poi `totale: 30`.',
      starterCode: `function utente(cb) { cb({ nome: 'Ada' }); }
function spese(u, cb) { cb([10, 20]); }
function totale(lista, cb) { cb(lista.reduce((a, b) => a + b, 0)); }

utente((u) => {
  console.log('utente');
  // leggi spese e poi totale
});`,
      check: { kind: 'output', lines: ['utente', 'spese', 'totale: 30'] },
      hints: ['Annida spese dentro utente e totale dentro spese.', 'Le callback ricevono i valori: lista per totale.'],
      solution: `function utente(cb) { cb({ nome: 'Ada' }); }
function spese(u, cb) { cb([10, 20]); }
function totale(lista, cb) { cb(lista.reduce((a, b) => a + b, 0)); }

utente((u) => {
  console.log('utente');
  spese(u, (lista) => {
    console.log('spese');
    totale(lista, (valore) => {
      console.log('totale: ' + valore);
    });
  });
});`,
      explanation: 'Questa è la forma che diventa difficile da leggere: ogni livello aggiunge indentazione.',
      concepts: ['callback hell'],
    }),
    solo({
      id: 'w9l1e3',
      title: 'Callback nominata',
      prompt:
        'Estrai la callback in una funzione nominata `mostra` e passala a `esegui`, stampando `fatto`.',
      starterCode: `function esegui(cb) { cb('fatto'); }

// scrivi mostra e chiama esegui`,
      check: { kind: 'output', lines: ['fatto'] },
      hints: ['function mostra(valore) { console.log(valore); }', 'esegui(mostra) senza parentesi.'],
      solution: `function esegui(cb) { cb('fatto'); }

function mostra(valore) {
  console.log(valore);
}

esegui(mostra);`,
      explanation: 'Le callback nominate riducono l’annidamento e sono riutilizzabili.',
      concepts: ['callback'],
    }),
    transfer({
      id: 'w9l1e4',
      title: 'Error-first',
      prompt:
        'Con `leggi(errore, callback)` che chiama `callback(errore, null)`, gestisci l’errore e stampa `Errore: non trovato`.',
      starterCode: `function leggi(callback) {
  callback('non trovato', null);
}

// gestisci il primo argomento`,
      objective: 'Riconoscere la convenzione error-first delle callback.',
      check: { kind: 'output', lines: ['Errore: non trovato'] },
      hints: ['La callback riceve (errore, dato).', 'if (errore) console.log(\'Errore: \' + errore);'],
      solution: `function leggi(callback) {
  callback('non trovato', null);
}

leggi((errore, dato) => {
  if (errore) {
    console.log('Errore: ' + errore);
    return;
  }
  console.log(dato);
});`,
      explanation: 'La convenzione error-first è il predecessore di catch nelle Promise.',
      concepts: ['callback'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Callback chiamata subito',
      code: `function esegui(cb) {
  cb();
}
console.log('prima');
esegui(() => console.log('callback'));
console.log('dopo');`,
      error: `prima, callback, dopo`,
      why: 'Questo esempio è sincrono: la callback viene eseguita immediatamente. L’asincronia non è la callback, è il ritardo dell’operazione.',
      fix: `function esegui(cb) {
  setTimeout(cb, 0);
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l1x1',
      prompt: 'Spiega cos’è una callback e perché l’annidamento porta al callback hell.',
      keywords: ['callback', 'asincron', 'annid', 'profond', 'errore', 'leggibil'],
      model:
        'Una callback è una funzione passata a un’altra funzione, che la chiama quando il lavoro è pronto. Quando ogni operazione dipende dalla precedente, le callback si annidano, il codice si sposta sempre più a destra e la gestione degli errori si ripete a ogni livello. Questo rende il flusso difficile da leggere e da modificare: è il callback hell.',
      concepts: ['callback hell'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l1q1',
      question: 'Cosa rende asincrona un’operazione?',
      options: [
        ['L’uso di una callback', 'La callback è solo il modo di ricevere il risultato.'],
        ['Il fatto che il risultato arrivi più tardi', 'Esatto.'],
        ['La parola function', 'Non c’entra.'],
      ],
      correct: 1,
      explanation: 'L’asincronia è nel tempo, non nella sintassi.',
      concepts: ['asincronia'],
    }),
    quiz({
      id: 'w9l1q2',
      question: 'Qual è il problema principale del callback hell?',
      options: [
        ['La leggibilità e la gestione ripetuta degli errori', 'Esatto.'],
        ['La velocità di esecuzione', 'Non è un problema di performance.'],
        ['Il consumo di memoria', 'Non è il punto.'],
      ],
      correct: 0,
      explanation: 'Il flusso diventa difficile da seguire e mantenere.',
      concepts: ['callback hell'],
    }),
    quiz({
      id: 'w9l1q3',
      question: 'Nella convenzione error-first, qual è il primo argomento?',
      options: [
        ['Il risultato', 'Il risultato è il secondo.'],
        ['L’errore', 'Esatto.'],
        ['La callback', 'Non è un argomento della callback.'],
      ],
      correct: 1,
      explanation: 'Se il primo argomento è null/undefined, l’operazione è riuscita.',
      concepts: ['callback'],
    }),
  ],
  recap: {
    points: [
      'Callback = funzione chiamata quando il lavoro è pronto.',
      'L’asincronia è nel tempo, non nella sintassi.',
      'L’annidamento produce codice fragile.',
      'Convenzione error-first per gli errori.',
    ],
    learned: 'Riconosci l’asincronia e i suoi primi problemi.',
    next: 'Le Promise: un valore che arriverà.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w9l2',
  title: 'Promise',
  subtitle: 'then, catch, finally e stati',
  minutes: 50,
  objectives: [
    'Creare una Promise e risolverla',
    'Concatenare then senza annidare',
    'Gestire errori e pulizia con catch e finally',
  ],
  concepts: ['Promise', 'then', 'catch/finally'],
  activate: [
    'Una Promise può essere in tre stati. Quali?',
    'Pending, fulfilled, rejected. Una volta risolta o rifiutata non cambia più.',
  ],
  analogy:
    'La Promise è lo scontrino del bar: pending finché aspetti, fulfilled quando arriva il caffè, rejected se qualcosa va storto. then è cosa fare quando arriva, catch se non arriva.',
  example: {
    code: asyncWrap(`  const p = new Promise((resolve) => resolve(21));
  const doppio = await p.then((v) => v * 2);
  console.log(doppio);

  await Promise.reject(new Error('guasto'))
    .catch((e) => console.log('Errore: ' + e.message))
    .finally(() => console.log('Pulizia'));`),
    output: `42
Errore: guasto
Pulizia`,
  },
  formal:
    'new Promise((resolve, reject) => { ... }) crea una promise. then(onFulfilled) restituisce una nuova promise con il valore trasformato; le catene evitano l’annidamento. catch gestisce il rifiuto, finally esegue sempre. Una promise già risolta non cambia stato. Gli errori lanciati dentro then diventano rifiuti della promise successiva. then con due argomenti esiste, ma catch è più leggibile.',
  worked: {
    code: asyncWrap(`  function carica(ok) {
    return new Promise((resolve, reject) => {
      if (ok) resolve([10, 20]);
      else reject(new Error('rete non disponibile'));
    });
  }

  const totale = await carica(true)
    .then((spese) => spese.reduce((acc, n) => acc + n, 0))
    .then((t) => t.toFixed(2));

  console.log(totale);

  await carica(false)
    .then((spese) => spese.length)
    .catch((errore) => 'Fallback: ' + errore.message)
    .then((messaggio) => console.log(messaggio));`),
    output: `30.00
Fallback: rete non disponibile`,
    steps: [
      ['new Promise((resolve, reject) => ...)', 'La funzione executor decide quando risolvere o rifiutare.'],
      ['resolve([10, 20])', 'Il valore passa al primo then.'],
      ['then((spese) => ...)', 'Il risultato viene trasformato e restituito alla promise successiva.'],
      ['catch((errore) => ...)', 'Intercetta il rifiuto: il valore restituito riprende la catena.'],
      ['then((messaggio) => ...)', 'Dopo catch la catena è di nuovo fulfilled: si può continuare.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l2e1',
      title: 'Risolvi una Promise',
      prompt: 'Completa la Promise perché risolva con `7` e stampi `7`.',
      starterCode: asyncWrap(`  const p = new Promise((resolve) => {
    resolve();
  });

  console.log(await p);`),
      check: { kind: 'output', lines: ['7'] },
      hints: ['resolve accetta il valore.', 'resolve(7)'],
      solution: asyncWrap(`  const p = new Promise((resolve) => {
    resolve(7);
  });

  console.log(await p);`),
      explanation: 'Il valore passato a resolve è quello che then/await ricevono.',
      concepts: ['Promise'],
    }),
    guided({
      id: 'w9l2e2',
      title: 'Catena di then',
      prompt: 'Trasforma 5 in 10 e poi in `10 punti`, stampando il risultato.',
      starterCode: asyncWrap(`  const risultato = await Promise.resolve(5)
    .then((n) => n * 2)
    .then(());

  console.log(risultato);`),
      check: { kind: 'output', lines: ['10 punti'] },
      hints: ['La seconda then riceve 10.', 'Restituisci una stringa: n + \' punti\'.'],
      solution: asyncWrap(`  const risultato = await Promise.resolve(5)
    .then((n) => n * 2)
    .then((n) => n + ' punti');

  console.log(risultato);`),
      explanation: 'Ogni then riceve il valore restituito dal precedente.',
      concepts: ['then'],
    }),
    solo({
      id: 'w9l2e3',
      title: 'Catch e finally',
      prompt:
        'Con `Promise.reject(new Error(\'x\'))`, gestisci l’errore stampando `recuperato` e poi `fine` con finally.',
      starterCode: asyncWrap(`  // reject + catch + finally`),
      check: { kind: 'output', lines: ['recuperato', 'fine'] },
      hints: ['catch restituisce un valore: la catena continua.', 'finally non riceve il valore.'],
      solution: asyncWrap(`  await Promise.reject(new Error('x'))
    .catch(() => console.log('recuperato'))
    .finally(() => console.log('fine'));`),
      explanation: 'finally è il posto per la pulizia, indipendentemente dall’esito.',
      concepts: ['catch/finally'],
    }),
    transfer({
      id: 'w9l2e4',
      title: 'Errore dentro then',
      prompt:
        'Simula un errore lanciato dentro then e intercettalo con catch, stampando `Errore: divisore zero`.',
      starterCode: asyncWrap(`  await Promise.resolve(10)
    .then((n) => {
      // lancia un errore
    })
    .catch((e) => console.log('Errore: ' + e.message));`),
      objective: 'Capire che le eccezioni dentro then diventano rifiuti.',
      check: { kind: 'output', lines: ['Errore: divisore zero'] },
      hints: ['throw new Error(\'divisore zero\')', 'Il catch riceve l’errore.'],
      solution: asyncWrap(`  await Promise.resolve(10)
    .then((n) => {
      throw new Error('divisore zero');
    })
    .catch((e) => console.log('Errore: ' + e.message));`),
      explanation: 'Nelle catene, throw equivale a un reject: il catch lo gestisce.',
      concepts: ['catch/finally'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Promise dimenticata',
      code: `Promise.reject(new Error('boom'));
console.log('fine');`,
      error: `UnhandledPromiseRejection: boom`,
      why: 'Una promise rifiutata senza catch produce un errore non gestito, potenzialmente fatale.',
      fix: `Promise.reject(new Error('boom')).catch((e) => console.log(e.message));`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l2x1',
      prompt: 'Spiega i tre stati di una Promise e cosa fa finally.',
      keywords: ['pending', 'fulfilled', 'rejected', 'finally', 'stato', 'promise'],
      model:
        'Una Promise parte in stato pending, poi passa a fulfilled con un valore o rejected con un motivo, e non torna indietro. then gestisce il caso fulfilled, catch il rejected, finally esegue in entrambi i casi ed è utile per la pulizia, per esempio nascondere uno spinner, senza modificare il valore della catena.',
      concepts: ['Promise'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l2q1',
      question: 'Cosa restituisce then?',
      options: [
        ['Il valore trasformato', 'Restituisce una nuova Promise.'],
        ['Una nuova Promise', 'Esatto.'],
        ['undefined', 'No: then restituisce sempre una nuova Promise.'],
      ],
      correct: 1,
      explanation: 'Per questo le catene sono possibili.',
      concepts: ['then'],
    }),
    quiz({
      id: 'w9l2q2',
      question: 'Cosa fa finally?',
      options: [
        ['Esegue sempre, con successo o errore', 'Esatto.'],
        ['Esegue solo in caso di errore', 'Quello è catch.'],
        ['Trasforma il valore', 'Non lo trasforma.'],
      ],
      correct: 0,
      explanation: 'finally è per la pulizia.',
      concepts: ['catch/finally'],
    }),
    quiz({
      id: 'w9l2q3',
      question: 'Una Promise già fulfilled può diventare rejected?',
      options: [
        ['Sì, se l’operazione fallisce dopo', 'Lo stato è immutabile dopo la prima risoluzione.'],
        ['No', 'Esatto.'],
        ['Solo con await', 'Non cambia nulla.'],
      ],
      correct: 1,
      explanation: 'Lo stato di una promise si fissa al primo settle.',
      concepts: ['Promise'],
    }),
  ],
  recap: {
    points: [
      'Stati: pending, fulfilled, rejected.',
      'then restituisce una nuova Promise.',
      'catch gestisce, finally pulisce.',
      'throw dentro then = reject.',
    ],
    learned: 'Sai leggere e costruire catene di Promise.',
    next: 'Promise.all, race, allSettled e any.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w9l3',
  title: 'Combinare Promise',
  subtitle: 'all, race, allSettled, any',
  minutes: 50,
  objectives: [
    'Eseguire operazioni in parallelo con Promise.all',
    'Scegliere il combinatore giusto per il caso',
    'Gestire risultati parziali con allSettled',
  ],
  concepts: ['Promise.all', 'race', 'allSettled'],
  activate: [
    'Tre richieste indipendenti: le fai in sequenza o insieme?',
    'Insieme: Promise.all le avvia tutte e aspetta la più lenta, senza sommare i tempi.',
  ],
  analogy:
    'Promise.all è una squadra: si parte tutti insieme e si consegna quando l’ultimo ha finito. race è una gara: vince il primo. allSettled è il verbale: registra chi ha finito e chi ha fallito.',
  example: {
    code: asyncWrap(`  const a = Promise.resolve(1);
  const b = Promise.resolve(2);

  console.log(await Promise.all([a, b]));

  const lenta = new Promise((r) => setTimeout(() => r('lenta'), 20));
  const veloce = Promise.resolve('veloce');
  console.log(await Promise.race([lenta, veloce]));

  const esiti = await Promise.allSettled([Promise.resolve('ok'), Promise.reject(new Error('no'))]);
  console.log(esiti.map((e) => e.status));`),
    output: `[1, 2]
veloce
['fulfilled', 'rejected']`,
  },
  formal:
    'Promise.all(iterable) restituisce un array di risultati nello stesso ordine, e rifiuta al primo errore. Promise.allSettled restituisce sempre un array di { status, value | reason }. Promise.race restituisce il primo che si risolve o rifiuta. Promise.any restituisce il primo fulfilled, e rifiuta con AggregateError se falliscono tutti. Attenzione: all annulla logicamente il risultato al primo errore, ma le altre operazioni continuano.',
  worked: {
    code: asyncWrap(`  const spese = () => Promise.resolve([10, 20]);
  const utente = () => Promise.resolve({ nome: 'Ada' });
  const lento = () => new Promise((r) => setTimeout(() => r('dopo'), 30));

  const [lista, profilo, messaggio] = await Promise.all([spese(), utente(), lento()]);
  console.log(profilo.nome);
  console.log(lista.reduce((a, b) => a + b, 0));
  console.log(messaggio);

  const fallita = await Promise.allSettled([
    Promise.resolve('a'),
    Promise.reject(new Error('b')),
  ]);
  console.log(fallita.filter((e) => e.status === 'rejected').length);`),
    output: `Ada
30
dopo
1`,
    steps: [
      ['Promise.all([spese(), utente(), lento()])', 'Le tre funzioni partono subito, in parallelo.'],
      ['const [lista, profilo, messaggio] = ...', 'L’ordine dei risultati è quello dell’array di input.'],
      ['lista.reduce(...)', 'I dati sono pronti insieme: nessuna attesa sequenziale.'],
      ['Promise.allSettled([...])', 'Non lancia: restituisce lo stato di ogni operazione.'],
      ['filter(e => e.status === \'rejected\').length', 'Puoi contare i fallimenti e gestirli singolarmente.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l3e1',
      title: 'Somma in parallelo',
      prompt: 'Usa Promise.all per ottenere `[1, 2, 3]` e stampane la somma `6`.',
      starterCode: asyncWrap(`  const valori = await Promise.([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
  console.log(valori.reduce((a, b) => a + b, 0));`),
      check: { kind: 'output', lines: ['6'] },
      hints: ['Il combinatore è all.', 'Promise.all([...])'],
      solution: asyncWrap(`  const valori = await Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
  console.log(valori.reduce((a, b) => a + b, 0));`),
      explanation: 'all raccoglie i risultati nello stesso ordine.',
      concepts: ['Promise.all'],
    }),
    guided({
      id: 'w9l3e2',
      title: 'Il più veloce',
      prompt:
        'Con una promise lenta (20ms) e una immediata, stampa `veloce` usando race.',
      starterCode: asyncWrap(`  const lenta = new Promise((r) => setTimeout(() => r('lenta'), 20));
  const veloce = Promise.resolve('veloce');

  console.log(await Promise.());`),
      check: { kind: 'output', lines: ['veloce'] },
      hints: ['Il combinatore è race.', 'Promise.race([lenta, veloce])'],
      solution: asyncWrap(`  const lenta = new Promise((r) => setTimeout(() => r('lenta'), 20));
  const veloce = Promise.resolve('veloce');

  console.log(await Promise.race([lenta, veloce]));`),
      explanation: 'race restituisce il primo esito, non aspetta gli altri.',
      concepts: ['race'],
    }),
    solo({
      id: 'w9l3e3',
      title: 'Esiti parziali',
      prompt:
        'Con una promise risolta e una rifiutata, usa allSettled e stampa `2` (numero di esiti) e `1` (rifiuti).',
      starterCode: asyncWrap(`  const esiti = await Promise.allSettled([
    Promise.resolve('ok'),
    Promise.reject(new Error('no')),
  ]);

  // stampa lunghezza e numero di rifiuti`),
      check: { kind: 'output', lines: ['2', '1'] },
      hints: ['esiti.length', 'esiti.filter(e => e.status === \'rejected\').length'],
      solution: asyncWrap(`  const esiti = await Promise.allSettled([
    Promise.resolve('ok'),
    Promise.reject(new Error('no')),
  ]);

  console.log(esiti.length);
  console.log(esiti.filter((e) => e.status === 'rejected').length);`),
      explanation: 'allSettled non fallisce mai: utile per riportare lo stato di più operazioni.',
      concepts: ['allSettled'],
    }),
    transfer({
      id: 'w9l3e4',
      title: 'Errore in all',
      prompt:
        'Con Promise.all su una promise che fallisce, intercetta l’errore e stampa `Errore: guasto`.',
      starterCode: asyncWrap(`  try {
    await Promise.all([Promise.resolve(1), Promise.reject(new Error('guasto'))]);
  } catch (errore) {
    // stampa il messaggio
  }`),
      objective: 'Sapere che all rifiuta al primo errore.',
      check: { kind: 'output', lines: ['Errore: guasto'] },
      hints: ['try/catch con await.', 'console.log(\'Errore: \' + errore.message)'],
      solution: asyncWrap(`  try {
    await Promise.all([Promise.resolve(1), Promise.reject(new Error('guasto'))]);
  } catch (errore) {
    console.log('Errore: ' + errore.message);
  }`),
      explanation: 'all è “tutto o niente”: per gestire i singoli fallimenti serve allSettled.',
      concepts: ['Promise.all'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Sequenziale invece di parallelo',
      code: asyncWrap(`  const a = await new Promise((r) => setTimeout(() => r(1), 50));
  const b = await new Promise((r) => setTimeout(() => r(2), 50));
  console.log(a + b);`),
      error: `Funziona, ma impiega il doppio del tempo necessario`,
      why: 'Due operazioni indipendenti eseguite in sequenza sommano le attese.',
      fix: `const [a, b] = await Promise.all([operazioneA(), operazioneB()]);`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l3x1',
      prompt: 'Spiega la differenza tra Promise.all, allSettled e race con un caso d’uso per ciascuno.',
      keywords: ['all', 'allsettled', 'race', 'parallel', 'errore', 'primo'],
      model:
        'Promise.all serve quando tutte le operazioni devono riuscire: restituisce i risultati in ordine e fallisce al primo errore. allSettled serve quando voglio sapere l’esito di ognuna anche se alcune falliscono, per esempio aggiornare più widget indipendenti. race serve quando conta il primo risultato, per esempio una richiesta con timeout o due endpoint alternativi.',
      concepts: ['Promise.all', 'allSettled', 'race'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l3q1',
      question: 'Cosa restituisce Promise.all se una promise fallisce?',
      options: [
        ['Un array con l’errore al posto del valore', 'Rifiuta.'],
        ['Una promise rifiutata con quell’errore', 'Esatto.'],
        ['Nulla', 'Rifiuta con un motivo.'],
      ],
      correct: 1,
      explanation: 'all è tutto-o-niente.',
      concepts: ['Promise.all'],
    }),
    quiz({
      id: 'w9l3q2',
      question: 'Quale combinatore non fallisce mai?',
      options: [
        ['Promise.all', 'Fallisce al primo errore.'],
        ['Promise.allSettled', 'Esatto.'],
        ['Promise.race', 'Può rifiutare se il primo esito è un rifiuto.'],
      ],
      correct: 1,
      explanation: 'allSettled restituisce sempre gli stati.',
      concepts: ['allSettled'],
    }),
    quiz({
      id: 'w9l3q3',
      question: 'Cosa fa Promise.any?',
      options: [
        ['Restituisce il primo fulfilled', 'Esatto.'],
        ['Restituisce il primo esito, anche rifiutato', 'Quello è race.'],
        ['Aspetta tutti', 'Quello è all.'],
      ],
      correct: 0,
      explanation: 'any ignora i rifiuti finché uno riesce.',
      concepts: ['race'],
    }),
  ],
  recap: {
    points: [
      'all: parallelo, tutto o niente.',
      'allSettled: esiti parziali.',
      'race: primo esito.',
      'any: primo successo.',
    ],
    learned: 'Sai orchestrare più operazioni asincrone.',
    next: 'Gestire gli errori nelle catene: catch, propagazione e retry.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w9l4',
  title: 'Errori nelle Promise',
  subtitle: 'Propagazione, recupero e retry',
  minutes: 50,
  objectives: [
    'Propagare un errore lungo la catena',
    'Recuperare con un valore di fallback',
    'Implementare un retry semplice',
  ],
  concepts: ['propagazione', 'fallback', 'retry'],
  activate: [
    'Se il terzo then di una catena fallisce, quali then successivi vengono eseguiti?',
    'Nessuno: l’errore salta al primo catch disponibile.',
  ],
  analogy:
    'L’errore è un ascensore che scende: salta tutti i piani intermedi e si ferma al primo catch. Se non c’è, arriva fino al piano terra e diventa unhandled rejection.',
  example: {
    code: asyncWrap(`  await Promise.resolve(1)
    .then((n) => n + 1)
    .then(() => {
      throw new Error('guasto');
    })
    .then(() => console.log('non eseguito'))
    .catch((e) => console.log('Catturato: ' + e.message))
    .then((v) => console.log('Ripresa:', v));`),
    output: `Catturato: guasto
Ripresa: undefined`,
  },
  formal:
    'Un errore in una catena salta ai then successivi fino al primo catch. Il valore restituito dal catch riprende la catena come fulfilled. Se il catch rilancia, l’errore continua. finally non modifica lo stato. Per il retry si usa una funzione ricorsiva con un contatore e un await che riprova solo in caso di errore, con un limite per evitare loop infiniti.',
  worked: {
    code: asyncWrap(`  let tentativi = 0;

  function instabile() {
    tentativi += 1;
    if (tentativi < 3) {
      return Promise.reject(new Error('tentativo ' + tentativi));
    }
    return Promise.resolve('ok al tentativo ' + tentativi);
  }

  async function conRetry(fn, max) {
    let ultimoErrore;
    for (let i = 1; i <= max; i++) {
      try {
        return await fn();
      } catch (errore) {
        ultimoErrore = errore;
      }
    }
    throw ultimoErrore;
  }

  console.log(await conRetry(instabile, 5));`),
    output: `ok al tentativo 3`,
    steps: [
      ['tentativi += 1', 'Conta i tentativi per simulare un servizio instabile.'],
      ['return Promise.reject(...)', 'I primi due tentativi falliscono.'],
      ['async function conRetry(fn, max)', 'Un ciclo con limite: niente ricorsione infinita.'],
      ['return await fn()', 'Al primo successo esce restituendo il valore.'],
      ['throw ultimoErrore', 'Se tutti falliscono, l’errore risale al chiamante.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l4e1',
      title: 'Recupera con fallback',
      prompt: 'Cattura il rifiuto e restituisci `0`, stampando `0`.',
      starterCode: asyncWrap(`  const valore = await Promise.reject(new Error('x'))
    .catch(() => );

  console.log(valore);`),
      check: { kind: 'output', lines: ['0'] },
      hints: ['Il catch deve restituire un valore.', 'return o espressione: () => 0'],
      solution: asyncWrap(`  const valore = await Promise.reject(new Error('x'))
    .catch(() => 0);

  console.log(valore);`),
      explanation: 'Il valore restituito da catch riprende la catena.',
      concepts: ['fallback'],
    }),
    guided({
      id: 'w9l4e2',
      title: 'Rilancia',
      prompt:
        'Nel catch, se il messaggio è `grave`, rilancia; altrimenti restituisci `recuperato`. Con `grave` stampa `Errore gestito: grave`.',
      starterCode: asyncWrap(`  try {
    await Promise.reject(new Error('grave')).catch((e) => {
      if (e.message === 'grave') ;
      return 'recuperato';
    });
  } catch (e) {
    console.log('Errore gestito: ' + e.message);
  }`),
      check: { kind: 'output', lines: ['Errore gestito: grave'] },
      hints: ['Rilancia con throw e.', 'Sostituisci il punto e virgola con throw e;'],
      solution: asyncWrap(`  try {
    await Promise.reject(new Error('grave')).catch((e) => {
      if (e.message === 'grave') throw e;
      return 'recuperato';
    });
  } catch (e) {
    console.log('Errore gestito: ' + e.message);
  }`),
      explanation: 'Rilanciare permette di gestire alcuni errori e delegare gli altri.',
      concepts: ['propagazione'],
    }),
    solo({
      id: 'w9l4e3',
      title: 'Catena interrotta',
      prompt:
        'Dopo un errore, il then successivo non deve stampare. Stampa solo `catturato`.',
      starterCode: asyncWrap(`  await Promise.reject(new Error('x'))
    .then(() => console.log('non deve apparire'))
    .catch(() => console.log('catturato'));`),
      check: { kind: 'output', lines: ['catturato'] },
      hints: ['Non serve modificare: verifica il comportamento.', 'Il then viene saltato perché la promise è rifiutata.'],
      solution: asyncWrap(`  await Promise.reject(new Error('x'))
    .then(() => console.log('non deve apparire'))
    .catch(() => console.log('catturato'));`),
      explanation: 'then salta i rami fulfilled quando la catena è rifiutata.',
      concepts: ['propagazione'],
    }),
    transfer({
      id: 'w9l4e4',
      title: 'Retry con limite',
      prompt:
        'Una funzione fallisce le prime due volte e riesce alla terza: implementa un retry e stampa `ok` al terzo tentativo.',
      starterCode: asyncWrap(`  let tentativi = 0;

  function instabile() {
    tentativi += 1;
    return tentativi < 3
      ? Promise.reject(new Error('no'))
      : Promise.resolve('ok');
  }

  // retry fino a 5 tentativi
  console.log(await ...);`),
      objective: 'Comporre un pattern di robustezza reale senza dipendenze.',
      check: { kind: 'output', lines: ['ok'] },
      hints: ['Ciclo for con try/catch e return al successo.', 'Non usare retry infiniti: conta i tentativi.'],
      solution: asyncWrap(`  let tentativi = 0;

  function instabile() {
    tentativi += 1;
    return tentativi < 3
      ? Promise.reject(new Error('no'))
      : Promise.resolve('ok');
  }

  let risultato;
  for (let i = 0; i < 5; i++) {
    try {
      risultato = await instabile();
      break;
    } catch {
      // riprova
    }
  }
  console.log(risultato);`),
      explanation: 'Il retry con limite è un pattern comune per le richieste di rete.',
      concepts: ['retry'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Catch troppo presto',
      code: asyncWrap(`  const valore = await Promise.reject(new Error('x')).catch(() => 0);
  console.log(valore + undefined);`),
      error: `NaN`,
      why: 'Il catch ha recuperato, ma il valore successivo non è stato gestito: il problema si è spostato più avanti.',
      fix: `const valore = await Promise.reject(new Error('x')).catch(() => 0);
console.log(valore ?? 0);`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l4x1',
      prompt: 'Spiega come si propaga un errore in una catena di Promise e cosa fa un catch che restituisce un valore.',
      keywords: ['catch', 'propag', 'salta', 'valore', 'catena', 'recuper'],
      model:
        'Quando una promise viene rifiutata, i then successivi vengono saltati e l’errore arriva al primo catch. Se il catch restituisce un valore, la catena torna fulfilled con quel valore e i then successivi riprendono. Se il catch rilancia, l’errore continua verso il chiamante o verso un catch successivo.',
      concepts: ['propagazione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l4q1',
      question: 'Dopo un errore, cosa succede ai then intermedi?',
      options: [
        ['Vengono eseguiti lo stesso', 'Vengono saltati.'],
        ['Vengono saltati', 'Esatto.'],
        ['Vengono annullati per sempre', 'Dopo il catch la catena riprende.'],
      ],
      correct: 1,
      explanation: 'L’errore cerca il primo catch.',
      concepts: ['propagazione'],
    }),
    quiz({
      id: 'w9l4q2',
      question: 'Cosa fa un catch che restituisce 0?',
      options: [
        ['Rende la catena fulfilled con 0', 'Esatto.'],
        ['Rilancia l’errore', 'Rilancia solo con throw.'],
        ['Termina il programma', 'No: il catch ferma solo quella catena, non il programma.'],
      ],
      correct: 0,
      explanation: 'Il valore di ritorno riprende la catena.',
      concepts: ['fallback'],
    }),
    quiz({
      id: 'w9l4q3',
      question: 'Perché un retry deve avere un limite?',
      options: [
        ['Per evitare loop infiniti e consumo inutile', 'Esatto.'],
        ['Perché le Promise non supportano più tentativi', 'Non è un limite tecnico.'],
        ['Perché il browser lo impone', 'No: è una scelta di robustezza, non un limite del browser.'],
      ],
      correct: 0,
      explanation: 'Senza limite un servizio guasto blocca l’app.',
      concepts: ['retry'],
    }),
  ],
  recap: {
    points: [
      'Gli errori saltano al primo catch.',
      'Il valore del catch riprende la catena.',
      'Rilancia per delegare la gestione.',
      'Retry con contatore e limite.',
    ],
    learned: 'Sai gestire gli errori asincroni senza perdere il controllo.',
    next: 'Event loop: chi esegue cosa e in che ordine.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w9l5',
  title: 'Event loop',
  subtitle: 'Microtask, macrotask e ordine di esecuzione',
  minutes: 55,
  objectives: [
    'Prevedere l’ordine tra sincrono, microtask e timer',
    'Capire perché una Promise è più “urgente” di un timeout',
    'Evitare blocchi del thread principale',
  ],
  concepts: ['event loop', 'microtask', 'macrotask'],
  activate: [
    '`setTimeout(..., 0)` e `Promise.resolve().then(...)`: quale viene eseguito prima?',
    'La microtask della Promise, prima del timer.',
  ],
  analogy:
    'Il thread principale è un cassiere con una coda. I microtask sono le richieste “subito dopo questa”: passano prima di tutto il resto. I timer sono appuntamenti che tornano in coda quando è il loro momento.',
  example: {
    code: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
    output: `1
4
3
2`,
  },
  formal:
    'Il codice sincrono finisce prima. Poi la coda delle microtask (Promise.then, queueMicrotask) si svuota completamente. Poi l’event loop prende una macrotask (timer, eventi) e, dopo ognuna, svuota di nuovo le microtask. Questo spiega perché un then precede un setTimeout(0). Un ciclo infinito blocca tutto: nessun timer o evento può essere processato.',
  worked: {
    code: `console.log('inizio');

setTimeout(() => console.log('timeout 1'), 0);

Promise.resolve()
  .then(() => console.log('micro 1'))
  .then(() => console.log('micro 2'));

setTimeout(() => console.log('timeout 2'), 0);

console.log('fine');`,
    output: `inizio
fine
micro 1
micro 2
timeout 1
timeout 2`,
    steps: [
      ['console.log(\'inizio\')', 'Il codice sincrono parte subito.'],
      ['setTimeout(..., 0)', 'Il timer viene accodato come macrotask.'],
      ['Promise.then(...)', 'Le then vengono accodate come microtask.'],
      ['console.log(\'fine\')', 'Il sincrono finisce prima di qualsiasi coda.'],
      ['micro 1, micro 2, poi i timer', 'Le microtask si svuotano tutte prima della prima macrotask.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l5e1',
      title: 'Prima il sincrono',
      prompt: 'Completa l’ordine atteso: deve stampare `a`, `c`, `b`.',
      starterCode: `console.log('a');

setTimeout(() => console.log('b'), 0);

Promise.resolve().then(() => console.log('c'));`,
      check: { kind: 'output', lines: ['a', 'c', 'b'] },
      hints: ['Il sincrono viene prima di tutto.', 'Le microtask precedono i timer.'],
      solution: `console.log('a');

setTimeout(() => console.log('b'), 0);

Promise.resolve().then(() => console.log('c'));`,
      explanation: 'L’ordine è: sincrono → microtask → macrotask.',
      concepts: ['event loop'],
    }),
    guided({
      id: 'w9l5e2',
      title: 'Microtask in catena',
      prompt: 'Con due then in catena e un timeout, l’output deve essere `m1`, `m2`, `t`.',
      starterCode: `Promise.resolve()
  .then(() => console.log('m1'))
  .then(() => console.log('m2'));

setTimeout(() => console.log('t'), 0);`,
      check: { kind: 'output', lines: ['m1', 'm2', 't'] },
      hints: ['Le then si accodano come microtask in sequenza.', 'Il timer aspetta lo svuotamento delle microtask.'],
      solution: `Promise.resolve()
  .then(() => console.log('m1'))
  .then(() => console.log('m2'));

setTimeout(() => console.log('t'), 0);`,
      explanation: 'Ogni then accoda una nuova microtask, eseguita prima del timer.',
      concepts: ['microtask'],
    }),
    solo({
      id: 'w9l5e3',
      title: 'queueMicrotask',
      prompt:
        'Usa queueMicrotask per stampare `micro` prima di un timeout che stampa `timer`.',
      starterCode: `// queueMicrotask + setTimeout`,
      check: { kind: 'output', lines: ['micro', 'timer'] },
      hints: ['queueMicrotask(() => console.log(\'micro\'))', 'Poi setTimeout(..., 0).'],
      solution: `queueMicrotask(() => console.log('micro'));
setTimeout(() => console.log('timer'), 0);`,
      explanation: 'queueMicrotask accoda esplicitamente nella coda delle microtask.',
      concepts: ['microtask'],
    }),
    transfer({
      id: 'w9l5e4',
      title: 'Blocco del thread',
      prompt:
        'Dimostra che un calcolo sincrono ritarda un timer: stampa `sincrono` e poi `timer` con un ciclo di 20ms in mezzo.',
      starterCode: `setTimeout(() => console.log('timer'), 0);

const inizio = Date.now();
while (Date.now() - inizio < 20) {
  // busy wait
}

console.log('sincrono');`,
      objective: 'Capire che il thread principale è unico: il sincrono blocca timer ed eventi.',
      check: { kind: 'output', lines: ['sincrono', 'timer'] },
      hints: ['Il ciclo blocca il thread: il timer non può partire prima.', 'Non serve modificare il codice.'],
      solution: `setTimeout(() => console.log('timer'), 0);

const inizio = Date.now();
while (Date.now() - inizio < 20) {
  // busy wait
}

console.log('sincrono');`,
      explanation: 'Il timer è pronto, ma l’event loop non può eseguirlo finché il thread è occupato.',
      concepts: ['event loop'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Attesa attiva',
      code: `const inizio = Date.now();
while (Date.now() - inizio < 5000) {}
console.log('fatto');`,
      error: `La pagina si blocca per 5 secondi: nessun click, nessuno scroll, nessun timer`,
      why: 'JavaScript ha un solo thread: un ciclo sincrono lungo impedisce qualsiasi altro lavoro.',
      fix: `await new Promise((r) => setTimeout(r, 5000)); // non blocca l'interfaccia`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l5x1',
      prompt: 'Spiega perché `Promise.then` viene eseguito prima di `setTimeout(0)`.',
      keywords: ['microtask', 'macrotask', 'event loop', 'coda', 'timer', 'promise'],
      model:
        'Dopo il codice sincrono, l’event loop svuota completamente la coda delle microtask, dove finiscono i then delle Promise. Solo dopo prende una macrotask, come un timer. Per questo un then viene eseguito prima di un setTimeout(0): non è una questione di velocità ma di priorità tra code.',
      concepts: ['event loop', 'microtask'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l5q1',
      question: 'Quale coda ha priorità dopo il codice sincrono?',
      options: [
        ['Le macrotask', 'Le microtask vengono prima.'],
        ['Le microtask', 'Esatto.'],
        ['L’ordine è casuale', 'È deterministico.'],
      ],
      correct: 1,
      explanation: 'Le microtask si svuotano prima di ogni macrotask.',
      concepts: ['microtask'],
    }),
    quiz({
      id: 'w9l5q2',
      question: 'Cosa succede con un ciclo while infinito nel thread principale?',
      options: [
        ['Il browser lo interrompe dopo 2 secondi', 'Solo la sandbox del corso lo fa.'],
        ['Blocca interfaccia, timer ed eventi', 'Esatto.'],
        ['Passa automaticamente al worker', 'Non accade.'],
      ],
      correct: 1,
      explanation: 'Un solo thread: tutto il resto aspetta.',
      concepts: ['event loop'],
    }),
    quiz({
      id: 'w9l5q3',
      question: 'setTimeout(fn, 0) esegue fn immediatamente?',
      options: [
        ['Sì', 'Va in coda come macrotask.'],
        ['No, dopo le microtask correnti', 'Esatto.'],
        ['Solo se non ci sono Promise', 'Non è condizionato alla presenza di Promise.'],
      ],
      correct: 1,
      explanation: '0 è un ritardo minimo, non un’esecuzione immediata.',
      concepts: ['macrotask'],
    }),
  ],
  recap: {
    points: [
      'Sincrono → microtask → macrotask.',
      'Le microtask si svuotano tutte prima del prossimo timer.',
      'Un thread solo: il sincrono blocca tutto.',
      'setTimeout(0) non è immediato.',
    ],
    learned: 'Sai prevedere l’ordine di esecuzione e evitare blocchi.',
    next: 'Comporre operazioni asincrone in modo leggibile.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w9l6',
  title: 'Comporre asincronia',
  subtitle: 'Sequenza, parallelo e concorrenza limitata',
  minutes: 55,
  objectives: [
    'Scegliere tra sequenza e parallelo',
    'Limitare la concorrenza',
    'Scrivere una pipeline asincrona leggibile',
  ],
  concepts: ['sequenza', 'parallelo', 'concorrenza'],
  activate: [
    'Devi caricare 100 elementi da un’API che regge 5 richieste insieme. Lanciarle tutte è una buona idea?',
    'No: serve un limite di concorrenza per non sovraccaricare il servizio.',
  ],
  analogy:
    'La concorrenza limitata è una cassa con cinque posti: appena uno si libera entra il prossimo. Non cento persone che si accalcano.',
  example: {
    code: asyncWrap(`  const ritardo = (valore, ms) => new Promise((r) => setTimeout(() => r(valore), ms));

  // Sequenziale: attese che si sommano
  const a = await ritardo('a', 10);
  const b = await ritardo('b', 10);
  console.log([a, b].join(''));

  // Parallelo: attese che si sovrappongono
  const [c, d] = await Promise.all([ritardo('c', 10), ritardo('d', 10)]);
  console.log([c, d].join(''));`),
    output: `ab
cd`,
  },
  formal:
    'In sequenza ogni await aspetta il precedente: il tempo totale è la somma. Con Promise.all le operazioni partono insieme: il tempo è il massimo. Per limitare la concorrenza si mantiene un indice condiviso e un pool di worker asincroni che prendono il prossimo elemento appena finiscono. Non serve una libreria: bastano poche righe con Promise.all su un array di worker.',
  worked: {
    code: asyncWrap(`  const elementi = [1, 2, 3, 4, 5];

  async function lavora(n) {
    if (n === 3) throw new Error('errore su ' + n);
    return n * 2;
  }

  async function conLimite(lista, limite, fn) {
    const risultati = [];
    let indice = 0;

    async function worker() {
      while (indice < lista.length) {
        const corrente = indice;
        indice += 1;
        try {
          risultati.push(await fn(lista[corrente]));
        } catch (errore) {
          risultati.push('errore');
        }
      }
    }

    const workers = Array.from({ length: limite }, () => worker());
    await Promise.all(workers);
    return risultati;
  }

  const risultati = await conLimite(elementi, 2, lavora);
  console.log(risultati.filter((r) => typeof r === 'number').length);
  console.log(risultati.includes('errore'));`),
    output: `4
true`,
    steps: [
      ['risultati = []', 'Raccoglie i risultati fuori dai worker.'],
      ['indice condiviso', 'Ogni worker prende il prossimo elemento disponibile.'],
      ['try/catch nel worker', 'Un errore non ferma gli altri elementi.'],
      ['Array.from({ length: limite })', 'Crea esattamente N worker concorrenti.'],
      ['await Promise.all(workers)', 'Aspetta che tutti abbiano svuotato la coda.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l6e1',
      title: 'Parallelo',
      prompt: 'Esegui due operazioni in parallelo e stampa `3` (somma dei risultati).',
      starterCode: asyncWrap(`  const op = (v) => Promise.resolve(v);

  const [a, b] = await .all([op(1), op(2)]);
  console.log(a + b);`),
      check: { kind: 'output', lines: ['3'] },
      hints: ['Il combinatore è Promise.all.', 'Promise.all([...])'],
      solution: asyncWrap(`  const op = (v) => Promise.resolve(v);

  const [a, b] = await Promise.all([op(1), op(2)]);
  console.log(a + b);`),
      explanation: 'Promise.all avvia entrambe le operazioni contemporaneamente.',
      concepts: ['parallelo'],
    }),
    guided({
      id: 'w9l6e2',
      title: 'Sequenza controllata',
      prompt:
        'Esegui due passaggi in sequenza: prima ottieni 2, poi raddoppia e stampa `4`.',
      starterCode: asyncWrap(`  const primo = () => Promise.resolve(2);
  const secondo = (n) => Promise.resolve(n * 2);

  // sequenza
  console.log();`),
      check: { kind: 'output', lines: ['4'] },
      hints: ['const n = await primo();', 'Poi console.log(await secondo(n)).'],
      solution: asyncWrap(`  const primo = () => Promise.resolve(2);
  const secondo = (n) => Promise.resolve(n * 2);

  const valore = await primo();
  console.log(await secondo(valore));`),
      explanation: 'La sequenza serve quando il secondo passo dipende dal primo.',
      concepts: ['sequenza'],
    }),
    solo({
      id: 'w9l6e3',
      title: 'Concorrenza limitata',
      prompt:
        'Con 5 elementi e limite 2, elabora tutti con una funzione che restituisce il doppio: stampa `10` (somma) e verifica che il massimo concorrente sia ≤ 2 (stampa `true`).',
      starterCode: asyncWrap(`  let attivi = 0;
  let massimo = 0;

  async function lavora(n) {
    attivi += 1;
    massimo = Math.max(massimo, attivi);
    await new Promise((r) => setTimeout(r, 5));
    attivi -= 1;
    return n * 2;
  }

  // esegui con limite 2
  console.log();`),
      check: { kind: 'output', lines: ['10', 'true'] },
      hints: ['Crea due worker che prendono elementi da un indice condiviso.', 'Raccogli i risultati e somma.'],
      solution: asyncWrap(`  let attivi = 0;
  let massimo = 0;

  async function lavora(n) {
    attivi += 1;
    massimo = Math.max(massimo, attivi);
    await new Promise((r) => setTimeout(r, 5));
    attivi -= 1;
    return n * 2;
  }

  const elementi = [1, 2, 3, 4, 5];
  const risultati = [];
  let indice = 0;

  async function worker() {
    while (indice < elementi.length) {
      const corrente = indice++;
      risultati.push(await lavora(elementi[corrente]));
    }
  }

  await Promise.all([worker(), worker()]);
  console.log(risultati.reduce((a, b) => a + b, 0));
  console.log(massimo <= 2);`),
      explanation: 'Il pool di worker mantiene la concorrenza sotto controllo senza perdere elementi.',
      concepts: ['concorrenza'],
    }),
    transfer({
      id: 'w9l6e4',
      title: 'Pipeline asincrona',
      prompt:
        'Componi caricamento → filtro → totale in modo asincrono e stampa `30`.',
      starterCode: asyncWrap(`  const carica = () => Promise.resolve([10, 20, 30]);
  const tieni = (lista) => Promise.resolve(lista.filter((n) => n >= 20));
  const somma = (lista) => Promise.resolve(lista.reduce((a, b) => a + b, 0));

  // pipeline
  console.log();`),
      objective: 'Comporre funzioni asincrone come una pipeline leggibile.',
      check: { kind: 'output', lines: ['30'] },
      hints: ['await carica(), poi await tieni, poi await somma.', 'Assegna i passaggi a variabili con nomi chiari.'],
      solution: asyncWrap(`  const carica = () => Promise.resolve([10, 20, 30]);
  const tieni = (lista) => Promise.resolve(lista.filter((n) => n >= 20));
  const somma = (lista) => Promise.resolve(lista.reduce((a, b) => a + b, 0));

  const dati = await carica();
  const filtrati = await tieni(dati);
  console.log(await somma(filtrati));`),
      explanation: 'Una pipeline asincrona resta leggibile se ogni passaggio ha un nome.',
      concepts: ['sequenza'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Await in un forEach',
      code: asyncWrap(`  [1, 2, 3].forEach(async (n) => {
    await new Promise((r) => setTimeout(r, 10));
    console.log(n);
  });
  console.log('fine');`),
      error: `fine compare prima dei numeri: forEach non aspetta le callback async`,
      why: 'forEach ignora le promise restituite: non puoi attendere il completamento.',
      fix: `for (const n of [1, 2, 3]) {
  await new Promise((r) => setTimeout(r, 10));
  console.log(n);
}
console.log('fine');`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l6x1',
      prompt: 'Spiega quando usare la sequenza e quando il parallelo, e come si limita la concorrenza.',
      keywords: ['sequenz', 'parallel', 'dipend', 'concorrenz', 'limite', 'worker'],
      model:
        'Uso la sequenza quando un passaggio dipende dal risultato del precedente, per esempio caricare un utente e poi le sue spese. Uso il parallelo con Promise.all quando le operazioni sono indipendenti, perché il tempo totale è il massimo invece della somma. Per limitare la concorrenza creo un piccolo pool di worker asincroni che condividono un indice e prendono il prossimo elemento appena hanno finito.',
      concepts: ['concorrenza'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l6q1',
      question: 'Quando serve la sequenza?',
      options: [
        ['Quando un passaggio dipende dal precedente', 'Esatto.'],
        ['Sempre, è più sicuro', 'Perde tempo inutilmente.'],
        ['Mai, il parallelo è sempre meglio', 'Il parallelo non funziona con dipendenze.'],
      ],
      correct: 0,
      explanation: 'Le dipendenze impongono l’ordine.',
      concepts: ['sequenza'],
    }),
    quiz({
      id: 'w9l6q2',
      question: 'Perché await dentro forEach non funziona come atteso?',
      options: [
        ['Perché forEach ignora le promise restituite', 'Esatto.'],
        ['Perché await è vietato nelle callback', 'È permesso, ma non atteso.'],
        ['Perché forEach è deprecato', 'Non è deprecato.'],
      ],
      correct: 0,
      explanation: 'Usa for...of o Promise.all.',
      concepts: ['sequenza'],
    }),
    quiz({
      id: 'w9l6q3',
      question: 'Come si limita la concorrenza senza librerie?',
      options: [
        ['Con un pool di worker e un indice condiviso', 'Esatto.'],
        ['Con setTimeout casuale', 'Non limita nulla.'],
        ['Con Promise.race', 'Non è il suo scopo.'],
      ],
      correct: 0,
      explanation: 'Poche righe, comportamento prevedibile.',
      concepts: ['concorrenza'],
    }),
  ],
  recap: {
    points: [
      'Sequenza per dipendenze, parallelo per indipendenza.',
      'forEach non attende le callback async.',
      'Pool di worker per limitare la concorrenza.',
      'Errore per elemento gestito nel worker.',
    ],
    learned: 'Sai orchestrare operazioni asincrone come in produzione.',
    next: 'Ripasso e progetto: simulare un’API con le Promise.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w9l7',
  title: 'Ripasso e progetto',
  subtitle: 'Simulare un’API con le Promise',
  minutes: 60,
  objectives: [
    'Costruire un client API finto con ritardi',
    'Gestire errori e retry in un flusso reale',
    'Separare trasporto e logica dell’app',
  ],
  concepts: ['ripasso', 'progetto', 'API simulata'],
  activate: [
    'Senza rete, come testi il caricamento delle spese?',
    'Con un client finto che restituisce Promise con ritardo: stesso contratto, nessuna rete.',
  ],
  analogy:
    'L’API finta è un manichino da addestramento: stessa forma della persona vera, ma non si muove. Ti permette di provare il flusso senza dipendere dal mondo esterno.',
  example: {
    code: asyncWrap(`  function apiFinta(spese) {
    return {
      lista: () => new Promise((r) => setTimeout(() => r(spese), 10)),
      dettaglio: (id) =>
        new Promise((resolve, reject) => {
          const trovata = spese.find((s) => s.id === id);
          if (trovata) resolve(trovata);
          else reject(new Error('Spesa non trovata'));
        }),
    };
  }

  const api = apiFinta([{ id: 1, importo: 10 }, { id: 2, importo: 20 }]);
  console.log((await api.lista()).length);
  console.log((await api.dettaglio(2)).importo);`),
    output: `2
20`,
  },
  formal:
    'Un client API ha metodi che restituiscono Promise e un contratto stabile: lista, dettaglio, crea, elimina. La simulazione usa setTimeout per introdurre latenza e reject per gli errori. La logica dell’app non deve sapere se il client è finto o reale: dipende solo dall’interfaccia. Questo permette di testare offline e di sostituire il client con fetch in seguito.',
  worked: {
    code: asyncWrap(`  let chiamate = 0;

  function creaApi() {
    const spese = [{ id: 1, importo: 10 }];

    return {
      lista() {
        chiamate += 1;
        if (chiamate === 1) return Promise.reject(new Error('rete instabile'));
        return Promise.resolve([...spese]);
      },
      totale() {
        return this.lista().then((lista) => lista.reduce((a, s) => a + s.importo, 0));
      },
    };
  }

  async function caricaConRetry(api, max = 3) {
    for (let i = 0; i < max; i++) {
      try {
        return await api.totale();
      } catch {
        // riprova
      }
    }
    return 0;
  }

  console.log(await caricaConRetry(creaApi()));`),
    output: `10`,
    steps: [
      ['chiamate += 1', 'La prima chiamata fallisce: simuliamo instabilità.'],
      ['Promise.reject(...)', 'Il client espone errori come rifiuti.'],
      ['this.lista().then(...)', 'Il totale si compone sul risultato del lista.'],
      ['caricaConRetry', 'La logica applicativa gestisce il retry, non il client.'],
      ['return 0 nel fallback', 'Dopo N tentativi si restituisce un valore sicuro.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l7e1',
      title: 'Client finto',
      prompt: 'Completa `lista` perché restituisca una Promise con l’array e stampa `2`.',
      starterCode: asyncWrap(`  const api = {
    lista() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 5);
      });
    },
  };

  console.log((await api.lista()).length);`),
      check: { kind: 'output', lines: ['2'] },
      hints: ['resolve deve ricevere l’array.', 'resolve([{...}, {...}])'],
      solution: asyncWrap(`  const api = {
    lista() {
      return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1 }, { id: 2 }]), 5);
      });
    },
  };

  console.log((await api.lista()).length);`),
      explanation: 'Il client restituisce dati dopo un ritardo: stesso contratto della rete.',
      concepts: ['API simulata'],
    }),
    guided({
      id: 'w9l7e2',
      title: 'Dettaglio con errore',
      prompt:
        'Completa `dettaglio` per rifiutare se non trova la spesa. Con id 99 stampa `Errore: non trovata`.',
      starterCode: asyncWrap(`  const spese = [{ id: 1, importo: 10 }];

  function dettaglio(id) {
    return new Promise((resolve, reject) => {
      const trovata = spese.find((s) => s.id === id);
      // gestisci il caso
    });
  }

  try {
    await dettaglio(99);
  } catch (e) {
    console.log('Errore: ' + e.message);
  }`),
      check: { kind: 'output', lines: ['Errore: non trovata'] },
      hints: ['if (trovata) resolve(trovata); else reject(new Error(\'non trovata\'));', 'Il messaggio deve essere esattamente non trovata.'],
      solution: asyncWrap(`  const spese = [{ id: 1, importo: 10 }];

  function dettaglio(id) {
    return new Promise((resolve, reject) => {
      const trovata = spese.find((s) => s.id === id);
      if (trovata) resolve(trovata);
      else reject(new Error('non trovata'));
    });
  }

  try {
    await dettaglio(99);
  } catch (e) {
    console.log('Errore: ' + e.message);
  }`),
      explanation: 'La ricerca assente diventa un rifiuto esplicito, non un valore undefined silenzioso.',
      concepts: ['API simulata'],
    }),
    solo({
      id: 'w9l7e3',
      title: 'Totale dal client',
      prompt:
        'Con `api.lista()` che restituisce due spese, calcola il totale e stampa `30`.',
      starterCode: asyncWrap(`  const api = {
    lista: () => Promise.resolve([{ importo: 10 }, { importo: 20 }]),
  };

  // calcola il totale`),
      check: { kind: 'output', lines: ['30'] },
      hints: ['const lista = await api.lista()', 'Poi reduce.'],
      solution: asyncWrap(`  const api = {
    lista: () => Promise.resolve([{ importo: 10 }, { importo: 20 }]),
  };

  const lista = await api.lista();
  console.log(lista.reduce((a, s) => a + s.importo, 0));`),
      explanation: 'Il client restituisce dati; il calcolo resta nella logica applicativa.',
      concepts: ['progetto'],
    }),
    transfer({
      id: 'w9l7e4',
      title: 'Retry sul client',
      prompt:
        'Il client fallisce la prima volta e riesce la seconda: con un retry stampa `1`.',
      starterCode: asyncWrap(`  let chiamate = 0;
  const api = {
    lista() {
      chiamate += 1;
      return chiamate < 2 ? Promise.reject(new Error('rete')) : Promise.resolve([1]);
    },
  };

  // retry`),
      objective: 'Combinare client simulato, retry e gestione errori.',
      check: { kind: 'output', lines: ['1'] },
      hints: ['Ciclo con try/catch e return al successo.', 'Stampa la lunghezza del risultato.'],
      solution: asyncWrap(`  let chiamate = 0;
  const api = {
    lista() {
      chiamate += 1;
      return chiamate < 2 ? Promise.reject(new Error('rete')) : Promise.resolve([1]);
    },
  };

  let risultato = [];
  for (let i = 0; i < 3; i++) {
    try {
      risultato = await api.lista();
      break;
    } catch {
      // riprova
    }
  }
  console.log(risultato.length);`),
      explanation: 'Il retry resta nella logica applicativa: il client resta semplice.',
      concepts: ['API simulata'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Client che non segnala errori',
      code: asyncWrap(`  const api = {
    lista: () => Promise.resolve(null),
  };
  const lista = await api.lista();
  console.log(lista.length);`),
      error: `TypeError: Cannot read properties of null (reading 'length')`,
      why: 'Un client che restituisce null invece di rifiutare sposta il bug nel codice chiamante.',
      fix: `return Promise.reject(new Error('risposta non valida'));`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l7x1',
      prompt: 'Spiega come hai simulato l’API e perché la logica del quaderno non deve sapere se è finta.',
      keywords: ['api', 'promise', 'simul', 'contratto', 'ritardo', 'sostitu'],
      model:
        'Ho creato un oggetto con metodi che restituiscono Promise e usano setTimeout per simulare la latenza, con reject per gli errori. La logica del quaderno dipende solo dal contratto lista/dettaglio, quindi posso sostituire il client finto con fetch senza cambiare il resto. Questo rende il codice testabile offline e mi permette di sviluppare l’interfaccia prima del backend.',
      concepts: ['API simulata'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l7q1',
      question: 'Come si simula la latenza?',
      options: [
        ['Con un busy loop', 'Blocca il thread.'],
        ['Con setTimeout dentro la Promise', 'Esatto.'],
        ['Con console.log', 'Non simula nulla.'],
      ],
      correct: 1,
      explanation: 'setTimeout non blocca e riproduce un ritardo realistico.',
      concepts: ['API simulata'],
    }),
    quiz({
      id: 'w9l7q2',
      question: 'Cosa deve fare il client quando i dati non esistono?',
      options: [
        ['Restituire null', 'Sposta il bug al chiamante.'],
        ['Rifiutare con un errore chiaro', 'Esatto.'],
        ['Ignorare la richiesta', 'Non risponde: il chiamante resta in attesa.'],
      ],
      correct: 1,
      explanation: 'Gli errori fanno parte del contratto.',
      concepts: ['API simulata'],
    }),
    quiz({
      id: 'w9l7q3',
      question: 'Dove va il retry?',
      options: [
        ['Nella logica applicativa', 'Esatto.'],
        ['Dentro ogni metodo del client', 'Duplicherebbe la politica.'],
        ['Nel markup', 'No: la politica di retry non appartiene alla vista.'],
      ],
      correct: 0,
      explanation: 'Il client resta semplice; la politica di robustezza è dell’app.',
      concepts: ['progetto'],
    }),
  ],
  recap: {
    points: [
      'Client finto: stesse Promise, nessuna rete.',
      'setTimeout per la latenza, reject per gli errori.',
      'La logica dipende dal contratto.',
      'Retry nella logica applicativa.',
    ],
    learned: 'Il Quaderno delle spese può caricare dati in modo asincrono.',
    next: 'Lato professionale: strumenti per il debug asincrono.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w9l8',
  title: 'Lato professionale e test',
  subtitle: 'Debug asincrono e verifica della settimana',
  minutes: 50,
  objectives: [
    'Leggere uno stack trace asincrono',
    'Usare i punti di attesa in DevTools',
    'Superare il test della settimana',
  ],
  concepts: ['debug async', 'stack trace', 'test'],
  activate: [
    'Un errore dice “at async carica”. Da dove parti per capire la causa?',
    'Dallo stack: le righe successive indicano la catena di chiamate fino all’origine.',
  ],
  analogy:
    'Lo stack trace è la cronologia di una telefonata: chi ha chiamato chi, fino al punto in cui è caduta la linea. Nelle funzioni async include anche i passaggi awaited.',
  example: {
    code: asyncWrap(`  async function leggi() {
    throw new Error('dati mancanti');
  }

  async function carica() {
    try {
      await leggi();
    } catch (errore) {
      console.log(errore.name + ': ' + errore.message);
      console.log(errore.stack.includes('leggi'));
    }
  }

  await carica();`),
    output: `Error: dati mancanti
true`,
  },
  formal:
    'Gli errori async mantengono lo stack delle chiamate awaited. In DevTools → Sources si possono mettere breakpoint anche dopo un await e usare “Async” nella sezione Call Stack. Per distinguere gli errori di programmazione da quelli attesi, usa classi di errore dedicate e log con contesto. Non lasciare promise senza catch: unhandledrejection è un segnale da intercettare.',
  worked: {
    code: asyncWrap(`  function erroreConCausa() {
    try {
      JSON.parse('{');
    } catch (causa) {
      throw new Error('Configurazione non valida', { cause: causa });
    }
  }

  try {
    erroreConCausa();
  } catch (errore) {
    console.log(errore.message);
    console.log(errore.cause.name);
  }

  window.addEventListener?.('unhandledrejection', () => {});
  await Promise.reject(new Error('x')).catch(() => console.log('gestita'));`),
    output: `Configurazione non valida
SyntaxError
gestita`,
    steps: [
      ['try/catch interno', 'Cattura la causa tecnica.'],
      ['throw new Error(msg, { cause })', 'Espone un messaggio comprensibile mantenendo la causa originale.'],
      ['errore.cause.name', 'La causa resta ispezionabile per il debug.'],
      ['catch finale', 'Una promise gestita non produce unhandledrejection.'],
    ],
  },
  exercises: [
    fill({
      id: 'w9l8e1',
      title: 'Messaggio e causa',
      prompt: 'Lancia un errore con messaggio `Config non valida` e causa `originale`, poi stampa il messaggio.',
      starterCode: asyncWrap(`  try {
    throw new Error(, { cause: new Error('originale') });
  } catch (e) {
    console.log(e.message);
  }`),
      check: { kind: 'output', lines: ['Config non valida'] },
      hints: ['Il primo argomento è il messaggio.', 'new Error(\'Config non valida\', ...)'],
      solution: asyncWrap(`  try {
    throw new Error('Config non valida', { cause: new Error('originale') });
  } catch (e) {
    console.log(e.message);
  }`),
      explanation: 'cause conserva il dettaglio tecnico senza confondere il messaggio utente.',
      concepts: ['debug async'],
    }),
    guided({
      id: 'w9l8e2',
      title: 'Nessuna promise orfana',
      prompt: 'Gestisci il rifiuto e stampa `gestita`.',
      starterCode: asyncWrap(`  await Promise.reject(new Error('x'))
    // aggiungi la gestione
  ;`),
      check: { kind: 'output', lines: ['gestita'] },
      hints: ['Serve un catch.', '.catch(() => console.log(\'gestita\'))'],
      solution: asyncWrap(`  await Promise.reject(new Error('x')).catch(() => console.log('gestita'));`),
      explanation: 'Ogni rifiuto deve avere un gestore, anche quando prevedi che non accada.',
      concepts: ['debug async'],
    }),
    solo({
      id: 'w9l8e3',
      title: 'Stack utile',
      prompt:
        'Cattura un errore lanciato in una funzione annidata e stampa `true` se lo stack menziona `interna`.',
      starterCode: asyncWrap(`  function interna() { throw new Error('x'); }
  function esterna() { interna(); }

  try {
    esterna();
  } catch (e) {
    // verifica lo stack
  }`),
      check: { kind: 'output', lines: ['true'] },
      hints: ['e.stack è una stringa.', 'console.log(e.stack.includes(\'interna\'))'],
      solution: asyncWrap(`  function interna() { throw new Error('x'); }
  function esterna() { interna(); }

  try {
    esterna();
  } catch (e) {
    console.log(e.stack.includes('interna'));
  }`),
      explanation: 'Lo stack indica la catena di chiamate: è la mappa del bug.',
      concepts: ['stack trace'],
    }),
    transfer({
      id: 'w9l8e4',
      title: 'Classe di errore',
      prompt:
        'Crea `class ErroreRete extends Error` e, lanciandola, stampa `ErroreRete: timeout`.',
      starterCode: asyncWrap(`  // definisci la classe
  try {
    throw new ErroreRete('timeout');
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }`),
      objective: 'Distinguere gli errori applicativi con classi dedicate.',
      check: { kind: 'output', lines: ['ErroreRete: timeout'] },
      hints: ['class ErroreRete extends Error { constructor(msg) { super(msg); this.name = \'ErroreRete\'; } }', 'Il name deve essere esatto.'],
      solution: asyncWrap(`  class ErroreRete extends Error {
    constructor(messaggio) {
      super(messaggio);
      this.name = 'ErroreRete';
    }
  }

  try {
    throw new ErroreRete('timeout');
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }`),
      explanation: 'Le classi di errore permettono gestione mirata con instanceof.',
      concepts: ['debug async'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Errore inghiottito',
      code: asyncWrap(`  try {
    await Promise.reject(new Error('x'));
  } catch (e) {
    // silenzio
  }`),
      error: `Il bug sparisce e il comportamento resta inspiegabile`,
      why: 'Un catch vuoto nasconde il problema senza risolverlo.',
      fix: `catch (e) {
  console.error('Caricamento fallito', e);
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w9l8x1',
      prompt: 'Spiega come leggi uno stack trace asincrono e perché non bisogna lasciare catch vuoti.',
      keywords: ['stack', 'async', 'catch', 'causa', 'messaggio', 'debug'],
      model:
        'Leggo lo stack dal punto più vicino all’errore e risalgo le chiamate awaited per capire da dove arriva il dato sbagliato. Un catch vuoto nasconde l’errore: meglio loggare con contesto o rilanciare un errore con cause, così il problema resta diagnosticabile senza esporre dettagli tecnici all’utente.',
      concepts: ['stack trace'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w9l8q1',
      question: 'A cosa serve la proprietà cause di un Error?',
      options: [
        ['A mantenere l’errore originale per il debug', 'Esatto.'],
        ['A mostrare il messaggio all’utente', 'Quello è message.'],
        ['A fermare l’esecuzione', 'Non ha questo effetto.'],
      ],
      correct: 0,
      explanation: 'cause conserva il dettaglio tecnico.',
      concepts: ['debug async'],
    }),
    quiz({
      id: 'w9l8q2',
      question: 'Cosa indica uno stack trace?',
      options: [
        ['La catena di chiamate fino al punto dell’errore', 'Esatto.'],
        ['La lista delle variabili', 'Quelle si vedono nel debugger.'],
        ['Il tempo di esecuzione', 'No: il tempo di esecuzione non entra nello stack trace.'],
      ],
      correct: 0,
      explanation: 'È la mappa del percorso che ha portato all’errore.',
      concepts: ['stack trace'],
    }),
    quiz({
      id: 'w9l8q3',
      question: 'Perché un catch vuoto è pericoloso?',
      options: [
        ['Nasconde il problema e rende il debug impossibile', 'Esatto.'],
        ['Rallenta l’app', 'Non è una questione di performance.'],
        ['Chiude la connessione', 'No: non tocca la rete, semplicemente tace sull’errore.'],
      ],
      correct: 0,
      explanation: 'Un errore non gestito è meglio di uno inghiottito.',
      concepts: ['debug async'],
    }),
  ],
  recap: {
    points: [
      'Lo stack mostra la catena di chiamate.',
      'cause conserva il dettaglio tecnico.',
      'Mai catch vuoti.',
      'Classi di errore per gestioni mirate.',
    ],
    learned: 'Sai diagnosticare i problemi asincroni con metodo.',
    next: 'Settimana 10: async/await, fetch e API reali.',
  },
});

export const week09 = makeWeek({
  id: W,
  number: 9,
  title: 'Async: le basi',
  subtitle: 'Callback, Promise ed event loop',
  description:
    'Il modello asincrono di JavaScript spiegato dal problema alla soluzione: callback, catene di Promise, combinatori e ordine di esecuzione.',
  goals: [
    'Riconoscere e gestire l’asincronia',
    'Scrivere catene di Promise leggibili',
    'Scegliere il combinatore giusto',
    'Prevedere l’ordine di esecuzione',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — API simulata',
    brief:
      'Un client finto restituisce spese con latenza e errori. Il quaderno carica, calcola e riprova.',
    deliverable: 'Client con lista e dettaglio, retry applicativo e gestione degli errori.',
    milestones: [
      'Promise con latenza simulata',
      'Errori espliciti invece di null',
      'Retry con limite',
    ],
  },
  professional: {
    title: 'Debug asincrono',
    topics: [
      'Leggere uno stack trace con await',
      'cause e classi di errore',
      'Mai promise orfane, mai catch vuoti',
    ],
    exercise: 'Riprodurre un errore asincrono, leggerne lo stack e aggiungere una causa esplicita.',
  },
});
