import { affLesson, affWeek } from './authoring';

const W = 'af-week-02';

const l1 = affLesson(W, 1, {
  id: 'af-w2l1',
  title: 'Forme base',
  subtitle: 'Rettangoli, ellissi, poligoni e stelle',
  objectives: ['Disegnare le forme base con precisione', 'Usare vincoli e proporzioni', 'Convertire una forma in tracciato'],
  concepts: ['forme', 'vincoli', 'tracciato'],
  activation: ['Un pulsante arrotondato è un rettangolo, un cerchio o un tracciato personalizzato?', 'Può essere tutti e tre: la forma base è il punto di partenza, il tracciato la rende tua.'],
  analogy:
    'Le forme base sono mattoni: il rettangolo è un muro, l’ellisse una finestra rotonda, la stella una decorazione. Puoi usarli interi o spezzarli per costruire altro.',
  theory: [
    'Lo strumento Rettangolo crea forme con angoli regolabili; l’ellisse parte dal centro o dall’angolo; poligono e stella hanno un numero di lati o punte. Tenendo Shift mantieni le proporzioni.',
    'Ogni forma resta modificabile: raggi degli angoli, numero di lati, rotazione. Converti in tracciato solo quando devi spostare i singoli nodi.',
  ],
  table: {
    rows: [
      ['Rettangolo', 'M', 'Shift per quadrato'],
      ['Ellisse', 'E', 'Shift per cerchio'],
      ['Poligono/stella', 'Strumenti forma', 'Lati nel pannello'],
    ],
  },
  trace: [
    ['Seleziona lo strumento forma', 'La barra contestuale mostra le opzioni.'],
    ['Trascina con Shift per proporzioni', 'Shift blocca larghezza e altezza.'],
    ['Regola raggio o numero di lati', 'La forma resta viva e modificabile.'],
    ['Converti in tracciato se serve', 'Solo allora puoi modificare i nodi.'],
  ],
  misconception: ['Una forma convertita in tracciato è migliore.', 'È solo più libera: perdi i controlli parametrici come raggio e numero di lati.'],
  world: [
    'Un pulsante web parte da un rettangolo con raggio 8 px.',
    'Un’icona orologio usa un cerchio e due rettangoli sottili.',
    'Una stella per un badge promozionale ha cinque punte e raggio interno regolato.',
  ],
  tip: 'Disegna con le forme base il più a lungo possibile: ogni conversione prematura è flessibilità persa.',
  errors: [
    {
      title: 'Cerchio che diventa ellisse',
      whatYouDo: 'Trascini senza Shift.',
      whatHappens: 'Ottieni un’ellisse invece di un cerchio.',
      why: 'Senza vincolo, larghezza e altezza seguono il mouse in modo indipendente.',
      fix: 'Tieni Shift durante il trascinamento o imposta dimensioni uguali.',
      recognize: 'Se largo e alto differiscono, non è un cerchio.',
    },
    {
      title: 'Forma che non si modifica più',
      whatYouDo: 'Converti in tracciato e poi cerchi il raggio angoli.',
      whatHappens: 'Il controllo del raggio è sparito.',
      why: 'Il tracciato non conserva i parametri della forma parametrica.',
      fix: 'Annulla la conversione o ricrea la forma.',
      recognize: 'Se mancano le opzioni parametriche, è un tracciato.',
    },
  ],
  drills: [
    {
      title: 'Quattro forme precise',
      task: 'Crea un quadrato 80×80, un cerchio 80×80, un esagono e una stella a 5 punte.',
      checks: ['Quadrato e cerchio sono 80×80', 'L’esagono ha 6 lati', 'La stella ha 5 punte'],
      hints: ['Shift blocca le proporzioni.', 'I lati si impostano nella barra contestuale.'],
      solution: 'Rettangolo + Shift → Ellisse + Shift → Poligono 6 → Stella 5.',
      explanation: 'La precisione nasce dai vincoli, non dall’occhio.',
    },
    {
      title: 'Pulsante arrotondato',
      task: 'Crea un rettangolo 240×64 con raggio 12 e centra il testo.',
      checks: ['Dimensioni esatte', 'Raggio 12', 'Testo centrato'],
      hints: ['Il raggio è nel pannello della forma.', 'Usa allineamento centro orizzontale e verticale.'],
      solution: 'Rettangolo 240×64 → raggio 12 → testo → allinea centro.',
      explanation: 'Un componente semplice è la base di interfacce e poster.',
    },
    {
      title: 'Da forma a tracciato',
      task: 'Duplica una stella, convertila in tracciato e sposta una punta.',
      checks: ['Ho duplicato la forma', 'Ho convertito solo la copia', 'Ho modificato un nodo'],
      hints: ['Duplica con Ctrl/Cmd + C e V.', 'Converti dal menu contestuale.'],
      solution: 'Duplica → Converti in tracciato → Strumento Nodo → trascina una punta.',
      explanation: 'La copia conserva la forma originale: confronto diretto.',
    },
  ],
  quizzes: [
    {
      question: 'Come crei un cerchio perfetto?',
      options: [
        ['Trascini l’ellisse senza vincoli', 'Così ottieni un’ellisse qualsiasi.'],
        ['Tieni Shift mentre trascini', 'Esatto: blocca le proporzioni.'],
        ['Converti un rettangolo in tracciato', 'Non è il modo più diretto.'],
      ],
      correct: 1,
      explanation: 'Shift è il vincolo di proporzione.',
    },
    {
      question: 'Quando conviene convertire una forma in tracciato?',
      options: [
        ['Subito, appena creata', 'Perdi i controlli parametrici senza necessità.'],
        ['Solo quando devi modificare i singoli nodi', 'Esatto: è l’unico motivo.'],
        ['Prima di esportare in SVG', 'L’SVG funziona anche con forme parametriche.'],
      ],
      correct: 1,
      explanation: 'La conversione è una perdita di comodità: falla solo se serve.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra una forma parametrica e un tracciato.',
    keywords: ['forma', 'tracciato', 'parametr', 'nodi', 'modific'],
    model:
      'Una forma parametrica conserva regole come raggio, numero di lati e proporzioni: la modifichi con quei controlli. Un tracciato è definito da nodi e curve: puoi spostare ogni punto, ma perdi i controlli automatici. Converto solo quando mi serve lavorare nodo per nodo.',
  },
  project: {
    title: 'Set di forme del brand',
    brief: 'Costruisci un piccolo set di forme coerenti per il brand kit.',
    steps: ['Crea tre forme con lo stesso raggio', 'Allineale', 'Raggruppa e nominale'],
  },
  learned: 'Sai costruire forme precise e decidere quando renderle libere.',
  next: 'La Penna ti permette di disegnare qualsiasi cosa: impariamo nodi e maniglie.',
  consolidate: 'Disegna tre icone usando solo forme base: niente Penna per oggi.',
});

const l2 = affLesson(W, 2, {
  id: 'af-w2l2',
  title: 'La Penna e le curve Bézier',
  subtitle: 'Nodi, maniglie e curve prevedibili',
  objectives: ['Creare un tracciato con la Penna', 'Capire cosa fanno le maniglie', 'Chiudere e correggere un tracciato'],
  concepts: ['Penna', 'Bézier', 'maniglie'],
  activation: ['Perché una curva disegnata con la Penna a volte “scappa” in una direzione inaspettata?', 'Perché la maniglia controlla la tangente: la curva segue la direzione della maniglia.'],
  analogy:
    'La Penna è un filo teso tra picchetti. Ogni nodo è un picchetto; le maniglie sono le mani che curvano il filo. Più tiri una maniglia, più la curva si allontana dal nodo.',
  theory: [
    'Un clic crea un nodo spigolo; un clic e trascinamento crea un nodo curvo con due maniglie simmetriche. La curva tra due nodi è una Bézier cubica, definita da nodi e maniglie.',
    'Per chiudere, clicca sul primo nodo. Con Alt/Option puoi spezzare le maniglie e creare un angolo netto dentro una curva.',
  ],
  table: {
    rows: [
      ['Nodo spigolo', 'Clic', 'Nessuna maniglia'],
      ['Nodo curvo', 'Clic + trascina', 'Maniglie simmetriche'],
      ['Chiudere', 'Clic sul primo nodo', 'Tracciato chiuso'],
    ],
  },
  trace: [
    ['Clic per il primo nodo', 'Definisce il punto di partenza.'],
    ['Clic + trascina per il secondo', 'Il trascinamento crea la curva.'],
    ['Regola la maniglia mentre trascini', 'La direzione della maniglia è la tangente.'],
    ['Clic sul primo nodo per chiudere', 'Il riempimento si applica al contorno chiuso.'],
  ],
  misconception: ['Più nodi = più controllo.', 'Troppi nodi rendono la curva nervosa e difficile da modificare.'],
  world: [
    'Un’onda decorativa si costruisce con pochi nodi e maniglie ampie.',
    'Il profilo di una bottiglia richiede curve continue e un angolo al collo.',
    'Una firma vettoriale usa nodi spigolo e curve morbide insieme.',
  ],
  tip: 'Se la curva non è fluida, non aggiungere nodi: sistema le maniglie. Meno nodi, più controllo.',
  errors: [
    {
      title: 'Curve spigolose',
      whatYouDo: 'Clicchi senza trascinare per ogni nodo.',
      whatHappens: 'Il tracciato è una spezzata.',
      why: 'Senza trascinamento non ci sono maniglie, quindi nessuna curva.',
      fix: 'Clic + trascina sul nodo e regola la maniglia.',
      recognize: 'Se i segmenti sono rettilinei, i nodi sono spigoli.',
    },
    {
      title: 'Tracciato che si chiude storto',
      whatYouDo: 'Clicchi vicino al primo nodo ma non esattamente sopra.',
      whatHappens: 'Resta un segmento aperto o un nodo doppio.',
      why: 'La chiusura scatta solo sul nodo iniziale.',
      fix: 'Avvicinati al primo nodo finché appare l’indicatore di chiusura.',
      recognize: 'Se il riempimento ha una fessura, il tracciato è aperto.',
    },
  ],
  drills: [
    {
      title: 'Onda a tre nodi',
      task: 'Disegna un’onda con tre nodi curvi e chiudila.',
      checks: ['Ci sono tre nodi', 'I segmenti sono curvi', 'Il tracciato è chiuso'],
      hints: ['Clic + trascina per ogni nodo.', 'Chiudi sul primo nodo.'],
      solution: 'Penna → nodo 1 → nodo 2 con trascinamento → nodo 3 → clic sul primo.',
      explanation: 'Pochi nodi ben controllati producono curve pulite.',
    },
    {
      title: 'Angolo dentro la curva',
      task: 'Crea una forma con un lato curvo e uno spigolo netto.',
      checks: ['Un nodo è spigolo', 'Gli altri sono curvi', 'La forma è chiusa'],
      hints: ['Alt/Option spezza la maniglia.', 'Il nodo spigolo non ha maniglie attive.'],
      solution: 'Penna → curva → Alt + clic per lo spigolo → chiudi.',
      explanation: 'Mischiare spigoli e curve è ciò che rende il disegno espressivo.',
    },
    {
      title: 'Correggi senza rifare',
      task: 'Sposta una maniglia di un’onda esistente e osserva come cambia la curva.',
      checks: ['Ho selezionato il nodo', 'Ho spostato una maniglia', 'So annullare'],
      hints: ['Strumento Nodo → seleziona il nodo.', 'Le maniglie appaiono sui nodi curvi.'],
      solution: 'Nodo → seleziona → trascina la maniglia → Ctrl/Cmd + Z se serve.',
      explanation: 'La modifica è reversibile: sperimenta senza paura.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa crea un clic seguito da trascinamento con la Penna?',
      options: [
        ['Un nodo spigolo', 'Il clic semplice crea uno spigolo.'],
        ['Un nodo curvo con maniglie', 'Esatto: il trascinamento tira le maniglie.'],
        ['Un testo su tracciato', 'È una funzione separata.'],
      ],
      correct: 1,
      explanation: 'La maniglia è ciò che trasforma il nodo in curva.',
    },
    {
      question: 'Perché evitare troppi nodi?',
      options: [
        ['Perché l’app rallenta sempre', 'Non è il motivo principale.'],
        ['Perché la curva diventa difficile da controllare', 'Esatto: più nodi, più micro-correzioni.'],
        ['Perché il file non si salva', 'Nessun problema di salvataggio.'],
      ],
      correct: 1,
      explanation: 'La qualità di un tracciato si misura dalla semplicità.',
    },
  ],
  explain: {
    prompt: 'Spiega cosa sono i nodi e le maniglie in una curva Bézier.',
    keywords: ['nodo', 'maniglia', 'curva', 'tangente', 'bézier'],
    model:
      'I nodi sono i punti che il tracciato attraversa. Le maniglie partono dai nodi e ne controllano la direzione e la forza della curva: la curva è tangente alla maniglia. Spostando una maniglia cambio il modo in cui il segmento entra ed esce dal nodo.',
  },
  project: {
    title: 'Onda del brand',
    brief: 'Disegna un’onda semplice da usare come elemento grafico.',
    steps: ['Crea un tracciato con tre nodi', 'Chiudilo', 'Salva come simbolo riutilizzabile'],
  },
  learned: 'Sai costruire curve con pochi nodi e correggerle senza rifare tutto.',
  next: 'Lo strumento Nodo è il chirurgo del tracciato: conversione, giunzione e precisione.',
  consolidate: 'Disegna cinque onde diverse: stesso numero di nodi, maniglie diverse.',
});

const l3 = affLesson(W, 3, {
  id: 'af-w2l3',
  title: 'Lo strumento Nodo',
  subtitle: 'Modificare, convertire, unire',
  objectives: ['Convertire nodi spigolo e curvi', 'Unire e spezzare tracciati', 'Correggere un profilo senza distruggerlo'],
  concepts: ['nodi', 'conversione', 'giunzioni'],
  activation: ['Hai mai unito due tracciati e ottenuto un angolo improvviso? Cosa mancava?', 'Probabilmente i nodi non erano allineati o maniglie e direzioni non combaciavano.'],
  analogy:
    'Lo strumento Nodo è il sarto del tracciato: può cambiare un angolo in una curva, cucire due pezzi o aprire una cucitura. Ogni intervento è locale e reversibile.',
  theory: [
    'Con lo strumento Nodo selezioni punti e maniglie. I comandi di conversione trasformano uno spigolo in curva e viceversa; giunzione e interruzione modificano la continuità del tracciato.',
    'La precisione dipende dallo zoom: lavora ingrandito e usa i vincoli. Un nodo spostato di poco può cambiare tutta la percezione della forma.',
  ],
  table: {
    rows: [
      ['Spostare un nodo', 'Trascina con lo strumento Nodo', '—'],
      ['Conversione', 'Barra contestuale', 'Doppio clic sul nodo'],
      ['Unire due estremi', 'Seleziona due nodi → Giunzione', 'Ctrl/Cmd + J'],
    ],
  },
  trace: [
    ['Seleziona il tracciato con lo strumento Nodo', 'Vedrai nodi e maniglie.'],
    ['Scegli il nodo da correggere', 'Lavora un punto per volta.'],
    ['Converti o sposta con precisione', 'Zoom alto e vincoli aiutano.'],
    ['Unisci gli estremi se necessario', 'La giunzione cambia il tipo di nodo.'],
  ],
  misconception: ['Unire due tracciati è sempre indolore.', 'La giunzione crea un nodo nuovo e può cambiare le maniglie: controlla il risultato.'],
  world: [
    'Un profilo di bottiglia richiede un nodo spigolo al collo e curve continue.',
    'Un’icona a forma di cuore si costruisce unendo due curve simmetriche.',
    'Un logo geometrico usa giunzioni precise per chiudere le forme.',
  ],
  tip: 'Prima di convertire, chiediti se ti serve un angolo o una curva. La conversione è una decisione, non un passaggio obbligato.',
  errors: [
    {
      title: 'Giunzione con angolo visibile',
      whatYouDo: 'Unisci due estremi con direzioni diverse.',
      whatHappens: 'Compare una cuspide o un salto nella curva.',
      why: 'Le maniglie dei due nodi non sono allineate.',
      fix: 'Allinea le maniglie prima di unire o usa un nodo spigolo consapevole.',
      recognize: 'Se la curva cambia bruscamente direzione, la giunzione è brusca.',
    },
    {
      title: 'Nodo invisibile',
      whatYouDo: 'Cerchi di modificare un punto ma non lo selezioni.',
      whatHappens: 'Sposti l’intero tracciato.',
      why: 'Hai selezionato l’oggetto, non il nodo.',
      fix: 'Attiva lo strumento Nodo e clicca direttamente sul punto.',
      recognize: 'Se si muove tutto, sei in modalità selezione oggetto.',
    },
  ],
  drills: [
    {
      title: 'Spigolo a curva',
      task: 'Disegna un triangolo e trasforma un vertice in curva.',
      checks: ['Il triangolo è chiuso', 'Un vertice è curvo', 'Gli altri restano spigoli'],
      hints: ['Doppio clic sul nodo converte.', 'Non convertire tutti i nodi.'],
      solution: 'Penna → triangolo → Strumento Nodo → doppio clic su un vertice.',
      explanation: 'La conversione locale è il cuore del controllo.',
    },
    {
      title: 'Unisci due curve',
      task: 'Disegna due archi e uniscili in un’unica forma continua.',
      checks: ['I due archi sono uniti', 'La curva non ha salti', 'La forma è chiusa'],
      hints: ['Seleziona i due estremi.', 'Ctrl/Cmd + J per la giunzione.'],
      solution: 'Due archi → seleziona estremi → Giunzione → chiudi.',
      explanation: 'La continuità è una proprietà delle maniglie, non dei nodi.',
    },
    {
      title: 'Profilo simmetrico',
      task: 'Disegna metà bottiglia, duplicala e rispecchiala per ottenere l’altra metà.',
      checks: ['La metà è completa', 'La copia è specchiata', 'Le due metà combaciano'],
      hints: ['Usa Trasforma → Rispecchia.', 'Allinea i bordi prima di unire.'],
      solution: 'Disegna metà → duplica → rispecchia → allinea → unisci.',
      explanation: 'La simmetria controllata è più precisa del disegno a occhio.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa fa la conversione di un nodo?',
      options: [
        ['Cambia il colore del tracciato', 'Il colore è una proprietà separata.'],
        ['Trasforma spigolo in curva o viceversa', 'Esatto: cambia il tipo di nodo.'],
        ['Elimina il nodo', 'Per eliminare c’è un comando dedicato.'],
      ],
      correct: 1,
      explanation: 'La conversione decide come la curva entra ed esce dal nodo.',
    },
    {
      question: 'Perché una giunzione può creare un angolo?',
      options: [
        ['Perché i nodi hanno direzioni diverse', 'Esatto: le maniglie non sono allineate.'],
        ['Perché il tracciato è troppo lungo', 'La lunghezza non c’entra.'],
        ['Perché manca il riempimento', 'Il riempimento non modifica la geometria.'],
      ],
      correct: 0,
      explanation: 'La continuità visiva dipende dalle tangenti dei due nodi.',
    },
  ],
  explain: {
    prompt: 'Spiega quando usare un nodo spigolo e quando un nodo curvo.',
    keywords: ['nodo', 'spigolo', 'curvo', 'maniglia', 'direzione'],
    model:
      'Uso un nodo spigolo quando voglio un cambio di direzione netto, come l’angolo di una cornice. Uso un nodo curvo quando il tracciato deve fluire, come il profilo di una bottiglia. La differenza è nella maniglia: se c’è ed è allineata, la curva è continua.',
  },
  project: {
    title: 'Profilo del simbolo',
    brief: 'Costruisci il profilo di un simbolo semplice con curve e uno spigolo.',
    steps: ['Disegna metà forma', 'Rispecchia', 'Unisci e controlla la continuità'],
  },
  learned: 'Sai modificare un tracciato in modo chirurgico, senza rifarlo.',
  next: 'Le operazioni booleane combinano forme come insiemi: aggiungi, sottrai, interseca.',
  consolidate: 'Prendi una forma e cambia un solo nodo: osserva quanto cambia la percezione.',
});

const l4 = affLesson(W, 4, {
  id: 'af-w2l4',
  title: 'Operazioni booleane',
  subtitle: 'Aggiungi, sottrai, interseca, dividi',
  objectives: ['Combinare forme con le booleane', 'Scegliere l’ordine corretto', 'Correggere risultati inattesi'],
  concepts: ['booleane', 'sottrazione', 'ordine'],
  activation: ['Come ritagli un cerchio dentro un quadrato senza cancellare a mano?', 'Con una sottrazione booleana: il quadrato meno il cerchio.'],
  analogy:
    'Le booleane sono la plastica a caldo delle forme: puoi saldarle, scavarle, tenere solo la sovrapposizione o separare i pezzi. Il risultato dipende da chi metti sopra.',
  theory: [
    'Le operazioni principali sono Aggiungi (unione), Sottrai (il livello sopra scava quello sotto), Interseca (solo la parte comune), Escludi (tutto tranne la parte comune) e Dividi (separa i pezzi).',
    'L’ordine dei livelli conta: nella sottrazione, la forma in alto è quella che viene rimossa. Se il risultato è vuoto, probabilmente le forme non si sovrappongono.',
  ],
  table: {
    rows: [
      ['Unire', 'Aggiungi', 'Forme sovrapposte'],
      ['Scavare', 'Sottrai', 'Sopra = forbice'],
      ['Solo sovrapposizione', 'Interseca', 'Serve contatto'],
    ],
  },
  trace: [
    ['Sovrapponi le forme', 'Senza sovrapposizione molte operazioni non fanno nulla.'],
    ['Seleziona entrambe', 'L’ordine di selezione può contare.'],
    ['Scegli l’operazione', 'Aggiungi, Sottrai, Interseca, Dividi.'],
    ['Controlla il risultato e i nodi', 'La forma può essere modificata dopo.'],
  ],
  misconception: ['Le booleane sono irreversibili.', 'Restano modificabili e, nella maggior parte dei casi, annullabili.'],
  world: [
    'Un’icona a forma di lente si ottiene sottraendo un cerchio a un altro.',
    'Un logo con iniziali ritagliate usa una sottrazione testo-forma.',
    'Un pattern di cerchi intersecati crea una texture.',
  ],
  tip: 'Prima di una booleana, duplica le forme originali: se il risultato non convince, hai una via di ritorno.',
  errors: [
    {
      title: 'Sottrazione che svuota tutto',
      whatYouDo: 'Applichi Sottrai a due forme che non si toccano.',
      whatHappens: 'La forma in alto sparisce e resta quella in basso.',
      why: 'Non c’è area comune da sottrarre.',
      fix: 'Sovrapponi le forme e riprova.',
      recognize: 'Se il risultato è identico alla forma sotto, mancava sovrapposizione.',
    },
    {
      title: 'Forma sbagliata rimossa',
      whatYouDo: 'Metti la forma da conservare sopra quella da scavare.',
      whatHappens: 'Viene rimossa la parte sbagliata.',
      why: 'Nella sottrazione il livello superiore è la maschera.',
      fix: 'Riordina i livelli e ripeti l’operazione.',
      recognize: 'Controlla sempre chi è sopra prima di Sottrai.',
    },
  ],
  drills: [
    {
      title: 'Lente semplice',
      task: 'Crea una lente sottraendo un cerchio a un altro cerchio.',
      checks: ['I cerchi si sovrappongono', 'La sottrazione ha creato una mezzaluna', 'La forma è modificabile'],
      hints: ['Il cerchio da rimuovere deve stare sopra.', 'Seleziona entrambi.'],
      solution: 'Cerchio A → cerchio B sopra → seleziona → Sottrai.',
      explanation: 'La sottrazione è la tecnica base per icone e simboli.',
    },
    {
      title: 'Unione di forme',
      task: 'Unisci un rettangolo e un cerchio in un’unica forma continua.',
      checks: ['Le forme si toccano', 'L’unione è un solo oggetto', 'Non ci sono linee interne'],
      hints: ['Aggiungi unisce i contorni.', 'Se resta una linea, le forme non erano unite.'],
      solution: 'Rettangolo + cerchio sovrapposti → seleziona → Aggiungi.',
      explanation: 'L’unione elimina i bordi interni e crea un contorno unico.',
    },
    {
      title: 'Dividi e colora',
      task: 'Dividi due forme sovrapposte e colora i pezzi con colori diversi.',
      checks: ['I pezzi sono separati', 'Ogni pezzo ha un colore', 'I contorni combaciano'],
      hints: ['Dividi crea oggetti separati.', 'Seleziona un pezzo nel pannello Livelli.'],
      solution: 'Forme sovrapposte → Dividi → seleziona i pezzi → applica colori.',
      explanation: 'Dividere è utile per pattern e illustrazioni multicolore.',
    },
  ],
  quizzes: [
    {
      question: 'Nella sottrazione, quale forma viene rimossa?',
      options: [
        ['Quella sotto', 'Quella sotto resta: è la base.'],
        ['Quella sopra', 'Esatto: il livello superiore fa da maschera.'],
        ['Entrambe', 'Il risultato è la differenza, non la cancellazione totale.'],
      ],
      correct: 1,
      explanation: 'L’ordine dei livelli è parte dell’operazione.',
    },
    {
      question: 'Cosa fa Interseca?',
      options: [
        ['Tiene solo la parte comune', 'Esatto: l’intersezione delle aree.'],
        ['Unisce tutti i contorni', 'Quello è Aggiungi.'],
        ['Separa i pezzi', 'Quello è Dividi.'],
      ],
      correct: 0,
      explanation: 'Ogni booleana corrisponde a un’operazione insiemistica.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra Aggiungi, Sottrai e Interseca.',
    keywords: ['aggiungi', 'sottrai', 'interseca', 'sovrappos', 'forma'],
    model:
      'Aggiungi unisce le aree in un solo contorno. Sottrai rimuove dalla forma sotto l’area della forma sopra. Interseca tiene solo la zona in cui le forme si sovrappongono. Cambia il risultato e cambia anche il numero di nodi che ottieni.',
  },
  project: {
    title: 'Icona del brand',
    brief: 'Crea un’icona geometrica con almeno una booleana.',
    steps: ['Disegna due forme', 'Applica una sottrazione o unione', 'Controlla i nodi e salva'],
  },
  learned: 'Sai costruire forme complesse partendo da forme semplici.',
  next: 'Allineamento e guide tengono insieme il progetto: la differenza tra “quasi” e “preciso”.',
  consolidate: 'Rifai l’icona con una booleana diversa e confronta i risultati.',
});

const l5 = affLesson(W, 5, {
  id: 'af-w2l5',
  title: 'Allineamento, distribuzione e guide',
  subtitle: 'La precisione che si vede',
  objectives: ['Allineare oggetti tra loro e alla tavola', 'Distribuire spaziature uniformi', 'Usare guide e griglie'],
  concepts: ['allineamento', 'distribuzione', 'guide'],
  activation: ['Perché un layout “quasi allineato” sembra sciatto anche se nessuno sa dire cosa non va?', 'L’occhio percepisce le differenze di pochi pixel come instabilità.'],
  analogy:
    'Le guide sono le righe di un quaderno; l’allineamento è il righello che tiene le cose sulla stessa riga. La distribuzione è il passo regolare di chi cammina.',
  theory: [
    'Il pannello Allineamento dispone gli oggetti rispetto alla selezione o alla tavola. Distribuisci quando vuoi spazi uguali tra più elementi.',
    'Le guide si trascinano dai righelli e si bloccano. Le griglie aiutano nelle costruzioni geometriche; le guide magnetiche attirano gli oggetti ai bordi e ai centri.',
  ],
  table: {
    rows: [
      ['Centrare', 'Allineamento → centro', '—'],
      ['Spazi uguali', 'Distribuisci', '—'],
      ['Guida', 'Trascina dal righello', 'Blocca guida'],
    ],
  },
  trace: [
    ['Seleziona gli oggetti', 'L’allineamento agisce sulla selezione.'],
    ['Scegli il riferimento', 'Selezione o tavola: cambia il risultato.'],
    ['Applica allineamento o distribuzione', 'Controlla gli spazi.'],
    ['Blocca le guide utili', 'Le guide mobili si spostano per errore.'],
  ],
  misconception: ['L’allineamento è solo estetico.', 'È funzionale: un layout stabile è più leggibile e più facile da modificare.'],
  world: [
    'Un menu di un sito ha voci distribuite con spaziatura uniforme.',
    'Un poster allinea titolo e sottotitolo sullo stesso asse.',
    'Un biglietto centra il logo rispetto alla tavola, non al testo.',
  ],
  tip: 'Se non sai a cosa allineare, scegli la tavola: è il riferimento più stabile.',
  errors: [
    {
      title: 'Allineato al gruppo sbagliato',
      whatYouDo: 'Allinei al centro della selezione invece che alla tavola.',
      whatHappens: 'Gli oggetti si centrano tra loro ma non nella pagina.',
      why: 'Il riferimento è la selezione, non il documento.',
      fix: 'Scegli “Allinea alla tavola” e riapplica.',
      recognize: 'Se il gruppo è centrato ma sbilanciato nella pagina, manca il riferimento.',
    },
    {
      title: 'Guide che si spostano',
      whatYouDo: 'Trascini una guida e poi la lasci mobile.',
      whatHappens: 'Un click accidentale la sposta e il layout cambia.',
      why: 'Le guide non bloccate sono oggetti modificabili.',
      fix: 'Blocca le guide dal menu Visualizza.',
      recognize: 'Se una guida non resta ferma, non è bloccata.',
    },
  ],
  drills: [
    {
      title: 'Centra alla tavola',
      task: 'Crea tre forme e centrali orizzontalmente rispetto alla tavola.',
      checks: ['Le forme sono selezionate', 'Il riferimento è la tavola', 'Sono centrate'],
      hints: ['Il riferimento è nel pannello Allineamento.', 'Non usare il centro della selezione.'],
      solution: 'Seleziona → Allinea alla tavola → Centro orizzontale.',
      explanation: 'Il riferimento giusto è metà del risultato.',
    },
    {
      title: 'Spaziatura uniforme',
      task: 'Distribuisci cinque icone con spazi uguali.',
      checks: ['Le icone sono allineate', 'Gli spazi sono uguali', 'Il gruppo è centrato'],
      hints: ['Distribuisci agisce su tre o più oggetti.', 'Allinea prima, distribuisci dopo.'],
      solution: 'Seleziona cinque icone → Allinea centro → Distribuisci orizzontalmente.',
      explanation: 'Allineare e distribuire sono due passaggi distinti.',
    },
    {
      title: 'Guida stabile',
      task: 'Crea una guida al centro della tavola e bloccala.',
      checks: ['La guida è al centro', 'È bloccata', 'Non si sposta con un click'],
      hints: ['Trascina dal righello.', 'Blocca dal menu Visualizza.'],
      solution: 'Righello → trascina al centro → Visualizza → Blocca guide.',
      explanation: 'Le guide servono solo se restano dove le metti.',
    },
  ],
  quizzes: [
    {
      question: 'Qual è il riferimento più stabile per centrare un elemento in pagina?',
      options: [
        ['La selezione', 'Centra rispetto agli altri oggetti, non alla pagina.'],
        ['La tavola', 'Esatto: è il contenitore finale.'],
        ['Il cursore', 'Non è un riferimento geometrico.'],
      ],
      correct: 1,
      explanation: 'La tavola rappresenta il supporto reale.',
    },
    {
      question: 'Cosa fa Distribuisci?',
      options: [
        ['Allinea i bordi', 'Quello è Allinea.'],
        ['Rende uniforme lo spazio tra gli oggetti', 'Esatto: distribuisce la distanza.'],
        ['Raggruppa gli oggetti', 'Quello è Gruppo.'],
      ],
      correct: 1,
      explanation: 'Distribuire controlla gli spazi, non i bordi.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra allineare e distribuire.',
    keywords: ['allineare', 'distribuire', 'spazio', 'bordo', 'riferimento'],
    model:
      'Allineare mette gli oggetti su una linea comune: stesso bordo o stesso centro. Distribuire rende uniforme lo spazio tra loro. Prima allineo, poi distribuisco, e scelgo se il riferimento è la selezione o la tavola.',
  },
  project: {
    title: 'Griglia del biglietto',
    brief: 'Imposta guide e allineamenti per il biglietto da visita.',
    steps: ['Crea guide a 5 mm dal taglio', 'Centra logo e testo', 'Blocca le guide'],
  },
  learned: 'Sai rendere preciso un layout senza aggiustare a occhio.',
  next: 'Il colore chiude la forma: riempimenti, tratti e gradienti.',
  consolidate: 'Guarda un layout che ti piace e trova i suoi assi di allineamento.',
});

const l6 = affLesson(W, 6, {
  id: 'af-w2l6',
  title: 'Colore, riempimento e gradienti',
  subtitle: 'Tinta unita, tratto e sfumature',
  objectives: ['Applicare riempimento e tratto', 'Costruire un gradiente lineare e radiale', 'Evitare colori fuori profilo'],
  concepts: ['riempimento', 'tratto', 'gradienti'],
  activation: ['Perché un gradiente a volte sembra “sporco” invece che morbido?', 'Spesso perché i colori intermedi perdono saturazione o perché la direzione non segue la forma.'],
  analogy:
    'Il riempimento è la vernice dentro la forma; il tratto è la cornice; il gradiente è la luce che cambia sulla superficie. La luce ha una direzione, non è casuale.',
  theory: [
    'Riempimento e tratto sono proprietà separate. Puoi avere una forma senza riempimento e solo contorno, o un tratto multiplo con spessori diversi.',
    'Un gradiente lineare segue una direzione; uno radiale parte da un centro. I punti di colore (stop) decidono dove cambia la tinta. Meno stop, transizione più pulita.',
  ],
  table: {
    rows: [
      ['Riempimento', 'Pannello Colore', 'Tinta o gradiente'],
      ['Tratto', 'Pannello Tratto', 'Spessore e stile'],
      ['Gradiente', 'Strumento Gradiente', 'Lineare/radiale'],
    ],
  },
  trace: [
    ['Seleziona la forma', 'Riempimento e tratto agiscono sull’oggetto.'],
    ['Scegli tinta o gradiente', 'Il gradiente ha bisogno di almeno due stop.'],
    ['Imposta direzione e stop', 'La direzione racconta la luce.'],
    ['Controlla il profilo colore', 'CMYK per stampa, RGB per schermo.'],
  ],
  misconception: ['Un gradiente con molti colori è più ricco.', 'Troppi stop creano bande e rumore: spesso due colori bastano.'],
  world: [
    'Un pulsante usa un gradiente verticale leggero per suggerire rilievo.',
    'Un poster usa un fondo radiale per concentrare l’attenzione al centro.',
    'Un’icona monocroma usa solo tratto e riempimento per restare leggibile.',
  ],
  tip: 'Prima di aggiungere un gradiente, chiediti da dove arriva la luce. Se non lo sai, non serve.',
  errors: [
    {
      title: 'Tratto che scompare',
      whatYouDo: 'Imposti un tratto dello stesso colore del fondo.',
      whatHappens: 'La forma sembra senza contorno.',
      why: 'Il tratto c’è ma non contrasta.',
      fix: 'Cambia colore o spessore del tratto.',
      recognize: 'Se il bordo è invisibile, controlla il colore del tratto.',
    },
    {
      title: 'Gradiente a bande',
      whatYouDo: 'Usi pochi passaggi colore in un gradiente ampio.',
      whatHappens: 'Si vedono strisce invece di una transizione morbida.',
      why: 'La profondità colore o gli stop non sono sufficienti.',
      fix: 'Riduci la distanza o aggiungi stop intermedi coerenti.',
      recognize: 'Se vedi scalini di colore, il gradiente è troppo esteso.',
    },
  ],
  drills: [
    {
      title: 'Forma con tratto',
      task: 'Crea un cerchio con riempimento chiaro e tratto scuro di 4 px.',
      checks: ['Il riempimento è chiaro', 'Il tratto è scuro', 'Lo spessore è 4 px'],
      hints: ['Riempimento e tratto sono separati.', 'Il tratto si imposta nel pannello.'],
      solution: 'Cerchio → riempimento chiaro → tratto scuro 4 px.',
      explanation: 'Separare le proprietà permette combinazioni infinite.',
    },
    {
      title: 'Gradiente lineare',
      task: 'Applica un gradiente lineare verticale a un rettangolo.',
      checks: ['Il gradiente è lineare', 'La direzione è verticale', 'La transizione è morbida'],
      hints: ['Trascina con lo strumento Gradiente.', 'Due stop bastano.'],
      solution: 'Rettangolo → Gradiente → trascina dall’alto verso il basso.',
      explanation: 'La direzione del gradiente è parte del messaggio visivo.',
    },
    {
      title: 'Gradiente radiale',
      task: 'Crea un fondo radiale con centro spostato in alto a sinistra.',
      checks: ['Il gradiente è radiale', 'Il centro è spostato', 'Il bordo resta pulito'],
      hints: ['Il centro si trascina.', 'Controlla gli stop.'],
      solution: 'Forma → Gradiente radiale → sposta il centro → regola gli stop.',
      explanation: 'Un centro spostato crea profondità senza aggiungere elementi.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa controlla il numero di stop di un gradiente?',
      options: [
        ['La dimensione della forma', 'La dimensione è indipendente.'],
        ['Dove e quante volte cambia il colore', 'Esatto: gli stop sono i punti di transizione.'],
        ['Il profilo colore', 'Il profilo è separato.'],
      ],
      correct: 1,
      explanation: 'Gli stop definiscono la sequenza cromatica.',
    },
    {
      question: 'Perché un tratto può sembrare assente?',
      options: [
        ['Perché è troppo sottile o dello stesso colore del fondo', 'Esatto: manca contrasto o spessore.'],
        ['Perché i livelli sono bloccati', 'Il blocco impedisce la modifica, non la visualizzazione.'],
        ['Perché il file è CMYK', 'Il profilo non nasconde il tratto.'],
      ],
      correct: 0,
      explanation: 'Il tratto è visibile solo se contrasta.',
    },
  ],
  explain: {
    prompt: 'Spiega la differenza tra riempimento, tratto e gradiente.',
    keywords: ['riempimento', 'tratto', 'gradiente', 'colore', 'direzione'],
    model:
      'Il riempimento è il colore interno della forma, il tratto è il contorno, il gradiente è una transizione tra colori. Il gradiente ha una direzione e degli stop; il tratto ha spessore e stile. Sono proprietà indipendenti, posso combinarle come voglio.',
  },
  project: {
    title: 'Palette del brand',
    brief: 'Definisci tre colori e un gradiente per il brand kit.',
    steps: ['Scegli tre colori', 'Crea un campione per ciascuno', 'Salva il gradiente nel pannello',
    ],
  },
  learned: 'Sai usare il colore come sistema, non come decorazione.',
  next: 'Mettiamo insieme forme, tracciati, booleane e colore in un’icona completa.',
  consolidate: 'Rifai un’icona che conosci usando solo forme e booleane.',
});

const l7 = affLesson(W, 7, {
  id: 'af-w2l7',
  title: 'Ripasso e mini-progetto: icona',
  subtitle: 'Dalla forma al simbolo',
  objectives: ['Combinare forme e tracciati', 'Usare booleane e allineamento', 'Esportare un SVG pulito'],
  concepts: ['icona', 'booleane', 'SVG'],
  activation: ['Quanti elementi servono davvero per un’icona riconoscibile?', 'Spesso due o tre: la riconoscibilità nasce dalla sintesi, non dal dettaglio.'],
  analogy:
    'Un’icona è un segnale stradale: deve funzionare a colpo d’occhio, anche piccolo e lontano. Ogni dettaglio in più è rumore.',
  theory: [
    'Un’icona parte da una griglia e da forme geometriche. La coerenza di spessori e angoli la rende professionale; le booleane aiutano a ritagliare senza nodi inutili.',
    'Esporta in SVG per il web e in PNG per le piattaforme che non accettano vettori. Controlla che il simbolo resti leggibile a 16 px.',
  ],
  table: {
    rows: [
      ['Griglia', '24×24 o 32×32', 'Coerenza'],
      ['Spessore tratto', '2 px', 'Leggibilità'],
      ['Export web', 'SVG', 'Vettoriale'],
    ],
  },
  trace: [
    ['Disegna la griglia e le guide', 'La griglia decide le proporzioni.'],
    ['Costruisci con forme e booleane', 'Meno nodi, più pulizia.'],
    ['Controlla a dimensione reale', 'L’icona vive a 16–24 px.'],
    ['Esporta SVG e PNG', 'Due formati per due usi.'],
  ],
  misconception: ['Un’icona bella è dettagliata.', 'Un’icona utile è leggibile: il dettaglio si perde alla dimensione d’uso.'],
  world: [
    'Un’icona di impostazioni usa un cerchio e una serie di denti.',
    'Un’icona di ricerca è un cerchio più una linea inclinata.',
    'Un’icona di cartello combina un rettangolo e un triangolo.',
  ],
  tip: 'Guarda l’icona al 100% e poi al 25%. Se al 25% non si capisce, semplifica.',
  errors: [
    {
      title: 'Icona illeggibile a 16 px',
      whatYouDo: 'Aggiungi dettagli sottili e molti colori.',
      whatHappens: 'A dimensione reale diventa una macchia.',
      why: 'Sotto una certa dimensione i dettagli si fondono.',
      fix: 'Riduci a due forme e a uno spessore coerente.',
      recognize: 'Se devi zoomare per capirla, è troppo complessa.',
    },
    {
      title: 'SVG con pixel',
      whatYouDo: 'Esporti un’icona raster come SVG.',
      whatHappens: 'Il file contiene un’immagine incorporata, non vettori.',
      why: 'L’SVG può contenere bitmap, ma non diventa vettoriale.',
      fix: 'Parti da forme vettoriali ed esporta senza immagini raster.',
      recognize: 'Se ingrandendo si sfoca, l’SVG contiene pixel.',
    },
  ],
  drills: [
    {
      title: 'Griglia 24×24',
      task: 'Prepara una griglia 24×24 con guide a 2 px dai bordi.',
      checks: ['La griglia è 24×24', 'Le guide sono a 2 px', 'Il simbolo sta dentro'],
      hints: ['La griglia si crea con rettangoli o guide.', 'Mantieni un margine ottico.'],
      solution: 'Tavola 24×24 → guide a 2 px → disegna dentro.',
      explanation: 'La griglia rende coerenti icone diverse.',
    },
    {
      title: 'Icona con booleana',
      task: 'Crea un’icona di ricerca con cerchio e manico, usando un’unione.',
      checks: ['Ci sono cerchio e manico', 'Sono uniti', 'Resta leggibile a 16 px'],
      hints: ['Il manico è un rettangolo ruotato.', 'Unisci per evitare sovrapposizioni.'],
      solution: 'Cerchio + rettangolo ruotato → Aggiungi → esporta.',
      explanation: 'La booleana elimina linee interne e semplifica il file.',
    },
    {
      title: 'Export doppio',
      task: 'Esporta l’icona in SVG e PNG 64 px e confrontale.',
      checks: ['L’SVG è vettoriale', 'Il PNG è 64 px', 'Entrambi sono leggibili'],
      hints: ['Controlla le opzioni SVG.', 'Il PNG serve per contesti raster.'],
      solution: 'Esporta → SVG → poi PNG 64 px.',
      explanation: 'Il formato giusto dipende da chi usa l’icona.',
    },
  ],
  quizzes: [
    {
      question: 'Qual è la dimensione tipica di una griglia per icone web?',
      options: [
        ['24×24 px', 'Esatto: è uno standard comune.'],
        ['300×300 mm', 'È una misura da stampa, non da icona.'],
        ['1000×1000 px', 'Troppo grande per il disegno base.'],
      ],
      correct: 0,
      explanation: 'La griglia è una convenzione, non una legge: serve coerenza.',
    },
    {
      question: 'Come capisci se un’icona è troppo dettagliata?',
      options: [
        ['La guardi a 16 px', 'Esatto: alla dimensione d’uso.'],
        ['La stampi in A3', 'La stampa non è il contesto tipico.'],
        ['Conti i colori', 'Il numero di colori non basta.'],
      ],
      correct: 0,
      explanation: 'Il test è sempre alla dimensione reale.',
    },
  ],
  explain: {
    prompt: 'Spiega perché un’icona deve essere semplice per funzionare.',
    keywords: ['icona', 'semplic', 'leggibil', 'dimensione', 'dettagl'],
    model:
      'Un’icona viene letta in pochi decimi di secondo e spesso a 16 o 24 px. I dettagli piccoli si fondono e diventano rumore. Riducendo forme, colori e spessori, il segnale resta riconoscibile anche quando è minuscolo.',
  },
  project: {
    title: 'Icona del brand kit',
    brief: 'Crea l’icona che rappresenterà il progetto.',
    steps: ['Disegna su griglia 24×24', 'Usa una booleana', 'Esporta SVG e PNG'],
  },
  learned: 'Sai sintetizzare un’idea in un simbolo leggibile.',
  next: 'Il lato professionale del Vettore: performance, scorciatoie ed export SVG.',
  consolidate: 'Disegna la stessa icona in tre modi diversi e scegli il più leggibile.',
});

const l8 = affLesson(W, 8, {
  id: 'af-w2l8',
  title: 'Vettore professionale',
  subtitle: 'Performance, precisione, SVG',
  objectives: ['Ridurre nodi e complessità', 'Esportare SVG compatibili', 'Costruire un flusso ripetibile'],
  concepts: ['performance', 'SVG', 'precisione'],
  activation: ['Perché un file vettoriale può diventare lento anche se “è solo un disegno”?', 'Perché migliaia di nodi, effetti e maschere costano comunque calcolo.'],
  analogy:
    'Un tracciato è una corda: pochi nodi la tengono tesa, troppi la trasformano in un groviglio. Il software deve calcolare ogni curva a ogni modifica.',
  theory: [
    'Meno nodi significa curve più pulite e file più veloci. Unisci forme quando possibile, evita effetti multipli annidati e controlla il numero di oggetti nel pannello Livelli.',
    'L’SVG per il web dovrebbe contenere solo tracciati necessari, senza immagini raster incorporate e con viewBox corretto. Testalo nel browser alla dimensione reale.',
  ],
  table: {
    rows: [
      ['Semplificare', 'Riduci nodi', 'Meno calcolo'],
      ['Esportare SVG', 'Preset web', 'viewBox'],
      ['Verificare', 'Browser a dimensione reale', '—'],
    ],
  },
  trace: [
    ['Controlla il numero di nodi', 'Seleziona il tracciato e osserva.'],
    ['Unisci forme e rimuovi effetti inutili', 'Ogni effetto è un livello di calcolo.'],
    ['Esporta con viewBox corretto', 'Il simbolo deve adattarsi al contenitore.'],
    ['Apri l’SVG nel browser', 'Verifica colori, dimensioni e nitidezza.'],
  ],
  misconception: ['Il vettore è sempre leggero.', 'Un SVG con migliaia di nodi può essere più pesante di un PNG.'],
  world: [
    'Un’icona SVG ben costruita pesa pochi kilobyte e scala senza perdere qualità.',
    'Un logo con effetti complessi può rallentare l’editor e la pagina web.',
    'Un pattern vettoriale ripetuto va convertito in simbolo per non duplicare i nodi.',
  ],
  tip: 'Prima di esportare, guarda il numero di oggetti: se è alto, chiediti se puoi semplificare.',
  errors: [
    {
      title: 'SVG che non scala',
      whatYouDo: 'Esporti senza viewBox o con dimensioni fisse.',
      whatHappens: 'Nel browser l’icona non si adatta al contenitore.',
      why: 'Il viewBox definisce il sistema di coordinate.',
      fix: 'Esporta con viewBox e senza width/height fissi se serve responsive.',
      recognize: 'Se l’SVG sborda o resta piccolo, manca il viewBox.',
    },
    {
      title: 'File lento da modificare',
      whatYouDo: 'Applichi decine di effetti e maschere annidate.',
      whatHappens: 'Ogni modifica richiede secondi.',
      why: 'Gli effetti vengono ricalcolati in tempo reale.',
      fix: 'Rasterizza gli effetti definitivi o semplifica la struttura.',
      recognize: 'Se il pannello Livelli è pieno di effetti, la performance ne risente.',
    },
  ],
  drills: [
    {
      title: 'Audit dei nodi',
      task: 'Apri un tracciato e conta i nodi. Riducine almeno il 20% senza cambiare la forma percepita.',
      checks: ['Ho contato i nodi', 'Ho rimosso nodi inutili', 'La forma è rimasta riconoscibile'],
      hints: ['I nodi ridondanti sono su segmenti quasi rettilinei.', 'Confronta prima e dopo.'],
      solution: 'Nodo → seleziona nodi ridondanti → elimina → confronta.',
      explanation: 'La semplicità è una scelta progettuale e tecnica insieme.',
    },
    {
      title: 'SVG responsive',
      task: 'Esporta un’icona in SVG e inseriscila in una pagina HTML con dimensioni 24 e 96 px.',
      checks: ['L’SVG ha viewBox', 'Si vede a 24 px', 'Si vede a 96 px senza sfocarsi'],
      hints: ['Apri l’SVG in un editor di testo.', 'Controlla che non ci siano immagini raster.'],
      solution: 'Esporta SVG → apri nel browser → testa due dimensioni.',
      explanation: 'Il vettore si dimostra alla dimensione d’uso, non nell’anteprima.',
    },
    {
      title: 'Flusso ripetibile',
      task: 'Scrivi i cinque passaggi del tuo export SVG e usali su due icone.',
      checks: ['Ci sono cinque passaggi', 'Li ho usati su due file', 'I risultati sono coerenti'],
      hints: ['ViewBox, colori, dimensione, test, nome.', 'Ripeti senza saltare passaggi.'],
      solution: 'Checklist: viewBox, colori, dimensione, test browser, nome coerente.',
      explanation: 'Un flusso ripetibile rende la qualità prevedibile.',
    },
  ],
  quizzes: [
    {
      question: 'Cosa rende un SVG adattabile a contenitori diversi?',
      options: [
        ['Il numero di colori', 'Il colore non determina l’adattamento.'],
        ['Il viewBox', 'Esatto: definisce coordinate e proporzioni.'],
        ['La compressione', 'L’SVG è testo, non un archivio compresso.'],
      ],
      correct: 1,
      explanation: 'Il viewBox è il sistema di coordinate del disegno.',
    },
    {
      question: 'Perché ridurre i nodi migliora la performance?',
      options: [
        ['Perché il file diventa più piccolo e più facile da calcolare', 'Esatto: meno geometria da valutare.'],
        ['Perché cambia il colore', 'Il colore è indipendente.'],
        ['Perché elimina i livelli', 'I livelli restano.'],
      ],
      correct: 0,
      explanation: 'Ogni nodo è un calcolo in più a ogni modifica.',
    },
  ],
  explain: {
    prompt: 'Spiega perché “vettoriale” non significa automaticamente “leggero”.',
    keywords: ['vettoriale', 'nodi', 'peso', 'performance', 'svg'],
    model:
      'Il vettore descrive forme con nodi e curve; se i nodi sono migliaia, il file contiene molta geometria da calcolare e può diventare pesante. Un SVG con pochi tracciati è leggero e veloce, ma un SVG pieno di nodi, effetti e immagini incorporate può essere più pesante di un PNG.',
  },
  project: {
    title: 'Icona ottimizzata',
    brief: 'Prendi l’icona della lezione 7 e ottimizzala per il web.',
    steps: ['Riduci i nodi', 'Esporta con viewBox', 'Testa a 24 e 96 px'],
  },
  learned: 'Sai produrre vettori puliti, veloci e adatti al web.',
  next: 'La Settimana 3 entra nella tipografia: testo, font e stili.',
  consolidate: 'Apri il pannello Livelli e chiediti cosa puoi unire o semplificare.',
});

export const week02 = affWeek({
  number: 2,
  title: 'Vettore: forme e tracciati',
  subtitle: 'Costruire con geometria e curve',
  description:
    'Dalle forme base alla Penna, dai nodi alle booleane: il vocabolario del disegno vettoriale, con esercizi di precisione.',
  goals: ['Disegnare forme e tracciati puliti', 'Combinare forme con le booleane', 'Esportare SVG leggeri'],
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8],
  project: {
    title: 'Brand kit · icona',
    brief: 'Il brand kit acquisisce il suo primo simbolo vettoriale, costruito su griglia e ottimizzato per il web.',
    deliverable: 'Un’icona SVG e PNG, con pochi nodi e dimensioni coerenti.',
    milestones: ['Forme e tracciati puliti', 'Booleana applicata', 'Export SVG verificato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Nodi e performance', 'SVG con viewBox', 'Flusso di export'],
    exercise: 'Ottimizza un’icona esistente: riduci i nodi del 20% e verifica il peso dell’SVG.',
  },
});
