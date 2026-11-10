/*! Guerra Incorp | Google Analytics 4 com consentimento prévio | v1.0.0 */
(function () {
  'use strict';
  var ID = 'G-9L4MM8LQKS', K = 'gi_ga_consent', D = document, W = window, on = false;
  var AVISO = 'https://www.guerraincorp.com.br/extra/privacidade/165';

  function rd() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function wr(v) { try { localStorage.setItem(K, v); } catch (e) {} }

  W.dataLayer = W.dataLayer || [];
  function gtag() { W.dataLayer.push(arguments); }
  // Nada é coletado e o gtag.js nem é baixado até haver aceite.
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', analytics_storage: 'denied'
  });

  function load() {
    if (on) return;
    on = true;
    W['ga-disable-' + ID] = false;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 34128000 // 13 meses
    });
    var s = D.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    D.head.appendChild(s);
  }

  function wipe() {
    var p = location.hostname.split('.'), ds = [''], i;
    for (i = 0; i < p.length - 1; i++) ds.push('.' + p.slice(i).join('.'));
    ds.push(location.hostname);
    D.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n === '_ga' || n === '_gid' || n.indexOf('_ga_') === 0 || n.indexOf('_gat') === 0) {
        ds.forEach(function (d) {
          D.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  function off() {
    W['ga-disable-' + ID] = true;
    gtag('consent', 'update', { analytics_storage: 'denied' });
    wipe();
  }

  function bar() {
    var b = D.getElementById('gi-ck');
    if (b) return b;
    var st = D.createElement('style');
    st.textContent =
      '#gi-ck{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;padding:14px 18px calc(14px + env(safe-area-inset-bottom,0));background:#212121;color:#f2f2f2;border-top:2px solid #987946;box-shadow:0 -8px 24px rgba(0,0,0,.3);font:13px/1.5 Montserrat,"Segoe UI",Arial,sans-serif}' +
      '#gi-ck[hidden]{display:none}' +
      '#gi-ck p{margin:0;flex:1 1 360px;max-width:900px}' +
      '#gi-ck a{color:#f6dfb4;text-decoration:underline}' +
      '#gi-ck div{display:flex;flex-wrap:wrap;gap:10px}' +
      '#gi-ck button{min-height:44px;padding:0 20px;border:2px solid #987946;border-radius:6px;background:#7a5f33;color:#fff;font:800 13px Montserrat,Arial,sans-serif;letter-spacing:.03em;text-transform:uppercase;cursor:pointer}' +
      '#gi-ck button[data-a="0"]{background:transparent;color:#f6dfb4}' +
      '#gi-ck button:focus-visible{outline:3px solid #0a66c2;outline-offset:2px}' +
      '@media(max-width:650px){#gi-ck div{width:100%}#gi-ck button{flex:1 1 100%}}';
    D.head.appendChild(st);
    b = D.createElement('div');
    b.id = 'gi-ck';
    b.hidden = true;
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Preferências de cookies');
    b.innerHTML =
      '<p>Podemos usar o Google Analytics para medir a audiência do site, somente se você autorizar. ' +
      'Sem a sua autorização, nenhum dado de análise é coletado. Você pode mudar a escolha a qualquer momento ' +
      'em “Preferências de cookies”, no rodapé. Saiba mais no ' +
      '<a href="' + AVISO + '">Aviso de Privacidade e Política de Cookies</a>.</p>' +
      '<div><button type="button" data-a="1">Aceitar análise de audiência</button>' +
      '<button type="button" data-a="0">Recusar</button></div>';
    b.addEventListener('click', function (e) {
      var a = e.target && e.target.getAttribute && e.target.getAttribute('data-a');
      if (a !== '0' && a !== '1') return;
      if (a === '1') { wr('1'); load(); } else { wr('0'); off(); }
      b.hidden = true;
      var n = D.querySelector('.cookiealert .acceptcookies'); // fecha também a faixa nativa
      if (n) n.click();
    });
    D.body.appendChild(b);
    return b;
  }

  function show() {
    var b = bar();
    b.hidden = false;
    var f = b.querySelector('button');
    if (f) f.focus({ preventScroll: true });
  }

  function foot() {
    if (D.querySelector('.gi-ck-pref')) return;
    var as = D.querySelectorAll('a[href*="extra/privacidade"]'), li = null, i, q;
    for (i = 0; i < as.length && !li; i++) { q = as[i].closest('li'); if (q) li = q; }
    if (!li) return;
    var n = li.cloneNode(false), k = D.createElement('a');
    k.href = '#';
    k.className = 'gi-ck-pref';
    k.textContent = 'Preferências de cookies';
    k.addEventListener('click', function (e) { e.preventDefault(); show(); });
    n.appendChild(k);
    li.parentNode.insertBefore(n, li.nextSibling);
  }

  function init() {
    foot();
    if (rd() === null) show();
  }

  if (rd() === '1') load();
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
  W.addEventListener('load', foot);
  setTimeout(foot, 1200);
  setTimeout(foot, 3500);
})();
