import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-06';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w6l1', title: 'Pennelli e controllo del segno', subtitle: 'Dimensione, durezza, opacità, flow',
    objectives: ['Configurare un pennello', 'Distinguere opacità e flow', 'Scegliere la durezza giusta'],
    concepts: ['pennelli', 'opacità/flow', 'durezza'],
    summary: 'Il pennello ha dimensione, durezza, opacità e flow. Opacità controlla il massimo; flow controlla quanto colore arriva a ogni passaggio.',
    points: ['Durezza bassa = bordi morbidi.', 'Flow basso = costruzione graduale.', 'Opacità bassa = risultato trasparente.'],
    table: { rows: [['Maschera morbida', 'Durezza 0%', '—'], ['Ritocco graduale', 'Flow 20%', '—'], ['Copertura piena', 'Opacità 100%', '—']] },
    trace: [['Scegli il pennello', 'Rotondo o texture.'], ['Imposta durezza e dimensione', 'In base al bordo.'], ['Regola flow e opacità', 'Per costruire il colore.'], ['Dipingi su maschera o livello', 'Mai sull’originale.']],
    uses: ['Sfumare una maschera.', 'Aggiungere texture.', 'Correggere piccole aree.'],
    drills: [
      { title: 'Morbido vs duro', task: 'Dipingi due tratti con durezza 0% e 100%.', checks: ['I bordi sono diversi', 'So quando usarli'], solution: 'Pennello → due tratti → confronta.' },
      { title: 'Flow graduale', task: 'Con flow 20%, costruisci un’ombreggiatura in tre passaggi.', checks: ['Il passaggio è graduale', 'Non c’è un bordo netto'], solution: 'Flow 20 → tre passaggi.' },
      { title: 'Maschera', task: 'Usa un pennello morbido su una maschera per fondere due aree.', checks: ['Il confine è morbido', 'La maschera resta modificabile'], solution: 'Maschera → bianco/nero → pennello morbido.' },
    ],
    quizzes: [
      { question: 'Cosa controlla il flow?', correct: 'Quanto colore arriva per passaggio', wrong: ['La dimensione del pennello', 'Il colore del livello'], explanation: 'Il flow è la portata per ogni passata.' },
      { question: 'Quale durezza per una maschera morbida?', correct: 'Bassa', wrong: ['Alta', 'Sempre 100%'], explanation: 'La morbidezza evita tagli netti.' },
    ],
    errors: [
      { title: 'Bordo netto', what: 'Usi durezza 100% per sfumare.', why: 'Il pennello non sfuma.', fix: 'Riduci la durezza.' },
      { title: 'Colore troppo carico', what: 'Dipingi con opacità 100% su una maschera.', why: 'Non puoi graduare.', fix: 'Riduci opacità o flow.' },
    ],
    project: 'pennelli di ritocco', next: 'Clone e cerotto per correggere difetti.',
  },
  {
    id: 'af-w6l2', title: 'Clone e cerotto', subtitle: 'Correggere senza lasciare tracce',
    objectives: ['Usare il timbro clone', 'Scegliere un’area sorgente', 'Correggere con il cerotto'],
    concepts: ['clone', 'cerotto', 'sorgente'],
    summary: 'Il timbro clone copia pixel da un’area sorgente; il cerotto fonde texture e luce. Entrambi lavorano meglio su livelli separati.',
    points: ['Scegli una sorgente simile per luce e texture.', 'Campiona su un livello vuoto.', 'Controlla il risultato al 100%.'],
    table: { rows: [['Copiare texture', 'Clone', 'S'], ['Correggere difetto', 'Cerotto', 'J'], ['Sorgente', 'Alt/Option + clic', '—']] },
    trace: [['Crea un livello vuoto', 'Lavoro non distruttivo.'], ['Scegli la sorgente', 'Alt/Option + clic.'], ['Dipingi con passaggi brevi', 'Evita ripetizioni.'], ['Controlla i bordi', 'La texture deve fondersi.']],
    uses: ['Rimuovere un cavo.', 'Correggere una macchia.', 'Pulire una pelle senza effetto plastica.'],
    drills: [
      { title: 'Clone su livello', task: 'Rimuovi una macchia con clone su livello vuoto.', checks: ['La macchia non si vede', 'Il livello è separato'], solution: 'Livello vuoto → Clone → Alt + clic sorgente → dipingi.' },
      { title: 'Cerotto', task: 'Correggi un difetto con il cerotto e confronta.', checks: ['Il difetto è attenuato', 'La texture resta naturale'], solution: 'J → seleziona difetto → trascina.' },
      { title: 'Zone difficili', task: 'Correggi un bordo tra due texture diverse.', checks: ['Il passaggio è credibile', 'Non ci sono ripetizioni'], solution: 'Sorgente vicina → passaggi brevi → sfuma.' },
    ],
    quizzes: [
      { question: 'Come scegli la sorgente del clone?', correct: 'Alt/Option + clic', wrong: ['Doppio clic', 'Maiusc + trascina'], explanation: 'La sorgente si campiona con Alt/Option.' },
      { question: 'Dove lavorare con il clone?', correct: 'Su un livello separato', wrong: ['Sull’originale', 'Sul RAW'], explanation: 'Il livello separato rende il ritocco reversibile.' },
    ],
    errors: [
      { title: 'Texture ripetuta', what: 'Usi la stessa sorgente per tutta l’area.', why: 'Il pattern diventa visibile.', fix: 'Campiona più volte aree diverse.' },
      { title: 'Luce sbagliata', what: 'Cloni da un’area con luce diversa.', why: 'La correzione si nota.', fix: 'Scegli una sorgente con luce simile.' },
    ],
    project: 'ritocco di una macchia', next: 'Inpainting: rimuovere oggetti con l’AI o con metodi manuali.',
  },
  {
    id: 'af-w6l3', title: 'Rimozione oggetti', subtitle: 'Inpainting e metodi manuali',
    objectives: ['Usare Inpainting', 'Preparare la maschera', 'Sapere quando non usare l’AI'],
    concepts: ['Inpainting', 'maschera', 'limiti AI'],
    summary: 'Inpainting riempie un’area selezionata inventando contenuto coerente. Funziona bene su texture e fondi; fatica su dettagli strutturati.',
    points: ['Seleziona solo l’oggetto da rimuovere.', 'Lascia un margine di contesto.', 'Controlla ripetizioni e prospettiva.'],
    table: { rows: [['Oggetto su fondo', 'Inpainting', '—'], ['Dettaglio strutturato', 'Clone manuale', '—'], ['Volto', 'Ritocco manuale', '—']] },
    trace: [['Seleziona l’oggetto', 'Maschera precisa.'], ['Avvia Inpainting', 'Richiede Canva Pro.'], ['Valuta il risultato', 'Cerca incoerenze.'], ['Rifinisci a mano', 'Clone e sfumatura.']],
    uses: ['Rimuovere un cartello.', 'Pulire un fondo.', 'Togliere un oggetto da una foto prodotto.'],
    drills: [
      { title: 'Maschera precisa', task: 'Seleziona un oggetto con un margine di 2 px.', checks: ['La maschera è precisa', 'Il contesto è incluso'], solution: 'Selezione → contrazione 2 px → maschera.' },
      { title: 'Inpainting', task: 'Rimuovi un oggetto da un fondo uniforme.', checks: ['L’oggetto non c’è', 'Il fondo è coerente'], solution: 'Selezione → Inpainting → valuta.' },
      { title: 'Ritocco manuale', task: 'Correggi un risultato AI con clone.', checks: ['Ho corretto le incoerenze', 'Il risultato è naturale'], solution: 'Clone → campiona → sfuma.' },
    ],
    quizzes: [
      { question: 'Quando Inpainting fatica?', correct: 'Su dettagli strutturati e volti', wrong: ['Su fondi uniformi', 'Su texture semplici'], explanation: 'L’AI inventa, ma la struttura è difficile da ricostruire.' },
      { question: 'Cosa serve per un buon risultato?', correct: 'Una maschera precisa con contesto', wrong: ['Una selezione enorme', 'Un filtro pesante'], explanation: 'Il contesto guida la ricostruzione.' },
    ],
    errors: [
      { title: 'Area troppo ampia', what: 'Selezioni mezzo cielo.', why: 'L’AI inventa troppo.', fix: 'Seleziona solo l’oggetto.' },
      { title: 'Risultato non verificato', what: 'Accetti il primo tentativo.', why: 'Le incoerenze si vedono a dimensione reale.', fix: 'Controlla al 100% e rifinisci.' },
    ],
    project: 'fondo pulito', next: 'Maschere di livello e di ritaglio per il compositing.',
  },
  {
    id: 'af-w6l4', title: 'Maschere di livello e ritaglio', subtitle: 'Controllare la visibilità con precisione',
    objectives: ['Differenziare maschera e ritaglio', 'Usare una maschera di ritaglio', 'Organizzare più livelli mascherati'],
    concepts: ['maschera livello', 'clipping mask', 'gruppo'],
    summary: 'La maschera di livello nasconde parti del livello; la maschera di ritaglio mostra un livello solo dentro la forma di un altro.',
    points: ['La maschera è un canale.', 'Il ritaglio usa la forma del livello base.', 'I gruppi mantengono ordine.'],
    table: { rows: [['Nascondere parti', 'Maschera livello', '—'], ['Contenere in una forma', 'Maschera di ritaglio', 'Ctrl/Cmd + Alt + G'], ['Organizzare', 'Gruppo', 'Ctrl/Cmd + G']] },
    trace: [['Scegli il livello da mascherare', 'Deve stare sopra la forma.'], ['Crea la maschera', 'Livello o ritaglio.'], ['Dipingi o sposta', 'Correggi il confine.'], ['Raggruppa', 'Mantieni il file leggibile.']],
    uses: ['Foto dentro un cerchio.', 'Texture dentro un testo.', 'Regolazione solo su un livello.'],
    drills: [
      { title: 'Foto nel cerchio', task: 'Inserisci una foto dentro un cerchio con maschera di ritaglio.', checks: ['La foto è contenuta', 'Il cerchio resta modificabile'], solution: 'Foto sopra cerchio → ritaglio.' },
      { title: 'Maschera di livello', task: 'Nascondi metà di un livello con una maschera.', checks: ['Metà è nascosta', 'I pixel sono intatti'], solution: 'Maschera → pennello nero.' },
      { title: 'Gruppo mascherato', task: 'Applica una maschera a un gruppo di tre livelli.', checks: ['Il gruppo è mascherato', 'I livelli interni restano'], solution: 'Gruppo → maschera → dipingi.' },
    ],
    quizzes: [
      { question: 'Cosa fa una maschera di ritaglio?', correct: 'Mostra un livello dentro la forma di un altro', wrong: ['Nasconde tutto il gruppo', 'Cambia colore'], explanation: 'Il livello base fa da contenitore.' },
      { question: 'Cosa distrugge una maschera?', correct: 'Niente: è reversibile', wrong: ['I pixel originali', 'I livelli'], explanation: 'La maschera è non distruttiva.' },
    ],
    errors: [
      { title: 'Ritaglio al contrario', what: 'Metti la forma sopra la foto.', why: 'Il livello base è quello sotto.', fix: 'Riordina i livelli.' },
      { title: 'Maschera che non risponde', what: 'Dipingi sul livello invece che sulla maschera.', why: 'La maschera non è selezionata.', fix: 'Clic sulla miniatura della maschera.' },
    ],
    project: 'foto in cornice', next: 'Compositing: unire immagini diverse in una scena credibile.',
  },
  {
    id: 'af-w6l5', title: 'Compositing', subtitle: 'Unire immagini con luce coerente',
    objectives: ['Fondere due immagini', 'Correggere luce e colore', 'Armonizzare i bordi'],
    concepts: ['compositing', 'luce', 'armonizzazione'],
    summary: 'Il compositing unisce elementi diversi in una scena credibile. La chiave non è il taglio perfetto, ma la coerenza di luce, colore e prospettiva.',
    points: ['Scegli immagini con luce simile.', 'Correggi il colore dell’elemento inserito.', 'Aggiungi ombre e sfumature di contatto.'],
    table: { rows: [['Fusione', 'Maschera morbida', '—'], ['Colore', 'Curve/Color Balance', '—'], ['Contatto', 'Ombra dipinta', '—']] },
    trace: [['Prepara le due immagini', 'Stessa prospettiva.'], ['Masca il soggetto', 'Bordo morbido.'], ['Correggi luce e colore', 'Confronta con lo sfondo.'], ['Aggiungi ombre', 'Il contatto rende credibile.']],
    uses: ['Un prodotto su un tavolo.', 'Una persona in un paesaggio.', 'Un poster fotografico.'],
    drills: [
      { title: 'Due immagini', task: 'Inserisci un soggetto in un nuovo sfondo con maschera.', checks: ['Il soggetto è mascherato', 'Il bordo è credibile'], solution: 'Maschera → sfuma → controlla.' },
      { title: 'Luce coerente', task: 'Correggi il colore del soggetto per adattarlo allo sfondo.', checks: ['Il colore è coerente', 'La luce ha la stessa direzione'], solution: 'Curve → bilanciamento → confronta.' },
      { title: 'Ombra di contatto', task: 'Aggiungi un’ombra sotto il soggetto.', checks: ['L’ombra è morbida', 'Il soggetto sembra appoggiato'], solution: 'Livello → pennello morbido → opacità bassa.' },
    ],
    quizzes: [
      { question: 'Cosa rende credibile un compositing?', correct: 'Coerenza di luce, colore e prospettiva', wrong: ['Il numero di livelli', 'La risoluzione del file'], explanation: 'L’occhio cerca coerenza, non perfezione.' },
      { question: 'Quale strumento per fondere i bordi?', correct: 'Maschera morbida', wrong: ['Selezione netta', 'Filtro pixelate'], explanation: 'La morbidezza integra i bordi.' },
    ],
    errors: [
      { title: 'Soggetto incollato', what: 'Manca l’ombra di contatto.', why: 'Sembra sospeso.', fix: 'Aggiungi un’ombra morbida.' },
      { title: 'Colore estraneo', what: 'Non correggi la dominante del soggetto.', why: 'La luce non corrisponde.', fix: 'Bilanciamento colore sul soggetto.' },
    ],
    project: 'poster fotografico', next: 'Filtri ed effetti: usarli senza esagerare.',
  },
  {
    id: 'af-w6l6', title: 'Filtri ed effetti', subtitle: 'Sfocatura, disturbo, luce',
    objectives: ['Applicare un filtro in modo selettivo', 'Usare la sfocatura per la profondità', 'Evitare l’effetto “filtro”'],
    concepts: ['filtri', 'sfocatura', 'profondità'],
    summary: 'I filtri modificano l’immagine in modo globale o locale. La sfocatura può creare profondità; il disturbo aggiunge texture; la luce guida l’attenzione.',
    points: ['Usa i filtri su livelli separati.', 'Masca l’effetto.', 'Meno è meglio.'],
    table: { rows: [['Profondità', 'Sfocatura gaussiana', '—'], ['Texture', 'Disturbo', '—'], ['Atmosfera', 'Luce/Glow', '—']] },
    trace: [['Duplica il livello', 'L’effetto resta separato.'], ['Applica il filtro', 'Regola l’intensità.'], ['Masca l’effetto', 'Solo dove serve.'], ['Confronta', 'Disattiva e riattiva.']],
    uses: ['Sfondo sfocato per un ritratto.', 'Texture su un poster.', 'Glow su un titolo.'],
    drills: [
      { title: 'Sfocatura selettiva', task: 'Sfoca lo sfondo e mantieni nitido il soggetto.', checks: ['Lo sfondo è sfocato', 'Il soggetto è nitido'], solution: 'Duplica → sfocatura → maschera.' },
      { title: 'Disturbo leggero', task: 'Aggiungi disturbo al 5% e confronta.', checks: ['La texture è visibile', 'Non domina'], solution: 'Filtro → disturbo 5%.' },
      { title: 'Glow', task: 'Crea un alone su un titolo e riducilo se troppo.', checks: ['L’alone è discreto', 'Il testo resta leggibile'], solution: 'Duplica → sfocatura → opacità.' },
    ],
    quizzes: [
      { question: 'Dove applicare un filtro?', correct: 'Su un livello separato', wrong: ['Sull’originale', 'Sul RAW'], explanation: 'Il livello separato è reversibile.' },
      { question: 'Cosa crea la sfocatura selettiva?', correct: 'Profondità', wrong: ['Più rumore', 'Un profilo colore'], explanation: 'L’occhio legge la nitidezza come piano focale.' },
    ],
    errors: [
      { title: 'Filtro globale', what: 'Sfochi tutta l’immagine.', why: 'Perdi il soggetto.', fix: 'Masca l’effetto.' },
      { title: 'Effetto esagerato', what: 'Usi glow al 100%.', why: 'Il testo diventa illeggibile.', fix: 'Riduci opacità e raggio.' },
    ],
    project: 'poster con profondità', next: 'Il mini-progetto: poster fotografico con compositing.',
  },
  {
    id: 'af-w6l7', title: 'Ripasso e mini-progetto: poster fotografico', subtitle: 'Compositing, luce, tipografia',
    objectives: ['Unire foto e tipografia', 'Correggere la luce', 'Esportare per la stampa'],
    concepts: ['poster', 'compositing', 'stampa'],
    summary: 'Il poster fotografico combina una scena credibile e una tipografia leggibile. La luce deve guidare l’occhio verso il messaggio.',
    points: ['Scegli una luce sola.', 'Lascia spazio al testo.', 'Controlla il poster a distanza.'],
    table: { rows: [['Immagine', 'Compositing', '—'], ['Testo', 'Gerarchia', '—'], ['Stampa', 'CMYK + bleed', '—']] },
    trace: [['Prepara lo sfondo', 'Prospettiva e luce.'], ['Inserisci il soggetto', 'Maschera e ombra.'], ['Aggiungi il testo', 'Spazio negativo.'], ['Esporta PDF', 'Bleed e profilo.']],
    uses: ['Un poster per un evento.', 'Una copertina.', 'Una campagna social.'],
    drills: [
      { title: 'Scena', task: 'Crea un compositing con soggetto e sfondo.', checks: ['La luce è coerente', 'Il bordo è credibile'], solution: 'Maschera → curve → ombra.' },
      { title: 'Testo', task: 'Aggiungi titolo e data con gerarchia chiara.', checks: ['Il titolo domina', 'La data è leggibile'], solution: 'Stili → allineamento.' },
      { title: 'Export stampa', task: 'Esporta il poster in PDF CMYK con bleed.', checks: ['CMYK', 'Bleed incluso', 'Testo leggibile'], solution: 'PDF → stampa → bleed.' },
    ],
    quizzes: [
      { question: 'Cosa guida l’occhio nel poster?', correct: 'Luce e gerarchia', wrong: ['Il numero di foto', 'Il filtro'], explanation: 'Luce e scala creano priorità.' },
      { question: 'Cosa controlli in stampa?', correct: 'Profilo, bleed, risoluzione', wrong: ['La dimensione del file', 'Il numero di livelli'], explanation: 'Sono i tre parametri critici.' },
    ],
    errors: [
      { title: 'Soggetto senza ombra', what: 'Incolli il soggetto senza contatto.', why: 'Sembra finto.', fix: 'Aggiungi ombra morbida.' },
      { title: 'Testo sul dettaglio', what: 'Metti il titolo su un’area rumorosa.', why: 'Non si legge.', fix: 'Sposta o aggiungi una velatura.' },
    ],
    project: 'poster fotografico', next: 'Lato professionale: ritocco naturale e consegna.',
  },
  {
    id: 'af-w6l8', title: 'Ritocco professionale', subtitle: 'Naturalezza e consegna',
    objectives: ['Ritoccare senza effetto plastica', 'Documentare il flusso', 'Consegnare i formati giusti'],
    concepts: ['ritocco', 'naturalezza', 'consegna'],
    summary: 'Il ritocco professionale conserva texture e identità. La pelle non è plastica; la correzione deve essere invisibile a dimensione reale.',
    points: ['Lavora a zoom 100%.', 'Usa opacità basse.', 'Confronta sempre con l’originale.'],
    table: { rows: [['Pelle', 'Cerotto + opacità', '—'], ['Occhi', 'Dodge/Burn', '—'], ['Consegna', 'JPEG + file di lavoro', '—']] },
    trace: [['Osserva l’originale', 'Decidi cosa NON toccare.'], ['Correggi a bassa opacità', 'Passaggi brevi.'], ['Controlla al 100%', 'La texture deve restare.'], ['Esporta e archivia', 'Originale separato.']],
    uses: ['Ritratto per un sito.', 'Foto prodotto.', 'Immagine editoriale.'],
    drills: [
      { title: 'Texture preservata', task: 'Ritocca una piccola area senza cancellare la texture.', checks: ['La texture è visibile', 'Il difetto è attenuato'], solution: 'Cerotto 30% → passaggi brevi.' },
      { title: 'Confronto', task: 'Confronta originale e ritocco al 100%.', checks: ['Il ritocco è naturale', 'Non ci sono aloni'], solution: 'Affianca → valuta.' },
      { title: 'Consegna', task: 'Prepara JPEG e file di lavoro con nomi chiari.', checks: ['Ci sono due file', 'I nomi sono coerenti'], solution: 'Esporta → rinomina.' },
    ],
    quizzes: [
      { question: 'Come si mantiene la naturalezza?', correct: 'Opacità basse e texture conservata', wrong: ['Sfocatura globale', 'Saturazione alta'], explanation: 'Il ritocco deve essere invisibile.' },
      { question: 'Cosa consegni al cliente?', correct: 'Export e file di lavoro separati', wrong: ['Solo il RAW', 'Solo un JPEG'], explanation: 'Il cliente ha bisogno del risultato e tu del progetto.' },
    ],
    errors: [
      { title: 'Pelle di plastica', what: 'Sfumi tutta la texture.', why: 'Il volto perde realismo.', fix: 'Riduci l’intervento e mantieni il grano.' },
      { title: 'Aloni', what: 'Usi clone con bordi duri.', why: 'La correzione si vede.', fix: 'Sfuma e usa opacità bassa.' },
    ],
    project: 'ritratto pronto', next: 'La Settimana 7 entra nel Layout: pagine, master e cornici.',
  },
];

export const week06 = affWeek({
  number: 6,
  title: 'Pixel: fotoritocco avanzato',
  subtitle: 'Compositing e ritocco credibile',
  description:
    'Pennelli, clone, inpainting, maschere, compositing e filtri: tecniche avanzate per immagini naturali e poster fotografici.',
  goals: ['Ritoccare senza distruggere', 'Comporre immagini coerenti', 'Esportare per stampa e web'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit · poster fotografico',
    brief: 'Il brand kit acquisisce un poster che combina fotografia, compositing e tipografia.',
    deliverable: 'Poster A3 con compositing, testo leggibile e PDF di stampa.',
    milestones: ['Compositing credibile', 'Luce e ombre coerenti', 'Export stampa'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Ritocco naturale', 'Compositing', 'Consegna'],
    exercise: 'Ritocca un ritratto mantenendo la texture e confronta con l’originale al 100%.',
  },
});
