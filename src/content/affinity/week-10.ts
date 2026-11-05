import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-10';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w10l1', title: 'Il brief', subtitle: 'Tradurre una richiesta in progetto',
    objectives: ['Leggere un brief', 'Estrarre vincoli e obiettivi', 'Scrivere una proposta'],
    concepts: ['brief', 'vincoli', 'proposta'],
    summary: 'Un brief descrive obiettivo, pubblico, vincoli e consegna. Prima di disegnare, trasformalo in una lista di decisioni verificabili.',
    points: ['Obiettivo: cosa deve ottenere il progetto.', 'Vincoli: formato, colori, tempi.', 'Consegna: file e misure.'],
    table: { rows: [['Obiettivo', 'Una frase', '—'], ['Pubblico', 'Chi lo usa', '—'], ['Consegna', 'Formati e misure', '—']] },
    trace: [['Leggi il brief due volte', 'Evidenzia le parole chiave.'], ['Estrai i vincoli', 'Formati, colori, scadenze.'], ['Scrivi la proposta', 'Cosa farai e cosa no.'], ['Conferma con il cliente', 'Prima di disegnare.']],
    uses: ['Un brief per un logo.', 'Una campagna social.', 'Un poster per un evento.'],
    drills: [
      { title: 'Estrai i vincoli', task: 'Da un brief, elenca tre vincoli e un obiettivo.', checks: ['Ho tre vincoli', 'Ho un obiettivo chiaro'], solution: 'Leggi → evidenzia → elenca.' },
      { title: 'Proposta', task: 'Scrivi una proposta di tre righe.', checks: ['Dice cosa farai', 'Dice cosa non farai'], solution: 'Obiettivo → deliverable → limiti.' },
      { title: 'Domande', task: 'Scrivi tre domande da fare al cliente.', checks: ['Le domande sono utili', 'Riguardano formato e uso'], solution: 'Formato? Pubblico? Scadenza?' },
    ],
    quizzes: [
      { question: 'Cosa fai prima di disegnare?', correct: 'Chiarisci obiettivo e vincoli', wrong: ['Scegli i colori', 'Apri il file'], explanation: 'Senza brief il lavoro è al buio.' },
      { question: 'Cosa deve contenere una proposta?', correct: 'Cosa fai e cosa non fai', wrong: ['Solo il prezzo', 'Solo i colori'], explanation: 'I limiti evitano fraintendimenti.' },
    ],
    errors: [
      { title: 'Brief interpretato', what: 'Disegni senza confermare.', why: 'Il cliente immaginava altro.', fix: 'Scrivi e fai approvare la proposta.' },
      { title: 'Vincoli ignorati', what: 'Ignori il formato richiesto.', why: 'Il lavoro non è utilizzabile.', fix: 'Metti i vincoli in checklist.' },
    ],
    project: 'brief del brand kit', next: 'Moodboard e ricerca visiva.',
  },
  {
    id: 'af-w10l2', title: 'Moodboard e ricerca', subtitle: 'Decidere prima di disegnare',
    objectives: ['Costruire una moodboard', 'Scegliere riferimenti coerenti', 'Estrarre una direzione'],
    concepts: ['moodboard', 'riferimenti', 'direzione'],
    summary: 'La moodboard raccoglie colori, texture, tipografia e riferimenti. Non è una collezione di cose belle: è una decisione visiva.',
    points: ['Scegli 6–9 riferimenti coerenti.', 'Annota cosa ti serve di ogni riferimento.', 'Estrai palette e stile.'],
    table: { rows: [['Colori', '3–5 campioni', '—'], ['Tipografia', '2 font', '—'], ['Riferimenti', '6–9 immagini', '—']] },
    trace: [['Raccogli i riferimenti', 'Con una motivazione.'], ['Seleziona', 'Elimina il rumore.'], ['Estrai la direzione', 'Colori, font, forme.'], ['Salva nel progetto', 'La moodboard guida il lavoro.']],
    uses: ['Un brand nuovo.', 'Un poster.', 'Una campagna social.'],
    drills: [
      { title: 'Sei riferimenti', task: 'Raccogli sei riferimenti e annota perché.', checks: ['Ci sono sei riferimenti', 'Ognuno ha una nota'], solution: 'Raccogli → annota → seleziona.' },
      { title: 'Palette', task: 'Estrai cinque colori dalla moodboard.', checks: ['Ci sono cinque colori', 'Sono coerenti'], solution: 'Campiona → crea campioni.' },
      { title: 'Direzione', task: 'Scrivi tre parole chiave dello stile.', checks: ['Ci sono tre parole', 'Sono specifiche'], solution: 'Es. “calmo, geometrico, caldo”.' },
    ],
    quizzes: [
      { question: 'A cosa serve una moodboard?', correct: 'A decidere una direzione visiva', wrong: ['A riempire il portfolio', 'A copiare un logo'], explanation: 'La moodboard è uno strumento decisionale.' },
      { question: 'Quanti riferimenti servono?', correct: 'Pochi e motivati', wrong: ['Cento', 'Uno solo'], explanation: 'La selezione conta più della quantità.' },
    ],
    errors: [
      { title: 'Moodboard caotica', what: 'Metti tutto ciò che ti piace.', why: 'Non emerge una direzione.', fix: 'Seleziona e motiva.' },
      { title: 'Copia', what: 'Ricalchi un riferimento.', why: 'Manca identità.', fix: 'Estrai principi, non forme.' },
    ],
    project: 'moodboard del brand', next: 'Il logo vettoriale finale.',
  },
  {
    id: 'af-w10l3', title: 'Logo e simbolo', subtitle: 'La sintesi finale',
    objectives: ['Costruire il logo su griglia', 'Scegliere le varianti', 'Testare su fondi diversi'],
    concepts: ['logo', 'griglia', 'varianti'],
    summary: 'Il logo finale nasce dalla direzione della moodboard e dalla griglia. Deve funzionare in piccolo, in bianco e nero e su fondi diversi.',
    points: ['Una idea, due forme.', 'Griglia e spazi di rispetto.', 'Tre varianti, non dieci.'],
    table: { rows: [['Simbolo', 'Griglia 32×32', '—'], ['Orizzontale', 'Tavola 2', '—'], ['Verticale', 'Tavola 3', '—']] },
    trace: [['Riprendi la direzione', 'Colori e forme della moodboard.'], ['Costruisci il simbolo', 'Griglia e booleane.'], ['Crea le varianti', 'Proporzioni coerenti.'], ['Testa i fondi', 'Bianco, nero, colore.']],
    uses: ['Un logo per un freelance.', 'Un marchio per un evento.', 'Un’identità personale.'],
    drills: [
      { title: 'Simbolo', task: 'Costruisci il simbolo su griglia e riduci i nodi.', checks: ['Il simbolo è su griglia', 'I nodi sono pochi'], solution: 'Griglia → forme → booleane.' },
      { title: 'Varianti', task: 'Crea tre varianti proporzionate.', checks: ['Ci sono tre varianti', 'Le proporzioni sono corrette'], solution: 'Duplica → riorganizza.' },
      { title: 'Test', task: 'Verifica il logo su tre fondi.', checks: ['Funziona su tutti', 'Il contrasto è sufficiente'], solution: 'Fondi → sovrapponi → valuta.' },
    ],
    quizzes: [
      { question: 'Quante idee deve avere il logo finale?', correct: 'Una', wrong: ['Tre', 'Cinque'], explanation: 'La sintesi è il valore del marchio.' },
      { question: 'Cosa testi per ultimo?', correct: 'I fondi e le dimensioni reali', wrong: ['Il numero di livelli', 'Il nome del file'], explanation: 'Il logo vive nei contesti d’uso.' },
    ],
    errors: [
      { title: 'Logo troppo complesso', what: 'Aggiungi dettagli dalla moodboard.', why: 'Si perde in piccolo.', fix: 'Riduci a due forme.' },
      { title: 'Varianti incoerenti', what: 'Ridisegni ogni formato.', why: 'Il marchio cambia.', fix: 'Parti dal master.' },
    ],
    project: 'logo del brand kit', next: 'Le immagini Pixel del brand kit.',
  },
  {
    id: 'af-w10l4', title: 'Immagini e compositing', subtitle: 'La parte fotografica',
    objectives: ['Scegliere le immagini', 'Ritoccare in modo coerente', 'Comporre la scena'],
    concepts: ['foto', 'compositing', 'coerenza'],
    summary: 'Le immagini del brand devono condividere luce, colore e stile. Il compositing serve a costruire una scena, non a incollare foto.',
    points: ['Scegli immagini con luce simile.', 'Correggi il colore in modo uniforme.', 'Aggiungi ombre di contatto.'],
    table: { rows: [['Ritratto', 'Pixel + maschera', '—'], ['Prodotto', 'Compositing', '—'], ['Fondo', 'AI o foto', '—']] },
    trace: [['Seleziona le immagini', 'Stessa direzione di luce.'], ['Ritocca', 'Colore e dettaglio.'], ['Componi', 'Maschere e ombre.'], ['Armonizza', 'Curve finali.']],
    uses: ['Una foto profilo.', 'Un poster fotografico.', 'Un catalogo prodotto.'],
    drills: [
      { title: 'Luce coerente', task: 'Scegli due immagini con luce compatibile.', checks: ['La luce è simile', 'La prospettiva è coerente'], solution: 'Confronta → scegli.' },
      { title: 'Compositing', task: 'Unisci soggetto e sfondo con ombra.', checks: ['Il bordo è credibile', 'L’ombra è presente'], solution: 'Maschera → ombra.' },
      { title: 'Armonizzazione', task: 'Correggi il colore del soggetto.', checks: ['Il colore è coerente', 'Non ci sono aloni'], solution: 'Curve → bilanciamento.' },
    ],
    quizzes: [
      { question: 'Cosa rende credibile un compositing?', correct: 'Luce, colore e ombre coerenti', wrong: ['Il numero di foto', 'La dimensione del file'], explanation: 'L’occhio cerca coerenza.' },
      { question: 'Cosa aggiungi sotto il soggetto?', correct: 'Un’ombra di contatto', wrong: ['Un bordo nero', 'Un filtro'], explanation: 'L’ombra collega il soggetto al piano.' },
    ],
    errors: [
      { title: 'Soggetto sospeso', what: 'Manca l’ombra.', why: 'Non sembra appoggiato.', fix: 'Aggiungi ombra morbida.' },
      { title: 'Colori diversi', what: 'Non armonizzi le immagini.', why: 'Sembrano incollate.', fix: 'Curve e bilanciamento.' },
    ],
    project: 'immagine del brand', next: 'Biglietto e poster nel Layout.',
  },
  {
    id: 'af-w10l5', title: 'Biglietto e poster', subtitle: 'Il layout del brand kit',
    objectives: ['Impaginare il biglietto', 'Costruire il poster', 'Mantenere la gerarchia'],
    concepts: ['biglietto', 'poster', 'gerarchia'],
    summary: 'Il biglietto da visita e il poster usano la stessa identità su scale diverse. La gerarchia e i margini cambiano, il sistema resta.',
    points: ['Biglietto 85×55 mm con bleed.', 'Poster A3 con gerarchia forte.', 'Stessi colori e font.'],
    table: { rows: [['Biglietto', '85×55 mm', '—'], ['Poster', 'A3', '—'], ['Bleed', '3 mm', '—']] },
    trace: [['Imposta i formati', 'Bleed e margini.'], ['Inserisci logo e contatti', 'Biglietto.'], ['Costruisci il poster', 'Titolo e immagine.'], ['Verifica il sistema', 'Colori e font coerenti.']],
    uses: ['Un biglietto da visita.', 'Un poster per un evento.', 'Un volantino.'],
    drills: [
      { title: 'Biglietto', task: 'Impagina fronte e retro con bleed.', checks: ['Ci sono due lati', 'Il bleed è 3 mm'], solution: 'Pagine → 85×55 → bleed.' },
      { title: 'Poster', task: 'Crea un poster con gerarchia a tre livelli.', checks: ['Il titolo domina', 'Il corpo è leggibile'], solution: 'Stili → griglia.' },
      { title: 'Coerenza', task: 'Confronta biglietto e poster: stessi colori e font?', checks: ['I colori coincidono', 'I font coincidono'], solution: 'Campioni → confronta.' },
    ],
    quizzes: [
      { question: 'Cosa cambia tra biglietto e poster?', correct: 'Scala e gerarchia', wrong: ['Il brand', 'I colori'], explanation: 'Il sistema resta, cambia la scala.' },
      { question: 'Cosa serve per la stampa?', correct: 'Bleed e margini di sicurezza', wrong: ['Solo il logo', 'Un filtro'], explanation: 'Senza bleed il taglio lascia bordi.' },
    ],
    errors: [
      { title: 'Biglietto illeggibile', what: 'Usi il corpo del poster.', why: 'I testi sono troppo grandi.', fix: 'Riduci il corpo e aumenta lo spazio.' },
      { title: 'Poster vuoto', what: 'Usi solo il logo.', why: 'Manca gerarchia.', fix: 'Aggiungi titolo e informazione.' },
    ],
    project: 'biglietto e poster', next: 'Export e consegna del brand kit.',
  },
  {
    id: 'af-w10l6', title: 'Export e consegna', subtitle: 'Tutti i formati, nessuna sorpresa',
    objectives: ['Scegliere i formati', 'Controllare i file', 'Organizzare la consegna'],
    concepts: ['export', 'formati', 'consegna'],
    summary: 'Il brand kit si consegna in formati diversi per usi diversi. Ogni file deve essere nominato, verificato e accompagnato da istruzioni.',
    points: ['SVG per il web, PDF per la stampa.', 'PNG per contesti raster.', 'Una cartella con README.',],
    table: { rows: [['Web', 'SVG/PNG', 'sRGB'], ['Stampa', 'PDF', 'CMYK'], ['Lavoro', '`.af`', '—']] },
    trace: [['Elenca gli usi', 'Web, stampa, social.'], ['Esporta i formati', 'Con le opzioni giuste.'], ['Verifica i file', 'Apri e controlla.'], ['Organizza la cartella', 'Nomi e istruzioni.']],
    uses: ['Consegna a un cliente.', 'Pubblicazione sul sito.', 'Invio in tipografia.'],
    drills: [
      { title: 'Formati', task: 'Esporta SVG, PNG e PDF del logo.', checks: ['Ci sono tre formati', 'Ognuno è corretto'], solution: 'Esporta → verifica.' },
      { title: 'Controllo', task: 'Apri ogni file e verifica colore e dimensioni.', checks: ['I colori sono corretti', 'Le dimensioni sono giuste'], solution: 'Apri → confronta.' },
      { title: 'Cartella', task: 'Organizza i file con nomi coerenti.', checks: ['I nomi sono chiari', 'La struttura è ordinata'], solution: 'Cartelle → rinomina.' },
    ],
    quizzes: [
      { question: 'Quale formato per il web?', correct: 'SVG o PNG', wrong: ['PDF CMYK', 'RAW'], explanation: 'Il web usa formati leggeri.' },
      { question: 'Cosa accompagni alla consegna?', correct: 'Istruzioni e nomi chiari', wrong: ['Solo il logo', 'Un messaggio vocale'], explanation: 'La consegna è parte del progetto.' },
    ],
    errors: [
      { title: 'File non verificato', what: 'Consegni senza aprire.', why: 'Un errore arriva al cliente.', fix: 'Apri e controlla ogni file.' },
      { title: 'Nomi confusi', what: 'Usi “finale-definitivo”.', why: 'Non si capisce la versione.', fix: 'Usa nome, uso e data.' },
    ],
    project: 'cartella di consegna', next: 'Review e rifinitura finale.',
  },
  {
    id: 'af-w10l7', title: 'Review e rifinitura', subtitle: 'L’ultimo 10%',
    objectives: ['Fare una review sistematica', 'Correggere i dettagli', 'Congelare la versione finale'],
    concepts: ['review', 'dettagli', 'versione'],
    summary: 'La review finale controlla coerenza, leggibilità, tecnica e consegna. È il passaggio che separa un progetto buono da uno affidabile.',
    points: ['Usa una checklist, non la memoria.', 'Controlla a dimensione reale.', 'Congela una versione approvata.'],
    table: { rows: [['Coerenza', 'Colori/font', '—'], ['Tecnica', 'Bleed/font', '—'], ['Leggibilità', 'Dimensioni reali', '—']] },
    trace: [['Rileggi il brief', 'Verifica gli obiettivi.'], ['Controlla la coerenza', 'Colori, font, spazi.'], ['Controlla la tecnica', 'Bleed, profilo, font.'], ['Congela la versione', 'Data e numero.']],
    uses: ['Prima di inviare al cliente.', 'Prima di stampare.', 'Prima di pubblicare.'],
    drills: [
      { title: 'Checklist', task: 'Crea una checklist di dieci controlli.', checks: ['Ci sono dieci voci', 'Sono verificabili'], solution: 'Coerenza, tecnica, leggibilità.' },
      { title: 'Review', task: 'Applica la checklist al brand kit.', checks: ['Ho controllato tutto', 'Ho annotato le correzioni'], solution: 'Segui la lista → annota.' },
      { title: 'Versione', task: 'Salva una copia finale con data.', checks: ['La data è nel nome', 'La versione è chiara'], solution: 'Duplica → rinomina → archivia.' },
    ],
    quizzes: [
      { question: 'Come fai la review?', correct: 'Con una checklist sistematica', wrong: ['A memoria', 'Solo guardando il logo'], explanation: 'La checklist evita i punti ciechi.' },
      { question: 'Cosa congeli?', correct: 'Una versione approvata e datata', wrong: ['Tutte le bozze', 'Solo il PDF'], explanation: 'La versione finale deve essere identificabile.' },
    ],
    errors: [
      { title: 'Review a memoria', what: 'Controlli solo ciò che ricordi.', why: 'I dettagli sfuggono.', fix: 'Usa una checklist scritta.' },
      { title: 'Versioni confuse', what: 'Sovrascrivi il file finale.', why: 'Non torni indietro.', fix: 'Archivia con data.' },
    ],
    project: 'brand kit approvato', next: 'Pubblicazione e portfolio.',
  },
  {
    id: 'af-w10l8', title: 'Pubblicare e continuare', subtitle: 'Cosa fare adesso',
    objectives: ['Preparare il portfolio', 'Scegliere i prossimi progetti', 'Continuare a praticare'],
    concepts: ['portfolio', 'presentazione', 'pratica'],
    summary: 'Il corso finisce, la pratica continua. Prepara una presentazione del progetto, scegli tre esercizi da rifare e pianifica il prossimo lavoro.',
    points: ['Mostra il processo, non solo il risultato.', 'Scegli progetti che ti sfidano.', 'Ripeti i fondamentali ogni settimana.'],
    table: { rows: [['Portfolio', '3 progetti', '—'], ['Processo', 'Brief → moodboard → file', '—'], ['Pratica', 'Un esercizio a settimana', '—']] },
    trace: [['Seleziona i lavori migliori', 'Qualità, non quantità.'], ['Scrivi il processo', 'Cosa hai deciso e perché.'], ['Prepara le immagini', 'Formati web.'], ['Pubblica', 'Sito o PDF.']],
    uses: ['Un portfolio per un cliente.', 'Una candidatura.', 'Un progetto personale.'],
    drills: [
      { title: 'Selezione', task: 'Scegli tre progetti e scrivi perché.', checks: ['Ci sono tre progetti', 'Le motivazioni sono chiare'], solution: 'Seleziona → annota.' },
      { title: 'Processo', task: 'Scrivi cinque passaggi del tuo processo.', checks: ['Ci sono cinque passaggi', 'Sono specifici'], solution: 'Brief → ricerca → bozza → review → consegna.' },
      { title: 'Prossimo passo', task: 'Pianifica un progetto per le prossime due settimane.', checks: ['Il progetto è definito', 'Ha una scadenza'], solution: 'Obiettivo → deliverable → data.' },
    ],
    quizzes: [
      { question: 'Cosa mostri nel portfolio?', correct: 'Processo e risultato', wrong: ['Solo il logo finale', 'Tutti i file'], explanation: 'Il processo mostra come pensi.' },
      { question: 'Cosa fai dopo il corso?', correct: 'Pratica deliberata e nuovi progetti', wrong: ['Smettere', 'Rifare solo ciò che sai'], explanation: 'La competenza si mantiene praticando.' },
    ],
    errors: [
      { title: 'Portfolio pieno', what: 'Mostri tutto.', why: 'Il segnale si perde.', fix: 'Scegli tre lavori forti.' },
      { title: 'Nessun processo', what: 'Mostri solo immagini finali.', why: 'Non emergono le decisioni.', fix: 'Racconta brief e scelte.' },
    ],
    project: 'portfolio del brand kit', next: 'Ripassa i fondamentali e costruisci il prossimo progetto.',
  },
];

export const week10 = affWeek({
  number: 10,
  title: 'Progetto finale',
  subtitle: 'Un’identità visiva completa',
  description:
    'Brief, moodboard, logo, immagini, biglietto, poster, export e portfolio: il brand kit diventa un progetto completo e presentabile.',
  goals: ['Condurre un progetto dall’inizio alla fine', 'Mantenere coerenza tra supporti', 'Presentare il lavoro'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit completo',
    brief: 'Il progetto conduttore arriva alla consegna: logo, varianti, foto, biglietto, poster e guida essenziale.',
    deliverable: 'Cartella organizzata con `.af`, SVG, PNG, PDF e una pagina di processo.',
    milestones: ['Logo e varianti', 'Biglietto e poster', 'Export e portfolio'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Presentazione', 'Portfolio', 'Prossimi passi'],
    exercise: 'Prepara una presentazione di tre progetti con brief, processo e risultato.',
  },
});
