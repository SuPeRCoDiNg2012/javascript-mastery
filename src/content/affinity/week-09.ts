import { affCompact, affWeek, type CompactLessonSpec } from './authoring';

const W = 'af-week-09';

const specs: CompactLessonSpec[] = [
  {
    id: 'af-w9l1', title: 'Canva AI in Affinity', subtitle: 'Cosa c’è e cosa serve',
    objectives: ['Riconoscere gli strumenti AI', 'Sapere quando serve Canva Pro', 'Usare l’AI con giudizio'],
    concepts: ['Canva AI', 'Canva Pro', 'limiti'],
    summary: 'Le funzioni AI di Affinity usano i servizi Canva. Generative Fill, Expand e Remove Background richiedono Canva Pro; il resto dell’app resta gratuito.',
    points: ['L’AI è un servizio, non un diritto gratuito.', 'Ogni funzione ha un contesto d’uso.', 'Il risultato va sempre controllato.'],
    table: { rows: [['Riempire', 'Generative Fill', 'Pro'], ['Estendere', 'Generative Expand', 'Pro'], ['Scontornare', 'Remove Background', 'Pro']] },
    trace: [['Individua il pannello AI', 'Le funzioni sono raggruppate.'], ['Controlla il piano', 'Pro o gratuito.'], ['Scegli lo strumento', 'Fill, Expand, Remove.'], ['Valuta il risultato', 'Correggi a mano.']],
    uses: ['Estendere un fondo per un formato social.', 'Rimuovere un oggetto.', 'Creare varianti di un’immagine.'],
    drills: [
      { title: 'Mappa AI', task: 'Elenca tre funzioni AI e il loro uso.', checks: ['Ho elencato tre funzioni', 'So quale richiede Pro'], solution: 'Fill, Expand, Remove → Pro.' },
      { title: 'Piano', task: 'Verifica quali funzioni sono disponibili nel tuo account.', checks: ['So cosa è attivo', 'So cosa è bloccato'], solution: 'Account → piano → funzioni.' },
      { title: 'Controllo risultato', task: 'Applica una funzione e controlla al 100%.', checks: ['Ho valutato il risultato', 'Ho corretto un dettaglio'], solution: 'Applica → zoom → clone.' },
    ],
    quizzes: [
      { question: 'Quali funzioni richiedono Canva Pro?', correct: 'Fill, Expand e Remove Background', wrong: ['Tutti gli strumenti vettoriali', 'Il salvataggio `.af`'], explanation: 'L’AI è separata dall’app gratuita.' },
      { question: 'Cosa fai con un risultato AI?', correct: 'Lo controlli e lo rifinisci', wrong: ['Lo accetti sempre', 'Lo cancelli sempre'], explanation: 'L’AI propone, tu decidi.' },
    ],
    errors: [
      { title: 'Aspettarsi AI gratis', what: 'Cerchi Fill senza Pro.', why: 'Il servizio ha un costo.', fix: 'Usa metodi manuali o attiva Pro.' },
      { title: 'Risultato non controllato', what: 'Consegni il primo output.', why: 'Possono esserci incoerenze.', fix: 'Controlla al 100% e correggi.' },
    ],
    project: 'scheda AI del brand', next: 'Generative Fill in pratica.',
  },
  {
    id: 'af-w9l2', title: 'Generative Fill', subtitle: 'Riempire aree con coerenza',
    objectives: ['Preparare una selezione', 'Scrivere un prompt utile', 'Correggere il risultato'],
    concepts: ['Generative Fill', 'prompt', 'selezione'],
    summary: 'Generative Fill riempie un’area selezionata seguendo il contesto e un prompt. La selezione e il contesto contano più delle parole.',
    points: ['Seleziona solo l’area da riempire.', 'Descrivi materiale, luce e prospettiva.', 'Genera più varianti e scegli.'],
    table: { rows: [['Selezione', 'Lazo/penna', '—'], ['Prompt', 'Testo breve', '—'], ['Varianti', 'Genera', '—']] },
    trace: [['Seleziona l’area', 'Lascia contesto attorno.'], ['Scrivi il prompt', 'Materiale e luce.'], ['Genera varianti', 'Almeno tre.'], ['Rifinisci', 'Clone e sfumatura.']],
    uses: ['Estendere un tavolo.', 'Riempire un cielo.', 'Aggiungere un oggetto coerente.'],
    drills: [
      { title: 'Selezione', task: 'Seleziona un’area con 5 px di contesto.', checks: ['La selezione è precisa', 'Il contesto è incluso'], solution: 'Selezione → espandi 5 px.' },
      { title: 'Prompt', task: 'Scrivi un prompt con materiale, luce e prospettiva.', checks: ['Il prompt è specifico', 'Descrive la luce'], solution: '“Legno chiaro, luce laterale, prospettiva bassa”.' },
      { title: 'Varianti', task: 'Genera tre varianti e scegli la più coerente.', checks: ['Ho generato tre', 'Ho motivato la scelta'], solution: 'Genera → confronta → scegli.' },
    ],
    quizzes: [
      { question: 'Cosa conta di più nel Fill?', correct: 'Selezione e contesto', wrong: ['Un prompt lunghissimo', 'Il numero di colori'], explanation: 'Il contesto guida la coerenza.' },
      { question: 'Cosa fai dopo la generazione?', correct: 'Confronti e rifinisci', wrong: ['Consegni subito', 'Cancelli il livello'], explanation: 'Il risultato è una proposta.' },
    ],
    errors: [
      { title: 'Selezione senza contesto', what: 'Riempi un’area isolata.', why: 'L’AI non sa cosa c’è intorno.', fix: 'Includi parte dell’intorno.' },
      { title: 'Prompt vago', what: 'Scrivi “bello”.', why: 'Non descrive materiale né luce.', fix: 'Sii concreto.' },
    ],
    project: 'fondo esteso', next: 'Generative Expand per cambiare formato.',
  },
  {
    id: 'af-w9l3', title: 'Generative Expand', subtitle: 'Estendere l’immagine',
    objectives: ['Espandere la tela', 'Generare il contenuto mancante', 'Controllare i bordi'],
    concepts: ['Expand', 'formato', 'bordi'],
    summary: 'Generative Expand estende l’immagine oltre i bordi originali. Serve per adattare una foto a formati diversi senza tagliare il soggetto.',
    points: ['Espandi la tela con proporzioni chiare.', 'Genera in più passaggi.', 'Controlla la continuità dei bordi.'],
    table: { rows: [['Social verticale', 'Espandi in alto/basso', '—'], ['Poster', 'Espandi ai lati', '—'], ['Controllo', 'Zoom sui bordi', '—']] },
    trace: [['Scegli il nuovo formato', 'Proporzioni finali.'], ['Espandi la tela', 'Aggiungi spazio.'], ['Genera il contenuto', 'Un’area per volta.'], ['Controlla i bordi', 'Nessuna ripetizione.']],
    uses: ['Da quadrato a verticale.', 'Da orizzontale a poster.', 'Adattare una foto al formato storia.'],
    drills: [
      { title: 'Formato verticale', task: 'Espandi una foto quadrata in 9:16.', checks: ['Il formato è 9:16', 'Il soggetto è integro'], solution: 'Tela → 9:16 → Expand.' },
      { title: 'Bordi', task: 'Controlla i bordi generati al 100%.', checks: ['I bordi sono continui', 'Non ci sono ripetizioni'], solution: 'Zoom → confronta.' },
      { title: 'Rifinitura', task: 'Correggi un’incoerenza con clone.', checks: ['L’incoerenza è sparita', 'Il risultato è naturale'], solution: 'Clone → campiona → sfuma.' },
    ],
    quizzes: [
      { question: 'A cosa serve Expand?', correct: 'A estendere l’immagine oltre i bordi', wrong: ['A ritagliare', 'A cambiare colore'], explanation: 'Expand inventa il contenuto mancante.' },
      { question: 'Cosa controlli dopo?', correct: 'Continuità e ripetizioni', wrong: ['Il numero di livelli', 'Il font'], explanation: 'I bordi sono il punto debole.' },
    ],
    errors: [
      { title: 'Espansione eccessiva', what: 'Estendi un’immagine di dieci volte.', why: 'L’AI inventa troppo.', fix: 'Espandi a piccoli passaggi.' },
      { title: 'Bordo ripetuto', what: 'Generi tutto in un colpo.', why: 'Il pattern si ripete.', fix: 'Genera aree separate e rifinisci.' },
    ],
    project: 'foto per social verticale', next: 'Remove Background: scontornare con l’AI.',
  },
  {
    id: 'af-w9l4', title: 'Remove Background', subtitle: 'Scontorno rapido e pulito',
    objectives: ['Rimuovere lo sfondo', 'Rifinire i bordi', 'Salvare la maschera'],
    concepts: ['Remove Background', 'maschera', 'bordi'],
    summary: 'Remove Background crea una maschera automatica attorno al soggetto. Funziona bene su bordi netti; capelli e trasparenze richiedono rifinitura.',
    points: ['Controlla sempre i bordi.', 'Usa la maschera generata come base.', 'Rifinisci con pennello o selezione.'],
    table: { rows: [['Prodotto', 'Remove Background', '—'], ['Capelli', 'Rifinitura manuale', '—'], ['Maschera', 'Salva', '—']] },
    trace: [['Seleziona il livello', 'Il soggetto deve essere visibile.'], ['Applica Remove', 'Attendi la maschera.'], ['Controlla i bordi', 'Zoom 100%.'], ['Rifinisci', 'Pennello sulla maschera.']],
    uses: ['Foto prodotto su bianco.', 'Ritratto per un poster.', 'Oggetto per un compositing.'],
    drills: [
      { title: 'Prodotto', task: 'Rimuovi lo sfondo di un prodotto e controlla il bordo.', checks: ['Lo sfondo è trasparente', 'Il bordo è pulito'], solution: 'Remove → zoom → rifinisci.' },
      { title: 'Capelli', task: 'Rifinisci un bordo complesso con il pennello.', checks: ['Il bordo è naturale', 'Non ci sono aloni'], solution: 'Maschera → pennello morbido.' },
      { title: 'Salva maschera', task: 'Salva la maschera come canale o selezione.', checks: ['La maschera è salvata', 'Posso riusarla'], solution: 'Maschera → salva selezione.' },
    ],
    quizzes: [
      { question: 'Quando Remove Background fatica?', correct: 'Su capelli e trasparenze', wrong: ['Su sfondi uniformi', 'Su prodotti opachi'], explanation: 'I bordi sottili sono ambigui.' },
      { question: 'Cosa fai con la maschera?', correct: 'La rifinisci', wrong: ['La cancelli', 'La ignori'], explanation: 'La maschera automatica è una base.' },
    ],
    errors: [
      { title: 'Alone bianco', what: 'Accetti il bordo automatico.', why: 'Il fondo originale resta sui contorni.', fix: 'Rifinisci la maschera.' },
      { title: 'Soggetto tagliato', what: 'Non controlli le parti sottili.', why: 'L’AI esclude dettagli.', fix: 'Dipingi di bianco sulla maschera.' },
    ],
    project: 'soggetto scontornato', next: 'Generare immagini e vettori con l’AI.',
  },
  {
    id: 'af-w9l5', title: 'Generare immagini e vettori', subtitle: 'Prompt, stile, limiti',
    objectives: ['Scrivere un prompt visivo', 'Scegliere lo stile', 'Valutare i limiti'],
    concepts: ['prompt', 'stile', 'limiti'],
    summary: 'I generatori di immagini producono bitmap; alcuni strumenti possono produrre vettori. Il prompt descrive soggetto, stile, luce e composizione.',
    points: ['Descrivi soggetto, stile e luce.', 'Genera varianti, non una sola.', 'Controlla diritti e coerenza di brand.'],
    table: { rows: [['Soggetto', 'Chi/cosa', '—'], ['Stile', 'Fotografico/illustrato', '—'], ['Luce', 'Direzione e qualità', '—']] },
    trace: [['Definisci l’uso', 'Social, poster, icona.'], ['Scrivi il prompt', 'Soggetto, stile, luce.'], ['Genera varianti', 'Confronta.'], ['Ritocca', 'Integra nel progetto.']],
    uses: ['Un’illustrazione per un post.', 'Un fondo astratto.', 'Un’icona stilizzata.'],
    drills: [
      { title: 'Prompt completo', task: 'Scrivi un prompt con soggetto, stile e luce.', checks: ['Ci sono i tre elementi', 'Il prompt è specifico'], solution: '“Volpe geometrica, stile flat, luce frontale”.' },
      { title: 'Varianti', task: 'Genera quattro varianti e scegli.', checks: ['Ho quattro varianti', 'Ho motivato la scelta'], solution: 'Genera → confronta.' },
      { title: 'Integrazione', task: 'Inserisci l’immagine in un layout e correggi il colore.', checks: ['L’immagine è integrata', 'Il colore è coerente'], solution: 'Maschera → curve.' },
    ],
    quizzes: [
      { question: 'Cosa deve contenere un prompt?', correct: 'Soggetto, stile e luce', wrong: ['Solo “bello”', 'Solo il colore'], explanation: 'La specificità guida il risultato.' },
      { question: 'Cosa controlli prima di usare un’immagine AI?', correct: 'Coerenza e diritti d’uso', wrong: ['Solo la dimensione', 'Il numero di pixel'], explanation: 'L’integrazione e i diritti contano.' },
    ],
    errors: [
      { title: 'Stile incoerente', what: 'Mischia fotografia e illustrazione.', why: 'Il brand perde identità.', fix: 'Definisci uno stile e ripetilo.' },
      { title: 'Immagine non integrata', what: 'Incolli l’AI senza correggere.', why: 'Sembra estranea.', fix: 'Correggi luce e colore.' },
    ],
    project: 'illustrazione del brand', next: 'Workflow Affinity + Canva.',
  },
  {
    id: 'af-w9l6', title: 'Workflow Affinity + Canva', subtitle: 'Il meglio dei due mondi',
    objectives: ['Esportare per Canva', 'Reimportare le modifiche', 'Mantenere il master'],
    concepts: ['workflow', 'Canva', 'reimport'],
    summary: 'Affinity produce il master; Canva serve per la condivisione e le modifiche rapide. Il flusso va organizzato per non perdere il controllo.',
    points: ['Esporta PNG/PDF puliti.', 'Importa in Canva per il team.', 'Riporta le modifiche nel master.'],
    table: { rows: [['Bozza', 'PNG', '—'], ['Stampa', 'PDF', '—'], ['Master', '`.af`', '—']] },
    trace: [['Prepara l’export', 'Senza bleed per il web.'], ['Importa in Canva', 'Come immagine.'], ['Raccogli le modifiche', 'Un elenco.'], ['Aggiorna il master', 'Riesporta.']],
    uses: ['Un social gestito da un team.', 'Un cliente senza Affinity.', 'Una presentazione condivisa.'],
    drills: [
      { title: 'Export pulito', task: 'Esporta un PNG senza bleed per Canva.', checks: ['Il PNG è pulito', 'Non ha bordi di stampa'], solution: 'Esporta PNG → area tavola.' },
      { title: 'Import', task: 'Importa in Canva e verifica la qualità.', checks: ['L’immagine è nitida', 'Il formato è corretto'], solution: 'Canva → carica → verifica.' },
      { title: 'Ritorno', task: 'Annota una modifica e applicala al master.', checks: ['La modifica è nel master', 'L’export è aggiornato'], solution: 'Elenco → modifica `.af` → esporta.' },
    ],
    quizzes: [
      { question: 'Dove tieni il master?', correct: 'In Affinity', wrong: ['In Canva', 'In un PDF'], explanation: 'Il master è il file di lavoro.' },
      { question: 'Cosa esporti per Canva?', correct: 'PNG o PDF pulito', wrong: ['Il file `.af`', 'Un RAW'], explanation: 'Canva importa formati standard.' },
    ],
    errors: [
      { title: 'Doppio master', what: 'Modifichi sia Canva sia Affinity.', why: 'Le versioni divergono.', fix: 'Scegli un master unico.' },
      { title: 'Export con bleed', what: 'Carichi un PDF di stampa in Canva.', why: 'Appaiono bordi indesiderati.', fix: 'Esporta per lo schermo.' },
    ],
    project: 'flusso condiviso', next: 'Il mini-progetto: contenuto social con AI.',
  },
  {
    id: 'af-w9l7', title: 'Ripasso e mini-progetto: social AI', subtitle: 'Un contenuto pronto',
    objectives: ['Usare AI e brand insieme', 'Adattare al formato', 'Esportare per il social'],
    concepts: ['social', 'AI', 'export'],
    summary: 'Il progetto combina un’immagine generata o estesa, il logo del brand e una tipografia leggibile. L’AI accelera, non sostituisce le decisioni.',
    points: ['Parti dal formato finale.', 'Usa l’AI per lo sfondo, non per il logo.', 'Controlla testo e margini.'],
    table: { rows: [['Post', '1080×1080', '—'], ['Storia', '1080×1920', '—'], ['Export', 'PNG sRGB', '—']] },
    trace: [['Scegli il formato', 'Post o storia.'], ['Prepara lo sfondo', 'AI o foto.'], ['Aggiungi logo e testo', 'Brand e gerarchia.'], ['Esporta e verifica', 'Margini e leggibilità.']],
    uses: ['Un annuncio social.', 'Una storia.', 'Una copertina per un reel.'],
    drills: [
      { title: 'Sfondo AI', task: 'Crea o estendi uno sfondo coerente.', checks: ['Lo sfondo è coerente', 'Il soggetto è leggibile'], solution: 'Expand o Fill → rifinisci.' },
      { title: 'Brand', task: 'Aggiungi logo e testo con margini di sicurezza.', checks: ['Il logo è leggibile', 'Il testo non tocca i bordi'], solution: 'Importa logo → allinea.' },
      { title: 'Export', task: 'Esporta PNG sRGB alla dimensione corretta.', checks: ['1080 px', 'sRGB', 'PNG'], solution: 'Esporta → PNG → 1080.' },
    ],
    quizzes: [
      { question: 'Usi l’AI per il logo?', correct: 'No, il logo resta vettoriale e controllato', wrong: ['Sì, sempre', 'Solo per il formato storia'], explanation: 'Il marchio richiede controllo e coerenza.' },
      { question: 'Cosa controlli prima dell’export?', correct: 'Margini, testo e formato', wrong: ['Il numero di livelli', 'Il nome del livello'], explanation: 'Il social ha margini e leggibilità critici.' },
    ],
    errors: [
      { title: 'Testo fuori area', what: 'Metti il testo a filo bordo.', why: 'Viene tagliato dalle interfacce.', fix: 'Lascia margini di sicurezza.' },
      { title: 'Sfondo che disturba', what: 'Usi un’immagine troppo dettagliata.', why: 'Il testo non si legge.', fix: 'Sfoca o aggiungi una velatura.' },
    ],
    project: 'contenuto social con AI', next: 'Lato professionale: limiti dell’AI e uso consapevole.',
  },
  {
    id: 'af-w9l8', title: 'Limiti dell’AI', subtitle: 'Quando usarla e quando no',
    objectives: ['Riconoscere i limiti', 'Valutare i diritti', 'Scegliere il metodo giusto'],
    concepts: ['limiti', 'diritti', 'giudizio'],
    summary: 'L’AI è utile per esplorare e riempire, ma non garantisce coerenza di brand, diritti o precisione. Le decisioni restano umane.',
    points: ['Non usare AI per loghi e testi legali.', 'Controlla licenze e provenienza.', 'Documenta l’uso dell’AI nel progetto.'],
    table: { rows: [['Esplorare', 'AI', '—'], ['Marchio', 'Vettore manuale', '—'], ['Dati sensibili', 'Mai AI', '—']] },
    trace: [['Chiediti cosa deve essere preciso', 'Logo, testo, dati.'], ['Scegli il metodo', 'AI o manuale.'], ['Controlla i diritti', 'Licenze e provenienza.'], ['Documenta', 'Annota l’uso dell’AI.']],
    uses: ['Bozze di concept.', 'Fondi e texture.', 'Varianti esplorative.'],
    drills: [
      { title: 'Decisione', task: 'Scegli tre compiti e decidi AI o manuale.', checks: ['Ho motivato le scelte', 'Ho escluso i casi rischiosi'], solution: 'Logo manuale, fondo AI, dati manuale.' },
      { title: 'Licenza', task: 'Controlla i termini d’uso di uno strumento AI.', checks: ['Ho letto i termini', 'So cosa posso fare'], solution: 'Sito ufficiale → termini → annota.' },
      { title: 'Documentazione', task: 'Annota nel progetto dove hai usato AI.', checks: ['L’annotazione esiste', 'È chiara'], solution: 'Note → elenco → data.' },
    ],
    quizzes: [
      { question: 'Per cosa NON usare l’AI?', correct: 'Loghi e dati sensibili', wrong: ['Fondi astratti', 'Bozze di concept'], explanation: 'Marchio e dati richiedono controllo.' },
      { question: 'Cosa documenti?', correct: 'Dove e come hai usato l’AI', wrong: ['Solo il prompt', 'Niente'], explanation: 'La trasparenza è parte del lavoro.' },
    ],
    errors: [
      { title: 'Logo generato', what: 'Usi un logo AI senza controllo.', why: 'Può essere incoerente o non originale.', fix: 'Ricostruisci in vettore.' },
      { title: 'Diritti ignorati', what: 'Usi un’immagine senza leggere i termini.', why: 'Rischio legale.', fix: 'Verifica la licenza.' },
    ],
    project: 'nota sull’uso dell’AI', next: 'La Settimana 10 chiude il percorso con il progetto finale.',
  },
];

export const week09 = affWeek({
  number: 9,
  title: 'Canva AI e produttività',
  subtitle: 'Accelerare senza perdere controllo',
  description:
    'Generative Fill, Expand, Remove Background, generazione di immagini e workflow con Canva: l’AI come strumento, non come scorciatoia.',
  goals: ['Usare l’AI con giudizio', 'Integrare AI e brand', 'Documentare l’uso'],
  lessons: specs.map((spec, index) => affCompact(W, index + 1, spec)),
  project: {
    title: 'Brand kit · contenuto social',
    brief: 'Il brand kit acquisisce un contenuto social con AI, logo e tipografia coerenti.',
    deliverable: 'Post 1080×1080 e storia 1080×1920, PNG sRGB.',
    milestones: ['AI integrata', 'Brand rispettato', 'Export verificato'],
  },
  professional: {
    title: 'Lato professionale',
    topics: ['Limiti dell’AI', 'Diritti', 'Trasparenza'],
    exercise: 'Documenta dove hai usato l’AI e motiva le scelte manuali.',
  },
});
