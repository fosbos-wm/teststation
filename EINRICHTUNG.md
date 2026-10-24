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
- `stationen/rennen.html` (Wichtel-Schubkarrenrennen für 2 bis 8 Teams an einem Bildschirm; Teamanzahl und Strecke werden in der Station gewählt, bei 3 bis 8 Teams antworten alle gleichzeitig über A/B/C/D-Tasten je Team): Inhalte als `inhalte/kurz-rennen-*.json` mit `{"titel","anleitung","fragen":[{"f","o":[Antworten],"r":Index der richtigen Antwort,"c":"Thema (optional)"}]}`. Mindestens 20 Fragen. Ohne Ergebniscode (`"ergebnis": false` im Katalog).

## Musik: Trompete in B (Noten und Griffe)

`stationen/trompete.html` ist eine eigenständige Station ohne Datensatz (die 60 Töne der Grifftabelle stehen direkt in der Datei, geprüft gegen die Standard-Grifftabelle für Trompete in B). Katalogeintrag: Fach „Musik“, Pfad `["Musik","Trompete"]`, `ergebnis:false` (Selbstkontrolle, kein Ergebniscode). Auswahl von Umfang, Lage und Übungsart erfolgt in der Station selbst. Tasten: Leertaste = Aufdecken, → = gewusst, ← = nochmal, 1/2/3 = Ventile drücken.

## Aula: Blindflug – Das Nebelgewölbe
`stationen/blindflug.html` (Katalogeintrag im Ordner **Aula**, ohne Ergebniscode). Spiel für zwei Teams an zwei Monitoren mit gleichem Bild, ohne Lernstoff, etwa 5–7 Minuten.
- **Aufbau:** Die Seite am Aula-Rechner im Vollbild öffnen (am besten direkt `…/stationen/blindflug.html`, ohne Leiste). Team links steuert mit W A S D (Zauber: E), Team rechts mit den Pfeiltasten (Zauber: Shift rechts). Zwei Gamepads (Anschluss 1 und 2) gehen auch. Pause: Esc, Ton: M, Vollbild: F.
- **Rollen:** Pilot:in steuert und sieht nur einen Lichtkreis. Navigator:in scannt den QR-Code der Startseite und sieht auf dem Handy die ganze Karte mit allen Fallgruben (aber nicht den Standort des Teams). Die Karte wird nur aus der Kartennummer berechnet, es gibt keine Verbindung zwischen Handy und Monitor und es werden keine Daten gespeichert oder gesendet.
- **Spiel:** Erst fünf Schlüsselrunen einsammeln (Reihenfolge frei), dann den Tresor erreichen. Zauberkugeln, Chaos-Ereignisse und der Aufholbonus für das hintere Team sorgen für Überraschungen. Nach 7 Minuten gewinnt das Team, das dem Tresor näher ist.
- **Anpassen:** Zeitlimit `ZEITLIMIT`, Anzahl der Schlüssel `NK`, Tempo in `speedOf` (oben in der Datei).

## Aula: Lichterkalender
`stationen/lichterkalender.html` mit den Inhalten in `inhalte/lichterkalender.json` (Ordner **Aula**, ohne Ergebniscode). Ein Winterdorf mit 24 Fenstern auf dem Aula-Monitor; jedes Fenster ist ein Türchen, das sich an einem Schultag öffnet (20.11. bis 23.12.2026, Türchen 24 am letzten Schultag). Ein QR-Code führt zur Tagesaufgabe auf dem Handy.
- **Aula-Monitor:** die Seite im Vollbild öffnen (`…/stationen/lichterkalender.html`). Sie zeigt automatisch das Türchen des Tages. An Wochenenden und in den Ferien bleibt das zuletzt geöffnete Türchen stehen.
- **Handy:** der QR-Code öffnet `…?rolle=tag&tag=N`. Es werden keine Daten gesendet oder gespeichert; nur der Haken „erledigt“ bleibt auf dem Handy.
- **Inhalte:** in `inhalte/lichterkalender.json`. Je Türchen: `art` (Aktion, Nur gemeinsam, Quiz, Mitmachen), `titel`, `text`, `dauer`, `spruch` (Muffelwicht), bei „Nur gemeinsam“ `hinweise` (Liste, je Handy ein Hinweis) und `loesung`, beim Quiz `antworten` (die erste Antwort ist die richtige) und `erklaerung`. Die Lösung steht im Klartext in der Datei und ist im Quelltext lesbar.
- **Gemeinsame Lichter:** `lichter` ist die Liste der Türchen-Nummern, deren Fenster leuchten. Das trägt die SMV oder die Lehrkraft von Hand nach (z. B. Tür 1, 2, 3 …). Die Stimmung des Muffelwichts hängt von der Anzahl der Lichter ab.
- **Vorschau:** `?heute=2026-11-26` simuliert ein Datum (auch auf dem Handy).
