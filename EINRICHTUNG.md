# Teststation – Einrichtung (ohne Firebase)

Reine statische Seite für GitHub Pages. Kein Server, keine Konten, keine Datenbank.

## Veröffentlichen
Alle Dateien in ein GitHub-Repo (z. B. `teststation`), Settings → Pages → Branch `main`, Root.
Schüler: `https://<konto>.github.io/teststation/` · Lehrkraft: `…/lehrer.html`

## Ablauf im Unterricht
1. `lehrer.html`: Klasse anlegen (erzeugt den Klassencode), Station wählen, Parameter setzen, „Zur Klasse hinzufügen“.
2. Den Text unter „Veröffentlichen“ in `klassen.json` im Repo einfügen und committen (ca. 1 Minute bis zur Sichtbarkeit).
3. Klassencode oder QR-Code zeigen. Schüler geben Code und Teamnummer ein und starten die Stationen.
4. Nach der Übung zeigt jedes Team seinen **Ergebniscode**. In `lehrer.html` → Rangliste eintragen (eine Zeile pro Code) → Beamer-Ansicht.
5. Stationen sperren: „Schließen“ und `klassen.json` erneut veröffentlichen.

Hinweis: Alles in `klassen.json` ist öffentlich lesbar (nur Klassencode, Klassenname, Stationen, keine Personendaten). Ergebniscodes können Schüler theoretisch selbst erzeugen – die Rangliste ist für Unterrichtsspiele gedacht, nicht für Noten.

## Neue Station
- Zuordnung: `inhalte/<name>.json` (`{titel, anleitung, paare:[[Begriff, Erklärung],…]}`); Eintrag in `stationen/katalog.json` mit `"datei":"zuordnung.html?set=<name>"`.
- K-Prim: `inhalte/<name>.json` (`{titel, anleitung, aufgaben:[{frage, statements:[{text, richtig}]}]}`); `"datei":"kprim.html?set=<name>"`.
- Eigene HTML-Seite in `stationen/`: erhält `?ts=1&team=N&…`; Ergebnis melden mit `parent.postMessage({tsResult:{punkte,max,zuege,sekunden}},"*")`. Keine externen Ressourcen laden.

## Später Firebase?
Die Station↔Rahmen-Schnittstelle (`tsResult`) bleibt gleich; Live-Rangliste könnte später nachgerüstet werden.
