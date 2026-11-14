# Sinn suchen – Sinn finden (Teststation, Ordner Resilienz)

Einzelübung zum Kartensortieren: 26 Karten sortieren, auf genau 5 eingrenzen, Fragen für die Praxis beantworten, Dokument zur Mitnahme.

## Dateien ins Repo der Teststation
- `stationen/sinn-karten.html` (neu, in den Ordner `stationen/`)
- `inhalte/resilienz-sinn-suchen-sinn-finden.json` (neu, in den Ordner `inhalte/`)
- `stationen/katalog.json` (bestehende Datei ändern): Den Inhalt von `katalog-eintrag.json` als weiteren Eintrag am Ende der Liste einfügen (vorher ein Komma setzen).

Danach erscheint in der Übersicht der Ordner „Resilienz“ mit der Übung „Sinn suchen – Sinn finden“.

## Hinweise
- Es werden keine Daten gespeichert oder gesendet. Antworten liegen nur im Arbeitsspeicher der Seite.
- Karten und Fragen stehen in der JSON-Datei und lassen sich dort ändern (Text, Zuordnung zur Sinndimension).
- Quelle der Idee: LeBe-Kartenmethode (Lebensbedeutungen und Lebenssinn), Tatjana Schnell. Die Kartentexte und Fragen sind eigens formuliert.

## Zugangscode (verschlüsselte Übung)
Die Datei `inhalte/resilienz-sinn-suchen-sinn-finden.json` liegt verschlüsselt im Repo (AES-256, Schlüssel aus dem 8-stelligen Code). Wer nur den Link hat, sieht eine Code-Abfrage und kann weder die Übung starten noch den Inhalt lesen. Die Schüler geben den Code ein, den die Lehrkraft nennt (Groß-/Kleinschreibung egal). Der Code wird nur im Browser geprüft, nichts wird gespeichert oder gesendet. Nach dem Neuladen der Seite muss der Code erneut eingegeben werden.

Neue Datei oder neuer Code: `werkzeug/verschluesseln.html` öffnen (läuft nur im Browser), die Klartext-Datei der Übung wählen, Code festlegen oder Zufallscode erzeugen, „Verschlüsseln“, die heruntergeladene Datei ersetzt die Datei in `inhalte/`. Die Klartext-Datei und den Code nicht ins Repo legen, sondern bei sich aufbewahren. Der Code lässt sich nicht wiederherstellen.

Dateien im Repo: `stationen/sinn-karten.html` (geändert), `inhalte/resilienz-sinn-suchen-sinn-finden.json` (ersetzt durch die verschlüsselte Fassung), `werkzeug/verschluesseln.html` (neu, Ordner `werkzeug/` anlegen), `LIESMICH.md` (optional).

## Rückweg aus einer Übung
In `station.html` führt der Knopf oben nur dorthin, wo man hergekommen ist: bei einem Link mit Auswahl zurück zur Auswahl, bei einem Ordner-Link zurück zum Ordner, bei einem Klick aus der Gesamtübersicht zurück zu „Alle Übungen“. Bei einem direkten Link zu genau einer Übung (z. B. aus `lehrer.html` oder per QR-Code) gibt es keinen Knopf zu „Alle Übungen“. Dazu hängt `index.html` an die Übungs-Links `von=1` (und `ordner=…`). Das ist keine Sicherheitssperre: Die Zurück-Taste des Browsers und das Eintippen der Startadresse bleiben möglich.
Geänderte Dateien: `station.html`, `index.html`.

## Kurzarbeit 11. Klasse Nachsorge (Ordner Pädagogik/Psychologie)
Vier Einzelübungen zum Fall Mira, jeweils zum Durchklicken mit Rückmeldung, ohne Punkte: Aufbau üben, Theorie beschreiben üben, Fallbezug üben, Schreiben eines Aufsatzes üben.
Dateien: `stationen/kurs.html` (neu), `inhalte/kurzarbeit-aufbau.json`, `kurzarbeit-theorie.json`, `kurzarbeit-fallbezug.json`, `kurzarbeit-schreiben.json` (neu), `stationen/katalog.json` (vier Einträge am Ende ergänzt).
Es wird nichts gespeichert; Eingaben liegen nur im Arbeitsspeicher der Seite. Weitere Übungen dieser Art: neue JSON in `inhalte/` und ein Katalogeintrag mit `"datei":"kurs.html?set=<name>"`.

## Kurzarbeit 11. und 12. Klasse (Ordner Pädagogik/Psychologie > Kurzarbeit)
Unter „Kurzarbeit“ gibt es zwei Unterordner: „11. Klasse“ (vier Übungen zum Fall Mira) und „12. Klasse“ (vier Übungen zum Fall Tim: Aufbau üben, Theorie beschreiben üben, Fallbezug üben, Schreiben eines Aufsatzes üben).
Dateien: `inhalte/kurzarbeit-12-aufbau.json`, `kurzarbeit-12-theorie.json`, `kurzarbeit-12-fallbezug.json`, `kurzarbeit-12-schreiben.json` (neu), `inhalte/kurzarbeit-theorie.json` (Satzfehler korrigiert), `stationen/katalog.json` (Pfade geändert, vier Einträge ergänzt), `station.html` (Knopf „Alle Übungen“ entfernt: Zurück gibt es nur noch zur Auswahl oder zum Ordner), `LIESMICH.md`.

## Zugangscode für die ganze Teststation
Beim Öffnen jeder Seite (außer `datenschutz.html`) erscheint eine Code-Abfrage. Der Code ist `fosbos_2026/27`, Groß-/Kleinschreibung ist egal. Der Code steht nicht im Klartext im Repo, nur sein Prüfwert in `js/gate.js`. Er wird pro Browser-Tab gemerkt (nach Schließen des Tabs wieder fragen), nichts wird gesendet.
Das ist eine Eingangshürde im Browser, keine Verschlüsselung: Wer die Dateien direkt im Repo oder per Adresse abruft, sieht den Inhalt trotzdem.
Neuer Code: SHA-256 von `ts-gate:` + Code in Kleinbuchstaben berechnen und in `js/gate.js` bei `HASH` eintragen.
Dateien: `js/gate.js` (neu), alle `.html`-Dateien im Hauptordner, in `stationen/` und `werkzeug/` (je eine Zeile `<script src="…gate.js">` am Anfang von `<head>`).
