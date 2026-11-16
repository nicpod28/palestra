# App Palestra

App personale (un solo utente) per registrare gli allenamenti. Dettagli completi in `SPEC.md`: rileggilo a inizio di ogni fase.

## Regole di lavoro

1. Una fase alla volta. Non iniziare la successiva senza "ok, fase N".
2. A inizio fase: rileggi `SPEC.md` e questo file, proponi un piano breve, aspetta l'ok prima di scrivere codice.
3. Requisito poco chiaro o in conflitto: chiedi, non indovinare.
4. Nessuna funzione non richiesta. Le idee vanno in `IDEE.md` e basta.
5. Non installare programmi o pacchetti senza chiedere.
6. Fase troppo grande: proponi sotto-fasi.
7. A fine fase: verifica "Fatto quando", checklist di test manuali per principiante, e dopo l'ok commit git in italiano.
8. A fine fase: spiega in poche righe cosa hai fatto e perché, con linguaggio semplice.

## Vincoli tecnici

- HTML, CSS, JavaScript puri. Niente framework, librerie, CDN, npm, build.
- Tutto in un unico `index.html` (CSS e JS inline). Dalla Fase 3 anche `manifest.webmanifest`, `sw.js`, icone.
- Dati in `localStorage`, una sola chiave, JSON con `schemaVersion` e funzione di migrazione.
- Salvataggio automatico a ogni modifica. Nessun pulsante "Salva". Mai perdere dati.
- Logica dei dati separata dal codice dell'interfaccia.
- Mobile-first, una mano, aree toccabili di almeno 48 px, contrasto alto, tema chiaro/scuro di sistema.
- Barra in basso: Allenamento (avvio), Scheda, Storico (dalla Fase 4), Dati.
- Numeri: `inputmode="decimal"`, virgola e punto equivalenti, negativi e non numerici rifiutati con messaggio chiaro.
- Ogni cancellazione chiede conferma.
- Interfaccia in italiano, kg, date gg/mm/aaaa. Commenti nel codice in italiano, brevi.
- Percorsi relativi (l'app sarà su un sottopercorso di GitHub Pages).
- Sviluppo con server locale (`python3 -m http.server`). Fino alla Fase 3 solo dati di prova; nel repository mai dati personali.

## Modello dati (principi)

- Catalogo esercizi unico: le schede richiamano gli esercizi per id.
- Più schede, una sola attiva. Scheda → giorni → esercizi → serie.
- Ogni allenamento salva una copia di ciò che era previsto: lo storico non dipende dalle schede.
- Serie non segnate come fatte: non contano nello storico.

## Fuori scope

Account, cloud, server, pubblicità, analytics, notifiche, timer, grafici, superserie, sostituzione esercizi, calorie, social, libreria precaricata, più utenti.
