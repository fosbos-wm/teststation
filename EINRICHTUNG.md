# Teststation – Einrichtung (ohne Firebase, ohne Klassenverwaltung)

Reine statische Seite für GitHub Pages. Keine Konten, keine Datenbank, keine Klassen. Jede Übung hat einen Link.

## Veröffentlichen
Alle Dateien samt Ordnern (`css`, `js`, `stationen`, `inhalte`) in ein GitHub-Repo, Settings → Pages → Branch `main`, Root.
Schüler: `https://<konto>.github.io/<repo>/` · Lehrkraft: `…/lehrer.html`

## Im Unterricht
1. `lehrer.html` öffnen, Übung(en) wählen, Einstellungen setzen (z. B. Mischungsnummer).
2. Link kopieren oder QR-Code groß auf dem Beamer zeigen.
   - Eine Übung gewählt: der Link startet sie sofort.
   - Mehrere gewählt: die Schüler sehen nur diese Auswahl und tippen eine an.
3. Optional: Teams nennen ihr Team (1–30) auf der Startseite. Nach der Übung zeigt jedes Team seinen **Ergebniscode**; diese unter „Rangliste“ eintragen → Beamer-Ansicht.

Hinweis: Ergebniscodes lassen sich theoretisch selbst erzeugen – die Rangliste ist für Unterrichtsspiele, nicht für Noten.

## Neue Übung
- Zuordnung: `inhalte/<name>.json` (`{titel, anleitung, paare:[[Begriff, Erklärung],…]}`); Eintrag in `stationen/katalog.json` mit `"datei":"zuordnung.html?set=<name>"`.
- K-Prim: `inhalte/<name>.json` (`{titel, anleitung, aufgaben:[{frage, statements:[{text, richtig}]}]}`); `"datei":"kprim.html?set=<name>"`.
- Eigene HTML-Seite in `stationen/`: erhält `?ts=1&team=N&…`; Ergebnis melden mit `parent.postMessage({tsResult:{punkte,max,zuege,sekunden}},"*")`. Keine externen Ressourcen laden.

## Ordner
Die Startseite gliedert die Übungen automatisch in Ordner. In `stationen/katalog.json` bekommt jede Übung das Feld `"pfad"`, z. B.
`"pfad": ["Pädagogik/Psychologie", "LB 1", "Entwicklung"]` (Fach > Lernbereich > Thema). Beliebig viele Ebenen sind möglich.
Ohne `pfad` gilt `["fach", "thema"]`. Neues Fach, neuer Lernbereich oder neues Thema = einfach neuen Namen eintragen, der Ordner entsteht von selbst.
Der QR-Code eines Ordners steht im aufgeklappten Ordner (Link: `index.html?ordner=Pädagogik/Psychologie/LB 1`).

## Neue Spiele
- `stationen/tetris.html` (Begriffe-Tetris): Inhalte als `inhalte/kurz-tetris-*.json` mit `{"titel","art":"bedeutung","anleitung","karten":[{"begriff","bedeutung","t"}],"faelle":[{"f","o","r","c","fall":1}]}`. `art` ist `"bedeutung"` (fallbezogene Bedeutung und Verständnis von Fachbegriffen) oder `"definition"` (dann heißen die Fragen „Definition“; die Textfelder heißen weiterhin `bedeutung`, alternativ `definition`). `faelle` sind Zuordnungsfragen zu Fällen (`fall`:1) oder Aussagen (`fall`:0). Mindestens 8 Karten, `t` = Unterthema.
- `stationen/rennen.html` (Wichtel-Schubkarrenrennen für 2 Teams an einem Bildschirm): Inhalte als `inhalte/kurz-rennen-*.json` mit `{"titel","anleitung","fragen":[{"f","o":[Antworten],"r":Index der richtigen Antwort,"c":"Thema (optional)"}]}`. Mindestens 20 Fragen. Ohne Ergebniscode (`"ergebnis": false` im Katalog).
