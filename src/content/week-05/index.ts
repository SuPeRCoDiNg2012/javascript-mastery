import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-05';

const l1 = lesson(W, 1, {
  id: 'w5l1',
  title: 'Il DOM e la selezione',
  subtitle: 'getElementById, querySelector, querySelectorAll',
  minutes: 50,
  objectives: [
    'Capire cos’è il DOM e come nasce dall’HTML',
    'Selezionare un elemento per id e per selettore CSS',
    'Selezionare più elementi e leggerne la lunghezza',
  ],
  concepts: ['DOM', 'selezione', 'querySelector'],
  activate: [
    'Hai scritto HTML: chi trasforma quel testo in una struttura che JavaScript può modificare?',
    'Il browser costruisce il DOM, un albero di oggetti che rappresenta la pagina.',
  ],
  analogy:
    'L’HTML è la ricetta, il DOM è il piatto già composto. Puoi cambiare il piatto senza riscrivere la ricetta: il DOM è un albero di nodi, e ogni elemento è raggiungibile da un selettore.',
  example: {
    code: `const messaggio = document.querySelector('#messaggio');
console.log(messaggio.textContent);

const voci = document.querySelectorAll('#lista li');
console.log(voci.length);

const btn = document.getElementById('btn');
console.log(btn.tagName);`,
    output: `Testo iniziale
2
BUTTON`,
  },
  formal:
    'document è la radice del DOM. getElementById(\'id\') restituisce un elemento o null. querySelector(\'selettore\') restituisce il primo match o null, accetta qualsiasi selettore CSS. querySelectorAll(\'selettore\') restituisce una NodeList statica: si itera con forEach, non ha map/filter. Un elemento inesistente dà null, e leggere una proprietà di null lancia TypeError: controlla o usa ?.',
  worked: {
    code: `const lista = document.querySelector('#lista');
const voci = lista.querySelectorAll('li');

console.log('Voci:', voci.length);

voci.forEach((voce, indice) => {
  console.log(indice + ': ' + voce.textContent);
});

const btn = document.querySelector('#btn');
console.log(btn?.tagName);`,
    output: `Voci: 2
0: Pane
1: Latte
BUTTON`,
    steps: [
      ['document.querySelector(\'#lista\')', 'Il cancelletto indica un id, come nei selettori CSS.'],
      ['lista.querySelectorAll(\'li\')', 'La ricerca può partire da un elemento, non solo da document.'],
      ['voci.length', 'NodeList ha length: qui due elementi.'],
      ['voci.forEach(...)', 'NodeList supporta forEach: puoi stampare indice e contenuto.'],
      ['btn?.tagName', 'Se l’elemento non esistesse, ?. eviterebbe il TypeError.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l1e1',
      title: 'Seleziona per id',
      prompt: 'Stampa il testo dell’elemento con id `messaggio` (`Testo iniziale`).',
      starterCode: `const el = document.querySelector('');
console.log(el.textContent);`,
      check: { kind: 'output', lines: ['Testo iniziale'] },
      hints: ['Per un id il selettore inizia con #.', 'Scrivi \'#messaggio\'.'],
      solution: `const el = document.querySelector('#messaggio');
console.log(el.textContent);`,
      explanation: 'I selettori CSS funzionano nel DOM: # per gli id, . per le classi, il nome per i tag.',
      concepts: ['querySelector'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l1e2',
      title: 'Conta le voci',
      prompt: 'Stampa il numero di `li` dentro `#lista` (`2`).',
      starterCode: `const voci = document.querySelectorAll('');

console.log(voci.length);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Il selettore può essere composto: \'#lista li\'.', 'querySelectorAll restituisce una NodeList con length.'],
      solution: `const voci = document.querySelectorAll('#lista li');

console.log(voci.length);`,
      explanation: 'I selettori composti permettono di restringere la ricerca dentro un contenitore.',
      concepts: ['selezione'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l1e3',
      title: 'Leggi un tag',
      prompt: 'Stampa il `tagName` del pulsante con id `btn` (`BUTTON`).',
      starterCode: `// seleziona il pulsante e stampa tagName`,
      check: { kind: 'output', lines: ['BUTTON'] },
      hints: ['document.getElementById(\'btn\')', 'tagName è in maiuscolo.'],
      solution: `const btn = document.getElementById('btn');
console.log(btn.tagName);`,
      explanation: 'tagName restituisce il nome del tag in maiuscolo: BUTTON.',
      concepts: ['DOM'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l1e4',
      title: 'Prima voce',
      prompt:
        'Stampa il testo della prima voce della lista (`Pane`) usando querySelector con un selettore composto.',
      starterCode: `// un solo querySelector`,
      objective: 'Scegliere fra selezionare tutti e selezionare il primo.',
      check: { kind: 'output', lines: ['Pane'] },
      hints: ['querySelector restituisce il primo match.', 'document.querySelector(\'#lista li\')'],
      solution: `const prima = document.querySelector('#lista li');
console.log(prima.textContent);`,
      explanation: 'Se ti serve un solo elemento, querySelector è più diretto di querySelectorAll.',
      concepts: ['selezione'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Elemento inesistente',
      code: `const el = document.querySelector('#non-esiste');
console.log(el.textContent);`,
      error: `TypeError: Cannot read properties of null (reading 'textContent')`,
      why: 'querySelector restituisce null quando non trova nulla: non lancia un errore da solo, ma fallisce al primo accesso.',
      fix: `const el = document.querySelector('#non-esiste');
console.log(el?.textContent ?? 'Elemento non trovato');`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l1x1',
      prompt: 'Spiega cos’è il DOM e la differenza tra querySelector e querySelectorAll.',
      keywords: ['dom', 'albero', 'queryselector', 'prim', 'tutti', 'nodelist'],
      model:
        'Il DOM è la rappresentazione a oggetti della pagina: il browser trasforma l’HTML in un albero di nodi che JavaScript può leggere e modificare. querySelector restituisce il primo elemento che corrisponde al selettore CSS, oppure null; querySelectorAll restituisce una NodeList con tutti i match, su cui si itera con forEach.',
      concepts: ['DOM', 'selezione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l1q1',
      question: 'Cosa restituisce querySelector se non trova nulla?',
      options: [
        ['undefined', 'querySelector restituisce null, non undefined.'],
        ['null', 'Esatto.'],
        ['Un errore', 'L’errore arriva solo se usi il risultato.'],
      ],
      correct: 1,
      explanation: 'Controlla sempre il null prima di leggere proprietà.',
      concepts: ['selezione'],
    }),
    quiz({
      id: 'w5l1q2',
      question: 'Quale selettore seleziona l’elemento con id "app"?',
      options: [
        ['.app', 'Il punto indica una classe.'],
        ['#app', 'Esatto.'],
        ['app#', 'Sintassi non valida.'],
      ],
      correct: 1,
      explanation: 'I selettori del DOM seguono la sintassi CSS.',
      concepts: ['selezione'],
    }),
    quiz({
      id: 'w5l1q3',
      question: 'Una NodeList di querySelectorAll supporta map e filter?',
      options: [
        ['Sì, come un array', 'Non è un array: ha forEach e length, non i metodi degli array.'],
        ['No, ma puoi convertirla con Array.from', 'Esatto.'],
        ['No, e non si può iterare', 'Si può iterare con forEach.'],
      ],
      correct: 1,
      explanation: 'Array.from(nodeList) la converte quando servono map/filter.',
      concepts: ['DOM'],
    }),
  ],
  recap: {
    points: [
      'Il DOM è l’albero di oggetti della pagina.',
      'getElementById e querySelector per un elemento.',
      'querySelectorAll per più elementi (NodeList).',
      'Selezione assente = null: gestiscilo.',
    ],
    learned: 'Sai trovare qualsiasi elemento della pagina.',
    next: 'Modificare contenuto, classi, stili e attributi.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w5l2',
  title: 'Modificare la pagina',
  subtitle: 'textContent, classList, style e attributi',
  minutes: 50,
  objectives: [
    'Cambiare il testo di un elemento',
    'Aggiungere e togliere classi',
    'Impostare attributi e stili in modo sicuro',
  ],
  concepts: ['textContent', 'classList', 'attributi'],
  activate: [
    'Qual è la differenza tra cambiare il testo e cambiare l’HTML di un elemento?',
    'textContent è testo puro; innerHTML interpreta il markup, ed è rischioso con dati dell’utente.',
  ],
  analogy:
    'textContent è scrivere su un cartello: il contenuto è letterale. innerHTML è consegnare un nuovo cartello al tipografo: interpreta anche i simboli speciali. classList è un guardaroba: aggiungi e togli vestiti senza rifare il guardaroba intero.',
  example: {
    code: `const p = document.querySelector('#messaggio');

p.textContent = 'Nuovo testo';
console.log(p.textContent);

p.classList.add('evidenziato');
console.log(p.classList.contains('evidenziato'));

p.setAttribute('data-stato', 'ok');
console.log(p.getAttribute('data-stato'));

p.style.color = 'red';
console.log(p.style.color);`,
    output: `Nuovo testo
true
ok
red`,
  },
  formal:
    'textContent sostituisce il contenuto testuale, in sicurezza. innerHTML interpreta HTML: usalo solo con markup fidato, altrimenti rischi injection. classList.add/remove/toggle/contains gestiscono le classi senza string manipulation. setAttribute/getAttribute/removeAttribute lavorano sugli attributi. style imposta proprietà CSS inline (camelCase: backgroundColor). Per mostrare o nascondere un elemento è meglio una classe CSS che style.display.',
  worked: {
    code: `const p = document.querySelector('#messaggio');

p.textContent = 'Spesa aggiunta';
p.classList.add('ok', 'visibile');

const btn = document.querySelector('#btn');
btn.textContent = 'Salva';
btn.setAttribute('aria-pressed', 'true');

console.log(p.textContent);
console.log(btn.textContent);
console.log(btn.getAttribute('aria-pressed'));`,
    output: `Spesa aggiunta
Salva
true`,
    steps: [
      ['p.textContent = \'Spesa aggiunta\';', 'Il testo precedente viene sostituito completamente.'],
      ['p.classList.add(\'ok\', \'visibile\')', 'Più classi in una chiamata: nessuna concatenazione di stringhe.'],
      ['btn.textContent = \'Salva\';', 'Anche il testo di un pulsante è textContent.'],
      ['btn.setAttribute(\'aria-pressed\', \'true\')', 'Gli attributi ARIA si impostano così: il pulsante resta accessibile.'],
      ['btn.getAttribute(...)', 'Legge il valore come stringa: attenzione ai confronti.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l2e1',
      title: 'Cambia il testo',
      prompt: 'Imposta il testo di `#messaggio` a `Aggiornato` e stampalo.',
      starterCode: `const p = document.querySelector('#messaggio');

p. = 'Aggiornato';
console.log(p.textContent);`,
      check: { kind: 'output', lines: ['Aggiornato'] },
      hints: ['La proprietà del testo è textContent.', 'p.textContent = \'Aggiornato\';'],
      solution: `const p = document.querySelector('#messaggio');

p.textContent = 'Aggiornato';
console.log(p.textContent);`,
      explanation: 'textContent è la via sicura per cambiare testo.',
      concepts: ['textContent'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l2e2',
      title: 'Aggiungi una classe',
      prompt: 'Aggiungi la classe `attivo` a `#btn` e stampa `true` verificando con contains.',
      starterCode: `const btn = document.querySelector('#btn');

// classList.add + contains
console.log();`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['btn.classList.add(\'attivo\')', 'Poi console.log(btn.classList.contains(\'attivo\')).'],
      solution: `const btn = document.querySelector('#btn');

btn.classList.add('attivo');
console.log(btn.classList.contains('attivo'));`,
      explanation: 'classList è l’API dedicata: niente concatenazioni fragili sul className.',
      concepts: ['classList'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l2e3',
      title: 'Attributo e stile',
      prompt:
        'Imposta su `#app` l’attributo `data-vista` a `spese` e stampa il valore letto con getAttribute.',
      starterCode: `// seleziona #app, imposta l'attributo, stampalo`,
      check: { kind: 'output', lines: ['spese'] },
      hints: ['app.setAttribute(\'data-vista\', \'spese\')', 'console.log(app.getAttribute(\'data-vista\'))'],
      solution: `const app = document.querySelector('#app');

app.setAttribute('data-vista', 'spese');
console.log(app.getAttribute('data-vista'));`,
      explanation: 'Gli attributi data-* collegano il DOM alla logica senza inventare id.',
      concepts: ['attributi'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l2e4',
      title: 'Nascondi con una classe',
      prompt:
        'Aggiungi `nascosto` a `#messaggio` e poi rimuovila; stampa `false` con contains dopo la rimozione.',
      starterCode: `const p = document.querySelector('#messaggio');

// add, poi remove, poi contains`,
      objective: 'Preferire le classi agli stili inline per nascondere elementi.',
      check: { kind: 'output', lines: ['false'] },
      hints: ['classList.add(\'nascosto\')', 'classList.remove(\'nascosto\')'],
      solution: `const p = document.querySelector('#messaggio');

p.classList.add('nascosto');
p.classList.remove('nascosto');
console.log(p.classList.contains('nascosto'));`,
      explanation: 'Le classi si tolgono facilmente e il CSS resta centralizzato.',
      concepts: ['classList'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'innerHTML con dati utente',
      code: `const nome = '<img src=x onerror=alert(1)>';
document.querySelector('#messaggio').innerHTML = nome;`,
      error: `Il markup viene eseguito nel contesto della pagina (XSS)`,
      why: 'innerHTML interpreta tutto come HTML, compresi script e gestori di eventi: con input dell’utente è una vulnerabilità.',
      fix: `document.querySelector('#messaggio').textContent = nome;`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l2x1',
      prompt: 'Spiega la differenza tra textContent e innerHTML e quale usi con i dati dell’utente.',
      keywords: ['textcontent', 'innerhtml', 'html', 'testo', 'sicurezza', 'utente'],
      model:
        'textContent tratta il valore come testo puro: i caratteri speciali non vengono interpretati, quindi è sicuro. innerHTML interpreta la stringa come markup HTML e può eseguire script: con dati provenienti dall’utente è una vulnerabilità. Con i dati utente uso sempre textContent, e innerHTML solo con markup costruito internamente.',
      concepts: ['textContent'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l2q1',
      question: 'Quale proprietà è sicura con input dell’utente?',
      options: [
        ['innerHTML', 'Interpreta il markup: rischio XSS.'],
        ['textContent', 'Esatto: testo puro.'],
        ['outerHTML', 'Ancora più pericoloso: sostituisce l’elemento.'],
      ],
      correct: 1,
      explanation: 'textContent non interpreta HTML.',
      concepts: ['textContent'],
    }),
    quiz({
      id: 'w5l2q2',
      question: 'Come si aggiunge una classe senza toccare le altre?',
      options: [
        ['el.className = \'nuova\'', 'Sovrascrive tutte le classi esistenti.'],
        ['el.classList.add(\'nuova\')', 'Esatto.'],
        ['el.style.class = \'nuova\'', 'Non esiste una proprietà style.class.'],
      ],
      correct: 1,
      explanation: 'classList è pensato per aggiungere, togliere e alternare.',
      concepts: ['classList'],
    }),
    quiz({
      id: 'w5l2q3',
      question: 'Come si imposta un attributo personalizzato?',
      options: [
        ['el.setAttribute(\'data-x\', \'1\')', 'Esatto.'],
        ['el.dataX = 1', 'Aggiunge una proprietà JS, non un attributo del DOM.'],
        ['el.attribute(\'data-x\') = 1', 'Sintassi non valida.'],
      ],
      correct: 0,
      explanation: 'setAttribute aggiorna il DOM e la sua rappresentazione HTML.',
      concepts: ['attributi'],
    }),
  ],
  recap: {
    points: [
      'textContent per testo sicuro, innerHTML solo con markup fidato.',
      'classList.add/remove/toggle/contains.',
      'setAttribute e getAttribute per gli attributi.',
      'Preferisci classi a stili inline.',
    ],
    learned: 'Sai aggiornare l’interfaccia in base ai dati.',
    next: 'Creare e rimuovere elementi: liste dinamiche.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w5l3',
  title: 'Creare e rimuovere elementi',
  subtitle: 'createElement, appendChild, remove',
  minutes: 55,
  objectives: [
    'Creare un elemento con createElement',
    'Inserirlo nel DOM con append',
    'Rimuoverlo senza lasciare nodi orfani',
  ],
  concepts: ['createElement', 'appendChild', 'remove'],
  activate: [
    'Devi mostrare una lista di spese che cambia. Hai un HTML fisso o costruisci gli elementi dal dato?',
    'Con dati dinamici costruisci gli elementi in JavaScript: la lista cresce e si accorcia con i dati.',
  ],
  analogy:
    'createElement è costruire un mattone; append lo posa nel muro; remove lo stacca. Il DOM è vivo: ogni modifica si vede subito, senza ricaricare la pagina.',
  example: {
    code: `const lista = document.querySelector('#lista');

const nuovo = document.createElement('li');
nuovo.textContent = 'Uova';
lista.appendChild(nuovo);

console.log(lista.children.length);

const primo = lista.querySelector('li');
primo.remove();

console.log(lista.children.length);`,
    output: `3
2`,
  },
  formal:
    'document.createElement(\'tag\') crea un nodo non ancora inserito. appendChild/append lo inseriscono alla fine; prepend all’inizio; insertBefore in una posizione specifica. element.remove() rimuove il nodo dal DOM. children conta solo gli elementi (non i nodi testo); childNodes include anche i nodi testo. Creare elementi e impostare textContent prima di inserirli evita reflow inutili.',
  worked: {
    code: `const lista = document.querySelector('#lista');
const voci = document.querySelectorAll('#lista li');
console.log(voci.length);

const li = document.createElement('li');
li.textContent = 'Uova';
li.classList.add('voce');

lista.appendChild(li);
console.log(lista.children.length);

const tutte = lista.querySelectorAll('li');
tutte.forEach((voce) => {
  if (voce.textContent === 'Latte') {
    voce.remove();
  }
});

console.log(lista.children.length);`,
    output: `2
3
2`,
    steps: [
      ['document.createElement(\'li\')', 'Crea un elemento vuoto, non ancora visibile: esiste solo in memoria.'],
      ['li.textContent = \'Uova\';', 'Impostare il contenuto prima dell’inserimento è più efficiente.'],
      ['lista.appendChild(li);', 'Ora il nodo entra nel documento e diventa visibile.'],
      ['voce.remove();', 'Rimuove l’elemento dal DOM: non serve conoscere il genitore.'],
      ['console.log(lista.children.length);', 'children conta gli elementi figli rimasti: 2.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l3e1',
      title: 'Crea una voce',
      prompt: 'Crea un `li` con testo `Uova` e aggiungilo a `#lista`, poi stampa il numero di figli (`3`).',
      starterCode: `const lista = document.querySelector('#lista');
const li = document.createElement('li');
li.textContent = 'Uova';

console.log(lista.children.length);`,
      check: { kind: 'output', lines: ['3'] },
      hints: ['Manca l’inserimento nel DOM.', 'lista.appendChild(li);'],
      solution: `const lista = document.querySelector('#lista');
const li = document.createElement('li');
li.textContent = 'Uova';
lista.appendChild(li);
console.log(lista.children.length);`,
      explanation: 'Senza appendChild il nodo esiste in memoria ma non nel documento.',
      concepts: ['createElement', 'appendChild'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l3e2',
      title: 'Rimuovi una voce',
      prompt: 'Rimuovi la voce con testo `Latte` e stampa il numero di `li` rimasti (`1`).',
      starterCode: `const lista = document.querySelector('#lista');

// trova e rimuovi Latte
console.log(lista.querySelectorAll('li').length);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['Trova l’elemento con querySelectorAll e confronta textContent.', 'Poi chiama .remove() su quell’elemento.'],
      solution: `const lista = document.querySelector('#lista');

lista.querySelectorAll('li').forEach((li) => {
  if (li.textContent === 'Latte') li.remove();
});

console.log(lista.querySelectorAll('li').length);`,
      explanation: 'remove() stacca il nodo dal genitore senza doverlo selezionare.',
      concepts: ['remove'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l3e3',
      title: 'Lista da un array',
      prompt:
        'Con `const nomi = [\'Pane\', \'Latte\']`, svuota `#lista` e ricrea le voci, poi stampa `Pane,Latte`.',
      starterCode: `const nomi = ['Pane', 'Latte'];
const lista = document.querySelector('#lista');

// svuota e ricrea`,
      check: { kind: 'output', lines: ['Pane,Latte'] },
      hints: ['lista.replaceChildren() svuota.', 'Per ogni nome crea un li, impostane il testo e append.'],
      solution: `const nomi = ['Pane', 'Latte'];
const lista = document.querySelector('#lista');

lista.replaceChildren();
nomi.forEach((nome) => {
  const li = document.createElement('li');
  li.textContent = nome;
  lista.appendChild(li);
});

console.log([...lista.querySelectorAll('li')].map((li) => li.textContent).join(','));`,
      explanation: 'Il rendering da dati è il pattern fondamentale delle interfacce dinamiche.',
      concepts: ['createElement'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l3e4',
      title: 'Badge solo se serve',
      prompt:
        'Aggiungi a `#app` uno `span` con testo `Nuovo` solo se `const nuovo = true`. Stampa il testo dello span.',
      starterCode: `const nuovo = true;
const app = document.querySelector('#app');

// crea lo span solo se nuovo`,
      objective: 'Combinare condizioni e creazione di nodi: rendering condizionale.',
      check: { kind: 'output', lines: ['Nuovo'] },
      hints: ['Dentro un if, crea e appendi.', 'console.log(app.querySelector(\'span\').textContent)'],
      solution: `const nuovo = true;
const app = document.querySelector('#app');

if (nuovo) {
  const badge = document.createElement('span');
  badge.textContent = 'Nuovo';
  app.appendChild(badge);
}

console.log(app.querySelector('span').textContent);`,
      explanation: 'Il rendering condizionale evita elementi vuoti o segnaposto inutili.',
      concepts: ['createElement'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Nodo creato ma non inserito',
      code: `const li = document.createElement('li');
li.textContent = 'Uova';
console.log(document.querySelector('#lista').children.length);`,
      error: `2 (la nuova voce non esiste nel documento)`,
      why: 'createElement costruisce il nodo in memoria: senza append non fa parte del DOM.',
      fix: `document.querySelector('#lista').appendChild(li);`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l3x1',
      prompt: 'Descrivi i passaggi per aggiungere una voce a una lista partendo dai dati.',
      keywords: ['createelement', 'append', 'testo', 'nodo', 'lista', 'dom'],
      model:
        'Creo l’elemento con createElement, imposto il contenuto con textContent e solo dopo lo inserisco con appendChild nel contenitore. Ripeto per ogni dato, così la lista riflette l’array. Se devo svuotarla, uso replaceChildren o rimuovo i figli esistenti prima di ricrearla.',
      concepts: ['createElement'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l3q1',
      question: 'Cosa restituisce createElement?',
      options: [
        ['Un nodo già inserito nel documento', 'Non è inserito finché non lo appendi.'],
        ['Un nodo in memoria da inserire', 'Esatto.'],
        ['Una stringa HTML', 'Quella la produce innerHTML, non createElement.'],
      ],
      correct: 1,
      explanation: 'Il nodo esiste ma non è nel DOM finché non lo inserisci.',
      concepts: ['createElement'],
    }),
    quiz({
      id: 'w5l3q2',
      question: 'Quale metodo svuota un contenitore in modo pulito?',
      options: [
        ['replaceChildren()', 'Esatto: rimuove tutti i figli.'],
        ['innerHTML = \'\'', 'Funziona, ma è meno esplicito e può interrompere riferimenti.'],
        ['remove()', 'remove toglie il contenitore stesso, non i figli.'],
      ],
      correct: 0,
      explanation: 'replaceChildren() è il modo moderno per svuotare o sostituire i figli.',
      concepts: ['remove'],
    }),
    quiz({
      id: 'w5l3q3',
      question: 'Perché impostare textContent prima di append è preferibile?',
      options: [
        ['Perché evita lavoro di layout inutile', 'Esatto: meno reflow.'],
        ['Perché altrimenti non funziona', 'Funziona anche dopo.'],
        ['Perché textContent cancella gli eventi', 'Non c’entra.'],
      ],
      correct: 0,
      explanation: 'Costruire fuori dal documento e inserire una volta sola è più efficiente.',
      concepts: ['appendChild'],
    }),
  ],
  recap: {
    points: [
      'createElement crea un nodo in memoria.',
      'appendChild/append lo inseriscono nel DOM.',
      'remove() stacca il nodo.',
      'replaceChildren() svuota un contenitore.',
    ],
    learned: 'Sai generare interfacce a partire dai dati.',
    next: 'Navigare l’albero: genitori, figli e fratelli.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w5l4',
  title: 'Navigare il DOM',
  subtitle: 'parentElement, children, siblings',
  minutes: 45,
  objectives: [
    'Risalire al genitore di un elemento',
    'Scorrere i figli e i fratelli',
    'Evitare i nodi testo quando lavori con gli elementi',
  ],
  concepts: ['parentElement', 'children', 'sibling'],
  activate: [
    'Da un pulsante dentro una voce di lista, come trovi l’intera voce per modificarla?',
    'Risalendo al genitore con parentElement, invece di costruire selettori fragili.',
  ],
  analogy:
    'Il DOM è un albero genealogico: ogni nodo ha un genitore, dei figli e dei fratelli. Navigare significa spostarsi tra parenti invece di cercare per nome dalla radice.',
  example: {
    code: `const primo = document.querySelector('#lista li');

console.log(primo.parentElement.id);
console.log(primo.parentElement.children.length);
console.log(primo.nextElementSibling.textContent);
console.log(primo.previousElementSibling);

const lista = document.querySelector('#lista');
console.log([...lista.children].map((li) => li.textContent).join(','));`,
    output: `lista
2
Latte
null
Pane,Latte`,
  },
  formal:
    'parentElement restituisce il genitore elemento (parentNode può essere un nodo non elemento). children è una collezione HTMLCollection dei figli elemento; childNodes include nodi testo e commenti. firstElementChild/nextElementSibling/previousElementSibling/lastElementChild navigano solo tra elementi. HTMLCollection non ha forEach: convertila con Array.from o [...].',
  worked: {
    code: `const lista = document.querySelector('#lista');
const voci = Array.from(lista.children);

voci.forEach((voce, indice) => {
  const numero = document.createElement('span');
  numero.textContent = indice + 1 + '. ';
  voce.prepend(numero);
});

console.log(voci[0].textContent);
console.log(voci[1].parentElement.id);
console.log(voci[1].previousElementSibling.textContent);`,
    output: `1. Pane
lista
1. Pane`,
    steps: [
      ['Array.from(lista.children)', 'children non ha forEach: la conversione ad array abilita i metodi.'],
      ['voce.prepend(numero)', 'Inserisce il numero all’inizio della voce.'],
      ['voci[0].textContent', 'Ora il testo include il numero appena aggiunto.'],
      ['voci[1].parentElement.id', 'Risalire al genitore è più robusto di un selettore assoluto.'],
      ['previousElementSibling', 'Il fratello precedente è la prima voce, già numerata.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l4e1',
      title: 'Trova il genitore',
      prompt: 'Stampa l’id del genitore della prima voce (`lista`).',
      starterCode: `const voce = document.querySelector('#lista li');

console.log(voce..id);`,
      check: { kind: 'output', lines: ['lista'] },
      hints: ['La proprietà del genitore elemento è parentElement.', 'voce.parentElement.id'],
      solution: `const voce = document.querySelector('#lista li');
console.log(voce.parentElement.id);`,
      explanation: 'parentElement risale di un livello nell’albero.',
      concepts: ['parentElement'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l4e2',
      title: 'Fratello successivo',
      prompt: 'Stampa il testo del fratello successivo della prima voce (`Latte`).',
      starterCode: `const voce = document.querySelector('#lista li');

// nextElementSibling
console.log();`,
      check: { kind: 'output', lines: ['Latte'] },
      hints: ['nextElementSibling salta i nodi non elemento.', 'voce.nextElementSibling.textContent'],
      solution: `const voce = document.querySelector('#lista li');
console.log(voce.nextElementSibling.textContent);`,
      explanation: 'nextElementSibling considera solo elementi, non spazi o commenti.',
      concepts: ['sibling'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l4e3',
      title: 'Testi dei figli',
      prompt: 'Stampa i testi dei figli di `#lista` separati da virgola: `Pane,Latte`.',
      starterCode: `const lista = document.querySelector('#lista');

// children -> array -> map -> join`,
      check: { kind: 'output', lines: ['Pane,Latte'] },
      hints: ['HTMLCollection non ha map: usa Array.from o lo spread.', '[...lista.children].map(li => li.textContent).join(\',\')'],
      solution: `const lista = document.querySelector('#lista');

console.log([...lista.children].map((li) => li.textContent).join(','));`,
      explanation: 'La conversione ad array è il ponte tra DOM e pipeline.',
      concepts: ['children'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l4e4',
      title: 'Ultimo figlio',
      prompt: 'Stampa il testo dell’ultimo figlio di `#lista` (`Latte`), senza usare indici numerici.',
      starterCode: `const lista = document.querySelector('#lista');

// lastElementChild`,
      objective: 'Usare l’API semantica invece degli indici fragili.',
      check: { kind: 'output', lines: ['Latte'] },
      hints: ['lastElementChild restituisce l’ultimo elemento figlio.', 'console.log(lista.lastElementChild.textContent)'],
      solution: `const lista = document.querySelector('#lista');
console.log(lista.lastElementChild.textContent);`,
      explanation: 'Le proprietà semantiche restano corrette anche quando la lista cambia lunghezza.',
      concepts: ['children'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'childNodes include i nodi testo',
      code: `const lista = document.querySelector('#lista');
console.log(lista.childNodes.length);
console.log(lista.children.length);`,
      error: `5
2`,
      why: 'Il markup indentato crea nodi testo tra gli elementi: childNodes li conta, children no.',
      fix: `console.log(lista.children.length);`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l4x1',
      prompt: 'Spiega la differenza tra children e childNodes e quando usi l’uno o l’altro.',
      keywords: ['children', 'childnodes', 'testo', 'element', 'figli', 'dom'],
      model:
        'children contiene solo gli elementi figli, mentre childNodes include anche nodi testo e commenti. Quando lavoro con la struttura della pagina uso quasi sempre children, perché i nodi testo dovuti all’indentazione non mi interessano e falserebbero i conteggi. Uso childNodes solo se devo esaminare il contenuto testuale grezzo.',
      concepts: ['children'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l4q1',
      question: 'Quale proprietà risale al genitore elemento?',
      options: [
        ['parentElement', 'Esatto.'],
        ['parentNode', 'Funziona, ma può restituire anche nodi non elemento.'],
        ['ownerDocument', 'Restituisce il documento, non il genitore.'],
      ],
      correct: 0,
      explanation: 'parentElement garantisce che il risultato sia un elemento o null.',
      concepts: ['parentElement'],
    }),
    quiz({
      id: 'w5l4q2',
      question: 'Perché `lista.children.map(...)` può fallire?',
      options: [
        ['Perché children è una HTMLCollection senza map', 'Esatto: serve Array.from o spread.'],
        ['Perché children è un array e map esiste', 'Non è un array.'],
        ['Perché manca il return', 'Il problema è il metodo mancante.'],
      ],
      correct: 0,
      explanation: 'HTMLCollection e NodeList non sono array.',
      concepts: ['children'],
    }),
    quiz({
      id: 'w5l4q3',
      question: 'Cosa restituisce `primo.previousElementSibling` se non esiste?',
      options: [
        ['undefined', 'Restituisce null.'],
        ['null', 'Esatto.'],
        ['Errore', 'Nessun errore: null è il valore previsto.'],
      ],
      correct: 1,
      explanation: 'Le navigazioni DOM restituiscono null quando non c’è un nodo.',
      concepts: ['sibling'],
    }),
  ],
  recap: {
    points: [
      'parentElement risale, children scende.',
      'nextElementSibling e previousElementSibling per i fratelli.',
      'children conta solo elementi, childNodes anche il testo.',
      'HTMLCollection va convertita per usare map.',
    ],
    learned: 'Sai muoverti nell’albero del DOM con proprietà semantiche.',
    next: 'DocumentFragment: costruire molto DOM senza penalizzare la pagina.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w5l5',
  title: 'DocumentFragment e performance',
  subtitle: 'Un solo inserimento invece di cento',
  minutes: 50,
  objectives: [
    'Usare DocumentFragment per costruire blocchi',
    'Capire cos’è un reflow',
    'Misurare l’impatto di una strategia',
  ],
  concepts: ['DocumentFragment', 'reflow', 'performance DOM'],
  activate: [
    'Per aggiungere 100 voci, faresti 100 appendChild sul documento o costruiresti tutto fuori e inseriresti una volta?',
    'Costruire fuori e inserire una volta evita 100 ricalcoli di layout.',
  ],
  analogy:
    'Il DocumentFragment è una scatola di montaggio: prepari tutti i pezzi fuori dalla pagina e poi la svuoti nel DOM in un gesto solo. Ogni modifica al documento visibile costa un ricalcolo del layout.',
  example: {
    code: `const lista = document.querySelector('#lista');
const fragment = document.createDocumentFragment();

['Uova', 'Burro'].forEach((nome) => {
  const li = document.createElement('li');
  li.textContent = nome;
  fragment.appendChild(li);
});

lista.appendChild(fragment);
console.log(lista.children.length);`,
    output: `4`,
  },
  formal:
    'document.createDocumentFragment() crea un contenitore leggero, non parte del documento. I figli aggiunti al fragment non provocano reflow; quando il fragment viene inserito, i suoi figli passano al nodo di destinazione. Il fragment si svuota dopo l’inserimento. Alternativa moderna: costruire una stringa HTML e assegnarla a innerHTML (solo con dati sicuri) o usare replaceChildren con nodi già creati.',
  worked: {
    code: `const lista = document.querySelector('#lista');
lista.replaceChildren();

const nomi = ['Pane', 'Latte', 'Uova'];
const fragment = document.createDocumentFragment();

nomi.forEach((nome) => {
  const li = document.createElement('li');
  li.textContent = nome;
  fragment.appendChild(li);
});

const inizio = performance.now();
lista.appendChild(fragment);
const tempo = performance.now() - inizio;

console.log(lista.children.length);
console.log(tempo >= 0);`,
    output: `3
true`,
    steps: [
      ['lista.replaceChildren();', 'Partenza pulita: nessun residuo del fixture.'],
      ['createDocumentFragment()', 'Contenitore fuori dal documento.'],
      ['fragment.appendChild(li)', 'Nessun reflow: il fragment non è visibile.'],
      ['lista.appendChild(fragment)', 'Un solo inserimento: i tre figli compaiono insieme.'],
      ['performance.now()', 'Misura il costo: su tre elementi è trascurabile, il pattern conta su liste grandi.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l5e1',
      title: 'Crea un fragment',
      prompt: 'Crea un DocumentFragment e stampa `true` verificando che esista.',
      starterCode: `const fragment = document.();
console.log(Boolean(fragment));`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['Il metodo è createDocumentFragment.', 'document.createDocumentFragment()'],
      solution: `const fragment = document.createDocumentFragment();
console.log(Boolean(fragment));`,
      explanation: 'Il fragment è un nodo leggero, utile solo come contenitore temporaneo.',
      concepts: ['DocumentFragment'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l5e2',
      title: 'Due voci in un colpo',
      prompt:
        'Svuota `#lista`, aggiungi `Pane` e `Latte` a un fragment e inseriscilo. Stampa `2`.',
      starterCode: `const lista = document.querySelector('#lista');
lista.replaceChildren();
const fragment = document.createDocumentFragment();

// crea due li e appendili al fragment
console.log(lista.children.length);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Crea li con textContent e append al fragment.', 'Infine lista.appendChild(fragment).'],
      solution: `const lista = document.querySelector('#lista');
lista.replaceChildren();
const fragment = document.createDocumentFragment();

['Pane', 'Latte'].forEach((nome) => {
  const li = document.createElement('li');
  li.textContent = nome;
  fragment.appendChild(li);
});

lista.appendChild(fragment);
console.log(lista.children.length);`,
      explanation: 'Il fragment trasferisce i figli al contenitore in un’unica operazione.',
      concepts: ['DocumentFragment'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l5e3',
      title: 'Da dati a lista',
      prompt:
        'Con `const dati = [\'A\', \'B\', \'C\']`, svuota `#lista` e ricostruiscila con un fragment. Stampa il testo unito (`A|B|C`).',
      starterCode: `const dati = ['A', 'B', 'C'];
const lista = document.querySelector('#lista');

// fragment + replace + join`,
      check: { kind: 'output', lines: ['A|B|C'] },
      hints: ['Svuota con replaceChildren o assegna il fragment a replaceChildren.', 'replaceChildren(fragment) sostituisce tutto.'],
      solution: `const dati = ['A', 'B', 'C'];
const lista = document.querySelector('#lista');
lista.replaceChildren();

const fragment = document.createDocumentFragment();
dati.forEach((valore) => {
  const li = document.createElement('li');
  li.textContent = valore;
  fragment.appendChild(li);
});

lista.appendChild(fragment);
console.log([...lista.children].map((li) => li.textContent).join('|'));`,
      explanation: 'Il rendering da dati è sempre lo stesso schema: crea, riempi, inserisci.',
      concepts: ['DocumentFragment'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l5e4',
      title: 'Misura due strategie',
      prompt:
        'Misura con performance.now() il tempo per creare 200 `li` in un fragment e inserirli, poi stampa `true` se il tempo è un numero finito.',
      starterCode: `const lista = document.querySelector('#lista');
lista.replaceChildren();

// misurazione con performance.now()
console.log();`,
      objective: 'Imparare a misurare prima di ottimizzare.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['Salva const inizio = performance.now() prima del lavoro.', 'Alla fine: Number.isFinite(performance.now() - inizio).'],
      solution: `const lista = document.querySelector('#lista');
lista.replaceChildren();

const inizio = performance.now();
const fragment = document.createDocumentFragment();
for (let i = 0; i < 200; i++) {
  const li = document.createElement('li');
  li.textContent = 'Voce ' + i;
  fragment.appendChild(li);
}
lista.appendChild(fragment);

console.log(Number.isFinite(performance.now() - inizio));`,
      explanation: 'La misurazione è il punto di partenza: senza numeri, l’ottimizzazione è un’ipotesi.',
      concepts: ['performance DOM'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Cento reflow',
      code: `for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  document.querySelector('#lista').appendChild(li);
}`,
      error: `Funziona, ma può causare layout ripetuti e interfaccia a scatti`,
      why: 'Ogni append su un nodo visibile può forzare un ricalcolo del layout: cento operazioni separate costano più di una.',
      fix: `const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  fragment.appendChild(li);
}
document.querySelector('#lista').appendChild(fragment);`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l5x1',
      prompt: 'Spiega cos’è un reflow e come DocumentFragment riduce il lavoro del browser.',
      keywords: ['reflow', 'fragment', 'layout', 'browser', 'inseriment', 'performance'],
      model:
        'Il reflow è il ricalcolo del layout che il browser fa quando il DOM visibile cambia. Ogni modifica separata può provocarne uno. Con DocumentFragment costruisco i nodi fuori dal documento, dove non c’è layout da ricalcolare, e li inserisco in un’unica operazione: il browser fa un solo aggiornamento invece di molti.',
      concepts: ['reflow', 'DocumentFragment'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l5q1',
      question: 'Un DocumentFragment è visibile nel documento?',
      options: [
        ['Sì, appena creato', 'Esiste solo in memoria.'],
        ['No, finché non lo inserisci', 'Esatto.'],
        ['Solo se ha figli', 'Non è visibile comunque.'],
      ],
      correct: 1,
      explanation: 'Il fragment è un contenitore temporaneo fuori dal documento.',
      concepts: ['DocumentFragment'],
    }),
    quiz({
      id: 'w5l5q2',
      question: 'Cosa succede ai figli del fragment dopo appendChild(fragment)?',
      options: [
        ['Vengono copiati', 'Vengono trasferiti.'],
        ['Vengono trasferiti nel contenitore e il fragment resta vuoto', 'Esatto.'],
        ['Restano anche nel fragment', 'Il fragment si svuota.'],
      ],
      correct: 1,
      explanation: 'I nodi si spostano, non si duplicano.',
      concepts: ['DocumentFragment'],
    }),
    quiz({
      id: 'w5l5q3',
      question: 'Perché misurare prima di ottimizzare?',
      options: [
        ['Perché le ottimizzazioni possono complicare il codice senza benefici reali', 'Esatto.'],
        ['Perché performance.now() è obbligatorio', 'Non è obbligatorio.'],
        ['Perché il browser lo richiede', 'Non è una richiesta del browser.'],
      ],
      correct: 0,
      explanation: 'Senza misura, si ottimizza l’impressione, non il problema.',
      concepts: ['performance DOM'],
    }),
  ],
  recap: {
    points: [
      'DocumentFragment è un contenitore fuori dal documento.',
      'Un solo inserimento = un solo aggiornamento di layout.',
      'I figli del fragment vengono trasferiti.',
      'Misura con performance.now() prima di ottimizzare.',
    ],
    learned: 'Sai costruire liste grandi senza rallentare l’interfaccia.',
    next: 'Organizzare il codice DOM in moduli e componenti.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w5l6',
  title: 'Moduli e componenti DOM',
  subtitle: 'IIFE, stato locale e API esplicite',
  minutes: 55,
  objectives: [
    'Incapsulare un componente con una IIFE',
    'Esporre solo i metodi necessari',
    'Evitare variabili globali che collidono',
  ],
  concepts: ['IIFE', 'componenti', 'incapsulamento'],
  activate: [
    'Due componenti della pagina usano entrambi una variabile `lista`. Cosa succede se vivono nello scope globale?',
    'Si sovrascrivono. Incapsulare ogni componente nel proprio scope evita collisioni.',
  ],
  analogy:
    'Un componente è un elettrodomestico con una spina: usi i suoi pulsanti (API pubblica) senza aprire il motore. La IIFE è il guscio che nasconde i fili interni.',
  example: {
    code: `const Contatore = (() => {
  let valore = 0;
  const output = document.querySelector('#app');

  function render() {
    output.textContent = 'Valore: ' + valore;
  }

  return {
    incrementa() {
      valore += 1;
      render();
    },
    get valore() {
      return valore;
    },
  };
})();

Contatore.incrementa();
console.log(Contatore.valore);
console.log(document.querySelector('#app').textContent);`,
    output: `1
Valore: 1`,
  },
  formal:
    'Una IIFE (Immediately Invoked Function Expression) crea uno scope privato ed esegue subito il codice. Restituendo un oggetto con metodi si espone un’API controllata, mentre lo stato resta inaccessibile. È il pattern dei moduli prima di ES modules (Settimana 8). I componenti DOM seguono lo schema: init, render, eventi, distruzione.',
  worked: {
    code: `const ListaSpese = (() => {
  const container = document.querySelector('#lista');
  let spese = [];

  function render() {
    container.replaceChildren();
    spese.forEach((spesa) => {
      const li = document.createElement('li');
      li.textContent = spesa.descrizione + ' — ' + spesa.importo + ' €';
      container.appendChild(li);
    });
  }

  return {
    aggiungi(spesa) {
      spese.push(spesa);
      render();
    },
    totale() {
      return spese.reduce((acc, s) => acc + s.importo, 0);
    },
  };
})();

ListaSpese.aggiungi({ descrizione: 'Libro', importo: 18 });
ListaSpese.aggiungi({ descrizione: 'Pane', importo: 3 });

console.log(containerText());
function containerText() {
  return [...document.querySelector('#lista').children].map((li) => li.textContent).join(' | ');
}
console.log(ListaSpese.totale());`,
    output: `Libro — 18 € | Pane — 3 €
21`,
    steps: [
      ['const ListaSpese = (() => {', 'Scope privato: container e spese non sono globali.'],
      ['let spese = [];', 'Stato interno, modificabile solo dai metodi esposti.'],
      ['function render() {', 'Un’unica funzione ridisegna la lista: nessuna duplicazione.'],
      ['return { aggiungi, totale };', 'API pubblica minima: il resto è invisibile.'],
      ['ListaSpese.aggiungi(...)', 'Il chiamante non tocca lo stato direttamente: passa sempre dai metodi.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l6e1',
      title: 'IIFE',
      prompt: 'Completa la IIFE perché restituisca `42` e stampalo.',
      starterCode: `const modulo = (() => {
  const valore = 42;
  return { get valore() { return valore; } };
});

console.log(modulo.valore);`,
      check: { kind: 'output', lines: ['42'] },
      hints: ['Manca l’invocazione immediata: (() => { ... })()', 'Aggiungi () dopo la parentesi di chiusura.'],
      solution: `const modulo = (() => {
  const valore = 42;
  return { get valore() { return valore; } };
})();

console.log(modulo.valore);`,
      explanation: 'Senza () la funzione non viene eseguita e modulo sarebbe la funzione stessa.',
      concepts: ['IIFE'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l6e2',
      title: 'Stato privato',
      prompt:
        'Completa il componente perché `incrementa()` aggiorni il testo di `#app` e stampi `1` dopo una chiamata.',
      starterCode: `const Counter = (() => {
  let n = 0;
  const out = document.querySelector('#app');

  return {
    incrementa() {
      // aggiorna n e il testo
    },
    get valore() { return n; },
  };
})();

Counter.incrementa();
console.log(Counter.valore);`,
      check: { kind: 'output', lines: ['1'] },
      hints: ['n += 1; poi out.textContent = String(n);', 'Il getter restituisce n privato.'],
      solution: `const Counter = (() => {
  let n = 0;
  const out = document.querySelector('#app');

  return {
    incrementa() {
      n += 1;
      out.textContent = String(n);
    },
    get valore() { return n; },
  };
})();

Counter.incrementa();
console.log(Counter.valore);`,
      explanation: 'Lo stato resta privato, il getter permette la lettura senza esporre la variabile.',
      concepts: ['componenti'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l6e3',
      title: 'API esplicita',
      prompt:
        'Crea un componente `Badge` con metodo `set(testo)` che imposta il contenuto di `#app`, poi impostalo a `Nuovo` e stampa il testo.',
      starterCode: `// IIFE + API`,
      check: { kind: 'output', lines: ['Nuovo'] },
      hints: ['Il metodo set riceve il testo e lo assegna a out.textContent.', 'Restituisci { set }.'],
      solution: `const Badge = (() => {
  const out = document.querySelector('#app');
  return {
    set(testo) {
      out.textContent = testo;
    },
  };
})();

Badge.set('Nuovo');
console.log(document.querySelector('#app').textContent);`,
      explanation: 'API piccola e centrata: il componente nasconde come, espone cosa.',
      concepts: ['componenti'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l6e4',
      title: 'Render da stato',
      prompt:
        'Componente `Lista` con `imposta(nomi)`: svuota `#lista` e ricrea le voci. Con `[\'A\',\'B\']` stampa `A-B`.',
      starterCode: `// IIFE con imposta(nomi)`,
      objective: 'Combinare componente, stato e rendering da dati.',
      check: { kind: 'output', lines: ['A-B'] },
      hints: ['Dentro imposta: replaceChildren, poi crea i li.', 'Esponi solo imposta.'],
      solution: `const Lista = (() => {
  const container = document.querySelector('#lista');
  return {
    imposta(nomi) {
      container.replaceChildren();
      nomi.forEach((nome) => {
        const li = document.createElement('li');
        li.textContent = nome;
        container.appendChild(li);
      });
    },
  };
})();

Lista.imposta(['A', 'B']);
console.log([...document.querySelector('#lista').children].map((li) => li.textContent).join('-'));`,
      explanation: 'Il componente riceve dati, non tocca variabili globali: è riutilizzabile.',
      concepts: ['componenti'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Scope globale condiviso',
      code: `let lista = document.querySelector('#lista');
let lista = document.querySelector('#app');`,
      error: `SyntaxError: Identifier 'lista' has already been declared`,
      why: 'Due dichiarazioni let con lo stesso nome nello stesso scope collidono.',
      fix: `const ListaSpese = (() => {
  const lista = document.querySelector('#lista');
  // ...
})();`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l6x1',
      prompt: 'Spiega cos’è una IIFE e perché aiuta a scrivere componenti DOM senza collisioni.',
      keywords: ['iife', 'scope', 'privat', 'api', 'collision', 'component'],
      model:
        'Una IIFE è una funzione eseguita immediatamente che crea uno scope privato. Le variabili dichiarate dentro non sono globali, quindi due componenti non possono sovrascriversi. Restituendo un oggetto con pochi metodi espongo un’API controllata: chi usa il componente non può modificare lo stato interno direttamente.',
      concepts: ['IIFE'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l6q1',
      question: 'Perché una IIFE evita collisioni di nomi?',
      options: [
        ['Perché crea uno scope privato', 'Esatto.'],
        ['Perché rinomina le variabili', 'Non rinomina nulla.'],
        ['Perché usa strict mode', 'Strict mode non evita le collisioni di nome.'],
      ],
      correct: 0,
      explanation: 'Le dichiarazioni vivono nello scope della funzione, non in quello globale.',
      concepts: ['IIFE'],
    }),
    quiz({
      id: 'w5l6q2',
      question: 'Cosa espone un componente ben progettato?',
      options: [
        ['Tutte le sue variabili interne', 'Sarebbe inutile incapsulare.'],
        ['Un piccolo insieme di metodi', 'Esatto.'],
        ['Nulla', 'Serve almeno un punto di accesso.'],
      ],
      correct: 1,
      explanation: 'API minima: chi usa il componente non dipende dai dettagli interni.',
      concepts: ['componenti'],
    }),
    quiz({
      id: 'w5l6q3',
      question: 'Cosa succede senza le parentesi finali in `const m = (() => {...})`?',
      options: [
        ['Si esegue comunque', 'Non si esegue: manca l’invocazione.'],
        ['m è la funzione stessa', 'Esatto.'],
        ['Errore di sintassi', 'Sintassi valida, ma non è una IIFE.'],
      ],
      correct: 1,
      explanation: 'Le () finali eseguono la funzione.',
      concepts: ['IIFE'],
    }),
  ],
  recap: {
    points: [
      'La IIFE crea uno scope privato ed esegue subito.',
      'Espone un’API minima.',
      'Lo stato è raggiungibile solo dai metodi.',
      'init, render, eventi: struttura dei componenti DOM.',
    ],
    learned: 'Sai organizzare il codice della pagina in componenti isolati.',
    next: 'Ripasso e progetto: il quaderno si mostra in HTML.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w5l7',
  title: 'Ripasso e progetto',
  subtitle: 'Renderizzare il Quaderno delle spese in HTML',
  minutes: 60,
  objectives: [
    'Trasformare lo stato in DOM',
    'Ricalcolare i totali dopo ogni modifica',
    'Gestire il caso lista vuota',
  ],
  concepts: ['ripasso', 'progetto', 'rendering'],
  activate: [
    'Senza guardare: qual è la differenza tra append e replaceChildren?',
    'append aggiunge, replaceChildren sostituisce tutti i figli. Nel rendering da stato serve quasi sempre il secondo.',
  ],
  analogy:
    'Il rendering è una fotografia dello stato: ogni volta che lo stato cambia, scatti una nuova fotografia. Non modifichi pixel a mano: ridisegni da zero, in modo prevedibile.',
  example: {
    code: `const spese = [
  { descrizione: 'Libro', importo: 18 },
  { descrizione: 'Pranzo', importo: 12 },
];

const lista = document.querySelector('#lista');
lista.replaceChildren();

spese.forEach((spesa) => {
  const li = document.createElement('li');
  li.textContent = spesa.descrizione + ' — ' + spesa.importo + ' €';
  lista.appendChild(li);
});

const totale = spese.reduce((acc, s) => acc + s.importo, 0);
document.querySelector('#app').textContent = 'Totale: ' + totale.toFixed(2) + ' €';

console.log(lista.children.length);
console.log(document.querySelector('#app').textContent);`,
    output: `2
Totale: 30.00 €`,
  },
  formal:
    'Il rendering da stato segue tre passi: calcola i dati derivati (totale), pulisci il contenitore, ricrea i nodi. Il contenitore dei totali è separato dalla lista, così non vengono cancellati a vicenda. Se lo stato è vuoto, mostra un messaggio esplicito invece di una lista invisibile. La funzione render può essere chiamata dopo ogni mutazione senza effetti collaterali.',
  worked: {
    code: `const spese = [];
const lista = document.querySelector('#lista');
const riepilogo = document.querySelector('#app');

function render() {
  lista.replaceChildren();

  if (spese.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nessuna spesa registrata';
    lista.appendChild(li);
  } else {
    spese.forEach((spesa) => {
      const li = document.createElement('li');
      li.textContent = spesa.descrizione + ' — ' + spesa.importo.toFixed(2) + ' €';
      lista.appendChild(li);
    });
  }

  const totale = spese.reduce((acc, s) => acc + s.importo, 0);
  riepilogo.textContent = 'Totale: ' + totale.toFixed(2) + ' €';
}

render();
console.log(lista.textContent);
console.log(riepilogo.textContent);

spese.push({ descrizione: 'Pane', importo: 3 });
render();
console.log(lista.children.length);`,
    output: `Nessuna spesa registrata
Totale: 0.00 €
1`,
    steps: [
      ['const spese = [];', 'Lo stato è la fonte di verità: il DOM è una sua proiezione.'],
      ['if (spese.length === 0)', 'Lo stato vuoto ha un messaggio esplicito: l’utente non vede un vuoto inspiegabile.'],
      ['spese.forEach(...)', 'Per ogni spesa crea un nodo: il DOM riflette l’array.'],
      ['const totale = ...', 'I dati derivati si calcolano nel render, non si duplicano nello stato.'],
      ['render() dopo push', 'Ogni mutazione seguita da render tiene interfaccia e dati allineati.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l7e1',
      title: 'Rendering di base',
      prompt: 'Svuota `#lista` e aggiungi una voce per ogni spesa. Stampa `2`.',
      starterCode: `const spese = [{ descrizione: 'Libro', importo: 18 }, { descrizione: 'Pane', importo: 3 }];
const lista = document.querySelector('#lista');

lista.();
spese.forEach((spesa) => {
  const li = document.createElement('li');
  li.textContent = spesa.descrizione;
  lista.appendChild(li);
});

console.log(lista.children.length);`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['Per svuotare: replaceChildren() senza argomenti.', 'Poi append di ogni nuovo nodo.'],
      solution: `const spese = [{ descrizione: 'Libro', importo: 18 }, { descrizione: 'Pane', importo: 3 }];
const lista = document.querySelector('#lista');

lista.replaceChildren();
spese.forEach((spesa) => {
  const li = document.createElement('li');
  li.textContent = spesa.descrizione;
  lista.appendChild(li);
});

console.log(lista.children.length);`,
      explanation: 'Svuotare prima evita duplicati quando il render viene chiamato più volte.',
      concepts: ['rendering'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l7e2',
      title: 'Totale formattato',
      prompt: 'Calcola il totale e scrivilo in `#app`: deve stampare `Totale: 30.00 €`.',
      starterCode: `const spese = [{ importo: 18 }, { importo: 12 }];

const totale = spese.reduce((acc, s) => acc + s.importo, 0);
document.querySelector('#app').textContent = 'Totale: ' + ;

console.log(document.querySelector('#app').textContent);`,
      check: { kind: 'output', lines: ['Totale: 30.00 €'] },
      hints: ['Formatta con toFixed(2).', 'Aggiungi la stringa \' €\' dopo il numero.'],
      solution: `const spese = [{ importo: 18 }, { importo: 12 }];

const totale = spese.reduce((acc, s) => acc + s.importo, 0);
document.querySelector('#app').textContent = 'Totale: ' + totale.toFixed(2) + ' €';

console.log(document.querySelector('#app').textContent);`,
      explanation: 'Formattare solo al momento di mostrare: i calcoli restano numerici.',
      concepts: ['rendering'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l7e3',
      title: 'Stato vuoto',
      prompt:
        'Con `const spese = []`, mostra in `#lista` la voce `Nessuna spesa` e stampala.',
      starterCode: `const spese = [];
const lista = document.querySelector('#lista');

// gestisci il caso vuoto`,
      check: { kind: 'output', lines: ['Nessuna spesa'] },
      hints: ['Controlla spese.length === 0.', 'Crea un li con il messaggio.'],
      solution: `const spese = [];
const lista = document.querySelector('#lista');

lista.replaceChildren();
if (spese.length === 0) {
  const li = document.createElement('li');
  li.textContent = 'Nessuna spesa';
  lista.appendChild(li);
}

console.log(lista.textContent);`,
      explanation: 'Lo stato vuoto è uno stato come gli altri: va progettato, non ignorato.',
      concepts: ['rendering'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l7e4',
      title: 'Render funzione',
      prompt:
        'Scrivi `render(spese)` che scrive in `#lista` una voce per spesa e in `#app` il totale. Con due spese (10, 20) stampa `2` e `30`.',
      starterCode: `function render(spese) {
  // aggiorna lista e totale
}

render([{ importo: 10 }, { importo: 20 }]);
console.log(document.querySelector('#lista').children.length);
console.log(document.querySelector('#app').textContent);`,
      objective: 'Separare stato e rendering in una funzione riutilizzabile.',
      check: { kind: 'output', lines: ['2', '30'] },
      hints: ['Dentro render, svuota la lista e ricrea i li.', 'Il totale va scritto senza formattazione qui: String(30).'],
      solution: `function render(spese) {
  const lista = document.querySelector('#lista');
  lista.replaceChildren();
  spese.forEach((spesa) => {
    const li = document.createElement('li');
    li.textContent = String(spesa.importo);
    lista.appendChild(li);
  });
  const totale = spese.reduce((acc, s) => acc + s.importo, 0);
  document.querySelector('#app').textContent = String(totale);
}

render([{ importo: 10 }, { importo: 20 }]);
console.log(document.querySelector('#lista').children.length);
console.log(document.querySelector('#app').textContent);`,
      explanation: 'Una funzione di render prende i dati e produce DOM: è il precursore di un componente React.',
      concepts: ['rendering'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Append senza pulire',
      code: `function render(spese) {
  const lista = document.querySelector('#lista');
  spese.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s.descrizione;
    lista.appendChild(li);
  });
}
render(spese);
render(spese);`,
      error: `Ogni voce compare due volte`,
      why: 'Il render aggiunge senza svuotare: chiamato due volte duplica il contenuto.',
      fix: `lista.replaceChildren();
// poi append`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l7x1',
      prompt: 'Spiega perché il DOM dovrebbe essere una proiezione dello stato e non la fonte di verità.',
      keywords: ['stato', 'dom', 'render', 'proiezion', 'verità', 'sincron'],
      model:
        'Se lo stato vive nei dati e il DOM viene ridisegnato da quei dati, non ci sono due versioni della verità da tenere allineate. Quando lo stato cambia chiamo render e il DOM torna coerente. Se invece leggo lo stato dal DOM, ogni modifica manuale può divergere dai dati e creare bug difficili da ricostruire.',
      concepts: ['rendering'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l7q1',
      question: 'Perché chiamare replaceChildren prima di ridisegnare una lista?',
      options: [
        ['Per evitare duplicati', 'Esatto.'],
        ['Per migliorare l’accessibilità', 'Non è il motivo principale.'],
        ['Perché append non funziona due volte', 'Funziona, ma duplica.'],
      ],
      correct: 0,
      explanation: 'Il render deve partire da uno stato pulito.',
      concepts: ['rendering'],
    }),
    quiz({
      id: 'w5l7q2',
      question: 'Dove va calcolato il totale?',
      options: [
        ['Nel DOM, leggendo i testi', 'Fragile e costoso.'],
        ['Nello stato o come dato derivato al render', 'Esatto.'],
        ['In una variabile globale aggiornata a mano', 'Rischio di divergenza.'],
      ],
      correct: 1,
      explanation: 'I dati derivati si calcolano dai dati, non dal DOM.',
      concepts: ['rendering'],
    }),
    quiz({
      id: 'w5l7q3',
      question: 'Cosa dovrebbe mostrare una lista vuota?',
      options: [
        ['Nulla', 'L’utente non capisce se sta caricando o se è vuoto.'],
        ['Un messaggio esplicito di stato vuoto', 'Esatto.'],
        ['Un errore', 'Non è un errore.'],
      ],
      correct: 1,
      explanation: 'Gli stati vuoti fanno parte del design dell’interfaccia.',
      concepts: ['rendering'],
    }),
  ],
  recap: {
    points: [
      'Stato = verità, DOM = proiezione.',
      'Render: pulisci, ricrea, aggiorna derivati.',
      'Gestisci lo stato vuoto.',
      'Una funzione render rende il codice riutilizzabile.',
    ],
    learned: 'Il Quaderno delle spese si vede finalmente in pagina.',
    next: 'Lato professionale: ispezionare il DOM e capire cosa succede davvero.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w5l8',
  title: 'Lato professionale e test',
  subtitle: 'Inspector, accessibilità e verifica della settimana',
  minutes: 50,
  objectives: [
    'Usare l’Inspector per capire la struttura reale',
    'Scrivere markup che resta accessibile',
    'Superare il test della settimana',
  ],
  concepts: ['DevTools Elements', 'accessibilità', 'test'],
  activate: [
    'Il tuo codice dice di aver aggiunto una classe, ma la pagina non cambia. Come verifichi cosa è successo davvero?',
    'Con l’Inspector: guardi il DOM reale, non quello che pensi di aver creato.',
  ],
  analogy:
    'L’Inspector è la radiografia: mostra la struttura effettiva, gli stili applicati e chi vince tra regole in conflitto. È il primo posto da guardare quando il CSS “non funziona”.',
  example: {
    code: `const btn = document.querySelector('#btn');

btn.setAttribute('aria-label', 'Aggiungi spesa');
btn.setAttribute('aria-disabled', 'true');

console.log(btn.getAttribute('aria-label'));
console.log(btn.getAttribute('aria-disabled'));`,
    output: `Aggiungi spesa
true`,
  },
  formal:
    'In DevTools → Elements vedi l’albero DOM aggiornato in tempo reale, gli stili calcolati e le regole sovrascritte. Le classi si possono attivare e disattivare per prova. Per l’accessibilità: usa elementi semantici (button, nav, main), etichetta i controlli (aria-label o label associata), non affidarti solo al colore, mantieni il focus visibile. Gli attributi ARIA si impostano con setAttribute e si leggono con getAttribute.',
  worked: {
    code: `const form = document.querySelector('#form');

const label = document.createElement('label');
label.setAttribute('for', 'budget');
label.textContent = 'Budget mensile';

const input = document.createElement('input');
input.setAttribute('id', 'budget');
input.setAttribute('type', 'number');
input.setAttribute('aria-describedby', 'budget-help');

const help = document.createElement('p');
help.setAttribute('id', 'budget-help');
help.textContent = 'Importo in euro';

form.prepend(label, input, help);
console.log(document.querySelector('label').textContent);
console.log(input.getAttribute('aria-describedby'));`,
    output: `Budget mensile
budget-help`,
    steps: [
      ['label.setAttribute(\'for\', \'budget\')', 'Il for collega l’etichetta al campo: clic sull’etichetta = focus sul campo.'],
      ['input.setAttribute(\'id\', \'budget\')', 'L’id deve corrispondere al for.'],
      ['aria-describedby', 'Collega una descrizione aggiuntiva letta dagli screen reader.'],
      ['form.prepend(label, input, help)', 'prepend accetta più nodi e li inserisce all’inizio.'],
      ['getAttribute(...)', 'Verifica che gli attributi siano davvero stati impostati.'],
    ],
  },
  exercises: [
    fill({
      id: 'w5l8e1',
      title: 'Etichetta accessibile',
      prompt: 'Imposta `aria-label` a `Aggiungi` su `#btn` e stampalo.',
      starterCode: `const btn = document.querySelector('#btn');

btn.setAttribute('', 'Aggiungi');
console.log(btn.getAttribute('aria-label'));`,
      check: { kind: 'output', lines: ['Aggiungi'] },
      hints: ['Il nome dell’attributo è aria-label.', 'setAttribute(\'aria-label\', \'Aggiungi\')'],
      solution: `const btn = document.querySelector('#btn');

btn.setAttribute('aria-label', 'Aggiungi');
console.log(btn.getAttribute('aria-label'));`,
      explanation: 'Un pulsante con solo un’icona ha bisogno di un nome accessibile.',
      concepts: ['accessibilità'],
      runtime: 'dom',
    }),
    guided({
      id: 'w5l8e2',
      title: 'Collega label e input',
      prompt:
        'Imposta l’attributo `for` della label a `nome` e stampa `nome`.',
      starterCode: `const label = document.querySelector('label');
if (!label) {
  const nuova = document.createElement('label');
  document.querySelector('#form').prepend(nuova);
}

const l = document.querySelector('label');
l.setAttribute(, 'nome');

console.log(l.getAttribute('for'));`,
      check: { kind: 'output', lines: ['nome'] },
      hints: ['L’attributo si chiama for.', 'setAttribute(\'for\', \'nome\')'],
      solution: `let label = document.querySelector('label');
if (!label) {
  label = document.createElement('label');
  document.querySelector('#form').prepend(label);
}

label.setAttribute('for', 'nome');

console.log(label.getAttribute('for'));`,
      explanation: 'Il collegamento label-input è essenziale per tastiera e screen reader.',
      concepts: ['accessibilità'],
      runtime: 'dom',
    }),
    solo({
      id: 'w5l8e3',
      title: 'Pulsante disabilitato',
      prompt:
        'Imposta `disabled` su `#btn` e stampa `true` leggendo la proprietà `btn.disabled`.',
      starterCode: `const btn = document.querySelector('#btn');

// disabled`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['btn.disabled = true è la proprietà DOM.', 'In alternativa setAttribute(\'disabled\', \'\').'],
      solution: `const btn = document.querySelector('#btn');
btn.disabled = true;
console.log(btn.disabled);`,
      explanation: 'Le proprietà DOM riflettono gli attributi booleani: disabled vale true/false.',
      concepts: ['accessibilità'],
      runtime: 'dom',
    }),
    transfer({
      id: 'w5l8e4',
      title: 'Stato accessibile',
      prompt:
        'Imposta `aria-pressed` a `false`, poi a `true`, e stampa il valore finale.',
      starterCode: `const btn = document.querySelector('#btn');

// due setAttribute
console.log();`,
      objective: 'Rendere esplicito lo stato di un controllo per le tecnologie assistive.',
      check: { kind: 'output', lines: ['true'] },
      hints: ['setAttribute(\'aria-pressed\', \'false\')', 'Poi \'true\', infine getAttribute.'],
      solution: `const btn = document.querySelector('#btn');
btn.setAttribute('aria-pressed', 'false');
btn.setAttribute('aria-pressed', 'true');
console.log(btn.getAttribute('aria-pressed'));`,
      explanation: 'Gli stati visivi devono avere un equivalente accessibile.',
      concepts: ['accessibilità'],
      runtime: 'dom',
    }),
  ],
  contrasts: [
    contrast({
      title: 'Solo il colore',
      code: `// Errore: comunica lo stato solo con il colore
msg.style.color = 'red';`,
      error: `Chi non distingue il rosso non capisce che c’è un errore`,
      why: 'Il colore da solo non è un’informazione accessibile: serve anche testo o un’icona.',
      fix: `msg.textContent = 'Errore: importo non valido';
msg.style.color = 'red';`,
    }),
  ],
  explains: [
    explain({
      id: 'w5l8x1',
      prompt: 'Spiega perché il markup semantico e le etichette contano per l’accessibilità.',
      keywords: ['semantic', 'label', 'screen reader', 'tastiera', 'accessibil', 'aria'],
      model:
        'Gli elementi semantici comunicano il loro ruolo a browser e tecnologie assistive: un button è attivabile da tastiera, un div no. Le etichette collegate ai campi permettono allo screen reader di annunciare cosa chiede il campo e rendono cliccabile l’etichetta. Inoltre non bisogna comunicare informazioni solo con il colore, perché non tutti lo percepiscono allo stesso modo.',
      concepts: ['accessibilità'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w5l8q1',
      question: 'Perché usare `<button>` invece di un `<div>` cliccabile?',
      options: [
        ['Perché è più bello', 'Il motivo è funzionale.'],
        ['Perché è attivabile da tastiera e annunciato come pulsante', 'Esatto.'],
        ['Perché i div non supportano i click', 'Li supportano, ma non l’accessibilità da tastiera.'],
      ],
      correct: 1,
      explanation: 'La semantica porta con sé comportamento e accessibilità.',
      concepts: ['accessibilità'],
    }),
    quiz({
      id: 'w5l8q2',
      question: 'A cosa serve l’attributo for di una label?',
      options: [
        ['A collegare l’etichetta al controllo con quell’id', 'Esatto.'],
        ['A definire il colore', 'Non ha nulla a che vedere.'],
        ['A ordinare i campi', 'L’ordine dipende dal DOM.'],
      ],
      correct: 0,
      explanation: 'Il for deve corrispondere all’id del controllo.',
      concepts: ['accessibilità'],
    }),
    quiz({
      id: 'w5l8q3',
      question: 'Cosa mostra l’Inspector di DevTools?',
      options: [
        ['Solo il codice sorgente HTML originale', 'Mostra il DOM vivo, che può differire.'],
        ['Il DOM aggiornato e gli stili calcolati', 'Esatto.'],
        ['Solo le richieste di rete', 'Quelle sono nel pannello Network.'],
      ],
      correct: 1,
      explanation: 'L’Inspector mostra lo stato reale della pagina.',
      concepts: ['DevTools Elements'],
    }),
  ],
  recap: {
    points: [
      'L’Inspector mostra il DOM vivo e gli stili calcolati.',
      'La semantica regala accessibilità.',
      'label e aria-label danno un nome ai controlli.',
      'Il colore da solo non è informazione.',
    ],
    learned: 'Sai ispezionare e rendere accessibile ciò che costruisci.',
    next: 'Settimana 6: gli eventi, il momento in cui la pagina risponde.',
  },
});

export const week05 = makeWeek({
  id: W,
  number: 5,
  title: 'Il DOM',
  subtitle: 'La pagina diventa un programma',
  description:
    'Selezionare, modificare, creare e navigare gli elementi. Il quaderno smette di essere testo e diventa interfaccia.',
  goals: [
    'Selezionare elementi in modo robusto',
    'Aggiornare contenuti e classi',
    'Costruire liste dinamiche',
    'Rendere il markup accessibile',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — rendering HTML',
    brief:
      'Le spese vengono mostrate in una lista con totale aggiornato. Il render è una funzione che parte dallo stato.',
    deliverable: 'Una pagina con lista spese, totale formattato e messaggio per lo stato vuoto.',
    milestones: [
      'Lista generata dai dati',
      'Totale in un contenitore separato',
      'Stato vuoto gestito esplicitamente',
    ],
  },
  professional: {
    title: 'Inspector e accessibilità',
    topics: [
      'Elements, stili calcolati e prove dal vivo',
      'Elementi semantici e attributi ARIA',
      'Non comunicare solo con il colore',
    ],
    exercise: 'Ispezionare una pagina, trovare tre problemi di accessibilità e correggerli nel markup.',
  },
});
