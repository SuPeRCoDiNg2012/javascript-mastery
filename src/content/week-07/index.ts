import { contrast, explain, fill, guided, lesson, makeWeek, quiz, solo, transfer } from '../authoring';

const W = 'week-07';

const l1 = lesson(W, 1, {
  id: 'w7l1',
  title: 'Classi: costruire modelli',
  subtitle: 'constructor, metodi e istanze con stato',
  minutes: 50,
  objectives: [
    'Dichiarare una classe con stato e comportamento',
    'Creare istanze con new',
    'Rendere i metodi indipendenti dai dati specifici',
  ],
  concepts: ['classi', 'istanze', 'metodi'],
  activate: [
    'Nella Settimana 4 hai scritto classi semplici. Cosa distingue una classe da un oggetto letterale?',
    'La classe è un modello riutilizzabile: ogni istanza ha il proprio stato ma condivide i metodi.',
  ],
  analogy:
    'La classe è il progetto di una scheda; le istanze sono le schede compilate. Il progetto definisce i campi e le operazioni, le schede contengono i valori.',
  example: {
    code: `class Spesa {
  constructor(descrizione, importo, categoria = 'altro') {
    this.descrizione = descrizione;
    this.importo = importo;
    this.categoria = categoria;
  }

  formatta() {
    return \`\${this.descrizione} — \${this.importo.toFixed(2)} €\`;
  }

  conIva(aliquota = 0.22) {
    return this.importo * (1 + aliquota);
  }
}

const spesa = new Spesa('Libro', 18, 'studio');
console.log(spesa.formatta());
console.log(spesa.conIva());
console.log(spesa.categoria);`,
    output: `Libro — 18.00 €
21.96
studio`,
  },
  formal:
    'Il costruttore inizializza le proprietà dell’istanza. I metodi sono definiti nel corpo della classe e condividono this. I parametri con default rendono il costruttore flessibile. Una classe ben progettata ha una responsabilità chiara: Spesa descrive una spesa, non gestisce l’intera applicazione. Le istanze sono indipendenti: modificare una non tocca le altre.',
  worked: {
    code: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }

  formatta() {
    return this.descrizione + ': ' + this.importo.toFixed(2) + ' €';
  }
}

const spese = [
  new Spesa('Libro', 18),
  new Spesa('Pranzo', 12.5),
];

const totale = spese.reduce((acc, spesa) => acc + spesa.importo, 0);

spese.forEach((spesa) => console.log(spesa.formatta()));
console.log('Totale:', totale);`,
    output: `Libro: 18.00 €
Pranzo: 12.50 €
Totale: 30.5`,
    steps: [
      ['new Spesa(\'Libro\', 18)', 'Ogni new crea un oggetto con il proprio stato.'],
      ['this.descrizione = descrizione', 'Il parametro viene salvato sull’istanza: senza this resterebbe locale.'],
      ['spesa.formatta()', 'Il metodo legge this.importo dell’istanza su cui è chiamato.'],
      ['reduce((acc, spesa) => acc + spesa.importo, 0)', 'Le classi si combinano con le pipeline: sono dati come gli altri.'],
      ['spese.forEach(...)', 'Il polimorfismo implicito: ogni spesa si formatta da sola.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l1e1',
      title: 'Costruttore completo',
      prompt: 'Completa il costruttore perché `s.formatta()` stampi `Pane: 3.00 €`.',
      starterCode: `class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
  }

  formatta() {
    return this.nome + ': ' + this.prezzo.toFixed(2) + ' €';
  }
}

console.log(new Prodotto('Pane', 3).formatta());`,
      check: { kind: 'output', lines: ['Pane: 3.00 €'] },
      hints: ['Manca l’assegnazione del prezzo.', 'Aggiungi this.prezzo = prezzo;'],
      solution: `class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
  }

  formatta() {
    return this.nome + ': ' + this.prezzo.toFixed(2) + ' €';
  }
}

console.log(new Prodotto('Pane', 3).formatta());`,
      explanation: 'Senza assegnazione this.prezzo è undefined e toFixed fallisce.',
      concepts: ['constructor'],
    }),
    guided({
      id: 'w7l1e2',
      title: 'Metodo con default',
      prompt:
        'Completa `conSconto(sconto = 0.1)` perché restituisca 90 per un prodotto da 100 senza argomenti.',
      starterCode: `class Prodotto {
  constructor(prezzo) {
    this.prezzo = prezzo;
  }

  conSconto(sconto = 0.1) {
    // restituisci il prezzo scontato
  }
}

console.log(new Prodotto(100).conSconto());`,
      check: { kind: 'output', lines: ['90'] },
      hints: ['La formula è this.prezzo * (1 - sconto).', 'Il default copre la chiamata senza argomenti.'],
      solution: `class Prodotto {
  constructor(prezzo) {
    this.prezzo = prezzo;
  }

  conSconto(sconto = 0.1) {
    return this.prezzo * (1 - sconto);
  }
}

console.log(new Prodotto(100).conSconto());`,
      explanation: 'Default nel metodo: il caso comune non richiede argomenti.',
      concepts: ['metodi'],
    }),
    solo({
      id: 'w7l1e3',
      title: 'Due istanze indipendenti',
      prompt:
        'Crea `class Contatore` con `incrementa()`; crea due istanze, incrementa la prima due volte e stampa `2` e `0`.',
      starterCode: `// scrivi la classe`,
      check: { kind: 'output', lines: ['2', '0'] },
      hints: ['Stato nel costruttore: this.n = 0.', 'incrementa restituisce ++this.n.'],
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
      explanation: 'Lo stato è per istanza: le classi non condividono i dati.',
      concepts: ['istanze'],
    }),
    transfer({
      id: 'w7l1e4',
      title: 'Collezione di istanze',
      prompt:
        'Crea due `Spesa` (10 e 20), mettile in un array e stampa il totale (`30`) e la descrizione della più cara.',
      starterCode: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
}

// array + reduce + find`,
      objective: 'Combinare classi e pipeline sui dati.',
      check: { kind: 'output', lines: ['30', 'Cena'] },
      hints: ['reduce per il totale.', 'sort su copia o reduce per il massimo.'],
      solution: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
}

const spese = [new Spesa('Libro', 10), new Spesa('Cena', 20)];
console.log(spese.reduce((acc, s) => acc + s.importo, 0));
const max = spese.reduce((m, s) => (s.importo > m.importo ? s : m), spese[0]);
console.log(max.descrizione);`,
      explanation: 'Le istanze sono oggetti normali: funzionano con map, filter e reduce.',
      concepts: ['istanze'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Proprietà senza this',
      code: `class Prodotto {
  constructor(prezzo) {
    prezzo = prezzo;
  }
}
console.log(new Prodotto(10).prezzo);`,
      error: `undefined`,
      why: 'Senza this l’assegnazione modifica il parametro locale, non l’istanza.',
      fix: `this.prezzo = prezzo;`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l1x1',
      prompt: 'Spiega il ruolo del costruttore e dei metodi in una classe.',
      keywords: ['constructor', 'metod', 'istanza', 'stato', 'this', 'new'],
      model:
        'Il costruttore viene eseguito da new e inizializza lo stato dell’istanza assegnando i parametri a this. I metodi definiscono il comportamento e leggono o modificano quello stato tramite this. Ogni istanza ha il proprio stato, mentre i metodi sono condivisi: è così che una classe può descrivere molte spese diverse con lo stesso codice.',
      concepts: ['classi'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l1q1',
      question: 'Quando viene eseguito il costruttore?',
      options: [
        ['Quando dichiari la classe', 'La dichiarazione non crea istanze.'],
        ['Quando chiami new', 'Esatto.'],
        ['Al primo accesso a un metodo', 'Non è lazy.'],
      ],
      correct: 1,
      explanation: 'new crea l’istanza ed esegue il costruttore.',
      concepts: ['constructor'],
    }),
    quiz({
      id: 'w7l1q2',
      question: 'Cosa distingue lo stato tra due istanze?',
      options: [
        ['Le proprietà assegnate a this nel costruttore', 'Esatto.'],
        ['I metodi', 'I metodi sono condivisi.'],
        ['Il nome della classe', 'Non incide.'],
      ],
      correct: 0,
      explanation: 'Ogni istanza ha le proprie proprietà.',
      concepts: ['istanze'],
    }),
    quiz({
      id: 'w7l1q3',
      question: 'Cosa restituisce `formatta()` se `this.importo` è undefined?',
      options: [
        ['0', 'Nessuna conversione automatica.'],
        ['Un TypeError al momento di toFixed', 'Esatto.'],
        ['Una stringa vuota', 'No: il metodo verrebbe chiamato su undefined.'],
      ],
      correct: 1,
      explanation: 'undefined non ha toFixed: errore esplicito.',
      concepts: ['metodi'],
    }),
  ],
  recap: {
    points: [
      'La classe è un modello, l’istanza è un oggetto.',
      'Il costruttore inizializza this.',
      'I metodi descrivono il comportamento.',
      'Le istanze si combinano con le pipeline.',
    ],
    learned: 'Sai modellare entità con stato e comportamento coerenti.',
    next: 'Ereditarietà: estendere un modello senza duplicarlo.',
  },
});

const l2 = lesson(W, 2, {
  id: 'w7l2',
  title: 'Ereditarietà',
  subtitle: 'extends, super e override',
  minutes: 55,
  objectives: [
    'Estendere una classe con extends',
    'Chiamare il costruttore padre con super',
    'Sovrascrivere un metodo in modo coerente',
  ],
  concepts: ['extends', 'super', 'override'],
  activate: [
    'Spesa e SpesaRicorrente condividono quasi tutto. Copieresti la classe o ne estenderesti una?',
    'L’ereditarietà permette di riusare il comportamento e aggiungere solo le differenze.',
  ],
  analogy:
    'L’ereditarietà è una specializzazione: “una spesa ricorrente è una spesa, con in più la frequenza”. Il figlio eredita ciò che il padre sa fare e può specializzarlo.',
  example: {
    code: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }

  descrivi() {
    return \`\${this.descrizione}: \${this.importo} €\`;
  }
}

class SpesaRicorrente extends Spesa {
  constructor(descrizione, importo, frequenza) {
    super(descrizione, importo);
    this.frequenza = frequenza;
  }

  descrivi() {
    return super.descrivi() + \` (ogni \${this.frequenza})\`;
  }
}

const s = new SpesaRicorrente('Affitto', 700, 'mese');
console.log(s.descrivi());
console.log(s instanceof Spesa);`,
    output: `Affitto: 700 € (ogni mese)
true`,
  },
  formal:
    'class Figlio extends Padre eredita metodi e proprietà del prototipo. Nel costruttore del figlio super(...) deve essere chiamato prima di usare this. Un metodo con lo stesso nome sovrascrive quello del padre; super.metodo() invoca la versione del padre. instanceof verifica la catena. L’ereditarietà va usata quando c’è una vera relazione “è un”: altrimenti meglio la composizione (lezione 6).',
  worked: {
    code: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }

  totale() {
    return this.importo;
  }
}

class SpesaTassata extends Spesa {
  constructor(descrizione, importo, aliquota) {
    super(descrizione, importo);
    this.aliquota = aliquota;
  }

  totale() {
    return super.totale() * (1 + this.aliquota);
  }
}

const spese = [new Spesa('Pane', 3), new SpesaTassata('Corso', 100, 0.22)];
const totale = spese.reduce((acc, s) => acc + s.totale(), 0);

console.log(spese[0].totale());
console.log(spese[1].totale());
console.log(totale);`,
    output: `3
122
125`,
    steps: [
      ['class SpesaTassata extends Spesa', 'Eredita la struttura e il comportamento di Spesa.'],
      ['super(descrizione, importo)', 'Esegue il costruttore del padre: obbligatorio prima di this.'],
      ['this.aliquota = aliquota', 'Aggiunge solo lo stato specifico del figlio.'],
      ['super.totale()', 'Riusa il calcolo del padre invece di duplicarlo.'],
      ['spese.reduce(...)', 'Polimorfismo: ogni istanza usa il proprio totale().'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l2e1',
      title: 'Estendi la classe',
      prompt: 'Completa l’extends e stampa `Ciao, Ada`.',
      starterCode: `class Persona {
  constructor(nome) {
    this.nome = nome;
  }
  saluta() {
    return 'Ciao, ' + this.nome;
  }
}

class Studente  Persona {}

console.log(new Studente('Ada').saluta());`,
      check: { kind: 'output', lines: ['Ciao, Ada'] },
      hints: ['La parola chiave è extends.', 'class Studente extends Persona {}'],
      solution: `class Persona {
  constructor(nome) {
    this.nome = nome;
  }
  saluta() {
    return 'Ciao, ' + this.nome;
  }
}

class Studente extends Persona {}

console.log(new Studente('Ada').saluta());`,
      explanation: 'Senza costruttore proprio, il figlio usa quello del padre.',
      concepts: ['extends'],
    }),
    guided({
      id: 'w7l2e2',
      title: 'Chiama super',
      prompt:
        'Completa il costruttore del figlio: `new Studente(\'Ada\', 3)` deve stampare `Ada - anno 3`.',
      starterCode: `class Persona {
  constructor(nome) {
    this.nome = nome;
  }
}

class Studente extends Persona {
  constructor(nome, anno) {
    // chiama il padre e salva anno
  }
  descrizione() {
    return this.nome + ' - anno ' + this.anno;
  }
}

console.log(new Studente('Ada', 3).descrizione());`,
      check: { kind: 'output', lines: ['Ada - anno 3'] },
      hints: ['super(nome) prima di this.', 'Poi this.anno = anno.'],
      solution: `class Persona {
  constructor(nome) {
    this.nome = nome;
  }
}

class Studente extends Persona {
  constructor(nome, anno) {
    super(nome);
    this.anno = anno;
  }
  descrizione() {
    return this.nome + ' - anno ' + this.anno;
  }
}

console.log(new Studente('Ada', 3).descrizione());`,
      explanation: 'super inizializza la parte ereditata; il figlio aggiunge il resto.',
      concepts: ['super'],
    }),
    solo({
      id: 'w7l2e3',
      title: 'Override con super',
      prompt:
        'Estendi `Prodotto` con `ProdottoScontato` che sovrascrive `prezzoFinale()` applicando il 10%: stampa `90`.',
      starterCode: `class Prodotto {
  constructor(prezzo) {
    this.prezzo = prezzo;
  }
  prezzoFinale() {
    return this.prezzo;
  }
}

// classe figlia`,
      check: { kind: 'output', lines: ['90'] },
      hints: ['Sovrascrivi prezzoFinale e usa super.prezzoFinale().', 'Moltiplica per 0.9.'],
      solution: `class Prodotto {
  constructor(prezzo) {
    this.prezzo = prezzo;
  }
  prezzoFinale() {
    return this.prezzo;
  }
}

class ProdottoScontato extends Prodotto {
  prezzoFinale() {
    return super.prezzoFinale() * 0.9;
  }
}

console.log(new ProdottoScontato(100).prezzoFinale());`,
      explanation: 'super conserva la logica del padre e il figlio la specializza.',
      concepts: ['override'],
    }),
    transfer({
      id: 'w7l2e4',
      title: 'Polimorfismo',
      prompt:
        'Con un array `[new Spesa(\'Pane\', 3), new SpesaTassata(...22%)]`, somma i totali usando lo stesso metodo: stampa `125`.',
      starterCode: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
  totale() { return this.importo; }
}

class SpesaTassata extends Spesa {
  constructor(descrizione, importo, aliquota) {
    super(descrizione, importo);
    this.aliquota = aliquota;
  }
  totale() { return super.totale() * (1 + this.aliquota); }
}

// somma polimorfica`,
      objective: 'Sfruttare l’interfaccia comune senza controllare il tipo.',
      check: { kind: 'output', lines: ['125'] },
      hints: ['Non serve typeof: entrambe hanno totale().', 'reduce((acc, s) => acc + s.totale(), 0)'],
      solution: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
  totale() { return this.importo; }
}

class SpesaTassata extends Spesa {
  constructor(descrizione, importo, aliquota) {
    super(descrizione, importo);
    this.aliquota = aliquota;
  }
  totale() { return super.totale() * (1 + this.aliquota); }
}

const spese = [new Spesa('Pane', 3), new SpesaTassata('Corso', 100, 0.22)];
console.log(spese.reduce((acc, s) => acc + s.totale(), 0));`,
      explanation: 'Il polimorfismo è il vero guadagno: il codice chiamante non cambia.',
      concepts: ['override'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'this prima di super',
      code: `class Persona {
  constructor(nome) { this.nome = nome; }
}
class Studente extends Persona {
  constructor(nome) {
    this.anno = 1;
    super(nome);
  }
}`,
      error: `ReferenceError: Must call super constructor in derived class before accessing 'this'`,
      why: 'Nelle classi derivate this esiste solo dopo super(): il padre deve inizializzare la base.',
      fix: `constructor(nome) {
  super(nome);
  this.anno = 1;
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l2x1',
      prompt: 'Spiega cosa fa super e perché è obbligatorio nel costruttore di una classe derivata.',
      keywords: ['super', 'padre', 'constructor', 'this', 'eredit', 'obbligator'],
      model:
        'super(...) invoca il costruttore della classe padre e inizializza la parte ereditata dell’istanza. In una classe derivata this non è disponibile prima di super, perché è il padre a creare e inizializzare l’oggetto. super.metodo() serve invece a richiamare un metodo del padre quando lo si sovrascrive.',
      concepts: ['super'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l2q1',
      question: 'Cosa fa `extends`?',
      options: [
        ['Copia il codice del padre nella classe figlia', 'Imposta la catena prototipale.'],
        ['Crea una relazione di ereditarietà', 'Esatto.'],
        ['Rende la classe astratta', 'Non esiste un modificatore abstract in JS.'],
      ],
      correct: 1,
      explanation: 'Il figlio eredita metodi e comportamento del padre.',
      concepts: ['extends'],
    }),
    quiz({
      id: 'w7l2q2',
      question: 'Perché super va chiamato prima di this?',
      options: [
        ['Perché this esiste solo dopo l’inizializzazione del padre', 'Esatto.'],
        ['Perché è una convenzione di stile', 'È un requisito del linguaggio.'],
        ['Per migliorare la performance', 'Non è una questione di performance.'],
      ],
      correct: 0,
      explanation: 'Il padre crea la base dell’istanza.',
      concepts: ['super'],
    }),
    quiz({
      id: 'w7l2q3',
      question: 'Cosa permette `super.metodo()`?',
      options: [
        ['Di chiamare il metodo del padre anche dopo l’override', 'Esatto.'],
        ['Di creare una nuova istanza', 'Per quello c’è new.'],
        ['Di rendere il metodo privato', 'Non ha questo effetto.'],
      ],
      correct: 0,
      explanation: 'Riusa la logica del padre dentro la versione specializzata.',
      concepts: ['override'],
    }),
  ],
  recap: {
    points: [
      'extends crea la relazione padre-figlio.',
      'super(...) inizializza la parte ereditata.',
      'super.metodo() riusa la logica del padre.',
      'Override = stesso nome, comportamento specializzato.',
    ],
    learned: 'Sai estendere modelli senza duplicare codice.',
    next: 'Getter, setter e membri statici.',
  },
});

const l3 = lesson(W, 3, {
  id: 'w7l3',
  title: 'Getter, setter e static',
  subtitle: 'Accesso controllato e utilità di classe',
  minutes: 50,
  objectives: [
    'Definire getter e setter per proprietà calcolate',
    'Validare un valore nel setter',
    'Usare membri statici per funzioni di classe',
  ],
  concepts: ['getter/setter', 'static', 'validazione'],
  activate: [
    'Vuoi che `spesa.totaleConIva` sia calcolato al volo, senza salvarlo. Come si fa?',
    'Con un getter: si legge come una proprietà, ma è una funzione.',
  ],
  analogy:
    'Il getter è una vetrina: mostri un valore calcolato senza esporre il magazzino. Il setter è il buttafuori: controlla che il valore che entra sia valido prima di accettarlo. static è l’ufficio centrale: non serve una scheda per usarlo.',
  example: {
    code: `class Prodotto {
  constructor(prezzo) {
    this._prezzo = prezzo;
  }

  get prezzo() {
    return this._prezzo;
  }

  set prezzo(valore) {
    if (valore < 0) {
      throw new Error('Il prezzo non può essere negativo');
    }
    this._prezzo = valore;
  }

  get prezzoConIva() {
    return this._prezzo * 1.22;
  }

  static daEuro(cents) {
    return new Prodotto(cents / 100);
  }
}

const p = new Prodotto(100);
console.log(p.prezzoConIva);
p.prezzo = 50;
console.log(p.prezzo);
console.log(Prodotto.daEuro(250).prezzo);`,
    output: `122
50
2.5`,
  },
  formal:
    'get nome() e set nome(valore) definiscono accessor properties: si usano come proprietà, non come metodi. Il setter può validare e lanciare o ignorare valori non validi. Per convenzione la proprietà interna si chiama _nome, ma non è privata davvero (per quello ci sono i campi #). static nome() definisce un metodo sulla classe, non sulle istanze: si usa per factory e utility.',
  worked: {
    code: `class Conto {
  constructor(saldo = 0) {
    this._saldo = saldo;
    this.movimenti = [];
  }

  get saldo() {
    return this._saldo;
  }

  deposita(importo) {
    if (importo <= 0) {
      return 'Importo non valido';
    }
    this._saldo += importo;
    this.movimenti.push(importo);
    return this._saldo;
  }

  get numeroMovimenti() {
    return this.movimenti.length;
  }

  static vuoto() {
    return new Conto(0);
  }
}

const conto = Conto.vuoto();
console.log(conto.deposita(50));
console.log(conto.deposita(-10));
console.log(conto.numeroMovimenti);`,
    output: `50
Importo non valido
1`,
    steps: [
      ['get saldo()', 'Si legge come conto.saldo, senza parentesi.'],
      ['deposita(importo)', 'Un metodo che valida e modifica lo stato.'],
      ['this.movimenti.push(importo)', 'Stato interno aggiornato solo dopo la validazione.'],
      ['get numeroMovimenti()', 'Proprietà calcolata: nessun dato duplicato.'],
      ['Conto.vuoto()', 'Metodo statico: non richiede un’istanza esistente.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l3e1',
      title: 'Getter calcolato',
      prompt: 'Aggiungi un getter `doppio` che restituisca il doppio di `valore`. Stampa `10`.',
      starterCode: `class Numero {
  constructor(valore) {
    this.valore = valore;
  }

  get () {
    return this.valore * 2;
  }
}

console.log(new Numero(5).doppio);`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['La sintassi è get nome() { ... }.', 'Il nome è doppio.'],
      solution: `class Numero {
  constructor(valore) {
    this.valore = valore;
  }

  get doppio() {
    return this.valore * 2;
  }
}

console.log(new Numero(5).doppio);`,
      explanation: 'Il getter si legge come una proprietà, senza ().',
      concepts: ['getter/setter'],
    }),
    guided({
      id: 'w7l3e2',
      title: 'Setter validante',
      prompt:
        'Completa il setter: rifiuta i valori negativi lanciando un errore. Con 10 deve stampare `10`.',
      starterCode: `class Prodotto {
  constructor(prezzo) {
    this._prezzo = prezzo;
  }

  set prezzo(valore) {
    // valida
  }

  get prezzo() {
    return this._prezzo;
  }
}

const p = new Prodotto(5);
p.prezzo = 10;
console.log(p.prezzo);`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['if (valore < 0) throw new Error(...)', 'Altrimenti this._prezzo = valore.'],
      solution: `class Prodotto {
  constructor(prezzo) {
    this._prezzo = prezzo;
  }

  set prezzo(valore) {
    if (valore < 0) {
      throw new Error('Prezzo negativo');
    }
    this._prezzo = valore;
  }

  get prezzo() {
    return this._prezzo;
  }
}

const p = new Prodotto(5);
p.prezzo = 10;
console.log(p.prezzo);`,
      explanation: 'Il setter è il punto di controllo: nessun valore invalido entra nello stato.',
      concepts: ['validazione'],
    }),
    solo({
      id: 'w7l3e3',
      title: 'Metodo statico',
      prompt:
        'Aggiungi `Prodotto.daCents(250)` che restituisce un prodotto con prezzo 2.5. Stampa `2.5`.',
      starterCode: `class Prodotto {
  constructor(prezzo) {
    this.prezzo = prezzo;
  }
}

// metodo statico`,
      check: { kind: 'output', lines: ['2.5'] },
      hints: ['static daCents(cents) { ... }', 'Restituisci new Prodotto(cents / 100).'],
      solution: `class Prodotto {
  constructor(prezzo) {
    this.prezzo = prezzo;
  }

  static daCents(cents) {
    return new Prodotto(cents / 100);
  }
}

console.log(Prodotto.daCents(250).prezzo);`,
      explanation: 'Le factory statiche esprimono conversioni legate al tipo, non all’istanza.',
      concepts: ['static'],
    }),
    transfer({
      id: 'w7l3e4',
      title: 'Getter con conteggio',
      prompt:
        'Con `Conto` che ha `movimenti`, aggiungi il getter `numeroMovimenti` e deposita 10 e 20: stampa `2`.',
      starterCode: `class Conto {
  constructor() {
    this.movimenti = [];
  }
  deposita(importo) {
    this.movimenti.push(importo);
  }
}

// getter`,
      objective: 'Derivare un valore dallo stato senza duplicarlo.',
      check: { kind: 'output', lines: ['2'] },
      hints: ['get numeroMovimenti() { return this.movimenti.length; }', 'Chiama deposita due volte.'],
      solution: `class Conto {
  constructor() {
    this.movimenti = [];
  }
  deposita(importo) {
    this.movimenti.push(importo);
  }
  get numeroMovimenti() {
    return this.movimenti.length;
  }
}

const c = new Conto();
c.deposita(10);
c.deposita(20);
console.log(c.numeroMovimenti);`,
      explanation: 'Il getter elimina la possibilità che il conteggio diverga dall’array.',
      concepts: ['getter/setter'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Getter chiamato come metodo',
      code: `class A {
  get valore() { return 1; }
}
console.log(new A().valore());`,
      error: `TypeError: (intermediate value).valore is not a function`,
      why: 'Un getter restituisce già il valore: chiamarlo con () significa chiamare un numero.',
      fix: `console.log(new A().valore);`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l3x1',
      prompt: 'Spiega la differenza tra un getter e un metodo normale, e a cosa serve un metodo statico.',
      keywords: ['getter', 'proprietà', 'metod', 'static', 'istanza', 'calcol'],
      model:
        'Un getter si legge come una proprietà, senza parentesi, ma esegue codice e restituisce un valore calcolato: è utile per dati derivati come un totale con IVA. Un metodo normale si chiama con le parentesi. Un metodo static appartiene alla classe, non alle istanze, e si usa per factory o utilità che non dipendono da un oggetto specifico, come convertire centesimi in un nuovo prodotto.',
      concepts: ['getter/setter', 'static'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l3q1',
      question: 'Come si legge un getter?',
      options: [
        ['Con le parentesi', 'Le parentesi sono per i metodi.'],
        ['Come una proprietà', 'Esatto.'],
        ['Solo dentro la classe', 'Si legge dall’esterno.'],
      ],
      correct: 1,
      explanation: 'I getter fanno parte dell’interfaccia come proprietà.',
      concepts: ['getter/setter'],
    }),
    quiz({
      id: 'w7l3q2',
      question: 'Dove si trova un metodo static?',
      options: [
        ['Sulle istanze', 'Non sulle istanze.'],
        ['Sulla classe', 'Esatto.'],
        ['Nel prototipo come gli altri', 'Static non è sul prototipo delle istanze.'],
      ],
      correct: 1,
      explanation: 'Si chiama Classe.metodo(), non istanza.metodo().',
      concepts: ['static'],
    }),
    quiz({
      id: 'w7l3q3',
      question: 'A cosa serve un setter?',
      options: [
        ['A validare o trasformare il valore prima di salvarlo', 'Esatto.'],
        ['A rendere la proprietà privata', 'Per quello ci sono i campi #.'],
        ['A creare una nuova istanza', 'Non è il suo ruolo.'],
      ],
      correct: 0,
      explanation: 'Il setter è il punto di controllo degli ingressi.',
      concepts: ['validazione'],
    }),
  ],
  recap: {
    points: [
      'Getter e setter si usano come proprietà.',
      'I getter calcolano dati derivati.',
      'I setter validano gli ingressi.',
      'static vive sulla classe, non sull’istanza.',
    ],
    learned: 'Sai controllare l’accesso allo stato e aggiungere utility di classe.',
    next: 'Campi privati: proteggere davvero lo stato.',
  },
});

const l4 = lesson(W, 4, {
  id: 'w7l4',
  title: 'Campi privati',
  subtitle: 'Il cancelletto che chiude la porta',
  minutes: 45,
  objectives: [
    'Dichiarare campi privati con #',
    'Distinguere privacy reale e convenzione _',
    'Esporre lo stato solo tramite metodi',
  ],
  concepts: ['campi privati', '#', 'incapsulamento'],
  activate: [
    'La convenzione `_saldo` funziona solo se tutti rispettano la regola. Come rendi l’accesso impossibile davvero?',
    'Con i campi privati #: il linguaggio stesso impedisce l’accesso dall’esterno.',
  ],
  analogy:
    'Il cancelletto è una porta chiusa a chiave: non è una convenzione tra gentiluomini, è una serratura. Nemmeno chi scrive il codice fuori dalla classe può entrare.',
  example: {
    code: `class Conto {
  #saldo = 0;

  deposita(importo) {
    if (importo <= 0) throw new Error('Importo non valido');
    this.#saldo += importo;
    return this.#saldo;
  }

  get saldo() {
    return this.#saldo;
  }
}

const conto = new Conto();
conto.deposita(50);
console.log(conto.saldo);
console.log('saldo' in conto);`,
    output: `50
false`,
  },
  formal:
    'Un campo privato si dichiara con #nome, dentro la classe. È accessibile solo dal corpo della classe: dall’esterno produce un SyntaxError già in fase di parsing. I campi privati non compaiono in Object.keys e in non li vede. Metodi privati (#calcola) sono possibili allo stesso modo. La privacy serve a proteggere gli invarianti, non a nascondere per gusto.',
  worked: {
    code: `class Spesa {
  #importo;

  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.#importo = 0;
    this.impostaImporto(importo);
  }

  impostaImporto(valore) {
    if (!Number.isFinite(valore) || valore < 0) {
      throw new Error('Importo non valido');
    }
    this.#importo = valore;
  }

  get importo() {
    return this.#importo;
  }

  #formatta() {
    return this.#importo.toFixed(2) + ' €';
  }

  descrivi() {
    return this.descrizione + ': ' + this.#formatta();
  }
}

const s = new Spesa('Libro', 18);
console.log(s.descrivi());
console.log(Object.keys(s));`,
    output: `Libro: 18.00 €
['descrizione']`,
    steps: [
      ['#importo;', 'Dichiarazione del campo privato: obbligatoria prima dell’uso.'],
      ['this.#importo = 0;', 'Inizializzazione sicura prima della validazione.'],
      ['this.impostaImporto(importo)', 'La validazione passa dal metodo pubblico, non dal costruttore diretto.'],
      ['#formatta()', 'Metodo privato: un dettaglio interno, non parte dell’API.'],
      ['Object.keys(s)', 'Il campo privato non è enumerabile: resta invisibile.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l4e1',
      title: 'Campo privato',
      prompt: 'Rendi `saldo` privato e stampa `10` tramite il getter.',
      starterCode: `class Conto {
  saldo = 10;

  get saldoAttuale() {
    return this.saldo;
  }
}

console.log(new Conto().saldoAttuale);`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['Il campo privato si dichiara con #saldo.', 'Aggiorna anche il getter: this.#saldo.'],
      solution: `class Conto {
  #saldo = 10;

  get saldoAttuale() {
    return this.#saldo;
  }
}

console.log(new Conto().saldoAttuale);`,
      explanation: 'Il campo privato è accessibile solo dall’interno della classe.',
      concepts: ['campi privati'],
    }),
    guided({
      id: 'w7l4e2',
      title: 'Metodo privato',
      prompt:
        'Aggiungi un metodo privato `#doppio()` e usalo in `totale()` per stampare `20`.',
      starterCode: `class Valore {
  #n = 10;

  #doppio() {
    return this.#n * 2;
  }

  totale() {
    // usa il metodo privato
  }
}

console.log(new Valore().totale());`,
      check: { kind: 'output', lines: ['20'] },
      hints: ['Chiama this.#doppio().', 'Il metodo privato è accessibile nel corpo della classe.'],
      solution: `class Valore {
  #n = 10;

  #doppio() {
    return this.#n * 2;
  }

  totale() {
    return this.#doppio();
  }
}

console.log(new Valore().totale());`,
      explanation: 'I metodi privati permettono di scomporre la logica senza esporla.',
      concepts: ['campi privati'],
    }),
    solo({
      id: 'w7l4e3',
      title: 'Invariante protetto',
      prompt:
        'Con `class Conto` con `#saldo` e `deposita`, deposita 10 e 20 e stampa `30`.',
      starterCode: `// scrivi la classe con #saldo`,
      check: { kind: 'output', lines: ['30'] },
      hints: ['#saldo = 0 nel corpo della classe.', 'deposita modifica this.#saldo e restituisce il valore.'],
      solution: `class Conto {
  #saldo = 0;

  deposita(importo) {
    if (importo <= 0) throw new Error('Importo non valido');
    this.#saldo += importo;
    return this.#saldo;
  }

  get saldo() {
    return this.#saldo;
  }
}

const c = new Conto();
c.deposita(10);
c.deposita(20);
console.log(c.saldo);`,
      explanation: 'Lo stato è protetto: l’unica via per modificarlo è un metodo validato.',
      concepts: ['incapsulamento'],
    }),
    transfer({
      id: 'w7l4e4',
      title: 'Campi privati e JSON',
      prompt:
        'Serializza un oggetto con un campo privato e un campo pubblico e stampa il JSON: il campo privato non deve comparire. Output `{"nome":"Ada"}`.',
      starterCode: `class Utente {
  #segreto = 'x';
  constructor(nome) {
    this.nome = nome;
  }
}

// serializza`,
      objective: 'Capire che i campi privati non fanno parte della rappresentazione pubblica.',
      check: { kind: 'output', lines: ['{"nome":"Ada"}'] },
      hints: ['JSON.stringify(new Utente(\'Ada\'))', 'I campi privati non sono proprietà enumerabili.'],
      solution: `class Utente {
  #segreto = 'x';
  constructor(nome) {
    this.nome = nome;
  }
}

console.log(JSON.stringify(new Utente('Ada')));`,
      explanation: 'La privacy implica che la serializzazione debba essere esplicita se serve un campo protetto.',
      concepts: ['campi privati'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Accesso dall’esterno',
      code: `class Conto {
  #saldo = 0;
}
const c = new Conto();
console.log(c.#saldo);`,
      error: `SyntaxError: Private field '#saldo' must be declared in an enclosing class`,
      why: 'Il cancelletto non è una convenzione: il parser vieta l’accesso fuori dalla classe.',
      fix: `// esponi un getter pubblico
get saldo() { return this.#saldo; }`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l4x1',
      prompt: 'Spiega la differenza tra `_saldo` e `#saldo`.',
      keywords: ['_', '#', 'privat', 'convenzion', 'linguaggio', 'access'],
      model:
        'Il trattino basso è solo una convenzione: segnala “non toccare”, ma chiunque può leggere e scrivere la proprietà. Il cancelletto è una vera barriera del linguaggio: il campo esiste solo nel corpo della classe e un accesso esterno è un errore di sintassi. Uso # quando voglio proteggere invarianti reali, non solo comunicare un’intenzione.',
      concepts: ['incapsulamento'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l4q1',
      question: 'Cosa accade accedendo a `c.#saldo` fuori dalla classe?',
      options: [
        ['Restituisce undefined', 'È un errore di sintassi.'],
        ['SyntaxError', 'Esatto.'],
        ['Restituisce null', 'No: i campi privati non sono accessibili dall’esterno.'],
      ],
      correct: 1,
      explanation: 'La privacy è applicata dal parser.',
      concepts: ['campi privati'],
    }),
    quiz({
      id: 'w7l4q2',
      question: 'I campi privati compaiono in Object.keys?',
      options: [
        ['Sì', 'No, non sono proprietà enumerabili.'],
        ['No', 'Esatto.'],
        ['Solo se dichiarati nel costruttore', 'Mai: la privacy vale in ogni caso.'],
      ],
      correct: 1,
      explanation: 'Non fanno parte della rappresentazione pubblica.',
      concepts: ['campi privati'],
    }),
    quiz({
      id: 'w7l4q3',
      question: 'Perché usare un campo privato?',
      options: [
        ['Per proteggere invarianti e obbligare l’uso dei metodi', 'Esatto.'],
        ['Per ridurre il bundle', 'Non ha effetti sul bundle.'],
        ['Per migliorare la performance', 'Non è una questione di performance.'],
      ],
      correct: 0,
      explanation: 'Incapsulamento al servizio della correttezza.',
      concepts: ['incapsulamento'],
    }),
  ],
  recap: {
    points: [
      '# rende il campo inaccessibile dall’esterno.',
      '_ è solo una convenzione.',
      'I metodi privati scompongono la logica interna.',
      'I campi privati non finiscono in JSON.',
    ],
    learned: 'Sai proteggere lo stato in modo reale, non solo a parole.',
    next: 'Prototipi: cosa succede sotto le classi.',
  },
});

const l5 = lesson(W, 5, {
  id: 'w7l5',
  title: 'Prototipi',
  subtitle: 'La vera natura delle classi',
  minutes: 50,
  objectives: [
    'Capire la catena prototipale',
    'Trovare un metodo passando dal prototipo',
    'Distinguere proprietà proprie e ereditate',
  ],
  concepts: ['prototipo', 'catena', 'hasOwn'],
  activate: [
    'Se due istanze condividono i metodi, dove vivono fisicamente quei metodi?',
    'Sul prototipo: le istanze non duplicano le funzioni, le cercano nella catena.',
  ],
  analogy:
    'Il prototipo è l’enciclopedia di famiglia: ogni oggetto ha le proprie note, ma se gli chiedi qualcosa che non ha, consulta l’enciclopedia del genitore, poi quella del nonno.',
  example: {
    code: `class Spesa {
  constructor(importo) {
    this.importo = importo;
  }
  formatta() {
    return this.importo + ' €';
  }
}

const s = new Spesa(10);
console.log(s.hasOwnProperty('importo'));
console.log(s.hasOwnProperty('formatta'));
console.log(Object.getPrototypeOf(s) === Spesa.prototype);
console.log(typeof s.formatta);`,
    output: `true
false
true
function`,
  },
  formal:
    'Ogni oggetto ha un prototipo interno. Un metodo definito in una classe vive su Classe.prototype, non sulle istanze. La ricerca di una proprietà risale la catena fino a Object.prototype. hasOwnProperty (o Object.hasOwn) distingue le proprietà proprie da quelle ereditate. Object.getPrototypeOf restituisce il prototipo. Le classi sono zucchero sintattico su questo meccanismo.',
  worked: {
    code: `function Spesa(importo) {
  this.importo = importo;
}

Spesa.prototype.formatta = function () {
  return this.importo.toFixed(2) + ' €';
};

const s = new Spesa(5);

console.log(s.formatta());
console.log(Object.hasOwn(s, 'importo'));
console.log(Object.hasOwn(s, 'formatta'));

const chiavi = Object.keys(s);
console.log(chiavi.join(','));`,
    output: `5.00 €
true
false
importo`,
    steps: [
      ['function Spesa(importo)', 'La vecchia sintassi: una funzione costruttrice.'],
      ['Spesa.prototype.formatta = ...', 'Il metodo vive sul prototipo, condiviso da tutte le istanze.'],
      ['s.formatta()', 'La ricerca parte dall’istanza e risale al prototipo.'],
      ['Object.hasOwn(s, \'formatta\')', 'Il metodo non è una proprietà propria: false.'],
      ['Object.keys(s)', 'Solo le proprietà proprie ed enumerabili: importo.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l5e1',
      title: 'Trova il prototipo',
      prompt: 'Stampa `true` verificando che il prototipo di `s` sia `Spesa.prototype`.',
      starterCode: `class Spesa {}

const s = new Spesa();

console.log(Object.getPrototypeOf(s) === );`,
      check: { kind: 'output', lines: ['true'] },
      hints: ['Il confronto è con Spesa.prototype.', 'Spesa.prototype'],
      solution: `class Spesa {}

const s = new Spesa();

console.log(Object.getPrototypeOf(s) === Spesa.prototype);`,
      explanation: 'new collega l’istanza al prototipo della classe.',
      concepts: ['prototipo'],
    }),
    guided({
      id: 'w7l5e2',
      title: 'Propria o ereditata',
      prompt:
        'Stampa `true` per `importo` (propria) e `false` per `formatta` (ereditata), usando Object.hasOwn.',
      starterCode: `class Spesa {
  constructor(importo) {
    this.importo = importo;
  }
  formatta() { return this.importo; }
}

const s = new Spesa(10);

// due console.log con Object.hasOwn`,
      check: { kind: 'output', lines: ['true', 'false'] },
      hints: ['Object.hasOwn(s, \'importo\')', 'Object.hasOwn(s, \'formatta\')'],
      solution: `class Spesa {
  constructor(importo) {
    this.importo = importo;
  }
  formatta() { return this.importo; }
}

const s = new Spesa(10);

console.log(Object.hasOwn(s, 'importo'));
console.log(Object.hasOwn(s, 'formatta'));`,
      explanation: 'hasOwn distingue i dati dell’istanza dai metodi condivisi.',
      concepts: ['hasOwn'],
    }),
    solo({
      id: 'w7l5e3',
      title: 'Metodo sul prototipo',
      prompt:
        'Definisci una funzione costruttrice `Prodotto` e aggiungi `descrizione` al prototipo: stampa `Pane`.',
      starterCode: `// funzione + prototype`,
      check: { kind: 'output', lines: ['Pane'] },
      hints: ['function Prodotto(nome) { this.nome = nome; }', 'Prodotto.prototype.descrizione = function () { return this.nome; };'],
      solution: `function Prodotto(nome) {
  this.nome = nome;
}

Prodotto.prototype.descrizione = function () {
  return this.nome;
};

console.log(new Prodotto('Pane').descrizione());`,
      explanation: 'Il metodo sul prototipo è condiviso da tutte le istanze.',
      concepts: ['prototipo'],
    }),
    transfer({
      id: 'w7l5e4',
      title: 'Chiavi proprie',
      prompt:
        'Stampa le chiavi proprie di un’istanza di `Spesa` con importo 10 e formatta sul prototipo: `importo`.',
      starterCode: `class Spesa {
  constructor(importo) { this.importo = importo; }
  formatta() { return this.importo; }
}

// Object.keys`,
      objective: 'Vedere che i metodi non sono enumerabili come dati.',
      check: { kind: 'output', lines: ['importo'] },
      hints: ['Object.keys(new Spesa(10)).join(",")', 'Le chiavi proprie escludono i metodi del prototipo.'],
      solution: `class Spesa {
  constructor(importo) { this.importo = importo; }
  formatta() { return this.importo; }
}

console.log(Object.keys(new Spesa(10)).join(','));`,
      explanation: 'La distinzione dati/metodi è ciò che rende la serializzazione prevedibile.',
      concepts: ['prototipo'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Metodo perso nel trasferimento',
      code: `class Spesa {
  constructor(importo) { this.importo = importo; }
  formatta() { return this.importo; }
}
const s = new Spesa(10);
const copia = JSON.parse(JSON.stringify(s));
console.log(copia.formatta());`,
      error: `TypeError: copia.formatta is not a function`,
      why: 'La serializzazione copia solo le proprietà, non il prototipo: la copia non è una Spesa.',
      fix: `const copia = new Spesa(s.importo);`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l5x1',
      prompt: 'Spiega cos’è la catena prototipale e perché i metodi non occupano memoria in ogni istanza.',
      keywords: ['prototip', 'catena', 'metod', 'condivis', 'istanza', 'ricerc'],
      model:
        'Ogni oggetto ha un riferimento al proprio prototipo. Quando leggo una proprietà, JavaScript la cerca sull’oggetto e poi risale la catena fino a trovarla. I metodi definiti nella classe stanno su Classe.prototype, quindi esistono una volta sola e sono condivisi da tutte le istanze: non vengono copiati in ogni oggetto.',
      concepts: ['prototipo', 'catena'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l5q1',
      question: 'Dove vivono i metodi di una classe?',
      options: [
        ['Su ogni istanza', 'Sarebbero duplicati.'],
        ['Su Classe.prototype', 'Esatto.'],
        ['Su Object', 'Solo i metodi di Object.'],
      ],
      correct: 1,
      explanation: 'Condivisi tramite il prototipo.',
      concepts: ['prototipo'],
    }),
    quiz({
      id: 'w7l5q2',
      question: 'Cosa fa Object.hasOwn?',
      options: [
        ['Verifica se la proprietà è propria dell’oggetto', 'Esatto.'],
        ['Verifica se esiste nella catena', 'Per quello c’è in.'],
        ['Copia le proprietà', 'Non copia nulla.'],
      ],
      correct: 0,
      explanation: 'Distingue proprie da ereditate.',
      concepts: ['hasOwn'],
    }),
    quiz({
      id: 'w7l5q3',
      question: 'Una classe è…',
      options: [
        ['Un tipo completamente separato dai prototipi', 'È zucchero sintattico sui prototipi.'],
        ['Zucchero sintattico sul meccanismo dei prototipi', 'Esatto.'],
        ['Un array speciale', 'No: una classe non è un array, è zucchero sui prototipi.'],
      ],
      correct: 1,
      explanation: 'Capire i prototipi rende prevedibile il comportamento delle classi.',
      concepts: ['prototipo'],
    }),
  ],
  recap: {
    points: [
      'I metodi vivono sul prototipo.',
      'La ricerca risale la catena.',
      'Object.hasOwn distingue proprie ed ereditate.',
      'Serializzare perde il prototipo.',
    ],
    learned: 'Sai cosa succede davvero quando chiami un metodo.',
    next: 'Composizione: quando l’ereditarietà è la scelta sbagliata.',
  },
});

const l6 = lesson(W, 6, {
  id: 'w7l6',
  title: 'Composizione vs ereditarietà',
  subtitle: 'Scegliere la relazione giusta',
  minutes: 50,
  objectives: [
    'Riconoscere una vera relazione “è un”',
    'Usare la composizione per ruoli ortogonali',
    'Evitare gerarchie profonde e fragili',
  ],
  concepts: ['composizione', 'ereditarietà', 'delega'],
  activate: [
    'SpesaConScontoEDownloadERicorrente: quante classi creeresti con l’ereditarietà?',
    'Le caratteristiche indipendenti esplodono in combinazioni. La composizione le tiene separate.',
  ],
  analogy:
    'L’ereditarietà è un albero genealogico: rigido. La composizione è un LEGO: combini pezzi indipendenti per ottenere il comportamento che serve, e puoi cambiarli senza rifare tutto.',
  example: {
    code: `class Spesa {
  constructor(importo) {
    this.importo = importo;
  }
}

const conSconto = (spesa, percentuale) => ({
  ...spesa,
  totale: () => spesa.importo * (1 - percentuale),
});

const base = new Spesa(100);
const scontata = conSconto(base, 0.1);

console.log(base.importo);
console.log(scontata.totale());`,
    output: `100
90`,
  },
  formal:
    'L’ereditarietà esprime “è un”: Studente è una Persona. La composizione esprime “ha un” o “usa un”: una Spesa ha uno sconto. Quando le variazioni sono indipendenti (sconto, ricorrenza, tassazione) la composizione evita l’esplosione delle sottoclassi. In JavaScript si compone con funzioni che ricevono oggetti, con mixin o con delega esplicita. Preferisci composizione salvo che la relazione “è un” sia reale e stabile.',
  worked: {
    code: `class SpesaBase {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
  totale() {
    return this.importo;
  }
}

function conTassa(spesa, aliquota) {
  return {
    ...spesa,
    totale: () => spesa.totale() * (1 + aliquota),
  };
}

function conSconto(spesa, percentuale) {
  return {
    ...spesa,
    totale: () => spesa.totale() * (1 - percentuale),
  };
}

const base = new SpesaBase('Corso', 100);
const tassata = conTassa(base, 0.22);
const scontataTassata = conSconto(tassata, 0.5);

console.log(base.totale());
console.log(tassata.totale());
console.log(scontataTassata.totale());`,
    output: `100
122
61`,
    steps: [
      ['function conTassa(spesa, aliquota)', 'Una funzione che arricchisce un oggetto senza ereditarietà.'],
      ['{ ...spesa, totale: ... }', 'Copia e sostituisce solo il comportamento interessato.'],
      ['spesa.totale() * (1 + aliquota)', 'La funzione precedente resta incapsulata e riusabile.'],
      ['conSconto(tassata, 0.5)', 'Composizione in catena: tassa, poi sconto.'],
      ['61', '100 * 1.22 * 0.5: ogni pezzo applica la propria regola.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l6e1',
      title: 'Componi uno sconto',
      prompt: 'Completa `conSconto` perché `scontata.totale()` stampi `90`.',
      starterCode: `const base = { importo: 100, totale: () => 100 };

function conSconto(spesa, percentuale) {
  return {
    ...spesa,
    totale: () => spesa.totale() * (1 - ),
  };
}

console.log(conSconto(base, 0.1).totale());`,
      check: { kind: 'output', lines: ['90'] },
      hints: ['La percentuale è il secondo parametro.', '(1 - percentuale)'],
      solution: `const base = { importo: 100, totale: () => 100 };

function conSconto(spesa, percentuale) {
  return {
    ...spesa,
    totale: () => spesa.totale() * (1 - percentuale),
  };
}

console.log(conSconto(base, 0.1).totale());`,
      explanation: 'La composizione sostituisce un pezzo di comportamento senza toccare il resto.',
      concepts: ['composizione'],
    }),
    guided({
      id: 'w7l6e2',
      title: 'Catena di decoratori',
      prompt:
        'Applica prima la tassa (22%) e poi lo sconto (50%) a 100 e stampa `61`.',
      starterCode: `const base = { totale: () => 100 };

function conTassa(spesa, aliquota) {
  return { ...spesa, totale: () => spesa.totale() * (1 + aliquota) };
}

function conSconto(spesa, percentuale) {
  return { ...spesa, totale: () => spesa.totale() * (1 - percentuale) };
}

// catena tassa -> sconto
console.log();`,
      check: { kind: 'output', lines: ['61'] },
      hints: ['const t = conTassa(base, 0.22);', 'Poi conSconto(t, 0.5).totale().'],
      solution: `const base = { totale: () => 100 };

function conTassa(spesa, aliquota) {
  return { ...spesa, totale: () => spesa.totale() * (1 + aliquota) };
}

function conSconto(spesa, percentuale) {
  return { ...spesa, totale: () => spesa.totale() * (1 - percentuale) };
}

console.log(conSconto(conTassa(base, 0.22), 0.5).totale());`,
      explanation: 'L’ordine dei decoratori cambia il risultato: è una scelta di business esplicita.',
      concepts: ['composizione'],
    }),
    solo({
      id: 'w7l6e3',
      title: 'Ruoli separati',
      prompt:
        'Da un oggetto `{ importo: 50 }`, crea una versione con `etichetta` e una con `totale()` senza ereditarietà: stampa `TOTALE: 50`.',
      starterCode: `const spesa = { importo: 50 };

// due funzioni di composizione`,
      check: { kind: 'output', lines: ['TOTALE: 50'] },
      hints: ['const conEtichetta = (s) => ({ ...s, etichetta: \'TOTALE\' });', 'const conTotale = (s) => ({ ...s, totale: () => s.importo });'],
      solution: `const spesa = { importo: 50 };

const conEtichetta = (s) => ({ ...s, etichetta: 'TOTALE' });
const conTotale = (s) => ({ ...s, totale: () => s.importo });

const completa = conTotale(conEtichetta(spesa));
console.log(completa.etichetta + ': ' + completa.totale());`,
      explanation: 'Ogni caratteristica è un pezzo indipendente: nessuna gerarchia da progettare.',
      concepts: ['composizione'],
    }),
    transfer({
      id: 'w7l6e4',
      title: 'Ereditarietà corretta',
      prompt:
        'Qui c’è una vera relazione “è un”: `SpesaRicorrente` è una `Spesa`. Estendi la classe e stampa `Affitto (mensile)`.',
      starterCode: `class Spesa {
  constructor(descrizione) {
    this.descrizione = descrizione;
  }
  descrivi() {
    return this.descrizione;
  }
}

// estendi`,
      objective: 'Riconoscere quando l’ereditarietà è la scelta giusta.',
      check: { kind: 'output', lines: ['Affitto (mensile)'] },
      hints: ['class SpesaRicorrente extends Spesa', 'Sovrascrivi descrivi e usa super.descrivi().'],
      solution: `class Spesa {
  constructor(descrizione) {
    this.descrizione = descrizione;
  }
  descrivi() {
    return this.descrizione;
  }
}

class SpesaRicorrente extends Spesa {
  constructor(descrizione, frequenza) {
    super(descrizione);
    this.frequenza = frequenza;
  }
  descrivi() {
    return super.descrivi() + ' (' + this.frequenza + ')';
  }
}

console.log(new SpesaRicorrente('Affitto', 'mensile').descrivi());`,
      explanation: 'La sottoclasse specializza davvero il padre: qui l’ereditarietà è appropriata.',
      concepts: ['ereditarietà'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Gerarchia per combinare ruoli',
      code: `class Spesa {}
class SpesaScontata extends Spesa {}
class SpesaTassata extends Spesa {}
class SpesaScontataTassata extends SpesaScontata {}
// ... e se serve anche la ricorrenza?`,
      error: `Il numero di combinazioni esplode e ogni nuova caratteristica moltiplica le classi`,
      why: 'Stai usando l’ereditarietà per caratteristiche indipendenti: ogni combinazione richiede una sottoclasse.',
      fix: `const spesa = conTassa(conSconto(base, 0.1), 0.22);`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l6x1',
      prompt: 'Spiega quando preferisci la composizione all’ereditarietà, con un esempio.',
      keywords: ['composizion', 'eredit', 'indipendent', 'è un', 'ha un', 'combinazion'],
      model:
        'Preferisco la composizione quando le caratteristiche sono indipendenti e combinabili: sconto, tassa e ricorrenza possono coesistere in qualsiasi combinazione, e con l’ereditarietà servirebbe una sottoclasse per ogni combinazione. Uso l’ereditarietà quando esiste una vera relazione “è un” stabile, come SpesaRicorrente che è una Spesa con una frequenza in più.',
      concepts: ['composizione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l6q1',
      question: 'Quando è appropriata l’ereditarietà?',
      options: [
        ['Quando c’è una relazione “è un” reale e stabile', 'Esatto.'],
        ['Ogni volta che due classi condividono un campo', 'Meglio la composizione.'],
        ['Per riusare una funzione', 'Le funzioni si importano, non serve ereditare.'],
      ],
      correct: 0,
      explanation: 'L’ereditarietà modella una specializzazione vera.',
      concepts: ['ereditarietà'],
    }),
    quiz({
      id: 'w7l6q2',
      question: 'Qual è il rischio di gerarchie profonde?',
      options: [
        ['Fragilità: una modifica al padre rompe i figli', 'Esatto.'],
        ['Consumano più memoria', 'Non è il problema principale.'],
        ['Non funzionano in JavaScript', 'Funzionano.'],
      ],
      correct: 0,
      explanation: 'Il coupling tra livelli rende le modifiche rischiose.',
      concepts: ['ereditarietà'],
    }),
    quiz({
      id: 'w7l6q3',
      question: 'Come si compone un comportamento in JavaScript?',
      options: [
        ['Con funzioni che ricevono un oggetto e ne restituiscono uno arricchito', 'Esatto.'],
        ['Solo con extends', 'Extends è ereditarietà.'],
        ['Con typeof', 'Non c’entra.'],
      ],
      correct: 0,
      explanation: 'Decoratori e mixin sono forme di composizione.',
      concepts: ['composizione'],
    }),
  ],
  recap: {
    points: [
      'Ereditarietà = “è un”, composizione = “ha/usa un”.',
      'Caratteristiche indipendenti → composizione.',
      'Le gerarchie profonde sono fragili.',
      'I decoratori compongono comportamento.',
    ],
    learned: 'Sai scegliere la relazione giusta invece di forzare l’ereditarietà.',
    next: 'Ripasso e progetto: rifattorizzare il quaderno con le classi.',
  },
});

const l7 = lesson(W, 7, {
  id: 'w7l7',
  title: 'Ripasso e progetto',
  subtitle: 'Rifattorizzare il Quaderno con le classi',
  minutes: 60,
  objectives: [
    'Spostare la logica del quaderno in classi',
    'Usare getter per i totali derivati',
    'Mantenere l’API semplice per l’interfaccia',
  ],
  concepts: ['ripasso', 'progetto', 'refactoring'],
  activate: [
    'Il quaderno attuale è un array e molte funzioni sparse. Cosa guadagni raggruppandolo in una classe?',
    'Un solo punto di verità per lo stato e un’API chiara: aggiungi, totale, perCategoria.',
  ],
  analogy:
    'Il refactoring è ristrutturare una casa senza cambiare indirizzo: fuori il comportamento resta lo stesso, dentro è più solido e ordinato.',
  example: {
    code: `class Quaderno {
  #spese = [];

  aggiungi(spesa) {
    this.#spese.push(spesa);
    return this.#spese.length;
  }

  get spese() {
    return [...this.#spese];
  }

  get totale() {
    return this.#spese.reduce((acc, s) => acc + s.importo, 0);
  }

  perCategoria() {
    return this.#spese.reduce((acc, s) => {
      acc[s.categoria] = (acc[s.categoria] ?? 0) + s.importo;
      return acc;
    }, {});
  }
}

const q = new Quaderno();
q.aggiungi({ descrizione: 'Libro', importo: 18, categoria: 'studio' });
q.aggiungi({ descrizione: 'Pranzo', importo: 12, categoria: 'cibo' });

console.log(q.totale);
console.log(q.perCategoria());`,
    output: `30
{ studio: 18, cibo: 12 }`,
  },
  formal:
    'Una classe ben incapsulata espone operazioni (aggiungi) e letture derivate (totale, perCategoria) senza permettere mutazioni arbitrarie. Il getter `spese` restituisce una copia: chi legge non può modificare l’array interno. I derivati calcolati nel getter evitano di mantenere valori duplicati che possono divergere.',
  worked: {
    code: `class Quaderno {
  #spese = [];

  aggiungi(descrizione, importo, categoria = 'altro') {
    if (!descrizione || !Number.isFinite(importo) || importo <= 0) {
      throw new Error('Dati non validi');
    }
    this.#spese.push({ descrizione, importo, categoria });
  }

  get totale() {
    return this.#spese.reduce((acc, s) => acc + s.importo, 0);
  }

  get vuoto() {
    return this.#spese.length === 0;
  }

  riepilogo() {
    return this.#spese.map((s) => s.descrizione + ': ' + s.importo.toFixed(2) + ' €');
  }
}

const q = new Quaderno();
console.log(q.vuoto);

q.aggiungi('Libro', 18, 'studio');
q.aggiungi('Pranzo', 12, 'cibo');
console.log(q.totale);
console.log(q.riepilogo().join(' | '));`,
    output: `true
30
Libro: 18.00 € | Pranzo: 12.00 €`,
    steps: [
      ['#spese = []', 'Stato privato: nessuno può svuotarlo dall’esterno.'],
      ['aggiungi(descrizione, importo, categoria)', 'Un unico ingresso valida e crea l’oggetto spesa.'],
      ['get totale()', 'Dato derivato: sempre coerente con le spese.'],
      ['get vuoto()', 'Espone una condizione utile all’interfaccia senza esporre l’array.'],
      ['riepilogo()', 'Presentazione incapsulata: il chiamante ottiene stringhe pronte.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l7e1',
      title: 'Getter totale',
      prompt: 'Completa il getter perché `q.totale` stampi `30`.',
      starterCode: `class Quaderno {
  constructor() {
    this.spese = [];
  }

  get totale() {
    // somma degli importi
  }
}

const q = new Quaderno();
q.spese.push({ importo: 10 }, { importo: 20 });
console.log(q.totale);`,
      check: { kind: 'output', lines: ['30'] },
      hints: ['Usa reduce su this.spese.', 'return this.spese.reduce((acc, s) => acc + s.importo, 0);'],
      solution: `class Quaderno {
  constructor() {
    this.spese = [];
  }

  get totale() {
    return this.spese.reduce((acc, s) => acc + s.importo, 0);
  }
}

const q = new Quaderno();
q.spese.push({ importo: 10 }, { importo: 20 });
console.log(q.totale);`,
      explanation: 'Un derivato calcolato non può divergere dallo stato.',
      concepts: ['refactoring'],
    }),
    guided({
      id: 'w7l7e2',
      title: 'Aggiungi con validazione',
      prompt:
        'Completa `aggiungi` perché rifiuti gli importi ≤ 0. Aggiungi 10 e poi -5; il totale deve essere `10`.',
      starterCode: `class Quaderno {
  constructor() {
    this.spese = [];
  }

  aggiungi(importo) {
    // valida e aggiungi
  }

  get totale() {
    return this.spese.reduce((acc, s) => acc + s.importo, 0);
  }
}

const q = new Quaderno();
q.aggiungi(10);
q.aggiungi(-5);
console.log(q.totale);`,
      check: { kind: 'output', lines: ['10'] },
      hints: ['if (importo <= 0) return;', 'Altrimenti push({ importo }).'],
      solution: `class Quaderno {
  constructor() {
    this.spese = [];
  }

  aggiungi(importo) {
    if (!Number.isFinite(importo) || importo <= 0) return;
    this.spese.push({ importo });
  }

  get totale() {
    return this.spese.reduce((acc, s) => acc + s.importo, 0);
  }
}

const q = new Quaderno();
q.aggiungi(10);
q.aggiungi(-5);
console.log(q.totale);`,
      explanation: 'La validazione centralizzata protegge tutti i chiamanti.',
      concepts: ['refactoring'],
    }),
    solo({
      id: 'w7l7e3',
      title: 'Per categoria',
      prompt:
        'Aggiungi `perCategoria()` che restituisce un oggetto di totali. Con cibo 10 e casa 20 stampa `{ cibo: 10, casa: 20 }`.',
      starterCode: `class Quaderno {
  constructor() { this.spese = []; }
  aggiungi(importo, categoria) { this.spese.push({ importo, categoria }); }
  // perCategoria
}`,
      check: { kind: 'output', lines: ['{ cibo: 10, casa: 20 }'] },
      hints: ['Riusa il reduce con accumulatore oggetto.', 'Parti da {}.'],
      solution: `class Quaderno {
  constructor() { this.spese = []; }
  aggiungi(importo, categoria) { this.spese.push({ importo, categoria }); }
  perCategoria() {
    return this.spese.reduce((acc, s) => {
      acc[s.categoria] = (acc[s.categoria] ?? 0) + s.importo;
      return acc;
    }, {});
  }
}

const q = new Quaderno();
q.aggiungi(10, 'cibo');
q.aggiungi(20, 'casa');
console.log(q.perCategoria());`,
      explanation: 'Il quaderno incapsula anche l’analisi: l’interfaccia riceve il risultato pronto.',
      concepts: ['refactoring'],
    }),
    transfer({
      id: 'w7l7e4',
      title: 'Copia difensiva',
      prompt:
        'Il getter `spese` restituisce una copia: modifica l’array restituito e verifica che `q.spese.length` resti `1`.',
      starterCode: `class Quaderno {
  #spese = [{ importo: 10 }];
  get spese() {
    return [...this.#spese];
  }
}

const q = new Quaderno();
const letto = q.spese;
letto.push({ importo: 99 });
console.log(q.spese.length);`,
      objective: 'Impedire mutazioni accidentali dall’esterno.',
      check: { kind: 'output', lines: ['1'] },
      hints: ['La copia isola l’array interno.', 'Non serve modificare il codice: verifica il comportamento.'],
      solution: `class Quaderno {
  #spese = [{ importo: 10 }];
  get spese() {
    return [...this.#spese];
  }
}

const q = new Quaderno();
const letto = q.spese;
letto.push({ importo: 99 });
console.log(q.spese.length);`,
      explanation: 'La copia difensiva è una protezione semplice ed efficace contro effetti collaterali.',
      concepts: ['refactoring'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Stato duplicato',
      code: `class Quaderno {
  constructor() {
    this.spese = [];
    this.totale = 0;
  }
  aggiungi(importo) {
    this.spese.push(importo);
  }
}`,
      error: `this.totale resta 0 mentre spese cresce`,
      why: 'Il totale è un dato derivato salvato a parte: va aggiornato manualmente e prima o poi divergerà.',
      fix: `get totale() {
  return this.spese.reduce((acc, s) => acc + s.importo, 0);
}`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l7x1',
      prompt: 'Spiega perché hai spostato la logica del quaderno in una classe e quali vantaggi porta.',
      keywords: ['class', 'stato', 'api', 'privat', 'derivat', 'valid'],
      model:
        'Ho spostato stato e operazioni in una classe per avere un unico punto di verità: le spese sono private, si aggiungono solo tramite un metodo che valida, e i totali sono getter calcolati dai dati. L’interfaccia chiama pochi metodi chiari e non può corrompere lo stato: se domani cambia il formato delle spese, cambio la classe senza toccare il resto.',
      concepts: ['refactoring'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l7q1',
      question: 'Perché il totale dovrebbe essere un getter e non una proprietà salvata?',
      options: [
        ['Perché così è sempre coerente con le spese', 'Esatto.'],
        ['Perché i getter sono più veloci', 'Non è una questione di performance.'],
        ['Perché JSON non salva i numeri', 'JSON salva i numeri.'],
      ],
      correct: 0,
      explanation: 'I derivati non vanno duplicati.',
      concepts: ['refactoring'],
    }),
    quiz({
      id: 'w7l7q2',
      question: 'Perché il getter spese restituisce una copia?',
      options: [
        ['Per impedire mutazioni esterne dello stato privato', 'Esatto.'],
        ['Per consumare meno memoria', 'Consuma di più.'],
        ['Perché gli array non si possono restituire', 'Si possono.'],
      ],
      correct: 0,
      explanation: 'Copia difensiva: l’incapsulamento resta valido.',
      concepts: ['refactoring'],
    }),
    quiz({
      id: 'w7l7q3',
      question: 'Dove va la validazione degli importi?',
      options: [
        ['Nel metodo di inserimento, una volta sola', 'Esatto.'],
        ['In ogni punto dell’interfaccia', 'Si duplicherebbe.'],
        ['Solo nel form', 'La classe deve essere robusta anche senza form.'],
      ],
      correct: 0,
      explanation: 'Un solo ingresso validato protegge tutti i chiamanti.',
      concepts: ['refactoring'],
    }),
  ],
  recap: {
    points: [
      'Una classe centralizza stato e regole.',
      'I derivati si calcolano con getter.',
      'La validazione vive nel metodo di inserimento.',
      'Copia difensiva per lo stato esposto.',
    ],
    learned: 'Il Quaderno delle spese è ora un modello solido e testabile.',
    next: 'Lato professionale: progettare classi che invecchiano bene.',
  },
});

const l8 = lesson(W, 8, {
  id: 'w7l8',
  title: 'Lato professionale e test',
  subtitle: 'Progettare API di classe e verifica della settimana',
  minutes: 50,
  objectives: [
    'Riconoscere una classe con troppe responsabilità',
    'Esportare solo ciò che serve',
    'Superare il test della settimana',
  ],
  concepts: ['coesione', 'API design', 'test'],
  activate: [
    'Una classe con venti metodi pubblici è potente o difficile da usare?',
    'È difficile: ogni metodo pubblico è un contratto da mantenere. Meno superficie, più chiarezza.',
  ],
  analogy:
    'L’API di una classe è il cruscotto di un’auto: pochi comandi chiari. Se hai cinquanta leve, nessuno saprà quale tirare.',
  example: {
    code: `class Report {
  constructor(spese) {
    this.spese = spese;
  }

  get totale() {
    return this.spese.reduce((acc, s) => acc + s.importo, 0);
  }

  get media() {
    return this.spese.length === 0 ? 0 : this.totale / this.spese.length;
  }

  toString() {
    return 'Spese: ' + this.spese.length + ' — Totale: ' + this.totale.toFixed(2) + ' €';
  }
}

const report = new Report([{ importo: 10 }, { importo: 20 }]);
console.log(String(report));
console.log(report.media.toFixed(2));`,
    output: `Spese: 2 — Totale: 30.00 €
15.00`,
  },
  formal:
    'Una classe coesa ha una sola ragione per cambiare. Se mescola calcolo, presentazione e accesso ai dati, va separata. Esponi il minimo necessario: metodi che il chiamante usa davvero. I getter derivati e i metodi espressivi (toString, riepilogo) migliorano l’uso senza esporre lo stato. Un’API piccola è più facile da testare e da mantenere.',
  worked: {
    code: `class Spesa {
  #importo;

  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.#importo = importo;
  }

  get importo() {
    return this.#importo;
  }

  get valida() {
    return this.descrizione.length > 0 && this.#importo > 0;
  }

  toString() {
    return this.descrizione + ': ' + this.#importo.toFixed(2) + ' €';
  }
}

const valide = [
  new Spesa('Libro', 18),
  new Spesa('', 10),
  new Spesa('Pranzo', -2),
].filter((s) => s.valida);

console.log(valide.length);
console.log(String(valide[0]));`,
    output: `1
Libro: 18.00 €`,
    steps: [
      ['#importo', 'Lo stato critico è privato.'],
      ['get valida()', 'Un derivato booleano che l’interfaccia può usare direttamente.'],
      ['filter((s) => s.valida)', 'La classe espone una condizione, il chiamante la usa con le pipeline.'],
      ['String(valide[0])', 'toString rende l’istanza stampabile senza esporre i dettagli.'],
    ],
  },
  exercises: [
    fill({
      id: 'w7l8e1',
      title: 'Getter derivato',
      prompt: 'Aggiungi il getter `media` (0 se vuoto) e stampa `15.00`.',
      starterCode: `class Report {
  constructor(spese) { this.spese = spese; }
  get totale() { return this.spese.reduce((a, s) => a + s.importo, 0); }
  get media() {
    // evita la divisione per zero
  }
}

console.log(new Report([{ importo: 10 }, { importo: 20 }]).media.toFixed(2));`,
      check: { kind: 'output', lines: ['15.00'] },
      hints: ['Se length è 0 restituisci 0.', 'Altrimenti this.totale / this.spese.length.'],
      solution: `class Report {
  constructor(spese) { this.spese = spese; }
  get totale() { return this.spese.reduce((a, s) => a + s.importo, 0); }
  get media() {
    return this.spese.length === 0 ? 0 : this.totale / this.spese.length;
  }
}

console.log(new Report([{ importo: 10 }, { importo: 20 }]).media.toFixed(2));`,
      explanation: 'Guard clause nel derivato: il caso vuoto non produce NaN.',
      concepts: ['API design'],
    }),
    guided({
      id: 'w7l8e2',
      title: 'toString utile',
      prompt: 'Completa `toString` perché `String(report)` stampi `Totale: 30.00 €`.',
      starterCode: `class Report {
  constructor(totale) { this.totale = totale; }
  toString() {
    // usa toFixed
  }
}

console.log(String(new Report(30)));`,
      check: { kind: 'output', lines: ['Totale: 30.00 €'] },
      hints: ['toString restituisce una stringa.', 'return \'Totale: \' + this.totale.toFixed(2) + \' €\';'],
      solution: `class Report {
  constructor(totale) { this.totale = totale; }
  toString() {
    return 'Totale: ' + this.totale.toFixed(2) + ' €';
  }
}

console.log(String(new Report(30)));`,
      explanation: 'toString rende l’oggetto leggibile nei log e nelle interpolazioni.',
      concepts: ['API design'],
    }),
    solo({
      id: 'w7l8e3',
      title: 'Filtra i validi',
      prompt:
        'Con due spese valide e una non valida, usa il getter `valida` e stampa quante restano (`2`).',
      starterCode: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
  get valida() {
    return this.descrizione.length > 0 && this.importo > 0;
  }
}

// filter`,
      check: { kind: 'output', lines: ['2'] },
      hints: ['filter(s => s.valida)', 'Poi length.'],
      solution: `class Spesa {
  constructor(descrizione, importo) {
    this.descrizione = descrizione;
    this.importo = importo;
  }
  get valida() {
    return this.descrizione.length > 0 && this.importo > 0;
  }
}

const spese = [
  new Spesa('Libro', 10),
  new Spesa('', 5),
  new Spesa('Pranzo', 12),
];
console.log(spese.filter((s) => s.valida).length);`,
      explanation: 'La validazione come proprietà derivata si compone con le pipeline.',
      concepts: ['API design'],
    }),
    transfer({
      id: 'w7l8e4',
      title: 'Coesione',
      prompt:
        'Separa il calcolo dalla presentazione: `Report` calcola, `formatta(report)` produce la stringa. Stampa `Totale: 30.00 €`.',
      starterCode: `class Report {
  constructor(spese) { this.spese = spese; }
  get totale() { return this.spese.reduce((a, s) => a + s.importo, 0); }
}

function formatta(report) {
  // presentazione
}

console.log(formatta(new Report([{ importo: 10 }, { importo: 20 }])));`,
      objective: 'Applicare la separazione delle responsabilità.',
      check: { kind: 'output', lines: ['Totale: 30.00 €'] },
      hints: ['La funzione usa report.totale.', 'La formattazione vive fuori dalla classe.'],
      solution: `class Report {
  constructor(spese) { this.spese = spese; }
  get totale() { return this.spese.reduce((a, s) => a + s.importo, 0); }
}

function formatta(report) {
  return 'Totale: ' + report.totale.toFixed(2) + ' €';
}

console.log(formatta(new Report([{ importo: 10 }, { importo: 20 }])));`,
      explanation: 'Calcolo e presentazione separati cambiano per ragioni diverse: è coesione.',
      concepts: ['coesione'],
    }),
  ],
  contrasts: [
    contrast({
      title: 'Classe che sa troppo',
      code: `class Quaderno {
  constructor() { this.spese = []; }
  aggiungi() {}
  totale() {}
  renderHTML() {}
  salvaSuServer() {}
  inviaEmail() {}
}`,
      error: `Una modifica al layout o al server costringe a toccare il modello dei dati`,
      why: 'La classe mescola dominio, presentazione e infrastruttura: troppe ragioni per cambiare.',
      fix: `// Quaderno: dati e regole. Render e salvataggio in moduli separati.`,
    }),
  ],
  explains: [
    explain({
      id: 'w7l8x1',
      prompt: 'Spiega cosa significa coesione di una classe e come si riconosce una classe con troppe responsabilità.',
      keywords: ['coesion', 'responsabil', 'cambi', 'separ', 'dominio', 'presentazion'],
      model:
        'Una classe è coesa quando ha una sola ragione per cambiare. Se mescola il modello dei dati, il rendering e la persistenza, una modifica al layout o al server la costringe a cambiare, e ogni cambiamento rischia di rompere altro. Riconosco il problema dai nomi dei metodi: se non raccontano un’unica responsabilità, la classe va separata.',
      concepts: ['coesione'],
    }),
  ],
  quizzes: [
    quiz({
      id: 'w7l8q1',
      question: 'Cosa indica una classe con troppi metodi pubblici?',
      options: [
        ['Un’API difficile da usare e mantenere', 'Esatto.'],
        ['Sempre un buon design', 'Tutt’altro.'],
        ['Che è più veloce', 'Non c’entra.'],
      ],
      correct: 0,
      explanation: 'Ogni metodo pubblico è un contratto da mantenere.',
      concepts: ['API design'],
    }),
    quiz({
      id: 'w7l8q2',
      question: 'Cosa significa coesione?',
      options: [
        ['Che la classe ha una sola responsabilità', 'Esatto.'],
        ['Che ha molte proprietà', 'Non è una questione di quantità.'],
        ['Che è privata', 'La privacy è un altro aspetto.'],
      ],
      correct: 0,
      explanation: 'Coesione = una ragione per cambiare.',
      concepts: ['coesione'],
    }),
    quiz({
      id: 'w7l8q3',
      question: 'Dove va la formattazione dei dati?',
      options: [
        ['In una funzione o modulo di presentazione', 'Esatto.'],
        ['Sempre nel modello', 'Il modello non deve conoscere l’output.'],
        ['Nel database', 'No: il database conserva dati, non formattazione.'],
      ],
      correct: 0,
      explanation: 'Separare calcolo e presentazione semplifica entrambi.',
      concepts: ['API design'],
    }),
  ],
  recap: {
    points: [
      'Una classe, una responsabilità.',
      'Esponi il minimo indispensabile.',
      'Derivati con getter, presentazione fuori.',
      'Le API piccole sono più facili da testare.',
    ],
    learned: 'Sai progettare classi che restano comprensibili nel tempo.',
    next: 'Settimana 8: Map, Set, moduli e meta-programmazione.',
  },
});

export const week07 = makeWeek({
  id: W,
  number: 7,
  title: 'Classi e OOP',
  subtitle: 'Modelli, ereditarietà e composizione',
  description:
    'Dalla classe semplice alla progettazione consapevole: ereditarietà dove serve, composizione dove è meglio, incapsulamento reale con i campi privati.',
  goals: [
    'Scrivere classi con stato protetto',
    'Estendere senza duplicare',
    'Scegliere tra ereditarietà e composizione',
    'Progettare API piccole e coese',
  ],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Quaderno delle spese — classi',
    brief:
      'Il quaderno diventa una classe con stato privato, validazione centralizzata e totali derivati.',
    deliverable: 'Classe Quaderno con aggiungi, totale, perCategoria e copia difensiva.',
    milestones: [
      'Stato privato con #',
      'Getter per i derivati',
      'Validazione in un unico ingresso',
    ],
  },
  professional: {
    title: 'Progettare classi che invecchiano bene',
    topics: [
      'Coesione e responsabilità singola',
      'API minime e getter derivati',
      'Separare dominio, presentazione e infrastruttura',
    ],
    exercise: 'Dividere una classe onnisciente in tre collaboratori con responsabilità chiare.',
  },
});
