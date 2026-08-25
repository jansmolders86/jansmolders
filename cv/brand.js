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
    whitelabel: {
      naam: 'Visueel CV',            // productnaam in de zijbalk
      org: 'Voorbeeld',              // organisatienaam in teksten en e-mails
      domein: 'voorbeeld.nl',
      adres: 'Voorbeeldstraat 1, Amsterdam',
      logo: null, logoLight: null, kleur: '#3B6FD4'
    },
    reijn: {
      naam: 'Reijn', org: 'Reijn', domein: 'reijn.nl',
      adres: 'Van Schaeck Mathonsingel 4, Nijmegen',
      logo: 'reijn-logo.png', logoLight: 'reijn-logo-light.png', kleur: '#E8641E'
    },
    aag: {
      naam: 'AAG', org: 'AAG', domein: 'aag.nl',
      adres: 'Wijchen',              // geen straat: die kennen we niet van AAG
      // het AAG-logo bevat de naam al, dus het losse woordmerk gaat uit
      logo: 'aag-logo.svg', logoLight: 'aag-logo-light.svg', kleur: '#F8AF5F', naamInLogo: true
    }
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

  /* De demo-teksten zijn geschreven voor Reijn. Bij een ander merk vervangen
     we naam, domein en adres — ook in schermen die het CMS pas tijdens het
     gebruik opbouwt (daarvoor kijkt een MutationObserver mee). */
  var REIJN_ADRES = 'Van Schaeck Mathonsingel 4, Nijmegen';

  function herschrijf(tekst) {
    if (tekst.indexOf(REIJN_ADRES) > -1) tekst = tekst.split(REIJN_ADRES).join(merk.adres);
    return tekst
      .replace(/reijnhrm\.nl/gi, merk.domein)
      .replace(/reijn\.nl/gi, merk.domein)
      .replace(/\bReijn\b/g, merk.org)          // \b spaart 'Reijnders'
      .replace(/\breijn\b/g, merk.org.toLowerCase());
  }

  var OVERSLAAN = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 0 };

  function herschrijfBoom(root) {
    if (actief === 'reijn' || !root) return;

    if (root.nodeType === 3) { herschrijfTekstknoop(root); return; }
    if (root.nodeType !== 1) return;

    var loper = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var knopen = [], n;
    while ((n = loper.nextNode())) knopen.push(n);
    knopen.forEach(herschrijfTekstknoop);

    // invoervelden dragen hun tekst in attributen
    var velden = root.querySelectorAll ? root.querySelectorAll('input,textarea') : [];
    Array.prototype.forEach.call(velden, function (el) {
      ['value', 'placeholder'].forEach(function (attr) {
        var v = el[attr];
        if (v && /reijn/i.test(v)) el[attr] = herschrijf(v);
      });
    });

    // en labels die alleen voor schermlezers of tooltips bestaan
    var gelabeld = root.querySelectorAll ? root.querySelectorAll('[title],[aria-label],[alt],[data-copy]') : [];
    Array.prototype.forEach.call(gelabeld, function (el) {
      ['title', 'aria-label', 'alt', 'data-copy'].forEach(function (attr) {
        var v = el.getAttribute(attr);
        if (v && /reijn/i.test(v)) el.setAttribute(attr, herschrijf(v));
      });
    });
  }

  function herschrijfTekstknoop(t) {
    var ouder = t.parentNode;
    if (!ouder || OVERSLAAN[ouder.nodeName]) return;
    var v = t.nodeValue;
    if (!v || !/reijn/i.test(v)) return;
    var nieuw = herschrijf(v);
    if (nieuw !== v) t.nodeValue = nieuw;
  }

  function volgWijzigingen() {
    if (actief === 'reijn' || !global.MutationObserver) return;
    new global.MutationObserver(function (lijst) {
      lijst.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, herschrijfBoom);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  function toepassen() {
    if (actief !== 'reijn') {
      document.title = herschrijf(document.title);
      herschrijfBoom(document.body);
      volgWijzigingen();
    }

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

  global.Merk = { actief: actief, naam: merk.naam, org: merk.org, domein: merk.domein,
                  adres: merk.adres, url: merkUrl, tekst: herschrijf, MERKEN: MERKEN };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', toepassen);
  else toepassen();

})(window);
