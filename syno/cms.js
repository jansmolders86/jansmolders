/* =========================================================
   Reijn CMS — demo-laag
   Alle data is nep en leeft in localStorage, zodat de hele
   flow (aanmaken → bewerken → publiceren → mailen) blijft
   hangen tijdens een demo. "Demo resetten" zet alles terug.
   ========================================================= */
(function (global) {
  'use strict';

  var KEY = 'reijn-cms-demo-v7';

  /* Vangnet: normaal zet brand.js dit in de <head>. Mocht dat bestand
     ontbreken, dan valt alles terug op white label in plaats van te breken. */
  if (!global.Merk) {
    global.Merk = {
      actief: 'whitelabel', naam: 'Syno', org: 'Voorbeeld', domein: 'voorbeeld.nl',
      product: 'Visueel CV', productMv: "Visuele CV's",
      url: function (u) { return u; },
      tekst: function (t) { return t; },
      MERKEN: { whitelabel: { naam: 'Syno', logo: null, logoLight: null } }
    };
  }

  /* ---------------- seed-data ---------------- */
  var COLORS = ['var(--petrol)', 'var(--teal)', 'var(--mustard)', 'var(--tangerine)', 'var(--clay)', 'var(--plum)'];

  function seedPages() {
    return [
      { id: 'richard-janssen', naam: 'Richard Janssen', functie: 'HRM-consultant', init: 'RJ', kleur: 'var(--petrol)',
        status: 'pub', varianten: ['Ziekenhuis', 'Gemeente'], views: 342, leads: 7, tijd: '3:12', bijgewerkt: '2 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '14 apr 2025', inzet: { capaciteit: 36, opdrachten: [
        { klant:'Radboudumc', rol:'Projectleider HR-transitie', uren:16, start:over(-206), eind:over(96),
          tarief:118, verlenging:'optie tot 1 mrt 2027', contact:'Marieke Doornbos' },
        { klant:'Gemeente Helmond', rol:'Adviseur strategische personeelsplanning', uren:8, start:over(-110), eind:over(170),
          tarief:112, verlenging:'optie 6 maanden', contact:'Joris Kleijn' }
      ], beschikbaarVanaf:null,
      eerder:[{klant:'Gemeente Nijmegen', rol:'Adviseur duurzame inzetbaarheid', uren:24, start:over(-580), eind:over(-250)}] }, sjabloon: 'Visueel CV — compleet' },
      { id: 'sanne-de-vries', naam: 'Sanne de Vries', functie: 'Financieel adviseur', init: 'SdV', kleur: 'var(--plum)',
        status: 'rev', varianten: ['Ziekenhuis'], views: 88, leads: 2, tijd: '2:41', bijgewerkt: '5 uur geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '2 jun 2025', inzet: { capaciteit: 24, opdrachten: [
        { klant:'Zorggroep Helmond', rol:'Interim financieel adviseur', uren:24, start:over(-250), eind:over(35),
          tarief:105, verlenging:'nog niet besproken', contact:'Marc de Wit' }
      ], beschikbaarVanaf:null,
      eerder:[{klant:'Amphia', rol:'Business control', uren:32, start:over(-760), eind:over(-280)}] } },
      { id: 'fatima-el-amrani', naam: 'Fatima El Amrani', functie: 'Beleidsadviseur', init: 'FE', kleur: 'var(--clay)',
        status: 'pub', varianten: ['Ziekenhuis', 'Gemeente', 'Onderwijs'], views: 511, leads: 12, tijd: '3:48', bijgewerkt: '6 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '9 feb 2025', inzet: { capaciteit: 36, opdrachten: [
        { klant:'Gemeente Arnhem', rol:'Projectleider omgevingsplan', uren:28, start:over(-150), eind:over(240),
          tarief:112, verlenging:'optie 6 maanden', contact:'Joris Kleijn' },
        { klant:'ROC Rijnmond', rol:'Adviseur onderwijshuisvesting', uren:8, start:over(-40), eind:over(140),
          tarief:104, verlenging:null, contact:'Sandra Beek' }
      ], beschikbaarVanaf:null,
      eerder:[{klant:'Gemeente Nijmegen', rol:'Beleidsadviseur', uren:36, start:over(-640), eind:over(-190)}] } },
      { id: 'thomas-bakker', naam: 'Thomas Bakker', functie: 'IT-projectleider', init: 'TB', kleur: 'var(--mustard)',
        status: 'rev', varianten: ['Basis'], views: 21, leads: 0, tijd: '1:52', bijgewerkt: '2 dagen geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '17 jun 2025', inzet: { capaciteit: 36, opdrachten: [], beschikbaarVanaf:over(-70),
      eerder:[{klant:'ROC Rijnmond', rol:'Projectleider ICT', uren:32, start:over(-500), eind:over(-72)}] } },
      { id: 'isa-verhoeven', naam: 'Isa Verhoeven', functie: 'Adviseur digitalisering', init: 'IV', kleur: 'var(--ink-soft)',
        status: 'draft', varianten: [], views: 0, leads: 0, tijd: '—', bijgewerkt: '3 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '15 jun 2025', inzet: { capaciteit: 32, opdrachten: [], beschikbaarVanaf:over(14), eerder:[] } },
      { id: 'daan-mulder', naam: 'Daan Mulder', functie: 'Recruiter', init: 'DM', kleur: 'var(--teal)',
        status: 'pub', varianten: ['Basis'], views: 176, leads: 4, tijd: '2:05', bijgewerkt: '1 week geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '3 mrt 2025', inzet: { capaciteit: 32, opdrachten: [
        { klant:'Waterschap Rivierenland', rol:'Recruiter techniek', uren:24, start:over(-130), eind:over(230),
          tarief:92, verlenging:'optie tot 2028', contact:'Hugo Bergsma' },
        { klant:'Gemeente Helmond', rol:'Recruiter sociaal domein', uren:8, start:over(-60), eind:over(120),
          tarief:92, verlenging:null, contact:'Joris Kleijn' }
      ], beschikbaarVanaf:null, eerder:[] }, sjabloon: 'Compact profiel' },
      { id: 'emma-visser', naam: 'Emma Visser', functie: 'Communicatieadviseur', init: 'EV', kleur: 'var(--mustard)',
        status: 'rev', varianten: ['Gemeente', 'Zorg'], views: 63, leads: 1, tijd: '2:58', bijgewerkt: '1 dag geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '21 mei 2025', inzet: { capaciteit: 28, opdrachten: [
        { klant:'Gemeente Arnhem', rol:'Communicatieadviseur participatie', uren:20, start:over(-345), eind:over(50),
          tarief:96, verlenging:'klant beslist deze maand', contact:'Joris Kleijn' }
      ], beschikbaarVanaf:null, eerder:[] } },
      { id: 'noor-jansen', naam: 'Noor Jansen', functie: 'Organisatieadviseur', init: 'NJ', kleur: 'var(--teal)',
        status: 'pub', varianten: ['Gemeente'], views: 204, leads: 5, tijd: '3:01', bijgewerkt: '4 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '28 jan 2025', inzet: { capaciteit: 24, opdrachten: [
        { klant:'ROC Rijnmond', rol:'Organisatieadviseur onderwijsteams', uren:24, start:over(-225), eind:over(140),
          tarief:104, verlenging:'optie 12 maanden', contact:'Sandra Beek' }
      ], beschikbaarVanaf:null, eerder:[] }, sjabloon: 'Visueel CV — compleet' },
      { id: 'pieter-hoogendijk', naam: 'Pieter Hoogendijk', functie: 'Interim-manager', init: 'PH', kleur: 'var(--petrol)',
        status: 'pub', varianten: ['Ziekenhuis', 'Basis'], views: 289, leads: 9, tijd: '4:07', bijgewerkt: '3 dagen geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '11 dec 2024', inzet: { capaciteit: 36, opdrachten: [
        { klant:'Waterschap Rivierenland', rol:'Interim-manager bedrijfsvoering', uren:36, start:over(-405), eind:over(20),
          tarief:135, verlenging:'gesprek gepland', contact:'Hugo Bergsma' }
      ], beschikbaarVanaf:null,
      eerder:[{klant:'Radboudumc', rol:'Interim afdelingshoofd', uren:32, start:over(-910), eind:over(-410)}] } },
      { id: 'yara-bouzid', naam: 'Yara Bouzid', functie: 'Data-analist', init: 'YB', kleur: 'var(--plum)',
        status: 'pub', varianten: ['Onderwijs'], views: 132, leads: 3, tijd: '2:22', bijgewerkt: '5 dagen geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '7 mrt 2025', inzet: { capaciteit: 32, opdrachten: [
        { klant:'ROC Rijnmond', rol:'Data-analist studentsucces', uren:16, start:over(-165), eind:over(81),
          tarief:99, verlenging:'optie tot juni 2027', contact:'Sandra Beek' },
        { klant:'Onderwijsgroep Brabant', rol:'Analist kwaliteitszorg', uren:8, start:over(-20), eind:over(160),
          tarief:99, verlenging:null, contact:'Sanne Jansen' }
      ], beschikbaarVanaf:null, eerder:[] }, sjabloon: 'Compact profiel' },
      { id: 'milan-de-groot', naam: 'Milan de Groot', functie: 'Projectleider Zorg', init: 'MG', kleur: 'var(--ink-soft)',
        status: 'draft', varianten: [], views: 0, leads: 0, tijd: '—', bijgewerkt: '9 uur geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '18 jun 2025', inzet: { capaciteit: 36, opdrachten: [], beschikbaarVanaf:over(-2), eerder:[] } },
      { id: 'kim-vermeer', naam: 'Kim Vermeer', functie: 'Trainer & coach', init: 'KV', kleur: 'var(--mustard)',
        status: 'pub', varianten: ['Basis', 'Onderwijs'], views: 97, leads: 2, tijd: '2:36', bijgewerkt: '1 week geleden',
        beheerder: 'Lieve van der Weijde', aangemaakt: '2 apr 2025', inzet: { capaciteit: 20, opdrachten: [
        { klant:'Onderwijsgroep Brabant', rol:'Trainer leiderschap', uren:20, start:over(-275), eind:over(55),
          tarief:110, verlenging:'optie tot maart 2027', contact:'Sanne Jansen' }
      ], beschikbaarVanaf:null, eerder:[] } },
      { id: 'ruben-aarts', naam: 'Ruben Aarts', functie: 'Financieel adviseur', init: 'RA', kleur: 'var(--ink-soft)',
        status: 'arch', varianten: ['Basis'], views: 44, leads: 0, tijd: '1:48', bijgewerkt: '2 maanden geleden',
        beheerder: 'Joost Reijnders', aangemaakt: '19 sep 2024', inzet: { capaciteit: 0, opdrachten: [], beschikbaarVanaf:null, eerder:[] } }
    ];
  }

  function seedMails() {
    return [
      { id: 'm1', klant: 'Marieke Doornbos', org: 'Radboudumc', email: 'm.doornbos@radboudumc.nl', init: 'MD', kleur: 'var(--petrol)',
        onderwerp: 'Voorstel HRM-ondersteuning — Richard Janssen', tijd: '09:12', datum: 'vandaag', ongelezen: true, map: 'inbox',
        pagina: 'richard-janssen', variant: 'Ziekenhuis',
        tracking: { verzonden: true, geopend: true, geklikt: true, tijd: '4:12 op de pagina' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'di 09:40',
            tekst: ['Beste Marieke,', 'Naar aanleiding van ons gesprek stuur ik je het visuele CV van Richard Janssen. Hij werkte eerder aan de HR-transitie van twee academische ziekenhuizen — die casussen staan in de variant die je hieronder vindt.', 'Laat je weten of je hem wilt spreken? Dan plan ik een kennismaking.'],
            link: { titel: 'Richard Janssen — variant Ziekenhuis', url: 'reijn.nl/cv/richard-janssen?v=ziekenhuis' } },
          { van: 'in', naam: 'Marieke Doornbos', tijd: 'vandaag 09:12',
            tekst: ['Hoi Lieve,', 'Wat een fijne manier om iemand te presenteren — het team heeft de video bekeken in het MT-overleg. Richard spreekt ons aan.', 'Kan hij donderdag of vrijdag kennismaken? En heb je ook iemand met ervaring in verandertrajecten binnen de care?'] }
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

  function seedConsultantMails() {
    return [
      { id: 'c1', klant: 'Thomas Bakker', org: 'Consultant · IT-projectleider', email: 'thomas@reijn.nl',
        init: 'TB', kleur: 'var(--mustard)', onderwerp: 'Werk je profiel even bij?', tijd: 'di', datum: '2 dagen geleden',
        ongelezen: false, map: 'consultant', pagina: 'thomas-bakker', variant: 'Basis', intern: true,
        tracking: { verzonden: true, geopend: true, geklikt: true, tijd: 'pagina geopend' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'di 08:15',
            tekst: ['Hoi Thomas,', 'Je pagina staat nog op concept. Wil je de introtekst en twee foto\u2019s aanvullen? Dan kan hij deze week live.', 'Je hoeft alleen op de link te klikken \u2014 alles staat al klaar.'],
            link: { titel: 'Vul je visuele CV aan', url: 'reijn.nl/cms/bewerk/thomas-bakker' } },
          { van: 'in', naam: 'Thomas Bakker', tijd: 'gisteren 17:40',
            tekst: ['Duidelijk, ik pak het morgenochtend op. De foto\u2019s van het project in Zwolle mag ik gebruiken.'] }
        ] },
      { id: 'c2', klant: 'Milan de Groot', org: 'Consultant · Projectleider Zorg', email: 'milan@reijn.nl',
        init: 'MG', kleur: 'var(--ink-soft)', onderwerp: 'Je visuele CV staat klaar', tijd: 'ma', datum: '3 dagen geleden',
        ongelezen: false, map: 'consultant', pagina: 'milan-de-groot', variant: 'Basis', intern: true,
        tracking: { verzonden: true, geopend: false, geklikt: false, tijd: '\u2014' },
        berichten: [
          { van: 'out', naam: 'Lieve van der Weijde', tijd: 'ma 09:05',
            tekst: ['Hoi Milan,', 'Welkom bij Reijn! We hebben een visueel CV voor je klaargezet. Vul het in je eigen woorden aan \u2014 een video van 40 seconden werkt het beste.'],
            link: { titel: 'Vul je visuele CV aan', url: 'reijn.nl/cms/bewerk/milan-de-groot' } }
        ] }
    ];
  }

  /* De salesflow: elk verstuurd profiel wordt een kaart die van 'Opzet'
     naar 'Akkoord' schuift — of onderweg afvalt. */
  function seedVoorstellen() {
    return [
      { id:'v1', pagina:'richard-janssen', klant:'Radboudumc', contact:'Marieke Doornbos',
        rol:'Projectleider HR-transitie', uren:16, tarief:118, start:over(30),
        status:'akkoord', verstuurd:over(-24), gewijzigd:over(-3), variant:'Ziekenhuis',
        notitie:'Akkoord na het tweede gesprek. Startdatum in overleg met de afdeling.',
        historie:[{status:'voorstel',datum:over(-24)},{status:'wachten',datum:over(-17)},{status:'akkoord',datum:over(-3)}] },

      { id:'v2', pagina:'fatima-el-amrani', klant:'Gemeente Arnhem', contact:'Joris Kleijn',
        rol:'Projectleider participatietraject', uren:12, tarief:112, start:over(45),
        status:'wachten', verstuurd:over(-11), gewijzigd:over(-4), variant:'Gemeente',
        notitie:'Joris legt het voor aan het MT. Hij belt deze week terug.',
        historie:[{status:'voorstel',datum:over(-11)},{status:'wachten',datum:over(-4)}] },

      { id:'v3', pagina:'yara-bouzid', klant:'ROC Rijnmond', contact:'Sandra Beek',
        rol:'Data-analist onderwijskwaliteit', uren:8, tarief:99, start:over(21),
        status:'wachten', verstuurd:over(-26), gewijzigd:over(-19), variant:'Onderwijs',
        notitie:'Sandra wil eerst het budget rondkrijgen.',
        historie:[{status:'voorstel',datum:over(-26)},{status:'wachten',datum:over(-19)}] },

      { id:'v4', pagina:'thomas-bakker', klant:'Waterschap Rivierenland', contact:'Hugo Bergsma',
        rol:'Projectleider ICT-migratie', uren:32, tarief:98, start:over(14),
        status:'voorstel', verstuurd:over(-3), gewijzigd:over(-3), variant:'Basis',
        notitie:'Profiel gisteren verstuurd, nog geen reactie.',
        historie:[{status:'voorstel',datum:over(-3)}] },

      { id:'v5', pagina:'milan-de-groot', klant:'Zorggroep Helmond', contact:'Marc de Wit',
        rol:'Projectleider zorgtransformatie', uren:24, tarief:101, start:over(28),
        status:'voorstel', verstuurd:over(-1), gewijzigd:over(-1), variant:'Zorg',
        notitie:'Marc vroeg expliciet om iemand uit de care.',
        historie:[{status:'voorstel',datum:over(-1)}] },

      { id:'v6', pagina:'pieter-hoogendijk', klant:'Gemeente Helmond', contact:'Joris Kleijn',
        rol:'Interim-manager bedrijfsvoering', uren:36, tarief:135, start:over(60),
        status:'afgewezen', verstuurd:over(-40), gewijzigd:over(-19), variant:'Gemeente',
        notitie:'Tarief lag boven het plafond van de aanbesteding.',
        historie:[{status:'voorstel',datum:over(-40)},{status:'wachten',datum:over(-31)},{status:'afgewezen',datum:over(-19)}] },

      { id:'v7', pagina:'noor-jansen', klant:'Onderwijsgroep Brabant', contact:'Sanne Jansen',
        rol:'Organisatieadviseur teamontwikkeling', uren:16, tarief:104, start:over(35),
        status:'akkoord', verstuurd:over(-33), gewijzigd:over(-9), variant:'Onderwijs',
        notitie:'Akkoord voor een half jaar, met optie tot verlenging.',
        historie:[{status:'voorstel',datum:over(-33)},{status:'wachten',datum:over(-22)},{status:'akkoord',datum:over(-9)}] },

      { id:'v8', pagina:'emma-visser', klant:'Radboudumc', contact:'Marieke Doornbos',
        rol:'Communicatieadviseur patientparticipatie', uren:8, tarief:96, start:over(40),
        status:'voorstel', verstuurd:over(-5), gewijzigd:over(-5), variant:'Ziekenhuis',
        notitie:'Tweede profiel voor dezelfde vraag; Marieke vergelijkt.',
        historie:[{status:'voorstel',datum:over(-5)}] },

      /* Emma ligt bij twee klanten tegelijk op tafel. Ze heeft nog 8 uur
         vrij, dus hier kan er maar een van doorgaan. */
      { id:'v16', pagina:'emma-visser', klant:'Provincie Maastricht', contact:'Bram Nijssen',
        rol:'Communicatieadviseur omgevingsbeleid', uren:8, tarief:98, start:over(45),
        status:'voorstel', verstuurd:over(-3), gewijzigd:over(-3), variant:'Gemeente',
        notitie:'Tweede lopende vraag voor Emma. Ze heeft nog 8 uur vrij, dus deze en Radboudumc kunnen niet allebei doorgaan.',
        historie:[{status:'voorstel',datum:over(-3)}] },

      { id:'v9', pagina:'isa-verhoeven', klant:'Gemeente Arnhem', contact:'Joris Kleijn',
        rol:'Adviseur digitalisering', uren:20, tarief:95, start:over(50),
        status:'afgewezen', verstuurd:over(-26), gewijzigd:over(-12), variant:'Gemeente',
        notitie:'Ze kozen voor een kandidaat met meer ervaring in het sociaal domein.',
        historie:[{status:'voorstel',datum:over(-26)},{status:'wachten',datum:over(-20)},{status:'afgewezen',datum:over(-12)}] },

      { id:'v10', pagina:'sanne-de-vries', klant:'Amphia', contact:'Marc de Wit',
        rol:'Business controller zorgvastgoed', uren:24, tarief:108, start:over(55),
        status:'wachten', verstuurd:over(-14), gewijzigd:over(-7), variant:'Ziekenhuis',
        notitie:'Sanne komt in oktober vrij; Amphia weet dat en wacht daarop.',
        historie:[{status:'voorstel',datum:over(-14)},{status:'wachten',datum:over(-7)}] },

      { id:'v11', pagina:'kim-vermeer', klant:'Gemeente Nijmegen', contact:'Joris Kleijn',
        rol:'Trainer teamontwikkeling', uren:12, tarief:110, start:over(42),
        status:'voorstel', verstuurd:over(-2), gewijzigd:over(-2), variant:'Gemeente',
        notitie:'Vraag kwam via het netwerk van Kim zelf.',
        historie:[{status:'voorstel',datum:over(-2)}] },

      { id:'v12', pagina:'daan-mulder', klant:'ROC Rijnmond', contact:'Sandra Beek',
        rol:'Recruiter onderwijspersoneel', uren:16, tarief:92, start:over(30),
        status:'afgewezen', verstuurd:over(-48), gewijzigd:over(-29), variant:'Onderwijs',
        notitie:'Vacature is intern ingevuld.',
        historie:[{status:'voorstel',datum:over(-48)},{status:'wachten',datum:over(-38)},{status:'afgewezen',datum:over(-29)}] },

      { id:'v13', pagina:'noor-jansen', klant:'Radboudumc', contact:'Marieke Doornbos',
        rol:'Organisatieadviseur zorgteams', uren:8, tarief:104, start:over(65),
        status:'voorstel', verstuurd:over(-6), gewijzigd:over(-6), variant:'Ziekenhuis',
        notitie:'Marieke vroeg of we nog iemand hadden naast Richard.',
        historie:[{status:'voorstel',datum:over(-6)}] },

      { id:'v14', pagina:'fatima-el-amrani', klant:'Waterschap Rivierenland', contact:'Hugo Bergsma',
        rol:'Projectleider omgevingswet', uren:8, tarief:112, start:over(75),
        status:'akkoord', verstuurd:over(-52), gewijzigd:over(-16), variant:'Gemeente',
        notitie:'Akkoord, start zodra het Arnhemse traject afloopt.',
        historie:[{status:'voorstel',datum:over(-52)},{status:'wachten',datum:over(-40)},{status:'akkoord',datum:over(-16)}] },

      { id:'v15', pagina:'thomas-bakker', klant:'Zorggroep Helmond', contact:'Marc de Wit',
        rol:'Projectleider EPD-migratie', uren:24, tarief:98, start:over(20),
        status:'wachten', verstuurd:over(-9), gewijzigd:over(-2), variant:'Zorg',
        notitie:'Marc legt het voor aan de raad van bestuur.',
        historie:[{status:'voorstel',datum:over(-9)},{status:'wachten',datum:over(-2)}] }
    ];
  }

  function seedActivity() {
    return [
      { ic: 'check', kleur: 'var(--teal)', tekst: '<b>Noor Jansen</b> — variant Gemeente gepubliceerd', tijd: '2 u' },
      { ic: 'mail', kleur: 'var(--tangerine)', tekst: 'Link verstuurd naar <b>Marieke Doornbos</b> (Radboudumc)', tijd: '5 u' },
      { ic: 'eye', kleur: 'var(--petrol)', tekst: '<b>Richard Janssen</b> — 34 weergaven vandaag', tijd: '7 u' },
      { ic: 'edit', kleur: 'var(--mustard)', tekst: '<b>Sanne de Vries</b> diende wijzigingen in voor review', tijd: '1 d' },
      { ic: 'plus', kleur: 'var(--plum)', tekst: 'Nieuwe pagina aangemaakt voor <b>Milan de Groot</b>', tijd: '1 d' }
    ];
  }

  /* ---------------- store ---------------- */
  function fresh() {
    return { pages: seedPages(), mails: seedMails().concat(seedConsultantMails()),
             voorstellen: seedVoorstellen(), activity: seedActivity(), v: 5 };
  }

  function load() {
    try {
      var raw = global.localStorage.getItem(KEY);
      if (!raw) { var f = fresh(); save(f); return f; }
      var data = JSON.parse(raw);
      if (!data || !data.pages) { var g = fresh(); save(g); return g; }
      if (!data.voorstellen) data.voorstellen = seedVoorstellen();
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

  /* Welke editor hoort bij deze pagina? Richard is als enige helemaal ingevuld;
     elke andere consultant opent de lege template. */
  /* Welke presentatielayout hoort bij deze pagina? */
  function cvUrl(pagina) {
    var p = typeof pagina === 'string' ? { id: pagina } : (pagina || {});
    return /compact/i.test(p.sjabloon || '')
      ? 'compact.html?id=' + encodeURIComponent(p.id || '')
      : 'index.html';
  }

  function editorUrl(pagina) {
    var id = typeof pagina === 'string' ? pagina : (pagina && pagina.id);
    return id === 'richard-janssen'
      ? 'richard-janssen-edit.html'
      : 'pagina-edit.html?id=' + encodeURIComponent(id || '');
  }

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(global.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  /* ---------------- inzet: uren, looptijden en ruimte ----------------
     Een consultant kan bij meerdere opdrachtgevers tegelijk zitten. Daarom
     rekenen we met een contractomvang (capaciteit) en een lijst opdrachten;
     wat niet bezet is, is de ruimte die je nog kunt verkopen. */
  var VANDAAG = (function () {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  })();
  var DAG = 24 * 60 * 60 * 1000;
  var MAANDEN = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];

  /* De demo-data wordt rond 'vandaag' gezaaid, zodat de looptijden kloppen
     wanneer je de demo ook laat zien. */
  function iso(d) {
    var m = d.getMonth() + 1, dag = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (dag < 10 ? '0' : '') + dag;
  }
  function over(dagen) {
    var d = new Date(VANDAAG);
    d.setDate(d.getDate() + dagen);
    return iso(d);
  }

  function datum(txt) {
    if (!txt) return null;
    var d = String(txt).split('-');
    return new Date(+d[0], +d[1] - 1, +d[2]);
  }
  function datumKort(txt) {
    var d = datum(txt);
    return d ? d.getDate() + ' ' + MAANDEN[d.getMonth()] + ' ' + d.getFullYear() : '\u2014';
  }
  function dagenTot(txt) {
    var d = datum(txt);
    return d ? Math.round((d - VANDAAG) / DAG) : null;
  }

  /* '3 maanden en 1 week' leest prettiger dan '97 dagen' */
  function looptijd(dagen) {
    if (dagen === null) return '\u2014';
    if (dagen < 0) return 'afgelopen';
    if (dagen === 0) return 'loopt vandaag af';
    if (dagen < 14) return dagen + (dagen === 1 ? ' dag' : ' dagen');
    if (dagen < 60) return Math.round(dagen / 7) + ' weken';
    var m = Math.floor(dagen / 30.44);
    var rest = Math.round((dagen - m * 30.44) / 7);
    return m + (m === 1 ? ' maand' : ' maanden') + (rest > 0 ? ' en ' + rest + ' wk' : '');
  }

  function verrijkOpdracht(o) {
    var dagen = dagenTot(o.eind);
    var totaal = (o.start && o.eind) ? Math.round((datum(o.eind) - datum(o.start)) / DAG) : null;
    var verstreken = totaal !== null ? Math.max(0, Math.min(totaal, totaal - dagen)) : null;
    return {
      ruw: o,
      klant: o.klant, rol: o.rol, uren: o.uren, contact: o.contact, verlenging: o.verlenging,
      start: o.start, eind: o.eind,
      startKort: datumKort(o.start), eindKort: datumKort(o.eind),
      dagenRest: dagen,
      resterend: looptijd(dagen),
      voortgang: totaal ? Math.round(verstreken / totaal * 100) : 0,
      loopt: dagenTot(o.start) <= 0 && dagen >= 0,
      loopAf: dagen !== null && dagen >= 0 && dagen <= 60
    };
  }

  /* alles wat een scherm over iemands inzet wil weten, op één plek */
  function inzetInfo(p) {
    var i = p.inzet || { capaciteit: 36, opdrachten: [], eerder: [] };
    var cap = i.capaciteit || 0;
    var opdrachten = (i.opdrachten || []).map(verrijkOpdracht)
      .sort(function (a, b) { return b.uren - a.uren; });
    var lopend = opdrachten.filter(function (o) { return o.loopt; });
    var bezet = lopend.reduce(function (a, o) { return a + (o.uren || 0); }, 0);
    var vrij = Math.max(0, cap - bezet);
    var aflopend = lopend.filter(function (o) { return o.loopAf; });

    return {
      ruw: i,
      capaciteit: cap,
      bezet: bezet,
      vrij: vrij,
      bezetting: cap ? Math.round(bezet / cap * 100) : 0,
      opdrachten: opdrachten,
      lopend: lopend,
      aantal: lopend.length,
      /* vol = niets meer kwijt, ruimte = deels inzetbaar, beschikbaar = helemaal vrij */
      status: bezet === 0 ? 'beschikbaar' : (vrij > 0 ? 'ruimte' : 'vol'),
      loopAf: aflopend.length > 0,
      aflopend: aflopend,
      eerstvolgendEind: lopend.length
        ? lopend.slice().sort(function (a, b) { return a.dagenRest - b.dagenRest; })[0]
        : null,
      beschikbaarVanaf: i.beschikbaarVanaf ? datumKort(i.beschikbaarVanaf) : null,
      beschikbaarVanafRuw: i.beschikbaarVanaf,
      eerder: (i.eerder || []).map(verrijkOpdracht)
    };
  }

  var INZET_STATUS = {
    vol:         { label: 'Volgeboekt',  cls: 'pub' },
    ruimte:      { label: 'Ruimte',      cls: 'rev' },
    beschikbaar: { label: 'Beschikbaar', cls: 'hot' }
  };

  /* ---------------- salesflow ----------------
     Vier statussen, in de volgorde waarin een voorstel er doorheen loopt.
     'afgewezen' en 'akkoord' zijn eindpunten. */
  var SALES = [
    { sleutel:'voorstel',  label:'Opzet',             kleur:'var(--petrol)',    uitleg:'Profiel verstuurd, nog geen reactie' },
    { sleutel:'wachten',   label:'Wachten op reactie', kleur:'var(--mustard)',  uitleg:'De klant beraadt zich' },
    { sleutel:'afgewezen', label:'Afgewezen',          kleur:'var(--clay)',     uitleg:'Niet doorgegaan' },
    { sleutel:'akkoord',   label:'Akkoord',            kleur:'var(--teal)',     uitleg:'Rond \u2014 klaar om in te plannen' }
  ];
  var SALES_BIJ = {};
  SALES.forEach(function (s) { SALES_BIJ[s.sleutel] = s; });

  /* hoeveel dagen ligt een voorstel al stil? */
  function voorstelInfo(v) {
    var dagen = -(dagenTot(v.gewijzigd) || 0);
    return {
      ruw: v,
      status: SALES_BIJ[v.status] || SALES[0],
      open: v.status === 'voorstel' || v.status === 'wachten',
      stil: dagen,
      stilTekst: dagen <= 0 ? 'vandaag' : looptijd(dagen) + ' geleden',
      verstuurdKort: datumKort(v.verstuurd),
      startKort: datumKort(v.start),
      /* een open voorstel waar twee weken niets mee gebeurd is, vraagt om actie */
      treuzelt: (v.status === 'voorstel' || v.status === 'wachten') && dagen >= 14,
      weekomzet: (v.uren || 0) * (v.tarief || 0)
    };
  }

  /* ---------------- mails aan de consultant ----------------
     Deze kant van het beheer is net zo belangrijk als mailen naar klanten:
     consultants moeten hun eigen pagina vullen en bijhouden. */
  var CONSULTANT_MAILS = {
    bijwerken: {
      label: 'Vraag om bij te werken',
      omschrijving: 'Je pagina is al even niet aangeraakt',
      onderwerp: function (p) { return 'Werk je profiel even bij, ' + p.naam.split(' ')[0] + '?'; },
      tekst: function (p) {
        return ['Hoi ' + p.naam.split(' ')[0] + ',',
          'Je visuele CV is voor het laatst bijgewerkt ' + p.bijgewerkt + '. Klanten zien graag recente opdrachten \u2014 wil je je tijdlijn en introtekst een keer nalopen?',
          'Klik op de knop hieronder, dan open je meteen de editor. Vijf minuten werk.'];
      }
    },
    uitnodiging: {
      label: 'Uitnodiging versturen',
      omschrijving: 'Eerste kennismaking met de editor',
      onderwerp: function (p) { return 'Je visuele CV staat klaar'; },
      tekst: function (p) {
        return ['Hoi ' + p.naam.split(' ')[0] + ',',
          'We hebben een visueel CV voor je klaargezet. In plaats van een pdf krijgen opdrachtgevers zo een beeld van wie je bent: een korte video, je opdrachten en wat klanten over je zeggen.',
          'Vul het in je eigen woorden aan. Loop je vast? Bel me gerust.'];
      }
    },
    fotos: {
      label: 'Vraag om foto\u2019s',
      omschrijving: 'De fotogalerij is nog leeg',
      onderwerp: function (p) { return 'We missen nog een paar foto\u2019s'; },
      tekst: function (p) {
        return ['Hoi ' + p.naam.split(' ')[0] + ',',
          'Je pagina staat er goed op, maar de fotogalerij is nog leeg. Vier foto\u2019s van buiten het werk maken het verhaal compleet \u2014 denk aan een hobby, een reis of je werkplek.',
          'Je kunt ze zelf uploaden via de knop hieronder.'];
      }
    },
    feedback: {
      label: 'Feedback op review',
      omschrijving: 'Wijzigingen nog niet goedgekeurd',
      onderwerp: function (p) { return 'Kleine aanpassing op je pagina'; },
      tekst: function (p) {
        return ['Hoi ' + p.naam.split(' ')[0] + ',',
          'Dank voor je wijzigingen. Voordat ik publiceer nog \u00e9\u00e9n ding: de introtekst mag wat korter en concreter \u2014 waar bellen klanten je precies voor?',
          'Pas je het aan? Dan zet ik hem daarna direct live.'];
      }
    }
  };

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
    var openVoorstellen = (data.voorstellen || []).filter(function (v) {
      return v.status === 'voorstel' || v.status === 'wachten'; }).length;
    document.querySelectorAll('[data-badge="sales"]').forEach(function (el) {
      if (openVoorstellen) { el.textContent = openVoorstellen; el.style.display = ''; }
      else { el.style.display = 'none'; }
    });

    var unread = data.mails.filter(function (m) { return m.ongelezen && m.map !== 'verzonden'; }).length;
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
        // het domein in het attribuut hoort ook bij het gekozen merk
        var txt = global.Merk.tekst(cp.getAttribute('data-copy'));
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
    STATUS: STATUS, ICON: ICON, COLORS: COLORS, CONSULTANT_MAILS: CONSULTANT_MAILS,
    INZET_STATUS: INZET_STATUS, inzetInfo: inzetInfo, datumKort: datumKort,
    SALES: SALES, SALES_BIJ: SALES_BIJ, voorstelInfo: voorstelInfo,
    dagenTot: dagenTot, looptijd: looptijd, VANDAAG: VANDAAG, iso: iso, over: over,
    esc: esc, slug: slug, initials: initials, kleurVoor: kleurVoor, nf: nf, param: param,
    editorUrl: editorUrl, cvUrl: cvUrl,
    toast: toast, openModal: openModal, closeModal: closeModal, init: init,
    animeer: animeer
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})(window);
