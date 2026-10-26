# portfolio

Persönliche Portfolio-Seite, gebaut mit reinem HTML, CSS und JavaScript ohne externe Abhängigkeiten.

## Zweck

Die Seite stellt mich, meinen Werdegang, meine Projekte und meine Skills vor.
Sie dient gleichzeitig als Übungsprojekt für sauberes, getestetes Frontend ohne Frameworks.

## Regeln

- Nur HTML, CSS und JavaScript (ES-Module)
- Keine Frameworks, keine Bibliotheken, kein npm, keine CDNs
- Logik (`js/`), Daten (`js/data/`) und Tests (`tests/`) sind getrennt
- Inhalte werden über `textContent` gesetzt, nie über `innerHTML`

## Projektstruktur

```
portfolio/
├── index.html              Einstiegsseite
├── css/style.css           Styles
├── js/main.js              Einstiegspunkt, verbindet Daten und Rendering
├── js/projects.js          Projektkarten: Rendering und Sortierung
├── js/timeline.js          Werdegang: Rendering, Sortierung, Zeitraum-Format
├── js/data/projects.js     Projektdaten
├── js/data/timeline.js     Werdegang-Daten
├── tests/test.html         Testseite im Browser
├── tests/test.css          Styles der Testseite
├── tests/index.js          Lädt alle Tests und startet den Runner
├── tests/runner.js         Eigener Test-Runner
├── tests/*.test.js         Tests
└── assets/                 Bilder und Icons
```

## Lokal starten

Da die Skripte als ES-Module geladen werden, muss die Seite über einen lokalen Server laufen.
Ein Doppelklick auf `index.html` reicht nicht.

**Variante 1 (IntelliJ):** Rechtsklick auf `index.html` → Open In → Browser → Chrome.

**Variante 2 (Terminal, Python erforderlich):**

```
python -m http.server 8000
```

Danach im Browser http://localhost:8000 öffnen.

## Tests ausführen

Die Tests laufen im Browser mit einem eigenen Test-Runner, ohne externe Abhängigkeiten.

**Variante 1 (IntelliJ):** Rechtsklick auf `tests/test.html` → Open In → Browser → Chrome.

**Variante 2 (Terminal):** Server wie oben starten und http://localhost:8000/tests/test.html öffnen.

Oben auf der Seite steht die Zusammenfassung, zum Beispiel "24 von 24 Tests bestanden".
Darunter steht jeder Test mit ✔ (bestanden) oder ✘ (fehlgeschlagen) samt Fehlermeldung.

### Neuen Test hinzufügen

1. In einer Datei `tests/*.test.js` die Funktionen `test` und `assertEquals` bzw. `assertDeepEquals` aus `./runner.js`
   importieren.
2. Den Test mit `test('Beschreibung', () => { … });` schreiben.
3. Neue Testdateien in `tests/index.js` importieren.