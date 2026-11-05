import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-04';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w4l1', title: 'Simboli e istanze', subtitle: 'Riutilizzare senza duplicare',
    objectives: ['Creare un simbolo', 'Inserire istanze', 'Aggiornare tutte le copie insieme'],
    concepts: ['simboli', 'istanze', 'aggiornamento'],
    summary: 'Un simbolo è un elemento master; le istanze sono copie collegate che si aggiornano quando modifichi il master.',
    points: ['Il master vive nel pannello Simboli.', 'Le istanze possono avere override locali.', 'Modificare il master aggiorna tutte le istanze.'],
    table: { rows: [['Creare', 'Pannello Simboli → Crea', '—'], ['Inserire', 'Trascina dal pannello', '—'], ['Aggiornare', 'Modifica il master', 'Tutte le copie']] },
    trace: [['Disegna l’elemento', 'Il master deve essere completo.'], ['Crealo come simbolo', 'Riceve un nome.'], ['Inserisci più istanze', 'Trascina o copia.'], ['Modifica il master', 'Le copie si aggiornano.']],
    uses: ['Un’icona ripetuta in un pattern.', 'Un logo usato su più tavole.', 'Un elemento decorativo in una brochure.'],
    drills: [
      { title: 'Crea il simbolo', task: 'Trasforma una forma in simbolo “Onda”.', checks: ['Il simbolo esiste', 'Il nome è chiaro'], solution: 'Seleziona → Simboli → Crea simbolo → “Onda”.' },
      { title: 'Tre istanze', task: 'Inserisci tre istanze e modifica il colore del master.', checks: ['Ci sono tre istanze', 'Tutte cambiano colore'], solution: 'Trascina tre volte → modifica il master.' },
      { title: 'Override locale', task: 'Cambia la scala di una sola istanza senza toccare le altre.', checks: ['Una istanza è diversa', 'Le altre restano uguali'], solution: 'Seleziona l’istanza → scala → verifica le altre.' },
    ],
    quizzes: [
      { question: 'Cosa succede modificando il master?', correct: 'Tutte le istanze si aggiornano', wrong: ['Solo la prima istanza cambia', 'Le istanze si scollegano'], explanation: 'Il legame con il master è il vantaggio del simbolo.' },
      { question: 'Le istanze possono differire?', correct: 'Sì, con override locali', wrong: ['No, sono identiche per forza', 'Solo cambiando file'], explanation: 'Gli override permettono varianti senza duplicare il master.' },
    ],
    errors: [
      { title: 'Copia scollegata', what: 'Duplichi il master invece di creare un’istanza.', why: 'La copia non è collegata al simbolo.', fix: 'Inserisci un’istanza dal pannello.' },
      { title: 'Modifica che non si propaga', what: 'Modifichi il master ma vedi una copia ferma.', why: 'È una copia normale o ha un override.', fix: 'Controlla il legame e l’override.' },
    ],
    project: 'pattern di onde con simbolo', next: 'Il pannello Appearance aggiunge effetti senza distruggere la forma.',
  },
  {
    id: 'af-w4l2', title: 'Appearance ed effetti', subtitle: 'Contorni multipli, ombre, trasparenza',
    objectives: ['Aggiungere un contorno multiplo', 'Applicare un’ombra controllata', 'Riordinare gli effetti'],
    concepts: ['Appearance', 'contorni', 'ombre'],
    summary: 'Il pannello Appearance applica effetti non distruttivi: puoi avere più tratti, ombre e trasparenza sullo stesso oggetto.',
    points: ['Gli effetti si applicano dall’alto verso il basso.', 'Puoi duplicare un tratto e cambiare colore.', 'Gli effetti restano modificabili.'],
    table: { rows: [['Tratto multiplo', 'Appearance → +', '—'], ['Ombra', 'Effetti → Ombra', '—'], ['Riordino', 'Trascina nell’elenco', '—']] },
    trace: [['Seleziona l’oggetto', 'Appearance mostra gli effetti.'], ['Aggiungi un tratto', 'Scegli colore e spessore.'], ['Aggiungi l’ombra', 'Regola distanza e sfocatura.'], ['Controlla l’ordine', 'L’ordine cambia il risultato.']],
    uses: ['Un logo con doppio contorno.', 'Un titolo con ombra leggera.', 'Un’icona con alone luminoso.'],
    drills: [
      { title: 'Doppio contorno', task: 'Aggiungi un contorno bianco spesso sotto uno nero sottile.', checks: ['Ci sono due tratti', 'I colori sono diversi'], solution: 'Appearance → + tratto → bianco sotto, nero sopra.' },
      { title: 'Ombra discreta', task: 'Applica un’ombra a un testo con sfocatura 8 px.', checks: ['L’ombra è visibile ma discreta', 'La sfocatura è 8 px'], solution: 'Effetti → Ombra → 8 px.' },
      { title: 'Effetto rimosso', task: 'Disattiva l’ombra senza cancellare l’oggetto.', checks: ['L’ombra non si vede', 'L’oggetto è intatto'], solution: 'Appearance → disattiva l’effetto.' },
    ],
    quizzes: [
      { question: 'Gli effetti di Appearance sono distruttivi?', correct: 'No, restano modificabili', wrong: ['Sì, appiattiscono la forma', 'Solo in Pixel'], explanation: 'Appearance è un livello di effetti non distruttivo.' },
      { question: 'Cosa cambia l’ordine degli effetti?', correct: 'Il modo in cui si sovrappongono', wrong: ['Il colore del fondo', 'La dimensione del file'], explanation: 'L’ordine è parte del risultato visivo.' },
    ],
    errors: [
      { title: 'Ombra che sembra sporco', what: 'Usi sfocatura enorme e opacità alta.', why: 'L’ombra copre il dettaglio.', fix: 'Riduci opacità e distanza.' },
      { title: 'Contorno che copre il testo', what: 'Metti il tratto sopra il riempimento.', why: 'L’ordine degli effetti è sbagliato.', fix: 'Trascina il tratto sotto.' },
    ],
    project: 'logo con doppio contorno', next: 'Image Trace trasforma un’immagine in vettori.',
  },
  {
    id: 'af-w4l3', title: 'Image Trace', subtitle: 'Da bitmap a vettore',
    objectives: ['Tracciare un’immagine', 'Scegliere il preset giusto', 'Pulire il risultato'],
    concepts: ['Image Trace', 'preset', 'pulizia'],
    summary: 'Image Trace converte i pixel in tracciati. Il risultato dipende dal preset e dalla qualità dell’immagine di partenza.',
    points: ['Più colori = più tracciati.', 'Le immagini nitide tracciano meglio.', 'Dopo il tracciamento riduci i nodi.'],
    table: { rows: [['Silhouette', 'Preset bianco/nero', '—'], ['Logo piatto', 'Preset colori limitati', '—'], ['Foto', 'Sconsigliato', '—']] },
    trace: [['Seleziona l’immagine', 'Deve essere raster.'], ['Scegli Image Trace', 'Imposta il preset.'], ['Controlla i tracciati', 'Riduci nodi e pulisci.'], ['Espandi e modifica', 'Ora è vettoriale.']],
    uses: ['Vettorizzare un logo ricevuto in PNG.', 'Trasformare una silhouette in icona.', 'Creare un pattern da un disegno scansionato.'],
    drills: [
      { title: 'Traccia una silhouette', task: 'Traccia un’immagine bianco/nero e ottieni un solo tracciato.', checks: ['Il risultato è vettoriale', 'Il contorno è pulito'], solution: 'Image Trace → silhouette → espandi.' },
      { title: 'Riduci i nodi', task: 'Dopo il tracciamento riduci i nodi del 20%.', checks: ['Ho ridotto i nodi', 'La forma resta riconoscibile'], solution: 'Strumento Nodo → seleziona ridondanti → elimina.' },
      { title: 'Confronto preset', task: 'Traccia la stessa immagine con due preset e confronta.', checks: ['Ho usato due preset', 'So quale è più pulito'], solution: 'Duplica → due preset → confronta.' },
    ],
    quizzes: [
      { question: 'Quando Image Trace dà il risultato migliore?', correct: 'Con immagini nitide e pochi colori', wrong: ['Con foto ricche di dettaglio', 'Con immagini sfocate'], explanation: 'Il tracciamento segue i contorni netti.' },
      { question: 'Cosa fai dopo il tracciamento?', correct: 'Riduci i nodi e pulisci', wrong: ['Applichi subito un filtro', 'Converti in raster'], explanation: 'Il risultato automatico va sempre rifinito.' },
    ],
    errors: [
      { title: 'Troppi tracciati', what: 'Usi un preset con molti colori su una foto.', why: 'Ogni tono diventa un livello.', fix: 'Riduci i colori o usa silhouette.' },
      { title: 'Bordi frastagliati', what: 'Tracci un’immagine a bassa risoluzione.', why: 'Il contorno segue i pixel.', fix: 'Parti da un’immagine più grande e nitida.' },
    ],
    project: 'icona vettorizzata', next: 'La matita e lo stabilizzatore per disegnare a mano libera.',
  },
  {
    id: 'af-w4l4', title: 'Disegno a mano libera', subtitle: 'Matita, stabilizzatore, pennelli',
    objectives: ['Usare la matita con stabilizzatore', 'Scegliere un pennello vettoriale', 'Rifinire un tratto'],
    concepts: ['matita', 'stabilizzatore', 'pennelli'],
    summary: 'La matita produce tracciati liberi; lo stabilizzatore riduce il tremolio. I pennelli vettoriali aggiungono carattere senza perdere scalabilità.',
    points: ['Lo stabilizzatore alta = tratto più liscio.', 'I pennelli vettoriali restano modificabili.', 'Il tratto va rifinito con lo strumento Nodo.'],
    table: { rows: [['Schizzo', 'Matita', 'P'], ['Linea pulita', 'Stabilizzatore', '—'], ['Carattere', 'Pennello vettoriale', '—']] },
    trace: [['Scegli la matita', 'Imposta spessore e stabilizzatore.'], ['Disegna il tratto', 'Meglio pochi tratti lunghi.'], ['Rifinisci i nodi', 'Rimuovi il tremolio.'], ['Applica il pennello', 'Scegli uno stile coerente.']],
    uses: ['Uno schizzo di logo.', 'Una texture disegnata a mano.', 'Una firma vettoriale.'],
    drills: [
      { title: 'Linea stabile', task: 'Disegna una linea curva con stabilizzatore alto.', checks: ['La linea è fluida', 'Ho usato lo stabilizzatore'], solution: 'Matita → stabilizzatore alto → curva.' },
      { title: 'Rifinitura', task: 'Riduci i nodi di un tratto a mano libera.', checks: ['Ho eliminato nodi', 'Il tratto resta fluido'], solution: 'Nodo → seleziona → elimina.' },
      { title: 'Pennello', task: 'Applica un pennello vettoriale a una linea.', checks: ['Il tratto ha carattere', 'Resta vettoriale'], solution: 'Seleziona → Pennelli → applica.' },
    ],
    quizzes: [
      { question: 'A cosa serve lo stabilizzatore?', correct: 'A ridurre il tremolio del tratto', wrong: ['A cambiare colore', 'A convertire in pixel'], explanation: 'Lo stabilizzatore filtra il movimento.' },
      { question: 'I pennelli vettoriali perdono qualità?', correct: 'No, restano scalabili', wrong: ['Sì, diventano raster', 'Solo se stampati'], explanation: 'Il pennello è una proprietà del tracciato.' },
    ],
    errors: [
      { title: 'Tratto tremolante', what: 'Disegni con stabilizzatore a zero.', why: 'La mano produce micro-movimenti.', fix: 'Aumenta lo stabilizzatore.' },
      { title: 'Troppi nodi', what: 'Ricalchi una linea più volte.', why: 'Ogni passaggio aggiunge punti.', fix: 'Disegna un tratto unico e rifinisci.' },
    ],
    project: 'firma vettoriale', next: 'I principi del logo: geometria, griglia, varianti.',
  },
  {
    id: 'af-w4l5', title: 'Costruire un logo', subtitle: 'Geometria, griglia, riconoscibilità',
    objectives: ['Costruire su griglia', 'Scegliere un concept', 'Creare varianti coerenti'],
    concepts: ['logo', 'griglia', 'varianti'],
    summary: 'Un logo nasce da una griglia e da una idea semplice. Deve funzionare in bianco e nero, in piccolo e in grande.',
    points: ['Parti da una forma riconoscibile.', 'Verifica in bianco e nero.', 'Crea varianti orizzontale, verticale e simbolo.'],
    table: { rows: [['Griglia', '24×24 o 32×32', '—'], ['Bianco/nero', 'Test di contrasto', '—'], ['Varianti', 'Tavole separate', '—']] },
    trace: [['Scegli il concept', 'Una idea, non tre.'], ['Costruisci su griglia', 'Allinea e semplifica.'], ['Testa in bianco e nero', 'Il colore non salva un logo debole.'], ['Crea le varianti', 'Adatta senza distorcere.']],
    uses: ['Logo per un freelance creativo.', 'Marchio per un piccolo negozio.', 'Identità per un progetto personale.'],
    drills: [
      { title: 'Griglia 32×32', task: 'Costruisci il simbolo su una griglia 32×32.', checks: ['Il simbolo sta nella griglia', 'Gli allineamenti sono precisi'], solution: 'Tavola 32×32 → guide → costruisci.' },
      { title: 'Test bianco/nero', task: 'Converti il logo in bianco e nero e verifica la leggibilità.', checks: ['Il logo è leggibile', 'Il contrasto è sufficiente'], solution: 'Duplica → scala di grigi → valuta.' },
      { title: 'Tre varianti', task: 'Crea orizzontale, verticale e solo simbolo.', checks: ['Ci sono tre tavole', 'Le proporzioni sono coerenti'], solution: 'Duplica e riorganizza su tavole.' },
    ],
    quizzes: [
      { question: 'Un logo deve funzionare prima di tutto…', correct: 'In bianco e nero e in piccolo', wrong: ['Con molti colori', 'Solo su schermo'], explanation: 'La riconoscibilità non dipende dagli effetti.' },
      { question: 'Quante idee deve comunicare un logo?', correct: 'Una, chiara', wrong: ['Almeno tre', 'Tutte quelle del brand'], explanation: 'La sintesi è ciò che rende memorabile.' },
    ],
    errors: [
      { title: 'Logo troppo dettagliato', what: 'Aggiungi ombre e dettagli piccoli.', why: 'Si perdono a dimensione reale.', fix: 'Semplifica a due forme.' },
      { title: 'Varianti distorte', what: 'Allunghi il logo per riempire uno spazio.', why: 'Le proporzioni fanno parte del marchio.', fix: 'Ridimensiona in modo proporzionale.' },
    ],
    project: 'logo del brand kit', next: 'Dal logo al sistema di marca: coerenza e file per il cliente.',
  },
  {
    id: 'af-w4l6', title: 'Sistema di marca', subtitle: 'Coerenza tra supporti',
    objectives: ['Definire regole d’uso', 'Adattare il logo ai formati', 'Preparare i file per il cliente'],
    concepts: ['brand', 'coerenza', 'file cliente'],
    summary: 'Un marchio è un sistema: logo, colori, font e regole. La coerenza tra supporti è ciò che lo rende riconoscibile.',
    points: ['Definisci spazio di rispetto e dimensioni minime.', 'Usa la stessa palette ovunque.', 'Consegna file nominati e organizzati.'],
    table: { rows: [['Spazio di rispetto', 'Altezza del simbolo', '—'], ['Dimensione minima', 'Leggibilità', '—'], ['File cliente', 'SVG, PNG, PDF', '—']] },
    trace: [['Documenta colori e font', 'Il brand kit è anche un manuale.'], ['Definisci le regole', 'Spazio, minimo, sfondi.'], ['Prepara i formati', 'Ogni uso ha il suo file.'], ['Verifica la consegna', 'Nomi e cartelle coerenti.']],
    uses: ['Un cliente riceve logo e palette.', 'Un social usa la stessa palette.', 'Una stampa usa il PDF corretto.'],
    drills: [
      { title: 'Spazio di rispetto', task: 'Definisci uno spazio pari all’altezza del simbolo.', checks: ['Lo spazio è documentato', 'È rispettato nelle varianti'], solution: 'Misura il simbolo → crea guide.' },
      { title: 'Palette', task: 'Crea cinque campioni con codici colore.', checks: ['Ci sono cinque colori', 'I codici sono annotati'], solution: 'Campioni → annota HEX/CMYK.' },
      { title: 'Consegna', task: 'Prepara una cartella con SVG, PNG e PDF.', checks: ['I formati ci sono', 'I nomi sono coerenti'], solution: 'Crea cartella → esporta → rinomina.' },
    ],
    quizzes: [
      { question: 'Cosa rende riconoscibile un marchio?', correct: 'La coerenza tra supporti', wrong: ['Il numero di colori', 'La dimensione del logo'], explanation: 'La ripetizione coerente costruisce memoria.' },
      { question: 'Cosa consegni per il web?', correct: 'SVG e PNG', wrong: ['Solo PDF', 'Solo il file .af'], explanation: 'Il web ha bisogno di formati leggeri e vettoriali.' },
    ],
    errors: [
      { title: 'Logo troppo piccolo', what: 'Scendi sotto la dimensione minima.', why: 'Il dettaglio si perde.', fix: 'Usa la variante solo simbolo.' },
      { title: 'Colori diversi tra supporti', what: 'Usi CMYK diversi in stampa e RGB sul web.', why: 'Manca una palette documentata.', fix: 'Definisci i codici una volta e riusali.' },
    ],
    project: 'manuale di marca in una pagina', next: 'Il mini-progetto: logo completo con varianti.',
  },
  {
    id: 'af-w4l7', title: 'Ripasso e mini-progetto: logo', subtitle: 'Dalla griglia alla consegna',
    objectives: ['Costruire un logo completo', 'Creare tre varianti', 'Esportare i file corretti'],
    concepts: ['logo', 'varianti', 'export'],
    summary: 'Il progetto della settimana è un logo completo con varianti e file di consegna. La qualità sta nella coerenza, non nel numero di effetti.',
    points: ['Simbolo su griglia.', 'Varianti orizzontale, verticale, simbolo.', 'SVG, PNG e PDF pronti.'],
    table: { rows: [['Simbolo', 'Tavola 1', 'SVG'], ['Orizzontale', 'Tavola 2', 'PNG'], ['Verticale', 'Tavola 3', 'PDF']] },
    trace: [['Costruisci il simbolo', 'Riduci a forme essenziali.'], ['Crea le varianti', 'Mantieni le proporzioni.'], ['Testa su fondi diversi', 'Chiaro e scuro.'], ['Esporta e organizza', 'Nomi coerenti.']],
    uses: ['Un cliente usa il logo sul sito.', 'Una stampa usa il PDF.', 'Un social usa il PNG.'],
    drills: [
      { title: 'Tre tavole', task: 'Crea tre varianti del logo su tavole separate.', checks: ['Le tavole sono tre', 'Le proporzioni sono coerenti'], solution: 'Duplica → riorganizza → rinomina.' },
      { title: 'Test su fondi', task: 'Verifica il logo su bianco, nero e colore.', checks: ['Funziona su tutti', 'Il contrasto è sufficiente'], solution: 'Duplica i fondi → sovrapponi il logo.' },
      { title: 'Export completo', task: 'Esporta SVG, PNG e PDF e rinomina i file.', checks: ['Ci sono tre formati', 'I nomi sono chiari'], solution: 'Esporta → rinomina → verifica.' },
    ],
    quizzes: [
      { question: 'Quale variante serve per un’icona app?', correct: 'Solo simbolo', wrong: ['Logo verticale con payoff', 'Il PDF di stampa'], explanation: 'A dimensioni piccole serve la sintesi.' },
      { question: 'Cosa controlli prima della consegna?', correct: 'Proporzioni, contrasto e nomi dei file', wrong: ['Il numero di livelli', 'La dimensione del file'], explanation: 'La consegna è parte del progetto.' },
    ],
    errors: [
      { title: 'Varianti diverse tra loro', what: 'Ridisegni il logo per ogni formato.', why: 'Nascono proporzioni incoerenti.', fix: 'Parti sempre dal master.' },
      { title: 'File senza nome', what: 'Consegni “finale-2.pdf”.', why: 'Il cliente non sa cosa sta aprendo.', fix: 'Usa nomi coerenti e descrittivi.' },
    ],
    project: 'logo completo con varianti', next: 'Lato professionale: brand identity e file per il cliente.',
  },
  {
    id: 'af-w4l8', title: 'Brand identity professionale', subtitle: 'Documentare, consegnare, difendere',
    objectives: ['Scrivere regole di marca', 'Preparare un brand kit', 'Gestire le revisioni'],
    concepts: ['brand identity', 'linee guida', 'revisioni'],
    summary: 'La brand identity è il manuale che permette ad altri di usare il marchio senza romperlo. Include logo, colori, font, spazio e divieti.',
    points: ['Documenta ciò che è permesso e ciò che non lo è.', 'Prepara file per ogni uso.', 'Versiona le revisioni.'],
    table: { rows: [['Logo', 'Regole e varianti', '—'], ['Colori', 'HEX, RGB, CMYK', '—'], ['Font', 'Licenze e pesi', '—']] },
    trace: [['Raccogli i materiali', 'Logo, palette, font.'], ['Scrivi le regole', 'Poche, chiare, verificabili.'], ['Crea il PDF', 'Un documento condivisibile.'], ['Archivia le versioni', 'Una cartella per revisione.']],
    uses: ['Un’agenzia usa le linee guida.', 'Un fornitore capisce i file.', 'Il cliente mantiene coerenza.'],
    drills: [
      { title: 'Regole essenziali', task: 'Scrivi tre regole d’uso del logo.', checks: ['Le regole sono chiare', 'Sono verificabili'], solution: 'Spazio, dimensione minima, sfondi.' },
      { title: 'Brand kit PDF', task: 'Unisci logo, palette e font in un PDF.', checks: ['Il PDF contiene tutto', 'È leggibile'], solution: 'Layout → esporta PDF.' },
      { title: 'Revisione', task: 'Salva una copia con data e numero di versione.', checks: ['Il nome contiene la data', 'La versione è chiara'], solution: 'Duplica cartella → rinomina.' },
    ],
    quizzes: [
      { question: 'A cosa serve un brand kit?', correct: 'A usare il marchio in modo coerente', wrong: ['A decorare il sito', 'A sostituire il logo'], explanation: 'È un manuale operativo.' },
      { question: 'Come gestisci le revisioni?', correct: 'Con versioni datate e archiviate', wrong: ['Sovrascrivendo sempre lo stesso file', 'Cancellando le versioni vecchie'], explanation: 'La storia delle versioni evita errori.' },
    ],
    errors: [
      { title: 'Regole vaghe', what: 'Scrivi “usare il logo con buon gusto”.', why: 'Non è verificabile.', fix: 'Indica misure e spazi precisi.' },
      { title: 'File sparsi', what: 'Consegni logo e colori in messaggi diversi.', why: 'Il cliente perde pezzi.', fix: 'Raccogli tutto in un brand kit.' },
    ],
    project: 'brand kit in PDF', next: 'La Settimana 5 passa al Pixel: fotoritocco dal RAW alle maschere.',
  },
];

export const week04 = affWeek({
  number: 4,
  title: 'Vettore: illustrazione e loghi',
  subtitle: 'Dal segno al marchio',
  description:
    'Simboli, effetti, tracciamento, disegno a mano libera e costruzione di un logo completo con varianti e file di consegna.',
  goals: ['Riutilizzare elementi con i simboli', 'Costruire un logo su griglia', 'Consegnare un brand kit coerente'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit · logo',
    brief: 'Il brand kit acquisisce il logo completo: simbolo su griglia, varianti e file per ogni uso.',
    deliverable: 'Tre varianti del logo, SVG/PNG/PDF e una pagina di regole.',
    milestones: ['Simbolo su griglia', 'Varianti coerenti', 'Consegna organizzata'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Identità di marca', 'Linee guida', 'Versionamento'],
    exercise: 'Scrivi tre regole d’uso del logo e prepara una cartella di consegna.',
  },
});
