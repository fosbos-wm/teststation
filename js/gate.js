/* Zugangscode für die Teststation. Der Code steht nicht im Klartext hier, nur sein Prüfwert (SHA-256).
   Das ist eine Eingangshürde im Browser, keine Verschlüsselung: Wer die Dateien direkt abruft, sieht sie trotzdem.
   Der Code wird nur für diesen Browser-Tab gemerkt (sessionStorage), nichts wird gesendet. Groß-/Kleinschreibung ist egal.
   Neuer Code: SHA-256 von "ts-gate:" + Code in Kleinbuchstaben berechnen und unten bei HASH eintragen. */
(function(){
  var HASH="081a6a657e2129b63a68a7afdffd4e53319e3304990fbf699d439b2e541a8f80",KEY="ts-gate-ok";
  try{if(sessionStorage.getItem(KEY)===HASH)return}catch(e){}
  var st=document.createElement("style");
  st.textContent="html.tsg{overflow:hidden}html.tsg body>*:not(#tsg){visibility:hidden!important}#tsg{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;background:#f2f5f7;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#14222c}#tsg .k{width:min(420px,100%);background:#fff;border:1px solid #d3dde3;border-radius:14px;padding:26px;box-shadow:0 10px 30px rgba(0,0,0,.08)}#tsg h1{font-size:1.35rem;margin:0 0 6px}#tsg p{margin:0 0 16px;color:#566872;line-height:1.45}#tsg input{width:100%;box-sizing:border-box;font:inherit;padding:12px;border:1px solid #b9c7cf;border-radius:9px}#tsg button{margin-top:12px;width:100%;font:inherit;font-weight:700;padding:12px;border:0;border-radius:9px;background:#0e5a77;color:#fff;cursor:pointer}#tsg .e{color:#b3261e;min-height:1.3em;margin:8px 0 0;font-size:.92rem}";
  document.head.appendChild(st);
  document.documentElement.classList.add("tsg");
  function hex(buf){return Array.prototype.map.call(new Uint8Array(buf),function(b){return("0"+b.toString(16)).slice(-2)}).join("")}
  function bauen(){
    var d=document.createElement("div");d.id="tsg";
    d.innerHTML='<form class="k" autocomplete="off"><h1>Teststation</h1><p>Bitte gib den Zugangscode ein, um die Seite zu öffnen.</p><input type="password" id="tsgc" placeholder="Zugangscode" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Zugangscode"><div class="e" id="tsge" role="alert"></div><button type="submit">Öffnen</button></form>';
    document.body.appendChild(d);
    var f=d.querySelector("form"),i=d.querySelector("#tsgc"),e=d.querySelector("#tsge");
    setTimeout(function(){i.focus()},50);
    f.addEventListener("submit",function(ev){
      ev.preventDefault();
      if(!(window.crypto&&crypto.subtle)){e.textContent="Dieser Browser kann den Code hier nicht prüfen (bitte die https-Adresse verwenden).";return}
      var v=i.value.trim().toLowerCase();
      crypto.subtle.digest("SHA-256",new TextEncoder().encode("ts-gate:"+v)).then(function(b){
        if(hex(b)===HASH){try{sessionStorage.setItem(KEY,HASH)}catch(x){}document.documentElement.classList.remove("tsg");d.remove()}
        else{e.textContent="Der Code stimmt nicht.";i.select()}
      });
    });
  }
  if(document.body)bauen();else document.addEventListener("DOMContentLoaded",bauen);
})();
