#!/usr/bin/env python3
"""Crea le icone dell'app (un manubrio bianco su fondo blu) senza programmi esterni.
Uso: python3 crea-icone.py"""
import struct
import zlib

SFONDO = (11, 87, 208)
BIANCO = (255, 255, 255)

# Rettangoli del manubrio: (x1, y1, x2, y2) come frazioni del lato.
# Restano nella zona centrale, così l'icona regge anche il ritaglio tondo di Android.
RETTANGOLI = [
    (0.24, 0.47, 0.76, 0.53),  # barra
    (0.30, 0.34, 0.38, 0.66),  # disco grande sinistro
    (0.62, 0.34, 0.70, 0.66),  # disco grande destro
    (0.22, 0.40, 0.28, 0.60),  # disco piccolo sinistro
    (0.72, 0.40, 0.78, 0.60),  # disco piccolo destro
]


def blocco(tipo, contenuto):
    corpo = tipo + contenuto
    return struct.pack(">I", len(contenuto)) + corpo + struct.pack(">I", zlib.crc32(corpo))


def crea(lato, percorso):
    righe = bytearray()
    for y in range(lato):
        righe.append(0)  # nessun filtro PNG su questa riga
        for x in range(lato):
            fx, fy = (x + 0.5) / lato, (y + 0.5) / lato
            dentro = any(a <= fx < c and b <= fy < d for a, b, c, d in RETTANGOLI)
            righe.extend(BIANCO if dentro else SFONDO)
    png = b"\x89PNG\r\n\x1a\n"
    png += blocco(b"IHDR", struct.pack(">IIBBBBB", lato, lato, 8, 2, 0, 0, 0))
    png += blocco(b"IDAT", zlib.compress(bytes(righe), 9))
    png += blocco(b"IEND", b"")
    with open(percorso, "wb") as f:
        f.write(png)
    print("creata", percorso)


for lato in (180, 192, 512):
    crea(lato, "icone/icona-%d.png" % lato)
