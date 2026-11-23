# portfolio

Persönliche Portfolio-Seite, gebaut mit reinem HTML, CSS und JavaScript ohne externe Abhängigkeiten.

## Zweck

Die Seite stellt mich, meinen Werdegang, meine Projekte und meine Skills vor.
Sie dient gleichzeitig als Übungsprojekt für sauberes, getestetes und barrierefreies Frontend ohne Frameworks.

## Regeln

- Nur HTML, CSS und JavaScript (ES-Module)
- Keine Frameworks, keine Bibliotheken, kein npm, keine CDNs
- Logik (`js/`), Daten (`js/data/`) und Tests (`tests/`) sind getrennt
- Inhalte werden über `textContent` gesetzt, nie über `innerHTML`
- Anzeigetexte im JavaScript stehen nur im Wörterbuch, nie fest im Code
- Farben stehen nur als Variablen in `:root`, nie fest im restlichen CSS

## Projektstruktur

```
portfolio/
├── index.html                Einstiegsseite (inkl. kleinem Theme-Script im <head>)
├── css/style.css             Styles, helles und dunkles Farbschema
├── js/main.js                Einstiegspunkt, verbindet Daten, Rendering, Sprache und Theme
├── js/projects.js            Projektkarten: Rendering und Sortierung
├── js/timeline.js            Werdegang: Rendering, Sortierung, Zeitraum-Format
├── js/filter.js              Technologie-Filter: Tags, Filtern, Buttons, Ansage
├── js/i18n.js                Übersetzung, Einzahl/Mehrzahl, Spracherkennung, localize (ohne DOM)
├── js/i18n-dom.js            Übersetzungen ins HTML schreiben, Sprach-Buttons aktualisieren
├── js/theme.js               Theme bestimmen, umschalten und anwenden
├── js/storage.js             Sicheres Lesen und Speichern in localStorage
├── js/data/projects.js       Projektdaten (Deutsch und Englisch)
├── js/data/timeline.js       Werdegang-Daten (Deutsch und Englisch)
├── js/data/translations.js   Wörterbuch (Deutsch und Englisch)
├── tests/test.html           Testseite im Browser
├── tests/test.css            Styles der Testseite
├── tests/index.js            Lädt alle Tests und startet den Runner
├── tests/runner.js           Eigener Test-Runner
├── tests/*.test.js           Tests
└── assets/                   Bilder und Icons
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

Oben auf der Seite steht die Zusammenfassung "X von Y Tests bestanden".
Darunter steht jeder Test mit ✔ (bestanden) oder ✘ (fehlgeschlagen) samt Fehlermeldung.

### Neuen Test hinzufügen

1. In einer Datei `tests/*.test.js` die Funktionen `test` und `assertEquals` bzw. `assertDeepEquals` aus `./runner.js`
   importieren.
2. Den Test mit `test('Beschreibung', () => { … });` schreiben.
3. Neue Testdateien in `tests/index.js` importieren.

## Übersetzungen

Die Seite ist auf Deutsch und Englisch verfügbar. Über die Buttons DE und EN im Header wird gewechselt.

**Sprachwahl beim Laden:**

1. zuletzt gewählte Sprache (in `localStorage`),
2. sonst die Browsersprache (`de-CH` → Deutsch, `en-US` → Englisch),
3. sonst Deutsch.

**Texte im JavaScript** stehen in `js/data/translations.js`:

- Platzhalter stehen in geschweiften Klammern, zum Beispiel `"seit {year}"`.
- Fehlt ein Schlüssel in einer Sprache, wird Deutsch verwendet.
- Fehlt er auch dort, erscheint der Schlüssel selbst auf der Seite. So fallen fehlende Übersetzungen sofort auf.
- Für Einzahl und Mehrzahl gibt es zwei Schlüssel mit der Endung `.one` und `.other`.

**Texte im HTML** haben ein Attribut mit dem Schlüssel:

- `data-i18n="nav.about"` übersetzt den Text des Elements. Achtung: Der gesamte Inhalt wird ersetzt,
  deshalb nur auf Elementen ohne verschachtelte Links verwenden.
- `data-i18n-aria-label="nav.label"` übersetzt das `aria-label`.

**Wichtig beim Ändern deutscher Texte:** Der deutsche Text steht an **zwei Stellen**, direkt im HTML
(damit die Seite auch ohne JavaScript lesbar ist) und in `js/data/translations.js`. Beide Stellen müssen
gleich bleiben.

**Daten** (Titel, Beschreibungen) sind entweder ein einfacher Text, der in allen Sprachen gleich ist,
oder ein Objekt wie `{de: '…', en: '…'}`.

## Helles und dunkles Farbschema

Über den Mond-Button im Header wird zwischen hell und dunkel gewechselt.

- Ohne eigene Wahl folgt die Seite der Systemeinstellung (`prefers-color-scheme`).
- Eine aktive Wahl wird in `localStorage` gespeichert und als `data-theme` auf `<html>` gesetzt.
- Ein kleines Script im `<head>` setzt die gespeicherte Wahl, bevor die Seite gezeichnet wird.
  So blitzt die Seite beim Laden nicht kurz im falschen Farbschema auf.

Die dunklen Farbwerte stehen in `css/style.css` an zwei Stellen (Systemeinstellung und aktive Wahl)
und müssen dort gleich bleiben.

Ist `localStorage` blockiert, funktionieren Sprache und Theme trotzdem, die Wahl wird nur nicht gemerkt.

## Barrierefreiheit

- Skip-Link "Zum Inhalt springen" als erstes Element, sichtbar bei Tastaturfokus
- Alle Bedienelemente sind echte Buttons oder Links, mit sichtbarem Fokus in beiden Farbschemata
- Umschalter (Filter, Sprache, Theme) zeigen ihren Zustand mit `aria-pressed`
- Der aktive Zustand ist nicht nur an der Farbe erkennbar (gefüllt, fett, ✓)
- Änderungen der Projektliste werden über eine `aria-live`-Region angesagt
- `<html lang>` wechselt mit der Sprache
- Alle Textfarben erreichen in beiden Farbschemata mindestens 4.5:1 Kontrast