import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-02';

const l1 = lesson(W, 1, {
  id: 'w2l1',
  title: 'Il ciclo for',
  subtitle: 'Ripetere senza copiare: inizializzazione, condizione, incremento',
  minutes: 45,
  objectives: [
    'Scrivere un ciclo for con le sue tre parti',
    'Usare il contatore per accumulare un risultato',
    'Riconoscere un ciclo che non termina',
  ],
  concepts: ['for', 'contatore', 'accumulatore'],
  activate: [
    'Dovresti stampare i numeri da 1 a 100. Copieresti console.log cento volte?',
    'Un ciclo descrive la ripetizione invece di elencarla: è la prima vera automazione che scrivi.',
  ],
  analogy:
    'Il for è una clessidra con tre manopole: una dice da dove parti (let i = 1), una dice quando fermarti (i <= 5), una dice quanto avanzare a ogni giro (i++). Gira finché la condizione resta vera.',
  example: {
    code: `for (let i = 1; i <= 3; i++) {
  console.log('Giro ' + i);
}`,
    output: `Giro 1
Giro 2
Giro 3`,
  },
  formal:
    'La forma è for (inizializzazione; condizione; passo) { corpo }. L’inizializzazione gira una volta sola, la condizione viene valutata prima di ogni giro, il passo dopo ogni corpo. Se la condizione è sempre vera il ciclo non termina: è il bug più comune dei principianti. La variabile i esiste solo dentro il ciclo (scope di blocco).',
  worked: {
    code: `let totale = 0;

for (let i = 1; i <= 4; i++) {
  totale = totale + i;
  console.log('Dopo il giro ' + i + ', totale = ' + totale);
}

console.log('Totale finale: ' + totale);`,
    output: `Dopo il giro 1, totale = 1
Dopo il giro 2, totale = 3
Dopo il giro 3, totale = 6
Dopo il giro 4, totale = 10
Totale finale: 10`,
    steps: [
      ['let totale = 0;', 'L’accumulatore vive fuori dal ciclo: dentro verrebbe azzerato a ogni giro.'],
      ['for (let i = 1; i <= 4; i++)', 'i parte da 1, il ciclo continua finché i ≤ 4, e cresce di 1.'],
      ['totale = totale + i;', 'A ogni giro aggiungiamo il valore corrente di i al totale.'],
      ['console.log(...)', 'Stampare dentro il ciclo mostra l’evoluzione: utile per capire, non per il risultato finale.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l1e1',
      title: 'Da 1 a 5',
      prompt: 'Completa il ciclo perché stampi i numeri da 1 a 5, uno per riga.',
      starterCode: `for (let i = 1; i <= ; i++) {
  console.log(i);
}`,
      check: { kind: 'output', lines: ['1', '2', '3', '4', '5'] },
      hints: ['La condizione dice quando continuare: i <= 5.', 'Il passo i++ incrementa di uno.'],
      solution: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
      explanation: 'Cinque giri, cinque righe: il ciclo sostituisce cinque console.log.',
      concepts: ['for'],
    }),
    guided({
      id: 'w2l1e2',
      title: 'Somma da 1 a 10',
      prompt: 'Somma i numeri da 1 a 10 con un ciclo e stampa `55`.',
      starterCode: `let somma = 0;

// ciclo da 1 a 10

console.log(somma);`,
      check: { kind: 'output', lines: ['55'] },
      hints: ['Dentro il ciclo: somma = somma + i (oppure somma += i).', 'Il ciclo va da 1 a 10 compreso.'],
      solution: `let somma = 0;
for (let i = 1; i <= 10; i++) {
  somma += i;
}
console.log(somma);`,
      explanation: 'L’accumulatore somma ogni valore: 1+2+...+10 = 55.',
      concepts: ['for', 'accumulatore'],
    }),
    solo({
      id: 'w2l1e3',
      title: 'Solo i pari',
      prompt: 'Stampa i numeri pari da 2 a 6, uno per riga, usando un ciclo che parte da 2 e avanza di 2.',
      starterCode: `// scrivi da zero`,
      check: { kind: 'output', lines: ['2', '4', '6'] },
      hints: ['L’incremento può essere i += 2.', 'Condizione i <= 6.'],
      solution: `for (let i = 2; i <= 6; i += 2) {
  console.log(i);
}`,
      explanation: 'Il passo non deve essere per forza 1: qui salta direttamente ai pari.',
      concepts: ['for'],
    }),
    transfer({
      id: 'w2l1e4',
      title: 'Conto alla rovescia',
      prompt: 'Stampa `3`, `2`, `1`, poi `Via!`. Usa un ciclo che decrementa.',
      starterCode: `// conta alla rovescia`,
      objective: 'Adattare un ciclo a un verso diverso: dal basso verso l’alto al contrario.',
      check: { kind: 'output', lines: ['3', '2', '1', 'Via!'] },
      hints: ['Parti da i = 3 e continua finché i >= 1.', 'Il passo è i-- oppure i -= 1.'],
      solution: `for (let i = 3; i >= 1; i--) {
  console.log(i);
}
console.log('Via!');`,
      explanation: 'Cambiare condizione e passo cambia il verso del ciclo. Il messaggio finale resta fuori.',
      concepts: ['for'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Ciclo infinito',
      code: `for (let i = 1; i <= 5; i--) {
  console.log(i);
}`,
      error: `1, 0, -1, -2, ... (blocca la pagina)`,
      why: 'i decresce, quindi i <= 5 è sempre vera: il ciclo non termina mai. Nell’editor del corso viene interrotto dopo 2 secondi.',
      fix: `for (let i = 1; i <= 5; i++) {`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l1x1',
      prompt: 'Spiega cosa fanno le tre parti di un for e cosa succede se sbagli la condizione.',
      keywords: ['inizializz', 'condizione', 'passo', 'increment', 'infinit', 'iterazion'],
      model:
        'L’inizializzazione prepara il contatore una sola volta, la condizione viene valutata prima di ogni giro e decide se continuare, il passo aggiorna il contatore dopo ogni corpo. Se la condizione non diventa mai falsa il ciclo è infinito e blocca il programma.',
      concepts: ['for'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l1q1',
      question: 'Quante volte viene eseguito il corpo?\n\n```js\nfor (let i = 0; i < 3; i++) { console.log(i); }\n```',
      options: [
        ['3', 'Esatto: i vale 0, 1, 2.'],
        ['4', 'Sarebbe con i <= 3.'],
        ['Dipende dal browser', 'Il comportamento è deterministico.'],
      ],
      correct: 0,
      explanation: 'Conta i valori che soddisfano la condizione: 0, 1, 2.',
      concepts: ['for'],
    }),
    quiz({
      id: 'w2l1q2',
      question: 'Perché l’accumulatore va dichiarato prima del ciclo?',
      options: [
        ['Perché dentro il ciclo verrebbe reinizializzato a ogni giro', 'Esatto: perderesti il totale accumulato.'],
        ['Perché le variabili dentro il for non esistono', 'Esistono eccome, nel corpo del ciclo.'],
        ['Per motivi di performance', 'Non è una questione di performance ma di correttezza.'],
      ],
      correct: 0,
      explanation: 'Lo scope di blocco del for contiene la variabile contatore, ma un let dichiarato nel corpo si azzera a ogni giro.',
      concepts: ['for', 'scope'],
    }),
    quiz({
      id: 'w2l1q3',
      question: 'Cosa stampa `for (let i = 3; i > 0; i--) console.log(i)`?',
      options: [
        ['1 2 3', 'L’ordine segue il contatore decrescente.'],
        ['3 2 1', 'Esatto: si parte da 3 e si scende.'],
        ['0 1 2 3', 'La condizione i > 0 esclude lo zero.'],
      ],
      correct: 1,
      explanation: 'Il passo i-- fa scendere il contatore fino a quando la condizione resta vera.',
      concepts: ['for'],
    }),
  ],
  recap: {
    points: [
      'for (init; condizione; passo) ripete un blocco.',
      'L’accumulatore si dichiara fuori dal ciclo.',
      'Il contatore vive solo dentro il ciclo.',
      'Una condizione sempre vera blocca tutto.',
    ],
    learned: 'Sai automatizzare una ripetizione e accumulare un risultato.',
    next: 'Non esiste solo il for: while, for...of, break e continue.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w2l2',
  title: 'while, for...of, break e continue',
  subtitle: 'Il ciclo giusto per ogni situazione',
  minutes: 45,
  objectives: [
    'Usare while quando il numero di giri non è noto',
    'Iterare un testo o un array con for...of',
    'Interrompere con break e saltare con continue',
  ],
  concepts: ['while', 'for...of', 'break/continue'],
  activate: [
    'Devi chiedere all’utente una password finché non è corretta: sai in anticipo quanti tentativi serviranno?',
    'No. Quando il numero di ripetizioni dipende da una condizione, while è lo strumento naturale.',
  ],
  analogy:
    'for è un treno con un numero di fermate deciso; while è “continua finché il semaforo è rosso”. for...of è una visita guidata: passi ogni elemento una volta, senza gestire indici. break è il pulsante d’emergenza, continue è saltare una fermata.',
  example: {
    code: `let energia = 3;

while (energia > 0) {
  console.log('Energia: ' + energia);
  energia--;
}

for (const lettera of 'JS') {
  console.log(lettera);
}`,
    output: `Energia: 3
Energia: 2
Energia: 1
J
S`,
  },
  formal:
    'while (condizione) ripete finché la condizione è vera: devi aggiornare qualcosa nel corpo, altrimenti è infinito. do...while esegue almeno una volta. for...of itera i valori di un iterabile (array, stringhe, Map, Set) senza indici. break esce dal ciclo, continue salta al giro successivo. Entrambi funzionano anche nel for classico.',
  worked: {
    code: `const numeri = [4, 7, 2, 9, 5];
let somma = 0;

for (const numero of numeri) {
  if (numero % 2 !== 0) {
    continue;
  }
  somma += numero;
}
console.log('Somma dei pari: ' + somma);

for (const numero of numeri) {
  if (numero > 8) {
    console.log('Trovato grande: ' + numero);
    break;
  }
}`,
    output: `Somma dei pari: 6
Trovato grande: 9`,
    steps: [
      ['for (const numero of numeri)', 'for...of dà direttamente il valore: niente indici, niente i++.'],
      ['if (numero % 2 !== 0) continue;', 'Se è dispari salta il resto del corpo e passa al prossimo elemento.'],
      ['somma += numero;', 'Arriva qui solo per i pari: 4 + 2 = 6.'],
      ['if (numero > 8) break;', 'Al primo valore maggiore di 8 il ciclo si interrompe: 9 è l’ultimo controllo eseguito.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l2e1',
      title: 'While con conto alla rovescia',
      prompt: 'Completa il while perché stampi 2, 1, 0 e poi termini.',
      starterCode: `let n = 2;

while () {
  console.log(n);
  n--;
}`,
      check: { kind: 'output', lines: ['2', '1', '0'] },
      hints: ['La condizione deve essere vera finché n è ≥ 0.', 'Scrivi n >= 0 tra le parentesi.'],
      solution: `let n = 2;
while (n >= 0) {
  console.log(n);
  n--;
}`,
      explanation: 'Il decremento nel corpo è ciò che rende la condizione falsa dopo tre giri.',
      concepts: ['while'],
    }),
    guided({
      id: 'w2l2e2',
      title: 'Lettere di una parola',
      prompt: 'Con for...of, stampa ogni lettera di `JavaScript` su una riga (solo le prime tre: J, a, v).',
      starterCode: `const parola = 'JavaScript';

// itera le lettere e fermati dopo 3`,
      check: { kind: 'output', lines: ['J', 'a', 'v'] },
      hints: ['for (const lettera of parola) dà una lettera alla volta.', 'Conta i giri e usa break al terzo.'],
      solution: `const parola = 'JavaScript';
let count = 0;
for (const lettera of parola) {
  console.log(lettera);
  count++;
  if (count === 3) break;
}`,
      explanation: 'for...of + break: itera i valori e interrompe quando hai ciò che ti serve.',
      concepts: ['for...of', 'break/continue'],
    }),
    solo({
      id: 'w2l2e3',
      title: 'Salta i dispari',
      prompt: 'Stampa solo i numeri pari da 1 a 7 usando un ciclo e continue. Output: 2, 4, 6.',
      starterCode: `// scrivi da zero con continue`,
      check: { kind: 'output', lines: ['2', '4', '6'] },
      hints: ['Continua se il numero è dispari: numero % 2 !== 0.', 'Il console.log va dopo il continue.'],
      solution: `for (let i = 1; i <= 7; i++) {
  if (i % 2 !== 0) continue;
  console.log(i);
}`,
      explanation: 'continue salta il resto del corpo per i dispari, senza uscire dal ciclo.',
      concepts: ['break/continue'],
    }),
    transfer({
      id: 'w2l2e4',
      title: 'Cerca il primo negativo',
      prompt:
        'Scorri `[3, 8, -2, 5]` e, al primo numero negativo, stampa `Trovato: -2` e interrompi. Non stampare nulla per gli altri.',
      starterCode: `const valori = [3, 8, -2, 5];

// cerca il primo negativo`,
      objective: 'Combinare for...of e break per una ricerca con uscita anticipata.',
      check: { kind: 'output', lines: ['Trovato: -2'] },
      hints: ['Dentro il ciclo controlla se il numero è < 0.', 'Stampa e poi break.'],
      solution: `const valori = [3, 8, -2, 5];
for (const valore of valori) {
  if (valore < 0) {
    console.log('Trovato: ' + valore);
    break;
  }
}`,
      explanation: 'La ricerca si ferma al primo match: è il pattern che poi diventa Array.prototype.find.',
      concepts: ['for...of', 'break/continue'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'while senza aggiornamento',
      code: `let n = 0;
while (n < 3) {
  console.log(n);
}`,
      error: `0, 0, 0, ... (ciclo infinito)`,
      why: 'n non cambia mai, quindi n < 3 resta vera per sempre. In un while il corpo deve modificare la condizione.',
      fix: `while (n < 3) {
  console.log(n);
  n++;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l2x1',
      prompt: 'Spiega la differenza tra break e continue con un esempio di quando useresti ciascuno.',
      keywords: ['break', 'continue', 'interromp', 'salt', 'ciclo', 'giro'],
      model:
        'break esce completamente dal ciclo: lo uso quando ho trovato ciò che cercavo, per esempio il primo elemento negativo di un array. continue salta solo il giro corrente e passa al successivo: lo uso per ignorare i casi che non mi interessano, per esempio i numeri dispari, continuando a elaborare gli altri.',
      concepts: ['break/continue'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l2q1',
      question: 'Quando è più adatto while rispetto a for?',
      options: [
        ['Quando il numero di ripetizioni non è noto in anticipo', 'Esatto: dipende da una condizione, non da un conteggio.'],
        ['Quando devi iterare un array', 'Per quello c’è for...of, più leggibile.'],
        ['Mai: for è sempre meglio', 'Sono strumenti diversi con casi d’uso diversi.'],
      ],
      correct: 0,
      explanation: 'while esprime “finché”, for esprime “per n volte”.',
      concepts: ['while'],
    }),
    quiz({
      id: 'w2l2q2',
      question: 'Cosa stampa?\n\n```js\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n```',
      options: [
        ['1 2 3 4 5', 'continue salta il 3.'],
        ['1 2 4 5', 'Esatto: il 3 viene saltato, il ciclo continua.'],
        ['1 2', 'continue non interrompe il ciclo: quello è break.'],
      ],
      correct: 1,
      explanation: 'continue salta solo l’iterazione corrente.',
      concepts: ['break/continue'],
    }),
    quiz({
      id: 'w2l2q3',
      question: 'for...of su una stringa produce…',
      options: [
        ['Gli indici dei caratteri', 'Per gli indici serve for...in o un ciclo classico.'],
        ['I caratteri, uno alla volta', 'Esatto: le stringhe sono iterabili per valore.'],
        ['Un errore: si usa solo con gli array', 'Funziona con ogni iterabile.'],
      ],
      correct: 1,
      explanation: 'for...of legge i valori dell’iterabile, non le chiavi.',
      concepts: ['for...of'],
    }),
  ],
  recap: {
    points: [
      'while quando i giri dipendono da una condizione.',
      'for...of per valori di array e stringhe.',
      'break esce, continue salta al giro successivo.',
      'Ogni while deve aggiornare la propria condizione.',
    ],
    learned: 'Scegli il ciclo adatto e controlli il flusso con precisione.',
    next: 'Raggruppiamo la logica in funzioni riutilizzabili.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w2l3',
  title: 'Funzioni',
  subtitle: 'Parametri, return e valori di default',
  minutes: 50,
  objectives: [
    'Definire e chiamare una funzione',
    'Restituire un valore invece di stampare',
    'Usare parametri con valore di default',
  ],
  concepts: ['funzioni', 'return', 'parametri'],
  activate: [
    'Hai tre punti del programma che calcolano lo sconto. Se la regola cambia, quante modifiche devi fare?',
    'Con una funzione, una sola. Le funzioni sono il modo per dare un nome a un’idea e riusarla.',
  ],
  analogy:
    'Una funzione è una ricetta con un nome: elenco di ingredienti (parametri), procedimento (corpo) e piatto pronto (return). La ricetta si scrive una volta e si cucina quante volte vuoi, con ingredienti diversi.',
  example: {
    code: `function somma(a, b) {
  return a + b;
}

const risultato = somma(2, 3);
console.log(risultato);`,
    output: `5`,
  },
  formal:
    'Una funzione si dichiara con function nome(parametri) { ... }. Il return termina la funzione e restituisce un valore; senza return il risultato è undefined. I parametri possono avere valori di default (function f(a, b = 10)). Una funzione può stampare o restituire: preferisci restituire, così è testabile e riusabile. Il nome dovrebbe descrivere l’azione.',
  worked: {
    code: `function calcolaTotale(prezzo, quantita = 1) {
  if (prezzo <= 0) {
    return 0;
  }
  return prezzo * quantita;
}

console.log(calcolaTotale(10, 3));
console.log(calcolaTotale(10));
console.log(calcolaTotale(-5, 2));`,
    output: `30
10
0`,
    steps: [
      ['function calcolaTotale(prezzo, quantita = 1)', 'quantita ha un default: se non la passi vale 1.'],
      ['if (prezzo <= 0) { return 0; }', 'Un return anticipato gestisce il caso limite ed evita di annidare il resto.'],
      ['return prezzo * quantita;', 'Il valore torna a chi ha chiamato la funzione.'],
      ['console.log(calcolaTotale(10));', 'Con un solo argomento il default entra in gioco: 10 * 1 = 10.'],
      ['console.log(calcolaTotale(-5, 2));', 'Il caso limite restituisce 0 prima di moltiplicare.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l3e1',
      title: 'Manca il return',
      prompt: 'La funzione deve restituire il doppio del numero. Completa il corpo e stampa `14`.',
      starterCode: `function doppio(n) {
  // completa
}

console.log(doppio(7));`,
      check: { kind: 'output', lines: ['14'] },
      hints: ['Senza return la funzione restituisce undefined.', 'Scrivi return n * 2;'],
      solution: `function doppio(n) {
  return n * 2;
}

console.log(doppio(7));`,
      explanation: 'return consegna il valore al chiamante: console.log lo riceve e lo stampa.',
      concepts: ['funzioni', 'return'],
    }),
    guided({
      id: 'w2l3e2',
      title: 'Saluto con default',
      prompt:
        'Completa `saluta(nome, saluto = \'Ciao\')` perché restituisca `Ciao, Ada!` se chiami `saluta(\'Ada\')` e `Buongiorno, Ada!` con il secondo argomento.',
      starterCode: `function saluta(nome, saluto = 'Ciao') {
  // costruisci e restituisci la frase
}

console.log(saluta('Ada'));
console.log(saluta('Ada', 'Buongiorno'));`,
      check: { kind: 'output', lines: ['Ciao, Ada!', 'Buongiorno, Ada!'] },
      hints: ['Usa un template literal: `${saluto}, ${nome}!`.', 'Ricordati il return.'],
      solution: `function saluta(nome, saluto = 'Ciao') {
  return \`\${saluto}, \${nome}!\`;
}

console.log(saluta('Ada'));
console.log(saluta('Ada', 'Buongiorno'));`,
      explanation: 'Il default copre il caso più comune; il secondo argomento lo sovrascrive.',
      concepts: ['parametri', 'return'],
    }),
    solo({
      id: 'w2l3e3',
      title: 'Prezzo con IVA',
      prompt:
        'Scrivi `prezzoConIva(prezzo, aliquota = 0.22)` che restituisce il prezzo ivato. Stampa `122` per 100 e `110` per 100 al 10%.',
      starterCode: `// scrivi la funzione`,
      check: { kind: 'output', lines: ['122', '110'] },
      hints: ['La formula è prezzo * (1 + aliquota).', 'Restituisci il numero, non una stringa formattata.'],
      solution: `function prezzoConIva(prezzo, aliquota = 0.22) {
  return prezzo * (1 + aliquota);
}

console.log(prezzoConIva(100));
console.log(prezzoConIva(100, 0.1));`,
      explanation: 'Un default sensato più un parametro flessibile: la funzione serve a molti casi senza duplicazioni.',
      concepts: ['funzioni', 'parametri'],
    }),
    transfer({
      id: 'w2l3e4',
      title: 'Validare invece di stampare',
      prompt:
        'Scrivi `classificaEta(eta)` che restituisce `\'minorenne\'`, `\'adulto\'` o `\'senior\'` (≥ 65). Stampa: minorenne, adulto, senior per 10, 30, 70.',
      starterCode: `// scrivi la funzione e le tre chiamate`,
      objective: 'Una funzione che restituisce dati, pronta per essere usata nell’interfaccia.',
      check: { kind: 'output', lines: ['minorenne', 'adulto', 'senior'] },
      hints: ['Usa if / else if / else con return anticipati.', 'Stampa il risultato di tre chiamate separate.'],
      solution: `function classificaEta(eta) {
  if (eta < 18) return 'minorenne';
  if (eta < 65) return 'adulto';
  return 'senior';
}

console.log(classificaEta(10));
console.log(classificaEta(30));
console.log(classificaEta(70));`,
      explanation: 'Return anticipati evitano else annidati e rendono i casi leggibili uno per riga.',
      concepts: ['funzioni', 'return'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Funzione che stampa invece di restituire',
      code: `function doppio(n) {
  console.log(n * 2);
}

const valore = doppio(5);
console.log(valore + 1);`,
      error: `10
NaN`,
      why: 'La funzione stampa ma non restituisce: valore è undefined, e undefined + 1 è NaN.',
      fix: `function doppio(n) {
  return n * 2;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l3x1',
      prompt: 'Spiega la differenza tra restituire un valore e stamparlo, e perché preferiamo restituire.',
      keywords: ['return', 'restitu', 'stamp', 'undefined', 'riutil', 'test'],
      model:
        'Stampa significa mostrare qualcosa nella console, ma il valore non torna al codice chiamante. Restituire con return consegna il valore, che posso salvare, passare a un’altra funzione o testare. Restituire rende la funzione riutilizzabile; stampare la lega alla console.',
      concepts: ['return'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l3q1',
      question: 'Cosa restituisce una funzione senza return?',
      options: [
        ['null', 'null è un valore esplicito: l’assenza di return produce undefined.'],
        ['undefined', 'Esatto: è il valore implicito di ritorno.'],
        ['0', 'Nessun default numerico: undefined.'],
      ],
      correct: 1,
      explanation: 'Senza return la funzione restituisce undefined.',
      concepts: ['return'],
    }),
    quiz({
      id: 'w2l3q2',
      question: 'Cosa stampa `saluta(\'Ada\')` con `function saluta(nome, saluto = \'Ciao\')`?',
      options: [
        ['Ciao', 'Il default è usato ma la frase deve includere il nome.'],
        ['Ciao, Ada (se il corpo lo prevede)', 'Corretto: il default riempie il parametro mancante.'],
        ['Errore: manca un argomento', 'I parametri con default sono opzionali.'],
      ],
      correct: 1,
      explanation: 'Il default scatta solo quando l’argomento è undefined.',
      concepts: ['parametri'],
    }),
    quiz({
      id: 'w2l3q3',
      question: 'Perché è meglio restituire invece di stampare dentro la funzione?',
      options: [
        ['Perché console.log è deprecato', 'Non è deprecato, ma è un effetto collaterale.'],
        ['Perché il valore resta disponibile per altro codice e per i test', 'Esatto.'],
        ['Perché le funzioni non possono stampare', 'Possono, ma è meno flessibile.'],
      ],
      correct: 1,
      explanation: 'Restituire separa il calcolo dall’output: principio base del codice testabile.',
      concepts: ['return'],
    }),
  ],
  recap: {
    points: [
      'Una funzione ha nome, parametri e corpo.',
      'return consegna un valore e termina la funzione.',
      'I default coprono i casi comuni.',
      'Restituisci: stampa solo quando serve mostrare.',
    ],
    learned: 'Sai dare un nome a un calcolo e riusarlo.',
    next: 'Le arrow function: la forma compatta che userai ovunque.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w2l4',
  title: 'Arrow function',
  subtitle: 'Tre forme, return implicito e callback',
  minutes: 45,
  objectives: [
    'Riconoscere le tre forme di funzione',
    'Usare il return implicito',
    'Passare una funzione come argomento (callback)',
  ],
  concepts: ['arrow function', 'return implicito', 'callback'],
  activate: [
    'Quando una funzione fa una sola cosa, quanto serve scrivere function, graffe e return?',
    'JavaScript offre una forma compatta: la arrow function, con return implicito.',
  ],
  analogy:
    'La arrow function è la scorciatoia per una strada che conosci: stesso percorso, meno segnaletica. Se il corpo è una sola espressione, il risultato è già il return. Una callback è un numero di telefono che passi a qualcun altro: “quando è il momento, chiama questa funzione”.',
  example: {
    code: `const doppio = (n) => n * 2;
const saluta = (nome) => {
  const messaggio = 'Ciao, ' + nome;
  return messaggio;
};
const nessunArgomento = () => console.log('Eseguita');

console.log(doppio(4));
console.log(saluta('Ada'));
nessunArgomento();`,
    output: `8
Ciao, Ada
Eseguita`,
  },
  formal:
    'Forme: (a, b) => a + b (return implicito), (a) => { return a * 2; } (blocco con return esplicito), () => valore (nessun parametro). Con un solo parametro le parentesi sono facoltative: a => a * 2. Le arrow non hanno un proprio this: lo ereditano dallo scope esterno, ed è il motivo per cui sono preferite nelle callback. Una callback è una funzione passata come argomento a un’altra funzione.',
  worked: {
    code: `function esegui(callback) {
  const risultato = callback();
  return 'Risultato: ' + risultato;
}

const saluto = () => 'ciao';
const addio = () => 'addio';

console.log(esegui(saluto));
console.log(esegui(addio));

const conParametro = (n) => n * n;
console.log(conParametro(5));`,
    output: `Risultato: ciao
Risultato: addio
25`,
    steps: [
      ['function esegui(callback)', 'Riceve una funzione come parametro: per il codice è un valore come un numero.'],
      ['callback()', 'La chiama. Il nome della funzione passata non conta: conta che sia richiamabile.'],
      ['const saluto = () => \'ciao\';', 'Arrow con return implicito: nessuna graffa, nessun return.'],
      ['esegui(saluto)', 'Passare la funzione senza parentesi: la stai consegnando, non eseguendo.'],
      ['const conParametro = (n) => n * n;', 'Con un’espressione, il valore è restituito automaticamente.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l4e1',
      title: 'Return implicito',
      prompt: 'Completa l’arrow function perché restituisca il triplo di n. Stampa `12`.',
      starterCode: `const triplo = (n) => ;

console.log(triplo(4));`,
      check: { kind: 'output', lines: ['12'] },
      hints: ['Con return implicito scrivi direttamente l’espressione.', 'n * 3'],
      solution: `const triplo = (n) => n * 3;

console.log(triplo(4));`,
      explanation: 'Senza graffe l’espressione è il valore restituito.',
      concepts: ['arrow function', 'return implicito'],
    }),
    guided({
      id: 'w2l4e2',
      title: 'Blocco con return',
      prompt:
        'Riscrivi `somma` come arrow function con corpo a blocco che calcola e restituisce la somma. Output: `9`.',
      starterCode: `const somma = (a, b) => {
  // completa con return
};

console.log(somma(4, 5));`,
      check: { kind: 'output', lines: ['9'] },
      hints: ['Con le graffe il return è obbligatorio.', 'const somma = (a, b) => { return a + b; };'],
      solution: `const somma = (a, b) => {
  return a + b;
};

console.log(somma(4, 5));`,
      explanation: 'Le graffe introducono un corpo di più istruzioni: senza return il risultato sarebbe undefined.',
      concepts: ['arrow function'],
    }),
    solo({
      id: 'w2l4e3',
      title: 'Callback',
      prompt:
        'Scrivi `esegui(callback)` che chiama la callback e restituisce il suo risultato. Poi chiamala con una arrow che restituisce `42`.',
      starterCode: `// scrivi esegui e la chiamata`,
      check: { kind: 'output', lines: ['42'] },
      hints: ['Dentro esegui: return callback();', 'Passa () => 42 come argomento.'],
      solution: `function esegui(callback) {
  return callback();
}

console.log(esegui(() => 42));`,
      explanation: 'La callback è una funzione passata come valore: la sua esecuzione è decisa da chi la riceve.',
      concepts: ['callback'],
    }),
    transfer({
      id: 'w2l4e4',
      title: 'Applica due volte',
      prompt:
        'Scrivi `applicaDueVolte(valore, trasforma)` che restituisce `trasforma(trasforma(valore))`. Con valore 3 e trasforma `(n) => n * 2`, stampa `12`.',
      starterCode: `// scrivi la funzione di ordine superiore`,
      objective: 'Comporre funzioni: la base di map, filter e delle pipeline dati.',
      check: { kind: 'output', lines: ['12'] },
      hints: ['Chiama due volte la callback annidando il risultato.', 'return trasforma(trasforma(valore));'],
      solution: `function applicaDueVolte(valore, trasforma) {
  return trasforma(trasforma(valore));
}

console.log(applicaDueVolte(3, (n) => n * 2));`,
      explanation: 'Una funzione che riceve funzioni si chiama di ordine superiore: è il motore dello stile funzionale.',
      concepts: ['callback', 'arrow function'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Graffe e return implicito',
      code: `const doppio = (n) => { n * 2 };

console.log(doppio(5));`,
      error: `undefined`,
      why: 'Con le graffe il corpo è un blocco: senza return non restituisce nulla.',
      fix: `const doppio = (n) => n * 2;`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l4x1',
      prompt: 'Spiega la differenza tra `(n) => n * 2` e `(n) => { n * 2 }`.',
      keywords: ['return', 'implicit', 'graffe', 'blocco', 'undefined', 'espression'],
      model:
        'La prima ha un’espressione come corpo e restituisce automaticamente il valore: return implicito. La seconda ha un blocco tra graffe, quindi serve un return esplicito; senza, restituisce undefined. È una differenza silenziosa e frequente quando si passa da una forma all’altra.',
      concepts: ['arrow function', 'return implicito'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l4q1',
      question: 'Cosa restituisce `const f = (n) => { n + 1 };`?',
      options: [
        ['n + 1', 'Le graffe creano un blocco che richiede return.'],
        ['undefined', 'Esatto: manca il return esplicito.'],
        ['Un errore', 'È sintatticamente valida.'],
      ],
      correct: 1,
      explanation: 'Return implicito solo con l’espressione nuda.',
      concepts: ['return implicito'],
    }),
    quiz({
      id: 'w2l4q2',
      question: 'Come si passa una callback a `esegui`?',
      options: [
        ['esegui(miaFunzione())', 'Così la esegui subito e passi il risultato.'],
        ['esegui(miaFunzione)', 'Esatto: passi la funzione come valore.'],
        ['esegui(\'miaFunzione\')', 'Così passi una stringa, non una funzione.'],
      ],
      correct: 1,
      explanation: 'Senza parentesi la funzione non viene chiamata: viene consegnata.',
      concepts: ['callback'],
    }),
    quiz({
      id: 'w2l4q3',
      question: 'Perché le arrow function sono comode come callback?',
      options: [
        ['Perché sono più veloci', 'Non c’è un guadagno di performance rilevante.'],
        ['Perché ereditano this dallo scope esterno e sono concise', 'Esatto, ed è la differenza chiave con function.'],
        ['Perché non possono avere parametri', 'Possono averli, eccome.'],
      ],
      correct: 1,
      explanation: 'this lessicale e sintassi breve: due motivi per preferirle nelle callback.',
      concepts: ['arrow function', 'callback'],
    }),
  ],
  recap: {
    points: [
      'Tre forme: espressione, blocco, nessun parametro.',
      'Senza graffe il return è implicito.',
      'La callback si passa senza parentesi.',
      'Le arrow ereditano this dall’esterno.',
    ],
    learned: 'Scrivi funzioni compatte e le passi come valori.',
    next: 'Dove vive una variabile? Scope globale, di funzione e di blocco.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w2l5',
  title: 'Scope',
  subtitle: 'Globale, di funzione, di blocco: chi vede cosa',
  minutes: 45,
  objectives: [
    'Distinguere scope globale, di funzione e di blocco',
    'Capire perché let e const non escono dal blocco',
    'Riconoscere una variabile ombra (shadowing)',
  ],
  concepts: ['scope', 'block scope', 'shadowing'],
  activate: [
    'Se dichiari `let x` dentro un if, esiste anche fuori? E se usi var?',
    'Con let e const no: vivono nel blocco. Con var sì, ed è una delle ragioni per cui var è sconsigliato.',
  ],
  analogy:
    'Lo scope è il piano di un edificio: al piano terra (globale) tutti possono salire, ma chi sta al piano terra non entra nelle stanze chiuse (blocchi). Una variabile creata in una stanza non esiste nel corridoio.',
  example: {
    code: `const globale = 'visibile ovunque';

function demo() {
  const locale = 'solo qui';
  console.log(globale);
  console.log(locale);
}

demo();
console.log(typeof locale);`,
    output: `visibile ovunque
solo qui
undefined`,
  },
  formal:
    'Lo scope globale contiene ciò che dichiari fuori da funzioni e blocchi. Ogni funzione crea uno scope di funzione; ogni blocco ({}) creato da if, for, while crea uno scope di blocco per let e const. Le dichiarazioni var ignorano il blocco e appartengono alla funzione. JavaScript cerca la variabile nello scope corrente e poi risale la catena fino al globale. Una variabile interna con lo stesso nome esterna la “oscura” (shadowing).',
  worked: {
    code: `let messaggio = 'esterno';

function cambia() {
  let messaggio = 'interno';
  console.log('Dentro:', messaggio);
}

cambia();
console.log('Fuori:', messaggio);

if (true) {
  const dentroBlocco = 'blocco';
  console.log(dentroBlocco);
}

console.log(typeof dentroBlocco);`,
    output: `Dentro: interno
Fuori: esterno
blocco
undefined`,
    steps: [
      ['let messaggio = \'esterno\';', 'Variabile nello scope globale del modulo.'],
      ['let messaggio = \'interno\';', 'Dichiarazione locale: ombra quella esterna, non la modifica.'],
      ['console.log(\'Dentro:\', messaggio);', 'Vede la più vicina: quella interna.'],
      ['cambia(); console.log(\'Fuori:\', messaggio);', 'Fuori la variabile interna non esiste: resta “esterno”.'],
      ['console.log(typeof dentroBlocco);', 'typeof su un nome inesistente restituisce "undefined" invece di lanciare.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l5e1',
      title: 'Dentro e fuori',
      prompt:
        'Completa la funzione perché stampi `interno` e poi, fuori, `esterno`. Non modificare la variabile globale.',
      starterCode: `let stato = 'esterno';

function mostra() {
  // dichiara una variabile locale che oscura quella globale
  let stato = 'interno';
  console.log(stato);
}

mostra();
console.log(stato);`,
      check: { kind: 'output', lines: ['interno', 'esterno'] },
      hints: ['La variabile locale va dichiarata dentro la funzione.', 'Lo shadowing lascia intatta quella globale.'],
      solution: `let stato = 'esterno';

function mostra() {
  let stato = 'interno';
  console.log(stato);
}

mostra();
console.log(stato);`,
      explanation: 'Due variabili distinte con lo stesso nome in scope diversi: ognuna vede la propria.',
      concepts: ['scope', 'shadowing'],
    }),
    guided({
      id: 'w2l5e2',
      title: 'Il blocco protegge',
      prompt: 'Stampa `3` dentro il blocco e `undefined` fuori, usando typeof. Non deve esserci errore.',
      starterCode: `if (true) {
  // dichiara qui una costante con valore 3 e stampala
}

// stampa typeof della stessa variabile fuori dal blocco`,
      check: { kind: 'output', lines: ['3', 'undefined'] },
      hints: ['Dentro: const numero = 3; console.log(numero);', 'Fuori: console.log(typeof numero);'],
      solution: `if (true) {
  const numero = 3;
  console.log(numero);
}

console.log(typeof numero);`,
      explanation: 'let e const rispettano il blocco: fuori il nome non esiste, e typeof lo segnala senza crash.',
      concepts: ['block scope'],
    }),
    solo({
      id: 'w2l5e3',
      title: 'Contatore protetto',
      prompt:
        'Dichiara `let tentativi = 0` nello scope globale, incrementalo dentro una funzione `prova()` che lo stampa, e chiamala due volte. Output: 1, 2.',
      starterCode: `// scrivi da zero`,
      check: { kind: 'output', lines: ['1', '2'] },
      hints: ['Se dichiari tentativi dentro la funzione, riparte da 0 ogni volta.', 'La funzione deve modificare la variabile esterna.'],
      solution: `let tentativi = 0;

function prova() {
  tentativi++;
  console.log(tentativi);
}

prova();
prova();`,
      explanation: 'Le funzioni possono leggere e modificare variabili dello scope esterno: qui è voluto.',
      concepts: ['scope'],
    }),
    transfer({
      id: 'w2l5e4',
      title: 'Bug di scope',
      prompt:
        'Il codice dovrebbe stampare `10`, ma lancia un ReferenceError. Correggi dichiarando la variabile nello scope giusto.',
      starterCode: `function calcola() {
  if (true) {
    let risultato = 10;
  }
  return risultato;
}

console.log(calcola());`,
      objective: 'Riconoscere un classico errore di scope introdotto dal block scope.',
      check: { kind: 'output', lines: ['10'] },
      hints: [
        'risultato esiste solo dentro il blocco if.',
        'Dichiara risultato prima dell’if, oppure restituiscilo dentro il blocco.',
      ],
      solution: `function calcola() {
  let risultato = 0;
  if (true) {
    risultato = 10;
  }
  return risultato;
}

console.log(calcola());`,
      explanation: 'Il block scope impedisce l’accesso fuori: la dichiarazione va spostata nello scope che la usa.',
      concepts: ['scope', 'block scope'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'var esce dal blocco',
      code: `if (true) {
  var x = 1;
}
console.log(x);`,
      error: `1 (nessun errore: var ignora il blocco)`,
      why: 'var non rispetta il blocco e finisce nello scope della funzione o globale: è la fonte di bug che let e const evitano.',
      fix: `if (true) {
  const x = 1;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l5x1',
      prompt: 'Spiega cosa significa scope di blocco e perché let/const lo rispettano.',
      keywords: ['scope', 'blocco', 'let', 'const', 'graffe', 'var'],
      model:
        'Lo scope di blocco è l’area delimitata da graffe, come il corpo di un if o di un for. let e const dichiarate lì dentro esistono solo in quel blocco: fuori il nome non è definito. var invece ignora il blocco e appartiene alla funzione, per questo può essere letta dopo l’if e generare bug.',
      concepts: ['scope', 'block scope'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l5q1',
      question: 'Cosa stampa?\n\n```js\nlet a = 1;\n{ let a = 2; }\nconsole.log(a);\n```',
      options: [
        ['1', 'Esatto: il blocco ha creato una variabile distinta.'],
        ['2', 'La modifica resta nel blocco.'],
        ['Errore', 'Nessun errore: è shadowing valido.'],
      ],
      correct: 0,
      explanation: 'Lo shadowing non modifica la variabile esterna.',
      concepts: ['shadowing'],
    }),
    quiz({
      id: 'w2l5q2',
      question: 'Quale dichiarazione sfugge al block scope?',
      options: [
        ['let', 'let rispetta il blocco.'],
        ['const', 'const rispetta il blocco.'],
        ['var', 'Esatto: è function-scoped.'],
      ],
      correct: 2,
      explanation: 'var non è block-scoped: uno dei motivi per cui è sconsigliato.',
      concepts: ['block scope'],
    }),
    quiz({
      id: 'w2l5q3',
      question: 'Cosa vede una funzione quando usa un nome non dichiarato al suo interno?',
      options: [
        ['Niente: errore immediato sempre', 'Prima risale la catena degli scope.'],
        ['Risale agli scope esterni fino al globale', 'Esatto: è la scope chain.'],
        ['Solo le variabili var', 'Vede tutte le dichiarazioni visibili negli scope superiori.'],
      ],
      correct: 1,
      explanation: 'La ricerca risale la catena: prima lo scope locale, poi quelli esterni.',
      concepts: ['scope'],
    }),
  ],
  recap: {
    points: [
      'Globale, di funzione, di blocco.',
      'let/const vivono nel blocco; var nella funzione.',
      'Lo shadowing crea una variabile distinta, non modifica quella esterna.',
      'typeof su un nome inesistente è "undefined".',
    ],
    learned: 'Sai dove vive ogni variabile e perché un nome “non esiste”.',
    next: 'Le closure: quando una funzione si ricorda il suo passato.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w2l6',
  title: 'Closures',
  subtitle: 'Dati privati e factory: la funzione che ricorda',
  minutes: 55,
  objectives: [
    'Capire che una funzione ricorda lo scope in cui è nata',
    'Usare una closure per incapsulare stato',
    'Scrivere una factory di contatori',
  ],
  concepts: ['closure', 'stato privato', 'factory'],
  activate: [
    'Come faresti a creare un contatore che nessuno possa azzerare dall’esterno?',
    'Con una closure: lo stato vive in una variabile locale, accessibile solo alle funzioni restituite.',
  ],
  analogy:
    'Una closure è uno zaino che una funzione porta con sé: quando è stata creata ha messo dentro alcune variabili, e le ritrova ogni volta che viene chiamata, anche se la funzione che le conteneva è già terminata.',
  example: {
    code: `function creaContatore() {
  let count = 0;

  return function incrementa() {
    count++;
    return count;
  };
}

const contatore = creaContatore();
console.log(contatore());
console.log(contatore());
console.log(contatore());`,
    output: `1
2
3`,
  },
  formal:
    'Una closure è una funzione che mantiene l’accesso alle variabili dello scope in cui è stata definita, anche dopo che quello scope è terminato. È il meccanismo dietro a contatori, memoizzazione, moduli con dati privati e callback che “ricordano” un valore. Ogni chiamata alla factory crea uno stato indipendente.',
  worked: {
    code: `function creaConto(saldoIniziale) {
  let saldo = saldoIniziale;

  return {
    deposita: (importo) => {
      saldo += importo;
      return saldo;
    },
    preleva: (importo) => {
      if (importo > saldo) {
        return 'Fondi insufficienti';
      }
      saldo -= importo;
      return saldo;
    },
    saldoAttuale: () => saldo,
  };
}

const conto = creaConto(100);
console.log(conto.deposita(50));
console.log(conto.preleva(30));
console.log(conto.preleva(500));
console.log(conto.saldoAttuale());`,
    output: `150
120
Fondi insufficienti
120`,
    steps: [
      ['let saldo = saldoIniziale;', 'Variabile locale: non è raggiungibile dall’esterno, non è modificabile a mano.'],
      [
        'deposita: (importo) => { saldo += importo; return saldo; }',
        'La arrow conserva l’accesso a saldo: questa è la closure.',
      ],
      [
        'preleva: (importo) => { ... }',
        'Anche la validazione vive dentro la closure: le regole non possono essere aggirate.',
      ],
      [
        'saldoAttuale: () => saldo',
        'Un accesso in sola lettura: restituisce il valore senza esporre la variabile.',
      ],
      ['console.log(conto.preleva(500));', 'La richiesta supera il saldo: la closure rifiuta senza modificare nulla.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l6e1',
      title: 'Contatore minimo',
      prompt: 'Completa la closure: ogni chiamata deve incrementare e restituire il conteggio. Output: 1, 2.',
      starterCode: `function crea() {
  let n = 0;
  return () => {
    ;
    return n;
  };
}

const conta = crea();
console.log(conta());
console.log(conta());`,
      check: { kind: 'output', lines: ['1', '2'] },
      hints: ['Devi incrementare n prima del return.', 'Scrivi n++ oppure n += 1.'],
      solution: `function crea() {
  let n = 0;
  return () => {
    n++;
    return n;
  };
}

const conta = crea();
console.log(conta());
console.log(conta());`,
      explanation: 'n sopravvive tra le chiamate perché la arrow lo trattiene nella closure.',
      concepts: ['closure'],
    }),
    guided({
      id: 'w2l6e2',
      title: 'Due contatori indipendenti',
      prompt:
        'Usa `crea()` due volte e stampa 1, 2 per il primo e 1 per il secondo. Ogni contatore ha il suo stato.',
      starterCode: `function crea() {
  let n = 0;
  return () => {
    n++;
    return n;
  };
}

const a = crea();
const b = crea();

// stampa a, a, b`,
      check: { kind: 'output', lines: ['1', '2', '1'] },
      hints: ['Ogni chiamata a crea() produce un nuovo n.', 'Chiama a() due volte e b() una.'],
      solution: `function crea() {
  let n = 0;
  return () => {
    n++;
    return n;
  };
}

const a = crea();
const b = crea();

console.log(a());
console.log(a());
console.log(b());`,
      explanation: 'La factory garantisce stati separati: nessuna variabile globale condivisa.',
      concepts: ['closure', 'factory'],
    }),
    solo({
      id: 'w2l6e3',
      title: 'Saluto personalizzato',
      prompt:
        'Scrivi `creaSaluto(saluto)` che restituisce una funzione: `creaSaluto(\'Ciao\')(\'Ada\')` deve stampare `Ciao, Ada!`.',
      starterCode: `// scrivi la factory`,
      check: { kind: 'output', lines: ['Ciao, Ada!'] },
      hints: [
        'La factory restituisce una funzione che riceve il nome.',
        'Dentro la funzione interna puoi usare il parametro saluto.',
      ],
      solution: `function creaSaluto(saluto) {
  return (nome) => \`\${saluto}, \${nome}!\`;
}

console.log(creaSaluto('Ciao')('Ada'));`,
      explanation: 'La funzione interna ricorda il saluto con cui è stata creata: closure come configurazione.',
      concepts: ['closure', 'factory'],
    }),
    transfer({
      id: 'w2l6e4',
      title: 'Contatore con limite',
      prompt:
        'Crea `creaContatore(2)` che restituisce una funzione: conta fino a 2 e poi resta a 2, stampando 1, 2, 2.',
      starterCode: `// factory con limite`,
      objective: 'Closure con regola di business: lo stato interno non è modificabile dall’esterno.',
      check: { kind: 'output', lines: ['1', '2', '2'] },
      hints: ['Confronta n con il limite prima di incrementare.', 'Se n < limite incrementa, poi restituisci n.'],
      solution: `function creaContatore(limite) {
  let n = 0;
  return () => {
    if (n < limite) {
      n++;
    }
    return n;
  };
}

const conta = creaContatore(2);
console.log(conta());
console.log(conta());
console.log(conta());`,
      explanation: 'Il limite è catturato dalla closure: la regola resta coerente per tutta la vita del contatore.',
      concepts: ['closure'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Stato globale condiviso',
      code: `let n = 0;
function conta() {
  n++;
  return n;
}
conta();
conta();
console.log(n);`,
      error: `2`,
      why: 'Funziona, ma n è globale: qualsiasi altro codice può leggerlo e modificarlo. Con due contatori servirebbero due variabili globali.',
      fix: `function creaContatore() {
  let n = 0;
  return () => ++n;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l6x1',
      prompt: 'Spiega con parole tue cos’è una closure e perché permette di avere dati privati.',
      keywords: ['closure', 'scope', 'ricord', 'privat', 'estern', 'funzione'],
      model:
        'Una closure è una funzione che mantiene l’accesso alle variabili dello scope in cui è stata creata, anche dopo che quello scope è finito. Se la variabile è locale alla factory, nessun codice esterno può leggerla o modificarla: solo le funzioni restituite possono farlo. Questo crea dati privati e stato incapsulato.',
      concepts: ['closure', 'stato privato'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l6q1',
      question: 'Cosa stampa?\n\n```js\nfunction f() {\n  let x = 0;\n  return () => ++x;\n}\nconst g = f();\nconsole.log(g(), g());\n```',
      options: [
        ['1 1', 'x viene trattenuto e condiviso tra le chiamate: non riparte.'],
        ['1 2', 'Esatto: ++x incrementa lo stesso x.'],
        ['0 0', 'x parte da 0 ma viene incrementato prima del return.'],
      ],
      correct: 1,
      explanation: 'La closure conserva x tra le chiamate.',
      concepts: ['closure'],
    }),
    quiz({
      id: 'w2l6q2',
      question: 'Che vantaggio dà una closure rispetto a una variabile globale?',
      options: [
        ['È più veloce', 'La differenza non è di performance.'],
        ['Lo stato è privato e non può essere modificato dall’esterno', 'Esatto: incapsulamento.'],
        ['Funziona solo con le classi', 'Le closure non richiedono classi.'],
      ],
      correct: 1,
      explanation: 'La closure limita l’accesso allo stato alle sole funzioni che lo possiedono.',
      concepts: ['stato privato'],
    }),
    quiz({
      id: 'w2l6q3',
      question: 'Due chiamate a `creaContatore()` producono…',
      options: [
        ['Lo stesso stato condiviso', 'Ogni chiamata crea un nuovo ambiente.'],
        ['Due stati indipendenti', 'Esatto: ogni closure ha la propria copia.'],
        ['Un errore', 'È il comportamento normale delle factory.'],
      ],
      correct: 1,
      explanation: 'Ogni invocazione della factory crea un nuovo scope con la propria variabile.',
      concepts: ['factory'],
    }),
  ],
  recap: {
    points: [
      'Una closure ricorda lo scope in cui è nata.',
      'Le factory creano stati indipendenti.',
      'Lo stato privato vive solo nelle funzioni restituite.',
      'Closure = contatori, configurazioni, moduli.',
    ],
    learned: 'Sai incapsulare stato senza classi e senza variabili globali.',
    next: 'Ripasso e progetto: il Quaderno delle spese calcola i totali con cicli e funzioni.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w2l7',
  title: 'Ripasso e progetto',
  subtitle: 'Cicli, funzioni e closure nel Quaderno delle spese',
  minutes: 60,
  objectives: [
    'Recuperare i concetti della settimana senza rileggere',
    'Calcolare totali e medie con cicli e funzioni',
    'Aggiungere una regola di budget riutilizzabile',
  ],
  concepts: ['ripasso', 'progetto', 'funzioni con cicli'],
  activate: [
    'Senza guardare: qual è la differenza tra return e console.log? E tra break e continue?',
    'Se le risposte arrivano lentamente è normale: lo sforzo di recupero è l’allenamento.',
  ],
  analogy:
    'Il progetto è il banco di prova: qui i concetti smettono di essere capitoli e diventano attrezzi. Se qualcosa non torna, non è un fallimento: è l’indizio di cosa ripassare.',
  example: {
    code: `function totale(spese) {
  let somma = 0;
  for (const spesa of spese) {
    somma += spesa;
  }
  return somma;
}

function conSconto(totale, soglia = 50, sconto = 0.1) {
  return totale >= soglia ? totale * (1 - sconto) : totale;
}

const spese = [12.4, 7.6, 30];
const t = totale(spese);

console.log('Totale: ' + t.toFixed(2));
console.log('Da pagare: ' + conSconto(t).toFixed(2));`,
    output: `Totale: 50.00
Da pagare: 45.00`,
  },
  formal:
    'Comporre funzioni piccole è la strategia che scala: una calcola, una applica una regola, una formatta. Le funzioni con parametri di default coprono i casi comuni, e restituire numeri (non stringhe) permette di concatenare i passaggi. Questo è il primo passo verso il codice che nelle prossime settimane diventerà un’app.',
  worked: {
    code: `function totale(spese) {
  let somma = 0;
  for (const spesa of spese) {
    somma += spesa;
  }
  return somma;
}

function media(spese) {
  if (spese.length === 0) return 0;
  return totale(spese) / spese.length;
}

function report(spese) {
  const t = totale(spese);
  return [
    \`Spese: \${spese.length}\`,
    \`Totale: \${t.toFixed(2)} €\`,
    \`Media: \${media(spese).toFixed(2)} €\`,
  ];
}

for (const riga of report([10, 20, 30])) {
  console.log(riga);
}`,
    output: `Spese: 3
Totale: 60.00 €
Media: 20.00 €`,
    steps: [
      ['function totale(spese)', 'Una funzione, un compito: sommare. Riusabile ovunque.'],
      ['if (spese.length === 0) return 0;', 'Guard clause: evita la divisione per zero senza annidare.'],
      ['return totale(spese) / spese.length;', 'Riusa totale invece di riscrivere il ciclo: composizione.'],
      ['return [ ... ]', 'report restituisce dati (righe), non li stampa: il chiamante decide come mostrarli.'],
      ['for (const riga of report(...))', 'Il chiamante stampa: separazione tra calcolo e presentazione.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l7e1',
      title: 'Somma con ciclo',
      prompt: 'Completa `totale` perché restituisca la somma delle spese. Output: `42`.',
      starterCode: `function totale(spese) {
  let somma = 0;
  for (const spesa of spese) {
    // accumula
  }
  return somma;
}

console.log(totale([10, 20, 12]));`,
      check: { kind: 'output', lines: ['42'] },
      hints: ['Dentro il ciclo: somma += spesa.', 'Il return resta fuori dal ciclo.'],
      solution: `function totale(spese) {
  let somma = 0;
  for (const spesa of spese) {
    somma += spesa;
  }
  return somma;
}

console.log(totale([10, 20, 12]));`,
      explanation: 'Il ciclo accumula, il return chiude: schema base di ogni aggregazione.',
      concepts: ['for', 'funzioni'],
    }),
    guided({
      id: 'w2l7e2',
      title: 'Regola di sconto',
      prompt:
        'Completa `conSconto` per applicare il 10% sopra 50 euro. Con 60 deve restituire 54, con 40 restituisce 40.',
      starterCode: `function conSconto(totale, soglia = 50, sconto = 0.1) {
  // se totale >= soglia applica lo sconto
}

console.log(conSconto(60));
console.log(conSconto(40));`,
      check: { kind: 'output', lines: ['54', '40'] },
      hints: ['Usa un ternario oppure un if con return.', 'totale * (1 - sconto)'],
      solution: `function conSconto(totale, soglia = 50, sconto = 0.1) {
  return totale >= soglia ? totale * (1 - sconto) : totale;
}

console.log(conSconto(60));
console.log(conSconto(40));`,
      explanation: 'La regola è un dato (soglia, sconto), non un numero scritto nel corpo: così si riusa.',
      concepts: ['funzioni', 'condizioni'],
    }),
    solo({
      id: 'w2l7e3',
      title: 'Report completo',
      prompt:
        'Con `const spese = [15, 25, 10]`, stampa `Spese: 3`, `Totale: 50.00 €`, `Nel budget` (soglia 60).',
      starterCode: `const spese = [15, 25, 10];

// calcola e stampa le tre righe`,
      check: { kind: 'output', lines: ['Spese: 3', 'Totale: 50.00 €', 'Nel budget'] },
      hints: ['Somma con un ciclo o a mano: qui va bene un ciclo.', 'La decisione: totale <= 60 ? ... : ...'],
      solution: `const spese = [15, 25, 10];
let totale = 0;
for (const spesa of spese) {
  totale += spesa;
}
console.log('Spese: ' + spese.length);
console.log('Totale: ' + totale.toFixed(2) + ' €');
console.log(totale <= 60 ? 'Nel budget' : 'Sopra budget');`,
      explanation: 'Dati, calcolo, formattazione e decisione: la struttura di ogni report.',
      concepts: ['progetto'],
    }),
    transfer({
      id: 'w2l7e4',
      title: 'Contatore di spese grandi',
      prompt:
        'Scrivi `contaGrandi(spese, soglia = 20)` che restituisce quante spese superano la soglia. Con `[10, 25, 30]` stampa `2`.',
      starterCode: `// scrivi la funzione`,
      objective: 'Trasferire il pattern accumulatore da somma a conteggio.',
      check: { kind: 'output', lines: ['2'] },
      hints: ['Accumula 1 per ogni spesa che supera la soglia.', 'Usa if dentro il for, oppure un contatore incrementato.'],
      solution: `function contaGrandi(spese, soglia = 20) {
  let count = 0;
  for (const spesa of spese) {
    if (spesa > soglia) count++;
  }
  return count;
}

console.log(contaGrandi([10, 25, 30]));`,
      explanation: 'Cambia l’operazione ma lo schema è identico: inizializza, itera, aggiorna, restituisci.',
      concepts: ['funzioni', 'for'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Return dentro il ciclo',
      code: `function totale(spese) {
  let somma = 0;
  for (const spesa of spese) {
    somma += spesa;
    return somma;
  }
}`,
      error: `Restituisce solo il primo elemento`,
      why: 'return termina l’intera funzione, non solo il giro: il ciclo si ferma subito.',
      fix: `for (const spesa of spese) {
  somma += spesa;
}
return somma;`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l7x1',
      prompt: 'Spiega perché conviene dividere il report in più funzioni piccole invece di scrivere tutto in una.',
      keywords: ['funzioni', 'piccol', 'riutil', 'test', 'leggibil', 'compost'],
      model:
        'Funzioni piccole con un solo compito sono più facili da leggere, testare e riusare. Se la regola di sconto cambia tocco una funzione sola, e posso comporre i passaggi: totale, sconto, formattazione. Una funzione unica e lunga invece mescola calcolo e presentazione, e ogni modifica rischia di rompere altro.',
      concepts: ['funzioni'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l7q1',
      question: 'Dove va il return in una funzione che somma un array?',
      options: [
        ['Dentro il ciclo, dopo ogni somma', 'Interromperebbe la funzione al primo giro.'],
        ['Dopo il ciclo', 'Esatto: prima accumuli tutto, poi restituisci.'],
        ['Non serve', 'Senza return ottieni undefined.'],
      ],
      correct: 1,
      explanation: 'return chiude la funzione: va dopo l’accumulazione completa.',
      concepts: ['funzioni'],
    }),
    quiz({
      id: 'w2l7q2',
      question: 'Perché `media` controlla `spese.length === 0`?',
      options: [
        ['Per evitare una divisione per zero che produce NaN', 'Esatto: guard clause sui casi limite.'],
        ['Perché gli array vuoti non sono iterabili', 'Sono iterabili: semplicemente non producono giri.'],
        ['Per migliorare la performance', 'Non è una questione di performance.'],
      ],
      correct: 0,
      explanation: '0 / 0 è NaN: un controllo esplicito rende il comportamento prevedibile.',
      concepts: ['condizioni', 'funzioni'],
    }),
    quiz({
      id: 'w2l7q3',
      question: 'Cosa restituisce `conSconto(50)` con soglia 50?',
      options: [
        ['50', 'Con >= la soglia è inclusa: applica lo sconto.'],
        ['45', 'Esatto: 50 * 0.9.'],
        ['Errore', 'Nessun errore.'],
      ],
      correct: 1,
      explanation: 'La condizione usa >=: al limite si applica lo sconto.',
      concepts: ['condizioni'],
    }),
  ],
  recap: {
    points: [
      'Accumula nel ciclo, restituisci dopo.',
      'Le guard clause gestiscono i casi limite.',
      'Componi funzioni piccole: calcolo, regola, formato.',
      'Il return termina l’intera funzione.',
    ],
    learned: 'Il Quaderno delle spese ora calcola totali, medie e decisioni di budget.',
    next: 'Lato professionale: breakpoint e debug dei cicli.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w2l8',
  title: 'Lato professionale e test',
  subtitle: 'Breakpoint, off-by-one e verifica della settimana',
  minutes: 50,
  objectives: [
    'Usare un breakpoint per fermare l’esecuzione e ispezionare i valori',
    'Riconoscere l’errore off-by-one',
    'Superare il test della settimana',
  ],
  concepts: ['debugger', 'off-by-one', 'test'],
  activate: [
    'Un ciclo dovrebbe stampare 5 elementi ma ne stampa 4. Prima di cambiare il codice, cosa guarderesti?',
    'I valori della condizione al primo e all’ultimo giro: l’errore off-by-one vive lì.',
  ],
  analogy:
    'Il breakpoint è un semaforo rosso messo apposta: il programma si ferma e puoi guardare dentro le variabili. È come fermare un film fotogramma per fotogramma invece di indovinare la scena.',
  example: {
    code: `// off-by-one: dovrebbe stampare 1..5
for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
    output: `0
1
2
3
4`,
  },
  formal:
    'In DevTools → Sources puoi cliccare il numero di riga per creare un breakpoint, poi ispezionare Scope e Watch. L’errore off-by-one nasce da un confine sbagliato: < invece di <=, indice 0 invece di 1, length invece di length - 1. Si previene verificando il primo e l’ultimo caso, non solo quello centrale.',
  worked: {
    code: `function sommaPrimi(n) {
  let somma = 0;
  for (let i = 1; i < n; i++) {
    somma += i;
  }
  return somma;
}

console.log(sommaPrimi(5)); // atteso 15, ottenuto 10

// Correzione: il confine deve includere n
function sommaCorretta(n) {
  let somma = 0;
  for (let i = 1; i <= n; i++) {
    somma += i;
  }
  return somma;
}

console.log(sommaCorretta(5));`,
    output: `10
15`,
    steps: [
      ['for (let i = 1; i < n; i++)', 'Con n = 5 il ciclo si ferma a 4: manca l’ultimo elemento.'],
      ['somma += i;', 'La somma è corretta, ma su un intervallo incompleto.'],
      ['console.log(sommaPrimi(5));', 'Il test rivela 10 invece di 15: il caso limite ha trovato il bug.'],
      ['i <= n', 'Il confine corretto include n. Verificare il primo e l’ultimo caso evita la sorpresa.'],
    ],
  },
  exercises: [
    fill({
      id: 'w2l8e1',
      title: 'Ripara il confine',
      prompt: 'Il ciclo deve stampare 1, 2, 3. Correggi la condizione.',
      starterCode: `for (let i = 1; i < 3; i++) {
  console.log(i);
}`,
      check: { kind: 'output', lines: ['1', '2', '3'] },
      hints: ['Con i < 3 il ciclo si ferma a 2.', 'Usa i <= 3.'],
      solution: `for (let i = 1; i <= 3; i++) {
  console.log(i);
}`,
      explanation: 'Off-by-one: il confine esclusivo taglia l’ultimo valore.',
      concepts: ['off-by-one'],
    }),
    guided({
      id: 'w2l8e2',
      title: 'Conta le righe',
      prompt:
        'La funzione deve restituire il numero di elementi. Con `[1, 2, 3, 4]` deve stampare `4`. Sistemi il valore di ritorno.',
      starterCode: `function conta(elementi) {
  let count = 0;
  for (let i = 0; i < elementi.length; i++) {
    count++;
  }
  return count - 1;
}

console.log(conta([1, 2, 3, 4]));`,
      check: { kind: 'output', lines: ['4'] },
      hints: ['Il ciclo conta correttamente: il -1 è di troppo.', 'Restituisci count.'],
      solution: `function conta(elementi) {
  let count = 0;
  for (let i = 0; i < elementi.length; i++) {
    count++;
  }
  return count;
}

console.log(conta([1, 2, 3, 4]));`,
      explanation: 'Un classico off-by-one: il ciclo era giusto, la correzione posticcia sbagliata.',
      concepts: ['off-by-one', 'debug'],
    }),
    solo({
      id: 'w2l8e3',
      title: 'Indice dell’ultimo elemento',
      prompt:
        'Con `const elementi = [\'a\', \'b\', \'c\']`, stampa l’ultimo elemento a partire da `elementi.length`. Output: `c`.',
      starterCode: `const elementi = ['a', 'b', 'c'];

// usa length - 1`,
      check: { kind: 'output', lines: ['c'] },
      hints: ['L’ultimo indice è length - 1.', 'console.log(elementi[elementi.length - 1])'],
      solution: `const elementi = ['a', 'b', 'c'];
console.log(elementi[elementi.length - 1]);`,
      explanation: 'Gli indici partono da 0: length è il numero di elementi, l’ultimo indice è length - 1.',
      concepts: ['off-by-one'],
    }),
    transfer({
      id: 'w2l8e4',
      title: 'Debug con i valori',
      prompt:
        'La funzione dovrebbe restituire 6 (somma dei pari 2 e 4), ma restituisce 9. Correggi la condizione dentro il ciclo.',
      starterCode: `function sommaPari(numeri) {
  let somma = 0;
  for (const n of numeri) {
    if (n % 2 === 0 || n > 0) {
      somma += n;
    }
  }
  return somma;
}

console.log(sommaPari([1, 2, 4]));`,
      objective: 'Unire lettura logica e debug: la condizione con || è quasi sempre vera.',
      check: { kind: 'output', lines: ['6'] },
      hints: [
        'Con || basta una condizione vera: anche i dispari passano.',
        'Deve essere solo n % 2 === 0.',
      ],
      solution: `function sommaPari(numeri) {
  let somma = 0;
  for (const n of numeri) {
    if (n % 2 === 0) {
      somma += n;
    }
  }
  return somma;
}

console.log(sommaPari([1, 2, 4]));`,
      explanation: 'Sostituire || con la sola condizione necessaria ripara il filtro: 2 + 4 = 6.',
      concepts: ['debug', 'operatori logici'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Indice oltre la fine',
      code: `const elementi = [1, 2, 3];
console.log(elementi[3]);`,
      error: `undefined`,
      why: 'Gli indici vanno da 0 a length - 1. L’indice 3 non esiste e non lancia errore: restituisce undefined, che poi rompe i calcoli.',
      fix: `console.log(elementi[elementi.length - 1]);`,
    }),
  ],
  explains: [
    explain({
      id: 'w2l8x1',
      prompt: 'Spiega cos’è un errore off-by-one e come lo previeni.',
      keywords: ['off-by-one', 'confine', 'indice', 'length', 'ultimo', 'primo'],
      model:
        'È un errore di confine: il ciclo o l’indice si ferma un elemento prima o uno dopo. Nasce da < invece di <=, da indici che partono da 1 invece che da 0, da length invece di length - 1. Lo prevengo testando esplicitamente il primo e l’ultimo caso, non solo quello centrale.',
      concepts: ['off-by-one'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w2l8q1',
      question: 'Qual è l’ultimo indice valido di un array di 4 elementi?',
      options: [
        ['4', 'L’indice 4 sarebbe il quinto elemento: non esiste.'],
        ['3', 'Esatto: da 0 a length - 1.'],
        ['length', 'length è la quantità, non un indice.'],
      ],
      correct: 1,
      explanation: 'Indici 0..3 per quattro elementi.',
      concepts: ['off-by-one'],
    }),
    quiz({
      id: 'w2l8q2',
      question: 'Cosa fa un breakpoint in DevTools?',
      options: [
        ['Interrompe il programma per sempre', 'Puoi riprendere con il pulsante di ripresa.'],
        ['Ferma l’esecuzione su quella riga per ispezionare i valori', 'Esatto: è il debugger.'],
        ['Cancella la riga', 'Non modifica il codice.'],
      ],
      correct: 1,
      explanation: 'Il breakpoint sospende l’esecuzione e mostra scope e valori correnti.',
      concepts: ['debugger'],
    }),
    quiz({
      id: 'w2l8q3',
      question: 'Quale ciclo stampa esattamente 1, 2, 3, 4, 5?',
      options: [
        ['for (let i = 1; i < 5; i++)', 'Ferma a 4.'],
        ['for (let i = 1; i <= 5; i++)', 'Esatto.'],
        ['for (let i = 0; i < 5; i++)', 'Stampa da 0 a 4.'],
      ],
      correct: 1,
      explanation: 'Il confine incluso è <= 5.',
      concepts: ['off-by-one', 'for'],
    }),
  ],
  recap: {
    points: [
      'Il breakpoint mostra la realtà, non le ipotesi.',
      'Off-by-one: controlla primo e ultimo caso.',
      'Indici da 0 a length - 1.',
      'Un test ben scelto trova il bug in un minuto.',
    ],
    learned: 'Sai debuggare i cicli con metodo, non per tentativi.',
    next: 'Settimana 3: gli array, il tipo di dato che userai per ogni lista.',
  },
});

export const week02 = makeWeek({
  id: W,
  number: 2,
  title: 'Controllo di flusso',
  subtitle: 'Cicli, funzioni, scope e closure',
  description:
    'Il programma impara a ripetersi, a organizzarsi in funzioni e a ricordare stato. È la settimana in cui il codice inizia a somigliare a quello reale.',
  goals: [
    'Scegliere il ciclo adatto a ogni situazione',
    'Scrivere funzioni che restituiscono valori',
    'Capire dove vivono le variabili',
    'Usare closure per stato privato',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — totali con i cicli',
    brief:
      'Le spese diventano una lista e il quaderno impara a sommarle, calcolare la media e applicare una regola di sconto.',
    deliverable: 'Un report generato da funzioni componibili: totale, media, sconto, decisione di budget.',
    milestones: [
      'Funzione totale con accumulatore',
      'Media con guard clause sull’array vuoto',
      'Regola di sconto parametrica',
    ],
  },
  professional: {
    title: 'Breakpoint e debug dei cicli',
    topics: [
      'Breakpoint, watch e scope in DevTools',
      'Off-by-one: il bug dei confini',
      'Leggere un ciclo come una sequenza di stati',
    ],
    exercise: 'Fermare un ciclo al terzo giro con un breakpoint condizionale e ispezionare il contatore.',
  },
});
