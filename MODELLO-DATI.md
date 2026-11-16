# Modello dati (approvato nella Fase 0)

Tutti i dati stanno in `localStorage` sotto la chiave `palestra.dati`, come JSON. Versione attuale: `schemaVersion` 1.

Altre chiavi: `palestra.copiaPrecedente` (copia fatta prima di importare un backup o cancellare tutto), `palestra.datiIlleggibili` (dati messi da parte se non leggibili).

## Struttura

```json
{
  "schemaVersion": 1,
  "ultimoBackup": "2026-11-10T18:42:00.000Z",
  "schedaAttivaId": "sch_k3f9",
  "catalogo": [
    { "id": "es_a1b2", "nome": "Panca piana" }
  ],
  "schede": [
    {
      "id": "sch_k3f9",
      "nome": "Scheda novembre",
      "creataIl": "2026-11-01T09:00:00.000Z",
      "giorni": [
        {
          "id": "gio_x7y8",
          "nome": "Giorno A - Petto e tricipiti",
          "esercizi": [
            {
              "id": "ve_p1",
              "esercizioId": "es_a1b2",
              "recupero": "90s",
              "nota": "fermo al petto",
              "serie": [ { "ripetizioni": "8-10" }, { "ripetizioni": "8-10" } ]
            }
          ]
        }
      ]
    }
  ],
  "allenamenti": [
    {
      "id": "all_m5n6",
      "stato": "completato",
      "inizio": "2026-11-12T18:05:00.000Z",
      "fine": "2026-11-12T19:10:00.000Z",
      "schedaId": "sch_k3f9",
      "schedaNome": "Scheda novembre",
      "giornoId": "gio_x7y8",
      "giornoNome": "Giorno A - Petto e tricipiti",
      "nota": "",
      "esercizi": [
        {
          "esercizioId": "es_a1b2",
          "nome": "Panca piana",
          "recupero": "90s",
          "nota": "fermo al petto",
          "serie": [
            { "target": "8-10", "carico": 62.5, "ripetizioni": 8, "commento": "", "fatta": true }
          ]
        }
      ]
    }
  ]
}
```

## Decisioni

- **Copia nello storico:** ogni allenamento copia nomi, target, recupero e nota. `schedaId`, `giornoId`, `esercizioId` sono solo riferimenti.
- **Nome dopo una rinomina:** lo storico mostra il nome attuale del catalogo; il nome copiato serve solo se l'esercizio non esiste più.
- **Ripetizioni fatte:** numero intero oppure `null`. Per gli esercizi a tempo si scrivono i secondi.
- **Carico:** numero (anche 0) oppure `null` se vuoto. Virgola e punto equivalenti all'inserimento.
- **Stesso esercizio due volte nello stesso giorno:** permesso; "Ultima volta" abbina le occorrenze in ordine.
- **Serie aggiunta durante l'allenamento:** `target` vuoto, la scheda non cambia.
- **Scheda attiva cancellata:** `schedaAttivaId` torna `null`. La prima scheda creata diventa attiva da sola.
- **Catalogo:** un esercizio che nessuna scheda e nessun allenamento usa più viene tolto dal catalogo.
- **Date:** salvate in formato ISO, mostrate come gg/mm/aaaa.
- **Avviso backup:** evidenziato dopo 14 giorni.
- **"Cancella tutti i dati":** nella sezione Dati, con doppia conferma e copia in `palestra.copiaPrecedente`.
