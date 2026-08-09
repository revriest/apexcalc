/**
 * CalcQI — Static Site Generator
 * Splits the single-page index.html into 32 standalone, SEO-optimized calculator pages
 * and a lean portal homepage.
 *
 * Run:  node generate-pages.js
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://calcqi.com';
const SOURCE = path.join(__dirname, 'index.html');
const OUT = __dirname;

// ---------------------------------------------------------------------------
// 32 calculator definitions
// ---------------------------------------------------------------------------
const CALCS = [
  { id:'3dprint', slug:'3d-print-cost-calculator', calcFn:'calc3DPrint',
    name:'3D Print Cost Calculator',
    title:'3D Print Cost Calculator — Estimate Pricing & Profit | CalcQI',
    desc:'3D print cost calculator — estimate filament, electricity, wear, labor and retail markup, with profit margin and cost breakdown.' },
  { id:'baker', slug:'pizza-dough-calculator', calcFn:'calcBaker',
    name:"Baker's Pizza Dough Calculator",
    title:'Pizza Dough Calculator — Baker\'s Hydration % | CalcQI',
    desc:'Pizza dough calculator using baker\'s percentage — scale hydration, yeast, salt and oil for consistent restaurant-quality dough.' },
  { id:'ny-pizza', slug:'ny-style-pizza-dough-calculator', calcFn:'calcNY',
    name:'NY-Style Pizza Dough Calculator',
    title:'NY Style Pizza Dough Calculator — Cold Ferment Recipe | CalcQI',
    desc:'NY-style pizza dough calculator — 60% hydration high-gluten recipe with cold ferment guidance for 12 to 16 inch pizzas.' },
  { id:'laser-cnc', slug:'cnc-laser-cutting-cost-calculator', calcFn:'calcLaserCNC',
    name:'CNC & Laser Cutting Cost Calculator',
    title:'CNC & Laser Cutting Cost Calculator | CalcQI',
    desc:'CNC and laser cutting cost calculator — cut time from feed rate, machine dollars per hour, setup labor and quote markup.' },
  { id:'sourdough', slug:'sourdough-levain-calculator', calcFn:'calcSourdough',
    name:'Sourdough Levain Calculator',
    title:'Sourdough Levain Calculator — Fermentation Build | CalcQI',
    desc:'Sourdough levain calculator — 1:2:2 builds, inoculation percent, hydration split and salt for your bake.' },
  { id:'resin-mold', slug:'resin-casting-volume-calculator', calcFn:'calcResin',
    name:'Resin Casting Volume Calculator',
    title:'Resin Casting Volume Calculator — Mold Mix Ratios | CalcQI',
    desc:'Resin casting volume calculator — mold volume in ml and oz with 2:1 Part A:B mix ratios and waste buffer.' },
  { id:'video', slug:'video-bitrate-file-size-calculator', calcFn:'calcVideo',
    name:'Video Bitrate & File Size Calculator',
    title:'Video Bitrate Calculator — File Size & Mbps | CalcQI',
    desc:'Video bitrate calculator — forecast MP4 file size from bitrate and duration with codec delivery tier ratings.' },
  { id:'dof', slug:'depth-of-field-calculator', calcFn:'calcDOF',
    name:'Depth of Field Calculator',
    title:'Depth of Field Calculator — Hyperfocal Distance | CalcQI',
    desc:'Depth of field calculator — hyperfocal distance, near and far focus limits and total in-focus range for any lens.' },
  { id:'camera-fov', slug:'camera-field-of-view-calculator', calcFn:'calcCameraFOV',
    name:'Camera Field of View Calculator',
    title:'Camera Field of View Calculator — Crop Factor | CalcQI',
    desc:'Camera field of view calculator — horizontal, vertical and diagonal degrees for full frame, APS-C and MFT sensors.' },
  { id:'nd-filter', slug:'nd-filter-exposure-calculator', calcFn:'calcNDFilter',
    name:'ND Filter Exposure Calculator',
    title:'ND Filter Exposure Calculator — Shutter Speed | CalcQI',
    desc:'ND filter exposure calculator — shutter speed compensation across stops with ND2 to ND1000000 density naming.' },
  { id:'timelapse', slug:'timelapse-interval-calculator', calcFn:'calcTimelapse',
    name:'Timelapse Interval Calculator',
    title:'Timelapse Interval Calculator — Shots & Duration | CalcQI',
    desc:'Timelapse interval calculator — shots needed, playback speed and card storage for any event length.' },
  { id:'light-inverse', slug:'light-falloff-inverse-square-calculator', calcFn:'calcLightInverse',
    name:'Light Falloff Calculator',
    title:'Light Falloff Calculator — Inverse Square Law | CalcQI',
    desc:'Inverse square light falloff calculator — lux drop and f-stop loss when moving a light further from your subject.' },
  { id:'tdee', slug:'tdee-macro-calculator', calcFn:'calcTDEE',
    name:'TDEE & Macro Calculator',
    title:'TDEE Calculator — Calories & Macro Split | CalcQI',
    desc:'TDEE calculator — daily calories with BMR, cut and bulk targets plus protein, carb and fat macro split.' },
  { id:'1rm', slug:'one-rep-max-calculator', calcFn:'calc1RM',
    name:'One Rep Max Calculator',
    title:'One Rep Max Calculator — Epley & Brzycki | CalcQI',
    desc:'One rep max calculator — Epley and Brzycki estimates with bodyweight strength ratio for bench, squat and deadlift.' },
  { id:'ffmi', slug:'ffmi-muscular-potential-calculator', calcFn:'calcFFMI',
    name:'FFMI & Muscular Potential Calculator',
    title:'FFMI Calculator — Muscular Potential | CalcQI',
    desc:'FFMI calculator — fat-free mass index on the 16-25 natural muscular ceiling scale with classification.' },
  { id:'wilks-dots', slug:'wilks-dots-powerlifting-calculator', calcFn:'calcWilksDOTS',
    name:'DOTS Powerlifting Score Calculator',
    title:'DOTS Calculator — Powerlifting Score | CalcQI',
    desc:'DOTS powerlifting score calculator — relative strength with Wilks coefficient across weight classes from novice to elite.' },
  { id:'karvonen-hr', slug:'karvonen-heart-rate-zone-calculator', calcFn:'calcKarvonenHR',
    name:'Karvonen Heart Rate Zone Calculator',
    title:'Karvonen Heart Rate Zone Calculator | CalcQI',
    desc:'Karvonen heart rate zone calculator — heart rate reserve with 5 exact training zone BPM ranges.' },
  { id:'running-pace', slug:'running-pace-calculator', calcFn:'calcRunningPace',
    name:'Running Pace Calculator',
    title:'Running Pace Calculator — 5K to Marathon | CalcQI',
    desc:'Running pace calculator — pace per km and mile plus predicted 5K, 10K, half and full marathon times.' },
  { id:'stock-avg', slug:'stock-average-down-calculator', calcFn:'calcStockAvg',
    name:'Stock Average Down Calculator',
    title:'Stock Average Down Calculator — Cost Basis | CalcQI',
    desc:'Stock average down calculator — cost basis break-even when averaging down a position with dollar cost averaging.' },
  { id:'drip', slug:'dividend-drip-calculator', calcFn:'calcDRIP',
    name:'Dividend DRIP Calculator',
    title:'Dividend DRIP Calculator — Compounding Growth | CalcQI',
    desc:'Dividend DRIP calculator — 10 year compounding portfolio forecast separating contributions from reinvested growth.' },
  { id:'position-risk', slug:'position-size-risk-calculator', calcFn:'calcPositionRisk',
    name:'Position Size & Risk Calculator',
    title:'Position Size Calculator — Risk & Reward | CalcQI',
    desc:'Position size calculator — shares to buy from account risk percent, stop loss and reward to risk ratio.' },
  { id:'compound-savings', slug:'compound-interest-calculator', calcFn:'calcCompoundSavings',
    name:'Compound Interest Calculator',
    title:'Compound Interest Calculator — Savings Growth | CalcQI',
    desc:'Compound interest calculator — future savings value from initial balance and monthly deposits over 10 years.' },
  { id:'crypto-roi', slug:'crypto-roi-calculator', calcFn:'calcCryptoROI',
    name:'Crypto ROI Calculator',
    title:'Crypto ROI Calculator — Profit After Fees | CalcQI',
    desc:'Crypto ROI calculator — net profit after buy and sell exchange fees with ROI percent and units held.' },
  { id:'mortgage', slug:'mortgage-payment-calculator', calcFn:'calcMortgage',
    name:'Mortgage Payment Calculator',
    title:'Mortgage Payment Calculator — Principal & Interest | CalcQI',
    desc:'Mortgage payment calculator — monthly principal and interest, total interest and amortization for your loan.' },
  { id:'tip-split', slug:'tip-bill-split-calculator', calcFn:'calcTipSplit',
    name:'Tip & Bill Split Calculator',
    title:'Tip & Bill Split Calculator — Per Person Share | CalcQI',
    desc:'Tip and bill split calculator — per person share, tip amount and total with tip for any group meal.' },
  { id:'percentage', slug:'percentage-calculator', calcFn:'calcPercentage',
    name:'Percentage Calculator',
    title:'Percentage Calculator — % of a Number | CalcQI',
    desc:'Percentage calculator — find X percent of a number or what percent A is of B instantly.' },
  { id:'units', slug:'unit-converter', calcFn:'calcUnits',
    name:'Unit Converter',
    title:'Unit Converter — Length, Weight, Temperature | CalcQI',
    desc:'Unit converter — convert length, weight, temperature and volume between metric and imperial units.' },
  { id:'age', slug:'age-date-difference-calculator', calcFn:'calcAge',
    name:'Age & Date Difference Calculator',
    title:'Age Calculator — Date Difference | CalcQI',
    desc:'Age calculator — exact age in years, months and days plus weeks and hours between two dates.' },
  { id:'discount', slug:'discount-sale-price-calculator', calcFn:'calcDiscount',
    name:'Discount & Sale Price Calculator',
    title:'Discount Calculator — Sale Price & Savings | CalcQI',
    desc:'Discount calculator — sale price and dollars saved from original price and discount percent.' },
  { id:'fuel', slug:'fuel-cost-calculator', calcFn:'calcFuel',
    name:'Fuel Cost & Mileage Calculator',
    title:'Fuel Cost Calculator — Trip Mileage & MPG | CalcQI',
    desc:'Fuel cost calculator — trip cost, litres used and MPG from distance, price and L/100km economy.' },
  { id:'body-fat', slug:'body-fat-percentage-calculator', calcFn:'calcBodyFat',
    name:'Body Fat Percentage Calculator',
    title:'Body Fat Percentage Calculator — US Navy | CalcQI',
    desc:'Body fat percentage calculator — US Navy method using height, waist and neck measurements.' },
  { id:'calories-burned', slug:'calories-burned-calculator', calcFn:'calcCaloriesBurned',
    name:'Calories Burned Calculator',
    title:'Calories Burned Calculator — MET Activity | CalcQI',
    desc:'Calories burned calculator — MET based estimate for walking, running, cycling, swimming and more.' },
];

const CATS = [
  { key:'everyday', label:'Everyday', ids:['tip-split','percentage','units','age','discount','fuel'] },
  { key:'maker', label:'Maker & Craft', ids:['3dprint','baker','ny-pizza','laser-cnc','sourdough','resin-mold'] },
  { key:'creator', label:'Creator & Media', ids:['video','dof','camera-fov','nd-filter','timelapse','light-inverse'] },
  { key:'fitness', label:'Fitness & Body', ids:['tdee','1rm','ffmi','body-fat','calories-burned','wilks-dots','karvonen-hr','running-pace'] },
  { key:'finance', label:'Finance & Trading', ids:['stock-avg','drip','position-risk','compound-savings','crypto-roi','mortgage'] },
];
const byId = Object.fromEntries(CALCS.map(c => [c.id, c]));

// ---------------------------------------------------------------------------
// Extract shared assets from index.html
// ---------------------------------------------------------------------------
const html = fs.readFileSync(SOURCE, 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('Could not find <style> block');
const STYLE = styleMatch[1];

const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const ENGINE_SCRIPT = scriptMatches[scriptMatches.length - 1][1];

function extractSection(id) {
  const start = html.indexOf(`<section id="tab-${id}"`);
  if (start === -1) throw new Error(`Section not found: ${id}`);
  const end = html.indexOf('</section>', start);
  let seg = html.slice(start, end + '</section>'.length);
  // Strip the tab-panel class so the section is always visible as a standalone page
  seg = seg.replace('class="tab-panel"', 'class="calc-page"');
  // Remove data-cat? Keep — CSS theming relies on it.
  return seg;
}

// ---------------------------------------------------------------------------
// Build navigation (desktop dropdowns + mobile select) with real hrefs
// ---------------------------------------------------------------------------
function buildNav() {
  const drop = CATS.map(cat => `
          <div class="nav-cat-group">
            <button class="nav-cat-btn"><span>${cat.label}</span></button>
            <div class="dropdown-menu">
              ${cat.ids.map(id => {
                const c = byId[id];
                return `<a class="dropdown-item" href="${c.slug}.html">${c.name.replace(/ — .*/,'')}</a>`;
              }).join('\n              ')}
            </div>
          </div>`).join('\n          ');

  const mobile = CATS.map(cat => `
          <optgroup label="${cat.label}">
            ${cat.ids.map(id => `<option value="${byId[id].slug}.html">${byId[id].name.replace(/ — .*/,'')}</option>`).join('\n            ')}
          </optgroup>`).join('\n          ');

  return { drop, mobile };
}

// ---------------------------------------------------------------------------
// Build one standalone calculator page
// ---------------------------------------------------------------------------
function buildPage(c) {
  const section = extractSection(c.id);
  const { drop, mobile } = buildNav();

  // Init for this page only — replace the shared load handler
  let script = ENGINE_SCRIPT;
  const loadIdx = script.indexOf("window.addEventListener('load'");
  if (loadIdx !== -1) {
    script = script.slice(0, loadIdx) +
      `window.addEventListener('load', () => { $id('footer-year').textContent = new Date().getFullYear(); ${c.calcFn}(); });\n`;
  }
  // Strip SPA-only helpers that reference elements not present on tool pages
  const strips = [
    [/function showTab\(id\) \{[\s\S]*?\n    \}\n\n/, ''],
    [/function switchTab\(id\) \{[\s\S]*?\n    \}\n\n/, ''],
    [/window\.addEventListener\('hashchange',[\s\S]*?\n    \}\);\n\n/, ''],
    [/function filterHomeTools\(q\) \{[\s\S]*?\n    \}\n\n/, ''],
    [/window\.addEventListener\('keydown',[\s\S]*?\n    \}\);\n\n/, ''],
  ];
  strips.forEach(([re, rep]) => { script = script.replace(re, rep); });

  const jsonLd = `{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${c.name}",
    "url": "${SITE}/${c.slug}.html",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.title}</title>
  <meta name="description" content="${c.desc}">
  <meta name="author" content="CalcQI">
  <link rel="canonical" href="${SITE}/${c.slug}.html">
  <meta property="og:title" content="${c.name} | CalcQI">
  <meta property="og:description" content="${c.desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE}/${c.slug}.html">
  <meta property="og:site_name" content="CalcQI">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%236366f1%22/><text y=%22.85em%22 x=%22.1em%22 font-size=%2265%22 font-weight=%22bold%22 fill=%22white%22>CQ</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
${STYLE}
  </style>
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>

  <header class="app-header">
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="brand-logo">
          <div class="logo-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div>
          <span>Calc<span style="color: var(--accent-indigo);">QI</span></span>
          <span class="brand-badge">★ 32 Pro Tools</span>
        </a>

        <nav class="cat-nav-menu">
          <a class="nav-cat-btn" href="index.html"><span>Home</span></a>
${drop}
        </nav>

        <select class="mobile-tool-select" onchange="location.href=this.value">
          <option value="index.html">Home</option>
${mobile}
        </select>
      </div>
    </div>
  </header>

  <main class="main-content">
    <div class="container">
${section}
    </div>
  </main>

  <div id="privacy-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header"><h2>Privacy Policy & Ad Compliance</h2><button class="modal-close-btn" onclick="closePrivacyModal()">&times;</button></div>
      <div class="modal-body">
        <p>CalcQI provides free, client-side calculators. <strong style="color:var(--text-main);">We store zero personal data.</strong></p>
        <p style="margin-top:0.75rem;">All calculations run in your browser. No inputs are transmitted to any server. Optional "Save Run" history uses your browser's local storage only and never leaves your device.</p>
        <p style="margin-top:0.75rem;">No cookies, no trackers, no analytics, no advertising identifiers.</p>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"><span id="toast-message">Copied!</span></div>

  <footer class="app-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-text">&copy; <span id="footer-year">2026</span> CalcQI. 32-Tool Guided Utility Suite.</div>
        <div class="footer-links">
          <a href="index.html">All Calculators</a>
          <a href="#" onclick="openPrivacyModal(event)">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
${script}
  </script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Build the lean portal homepage from index.html
// ---------------------------------------------------------------------------
function buildHomepage() {
  let home = html;

  // 1. Point every tool interaction (bento cards, dropdowns, mobile options) at its page
  CALCS.forEach(c => {
    home = home.split(`onclick="switchTab('tab-${c.id}')"`).join(`onclick="location.href='${c.slug}.html'"`);
  });
  // Home / logo / select also need real links now
  home = home.split(`onclick="switchTab('tab-home')"`).join(`onclick="location.href='index.html'"`);
  home = home.split('onchange="switchTab(this.value)"').join('onchange="location.href=this.value"');
  CALCS.forEach(c => {
    home = home.split(`<option value="tab-${c.id}">`).join(`<option value="${c.slug}.html">`);
  });

  // 2. Strip the 32 calculator panels from the homepage (they now live on their own pages)
  const divider = home.indexOf('<!-- ======================================================================');
  const mainEnd = home.indexOf('\n    </div>\n  </main>');
  if (divider !== -1 && mainEnd !== -1 && divider < mainEnd) {
    home = home.slice(0, divider) + '\n    </div>\n  </main>' + home.slice(mainEnd + '\n    </div>\n  </main>'.length);
  }

  // 3. Home section must be visible — strip the SPA-only "tab-panel" (display:none) class
  home = home.replace('id="tab-home" class="tab-panel active"', 'id="tab-home" class="calc-page"');

  // 4. Replace the full engine script with a slim homepage script
  //    (the old load handler would crash since calculator inputs no longer exist)
  const slimScript = `    function $id(e){return document.getElementById(e)}
    function showToast(m){const t=$id('toast');$id('toast-message').textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}
    function copyToClipboard(t,msg){navigator.clipboard.writeText(t).then(()=>showToast(msg)).catch(()=>{})}
    function openPrivacyModal(e){if(e)e.preventDefault();$id('privacy-modal').classList.add('show')}
    function closePrivacyModal(){$id('privacy-modal').classList.remove('show')}
    $id('privacy-modal').addEventListener('click',function(e){if(e.target===this)closePrivacyModal()})
    function filterHomeTools(q){const x=q.toLowerCase().trim();document.querySelectorAll('.tool-card-item').forEach(s=>{const t=(s.getAttribute('data-title')||'').toLowerCase();s.style.display=(x===''||t.includes(x))?'block':'none'})}
    window.addEventListener('load',()=>{$id('footer-year').textContent=new Date().getFullYear()});`;
  home = home.replace(/<script>[\s\S]*?<\/script>\s*<\/body>/, `<script>\n${slimScript}\n  </script>\n</body>`);

  // 5. Homepage meta
  home = home.replace('<title>CalcQI | 32 Calculators — Everyday, Maker, Media, Fitness & Finance</title>',
    '<title>CalcQI — 32 Free Calculators | Everyday, Maker, Media, Fitness & Finance</title>');
  home = home.replace(
    '<meta name="description" content="32 free calculators for everyday life and specialists: tip split, percentage, unit converter, discount, fuel, body fat, calories burned, plus 3D print, pizza dough, video bitrate, mortgage, crypto ROI and more.">',
    '<meta name="description" content="CalcQI — 32 free online calculators with instant visual results. Tools for everyday essentials, makers and creators, fitness and body, and finance and trading. No sign-up, works on any device.">'
  );
  // Canonical root stays https://calcqi.com

  return home;
}

// ---------------------------------------------------------------------------
// Write everything
// ---------------------------------------------------------------------------
let count = 0;
for (const c of CALCS) {
  const page = buildPage(c);
  fs.writeFileSync(path.join(OUT, c.slug + '.html'), page);
  count++;
}
fs.writeFileSync(path.join(OUT, 'index.html'), buildHomepage());

console.log(`Generated ${count} standalone calculator pages + updated homepage.`);

// ---------------------------------------------------------------------------
// Regenerate sitemap.xml from the same data
// ---------------------------------------------------------------------------
const escaped = (s) => s.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
const urlXml = (loc, prio) =>
  `  <url><loc>${SITE}/${loc}</loc><lastmod>2026-08-09</lastmod><changefreq>weekly</changefreq><priority>${prio}</priority></url>`;

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlXml('', '1.0')}
`;
for (const cat of CATS) {
  for (const id of cat.ids) {
    const c = byId[id];
    const flagship = ['3dprint','video','tdee','stock-avg'].includes(id);
    sitemap += urlXml(c.slug + '.html', flagship ? '0.9' : '0.8') + '\n';
  }
}
sitemap += `</urlset>
`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);
console.log('Regenerated sitemap.xml.');