import { affLesson, affWeek } from './authoring';

const W = 'af-week-03';

const l1 = affLesson(W, 1, {
  id: 'af-w3l1',
  title: 'Testo artistico e testo in cornice',
  subtitle: 'Due strumenti, due comportamenti',
  objectives: ['Scegliere il tipo di testo giusto', 'Trasformare testo artistico in cornice', 'Evitare testo che non va a capo'],
  concepts: ['testo artistico', 'frame text', 'flusso'],
  activation: ['Perché a volte il testo continua oltre il bordo invece di andare a capo?', 'Perché è testo artistico: non ha una cornice che lo contiene.'],
  analogy:
    'Il testo artistico è scritto su un nastro: resta su una linea finché non lo interrompi. Il testo in cornice è dentro una scatola: quando arriva al bordo, va a capo.',
  theory: [
    'Il testo artistico è ideale per titoli brevi e loghi: si adatta al contenuto e resta su una o più righe manuali. Il testo in cornice riempie un’area e va a capo automaticamente.',
    'Puoi convertire un testo artistico in cornice e viceversa. La conversione cambia il comportamento, non il contenuto.',
  ],
  table: {
    rows: [
      ['Titolo breve', 'Testo artistico', 'T'],
      ['Paragrafo', 'Testo in cornice', 'T + trascina'],
      ['Andare a capo', 'Cornice', '—'],
    ],
  },
  trace: [
    ['Scegli lo strumento Testo', 'Clic per artistico, trascina per cornice.'],
    ['Scrivi e imposta dimensione', 'Il titolo vive di proporzioni.'],
    ['Converti se serve', 'Dal menu Testo → Converti.'],
    ['Controlla il flusso', 'Il testo in cornice non deve sbordare.'],
  ],
  misconception: ['Il testo artistico è più libero, quindi sempre meglio.', 'Per i paragrafi è una trappola: niente ritorni automatici.'],
  world: [
    'Un titolo di poster è testo artistico su due righe.',
    'Il corpo di una brochure è testo in cornice.',
    'Un logo con nome e payoff usa testo artistico convertito in tracciati.',
  ],
  tip: 'Se il testo deve andare a capo da solo, è una cornice. Se deve restare su una riga, è artistico.',
  errors: [
    {
      title: 'Paragrafo che esce dalla pagina',
      whatYouDo: 'Scrivi un paragrafo con lo strumento artistico.',
      whatHappens: 'Il testo continua oltre il bordo.',
      why: 'Non c’è una cornice che lo costringa ad andare a capo.',
      fix: 'Converti in testo in cornice o ricrealo trascinando.',
      recognize: 'Se non c’è un bordo che lo contiene, non andrà a capo.',
    },
    {
      title: 'Cornice che taglia il testo',
      whatYouDo: 'Riduci la cornice senza controllare il contenuto.',
      whatHappens: 'Il testo sparisce oltre il bordo.',
      why: 'La cornice ha una capacità limitata.',
      fix: 'Ingrandisci la cornice o collega un’altra cornice.',
      recognize: 'Se manca testo, cerca l’indicatore di overflow.',
    },
  ],
  drills: [
    {
      title: 'Titolo e paragrafo',
      task: 'Crea un titolo artistico “Affinity” e un paragrafo in cornice di 80 mm.',
      checks: ['Il titolo è artistico', 'Il paragrafo va a capo', 'Nessun testo sborda'],
      hints: ['Clic per artistico, trascina per cornice.', 'Ridimensiona la cornice.'],
      solution: 'T → clic → “Affinity” → T → trascina cornice → scrivi.',
      explanation: 'Lo strumento giusto evita correzioni manuali.',
    },
    {
      title: 'Conversione',
      task: 'Converti il titolo in cornice e osserva cosa cambia.',
      checks: ['Il testo è in cornice', 'Il contenuto è identico', 'So tornare indietro'],
      hints: ['Menu Testo → Converti in cornice.', 'Annulla per ripristinare.'],
      solution: 'Seleziona titolo → Testo → Converti in cornice.',
      explanation: 'La conversione cambia il comportamento, non le parole.',
    },
    {
      title: 'Overflow visibile',
      task: 'Riduci una cornice finché il testo non entra e individua l’indicatore.',
      checks: ['Ho visto l’overflow', 'So come risolverlo', 'Il testo è di nuovo completo'],
      hints: ['L’indicatore appare sul bordo.', 'Ingrandisci o collega.',
      ],
      solution: 'Riduci cornice → osserva indicatore → ingrandisci.',
      explanation: 'Riconoscere l’overflow evita testi tagliati in stampa.',
    },
  ],
  quizzes: [
    {
      question: 'Quale strumento usi per un paragrafo che deve andare a capo?',
      options: [
        ['Testo artistico', 'Resta su una linea: non va a capo da solo.'],
        ['Testo in cornice', 'Esatto: la cornice gestisce il flusso.'],
        ['Testo su tracciato', 'Serve per curve, non per paragrafi.'],
      ],
      correct: 1,
      explanation: 'La cornice è un contenitore con flusso.',
    },
    {
      question: 'Cosa cambia convertendo artistico in cornice?',
      options: [
        ['Il font', 'Il font resta lo stesso.'],
        ['Il comportamento del flusso', 'Esatto: ora il testo va a capo nell’area.'],
        ['Il colore', 'Il colore è una proprietà separata.'],
      ],
      correct: 1,
      explanation: 'La conversione cambia come il testo occupa lo spazio.',
    },
  ],
  explain: {
    prompt: 'Spiega quando usare testo artistico e quando testo in cornice.',
    keywords: ['artistico', 'cornice', 'paragrafo', 'capo', 'titolo'],
    model:
      'Uso il testo artistico per titoli brevi e loghi, dove voglio controllo manuale delle righe. Uso il testo in cornice per paragrafi e colonne, perché va a capo automaticamente e può fluire tra cornici collegate.',
  },
  project: {
    title: 'Titolo del poster',
    brief: 'Imposta il titolo e il paragrafo del poster tipografico.',
    steps: ['Titolo artistico', 'Paragrafo in cornice', 'Controlla overflow'],
  },
  learned: 'Sai scegliere il contenitore giusto per ogni testo.',
  next: 'Il carattere: corpo, interlinea, tracking e kerning.',
  consolidate: 'Guarda un poster e chiediti quali testi sono artistici e quali in cornice.',
});

const l2 = affLesson(W, 2, {
  id: 'af-w3l2',
  title: 'Carattere, corpo e spaziatura',
  subtitle: 'Le regole che rendono leggibile un testo',
  objectives: ['Scegliere corpo e interlinea', 'Distinguere tracking e kerning', 'Correggere una spaziatura sbagliata'],
  concepts: ['corpo', 'interlinea', 'tracking/kerning'],
  activation: ['Perché un testo con interlinea stretta sembra più difficile da leggere?', 'Perché le righe si toccano e l’occhio fatica a tornare a capo.'],
  analogy:
    'Il corpo è la taglia della scarpa, l’interlinea è lo spazio tra i passi, il tracking è la distanza tra le lettere, il kerning è la correzione tra due lettere specifiche.',
  theory: [
    'Il corpo è la dimensione del testo. Per il corpo di un paragrafo, un’interlinea tra 1,4 e 1,6 volte il corpo è quasi sempre leggibile.',
    'Il tracking agisce su tutte le lettere selezionate; il kerning su una coppia. Aumenta il tracking per i titoli in maiuscolo, riducilo con moderazione per i titoli grandi.',
  ],
  table: {
    rows: [
      ['Corpo', 'Dimensione font', '10–12 pt'],
      ['Interlinea', 'Spazio tra righe', '1,4–1,6×'],
      ['Tracking', 'Spaziatura globale', 'Titoli'],
    ],
  },
  trace: [
    ['Seleziona il testo', 'Le proprietà si applicano alla selezione.'],
    ['Imposta corpo e interlinea', 'Parti dal contenuto, non dal titolo.'],
    ['Regola tracking per il titolo', 'Non esagerare: la parola deve restare unita.'],
    ['Controlla il kerning su coppie critiche', 'AV, To, WA.'],
  ],
  misconception: ['Più spazio tra le lettere = più elegante.', 'Troppo tracking spezza le parole e rallenta la lettura.'],
  world: [
    'Un titolo in maiuscolo ha tracking ampio per respirare.',
    'Il corpo di un articolo usa interlinea 1,5.',
    'Un logo con “AV” richiede kerning manuale.',
  ],
  tip: 'Se una parola sembra staccata, controlla il tracking; se solo due lettere sono strane, è kerning.',
  errors: [
    {
      title: 'Testo illeggibile',
      whatYouDo: 'Usi interlinea 1,0 su un paragrafo.',
      whatHappens: 'Le righe si fondono.',
      why: 'Manca spazio tra le discendenti e le ascendenti.',
      fix: 'Porta l’interlinea a 1,4–1,6.',
      recognize: 'Se devi usare il dito per seguire la riga, l’interlinea è bassa.',
    },
    {
      title: 'Titolo spezzato',
      whatYouDo: 'Applichi tracking 300 a un titolo lungo.',
      whatHappens: 'Le lettere sembrano parole separate.',
      why: 'Il tracking eccessivo rompe l’unità della parola.',
      fix: 'Riduci il tracking o spezza il titolo su più righe.',
      recognize: 'Se le lettere non si leggono come una parola, hai esagerato.',
    },
  ],
  drills: [
    {
      title: 'Paragrafo leggibile',
      task: 'Imposta un paragrafo a 11 pt con interlinea 1,5.',
      checks: ['Il corpo è 11 pt', 'L’interlinea è 1,5', 'Il testo si legge senza sforzo'],
      hints: ['Le opzioni sono nel pannello Carattere.', 'L’interlinea può essere espressa in multipli.'],
      solution: 'Seleziona → Carattere → 11 pt → interlinea 1,5.',
      explanation: 'La leggibilità è una decisione misurabile.',
    },
    {
      title: 'Titolo con tracking',
      task: 'Crea un titolo maiuscolo con tracking 80 e confrontalo con tracking 0.',
      checks: ['Il titolo è maiuscolo', 'Il tracking è 80', 'La parola resta leggibile'],
      hints: ['Il tracking è nel pannello Carattere.', 'Non superare 100 per parole lunghe.'],
      solution: 'Titolo → maiuscolo → tracking 80 → confronta.',
      explanation: 'Il tracking è proporzionale al contesto.',
    },
    {
      title: 'Kerning di coppia',
      task: 'Correggi la coppia “AV” in un titolo.',
      checks: ['Ho selezionato la coppia', 'Ho regolato il kerning', 'La distanza è coerente'],
      hints: ['Il cursore tra le lettere.', 'Kerning nel pannello Carattere.'],
      solution: 'Cursore tra A e V → kerning −20 → confronta.',
      explanation: 'Il kerning corregge solo dove serve.',
    },
  ],
  quizzes: [
    {
      question: 'Quale interlinea è adatta al corpo di un paragrafo?',
      options: [
        ['0,8', 'Troppo stretta: le righe si toccano.'],
        ['1,5', 'Esatto: è un buon punto di partenza.'],
        ['4', 'Troppo ampia: il paragrafo si disperde.'],
      ],
      correct: 1,
      explanation: 'L’interlinea è relativa al corpo del testo.',
    },
    {
      question: 'Che differenza c’è tra tracking e kerning?',
      options: [
        ['Nessuna', 'Agiscono su scale diverse.'],
        ['Tracking su tutta la selezione, kerning su una coppia', 'Esatto.'],
        ['Kerning solo per i titoli', 'Il kerning serve ovunque.'],
      ],
      correct: 1,
      explanation: 'Uno è globale, l’altro locale.',
    },
  ],
  explain: {
    prompt: 'Spiega corpio, interlinea, tracking e kerning con un esempio.',
    keywords: ['corpo', 'interlinea', 'tracking', 'kerning', 'spazio'],
    model:
      'Il corpo è la dimensione delle lettere, l’interlinea è lo spazio verticale tra le righe, il tracking è lo spazio tra tutte le lettere, il kerning è la correzione tra due lettere specifiche. In un titolo “AV” posso ridurre il kerning solo tra A e V senza toccare il resto.',
  },
  project: {
    title: 'Gerarchia del poster',
    brief: 'Imposta titolo, sottotitolo e corpo con tre livelli tipografici.',
    steps: ['Scegli tre dimensioni', 'Regola interlinea', 'Controlla tracking'],
  },
  learned: 'Sai controllare la tipografia con parametri, non a occhio.',
  next: 'Il paragrafo: allineamento, rientri, elenchi e colonne.',
  consolidate: 'Prendi un testo e cambia solo l’interlinea: osserva la leggibilità.',
});

const l3 = affLesson(W, 3, {
  id: 'af-w3l3',
  title: 'Paragrafi e colonne',
  subtitle: 'Allineamento, rientri, elenchi',
  objectives: ['Scegliere l’allineamento giusto', 'Impostare rientri ed elenchi', 'Dividere il testo in colonne'],
  concepts: ['allineamento', 'rientri', 'colonne'],
  activation: ['Perché i libri usano spesso il testo giustificato e i siti no?', 'La giustificazione crea un blocco ordinato, ma su colonne strette produce spazi irregolari.'],
  analogy:
    'Le colonne sono corsie: il testo cammina dentro una corsia e non invade l’altra. L’allineamento decide come si appoggia ai bordi della corsia.',
  theory: [
    'L’allineamento a sinistra è il più leggibile per testi lunghi; centrato per titoli brevi; giustificato per colonne ampie e layout editoriali; a destra per didascalie o numeri.',
    'Rientri e spaziatura tra paragrafi creano ritmo. Gli elenchi usano rientri e punti; le colonne dividono l’area in più corsie.',
  ],
  table: {
    rows: [
      ['Corpo lungo', 'Allineato a sinistra', 'Leggibilità'],
      ['Titolo', 'Centrato', 'Breve'],
      ['Rivista', 'Giustificato', 'Colonne ampie'],
    ],
  },
  trace: [
    ['Seleziona il paragrafo', 'Le impostazioni sono nel pannello Paragrafo.'],
    ['Scegli allineamento', 'Il contesto decide.'],
    ['Imposta rientri e spaziatura', 'Crea ritmo tra i blocchi.'],
    ['Dividi in colonne se serve', 'Controlla la larghezza.'],
  ],
  misconception: ['Il giustificato è sempre più professionale.', 'Su colonne strette crea “fiumi” di spazio bianco.'],
  world: [
    'Una brochure usa due colonne giustificate.',
    'Un articolo web usa testo a sinistra.',
    'Un menu usa elenchi con rientri.',
  ],
  tip: 'Se vedi spazi bianchi verticali nel giustificato, allarga la colonna o passa a sinistra.',
  errors: [
    {
      title: 'Fiumi nel giustificato',
      whatYouDo: 'Giustifichi una colonna stretta.',
      whatHappens: 'Compaiono spazi irregolari tra le parole.',
      why: 'Il software deve allungare gli spazi per riempire la riga.',
      fix: 'Allarga la colonna, riduci il corpo o usa l’allineamento a sinistra.',
      recognize: 'Se gli spazi formano linee verticali, è un fiume.',
    },
    {
      title: 'Elenco senza rientro',
      whatYouDo: 'Scrivi i punti senza rientro.',
      whatHappens: 'Le righe vanno a capo sotto il punto, non sotto il testo.',
      why: 'Manca il rientro di continuazione.',
      fix: 'Imposta un rientro negativo e uno positivo.',
      recognize: 'Se la seconda riga parte dal punto, il rientro è sbagliato.',
    },
  ],
  drills: [
    {
      title: 'Tre allineamenti',
      task: 'Crea tre paragrafi identici con allineamento a sinistra, centro e giustificato e confrontali.',
      checks: ['I tre allineamenti sono diversi', 'Il testo è identico', 'So dire quale leggo meglio'],
      hints: ['Pannello Paragrafo.', 'Guarda soprattutto gli spazi.'],
      solution: 'Tre copie → applica i tre allineamenti → confronta.',
      explanation: 'L’allineamento è una scelta di lettura.',
    },
    {
      title: 'Elenco corretto',
      task: 'Crea un elenco di tre voci con rientro di continuazione.',
      checks: ['Ci sono tre voci', 'I punti sono allineati', 'Il testo a capo rientra'],
      hints: ['Usa l’elenco puntato.', 'Controlla il rientro negativo.'],
      solution: 'Paragrafo → elenco → imposta rientro.',
      explanation: 'Un elenco ordinato è più facile da scansionare.',
    },
    {
      title: 'Due colonne',
      task: 'Dividi una cornice in due colonne con gutter 6 mm.',
      checks: ['Ci sono due colonne', 'Il gutter è 6 mm', 'Il testo fluisce'],
      hints: ['Pannello Paragrafo → Colonne.', 'Il gutter è lo spazio tra colonne.'],
      solution: 'Cornice → Paragrafo → 2 colonne → gutter 6 mm.',
      explanation: 'Le colonne sono griglie, non decorazioni.',
    },
  ],
  quizzes: [
    {
      question: 'Quale allineamento è più adatto a un testo lungo su colonna stretta?',
      options: [
        ['Giustificato', 'Crea fiumi di spazio.'],
        ['A sinistra', 'Esatto: mantiene spazi regolari.'],
        ['Centrato', 'Rende difficile tornare a capo.'],
      ],
      correct: 1,
      explanation: 'La leggibilità batte l’ordine geometrico.',
    },
    {
      question: 'Cosa crea il gutter?',
      options: [
        ['Lo spazio tra le colonne', 'Esatto.'],
        ['Il rientro del titolo', 'Il rientro è un’altra proprietà.'],
        ['Il colore del testo', 'Nessuna relazione.'],
      ],
      correct: 0,
      explanation: 'Il gutter separa le corsie di testo.',
    },
  ],
  explain: {
    prompt: 'Spiega perché il testo giustificato può essere problematico.',
    keywords: ['giustificato', 'spazi', 'colonna', 'leggibil', 'fiumi'],
    model:
      'Il giustificato allunga gli spazi tra le parole per portare ogni riga allo stesso bordo. Su colonne strette gli spazi diventano irregolari e formano fiumi bianchi che disturbano la lettura. Per questo sui testi lunghi e stretti preferisco l’allineamento a sinistra.',
  },
  project: {
    title: 'Colonne della brochure',
    brief: 'Imposta due colonne per la pagina di brochure.',
    steps: ['Crea la cornice', 'Dividi in colonne', 'Controlla gutter e overflow'],
  },
  learned: 'Sai strutturare un testo con allineamenti e colonne coerenti.',
  next: 'Gli stili di testo: definisci una volta, applica ovunque.',
  consolidate: 'Apri un PDF editoriale e conta le colonne e i tipi di allineamento.',
});

const l4 = affLesson(W, 4, {
  id: 'af-w3l4',
  title: 'Stili di testo',
  subtitle: 'Definisci una volta, applica ovunque',
  objectives: ['Creare uno stile di paragrafo', 'Creare uno stile di carattere', 'Aggiornare gli stili senza rompere il layout'],
  concepts: ['stili', 'paragrafo', 'carattere'],
  activation: ['Se devi cambiare il colore di tutti i titoli, quanti click fai?', 'Con gli stili, uno: modifichi la definizione e tutti i titoli si aggiornano.'],
  analogy:
    'Gli stili sono etichette con regole: “Titolo” significa corpo 32, grassetto, interlinea 1,2. Applichi l’etichetta, non ripeti le regole.',
  theory: [
    'Uno stile di paragrafo contiene allineamento, interlinea, spazi e font. Uno stile di carattere contiene solo proprietà locali come colore, corsivo o tracking.',
    'Gli stili vanno creati dal testo formattato, poi applicati. Modificando la definizione si aggiorna tutto il documento, mantenendo la coerenza.',
  ],
  table: {
    rows: [
      ['Titolo', 'Stile di paragrafo', '32 pt'],
      ['Corpo', 'Stile di paragrafo', '11 pt'],
      ['Grassetto', 'Stile di carattere', 'Solo locale'],
    ],
  },
  trace: [
    ['Formatta un testo campione', 'Lo stile nasce da una decisione reale.'],
    ['Crea lo stile dal testo', 'Salva le proprietà con un nome.'],
    ['Applicalo agli altri testi', 'Non copiare la formattazione a mano.'],
    ['Modifica la definizione', 'Tutti gli usi si aggiornano.'],
  ],
  misconception: ['Gli stili servono solo nei documenti lunghi.', 'Anche un poster con cinque testi trae vantaggio dalla coerenza.'],
  world: [
    'Una rivista usa stili per titoli, occhielli e didascalie.',
    'Un sito mantiene coerenza tra pagine grazie agli stili.',
    'Un preventivo aggiorna tutti i totali cambiando un solo stile.',
  ],
  tip: 'Se ti accorgi di ripetere gli stessi tre click, è il momento di creare uno stile.',
  errors: [
    {
      title: 'Testo che non si aggiorna',
      whatYouDo: 'Applichi la formattazione a mano invece dello stile.',
      whatHappens: 'Cambiando lo stile, quel testo resta diverso.',
      why: 'La formattazione locale vince sullo stile.',
      fix: 'Rimuovi la formattazione locale e applica lo stile.',
      recognize: 'Se un testo non cambia, ha override locali.',
    },
    {
      title: 'Stile di carattere usato come paragrafo',
      whatYouDo: 'Applichi uno stile di carattere a un intero paragrafo.',
      whatHappens: 'Allineamento e interlinea non cambiano.',
      why: 'Lo stile di carattere non contiene proprietà di paragrafo.',
      fix: 'Crea e applica uno stile di paragrafo.',
      recognize: 'Se mancano interlinea e allineamento, è lo stile sbagliato.',
    },
  ],
  drills: [
    {
      title: 'Crea lo stile Titolo',
      task: 'Formatta un titolo e crealo come stile di paragrafo “Titolo poster”.',
      checks: ['Lo stile esiste', 'Il nome è chiaro', 'È applicato al titolo'],
      hints: ['Dal pannello Stili → Crea stile.', 'Parti dal testo già formattato.'],
      solution: 'Formatta → Stili → Crea stile paragrafo → “Titolo poster”.',
      explanation: 'Lo stile cattura una decisione, non un caso.',
    },
    {
      title: 'Aggiorna tutto',
      task: 'Modifica il corpo del titolo nello stile e verifica che tutti gli usi cambino.',
      checks: ['Ho modificato la definizione', 'Tutti i titoli sono cambiati', 'Nessun testo è rimasto indietro'],
      hints: ['Modifica lo stile, non il testo.', 'Cerca override locali.'],
      solution: 'Stili → modifica “Titolo poster” → cambia corpo.',
      explanation: 'La coerenza è il vero vantaggio degli stili.',
    },
    {
      title: 'Stile di carattere',
      task: 'Crea uno stile “Evidenza” con colore e grassetto e applicalo a tre parole.',
      checks: ['Lo stile è di carattere', 'Ha colore e grassetto', 'È applicato a tre parole'],
      hints: ['Non creare uno stile di paragrafo.', 'Seleziona solo le parole.'],
      solution: 'Formatta parole → Crea stile carattere → “Evidenza”.',
      explanation: 'Gli stili di carattere sono per dettagli locali.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa contiene uno stile di paragrafo?',
      options: [
        ['Solo il colore', 'Il colore può esserci, ma non è l’unica proprietà.'],
        ['Font, interlinea, allineamento e spazi', 'Esatto: regole di blocco.'],
        ['Solo la dimensione', 'La dimensione è una parte.'],
      ],
      correct: 1,
      explanation: 'Lo stile di paragrafo definisce il blocco, non solo le lettere.',
    },
    {
      question: 'Perché un testo non cambia quando aggiorni lo stile?',
      options: [
        ['Perché ha formattazione locale', 'Esatto: l’override vince.'],
        ['Perché è bloccato', 'Il blocco impedisce la modifica, non l’aggiornamento.'],
        ['Perché il file è CMYK', 'Nessuna relazione.'],
      ],
      correct: 0,
      explanation: 'Gli override locali sono l’eccezione che rompe la coerenza.',
    },
  ],
  explain: {
    prompt: 'Spiega il vantaggio degli stili rispetto alla formattazione manuale.',
    keywords: ['stili', 'coerenza', 'aggiorn', 'formattazione', 'documento'],
    model:
      'Gli stili salvano un insieme di regole con un nome. Invece di ripetere gli stessi click su ogni titolo, applico lo stile e modifico la definizione quando voglio cambiare. Tutti gli usi si aggiornano insieme, quindi il documento resta coerente e facile da mantenere.',
  },
  project: {
    title: 'Sistema tipografico',
    brief: 'Definisci gli stili del poster: titolo, occhiello, corpo e didascalia.',
    steps: ['Crea quattro stili', 'Applicali', 'Aggiorna uno stile e verifica'],
  },
  learned: 'Sai costruire un sistema tipografico, non solo formattare testi.',
  next: 'Testo su tracciato e testo in forma: la tipografia che segue la geometria.',
  consolidate: 'Crea uno stile per ogni ruolo tipografico che usi di solito.',
});

const l5 = affLesson(W, 5, {
  id: 'af-w3l5',
  title: 'Testo su tracciato e in forma',
  subtitle: 'Far seguire al testo una curva',
  objectives: ['Applicare testo a un tracciato', 'Controllare offset e direzione', 'Usare una forma come cornice'],
  concepts: ['testo su tracciato', 'offset', 'testo in forma'],
  activation: ['Come scriveresti un testo che segue il bordo di un cerchio senza deformare le lettere?', 'Con testo su tracciato: le lettere restano dritte e seguono la curva.'],
  analogy:
    'Il testo su tracciato è un trenino su binari curvi: le lettere restano rigide, ma il percorso è la curva. Il testo in forma è un liquido che riempie un contenitore.',
  theory: [
    'Selezioni un tracciato e usi Testo su tracciato: il testo parte dall’inizio del percorso. Offset, baseline e direzione controllano dove si appoggia e da che parte scorre.',
    'Il testo in forma riempie l’interno di una forma chiusa. La forma diventa una cornice: il testo va a capo e può essere modificato come un paragrafo.',
  ],
  table: {
    rows: [
      ['Seguire una curva', 'Testo su tracciato', '—'],
      ['Riempire una forma', 'Testo in forma', '—'],
      ['Spostare il testo', 'Offset baseline', '—'],
    ],
  },
  trace: [
    ['Disegna il tracciato o la forma', 'La geometria viene prima del testo.'],
    ['Seleziona lo strumento testo giusto', 'Tracciato o forma.'],
    ['Scrivi e regola offset', 'Il testo deve restare leggibile.'],
    ['Controlla inizio e fine', 'Evita lettere tagliate o capovolte.'],
  ],
  misconception: ['Il testo su tracciato è sempre leggibile.', 'Su curve strette le lettere si comprimono o si capovolgono.'],
  world: [
    'Un badge circolare usa testo su tracciato per la scritta esterna.',
    'Un poster usa testo in forma per riempire un’ellisse.',
    'Un logo combina testo su tracciato e testo artistico.',
  ],
  tip: 'Se le lettere si deformano troppo, allarga la curva o riduci il corpo: non forzare la forma.',
  errors: [
    {
      title: 'Testo capovolto',
      whatYouDo: 'Applichi il testo su un tracciato che scorre nell’altra direzione.',
      whatHappens: 'Le lettere appaiono sottosopra.',
      why: 'La direzione del percorso decide il verso del testo.',
      fix: 'Inverti la direzione del tracciato o sposta l’offset.',
      recognize: 'Se il testo è specchiato, il tracciato va invertito.',
    },
    {
      title: 'Testo in forma illeggibile',
      whatYouDo: 'Usi una forma molto stretta e irregolare.',
      whatHappens: 'Le righe si spezzano in parole isolate.',
      why: 'La forma non offre larghezza sufficiente.',
      fix: 'Semplifica la forma o usa una cornice rettangolare.',
      recognize: 'Se le parole sono tutte su righe diverse, la forma è troppo stretta.',
    },
  ],
  drills: [
    {
      title: 'Badge circolare',
      task: 'Scrivi “AFFINITY MASTERY” su un cerchio, leggibile e centrato.',
      checks: ['Il testo segue il cerchio', 'È centrato', 'Nessuna lettera è tagliata'],
      hints: ['Usa l’offset per centrare.', 'Riduci il corpo se le lettere si toccano.'],
      solution: 'Cerchio → Testo su tracciato → offset → centra.',
      explanation: 'Il badge è un classico esercizio di controllo dell’offset.',
    },
    {
      title: 'Testo in ellisse',
      task: 'Riempi un’ellisse con un paragrafo breve e controlla il flusso.',
      checks: ['Il testo riempie la forma', 'Va a capo', 'Non ci sono overflow'],
      hints: ['Testo in forma richiede una forma chiusa.', 'Controlla il bordo.'],
      solution: 'Ellisse → Testo in forma → scrivi → controlla.',
      explanation: 'La forma diventa una cornice non rettangolare.',
    },
    {
      title: 'Curva leggibile',
      task: 'Crea un arco ampio con un testo e regola l’offset per evitare deformazioni.',
      checks: ['L’arco è ampio', 'Il testo è leggibile', 'L’offset è regolato'],
      hints: ['Curve strette deformano.', 'Sposta il testo sopra o sotto il percorso.'],
      solution: 'Arco ampio → testo → offset → verifica.',
      explanation: 'La leggibilità viene prima dell’effetto.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa controlla l’offset del testo su tracciato?',
      options: [
        ['La dimensione del font', 'Il corpo è separato.'],
        ['La distanza dal percorso', 'Esatto: sposta il testo rispetto al binario.'],
        ['Il colore del testo', 'Il colore è separato.'],
      ],
      correct: 1,
      explanation: 'L’offset è la distanza dalla linea guida.',
    },
    {
      question: 'Quando il testo in forma è una cattiva idea?',
      options: [
        ['Quando la forma è troppo stretta o irregolare', 'Esatto: il flusso diventa illeggibile.'],
        ['Quando il testo è breve', 'Con testi brevi funziona bene.'],
        ['Quando usi un font sans-serif', 'Il font non è il problema.'],
      ],
      correct: 0,
      explanation: 'La forma deve sostenere la lettura, non combatterla.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra testo su tracciato e testo in forma.',
    keywords: ['tracciato', 'forma', 'curva', 'riemp', 'testo'],
    model:
      'Il testo su tracciato segue una linea aperta o chiusa e resta su quel percorso; l’offset lo avvicina o allontana. Il testo in forma riempie l’interno di una forma chiusa e va a capo come in una cornice. Il primo serve per badge e curve, il secondo per paragrafi dentro forme.',
  },
  project: {
    title: 'Badge del brand',
    brief: 'Crea un badge circolare con il nome del progetto.',
    steps: ['Disegna il cerchio', 'Applica testo su tracciato', 'Centra con offset'],
  },
  learned: 'Sai far seguire al testo una geometria senza perdere leggibilità.',
  next: 'Gestione font: font mancanti, sostituzione e licenze.',
  consolidate: 'Guarda un logo circolare e individua il percorso del testo.',
});

const l6 = affLesson(W, 6, {
  id: 'af-w3l6',
  title: 'Gestione dei font',
  subtitle: 'Font mancanti, sostituzione, licenze',
  objectives: ['Riconoscere un font mancante', 'Sostituire senza rompere il layout', 'Scegliere font con licenza corretta'],
  concepts: ['font mancanti', 'sostituzione', 'licenze'],
  activation: ['Un cliente apre il tuo file e vede un font diverso. Perché?', 'Perché quel font non è installato sul suo computer o non è incorporato nel PDF.'],
  analogy:
    'I font sono strumenti musicali: se manca il violino, l’orchestra suona diversa. Incorporare il font nel PDF è come registrare la traccia invece di lasciare solo lo spartito.',
  theory: [
    'Affinity segnala i font mancanti e propone una sostituzione. Sostituire con un font dalle metriche simili riduce i cambi di impaginazione.',
    'Per la stampa, incorpora i font nel PDF. Per il web usa font con licenza web; per il logo valuta la conversione in tracciati, ricordando che perdi la modificabilità del testo.',
  ],
  table: {
    rows: [
      ['Font mancante', 'Pannello Font', 'Sostituisci'],
      ['PDF stampa', 'Incorpora font', 'Sempre'],
      ['Logo', 'Tracciati', 'Solo se licenza'],
    ],
  },
  trace: [
    ['Apri il pannello Font', 'Vedi gli avvisi di font mancante.'],
    ['Scegli un sostituto con metriche simili', 'Confronta larghezza e altezza.'],
    ['Controlla righe e interlinea', 'La sostituzione può cambiare i ritorni.'],
    ['Incorpora nel PDF', 'La stampa deve essere identica.'],
  ],
  misconception: ['Convertire il testo in tracciati risolve le licenze.', 'I tracciati trasferiscono la forma, non il diritto d’uso del font.'],
  world: [
    'Un PDF per la tipografia incorpora i font per evitare sostituzioni.',
    'Un sito usa font con licenza web e fallback di sistema.',
    'Un logo convertito in tracciati resta identico su ogni computer.',
  ],
  tip: 'Prima di scegliere un font, controlla la licenza per l’uso che ne farai: personale, web o commerciale.',
  errors: [
    {
      title: 'PDF con font sostituiti',
      whatYouDo: 'Esporti senza incorporare i font.',
      whatHappens: 'Il cliente vede un font diverso.',
      why: 'Il PDF fa riferimento al font installato, se non lo incorpora.',
      fix: 'Esporta con incorporazione font attiva.',
      recognize: 'Se il PDF cambia aspetto su un altro computer, i font non sono incorporati.',
    },
    {
      title: 'Layout che va a capo diversamente',
      whatYouDo: 'Sostituisci un font con uno molto più largo.',
      whatHappens: 'Titoli e paragrafi cambiano numero di righe.',
      why: 'Le metriche dei font non sono identiche.',
      fix: 'Scegli un sostituto con metriche simili e ricontrolla.',
      recognize: 'Se cambiano i ritorni a capo, il sostituto è troppo diverso.',
    },
  ],
  drills: [
    {
      title: 'Individua il font mancante',
      task: 'Apri un file con un font mancante e annota il nome e il sostituto proposto.',
      checks: ['Ho trovato l’avviso', 'Ho letto il nome', 'Ho visto il sostituto'],
      hints: ['Pannello Font.', 'L’avviso è evidenziato.'],
      solution: 'Pannello Font → leggi avviso → annota sostituto.',
      explanation: 'Riconoscere il problema è il primo passo per risolverlo.',
    },
    {
      title: 'Sostituzione controllata',
      task: 'Sostituisci il font e confronta il numero di righe prima e dopo.',
      checks: ['Ho sostituito il font', 'Ho confrontato le righe', 'Ho corretto eventuali overflow'],
      hints: ['Scegli un font simile.', 'Guarda i titoli lunghi.'],
      solution: 'Sostituisci → confronta → correggi interlinea o corpo.',
      explanation: 'La sostituzione è un cambio di layout potenziale.',
    },
    {
      title: 'PDF blindato',
      task: 'Esporta un PDF con incorporazione font e riaprilo.',
      checks: ['I font sono incorporati', 'Il testo è identico', 'Il PDF si apre senza avvisi'],
      hints: ['Opzioni PDF → Font.', 'Controlla su un altro dispositivo se puoi.'],
      solution: 'Esporta PDF → incorpora font → riapri e verifica.',
      explanation: 'Un PDF di stampa deve essere autosufficiente.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa succede se un PDF non incorpora i font?',
      options: [
        ['Il file non si apre', 'Si apre, ma può sostituire i font.'],
        ['Il testo può apparire con un font diverso', 'Esatto: dipende dal sistema.'],
        ['Il PDF diventa vettoriale', 'Il vettore è un’altra proprietà.'],
      ],
      correct: 1,
      explanation: 'L’incorporazione rende il PDF indipendente dai font installati.',
    },
    {
      question: 'Convertire un logo in tracciati risolve la licenza del font?',
      options: [
        ['Sì, sempre', 'La licenza riguarda l’uso del font, non solo la distribuzione del file.'],
        ['No, la licenza resta', 'Esatto: i tracciati non cambiano i diritti.'],
        ['Solo per uso personale', 'La distinzione non è questa.'],
      ],
      correct: 1,
      explanation: 'La forma convertita non cancella i termini d’uso.',
    },
  ],
  explain: {
    prompt: 'Spiega perché incorporare i font in un PDF di stampa.',
    keywords: ['font', 'pdf', 'incorpora', 'stampa', 'sostitu'],
    model:
      'Incorporare i font significa portare con il PDF le informazioni necessarie a disegnare il testo. Se non lo faccio, il computer o la tipografia possono sostituire il font con uno disponibile, cambiando aspetto e impaginazione. Per la stampa il PDF deve essere autosufficiente.',
  },
  project: {
    title: 'Font del brand',
    brief: 'Scegli due font con licenza adatta e documenta l’uso.',
    steps: ['Scegli titolo e corpo', 'Verifica la licenza', 'Esporta un PDF di prova'],
  },
  learned: 'Sai gestire i font come parte del file, non come dettaglio del computer.',
  next: 'Mettiamo tutto insieme in un poster tipografico.',
  consolidate: 'Controlla la licenza del font che usi di più: è una competenza professionale.',
});

const l7 = affLesson(W, 7, {
  id: 'af-w3l7',
  title: 'Ripasso e mini-progetto: poster',
  subtitle: 'Tipografia che comunica',
  objectives: ['Costruire una gerarchia visiva', 'Usare stili e tracciati', 'Esportare un poster pulito'],
  concepts: ['gerarchia', 'poster', 'export'],
  activation: ['Cosa guardi per primo in un poster: l’immagine, il titolo o il testo piccolo?', 'Il titolo, se la gerarchia funziona. Il resto arriva dopo.'],
  analogy:
    'La gerarchia è l’ordine in cui il cervello legge: titolo, sottotitolo, dettagli. Come in una conversazione, prima la frase principale, poi le sfumature.',
  theory: [
    'Un poster tipografico usa contrasto di dimensione, peso e spazio. Tre livelli bastano: titolo, sottotitolo, corpo. Il resto è decorazione.',
    'Gli stili mantengono la coerenza; il testo su tracciato aggiunge movimento senza deformare. Il formato A3 con bleed è una buona palestra.',
  ],
  table: {
    rows: [
      ['Titolo', '72–120 pt', 'Massimo contrasto'],
      ['Sottotitolo', '24–32 pt', 'Medio'],
      ['Corpo', '10–12 pt', 'Leggibile'],
    ],
  },
  trace: [
    ['Imposta la griglia e i margini', 'La struttura viene prima del testo.'],
    ['Scrivi i tre livelli', 'Titolo, sottotitolo, corpo.'],
    ['Applica gli stili', 'Coerenza senza click ripetuti.'],
    ['Controlla a distanza e esporta', 'Il poster si guarda da lontano.'],
  ],
  misconception: ['Un poster deve contenere tutte le informazioni.', 'Un poster deve far ricordare una cosa: il resto è secondario.'],
  world: [
    'Un poster per un concerto mette artista e data in grande.',
    'Un poster di mostra usa titolo e coordinate come gerarchia.',
    'Un manifesto sociale punta su una frase e uno spazio bianco.',
  ],
  tip: 'Allontanati di tre metri dal monitor: se non leggi il titolo, è troppo piccolo.',
  errors: [
    {
      title: 'Tutto uguale',
      whatYouDo: 'Usi la stessa dimensione per titolo e corpo.',
      whatHappens: 'Non sai dove guardare.',
      why: 'Senza contrasto non c’è gerarchia.',
      fix: 'Aumenta il titolo o riduci il corpo.',
      recognize: 'Se socchiudi gli occhi e vedi un blocco unico, manca gerarchia.',
    },
    {
      title: 'Testo su tracciato illeggibile',
      whatYouDo: 'Curvi una frase lunga su un cerchio piccolo.',
      whatHappens: 'Le lettere si comprimono.',
      why: 'La curva è troppo stretta per la lunghezza del testo.',
      fix: 'Accorcia la frase o allarga il cerchio.',
      recognize: 'Se devi girare la testa, il tracciato è sbagliato.',
    },
  ],
  drills: [
    {
      title: 'Tre livelli',
      task: 'Crea titolo, sottotitolo e corpo con contrasto chiaro.',
      checks: ['Il titolo domina', 'Il sottotitolo è intermedio', 'Il corpo è leggibile'],
      hints: ['Usa rapporti di almeno 2× tra livelli.', 'Non usare lo stesso peso ovunque.'],
      solution: 'Titolo 96 pt → sottotitolo 28 pt → corpo 11 pt.',
      explanation: 'La gerarchia è una differenza percepibile, non una dichiarazione.',
    },
    {
      title: 'Poster A3',
      task: 'Imposta un A3 con bleed e margini di sicurezza.',
      checks: ['Formato A3', 'Bleed 3 mm', 'Margini coerenti'],
      hints: ['Riusa le impostazioni della Settimana 1.', 'Controlla il fondo.'],
      solution: 'Nuovo → A3 → bleed 3 mm → guide a 10 mm.',
      explanation: 'La tecnica sostiene la tipografia.',
    },
    {
      title: 'Prova a distanza',
      task: 'Esporta il poster e guardalo a dimensione ridotta: il titolo è ancora leggibile?',
      checks: ['Ho esportato', 'Ho guardato a distanza', 'Il titolo è leggibile'],
      hints: ['Riduci l’anteprima al 25%.', 'Se non leggi, ingrandisci il titolo.'],
      solution: 'Esporta → anteprima 25% → valuta.',
      explanation: 'Il test d’uso batte l’impressione sul monitor.',
    },
  ],
  quizzes: [
    {
      question: 'Quanti livelli tipografici servono di solito in un poster?',
      options: [
        ['Uno', 'Senza gerarchia il poster è piatto.'],
        ['Tre: titolo, sottotitolo, corpo', 'Esatto: è una struttura sufficiente.'],
        ['Dieci', 'Troppi livelli confondono.'],
      ],
      correct: 1,
      explanation: 'La semplicità rende la gerarchia leggibile.',
    },
    {
      question: 'Qual è il test migliore per un poster?',
      options: [
        ['Guardarlo da vicino', 'Il poster vive a distanza.'],
        ['Guardarlo a dimensione ridotta o da lontano', 'Esatto: verifica la leggibilità reale.'],
        ['Contare i font', 'Il numero non basta.'],
      ],
      correct: 1,
      explanation: 'Il contesto d’uso decide cosa funziona.',
    },
  ],
  explain: {
    prompt: 'Spiega come costruire una gerarchia tipografica efficace.',
    keywords: ['gerarchia', 'titolo', 'contrasto', 'dimensione', 'leggibil'],
    model:
      'La gerarchia si costruisce con differenze evidenti di dimensione, peso e spazio. Il titolo deve dominare, il sottotitolo spiegare e il corpo informare. Uso pochi livelli e li verifico a distanza, perché il poster viene letto prima da lontano e poi da vicino.',
  },
  project: {
    title: 'Poster tipografico',
    brief: 'Crea un poster A3 con titolo, sottotitolo e corpo.',
    steps: ['Imposta griglia e bleed', 'Applica gli stili', 'Esporta e verifica a distanza'],
  },
  learned: 'Sai usare la tipografia per guidare l’occhio.',
  next: 'Il lato professionale: font variabili, OpenType e licenze.',
  consolidate: 'Riduci il poster a due elementi: se funziona ancora, la gerarchia è solida.',
});

const l8 = affLesson(W, 8, {
  id: 'af-w3l8',
  title: 'Tipografia professionale',
  subtitle: 'Font variabili, OpenType, licenze',
  objectives: ['Usare assi di un font variabile', 'Attivare funzioni OpenType', 'Scegliere licenze consapevoli'],
  concepts: ['font variabili', 'OpenType', 'licenze'],
  activation: ['Perché alcuni font hanno un solo file e infinite larghezze?', 'Sono font variabili: un file contiene più assi di variazione.'],
  analogy:
    'Un font variabile è una manopola continua: peso, larghezza e corsivo possono cambiare senza cambiare file. Un font statico è una serie di interruttori separati.',
  theory: [
    'I font variabili espongono assi come peso e larghezza. Sono utili per titoli responsive e sistemi di brand coerenti, ma vanno usati con misura.',
    'Le funzioni OpenType (legature, cifre tabulari, maiuscoletto) cambiano dettagli tipografici. Le licenze stabiliscono dove puoi usare il font: desktop, web, app, logo.',
  ],
  table: {
    rows: [
      ['Peso continuo', 'Font variabile', 'Asse weight'],
      ['Cifre allineate', 'OpenType', 'tnum'],
      ['Uso web', 'Licenza web', 'Verifica'],
    ],
  },
  trace: [
    ['Scegli un font variabile', 'Controlla gli assi disponibili.'],
    ['Regola peso e larghezza', 'Non deformare il carattere.'],
    ['Attiva le funzioni OpenType', 'Solo dove servono.'],
    ['Verifica la licenza', 'Desktop, web e logo possono avere termini diversi.'],
  ],
  misconception: ['Un font variabile è sempre più leggero.', 'Può contenere molti dati e essere più pesante di un singolo peso statico.'],
  world: [
    'Un sito usa un font variabile per adattare il titolo allo schermo.',
    'Un bilancio usa cifre tabulari per allineare i numeri.',
    'Un’azienda acquista una licenza web per il proprio font di marca.',
  ],
  tip: 'Se non sai se la licenza copre l’uso web, chiedi prima di pubblicare: dopo è tardi.',
  errors: [
    {
      title: 'Font variabile deformato',
      whatYouDo: 'Usi la scala orizzontale per allargare il testo.',
      whatHappens: 'Le lettere perdono proporzioni.',
      why: 'La larghezza dell’asse è progettata, la scala è una deformazione.',
      fix: 'Usa l’asse width del font variabile.',
      recognize: 'Se le curve sembrano schiacciate, hai usato la scala.',
    },
    {
      title: 'Cifre che non si allineano',
      whatYouDo: 'Usi cifre proporzionali in una tabella.',
      whatHappens: 'Le colonne dei numeri sono irregolari.',
      why: 'Le cifre proporzionali hanno larghezze diverse.',
      fix: 'Attiva le cifre tabulari OpenType.',
      recognize: 'Se i numeri ballano, manca tnum.',
    },
  ],
  drills: [
    {
      title: 'Esplora gli assi',
      task: 'Scegli un font variabile e prova tre pesi senza cambiare font.',
      checks: ['Ho usato lo stesso font', 'Ho cambiato solo il peso', 'I tre campioni sono distinguibili'],
      hints: ['Il selettore del peso è nel pannello Carattere.', 'Non usare il grassetto sintetico.'],
      solution: 'Font variabile → asse weight → tre valori → confronta.',
      explanation: 'Gli assi sono dimensioni progettate, non effetti.',
    },
    {
      title: 'Cifre tabulari',
      task: 'Crea una tabella di numeri e attiva le cifre tabulari.',
      checks: ['I numeri sono allineati', 'Ho attivato tnum', 'Le colonne sono regolari'],
      hints: ['OpenType → cifre tabulari.', 'Confronta prima e dopo.'],
      solution: 'Testo numerico → OpenType → cifre tabulari.',
      explanation: 'I dettagli OpenType rendono i dati leggibili.',
    },
    {
      title: 'Licenza in chiaro',
      task: 'Scegli un font e annota licenza desktop, web e logo.',
      checks: ['Ho letto la licenza', 'So se copre il web', 'So se copre il logo'],
      hints: ['Cerca la pagina ufficiale del font.', 'Non fidarti dei siti di download.'],
      solution: 'Sito del fonditore → licenza → annota i tre usi.',
      explanation: 'La licenza è parte della scelta tipografica.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa offre un font variabile?',
      options: [
        ['Un solo peso', 'Quello è un font statico.'],
        ['Più assi in un unico file', 'Esatto: peso, larghezza e altro.'],
        ['Solo il corsivo', 'Il corsivo è una parte.'],
      ],
      correct: 1,
      explanation: 'La variabilità è continua e definita da assi.',
    },
    {
      question: 'A cosa servono le cifre tabulari?',
      options: [
        ['Ad allineare i numeri in colonna', 'Esatto.'],
        ['A rendere i numeri più grandi', 'La dimensione è separata.'],
        ['A cambiare il colore', 'Nessuna relazione.'],
      ],
      correct: 0,
      explanation: 'Le cifre tabulari hanno larghezza uguale.',
    },
  ],
  explain: {
    prompt: 'Spiega cosa sono i font variabili e perché la licenza conta.',
    keywords: ['variabil', 'assi', 'licenza', 'font', 'uso'],
    model:
      'Un font variabile contiene più assi di variazione, come peso e larghezza, in un solo file. Posso adattare il carattere senza cambiare font. La licenza conta perché stabilisce dove posso usarlo: desktop, web, app o logo hanno spesso termini diversi.',
  },
  project: {
    title: 'Tipografia di marca',
    brief: 'Documenta font, pesi e licenze del brand kit.',
    steps: ['Scegli titolo e corpo', 'Annota pesi e licenze', 'Crea un campione'],
  },
  learned: 'Sai usare la tipografia come sistema tecnico e legale, non solo estetico.',
  next: 'La Settimana 4 porta il Vettore nell’illustrazione e nel logo.',
  consolidate: 'Controlla la licenza del font del tuo progetto e annotala nel file.',
});

export const week03 = affWeek({
  number: 3,
  title: 'Vettore: testo e tipografia',
  subtitle: 'Parole che diventano design',
  description:
    'Testo artistico e in cornice, carattere, paragrafi, stili, tracciati e font: la tipografia come sistema, non come scelta dell’ultimo minuto.',
  goals: ['Scegliere il contenitore di testo giusto', 'Costruire stili coerenti', 'Esportare un poster leggibile'],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Brand kit · poster tipografico',
    brief: 'Il brand kit acquisisce un poster A3 con gerarchia e stili coerenti.',
    deliverable: 'Poster A3 con bleed, tre livelli tipografici e PDF verificato.',
    milestones: ['Testo artistico e cornice usati bene', 'Stili applicati', 'Poster esportato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Font variabili', 'Funzioni OpenType', 'Licenze'],
    exercise: 'Documenta i font del progetto con licenza e pesi usati.',
  },
});
