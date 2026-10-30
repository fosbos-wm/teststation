/* Realschule Sozialwesen 7 – gemeinsame Bausteine der Übungen: Laden, Lob (unregelmäßig), Konfetti, Sterne, Bestwerte.
   Alles bleibt im Browser: gespeichert wird nur der Bestwert je Übung in localStorage. Es wird nichts gesendet. */
(function () {
  "use strict";
  const QS = new URLSearchParams(location.search);
  const RS = (window.RS = {});
  RS.QS = QS;
  RS.SET = (QS.get("set") || "").replace(/[^a-z0-9\-]/gi, "");
  RS.TS = QS.get("ts") === "1"; /* Station läuft im Rahmen von station.html (Teststation) */
  RS.$ = id => document.getElementById(id);
  RS.esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  RS.rnd = n => Math.floor(Math.random() * n);
  RS.pick = a => a[RS.rnd(a.length)];
  RS.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = RS.rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  RS.para = s => String(s == null ? "" : s).split(/\n+/).map(p => "<p>" + RS.esc(p) + "</p>").join("");
  RS.reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  RS.store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } }
  };

  /* ---------- Laden ---------- */
  RS.load = function (cb) {
    const kopf = RS.$("kopf");
    fetch("../inhalte/realschule/" + RS.SET + ".json", { cache: "no-cache" })
      .then(r => { if (!r.ok) throw new Error("nf"); return r.json(); })
      .then(d => {
        RS.D = d;
        document.title = d.titel + " – Sozialwesen 7";
        kopf.innerHTML =
          (RS.TS ? "" : '<a class="zurueck" href="../realschule.html">← Übersicht</a>') +
          "<h1>" + RS.esc(d.titel) + "</h1>" +
          '<p class="anleitung">' + RS.esc(d.anleitung || "") + "</p>" +
          '<div class="meter" id="meter" hidden><div class="bar" role="progressbar" aria-label="Fortschritt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="barfill"></i></div><span class="mtxt" id="mtxt"></span><span class="flamme" id="flamme"></span></div>';
        cb(d);
      })
      .catch(() => { kopf.innerHTML = '<p class="msg bad">Die Übung konnte nicht geladen werden. Prüfe die Verbindung und lade die Seite neu.</p>'; });
  };

  /* Fortschrittsbalken: fertig von gesamt, Serie (richtige in Folge) */
  RS.meter = function (fertig, gesamt, serie) {
    const m = RS.$("meter"); if (!m) return;
    m.hidden = false;
    const p = gesamt ? Math.round(100 * fertig / gesamt) : 0;
    RS.$("barfill").style.width = p + "%";
    m.querySelector(".bar").setAttribute("aria-valuenow", String(p));
    RS.$("mtxt").textContent = fertig + " / " + gesamt;
    RS.$("flamme").textContent = serie >= 2 ? "🔥 " + serie : "";
  };

  /* ---------- Lob: unregelmäßig, damit es nicht abnutzt ---------- */
  const RICHTIG = ["Richtig!", "Genau!", "Stark!", "Sehr gut!", "Das sitzt!", "Klasse!", "Top!", "Saubere Arbeit!", "Gut erkannt!", "So geht das!", "Volltreffer!"];
  const SERIE = {
    3: "Drei richtige in Folge – du bist im Flow! 🔥",
    5: "Fünf in Folge! Das läuft richtig gut! 🔥🔥",
    8: "Acht richtige hintereinander – wow! 🚀",
    10: "Zehn in Folge! Du bist nicht zu stoppen! 🏆",
    15: "Fünfzehn in Folge – das ist Experten-Niveau! 👑"
  };
  const TROST = [
    "Nicht ganz – aber genau dafür übst du. Lies kurz die Erklärung.",
    "Fast! Jetzt weißt du es für das nächste Mal.",
    "Fehler sind hier ausdrücklich erlaubt – so lernt das Gehirn am meisten.",
    "Kein Problem, merk dir den Unterschied. Das kommt wieder dran!",
    "Gut, dass es hier passiert und nicht in der Stegreifaufgabe. 😉"
  ];
  const HALB = ["Halbzeit! Du bist auf einem guten Weg. 💪", "Die Hälfte ist geschafft – weiter so! ✨", "Halbzeit! Kurz durchatmen und dann weiter. 🌟"];
  RS.lobRichtig = function (serie) {
    if (SERIE[serie]) return { t: SERIE[serie], gross: true };
    if (Math.random() < 0.4) return { t: RS.pick(RICHTIG), gross: false };
    return null;
  };
  RS.trost = () => (Math.random() < 0.75 ? RS.pick(TROST) : null);
  RS.halbzeit = () => RS.pick(HALB);

  let bubbleTimer = null;
  RS.sag = function (text, gross) {
    if (!text) return;
    let b = RS.$("rsBubble");
    if (!b) {
      b = document.createElement("div");
      b.id = "rsBubble"; b.className = "bubble"; b.setAttribute("role", "status"); b.setAttribute("aria-live", "polite");
      b.innerHTML = '<span class="eule" aria-hidden="true">🦉</span><span class="btxt"></span>';
      document.body.appendChild(b);
    }
    b.querySelector(".btxt").textContent = text;
    b.classList.toggle("gross", !!gross);
    b.classList.add("show");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => b.classList.remove("show"), gross ? 3800 : 2400);
    if (gross && /🔥🔥|🚀|🏆|👑/.test(text)) RS.konfetti(30);
  };

  RS.konfetti = function (n) {
    if (RS.reduced) return;
    n = n || 60;
    const c = document.createElement("div");
    c.className = "konfetti"; c.setAttribute("aria-hidden", "true");
    const cols = ["#f2a900", "#c2255c", "#1b7f4b", "#0e5a77", "#7048e8", "#e8590c"];
    for (let i = 0; i < n; i++) {
      const s = document.createElement("i");
      s.style.left = Math.random() * 100 + "%";
      s.style.background = cols[i % cols.length];
      s.style.animationDelay = (Math.random() * 0.6).toFixed(2) + "s";
      s.style.animationDuration = (1.6 + Math.random() * 1.4).toFixed(2) + "s";
      s.style.transform = "rotate(" + Math.round(Math.random() * 360) + "deg)";
      c.appendChild(s);
    }
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3800);
  };

  /* ---------- Ergebnis ---------- */
  RS.sterne = p => (p >= 90 ? 3 : p >= 75 ? 2 : p >= 50 ? 1 : 0);
  RS.endtext = p =>
    p >= 100 ? "Perfekt – fehlerfrei! 🏆"
      : p >= 90 ? "Sensationell! Fast alles sitzt. 🌟"
        : p >= 75 ? "Sehr gut! Nur noch Feinschliff. 👏"
          : p >= 50 ? "Gute Basis! Lies dir die Lösungen an und probiere es noch einmal. 💪"
            : "Der erste Durchgang ist geschafft – jetzt kommt das Lernen: Lösungen ansehen und noch einmal versuchen. Du schaffst das! 🌱";
  RS.speichern = function (p) {
    const k = "rs-best-" + RS.SET;
    let alt = null;
    try { alt = JSON.parse(RS.store.get(k) || "null"); } catch (e) { }
    const vorher = alt && typeof alt.p === "number" ? alt.p : null;
    const best = vorher !== null && vorher >= p ? vorher : p;
    RS.store.set(k, JSON.stringify({ p: best, t: Date.now() }));
    return { best, vorher, neu: vorher === null || p > vorher };
  };

  RS.naechste = function (cb) {
    fetch("katalog.json", { cache: "no-cache" }).then(r => r.json()).then(kat => {
      const liste = kat.filter(s => s.pfad && s.pfad[0] === "Realschule");
      const get = s => ((s.datei || "").match(/[?&]set=([a-z0-9\-]+)/i) || [])[1];
      const i = liste.findIndex(s => get(s) === RS.SET);
      cb(i >= 0 && liste[i + 1] ? liste[i + 1] : null);
    }).catch(() => cb(null));
  };

  /* Ergebniskarte. o = { punkte, max, extra (HTML), loesung (Funktion), wiederholen (Funktion), fehler (Anzahl) } */
  RS.endkarte = function (el, o) {
    const p = Math.round(100 * o.punkte / Math.max(1, o.max));
    const sp = RS.speichern(p);
    const s = RS.sterne(p);
    const abz = (RS.D && RS.D.abzeichen) || "🏅";
    let sternHtml = "";
    for (let i = 0; i < 3; i++) sternHtml += '<span class="' + (i < s ? "an" : "aus") + '">⭐</span>';
    el.innerHTML =
      '<div class="card ende"><div class="sterne" aria-label="' + s + ' von 3 Sternen">' + sternHtml + "</div>" +
      '<p class="punkte">' + o.punkte + " von " + o.max + " (" + p + " %)</p>" +
      '<p class="lob">' + RS.endtext(p) + "</p>" +
      (o.extra ? '<p class="muted small">' + o.extra + "</p>" : "") +
      (s >= 2 ? '<div class="abz"><span aria-hidden="true">' + RS.esc(abz) + "</span> Abzeichen gesammelt!</div>" : '<p class="muted small">Ab 75 % bekommst du das Abzeichen ' + RS.esc(abz) + " für diese Übung.</p>") +
      (sp.vorher !== null && sp.neu ? '<p class="neu">Neuer Bestwert: vorher ' + sp.vorher + " %, jetzt " + p + " %! 📈</p>" : "") +
      '<div class="aktion">' +
      (o.loesung ? '<button type="button" class="btn" id="rsLoesung">Lösungen ansehen</button>' : "") +
      (o.fehler > 0 && o.wiederholen ? '<button type="button" class="btn alt" id="rsFehler">Fehler wiederholen (' + o.fehler + ")</button>" : "") +
      '<button type="button" class="btn alt" id="rsNochmal">Noch einmal</button>' +
      (RS.TS ? "" : '<a class="btn alt" id="rsNext" href="#" hidden>Nächste Übung →</a><a class="btn alt" href="../realschule.html">Zur Übersicht</a>') +
      "</div></div>";
    if (o.loesung) RS.$("rsLoesung").addEventListener("click", () => { o.loesung(); RS.$("rsLoesung").disabled = true; });
    if (o.fehler > 0 && o.wiederholen) RS.$("rsFehler").addEventListener("click", o.wiederholen);
    RS.$("rsNochmal").addEventListener("click", () => location.reload());
    if (!RS.TS) RS.naechste(n => { if (n) { const a = RS.$("rsNext"); a.href = n.datei; a.hidden = false; } });
    if (s >= 2) RS.konfetti(70);
    el.scrollIntoView({ behavior: RS.reduced ? "auto" : "smooth", block: "start" });
  };
})();
