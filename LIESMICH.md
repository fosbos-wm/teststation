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
