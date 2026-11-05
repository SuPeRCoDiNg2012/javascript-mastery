import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-07';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w7l1', title: 'Cos’è il Layout', subtitle: 'Pagine, non tele',
    objectives: ['Distinguere Layout da Vettore e Pixel', 'Capire pagine e spread', 'Scegliere il formato di pagina'],
    concepts: ['Layout', 'pagine', 'spread'],
    summary: 'Lo Studio Layout impagina documenti su pagine. Ogni pagina può condividere master, stili e griglie; gli spread mostrano due pagine affiancate.',
    points: ['Layout lavora su pagine e flussi.', 'Le master contengono elementi comuni.', 'Gli spread sono una vista, non un formato obbligatorio.'],
    table: { rows: [['Brochure', 'Layout', '—'], ['Logo', 'Vettore', '—'], ['Foto', 'Pixel', '—']] },
    trace: [['Crea un documento con pagine', 'Scegli formato e orientamento.'], ['Imposta margini e bleed', 'La stampa ne ha bisogno.'], ['Apri il pannello Pagine', 'Qui gestisci l’ordine.'], ['Passa alla vista spread', 'Utile per fronte/retro.']],
    uses: ['Una brochure a 4 pagine.', 'Una rivista di 8 pagine.', 'Un PDF per un preventivo.'],
    drills: [
      { title: 'Documento a 4 pagine', task: 'Crea un A4 verticale con 4 pagine.', checks: ['Ci sono quattro pagine', 'Il formato è A4'], solution: 'Nuovo → Layout → A4 → 4 pagine.' },
      { title: 'Vista spread', task: 'Mostra le pagine in spread e individua fronte e retro.', checks: ['Vedo due pagine affiancate', 'So quale è il retro'], solution: 'Visualizza → Spread.' },
      { title: 'Margini', task: 'Imposta margini di 15 mm e bleed 3 mm.', checks: ['I margini sono 15 mm', 'Il bleed è 3 mm'], solution: 'Documento → margini/bleed.' },
    ],
    quizzes: [
      { question: 'Layout lavora principalmente su…', correct: 'Pagine e flussi di testo', wrong: ['Pixel e livelli', 'Solo tracciati'], explanation: 'Layout è impaginazione.' },
      { question: 'Cosa sono gli spread?', correct: 'Due pagine affiancate', wrong: ['Due file separati', 'Un tipo di font'], explanation: 'Sono una vista per il fronte/retro.' },
    ],
    errors: [
      { title: 'Manifesto fatto in Layout', what: 'Usi pagine per un poster singolo.', why: 'Aggiungi complessità inutile.', fix: 'Usa Vettore per un poster singolo.' },
      { title: 'Margini a zero', what: 'Metti testo a filo pagina.', why: 'In stampa viene tagliato.', fix: 'Imposta margini di sicurezza.' },
    ],
    project: 'brochure a 4 pagine', next: 'Master pages: elementi comuni a tutte le pagine.',
  },
  {
    id: 'af-w7l2', title: 'Pagine e master', subtitle: 'Elementi che si ripetono',
    objectives: ['Creare una master page', 'Applicarla alle pagine', 'Modificare un elemento comune'],
    concepts: ['master page', 'pagine', 'numerazione'],
    summary: 'Una master page contiene elementi condivisi: fascette, numeri di pagina, sfondi. Le pagine normali possono sovrascrivere o ignorare la master.',
    points: ['La master riduce il lavoro ripetitivo.', 'La numerazione automatica vive nella master.', 'Le modifiche alla master si propagano.'],
    table: { rows: [['Fascetta', 'Master', '—'], ['Numero pagina', 'Master', '—'], ['Eccezione', 'Pagina singola', '—']] },
    trace: [['Crea una master', 'Nel pannello Pagine.'], ['Aggiungi gli elementi comuni', 'Fascetta e numero.'], ['Applica alle pagine', 'Trascina la master.'], ['Modifica e verifica', 'Tutte le pagine cambiano.']],
    uses: ['Un manuale con numero di pagina.', 'Una rivista con testata.', 'Un preventivo con footer.'],
    drills: [
      { title: 'Master con numero', task: 'Crea una master con numero di pagina in basso.', checks: ['La master esiste', 'Il numero è automatico'], solution: 'Master → testo → inserisci numero pagina.' },
      { title: 'Applica', task: 'Applica la master a quattro pagine.', checks: ['Tutte mostrano il numero', 'La master è collegata'], solution: 'Trascina la master sulle pagine.' },
      { title: 'Eccezione', task: 'Rimuovi la master solo dalla copertina.', checks: ['La copertina è pulita', 'Le altre pagine restano'], solution: 'Pagina → ignora master.' },
    ],
    quizzes: [
      { question: 'Dove metti il numero di pagina?', correct: 'Nella master', wrong: ['In ogni pagina a mano', 'Nel file Vettore'], explanation: 'La master automatizza la ripetizione.' },
      { question: 'Cosa succede modificando la master?', correct: 'Tutte le pagine collegate cambiano', wrong: ['Solo la prima pagina', 'Niente'], explanation: 'La master è condivisa.' },
    ],
    errors: [
      { title: 'Numero duplicato', what: 'Aggiungi il numero anche nella pagina.', why: 'Sovrapposizione.', fix: 'Usa solo la master.' },
      { title: 'Master non applicata', what: 'Trascini ma la pagina non cambia.', why: 'La pagina ignora la master.', fix: 'Riattiva il collegamento.' },
    ],
    project: 'master della brochure', next: 'Cornici di testo e immagine.',
  },
  {
    id: 'af-w7l3', title: 'Cornici di testo e immagine', subtitle: 'Contenitori che governano il contenuto',
    objectives: ['Creare cornici di testo', 'Inserire immagini nelle cornici', 'Adattare senza distorcere'],
    concepts: ['cornici', 'immagini', 'adattamento'],
    summary: 'Le cornici definiscono dove vive il contenuto. Una cornice immagine può ritagliare o adattare la foto senza deformarla.',
    points: ['La cornice di testo gestisce il flusso.', 'La cornice immagine ritaglia.', 'Adatta mantenendo le proporzioni.'],
    table: { rows: [['Testo', 'Cornice testo', 'T'], ['Immagine', 'Cornice immagine', '—'], ['Adattare', 'Proprietà → Adatta', '—']] },
    trace: [['Disegna la cornice', 'Trascina con lo strumento.'], ['Inserisci il contenuto', 'Testo o immagine.'], ['Scegli riempimento', 'Ritaglia o adatta.'], ['Controlla i bordi', 'Niente deformazioni.']],
    uses: ['Una foto in una griglia.', 'Un testo in una colonna.', 'Un’immagine di copertina.'],
    drills: [
      { title: 'Cornice immagine', task: 'Inserisci una foto in una cornice e adattala senza distorcere.', checks: ['La foto è dentro', 'Le proporzioni sono corrette'], solution: 'Cornice → inserisci → adatta.' },
      { title: 'Cornice testo', task: 'Crea una cornice di testo e riempila con un paragrafo.', checks: ['Il testo va a capo', 'Non ci sono overflow'], solution: 'T → trascina → scrivi.' },
      { title: 'Ritaglio controllato', task: 'Cambia il ritaglio della foto senza spostare la cornice.', checks: ['La cornice è ferma', 'La foto è ritagliata'], solution: 'Doppio clic → sposta immagine.' },
    ],
    quizzes: [
      { question: 'Cosa fa una cornice immagine?', correct: 'Ritaglia o adatta la foto', wrong: ['Cambia il profilo colore', 'Crea livelli'], explanation: 'La cornice è un contenitore.' },
      { question: 'Come eviti la deformazione?', correct: 'Mantieni le proporzioni', wrong: ['Allunghi la foto', 'Riduci i dpi'], explanation: 'La deformazione rompe la credibilità.' },
    ],
    errors: [
      { title: 'Foto schiacciata', what: 'Trascini i lati della foto.', why: 'Le proporzioni si rompono.', fix: 'Usa Adatta con proporzioni.' },
      { title: 'Testo tagliato', what: 'Riduci la cornice senza controllare.', why: 'Il testo va in overflow.', fix: 'Ingrandisci o collega.' },
    ],
    project: 'griglia immagini', next: 'Colonne e flusso tra cornici.',
  },
  {
    id: 'af-w7l4', title: 'Colonne e flusso', subtitle: 'Il testo che scorre',
    objectives: ['Dividere in colonne', 'Collegare cornici', 'Controllare overflow'],
    concepts: ['colonne', 'flusso', 'overflow'],
    summary: 'Il testo in cornice può scorrere in più colonne e passare a un’altra cornice collegata. Il flusso è ciò che distingue Layout da un poster.',
    points: ['Le colonne si impostano nel paragrafo.', 'Le cornici collegate condividono il testo.', 'L’overflow indica testo non visibile.'],
    table: { rows: [['Colonne', 'Paragrafo → Colonne', '—'], ['Collegare', 'Clic sul triangolo', '—'], ['Overflow', 'Indicatore rosso', '—']] },
    trace: [['Crea la prima cornice', 'Scrivi o importa il testo.'], ['Imposta le colonne', 'Larghezza e gutter.'], ['Collega la seconda cornice', 'Il testo continua.'], ['Controlla l’overflow', 'Nessun testo nascosto.']],
    uses: ['Un articolo su due colonne.', 'Una brochure pieghevole.', 'Una rivista con testi lunghi.'],
    drills: [
      { title: 'Due colonne', task: 'Imposta una cornice a due colonne con gutter 5 mm.', checks: ['Ci sono due colonne', 'Il gutter è 5 mm'], solution: 'Paragrafo → colonne.' },
      { title: 'Collega cornici', task: 'Collega due cornici e fai fluire il testo.', checks: ['Il testo continua', 'Non ci sono duplicati'], solution: 'Clic sul triangolo → seconda cornice.' },
      { title: 'Risolvi overflow', task: 'Trova un testo in overflow e risolvilo.', checks: ['L’overflow è sparito', 'Il testo è completo'], solution: 'Ingrandisci o collega.' },
    ],
    quizzes: [
      { question: 'Cosa fa il flusso tra cornici?', correct: 'Continua il testo nella cornice successiva', wrong: ['Duplica il testo', 'Cambia font'], explanation: 'Le cornici collegate condividono lo stesso testo.' },
      { question: 'Cosa indica l’overflow?', correct: 'Testo non visibile', wrong: ['Un colore fuori profilo', 'Un font mancante'], explanation: 'L’indicatore segnala contenuto nascosto.' },
    ],
    errors: [
      { title: 'Testo duplicato', what: 'Crei due cornici con lo stesso testo.', why: 'Non è un flusso, sono due copie.', fix: 'Collega le cornici.' },
      { title: 'Testo nascosto', what: 'Ignori l’overflow.', why: 'In stampa manca una parte.', fix: 'Controlla gli indicatori.' },
    ],
    project: 'articolo a due colonne', next: 'Stili di testo e di oggetto.',
  },
  {
    id: 'af-w7l5', title: 'Stili nel Layout', subtitle: 'Testo e oggetti coerenti',
    objectives: ['Creare stili di paragrafo', 'Creare stili di oggetto', 'Aggiornare senza rompere'],
    concepts: ['stili testo', 'stili oggetto', 'coerenza'],
    summary: 'Gli stili di testo governano la tipografia; gli stili di oggetto governano cornici, colori e bordi. Insieme mantengono coerente l’intero documento.',
    points: ['Gli stili di paragrafo includono interlinea e colonne.', 'Gli stili di oggetto includono riempimento e bordo.', 'Modificare lo stile aggiorna tutti gli usi.'],
    table: { rows: [['Titolo', 'Stile paragrafo', '—'], ['Didascalia', 'Stile paragrafo', '—'], ['Cornice', 'Stile oggetto', '—']] },
    trace: [['Formatta un campione', 'Testo o cornice.'], ['Crea lo stile', 'Dagli un nome.'], ['Applicalo', 'A tutti gli elementi simili.'], ['Aggiorna', 'Modifica la definizione.']],
    uses: ['Una rivista con tre livelli di testo.', 'Un manuale con cornici uniformi.', 'Un preventivo coerente.'],
    drills: [
      { title: 'Stile titolo', task: 'Crea lo stile “Titolo rivista” e applicalo a tre titoli.', checks: ['Lo stile esiste', 'I tre titoli lo usano'], solution: 'Formatta → crea stile → applica.' },
      { title: 'Stile oggetto', task: 'Crea uno stile cornice con bordo sottile.', checks: ['Il bordo è coerente', 'Lo stile è applicato'], solution: 'Cornice → stile oggetto.' },
      { title: 'Aggiorna', task: 'Cambia il colore dello stile e verifica tutti gli usi.', checks: ['Tutti cambiano', 'Nessun override'], solution: 'Modifica stile → controlla.' },
    ],
    quizzes: [
      { question: 'Cosa contiene uno stile di oggetto?', correct: 'Riempimento, bordo e cornice', wrong: ['Solo il testo', 'Solo il colore'], explanation: 'Lo stile oggetto descrive il contenitore.' },
      { question: 'Perché usare stili?', correct: 'Per coerenza e aggiornamenti rapidi', wrong: ['Per ridurre i font', 'Per evitare le immagini'], explanation: 'Gli stili centralizzano le decisioni.' },
    ],
    errors: [
      { title: 'Stile non applicato', what: 'Formatti a mano una cornice.', why: 'Resta fuori dal sistema.', fix: 'Applica lo stile e rimuovi override.' },
      { title: 'Stili troppi', what: 'Crei un stile per ogni pagina.', why: 'La coerenza si perde.', fix: 'Riduci a pochi ruoli.' },
    ],
    project: 'sistema stili brochure', next: 'Tabelle e dati nel Layout.',
  },
  {
    id: 'af-w7l6', title: 'Tabelle', subtitle: 'Dati leggibili',
    objectives: ['Creare una tabella', 'Formattare righe e colonne', 'Importare dati'],
    concepts: ['tabelle', 'righe/colonne', 'import'],
    summary: 'Le tabelle organizzano dati in righe e colonne. Nel Layout possono usare stili, riempimenti alternati e import da file.',
    points: ['Imposta la tabella prima di riempirla.', 'Usa riempimenti alternati con moderazione.', 'Importa CSV o testo strutturato.'],
    table: { rows: [['Creare', 'Strumento Tabella', '—'], ['Formattare', 'Stile tabella', '—'], ['Importare', 'CSV/Testo', '—']] },
    trace: [['Disegna la tabella', 'Numero righe e colonne.'], ['Imposta intestazioni', 'Differenzia lo stile.'], ['Inserisci i dati', 'A mano o import.'], ['Controlla allineamento', 'Numeri a destra, testo a sinistra.']],
    uses: ['Un listino prezzi.', 'Un programma di eventi.', 'Un bilancio semplice.'],
    drills: [
      { title: 'Tabella 4×3', task: 'Crea una tabella con intestazione e tre righe.', checks: ['La tabella esiste', 'L’intestazione è distinta'], solution: 'Tabella → 4 colonne → 3 righe.' },
      { title: 'Allineamento numeri', task: 'Allinea i numeri a destra.', checks: ['I numeri sono a destra', 'Le colonne sono regolari'], solution: 'Seleziona colonna → allinea a destra.' },
      { title: 'Import', task: 'Importa tre righe da un CSV.', checks: ['I dati sono corretti', 'La tabella resta modificabile'], solution: 'Importa → CSV → verifica.' },
    ],
    quizzes: [
      { question: 'Come allinei i numeri in una tabella?', correct: 'A destra', wrong: ['Al centro', 'A sinistra'], explanation: 'Le cifre si confrontano meglio a destra.' },
      { question: 'Cosa controlli dopo un import?', correct: 'Separatori e righe vuote', wrong: ['Il colore del font', 'Il numero di pagine'], explanation: 'Gli import sbagliano spesso sui separatori.' },
    ],
    errors: [
      { title: 'Colonne irregolari', what: 'Usi larghezze diverse senza motivo.', why: 'La tabella sembra instabile.', fix: 'Uniforma o giustifica le larghezze.' },
      { title: 'Import illeggibile', what: 'Importi un CSV con separatore sbagliato.', why: 'Le colonne si fondono.', fix: 'Controlla il separatore e reimporta.' },
    ],
    project: 'listino del brand', next: 'Il mini-progetto: brochure a 4 pagine.',
  },
  {
    id: 'af-w7l7', title: 'Ripasso e mini-progetto: brochure', subtitle: 'Quattro pagine coerenti',
    objectives: ['Impostare pagine e master', 'Far fluire il testo', 'Esportare un PDF'],
    concepts: ['brochure', 'master', 'export'],
    summary: 'La brochure mette insieme pagine, master, cornici, colonne e stili. La coerenza tra pagine è più importante della singola pagina.',
    points: ['Usa una master per gli elementi comuni.', 'Collega le cornici di testo.', 'Esporta in PDF con bleed.'],
    table: { rows: [['Copertina', 'Pagina 1', '—'], ['Testo', 'Pagine 2–3', '—'], ['Contatti', 'Pagina 4', '—']] },
    trace: [['Imposta 4 pagine', 'Formato e orientamento.'], ['Crea la master', 'Fascetta e numero.'], ['Impagina i contenuti', 'Cornici e colonne.'], ['Esporta PDF', 'Bleed e font incorporati.']],
    uses: ['Una brochure per un servizio.', 'Un menu pieghevole.', 'Un programma di eventi.'],
    drills: [
      { title: 'Quattro pagine', task: 'Crea la brochure con master e numeri.', checks: ['Ci sono quattro pagine', 'La master è applicata'], solution: 'Pagine → master → applica.' },
      { title: 'Testo fluido', task: 'Collega le cornici delle pagine 2 e 3.', checks: ['Il testo continua', 'Nessun overflow'], solution: 'Clic sul triangolo → collega.' },
      { title: 'PDF', task: 'Esporta un PDF con bleed e font incorporati.', checks: ['Il bleed c’è', 'I font sono incorporati'], solution: 'PDF → stampa → bleed/font.' },
    ],
    quizzes: [
      { question: 'Cosa va nella master?', correct: 'Elementi ripetuti su più pagine', wrong: ['Il testo principale', 'Le foto uniche'], explanation: 'La master serve alla ripetizione.' },
      { question: 'Cosa controlli nel PDF?', correct: 'Bleed, font, immagini', wrong: ['Il numero di livelli', 'La dimensione del monitor'], explanation: 'Sono i parametri di stampa.' },
    ],
    errors: [
      { title: 'Pagine scollegate', what: 'Ogni pagina ha uno stile diverso.', why: 'Manca un sistema.', fix: 'Usa master e stili condivisi.' },
      { title: 'Testo che salta', what: 'Non colleghi le cornici.', why: 'Il flusso si interrompe.', fix: 'Collega e controlla l’overflow.' },
    ],
    project: 'brochure a 4 pagine', next: 'Lato professionale: griglia e gerarchia visiva.',
  },
  {
    id: 'af-w7l8', title: 'Griglia e gerarchia', subtitle: 'La struttura invisibile',
    objectives: ['Costruire una griglia', 'Usare la gerarchia visiva', 'Mantenere coerenza tra pagine'],
    concepts: ['griglia', 'gerarchia', 'coerenza'],
    summary: 'La griglia allinea colonne e margini; la gerarchia decide cosa si legge prima. Sono strumenti di chiarezza, non regole estetiche.',
    points: ['Scegli una griglia semplice.', 'Usa pochi livelli tipografici.', 'Ripeti la struttura tra pagine.'],
    table: { rows: [['Colonne', '3 o 4', '—'], ['Margini', '15–20 mm', '—'], ['Gutter', '4–6 mm', '—']] },
    trace: [['Definisci i margini', 'La pagina respira.'], ['Crea le colonne', 'Allinea i contenuti.'], ['Stabilisci i livelli', 'Titolo, testo, didascalia.'], ['Verifica su più pagine', 'La struttura regge?']],
    uses: ['Una rivista.', 'Un report.', 'Un portfolio.'],
    drills: [
      { title: 'Griglia a 3 colonne', task: 'Crea una griglia con gutter 5 mm.', checks: ['Ci sono tre colonne', 'Il gutter è coerente'], solution: 'Margini → colonne → gutter.' },
      { title: 'Gerarchia', task: 'Assegna tre livelli tipografici e verificali a distanza.', checks: ['Il titolo domina', 'Il corpo è leggibile'], solution: 'Stili → confronta.' },
      { title: 'Coerenza', task: 'Confronta due pagine e verifica gli stessi margini.', checks: ['I margini coincidono', 'Gli stili sono gli stessi'], solution: 'Guide → confronta.' },
    ],
    quizzes: [
      { question: 'A cosa serve la griglia?', correct: 'Ad allineare e dare ritmo', wrong: ['A decorare', 'A sostituire gli stili'], explanation: 'La griglia è struttura.' },
      { question: 'Quanti livelli tipografici?', correct: 'Pochi e chiari', wrong: ['Almeno dieci', 'Uno solo'], explanation: 'La gerarchia ha bisogno di contrasto, non di caos.' },
    ],
    errors: [
      { title: 'Griglia invisibile', what: 'Allinei a occhio.', why: 'Le pagine sembrano diverse.', fix: 'Usa guide e colonne.' },
      { title: 'Troppo contrasto', what: 'Usi cinque dimensioni diverse.', why: 'L’occhio non sa dove guardare.', fix: 'Riduci a tre livelli.' },
    ],
    project: 'griglia della rivista', next: 'La Settimana 8 porta il Layout alla pubblicazione.',
  },
];

export const week07 = affWeek({
  number: 7,
  title: 'Layout: impaginazione base',
  subtitle: 'Pagine che raccontano',
  description:
    'Pagine, master, cornici, colonne, stili e tabelle: le basi dell’impaginazione professionale, con una brochure completa come progetto.',
  goals: ['Gestire pagine e master', 'Far fluire il testo', 'Esportare una brochure'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit · brochure',
    brief: 'Il brand kit acquisisce una brochure a 4 pagine con master, stili e testo fluido.',
    deliverable: 'PDF a 4 pagine con bleed, font incorporati e griglia coerente.',
    milestones: ['Master e pagine', 'Testo collegato', 'PDF verificato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Griglia', 'Gerarchia', 'Coerenza editoriale'],
    exercise: 'Confronta due pagine della brochure e verifica margini, stili e allineamenti.',
  },
});
