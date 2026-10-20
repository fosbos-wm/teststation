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

## Ordner (Fach > Thema)
Die Startseite gliedert die Übungen automatisch in Ordner. In `stationen/katalog.json` bekommt jede Übung zwei Felder:
`"fach": "Italienisch"` (Hauptordner) und `"thema": "Artikel"` (Unterordner). Neues Fach oder neues Thema = einfach neuen Namen eintragen, der Ordner entsteht von selbst.
