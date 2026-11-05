import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-05';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w5l1', title: 'Vettore o Pixel?', subtitle: 'Scegliere il modello giusto',
    objectives: ['Distinguere i due modelli', 'Scegliere lo Studio per il compito', 'Convertire senza perdere qualità'],
    concepts: ['vettore/pixel', 'rasterizzazione', 'scelta'],
    summary: 'Vettore descrive forme, Pixel descrive una griglia di colori. La scelta dipende dal contenuto, non dalla moda.',
    points: ['Logo e icone: vettore.', 'Foto e texture: pixel.', 'La rasterizzazione è irreversibile.'],
    table: { rows: [['Logo', 'Vettore', '—'], ['Foto', 'Pixel', '—'], ['Testo', 'Vettore', '—']] },
    trace: [['Chiediti cosa stai modificando', 'Forma o immagine?'], ['Scegli lo Studio', 'V o P.'], ['Evita conversioni inutili', 'Rasterizzare perde qualità.'], ['Esporta il formato giusto', 'SVG o PNG.']],
    uses: ['Un logo va in Vettore.', 'Una foto profilo va in Pixel.', 'Un poster combina entrambi.'],
    drills: [
      { title: 'Classifica', task: 'Elenca cinque elementi e assegna Vettore o Pixel.', checks: ['Ho classificato cinque elementi', 'So motivare la scelta'], solution: 'Logo V, foto P, icona V, texture P, testo V.' },
      { title: 'Stesso oggetto, due Studios', task: 'Apri una forma in Vettore e una foto in Pixel e confronta gli strumenti.', checks: ['Ho visto i due set', 'So quale usare per cosa'], solution: 'V → forma; P → foto.' },
      { title: 'Rasterizza e osserva', task: 'Rasterizza una forma e ingrandiscila al 400%.', checks: ['Ho rasterizzato una copia', 'Ho visto la perdita di qualità'], solution: 'Duplica → rasterizza → zoom.' },
    ],
    quizzes: [
      { question: 'Un logo modificabile deve essere…', correct: 'Vettoriale', wrong: ['Raster', 'Un PNG a 72 dpi'], explanation: 'Il vettore resta nitido a ogni dimensione.' },
      { question: 'Cosa perdi rasterizzando?', correct: 'La scalabilità senza perdita', wrong: ['Il colore', 'Il nome del file'], explanation: 'La griglia fissa i pixel.' },
    ],
    errors: [
      { title: 'Logo rasterizzato troppo presto', what: 'Converti il logo in PNG e poi lo ingrandisci.', why: 'I pixel non si inventano.', fix: 'Torna al vettoriale e riesporta.' },
      { title: 'Foto in Vettore', what: 'Tracci una foto dettagliata.', why: 'Il risultato è pesante e approssimativo.', fix: 'Usa Pixel per le foto.' },
    ],
    project: 'scheda “vettore o pixel”', next: 'Aprire immagini e RAW senza rovinare i dati.',
  },
  {
    id: 'af-w5l2', title: 'Aprire immagini e RAW', subtitle: 'Profili, formati, dati',
    objectives: ['Aprire un RAW', 'Scegliere il profilo colore', 'Lavorare in modo non distruttivo'],
    concepts: ['RAW', 'profilo colore', 'importazione'],
    summary: 'Un RAW contiene più dati di un JPG. Il profilo colore dice come interpretare quei dati; l’importazione decide cosa vede Affinity.',
    points: ['Il RAW va sviluppato, non “aperto e salvato”.', 'Il profilo va scelto prima di correggere.', 'Lavora su copie e livelli.'],
    table: { rows: [['RAW', 'Sviluppo', '—'], ['JPG', 'Apertura diretta', '—'], ['Profilo', 'Documento', 'sRGB/Adobe RGB']] },
    trace: [['Apri il file', 'Scegli il profilo corretto.'], ['Sviluppa il RAW', 'Esposizione e bilanciamento.'], ['Porta in Pixel', 'Inizia il ritocco.'], ['Salva il progetto', 'Mantieni i dati.']],
    uses: ['Una foto di matrimonio in RAW.', 'Un prodotto su sfondo neutro.', 'Un ritratto da correggere.'],
    drills: [
      { title: 'Apri un RAW', task: 'Apri un RAW e regola esposizione e bilanciamento.', checks: ['Il file è RAW', 'Ho regolato i due parametri'], solution: 'Apri → sviluppo → esposizione/white balance.' },
      { title: 'Profilo corretto', task: 'Imposta sRGB per il web e verifica il documento.', checks: ['Il profilo è sRGB', 'Il file è pronto per lo schermo'], solution: 'Documento → profilo → sRGB.' },
      { title: 'Copia di lavoro', task: 'Duplica il livello prima di correggere.', checks: ['Esiste una copia', 'L’originale è intatto'], solution: 'Ctrl/Cmd + J.' },
    ],
    quizzes: [
      { question: 'Perché lavorare su un RAW?', correct: 'Contiene più dati per la correzione', wrong: ['È più leggero', 'Non ha bisogno di profilo'], explanation: 'Il RAW conserva più informazione.' },
      { question: 'Quale profilo per il web?', correct: 'sRGB', wrong: ['CMYK', 'Un profilo RAW'], explanation: 'sRGB è lo standard dei browser.' },
    ],
    errors: [
      { title: 'RAW salvato come JPG subito', what: 'Esporti in JPG prima di correggere.', why: 'Perdi dati e margine di intervento.', fix: 'Sviluppa il RAW e salva il progetto.' },
      { title: 'Colori slavati', what: 'Lavori in CMYK per il web.', why: 'Il browser interpreta in RGB.', fix: 'Converti in sRGB prima dell’export.' },
    ],
    project: 'foto pronta per il ritocco', next: 'Selezioni precise: la base di ogni ritocco.',
  },
  {
    id: 'af-w5l3', title: 'Selezioni', subtitle: 'Rettangolo, lazo, bacchetta, selezione rapida',
    objectives: ['Scegliere lo strumento di selezione', 'Aggiungere e sottrarre aree', 'Sfumare il bordo'],
    concepts: ['selezione', 'sottrazione', 'sfumatura'],
    summary: 'Una selezione isola una parte dell’immagine. Gli strumenti cambiano per forma e contrasto; la sfumatura decide quanto il passaggio è netto.',
    points: ['Lazo per forme libere.', 'Bacchetta per colori uniformi.', 'Selezione rapida per bordi complessi.'],
    table: { rows: [['Forma geometrica', 'Rettangolo/ellisse', 'M'], ['Contorno libero', 'Lazo', 'L'], ['Colore uniforme', 'Bacchetta magica', 'W']] },
    trace: [['Scegli lo strumento', 'In base al bordo.'], ['Aggiungi o sottrai', 'Shift/Alt.'], ['Sfuma il bordo', 'Evita tagli netti.'], ['Salva la selezione', 'La riuserai.']],
    uses: ['Isolare un prodotto.', 'Scontornare un ritratto.', 'Correggere solo il cielo.'],
    drills: [
      { title: 'Selezione geometrica', task: 'Seleziona un’area rettangolare e sfumala di 4 px.', checks: ['La selezione esiste', 'La sfumatura è 4 px'], solution: 'M → trascina → sfumatura 4.' },
      { title: 'Aggiungi e sottrai', task: 'Unisci due selezioni e rimuovi un’area.', checks: ['Ho aggiunto', 'Ho sottratto'], solution: 'Shift per aggiungere, Alt per sottrarre.' },
      { title: 'Bacchetta', task: 'Seleziona uno sfondo uniforme con la bacchetta.', checks: ['Lo sfondo è selezionato', 'Il soggetto è escluso'], solution: 'W → clic sullo sfondo → tolleranza.' },
    ],
    quizzes: [
      { question: 'Quale strumento per uno sfondo uniforme?', correct: 'Bacchetta magica', wrong: ['Lazo', 'Pennello'], explanation: 'La bacchetta seleziona per similarità di colore.' },
      { question: 'A cosa serve la sfumatura?', correct: 'A rendere morbido il bordo della selezione', wrong: ['A cambiare colore', 'A ritagliare'], explanation: 'La sfumatura evita tagli netti.' },
    ],
    errors: [
      { title: 'Bordo netto', what: 'Applichi una correzione senza sfumare.', why: 'Il confine della selezione si vede.', fix: 'Sfuma di 2–6 px.' },
      { title: 'Selezione che non prende tutto', what: 'Usi la bacchetta con tolleranza bassa.', why: 'I pixel simili restano esclusi.', fix: 'Aumenta la tolleranza o aggiungi aree.' },
    ],
    project: 'soggetto isolato', next: 'Le maschere: selezioni non distruttive e modificabili.',
  },
  {
    id: 'af-w5l4', title: 'Maschere', subtitle: 'Nascondere senza cancellare',
    objectives: ['Creare una maschera di livello', 'Dipingere sulla maschera', 'Correggere un bordo sbagliato'],
    concepts: ['maschera', 'bianco/nero', 'non distruttivo'],
    summary: 'Una maschera nasconde parti di un livello senza cancellarle: bianco mostra, nero nasconde, grigio è trasparenza parziale.',
    points: ['La maschera è un canale in scala di grigi.', 'Dipingi con il pennello per correggere.', 'La maschera non distrugge i pixel.'],
    table: { rows: [['Nascondere', 'Maschera nera', '—'], ['Mostrare', 'Bianco', '—'], ['Sfumare', 'Grigio', '—']] },
    trace: [['Seleziona il livello', 'La maschera si applica a quel livello.'], ['Aggiungi maschera', 'Vuota o da selezione.'], ['Dipingi in bianco/nero', 'Correggi il confine.'], ['Controlla al 100%', 'Il bordo deve essere credibile.']],
    uses: ['Scontornare un ritratto.', 'Unire due foto.', 'Nascondere un’etichetta.'],
    drills: [
      { title: 'Maschera da selezione', task: 'Seleziona un soggetto e crea una maschera.', checks: ['La maschera esiste', 'Il soggetto è visibile'], solution: 'Selezione → Maschera → rivela selezione.' },
      { title: 'Correggi col pennello', task: 'Ripristina una parte nascosta dipingendo di bianco.', checks: ['La parte è tornata', 'Il bordo è morbido'], solution: 'Maschera → pennello bianco → dipingi.' },
      { title: 'Nascondi tutto', task: 'Riempi la maschera di nero e poi rivela solo il centro.', checks: ['Il livello è nascosto', 'Il centro è visibile'], solution: 'Maschera → nero → pennello bianco.' },
    ],
    quizzes: [
      { question: 'Cosa fa il nero su una maschera?', correct: 'Nasconde', wrong: ['Mostra', 'Colora'], explanation: 'Bianco mostra, nero nasconde.' },
      { question: 'Perché usare una maschera invece di cancellare?', correct: 'Perché è reversibile', wrong: ['Perché è più veloce', 'Perché riduce il file'], explanation: 'La maschera conserva i pixel originali.' },
    ],
    errors: [
      { title: 'Maschera sul livello sbagliato', what: 'Dipingi ma non succede nulla.', why: 'La maschera attiva è su un altro livello.', fix: 'Seleziona la maschera giusta nel pannello.' },
      { title: 'Bordo dentellato', what: 'Usi un pennello duro al 100%.', why: 'Il confine è troppo netto.', fix: 'Riduci durezza e opacità.' },
    ],
    project: 'soggetto mascherato', next: 'Le regolazioni: luminosità, curve e colore.',
  },
  {
    id: 'af-w5l5', title: 'Regolazioni', subtitle: 'Curve, livelli, bilanciamento',
    objectives: ['Correggere esposizione e contrasto', 'Usare le curve', 'Neutralizzare una dominante'],
    concepts: ['curve', 'livelli', 'bilanciamento'],
    summary: 'Le regolazioni modificano tono e colore in modo non distruttivo. Curve e livelli controllano la distribuzione della luce; il bilanciamento corregge le dominanti.',
    points: ['Le curve sono più precise dei preset.', 'Non tagliare le alte luci.', 'Lavora su livelli di regolazione.'],
    table: { rows: [['Contrasto', 'Curve', '—'], ['Esposizione', 'Livelli', '—'], ['Dominante', 'Bilanciamento colore', '—']] },
    trace: [['Aggiungi un livello di regolazione', 'Non modifichi i pixel.'], ['Sistema l’esposizione', 'Guarda l’istogramma.'], ['Regola le curve', 'Un punto per luci e ombre.'], ['Neutralizza il colore', 'Confronta con un bianco noto.']],
    uses: ['Una foto scura da schiarire.', 'Un ritratto con dominante gialla.', 'Un prodotto da rendere neutro.'],
    drills: [
      { title: 'Curva a S', task: 'Applica una curva a S leggera per aumentare il contrasto.', checks: ['La curva è a S', 'Il contrasto è aumentato'], solution: 'Curve → punto ombre giù, luci su.' },
      { title: 'Bilanciamento', task: 'Neutralizza una dominante usando un punto bianco.', checks: ['La dominante è ridotta', 'Il bianco è neutro'], solution: 'Bilanciamento → selettore punto bianco.' },
      { title: 'Confronto prima/dopo', task: 'Disattiva e riattiva le regolazioni per valutare.', checks: ['Ho confrontato', 'Il risultato è migliore'], solution: 'Occhio del livello di regolazione.' },
    ],
    quizzes: [
      { question: 'Quale regolazione è più precisa per il contrasto?', correct: 'Curve', wrong: ['Luminosità', 'Saturazione'], explanation: 'Le curve controllano i toni in modo selettivo.' },
      { question: 'Dove applicare una regolazione?', correct: 'Su un livello dedicato', wrong: ['Direttamente sull’originale', 'Sul file RAW esportato'], explanation: 'Il livello resta modificabile.' },
    ],
    errors: [
      { title: 'Alte luci bruciate', what: 'Alzi l’esposizione fino a perdere dettaglio.', why: 'I pixel bianchi non tornano.', fix: 'Usa le curve e proteggi le luci.' },
      { title: 'Colore innaturale', what: 'Aumenti la saturazione globale.', why: 'Tutti i colori si spostano.', fix: 'Correggi solo la dominante.' },
    ],
    project: 'foto corretta', next: 'Ritaglio, ridimensionamento e rotazione senza perdere qualità.',
  },
  {
    id: 'af-w5l6', title: 'Ritaglio e ridimensionamento', subtitle: 'Cambiare inquadratura e dimensione',
    objectives: ['Ritagliare con proporzioni', 'Ridimensionare per l’uso', 'Ruotare e raddrizzare'],
    concepts: ['ritaglio', 'ridimensionamento', 'raddrizzamento'],
    summary: 'Il ritaglio cambia l’inquadratura; il ridimensionamento cambia i pixel; la rotazione corregge l’orizzonte. Sono tre operazioni diverse.',
    points: ['Ritaglia prima di ridimensionare.', 'Mantieni le proporzioni.', 'Raddrizza prima di esportare.'],
    table: { rows: [['Inquadratura', 'Ritaglio', 'C'], ['Dimensione', 'Ridimensiona', '—'], ['Orizzonte', 'Raddrizza', '—']] },
    trace: [['Scegli le proporzioni', 'Social o stampa.'], ['Ritaglia', 'Controlla i bordi.'], ['Raddrizza', 'Allinea l’orizzonte.'], ['Ridimensiona', 'Solo alla fine.']],
    uses: ['Un post quadrato da una foto orizzontale.', 'Una foto profilo centrata.', 'Una stampa 10×15.'],
    drills: [
      { title: 'Ritaglio 1:1', task: 'Ritaglia una foto in formato quadrato.', checks: ['Il formato è 1:1', 'Il soggetto è centrato'], solution: 'C → 1:1 → trascina.' },
      { title: 'Raddrizza', task: 'Correggi un orizzonte inclinato.', checks: ['L’orizzonte è dritto', 'Il ritaglio è coerente'], solution: 'Raddrizza → linea orizzonte.' },
      { title: 'Ridimensiona', task: 'Ridimensiona a 1080 px per il web.', checks: ['La larghezza è 1080', 'Le proporzioni sono mantenute'], solution: 'Ridimensiona → 1080 px.' },
    ],
    quizzes: [
      { question: 'Cosa cambia il ritaglio?', correct: 'L’inquadratura', wrong: ['La risoluzione del sensore', 'Il profilo colore'], explanation: 'Il ritaglio elimina aree, non cambia la densità.' },
      { question: 'Cosa fai prima di ridimensionare?', correct: 'Ritagli e raddrizzi', wrong: ['Applichi filtri', 'Converti in CMYK'], explanation: 'L’ordine evita lavoro inutile.' },
    ],
    errors: [
      { title: 'Foto allungata', what: 'Ridimensioni solo la larghezza.', why: 'Le proporzioni si rompono.', fix: 'Blocca le proporzioni.' },
      { title: 'Ritaglio che taglia il soggetto', what: 'Applichi un formato senza controllare.', why: 'Il centro non è il soggetto.', fix: 'Sposta l’inquadratura prima di confermare.' },
    ],
    project: 'foto profilo pronta', next: 'Il mini-progetto: una foto ritagliata e corretta.',
  },
  {
    id: 'af-w5l7', title: 'Ripasso e mini-progetto: foto', subtitle: 'Dal RAW alla consegna',
    objectives: ['Sviluppare una foto', 'Correggere tono e colore', 'Esportare per l’uso'],
    concepts: ['workflow', 'correzione', 'export'],
    summary: 'Il flusso completo è: apri, sviluppa, ritaglia, correggi con livelli, esporta. Ogni passo resta reversibile.',
    points: ['Sviluppa prima di ritagliare.', 'Usa livelli di regolazione.', 'Esporta nella dimensione d’uso.'],
    table: { rows: [['Sviluppo', 'RAW', '—'], ['Correzione', 'Livelli', '—'], ['Export', 'sRGB/JPEG', '—']] },
    trace: [['Apri e sviluppa', 'Esposizione e bilanciamento.'], ['Ritaglia e raddrizza', 'Inquadratura finale.'], ['Correggi con livelli', 'Curve e colore.'], ['Esporta e verifica', 'Dimensione e profilo.']],
    uses: ['Una foto profilo per LinkedIn.', 'Un’immagine per un post.', 'Una foto per una brochure.'],
    drills: [
      { title: 'Workflow completo', task: 'Sviluppa, ritaglia e correggi una foto.', checks: ['Ho sviluppato il RAW', 'Ho ritagliato', 'Ho corretto con livelli'], solution: 'Sviluppa → ritaglia → curve.' },
      { title: 'Export social', task: 'Esporta a 1080 px, sRGB, JPEG di qualità 85.', checks: ['1080 px', 'sRGB', 'JPEG'], solution: 'Esporta → JPEG → 1080 px → sRGB.' },
      { title: 'Confronto', task: 'Salva prima/dopo e annota tre differenze.', checks: ['Ho due versioni', 'Ho annotato le differenze'], solution: 'Duplica → confronta → annota.' },
    ],
    quizzes: [
      { question: 'Qual è l’ordine corretto?', correct: 'Sviluppo → ritaglio → correzione → export', wrong: ['Export → correzione → ritaglio', 'Ritaglio → export → sviluppo'], explanation: 'Ogni passo prepara il successivo.' },
      { question: 'Quale profilo per il web?', correct: 'sRGB', wrong: ['CMYK', 'RAW'], explanation: 'I browser usano sRGB.' },
    ],
    errors: [
      { title: 'Correzione prima dello sviluppo', what: 'Ritagli il RAW senza svilupparlo.', why: 'Perdi dati e contesto.', fix: 'Sviluppa prima, poi ritaglia.' },
      { title: 'Export troppo grande', what: 'Carichi un JPEG da 6000 px.', why: 'Il sito rallenta.', fix: 'Ridimensiona alla dimensione d’uso.' },
    ],
    project: 'foto del brand kit', next: 'Lato professionale: workflow non distruttivo e RAW.',
  },
  {
    id: 'af-w5l8', title: 'Fotoritocco professionale', subtitle: 'Non distruttivo, RAW, coerenza',
    objectives: ['Impostare un workflow non distruttivo', 'Gestire il RAW', 'Mantenere coerenza tra immagini'],
    concepts: ['non distruttivo', 'RAW', 'coerenza'],
    summary: 'Il ritocco professionale conserva l’originale e documenta le scelte. Livelli, maschere e regolazioni permettono di tornare indietro.',
    points: ['Non salvare mai sopra l’originale.', 'Nomina livelli e gruppi.', 'Mantieni lo stesso profilo colore.'],
    table: { rows: [['Originale', 'Cartella RAW', '—'], ['Lavoro', 'File .af', '—'], ['Consegna', 'JPEG/PNG', '—']] },
    trace: [['Archivia l’originale', 'Non modificarlo mai.'], ['Lavora su copia', 'Livelli e maschere.'], ['Documenta le scelte', 'Nomi e gruppi.'], ['Esporta e verifica', 'Confronta con l’originale.']],
    uses: ['Un servizio fotografico.', 'Un catalogo prodotto.', 'Un ritratto editoriale.'],
    drills: [
      { title: 'Struttura del file', task: 'Organizza il file in gruppi: base, correzioni, output.', checks: ['Ci sono tre gruppi', 'I nomi sono chiari'], solution: 'Crea gruppi → rinomina.' },
      { title: 'Maschera di regolazione', task: 'Applica una curva solo al soggetto con maschera.', checks: ['La regolazione è mascherata', 'Il fondo non cambia'], solution: 'Curva → maschera → dipingi.' },
      { title: 'Confronto finale', task: 'Confronta l’export con l’originale e annota le differenze.', checks: ['Ho confrontato', 'Ho annotato tre differenze'], solution: 'Apri affiancati → annota.' },
    ],
    quizzes: [
      { question: 'Cosa significa non distruttivo?', correct: 'Che puoi tornare indietro senza perdere dati', wrong: ['Che non usi livelli', 'Che il file è più piccolo'], explanation: 'Le modifiche restano separate dai pixel.' },
      { question: 'Cosa non modifichi mai?', correct: 'L’originale RAW', wrong: ['I livelli di regolazione', 'Le maschere'], explanation: 'L’originale è l’archivio di verità.' },
    ],
    errors: [
      { title: 'Originale sovrascritto', what: 'Salvi il JPEG sopra il RAW.', why: 'Perdi i dati di partenza.', fix: 'Conserva una cartella originali.' },
      { title: 'File caotico', what: 'Lavori con venti livelli senza nome.', why: 'Non sai cosa disattivare.', fix: 'Raggruppa e rinomina.' },
    ],
    project: 'workflow documentato', next: 'La Settimana 6 alza il livello: pennelli, compositing e ritocco avanzato.',
  },
];

export const week05 = affWeek({
  number: 5,
  title: 'Pixel: fotoritocco base',
  subtitle: 'Dalla foto grezza a un’immagine pulita',
  description:
    'Sviluppo RAW, selezioni, maschere, regolazioni e ritaglio: il flusso essenziale per correggere una foto senza distruggerla.',
  goals: ['Scegliere tra Vettore e Pixel', 'Usare maschere e regolazioni', 'Esportare una foto pronta'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit · foto profilo',
    brief: 'Il brand kit acquisisce una foto profilo ritoccata in modo naturale e non distruttivo.',
    deliverable: 'Foto 1080×1080, sRGB, con file di lavoro separato dall’originale.',
    milestones: ['RAW sviluppato', 'Ritaglio e correzioni', 'Export verificato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Workflow non distruttivo', 'Gestione RAW', 'Coerenza colore'],
    exercise: 'Organizza un file in gruppi base/correzioni/output e documenta il flusso.',
  },
});
