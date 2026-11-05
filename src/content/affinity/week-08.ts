import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-08';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w8l1', title: 'Sommario e segnalibri', subtitle: 'Navigare un documento lungo',
    objectives: ['Creare un sommario automatico', 'Aggiungere segnalibri', 'Aggiornare l’indice'],
    concepts: ['sommario', 'segnalibri', 'PDF'],
    summary: 'Un sommario automatico legge gli stili di titolo e crea l’indice. I segnalibri aggiungono navigazione nel PDF.',
    points: ['Gli stili di titolo alimentano il sommario.', 'L’indice va aggiornato dopo le modifiche.', 'I segnalibri rendono il PDF navigabile.'],
    table: { rows: [['Sommario', 'Layout → Sommario', '—'], ['Segnalibro', 'PDF → Segnalibri', '—'], ['Aggiorna', 'Seleziona → Aggiorna', '—']] },
    trace: [['Applica gli stili ai titoli', 'Senza stili non c’è indice.'], ['Inserisci il sommario', 'Scegli i livelli.'], ['Aggiorna dopo le modifiche', 'L’indice non è statico.'], ['Esporta con segnalibri', 'Il PDF diventa navigabile.']],
    uses: ['Una rivista di 20 pagine.', 'Un manuale tecnico.', 'Un report annuale.'],
    drills: [
      { title: 'Sommario automatico', task: 'Crea un sommario da tre titoli con stile.', checks: ['Il sommario elenca i titoli', 'I numeri di pagina sono corretti'], solution: 'Stili → Sommario → inserisci.' },
      { title: 'Aggiorna', task: 'Aggiungi un titolo e aggiorna il sommario.', checks: ['Il nuovo titolo appare', 'La numerazione è corretta'], solution: 'Seleziona → Aggiorna sommario.' },
      { title: 'Segnalibri', task: 'Esporta un PDF con segnalibri.', checks: ['I segnalibri ci sono', 'La navigazione funziona'], solution: 'PDF → includi segnalibri.' },
    ],
    quizzes: [
      { question: 'Cosa alimenta il sommario automatico?', correct: 'Gli stili di titolo', wrong: ['I colori', 'Le immagini'], explanation: 'Il sommario legge la struttura, non la formattazione manuale.' },
      { question: 'Cosa fai dopo aver aggiunto pagine?', correct: 'Aggiorni il sommario', wrong: ['Lo cancelli', 'Cambi font'], explanation: 'La numerazione va ricalcolata.' },
    ],
    errors: [
      { title: 'Sommario vuoto', what: 'I titoli non hanno stili.', why: 'Non c’è struttura da leggere.', fix: 'Applica stili di paragrafo.' },
      { title: 'Numeri sbagliati', what: 'Non aggiorni dopo le modifiche.', why: 'L’indice è una fotografia.', fix: 'Aggiorna prima dell’export.' },
    ],
    project: 'indice della rivista', next: 'Testo su tracciato e testo artistico nel Layout.',
  },
  {
    id: 'af-w8l2', title: 'Testo e tracciati nel Layout', subtitle: 'Movimento controllato',
    objectives: ['Applicare testo a un tracciato', 'Usare testo artistico nelle pagine', 'Mantenere la leggibilità'],
    concepts: ['tracciato', 'testo artistico', 'leggibilità'],
    summary: 'Nel Layout puoi usare testo su tracciato per titoli e badge, e testo artistico per elementi grafici. Il corpo del documento resta in cornici.',
    points: ['Il testo su tracciato è per titoli brevi.', 'Il testo artistico non va a capo.', 'Controlla sempre la leggibilità.'],
    table: { rows: [['Badge', 'Tracciato', '—'], ['Titolo', 'Artistico', '—'], ['Paragrafo', 'Cornice', '—']] },
    trace: [['Disegna il tracciato', 'Curva ampia.'], ['Applica il testo', 'Regola offset.'], ['Controlla la curva', 'Niente deformazioni.'], ['Allinea alla griglia', 'Il testo resta parte del layout.']],
    uses: ['Un titolo curvo su una copertina.', 'Un badge circolare.', 'Una fascetta decorativa.'],
    drills: [
      { title: 'Titolo curvo', task: 'Crea un titolo su un arco leggibile.', checks: ['Il testo segue l’arco', 'È leggibile'], solution: 'Arco → testo su tracciato → offset.' },
      { title: 'Badge', task: 'Crea un badge circolare con testo centrato.', checks: ['Il testo è centrato', 'Nessuna lettera tagliata'], solution: 'Cerchio → testo → offset.' },
      { title: 'Griglia', task: 'Allinea il titolo curvo alla griglia della pagina.', checks: ['Il titolo è allineato', 'La pagina resta coerente'], solution: 'Guide → allinea.' },
    ],
    quizzes: [
      { question: 'Quale testo per un paragrafo?', correct: 'In cornice', wrong: ['Artistico', 'Su tracciato'], explanation: 'Solo la cornice gestisce il flusso.' },
      { question: 'Cosa regola l’offset?', correct: 'La distanza dal tracciato', wrong: ['Il colore', 'Il font'], explanation: 'L’offset è la distanza dalla linea.' },
    ],
    errors: [
      { title: 'Titolo illeggibile', what: 'Usi una curva stretta.', why: 'Le lettere si comprimono.', fix: 'Allarga la curva o accorcia il testo.' },
      { title: 'Testo fuori griglia', what: 'Posizioni a occhio.', why: 'La pagina perde coerenza.', fix: 'Usa guide e allineamento.' },
    ],
    project: 'copertina della rivista', next: 'Immagini: risoluzione, link e preflight.',
  },
  {
    id: 'af-w8l3', title: 'Immagini e preflight', subtitle: 'Niente sorprese in stampa',
    objectives: ['Distinguere link e incorporamento', 'Controllare la risoluzione effettiva', 'Eseguire il preflight'],
    concepts: ['link/embed', 'risoluzione', 'preflight'],
    summary: 'Le immagini possono essere collegate o incorporate. Il preflight controlla risoluzione, font, colori e bleed prima dell’export.',
    points: ['Link = file esterno; embed = dentro il documento.', 'La risoluzione effettiva dipende dalla dimensione di stampa.', 'Il preflight è un controllo, non una formalità.'],
    table: { rows: [['Immagine esterna', 'Link', '—'], ['File autonomo', 'Embed', '—'], ['Controllo', 'Preflight', '—']] },
    trace: [['Inserisci le immagini', 'Controlla la risoluzione.'], ['Scegli link o embed', 'In base alla consegna.'], ['Esegui il preflight', 'Leggi gli avvisi.'], ['Correggi e riesporta', 'Ripeti il controllo.']],
    uses: ['Un catalogo con molte foto.', 'Una rivista inviata in tipografia.', 'Un PDF per un cliente.'],
    drills: [
      { title: 'Risoluzione effettiva', task: 'Controlla un’immagine e verifica i dpi alla dimensione d’uso.', checks: ['Ho letto i dpi effettivi', 'So se è sufficiente'], solution: 'Immagine → info → dpi.' },
      { title: 'Preflight', task: 'Esegui il preflight e annota tre avvisi.', checks: ['Ho eseguito il controllo', 'Ho annotato gli avvisi'], solution: 'Preflight → leggi.' },
      { title: 'Correzione', task: 'Sostituisci un’immagine a bassa risoluzione.', checks: ['La nuova immagine è adatta', 'Il preflight è pulito'], solution: 'Sostituisci → ricontrolla.' },
    ],
    quizzes: [
      { question: 'Cosa controlla il preflight?', correct: 'Risoluzione, font, colori, bleed', wrong: ['Il numero di livelli', 'La marca del monitor'], explanation: 'Il preflight simula i rischi di stampa.' },
      { question: 'Cosa significa link?', correct: 'L’immagine resta un file esterno', wrong: ['È incorporata nel PDF', 'È convertita in vettore'], explanation: 'Il link richiede che il file sia disponibile.' },
    ],
    errors: [
      { title: 'Immagine mancante', what: 'Sposti il file collegato.', why: 'Il link si rompe.', fix: 'Ricollega o incorpora.' },
      { title: 'Bassa risoluzione', what: 'Usi un’immagine da 72 dpi su A3.', why: 'In stampa è sfocata.', fix: 'Sostituisci con una versione adatta.' },
    ],
    project: 'controllo immagini rivista', next: 'PDF per la stampa: profili, bleed e crocini.',
  },
  {
    id: 'af-w8l4', title: 'PDF per la stampa', subtitle: 'Il file che la tipografia accetta',
    objectives: ['Esportare un PDF di stampa', 'Includere bleed e crocini', 'Scegliere il profilo corretto'],
    concepts: ['PDF stampa', 'bleed', 'crocini'],
    summary: 'Un PDF di stampa contiene bleed, crocini, font incorporati e profilo colore dichiarato. È il file che la tipografia usa per produrre.',
    points: ['Scegli il preset Stampa.', 'Includi bleed e crocini se richiesti.', 'Verifica il PDF su un altro dispositivo.'],
    table: { rows: [['PDF stampa', 'Preset Stampa', '—'], ['Bleed', '3 mm', '—'], ['Crocini', 'Opzione PDF', '—']] },
    trace: [['Controlla il documento', 'Bleed e profilo.'], ['Esporta con preset Stampa', 'Non usare preset Web.'], ['Apri il PDF', 'Verifica bleed e font.'], ['Consegna con note', 'Dichiara profilo e formato.']],
    uses: ['Un volantino per la tipografia.', 'Una rivista.', 'Un packaging.'],
    drills: [
      { title: 'Export stampa', task: 'Esporta un PDF con bleed e crocini.', checks: ['Il bleed c’è', 'I crocini ci sono'], solution: 'PDF → Stampa → bleed/crocini.' },
      { title: 'Verifica font', task: 'Controlla che i font siano incorporati.', checks: ['I font sono incorporati', 'Il testo non cambia'], solution: 'PDF → proprietà → font.' },
      { title: 'Prova su altro dispositivo', task: 'Apri il PDF su un secondo dispositivo.', checks: ['Il layout è identico', 'I colori sono coerenti'], solution: 'Copia → apri → confronta.' },
    ],
    quizzes: [
      { question: 'Quale preset per la tipografia?', correct: 'Stampa', wrong: ['Web', 'Schermo'], explanation: 'Il preset Stampa include bleed e profilo.' },
      { question: 'Cosa sono i crocini?', correct: 'Riferimenti per il taglio', wrong: ['Decorazioni', 'Marcatori di colore'], explanation: 'Indicano dove tagliare.' },
    ],
    errors: [
      { title: 'Preset Web per la stampa', what: 'Esporti con preset Web.', why: 'Mancano bleed e profilo.', fix: 'Riesporta con preset Stampa.' },
      { title: 'Font non incorporati', what: 'Disattivi l’incorporamento.', why: 'Il testo può cambiare.', fix: 'Attiva l’incorporamento.' },
    ],
    project: 'PDF della brochure', next: 'ePub: esportare per ebook.',
  },
  {
    id: 'af-w8l5', title: 'ePub e digitale', subtitle: 'Dal Layout all’ebook',
    objectives: ['Esportare un ePub', 'Controllare il flusso', 'Evitare layout fissi'],
    concepts: ['ePub', 'riflusso', 'digitale'],
    summary: 'Un ePub è un ebook rifluibile: il testo si adatta al lettore. I layout fissi e le colonne non funzionano bene.',
    points: ['Usa stili semplici e testo in cornice.', 'Evita elementi assoluti.', 'Controlla su un lettore reale.'],
    table: { rows: [['ePub', 'Esporta → ePub', '—'], ['Copertina', 'Immagine separata', '—'], ['Test', 'Lettore ePub', '—']] },
    trace: [['Semplifica il layout', 'Una colonna.'], ['Controlla gli stili', 'Titoli e corpo.'], ['Esporta ePub', 'Includi copertina.'], ['Testa su lettore', 'Navigazione e immagini.']],
    uses: ['Un saggio digitale.', 'Un manuale.', 'Una guida scaricabile.'],
    drills: [
      { title: 'Versione rifluibile', task: 'Crea una versione a una colonna per ePub.', checks: ['Il testo è in una colonna', 'Gli stili sono semplici'], solution: 'Duplica → una colonna → esporta.' },
      { title: 'Copertina', task: 'Aggiungi una copertina all’ePub.', checks: ['La copertina appare', 'Le proporzioni sono corrette'], solution: 'Esporta → copertina.' },
      { title: 'Test', task: 'Apri l’ePub in un lettore e controlla la navigazione.', checks: ['I capitoli si navigano', 'Le immagini si vedono'], solution: 'Lettore → indice → pagine.' },
    ],
    quizzes: [
      { question: 'Cosa significa rifluibile?', correct: 'Il testo si adatta al lettore', wrong: ['Il layout è fisso', 'Le pagine sono immagini'], explanation: 'L’ePub adatta il testo allo schermo.' },
      { question: 'Cosa evitare in ePub?', correct: 'Layout assoluti e colonne multiple', wrong: ['Gli stili di testo', 'Le immagini'], explanation: 'Il riflusso rompe i layout rigidi.' },
    ],
    errors: [
      { title: 'Testo tagliato', what: 'Mantieni cornici fisse.', why: 'Il lettore non le rispetta.', fix: 'Usa testo rifluibile.' },
      { title: 'Immagini enormi', what: 'Inserisci immagini da stampa.', why: 'L’ePub diventa pesante.', fix: 'Ridimensiona per lo schermo.' },
    ],
    project: 'estratto ePub', next: 'Collaborazione e kit per Canva.',
  },
  {
    id: 'af-w8l6', title: 'Collaborazione e Canva', subtitle: 'Portare il lavoro fuori',
    objectives: ['Esportare per Canva', 'Preparare un kit', 'Gestire i feedback'],
    concepts: ['collaborazione', 'Canva', 'feedback'],
    summary: 'Affinity e Canva possono convivere: esporti formati puliti e li importi in Canva per la condivisione. Il file di lavoro resta in Affinity.',
    points: ['Esporta PNG/PDF per Canva.', 'Mantieni il master in Affinity.', 'Raccogli i feedback in un unico elenco.'],
    table: { rows: [['Bozza', 'PNG', '—'], ['Stampa', 'PDF', '—'], ['Modifica', '`.af`', '—']] },
    trace: [['Esporta la versione condivisibile', 'PNG o PDF.'], ['Importa in Canva', 'Come immagine o PDF.'], ['Raccogli i feedback', 'Un elenco, non messaggi sparsi.'], ['Aggiorna il master', 'Torna in Affinity.']],
    uses: ['Un team che commenta in Canva.', 'Un cliente che non ha Affinity.', 'Un social gestito da altri.'],
    drills: [
      { title: 'Export per Canva', task: 'Esporta un PNG pulito e importalo in Canva.', checks: ['Il PNG è nitido', 'L’import funziona'], solution: 'Esporta PNG → Canva → carica.' },
      { title: 'Elenco feedback', task: 'Raccogli tre commenti in un unico elenco.', checks: ['I feedback sono ordinati', 'So chi li ha scritti'], solution: 'Documento → elenco → priorità.' },
      { title: 'Aggiornamento', task: 'Modifica il master e riesporta.', checks: ['Il master è aggiornato', 'La versione condivisa è nuova'], solution: 'Modifica `.af` → esporta.' },
    ],
    quizzes: [
      { question: 'Dove vive il master?', correct: 'In Affinity', wrong: ['In Canva', 'Nel PDF'], explanation: 'Canva è per la condivisione, non per il master.' },
      { question: 'Come raccogli i feedback?', correct: 'In un elenco unico e prioritizzato', wrong: ['In chat sparse', 'A voce'], explanation: 'Un elenco evita di perdere richieste.' },
    ],
    errors: [
      { title: 'Master solo in Canva', what: 'Modifichi tutto in Canva.', why: 'Perdi controllo e qualità.', fix: 'Mantieni il master in Affinity.' },
      { title: 'Feedback dispersi', what: 'Segui commenti in tre canali.', why: 'Alcune richieste si perdono.', fix: 'Centralizza in un elenco.' },
    ],
    project: 'consegna per il team', next: 'Il mini-progetto: rivista di 8 pagine.',
  },
  {
    id: 'af-w8l7', title: 'Ripasso e mini-progetto: rivista', subtitle: 'Otto pagine che tengono',
    objectives: ['Impostare una rivista', 'Usare sommario e master', 'Esportare per stampa'],
    concepts: ['rivista', 'sommario', 'stampa'],
    summary: 'La rivista mette insieme master, griglia, stili, immagini e sommario. La coerenza tra pagine è il risultato principale.',
    points: ['Master per testata e numeri.', 'Sommario automatico.', 'Preflight prima del PDF.'],
    table: { rows: [['Copertina', 'Pagina 1', '—'], ['Articoli', 'Pagine 2–7', '—'], ['Contatti', 'Pagina 8', '—']] },
    trace: [['Imposta 8 pagine e master', 'Testata e numeri.'], ['Crea la griglia', 'Colonne e margini.'], ['Impagina e collega', 'Testo e immagini.'], ['Preflight e PDF', 'Controlla e consegna.']],
    uses: ['Una rivista indipendente.', 'Un report annuale.', 'Un catalogo prodotti.'],
    drills: [
      { title: 'Otto pagine', task: 'Crea la struttura con master e griglia.', checks: ['Ci sono otto pagine', 'La master è applicata'], solution: 'Pagine → master → griglia.' },
      { title: 'Sommario', task: 'Inserisci un sommario automatico.', checks: ['Il sommario elenca i titoli', 'La numerazione è corretta'], solution: 'Stili → sommario → aggiorna.' },
      { title: 'Preflight', task: 'Esegui il preflight e correggi gli avvisi.', checks: ['Il preflight è pulito', 'Il PDF è pronto'], solution: 'Preflight → correggi → esporta.' },
    ],
    quizzes: [
      { question: 'Cosa rende coerente una rivista?', correct: 'Master, griglia e stili condivisi', wrong: ['Molte immagini', 'Font diversi per pagina'], explanation: 'La struttura comune tiene insieme le pagine.' },
      { question: 'Cosa fai prima del PDF?', correct: 'Preflight', wrong: ['Cambi font', 'Cancelli i livelli'], explanation: 'Il preflight intercetta i problemi.' },
    ],
    errors: [
      { title: 'Pagine diverse', what: 'Cambi margini pagina per pagina.', why: 'La rivista sembra improvvisata.', fix: 'Usa un’unica griglia.' },
      { title: 'Sommario fermo', what: 'Non aggiorni dopo le modifiche.', why: 'I numeri non corrispondono.', fix: 'Aggiorna prima dell’export.' },
    ],
    project: 'rivista di 8 pagine', next: 'Lato professionale: tipografia, proofing e stampa.',
  },
  {
    id: 'af-w8l8', title: 'Stampa professionale', subtitle: 'Dialogare con la tipografia',
    objectives: ['Preparare un file accettabile', 'Gestire proof e revisioni', 'Capire i tempi di stampa'],
    concepts: ['tipografia', 'proof', 'stampa'],
    summary: 'La stampa professionale è un dialogo: file corretto, proof approvato, tempi rispettati. Il PDF è il contratto tecnico.',
    points: ['Chiedi le specifiche alla tipografia.', 'Approva un proof prima della tiratura.', 'Archivia file e PDF approvati.'],
    table: { rows: [['Specifiche', 'Formato, carta, bleed', '—'], ['Proof', 'PDF o prova fisica', '—'], ['Consegna', 'PDF + font', '—']] },
    trace: [['Chiedi le specifiche', 'Non indovinare.'], ['Prepara il PDF', 'Bleed, profilo, font.'], ['Approva il proof', 'Controlla colori e taglio.'], ['Archivia', 'File e PDF finale.']],
    uses: ['Un volantino per un evento.', 'Un packaging.', 'Una rivista stampata.'],
    drills: [
      { title: 'Specifiche', task: 'Scrivi tre domande tecniche per la tipografia.', checks: ['Le domande sono precise', 'Riguardano formato e colore'], solution: 'Formato? Carta? Bleed? Profilo?' },
      { title: 'Proof', task: 'Confronta un proof con il PDF e annota le differenze.', checks: ['Ho confrontato', 'Ho annotato'], solution: 'Affianca → controlla colore e taglio.' },
      { title: 'Archivio', task: 'Crea una cartella con PDF approvato e file di lavoro.', checks: ['Ci sono entrambi', 'I nomi sono chiari'], solution: 'Cartella → PDF + `.af`.' },
    ],
    quizzes: [
      { question: 'Cosa chiedi alla tipografia?', correct: 'Specifiche di formato, carta e bleed', wrong: ['Un logo nuovo', 'Un font gratis'], explanation: 'Le specifiche evitano rifacimenti.' },
      { question: 'A cosa serve il proof?', correct: 'A verificare prima della tiratura', wrong: ['A decorare', 'A sostituire il PDF'], explanation: 'Il proof è l’ultimo controllo.' },
    ],
    errors: [
      { title: 'Specifiche inventate', what: 'Invii un formato senza chiedere.', why: 'La tipografia deve rifare.', fix: 'Chiedi prima di produrre.' },
      { title: 'Proof non approvato', what: 'Dai il via senza controllare.', why: 'Gli errori diventano definitivi.', fix: 'Approva per iscritto.' },
    ],
    project: 'consegna tipografia', next: 'La Settimana 9 entra nell’AI di Canva e nella produttività.',
  },
];

export const week08 = affWeek({
  number: 8,
  title: 'Layout: avanzato e pubblicazione',
  subtitle: 'Dal documento al PDF',
  description:
    'Sommari, testo su tracciato, immagini, preflight, PDF di stampa ed ePub: portare un layout fuori dall’app senza sorprese.',
  goals: ['Creare sommari e segnalibri', 'Controllare immagini e preflight', 'Consegnare PDF pronti'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit · rivista',
    brief: 'Il brand kit acquisisce una rivista di 8 pagine con sommario, master e PDF di stampa.',
    deliverable: 'Rivista di 8 pagine, PDF con bleed e preflight pulito.',
    milestones: ['Sommario automatico', 'Immagini controllate', 'PDF approvato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Preflight', 'Proofing', 'Rapporto con la tipografia'],
    exercise: 'Scrivi le specifiche di stampa e prepara un PDF con bleed e font incorporati.',
  },
});
