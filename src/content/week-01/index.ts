import type { Lesson } from '@/types/course';
import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';
import { l1Dense } from './rich-l1';

const W = 'week-01';

const l1 = lesson(W, 1, {
  id: 'w1l1',
  title: 'Il primo comando',
  subtitle: 'Far parlare JavaScript: console.log, stringhe e commenti',
  minutes: 40,
  objectives: [
    'Eseguire il tuo primo programma e leggere l’output',
    'Scrivere stringhe con apici singoli, doppi e backtick',
    'Usare i commenti per annotare il codice',
  ],
  concepts: ['console.log', 'stringhe', 'commenti'],
  activate: [
    'In un tutorial hai già visto qualcosa come console.log("Ciao"). Secondo te cosa fa esattamente, e perché il testo è tra virgolette?',
    'Le virgolette non sono decorazione: dicono a JavaScript “questo è testo, non il nome di qualcosa che esiste nel programma”.',
  ],
  analogy:
    'La console è il quaderno di appunti del browser. console.log() è la penna: quello che scrivi resta lì, in ordine, e puoi rileggerlo. Le virgolette sono il foglio protettivo che dice “questo è testo”, non un comando da eseguire.',
  example: {
    code: `console.log('Ciao, mondo');`,
    output: `Ciao, mondo`,
  },
  formal:
    'console.log(valore) è una funzione: riceve tra parentesi un valore e lo stampa. Una stringa è una sequenza di caratteri tra apici singoli (\'...\'), doppi ("...") o backtick (`...`). Ogni istruzione termina con un punto e virgola — facoltativo, ma utile per leggere il codice. Un commento inizia con // e JavaScript lo ignora completamente.',
  worked: {
    code: `// 1. Il primo messaggio
console.log('Ciao, mondo!');

// 2. Le istruzioni vengono eseguite in ordine, dall'alto in basso
console.log('Sto imparando JavaScript');
console.log("Una riga dopo l'altra");

// 3. Questa riga è commentata: non viene eseguita
// console.log('Non mi vedrai');`,
    output: `Ciao, mondo!
Sto imparando JavaScript
Una riga dopo l'altra`,
    steps: [
      [
        'console.log(\'Ciao, mondo!\')',
        'Chiama la funzione log dell’oggetto console e le passa una stringa. Il risultato appare nella console, non nella pagina.',
      ],
      [
        '// 2. Le istruzioni...',
        'Un commento: serve a te e a chi leggerà il codice. Il computer lo salta.',
      ],
      [
        "console.log('Sto imparando JavaScript')",
        'Seconda chiamata: viene eseguita dopo la prima. L’ordine delle righe è l’ordine di esecuzione.',
      ],
      [
        'console.log("Una riga dopo l\'altra")',
        'Qui servono gli apici doppi, perché il testo contiene un apostrofo. Con apici singoli la stringa si chiuderebbe a metà.',
      ],
      [
        '// console.log(\'Non mi vedrai\')',
        'Commentare una riga è il modo più veloce per “spegnere” un’istruzione senza cancellarla.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l1e1',
      title: 'Completa la chiamata',
      prompt: 'La riga deve stampare esattamente `Ciao, mondo`. Manca il nome del metodo.',
      starterCode: `// Completa: deve stampare Ciao, mondo
console.('Ciao, mondo');`,
      check: { kind: 'output', lines: ['Ciao, mondo'] },
      hints: [
        'Stai chiamando un metodo dell’oggetto console: il suo nome è “log”.',
        'Sostituisci il punto seguito dalle parentesi con console.log(...).',
      ],
      solution: `console.log('Ciao, mondo');`,
      explanation:
        'console.log è il metodo che stampa. Senza il nome del metodo, `console.(...)` non è una chiamata valida.',
      concepts: ['console.log'],
    }),
    guided({
      id: 'w1l1e2',
      title: 'L’apostrofo traditore',
      prompt:
        'Stampa due righe: `L\'ho fatto!` e `Riga 2`. La prima riga è già scritta ma va in errore: sistemala senza cambiare il testo.',
      starterCode: `// Questa riga è rotta: perché? Sistemala mantenendo il testo
console.log('L'ho fatto!');
console.log('Riga 2');`,
      check: { kind: 'output', lines: ["L'ho fatto!", 'Riga 2'] },
      hints: [
        'La stringa si chiude al primo apice singolo che incontra: quello dentro “L’ho”.',
        'Usa gli apici doppi per la prima riga, oppure l’escape \\’ .',
      ],
      solution: `console.log("L'ho fatto!");
console.log('Riga 2');`,
      explanation:
        'Un apostrofo dentro apici singoli chiude la stringa in anticipo. Apici doppi (o l’escape) risolvono il problema.',
      concepts: ['stringhe'],
    }),
    solo({
      id: 'w1l1e3',
      title: 'Tre righe, tre comandi',
      prompt: 'Stampa tre righe separate: `Settimana 1`, `Lezione 1`, `Fatto!`.',
      starterCode: `// Scrivi da zero: tre console.log, una per riga`,
      check: { kind: 'output', lines: ['Settimana 1', 'Lezione 1', 'Fatto!'] },
      hints: [
        'Ogni console.log produce una riga di output.',
        'Servono tre chiamate distinte, una dopo l’altra.',
      ],
      solution: `console.log('Settimana 1');
console.log('Lezione 1');
console.log('Fatto!');`,
      explanation: 'Tre chiamate producono tre righe, nell’ordine in cui le scrivi.',
      concepts: ['console.log'],
    }),
    transfer({
      id: 'w1l1e4',
      title: 'Debug con i commenti',
      prompt:
        'Il codice sotto stampa un messaggio di troppo. Commenta la riga sbagliata e aggiungi in fondo `console.log(\'Debug attivo\')`. L’output deve contenere solo `Prima riga` e `Debug attivo`.',
      starterCode: `console.log('Prima riga');
console.log('Messaggio di troppo');
// aggiungi qui la riga di debug`,
      objective: 'Usare un commento per disattivare un’istruzione.',
      check: { kind: 'output', lines: ['Prima riga', 'Debug attivo'] },
      hints: [
        'Commentare significa anteporre // alla riga.',
        'Aggiungi una nuova chiamata dopo il commento, non dentro.',
      ],
      solution: `console.log('Prima riga');
// console.log('Messaggio di troppo');
console.log('Debug attivo');`,
      explanation:
        'Commentare disattiva senza cancellare: è la tecnica che userai ogni giorno per capire dove nasce un problema.',
      concepts: ['commenti'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Stringa non chiusa',
      code: `console.log('Ciao);`,
      error: `SyntaxError: Invalid or unexpected token`,
      why: 'La stringa si apre con un apice ma non si chiude: JavaScript arriva a fine riga senza sapere dove finisce il testo.',
      fix: `console.log('Ciao');`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l1x1',
      prompt: 'Spiega con parole tue a cosa serve console.log e perché il testo va tra virgolette.',
      keywords: ['console', 'stamp', 'virgolett', 'testo', 'funzione'],
      model:
        'console.log è una funzione che stampa un valore nella console del browser, così posso vedere cosa produce il programma. Il testo va tra virgolette perché altrimenti JavaScript lo interpreterebbe come un nome di variabile o un comando; le virgolette dicono “questa è una stringa, trattala come testo”.',
      concepts: ['console.log', 'stringhe'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l1q1',
      question: 'Cosa stampa `console.log(\'3 + 4\')`?',
      options: [
        ['7', 'Le virgolette rendono tutto una stringa: JavaScript non calcola nulla.'],
        ['3 + 4', 'Esatto: dentro una stringa il + è solo un carattere, non un’operazione.'],
        ['Un errore di sintassi', 'La sintassi è valida: è una chiamata con una stringa.'],
      ],
      correct: 1,
      explanation:
        'Le virgolette trasformano l’espressione in testo. Per calcolare davvero serve `console.log(3 + 4)`.',
      concepts: ['stringhe', 'console.log'],
    }),
    quiz({
      id: 'w1l1q2',
      question: 'Come si scrive un commento su una sola riga?',
      options: [
        ['// commento', 'Corretto: JavaScript ignora tutto da // a fine riga.'],
        ['# commento', 'Il cancelletto è di altri linguaggi (Python, Ruby), non di JavaScript.'],
        ['<-- commento -->', 'Sembra HTML: in JavaScript non è un commento valido.'],
        ['/* commento', 'Apre un commento ma non lo chiude: serve anche */ e vale per più righe.'],
      ],
      correct: 0,
      explanation: '// commenta una riga; /* ... */ commenta un blocco.',
      concepts: ['commenti'],
    }),
    quiz({
      id: 'w1l1q3',
      question: 'Perché `console.log(\'L\'ho fatto\')` produce un errore?',
      options: [
        ['Perché log non accetta apostrofi', 'Nessuna restrizione del genere: il problema è la sintassi della stringa.'],
        ['Perché l’apostrofo chiude la stringa prima della fine', 'Esatto: la stringa finisce a metà e il resto diventa codice invalido.'],
        ['Perché manca il punto e virgola', 'Il ; è facoltativo: non è la causa.'],
      ],
      correct: 1,
      explanation: 'Usa apici doppi o scrivi l’apostrofo come \\’ dentro apici singoli.',
      concepts: ['stringhe'],
    }),
  ],
  recap: {
    points: [
      'console.log(valore) stampa un valore nella console.',
      'Le stringhe stanno tra apici singoli, doppi o backtick.',
      'Le istruzioni sono eseguite in ordine, dall’alto in basso.',
      '// disattiva una riga senza cancellarla.',
    ],
    learned: 'Hai eseguito il tuo primo programma e sai leggere l’output riga per riga.',
    next: 'Ora che sappiamo stampare, impariamo a conservare i valori: le variabili.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w1l2',
  title: 'Variabili',
  subtitle: 'const, let e nomi che si leggono da soli',
  minutes: 45,
  objectives: [
    'Dichiarare valori con const e let',
    'Scegliere tra const e let senza pensarci troppo',
    'Dare nomi leggibili in camelCase',
  ],
  concepts: ['variabili', 'const/let', 'naming'],
  activate: [
    'Se il prezzo di un prodotto appare in venti righe di codice e cambia, quante righe devi modificare? Cosa cambia se il prezzo è dentro una variabile?',
    'Una variabile è un’etichetta su una scatola: cambi il contenuto in un punto solo e tutti la leggono aggiornata.',
  ],
  analogy:
    'Immagina scatole etichettate in magazzino. Il valore è il contenuto, il nome è l’etichetta. Con const l’etichetta è incollata alla scatola: il contenuto può cambiare solo se è un oggetto, ma il nome resta legato a quella scatola. Con let l’etichetta si può spostare su un’altra scatola.',
  example: {
    code: `const nome = 'Ada';
let punti = 0;

punti = punti + 10;

console.log(nome);
console.log(punti);`,
    output: `Ada
10`,
  },
  formal:
    'Una variabile si dichiara con const o let seguito dal nome. const impedisce la riassegnazione (non la mutazione del contenuto di un oggetto). let la permette. I nomi usano camelCase, non possono iniziare con un numero e non possono essere parole riservate (let, const, function...). Dichiarare senza valore è possibile con let, non con const.',
  worked: {
    code: `const prezzo = 12.5;
let quantita = 3;
let totale = prezzo * quantita;

console.log('Totale:', totale);

quantita = 4;
totale = prezzo * quantita;

console.log('Nuovo totale:', totale);`,
    output: `Totale: 37.5
Nuovo totale: 50`,
    steps: [
      ['const prezzo = 12.5;', 'Un valore che non cambierà: const è la scelta giusta.'],
      ['let quantita = 3;', 'Questa quantità cambierà (l’utente può modificarla): serve let.'],
      [
        'let totale = prezzo * quantita;',
        'Il calcolo avviene subito: totale vale 37.5. Se il prezzo cambiasse dopo, totale non si aggiornerebbe da solo.',
      ],
      [
        "console.log('Totale:', totale);",
        'La virgola separa più argomenti: la console li stampa affiancati con uno spazio.',
      ],
      ['quantita = 4;', 'Riassegnazione: funziona perché quantita è stata dichiarata con let.'],
      [
        'totale = prezzo * quantita;',
        'Ricalcolo esplicito. Le variabili non sono formule magiche: vanno aggiornate quando serve.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l2e1',
      title: 'Dichiara la città',
      prompt: 'Dichiara una variabile `citta` che valga `Roma`, poi stampala.',
      starterCode: `// Dichiara qui la variabile citta
// ...
console.log(citta);`,
      check: { kind: 'output', lines: ['Roma'] },
      hints: [
        'Una dichiarazione è della forma: const nome = valore;',
        'Il valore è una stringa, quindi va tra virgolette.',
      ],
      solution: `const citta = 'Roma';
console.log(citta);`,
      explanation: 'const citta = \'Roma\'; lega il nome citta al valore testuale Roma.',
      concepts: ['variabili', 'const/let'],
    }),
    guided({
      id: 'w1l2e2',
      title: 'Contatore che cresce',
      prompt:
        'Parti da `let contatore = 0`, aggiungi 5 al contatore (usando il suo valore attuale) e stampalo. Output atteso: `5`.',
      starterCode: `let contatore = 0;

// aggiungi 5 al valore attuale di contatore

console.log(contatore);`,
      check: { kind: 'output', lines: ['5'] },
      hints: [
        'Riutilizza la variabile: contatore = contatore + 5;',
        'Esiste anche la scorciatoia += che fa la stessa cosa.',
      ],
      solution: `let contatore = 0;
contatore = contatore + 5;
console.log(contatore);`,
      explanation: 'Leggi il valore a destra, somma, riscrivi a sinistra: è il cuore dell’aggiornamento di stato.',
      concepts: ['variabili'],
    }),
    solo({
      id: 'w1l2e3',
      title: 'Una frase con due variabili',
      prompt:
        'Crea `const prodotto = \'Tastiera\'` e `let prezzo = 49`, poi stampa esattamente `Tastiera costa 49 euro` usando le due variabili.',
      starterCode: `// Scrivi da zero`,
      check: { kind: 'output', lines: ['Tastiera costa 49 euro'] },
      hints: [
        'Puoi concatenare con + oppure usare un template literal con i backtick.',
        'console.log(prodotto, \'costa\', prezzo, \'euro\') aggiunge spazi automatici: attenzione alla doppia “euro”.',
      ],
      solution: `const prodotto = 'Tastiera';
let prezzo = 49;
console.log(prodotto + ' costa ' + prezzo + ' euro');`,
      explanation:
        'Concatenare stringhe e numeri funziona: il numero viene convertito in testo. Un template literal sarebbe più leggibile.',
      concepts: ['variabili', 'stringhe'],
    }),
    transfer({
      id: 'w1l2e4',
      title: 'Scambio di valori',
      prompt:
        'Scambia i valori di `a` e `b` (senza scrivere a mano 2 e 1) e stampali. Output atteso: `2 1`.',
      starterCode: `let a = 1;
let b = 2;

// scambia i valori

console.log(a, b);`,
      objective: 'Applicare le variabili a un problema reale: lo scambio richiede una terza variabile temporanea.',
      check: { kind: 'output', lines: ['2 1'] },
      hints: [
        'Se scrivi a = b, perdi il vecchio valore di a.',
        'Salva prima a in una variabile temporanea: const temp = a;',
      ],
      solution: `let a = 1;
let b = 2;
const temp = a;
a = b;
b = temp;
console.log(a, b);`,
      explanation:
        'Senza una copia temporanea il primo assegnamento sovrascrive il valore che ti serviva dopo. Questo schema torna in tutti gli algoritmi di ordinamento.',
      concepts: ['variabili'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Riassegnare una costante',
      code: `const x = 1;
x = 2;`,
      error: `TypeError: Assignment to constant variable.`,
      why: 'const impedisce di legare di nuovo il nome a un altro valore. È una protezione, non un limite: segnala che quel valore non doveva cambiare.',
      fix: `let x = 1;
x = 2;`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l2x1',
      prompt: 'Spiega la differenza tra const e let e come scegli tra i due.',
      keywords: ['const', 'let', 'riassegn', 'cambi', 'default'],
      model:
        'const dichiara un nome che non può essere riassegnato, let permette di riassegnarlo. Parto sempre da const perché rende più chiaro cosa cambia nel programma; passo a let solo quando so che quel valore deve essere aggiornato, per esempio un contatore o un totale ricalcolato.',
      concepts: ['const/let'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l2q1',
      question: 'Quale riga produce un errore?',
      options: [
        ['const totale = 0; totale = 10;', 'Esatto: non puoi riassegnare una const.'],
        ['let totale = 0; totale = 10;', 'Questa è una normale riassegnazione: nessun errore.'],
        ['const totale = 10;', 'Dichiarazione con valore: valida.'],
      ],
      correct: 0,
      explanation: 'const blocca la riassegnazione; let la consente.',
      concepts: ['const/let'],
    }),
    quiz({
      id: 'w1l2q2',
      question: 'Qual è il nome più adatto per una variabile che contiene il totale del carrello?',
      options: [
        ['x', 'Troppo generico: tra due righe non ricordi cosa contiene.'],
        ['totaleCarrello', 'Corretto: descrive il contenuto in camelCase.'],
        ['Totale_Carrello', 'Funziona, ma non segue la convenzione camelCase di JavaScript.'],
        ['2totale', 'Non può iniziare con un numero: è un errore di sintassi.'],
      ],
      correct: 1,
      explanation: 'I nomi sono per chi legge: descrittivi, in inglese, camelCase.',
      concepts: ['naming'],
    }),
    quiz({
      id: 'w1l2q3',
      question: 'Cosa stampa questo codice?\n\n```js\nlet n = 2;\nn = n * 3;\nconsole.log(n);\n```',
      options: [
        ['2', 'Il valore iniziale viene sostituito dal risultato della moltiplicazione.'],
        ['6', 'Esatto: n vale 2, 2 * 3 = 6, e il nuovo valore viene salvato in n.'],
        ['Errore', 'La sintassi è corretta: let consente la riassegnazione.'],
      ],
      correct: 1,
      explanation: 'La destra viene valutata prima dell’assegnamento, poi il risultato sostituisce il valore precedente.',
      concepts: ['variabili'],
    }),
  ],
  recap: {
    points: [
      'const per valori che non cambiano, let per quelli che cambiano.',
      'Il nome descrive il contenuto: camelCase, in inglese.',
      'Assegnare significa valutare la destra e salvarla nella variabile a sinistra.',
      'Riassegnare una const produce un TypeError.',
    ],
    learned: 'Sai conservare e aggiornare valori, e scegliere la dichiarazione giusta.',
    next: 'Che tipo di valore c’è dentro una variabile? Numeri, testo, booleani e i due “vuoti”.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w1l3',
  title: 'Tipi di dati',
  subtitle: 'number, string, boolean, null, undefined e le conversioni',
  minutes: 50,
  objectives: [
    'Riconoscere i tipi primitivi e usarli correttamente',
    'Interrogare un valore con typeof',
    'Convertire tra numero e stringa in modo esplicito',
  ],
  concepts: ['tipi', 'typeof', 'conversioni'],
  activate: [
    '`\'5\' + 1` e `5 + 1` producono lo stesso risultato? Perché?',
    'Il tipo del valore decide cosa significa +: concatenazione per le stringhe, somma per i numeri.',
  ],
  analogy:
    'I tipi sono i contenitori del magazzino: casse di numeri, buste di testo, interruttori booleani, e due contenitori vuoti ma diversi — null (svuotato di proposito) e undefined (mai riempito). Mescolare contenitori dà risultati strani: “5” + 1 è testo, non matematica.',
  example: {
    code: `console.log(typeof 42);
console.log(typeof 'ciao');
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);`,
    output: `number
string
boolean
undefined
object`,
  },
  formal:
    'I tipi primitivi sono: number (interi e decimali, più NaN e Infinity), string, boolean, null, undefined, bigint e symbol. typeof restituisce il nome del tipo come stringa — con una stranezza storica: typeof null è "object". Le conversioni esplicite sono Number(valore), String(valore), Boolean(valore); quelle implicite avvengono nelle operazioni miste e sono una fonte classica di bug.',
  worked: {
    code: `const prezzo = '12.50';
const quantita = 2;

// Conversione esplicita: da stringa a numero
const prezzoNumero = Number(prezzo);
const totale = prezzoNumero * quantita;

console.log('Tipo originale:', typeof prezzo);
console.log('Tipo convertito:', typeof prezzoNumero);
console.log('Totale:', totale);

console.log('Conversione fallita:', Number('abc'));`,
    output: `Tipo originale: string
Tipo convertito: number
Totale: 25
Conversione fallita: NaN`,
    steps: [
      [
        "const prezzo = '12.50';",
        'Il prezzo arriva da un campo di input: è una stringa, anche se sembra un numero.',
      ],
      [
        'const prezzoNumero = Number(prezzo);',
        'Conversione esplicita: Number trasforma il testo in numero. Se non può, restituisce NaN.',
      ],
      [
        'const totale = prezzoNumero * quantita;',
        'Ora la moltiplicazione è matematica: 12.5 * 2 = 25. Con la stringa originale, * avrebbe comunque convertito, ma in modo implicito e meno prevedibile.',
      ],
      [
        "console.log('Tipo originale:', typeof prezzo);",
        'typeof mostra che il dato di partenza era testo: utile quando un calcolo “non torna”.',
      ],
      [
        "console.log('Conversione fallita:', Number('abc'));",
        'NaN significa “not a number”: è il segnale che una conversione è andata storta.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l3e1',
      title: 'Che tipo è?',
      prompt: 'Stampa il tipo di `42` e il tipo di `\'42\'` (due righe: number, string).',
      starterCode: `console.log(typeof 42);
// stampa qui il tipo della stringa '42'`,
      check: { kind: 'output', lines: ['number', 'string'] },
      hints: ['typeof restituisce già una stringa: puoi stamparla direttamente.', 'Scrivi typeof \'42\'.'],
      solution: `console.log(typeof 42);
console.log(typeof '42');`,
      explanation: 'Stesso aspetto, tipi diversi: è la prima cosa da controllare quando un confronto non funziona.',
      concepts: ['tipi', 'typeof'],
    }),
    guided({
      id: 'w1l3e2',
      title: 'Da testo a numero',
      prompt:
        'Converti `input` in numero e stampa il risultato di `input + 1`. Attenzione: senza conversione otterresti `\'7\' + 1` → `\'71\'`.',
      starterCode: `const input = '7';

// converti input in numero, poi stampa numero + 1
console.log(input + 1);`,
      check: { kind: 'output', lines: ['8'] },
      hints: [
        'Number(input) restituisce il valore numerico.',
        'Puoi salvare la conversione in una nuova variabile per renderla esplicita.',
      ],
      solution: `const input = '7';
const numero = Number(input);
console.log(numero + 1);`,
      explanation: 'Il + con una stringa concatena; con due numeri somma. La conversione esplicita evita l’ambiguità.',
      concepts: ['conversioni'],
    }),
    solo({
      id: 'w1l3e3',
      title: 'Scheda di un prodotto',
      prompt:
        'Con `const nome = \'Mouse\'`, `const prezzo = 19.9` e `const disponibile = true`, stampa tre righe: `Mouse`, `19.9`, `true`. Usa le variabili, non i valori scritti a mano.',
      starterCode: `// Scrivi da zero: tre console.log con le variabili`,
      check: { kind: 'output', lines: ['Mouse', '19.9', 'true'] },
      hints: [
        'console.log(nome) stampa il valore contenuto nella variabile.',
        'Non serve typeof: qui vuoi i valori.',
      ],
      solution: `const nome = 'Mouse';
const prezzo = 19.9;
const disponibile = true;
console.log(nome);
console.log(prezzo);
console.log(disponibile);`,
      explanation: 'Ogni variabile porta con sé il proprio tipo: testo, numero, booleano.',
      concepts: ['tipi', 'variabili'],
    }),
    transfer({
      id: 'w1l3e4',
      title: 'Il totale del carrello',
      prompt:
        'I prezzi arrivano come testo. Converte `prezzo1` e `prezzo2` in numeri, somma, e stampa `Totale: 25.5`.',
      starterCode: `const prezzo1 = '10.5';
const prezzo2 = '15';

// converti e somma
console.log('Totale: ' + (prezzo1 + prezzo2));`,
      objective: 'Riconoscere una conversione implicita sbagliata e correggerla.',
      check: { kind: 'output', lines: ['Totale: 25.5'] },
      hints: [
        '`prezzo1 + prezzo2` concatena: “10.515”. Serve convertire prima.',
        'Number(prezzo1) + Number(prezzo2) oppure Number(prezzo1) + prezzo2, perché + con un numero converte l’altro.',
      ],
      solution: `const prezzo1 = '10.5';
const prezzo2 = '15';
const totale = Number(prezzo1) + Number(prezzo2);
console.log('Totale: ' + totale);`,
      explanation:
        'Senza conversione il + concatena. Nei dati reali (form, JSON, localStorage) tutto arriva come testo: convertire è routine.',
      concepts: ['conversioni'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'La somma che concatena',
      code: `const a = '5';
const b = 1;
console.log(a + b);`,
      error: `'51' (nessun errore, ma risultato sbagliato)`,
      why: 'Con una stringa a sinistra, + concatena. Non c’è errore: il bug è silenzioso, ed è per questo che è pericoloso.',
      fix: `console.log(Number(a) + b);`,
    }),
    contrast({
      title: 'typeof null',
      code: `console.log(typeof null);`,
      error: `object`,
      why: 'Un bug storico di JavaScript mantenuto per compatibilità. null non è un oggetto: è l’assenza intenzionale di valore.',
      fix: `console.log(value === null); // per verificare null si confronta`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l3x1',
      prompt: 'Spiega la differenza tra null e undefined, con un esempio per ciascuno.',
      keywords: ['null', 'undefined', 'assenz', 'dichiarat', 'intenzional', 'valore'],
      model:
        'undefined significa che un valore non è mai stato assegnato: per esempio una variabile dichiarata senza inizializzazione, o una proprietà che non esiste. null è un valore assegnato apposta per dire “qui non c’è niente”: per esempio quando svuoto un campo. La differenza è l’intenzione.',
      concepts: ['tipi'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l3q1',
      question: 'Cosa stampa `console.log(typeof null)`?',
      options: [
        ['"null"', 'Sarebbe logico, ma JavaScript restituisce altro per un bug storico.'],
        ['"object"', 'Esatto: è una stranezza del linguaggio, mantenuta per compatibilità.'],
        ['"undefined"', 'undefined è un tipo diverso: qui il valore è proprio null.'],
      ],
      correct: 1,
      explanation: 'Per controllare null si usa `valore === null`, non typeof.',
      concepts: ['typeof'],
    }),
    quiz({
      id: 'w1l3q2',
      question: 'Cosa stampa `console.log(\'5\' + 2)`?',
      options: [
        ['7', 'Il + con una stringa concatena: non c’è somma.'],
        ['"52"', 'Esatto: il numero viene convertito in testo e concatenato.'],
        ['NaN', 'NaN comparirebbe in una conversione fallita, non in una concatenazione.'],
      ],
      correct: 1,
      explanation: 'La conversione implicita segue il tipo degli operandi: stringa + numero = stringa.',
      concepts: ['conversioni'],
    }),
    quiz({
      id: 'w1l3q3',
      question: 'Quale conversione produce NaN?',
      options: [
        ['Number(\'12.5\')', 'È un numero decimale valido: 12.5.'],
        ['Number(\'abc\')', 'Esatto: “abc” non è convertibile in numero.'],
        ['String(42)', 'Produce la stringa "42", non NaN.'],
      ],
      correct: 1,
      explanation: 'NaN è il risultato di un’operazione numerica non valida: va controllato con Number.isNaN.',
      concepts: ['conversioni'],
    }),
  ],
  recap: {
    points: [
      'I primitivi principali: number, string, boolean, null, undefined.',
      'typeof restituisce il tipo, con l’eccezione di null → "object".',
      'Le conversioni esplicite (Number, String, Boolean) sono prevedibili.',
      'stringa + numero concatena: attenzione nei calcoli.',
    ],
    learned: 'Sai riconoscere e convertire i tipi, e sai perché “5” + 1 non fa 6.',
    next: 'Con i valori in mano, impariamo a combinarli: operatori e confronti.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w1l4',
  title: 'Operatori',
  subtitle: 'Aritmetica, modulo, confronti e precedenza',
  minutes: 50,
  objectives: [
    'Usare gli operatori aritmetici, incluso il modulo',
    'Distinguere === da == e scegliere sempre ===',
    'Leggere un’espressione rispettando la precedenza',
  ],
  concepts: ['operatori', 'confronti', 'precedenza'],
  activate: [
    'Quante volte 10 contiene 3? Come useresti JavaScript per sapere il resto di quella divisione?',
    'Esiste un operatore dedicato al resto: %. Serve per capire se un numero è pari, per ciclare, per raggruppare.',
  ],
  analogy:
    'Gli operatori sono attrezzi: + somma, - sottrae, * moltiplica, / divide, % restituisce ciò che avanza. === è un confronto rigido: controlla valore e tipo, come un buttafuori che verifica documento e volto. == è più tollerante, e proprio per questo imprevedibile.',
  example: {
    code: `console.log(7 + 3);
console.log(10 % 3);
console.log(2 + 3 * 4);
console.log(5 === 5);
console.log('5' === 5);
console.log('5' == 5);`,
    output: `10
1
14
true
false
true`,
  },
  formal:
    'Aritmetici: + - * / % **. Confronto: === !== > < >= <= (== e != esistono ma convertono i tipi: evitali). Logici: && || ! (li vedremo nella lezione 6). La precedenza segue la matematica: ** prima, poi * / %, poi + -, quindi i confronti. Le parentesi vincono sempre: usale per rendere l’intenzione esplicita.',
  worked: {
    code: `const prezzo = 19.99;
const quantita = 3;
const sconto = 0.1;

const subtotale = prezzo * quantita;
const scontoEuro = subtotale * sconto;
const totale = subtotale - scontoEuro;

console.log('Subtotale:', subtotale.toFixed(2));
console.log('Sconto:', scontoEuro.toFixed(2));
console.log('Totale:', totale.toFixed(2));

console.log('Pari?', quantita % 2 === 0);`,
    output: `Subtotale: 59.97
Sconto: 6.00
Totale: 53.97
Pari? false`,
    steps: [
      ['const subtotale = prezzo * quantita;', 'La moltiplicazione ha precedenza sulle somme: qui è comunque isolata in una variabile.'],
      ['const scontoEuro = subtotale * sconto;', 'Calcolo intermedio con un nome: più leggibile di un’espressione lunga.'],
      [
        'const totale = subtotale - scontoEuro;',
        'I decimali in JavaScript sono float: 59.97 - 6.00 può avere piccole imprecisioni. Per questo si formatta con toFixed(2) solo alla fine.',
      ],
      [
        "console.log('Subtotale:', subtotale.toFixed(2));",
        'toFixed(2) restituisce una stringa con due decimali: è formattazione, non arrotondamento del dato salvato.',
      ],
      [
        "console.log('Pari?', quantita % 2 === 0);",
        'Il resto di 3 diviso 2 è 1, quindi il confronto è false. Lo schema n % 2 === 0 serve in continuazione.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l4e1',
      title: 'Il resto',
      prompt: 'Stampa il resto di 17 diviso 5 (atteso: 2).',
      starterCode: `// usa l'operatore del resto
console.log();`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['L’operatore del resto è %.', 'Scrivi 17 % 5 dentro console.log.'],
      solution: `console.log(17 % 5);`,
      explanation: '17 = 5 * 3 + 2: il resto è 2. % restituisce proprio quel 2.',
      concepts: ['operatori'],
    }),
    guided({
      id: 'w1l4e2',
      title: 'Uguale ma diverso',
      prompt:
        'Completa i due confronti in modo che stampino `false` e poi `true`: il primo confronta il numero 5 con la stringa \'5\' usando ===, il secondo usa ==.',
      starterCode: `// confronto stretto tra 5 e '5'
console.log();
// confronto con conversione tra 5 e '5'
console.log();`,
      check: { kind: 'output', lines: ['false', 'true'] },
      hints: [
        'Il confronto stretto è ===: tipi diversi danno false.',
        'Il confronto con conversione è ==: “5” viene convertito in 5.',
      ],
      solution: `console.log(5 === '5');
console.log(5 == '5');`,
      explanation:
        '=== confronta tipo e valore; == converte prima. Il primo è prevedibile, il secondo no: usa sempre ===.',
      concepts: ['confronti'],
    }),
    solo({
      id: 'w1l4e3',
      title: 'Media di tre numeri',
      prompt:
        'Con `const a = 7`, `b = 8`, `c = 10`, calcola la media e stampala. Output atteso: `8.333333333333334` (basta usare la divisione).',
      starterCode: `const a = 7;
const b = 8;
const c = 10;

// calcola e stampa la media`,
      check: { kind: 'output', lines: ['8.333333333333334'] },
      hints: [
        'La media è la somma diviso il numero dei valori.',
        'Le parentesi servono: (a + b + c) / 3, altrimenti dividi solo c.',
      ],
      solution: `const a = 7;
const b = 8;
const c = 10;
console.log((a + b + c) / 3);`,
      explanation: 'Senza parentesi la divisione avrebbe precedenza sulla somma: (7 + 8 + 10) / 3 = 8.33.',
      concepts: ['operatori', 'precedenza'],
    }),
    transfer({
      id: 'w1l4e4',
      title: 'Arrotonda al centesimo',
      prompt:
        'Calcola `prezzo * quantita` e stampa il risultato con due decimali usando toFixed(2). Output atteso: `47.98`.',
      starterCode: `const prezzo = 23.99;
const quantita = 2;

// calcola e formatta con due decimali`,
      objective: 'Formattare un importo: il caso d’uso più frequente degli operatori nei progetti reali.',
      check: { kind: 'output', lines: ['47.98'] },
      hints: [
        'toFixed è un metodo del numero: numero.toFixed(2).',
        'Attenzione: (prezzo * quantita).toFixed(2) richiede le parentesi prima del punto.',
      ],
      solution: `const prezzo = 23.99;
const quantita = 2;
console.log((prezzo * quantita).toFixed(2));`,
      explanation: 'toFixed restituisce una stringa formattata: perfetta per mostrare, non per continuare i calcoli.',
      concepts: ['operatori'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Il confronto tollerante',
      code: `console.log(0 == '');
console.log(0 == false);
console.log('' == false);`,
      error: `true, true, true`,
      why: '== converte i tipi prima di confrontare, quindi tre valori completamente diversi risultano “uguali”. È la causa numero uno di bug nei controlli.',
      fix: `console.log(0 === ''); // false
console.log(0 === false); // false`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l4x1',
      prompt: 'Spiega perché in JavaScript si preferisce === a ==, con un esempio.',
      keywords: ['tipo', 'conversion', 'strett', 'prevedibil', '==='],
      model:
        '=== confronta valore e tipo senza conversioni, quindi il risultato è prevedibile. == converte i tipi prima di confrontare: per esempio 0 == "" è true, anche se un numero e una stringa vuota non sono la stessa cosa. Uso === sempre, tranne quando voglio esplicitamente trattare null e undefined insieme.',
      concepts: ['confronti'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l4q1',
      question: 'Cosa stampa `console.log(2 + 3 * 4)`?',
      options: [
        ['20', 'La moltiplicazione ha precedenza: (2 + 3) * 4 richiederebbe le parentesi.'],
        ['14', 'Esatto: 3 * 4 = 12, poi 2 + 12.'],
        ['24', 'Sarebbe 2 * 3 * 4: non è l’espressione scritta.'],
      ],
      correct: 1,
      explanation: 'Precedenza: prima * e /, poi + e -. Le parentesi rendono esplicita l’intenzione.',
      concepts: ['precedenza'],
    }),
    quiz({
      id: 'w1l4q2',
      question: 'Quale espressione è vera per un numero pari?',
      options: [
        ['numero % 2 === 0', 'Corretto: il resto della divisione per 2 è zero.'],
        ['numero / 2 === 0', 'La divisione per 2 dà 0 solo se il numero è 0.'],
        ['numero % 2 === 1', 'Questa è la condizione per i numeri dispari.'],
      ],
      correct: 0,
      explanation: 'Il modulo è lo strumento standard per test di divisibilità.',
      concepts: ['operatori'],
    }),
    quiz({
      id: 'w1l4q3',
      question: 'Cosa stampa `console.log(\'5\' === 5)`?',
      options: [
        ['true', 'Sarebbe true con ==, che converte la stringa in numero.'],
        ['false', 'Esatto: tipi diversi, quindi il confronto stretto è false.'],
        ['Errore', 'Confrontare tipi diversi non è un errore: restituisce false.'],
      ],
      correct: 1,
      explanation: '=== non converte: stringa e numero sono diversi.',
      concepts: ['confronti'],
    }),
  ],
  recap: {
    points: [
      '% restituisce il resto: base per pari/dispari e cicli.',
      'La precedenza segue la matematica; le parentesi chiariscono.',
      '=== confronta tipo e valore, == converte.',
      'toFixed(2) formatta gli importi.',
    ],
    learned: 'Sai comporre espressioni e confrontare valori senza le trappole di ==.',
    next: 'Le espressioni diventano decisioni: if, else e switch.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w1l5',
  title: 'Condizioni',
  subtitle: 'if, else, else if e switch',
  minutes: 50,
  objectives: [
    'Scrivere decisioni con if / else if / else',
    'Scegliere tra if e switch',
    'Evitare condizioni annidate inutili',
  ],
  concepts: ['if/else', 'switch', 'branching'],
  activate: [
    'Un negozio applica lo sconto solo sopra i 50 euro. Come lo diresti a JavaScript in una frase?',
    'La struttura è: SE condizione ALLORA comportamento, ALTRIMENTI un altro comportamento.',
  ],
  analogy:
    'Le condizioni sono i bivi di un navigatore: valuta una domanda, sceglie una strada e ignora le altre. else if è un secondo bivio subito dopo il primo; switch è un casellario con etichette discrete, ottimo quando i casi sono tanti e precisi.',
  example: {
    code: `const totale = 62;

if (totale > 50) {
  console.log('Sconto applicato');
} else {
  console.log('Nessuno sconto');
}`,
    output: `Sconto applicato`,
  },
  formal:
    'if (condizione) { ... } esegue il blocco se la condizione è vera. else copre il caso contrario; else if aggiunge casi intermedi e viene valutato solo se i precedenti sono falsi. switch confronta un valore con === contro i vari case e richiede break per fermarsi; default copre il resto. Un blocco con una sola istruzione può omettere le graffe, ma è sconsigliato.',
  worked: {
    code: `const voto = 78;

if (voto >= 90) {
  console.log('Ottimo');
} else if (voto >= 75) {
  console.log('Buono');
} else if (voto >= 60) {
  console.log('Sufficiente');
} else {
  console.log('Da rivedere');
}

const giorno = 'sab';

switch (giorno) {
  case 'sab':
  case 'dom':
    console.log('Weekend');
    break;
  default:
    console.log('Giorno lavorativo');
}`,
    output: `Buono
Weekend`,
    steps: [
      [
        'if (voto >= 90) {',
        'La prima condizione è falsa (78 non è ≥ 90), quindi il blocco viene saltato: nessun “Ottimo”.',
      ],
      [
        '} else if (voto >= 75) {',
        '78 ≥ 75 è vero: entra qui e stampa “Buono”. Gli else if successivi non vengono nemmeno valutati.',
      ],
      [
        '} else {',
        'Il default del mondo if: copre tutti i casi non gestiti. Serve quasi sempre.',
      ],
      [
        "case 'sab':\n  case 'dom':",
        'Due etichette consecutive condividono lo stesso blocco: sabato e domenica finiscono entrambi in “Weekend”.',
      ],
      [
        'break;',
        'Senza break, l’esecuzione “cade” nel case successivo. È la trappola classica dello switch.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l5e1',
      title: 'Maggiorenne o no',
      prompt: 'Completa l’if: se `eta` è almeno 18 stampa `Maggiorenne`, altrimenti `Minorenne`.',
      starterCode: `const eta = 20;

if () {
  console.log('Maggiorenne');
} else {
  console.log('Minorenne');
}`,
      check: { kind: 'output', lines: ['Maggiorenne'] },
      hints: ['La condizione va tra le parentesi tonde dell’if.', 'Confronta eta >= 18.'],
      solution: `const eta = 20;

if (eta >= 18) {
  console.log('Maggiorenne');
} else {
  console.log('Minorenne');
}`,
      explanation: 'eta >= 18 è true, quindi si esegue il primo blocco.',
      concepts: ['if/else'],
    }),
    guided({
      id: 'w1l5e2',
      title: 'Tre fasce di prezzo',
      prompt:
        'Con `prezzo = 35`, stampa `Economico` se ≤ 20, `Medio` se ≤ 50, altrimenti `Costoso`. Output atteso: `Medio`.',
      starterCode: `const prezzo = 35;

if (prezzo <= 20) {
  console.log('Economico');
}
// aggiungi gli altri due casi`,
      check: { kind: 'output', lines: ['Medio'] },
      hints: [
        'Dopo il primo if serve else if, non un if separato.',
        'else if (prezzo <= 50) e infine else.',
      ],
      solution: `const prezzo = 35;

if (prezzo <= 20) {
  console.log('Economico');
} else if (prezzo <= 50) {
  console.log('Medio');
} else {
  console.log('Costoso');
}`,
      explanation: 'La catena else if garantisce che venga eseguito un solo ramo, in ordine.',
      concepts: ['if/else'],
    }),
    solo({
      id: 'w1l5e3',
      title: 'Switch sui giorni',
      prompt:
        'Con `const codice = 3`, usa switch per stampare `Mercoledì` per 3, `Lunedì` per 1, `Altro` per ogni altro valore.',
      starterCode: `const codice = 3;

// scrivi uno switch`,
      check: { kind: 'output', lines: ['Mercoledì'] },
      hints: [
        'switch (codice) { case 3: ... }',
        'Non dimenticare break dopo ogni caso gestito.',
      ],
      solution: `const codice = 3;

switch (codice) {
  case 1:
    console.log('Lunedì');
    break;
  case 3:
    console.log('Mercoledì');
    break;
  default:
    console.log('Altro');
}`,
      explanation: 'switch confronta con ===: i numeri vanno scritti senza virgolette.',
      concepts: ['switch'],
    }),
    transfer({
      id: 'w1l5e4',
      title: 'Sconto progressivo',
      prompt:
        'Con `totale = 120`, applica: nessuno sconto sotto 50, 5% da 50 a 99, 10% da 100 in su. Stampa `Totale: 108.00`.',
      starterCode: `const totale = 120;
let finale = totale;

// applica lo sconto e stampa con due decimali`,
      objective: 'Combinare condizioni e aritmetica in una regola di business.',
      check: { kind: 'output', lines: ['Totale: 108.00'] },
      hints: [
        'finale = totale * 0.9 per lo sconto del 10%.',
        'Calcola lo sconto dentro la catena if/else, poi stampa finale.toFixed(2).',
      ],
      solution: `const totale = 120;
let finale = totale;

if (totale >= 100) {
  finale = totale * 0.9;
} else if (totale >= 50) {
  finale = totale * 0.95;
}

console.log('Totale: ' + finale.toFixed(2));`,
      explanation:
        'L’ordine dei controlli conta: se testassi prima >= 50, il caso 120 ricadrebbe nello sconto minore.',
      concepts: ['if/else'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Switch senza break',
      code: `switch (1) {
  case 1:
    console.log('uno');
  case 2:
    console.log('due');
}`,
      error: `uno
due`,
      why: 'Senza break il controllo “cade” nel caso successivo. Non è un errore di sintassi: è un errore logico silenzioso.',
      fix: `case 1:
  console.log('uno');
  break;`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l5x1',
      prompt: 'Spiega quando useresti switch invece di una catena di if / else if.',
      keywords: ['switch', 'if', 'valore', 'casi', 'break'],
      model:
        'Uso switch quando confronto un singolo valore con un insieme di casi discreti e noti, per esempio un codice di stato o un giorno della settimana: è più leggibile di tanti else if. Uso if quando le condizioni sono espressioni diverse tra loro, come intervalli o combinazioni di più variabili.',
      concepts: ['switch'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l5q1',
      question: 'Cosa stampa?\n\n```js\nconst n = 5;\nif (n > 10) {\n  console.log(\'A\');\n} else if (n > 3) {\n  console.log(\'B\');\n} else {\n  console.log(\'C\');\n}\n```',
      options: [
        ['A', '5 non è maggiore di 10.'],
        ['B', 'Esatto: la prima condizione è falsa, la seconda è vera.'],
        ['B e C', 'Una catena if/else esegue un solo ramo.'],
      ],
      correct: 1,
      explanation: 'else if viene valutato solo se i precedenti sono falsi, e il primo vero chiude la catena.',
      concepts: ['if/else'],
    }),
    quiz({
      id: 'w1l5q2',
      question: 'Perché il break è importante nello switch?',
      options: [
        ['Perché altrimenti l’esecuzione continua nei case successivi', 'Esatto: è il fall-through.'],
        ['Perché senza break lo switch non compila', 'Compila eccome: semplicemente si comporta diversamente.'],
        ['Perché break termina il programma', 'break esce dallo switch (o dal ciclo), non dal programma.'],
      ],
      correct: 0,
      explanation: 'Il fall-through a volte è voluto (case raggruppati), ma va controllato.',
      concepts: ['switch'],
    }),
    quiz({
      id: 'w1l5q3',
      question: 'Qual è la condizione corretta per “totale tra 50 e 100 inclusi”?',
      options: [
        ['totale >= 50 && totale <= 100', 'Corretto: entrambe le condizioni devono essere vere.'],
        ['totale >= 50 || totale <= 100', 'Con || è quasi sempre vera: 200 soddisfa la seconda.'],
        ['50 <= totale <= 100', 'In JavaScript si valuta da sinistra: (50 <= totale) <= 100, sempre true.'],
      ],
      correct: 0,
      explanation: 'Gli intervalli si esprimono con due confronti uniti da &&, mai in forma matematica compatta.',
      concepts: ['if/else'],
    }),
  ],
  recap: {
    points: [
      'if/else if/else valuta in ordine e esegue un solo ramo.',
      'switch è ideale per casi discreti; break è obbligatorio.',
      'L’ordine delle condizioni cambia il risultato.',
      'Un intervallo richiede due confronti con &&.',
    ],
    learned: 'Il tuo programma ora prende decisioni.',
    next: 'Quali valori contano come “veri” in una condizione? Incontriamo truthy, falsy e gli operatori logici.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w1l6',
  title: 'Truthy, falsy e logica',
  subtitle: '&&, ||, !, ?? e optional chaining',
  minutes: 55,
  objectives: [
    'Riconoscere i valori falsy',
    'Combinare condizioni con &&, || e !',
    'Usare ?? e ?. per gestire valori mancanti',
  ],
  concepts: ['truthy/falsy', 'operatori logici', '?? e ?.'],
  activate: [
    'Un campo di input vuoto: in una condizione si comporta come true o come false?',
    'Le stringhe vuote sono falsy, quindi il campo vuoto viene trattato come “falso”.',
  ],
  analogy:
    'Truthy/falsy è il semaforo implicito di JavaScript: non tutti i valori sono verdi o rossi, ma ognuno viene letto come “passa” o “fermati”. La lista dei rossi è corta e vale la pena impararla a memoria: false, 0, -0, 0n, "", null, undefined, NaN.',
  example: {
    code: `console.log(Boolean(''));
console.log(Boolean('0'));
console.log(Boolean(0));
console.log(Boolean([]));

const nome = null;
console.log(nome ?? 'ospite');

const utente = { profilo: { citta: 'Roma' } };
console.log(utente?.profilo?.citta);
console.log(utente?.indirizzo?.via);`,
    output: `false
true
false
true
ospite
Roma
undefined`,
  },
  formal:
    'Sono falsy: false, 0, -0, 0n, "", null, undefined, NaN. Tutto il resto è truthy, compresi [] e {}. && restituisce il primo operando falsy, oppure l’ultimo; || restituisce il primo truthy; ! nega e converte in booleano. ?? restituisce il valore di destra solo se quello di sinistra è null o undefined (non per 0 o ""). ?. interrompe la catena con undefined se un passaggio è nullish.',
  worked: {
    code: `const utente = {
  nome: 'Ada',
  indirizzo: null,
};

const citta = utente.indirizzo?.citta ?? 'Non specificata';

console.log('Città:', citta);

const quantita = 0;
console.log('Con ||:', quantita || 10);
console.log('Con ??:', quantita ?? 10);

const iscritto = true;
const maggiorenne = true;
console.log('Puo iscriversi:', iscritto && maggiorenne);
console.log('Negazione:', !iscritto);`,
    output: `Città: Non specificata
Con ||: 10
Con ??: 0
Puo iscriversi: true
Negazione: false`,
    steps: [
      [
        'indirizzo: null',
        'Il dato manca di proposito: è null, non una stringa vuota.',
      ],
      [
        'utente.indirizzo?.citta ?? \'Non specificata\'',
        '?. evita il TypeError (null.citta). Il risultato è undefined, quindi ?? applica il valore di riserva.',
      ],
      [
        'quantita || 10',
        '0 è falsy: || scarta lo zero e restituisce 10. Spesso non è quello che vuoi.',
      ],
      [
        'quantita ?? 10',
        '?? considera solo null e undefined: 0 è un valore valido e viene mantenuto.',
      ],
      [
        'iscritto && maggiorenne',
        '&& restituisce true solo se entrambi sono veri: è l’AND logico.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l6e1',
      title: 'Il valore di riserva',
      prompt:
        'Completa l’espressione: se `nickname` è null, usa `\'Anonimo\'`. Stampa `Anonimo`. Usa l’operatore che non scarta 0 e le stringhe vuote.',
      starterCode: `const nickname = null;
const visualizzato = nickname 'Anonimo';
console.log(visualizzato);`,
      check: { kind: 'output', lines: ['Anonimo'] },
      hints: ['L’operatore nullish è ??, due punti interrogativi.', 'Scrivi nickname ?? \'Anonimo\'.'],
      solution: `const nickname = null;
const visualizzato = nickname ?? 'Anonimo';
console.log(visualizzato);`,
      explanation: 'Con || funzionerebbe qui, ma fallirebbe con stringhe vuote e zeri legit­timi.',
      concepts: ['?? e ?.'],
    }),
    guided({
      id: 'w1l6e2',
      title: 'Accesso sicuro',
      prompt:
        '`ordine` non ha la proprietà `cliente`. Stampa la città del cliente in modo sicuro: se manca, deve apparire `Sconosciuta`.',
      starterCode: `const ordine = {
  id: 1,
  cliente: null,
};

// usa optional chaining e nullish coalescing
console.log();`,
      check: { kind: 'output', lines: ['Sconosciuta'] },
      hints: [
        'ordine.cliente?.citta restituisce undefined invece di lanciare un errore.',
        'Aggiungi ?? \'Sconosciuta\' in fondo.',
      ],
      solution: `const ordine = {
  id: 1,
  cliente: null,
};
console.log(ordine.cliente?.citta ?? 'Sconosciuta');`,
      explanation: '?. interrompe la catena, ?? fornisce il valore di riserva: il pattern standard per dati opzionali.',
      concepts: ['?? e ?.'],
    }),
    solo({
      id: 'w1l6e3',
      title: 'Chi può entrare',
      prompt:
        'Con `const eta = 20` e `const haInvito = false`, stampa `Accesso consentito` solo se età ≥ 18 AND haInvito. Altrimenti `Accesso negato`.',
      starterCode: `const eta = 20;
const haInvito = false;

// scrivi la condizione`,
      check: { kind: 'output', lines: ['Accesso negato'] },
      hints: ['La condizione è eta >= 18 && haInvito.', 'Il secondo operando può essere un booleano: non serve === true.'],
      solution: `const eta = 20;
const haInvito = false;

if (eta >= 18 && haInvito) {
  console.log('Accesso consentito');
} else {
  console.log('Accesso negato');
}`,
      explanation: '&& richiede entrambe vere: haInvito è false, quindi si esegue l’else.',
      concepts: ['operatori logici'],
    }),
    transfer({
      id: 'w1l6e4',
      title: 'Utente con dati parziali',
      prompt:
        'Stampa `Nome: Ada — Città: Bologna`, gestendo con ?? i campi mancanti (`citta` è undefined).',
      starterCode: `const utente = {
  nome: 'Ada',
  citta: undefined,
};

// costruisci la riga con ?? e un valore di riserva
console.log();`,
      objective: 'Gestire dati incompleti senza if annidati.',
      check: { kind: 'output', lines: ['Nome: Ada — Città: Bologna'] },
      hints: [
        'Sostituisci il valore mancante con la stringa “Bologna”.',
        'Puoi concatenare pezzi con + oppure usare un template literal.',
      ],
      solution: `const utente = {
  nome: 'Ada',
  citta: undefined,
};

console.log('Nome: ' + (utente.nome ?? 'Anonimo') + ' — Città: ' + (utente.citta ?? 'Bologna'));`,
      explanation: '?? permette di scrivere il caso normale senza rami: il valore di riserva si dichiara dove serve.',
      concepts: ['?? e ?.'],
    }),
  ],
  contrasts: [
    contrast({
      title: '|| scarta lo zero',
      code: `const quantita = 0;
const q = quantita || 10;
console.log(q);`,
      error: `10`,
      why: '0 è falsy, quindi || applica il valore di riserva anche se 0 è un dato valido. Il bug è silenzioso: la quantità diventa 10.',
      fix: `const q = quantita ?? 10; // 0`,
    }),
    contrast({
      title: 'Catena senza optional chaining',
      code: `const utente = null;
console.log(utente.nome);`,
      error: `TypeError: Cannot read properties of null (reading 'nome')`,
      why: 'Stai leggendo una proprietà di null. Non è un valore mancante: è un accesso impossibile.',
      fix: `console.log(utente?.nome);`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l6x1',
      prompt: 'Spiega cosa sono i valori falsy e perché la lista è importante.',
      keywords: ['falsy', 'truthy', '0', 'stringa vuota', 'null', 'undefined', 'condizion'],
      model:
        'I falsy sono i valori che in una condizione si comportano come false: false, 0, -0, 0n, stringa vuota, null, undefined e NaN. Tutti gli altri, compresi array e oggetti vuoti, sono truthy. Conoscere la lista evita bug: per esempio un campo vuoto o una quantità 0 vengono trattati come “falsi” anche se sono dati legittimi.',
      concepts: ['truthy/falsy'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l6q1',
      question: 'Quale di questi valori è truthy?',
      options: [
        ['0', '0 è falsy.'],
        ['[]', 'Esatto: un array vuoto è un oggetto, quindi truthy.'],
        ['""', 'La stringa vuota è falsy.'],
      ],
      correct: 1,
      explanation: 'Array e oggetti vuoti sono truthy: è una sorpresa frequente per chi inizia.',
      concepts: ['truthy/falsy'],
    }),
    quiz({
      id: 'w1l6q2',
      question: 'Qual è la differenza principale tra || e ??',
      options: [
        ['Nessuna: sono intercambiabili', 'Differiscono sui valori falsy diversi da null/undefined.'],
        ['?? interviene solo per null e undefined', 'Esatto: 0 e "" restano validi con ??.'],
        ['|| funziona solo con i booleani', '|| funziona con qualsiasi valore.'],
      ],
      correct: 1,
      explanation: '?? è il modo corretto di dare un default quando 0 o "" sono valori legittimi.',
      concepts: ['?? e ?.'],
    }),
    quiz({
      id: 'w1l6q3',
      question: 'Cosa stampa `console.log(false || \'default\')`?',
      options: [
        ['false', '|| restituisce il primo operando truthy, non il primo in assoluto.'],
        ['"default"', 'Esatto: false è falsy, quindi si passa al secondo operando.'],
        ['true', '|| non trasforma il risultato in booleano se gli operandi non lo sono.'],
      ],
      correct: 1,
      explanation: '|| restituisce un valore, non necessariamente un booleano: “default” è il primo truthy.',
      concepts: ['operatori logici'],
    }),
  ],
  recap: {
    points: [
      'I falsy: false, 0, -0, 0n, "", null, undefined, NaN.',
      '&& restituisce il primo falsy, || il primo truthy.',
      '?? solo per null/undefined: non scarta 0 e "".',
      '?. evita i TypeError sulle catene di proprietà.',
    ],
    learned: 'Sai scrivere condizioni compatte e sicure, senza if annidati inutili.',
    next: 'Mettiamo insieme tutto in una lezione di ripasso con il primo passo del progetto Quaderno delle spese.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w1l7',
  title: 'Ripasso e primo progetto',
  subtitle: 'Interleaving: variabili, tipi, operatori e condizioni insieme',
  minutes: 60,
  objectives: [
    'Recuperare dalla memoria i concetti della settimana senza rivederli',
    'Costruire il report testuale del Quaderno delle spese',
    'Spiegare una scelta di codice a voce alta',
  ],
  concepts: ['ripasso', 'progetto', 'template literal'],
  activate: [
    'Senza guardare le lezioni: quanti valori falsy ricordi? E cosa restituisce 7 % 2?',
    'Questo è retrieval practice: lo sforzo di ricordare è ciò che consolida la memoria, non la rilettura.',
  ],
  analogy:
    'Il ripasso mescolato è come un allenamento a circuito: non ripeti lo stesso esercizio, alterni. Faticoso all’inizio, molto più efficace quando serve la prestazione vera — cioè quando scrivi codice senza il tutorial aperto.',
  example: {
    code: `const spesa1 = 12.4;
const spesa2 = 7.6;
const spesa3 = 30;
const totale = spesa1 + spesa2 + spesa3;

const messaggio = totale >= 50 ? 'Sconto disponibile' : 'Nessuno sconto';

console.log('Totale: ' + totale.toFixed(2) + ' euro');
console.log(messaggio);`,
    output: `Totale: 50.00 euro
Sconto disponibile`,
  },
  formal:
    'Il template literal (`testo ${espressione}`) compone stringhe con valori senza concatenazioni illeggibili. L’operatore ternario condizione ? a : b è un if compatto per scegliere tra due valori. Entrambi tornano utili nel report, dove devi comporre righe leggibili con numeri formattati.',
  worked: {
    code: `const cliente = 'Ada';
const spese = [12.4, 7.6, 30];

const totale = spese[0] + spese[1] + spese[2];
const media = totale / spese.length;

const riga = \`Cliente: \${cliente}\`;
const rigaTotale = \`Totale: \${totale.toFixed(2)} euro\`;
const rigaMedia = \`Media: \${media.toFixed(2)} euro\`;

console.log(riga);
console.log(rigaTotale);
console.log(rigaMedia);

if (totale > 50) {
  console.log('Nota: sopra 50 euro hai diritto allo sconto');
}`,
    output: `Cliente: Ada
Totale: 50.00 euro
Media: 16.67 euro`,
    steps: [
      ['const spese = [12.4, 7.6, 30];', 'Un array: lo incontrerai nella Settimana 3. Per ora basta sapere che indici e length funzionano come previsto.'],
      ['spese[0]', 'Il primo elemento ha indice 0, non 1: è la prima trappola degli array.'],
      ['const riga = `Cliente: ${cliente}`;', 'Il backtick permette di inserire espressioni con ${...} dentro il testo.'],
      ['totale.toFixed(2)', 'Formatta il numero: “50.00” invece di 50.'],
      [
        'if (totale > 50)',
        'Attenzione: qui totale è esattamente 50, quindi la condizione è falsa e la nota non compare. > non è ≥.',
      ],
    ],
  },
  exercises: [
    fill({
      id: 'w1l7e1',
      title: 'Template literal',
      prompt: 'Completa la riga usando un template literal: deve stampare `Ciao, Ada!`.',
      starterCode: `const nome = 'Ada';
const saluto = \`Ciao, !\`;
console.log(saluto);`,
      check: { kind: 'output', lines: ['Ciao, Ada!'] },
      hints: ['Dentro i backtick si inserisce un’espressione con ${...}.', 'Scrivi ${nome} al posto giusto.'],
      solution: `const nome = 'Ada';
const saluto = \`Ciao, \${nome}!\`;
console.log(saluto);`,
      explanation: '${...} valuta l’espressione e la inserisce nella stringa.',
      concepts: ['template literal'],
    }),
    guided({
      id: 'w1l7e2',
      title: 'Ternario per il livello',
      prompt:
        'Con `punti = 72`, stampa `Livello alto` se punti ≥ 70, altrimenti `Livello base`. Usa un operatore ternario.',
      starterCode: `const punti = 72;

// usa condizione ? valoreSeVero : valoreSeFalso
console.log();`,
      check: { kind: 'output', lines: ['Livello alto'] },
      hints: ['La forma è: punti >= 70 ? \'Livello alto\' : \'Livello base\'.', 'Passa l’intera espressione a console.log.'],
      solution: `const punti = 72;
console.log(punti >= 70 ? 'Livello alto' : 'Livello base');`,
      explanation: 'Il ternario sceglie tra due valori: leggibile per scelte semplici, da evitare se annidato.',
      concepts: ['condizioni'],
    }),
    solo({
      id: 'w1l7e3',
      title: 'Report di tre spese',
      prompt:
        'Con tre variabili di spesa (12.4, 7.6, 30), stampa `Totale: 50.00 euro` e poi `Sopra budget` se il totale è maggiore di 40, altrimenti `Nel budget`.',
      starterCode: `// Scrivi da zero il report`,
      check: { kind: 'output', lines: ['Totale: 50.00 euro', 'Sopra budget'] },
      hints: [
        'Somma le tre spese in una variabile totale.',
        'Stampa il totale con toFixed(2), poi decidi con un if.',
      ],
      solution: `const a = 12.4;
const b = 7.6;
const c = 30;
const totale = a + b + c;
console.log('Totale: ' + totale.toFixed(2) + ' euro');
if (totale > 40) {
  console.log('Sopra budget');
} else {
  console.log('Nel budget');
}`,
      explanation: 'Il report è già un programma utile: dati, calcolo, decisione, output.',
      concepts: ['progetto'],
    }),
    transfer({
      id: 'w1l7e4',
      title: 'Validazione dell’input',
      prompt:
        '`const importo = \'0\'` arriva da un form. Convertilo in numero: se è 0 o non valido, stampa `Importo non valido`; altrimenti `Importo: 12.50` per 12.5.',
      starterCode: `const importo = '0';

// converti, valida, stampa`,
      objective: 'Transfer: unire conversione, falsy e condizione in una validazione reale.',
      check: { kind: 'output', lines: ['Importo non valido'] },
      hints: [
        'Number(importo) restituisce 0.',
        'La condizione può essere !valore || Number.isNaN(valore).',
      ],
      solution: `const importo = '0';
const valore = Number(importo);

if (!valore || Number.isNaN(valore)) {
  console.log('Importo non valido');
} else {
  console.log('Importo: ' + valore.toFixed(2));
}`,
      explanation: '0 e NaN sono falsy, quindi un solo controllo copre “vuoto” e “non numerico”.',
      concepts: ['conversioni', 'truthy/falsy'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Concatenazione illeggibile',
      code: `console.log('Totale: ' + totale.toFixed(2) + ' euro, media: ' + media.toFixed(2));`,
      error: `Funziona, ma diventa illeggibile appena aggiungi valori`,
      why: 'Ogni + è una concatenazione: un apostrofo o una parentesi fuori posto rompe tutto e il codice non si legge più.',
      fix: `console.log(\`Totale: \${totale.toFixed(2)} euro, media: \${media.toFixed(2)}\`);`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l7x1',
      prompt: 'Spiega come hai calcolato il totale e perché hai usato toFixed solo alla fine.',
      keywords: ['totale', 'tofixed', 'string', 'calcol', 'formatt', 'somma'],
      model:
        'Ho sommato le spese in una variabile numerica, poi ho formattato solo il risultato con toFixed(2). toFixed restituisce una stringa, quindi usarlo prima dei calcoli mi impedirebbe di sommare: prima si calcola con i numeri, poi si formatta per mostrare.',
      concepts: ['progetto'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l7q1',
      question: 'Cosa stampa `console.log(`2 + 2 = ${2 + 2}`)`?',
      options: [
        ['2 + 2 = 4', 'Esatto: ${} valuta l’espressione.'],
        ['2 + 2 = ${2 + 2}', 'Solo dentro un template literal ${} viene valutato; qui lo è.'],
        ['Un errore', 'La sintassi è corretta con i backtick.'],
      ],
      correct: 0,
      explanation: 'Il template literal valuta solo ciò che sta dentro ${}.',
      concepts: ['template literal'],
    }),
    quiz({
      id: 'w1l7q2',
      question: 'Cosa stampa `console.log(10 % 4)`?',
      options: [
        ['2', 'Esatto: 10 = 4 * 2 + 2.'],
        ['2.5', 'Quella è la divisione, non il resto.'],
        ['0', 'Il resto è zero solo per i multipli di 4.'],
      ],
      correct: 0,
      explanation: 'Il modulo restituisce ciò che avanza dalla divisione intera.',
      concepts: ['operatori'],
    }),
    quiz({
      id: 'w1l7q3',
      question: 'Perché `Number(\'\')` e `Boolean(\'\')` danno risultati diversi?',
      options: [
        ['Perché Number produce 0 e Boolean produce false: conversioni diverse dello stesso valore', 'Esatto: ogni conversione ha la sua regola.'],
        ['Perché sono la stessa cosa', '0 e false sono valori diversi, anche se entrambi falsy.'],
        ['Perché Boolean non accetta stringhe', 'Boolean accetta qualsiasi valore.'],
      ],
      correct: 0,
      explanation: 'Convertire in numero e convertire in booleano seguono regole distinte: la stringa vuota è 0 come numero e false come booleano.',
      concepts: ['conversioni'],
    }),
  ],
  recap: {
    points: [
      'Il recupero attivo vale più della rilettura.',
      'Template literal e ternario rendono il codice leggibile.',
      'Prima calcoli con i numeri, poi formatti con toFixed.',
      'Un report completo ha dati, calcolo, decisione e output.',
    ],
    learned: 'Hai chiuso la settimana costruendo il primo pezzo del Quaderno delle spese.',
    next: 'Nell’ultima lezione vediamo gli strumenti del mestiere: DevTools, MDN e la lettura degli errori.',
  },
  browserLesson: false,
});

const l8 = lesson(W, 8, {
  id: 'w1l8',
  title: 'Lato professionale e test',
  subtitle: 'DevTools, MDN, debug e verifica della settimana',
  minutes: 55,
  objectives: [
    'Usare la console dei DevTools con sicurezza',
    'Cercare su MDN invece di indovinare',
    'Leggere un messaggio di errore e risalire alla causa',
  ],
  concepts: ['debug', 'MDN', 'lettura errori'],
  activate: [
    'Quando il codice non funziona, qual è la prima cosa che guardi? Il messaggio d’errore o il codice che hai appena scritto?',
    'Il messaggio d’errore contiene già il tipo di problema e la riga: leggerlo è la scorciatoia più veloce.',
  ],
  analogy:
    'I DevTools sono la sala macchine del browser: vedi cosa succede davvero, non cosa pensi stia succedendo. MDN è il manuale del costruttore. Nessun professionista ripara a memoria: legge il messaggio, cerca la documentazione, riproduce il problema.',
  example: {
    code: `function calcolaTotale(prezzi) {
  let totale = 0;
  for (const prezzo of prezzi) {
    totale += prezzo;
  }
  return totale;
}

console.log(calcolaTotale([10, 5, 2.5]));`,
    output: `17.5`,
  },
  formal:
    'Un errore ha tre informazioni: tipo (ReferenceError, TypeError, SyntaxError), messaggio e riga. ReferenceError = nome inesistente o non ancora dichiarato; TypeError = operazione su un tipo sbagliato (undefined, null); SyntaxError = codice non parsabile, spesso una parentesi o un apice. In DevTools: Sources per i breakpoint, Console per eseguire espressioni, Network per le richieste. Su MDN cerca il nome esatto del metodo.',
  worked: {
    code: `// Errore tipico #1: nome sbagliato
const prezzo = 10;
try {
  console.log(prezzoTotale);
} catch (errore) {
  console.log(errore.name + ': ' + errore.message);
}

// Errore tipico #2: chiamare un metodo su undefined
const utente = {};
try {
  console.log(utente.nome.toUpperCase());
} catch (errore) {
  console.log(errore.name + ': ' + errore.message);
}`,
    output: `ReferenceError: prezzoTotale is not defined
TypeError: Cannot read properties of undefined (reading 'toUpperCase')`,
    steps: [
      ['console.log(prezzoTotale);', 'Il nome non esiste: ReferenceError. Non è un problema di valore, è un problema di nome.'],
      ['try { ... } catch (errore) {', 'In produzione gli errori si gestiscono: qui li catturiamo per leggerli senza interrompere lo script.'],
      ['utente.nome.toUpperCase()', 'utente.nome è undefined: chiamare un metodo su undefined produce TypeError.'],
      ['reading \'toUpperCase\'', 'Il messaggio dice esattamente quale proprietà mancava: da lì si risale alla causa.'],
    ],
  },
  exercises: [
    fill({
      id: 'w1l8e1',
      title: 'Ripara il ReferenceError',
      prompt: 'Il codice lancia `ReferenceError`. Correggi il nome della variabile e stampa `10`.',
      starterCode: `const prezzo = 10;
console.log(prezzoTotale);`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['Il messaggio direbbe: prezzoTotale is not defined.', 'Usa il nome dichiarato: prezzo.'],
      solution: `const prezzo = 10;
console.log(prezzo);`,
      explanation: 'ReferenceError significa “quel nome non esiste”. Controlla ortografia e ordine di dichiarazione.',
      concepts: ['lettura errori'],
    }),
    guided({
      id: 'w1l8e2',
      title: 'Difendi l’accesso',
      prompt:
        '`utente` non ha `nome`. Stampa `Nome non disponibile` senza mandare in crash lo script (usa ?. e ??).',
      starterCode: `const utente = {};

console.log(utente.nome.toUpperCase());`,
      check: { kind: 'output', lines: ['Nome non disponibile'] },
      hints: [
        'utente.nome?.toUpperCase() restituisce undefined invece di lanciare.',
        'Aggiungi ?? \'Nome non disponibile\'.',
      ],
      solution: `const utente = {};
console.log(utente.nome?.toUpperCase() ?? 'Nome non disponibile');`,
      explanation: 'Questa è la difesa standard contro dati mancanti: accesso opzionale più valore di riserva.',
      concepts: ['?? e ?.', 'lettura errori'],
    }),
    solo({
      id: 'w1l8e3',
      title: 'Report con formattazione',
      prompt:
        'Con `const prodotti = 3` e `const totale = 47.5`, stampa `3 prodotti — 47.50 €` usando un template literal.',
      starterCode: `const prodotti = 3;
const totale = 47.5;

// scrivi il report`,
      check: { kind: 'output', lines: ['3 prodotti — 47.50 €'] },
      hints: ['Il simbolo € va scritto dopo il numero formattato.', 'I prodotti non richiedono formattazione: solo il totale.'],
      solution: `const prodotti = 3;
const totale = 47.5;
console.log(\`\${prodotti} prodotti — \${totale.toFixed(2)} €\`);`,
      explanation: 'Template literal e toFixed insieme coprono la maggior parte dei report testuali.',
      concepts: ['template literal'],
    }),
    transfer({
      id: 'w1l8e4',
      title: 'Debug per esclusione',
      prompt:
        'Il codice dovrebbe stampare `Media: 15`, ma stampa `Media: 45`. Trova l’errore, correggilo e lascia l’output atteso.',
      starterCode: `const voti = [10, 20, 30];
let somma = 0;

for (const voto of voti) {
  somma += voto;
}

console.log('Media: ' + somma);`,
      objective: 'Debug reale: isolare il calcolo incompleto e correggerlo.',
      check: { kind: 'output', lines: ['Media: 15'] },
      hints: [
        'La somma è corretta: manca la divisione per il numero dei voti.',
        'Usa voti.length e formatta solo se serve.',
      ],
      solution: `const voti = [10, 20, 30];
let somma = 0;

for (const voto of voti) {
  somma += voto;
}

console.log('Media: ' + somma / voti.length);`,
      explanation: 'Il debug è un confronto tra comportamento atteso e osservato: qui mancava un passaggio del calcolo.',
      concepts: ['debug'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Indovinare invece di leggere',
      code: `// "Non funziona, cambio cose a caso"
console.lgo('test');`,
      error: `TypeError: console.lgo is not a function`,
      why: 'lgo non esiste: console.log sì. Riordinare le lettere a caso non risolve, leggere il messaggio sì.',
      fix: `console.log('test');`,
    }),
  ],
  explains: [
    explain({
      id: 'w1l8x1',
      prompt:
        'Spiega come leggi un messaggio di errore: quali parti guardi per prime e perché.',
      keywords: ['tipo', 'messaggio', 'riga', 'referenceerror', 'typeerror', 'causa'],
      model:
        'Guardo prima il tipo di errore, perché dice la categoria del problema: ReferenceError è un nome che non esiste, TypeError è un’operazione su un valore non adatto come undefined, SyntaxError è codice non parsabile. Poi leggo il messaggio, che spesso nomina la proprietà o la variabile, e infine la riga indicata per risalire alla causa.',
      concepts: ['lettura errori'],
      minChars: 80,
    }),
  ],
  quizzes: [
    quiz({
      id: 'w1l8q1',
      question: 'Cosa indica `ReferenceError: prezzo is not defined`?',
      options: [
        ['Che prezzo vale 0', 'Nessun valore: il nome non è stato trovato.'],
        ['Che il nome prezzo non esiste in quel punto del codice', 'Esatto: refuso, dichiarazione mancante o fuori scope.'],
        ['Che prezzo è una stringa', 'Il tipo non c’entra: il problema è l’esistenza del nome.'],
      ],
      correct: 1,
      explanation: 'ReferenceError = nome non trovato. Controlla ortografia, dichiarazione e ordine.',
      concepts: ['lettura errori'],
    }),
    quiz({
      id: 'w1l8q2',
      question: 'Cosa produce `undefined.toUpperCase()`?',
      options: [
        ['undefined', 'Chiamare un metodo su undefined non restituisce undefined: lancia un errore.'],
        ['Una stringa vuota', 'Non c’è conversione implicita in questo caso.'],
        ['TypeError', 'Esatto: impossibile leggere una proprietà di undefined.'],
      ],
      correct: 2,
      explanation: 'TypeError = operazione non valida per quel tipo. Difenditi con ?. o con un controllo esplicito.',
      concepts: ['lettura errori'],
    }),
    quiz({
      id: 'w1l8q3',
      question: 'Dove cerchi la documentazione ufficiale di `Array.prototype.map`?',
      options: [
        ['Su MDN Web Docs', 'Corretto: riferimento completo, esempi e compatibilità.'],
        ['Su un post di un forum del 2013', 'Spesso obsoleto e senza contesto.'],
        ['A memoria, sempre', 'Nessun professionista lo fa: la documentazione è parte del lavoro.'],
      ],
      correct: 0,
      explanation: 'MDN è la fonte di riferimento per il web platform.',
      concepts: ['MDN'],
    }),
  ],
  recap: {
    points: [
      'Leggi tipo, messaggio e riga dell’errore, nell’ordine.',
      'ReferenceError = nome; TypeError = operazione; SyntaxError = sintassi.',
      'MDN è la fonte ufficiale; i DevTools mostrano la realtà.',
      '?. e ?? trasformano un crash in un valore di riserva.',
    ],
    learned: 'Hai gli strumenti per riparare il codice da solo, senza indovinare.',
    next: 'Settimana 2: il programma impara a ripetersi e a organizzarsi in funzioni.',
  },
});

export const week01 = makeWeek({
  id: W,
  number: 1,
  title: 'Fondamenta',
  subtitle: 'I mattoni: output, variabili, tipi, decisioni',
  description:
    'Una settimana per passare da “non ho mai scritto JavaScript” a “so far prendere decisioni a un programma”. Si scrive codice dalla prima lezione.',
  goals: [
    'Eseguire codice e leggere l’output senza paura',
    'Scegliere tra const e let con criterio',
    'Riconoscere e convertire i tipi',
    'Scrivere condizioni leggibili',
  ],
  lessons: [{ ...l1, ...l1Dense } as Lesson, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — report testuale',
    brief:
      'Il progetto conduttore parte qui: un quaderno che registra le spese. In questa settimana produce un report testuale con totale, media e avviso di budget.',
    deliverable: 'Uno script che stampa un report leggibile con totale formattato e una decisione sul budget.',
    milestones: [
      'Tre spese in variabili const separate',
      'Totale calcolato e formattato con toFixed(2)',
      'Avviso “Sopra budget” se il totale supera 40',
    ],
  },
  professional: {
    title: 'Console, MDN e lettura degli errori',
    topics: [
      'Aprire i DevTools e usare la console come calcolatrice e come debugger',
      'Cercare su MDN il metodo esatto invece di copiare da un forum',
      'Le tre famiglie di errore: ReferenceError, TypeError, SyntaxError',
    ],
    exercise: 'Ripara tre script rotti leggendo solo il messaggio d’errore, senza eseguirli.',
  },
});
