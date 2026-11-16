# Formato per importare una scheda

Questo file descrive il testo JSON che l'app Palestra accetta in **Scheda → Importa scheda da JSON**.

JSON è un modo di scrivere dati come testo, con parentesi e virgolette. Non serve scriverlo a mano: in fondo trovi una richiesta già pronta da dare a una chat di Claude insieme alla tua scheda.

## Struttura

```json
{
  "nome": "Nome della scheda",
  "giorni": [
    {
      "nome": "Nome del giorno",
      "esercizi": [
        { "nome": "Nome esercizio", "serie": 4, "ripetizioni": "8-10", "recupero": "90s", "nota": "testo libero" }
      ]
    }
  ]
}
```

## Campi

| Campo | Dove | Obbligatorio | Cosa contiene |
|---|---|---|---|
| `nome` | scheda | sì | Testo, massimo 80 caratteri. |
| `giorni` | scheda | sì | Lista con almeno un giorno. |
| `nome` | giorno | sì | Testo, massimo 80 caratteri. |
| `esercizi` | giorno | sì | Lista di esercizi, nell'ordine in cui li fai. |
| `nome` | esercizio | sì | Testo, massimo 80 caratteri. |
| `ripetizioni` | esercizio | sì | Un testo uguale per tutte le serie, oppure una lista di testi, uno per serie. Massimo 20 caratteri per voce. |
| `serie` | esercizio | dipende | Numero intero da 1 a 20. Obbligatorio se `ripetizioni` è un testo unico. |
| `recupero` | esercizio | no | Testo, massimo 30 caratteri, per esempio `"90s"`. |
| `nota` | esercizio | no | Testo, massimo 300 caratteri. |

## Regole

- **Serie uguali:** `"serie": 4, "ripetizioni": "8-10"` crea 4 serie da 8-10.
- **Serie diverse:** `"ripetizioni": ["12", "10", "8", "6"]` crea 4 serie, una per voce. In questo caso `serie` non serve; se c'è, deve coincidere con il numero di voci.
- **Ripetizioni come testo libero:** `"8"`, `"8-10"`, `"max"`, `"30s"` vanno tutti bene.
- **Nomi degli esercizi:** se un nome esiste già nell'app, l'esercizio viene collegato a quello esistente, ignorando maiuscole e spazi in eccesso ("panca  PIANA" e "Panca piana" sono lo stesso esercizio). Usa sempre lo stesso nome per lo stesso esercizio, altrimenti lo storico si divide.
- **Virgolette:** solo dritte (`"`), mai curve (`“ ”`).
- **Niente altro:** superserie, circuiti, tempi di esecuzione e simili non hanno un campo dedicato. Scrivili nella `nota`.

## Esempio completo

```json
{
  "nome": "Scheda novembre",
  "giorni": [
    {
      "nome": "Giorno A - Petto e tricipiti",
      "esercizi": [
        { "nome": "Panca piana", "serie": 4, "ripetizioni": "8-10", "recupero": "90s", "nota": "fermo al petto" },
        { "nome": "Panca inclinata manubri", "ripetizioni": ["12", "10", "8"], "recupero": "90s" },
        { "nome": "Croci ai cavi", "serie": 3, "ripetizioni": "12-15", "recupero": "60s" },
        { "nome": "Dip", "serie": 3, "ripetizioni": "max", "recupero": "90s" },
        { "nome": "Pushdown ai cavi", "serie": 3, "ripetizioni": "10-12", "recupero": "60s" }
      ]
    },
    {
      "nome": "Giorno B - Schiena e bicipiti",
      "esercizi": [
        { "nome": "Trazioni alla sbarra", "serie": 4, "ripetizioni": "max", "recupero": "120s" },
        { "nome": "Rematore con bilanciere", "serie": 4, "ripetizioni": "8-10", "recupero": "90s", "nota": "schiena piatta" },
        { "nome": "Lat machine", "ripetizioni": ["12", "10", "8", "8"], "recupero": "90s" },
        { "nome": "Curl con bilanciere", "serie": 3, "ripetizioni": "10", "recupero": "60s" },
        { "nome": "Plank", "serie": 3, "ripetizioni": "45s", "recupero": "45s" }
      ]
    },
    {
      "nome": "Giorno C - Gambe e spalle",
      "esercizi": [
        { "nome": "Squat", "ripetizioni": ["10", "8", "6", "6"], "recupero": "150s", "nota": "sotto il parallelo" },
        { "nome": "Leg press", "serie": 3, "ripetizioni": "10-12", "recupero": "120s" },
        { "nome": "Leg curl", "serie": 3, "ripetizioni": "12", "recupero": "60s" },
        { "nome": "Lento avanti manubri", "serie": 4, "ripetizioni": "8-10", "recupero": "90s" },
        { "nome": "Alzate laterali", "serie": 3, "ripetizioni": "15", "recupero": "45s" }
      ]
    }
  ]
}
```

## Richiesta pronta per un'altra chat

Copia il testo qui sotto in una chat di Claude, incolla tutto questo file e poi la tua scheda (testo o foto).

> Converti la mia scheda di allenamento nel formato JSON descritto qui sotto. Rispondi con il JSON in un unico blocco di codice. Rispetta queste regole: mantieni l'ordine dei giorni e degli esercizi; usa nomi degli esercizi brevi e sempre uguali per lo stesso esercizio; se le serie hanno ripetizioni diverse usa la lista in `ripetizioni`, altrimenti `serie` più `ripetizioni`; metti in `nota` tutto ciò che non ha un campo dedicato (superserie, tempi di esecuzione, indicazioni tecniche); se un dato non è leggibile o manca, non inventarlo e segnalamelo dopo il blocco di codice.
