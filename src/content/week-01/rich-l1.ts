import type { Lesson } from '@/types/course';
import { code, errorCase, project, section, table } from '../rich-authoring';

/**
 * Dense reference lesson for the whole course.
 *
 * Every element the standard requires is here: eight theory sections, seven
 * runnable examples, three real-world cases, three execution traces, two
 * misconceptions, a comparison table, five fully explained errors, a
 * mini-project and a consolidation step.
 */
export const l1Dense: Pick<Lesson, 'sections' | 'errors' | 'project' | 'consolidate'> = {
  sections: [
    section({
      id: 'perche',
      title: "Perché esiste console.log",
      paragraphs: [
        "Un programma che non mostra niente è un programma di cui non sai nulla. `console.log` è la prima porta di comunicazione tra te e il computer: gli passi un valore e lui lo scrive in un posto che puoi leggere.",
        "Quel posto **non è la pagina web**. È la **console**, uno spazio separato che il browser tiene per chi sviluppa. La apri con `F12`, oppure con `Cmd + Opzione + I` su Mac, e scegli la scheda *Console*. Da quel momento vedi tutto ciò che il codice stampa, in ordine, con l’ora e la riga di origine.",
        "Partiamo da qui per una ragione pratica: quando un calcolo non torna, la console è il primo posto dove guardare. Non serve indovinare. Scrivi un valore, lo vedi, capisci.",
        "`console` è un oggetto che il browser mette a disposizione. `log` è una sua funzione. Le parentesi contengono ciò che vuoi stampare. Il punto separa l’oggetto dalla funzione: si legge “chiama `log` dentro `console`”.",
      ],
      code: [
        code({
          title: "Il primo messaggio",
          code: `console.log("Ciao, mondo");
console.log("Sto imparando JavaScript");`,
          output: `Ciao, mondo
Sto imparando JavaScript`,
          note: "Due istruzioni, due righe. Il computer esegue dall’alto verso il basso.",
        }),
      ],
      steps: [
        "Il computer legge `console` e trova l’oggetto che il browser ha preparato.",
        "Legge `.log` e cerca, dentro quell’oggetto, la funzione chiamata `log`.",
        "Valuta ciò che è tra parentesi: `\"Ciao, mondo\"` è una stringa, cioè testo.",
        "Chiama la funzione passandole quel testo.",
        "La funzione aggiunge una riga alla console. Il programma continua con l’istruzione successiva.",
      ],
    }),

    section({
      id: 'mondo-carrello',
      title: "Nel mondo reale: il totale del carrello",
      kind: 'world',
      paragraphs: [
        "Su un e-commerce, quando l’utente clicca **“Aggiungi al carrello”**, il codice aggiorna una lista di prodotti e ricalcola il totale. Se il totale mostrato è sbagliato, lo sviluppatore non apre mille file: aggiunge un `console.log` accanto al calcolo e guarda i numeri reali.",
        "Il log non è codice “sporco” da nascondere. È lo strumento con cui si osserva un sistema mentre funziona. Si aggiunge, si legge, si toglie.",
      ],
      code: [
        code({
          title: "Osservare un totale",
          code: `const prezzo = 19.99;
const quantita = 3;
const totale = prezzo * quantita;

console.log("Prezzo:", prezzo);
console.log("Quantità:", quantita);
console.log("Totale:", totale);`,
          output: `Prezzo: 19.99
Quantità: 3
Totale: 59.97`,
          note: "La virgola separa più argomenti: la console li stampa affiancati con uno spazio. È più leggibile di una concatenazione.",
        }),
      ],
    }),

    section({
      id: 'testo',
      title: "Testo e codice sono due mondi diversi",
      paragraphs: [
        "Una **stringa** è una sequenza di caratteri che il programma tratta come testo. Per dirglielo, la racchiudi tra virgolette. Le virgolette non fanno parte del testo: sono il confine che dice “da qui a qui è tutto una stringa”.",
        "Senza virgolette, JavaScript legge la parola come un **nome**: il nome di una variabile, di una funzione, di qualcosa che dovrebbe esistere da qualche parte nel programma. Se quel nome non esiste, si ferma con un errore.",
        "Questa distinzione sembra piccola, ma è la radice di due famiglie di errori che vedrai spesso: `ReferenceError` quando mancano le virgolette, `SyntaxError` quando le virgolette sono aperte e non chiuse.",
        "Il computer non indovina le intenzioni. Applica regole. Il tuo lavoro è scrivere codice che rispetti le regole e dire chiaramente cosa è testo.",
      ],
      code: [
        code({
          title: "Testo con spazi e punteggiatura",
          code: `console.log("Totale: 42 euro");
console.log("Spedizione gratuita sopra i 50 euro.");`,
          output: `Totale: 42 euro
Spedizione gratuita sopra i 50 euro.`,
          note: "Spazi, due punti e punto finale vivono dentro la stringa: per il computer sono caratteri come gli altri.",
        }),
      ],
    }),

    section({
      id: 'delimitatori',
      title: "Tre modi per delimitare una stringa",
      kind: 'table',
      paragraphs: [
        "JavaScript accetta tre delimitatori. Non sono intercambiabili in ogni situazione: ognuno ha un caso in cui è la scelta migliore.",
        "La regola pratica: usa gli **apici doppi** per impostazione predefinita, gli **apici singoli** quando il testo contiene doppi apici, i **backtick** quando devi inserire il valore di una variabile dentro la frase.",
      ],
      table: table(
        ['Delimitatore', 'Esempio', 'Quando usarlo', 'Attenzione'],
        [
          ['Doppi apici', '`"Ciao"`', 'Testo normale, frasi', 'Devi fare escape dei doppi apici interni'],
          ['Apici singoli', '`\'Ciao\'`', 'Testo che contiene doppi apici', 'Un apostrofo chiude la stringa se non lo proteggi'],
          ['Backtick', '`` `Ciao ${nome}` ``', 'Interpolazione e testi su più righe', 'Il simbolo `${` apre un’espressione, non è testo'],
        ],
        'Tutti e tre producono lo stesso tipo: string. Cambia solo come scrivi il confine.',
      ),
      code: [
        code({
          title: "Lo stesso testo, tre sintassi",
          code: `console.log('L\\'ho fatto!');
console.log("L'ho fatto!");
const nome = "Ada";
console.log(\`Ciao, \${nome}!\`);`,
          output: `L'ho fatto!
L'ho fatto!
Ciao, Ada!`,
          note: "Con gli apici singoli l’apostrofo va protetto con una barra rovesciata. Con i backtick, `${nome}` viene sostituito dal valore della variabile.",
        }),
      ],
      tip: "Scegli uno stile e mantienilo nello stesso file: il codice si legge meglio e gli errori da apostrofo diminuiscono. Prettier, se lo usi, non cambia il delimitatore per te.",
    }),

    section({
      id: 'ordine',
      title: "Le istruzioni hanno un ordine",
      paragraphs: [
        "Un programma JavaScript è una lista di **istruzioni**. Il computer le esegue una dopo l’altra, dall’alto verso il basso, nello stesso ordine in cui le hai scritte.",
        "Questo sembra ovvio finché non cambi l’ordine e i risultati cambiano. Se stampi un valore prima di calcolarlo, ottieni il valore vecchio. Se lo stampi dopo, ottieni quello nuovo. La sequenza è parte del significato.",
        "Il **punto e virgola** chiude un’istruzione. In JavaScript è spesso facoltativo, perché il linguaggio inserisce i punti e virgola al posto tuo. Ma questa “automaticità” ha casi limite: inchiodare l’abitudine di scriverlo evita un’intera classe di bug.",
        "Per ora leggi ogni riga come un passo. Non saltare passi mentalmente: il computer non li salta.",
      ],
      code: [
        code({
          title: "L’ordine cambia l’output",
          code: `console.log("Prima riga");
console.log("Seconda riga");
console.log("Terza riga");`,
          output: `Prima riga
Seconda riga
Terza riga`,
          note: "Se inverti due righe, l’output si inverte. Sembra banale, ma è esattamente ciò che accade nei calcoli reali.",
        }),
      ],
      steps: [
        "Il computer prepara un ambiente di esecuzione vuoto.",
        "Legge la prima istruzione e chiama `console.log` con la stringa `\"Prima riga\"`.",
        "La stringa finisce nella console. L’istruzione è conclusa.",
        "Passa alla seconda istruzione, poi alla terza.",
        "Quando non ci sono più istruzioni, il programma termina. La console conserva le righe.",
      ],
    }),

    section({
      id: 'commenti',
      title: "I commenti: parlare a chi leggerà",
      paragraphs: [
        "Un **commento** è testo che il computer ignora. Serve a te, oggi, e a chi leggerà il codice domani. Si scrive con due barre: `//`. Tutto ciò che segue, fino alla fine della riga, non viene eseguito.",
        "I commenti hanno due usi onesti. Il primo: spiegare **perché** una scelta è stata fatta, quando il codice da solo non lo dice. Il secondo: disattivare temporaneamente una riga mentre indaghi su un problema.",
        "Un commento che ripete il codice è rumore. `// incrementa di uno` sopra `contatore++` non aggiunge nulla. `// il totale include l’IVA al 22%` sopra un calcolo, invece, evita una chiamata al commercialista.",
        "Commentare una riga per vedere cosa succede senza di essa è una delle tecniche di debug più antiche e più efficaci. Non cancella nulla: spegne e riaccende.",
      ],
      code: [
        code({
          title: "Commentare per capire",
          code: `// Il totale arriva dal carrello, non ricalcolarlo qui.
const totale = 42;

console.log("Totale:", totale);

// console.log("Debug temporaneo: passo di qui");
console.log("Fine del report");`,
          output: `Totale: 42
Fine del report`,
          note: "La riga commentata non produce output. Riattivala togliendo `//` e il messaggio ricompare.",
        }),
      ],
      steps: [
        "Il computer legge `//` e capisce che il resto della riga è testo inerte.",
        "Salta l’intera riga, senza valutarne il contenuto.",
        "Continua con `const totale = 42;`.",
        "Esegue i due `console.log` attivi.",
        "Ignora di nuovo la riga commentata, anche se contiene codice valido.",
      ],
    }),

    section({
      id: 'mondo-form',
      title: "Nel mondo reale: un form che rifiuta un dato",
      kind: 'world',
      paragraphs: [
        "Un form di iscrizione controlla che l’email contenga una chiocciola. L’utente la inserisce, il controllo fallisce, il messaggio appare. Lo sviluppatore vuole sapere **quale** valore è arrivato davvero, non quale pensava l’utente di aver scritto.",
        "Durante lo sviluppo aggiunge un log del valore ricevuto. Spesso scopre che il campo arriva con uno spazio iniziale, oppure con maiuscole diverse. Il log trasforma un’ipotesi in un fatto.",
      ],
      code: [
        code({
          title: "Osservare il valore reale",
          code: `const email = "  ada@example.com ";

console.log("Valore ricevuto:", email);
console.log("Lunghezza:", email.length);
console.log("Contiene la chiocciola?", email.includes("@"));`,
          output: `Valore ricevuto:   ada@example.com 
Lunghezza: 19
Contiene la chiocciola? true`,
          note: "Lo spazio iniziale e quello finale fanno parte della stringa. Vederlo nella console è diverso dal supporlo.",
        }),
      ],
    }),

    section({
      id: 'come-funziona',
      title: "Come il computer tratta un testo, dentro la macchina",
      kind: 'trace',
      paragraphs: [
        "Quando scrivi `console.log(\"Ciao\")`, il computer non “stampa una frase”. Esegue una sequenza precisa che vale la pena conoscere, perché lo stesso meccanismo governa ogni valore che stamperai.",
      ],
      steps: [
        "Riconosce `console` come un oggetto disponibile nell’ambiente.",
        "Cerca la proprietà `log` su quell’oggetto.",
        "Trova una funzione e si prepara a chiamarla.",
        "Valuta gli argomenti: `\"Ciao\"` è una stringa, quindi la tiene così com’è.",
        "Passa la stringa alla funzione, che la formatta e la aggiunge alla console.",
        "La chiamata termina e restituisce `undefined`: `console.log` produce un effetto, non un valore.",
      ],
    }),

    section({
      id: 'cosa-non-e',
      title: "Cosa NON è console.log",
      kind: 'misconception',
      paragraphs: [
        "Due equivoci tornano sempre, e conviene affrontarli subito.",
      ],
      wrongIdea:
        "**“console.log scrive nella pagina.”** No: scrive nella console del browser. La pagina resta vuota. Se vuoi modificare la pagina, servirà il DOM, molto più avanti.",
      whyWrong:
        "La console è uno strumento di sviluppo. Esiste anche quando la pagina non mostra nulla. Confonderli porta a cercare l’output nel posto sbagliato e a concludere che il codice non funzioni.",
      correctCode: `// Nella pagina: niente.
console.log("Solo nella console di DevTools");`,
      tip: "Secondo equivoco: **console.log non restituisce ciò che stampa**. Restituisce sempre `undefined`. Serve per osservare, non per calcolare.",
    }),

    section({
      id: 'mondo-api',
      title: "Nel mondo reale: controllare una risposta prima di usarla",
      kind: 'world',
      paragraphs: [
        "Un’app carica i dati di un profilo da un servizio esterno. Prima di mostrare il nome, uno sviluppatore prudente verifica che il campo esista e che il valore sia quello atteso. Un log mirato evita di mostrare `undefined` all’utente.",
        "In produzione i log si riducono al minimo e si tolgono i dati sensibili. In sviluppo sono abbondanti. La differenza tra i due momenti è una scelta consapevole, non una dimenticanza.",
      ],
      code: [
        code({
          title: "Log utili, non rumore",
          code: `const email = "ada@example.com";
const nome = "";

console.log("Email:", email);
console.info("Nome mancante, uso il fallback");
console.warn("Il profilo è incompleto");
console.error("Esempio di errore: non viene lanciato, viene solo mostrato");`,
          output: `Email: ada@example.com
Nome mancante, uso il fallback`,
          note: "`info`, `warn` ed `error` scrivono nella console con livelli diversi. Non fermano il programma: sono etichette visive.",
        }),
      ],
      tip: "Prima di un commit, cerca i `console.log` che hai lasciato: quelli con dati personali vanno rimossi. È igiene, non formalità.",
    }),

    section({
      id: 'errori',
      title: "Leggere un errore senza spaventarsi",
      paragraphs: [
        "Un errore non è un giudizio. È un messaggio con tre informazioni: **tipo**, **descrizione**, **riga**. Impara a leggere quelle tre cose e il debug smette di essere una caccia al tesoro.",
        "`SyntaxError` significa che il codice non è nemmeno scritto in modo valido: il computer non è riuscito a leggerlo. `ReferenceError` significa che il codice è valido, ma cita un nome che non esiste. `TypeError` significa che il nome esiste, ma l’operazione richiesta non è possibile su quel valore.",
        "L’errore indica spesso una posizione vicina al problema, non sempre esatta. Se il messaggio dice riga 3, guarda la riga 3 e quella precedente: una stringa non chiusa può far sembrare sbagliata la riga dopo.",
      ],
      table: table(
        ['Tipo', 'Significato', 'Esempio tipico'],
        [
          ['`SyntaxError`', 'Il codice non è valido: non viene eseguito', 'Stringa non chiusa, parentesi mancante'],
          ['`ReferenceError`', 'Un nome citato non esiste', '`console.log(Ciao)` senza virgolette'],
          ['`TypeError`', 'L’operazione non è possibile su quel valore', 'Chiamare qualcosa che non è una funzione'],
        ],
        'Nei prossimi mesi vedrai questi tre tipi migliaia di volte. Diventeranno normali.',
      ),
    }),
  ],

  errors: [
    errorCase({
      title: "Testo senza virgolette",
      badCode: `console.log(Ciao);`,
      message: `ReferenceError: Ciao is not defined`,
      why: "Senza virgolette, `Ciao` non è testo: è un nome. JavaScript lo cerca tra le variabili dichiarate, non lo trova e si ferma. Il computer non può sapere che intendevi la parola “Ciao”.",
      fix: `console.log("Ciao");`,
      recognize:
        "Se leggi **“X is not defined”** e X è una parola che volevi stampare, la prima ipotesi è sempre la stessa: mancano le virgolette. La seconda: hai sbagliato a scrivere il nome di una variabile.",
    }),
    errorCase({
      title: "Stringa non chiusa",
      badCode: `console.log("Ciao);`,
      message: `SyntaxError: Invalid or unexpected token`,
      why: "La stringa si apre con un doppio apice ma non si chiude. Il computer continua a leggere fino alla fine della riga e oltre, cercando la chiusura. A un certo punto incontra un carattere che non può far parte di quel contesto e segnala un token inatteso.",
      fix: `console.log("Ciao");`,
      recognize:
        "Se il messaggio parla di *token* o di fine input inattesa, controlla le virgolette: sono aperte e chiuse nello stesso numero? Gli editor evidenziano le stringhe: una stringa che “cola” oltre la riga è visibile a colpo d’occhio.",
    }),
    errorCase({
      title: "Apostrofo dentro apici singoli",
      badCode: `console.log('L'ho fatto!');`,
      message: `SyntaxError: Unexpected identifier 'ho'`,
      why: "Gli apici singoli aprono la stringa e la chiudono al primo apostrofo, quello dentro “L’ho”. Da lì in poi il computer vede `ho fatto!` come codice, e `ho` non è un’istruzione valida.",
      fix: `console.log("L'ho fatto!");\n// oppure\nconsole.log('L\\'ho fatto!');`,
      recognize:
        "Testo italiano con apostrofi + apici singoli = errore quasi garantito. Usa gli apici doppi per le frasi, oppure proteggi l’apostrofo con `\\'`.",
    }),
    errorCase({
      title: "Maiuscola di troppo",
      badCode: `Console.log("Ciao");`,
      message: `ReferenceError: Console is not defined`,
      why: "JavaScript è **case-sensitive**: `console` e `Console` sono due nomi diversi. L’oggetto che il browser mette a disposizione si chiama `console`, tutto minuscolo. `Console` non esiste.",
      fix: `console.log("Ciao");`,
      recognize:
        "Se il messaggio dice che un nome “noto” non esiste, controlla le maiuscole. `console`, `document`, `Math`, `JSON`: ognuno ha la sua grafia esatta.",
    }),
    errorCase({
      title: "Parentesi non chiusa",
      badCode: `console.log("Ciao";`,
      message: `SyntaxError: missing ) after argument list`,
      why: "Ogni chiamata a funzione apre una parentesi e deve chiuderla. Qui la parentesi si apre dopo `log`, ma il punto e virgola arriva prima della chiusura. Il computer si aspetta `)` e trova `;`.",
      fix: `console.log("Ciao");`,
      recognize:
        "Il messaggio *missing ) after argument list* indica quasi sempre una parentesi aperta e mai chiusa. Conta le parentesi della riga, oppure lascia che l’editor le evidenzi.",
    }),
  ],

  project: project({
    title: "Mini-progetto: il biglietto da visita in console",
    brief:
      "Scrivi uno script che stampa un biglietto da visita leggibile nella console. Non serve una pagina web: serve un output ordinato, con etichette chiare e un commento che spieghi una scelta.",
    steps: [
      "Stampa il tuo nome su una riga.",
      "Stampa il ruolo su una seconda riga.",
      "Stampa una riga di separazione fatta di trattini.",
      "Aggiungi un commento che spieghi perché hai scelto quella separazione.",
      "Esegui il codice e confronta l’output con quello che volevi ottenere.",
    ],
    starterCode: `// Biglietto da visita
console.log("Ada Lovelace");
console.log("Studentessa di JavaScript");
// aggiungi qui la separazione e l'ultima riga`,
  }),

  consolidate:
    "Adesso apri la console del browser e riscrivi l’esempio del totale senza guardare: tre variabili, tre log, un commento. Se l’output è identico, hai consolidato la sintassi di base. Se qualcosa non torna, rileggi la sezione sugli errori: il messaggio ti dice quale delle cinque regole hai infranto.",
};
