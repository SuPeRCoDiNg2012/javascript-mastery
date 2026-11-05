import { affLesson, affWeek } from './authoring';

const W = 'af-week-01';

const l1 = affLesson(W, 1, {
  id: 'af-w1l1',
  title: 'Cos’è Affinity by Canva',
  subtitle: 'Un’app, tre strumenti professionali, un file',
  objectives: [
    'Distinguere Vettore, Pixel e Layout',
    'Riconoscere cosa è gratuito e cosa richiede Canva Pro',
    'Creare e salvare un documento .af',
  ],
  concepts: ['Affinity by Canva', 'Studios', 'file .af'],
  activation: [
    'Hai mai esportato un logo da Canva e scoperto che ingrandito diventa sfocato? Perché succede?',
    'Perché Canva lavora soprattutto a pixel; Affinity Vettore costruisce forme matematiche che restano nitide a ogni dimensione.',
  ],
  analogy:
    'Affinity è una cassetta degli attrezzi con tre scomparti: Vettore per disegnare, Pixel per fotografare e ritoccare, Layout per impaginare. Condividono lo stesso banco da lavoro, quindi passi da uno all’altro senza cambiare app.',
  theory: [
    'Affinity by Canva unifica Designer, Photo e Publisher in un’unica applicazione gratuita con account Canva. Ogni documento vive in un file `.af` e può contenere tavole vettoriali, livelli pixel e pagine di layout.',
    'Le funzioni AI di Canva — Generative Fill, Expand e Remove Background — richiedono Canva Pro. Il resto è utilizzabile senza abbonamento, anche offline dopo l’installazione.',
  ],
  table: {
    caption: 'I tre Studios e il loro uso tipico',
    rows: [
      ['Disegnare un logo', 'Studio Vettore', 'V'],
      ['Ritoccare una foto', 'Studio Pixel', 'P'],
      ['Impaginare una brochure', 'Studio Layout', 'L'],
    ],
  },
  trace: [
    ['Scarica Affinity dal sito ufficiale e accedi con Canva', 'L’account gratuito sblocca l’app; non serve Canva Pro per iniziare.'],
    ['Crea un documento nuovo e scegli lo Studio adatto', 'Vettore per forme, Pixel per immagini, Layout per pagine.'],
    ['Salva subito con un nome riconoscibile', 'Il formato nativo `.af` conserva livelli, tavole e storia del lavoro.'],
    ['Esporta una copia PNG o PDF solo alla fine', 'L’export è una fotografia del lavoro, non il file di lavoro.'],
  ],
  misconception: [
    'Affinity è “Canva senza abbonamento”.',
    'Canva è un editor guidato con template; Affinity è uno strumento professionale con livelli, tracciati e profili colore. condividono l’azienda, non il modello di lavoro.',
  ],
  world: [
    'Un freelance crea il logo in Vettore e la foto profilo in Pixel, poi impagina il biglietto in Layout.',
    'Un piccolo negozio prepara un poster A3 per la vetrina e un PDF con bleed per la tipografia.',
    'Uno studente esporta un’illustrazione SVG per il sito e un PNG per le slide.',
  ],
  tip: 'Se non sai da quale Studio partire, chiediti che cosa stai modificando: una forma, una foto o una pagina. La risposta è lì.',
  errors: [
    {
      title: 'Lavorare a pixel un logo',
      whatYouDo: 'Crei il logo in Pixel e lo ingrandisci per un cartellone.',
      whatHappens: 'Il bordo diventa sfocato e a gradini.',
      why: 'I pixel sono un reticolo fisso: ingrandire significa inventare pixel che non esistono.',
      fix: 'Crea il logo in Vettore e esporta PNG alla dimensione serve.',
      recognize: 'Se il problema compare solo ingrandendo, il file di partenza è raster.',
    },
    {
      title: 'Cercare le funzioni AI nella versione gratuita',
      whatYouDo: 'Apri Generative Fill senza un piano Canva Pro.',
      whatHappens: 'La funzione è bloccata o chiede l’upgrade.',
      why: 'L’AI è un servizio con costi ricorrenti, separato dall’app gratuita.',
      fix: 'Usa gli strumenti manuali oppure attiva Pro consapevolmente.',
      recognize: 'Ogni funzione con la stellina Canva AI richiede un piano a pagamento.',
    },
  ],
  drills: [
    {
      title: 'Riconosci lo Studio',
      task: 'Apri Affinity e individua i tre Studios. Senza creare nulla, annota quale useresti per un logo, una foto e un volantino.',
      checks: ['Ho trovato il selettore degli Studios', 'Ho associato logo → Vettore, foto → Pixel, volantino → Layout', 'So tornare alla schermata iniziale'],
      hints: ['Gli Studios sono in alto o nella barra degli strumenti.', 'Il nome dello Studio attivo è sempre visibile.'],
      solution: 'Apri Affinity → osserva il selettore Vettore/Pixel/Layout → passa da uno all’altro e torna al documento.',
      explanation: 'Riconoscere lo Studio giusto è il primo filtro mentale: evita di usare Pixel per ciò che è vettoriale.',
    },
    {
      title: 'Primo documento',
      task: 'Crea un documento A5 (148 × 210 mm), RGB, 300 dpi. Salvalo come `prova-a5.af`.',
      checks: ['Il documento è A5', 'Il profilo è RGB', 'Il file è salvato in `.af`'],
      hints: ['Nuovo documento → preset A5.', 'Il profilo colore si sceglie nelle impostazioni del documento.'],
      solution: 'File → Nuovo → A5 → RGB/300 dpi → Crea → Salva con nome `prova-a5`.',
      explanation: 'Un documento di prova ti fa vedere subito dove sono le impostazioni che contano.',
    },
    {
      title: 'Tre file, tre formati',
      task: 'Esporta lo stesso documento in PNG e PDF. Apri entrambi e nota cosa cambia.',
      checks: ['Ho esportato un PNG', 'Ho esportato un PDF', 'So spiegare quale dei due è per lo schermo'],
      hints: ['File → Esporta.', 'Il PDF può contenere testo e vettori; il PNG è un’immagine.'],
      solution: 'File → Esporta → PNG (schermo) → poi PDF (stampa o condivisione).',
      explanation: 'L’export giusto dipende da dove vivrà il file, non dal formato “più bello”.',
    },
  ],
  quizzes: [
    {
      question: 'Quale Studio usi per un logo che deve restare nitido su un cartellone?',
      options: [
        ['Pixel', 'I pixel si ingrandiscono male: il logo perderebbe definizione.'],
        ['Vettore', 'Esatto: le forme vettoriali si scalano senza perdere qualità.'],
        ['Layout', 'Layout impagina pagine, non costruisce il marchio.'],
      ],
      correct: 1,
      explanation: 'Vettore descrive forme con matematica, quindi la qualità non dipende dalla dimensione.',
    },
    {
      question: 'Cosa contiene il file `.af`?',
      options: [
        ['Solo un’immagine appiattita', 'Quello è un export PNG: perde livelli e modificabilità.'],
        ['Il progetto modificabile con livelli e tavole', 'Esatto: è il formato nativo di lavoro.'],
        ['Solo il PDF per la stampa', 'Il PDF è un output, non il progetto completo.'],
      ],
      correct: 1,
      explanation: 'Conserva la struttura del lavoro: è il file da riaprire e modificare.',
    },
  ],
  explain: {
    prompt: 'Spiega con parole tue la differenza tra Vettore e Pixel e perché conta per un logo.',
    keywords: ['vettore', 'pixel', 'scal', 'nitid', 'logo'],
    model:
      'Il vettore descrive forme geometriche con coordinate e curve, quindi può essere ingrandito all’infinito senza perdere nitidezza. Il pixel lavora su una griglia fissa: ingrandendo, i pixel diventano quadrati visibili. Per un logo uso il vettore perché deve funzionare sia su un biglietto sia su un cartellone.',
  },
  project: {
    title: 'Documento base del brand kit',
    brief: 'Crea il documento A5 che accompagnerà tutto il corso e salvalo nella cartella del progetto.',
    steps: ['Crea A5, RGB, 300 dpi', 'Aggiungi una tavola chiamata “Brand kit”', 'Salva come `brand-kit.af`'],
  },
  learned: 'Sai scegliere lo Studio giusto e distinguere il file di lavoro dall’export.',
  next: 'Ora esploriamo l’interfaccia: pannelli, Studios personalizzati e dove vivono gli strumenti.',
  consolidate: 'Oggi apri Affinity e crea un documento A5: bastano due minuti per rendere reale tutto il resto.',
});

const l2 = affLesson(W, 2, {
  id: 'af-w1l2',
  title: 'L’interfaccia e i tre Studios',
  subtitle: 'Dove sono gli strumenti, i pannelli e il workspace',
  objectives: ['Orientarti tra tela, strumenti e pannelli', 'Passare da uno Studio all’altro', 'Salvare uno Studio personalizzato'],
  concepts: ['interfaccia', 'pannelli', 'Studio personalizzato'],
  activation: ['Quando apri un’app nuova, cosa cerchi per primo: il pulsante che ti serve o la mappa di dove sono le cose?', 'Prima la mappa: sapere dove vivono gli strumenti riduce la sensazione di caos.'],
  analogy:
    'L’interfaccia è un laboratorio: la tela è il banco, la barra degli strumenti è il carrello degli attrezzi, i pannelli sono i cassetti. Gli Studios sono configurazioni del laboratorio per lavori diversi.',
  theory: [
    'La finestra si divide in tela, barra degli strumenti a sinistra, pannelli a destra e barra dei comandi in alto. Cambiando Studio cambiano gli strumenti visibili, non il documento.',
    'Uno Studio personalizzato salva la disposizione dei pannelli. Serve quando ripeti lo stesso compito, per esempio ritocco foto o impaginazione.',
  ],
  table: {
    rows: [
      ['Cambiare Studio', 'Selettore in alto', 'V / P / L'],
      ['Mostrare un pannello', 'Finestra → Pannelli', 'Maiuscia + nome'],
      ['Salvare il workspace', 'Studio → Salva studio', '—'],
    ],
  },
  trace: [
    ['Individua la tela e i due pannelli laterali', 'Sapere cosa è contenuto e cosa è strumento evita click a caso.'],
    ['Apri il selettore degli Studios e passa a Pixel', 'Gli strumenti cambiano in base al compito.'],
    ['Apri un pannello mancante dal menu Finestra', 'I pannelli non sono tutti visibili: si aggiungono quando servono.'],
    ['Salva la disposizione come studio personale', 'Il workspace torna esattamente com’era al prossimo avvio.'],
  ],
  misconception: ['Più pannelli aperti = più controllo.', 'I pannelli aperti occupano spazio e attirano l’attenzione: tieni solo quelli del compito attuale.'],
  world: [
    'Un ritoccatore salva uno studio con Livelli, Curve e Maschere sempre a portata.',
    'Un grafico editoriale tiene aperto il pannello Paragrafi e Carattere.',
    'Chi crea icone lavora con Tracciati e Allineamento, nascondendo il resto.',
  ],
  tip: 'Se ti perdi, premi il tasto dello Studio: V, P o L. La vista torna al punto di partenza.',
  errors: [
    {
      title: 'Cercare lo strumento nel pannello sbagliato',
      whatYouDo: 'Cerchi lo strumento Penna mentre sei in Studio Pixel.',
      whatHappens: 'La Penna non c’è o funziona diversamente.',
      why: 'Ogni Studio espone gli strumenti del proprio dominio.',
      fix: 'Passa a Studio Vettore e riprova.',
      recognize: 'Se manca un attrezzo, controlla prima lo Studio attivo.',
    },
    {
      title: 'Workspace ingestibile',
      whatYouDo: 'Apri tutti i pannelli contemporaneamente.',
      whatHappens: 'La tela si riduce e non trovi più nulla.',
      why: 'Lo spazio visivo è una risorsa: troppi pannelli aumentano il carico cognitivo.',
      fix: 'Tieni aperti solo i pannelli del compito e salva lo studio.',
      recognize: 'Se devi chiudere pannelli ogni volta, il workspace non è adatto.',
    },
  ],
  drills: [
    {
      title: 'Mappa della finestra',
      task: 'Senza modificare il documento, indica a voce alta tela, barra strumenti, pannelli e barra dei comandi.',
      checks: ['Ho individuato le quattro aree', 'So dove si cambia Studio', 'So aprire un pannello dal menu Finestra'],
      hints: ['La barra in alto contiene i comandi del documento.', 'I pannelli sono impilati a destra.'],
      solution: 'Osserva la finestra → nomina le aree → apri Finestra → Pannelli e chiudi ciò che non serve.',
      explanation: 'Dare un nome alle aree trasforma una schermata caotica in una mappa mentale.',
    },
    {
      title: 'Uno studio per il ritocco',
      task: 'Passa a Pixel, apri Livelli e Curve, chiudi gli altri pannelli e salva lo studio come “Ritocco”.',
      checks: ['Sono in Studio Pixel', 'Vedo Livelli e Curve', 'Lo studio è salvato'],
      hints: ['Finestra → Pannelli elenca tutti i pannelli.', 'Il salvataggio è nel menu dello Studio.'],
      solution: 'Pixel → apri Livelli e Curve → chiudi gli altri → Studio → Salva studio → “Ritocco”.',
      explanation: 'Un workspace dedicato riduce i click e rende il ritmo più fluido.',
    },
    {
      title: 'Torna al punto di partenza',
      task: 'Da Studio Layout, torna a Vettore e verifica che il documento sia rimasto identico.',
      checks: ['Ho cambiato Studio', 'Il documento non è cambiato', 'So spiegare perché'],
      hints: ['Lo Studio cambia gli strumenti, non i contenuti.', 'Controlla il nome del file nella barra del titolo.'],
      solution: 'Layout → Vettore → osserva che tavole e livelli sono gli stessi.',
      explanation: 'Gli Studios sono viste di lavoro sullo stesso documento, non file separati.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa cambia quando passi da Vettore a Pixel?',
      options: [
        ['Il documento viene convertito in immagine', 'Nessuna conversione: cambia solo l’insieme di strumenti e pannelli.'],
        ['Cambiano gli strumenti disponibili', 'Esatto: lo Studio è una vista operativa sul documento.'],
        ['Il file perde i livelli', 'I livelli restano: l’export è l’unico passaggio che appiattisce.'],
      ],
      correct: 1,
      explanation: 'Lo Studio è un contesto di lavoro, non un formato di file.',
    },
    {
      question: 'A cosa serve uno Studio personalizzato?',
      options: [
        ['A creare un nuovo documento', 'Il documento si crea da File → Nuovo.'],
        ['A ricordare la disposizione dei pannelli per un compito', 'Esatto: è un workspace salvato.'],
        ['A cambiare il colore dell’interfaccia', 'L’aspetto è una preferenza separata.'],
      ],
      correct: 1,
      explanation: 'Salva layout e pannelli, non contenuti.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra Studio e documento.',
    keywords: ['studio', 'documento', 'strumenti', 'pannelli', 'file'],
    model:
      'Il documento è il file con il contenuto: tavole, livelli, pagine. Lo Studio è la configurazione dell’interfaccia che uso per lavorarci: strumenti e pannelli visibili. Posso cambiare Studio senza modificare il documento, e lo stesso documento può essere aperto in Studios diversi.',
  },
  project: {
    title: 'Workspace del corso',
    brief: 'Prepara uno studio “Brand kit” con i pannelli che userai di più.',
    steps: ['Apri Livelli, Carattere e Allineamento', 'Salva lo studio come “Brand kit”', 'Scatta una nota mentale di dove sono'],
  },
  learned: 'Sai orientarti nell’interfaccia e costruire un workspace che riduce i click.',
  next: 'Il documento è la base: dimensioni, colore, risoluzione e bleed decidono se il lavoro sarà utilizzabile.',
  consolidate: 'Dedica cinque minuti a disporre i pannelli: è un investimento che ripaghi a ogni lezione.',
});

const l3 = affLesson(W, 3, {
  id: 'af-w1l3',
  title: 'Documenti, colore e risoluzione',
  subtitle: 'RGB, CMYK, dpi e bleed spiegati senza gergo',
  objectives: ['Scegliere dimensioni e profilo colore', 'Distinguere 72 e 300 dpi', 'Impostare il bleed per la stampa'],
  concepts: ['documento', 'RGB/CMYK', 'bleed'],
  activation: ['Perché lo stesso rosso sembra diverso sullo schermo e sulla carta stampata?', 'Perché schermo e stampa mescolano il colore in modo diverso: luce contro inchiostro.'],
  analogy:
    'RGB è una torcia che accende tre luci; CMYK è un pittore che mescola quattro inchiostri. Il bleed è il margine di sicurezza che lasci oltre il taglio, come la parte di foto che resta sotto la cornice.',
  theory: [
    'Un documento per schermo usa RGB e 72 dpi; un documento per stampa usa CMYK, 300 dpi e almeno 3 mm di bleed. I dpi indicano quanti pixel cadono in un pollice: più sono, più dettaglio c’è.',
    'Il bleed evita bordi bianchi dopo il taglio. Le crocini di taglio dicono alla tipografia dove tagliare; non vanno nel file finale se non richiesti.',
  ],
  table: {
    rows: [
      ['Post per Instagram', '1080 × 1080 px, RGB, 72 dpi', 'Nessun bleed'],
      ['Volantino A5', '148 × 210 mm + 3 mm, CMYK, 300 dpi', 'Bleed 3 mm'],
      ['Poster A2', '420 × 594 mm + 3 mm, CMYK, 300 dpi', 'Bleed 3 mm'],
    ],
  },
  trace: [
    ['Apri File → Nuovo e scegli l’unità di misura', 'Millimetri per la stampa, pixel per lo schermo.'],
    ['Imposta dimensioni e bleed', 'Il bleed si aggiunge ai lati, non dentro la misura finale.'],
    ['Scegli profilo colore e risoluzione', 'RGB/72 per schermo, CMYK/300 per stampa.'],
    ['Controlla l’anteprima e crea', 'Un errore qui si trascina per tutto il progetto.'],
  ],
  misconception: ['300 dpi rende automaticamente professionale un file.', 'I dpi contano alla dimensione di stampa: un’immagine piccola a 300 dpi resta piccola.'],
  world: [
    'Un volantino con bleed 3 mm non mostra bordi bianchi dopo il taglio.',
    'Una foto per il web a 72 dpi si carica più in fretta e resta nitida sullo schermo.',
    'Un PDF per la tipografia dichiara CMYK e profilo ICC per evitare sorprese di colore.',
  ],
  tip: 'Prima di creare un documento, chiediti: dove vivrà? Se la risposta è “carta”, parti da CMYK e bleed.',
  errors: [
    {
      title: 'Colori spenti in stampa',
      whatYouDo: 'Progetti in RGB e invii il PDF alla tipografia.',
      whatHappens: 'I colori risultano più opachi o diversi.',
      why: 'La stampa usa inchiostri CMYK: alcuni colori RGB non sono riproducibili.',
      fix: 'Converti il documento in CMYK prima di esportare il PDF di stampa.',
      recognize: 'Se il colore è vivido sullo schermo e spento su carta, il profilo è sbagliato.',
    },
    {
      title: 'Bordi bianchi dopo il taglio',
      whatYouDo: 'Metti l’immagine a filo pagina senza bleed.',
      whatHappens: 'Dopo il taglio compare una linea bianca.',
      why: 'La taglierina non è perfetta al decimo di millimetro.',
      fix: 'Estendi lo sfondo oltre il bordo di 3 mm.',
      recognize: 'Ogni fondo che arriva al bordo richiede bleed.',
    },
  ],
  drills: [
    {
      title: 'Documento per il web',
      task: 'Crea un documento 1080 × 1080 px, RGB, 72 dpi per un post social.',
      checks: ['Le unità sono pixel', 'Il profilo è RGB', 'La risoluzione è 72 dpi'],
      hints: ['Nel preset “Social” trovi già le misure.', 'Se vedi mm, cambia unità in px.'],
      solution: 'File → Nuovo → 1080 × 1080 px → RGB → 72 dpi → Crea.',
      explanation: 'Per lo schermo contano i pixel, non i millimetri.',
    },
    {
      title: 'Volantino A5',
      task: 'Crea un A5 con 3 mm di bleed, CMYK e 300 dpi.',
      checks: ['La pagina è 148 × 210 mm', 'Il bleed è 3 mm su tutti i lati', 'Il profilo è CMYK'],
      hints: ['Il bleed è una voce separata nelle impostazioni.', 'Se non vedi il bleed, attiva “Mostra bleed”.'],
      solution: 'File → Nuovo → A5 → 3 mm bleed → CMYK → 300 dpi.',
      explanation: 'Il bleed è un margine di sicurezza, non una decorazione.',
    },
    {
      title: 'Controllo prima di stampare',
      task: 'Apri le impostazioni del documento e verifica profilo, dpi e bleed. Annota i tre valori.',
      checks: ['Ho letto il profilo colore', 'Ho letto la risoluzione', 'Ho verificato il bleed'],
      hints: ['Le impostazioni sono in Documento → Impostazioni.', 'Non fidarti della memoria: guarda i valori.'],
      solution: 'Documento → Impostazioni → controlla CMYK, 300 dpi, bleed 3 mm.',
      explanation: 'Un controllo di trenta secondi evita un ristampa.',
    },
  ],
  quizzes: [
    {
      question: 'Quale combinazione è adatta a un volantino stampato?',
      options: [
        ['RGB, 72 dpi, senza bleed', 'È una configurazione da schermo: in stampa i colori cambiano e i bordi possono tagliarsi.'],
        ['CMYK, 300 dpi, bleed 3 mm', 'Esatto: è la base per la stampa.'],
        ['CMYK, 72 dpi, bleed 0', 'La risoluzione è troppo bassa per la carta.'],
      ],
      correct: 1,
      explanation: 'Stampa significa inchiostro, dettaglio e margine di taglio.',
    },
    {
      question: 'Cosa succede se ingrandisci una foto a 72 dpi per un poster?',
      options: [
        ['Resta nitida perché i dpi non contano', 'I dpi contano eccome alla dimensione di stampa.'],
        ['Perde dettaglio e diventa sfocata', 'Esatto: stai distribuendo pochi pixel su una superficie grande.'],
        ['Diventa automaticamente CMYK', 'La conversione colore è separata.'],
      ],
      correct: 1,
      explanation: 'La nitidezza dipende dai pixel disponibili rispetto alla dimensione fisica.',
    },
  ],
  explain: {
    prompt: 'Spiega perché un file per la stampa ha bisogno di CMYK, 300 dpi e bleed.',
    keywords: ['cmyk', 'stampa', '300', 'bleed', 'taglio'],
    model:
      'La stampa mescola inchiostri CMYK, quindi il file deve usare lo stesso modello per evitare sorprese di colore. A 300 dpi c’è abbastanza dettaglio per la carta. Il bleed di 3 mm estende il fondo oltre il taglio, così piccoli errori della taglierina non lasciano bordi bianchi.',
  },
  project: {
    title: 'Scheda tecnica del brand kit',
    brief: 'Crea una pagina con le specifiche del progetto: colori, formati e bleed.',
    steps: ['Apri il documento A5', 'Scrivi formati e profili in una tabella', 'Salva e confronta con le impostazioni reali'],
  },
  learned: 'Sai impostare un documento che non tradirà il lavoro al momento dell’export.',
  next: 'Impariamo a muoverci sulla tela: zoom, pan e tavole da disegno.',
  consolidate: 'Controlla i tre parametri — profilo, dpi, bleed — su un documento che hai già fatto.',
});

const l4 = affLesson(W, 4, {
  id: 'af-w1l4',
  title: 'Navigare la tela',
  subtitle: 'Zoom, pan, tavole e orientamento',
  objectives: ['Zoomare senza perdere il punto', 'Spostarti con pan e Navigator', 'Gestire più tavole da disegno'],
  concepts: ['zoom', 'pan', 'tavole'],
  activation: ['Ti è mai capitato di zoomare e perdere completamente il punto in cui stavi lavorando?', 'Succede quando lo zoom è centrato sulla finestra invece che sul cursore.'],
  analogy:
    'La tela è una città: lo zoom è il binocolo, il pan è camminare, il Navigator è la mappa. Le tavole sono isolati diversi dello stesso progetto.',
  theory: [
    'Lo zoom si controlla con la rotellina, con Ctrl/Cmd + + e −, o con la barra in basso. Il pan si attiva tenendo premuta la barra spaziatrice e trascinando.',
    'Le tavole da disegno separano varianti dello stesso progetto: fronte e retro, formati social, declinazioni del logo. Ogni tavola ha un nome e può essere esportata da sola.',
  ],
  table: {
    rows: [
      ['Zoom avanti/indietro', 'Rotellina o Ctrl/Cmd + ±', '—'],
      ['Spostarsi', 'Barra spaziatrice + trascina', 'Spazio'],
      ['Vedere tutta la tela', 'Ctrl/Cmd + 0', '—'],
    ],
  },
  trace: [
    ['Porta il cursore sull’area da ingrandire', 'Lo zoom centra il punto sotto il puntatore.'],
    ['Usa la rotellina o la scorciatoia', 'Mantieni il contesto visivo.'],
    ['Tieni premuto Spazio e trascina', 'Il pan non sposta gli oggetti: sposta solo la vista.'],
    ['Rinomina e organizza le tavole', 'Nomi chiari evitano export sbagliati.'],
  ],
  misconception: ['Spostare la tela con lo strumento Sposta.', 'Lo strumento Sposta modifica gli oggetti; il pan muove solo lo sguardo.'],
  world: [
    'Un logo ha tre tavole: orizzontale, verticale, solo simbolo.',
    'Un post social ha una tavola per il formato quadrato e una per la storia.',
    'Un biglietto ha fronte e retro su due tavole separate.',
  ],
  tip: 'Prima di disegnare, premi Ctrl/Cmd + 0: vedere tutto il progetto evita di lavorare fuori tela.',
  errors: [
    {
      title: 'Pan che sposta gli oggetti',
      whatYouDo: 'Usi lo strumento freccia e trascini per spostare la vista.',
      whatHappens: 'Il contenuto si sposta davvero e il layout si rompe.',
      why: 'Lo strumento Sposta opera sugli oggetti selezionati, non sulla vista.',
      fix: 'Premi Spazio, poi trascina; oppure usa il Navigator.',
      recognize: 'Se il bordo della tavola si muove, non stai facendo pan.',
    },
    {
      title: 'Export dalla tavola sbagliata',
      whatYouDo: 'Esporti il documento senza selezionare la tavola.',
      whatHappens: 'Ottieni tutte le tavole o quella attiva, non quella voluta.',
      why: 'L’export segue la selezione e le impostazioni della tavola.',
      fix: 'Seleziona la tavola e imposta “solo selezione”.',
      recognize: 'Prima di esportare, controlla il nome della tavola attiva.',
    },
  ],
  drills: [
    {
      title: 'Zoom preciso',
      task: 'Ingrandisci un angolo della tela fino al 400% e torna al 100% senza perdere il punto.',
      checks: ['Ho zoomato sopra l’angolo', 'Sono tornato al 100%', 'Il punto è rimasto visibile'],
      hints: ['Usa il cursore come centro dello zoom.', 'Ctrl/Cmd + 0 mostra tutto.'],
      solution: 'Cursore sull’angolo → rotellina avanti → Ctrl/Cmd + 0 → 100%.',
      explanation: 'Lo zoom contestuale è più veloce della barra percentuale.',
    },
    {
      title: 'Tre tavole',
      task: 'Aggiungi tre tavole al documento e rinominale “Orizzontale”, “Verticale”, “Simbolo”.',
      checks: ['Ho creato tre tavole', 'I nomi sono chiari', 'So passare da una all’altra'],
      hints: ['Lo strumento Tavola è nella barra.', 'Rinomina dal pannello Tavole.'],
      solution: 'Strumento Tavola → trascina tre aree → rinomina nel pannello.',
      explanation: 'Le tavole sono varianti organizzate, non pagine casuali.',
    },
    {
      title: 'Pan senza paura',
      task: 'Sposta la vista da un angolo all’altro e verifica che gli oggetti non si siano mossi.',
      checks: ['Ho usato Spazio + trascina', 'Gli oggetti sono fermi', 'So usare il Navigator'],
      hints: ['Il pan è temporaneo finché tieni premuto Spazio.', 'Il Navigator mostra l’inquadratura.'],
      solution: 'Spazio + trascina → confronta la posizione → apri Navigator.',
      explanation: 'Separare vista e contenuto è una delle abitudini che salvano più layout.',
    },
  ],
  quizzes: [
    {
      question: 'Come sposti la vista senza spostare gli oggetti?',
      options: [
        ['Trascini con lo strumento Sposta', 'Così modifichi gli oggetti selezionati.'],
        ['Tieni premuto Spazio e trascini', 'Esatto: è il pan temporaneo.'],
        ['Usi il tasto Tab', 'Tab nasconde i pannelli, non sposta la vista.'],
      ],
      correct: 1,
      explanation: 'Il pan cambia solo l’inquadratura.',
    },
    {
      question: 'A cosa servono più tavole nello stesso documento?',
      options: [
        ['A creare file separati', 'Le tavole convivono nello stesso file.'],
        ['A organizzare varianti e formati', 'Esatto: fronte/retro, social, declinazioni.'],
        ['A velocizzare l’export', 'L’export resta una scelta per tavola.'],
      ],
      correct: 1,
      explanation: 'Le tavole tengono ordine senza duplicare il progetto.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra zoom, pan e spostamento di un oggetto.',
    keywords: ['zoom', 'pan', 'vista', 'oggetto', 'sposta'],
    model:
      'Lo zoom cambia l’ingrandimento della vista, il pan cambia la porzione di tela che vedo, lo spostamento modifica la posizione dell’oggetto nel documento. I primi due non toccano il contenuto; il terzo sì, ed è per questo che va fatto con lo strumento giusto.',
  },
  project: {
    title: 'Tavole del brand kit',
    brief: 'Prepara tre tavole per il logo e una per il biglietto.',
    steps: ['Crea le tavole', 'Rinominale', 'Salva e controlla che il contenuto non sia cambiato'],
  },
  learned: 'Sai muoverti nella tela senza modificare il lavoro per errore.',
  next: 'I livelli sono il modo in cui Affinity tiene ordine: impariamo a usarli prima di disegnare.',
  consolidate: 'Per un giorno, usa Spazio + trascina invece della barra di scorrimento: diventa automatico.',
});

const l5 = affLesson(W, 5, {
  id: 'af-w1l5',
  title: 'Livelli e ordine di impilamento',
  subtitle: 'Fogli trasparenti, gruppi e priorità visiva',
  objectives: ['Leggere l’ordine dei livelli', 'Raggruppare e rinominare', 'Bloccare e nascondere senza paura'],
  concepts: ['livelli', 'gruppi', 'impilamento'],
  activation: ['Due forme si sovrappongono: quale delle due vedi? Perché?', 'Quella più in alto nell’elenco dei livelli, indipendentemente da quando l’hai disegnata.'],
  analogy:
    'I livelli sono fogli trasparenti impilati: chi sta sopra copre chi sta sotto. Un gruppo è una cartellina che tiene insieme più fogli e li sposta come un blocco unico.',
  theory: [
    'Ogni oggetto vive su un livello. L’ordine nel pannello Livelli determina cosa copre cosa. Trascinare un livello cambia l’ordine; nasconderlo lo toglie dalla vista senza cancellarlo.',
    'I gruppi riducono il caos: selezioni più livelli e li raggruppi. Puoi rinominare, bloccare e applicare una maschera al gruppo invece che ai singoli elementi.',
  ],
  table: {
    rows: [
      ['Cambiare ordine', 'Trascina nel pannello Livelli', 'Ctrl/Cmd + [ o ]'],
      ['Raggruppare', 'Seleziona → Gruppo', 'Ctrl/Cmd + G'],
      ['Nascondere', 'Icona occhio', '—'],
    ],
  },
  trace: [
    ['Apri il pannello Livelli', 'Vedere la struttura è metà del lavoro.'],
    ['Rinomina i livelli con nomi utili', '“Rettangolo 3” non dice nulla; “Fondo” sì.'],
    ['Trascina per cambiare l’ordine', 'L’ordine decide la copertura.'],
    ['Raggruppa gli elementi correlati', 'Sposti e nascondi il gruppo come un’unità.'],
  ],
  misconception: ['Il livello selezionato è sempre quello che vedo.', 'La selezione non cambia l’ordine: un livello selezionato può restare sotto gli altri.'],
  world: [
    'Un poster ha fondo, immagine, titolo e logo su livelli separati.',
    'Un’icona raggruppa cerchio, tracciato e ombra per spostarli insieme.',
    'Un volantino nasconde il livello “Testo bozza” prima dell’export.',
  ],
  tip: 'Prima di disegnare un elemento nuovo, guarda quale livello è selezionato: il 90% degli errori nasce lì.',
  errors: [
    {
      title: 'Disegnare sul livello sbagliato',
      whatYouDo: 'Crei una forma credendo di essere sul fondo.',
      whatHappens: 'La forma copre il testo o finisce dentro un gruppo chiuso.',
      why: 'Il livello attivo non è necessariamente quello che vuoi modificare.',
      fix: 'Annulla, seleziona il livello giusto e ridisegna.',
      recognize: 'Se il nuovo oggetto appare in una posizione strana nell’elenco, hai sbagliato livello.',
    },
    {
      title: 'Elemento invisibile',
      whatYouDo: 'Cerchi un oggetto che non vedi più.',
      whatHappens: 'È nascosto, bloccato o sotto un fondo opaco.',
      why: 'Visibilità, blocco e ordine sono tre cause diverse.',
      fix: 'Controlla occhio, lucchetto e posizione nell’elenco.',
      recognize: 'Se non è selezionabile, è bloccato; se non si vede, è nascosto o coperto.',
    },
  ],
  drills: [
    {
      title: 'Quattro livelli ordinati',
      task: 'Crea fondo, forma, testo e logo su quattro livelli e nominali.',
      checks: ['Ci sono quattro livelli distinti', 'I nomi sono chiari', 'L’ordine è fondo → forma → testo → logo'],
      hints: ['Crea un livello per volta.', 'Rinomina con doppio click.'],
      solution: 'Crea gli elementi → rinomina → trascina per ordinare.',
      explanation: 'Un file leggibile è un file che puoi modificare tra un mese.',
    },
    {
      title: 'Gruppo che si muove insieme',
      task: 'Raggruppa forma e testo e sposta il gruppo di 10 mm.',
      checks: ['I due elementi sono in un gruppo', 'Il gruppo si sposta come un blocco', 'So sciogliere il gruppo'],
      hints: ['Ctrl/Cmd + G raggruppa.', 'Ctrl/Cmd + Shift + G scioglie.'],
      solution: 'Seleziona entrambi → Gruppo → trascina → verifica la posizione.',
      explanation: 'I gruppi sono unità logiche: riducono selezione e errori.',
    },
    {
      title: 'Nascondi senza cancellare',
      task: 'Nascondi il testo, esporta un PNG e poi riattivalo.',
      checks: ['Il testo è nascosto', 'L’export non lo contiene', 'Il livello è tornato visibile'],
      hints: ['L’occhio nel pannello Livelli.', 'L’export rispetta la visibilità.'],
      solution: 'Clic sull’occhio → esporta → clic di nuovo sull’occhio.',
      explanation: 'Nascondere è reversibile; cancellare no.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa determina quale forma copre l’altra?',
      options: [
        ['L’ordine dei livelli', 'Esatto: chi sta sopra nell’elenco copre chi sta sotto.'],
        ['La dimensione della forma', 'La dimensione non cambia l’ordine di impilamento.'],
        ['Il colore', 'Il colore non influisce sulla copertura.'],
      ],
      correct: 0,
      explanation: 'L’impilamento è una gerarchia, non una proprietà geometrica.',
    },
    {
      question: 'Perché raggruppare elementi?',
      options: [
        ['Per unirli in un’unica forma', 'Il gruppo non è una fusione: restano modificabili.'],
        ['Per spostarli e gestirli come un’unità', 'Esatto: è un contenitore logico.'],
        ['Per ridurre la qualità', 'Nessuna perdita: è solo organizzazione.'],
      ],
      correct: 1,
      explanation: 'Il gruppo semplifica la selezione senza distruggere i singoli livelli.',
    },
  ],
  explain: {
    prompt: 'Spiega come funziona l’ordine dei livelli con un esempio pratico.',
    keywords: ['livelli', 'ordine', 'sopra', 'sotto', 'copre'],
    model:
      'I livelli sono impilati come fogli trasparenti. Se il titolo è sopra il fondo, si vede; se lo sposto sotto un rettangolo opaco, sparisce. L’ordine nel pannello decide la copertura, quindi per far emergere un elemento lo porto in alto, non lo ridisegno.',
  },
  project: {
    title: 'Struttura del biglietto',
    brief: 'Costruisci la struttura a livelli del biglietto da visita.',
    steps: ['Crea fondo, testo e logo', 'Raggruppa per area', 'Salva e controlla l’ordine'],
  },
  learned: 'Sai leggere e controllare la struttura del documento, non solo ciò che vedi.',
  next: 'Salviamo e esportiamo: il formato giusto dipende da dove vivrà il file.',
  consolidate: 'Apri un tuo file e rinomina i primi cinque livelli: capirai subito quanto conta.',
});

const l6 = affLesson(W, 6, {
  id: 'af-w1l6',
  title: 'Salvare, esportare, condividere',
  subtitle: '.af, PNG, JPG, PDF, SVG e PSD',
  objectives: ['Scegliere il formato in base all’uso', 'Esportare con trasparenza e profilo corretti', 'Conservare il file modificabile'],
  concepts: ['salvataggio', 'esportazione', 'formati'],
  activation: ['Un cliente ti chiede “il file del logo”. Cosa gli mandi: il progetto o un PNG?', 'Dipende: per modificarlo serve il vettoriale o il progetto; per usarlo subito basta un PNG.'],
  analogy:
    'Il file `.af` è la ricetta; il PNG è il piatto fotografato; il PDF è il piatto pronto da servire. La ricetta serve a te, il piatto al cliente.',
  theory: [
    'Salva sempre in `.af` mentre lavori. Esporta solo copie derivate: PNG per trasparenza e schermo, JPG per foto, PDF per stampa e condivisione, SVG per il web, PSD per chi lavora in Photoshop.',
    'L’export ha opzioni che cambiano il risultato: area (tavola o selezione), dimensione, profilo colore, trasparenza. Un export sbagliato può sembrare un errore di disegno.',
  ],
  table: {
    rows: [
      ['Modificare domani', '.af', 'Sempre'],
      ['Sito web', 'SVG o PNG', 'Trasparenza'],
      ['Stampa', 'PDF CMYK + bleed', '300 dpi'],
    ],
  },
  trace: [
    ['Salva il progetto in `.af`', 'È l’unico formato che conserva tutto.'],
    ['Scegli Esporta e imposta l’area', 'Tavola intera o selezione: non è lo stesso file.'],
    ['Seleziona formato e opzioni', 'Trasparenza, profilo, dimensione.'],
    ['Apri l’export e controllalo', 'Non consegnare mai senza averlo visto.'],
  ],
  misconception: ['Il PDF è sempre il formato migliore.', 'Il PDF è ottimo per condividere, ma non sostituisce il progetto modificabile.'],
  world: [
    'Un cliente riceve il logo in SVG per il sito e in PNG per le slide.',
    'La tipografia riceve un PDF CMYK con bleed e crocini.',
    'Un collaboratore riceve il `.af` per continuare il lavoro.',
  ],
  tip: 'Prima di esportare, chiediti chi userà il file e cosa deve poter fare. La risposta sceglie il formato.',
  errors: [
    {
      title: 'Consegnare solo il PNG',
      whatYouDo: 'Invii al cliente un PNG e cancelli il progetto.',
      whatHappens: 'Nessuno può modificare il logo o ingrandirlo.',
      why: 'Il PNG è un’immagine appiattita, non un progetto.',
      fix: 'Conserva il `.af` e consegna anche SVG o PDF vettoriale.',
      recognize: 'Se il file non ha livelli, non è modificabile.',
    },
    {
      title: 'PDF pixelato',
      whatYouDo: 'Esporti un PDF da un’immagine a 72 dpi.',
      whatHappens: 'La stampa appare sfocata.',
      why: 'Il PDF contiene l’immagine alla risoluzione di partenza.',
      fix: 'Sostituisci l’immagine con una versione ad alta risoluzione o esporta a 300 dpi.',
      recognize: 'Zooma al 200% nel PDF: se i bordi sono morbidi, la risoluzione è bassa.',
    },
  ],
  drills: [
    {
      title: 'Export per il web',
      task: 'Esporta il logo in PNG con sfondo trasparente a 1000 px di larghezza.',
      checks: ['Il PNG ha trasparenza', 'La larghezza è 1000 px', 'Il file si apre correttamente'],
      hints: ['Nelle opzioni PNG c’è “Trasparenza”.', 'Imposta la larghezza, non la percentuale.'],
      solution: 'File → Esporta → PNG → trasparenza attiva → larghezza 1000 px.',
      explanation: 'Il web ha bisogno di dimensioni esplicite e trasparenza quando il logo va su fondi diversi.',
    },
    {
      title: 'PDF per la stampa',
      task: 'Esporta un PDF CMYK con bleed e controlla che le immagini siano a 300 dpi.',
      checks: ['Il PDF è CMYK', 'Il bleed è incluso', 'Le immagini sono ad alta risoluzione'],
      hints: ['Scegli il preset Stampa.', 'Il bleed si include nelle opzioni PDF.'],
      solution: 'Esporta → PDF → Stampa → CMYK → bleed 3 mm → 300 dpi.',
      explanation: 'Un PDF di stampa dichiara le intenzioni: profilo, bleed, risoluzione.',
    },
    {
      title: 'Consegna ordinata',
      task: 'Prepara una cartella con `.af`, SVG, PNG e PDF e rinomina i file in modo coerente.',
      checks: ['Ci sono quattro formati', 'I nomi sono coerenti', 'So a cosa serve ciascuno'],
      hints: ['Usa lo stesso nome base per tutti.', 'Aggiungi il formato nel nome solo se utile.'],
      solution: 'Crea `logo.af`, `logo.svg`, `logo.png`, `logo.pdf` e verifica ciascuno.',
      explanation: 'Una consegna ordinata è parte del lavoro professionale.',
    },
  ],
  quizzes: [
    {
      question: 'Quale formato consegni a chi deve modificare il logo?',
      options: [
        ['PNG', 'È appiattito: non permette modifiche.'],
        ['SVG o `.af`', 'Esatto: conservano la struttura vettoriale.'],
        ['JPG', 'Ancora peggio: compressione e nessuna trasparenza.'],
      ],
      correct: 1,
      explanation: 'La modificabilità richiede un formato vettoriale o il progetto nativo.',
    },
    {
      question: 'Perché un PDF può risultare pixelato?',
      options: [
        ['Perché il PDF non supporta il vettore', 'Il PDF supporta eccome il vettore.'],
        ['Perché contiene immagini a bassa risoluzione', 'Esatto: la qualità dipende dal contenuto.'],
        ['Perché manca il bleed', 'Il bleed riguarda il taglio, non la nitidezza.'],
      ],
      correct: 1,
      explanation: 'Il contenitore non salva la qualità: conta cosa ci metti dentro.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra salvare ed esportare.',
    keywords: ['salvare', 'esportare', 'progetto', 'formato', 'modificabile'],
    model:
      'Salvare significa scrivere il progetto modificabile nel formato nativo `.af`. Esportare significa creare una copia in un formato per un uso specifico: PNG per lo schermo, PDF per la stampa, SVG per il web. Se salvo solo l’export, perdo livelli e possibilità di modifica.',
  },
  project: {
    title: 'Kit di consegna',
    brief: 'Prepara i formati del logo per il brand kit.',
    steps: ['Esporta SVG, PNG e PDF', 'Controlla trasparenza e profilo', 'Archivia il `.af`'],
  },
  learned: 'Sai scegliere il formato giusto e consegnare un file che l’altra persona può usare.',
  next: 'Mettiamo insieme tutto in un mini-progetto: un documento A5 completo e salvato.',
  consolidate: 'Guarda un export che hai fatto: c’è un `.af` dietro? Se no, rifallo.',
});

const l7 = affLesson(W, 7, {
  id: 'af-w1l7',
  title: 'Ripasso e mini-progetto',
  subtitle: 'Un documento A5 pronto all’uso',
  objectives: ['Combinare Studios, livelli e formati', 'Costruire un A5 con bleed', 'Esportare e verificare'],
  concepts: ['ripasso', 'A5', 'export'],
  activation: ['Se dovessi spiegare in tre frasi come si prepara un A5 per la stampa, cosa diresti?', 'Dimensioni, CMYK/300 dpi con bleed, poi export PDF e controllo.'],
  analogy:
    'Il mini-progetto è una prova generale: stesso palco, luci più semplici. Serve a vedere se le abilità separabili diventano una sequenza fluida.',
  theory: [
    'Un documento A5 per la stampa misura 148 × 210 mm, con 3 mm di bleed su ogni lato, profilo CMYK e 300 dpi. Il contenuto essenziale sta dentro il margine di sicurezza di 5 mm.',
    'Il progetto di questa settimana è la base del brand kit: una tavola con nome, una forma, un testo e il logo. Non deve essere bello: deve essere corretto e modificabile.',
  ],
  table: {
    rows: [
      ['Formato', 'A5 + 3 mm bleed', '154 × 216 mm totali'],
      ['Colore', 'CMYK', 'Profilo di stampa'],
      ['Risoluzione', '300 dpi', 'Immagini incluse'],
    ],
  },
  trace: [
    ['Crea il documento con bleed', 'La base tecnica viene prima dell’estetica.'],
    ['Costruisci i livelli con nomi chiari', 'Il file deve essere comprensibile tra un mese.'],
    ['Allinea gli elementi al margine di sicurezza', 'Nulla di importante vicino al taglio.'],
    ['Esporta PDF e controlla al 200%', 'Verifica bleed, testo e immagini.'],
  ],
  misconception: ['Il mini-progetto deve essere portfolio-ready.', 'È un esercizio di processo: la qualità visiva arriverà con le settimane.'],
  world: [
    'Un biglietto da visita si costruisce con la stessa struttura: fondo, testo, logo, bleed.',
    'Un volantino per un evento usa le stesse impostazioni tecniche.',
    'Una pagina di brochure parte da un documento con margini e griglia.',
  ],
  tip: 'Se il progetto sembra vuoto, non riempirlo: controlla che la struttura sia corretta. Lo spazio bianco è una scelta.',
  errors: [
    {
      title: 'Testo troppo vicino al bordo',
      whatYouDo: 'Metti il testo a 1 mm dal taglio.',
      whatHappens: 'Dopo la rifilatura alcune lettere spariscono.',
      why: 'La taglierina ha una tolleranza e il bleed non protegge il contenuto.',
      fix: 'Tieni il testo dentro un margine di sicurezza di almeno 5 mm.',
      recognize: 'Se il testo tocca il bordo, è a rischio.',
    },
    {
      title: 'Bleed senza fondo',
      whatYouDo: 'Imposti il bleed ma il fondo non lo copre.',
      whatHappens: 'Il bleed è vuoto e il taglio mostra bianco.',
      why: 'Il bleed è un’area, non un’impostazione magica: il contenuto deve arrivarci.',
      fix: 'Estendi il fondo oltre il bordo della pagina.',
      recognize: 'Guarda la modalità bleed: se è bianca, non è coperta.',
    },
  ],
  drills: [
    {
      title: 'A5 tecnico',
      task: 'Crea l’A5 con bleed, CMYK e 300 dpi e salva `brand-kit.af`.',
      checks: ['Dimensioni corrette', 'Bleed 3 mm', 'File salvato'],
      hints: ['Riusa le impostazioni della lezione 3.', 'Controlla il nome del file.'],
      solution: 'Nuovo → A5 → bleed 3 mm → CMYK → 300 dpi → Salva.',
      explanation: 'La correttezza tecnica è la base del progetto.',
    },
    {
      title: 'Quattro elementi',
      task: 'Aggiungi fondo, forma, nome e logo su livelli separati e nominali.',
      checks: ['Quattro livelli', 'Nomi chiari', 'Ordine corretto'],
      hints: ['Un elemento per livello.', 'Rinomina subito.'],
      solution: 'Crea gli elementi → rinomina → ordina nel pannello Livelli.',
      explanation: 'La struttura rende il file modificabile.',
    },
    {
      title: 'Export verificato',
      task: 'Esporta PDF con bleed e aprilo al 200%. Controlla bordi, testo e immagini.',
      checks: ['Il PDF include il bleed', 'Il testo è leggibile', 'Le immagini non sono sfocate'],
      hints: ['Preset Stampa.', 'Zoom alto per vedere la qualità.'],
      solution: 'Esporta PDF → apri → zoom 200% → controlla i tre punti.',
      explanation: 'Un export non è finito finché non lo hai guardato.',
    },
  ],
  quizzes: [
    {
      question: 'Qual è il margine di sicurezza tipico per il testo in un A5 stampato?',
      options: [
        ['0 mm: il testo può toccare il bordo', 'Troppo rischio: il taglio può mangiare le lettere.'],
        ['Circa 5 mm dal taglio', 'Esatto: protegge il contenuto dalla rifilatura.'],
        ['30 mm su ogni lato', 'Esagerato: riduce troppo l’area utile.'],
      ],
      correct: 1,
      explanation: 'Il bleed protegge il fondo, il margine di sicurezza protegge il contenuto.',
    },
    {
      question: 'Cosa controlli per primo in un PDF di stampa?',
      options: [
        ['Il numero di livelli', 'Il PDF non conserva i livelli come il progetto.'],
        ['Bleed, profilo e risoluzione', 'Esatto: sono le tre cose che rovinano la stampa.'],
        ['La dimensione del file', 'Non è un indicatore di qualità.'],
      ],
      correct: 1,
      explanation: 'I controlli tecnici vengono prima del giudizio estetico.',
    },
  ],
  explain: {
    prompt: 'Descrivi la sequenza completa per preparare un A5 stampabile.',
    keywords: ['a5', 'bleed', 'cmyk', '300', 'pdf'],
    model:
      'Creo un documento A5 da 148 × 210 mm con 3 mm di bleed, profilo CMYK e 300 dpi. Tengo testo e logo dentro un margine di sicurezza di 5 mm, con il fondo che arriva oltre il taglio. Salvo in `.af`, esporto un PDF di stampa e lo controllo ingrandito.',
  },
  project: {
    title: 'Brand kit · tappa 1',
    brief: 'Documento A5 completo, ordinato e esportato in PDF.',
    steps: ['Crea la struttura a livelli', 'Esporta il PDF', 'Annota cosa migliorerai'],
  },
  learned: 'Hai trasformato impostazioni separate in un flusso di lavoro completo.',
  next: 'Chiudiamo la settimana con le abitudini professionali: scorciatoie, workspace e documentazione.',
  consolidate: 'Rifai il progetto da zero in dieci minuti: la seconda volta conta più della prima.',
});

const l8 = affLesson(W, 8, {
  id: 'af-w1l8',
  title: 'Lavorare come un professionista',
  subtitle: 'Scorciatoie, workspace e help center',
  objectives: ['Costruire memoria muscolare con poche scorciatoie', 'Documentare il proprio flusso', 'Trovare risposte senza perdere tempo'],
  concepts: ['scorciatoie', 'help center', 'workflow'],
  activation: ['Quante scorciatoie conosci davvero, non quante ne hai lette?', 'Poche, usate ogni giorno, battono una lista di cinquanta dimenticate.'],
  analogy:
    'Le scorciatoie sono le posate: nessuno le studia a memoria, le usa finché diventano automatiche. Il help center è il manuale di istruzioni che nessuno legge tutto, ma tutti consultano nel punto giusto.',
  theory: [
    'Impara cinque scorciatoie alla volta e usale per una settimana: zoom, pan, salva, annulla, raggruppa. La velocità nasce dalla ripetizione, non dall’elenco.',
    'Il help center ufficiale è la fonte più affidabile per comportamenti dubbi. Cerca il nome esatto del comando e la versione; evita tutorial vecchi su funzioni cambiate.',
  ],
  table: {
    rows: [
      ['Salvare', 'Ctrl/Cmd + S', 'Ogni pochi minuti'],
      ['Annullare', 'Ctrl/Cmd + Z', 'Senza paura'],
      ['Raggruppare', 'Ctrl/Cmd + G', 'Prima di spostare'],
    ],
  },
  trace: [
    ['Scegli cinque scorciatoie utili', 'Troppe insieme non entrano in memoria.'],
    ['Usale per una settimana intera', 'La ripetizione le rende automatiche.'],
    ['Cerca un dubbio nel help center', 'La documentazione batte i ricordi.'],
    ['Annota il flusso in tre righe', 'Il tuo io futuro ti ringrazierà.'],
  ],
  misconception: ['Conoscere tutte le scorciatoie è ciò che rende professionisti.', 'La competenza è nel processo e nelle decisioni; le scorciatoie sono solo attrito rimosso.'],
  world: [
    'Un freelance documenta il flusso di export per non dimenticare un passaggio.',
    'Un team condivide un workspace standard per i file social.',
    'Uno studente cerca nel help center invece di provare a caso.',
  ],
  tip: 'Se una scorciatoia non ti viene naturale dopo una settimana, non è quella giusta per te: cambia, non insistere.',
  errors: [
    {
      title: 'Tutorial vecchio, funzione nuova',
      whatYouDo: 'Segui un video di due anni fa senza controllare la versione.',
      whatHappens: 'Il comando non esiste o si chiama diversamente.',
      why: 'Affinity unificato ha cambiato nomi e posizioni.',
      fix: 'Verifica sul help center la versione attuale.',
      recognize: 'Se il menu non corrisponde, il tutorial è datato.',
    },
    {
      title: 'Flusso non documentato',
      whatYouDo: 'Esegui l’export a memoria ogni volta.',
      whatHappens: 'Dimentichi bleed o profilo in una consegna.',
      why: 'La memoria di lavoro è limitata: le checklist esistono per questo.',
      fix: 'Scrivi una checklist di tre righe e riusala.',
      recognize: 'Se ogni consegna è diversa, manca un processo.',
    },
  ],
  drills: [
    {
      title: 'Cinque scorciatoie',
      task: 'Scegli cinque scorciatoie e usale per l’intera sessione senza menu.',
      checks: ['Ne ho scelte cinque', 'Le ho usate davvero', 'So dire a cosa servono'],
      hints: ['Parti da salva, annulla, zoom, pan, gruppo.', 'Non barare con il menu.'],
      solution: 'Salva, annulla, zoom, pan, gruppo: ripetile per tutta la sessione.',
      explanation: 'La memoria muscolare nasce dall’uso, non dalla lettura.',
    },
    {
      title: 'Cerca nel help center',
      task: 'Trova la voce ufficiale sull’export PDF con bleed e annota il percorso.',
      checks: ['Ho trovato la pagina ufficiale', 'Ho letto la versione', 'Ho annotato il percorso'],
      hints: ['Cerca “PDF bleed export”.', 'Controlla la versione dell’app.'],
      solution: 'Help center → cerca PDF/bleed → apri la voce → annota.',
      explanation: 'La documentazione è una competenza, non un’ultima spiaggia.',
    },
    {
      title: 'Checklist personale',
      task: 'Scrivi una checklist di tre righe per l’export di stampa e salvala nel progetto.',
      checks: ['Ci sono tre controlli', 'Sono verificabili', 'La userei davvero'],
      hints: ['Bleed, profilo, risoluzione.', 'Ogni riga deve avere un sì/no.'],
      solution: '1. Bleed incluso? 2. CMYK? 3. Immagini a 300 dpi?',
      explanation: 'Una checklist trasforma la cura in un processo ripetibile.',
    },
  ],
  quizzes: [
    {
      question: 'Quante scorciatoie conviene imparare insieme?',
      options: [
        ['Tutte quelle disponibili', 'Troppe: la maggior parte non entra in memoria.'],
        ['Poche, usate ogni giorno', 'Esatto: la ripetizione crea automatismo.'],
        ['Nessuna: il menu basta', 'Il menu è più lento e interrompe il ritmo.'],
      ],
      correct: 1,
      explanation: 'La velocità è una conseguenza dell’abitudine, non della quantità.',
    },
    {
      question: 'Dove verifichi un comportamento dubbio di Affinity?',
      options: [
        ['In un video senza data', 'Potrebbe riferirsi a una versione vecchia.'],
        ['Nel help center ufficiale', 'Esatto: è la fonte aggiornata.'],
        ['Nei commenti di un forum', 'Utile per esperienze, non per la documentazione.'],
      ],
      correct: 1,
      explanation: 'La documentazione ufficiale riduce tentativi a caso.',
    },
  ],
  explain: {
    prompt: 'Spiega perché una checklist di export è più affidabile della memoria.',
    keywords: ['checklist', 'memoria', 'export', 'processo', 'errore'],
    model:
      'La memoria di lavoro dimentica passaggi quando sono tanti o quando sono passati giorni. Una checklist mette i controlli fuori dalla testa: bleed, profilo, risoluzione. Non elimina l’errore per magia, ma lo rende visibile prima della consegna.',
  },
  project: {
    title: 'Manuale personale',
    brief: 'Scrivi una pagina con scorciatoie, workspace e checklist di export.',
    steps: ['Elenca cinque scorciatoie', 'Descrivi lo studio “Brand kit”', 'Aggiungi la checklist di stampa'],
  },
  learned: 'Hai le abitudini per lavorare in modo ripetibile, non solo per disegnare.',
  next: 'La Settimana 2 entra nel Vettore: forme, tracciati e operazioni booleane.',
  consolidate: 'Usa la checklist su un export di oggi: se ti salva, tienila.',
});

export const week01 = affWeek({
  number: 1,
  title: 'Fondamenta di Affinity',
  subtitle: 'Capire l’app prima di disegnare',
  description:
    'Installa Affinity, orientati tra gli Studios, imposta un documento corretto e impara a salvare ed esportare senza perdere il lavoro.',
  goals: ['Scegliere lo Studio giusto', 'Creare un documento da stampa', 'Organizzare livelli e formati'],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Brand kit personale',
    brief: 'Il progetto conduttore cresce ogni settimana. Nella prima tappa crei il documento base e la struttura.',
    deliverable: 'Un file `brand-kit.af` A5 con quattro livelli e un PDF di stampa.',
    milestones: ['Documento A5 corretto', 'Quattro livelli nominati', 'Export PDF verificato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Scorciatoie utili', 'Workspace salato', 'Help center ufficiale'],
    exercise: 'Costruisci uno studio “Brand kit” e scrivi la tua checklist di export in tre righe.',
  },
});
