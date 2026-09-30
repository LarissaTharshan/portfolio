# portfolio

Persönliche Portfolio-Seite, gebaut mit reinem HTML, CSS und JavaScript ohne externe Abhängigkeiten.

## Zweck

Die Seite stellt mich, meinen Werdegang, meine Projekte und meine Skills vor.
Sie dient gleichzeitig als Übungsprojekt für sauberes, getestetes Frontend ohne Frameworks.

## Regeln

- Nur HTML, CSS und JavaScript (ES-Module)
- Keine Frameworks, keine Bibliotheken, kein npm, keine CDNs
- Logik (`js/`), Daten (`js/data/`) und Tests (`tests/`) sind getrennt

## Projektstruktur

```
portfolio/
├── index.html      Einstiegsseite
├── css/style.css   Styles
├── js/main.js      Einstiegspunkt für JavaScript
├── js/data/        Daten (Projekte, Übersetzungen)
├── tests/test.html Test-Runner im Browser
└── assets/         Bilder und Icons
```

## Lokal starten

Da `main.js` als ES-Modul geladen wird, muss die Seite über einen lokalen Server laufen.
Ein Doppelklick auf `index.html` reicht nicht.

**Variante 1 (IntelliJ):** `index.html` öffnen und oben rechts im Editor auf ein Browser-Symbol klicken.

**Variante 2 (Terminal, Python erforderlich):**

```
python -m http.server 8000
```

Danach im Browser http://localhost:8000 öffnen.

## Tests ausführen

Folgt.