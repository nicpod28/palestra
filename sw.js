// Service worker: tiene una copia dell'app sul telefono, così funziona senza connessione.
// A OGNI MODIFICA PUBBLICATA aumenta questo numero di 1: è ciò che fa arrivare l'aggiornamento al telefono.
const VERSIONE = 1;

const CACHE = 'palestra-v' + VERSIONE;
const FILE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icone/icona-180.png',
  'icone/icona-192.png',
  'icone/icona-512.png'
];

// Installazione: scarico tutti i file freschi nella nuova copia.
self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(FILE.map(function (f) { return new Request(f, { cache: 'reload' }); }));
    })
  );
});

// Attivazione: butto le copie delle versioni vecchie. I dati in localStorage non vengono toccati.
self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nomi) {
      return Promise.all(nomi.filter(function (n) { return n.indexOf('palestra-v') === 0 && n !== CACHE; })
        .map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Richieste: rispondo dalla copia sul telefono; solo se manca provo la rete.
self.addEventListener('fetch', function (evento) {
  const richiesta = evento.request;
  if (richiesta.method !== 'GET' || new URL(richiesta.url).origin !== self.location.origin) return;
  evento.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(richiesta, { ignoreSearch: true }).then(function (copia) {
        if (copia) return copia;
        if (richiesta.mode === 'navigate') return cache.match('index.html');
        return fetch(richiesta);
      });
    })
  );
});

// La pagina chiede di passare alla nuova versione quando l'utente tocca l'avviso.
self.addEventListener('message', function (evento) {
  if (evento.data === 'aggiorna') self.skipWaiting();
});
