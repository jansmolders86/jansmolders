/* =========================================================
   Reijn CMS — demo-laag
   Alle data is nep en leeft in localStorage, zodat de hele
   flow (aanmaken → bewerken → publiceren → mailen) blijft
   hangen tijdens een demo. "Demo resetten" zet alles terug.
   ========================================================= */
(function (global) {
  'use strict';

  var KEY = 'reijn-cms-demo-v1';

  /* ---------------- seed-data ---------------- */
  var COLORS = ['var(--petrol)', 'var(--teal)', 'var(--mustard)', 'var(--tangerine)', 'var(--clay)', 'var(--plum)'];

  function seedPages() {
    return [
      { id: 'gijs-wassenberg', naam: 'Gijs Wassenberg', functie: 'HRM-consultant', init: 'GW', kleur: 'var(--petrol)',
        status: 'pub', varianten: ['Ziekenhuis', 'Gemeente'], views: 342, leads: 7, tijd: '3:12', bijgewerkt: '2 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '14 apr 2025' },
      { id: 'sanne-de-vries', naam: 'Sanne de Vries', functie: 'Financieel adviseur', init: 'SdV', kleur: 'var(--plum)',
        status: 'rev', varianten: ['Ziekenhuis'], views: 88, leads: 2, tijd: '2:41', bijgewerkt: '5 uur geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '2 jun 2025' },
      { id: 'fatima-el-amrani', naam: 'Fatima El Amrani', functie: 'Beleidsadviseur', init: 'FE', kleur: 'var(--clay)',
        status: 'pub', varianten: ['Ziekenhuis', 'Gemeente', 'Onderwijs'], views: 511, leads: 12, tijd: '3:48', bijgewerkt: '6 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '9 feb 2025' },
      { id: 'thomas-bakker', naam: 'Thomas Bakker', functie: 'IT-projectleider', init: 'TB', kleur: 'var(--mustard)',
        status: 'rev', varianten: ['Basis'], views: 21, leads: 0, tijd: '1:52', bijgewerkt: '2 dagen geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '17 jun 2025' },
      { id: 'isa-verhoeven', naam: 'Isa Verhoeven', functie: 'Adviseur digitalisering', init: 'IV', kleur: 'var(--ink-soft)',
        status: 'draft', varianten: [], views: 0, leads: 0, tijd: '—', bijgewerkt: '3 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '15 jun 2025' },
      { id: 'daan-mulder', naam: 'Daan Mulder', functie: 'Recruiter', init: 'DM', kleur: 'var(--teal)',
        status: 'pub', varianten: ['Basis'], views: 176, leads: 4, tijd: '2:05', bijgewerkt: '1 week geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '3 mrt 2025' },
      { id: 'emma-visser', naam: 'Emma Visser', functie: 'Communicatieadviseur', init: 'EV', kleur: 'var(--mustard)',
        status: 'rev', varianten: ['Gemeente', 'Zorg'], views: 63, leads: 1, tijd: '2:58', bijgewerkt: '1 dag geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '21 mei 2025' },
      { id: 'noor-jansen', naam: 'Noor Jansen', functie: 'Organisatieadviseur', init: 'NJ', kleur: 'var(--teal)',
        status: 'pub', varianten: ['Gemeente'], views: 204, leads: 5, tijd: '3:01', bijgewerkt: '4 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '28 jan 2025' },
      { id: 'pieter-hoogendijk', naam: 'Pieter Hoogendijk', functie: 'Interim-manager', init: 'PH', kleur: 'var(--petrol)',
        status: 'pub', varianten: ['Ziekenhuis', 'Basis'], views: 289, leads: 9, tijd: '4:07', bijgewerkt: '3 dagen geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '11 dec 2024' },
      { id: 'yara-bouzid', naam: 'Yara Bouzid', functie: 'Data-analist', init: 'YB', kleur: 'var(--plum)',
        status: 'pub', varianten: ['Onderwijs'], views: 132, leads: 3, tijd: '2:22', bijgewerkt: '5 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '7 mrt 2025' },
      { id: 'milan-de-groot', naam: 'Milan de Groot', functie: 'Projectleider Zorg', init: 'MG', kleur: 'var(--ink-soft)',
        status: 'draft', varianten: [], views: 0, leads: 0, tijd: '—', bijgewerkt: '9 uur geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '18 jun 2025' },
      { id: 'kim-vermeer', naam: 'Kim Vermeer', functie: 'Trainer & coach', init: 'KV', kleur: 'var(--mustard)',
        status: 'pub', varianten: ['Basis', 'Onderwijs'], views: 97, leads: 2, tijd: '2:36', bijgewerkt: '1 week geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '2 apr 2025' },
      { id: 'ruben-aarts', naam: 'Ruben Aarts', functie: 'Financieel adviseur', init: 'RA', kleur: 'var(--ink-soft)',
        status: 'arch', varianten: ['Basis'], views: 44, leads: 0, tijd: '1:48', bijgewerkt: '2 maanden geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '19 sep 2024' }
    ];
  }

  function seedMails() {
    return [
      { id: 'm1', klant: 'Marieke Doornbos', org: 'Radboudumc', email: 'm.doornbos@radboudumc.nl', init: 'MD', kleur: 'var(--petrol)',
        onderwerp: 'Voorstel HRM-ondersteuning — Gijs Wassenberg', tijd: '09:12', datum: 'vandaag', ongelezen: true, map: 'inbox',
        pagina: 'gijs-wassenberg', variant: 'Ziekenhuis',
        tracking: { verzonden: true, geopend: true, geklikt: true, tijd: '4:12 op de pagina' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'di 09:40',
            tekst: ['Beste Marieke,', 'Naar aanleiding van ons gesprek stuur ik je het visuele CV van Gijs Wassenberg. Hij werkte eerder aan de HR-transitie van twee academische ziekenhuizen — die casussen staan in de variant die je hieronder vindt.', 'Laat je weten of je hem wilt spreken? Dan plan ik een kennismaking.'],
            link: { titel: 'Gijs Wassenberg — variant Ziekenhuis', url: 'reijn.nl/cv/gijs-wassenberg?v=ziekenhuis' } },
          { van: 'in', naam: 'Marieke Doornbos', tijd: 'vandaag 09:12',
            tekst: ['Hoi Lieve,', 'Wat een fijne manier om iemand te presenteren — het team heeft de video bekeken in het MT-overleg. Gijs spreekt ons aan.', 'Kan hij donderdag of vrijdag kennismaken? En heb je ook iemand met ervaring in verandertrajecten binnen de care?'] }
        ] },
      { id: 'm2', klant: 'Joris Kleijn', org: 'Gemeente Arnhem', email: 'j.kleijn@arnhem.nl', init: 'JK', kleur: 'var(--teal)',
        onderwerp: 'Twee kandidaten beleidsadvies', tijd: 'gisteren', datum: 'gisteren', ongelezen: true, map: 'inbox',
        pagina: 'fatima-el-amrani', variant: 'Gemeente',
        tracking: { verzonden: true, geopend: true, geklikt: false, tijd: '1:58 op de pagina' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'ma 14:20',
            tekst: ['Beste Joris,', 'Hierbij de pagina van Fatima El Amrani, in de variant die we voor gemeenten gebruiken. Haar werk aan het omgevingsplan van Nijmegen staat er uitgebreid in.'],
            link: { titel: 'Fatima El Amrani — variant Gemeente', url: 'reijn.nl/cv/fatima-el-amrani?v=gemeente' } },
          { van: 'in', naam: 'Joris Kleijn', tijd: 'gisteren 16:44',
            tekst: ['Dank Lieve. Fatima ziet er sterk uit. Hebben jullie daarnaast iemand die het participatietraject kan trekken? Dan leggen we beide profielen naast elkaar.'] }
        ] },
      { id: 'm3', klant: 'Sandra Beek', org: 'ROC Rijnmond', email: 's.beek@rocrijnmond.nl', init: 'SB', kleur: 'var(--mustard)',
        onderwerp: 'Bedankt voor de kennismaking', tijd: 'wo', datum: '3 dagen geleden', ongelezen: false, map: 'inbox',
        pagina: 'yara-bouzid', variant: 'Onderwijs',
        tracking: { verzonden: true, geopend: true, geklikt: true, tijd: '3:30 op de pagina' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'ma 11:02',
            tekst: ['Beste Sandra,', 'Fijn dat we elkaar spraken. Hierbij het profiel van Yara Bouzid — zij bouwde het studentendashboard bij ROC Midden.'],
            link: { titel: 'Yara Bouzid — variant Onderwijs', url: 'reijn.nl/cv/yara-bouzid?v=onderwijs' } },
          { van: 'in', naam: 'Sandra Beek', tijd: 'wo 08:15',
            tekst: ['We gaan verder met Yara. Kun je een voorstel sturen voor 32 uur per week, startend in september?'] }
        ] },
      { id: 'm4', klant: 'Team Reijn', org: 'Interne notificatie', email: 'cms@reijn.nl', init: 'RN', kleur: 'var(--plum)',
        onderwerp: 'Sanne de Vries diende wijzigingen in', tijd: 'ma', datum: '5 dagen geleden', ongelezen: false, map: 'inbox',
        pagina: 'sanne-de-vries', variant: 'Ziekenhuis', systeem: true,
        tracking: { verzonden: true, geopend: true, geklikt: false, tijd: '—' },
        berichten: [
          { van: 'in', naam: 'Reijn CMS', tijd: 'ma 07:30',
            tekst: ['Sanne de Vries heeft de variant Ziekenhuis klaargezet voor review. Gewijzigd: introtekst en twee items in de tijdlijn.'] }
        ] },
      { id: 'm5', klant: 'Hugo Bergsma', org: 'Waterschap Rivierenland', email: 'h.bergsma@wsrl.nl', init: 'HB', kleur: 'var(--clay)',
        onderwerp: 'Profiel interim-manager', tijd: 'do', datum: '6 dagen geleden', ongelezen: false, map: 'verzonden',
        pagina: 'pieter-hoogendijk', variant: 'Basis',
        tracking: { verzonden: true, geopend: false, geklikt: false, tijd: '—' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'do 15:10',
            tekst: ['Beste Hugo,', 'Zoals besproken het profiel van Pieter Hoogendijk. Hij draaide eerder twee fusietrajecten bij waterschappen.'],
            link: { titel: 'Pieter Hoogendijk — variant Basis', url: 'reijn.nl/cv/pieter-hoogendijk?v=basis' } }
        ] }
    ];
  }

  function seedActivity() {
    return [
      { ic: 'check', kleur: 'var(--teal)', tekst: '<b>Noor Jansen</b> — variant Gemeente gepubliceerd', tijd: '2 u' },
      { ic: 'mail', kleur: 'var(--tangerine)', tekst: 'Link verstuurd naar <b>Marieke Doornbos</b> (Radboudumc)', tijd: '5 u' },
      { ic: 'eye', kleur: 'var(--petrol)', tekst: '<b>Gijs Wassenberg</b> — 34 weergaven vandaag', tijd: '7 u' },
      { ic: 'edit', kleur: 'var(--mustard)', tekst: '<b>Sanne de Vries</b> diende wijzigingen in voor review', tijd: '1 d' },
      { ic: 'plus', kleur: 'var(--plum)', tekst: 'Nieuwe pagina aangemaakt voor <b>Milan de Groot</b>', tijd: '1 d' }
    ];
  }

  /* ---------------- store ---------------- */
  function fresh() {
    return { pages: seedPages(), mails: seedMails(), activity: seedActivity(), v: 1 };
  }

  function load() {
    try {
      var raw = global.localStorage.getItem(KEY);
      if (!raw) { var f = fresh(); save(f); return f; }
      var data = JSON.parse(raw);
      if (!data || !data.pages) { var g = fresh(); save(g); return g; }
      return data;
    } catch (e) { return fresh(); }
  }

  function save(data) {
    try { global.localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  function reset() {
    try { global.localStorage.removeItem(KEY); } catch (e) {}
  }

  /* ---------------- helpers ---------------- */
  var STATUS = {
    pub:   { label: 'Gepubliceerd', cls: 'pub' },
    rev:   { label: 'In review',    cls: 'rev' },
    draft: { label: 'Concept',      cls: 'draft' },
    arch:  { label: 'Gearchiveerd', cls: 'arch' }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function slug(s) {
    return String(s).toLowerCase()
      .replace(/[àáâä]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i')
      .replace(/[òóôö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function initials(naam) {
    var p = String(naam).trim().split(/\s+/);
    if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
    return (p[0][0] + p[p.length - 1][0]).toUpperCase();
  }

  function kleurVoor(i) { return COLORS[i % COLORS.length]; }

  function nf(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  /* Welke editor hoort bij deze pagina? Gijs is als enige helemaal ingevuld;
     elke andere consultant opent de lege template. */
  function editorUrl(pagina) {
    var id = typeof pagina === 'string' ? pagina : (pagina && pagina.id);
    return id === 'gijs-wassenberg'
      ? 'gijs-wassenberg-edit.html'
      : 'pagina-edit.html?id=' + encodeURIComponent(id || '');
  }

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(global.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  /* ---------------- toast ---------------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span class="d"></span>' + msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3000);
  }

  /* ---------------- modal ---------------- */
  function openModal(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal(el) {
    if (typeof el === 'string') el = document.getElementById(el);
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ---------------- iconen ---------------- */
  var ICON = {
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    dots: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="m4 6 8 6 8-6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    dup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12 5 5L20 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    arch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4"/><path d="M5 8v12h14V8"/><path d="M10 12h4"/></svg>',
    chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 13h10l1-13"/></svg>'
  };


  /* ---------------- animaties ----------------
     Balken groeien, lijnen tekenen zichzelf en getallen tellen op zodra
     ze in beeld komen. Puur cosmetisch; alles blijft leesbaar zonder JS. */
  var ANIM_CSS =
    '.reijn-anim{will-change:width,height}' +
    '@media (prefers-reduced-motion: reduce){.reijn-anim{transition:none!important}}';

  function stylesheet() {
    if (document.getElementById('reijn-anim-css')) return;
    var st = document.createElement('style');
    st.id = 'reijn-anim-css';
    st.textContent = ANIM_CSS;
    document.head.appendChild(st);
  }

  var reduceer = false;
  try { reduceer = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var GROEI = [
    ['.spark .bar', 'height', '3%'],
    ['.retention i', 'height', '3%'],
    ['.heat-fill', 'width', '0%'],
    ['.barlist .t i', 'width', '0%'],
    ['.fstep .fbar', 'width', '0%']
  ];

  function volgende(fn) {
    if (global.requestAnimationFrame) global.requestAnimationFrame(function () { global.requestAnimationFrame(fn); });
    else setTimeout(fn, 32);
  }

  /* getallen laten oplopen: 2.148 / 41 / 87% — tijden als 3:04 slaan we over */
  function telOp(el) {
    var tekst = (el.textContent || '').trim();
    var m = /^(\d[\d.]*)(%?)$/.exec(tekst);
    if (!m) return;
    var doel = parseInt(m[1].replace(/\./g, ''), 10);
    if (!isFinite(doel) || doel === 0) return;
    var achter = m[2], start = null, duur = 900;
    function stap(t) {
      if (start === null) start = t;
      var v = Math.min(1, (t - start) / duur);
      var e = 1 - Math.pow(1 - v, 3);
      el.textContent = nf(Math.round(doel * e)) + achter;
      if (v < 1) global.requestAnimationFrame(stap);
    }
    if (!global.requestAnimationFrame) { el.textContent = nf(doel) + achter; return; }
    el.textContent = '0' + achter;
    global.requestAnimationFrame(stap);
    // vangnet: als de animatieklok stilstaat (achtergrondtab, oude browser)
    // moet het cijfer alsnog kloppen
    setTimeout(function () {
      var nu = (el.textContent || '').replace(/\./g, '');
      if (parseInt(nu, 10) !== doel) el.textContent = nf(doel) + achter;
    }, duur + 400);
  }

  function animeer(root) {
    if (reduceer) return;
    stylesheet();
    root = root || document;

    /* balken */
    GROEI.forEach(function (regel) {
      var els = root.querySelectorAll(regel[0]);
      Array.prototype.forEach.call(els, function (el, i) {
        if (el.getAttribute('data-anim-done')) return;
        var doel = el.style[regel[1]];
        if (!doel) return;
        el.setAttribute('data-anim-done', '1');
        el.classList.add('reijn-anim');
        el.style.transition = 'none';
        el.style[regel[1]] = regel[2];
        volgende(function () {
          el.style.transition = regel[1] + ' .85s cubic-bezier(.22,1,.36,1) ' + Math.min(i * 45, 500) + 'ms';
          el.style[regel[1]] = doel;
        });
      });
    });

    /* lijnen tekenen zichzelf */
    Array.prototype.forEach.call(root.querySelectorAll('[data-anim="lijn"]'), function (el, i) {
      if (el.getAttribute('data-anim-done') || !el.getTotalLength) return;
      el.setAttribute('data-anim-done', '1');
      var len = 0;
      try { len = el.getTotalLength(); } catch (e) { return; }
      if (!len) return;
      el.style.transition = 'none';
      el.style.strokeDasharray = len + ' ' + len;
      el.style.strokeDashoffset = len;
      volgende(function () {
        el.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.33,1,.68,1) ' + (i * 160) + 'ms';
        el.style.strokeDashoffset = '0';
      });
    });

    /* vlak onder de lijn */
    Array.prototype.forEach.call(root.querySelectorAll('[data-anim="vlak"]'), function (el) {
      if (el.getAttribute('data-anim-done')) return;
      el.setAttribute('data-anim-done', '1');
      el.style.transition = 'none';
      el.style.opacity = '0';
      volgende(function () {
        el.style.transition = 'opacity .9s ease .35s';
        el.style.opacity = '1';
      });
    });

    /* donutsegmenten */
    Array.prototype.forEach.call(root.querySelectorAll('[data-anim="donut"]'), function (el, i) {
      if (el.getAttribute('data-anim-done')) return;
      el.setAttribute('data-anim-done', '1');
      var doel = el.getAttribute('stroke-dasharray');
      el.style.transition = 'none';
      el.setAttribute('stroke-dasharray', '0 100');
      volgende(function () {
        el.style.transition = 'stroke-dasharray .8s cubic-bezier(.22,1,.36,1) ' + (i * 110) + 'ms';
        el.setAttribute('stroke-dasharray', doel);
      });
    });

    /* kerncijfers laten oplopen */
    Array.prototype.forEach.call(root.querySelectorAll('.kpi .val'), function (el) {
      if (el.getAttribute('data-anim-done')) return;
      el.setAttribute('data-anim-done', '1');
      telOp(el);
    });
  }

  /* pas animeren zodra een kaart in beeld komt */
  function observeer() {
    if (reduceer) return;
    if (!global.IntersectionObserver) { animeer(); return; }
    var io = new global.IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animeer(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(document.querySelectorAll('.card, .kpi'), function (el) { io.observe(el); });
  }

  /* ---------------- init ---------------- */
  function init() {
    var data = load();

    // badges in de sidebar
    document.querySelectorAll('[data-badge="pages"]').forEach(function (el) {
      el.textContent = data.pages.filter(function (p) { return p.status !== 'arch'; }).length;
    });
    var unread = data.mails.filter(function (m) { return m.ongelezen && m.map === 'inbox'; }).length;
    document.querySelectorAll('[data-badge="mail"]').forEach(function (el) {
      if (unread) { el.textContent = unread; el.style.display = ''; }
      else { el.style.display = 'none'; }
    });

    // toasts
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-toast]');
      if (t) { toast(t.getAttribute('data-toast')); }

      var o = e.target.closest('[data-open]');
      if (o) { e.preventDefault(); openModal(o.getAttribute('data-open')); }

      var c = e.target.closest('[data-close]');
      if (c) { e.preventDefault(); closeModal(c.closest('.ov')); }

      if (e.target.classList && e.target.classList.contains('ov')) closeModal(e.target);

      // dropdowns
      var m = e.target.closest('[data-menu]');
      document.querySelectorAll('.menu.open').forEach(function (x) {
        if (!m || x !== m.parentNode.querySelector('.menu')) x.classList.remove('open');
      });
      if (m) {
        e.preventDefault();
        var menu = m.parentNode.querySelector('.menu');
        if (menu) menu.classList.toggle('open');
      }

      // kopieer-link
      var cp = e.target.closest('[data-copy]');
      if (cp) {
        var txt = cp.getAttribute('data-copy');
        if (global.navigator.clipboard) { global.navigator.clipboard.writeText(txt).catch(function () {}); }
        toast('Link gekopieerd — ' + txt);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.ov.open').forEach(closeModal);
        document.querySelectorAll('.menu.open').forEach(function (x) { x.classList.remove('open'); });
      }
    });

    observeer();

    // demo resetten
    document.querySelectorAll('[data-demo-reset]').forEach(function (b) {
      b.addEventListener('click', function () {
        reset();
        toast('Demo-data teruggezet naar de beginstand');
        setTimeout(function () { global.location.reload(); }, 700);
      });
    });
  }

  global.Reijn = {
    load: load, save: save, reset: reset, fresh: fresh,
    STATUS: STATUS, ICON: ICON, COLORS: COLORS,
    esc: esc, slug: slug, initials: initials, kleurVoor: kleurVoor, nf: nf, param: param,
    editorUrl: editorUrl,
    toast: toast, openModal: openModal, closeModal: closeModal, init: init,
    animeer: animeer
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})(window);
