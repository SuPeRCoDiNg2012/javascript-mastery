import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-06';

const l1 = lesson(W, 1, {
  id: 'w6l1',
  title: 'addEventListener',
  subtitle: 'L’oggetto evento e il primo click',
  minutes: 45,
  objectives: [
    'Registrare un listener senza proprietà onclick',
    'Leggere l’oggetto evento',
    'Rimuovere un listener quando non serve',
  ],
  concepts: ['addEventListener', 'evento', 'listener'],
  activate: [
    'Come fa un pulsante a sapere che è stato cliccato? E come fa a sapere chi ha cliccato cosa?',
    'Il browser emette un evento e passa un oggetto con tutti i dettagli a chi si è registrato.',
  ],
  analogy:
    'addEventListener è un abbonamento: “quando succede click, chiamami”. L’oggetto evento è il bollettino che ricevi: chi ha generato il click, dove, con quali tasti. Il browser è l’editore che distribuisce i bollettini.',
  example: {
    code: `const btn = document.querySelector('#btn');

btn.addEventListener('click', (evento) => {
  console.log('Cliccato!');
  console.log(evento.type);
  console.log(evento.target.tagName);
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
    output: `Cliccato!
click
BUTTON`,
  },
  formal:
    'element.addEventListener(tipo, handler, opzioni) registra una funzione. L’handler riceve un Event con type, target (chi ha originato), currentTarget (dove è registrato), preventDefault() e stopPropagation(). Più listener possono convivere sullo stesso elemento: cosa che onclick non permette. removeEventListener richiede lo stesso riferimento della funzione, quindi usa una funzione nominata se prevedi di rimuoverla.',
  worked: {
    code: `const btn = document.querySelector('#btn');

function gestisciClick(evento) {
  console.log('Target:', evento.target.id);
  console.log('Current:', evento.currentTarget.id);
}

btn.addEventListener('click', gestisciClick);

// Il secondo listener convive con il primo
btn.addEventListener('click', () => {
  console.log('Secondo listener');
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

btn.removeEventListener('click', gestisciClick);
console.log('Rimosso');`,
    output: `Target: btn
Current: btn
Secondo listener
Rimosso`,
    steps: [
      ['function gestisciClick(evento)', 'Funzione nominata: serve un riferimento per rimuoverla.'],
      ['evento.target', 'È l’elemento che ha originato l’evento.'],
      ['evento.currentTarget', 'È l’elemento su cui il listener è registrato.'],
      ['Secondo addEventListener', 'Non sovrascrive il primo: entrambi vengono chiamati.'],
      ['removeEventListener', 'Passa la stessa funzione, non una copia: i riferimenti devono coincidere.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l1e1',
      title: 'Registra un listener',
      prompt: 'Aggiungi un listener di click che stampi `Clic!` e simula il click con dispatchEvent.',
      starterCode: `const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  console.log();
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      check: { kind: 'output', lines: ['Clic!'] },
      hints: ['Dentro la callback, console.log(\'Clic!\').', 'dispatchEvent attiva il listener in modo sincrono.'],
      solution: `const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  console.log('Clic!');
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Il listener reagisce all’evento; dispatchEvent lo simula senza interazione umana.',
      concepts: ['addEventListener'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l1e2',
      title: 'Leggi il target',
      prompt: 'Nel listener, stampa `btn` leggendo `evento.target.id`.',
      starterCode: `const btn = document.querySelector('#btn');

btn.addEventListener('click', (evento) => {
  // target id
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      check: { kind: 'output', lines: ['btn'] },
      hints: ['evento.target è l’elemento che ha generato l’evento.', 'console.log(evento.target.id)'],
      solution: `const btn = document.querySelector('#btn');

btn.addEventListener('click', (evento) => {
  console.log(evento.target.id);
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'target identifica la sorgente dell’evento: utile nella delegation.',
      concepts: ['evento'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l1e3',
      title: 'Due listener',
      prompt:
        'Registra due listener sul pulsante: uno stampa `Primo`, l’altro `Secondo`. Simula un click e verifica l’ordine.',
      starterCode: `const btn = document.querySelector('#btn');

// due addEventListener`,
      check: { kind: 'output', lines: ['Primo', 'Secondo'] },
      hints: ['Vengono eseguiti nell’ordine di registrazione.', 'Registra prima il listener che stampa Primo.'],
      solution: `const btn = document.querySelector('#btn');

btn.addEventListener('click', () => console.log('Primo'));
btn.addEventListener('click', () => console.log('Secondo'));

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'addEventListener non sovrascrive: i listener coesistono.',
      concepts: ['addEventListener'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l1e4',
      title: 'Rimuovi il listener',
      prompt:
        'Registra una funzione nominata che stampa `Una volta`, attiva il click, rimuovi il listener e attiva di nuovo il click. Output atteso: una sola riga.',
      starterCode: `const btn = document.querySelector('#btn');

function unaVolta() {
  console.log('Una volta');
}

// registra, dispatch, rimuovi, dispatch`,
      objective: 'Capire che removeEventListener richiede lo stesso riferimento.',
      check: { kind: 'output', lines: ['Una volta'] },
      hints: ['removeEventListener(\'click\', unaVolta)', 'Il secondo dispatch non deve produrre output.'],
      solution: `const btn = document.querySelector('#btn');

function unaVolta() {
  console.log('Una volta');
}

btn.addEventListener('click', unaVolta);
btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
btn.removeEventListener('click', unaVolta);
btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'La rimozione funziona solo con la stessa funzione, non con una nuova arrow equivalente.',
      concepts: ['listener'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'onclick sovrascrive',
      code: `btn.onclick = () => console.log('A');
btn.onclick = () => console.log('B');
btn.click();`,
      error: `B`,
      why: 'onclick è una sola proprietà: il secondo assegnamento sostituisce il primo.',
      fix: `btn.addEventListener('click', () => console.log('A'));
btn.addEventListener('click', () => console.log('B'));`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l1x1',
      prompt: 'Spiega cosa fa addEventListener e perché è preferibile a onclick.',
      keywords: ['addeventlistener', 'onclick', 'listener', 'multipl', 'evento', 'sovrascr'],
      model:
        'addEventListener registra una funzione da chiamare quando si verifica un evento su un elemento. Diversamente da onclick, che è una singola proprietà e quindi viene sovrascritta, addEventListener permette più listener sullo stesso evento e consente di rimuoverli con removeEventListener. L’handler riceve un oggetto evento con informazioni come target e type.',
      concepts: ['addEventListener'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l1q1',
      question: 'Cosa contiene evento.target?',
      options: [
        ['L’elemento su cui è registrato il listener', 'Quello è currentTarget.'],
        ['L’elemento che ha originato l’evento', 'Esatto.'],
        ['Il documento', 'Solo se l’evento nasce lì.'],
      ],
      correct: 1,
      explanation: 'target = sorgente, currentTarget = dove ascolti.',
      concepts: ['evento'],
    }),
    quiz({
      id: 'w6l1q2',
      question: 'Cosa serve per rimuovere un listener?',
      options: [
        ['Il tipo di evento e la stessa funzione registrata', 'Esatto.'],
        ['Solo il tipo di evento', 'Serve anche il riferimento esatto alla funzione.'],
        ['Niente, basta un nuovo listener', 'Senza rimozione i listener si accumulano.'],
      ],
      correct: 0,
      explanation: 'removeEventListener confronta i riferimenti.',
      concepts: ['listener'],
    }),
    quiz({
      id: 'w6l1q3',
      question: 'Due listener click sullo stesso elemento…',
      options: [
        ['Si sovrascrivono', 'Questo accade con onclick.'],
        ['Vengono eseguiti entrambi in ordine di registrazione', 'Esatto.'],
        ['Generano un errore', 'Nessun errore.'],
      ],
      correct: 1,
      explanation: 'addEventListener è additivo.',
      concepts: ['listener'],
    }),
  ],
  recap: {
    points: [
      'addEventListener registra una reazione a un evento.',
      'L’evento porta target e currentTarget.',
      'Più listener coesistono.',
      'removeEventListener richiede lo stesso riferimento.',
    ],
    learned: 'La pagina inizia a rispondere alle azioni.',
    next: 'Delegation: un solo listener per molti elementi.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w6l2',
  title: 'Event delegation',
  subtitle: 'Un listener per tutti i figli',
  minutes: 50,
  objectives: [
    'Delegare gli eventi al contenitore',
    'Riconoscere l’elemento cliccato con target',
    'Evitare listener duplicati sugli elementi dinamici',
  ],
  concepts: ['delegation', 'bubbling', 'target'],
  activate: [
    'Una lista cresce dinamicamente. Se aggiungi un listener a ogni voce, cosa succede alle nuove voci?',
    'Non ce l’hanno: servirebbe registrarlo ogni volta. La delegation risolve ascoltando il contenitore.',
  ],
  analogy:
    'La delegation è un centralino: invece di dare un telefono a ogni dipendente, le chiamate arrivano alla reception che smista in base a chi era il destinatario. Il contenitore ascolta, target dice chi era.',
  example: {
    code: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (!voce) return;
  console.log('Hai cliccato: ' + voce.textContent);
});

lista.querySelectorAll('li').forEach((li) => {
  li.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});`,
    output: `Hai cliccato: Pane
Hai cliccato: Latte`,
  },
  formal:
    'La delegation sfrutta il bubbling: un evento su un figlio risale ai genitori. Registri un solo listener sul contenitore e usi evento.target (o closest(selettore)) per capire su chi è avvenuto. Si usa per liste dinamiche, tabelle e menu. closest risale l’albero fino al match, utile quando il click cade su un’icona interna.',
  worked: {
    code: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const bottone = evento.target.closest('[data-azione]');
  if (!bottone) return;

  if (bottone.dataset.azione === 'elimina') {
    bottone.closest('li')?.remove();
  }

  console.log('Rimaste: ' + lista.children.length);
});

const elimina = document.createElement('button');
elimina.dataset.azione = 'elimina';
elimina.textContent = 'x';
lista.querySelector('li').appendChild(elimina);

elimina.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
    output: `Rimaste: 1`,
    steps: [
      ['lista.addEventListener(\'click\', ...)', 'Un solo listener sul contenitore.'],
      ['evento.target.closest(\'[data-azione]\')', 'Risale dal click fino al bottone con quell’attributo.'],
      ['if (!bottone) return;', 'Guard clause: click fuori dai bottoni non fa nulla.'],
      ['bottone.closest(\'li\')?.remove()', 'Rimuove la voce della lista, non solo il bottone.'],
      ['lista.children.length', 'Il conteggio riflette la rimozione: 1.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l2e1',
      title: 'Delega al contenitore',
      prompt: 'Completa il listener: al click su una voce stampa il suo testo.',
      starterCode: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.();
  if (!voce) return;
  console.log(voce.textContent);
});

lista.querySelector('li').dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      check: { kind: 'output', lines: ['Pane'] },
      hints: ['closest risale fino al selettore indicato.', 'closest(\'li\')'],
      solution: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (!voce) return;
  console.log(voce.textContent);
});

lista.querySelector('li').dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'closest rende il listener robusto anche se il click cade su un elemento interno.',
      concepts: ['delegation'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l2e2',
      title: 'Nuove voci, stesso listener',
      prompt:
        'Aggiungi una voce `Uova` alla lista e simula il click: il listener del contenitore deve intercettarla e stamparne il testo.',
      starterCode: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (voce) console.log(voce.textContent);
});

const nuova = document.createElement('li');
nuova.textContent = 'Uova';
lista.appendChild(nuova);

// simula il click sulla nuova voce`,
      check: { kind: 'output', lines: ['Uova'] },
      hints: ['dispatchEvent con bubbles: true.', 'nuova.dispatchEvent(new MouseEvent(\'click\', { bubbles: true }))'],
      solution: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (voce) console.log(voce.textContent);
});

const nuova = document.createElement('li');
nuova.textContent = 'Uova';
lista.appendChild(nuova);

nuova.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Le voci create dopo la registrazione funzionano senza codice aggiuntivo.',
      concepts: ['delegation'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l2e3',
      title: 'Bottone elimina',
      prompt:
        'Crea un bottone `Elimina` dentro la prima voce, con `data-azione="elimina"`. Al click rimuovi la voce e stampa `1`.',
      starterCode: `const lista = document.querySelector('#lista');

// bottone + delegation`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['Aggiungi il bottone alla prima voce con append.', 'Nel listener: closest(\'[data-azione]\') e poi closest(\'li\').remove().'],
      solution: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const bottone = evento.target.closest('[data-azione="elimina"]');
  if (!bottone) return;
  bottone.closest('li').remove();
  console.log(lista.children.length);
});

const btn = document.createElement('button');
btn.setAttribute('data-azione', 'elimina');
btn.textContent = 'Elimina';
lista.querySelector('li').appendChild(btn);

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Il pattern bottone-dentro-voce è la base di ogni lista gestibile.',
      concepts: ['delegation'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l2e4',
      title: 'Click fuori',
      prompt:
        'Nel listener, se il click non cade su un `li` stampa `Fuori`. Simula un click sul contenitore e verifica.',
      starterCode: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  // gestisci il caso
});

// click direttamente sulla lista`,
      objective: 'Gestire i click che non corrispondono a elementi validi.',
      check: { kind: 'output', lines: ['Fuori'] },
      hints: ['Aggiungi un else al controllo della voce.', 'Non usare return prima del ramo else.'],
      solution: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (voce) {
    console.log(voce.textContent);
  } else {
    console.log('Fuori');
  }
});

lista.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Il contenitore riceve anche i propri click: distinguerli evita effetti indesiderati.',
      concepts: ['delegation'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Listener su ogni voce',
      code: `lista.querySelectorAll('li').forEach((li) => {
  li.addEventListener('click', () => console.log(li.textContent));
});
const nuova = document.createElement('li');
nuova.textContent = 'Uova';
lista.appendChild(nuova);`,
      error: `La nuova voce non risponde al click`,
      why: 'Il listener è stato registrato solo sulle voci esistenti in quel momento.',
      fix: `lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (voce) console.log(voce.textContent);
});`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l2x1',
      prompt: 'Spiega cos’è l’event delegation e perché è utile con le liste dinamiche.',
      keywords: ['delegation', 'contenitor', 'bubbling', 'target', 'dinamic', 'listener'],
      model:
        'La delegation consiste nel registrare un solo listener sul contenitore invece che su ogni figlio. Sfrutta il bubbling: il click su un figlio risale al contenitore, che usa evento.target o closest per capire quale elemento è stato coinvolto. È utile con le liste dinamiche perché gli elementi aggiunti dopo funzionano senza registrare nuovi listener.',
      concepts: ['delegation'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l2q1',
      question: 'Su cosa si basa la delegation?',
      options: [
        ['Sul bubbling degli eventi', 'Esatto.'],
        ['Sulla cattura degli errori', 'Non c’entra.'],
        ['Su un timer che controlla il DOM', 'Non è polling.'],
      ],
      correct: 0,
      explanation: 'L’evento risale dal target ai genitori.',
      concepts: ['bubbling'],
    }),
    quiz({
      id: 'w6l2q2',
      question: 'A cosa serve closest?',
      options: [
        ['A trovare l’antenato più vicino che corrisponde al selettore', 'Esatto.'],
        ['A selezionare il figlio diretto', 'Per quello c’è children.'],
        ['A copiare un nodo', 'Per copiare c’è cloneNode.'],
      ],
      correct: 0,
      explanation: 'closest è ideale quando il click cade su un elemento interno.',
      concepts: ['delegation'],
    }),
    quiz({
      id: 'w6l2q3',
      question: 'Perché con la delegation non servono listener sulle nuove voci?',
      options: [
        ['Perché il contenitore ascolta per tutti i figli', 'Esatto.'],
        ['Perché il browser copia i listener sui nuovi nodi', 'Non li copia.'],
        ['Perché le nuove voci non generano eventi', 'Le generano, e risalgono.'],
      ],
      correct: 0,
      explanation: 'Un listener, molti elementi.',
      concepts: ['delegation'],
    }),
  ],
  recap: {
    points: [
      'Delegation = un listener sul contenitore.',
      'closest risolve i click su elementi interni.',
      'Funziona con elementi creati dopo.',
      'Gestisci il caso “click fuori”.',
    ],
    learned: 'Sai gestire liste dinamiche con un solo listener.',
    next: 'Form e validazione: intercettare l’invio e controllare i dati.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w6l3',
  title: 'Form e validazione',
  subtitle: 'submit, preventDefault e input',
  minutes: 55,
  objectives: [
    'Intercettare il submit e impedire il ricaricamento',
    'Leggere i valori dei campi',
    'Validare e mostrare un errore accessibile',
  ],
  concepts: ['submit', 'preventDefault', 'validazione'],
  activate: [
    'Un form HTML, se non lo fermi, ricarica la pagina. Come si gestisce in JavaScript?',
    'Ascoltando submit e chiamando preventDefault prima di leggere i valori.',
  ],
  analogy:
    'Il submit è una porta che si chiude di scatto: preventDefault mette un fermo. Poi leggi i valori, li validi e decidi se far passare i dati o mostrare un errore.',
  example: {
    code: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value.trim();

  if (valore === '') {
    messaggio.textContent = 'Il nome è obbligatorio';
    return;
  }

  console.log('Inviato: ' + valore);
});

input.value = 'Ada';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));`,
    output: `Inviato: Ada`,
  },
  formal:
    'Il submit si intercetta sul form, non sul bottone. preventDefault impedisce la navigazione. I campi di testo espongono value; le checkbox checked. Per validare: trim per gli spazi, controlli di lunghezza, pattern, conversioni numeriche. L’errore va annunciato con testo visibile e, se serve, aria-live. La validazione nativa (required, type="email") è utile ma non sostituisce quella applicativa.',
  worked: {
    code: `const form = document.querySelector('#form');
const nome = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');
const spese = [];

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const descrizione = nome.value.trim();
  if (descrizione.length < 2) {
    messaggio.textContent = 'Inserisci almeno 2 caratteri';
    return;
  }

  spese.push(descrizione);
  messaggio.textContent = 'Aggiunta: ' + descrizione;
  form.reset();
  console.log(spese.length);
});

nome.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(messaggio.textContent);`,
    output: `1
Aggiunta: Libro`,
    steps: [
      ['form.addEventListener(\'submit\', ...)', 'L’evento giusto per l’invio è submit, non click.'],
      ['evento.preventDefault()', 'Ferma il comportamento predefinito: la pagina non si ricarica.'],
      ['nome.value.trim()', 'value è sempre una stringa: trim rimuove gli spazi accidentali.'],
      ['if (descrizione.length < 2)', 'Validazione applicativa con messaggio chiaro.'],
      ['form.reset()', 'Svuota i campi dopo un invio riuscito: l’utente è pronto per il successivo.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l3e1',
      title: 'Ferma il submit',
      prompt: 'Impedisci il ricaricamento e stampa `Inviato` quando il form viene inviato.',
      starterCode: `const form = document.querySelector('#form');

form.addEventListener('submit', (evento) => {
  evento.();
  console.log('Inviato');
});

form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));`,
      check: { kind: 'output', lines: ['Inviato'] },
      hints: ['Il metodo è preventDefault.', 'Chiamalo prima di qualsiasi altra cosa.'],
      solution: `const form = document.querySelector('#form');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  console.log('Inviato');
});

form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));`,
      explanation: 'Senza preventDefault il browser navigherebbe, interrompendo lo script.',
      concepts: ['preventDefault'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l3e2',
      title: 'Leggi il valore',
      prompt: 'Imposta `Libro` nell’input e stampa `Inviato: Libro` al submit.',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.;
  console.log('Inviato: ' + valore);
});

input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));`,
      check: { kind: 'output', lines: ['Inviato: Libro'] },
      hints: ['Il valore di un input di testo è in value.', 'input.value'],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value;
  console.log('Inviato: ' + valore);
});

input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));`,
      explanation: 'value è la proprietà che rappresenta il contenuto corrente del campo.',
      concepts: ['validazione'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l3e3',
      title: 'Valida il vuoto',
      prompt:
        'Se il campo è vuoto (dopo trim), scrivi `Campo obbligatorio` in `#messaggio` e non inviare. Simula il submit con valore vuoto e stampa il messaggio.',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');

// listener con validazione`,
      check: { kind: 'output', lines: ['Campo obbligatorio'] },
      hints: ['preventDefault sempre, poi controllo.', 'input.value.trim() === \'\''],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (input.value.trim() === '') {
    messaggio.textContent = 'Campo obbligatorio';
    return;
  }
  messaggio.textContent = 'OK';
});

input.value = '   ';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(messaggio.textContent);`,
      explanation: 'trim evita che uno spazio venga considerato un valore valido.',
      concepts: ['validazione'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l3e4',
      title: 'Valida il numero',
      prompt:
        'Nel campo `#nome`, se il valore non è un numero positivo scrivi `Importo non valido` in `#messaggio`. Simula con `-5` e stampa il messaggio.',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');

// validazione numerica`,
      objective: 'Unire conversione, condizione e messaggio d’errore.',
      check: { kind: 'output', lines: ['Importo non valido'] },
      hints: ['const n = Number(input.value)', 'Controlla !Number.isFinite(n) || n <= 0.'],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = Number(input.value);
  if (!Number.isFinite(valore) || valore <= 0) {
    messaggio.textContent = 'Importo non valido';
    return;
  }
  messaggio.textContent = 'Importo: ' + valore;
});

input.value = '-5';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(messaggio.textContent);`,
      explanation: 'La validazione applicativa deve coprire anche i valori che l’HTML non può escludere.',
      concepts: ['validazione'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Listener sul bottone',
      code: `document.querySelector('#invia').addEventListener('click', () => {
  console.log('Invio');
});`,
      error: `Il form si ricarica comunque premendo Invio nella tastiera`,
      why: 'Il submit può avvenire senza click, per esempio con Enter: va ascoltato sul form.',
      fix: `form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  // ...
});`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l3x1',
      prompt: 'Spiega come gestisci l’invio di un form in JavaScript, dal preventDefault alla validazione.',
      keywords: ['submit', 'preventdefault', 'value', 'valid', 'trim', 'form'],
      model:
        'Ascolto l’evento submit sul form e chiamo subito preventDefault per evitare il ricaricamento. Poi leggo i valori con value, applico trim e le conversioni necessarie, e valido: se qualcosa non va mostro un messaggio chiaro e interrompo, altrimenti elaboro i dati e resetto il form. Uso submit e non click perché l’invio può avvenire anche con la tastiera.',
      concepts: ['validazione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l3q1',
      question: 'Perché ascoltare submit invece di click?',
      options: [
        ['Perché il click non esiste sui form', 'Esiste, ma non copre tutti i modi di invio.'],
        ['Perché il form può essere inviato anche con Enter', 'Esatto.'],
        ['Perché submit è più veloce', 'Non è una questione di performance.'],
      ],
      correct: 1,
      explanation: 'submit è l’evento semantico dell’invio.',
      concepts: ['submit'],
    }),
    quiz({
      id: 'w6l3q2',
      question: 'Cosa fa preventDefault sul submit?',
      options: [
        ['Impedisce il ricaricamento della pagina', 'Esatto.'],
        ['Svuota i campi', 'Per quello c’è reset.'],
        ['Valida i dati', 'La validazione la scrivi tu.'],
      ],
      correct: 0,
      explanation: 'Blocca il comportamento predefinito del browser.',
      concepts: ['preventDefault'],
    }),
    quiz({
      id: 'w6l3q3',
      question: 'Perché usare trim sul valore?',
      options: [
        ['Per trasformare in numero', 'Per quello c’è Number.'],
        ['Per ignorare spazi iniziali e finali', 'Esatto.'],
        ['Per limitare la lunghezza', 'trim non limita nulla.'],
      ],
      correct: 1,
      explanation: 'Uno spazio non è un valore valido.',
      concepts: ['validazione'],
    }),
  ],
  recap: {
    points: [
      'Ascolta submit sul form.',
      'preventDefault blocca il ricaricamento.',
      'value è sempre una stringa: valida e converti.',
      'reset dopo un invio riuscito.',
    ],
    learned: 'Sai raccogliere dati dall’utente in modo sicuro.',
    next: 'Tastiera e mouse: eventi specifici e scorciatoie.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w6l4',
  title: 'Eventi di tastiera e mouse',
  subtitle: 'key, keydown, click e coordinate',
  minutes: 45,
  objectives: [
    'Riconoscere i tasti con event.key',
    'Gestire keydown e keyup',
    'Usare le informazioni del mouse quando servono',
  ],
  concepts: ['keydown', 'event.key', 'mouse'],
  activate: [
    'Vuoi che Invio invii una ricerca. Come riconosci il tasto premuto?',
    'Con event.key: è una stringa leggibile, come "Enter" o "Escape".',
  ],
  analogy:
    'La tastiera manda messaggi con il nome del tasto premuto. keydown è “dito giù”, keyup è “dito su”. Per il mouse, click è il gesto completo, mousedown e mouseup sono le due metà.',
  example: {
    code: `const input = document.querySelector('#input');

input.addEventListener('keydown', (evento) => {
  console.log('Tasto: ' + evento.key);
  if (evento.key === 'Enter') {
    console.log('Invio confermato');
  }
});

const evento = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
input.dispatchEvent(evento);`,
    output: `Tasto: Enter
Invio confermato`,
  },
  formal:
    'keydown/keyup ricevono KeyboardEvent con key (nome logico: "Enter", "Escape", "a") e code (posizione fisica: "KeyA"). Preferisci key per scorciatoie comprensibili. Per il mouse: click, dblclick, mousedown, mouseup, mousemove; l’evento espone clientX/clientY (viewport) e offsetX/offsetY (elemento). Per trascinare serve pointer events. Non intercettare tasti senza motivo: può rompere l’accessibilità.',
  worked: {
    code: `const input = document.querySelector('#input');
const messaggio = document.querySelector('#messaggio');

input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    input.value = '';
    messaggio.textContent = 'Campo svuotato';
    return;
  }

  if (evento.key === 'Enter') {
    messaggio.textContent = 'Cercato: ' + input.value;
  }
});

input.value = 'pane';
input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
console.log(messaggio.textContent);

input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
console.log(input.value === '');`,
    output: `Cercato: pane
true`,
    steps: [
      ['evento.key === \'Escape\'', 'Il tasto è identificato dal nome, non dal codice numerico.'],
      ['input.value = \'\'', 'Svuotare un campo è un’azione comune per Esc.'],
      ['return;', 'Dopo il caso Escape non serve valutare Enter: guard clause.'],
      ['Cercato: ...', 'Il valore corrente viene letto al momento dell’evento.'],
      ['keydown su Escape', 'Il secondo evento conferma lo svuotamento.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l4e1',
      title: 'Riconosci Invio',
      prompt: 'Stampa `Invio` quando viene premuto Enter.',
      starterCode: `const input = document.querySelector('#input');

input.addEventListener('keydown', (evento) => {
  if (evento.=== 'Enter') {
    console.log('Invio');
  }
});

input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));`,
      check: { kind: 'output', lines: ['Invio'] },
      hints: ['La proprietà è key.', 'evento.key'],
      solution: `const input = document.querySelector('#input');

input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    console.log('Invio');
  }
});

input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));`,
      explanation: 'key è la stringa leggibile del tasto premuto.',
      concepts: ['event.key'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l4e2',
      title: 'Escape svuota',
      prompt: 'Al tasto Escape svuota l’input e stampa `Svuotato` (input vuoto a fine esecuzione).',
      starterCode: `const input = document.querySelector('#input');
input.value = 'testo';

input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    // svuota e stampa
  }
});

input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));`,
      check: { kind: 'output', lines: ['Svuotato'] },
      hints: ['input.value = \'\'', 'Poi console.log(\'Svuotato\').'],
      solution: `const input = document.querySelector('#input');
input.value = 'testo';

input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    input.value = '';
    console.log('Svuotato');
  }
});

input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));`,
      explanation: 'Escape come “annulla” è una convenzione che gli utenti si aspettano.',
      concepts: ['keydown'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l4e3',
      title: 'Conta i tasti',
      prompt:
        'Conta i keydown sull’input e stampa il totale dopo tre eventi simulati (`3`).',
      starterCode: `const input = document.querySelector('#input');
let count = 0;

// listener + tre dispatch`,
      check: { kind: 'output', lines: ['3'] },
      hints: ['Incrementa dentro il listener.', 'Simula tre keydown con key \'a\'.'],
      solution: `const input = document.querySelector('#input');
let count = 0;

input.addEventListener('keydown', () => {
  count += 1;
});

for (let i = 0; i < 3; i++) {
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
}

console.log(count);`,
      explanation: 'Gli eventi sintetici permettono di testare il comportamento senza interazione umana.',
      concepts: ['keydown'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l4e4',
      title: 'Click con coordinate',
      prompt:
        'Al click sul pulsante stampa `true` se `clientX` è un numero finito. Simula un MouseEvent con clientX 10.',
      starterCode: `const btn = document.querySelector('#btn');

// listener click
btn.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 10 }));`,
      objective: 'Leggere le coordinate di un evento mouse quando servono.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['evento.clientX è la coordinata orizzontale.', 'Number.isFinite(evento.clientX)'],
      solution: `const btn = document.querySelector('#btn');

btn.addEventListener('click', (evento) => {
  console.log(Number.isFinite(evento.clientX));
});

btn.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 10 }));`,
      explanation: 'clientX/clientY sono relative al viewport: utili per trascinamenti e tooltip.',
      concepts: ['mouse'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Bloccare tutti i tasti',
      code: `document.addEventListener('keydown', (evento) => {
  evento.preventDefault();
});`,
      error: `La pagina non risponde più alla tastiera`,
      why: 'preventDefault su ogni keydown impedisce anche Tab, le scorciatoie del browser e la navigazione assistiva.',
      fix: `document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    // solo il comportamento che ti serve
  }
});`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l4x1',
      prompt: 'Spiega la differenza tra event.key ed event.code e quale preferisci per una scorciatoia.',
      keywords: ['key', 'code', 'tast', 'layout', 'scorciatoia', 'prefer'],
      model:
        'event.key dà il carattere logico prodotto dal tasto, per esempio "a" o "Enter", e cambia con il layout della tastiera. event.code dà la posizione fisica del tasto, per esempio "KeyA". Per le scorciatoie comprensibili preferisco key, perché rispetta la lingua e il layout dell’utente; uso code solo quando mi serve la posizione fisica.',
      concepts: ['event.key'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l4q1',
      question: 'Quale proprietà identifica il tasto premuto in modo leggibile?',
      options: [
        ['event.code', 'Indica la posizione fisica.'],
        ['event.key', 'Esatto.'],
        ['event.which', 'Deprecato e numerico.'],
      ],
      correct: 1,
      explanation: 'key restituisce il nome logico del tasto.',
      concepts: ['event.key'],
    }),
    quiz({
      id: 'w6l4q2',
      question: 'Perché non chiamare preventDefault su ogni keydown?',
      options: [
        ['Perché peggiora la performance', 'Il problema è funzionale, non di performance.'],
        ['Perché impedisce navigazione da tastiera e scorciatoie del browser', 'Esatto: rompe l’accessibilità.'],
        ['Perché non è supportato', 'È supportato.'],
      ],
      correct: 1,
      explanation: 'Blocca comportamenti attesi dall’utente.',
      concepts: ['keydown'],
    }),
    quiz({
      id: 'w6l4q3',
      question: 'Cosa sono clientX e clientY?',
      options: [
        ['Coordinate relative al viewport', 'Esatto.'],
        ['Coordinate relative al documento intero', 'Quelle sono pageX/pageY.'],
        ['Dimensioni dell’elemento', 'Quelle sono width/height.'],
      ],
      correct: 0,
      explanation: 'clientX/Y sono relative all’area visibile.',
      concepts: ['mouse'],
    }),
  ],
  recap: {
    points: [
      'keydown e keyup per la tastiera.',
      'event.key per il tasto logico.',
      'Non bloccare la tastiera globalmente.',
      'clientX/clientY per il mouse.',
    ],
    learned: 'Sai gestire input da tastiera e mouse senza rompere l’accessibilità.',
    next: 'Bubbling e capturing: il viaggio di un evento.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w6l5',
  title: 'Bubbling e capturing',
  subtitle: 'Il viaggio di un evento nell’albero',
  minutes: 50,
  objectives: [
    'Capire l’ordine di propagazione',
    'Fermare la propagazione quando serve',
    'Scegliere la fase giusta per un listener',
  ],
  concepts: ['bubbling', 'capturing', 'stopPropagation'],
  activate: [
    'Un click su un bottone dentro una lista: chi riceve l’evento per primo, il bottone o la lista?',
    'Prima il bottone (target), poi risale ai genitori: è il bubbling.',
  ],
  analogy:
    'L’evento è una bolla che nasce sul fondo e risale. In capturing scende prima dall’alto: è la fase di discesa. Ogni livello può fermarla o lasciarla passare.',
  example: {
    code: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

lista.addEventListener('click', () => console.log('lista (bubble)'));
voce.addEventListener('click', () => console.log('voce'));

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));

lista.addEventListener('click', () => console.log('lista (capture)'), true);
voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
    output: `voce
lista (bubble)
lista (capture)
voce
lista (bubble)`,
  },
  formal:
    'Un evento attraversa tre fasi: capturing (dal documento verso il target), target, bubbling (dal target verso il documento). Un listener normale è in bubbling; con il terzo argomento true (o { capture: true }) è in capturing. stopPropagation interrompe il viaggio; stopImmediatePropagation blocca anche gli altri listener sullo stesso nodo. Attenzione: fermare la propagazione può rompere componenti che ascoltano più in alto.',
  worked: {
    code: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

lista.addEventListener('click', () => {
  console.log('Contenitore');
});

voce.addEventListener('click', (evento) => {
  console.log('Voce');
  evento.stopPropagation();
});

const interno = voce.querySelector('span');
console.log('Interno esiste?', Boolean(interno));

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
    output: `Interno esiste? false
Voce`,
    steps: [
      ['lista.addEventListener(...)', 'Listener in bubbling sul contenitore.'],
      ['voce.addEventListener(...)', 'Listener sul target.'],
      ['evento.stopPropagation()', 'Impedisce all’evento di risalire alla lista.'],
      ['Boolean(interno)', 'Il fixture non ha span: false.'],
      ['dispatchEvent', 'Solo “Voce” viene stampato: il contenitore non riceve l’evento.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l5e1',
      title: 'Ferma la bolla',
      prompt:
        'Fai stampare solo `Voce`: registra un listener sul contenitore e uno sulla voce, che ferma la propagazione.',
      starterCode: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

lista.addEventListener('click', () => console.log('Contenitore'));
voce.addEventListener('click', (evento) => {
  console.log('Voce');
  evento.();
});

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      check: { kind: 'output', lines: ['Voce'] },
      hints: ['Il metodo è stopPropagation.', 'Chiamalo dopo il console.log.'],
      solution: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

lista.addEventListener('click', () => console.log('Contenitore'));
voce.addEventListener('click', (evento) => {
  console.log('Voce');
  evento.stopPropagation();
});

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'stopPropagation blocca la risalita: il contenitore non viene notificato.',
      concepts: ['stopPropagation'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l5e2',
      title: 'Ordine di bubbling',
      prompt:
        'Stampa `target` e poi `genitore`: dimostra che l’evento risale.',
      starterCode: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

voce.addEventListener('click', () => console.log('target'));
// registra il listener sul genitore

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      check: { kind: 'output', lines: ['target', 'genitore'] },
      hints: ['Il listener sul genitore va in bubbling: senza terzo argomento.', 'lista.addEventListener(\'click\', () => console.log(\'genitore\'))'],
      solution: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

voce.addEventListener('click', () => console.log('target'));
lista.addEventListener('click', () => console.log('genitore'));

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'L’ordine è target → antenati: è la definizione del bubbling.',
      concepts: ['bubbling'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l5e3',
      title: 'Fase di capturing',
      prompt:
        'Registra un listener in capturing sul contenitore che stampa `capture` prima del listener target.',
      starterCode: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

voce.addEventListener('click', () => console.log('target'));

// listener in capturing sul contenitore`,
      check: { kind: 'output', lines: ['capture', 'target'] },
      hints: ['Il terzo argomento true attiva il capturing.', 'lista.addEventListener(\'click\', fn, true)'],
      solution: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

voce.addEventListener('click', () => console.log('target'));

lista.addEventListener('click', () => console.log('capture'), true);

voce.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'In capturing il genitore vede l’evento prima che arrivi al target.',
      concepts: ['capturing'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l5e4',
      title: 'Bolla solo se serve',
      prompt:
        'Aggiungi alla voce un bottone interno: al click sul bottone il contenitore deve stampare `contenitore`, il bottone non deve fermare la propagazione.',
      starterCode: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

lista.addEventListener('click', () => console.log('contenitore'));

const btn = document.createElement('button');
btn.textContent = 'Dettagli';
voce.appendChild(btn);

// simula click sul bottone`,
      objective: 'Sfruttare il bubbling per far reagire il contenitore ai click interni.',
      check: { kind: 'output', lines: ['contenitore'] },
      hints: ['Non serve stopPropagation.', 'btn.dispatchEvent(new MouseEvent(\'click\', { bubbles: true }))'],
      solution: `const lista = document.querySelector('#lista');
const voce = lista.querySelector('li');

lista.addEventListener('click', () => console.log('contenitore'));

const btn = document.createElement('button');
btn.textContent = 'Dettagli';
voce.appendChild(btn);

btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Il bubbling permette al contenitore di gestire azioni di elementi interni: è la base della delegation.',
      concepts: ['bubbling'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'stopPropagation eccessivo',
      code: `document.querySelectorAll('button').forEach((b) => {
  b.addEventListener('click', (e) => e.stopPropagation());
});`,
      error: `I gestori globali di analytics e chiusura menu non ricevono più i click`,
      why: 'Fermare la propagazione a ogni livello interrompe componenti che ascoltano più in alto.',
      fix: `// ferma solo quando il comportamento lo richiede davvero`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l5x1',
      prompt: 'Descrivi le fasi di propagazione di un evento e cosa fa stopPropagation.',
      keywords: ['capturing', 'bubbling', 'target', 'propagazion', 'stoppropagation', 'fase'],
      model:
        'Un evento parte dal documento in fase di capturing, scende fino al target, poi risale in fase di bubbling. I listener normali sono in bubbling, quelli registrati con capture true sono in capturing. stopPropagation interrompe il viaggio: i listener successivi sullo stesso percorso non vengono chiamati, ed è per questo che va usato solo quando serve.',
      concepts: ['bubbling', 'capturing'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l5q1',
      question: 'In quale ordine si verificano le fasi?',
      options: [
        ['Target → capturing → bubbling', 'Il capturing viene prima.'],
        ['Capturing → target → bubbling', 'Esatto.'],
        ['Bubbling → target → capturing', 'Ordine invertito.'],
      ],
      correct: 1,
      explanation: 'L’evento scende e poi risale.',
      concepts: ['bubbling'],
    }),
    quiz({
      id: 'w6l5q2',
      question: 'Come si registra un listener in capturing?',
      options: [
        ['Con il terzo argomento true', 'Esatto.'],
        ['Con stopPropagation', 'Non c’entra.'],
        ['Con bubbling: false sull’evento', 'L’opzione è del listener, non dell’evento.'],
      ],
      correct: 0,
      explanation: 'addEventListener(type, handler, true) oppure { capture: true }.',
      concepts: ['capturing'],
    }),
    quiz({
      id: 'w6l5q3',
      question: 'Cosa fa stopPropagation?',
      options: [
        ['Impedisce il comportamento predefinito', 'Quello è preventDefault.'],
        ['Interrompe la propagazione dell’evento', 'Esatto.'],
        ['Rimuove il listener', 'Non lo rimuove.'],
      ],
      correct: 1,
      explanation: 'preventDefault = comportamento, stopPropagation = viaggio dell’evento.',
      concepts: ['stopPropagation'],
    }),
  ],
  recap: {
    points: [
      'Capturing scende, bubbling risale.',
      'I listener normali sono in bubbling.',
      'stopPropagation interrompe il viaggio.',
      'Usalo con parsimonia: può rompere altri componenti.',
    ],
    learned: 'Sai prevedere chi riceve un evento e in che ordine.',
    next: 'Custom events: far comunicare componenti indipendenti.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w6l6',
  title: 'Custom events',
  subtitle: 'Comunicare tra componenti con eventi propri',
  minutes: 50,
  objectives: [
    'Creare un evento personalizzato con dettagli',
    'Ascoltarlo e leggerne il payload',
    'Scegliere gli eventi rispetto alle callback dirette',
  ],
  concepts: ['CustomEvent', 'detail', 'disaccoppiamento'],
  activate: [
    'Un componente aggiunge una spesa, un altro deve aggiornare il totale. Come li fai comunicare senza legarli tra loro?',
    'Con un evento: chi produce non conosce chi ascolta.',
  ],
  analogy:
    'Un custom event è un annuncio in radio: chi trasmette non sa chi ascolta, e chi ascolta non deve conoscere il trasmettitore. Il payload (detail) è il contenuto dell’annuncio.',
  example: {
    code: `const app = document.querySelector('#app');

app.addEventListener('spesa:aggiunta', (evento) => {
  console.log('Nuova spesa: ' + evento.detail.descrizione);
  console.log('Importo: ' + evento.detail.importo);
});

app.dispatchEvent(
  new CustomEvent('spesa:aggiunta', {
    detail: { descrizione: 'Libro', importo: 18 },
  }),
);`,
    output: `Nuova spesa: Libro
Importo: 18`,
  },
  formal:
    'new CustomEvent(nome, { detail, bubbles, cancelable }) crea un evento con dati. Il nome dovrebbe essere descrittivo, spesso con namespace (spesa:aggiunta). detail può contenere qualsiasi valore. Con bubbles: true l’evento risale l’albero, utile se il listener è su un antenato. È il pattern che permette a componenti indipendenti di comunicare senza importarsi a vicenda.',
  worked: {
    code: `const form = document.querySelector('#form');
const app = document.querySelector('#app');

app.addEventListener('spesa:aggiunta', (evento) => {
  const { descrizione, importo } = evento.detail;
  console.log('Aggiunta: ' + descrizione + ' (' + importo + ' €)');
});

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  form.dispatchEvent(
    new CustomEvent('spesa:aggiunta', {
      bubbles: true,
      detail: { descrizione: 'Pranzo', importo: 12 },
    }),
  );
});

form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));`,
    output: `Aggiunta: Pranzo (12 €)`,
    steps: [
      ['app.addEventListener(\'spesa:aggiunta\', ...)', 'Il consumatore ascolta un evento con un nome stabile.'],
      ['evento.detail', 'Il payload contiene i dati della spesa.'],
      ['bubbles: true', 'L’evento parte dal form e risale fino ad app.'],
      ['new CustomEvent(...)', 'Il produttore non conosce il consumatore: nessun import diretto.'],
      ['dispatchEvent dal form', 'Il form emette, il contenitore reagisce.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l6e1',
      title: 'Emetti un evento',
      prompt: 'Emetti un evento `saluto` con detail `{ nome: \'Ada\' }` e stampa `Ciao Ada`.',
      starterCode: `const app = document.querySelector('#app');

app.addEventListener('saluto', (evento) => {
  console.log('Ciao ' + evento.detail.nome);
});

app.dispatchEvent(new ('saluto', { detail: { nome: 'Ada' } }));`,
      check: { kind: 'output', lines: ['Ciao Ada'] },
      hints: ['Il costruttore è CustomEvent.', 'new CustomEvent(...)'],
      solution: `const app = document.querySelector('#app');

app.addEventListener('saluto', (evento) => {
  console.log('Ciao ' + evento.detail.nome);
});

app.dispatchEvent(new CustomEvent('saluto', { detail: { nome: 'Ada' } }));`,
      explanation: 'CustomEvent porta i dati in detail, l’unico canale previsto.',
      concepts: ['CustomEvent'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l6e2',
      title: 'Payload tipizzato',
      prompt:
        'Emetti `spesa:aggiunta` con detail `{ importo: 30 }` e nel listener stampa `Totale parziale: 30`.',
      starterCode: `const app = document.querySelector('#app');

app.addEventListener('spesa:aggiunta', (evento) => {
  // usa evento.detail.importo
});

app.dispatchEvent(new CustomEvent('spesa:aggiunta', { detail: { importo: 30 } }));`,
      check: { kind: 'output', lines: ['Totale parziale: 30'] },
      hints: ['evento.detail.importo', 'Costruisci la stringa con + o un template literal.'],
      solution: `const app = document.querySelector('#app');

app.addEventListener('spesa:aggiunta', (evento) => {
  console.log('Totale parziale: ' + evento.detail.importo);
});

app.dispatchEvent(new CustomEvent('spesa:aggiunta', { detail: { importo: 30 } }));`,
      explanation: 'Il listener legge solo i campi che gli servono: contratto minimo.',
      concepts: ['detail'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l6e3',
      title: 'Evento che risale',
      prompt:
        'Emetti dal form un evento `spesa:aggiunta` con bubbles true; ascoltalo su `#app` e stampa `Libro`.',
      starterCode: `const form = document.querySelector('#form');
const app = document.querySelector('#app');

// listener su app + dispatch dal form`,
      check: { kind: 'output', lines: ['Libro'] },
      hints: ['bubbles: true è obbligatorio per risalire.', 'detail: { descrizione: \'Libro\' }'],
      solution: `const form = document.querySelector('#form');
const app = document.querySelector('#app');

app.addEventListener('spesa:aggiunta', (evento) => {
  console.log(evento.detail.descrizione);
});

form.dispatchEvent(
  new CustomEvent('spesa:aggiunta', {
    bubbles: true,
    detail: { descrizione: 'Libro' },
  }),
);`,
      explanation: 'Il bubbling rende il nome dell’evento un contratto tra livelli diversi della pagina.',
      concepts: ['CustomEvent'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l6e4',
      title: 'Due consumatori',
      prompt:
        'Due listener ascoltano `spesa:aggiunta`: uno stampa `A: 10`, l’altro `B: 10`. Emetti l’evento una volta.',
      starterCode: `const app = document.querySelector('#app');

// due listener + un dispatch`,
      objective: 'Capire che un evento può avere più consumatori indipendenti.',
      check: { kind: 'output', lines: ['A: 10', 'B: 10'] },
      hints: ['Registra entrambi prima del dispatch.', 'detail: { importo: 10 }'],
      solution: `const app = document.querySelector('#app');

app.addEventListener('spesa:aggiunta', (e) => console.log('A: ' + e.detail.importo));
app.addEventListener('spesa:aggiunta', (e) => console.log('B: ' + e.detail.importo));

app.dispatchEvent(new CustomEvent('spesa:aggiunta', { detail: { importo: 10 } }));`,
      explanation: 'Il produttore non sa quanti consumatori esistano: è il vantaggio del disaccoppiamento.',
      concepts: ['CustomEvent'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Evento senza bubbles',
      code: `app.addEventListener('saluto', () => console.log('ricevuto'));
form.dispatchEvent(new CustomEvent('saluto', { detail: {} }));`,
      error: `Nessun output: l’evento non risale`,
      why: 'Senza bubbles l’evento resta sul form e non raggiunge il listener sull’antenato.',
      fix: `form.dispatchEvent(new CustomEvent('saluto', { bubbles: true, detail: {} }));`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l6x1',
      prompt: 'Spiega perché i custom events disaccoppiano i componenti meglio delle callback dirette.',
      keywords: ['event', 'disaccopp', 'component', 'detail', 'ascolt', 'callback'],
      model:
        'Con una callback diretta il componente che produce deve conoscere e ricevere la funzione del consumatore, quindi i due restano legati. Con un custom event il produttore emette un annuncio con un nome stabile e un payload in detail, e non sa chi lo ascolta. Posso aggiungere altri consumatori senza modificare il produttore, il che rende i componenti indipendenti.',
      concepts: ['CustomEvent'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l6q1',
      question: 'Dove finiscono i dati di un CustomEvent?',
      options: [
        ['In evento.target', 'target è l’elemento.'],
        ['In evento.detail', 'Esatto.'],
        ['In evento.data', 'Non esiste una proprietà data standard.'],
      ],
      correct: 1,
      explanation: 'detail è il payload previsto dalla specifica.',
      concepts: ['detail'],
    }),
    quiz({
      id: 'w6l6q2',
      question: 'Perché impostare bubbles: true?',
      options: [
        ['Per far risalire l’evento agli antenati', 'Esatto.'],
        ['Per impedire la propagazione', 'L’opposto.'],
        ['Per rendere l’evento asincrono', 'La propagazione non è asincrona.'],
      ],
      correct: 0,
      explanation: 'Serve se il listener è su un contenitore.',
      concepts: ['CustomEvent'],
    }),
    quiz({
      id: 'w6l6q3',
      question: 'Un evento può avere più listener?',
      options: [
        ['No, uno solo', 'Può averne molti.'],
        ['Sì, e ognuno riceve lo stesso detail', 'Esatto.'],
        ['Solo se sono in capturing', 'Non è una limitazione.'],
      ],
      correct: 1,
      explanation: 'Il produttore non conosce il numero di consumatori.',
      concepts: ['CustomEvent'],
    }),
  ],
  recap: {
    points: [
      'CustomEvent porta dati in detail.',
      'Il nome è un contratto pubblico.',
      'bubbles: true per i listener sugli antenati.',
      'Più consumatori, produttore ignaro.',
    ],
    learned: 'Sai far comunicare componenti senza legarli.',
    next: 'Ripasso e progetto: il form che aggiunge spese al quaderno.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w6l7',
  title: 'Ripasso e progetto',
  subtitle: 'Form per aggiungere spese',
  minutes: 60,
  objectives: [
    'Combinare form, validazione e rendering',
    'Aggiornare lo stato e l’interfaccia insieme',
    'Gestire errori senza perdere i dati inseriti',
  ],
  concepts: ['ripasso', 'progetto', 'form + render'],
  activate: [
    'Senza guardare: qual è la sequenza corretta al submit di un form che aggiunge una spesa?',
    'preventDefault → leggi valori → valida → aggiorna stato → render → reset.',
  ],
  analogy:
    'Il form è la porta d’ingresso dei dati: valida il passaggio, aggiorna il magazzino (stato) e ridisegna il cartello (render). Se il dato non è valido, la porta resta chiusa e l’utente sa perché.',
  example: {
    code: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');
const messaggio = document.querySelector('#messaggio');
const spese = [];

function render() {
  lista.replaceChildren();
  spese.forEach((spesa) => {
    const li = document.createElement('li');
    li.textContent = spesa.descrizione + ' — ' + spesa.importo + ' €';
    lista.appendChild(li);
  });
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const descrizione = input.value.trim();
  const importo = Number(input.dataset.importo ?? '10');

  if (descrizione === '') {
    messaggio.textContent = 'Descrizione obbligatoria';
    return;
  }

  spese.push({ descrizione, importo });
  messaggio.textContent = 'Aggiunta: ' + descrizione;
  render();
  form.reset();
});

input.value = 'Libro';
input.dataset.importo = '18';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(lista.children.length);
console.log(lista.textContent);`,
    output: `1
Libro — 18 €`,
  },
  formal:
    'L’ordine conta: prima si valida, poi si modifica lo stato, poi si renderizza. Il messaggio d’errore non deve cancellare i dati inseriti. Dopo un invio riuscito, reset e focus tornano utili. Se il form ha più campi, leggi tutti i valori prima di validare, così puoi mostrare più errori insieme invece di uno alla volta.',
  worked: {
    code: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');
const messaggio = document.querySelector('#messaggio');

const stato = { spese: [] };

function render() {
  lista.replaceChildren();
  if (stato.spese.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nessuna spesa';
    lista.appendChild(li);
    return;
  }
  stato.spese.forEach((spesa) => {
    const li = document.createElement('li');
    li.textContent = spesa.descrizione + ' — ' + spesa.importo.toFixed(2) + ' €';
    lista.appendChild(li);
  });
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const descrizione = input.value.trim();
  if (descrizione.length < 2) {
    messaggio.textContent = 'Descrizione troppo corta';
    return;
  }
  stato.spese.push({ descrizione, importo: 18 });
  messaggio.textContent = 'Aggiunta';
  render();
});

render();
input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(lista.textContent);

input.value = 'L';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(messaggio.textContent);`,
    output: `Libro — 18.00 €
Descrizione troppo corta`,
    steps: [
      ['const stato = { spese: [] };', 'Un unico oggetto di stato: crescerà con il progetto.'],
      ['render() con stato vuoto', 'Il primo render mostra già un messaggio coerente.'],
      ['descrizione.length < 2', 'La validazione è esplicita e il messaggio spiega cosa fare.'],
      ['stato.spese.push(...)', 'Lo stato cambia solo dopo la validazione.'],
      ['nuovo submit con valore corto', 'L’errore non svuota il campo: l’utente può correggere.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l7e1',
      title: 'Ordine giusto',
      prompt: 'Completa il listener: previeni il submit, leggi il valore, validalo e aggiungi al render.',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');
let count = 0;

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value.trim();
  if (valore === '') ;
  count += 1;
  const li = document.createElement('li');
  li.textContent = valore;
  lista.appendChild(li);
});

input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(count);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['Se il valore è vuoto devi uscire con return.', 'Sostituisci il punto e virgola con return;'],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');
let count = 0;

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value.trim();
  if (valore === '') return;
  count += 1;
  const li = document.createElement('li');
  li.textContent = valore;
  lista.appendChild(li);
});

input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(count);`,
      explanation: 'Return anticipato: il codice di successo resta lineare.',
      concepts: ['progetto'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l7e2',
      title: 'Errore visibile',
      prompt:
        'Con valore vuoto scrivi `Inserisci una descrizione` in `#messaggio` e non creare voci (stampa `0` e il messaggio).',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');
const lista = document.querySelector('#lista');
lista.replaceChildren();

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  // valida
});

input.value = '';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(lista.children.length);
console.log(messaggio.textContent);`,
      check: { kind: 'output', lines: ['0', 'Inserisci una descrizione'] },
      hints: ['Se trim() è vuoto imposta il messaggio e return.', 'Non creare nodi nel ramo di errore.'],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const messaggio = document.querySelector('#messaggio');
const lista = document.querySelector('#lista');
lista.replaceChildren();

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value.trim();
  if (valore === '') {
    messaggio.textContent = 'Inserisci una descrizione';
    return;
  }
  const li = document.createElement('li');
  li.textContent = valore;
  lista.appendChild(li);
});

input.value = '';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(lista.children.length);
console.log(messaggio.textContent);`,
      explanation: 'Il messaggio di errore è parte del flusso, non un’eccezione.',
      concepts: ['progetto'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l7e3',
      title: 'Aggiungi e mostra',
      prompt:
        'Al submit aggiungi una voce alla lista e stampa `Aggiunta: Libro`. Poi stampa il numero di voci (`1`).',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');
const messaggio = document.querySelector('#messaggio');

// listener completo`,
      check: { kind: 'output', lines: ['Aggiunta: Libro', '1'] },
      hints: ['Ordine: preventDefault, valore, push nel DOM, messaggio.', 'Non dimenticare di creare il li.'],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');
const messaggio = document.querySelector('#messaggio');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value.trim();
  if (valore === '') return;
  const li = document.createElement('li');
  li.textContent = valore;
  lista.appendChild(li);
  messaggio.textContent = 'Aggiunta: ' + valore;
});

input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(messaggio.textContent);
console.log(lista.children.length);`,
      explanation: 'Form, validazione e DOM lavorano insieme: è il cuore del quaderno.',
      concepts: ['progetto'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l7e4',
      title: 'Ripristina il focus',
      prompt:
        'Dopo un invio riuscito, svuota il form e sposta il focus sull’input. Stampa `true` se `document.activeElement` è l’input.',
      starterCode: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');

// listener con reset e focus`,
      objective: 'Curare il flusso dopo l’invio: il form resta pronto all’uso.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['form.reset() svuota.', 'input.focus() sposta il focus; poi verifica con document.activeElement === input.'],
      solution: `const form = document.querySelector('#form');
const input = document.querySelector('#nome');
const lista = document.querySelector('#lista');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valore = input.value.trim();
  if (valore === '') return;
  const li = document.createElement('li');
  li.textContent = valore;
  lista.appendChild(li);
  form.reset();
  input.focus();
});

input.value = 'Libro';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
console.log(document.activeElement === input);`,
      explanation: 'Reset e focus riducono l’attrito: l’utente può inserire subito la voce successiva.',
      concepts: ['progetto'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Errore che cancella i dati',
      code: `if (valore === '') {
  form.reset();
  return;
}`,
      error: `L’utente perde ciò che aveva scritto`,
      why: 'Reset nel ramo di errore cancella l’input proprio quando serve correggerlo.',
      fix: `if (valore === '') {
  messaggio.textContent = 'Campo obbligatorio';
  return;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l7x1',
      prompt: 'Descrivi la sequenza completa di un submit che aggiunge una spesa al quaderno.',
      keywords: ['preventdefault', 'value', 'valid', 'stato', 'render', 'reset'],
      model:
        'Ascolto submit, chiamo preventDefault, leggo i valori con trim. Se la descrizione è vuota mostro un messaggio e interrompo senza toccare lo stato. Se è valida aggiungo la spesa allo stato, aggiorno il messaggio, richiamo il render per ridisegnare la lista e resetto il form, riportando il focus sul campo.',
      concepts: ['progetto'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l7q1',
      question: 'Cosa fai subito dopo preventDefault?',
      options: [
        ['Resetti il form', 'Prima devi leggere i valori.'],
        ['Leggi i valori dei campi', 'Esatto.'],
        ['Renderizzi', 'Prima di aggiornare lo stato non c’è nulla da renderizzare.'],
      ],
      correct: 1,
      explanation: 'Lettura → validazione → stato → render → reset.',
      concepts: ['progetto'],
    }),
    quiz({
      id: 'w6l7q2',
      question: 'Perché non resettare il form quando c’è un errore?',
      options: [
        ['Perché l’utente perderebbe i dati da correggere', 'Esatto.'],
        ['Perché reset causa errori', 'Reset funziona, ma è sbagliato nel ramo di errore.'],
        ['Perché il form si blocca', 'Non si blocca.'],
      ],
      correct: 0,
      explanation: 'L’errore non deve distruggere il lavoro dell’utente.',
      concepts: ['progetto'],
    }),
    quiz({
      id: 'w6l7q3',
      question: 'Cosa significa che il DOM è una proiezione dello stato?',
      options: [
        ['Che il render parte sempre dai dati', 'Esatto.'],
        ['Che il DOM contiene lo stato', 'Il DOM non è la fonte di verità.'],
        ['Che lo stato è nell’HTML', 'Lo stato vive nei dati.'],
      ],
      correct: 0,
      explanation: 'Lo stesso principio della Settimana 5, ora con gli eventi.',
      concepts: ['progetto'],
    }),
  ],
  recap: {
    points: [
      'preventDefault → leggi → valida → stato → render → reset.',
      'Non perdere i dati in caso di errore.',
      'Un solo stato come fonte di verità.',
      'Reset e focus dopo il successo.',
    ],
    learned: 'Il Quaderno delle spese ora accetta dati reali dall’utente.',
    next: 'Lato professionale: eventi, performance e strumenti di ispezione.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w6l8',
  title: 'Lato professionale e test',
  subtitle: 'Listener passivi, cleanup e verifica della settimana',
  minutes: 50,
  objectives: [
    'Usare listener passivi per lo scroll',
    'Rimuovere listener per evitare perdite di memoria',
    'Superare il test della settimana',
  ],
  concepts: ['listener passivi', 'cleanup', 'test'],
  activate: [
    'Un listener su scroll che chiama preventDefault: cosa succede alla fluidità della pagina?',
    'Il browser deve aspettare il listener prima di scorrere: può causare ritardi. Per questo esistono i listener passivi.',
  ],
  analogy:
    'Un listener passivo è un osservatore che promette di non toccare i controlli: il browser può scorrere subito senza chiedergli il permesso.',
  example: {
    code: `const app = document.querySelector('#app');

const onScroll = () => {
  console.log('scroll passivo');
};

app.addEventListener('scroll', onScroll, { passive: true });
app.dispatchEvent(new Event('scroll'));
app.removeEventListener('scroll', onScroll);

console.log('Cleanup completato');`,
    output: `scroll passivo
Cleanup completato`,
  },
  formal:
    'I listener su wheel, touchstart e scroll dovrebbero essere passivi ({ passive: true }) quando non chiamano preventDefault: il browser non aspetta il codice per scorrere. Per evitare perdite, rimuovi i listener quando il componente viene distrutto e usaLo stesso riferimento. Nelle app grandi si usa AbortController: addEventListener(..., { signal }) e poi controller.abort() rimuove tutto in una volta.',
  worked: {
    code: `const app = document.querySelector('#app');
const controller = new AbortController();

app.addEventListener(
  'click',
  (evento) => {
    console.log('Click su ' + (evento.target.id || 'contenitore'));
  },
  { signal: controller.signal },
);

document.querySelector('#btn').dispatchEvent(new MouseEvent('click', { bubbles: true }));

controller.abort();
document.querySelector('#btn').dispatchEvent(new MouseEvent('click', { bubbles: true }));

console.log('Fine');`,
    output: `Click su btn
Fine`,
    steps: [
      ['new AbortController()', 'Un unico oggetto per gestire più listener.'],
      ['{ signal: controller.signal }', 'Collega il listener al controller.'],
      ['Primo dispatch', 'Il listener è attivo e stampa.'],
      ['controller.abort()', 'Rimuove tutti i listener collegati al segnale.'],
      ['Secondo dispatch', 'Nessun output: il listener non c’è più.'],
    ],
  },
  exercises: [
    fill({
      id: 'w6l8e1',
      title: 'Listener passivo',
      prompt: 'Registra un listener scroll passivo che stampa `scroll`, poi simulalo.',
      starterCode: `const app = document.querySelector('#app');

app.addEventListener('scroll', () => console.log('scroll'), { : true });
app.dispatchEvent(new Event('scroll'));`,
      check: { kind: 'output', lines: ['scroll'] },
      hints: ['L’opzione si chiama passive.', '{ passive: true }'],
      solution: `const app = document.querySelector('#app');

app.addEventListener('scroll', () => console.log('scroll'), { passive: true });
app.dispatchEvent(new Event('scroll'));`,
      explanation: 'Passive promette al browser che non bloccherai lo scorrimento.',
      concepts: ['listener passivi'],
      runtime: 'dom',
    }),
    guided({
      id: 'w6l8e2',
      title: 'Cleanup con AbortController',
      prompt:
        'Registra un listener con signal, fai abort e verifica che dopo l’abort non venga chiamato: stampa solo `prima`.',
      starterCode: `const app = document.querySelector('#app');
const controller = new AbortController();

app.addEventListener('click', () => console.log('prima'), { signal: controller.signal });

app.dispatchEvent(new MouseEvent('click', { bubbles: true }));
// abort e secondo dispatch`,
      check: { kind: 'output', lines: ['prima'] },
      hints: ['controller.abort()', 'Poi dispatchEvent di nuovo: non deve stampare.'],
      solution: `const app = document.querySelector('#app');
const controller = new AbortController();

app.addEventListener('click', () => console.log('prima'), { signal: controller.signal });

app.dispatchEvent(new MouseEvent('click', { bubbles: true }));
controller.abort();
app.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'abort rimuove in blocco tutti i listener collegati al segnale.',
      concepts: ['cleanup'],
      runtime: 'dom',
    }),
    solo({
      id: 'w6l8e3',
      title: 'Rimuovi con riferimento',
      prompt:
        'Registra una funzione nominata su `#btn`, simula un click, rimuovila e simula un secondo click: output solo `attivo`.',
      starterCode: `const btn = document.querySelector('#btn');
function handler() { console.log('attivo'); }

// registra, dispatch, rimuovi, dispatch`,
      check: { kind: 'output', lines: ['attivo'] },
      hints: ['removeEventListener(\'click\', handler)', 'Passa lo stesso riferimento, non una nuova funzione.'],
      solution: `const btn = document.querySelector('#btn');
function handler() {
  console.log('attivo');
}

btn.addEventListener('click', handler);
btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
btn.removeEventListener('click', handler);
btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Il cleanup evita che i listener si accumulino su componenti ricreati.',
      concepts: ['cleanup'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w6l8e4',
      title: 'Un listener per due pulsanti',
      prompt:
        'Con delegation su `#lista`, al click su un `li` stampa `voce`. Simula un click sulla prima voce.',
      starterCode: `const lista = document.querySelector('#lista');

// delegation`,
      objective: 'Applicare delegation e verificare con eventi sintetici.',
      check: { kind: 'output', lines: ['voce'] },
      hints: ['Usa closest(\'li\') e controlla che esista.', 'Poi dispatchEvent sul primo li con bubbles true.'],
      solution: `const lista = document.querySelector('#lista');

lista.addEventListener('click', (evento) => {
  const voce = evento.target.closest('li');
  if (voce) console.log('voce');
});

lista.querySelector('li').dispatchEvent(new MouseEvent('click', { bubbles: true }));`,
      explanation: 'Gli eventi sintetici sono anche la base dei test end-to-end.',
      concepts: ['delegation'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Listener mai rimossi',
      code: `function monta() {
  document.addEventListener('scroll', () => console.log('scroll'));
}
monta();
monta();`,
      error: `Due listener per lo stesso evento: lavoro doppio e potenziale memory leak`,
      why: 'Ogni chiamata aggiunge un listener nuovo senza rimuovere il precedente.',
      fix: `const controller = new AbortController();
document.addEventListener('scroll', onScroll, { signal: controller.signal });`,
    }),
  ],
  explains: [
    explain({
      id: 'w6l8x1',
      prompt: 'Spiega perché i listener vanno rimossi e come AbortController semplifica il cleanup.',
      keywords: ['listener', 'rimuov', 'abort', 'memory', 'cleanup', 'component'],
      model:
        'Ogni listener registrato mantiene un riferimento alla funzione e all’elemento: se il componente viene distrutto e il listener resta, si accumula lavoro inutile e memoria occupata. AbortController semplifica il cleanup perché collego più listener allo stesso signal e con abort li rimuovo tutti in una volta, senza conservare ogni riferimento.',
      concepts: ['cleanup'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w6l8q1',
      question: 'Quando usare { passive: true }?',
      options: [
        ['Su scroll, wheel e touch quando non chiami preventDefault', 'Esatto.'],
        ['Su tutti i listener', 'Non ha senso per i click.'],
        ['Mai, peggiora la fluidità', 'La migliora quando è appropriato.'],
      ],
      correct: 0,
      explanation: 'Il browser non aspetta il listener per scorrere.',
      concepts: ['listener passivi'],
    }),
    quiz({
      id: 'w6l8q2',
      question: 'Cosa fa controller.abort()?',
      options: [
        ['Annulla una fetch', 'Anche, ma qui parliamo di listener.'],
        ['Rimuove i listener registrati con quel signal', 'Esatto.'],
        ['Ricarica la pagina', 'No: abort non ricarica nulla, segnala solo l’annullamento.'],
      ],
      correct: 1,
      explanation: 'Un solo abort per tutto il gruppo di listener.',
      concepts: ['cleanup'],
    }),
    quiz({
      id: 'w6l8q3',
      question: 'Perché i listener non rimossi sono un problema?',
      options: [
        ['Occupano memoria e possono duplicare effetti', 'Esatto.'],
        ['Rallentano solo il primo caricamento', 'Il problema persiste.'],
        ['Impediscono il rendering', 'Non lo impediscono direttamente.'],
      ],
      correct: 0,
      explanation: 'Cleanup = igiene del ciclo di vita dei componenti.',
      concepts: ['cleanup'],
    }),
  ],
  recap: {
    points: [
      'Listener passivi per scroll e touch.',
      'Rimuovi i listener quando il componente muore.',
      'AbortController semplifica il cleanup.',
      'Gli eventi sintetici servono per testare.',
    ],
    learned: 'Sai gestire il ciclo di vita degli eventi come in produzione.',
    next: 'Settimana 7: classi, ereditarietà e composizione.',
  },
});

export const week06 = makeWeek({
  id: W,
  number: 6,
  title: 'Eventi',
  subtitle: 'Interazione, form e comunicazione',
  description:
    'La pagina diventa interattiva: click, tastiera, form e custom events. Il quaderno accetta dati dall’utente e aggiorna se stesso.',
  goals: [
    'Registrare e rimuovere listener',
    'Delegare gli eventi nelle liste dinamiche',
    'Validare un form senza perdere i dati',
    'Comunicare tra componenti con eventi',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — form di inserimento',
    brief:
      'Un form aggiunge spese con validazione, messaggi chiari e rendering immediato della lista.',
    deliverable: 'Form funzionante che aggiorna lista, totale e messaggi di stato.',
    milestones: [
      'Submit intercettato con preventDefault',
      'Validazione con messaggio non distruttivo',
      'Lista aggiornata e form ripulito',
    ],
  },
  professional: {
    title: 'Eventi in produzione',
    topics: [
      'Listener passivi e fluidità dello scroll',
      'Cleanup e AbortController',
      'Eventi sintetici per i test',
    ],
    exercise: 'Aggiungere e rimuovere listener a un componente senza duplicare gli effetti.',
  },
});
