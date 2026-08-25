/* =========================================================
   Merkwissel via de URL.

     (geen parameter)  -> whitelabel, zonder logo
     ?brand=reijn      -> Reijn
     ?brand=aag        -> AAG

   Dit bestand hoort in de <head> te staan, vóór de pagina
   geschilderd wordt, zodat je geen kleurwissel ziet.
   ========================================================= */
(function (global) {
  'use strict';

  var MERKEN = {
    whitelabel: { naam: 'Visueel CV', logo: null, logoLight: null, kleur: '#3B6FD4' },
    reijn:      { naam: 'Reijn', logo: 'reijn-logo.png', logoLight: 'reijn-logo-light.png', kleur: '#E8641E' },
    // het AAG-logo bevat de naam al, dus het losse woordmerk gaat uit
    aag:        { naam: 'AAG',   logo: 'aag-logo.svg',   logoLight: 'aag-logo-light.svg',   kleur: '#F8AF5F', naamInLogo: true }
  };

  function gekozenMerk() {
    var m = /[?&]brand=([^&]*)/.exec(global.location.search);
    var naam = m ? decodeURIComponent(m[1]).toLowerCase() : '';
    return MERKEN[naam] ? naam : 'whitelabel';
  }

  var actief = gekozenMerk();
  var merk = MERKEN[actief];

  // meteen zetten, nog voor de eerste verf
  document.documentElement.setAttribute('data-brand', actief);

  /* een link die het merk meeneemt */
  function merkUrl(url) {
    if (actief === 'whitelabel') return url;
    if (!url || /^(https?:|mailto:|tel:|#|javascript:)/i.test(url)) return url;
    if (/[?&]brand=/.test(url)) return url;
    return url + (url.indexOf('?') > -1 ? '&' : '?') + 'brand=' + actief;
  }

  function toepassen() {
    /* logo's omwisselen — of verbergen bij whitelabel */
    var logos = document.querySelectorAll('img[src*="reijn-logo"],img[src*="aag-logo"],.brand-logo');
    Array.prototype.forEach.call(logos, function (img) {
      if (img.tagName !== 'IMG') return;
      img.classList.add('brand-logo');
      var licht = /-light/.test(img.getAttribute('src') || '');
      var bron = licht ? merk.logoLight : merk.logo;
      if (!bron) { img.style.display = 'none'; return; }
      img.style.display = '';
      img.src = bron;
      img.alt = merk.naam + ' logo';
    });

    /* woordmerk — weglaten als het logo de naam al toont */
    Array.prototype.forEach.call(document.querySelectorAll('.wm'), function (el) {
      if (merk.naamInLogo) { el.style.display = 'none'; return; }
      el.style.display = '';
      el.textContent = merk.naam;
    });
    // in de nav van het cv staat het woordmerk als losse tekst naast het logo
    Array.prototype.forEach.call(document.querySelectorAll('.brand'), function (el) {
      Array.prototype.forEach.call(el.childNodes, function (n) {
        if (n.nodeType === 3 && n.nodeValue.trim()) n.nodeValue = merk.naamInLogo ? '' : merk.naam;
      });
    });

    /* alle interne links het merk laten meenemen */
    if (actief !== 'whitelabel') {
      Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
        var h = a.getAttribute('href');
        if (h && h.indexOf('.html') > -1) a.setAttribute('href', merkUrl(h));
      });
    }

    /* de kiezer in Instellingen markeren */
    Array.prototype.forEach.call(document.querySelectorAll('[data-brandkeuze]'), function (a) {
      a.classList.toggle('on', a.getAttribute('data-brandkeuze') === actief);
    });
  }

  global.Merk = { actief: actief, naam: merk.naam, url: merkUrl, MERKEN: MERKEN };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', toepassen);
  else toepassen();

})(window);
