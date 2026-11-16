# App Palestra: specifica per Claude Code

Come usarlo: salva questo file come `SPEC.md` nella cartella del progetto e in Claude Code scrivi: `Leggi SPEC.md ed esegui la Fase 0`.

## Regole di lavoro (valgono per tutte le fasi)

1. Questo file è la specifica completa, divisa in fasi. Lavora una fase alla volta e non iniziare la successiva finché non scrivo "ok, fase N".
2. All'inizio di ogni fase rileggi questo file e `CLAUDE.md`, poi proponimi un piano breve (cosa farai, quali file toccherai, eventuali dubbi) e aspetta il mio ok prima di scrivere codice.
3. Se un requisito non è chiaro o due requisiti sono in conflitto, chiedimelo. Non indovinare.
4. Non aggiungere funzioni che non ho chiesto. Se ti viene un'idea utile, scrivila in `IDEE.md` e basta.
5. Non installare programmi o pacchetti senza chiedermelo.
6. Se una fase è troppo grande per farla bene in una volta, proponimi di dividerla in sotto-fasi.
7. A fine fase verifica il criterio "Fatto quando", poi dammi una checklist di test manuali con passi precisi, scritta per un principiante. Dopo il mio ok, fai un commit git con un messaggio chiaro in italiano.
8. Sto imparando a usare Claude Code. A fine fase spiegami in poche righe cosa hai fatto, quali file hai creato o modificato e perché. Linguaggio semplice; se usi un termine tecnico, spiegalo.

## Contesto

* App personale per registrare gli allenamenti in palestra. Un solo utente: io.
* La uso dal telefono durante l'allenamento, spesso con segnale scarso o assente.
* Cosa deve fare: (1) permettermi di inserire la mia scheda; (2) durante l'allenamento, registrare carico, ripetizioni e commenti per ogni serie; (3) mostrarmi cosa ho fatto la volta scorsa e lo storico di ogni esercizio.
* Requisiti non negoziabili: gratuita per sempre, nessuna pubblicità, nessun account, nessun servizio esterno a pagamento. I dati restano sul mio telefono e posso esportarli quando voglio.
* Interfaccia in italiano. Carichi in kg. Date in formato italiano (gg/mm/aaaa).

## Vincoli tecnici

* HTML, CSS e JavaScript puri. Nessun framework, nessuna libreria, nessun CDN, nessun npm, nessun passaggio di build.
* Tutto il codice dell'app sta in un unico `index.html` (CSS e JavaScript inline). Uniche eccezioni, dalla Fase 3: i file minimi per installarla come app (`manifest.webmanifest`, `sw.js`, icone).
* Dati in `localStorage`, sotto un'unica chiave, come JSON con un campo `schemaVersion`.
* Salvataggio automatico a ogni modifica. Non deve esistere un pulsante "Salva", e chiudere l'app, bloccare il telefono o ricaricare la pagina non deve mai far perdere dati.
* Tieni separata la logica dei dati (funzioni che creano, modificano e calcolano) dal codice dell'interfaccia, anche se stanno nello stesso file.
* Mobile-first: schermo di telefono in verticale, usabile con una mano. Pulsanti e campi grandi (area toccabile di almeno 48 px), testo leggibile, contrasto alto. Tema chiaro o scuro in base alle impostazioni del telefono.
* Navigazione con una barra in basso: Allenamento (si apre all'avvio), Scheda, Storico (dalla Fase 4), Dati.
* Campi numerici con tastierino numerico (`inputmode="decimal"`). Il carico accetta i decimali sia con la virgola sia con il punto: 22,5 e 22.5 sono lo stesso valore. Valori negativi o non numerici vengono rifiutati con un messaggio chiaro.
* Ogni cancellazione chiede conferma.
* Commenti nel codice in italiano, brevi.
* Durante lo sviluppo servi l'app con un server locale (per esempio `python3 -m http.server`) e dimmi quale indirizzo aprire nel browser.
* Fino alla Fase 3 si lavora solo con dati di prova: i miei dati veri inizieranno dopo l'installazione sul telefono.

## Modello dati (principi obbligatori)

1. Catalogo esercizi unico. Ogni esercizio esiste una sola volta (id e nome) e le schede lo richiamano. Così lo storico di "Panca piana" continua anche quando cambio scheda. Rinominare un esercizio non deve spezzare lo storico. Quando aggiungo un esercizio a una scheda, l'app suggerisce i nomi già presenti nel catalogo (confronto che ignora maiuscole e spazi in eccesso) per evitare doppioni.
2. Più schede, una sola attiva. Le schede vecchie restano archiviate.
3. Struttura della scheda: scheda → giorni (per esempio "Giorno A") → esercizi → serie. Per ogni esercizio: le serie, ognuna con ripetizioni target in testo libero ("8", "8-10", "max"); recupero facoltativo in testo ("90s"); nota facoltativa.
4. Ogni allenamento salva una copia di ciò che era previsto (nomi degli esercizi, serie e ripetizioni target in quel momento). Modificare o cancellare una scheda non deve mai alterare lo storico.
5. Allenamento: data e ora di inizio e di fine, scheda e giorno di riferimento, stato (`in_corso` oppure `completato`), nota generale facoltativa. Per ogni serie: ripetizioni target, carico in kg (può restare vuoto per gli esercizi a corpo libero), ripetizioni fatte, commento facoltativo, fatta sì/no.
6. Migrazioni. `schemaVersion` presente da subito, con una funzione di migrazione pronta per le versioni future: un aggiornamento dell'app non deve mai rendere illeggibili i dati vecchi.

## Fase 0: preparazione (nessun codice dell'app)

* Inizializza un repository git nella cartella.
* Crea `CLAUDE.md` (al massimo 40 righe) con le regole di lavoro e i vincoli tecnici di questo file, e un rimando a `SPEC.md` per i dettagli.
* Crea `IDEE.md`, vuoto.
* Proponimi il modello dati completo (struttura JSON con un esempio realistico) e l'elenco delle schermate. Fammi tutte le domande che ti servono.

Fatto quando: ho approvato modello dati e schermate, e c'è il primo commit.

## Fase 1: fondamenta (scheda, salvataggio, backup)

Obiettivo: posso inserire la mia scheda e i dati sopravvivono a tutto.

* Modello dati e salvataggio come sopra.
* Editor della scheda a form: creo, rinomino e cancello schede; scelgo quella attiva; aggiungo, modifico, riordino (frecce su e giù, niente trascinamento) e cancello giorni ed esercizi.
* Inserimento rapido delle serie: scrivo 4 serie da "8-10" e l'app genera 4 serie uguali. Poi posso modificare una singola serie (per esempio piramidale 12-10-8-6), aggiungerne o toglierne una.
* Importazione di una scheda da JSON, incollando il testo o scegliendo un file, nel formato descritto sotto. Validazione con messaggi d'errore chiari in italiano (quale campo, dove). Prima di salvare: anteprima della scheda e conferma. Gli esercizi vengono collegati al catalogo per nome; quelli nuovi vengono creati.
* Backup completo: esporto tutti i dati (schede, catalogo, allenamenti) nel file `palestra-backup-AAAA-MM-GG.json`. Importo un backup che sostituisce tutti i dati, dopo validazione, riepilogo (quante schede e quanti allenamenti contiene) e conferma esplicita. Prima della sostituzione, conserva una copia dei dati attuali in una chiave separata, ripristinabile.
* Nella sezione Dati e nella schermata Allenamento: data dell'ultimo backup, evidenziata se sono passati più di 14 giorni.
* Crea `FORMATO-SCHEDA.md` con il formato d'importazione e un esempio completo, così posso chiedere a un'altra chat di Claude di convertire la mia scheda.

Formato d'importazione della scheda:

```json
{
  "nome": "Scheda novembre",
  "giorni": [
    {
      "nome": "Giorno A - Petto e tricipiti",
      "esercizi": [
        {
          "nome": "Panca piana",
          "serie": 4,
          "ripetizioni": "8-10",
          "recupero": "90s",
          "nota": "fermo al petto"
        },
        { "nome": "Croci ai cavi", "ripetizioni": ["12", "10", "8"] },
        { "nome": "Dip", "serie": 3, "ripetizioni": "max" }
      ]
    }
  ]
}
```

Regole del formato: `ripetizioni` è un testo (uguale per tutte le serie, insieme a `serie` = numero di serie) oppure una lista di testi (una per serie, e allora `serie` non serve). `recupero` e `nota` sono facoltativi.

Fatto quando: creo una scheda a mano e ne importo una da JSON; chiudo il browser, lo riapro e ritrovo tutto; esporto il backup, cancello i dati, reimporto il backup e ritrovo tutto identico; un JSON sbagliato viene rifiutato con un messaggio comprensibile.

## Fase 2: allenamento

Obiettivo: registro un allenamento completo dal telefono, in fretta, senza perdere niente.

* Schermata Allenamento: se c'è un allenamento in corso, il pulsante principale è "Riprendi allenamento". Altrimenti, la lista dei giorni della scheda attiva: un tocco avvia l'allenamento di quel giorno.
* Durante l'allenamento: gli esercizi del giorno, in ordine. Per ogni esercizio: nome, recupero e nota della scheda, e una riga "Ultima volta" con data, carichi e ripetizioni dell'ultimo allenamento completato con quell'esercizio, da qualsiasi scheda.
* Una riga per ogni serie: numero della serie, ripetizioni target, campo carico (kg), campo ripetizioni, pulsante ✓ "fatta". Commento facoltativo per serie, che si apre con un tocco per non ingombrare.
* I campi carico e ripetizioni partono precompilati con i valori dell'ultima volta per quella serie, se esistono. Li cambio solo se serve e premo ✓. Le serie non segnate come fatte non contano nello storico.
* Durante l'allenamento posso aggiungere una serie in più a un esercizio.
* Nota generale facoltativa per l'allenamento.
* Salvataggio immediato a ogni modifica: se chiudo l'app, il telefono si blocca o la pagina si ricarica, ritrovo l'allenamento esattamente dov'ero.
* "Termina allenamento": se ci sono serie non fatte, chiede conferma; poi l'allenamento diventa `completato`, con l'ora di fine.
* Posso annullare un allenamento in corso, con conferma.
* Un solo allenamento in corso alla volta.
* Crea `dati-prova.json`: un backup importabile con una scheda e 3-4 settimane di allenamenti finti, per testare "Ultima volta" e, nella Fase 4, lo storico.

Fatto quando: simulo un allenamento completo nella modalità telefono del browser, ricarico la pagina a metà e ritrovo tutto; al secondo allenamento dello stesso giorno vedo "Ultima volta" corretta e i campi precompilati.

## Fase 3: sul telefono (app installabile e offline)

Obiettivo: l'app si installa sulla schermata Home del telefono e funziona senza connessione.

* `manifest.webmanifest` (nome "Palestra", colori del tema) e icone PNG semplici create da te con uno script, senza servizi esterni: 192 e 512 px, più l'icona da 180 px per iPhone.
* Service worker `sw.js` che rende l'app disponibile offline.
* Aggiornamenti: quando pubblico una nuova versione, il telefono deve riceverla (cache con numero di versione e avviso "Nuova versione disponibile, tocca per aggiornare"). Aggiornare l'app non deve mai toccare i dati in `localStorage`. Spiegami come incrementare la versione a ogni modifica.
* Attenzione ai percorsi: l'app sarà servita da un sottopercorso (`nomeutente.github.io/nome-repository/`), quindi manifest, service worker e risorse devono usare percorsi relativi.
* Chiedi al browser lo storage persistente (`navigator.storage.persist()`), se disponibile, per ridurre il rischio che i dati vengano cancellati.
* L'esportazione del backup deve funzionare anche nell'app installata su iPhone: se il download diretto non funziona, usa il pannello di condivisione (Web Share API con file) per salvarlo in File o iCloud.
* Pubblicazione gratuita su GitHub Pages: guidami passo per passo (account, repository, attivazione di Pages). Il repository sarà pubblico, quindi deve contenere solo codice e dati di prova, mai dati personali: i miei allenamenti restano sul telefono. Se hai `gh` disponibile usalo, altrimenti dammi i passi manuali.
* Istruzioni per installarla sulla Home: iPhone (Safari → Condividi → Aggiungi alla schermata Home) e Android (Chrome → menu → Installa app o Aggiungi a schermata Home).
* Dimmi se i dati inseriti nel browser restano visibili nell'app installata (su iPhone di solito no) e da quale momento iniziare a inserire i dati veri.

Fatto quando: l'app è online su GitHub Pages, installata sul mio telefono, si apre in modalità aereo, e dopo una modifica pubblicata il telefono riceve l'aggiornamento senza perdere dati.

## Fase 4: storico

Obiettivo: vedo cosa ho fatto e se sto progredendo.

* Lista degli allenamenti completati, dal più recente: data, giorno, durata, numero di serie fatte. Un tocco apre il dettaglio completo con i commenti. Posso correggere o cancellare un allenamento passato, con conferma.
* Storico per esercizio: scelgo un esercizio dal catalogo e vedo, per ogni data, le serie fatte (carico × ripetizioni) e i commenti, dal più recente. In cima: il carico massimo registrato con la data, e l'ultimo carico usato.
* Gestione del catalogo: rinomino un esercizio (lo storico resta unito) e unisco due esercizi doppi in uno solo (gli storici si sommano), con conferma.

Fatto quando: dopo alcuni allenamenti registrati trovo in due tocchi lo storico della panca piana e vedo chiaramente se il carico è salito.

## Fuori scope (non implementare, nemmeno "per comodità")

Account e login, sincronizzazione cloud, server o database esterni, pubblicità, analytics o tracciamento di qualsiasi tipo, notifiche, timer di recupero, grafici, superserie e circuiti, sostituzione di esercizi durante l'allenamento, calorie, condivisione social, libreria di esercizi precaricata, più utenti.

## Dopo la Fase 4

Fermati. Userò l'app in palestra per almeno due settimane. Le modifiche successive te le chiederò io, una alla volta, in base all'uso reale; le idee in `IDEE.md` le valuterò allora.
