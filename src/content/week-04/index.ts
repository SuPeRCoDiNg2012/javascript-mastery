import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-04';

const l1 = lesson(W, 1, {
  id: 'w4l1',
  title: 'Oggetti',
  subtitle: 'Proprietà, accesso, mutazione e delete',
  minutes: 45,
  objectives: [
    'Creare un oggetto con proprietà tipizzate',
    'Accedere con punto e parentesi quadre',
    'Mutare e rimuovere proprietà',
  ],
  concepts: ['oggetti', 'proprietà', 'accesso'],
  activate: [
    'Una spesa ha descrizione, importo e categoria. Come li terresti insieme invece di tre variabili separate?',
    'Un oggetto raggruppa valori che descrivono la stessa cosa: è il modo in cui si modellano i dati reali.',
  ],
  analogy:
    'Un oggetto è una scheda con campi: nome, importo, categoria. Ogni campo ha un’etichetta (chiave) e un contenuto (valore). Le parentesi graffe sono la scheda, i due punti separano etichetta e contenuto.',
  example: {
    code: `const spesa = {
  descrizione: 'Libro',
  importo: 18,
  categoria: 'studio',
};

console.log(spesa.descrizione);
console.log(spesa['importo']);

spesa.importo = 20;
spesa.pagata = true;
delete spesa.categoria;

console.log(spesa);`,
    output: `Libro
18
{ descrizione: 'Libro', importo: 20, pagata: true }`,
  },
  formal:
    'Un oggetto è una collezione di coppie chiave-valore. Si accede con la notazione a punto (oggetto.chiave) o con le parentesi quadre (oggetto[\'chiave\'], indispensabile quando la chiave è dinamica). Le proprietà si aggiungono assegnandole; si rimuovono con delete. Un oggetto è mutabile anche se dichiarato con const: const protegge il legame, non il contenuto.',
  worked: {
    code: `const spesa = {
  descrizione: 'Libro',
  importo: 18,
  categoria: 'studio',
};

const chiave = 'importo';
console.log(spesa[chiave]);

spesa.importo += 2;
console.log(spesa.importo);

const haCategoria = 'categoria' in spesa;
console.log(haCategoria);

delete spesa.categoria;
console.log(spesa.categoria);
console.log(Object.keys(spesa));`,
    output: `18
20
true
undefined
['descrizione', 'importo']`,
    steps: [
      ['const chiave = \'importo\';', 'Una chiave dinamica: non puoi scrivere spesa.chiave, perché cercherebbe la proprietà “chiave”.'],
      ['spesa[chiave]', 'Le parentesi quadre valutano l’espressione e usano il risultato come chiave.'],
      ['spesa.importo += 2;', 'Mutazione: il valore cambia, l’oggetto resta lo stesso.'],
      ['\'categoria\' in spesa', 'L’operatore in verifica l’esistenza della proprietà, anche se il valore è undefined.'],
      ['delete spesa.categoria;', 'Rimuove la proprietà: dopo, leggerla dà undefined.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l1e1',
      title: 'Leggi la proprietà',
      prompt: 'Stampa il valore di `importo` (atteso `18`).',
      starterCode: `const spesa = { descrizione: 'Libro', importo: 18 };

console.log(spesa);`,
      check: { kind: 'output', lines: ['18'] },
      hints: ['Usa la notazione a punto: spesa.importo.', 'Stampa la proprietà, non l’oggetto.'],
      solution: `const spesa = { descrizione: 'Libro', importo: 18 };
console.log(spesa.importo);`,
      explanation: 'Il punto accede alla proprietà indicata dal nome letterale.',
      concepts: ['accesso'],
    }),
    guided({
      id: 'w4l1e2',
      title: 'Chiave dinamica',
      prompt:
        'Con `const chiave = \'categoria\'`, stampa `studio` usando l’accesso con parentesi quadre.',
      starterCode: `const spesa = { descrizione: 'Libro', importo: 18, categoria: 'studio' };
const chiave = 'categoria';

// usa spesa[chiave]
console.log();`,
      check: { kind: 'output', lines: ['studio'] },
      hints: ['Le parentesi quadre accettano una variabile.', 'spesa[chiave]'],
      solution: `const spesa = { descrizione: 'Libro', importo: 18, categoria: 'studio' };
const chiave = 'categoria';
console.log(spesa[chiave]);`,
      explanation: 'Con una chiave dinamica il punto non funziona: serve la notazione a parentesi.',
      concepts: ['accesso'],
    }),
    solo({
      id: 'w4l1e3',
      title: 'Aggiungi e rimuovi',
      prompt:
        'Crea `{ nome: \'Pane\', prezzo: 3 }`, aggiungi `disponibile: true`, rimuovi `prezzo` e stampa le chiavi con Object.keys. Output: `[\'nome\', \'disponibile\']`.',
      starterCode: `// scrivi da zero`,
      check: { kind: 'output', lines: ["['nome', 'disponibile']"] },
      hints: ['Assegna prodotto.disponibile = true.', 'delete prodotto.prezzo rimuove la proprietà.'],
      solution: `const prodotto = { nome: 'Pane', prezzo: 3 };
prodotto.disponibile = true;
delete prodotto.prezzo;
console.log(Object.keys(prodotto));`,
      explanation: 'Aggiungere e rimuovere proprietà è normale: gli oggetti sono strutture dinamiche.',
      concepts: ['oggetti'],
    }),
    transfer({
      id: 'w4l1e4',
      title: 'Verifica di esistenza',
      prompt:
        'Stampa `true` se `spesa` ha la proprietà `importo`, `false` se ha `sconto`. Usa l’operatore in.',
      starterCode: `const spesa = { descrizione: 'Libro', importo: 18 };

// due console.log con in`,
      objective: 'Distinguere una proprietà assente da una proprietà con valore undefined.',
      check: { kind: 'output', lines: ['true', 'false'] },
      hints: ['La sintassi è: \'importo\' in spesa.', 'Attenzione alle virgolette attorno al nome.'],
      solution: `const spesa = { descrizione: 'Libro', importo: 18 };
console.log('importo' in spesa);
console.log('sconto' in spesa);`,
      explanation: 'in controlla l’esistenza della chiave, non il valore: è il test più affidabile.',
      concepts: ['proprietà'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Leggere da undefined',
      code: `const spesa = { importo: 10 };
console.log(spesa.dettagli.categoria);`,
      error: `TypeError: Cannot read properties of undefined (reading 'categoria')`,
      why: 'spesa.dettagli non esiste: undefined non ha proprietà. Serve optional chaining o un controllo.',
      fix: `console.log(spesa.dettagli?.categoria);`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l1x1',
      prompt: 'Spiega quando usi la notazione a punto e quando le parentesi quadre.',
      keywords: ['punto', 'parentesi', 'chiave', 'dinamic', 'variabil', 'proprietà'],
      model:
        'Uso il punto quando la chiave è un nome fisso e valido, come spesa.importo. Uso le parentesi quadre quando la chiave è dinamica, cioè arriva da una variabile o da una stringa calcolata, come spesa[chiave] o spesa[\'prezzo-\' + tipo]. Le quadre accettano qualsiasi espressione che produca una stringa.',
      concepts: ['accesso'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l1q1',
      question: 'Cosa stampa `const o = { a: 1 }; o.b = 2; console.log(Object.keys(o));`',
      options: [
        ['[\'a\']', 'L’oggetto è mutabile: b è stata aggiunta.'],
        ['[\'a\', \'b\']', 'Esatto.'],
        ['Errore: const impedisce di aggiungere proprietà', 'const impedisce la riassegnazione, non la mutazione.'],
      ],
      correct: 1,
      explanation: 'const blocca il legame, non il contenuto.',
      concepts: ['proprietà'],
    }),
    quiz({
      id: 'w4l1q2',
      question: 'Quando è obbligatoria la notazione a parentesi quadre?',
      options: [
        ['Mai, il punto funziona sempre', 'Non con chiavi dinamiche o non valide come identificatori.'],
        ['Quando la chiave è in una variabile', 'Esatto.'],
        ['Solo per i numeri', 'Anche, ma non solo.'],
      ],
      correct: 1,
      explanation: 'oggetto[chiave] valuta l’espressione.',
      concepts: ['accesso'],
    }),
    quiz({
      id: 'w4l1q3',
      question: 'Cosa restituisce `\'x\' in { x: undefined }`?',
      options: [
        ['false', 'La proprietà esiste anche se il valore è undefined.'],
        ['true', 'Esatto: in controlla l’esistenza della chiave.'],
        ['Errore', 'Sintassi valida.'],
      ],
      correct: 1,
      explanation: 'in verifica la chiave, non il valore.',
      concepts: ['proprietà'],
    }),
  ],
  recap: {
    points: [
      'Un oggetto raggruppa proprietà con nome.',
      'Punto per chiavi fisse, quadre per chiavi dinamiche.',
      'const non impedisce la mutazione delle proprietà.',
      'in verifica l’esistenza, delete rimuove.',
    ],
    learned: 'Sai modellare una scheda dati e leggerla in modo sicuro.',
    next: 'Le funzioni dentro gli oggetti: metodi e this.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w4l2',
  title: 'Metodi e this',
  subtitle: 'Funzioni che appartengono a un oggetto',
  minutes: 50,
  objectives: [
    'Definire un metodo dentro un oggetto',
    'Capire a cosa punta this',
    'Evitare la perdita di this nelle callback',
  ],
  concepts: ['metodi', 'this', 'contesto'],
  activate: [
    'Una spesa sa calcolare il proprio totale con IVA? Dove metteresti quella funzione?',
    'Dentro l’oggetto, come metodo: la funzione ha accesso ai dati che descrive.',
  ],
  analogy:
    'Un metodo è un’abilità della scheda: la scheda “spesa” sa calcolare il proprio totale. this è il dito che indica la scheda su cui stai lavorando: cambia se chiami il metodo da un’altra scheda.',
  example: {
    code: `const spesa = {
  descrizione: 'Libro',
  importo: 100,
  totaleConIva() {
    return this.importo * 1.22;
  },
};

console.log(spesa.totaleConIva());

const metodo = spesa.totaleConIva;
console.log(metodo());`,
    output: `122
NaN`,
  },
  formal:
    'Un metodo è una funzione come proprietà. this, nelle funzioni normali, dipende da come la funzione viene chiamata: oggetto.metodo() lega this all’oggetto; una chiamata senza oggetto lo perde (in strict mode this è undefined). Le arrow function non hanno this proprio: ereditano quello esterno, quindi non vanno usate come metodi che leggono this. Per passare un metodo come callback usa una arrow che lo invoca.',
  worked: {
    code: `const conto = {
  saldo: 100,
  deposita(importo) {
    this.saldo += importo;
    return this.saldo;
  },
  mostraSaldo() {
    return 'Saldo: ' + this.saldo;
  },
};

console.log(conto.deposita(50));
console.log(conto.mostraSaldo());

const deposita = (importo) => conto.deposita(importo);
console.log(deposita(10));`,
    output: `150
Saldo: 150
160`,
    steps: [
      ['deposita(importo) {', 'Sintassi abbreviata per un metodo: niente function.'],
      ['this.saldo += importo;', 'this è conto, perché il metodo è chiamato come conto.deposita.'],
      ['conto.mostraSaldo()', 'Anche qui this è conto.'],
      ['const deposita = (importo) => conto.deposita(importo);', 'La arrow non ha un this proprio: usa conto esplicitamente.'],
      ['deposita(10)', 'Funziona: 150 + 10 = 160.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l2e1',
      title: 'Metodo che raddoppia',
      prompt: 'Completa il metodo perché restituisca il doppio di `valore`. Output: `10`.',
      starterCode: `const contatore = {
  valore: 5,
  doppio() {
    return ;
  },
};

console.log(contatore.doppio());`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['Dentro un metodo, this si riferisce all’oggetto.', 'return this.valore * 2;'],
      solution: `const contatore = {
  valore: 5,
  doppio() {
    return this.valore * 2;
  },
};

console.log(contatore.doppio());`,
      explanation: 'this.valore legge la proprietà dell’oggetto su cui hai chiamato il metodo.',
      concepts: ['this'],
    }),
    guided({
      id: 'w4l2e2',
      title: 'Saldo aggiornato',
      prompt:
        'Completa `deposita` perché sommi l’importo al saldo e restituisca il nuovo saldo. Con 20 deve stampare `120`.',
      starterCode: `const conto = {
  saldo: 100,
  deposita(importo) {
    // aggiorna this.saldo e restituiscilo
  },
};

console.log(conto.deposita(20));`,
      check: { kind: 'output', lines: ['120'] },
      hints: ['this.saldo += importo;', 'Poi return this.saldo;'],
      solution: `const conto = {
  saldo: 100,
  deposita(importo) {
    this.saldo += importo;
    return this.saldo;
  },
};

console.log(conto.deposita(20));`,
      explanation: 'Il metodo non conosce il nome dell’oggetto: usa this, che viene legato al momento della chiamata.',
      concepts: ['metodi', 'this'],
    }),
    solo({
      id: 'w4l2e3',
      title: 'Scheda prodotto',
      prompt:
        'Crea un oggetto `prodotto` con `nome: \'Mouse\'`, `prezzo: 20` e un metodo `descrizione()` che restituisce `Mouse — 20 €`. Stampa il risultato.',
      starterCode: `// scrivi da zero`,
      check: { kind: 'output', lines: ['Mouse — 20 €'] },
      hints: ['Il metodo usa this.nome e this.prezzo.', 'Un template literal rende la stringa leggibile.'],
      solution: `const prodotto = {
  nome: 'Mouse',
  prezzo: 20,
  descrizione() {
    return \`\${this.nome} — \${this.prezzo} €\`;
  },
};

console.log(prodotto.descrizione());`,
      explanation: 'Il metodo descrive l’oggetto stesso: this rende la logica indipendente dai valori specifici.',
      concepts: ['metodi'],
    }),
    transfer({
      id: 'w4l2e4',
      title: 'Callback e this',
      prompt:
        'Il codice sotto stampa `NaN` perché perde this. Correggilo con una arrow che invoca il metodo e stampa `150`.',
      starterCode: `const conto = {
  saldo: 100,
  versa(importo) {
    this.saldo += importo;
    return this.saldo;
  },
};

const versa = conto.versa;
console.log(versa(50));`,
      objective: 'Riconoscere la perdita di this quando un metodo viene estratto dall’oggetto.',
      check: { kind: 'output', lines: ['150'] },
      hints: [
        'La funzione estratta non è più chiamata come metodo.',
        'const versa = (i) => conto.versa(i);',
      ],
      solution: `const conto = {
  saldo: 100,
  versa(importo) {
    this.saldo += importo;
    return this.saldo;
  },
};

const versa = (importo) => conto.versa(importo);
console.log(versa(50));`,
      explanation: 'La arrow chiude su conto: il metodo viene chiamato come metodo e this è corretto.',
      concepts: ['this'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Arrow come metodo',
      code: `const o = {
  valore: 5,
  doppio: () => this.valore * 2,
};
console.log(o.doppio());`,
      error: `NaN`,
      why: 'La arrow non ha un this proprio: prende quello esterno (il modulo), dove valore non esiste.',
      fix: `doppio() {
  return this.valore * 2;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l2x1',
      prompt: 'Spiega cosa significa this in un metodo e perché si perde quando estrai il metodo in una variabile.',
      keywords: ['this', 'oggetto', 'chiamata', 'contesto', 'perd', 'arrow'],
      model:
        'this è il contesto della chiamata: in un metodo chiamato come oggetto.metodo(), this è quell’oggetto. Se estraggo il metodo in una variabile e lo chiamo da solo, non c’è più un oggetto a sinistra del punto e this diventa undefined, quindi leggerne una proprietà fallisce. Le arrow non hanno this proprio: ereditano quello esterno, ed è per questo che non vanno usate come metodi.',
      concepts: ['this'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l2q1',
      question: 'In `conto.deposita(10)`, a cosa punta this?',
      options: [
        ['A conto', 'Esatto: la chiamata è fatta come metodo dell’oggetto.'],
        ['A undefined', 'undefined accade se il metodo viene estratto e chiamato da solo.'],
        ['A window', 'Non in strict mode, e non in questo caso.'],
      ],
      correct: 0,
      explanation: 'this dipende dal ricevitore della chiamata.',
      concepts: ['this'],
    }),
    quiz({
      id: 'w4l2q2',
      question: 'Perché una arrow function non va bene come metodo che usa this?',
      options: [
        ['Perché non può avere parametri', 'Può averli.'],
        ['Perché non ha un this proprio e usa quello esterno', 'Esatto.'],
        ['Perché è più lenta', 'Non è una questione di performance.'],
      ],
      correct: 1,
      explanation: 'this lessicale: utile nelle callback, sbagliato come metodo.',
      concepts: ['this', 'metodi'],
    }),
    quiz({
      id: 'w4l2q3',
      question: 'Cosa stampa estrarre un metodo e chiamarlo senza oggetto, in strict mode?',
      options: [
        ['Funziona normalmente', 'this non è più legato all’oggetto.'],
        ['Un errore perché this è undefined', 'Esatto, se il metodo legge this.proprietà.'],
        ['Restituisce null', 'L’errore è un TypeError.'],
      ],
      correct: 1,
      explanation: 'Senza ricevitore, this è undefined in strict mode.',
      concepts: ['this'],
    }),
  ],
  recap: {
    points: [
      'Un metodo è una funzione dentro un oggetto.',
      'this dipende da come chiami la funzione.',
      'Estrarre un metodo può perdere this.',
      'Le arrow ereditano this: non usarle come metodi.',
    ],
    learned: 'Sai dare comportamento agli oggetti e controllare il contesto.',
    next: 'Estrarre dati da oggetti e array con il destructuring.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w4l3',
  title: 'Destructuring',
  subtitle: 'Estrarre valori con nomi brevi e chiari',
  minutes: 45,
  objectives: [
    'Estrarre proprietà con destructuring di oggetti',
    'Estrarre elementi con destructuring di array',
    'Usare valori di default e rinominare',
  ],
  concepts: ['destructuring', 'default', 'rinomina'],
  activate: [
    'Vuoi `nome` e `prezzo` da un oggetto prodotto. Quante righe scriveresti? Con destructuring, una.',
    'Il destructuring è zucchero sintattico: rende esplicito quali dati usi.',
  ],
  analogy:
    'Il destructuring è come aprire una valigia ed estrarre solo ciò che ti serve, assegnandolo a etichette con il nome giusto. Non devi portare tutta la valigia in giro.',
  example: {
    code: `const spesa = { descrizione: 'Libro', importo: 18, categoria: 'studio' };

const { descrizione, importo } = spesa;
console.log(descrizione, importo);

const { categoria: tipo } = spesa;
console.log(tipo);

const [primo, secondo = 99] = [10];
console.log(primo, secondo);`,
    output: `Libro 18
studio
10 99`,
  },
  formal:
    'Destructuring di oggetto: const { a, b } = oggetto; si possono rinominare ({ a: nuovoNome }) e dare default ({ a = 1 }). Destructuring di array: const [primo, secondo] = array, con default possibili. Funziona anche nei parametri di funzione: function f({ nome, prezzo }) rende la firma autoesplicativa. Annidato: const { utente: { nome } } = dati. Attenzione: se l’oggetto è undefined, il destructuring lancia un errore.',
  worked: {
    code: `const ordine = {
  id: 7,
  cliente: { nome: 'Ada', citta: 'Roma' },
  totale: 42.5,
};

const { cliente, totale } = ordine;
console.log(cliente.nome);

const { cliente: { citta } } = ordine;
console.log(citta);

function riepilogo({ id, totale = 0 }) {
  return \`Ordine #\${id}: \${totale.toFixed(2)} €\`;
}

console.log(riepilogo(ordine));`,
    output: `Ada
Roma
Ordine #7: 42.50 €`,
    steps: [
      ['const { cliente, totale } = ordine;', 'Estrae due proprietà in un colpo solo.'],
      ['cliente.nome', 'cliente è l’oggetto annidato: si può continuare ad accedere.'],
      ['const { cliente: { citta } } = ordine;', 'Destructuring annidato: scava dentro cliente.'],
      ['function riepilogo({ id, totale = 0 })', 'Parametro destrutturato con default: la funzione dichiara cosa le serve.'],
      ['riepilogo(ordine)', 'Passi l’intero oggetto: la funzione prende solo i campi dichiarati.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l3e1',
      title: 'Estrai due proprietà',
      prompt: 'Completa il destructuring per stampare `Libro 18`.',
      starterCode: `const spesa = { descrizione: 'Libro', importo: 18 };

const {  } = spesa;
console.log(descrizione, importo);`,
      check: { kind: 'output', lines: ['Libro 18'] },
      hints: ['La sintassi è { descrizione, importo }.', 'I nomi devono corrispondere alle chiavi.'],
      solution: `const spesa = { descrizione: 'Libro', importo: 18 };

const { descrizione, importo } = spesa;
console.log(descrizione, importo);`,
      explanation: 'I nomi delle variabili coincidono con le chiavi: il destructuring è implicito.',
      concepts: ['destructuring'],
    }),
    guided({
      id: 'w4l3e2',
      title: 'Rinomina e default',
      prompt:
        'Estrai `nome` come `nomeProdotto` e `prezzo` come `prezzoFinale` con default 0. Con `{ nome: \'Pane\' }` stampa `Pane 0`.',
      starterCode: `const prodotto = { nome: 'Pane' };

const { nome: , prezzo:  = 0 } = prodotto;
console.log(nomeProdotto, prezzoFinale);`,
      check: { kind: 'output', lines: ['Pane 0'] },
      hints: ['La forma è chiave: nuovoNome.', 'nome: nomeProdotto, prezzo: prezzoFinale = 0'],
      solution: `const prodotto = { nome: 'Pane' };

const { nome: nomeProdotto, prezzo: prezzoFinale = 0 } = prodotto;
console.log(nomeProdotto, prezzoFinale);`,
      explanation: 'Rinomina e default rendono il codice locale leggibile e robusto.',
      concepts: ['rinomina', 'default'],
    }),
    solo({
      id: 'w4l3e3',
      title: 'Destructuring di array',
      prompt: 'Con `const [primo, secondo] = [\'a\', \'b\']`, stampa `a` e `b` su righe separate.',
      starterCode: `// scrivi da zero`,
      check: { kind: 'output', lines: ['a', 'b'] },
      hints: ['La sintassi usa le parentesi quadre.', 'Le posizioni contano, non i nomi.'],
      solution: `const [primo, secondo] = ['a', 'b'];
console.log(primo);
console.log(secondo);`,
      explanation: 'Negli array il destructuring è posizionale.',
      concepts: ['destructuring'],
    }),
    transfer({
      id: 'w4l3e4',
      title: 'Parametro destrutturato',
      prompt:
        'Scrivi `riepilogo({ nome, prezzo = 0 })` che restituisce `Pane: 3 €`. Chiamala con `{ nome: \'Pane\', prezzo: 3 }` e stampa.',
      starterCode: `// scrivi la funzione`,
      objective: 'Usare il destructuring nella firma per rendere esplicite le dipendenze.',
      check: { kind: 'output', lines: ['Pane: 3 €'] },
      hints: ['function riepilogo({ nome, prezzo = 0 }) { ... }', 'Il template literal è `${nome}: ${prezzo} €`.'],
      solution: `function riepilogo({ nome, prezzo = 0 }) {
  return \`\${nome}: \${prezzo} €\`;
}

console.log(riepilogo({ nome: 'Pane', prezzo: 3 }));`,
      explanation: 'La firma dichiara esattamente cosa serve alla funzione: documentazione implicita.',
      concepts: ['destructuring'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Destructuring su undefined',
      code: `const dati = undefined;
const { nome } = dati;`,
      error: `TypeError: Cannot destructure property 'nome' of 'dati' as it is undefined.`,
      why: 'Non puoi estrarre proprietà da undefined: il destructuring presuppone un oggetto.',
      fix: `const { nome } = dati ?? {};`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l3x1',
      prompt: 'Spiega il destructuring con un esempio di rinomina e uno di valore di default.',
      keywords: ['destructuring', 'estrar', 'rinomin', 'default', 'oggetto', 'array'],
      model:
        'Il destructuring estrae valori da oggetti o array in variabili. Con gli oggetti uso i nomi delle chiavi: const { nome } = utente. Posso rinominare con la sintassi chiave: nuovoNome, per esempio const { nome: nomeUtente } = utente. Posso dare un default con =, per esempio const { prezzo = 0 } = prodotto, che si applica quando il valore è undefined.',
      concepts: ['destructuring'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l3q1',
      question: 'Cosa stampa?\n\n```js\nconst { a: x = 5 } = { a: undefined };\nconsole.log(x);\n```',
      options: [
        ['undefined', 'Il default si applica proprio quando il valore è undefined.'],
        ['5', 'Esatto.'],
        ['Errore', 'Sintassi valida.'],
      ],
      correct: 1,
      explanation: 'I default scattano su undefined, non su null.',
      concepts: ['default'],
    }),
    quiz({
      id: 'w4l3q2',
      question: 'Nel destructuring di array, cosa determina il valore assegnato?',
      options: [
        ['Il nome della variabile', 'Negli array conta la posizione.'],
        ['La posizione', 'Esatto.'],
        ['L’ordine alfabetico', 'Non ha alcun ruolo.'],
      ],
      correct: 1,
      explanation: 'Gli array sono posizionali: primo, secondo, terzo.',
      concepts: ['destructuring'],
    }),
    quiz({
      id: 'w4l3q3',
      question: 'Perché destrutturare i parametri di una funzione?',
      options: [
        ['Per rendere esplicito cosa serve e ridurre il codice ripetuto', 'Esatto.'],
        ['Per migliorare la performance', 'Non è una questione di performance.'],
        ['Perché altrimenti non si possono passare oggetti', 'Si possono passare comunque.'],
      ],
      correct: 0,
      explanation: 'La firma diventa documentazione: si vede subito cosa usa la funzione.',
      concepts: ['destructuring'],
    }),
  ],
  recap: {
    points: [
      'Destructuring di oggetto per chiave, di array per posizione.',
      'Rinomina con chiave: nuovoNome.',
      'Default su undefined.',
      'Funziona anche nei parametri di funzione.',
    ],
    learned: 'Estrai dati con righe brevi e nomi chiari.',
    next: 'Copiare e combinare oggetti: spread e Object methods.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w4l4',
  title: 'Spread e Object methods',
  subtitle: 'Copie immutabili, keys/values/entries e assign',
  minutes: 50,
  objectives: [
    'Copiare e fondere oggetti con lo spread',
    'Estrarre chiavi, valori e coppie',
    'Sapere quando una copia è superficiale',
  ],
  concepts: ['spread oggetti', 'Object.keys', 'copia superficiale'],
  activate: [
    'Vuoi aggiornare il prezzo di un prodotto senza modificare l’originale. Cosa faresti?',
    'Crei un nuovo oggetto con lo spread e sovrascrivi solo la proprietà che cambia.',
  ],
  analogy:
    'Lo spread è un fotocopiatore: produce una nuova scheda con gli stessi campi. Se un campo contiene a sua volta un oggetto, la fotocopia punta allo stesso oggetto interno: è una copia superficiale, non profonda.',
  example: {
    code: `const prodotto = { nome: 'Pane', prezzo: 3 };

const aggiornato = { ...prodotto, prezzo: 4 };
console.log(aggiornato);
console.log(prodotto);

console.log(Object.keys(prodotto));
console.log(Object.values(prodotto));
console.log(Object.entries(prodotto));`,
    output: `{ nome: 'Pane', prezzo: 4 }
{ nome: 'Pane', prezzo: 3 }
['nome', 'prezzo']
['Pane', 3]
[['nome', 'Pane'], ['prezzo', 3]]`,
  },
  formal:
    'Lo spread di oggetto ({ ...a, ...b }) crea un nuovo oggetto; le proprietà successive sovrascrivono quelle precedenti. Object.keys/values/entries restituiscono array rispettivamente di chiavi, valori e coppie [chiave, valore]. Object.assign(target, ...sources) muta il primo argomento: preferisci lo spread. La copia è superficiale: oggetti annidati restano condivisi (structuredClone per una copia profonda).',
  worked: {
    code: `const base = { nome: 'Pane', prezzo: 3, dettagli: { bio: false } };

const modificato = { ...base, prezzo: 4 };
console.log(modificato.prezzo, base.prezzo);

modificato.dettagli.bio = true;
console.log(base.dettagli.bio);

const totale = Object.values({ a: 10, b: 20 }).reduce((acc, v) => acc + v, 0);
console.log(totale);`,
    output: `4 3
true
30`,
    steps: [
      ['{ ...base, prezzo: 4 }', 'Nuovo oggetto: tutte le proprietà di base, poi prezzo sovrascritto.'],
      ['base.prezzo', 'L’originale resta 3: nessuna mutazione.'],
      ['modificato.dettagli.bio = true;', 'Attenzione: dettagli è lo stesso oggetto in entrambi: copia superficiale.'],
      ['console.log(base.dettagli.bio);', 'Infatti base vede la modifica: true. Per una copia profonda serve structuredClone.'],
      ['Object.values(...).reduce(...)', 'Le API Object restituiscono array: si combinano con le pipeline.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l4e1',
      title: 'Aggiorna senza mutare',
      prompt: 'Crea una copia con prezzo 5 e stampa prima la copia `{ nome: \'Pane\', prezzo: 5 }`, poi l’originale.',
      starterCode: `const prodotto = { nome: 'Pane', prezzo: 3 };

const aggiornato = { prodotto, prezzo: 5 };
console.log(aggiornato);
console.log(prodotto);`,
      check: { kind: 'output', lines: ["{ nome: 'Pane', prezzo: 5 }", "{ nome: 'Pane', prezzo: 3 }"] },
      hints: ['Manca lo spread: ...prodotto.', 'Scrivi { ...prodotto, prezzo: 5 }.'],
      solution: `const prodotto = { nome: 'Pane', prezzo: 3 };

const aggiornato = { ...prodotto, prezzo: 5 };
console.log(aggiornato);
console.log(prodotto);`,
      explanation: 'Lo spread copia, la proprietà successiva sovrascrive.',
      concepts: ['spread oggetti'],
    }),
    guided({
      id: 'w4l4e2',
      title: 'Somma dei valori',
      prompt: 'Somma i valori di `{ a: 10, b: 20, c: 12 }` con Object.values e stampa `42`.',
      starterCode: `const dati = { a: 10, b: 20, c: 12 };

// Object.values + reduce
console.log();`,
      check: { kind: 'output', lines: ['42'] },
      hints: ['Object.values(dati) restituisce un array.', 'Poi .reduce((acc, v) => acc + v, 0)'],
      solution: `const dati = { a: 10, b: 20, c: 12 };

const totale = Object.values(dati).reduce((acc, v) => acc + v, 0);
console.log(totale);`,
      explanation: 'Le API Object trasformano l’oggetto in array, e da lì usi le pipeline.',
      concepts: ['Object.keys'],
    }),
    solo({
      id: 'w4l4e3',
      title: 'Elenco chiavi',
      prompt: 'Stampa le chiavi di `{ nome: \'Ada\', ruolo: \'dev\' }` separate da virgola: `nome, ruolo`.',
      starterCode: `const utente = { nome: 'Ada', ruolo: 'dev' };

// keys + join`,
      check: { kind: 'output', lines: ['nome, ruolo'] },
      hints: ['Object.keys(utente)', 'Poi .join(\', \')'],
      solution: `const utente = { nome: 'Ada', ruolo: 'dev' };
console.log(Object.keys(utente).join(', '));`,
      explanation: 'Object.keys è il punto di partenza per iterare le proprietà in modo esplicito.',
      concepts: ['Object.keys'],
    }),
    transfer({
      id: 'w4l4e4',
      title: 'Fusione con precedenza',
      prompt:
        'Fondi `{ tema: \'chiaro\', lingua: \'it\' }` con `{ tema: \'scuro\' }` in un nuovo oggetto e stampa `{ tema: \'scuro\', lingua: \'it\' }`.',
      starterCode: `const default1 = { tema: 'chiaro', lingua: 'it' };
const scelte = { tema: 'scuro' };

// spread dei due, con scelte per ultimo`,
      objective: 'Capire l’ordine di precedenza nello spread.',
      check: { kind: 'output', lines: ["{ tema: 'scuro', lingua: 'it' }"] },
      hints: ['L’ultimo spread vince sulle chiavi duplicate.', '{ ...default1, ...scelte }'],
      solution: `const default1 = { tema: 'chiaro', lingua: 'it' };
const scelte = { tema: 'scuro' };

console.log({ ...default1, ...scelte });`,
      explanation: 'È il pattern delle impostazioni: default, poi preferenze utente.',
      concepts: ['spread oggetti'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Copia superficiale',
      code: `const a = { nested: { valore: 1 } };
const b = { ...a };
b.nested.valore = 2;
console.log(a.nested.valore);`,
      error: `2`,
      why: 'Lo spread copia solo il primo livello: nested è lo stesso oggetto in a e b.',
      fix: `const b = structuredClone(a);`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l4x1',
      prompt: 'Spiega cosa significa che lo spread fa una copia superficiale.',
      keywords: ['superficial', 'spread', 'annidat', 'riferiment', 'copia', 'profond'],
      model:
        'Una copia superficiale duplica solo le proprietà del primo livello. Se una proprietà contiene un oggetto o un array, la copia contiene lo stesso riferimento: modificarlo da una parte si vede dall’altra. Per una copia profonda serve structuredClone o una libreria dedicata.',
      concepts: ['copia superficiale'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l4q1',
      question: 'Cosa stampa `{ ...{a: 1}, a: 2 }`?',
      options: [
        ['{ a: 1 }', 'La proprietà esplicita successiva vince.'],
        ['{ a: 2 }', 'Esatto.'],
        ['Errore: chiave duplicata', 'Nello spread è consentito e l’ultima vince.'],
      ],
      correct: 1,
      explanation: 'L’ordine conta: le proprietà successive sovrascrivono.',
      concepts: ['spread oggetti'],
    }),
    quiz({
      id: 'w4l4q2',
      question: 'Cosa restituisce `Object.entries({a: 1})`?',
      options: [
        ['[\'a\', 1]', 'Quella è una singola coppia: entries restituisce un array di coppie.'],
        ['[[\'a\', 1]]', 'Esatto.'],
        ['{ a: 1 }', 'Entries non restituisce un oggetto.'],
      ],
      correct: 1,
      explanation: 'Ogni coppia è un array [chiave, valore].',
      concepts: ['Object.keys'],
    }),
    quiz({
      id: 'w4l4q3',
      question: 'Perché preferire lo spread a Object.assign?',
      options: [
        ['Perché assign muta il primo argomento', 'Esatto.'],
        ['Perché assign è deprecato', 'Non è deprecato, ma muta.'],
        ['Perché lo spread è più veloce', 'La differenza non è la performance.'],
      ],
      correct: 0,
      explanation: 'Lo spread crea un nuovo oggetto senza effetti collaterali.',
      concepts: ['spread oggetti'],
    }),
  ],
  recap: {
    points: [
      'Spread crea un nuovo oggetto, l’ultimo vince.',
      'keys/values/entries restituiscono array.',
      'La copia è superficiale.',
      'structuredClone per copie profonde.',
    ],
    learned: 'Sai aggiornare dati senza mutare e leggerli come array.',
    next: 'JSON: il formato con cui i dati viaggiano e si salvano.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w4l5',
  title: 'JSON',
  subtitle: 'stringify, parse e dati che sopravvivono',
  minutes: 50,
  objectives: [
    'Serializzare un oggetto in stringa',
    'Riportare una stringa a oggetto',
    'Gestire JSON non valido senza crash',
  ],
  concepts: ['JSON', 'serializzazione', 'parse'],
  activate: [
    'Come faresti a salvare un oggetto in un file di testo o in localStorage?',
    'Con JSON.stringify: un formato testuale standard, leggibile da qualsiasi linguaggio.',
  ],
  analogy:
    'JSON è l’imballaggio standard per spedire dati: l’oggetto viene appiattito in una stringa con regole precise. JSON.parse fa il percorso inverso, ricostruendo l’oggetto.',
  example: {
    code: `const spesa = { descrizione: 'Libro', importo: 18, tags: ['studio'] };

const testo = JSON.stringify(spesa);
console.log(testo);

const ricostruita = JSON.parse(testo);
console.log(ricostruita.importo);

const pretty = JSON.stringify(spesa, null, 2);
console.log(pretty);`,
    output: `{"descrizione":"Libro","importo":18,"tags":["studio"]}
18
{
  "descrizione": "Libro",
  "importo": 18,
  "tags": [
    "studio"
  ]
}`,
  },
  formal:
    'JSON.stringify(valore) converte in stringa; il secondo argomento (replacer) filtra le chiavi, il terzo (indentazione) formatta. Le funzioni e undefined vengono omesse, i riferimenti circolari lanciano un TypeError. JSON.parse(testo) ricostruisce; su testo non valido lancia SyntaxError, quindi va protetto con try/catch. Le chiavi devono essere stringhe tra doppi apici: JSON non è JavaScript.',
  worked: {
    code: `const spese = [
  { descrizione: 'Libro', importo: 18 },
  { descrizione: 'Pranzo', importo: 12 },
];

const salvato = JSON.stringify(spese);
console.log(salvato.length > 0);

const letto = JSON.parse(salvato);
const totale = letto.reduce((acc, s) => acc + s.importo, 0);
console.log(totale);

const rotto = '{"importo": }';
try {
  JSON.parse(rotto);
} catch (errore) {
  console.log(errore.name);
}`,
    output: `true
30
SyntaxError`,
    steps: [
      ['JSON.stringify(spese)', 'Serializza l’array intero: gli oggetti diventano testo.'],
      ['JSON.parse(salvato)', 'Ricostruisce l’array: torna un array di oggetti veri, non una stringa.'],
      ['letto.reduce(...)', 'Sui dati ricostruiti torni a usare le pipeline normalmente.'],
      ['const rotto = \'{"importo": }\';', 'JSON malformato: manca il valore.'],
      ['JSON.parse(rotto) dentro try', 'Lancia SyntaxError: senza try/catch lo script si interromperebbe.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l5e1',
      title: 'Serializza',
      prompt: 'Serializza l’oggetto e stampa `{"nome":"Pane","prezzo":3}`.',
      starterCode: `const prodotto = { nome: 'Pane', prezzo: 3 };

console.log((prodotto));`,
      check: { kind: 'output', lines: ['{"nome":"Pane","prezzo":3}'] },
      hints: ['Il metodo è JSON.stringify.', 'JSON.stringify(prodotto)'],
      solution: `const prodotto = { nome: 'Pane', prezzo: 3 };
console.log(JSON.stringify(prodotto));`,
      explanation: 'stringify produce una stringa JSON compatta, senza spazi.',
      concepts: ['JSON'],
    }),
    guided({
      id: 'w4l5e2',
      title: 'Deserializza',
      prompt: 'Trasforma la stringa in oggetto e stampa il valore di `prezzo` (`3`).',
      starterCode: `const testo = '{"nome":"Pane","prezzo":3}';

const prodotto = (testo);
console.log();`,
      check: { kind: 'output', lines: ['3'] },
      hints: ['JSON.parse(testo) restituisce un oggetto.', 'console.log(prodotto.prezzo)'],
      solution: `const testo = '{"nome":"Pane","prezzo":3}';

const prodotto = JSON.parse(testo);
console.log(prodotto.prezzo);`,
      explanation: 'parse ricostruisce l’oggetto: da lì in poi è JavaScript normale.',
      concepts: ['parse'],
    }),
    solo({
      id: 'w4l5e3',
      title: 'Pretty print',
      prompt:
        'Serializza `{ a: 1, b: [1, 2] }` con indentazione 2 e stampa la stringa multiriga.',
      starterCode: `const dati = { a: 1, b: [1, 2] };

// stringify con indentazione 2`,
      check: {
        kind: 'output',
        lines: ['{', '  "a": 1,', '  "b": [', '    1,', '    2', '  ]', '}'],
      },
      hints: ['Il terzo argomento è lo spazio: JSON.stringify(dati, null, 2).', 'Il secondo argomento (replacer) può essere null.'],
      solution: `const dati = { a: 1, b: [1, 2] };

console.log(JSON.stringify(dati, null, 2));`,
      explanation: 'L’indentazione serve per leggere il JSON, non per il programma: ideale nei file e nei log.',
      concepts: ['JSON'],
    }),
    transfer({
      id: 'w4l5e4',
      title: 'Parse difensivo',
      prompt:
        'Con `const testo = \'{ "importo": }\'`, prova a fare parse: in caso di errore stampa `Dati non validi`.',
      starterCode: `const testo = '{ "importo": }';

// try/catch`,
      objective: 'Gestire un JSON corrotto senza interrompere il programma.',
      check: { kind: 'output', lines: ['Dati non validi'] },
      hints: ['JSON.parse lancia SyntaxError.', 'try { ... } catch (errore) { console.log(\'Dati non validi\'); }'],
      solution: `const testo = '{ "importo": }';

try {
  JSON.parse(testo);
} catch (errore) {
  console.log('Dati non validi');
}`,
      explanation: 'I dati che arrivano da fuori non sono affidabili: il parse va sempre protetto.',
      concepts: ['parse'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'JSON non è JavaScript',
      code: `const testo = "{ nome: 'Pane' }";
JSON.parse(testo);`,
      error: `SyntaxError: Unexpected token 'n', "{ nome: 'Pane' " is not valid JSON`,
      why: 'In JSON le chiavi richiedono doppi apici e le stringhe non possono usare apici singoli.',
      fix: `JSON.parse('{"nome":"Pane"}');`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l5x1',
      prompt: 'Spiega cosa fanno JSON.stringify e JSON.parse e dove li userai nel progetto.',
      keywords: ['stringify', 'parse', 'string', 'oggetto', 'localstorage', 'salvat'],
      model:
        'JSON.stringify trasforma un valore JavaScript in una stringa JSON, adatta a essere salvata o trasmessa. JSON.parse fa il contrario: da stringa a oggetto utilizzabile. Nel progetto li userò per salvare il quaderno in localStorage e per leggere i dati salvati, proteggendo sempre il parse con try/catch perché il contenuto potrebbe essere corrotto.',
      concepts: ['JSON'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l5q1',
      question: 'Cosa restituisce JSON.stringify({ a: undefined, b: 1 })?',
      options: [
        ['{"a":null,"b":1}', 'undefined non diventa null: viene omesso.'],
        ['{"b":1}', 'Esatto: undefined è omessa.'],
        ['Errore', 'Non lancia errore per undefined.'],
      ],
      correct: 1,
      explanation: 'Le proprietà undefined vengono omesse dalla serializzazione.',
      concepts: ['JSON'],
    }),
    quiz({
      id: 'w4l5q2',
      question: 'Cosa lancia JSON.parse su testo non valido?',
      options: [
        ['TypeError', 'TypeError è per operazioni su tipi sbagliati.'],
        ['SyntaxError', 'Esatto.'],
        ['Restituisce null', 'Lancia un errore.'],
      ],
      correct: 1,
      explanation: 'Va protetto con try/catch.',
      concepts: ['parse'],
    }),
    quiz({
      id: 'w4l5q3',
      question: 'Dopo il parse, i dati possono essere usati con map e reduce?',
      options: [
        ['No, sono stringhe', 'Il parse ricostruisce oggetti e array.'],
        ['Sì, se il JSON conteneva array di oggetti', 'Esatto.'],
        ['Solo con assign', 'Non c’entra.'],
      ],
      correct: 1,
      explanation: 'parse ricostruisce le strutture originali, nei limiti dei tipi JSON.',
      concepts: ['parse'],
    }),
  ],
  recap: {
    points: [
      'JSON è testo standard, non JavaScript.',
      'stringify serializza, parse ricostruisce.',
      'undefined e funzioni vengono omesse.',
      'Il parse di dati esterni va protetto.',
    ],
    learned: 'Sai far sopravvivere i dati oltre l’esecuzione del programma.',
    next: 'Classi: modellare il quaderno con costruttori e metodi.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w4l6',
  title: 'Classi base',
  subtitle: 'constructor, metodi e new',
  minutes: 55,
  objectives: [
    'Dichiarare una classe con costruttore',
    'Creare istanze con new',
    'Usare metodi per incapsulare comportamento',
  ],
  concepts: ['classi', 'constructor', 'istanze'],
  activate: [
    'Se ogni spesa deve avere descrizione, importo e un metodo per formattarsi, quante volte riscriveresti quel codice con gli oggetti letterali?',
    'Con una classe scrivi la struttura una volta e crei quante istanze vuoi.',
  ],
  analogy:
    'La classe è lo stampo, l’istanza è l’oggetto stampato. Il costruttore è il momento in cui lo stampo viene riempito con i dati specifici. Ogni istanza ha i propri valori ma condivide i metodi.',
  example: {
    code: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }

  formatta() {
    return this.descrizione + ': ' + this.importo.toFixed(2) + ' €';
  }
}

const spesa = new Spesa('Libro', 18);
console.log(spesa.formatta());`,
    output: `Libro: 18.00 €`,
  },
  formal:
    'Una classe si dichiara con class Nome { constructor(...) { ... } metodo() { ... } }. new Nome(...) crea un’istanza, lega this al nuovo oggetto ed esegue il costruttore. I metodi vivono sul prototipo e sono condivisi tra le istanze. Le classi sono una sintassi più chiara rispetto alle funzioni costruttore; l’ereditarietà e i campi privati arrivano nella Settimana 7.',
  worked: {
    code: `class Quaderno {
  constructor() {
    this.spese = [];
  }

  aggiungi(spesa) {
    this.spese.push(spesa);
    return this.spese.length;
  }

  totale() {
    return this.spese.reduce((acc, s) => acc + s.importo, 0);
  }
}

const quaderno = new Quaderno();
quaderno.aggiungi({ descrizione: 'Libro', importo: 18 });
quaderno.aggiungi({ descrizione: 'Pranzo', importo: 12 });

console.log(quaderno.spese.length);
console.log(quaderno.totale());`,
    output: `2
30`,
    steps: [
      ['class Quaderno {', 'Lo stampo: ogni quaderno avrà la propria lista di spese.'],
      ['constructor() { this.spese = []; }', 'Il costruttore inizializza lo stato: ogni new crea un array nuovo.'],
      ['aggiungi(spesa) {', 'Un metodo che modifica lo stato interno e restituisce un’informazione utile.'],
      ['this.spese.reduce(...)', 'Il metodo riusa le pipeline viste nella Settimana 3.'],
      ['new Quaderno()', 'Crea l’istanza: da qui in poi lavori con un oggetto con stato.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l6e1',
      title: 'Costruttore',
      prompt: 'Completa il costruttore perché `p.formatta()` stampi `Pane: 3 €`.',
      starterCode: `class Prodotto {
  constructor(nome, prezzo) {
    // assegna nome e prezzo a this
  }

  formatta() {
    return \`\${this.nome}: \${this.prezzo} €\`;
  }
}

const p = new Prodotto('Pane', 3);
console.log(p.formatta());`,
      check: { kind: 'output', lines: ['Pane: 3 €'] },
      hints: ['this.nome = nome;', 'this.prezzo = prezzo;'],
      solution: `class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
  }

  formatta() {
    return \`\${this.nome}: \${this.prezzo} €\`;
  }
}

const p = new Prodotto('Pane', 3);
console.log(p.formatta());`,
      explanation: 'Senza assegnazioni nel costruttore, this.nome è undefined.',
      concepts: ['constructor'],
    }),
    guided({
      id: 'w4l6e2',
      title: 'Metodo che calcola',
      prompt: 'Completa `conIva` perché restituisca 122 per un prezzo di 100.',
      starterCode: `class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
  }

  conIva() {
    // prezzo * 1.22
  }
}

console.log(new Prodotto('Corso', 100).conIva());`,
      check: { kind: 'output', lines: ['122'] },
      hints: ['Usa this.prezzo.', 'return this.prezzo * 1.22;'],
      solution: `class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
  }

  conIva() {
    return this.prezzo * 1.22;
  }
}

console.log(new Prodotto('Corso', 100).conIva());`,
      explanation: 'I metodi leggono lo stato dell’istanza tramite this.',
      concepts: ['classi'],
    }),
    solo({
      id: 'w4l6e3',
      title: 'Due istanze indipendenti',
      prompt:
        'Crea `class Contatore { constructor() { this.n = 0 } incrementa() { return ++this.n } }`, crea due istanze, chiama la prima due volte e stampa `2` e `0`.',
      starterCode: `// scrivi la classe`,
      check: { kind: 'output', lines: ['2', '0'] },
      hints: ['Ogni new crea un proprio this.n.', 'Stampa a.incrementa() due volte in una variabile, poi b.n.'],
      solution: `class Contatore {
  constructor() {
    this.n = 0;
  }
  incrementa() {
    return ++this.n;
  }
}

const a = new Contatore();
const b = new Contatore();
a.incrementa();
console.log(a.incrementa());
console.log(b.n);`,
      explanation: 'Lo stato è per istanza: le classi non condividono i dati tra oggetti.',
      concepts: ['istanze'],
    }),
    transfer({
      id: 'w4l6e4',
      title: 'Quaderno minimo',
      prompt:
        'Scrivi `class Quaderno` con `spese` inizializzato a `[]`, metodo `aggiungi(importo)` e `totale()`. Aggiungi 10 e 20, stampa `30`.',
      starterCode: `// scrivi la classe`,
      objective: 'Primo passo del refactoring del progetto con le classi.',
      check: { kind: 'output', lines: ['30'] },
      hints: ['Il costruttore inizializza this.spese = [].', 'totale usa reduce su this.spese.'],
      solution: `class Quaderno {
  constructor() {
    this.spese = [];
  }

  aggiungi(importo) {
    this.spese.push(importo);
  }

  totale() {
    return this.spese.reduce((acc, i) => acc + i, 0);
  }
}

const q = new Quaderno();
q.aggiungi(10);
q.aggiungi(20);
console.log(q.totale());`,
      explanation: 'Classe = stato + comportamento: il quaderno sa gestire le proprie spese.',
      concepts: ['classi'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Dimenticare new',
      code: `class Prodotto {
  constructor(nome) {
    this.nome = nome;
  }
}
const p = Prodotto('Pane');
console.log(p.nome);`,
      error: `TypeError: Class constructor Prodotto cannot be invoked without 'new'`,
      why: 'Una classe non è una funzione normale: deve essere istanziata con new.',
      fix: `const p = new Prodotto('Pane');`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l6x1',
      prompt: 'Spiega la differenza tra una classe e un’istanza, usando il tuo quaderno come esempio.',
      keywords: ['class', 'istanza', 'stampo', 'constructor', 'new', 'stato'],
      model:
        'La classe è lo stampo: definisce quali proprietà e metodi avrà ogni quaderno. L’istanza è un quaderno concreto creato con new, con il proprio array di spese. Due istanze condividono i metodi ma hanno stati indipendenti: aggiungere una spesa a uno non tocca l’altro.',
      concepts: ['classi', 'istanze'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l6q1',
      question: 'Cosa fa il costruttore?',
      options: [
        ['Crea la classe', 'La classe è già dichiarata: il costruttore inizializza l’istanza.'],
        ['Inizializza lo stato dell’istanza al momento di new', 'Esatto.'],
        ['Restituisce sempre un oggetto nuovo', 'Il valore di ritorno è l’istanza creata da new.'],
      ],
      correct: 1,
      explanation: 'Il costruttore riceve gli argomenti di new e prepara this.',
      concepts: ['constructor'],
    }),
    quiz({
      id: 'w4l6q2',
      question: 'Due istanze della stessa classe condividono…',
      options: [
        ['Le proprietà definite nel costruttore', 'Ogni istanza ha le proprie.'],
        ['I metodi, ma non lo stato', 'Esatto.'],
        ['Tutto', 'No: lo stato è per istanza.'],
      ],
      correct: 1,
      explanation: 'I metodi vivono sul prototipo; lo stato è per oggetto.',
      concepts: ['istanze'],
    }),
    quiz({
      id: 'w4l6q3',
      question: 'Cosa accade chiamando una classe senza new?',
      options: [
        ['Funziona come una funzione', 'Le classi richiedono new.'],
        ['TypeError', 'Esatto.'],
        ['Restituisce undefined', 'Lancia un errore prima.'],
      ],
      correct: 1,
      explanation: 'Le classi non sono invocabili senza new.',
      concepts: ['classi'],
    }),
  ],
  recap: {
    points: [
      'La classe è lo stampo, l’istanza è l’oggetto.',
      'Il costruttore inizializza this.',
      'I metodi sono condivisi, lo stato no.',
      'new è obbligatorio.',
    ],
    learned: 'Sai modellare entità con stato e comportamento.',
    next: 'Ripasso e progetto: salvare il quaderno con JSON.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w4l7',
  title: 'Ripasso e progetto',
  subtitle: 'Salvare e ricaricare il Quaderno delle spese',
  minutes: 60,
  objectives: [
    'Combinare oggetti, array e JSON',
    'Serializzare e ricostruire un quaderno',
    'Gestire dati corrotti con un fallback',
  ],
  concepts: ['ripasso', 'progetto', 'persistenza'],
  activate: [
    'Se chiudi il browser, il tuo quaderno sparisce. Cosa serve per farlo sopravvivere?',
    'Serializzare lo stato in JSON e ricostruirlo al caricamento.',
  ],
  analogy:
    'Salvare è fare una fotografia del quaderno; caricare è ricostruire il quaderno dalla fotografia. La fotografia è JSON: testo, non oggetti vivi.',
  example: {
    code: `const spese = [
  { descrizione: 'Libro', importo: 18 },
  { descrizione: 'Pranzo', importo: 12 },
];

const salvato = JSON.stringify({ spese });
console.log(salvato);

const caricato = JSON.parse(salvato);
console.log(caricato.spese.length);

const totale = caricato.spese.reduce((acc, s) => acc + s.importo, 0);
console.log(totale);`,
    output: `{"spese":[{"descrizione":"Libro","importo":18},{"descrizione":"Pranzo","importo":12}]}
2
30`,
  },
  formal:
    'Salvare uno stato significa serializzare la struttura minima necessaria: un oggetto con la versione dei dati e l’array delle spese. Al caricamento si valida la forma prima di usarla: se il JSON è corrotto o manca un campo, si torna a uno stato iniziale invece di crashare. La versione del dato permette migrazioni future senza rompere i salvataggi esistenti.',
  worked: {
    code: `function serializza(spese) {
  return JSON.stringify({ versione: 1, spese });
}

function carica(testo) {
  try {
    const dati = JSON.parse(testo);
    if (!Array.isArray(dati.spese)) {
      return { versione: 1, spese: [] };
    }
    return dati;
  } catch {
    return { versione: 1, spese: [] };
  }
}

const testo = serializza([{ descrizione: 'Libro', importo: 18 }]);
console.log(carica(testo).spese.length);
console.log(carica('rotto').spese.length);`,
    output: `1
0`,
    steps: [
      ['JSON.stringify({ versione: 1, spese })', 'Salvi un contenitore con versione: utile per migrare i dati in futuro.'],
      ['JSON.parse(testo)', 'Ricostruisce l’oggetto salvato.'],
      ['if (!Array.isArray(dati.spese))', 'Validazione della forma: non fidarti dei dati salvati.'],
      ['catch { return ... }', 'Il catch senza parametro è sufficiente: qui non serve il dettaglio.'],
      ['carica(\'rotto\')', 'Testo non valido: fallback a uno stato vuoto, nessun crash.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l7e1',
      title: 'Serializza lo stato',
      prompt: 'Serializza `{ versione: 1, spese: [10, 20] }` e stampa il JSON.',
      starterCode: `const stato = { versione: 1, spese: [10, 20] };

console.log((stato));`,
      check: { kind: 'output', lines: ['{"versione":1,"spese":[10,20]}'] },
      hints: ['JSON.stringify', 'console.log(JSON.stringify(stato))'],
      solution: `const stato = { versione: 1, spese: [10, 20] };
console.log(JSON.stringify(stato));`,
      explanation: 'La versione è parte dello stato: ti servirà quando il formato cambierà.',
      concepts: ['JSON'],
    }),
    guided({
      id: 'w4l7e2',
      title: 'Carica e conta',
      prompt: 'Riporta la stringa a oggetto e stampa il numero di spese (`2`).',
      starterCode: `const salvato = '{"versione":1,"spese":[{"importo":10},{"importo":20}]}';

// parse e length
console.log();`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['JSON.parse(salvato) restituisce l’oggetto.', 'Poi .spese.length'],
      solution: `const salvato = '{"versione":1,"spese":[{"importo":10},{"importo":20}]}';

const stato = JSON.parse(salvato);
console.log(stato.spese.length);`,
      explanation: 'Dopo il parse torni a lavorare con strutture JavaScript normali.',
      concepts: ['parse'],
    }),
    solo({
      id: 'w4l7e3',
      title: 'Totale dopo il caricamento',
      prompt:
        'Dal JSON `\'{"spese":[{"importo":15},{"importo":25}]}\'`, calcola e stampa il totale `40`.',
      starterCode: `const salvato = '{"spese":[{"importo":15},{"importo":25}]}';

// parse + reduce`,
      check: { kind: 'output', lines: ['40'] },
      hints: ['Leggi stato.spese.', 'reduce((acc, s) => acc + s.importo, 0)'],
      solution: `const salvato = '{"spese":[{"importo":15},{"importo":25}]}';

const stato = JSON.parse(salvato);
const totale = stato.spese.reduce((acc, s) => acc + s.importo, 0);
console.log(totale);`,
      explanation: 'Persistenza e calcolo si compongono senza attriti.',
      concepts: ['progetto'],
    }),
    transfer({
      id: 'w4l7e4',
      title: 'Fallback sicuro',
      prompt:
        'Con `const salvato = \'non-json\'`, carica lo stato e in caso di errore stampa `Stato iniziale`.',
      starterCode: `const salvato = 'non-json';

// try/catch con fallback`,
      objective: 'Robustezza: l’app non deve bloccarsi per un dato corrotto.',
      check: { kind: 'output', lines: ['Stato iniziale'] },
      hints: ['JSON.parse lancia SyntaxError.', 'Nel catch stampa la stringa richiesta.'],
      solution: `const salvato = 'non-json';

try {
  JSON.parse(salvato);
} catch {
  console.log('Stato iniziale');
}`,
      explanation: 'Un dato corrotto non deve distruggere l’esperienza: si riparte da uno stato coerente.',
      concepts: ['persistenza'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Fidarsi dei dati salvati',
      code: `const stato = JSON.parse('{"spese": null}');
console.log(stato.spese.length);`,
      error: `TypeError: Cannot read properties of null (reading 'length')`,
      why: 'Il JSON è valido ma la forma non è quella attesa: null non ha length.',
      fix: `const spese = Array.isArray(stato.spese) ? stato.spese : [];`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l7x1',
      prompt: 'Spiega come salveresti il quaderno e perché servono try/catch e validazione.',
      keywords: ['json', 'salv', 'stringify', 'parse', 'valid', 'catch'],
      model:
        'Salvo con JSON.stringify un oggetto con versione e array delle spese. Al caricamento uso JSON.parse dentro try/catch, perché il testo potrebbe essere corrotto, e controllo che spese sia un array prima di usarlo. Se qualcosa non torna, riparto da uno stato iniziale invece di far crashare l’app.',
      concepts: ['persistenza'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l7q1',
      question: 'Perché salvare anche un campo versione?',
      options: [
        ['Per contare i salvataggi', 'Non serve a contare.'],
        ['Per poter migrare il formato dei dati in futuro', 'Esatto.'],
        ['Perché JSON lo richiede', 'JSON non richiede alcun campo versione.'],
      ],
      correct: 1,
      explanation: 'La versione permette di riconoscere e aggiornare formati vecchi.',
      concepts: ['persistenza'],
    }),
    quiz({
      id: 'w4l7q2',
      question: 'Cosa controlli prima di usare `dati.spese`?',
      options: [
        ['Che sia un array con Array.isArray', 'Esatto.'],
        ['Che sia una stringa', 'Dovrebbe essere un array.'],
        ['Che sia maggiore di zero', 'Un array vuoto è valido.'],
      ],
      correct: 0,
      explanation: 'La validazione della forma evita TypeError.',
      concepts: ['persistenza'],
    }),
    quiz({
      id: 'w4l7q3',
      question: 'Cosa succede se il JSON salvato è corrotto e non usi try/catch?',
      options: [
        ['JSON.parse restituisce null', 'Lancia SyntaxError.'],
        ['Lo script si interrompe su quella riga', 'Esatto.'],
        ['Viene ignorato', 'Non viene ignorato.'],
      ],
      correct: 1,
      explanation: 'L’eccezione non gestita interrompe l’esecuzione.',
      concepts: ['parse'],
    }),
  ],
  recap: {
    points: [
      'Salva uno stato minimo e versionato.',
      'Valida la forma prima di usare i dati.',
      'try/catch sul parse è obbligatorio.',
      'Un fallback chiaro è parte del progetto.',
    ],
    learned: 'Il Quaderno delle spese sopravvive alla chiusura del programma.',
    next: 'Lato professionale: leggere la documentazione degli oggetti e gestire i riferimenti.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w4l8',
  title: 'Lato professionale e test',
  subtitle: 'Riferimenti, clonazione e verifica della settimana',
  minutes: 50,
  objectives: [
    'Distinguere valore e riferimento',
    'Clonare correttamente strutture annidate',
    'Superare il test della settimana',
  ],
  concepts: ['riferimenti', 'clonazione', 'test'],
  activate: [
    'Perché modificare `b.nested.x` cambia anche `a.nested.x` dopo una copia con spread?',
    'Perché gli oggetti sono riferimenti: la copia superficiale duplica il puntatore al dato annidato.',
  ],
  analogy:
    'Un oggetto è un indirizzo, non una casa. Copiare l’oggetto copia l’indirizzo: due persone possono arrivare alla stessa casa. structuredClone costruisce una casa nuova.',
  example: {
    code: `const a = { valore: 1, lista: [1, 2] };
const b = { ...a };

b.valore = 2;
b.lista.push(3);

console.log(a.valore);
console.log(a.lista);`,
    output: `1
[1, 2, 3]`,
  },
  formal:
    'I primitivi (number, string, boolean, null, undefined) si copiano per valore. Oggetti e array si copiano per riferimento. Lo spread e Object.assign copiano un livello; structuredClone esegue una copia profonda (non supporta funzioni). Il confronto tra oggetti con === confronta il riferimento, non il contenuto: per il contenuto serve una comparazione esplicita o una libreria.',
  worked: {
    code: `const originale = { nome: 'Pane', dettagli: { bio: false } };

const superficiale = { ...originale };
superficiale.dettagli.bio = true;

const profonda = structuredClone(originale);
profonda.dettagli.bio = false;

console.log('Originale:', originale.dettagli.bio);
console.log('Profonda:', profonda.dettagli.bio);
console.log({} === {});`,
    output: `Originale: true
Profonda: false
false`,
    steps: [
      ['const superficiale = { ...originale };', 'Copia di un livello: dettagli resta condiviso.'],
      ['superficiale.dettagli.bio = true;', 'Modifica che si riflette sull’originale.'],
      ['structuredClone(originale)', 'Copia profonda: dettagli è un nuovo oggetto.'],
      ['profonda.dettagli.bio = false;', 'Non tocca l’originale.'],
      ['{} === {}', 'Due oggetti distinti non sono mai uguali: si confrontano i riferimenti.'],
    ],
  },
  exercises: [
    fill({
      id: 'w4l8e1',
      title: 'Copia profonda',
      prompt:
        'Crea una copia profonda, modifica `dettagli.bio` in true e stampa `false` (l’originale non cambia).',
      starterCode: `const originale = { dettagli: { bio: false } };

const copia = (originale);
copia.dettagli.bio = true;

console.log(originale.dettagli.bio);`,
      check: { kind: 'output', lines: ['false'] },
      hints: ['structuredClone crea una copia profonda.', 'const copia = structuredClone(originale);'],
      solution: `const originale = { dettagli: { bio: false } };

const copia = structuredClone(originale);
copia.dettagli.bio = true;

console.log(originale.dettagli.bio);`,
      explanation: 'La copia profonda isola completamente le due strutture.',
      concepts: ['clonazione'],
    }),
    guided({
      id: 'w4l8e2',
      title: 'Confronto di contenuto',
      prompt:
        'Stampa `true` se `a.valore` è uguale a `b.valore`, poi `false` confrontando i due oggetti con ===.',
      starterCode: `const a = { valore: 1 };
const b = { valore: 1 };

// due console.log`,
      check: { kind: 'output', lines: ['true', 'false'] },
      hints: ['a.valore === b.valore confronta primitivi.', 'a === b confronta riferimenti.'],
      solution: `const a = { valore: 1 };
const b = { valore: 1 };

console.log(a.valore === b.valore);
console.log(a === b);`,
      explanation: '=== tra oggetti confronta il riferimento: due oggetti con lo stesso contenuto restano diversi.',
      concepts: ['riferimenti'],
    }),
    solo({
      id: 'w4l8e3',
      title: 'Aggiornamento immutabile',
      prompt:
        'Da `{ nome: \'Pane\', prezzo: 3 }`, crea un nuovo oggetto con prezzo 4 e stampa l’originale ancora a 3.',
      starterCode: `const prodotto = { nome: 'Pane', prezzo: 3 };

// copia + modifica + stampa originale`,
      check: { kind: 'output', lines: ['3'] },
      hints: ['const aggiornato = { ...prodotto, prezzo: 4 };', 'Stampa prodotto.prezzo.'],
      solution: `const prodotto = { nome: 'Pane', prezzo: 3 };
const aggiornato = { ...prodotto, prezzo: 4 };
console.log(prodotto.prezzo);`,
      explanation: 'L’aggiornamento immutabile è la base di React e dello stato prevedibile.',
      concepts: ['riferimenti'],
    }),
    transfer({
      id: 'w4l8e4',
      title: 'Copia di un array di oggetti',
      prompt:
        'Da `[{ n: \'a\', v: 1 }]`, crea una copia profonda, modifica `v` a 2 nella copia e stampa il valore originale `1`.',
      starterCode: `const voci = [{ n: 'a', v: 1 }];

// structuredClone, modifica, stampa originale`,
      objective: 'Riconoscere che anche gli array di oggetti richiedono una copia profonda.',
      check: { kind: 'output', lines: ['1'] },
      hints: ['const copia = structuredClone(voci);', 'copia[0].v = 2; poi stampa voci[0].v.'],
      solution: `const voci = [{ n: 'a', v: 1 }];

const copia = structuredClone(voci);
copia[0].v = 2;

console.log(voci[0].v);`,
      explanation: 'Lo spread dell’array copierebbe solo i riferimenti agli oggetti interni.',
      concepts: ['clonazione'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Confronto di oggetti',
      code: `console.log({ a: 1 } === { a: 1 });`,
      error: `false`,
      why: '=== confronta l’identità, non il contenuto: sono due oggetti diversi in memoria.',
      fix: `console.log(JSON.stringify(a) === JSON.stringify(b)); // per strutture semplici`,
    }),
  ],
  explains: [
    explain({
      id: 'w4l8x1',
      prompt: 'Spiega la differenza tra copia superficiale e copia profonda con un esempio.',
      keywords: ['superficial', 'profond', 'riferiment', 'structuredclone', 'spread', 'annidat'],
      model:
        'La copia superficiale duplica solo il primo livello: le proprietà che contengono oggetti restano condivise, quindi modificarle si vede in entrambe le strutture. La copia profonda ricrea anche gli oggetti interni, per esempio con structuredClone, così le due strutture sono indipendenti. Uso la superficiale per dati piatti, la profonda quando ci sono annidamenti che verranno modificati.',
      concepts: ['clonazione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w4l8q1',
      question: 'Cosa stampa `const a = [1]; const b = a; b.push(2); console.log(a.length);`',
      options: [
        ['1', 'a e b sono lo stesso array.'],
        ['2', 'Esatto: riferimento condiviso.'],
        ['Errore', 'Nessun errore.'],
      ],
      correct: 1,
      explanation: 'Assegnare un array non lo copia: ne copia il riferimento.',
      concepts: ['riferimenti'],
    }),
    quiz({
      id: 'w4l8q2',
      question: 'Quale strumento fa una copia profonda nativa?',
      options: [
        ['Lo spread', 'Solo superficiale.'],
        ['structuredClone', 'Esatto.'],
        ['Object.assign', 'Solo superficiale.'],
      ],
      correct: 1,
      explanation: 'structuredClone è l’API nativa per le copie profonde.',
      concepts: ['clonazione'],
    }),
    quiz({
      id: 'w4l8q3',
      question: 'Perché `{} === {}` è false?',
      options: [
        ['Perché manca una proprietà', 'Il contenuto è identico: cambia il riferimento.'],
        ['Perché confronta i riferimenti, non i contenuti', 'Esatto.'],
        ['Perché gli oggetti non si possono confrontare', 'Si possono confrontare, ma non per contenuto con ===.'],
      ],
      correct: 1,
      explanation: 'L’uguaglianza tra oggetti è per identità.',
      concepts: ['riferimenti'],
    }),
  ],
  recap: {
    points: [
      'Primitivi per valore, oggetti per riferimento.',
      'Spread e assign copiano un livello.',
      'structuredClone per la copia profonda.',
      '=== tra oggetti confronta l’identità.',
    ],
    learned: 'Sai gestire riferimenti e copie senza bug a distanza.',
    next: 'Settimana 5: il DOM, dove il codice diventa interfaccia.',
  },
});

export const week04 = makeWeek({
  id: W,
  number: 4,
  title: 'Oggetti',
  subtitle: 'Modellare dati, classi e persistenza',
  description:
    'Oggetti e classi per descrivere il mondo reale, JSON per farlo sopravvivere. È la settimana in cui il quaderno diventa un modello di dati serio.',
  goals: [
    'Leggere e mutare oggetti in sicurezza',
    'Estrarre dati con destructuring',
    'Combinare oggetti senza mutare',
    'Serializzare e ricaricare lo stato',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — salvataggio JSON',
    brief:
      'Il quaderno impara a salvarsi e ricaricarsi: struttura versionata, validazione e fallback sicuro.',
    deliverable: 'Funzioni serializza/carica con gestione degli errori e totale ricalcolato.',
    milestones: [
      'Oggetti spesa con proprietà coerenti',
      'Stato versionato serializzato in JSON',
      'Caricamento con validazione e fallback',
    ],
  },
  professional: {
    title: 'Riferimenti, copie e documentazione',
    topics: [
      'Valore vs riferimento',
      'Copia superficiale e structuredClone',
      'Leggere Object su MDN e scegliere il metodo giusto',
    ],
    exercise: 'Provocare un bug di riferimento condiviso e ripararlo con una copia profonda.',
  },
});
