/**
 * ============================================================
 *  EdTech Capstone — Teacher Technology Infrastructure Survey
 *  JavaScript Engine (Expanded 8-Question Version)
 * ============================================================
 *
 *  SECTIONS:
 *   1. Auto-Complete Dictionary (devices, platforms, hurdles, pd_needs, improvements)
 *   2. Auto-Complete Engine (fuzzy match, dropdown, keyboard nav)
 *   3. Progress Tracking & Card Completion
 *   4. Slider Sync
 *   5. Collect Form Data
 *   6. Google Apps Script Submission (GET-based)
 *   7. Validation Engine
 *   8. Submit Handler + Confetti
 *   9. Initialization
 */


/* ============================================================
   SECTION 1 — AUTO-COMPLETE DICTIONARY
   ============================================================ */

const AC_DICTIONARY = {

  // Q2 Other devices
  devices: [
    "1:1 Chromebooks",
    "Shared Chromebook Cart",
    "iPads / Tablets",
    "Interactive Whiteboard / SMART Board",
    "Desktop Computers",
    "Document Camera",
    "Teacher Laptop + Projector",
    "Student Smartphones (BYOD)",
    "Windows Laptops",
    "MacBooks / Apple devices",
    "Kindle / E-readers",
    "Raspberry Pi / Micro:bit",
    "Robotics kits (Sphero, LEGO, VEX)",
    "VR / AR headsets",
    "3D Printer",
    "Graphing calculators",
    "Digital microscope",
    "Assistive technology devices",
    "Podcast recording kit",
    "Music production equipment (MIDI keyboard)"
  ],

  // Q4 Other platforms
  platforms: [
    "Boost Reading",
    "ST Math",
    "Amplify",
    "Google Classroom",
    "EdPuzzle",
    "Nearpod",
    "Khan Academy",
    "IXL",
    "Lexia / Core5",
    "Raz-Kids",
    "Epic!",
    "Seesaw",
    "Canvas LMS",
    "Newsela",
    "Pear Deck",
    "Kahoot!",
    "Quizizz",
    "Padlet",
    "Flipgrid / Flip",
    "Schoology",
    "BrainPOP",
    "Prodigy Math",
    "DreamBox",
    "i-Ready",
    "Achieve3000",
    "Common Lit",
    "NoRedInk",
    "Desmos",
    "GeoGebra",
    "Typing.com",
    "Code.org",
    "Scratch",
    "PBS LearningMedia",
    "ReadWorks",
    "Formative",
    "Edulastic",
    "GoGuardian",
    "ClassDojo",
    "Remind",
    "Book Creator",
    "Canva for Education",
    "WeVideo",
    "Adobe Express",
    "Microsoft 365 / Teams",
    "Clever (SSO portal)",
    "ClassLink",
    "Illuminate Education",
    "NWEA MAP Testing",
    "Renaissance Star / Accelerated Reader",
    "Zearn Math"
  ],

  // Q6 Other challenges
  hurdles: [
    "Unreliable or slow Wi-Fi across the building",
    "Wi-Fi dead zones in certain classrooms or hallways",
    "Bandwidth bottleneck when entire school is online",
    "Internet goes down frequently during peak usage hours",
    "Not enough devices for all students",
    "Outdated devices that are too slow for modern apps",
    "Devices break frequently and repairs take too long",
    "Battery life on devices is too short for a full school day",
    "Student distraction and off-task behavior on devices",
    "No budget for replacement parts or upgrades",
    "Software licensing costs are too high",
    "Lack of professional development on tech integration",
    "Teachers are not trained on how to integrate tech effectively",
    "PD sessions are one-size-fits-all and not subject-specific",
    "No dedicated tech support or IT staff",
    "Tech support response times are unacceptably slow",
    "Too many content filters block useful educational sites",
    "Security and privacy concerns with student data",
    "COPPA/FERPA compliance makes adopting new tools difficult",
    "Students bypass content filters and access inappropriate material",
    "Power outlets and charging infrastructure are insufficient",
    "No centralized device management or inventory tracking",
    "Classroom layout doesn't accommodate technology use",
    "Students don't have internet access at home",
    "Digital divide: some students are tech-savvy, others are not",
    "Hardware damage (broken screens, missing keys)",
    "Software login issues and password management chaos",
    "Difficulty managing devices during whole-class instruction",
    "Lack of a clear tech integration policy or framework",
    "Administration doesn't prioritize technology integration"
  ],

  // Q7 Other PD needs
  pd_needs: [
    "Using data from digital platforms to drive instruction",
    "Classroom technology management routines",
    "Digital literacy and citizenship instruction",
    "Integrating tech into specific content areas",
    "Advanced tools: coding, robotics, multimedia creation",
    "Troubleshooting common device issues",
    "Teaching students to evaluate credible sources",
    "Typing instruction strategies",
    "Using AI tools effectively in the classroom",
    "Differentiation strategies with technology",
    "Station rotation models with technology",
    "Blended learning design and implementation",
    "Formative assessment using digital tools",
    "Using Google Workspace apps for collaboration",
    "Creating interactive lessons with Nearpod or Pear Deck",
    "Video creation and editing for student projects",
    "Assistive technology for students with disabilities",
    "Gamification strategies (Kahoot, Quizizz, Blooket)",
    "Family engagement using technology platforms",
    "Data privacy and security best practices",
    "Developing technology-infused lesson plans",
    "Project-based learning with technology integration",
    "Flipped classroom model implementation",
    "Social-emotional learning tools and platforms",
    "STEM / STEAM integration strategies"
  ],

  // Q8 Recommendations
  improvements: [
    "Reliable Wi-Fi across all classrooms and buildings",
    "Updated infrastructure: sufficient power outlets and bandwidth",
    "Upgrade to enterprise-grade Wi-Fi 6E across all buildings",
    "Install redundant internet connections to prevent outages",
    "1:1 device program for all grade levels",
    "Annual device refresh cycle to prevent obsolescence",
    "Establish a 3-year device refresh cycle with planned budget",
    "Interactive whiteboard in every classroom",
    "Dedicated technology integration coach on staff",
    "Monthly professional development focused on meaningful tech use",
    "Peer mentoring program for tech-reluctant teachers",
    "Subject-specific tech PD (e.g., Desmos for math, Canva for art)",
    "On-site tech support with same-day response",
    "Hire a full-time instructional technology specialist",
    "Cloud-based LMS mandated district-wide for consistency",
    "Adopt a single sign-on (SSO) platform for all educational apps",
    "A clear technology integration framework (SAMR/TPACK) adopted school-wide",
    "Student digital citizenship curriculum built into advisory",
    "Teacher voice in technology purchasing decisions",
    "Reduced content filtering so teachers can access needed resources",
    "Hotspot lending program for students without home internet",
    "Grant funding dedicated to classroom technology upgrades",
    "Build a dedicated makerspace / innovation lab",
    "Pilot robotics, coding, and hands-on STEM programs",
    "iPad trials in select classrooms for early learners",
    "Training focused on data-driven instruction using platform analytics",
    "Typing and digital literacy instruction embedded into curriculum",
    "Expand technology opportunities through robotics and hands-on learning",
    "Provide loaner device pool for students with broken devices",
    "Implement a student tech team to handle Tier-1 support"
  ]
};


/* ============================================================
   SECTION 2 — AUTO-COMPLETE ENGINE
   ============================================================ */

class AutoComplete {
  constructor(inputEl, dropdownEl, category) {
    this.input = inputEl;
    this.dropdown = dropdownEl;
    this.items = AC_DICTIONARY[category] || [];
    this.activeIdx = -1;
    this.visible = false;
    this._bindEvents();
  }

  _match(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase().trim();
    const isTextarea = this.input.tagName === 'TEXTAREA';
    let searchQ = q;
    if (isTextarea) {
      const segments = q.split(/[,.\n]/);
      searchQ = (segments[segments.length - 1] || '').trim();
      if (searchQ.length < 2) return [];
    }

    const scored = this.items
      .map(item => {
        const lower = item.toLowerCase();
        let score = 0;
        if (lower.startsWith(searchQ)) score = 3;
        else if (lower.split(/\s+/).some(w => w.startsWith(searchQ))) score = 2;
        else if (lower.includes(searchQ)) score = 1;
        return { item, score };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map(s => s.item).slice(0, 12);
  }

  _render(matches, query) {
    this.dropdown.innerHTML = '';
    if (!matches.length) { this._hide(); return; }

    const q = query.toLowerCase().trim();
    const isTextarea = this.input.tagName === 'TEXTAREA';
    let highlightQ = q;
    if (isTextarea) {
      const segments = q.split(/[,.\n]/);
      highlightQ = (segments[segments.length - 1] || '').trim();
    }

    matches.forEach((text, i) => {
      const div = document.createElement('div');
      div.className = 'ac-item';
      div.dataset.index = i;

      const lower = text.toLowerCase();
      const idx = lower.indexOf(highlightQ);
      let html = '<span class="ac-icon">⚡</span>';
      if (idx >= 0 && highlightQ.length > 0) {
        html += text.substring(0, idx)
          + '<span class="ac-match">' + text.substring(idx, idx + highlightQ.length) + '</span>'
          + text.substring(idx + highlightQ.length);
      } else {
        html += text;
      }
      div.innerHTML = html;

      div.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this._select(text);
      });

      this.dropdown.appendChild(div);
    });

    this._show();
    this.activeIdx = -1;
  }

  _show() {
    this.dropdown.classList.add('visible');
    this.visible = true;
  }
  _hide() {
    this.dropdown.classList.remove('visible');
    this.visible = false;
    this.activeIdx = -1;
  }

  _select(text) {
    const isTextarea = this.input.tagName === 'TEXTAREA';
    if (isTextarea) {
      const val = this.input.value;
      const segments = val.split(/([,.\n])/);
      let lastTextIdx = segments.length - 1;
      while (lastTextIdx >= 0 && /^[,.\n]$/.test(segments[lastTextIdx])) lastTextIdx--;
      if (lastTextIdx >= 0) {
        segments[lastTextIdx] = ' ' + text;
      }
      this.input.value = segments.join('').trim();
    } else {
      this.input.value = text;
    }

    this._hide();
    this.input.dispatchEvent(new Event('input', { bubbles: true }));
    this.input.focus();
  }

  _navigate(dir) {
    const items = this.dropdown.querySelectorAll('.ac-item');
    if (!items.length) return;

    if (this.activeIdx >= 0) items[this.activeIdx].classList.remove('active');
    this.activeIdx += dir;
    if (this.activeIdx < 0) this.activeIdx = items.length - 1;
    if (this.activeIdx >= items.length) this.activeIdx = 0;
    items[this.activeIdx].classList.add('active');
    items[this.activeIdx].scrollIntoView({ block: 'nearest' });
  }

  _bindEvents() {
    this.input.addEventListener('input', () => {
      const val = this.input.value;
      const matches = this._match(val);
      this._render(matches, val);
    });

    this.input.addEventListener('keydown', (e) => {
      if (!this.visible) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._navigate(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._navigate(-1);
      } else if (e.key === 'Enter' && this.activeIdx >= 0) {
        e.preventDefault();
        const matches = this._match(this.input.value);
        if (matches[this.activeIdx]) this._select(matches[this.activeIdx]);
      } else if (e.key === 'Escape') {
        this._hide();
      } else if (e.key === 'Tab' && this.activeIdx >= 0) {
        e.preventDefault();
        const matches = this._match(this.input.value);
        if (matches[this.activeIdx]) this._select(matches[this.activeIdx]);
      }
    });

    this.input.addEventListener('blur', () => {
      setTimeout(() => this._hide(), 200);
    });

    this.input.addEventListener('focus', () => {
      const val = this.input.value;
      if (val.length >= 1) {
        const matches = this._match(val);
        this._render(matches, val);
      }
    });
  }
}

/* --- Initialize all auto-complete fields --- */
function initAutoComplete() {
  const fields = [
    { input: 'q2-other', dropdown: 'q2-dropdown', category: 'devices' },
    { input: 'q4-other', dropdown: 'q4-dropdown', category: 'platforms' },
    { input: 'q6-other', dropdown: 'q6-dropdown', category: 'hurdles' },
    { input: 'q7-other', dropdown: 'q7-dropdown', category: 'pd_needs' },
    { input: 'q8-recommendation', dropdown: 'q8-dropdown', category: 'improvements' },
  ];

  fields.forEach(f => {
    const inputEl = document.getElementById(f.input);
    const dropdownEl = document.getElementById(f.dropdown);
    if (inputEl && dropdownEl) {
      new AutoComplete(inputEl, dropdownEl, f.category);
    }
  });
}


/* ============================================================
   SECTION 3 — PROGRESS TRACKING & CARD COMPLETION
   ============================================================ */

const TOTAL_QUESTIONS = 8;

function getAnsweredCount() {
  let answered = 0;

  // Q1: Both dropdowns selected
  if (document.getElementById('q1-grade').value && document.getElementById('q1-role').value) answered++;

  // Q2: At least one device checked + frequency selected
  const q2Devices = document.querySelectorAll('input[name="q2dev"]:checked');
  const q2Other = document.getElementById('q2-other').value.trim();
  const q2Freq = document.querySelector('input[name="q2freq"]:checked');
  if ((q2Devices.length > 0 || q2Other) && q2Freq) answered++;

  // Q3: At least one classroom use checked
  if (document.querySelectorAll('input[name="q3use"]:checked').length > 0) answered++;

  // Q4: At least one platform checked or other typed
  const q4Plats = document.querySelectorAll('input[name="q4plat"]:checked');
  const q4Other = document.getElementById('q4-other').value.trim();
  if (q4Plats.length > 0 || q4Other) answered++;

  // Q5: Differentiation rating selected (slider always has a value, so just check radio)
  if (document.querySelector('input[name="q5diff"]:checked')) answered++;

  // Q6: At least one challenge checked or other typed
  const q6Chals = document.querySelectorAll('input[name="q6chal"]:checked');
  const q6Other = document.getElementById('q6-other').value.trim();
  if (q6Chals.length > 0 || q6Other) answered++;

  // Q7: At least one PD need checked or other typed
  const q7PDs = document.querySelectorAll('input[name="q7pd"]:checked');
  const q7Other = document.getElementById('q7-other').value.trim();
  if (q7PDs.length > 0 || q7Other) answered++;

  // Q8: Device preference selected + recommendation text
  const q8Dev = document.querySelector('input[name="q8dev"]:checked');
  const q8Rec = document.getElementById('q8-recommendation').value.trim();
  if (q8Dev && q8Rec) answered++;

  return answered;
}

function updateProgress() {
  const count = getAnsweredCount();
  const pct = Math.round((count / TOTAL_QUESTIONS) * 100);

  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';

  const text = document.getElementById('progressText');
  if (text) text.textContent = `${count} of ${TOTAL_QUESTIONS} answered`;

  const btn = document.getElementById('submitBtn');
  if (btn) btn.disabled = count < TOTAL_QUESTIONS;

  // Mark cards as completed
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    const card = document.getElementById(`q${i}-card`);
    if (!card) continue;
    let isComplete = false;

    switch (i) {
      case 1:
        isComplete = !!document.getElementById('q1-grade').value && !!document.getElementById('q1-role').value;
        break;
      case 2: {
        const devs = document.querySelectorAll('input[name="q2dev"]:checked').length > 0 ||
          document.getElementById('q2-other').value.trim().length > 0;
        const freq = !!document.querySelector('input[name="q2freq"]:checked');
        isComplete = devs && freq;
        break;
      }
      case 3:
        isComplete = document.querySelectorAll('input[name="q3use"]:checked').length > 0;
        break;
      case 4:
        isComplete = document.querySelectorAll('input[name="q4plat"]:checked').length > 0 ||
          document.getElementById('q4-other').value.trim().length > 0;
        break;
      case 5:
        isComplete = !!document.querySelector('input[name="q5diff"]:checked');
        break;
      case 6:
        isComplete = document.querySelectorAll('input[name="q6chal"]:checked').length > 0 ||
          document.getElementById('q6-other').value.trim().length > 0;
        break;
      case 7:
        isComplete = document.querySelectorAll('input[name="q7pd"]:checked').length > 0 ||
          document.getElementById('q7-other').value.trim().length > 0;
        break;
      case 8: {
        const dev = !!document.querySelector('input[name="q8dev"]:checked');
        const rec = document.getElementById('q8-recommendation').value.trim().length > 0;
        isComplete = dev && rec;
        break;
      }
    }

    card.classList.toggle('completed', isComplete);
  }
}

/* Style option items on selection */
function styleOptionItems() {
  document.querySelectorAll('.option-item').forEach(label => {
    const input = label.querySelector('input');
    if (!input) return;

    input.addEventListener('change', () => {
      if (input.type === 'radio') {
        const name = input.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
          r.closest('.option-item')?.classList.remove('selected');
        });
      }
      label.classList.toggle('selected', input.checked);
      updateProgress();
    });
  });
}


/* ============================================================
   SECTION 4 — SLIDER SYNC
   ============================================================ */

function initSlider() {
  const slider = document.getElementById('q5-slider');
  const val = document.getElementById('q5-val');
  if (!slider || !val) return;

  slider.addEventListener('input', () => {
    val.textContent = slider.value;
  });
}


/* ============================================================
   SECTION 5 — COLLECT FORM DATA
   ============================================================ */

function collectFormData() {
  // Q1 — Demographics
  const gradeBand = document.getElementById('q1-grade').value;
  const role = document.getElementById('q1-role').value;

  // Q2 — Devices + Frequency
  const devices = [];
  document.querySelectorAll('input[name="q2dev"]:checked').forEach(cb => devices.push(cb.value));
  const q2Other = document.getElementById('q2-other').value.trim();
  if (q2Other) devices.push(q2Other);
  const freqEl = document.querySelector('input[name="q2freq"]:checked');
  const frequency = freqEl ? freqEl.value : '';

  // Q3 — Classroom Uses
  const classroomUses = [];
  document.querySelectorAll('input[name="q3use"]:checked').forEach(cb => classroomUses.push(cb.value));

  // Q4 — Digital Platforms
  const platforms = [];
  document.querySelectorAll('input[name="q4plat"]:checked').forEach(cb => platforms.push(cb.value));
  const q4Other = document.getElementById('q4-other').value.trim();
  if (q4Other) platforms.push(q4Other);

  // Q5 — Effectiveness Ratings
  const diffEl = document.querySelector('input[name="q5diff"]:checked');
  const differentiationRating = diffEl ? diffEl.value : '';
  const effectivenessRating = document.getElementById('q5-slider').value;

  // Q6 — Challenges
  const challenges = [];
  document.querySelectorAll('input[name="q6chal"]:checked').forEach(cb => challenges.push(cb.value));
  const q6Other = document.getElementById('q6-other').value.trim();
  if (q6Other) challenges.push(q6Other);

  // Q7 — PD Needs
  const pdNeeds = [];
  document.querySelectorAll('input[name="q7pd"]:checked').forEach(cb => pdNeeds.push(cb.value));
  const q7Other = document.getElementById('q7-other').value.trim();
  if (q7Other) pdNeeds.push(q7Other);

  // Q8 — Device Preference + Recommendation
  const devPrefEl = document.querySelector('input[name="q8dev"]:checked');
  const devicePreference = devPrefEl ? devPrefEl.value : '';
  const recommendation = document.getElementById('q8-recommendation').value.trim();

  return {
    submission_id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    timestamp: new Date().toISOString(),
    grade_band: gradeBand,
    role: role,
    current_devices: devices.join('; '),
    usage_frequency: frequency,
    classroom_uses: classroomUses.join('; '),
    digital_platforms: platforms.join('; '),
    differentiation_rating: differentiationRating,
    effectiveness_rating: effectivenessRating,
    challenges: challenges.join('; '),
    pd_needs: pdNeeds.join('; '),
    device_preference: devicePreference,
    recommendation: recommendation
  };
}


/* ============================================================
   SECTION 6 — GOOGLE APPS SCRIPT SUBMISSION (GET-based)
   ============================================================ */

// ──────────────────────────────────────────────────────────
// ⬇ PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ⬇
// ──────────────────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbya14p6H1IGM2alwKuP9XpbPJNpyKPOI9d7K7kshncj2-eoOHyFDaxSNsM0xSUxPdnp/exec';
// ──────────────────────────────────────────────────────────

/**
 * Build GET URL with data encoded as query parameters.
 */
function buildSubmitURL(data) {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.set(key, typeof value === 'object' ? JSON.stringify(value) : value);
  });
  return APPS_SCRIPT_URL + '?' + params.toString();
}

/**
 * Strategy A: Hidden iframe (PRIMARY — most reliable for Apps Script)
 * Iframes natively follow 302 redirects without any CORS restrictions.
 */
function submitViaIframe(data) {
  return new Promise((resolve) => {
    const url = buildSubmitURL(data);
    const iframe = document.createElement('iframe');
    iframe.name = 'survey-submit-' + Date.now();
    iframe.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(iframe);

    let resolved = false;
    function done(success) {
      if (resolved) return;
      resolved = true;
      console.log('[Survey] iframe submission ' + (success ? 'completed' : 'timed out (may still succeed)'));
      setTimeout(() => { if (iframe.parentNode) iframe.remove(); }, 3000);
      resolve(true);
    }

    iframe.addEventListener('load', () => done(true));
    iframe.addEventListener('error', () => done(false));

    // Timeout safety net — resolve after 8s regardless
    setTimeout(() => done(false), 8000);

    iframe.src = url;
  });
}

/**
 * Strategy B: Hidden <img> beacon (SECONDARY insurance)
 * Fires simultaneously with iframe for double-coverage.
 */
function submitViaImageBeacon(data) {
  return new Promise((resolve) => {
    const url = buildSubmitURL(data);
    const img = new Image();
    img.style.display = 'none';
    img.onload = () => { cleanup(); resolve(true); };
    img.onerror = () => { cleanup(); resolve(true); };
    img.src = url;
    document.body.appendChild(img);

    function cleanup() {
      setTimeout(() => { if (img.parentNode) img.remove(); }, 1000);
    }

    setTimeout(() => { cleanup(); resolve(true); }, 5000);
  });
}

/**
 * Strategy C: fetch GET (TERTIARY — may not work on all browsers)
 * mode: 'no-cors' can silently fail on 302 redirect chains.
 */
async function submitViaFetchGet(data) {
  try {
    const url = buildSubmitURL(data);
    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      redirect: 'follow'
    });
    console.log('[Survey] fetch GET fired (opaque response — cannot confirm delivery)');
    return true;
  } catch (err) {
    console.warn('[Survey] fetch GET failed:', err.message);
    return false;
  }
}


/* ============================================================
   SECTION 7 — VALIDATION ENGINE
   ============================================================ */

const RELEVANCE_KEYWORDS = [
  'tech', 'device', 'computer', 'laptop', 'chromebook', 'ipad', 'tablet',
  'phone', 'screen', 'display', 'monitor', 'projector', 'whiteboard',
  'smart', 'board', 'camera', 'webcam', 'headphone', 'speaker', 'mic',
  'wifi', 'wi-fi', 'internet', 'network', 'bandwidth', 'broadband', 'fiber',
  'software', 'app', 'platform', 'lms', 'google', 'canvas', 'classroom',
  'digital', 'online', 'virtual', 'remote', 'hybrid', 'coding', 'robot',
  'printer', '3d', 'vr', 'ar', 'ai', 'streaming', 'video', 'audio',
  'cloud', 'server', 'data', 'storage', 'charging', 'battery', 'power',
  'outlet', 'cable', 'usb', 'wireless', 'bluetooth', 'infrastructure',
  'student', 'teacher', 'classroom', 'school', 'learning', 'teaching',
  'instruction', 'lesson', 'curriculum', 'assessment', 'grade', 'test',
  'training', 'pd', 'professional development', 'coach', 'support',
  'budget', 'funding', 'grant', 'policy', 'district', 'admin',
  'principal', 'parent', 'accessibility', 'inclusion', 'equity',
  'stem', 'math', 'science', 'reading', 'writing', 'literacy',
  'engagement', 'differentiation', 'personalized', 'adaptive',
  'collaboration', 'group', 'station', 'rotation', 'makerspace',
  'lab', 'library', 'media', 'resource', 'textbook', 'ebook',
  'homework', 'assignment', 'quiz', 'rubric', 'feedback',
  'blended', 'flipped', 'gamification', 'interactive', 'simulation',
  'filter', 'content', 'security', 'privacy', 'ferpa', 'coppa',
  'license', 'subscription', 'ratio', 'cart', 'checkout', 'loaner',
  'repair', 'maintenance', 'upgrade', 'refresh', 'deploy', 'mdm',
  'sso', 'single sign', 'troubleshoot', 'it', 'help desk',
  'set', 'setup', 'reliable', 'fast', 'slow', 'outdated', 'modern',
  'every', 'all', 'need', 'want', 'improve', 'better', 'more',
  'dedicated', 'full-time', 'on-site', 'integration', 'framework',
  'samr', 'tpack', 'iste', 'citizenship', 'digital divide',
  'hotspot', 'home', 'access', 'connect', 'program', 'initiative'
];

function isGibberish(text) {
  const cleaned = text.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  if (!cleaned) return true;
  const words = cleaned.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return true;
  const repeatedCharPattern = /(.)(\\1{3,})/;
  if (repeatedCharPattern.test(cleaned)) return true;
  const keyboardPatterns = ['asdf', 'qwer', 'zxcv', 'hjkl', 'uiop', 'fghj', 'bnm', 'jjj', 'kkk', 'fff', 'ddd', 'sss', 'aaa'];
  const lowerText = cleaned.replace(/\s/g, '');
  for (const pat of keyboardPatterns) {
    if (lowerText.includes(pat) && lowerText.length < 15) return true;
  }
  const vowels = cleaned.replace(/[^aeiou]/g, '').length;
  const letters = cleaned.replace(/[^a-z]/g, '').length;
  if (letters > 5) {
    const vowelRatio = vowels / letters;
    if (vowelRatio < 0.12 || vowelRatio > 0.85) return true;
  }
  return false;
}

function checkRelevance(text) {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  let hits = 0;
  for (const kw of RELEVANCE_KEYWORDS) {
    if (lower.includes(kw)) hits++;
  }
  const score = Math.min(1, hits / Math.max(1, Math.ceil(words.length / 4)));
  return { relevant: hits >= 1, score };
}

function showCardError(cardId, message) {
  const card = document.getElementById(cardId);
  if (!card) return;
  clearCardError(cardId);
  const errorEl = document.createElement('div');
  errorEl.className = 'validation-error';
  errorEl.innerHTML = `<span class="val-icon">⚠</span> ${message}`;
  card.appendChild(errorEl);
  card.classList.add('has-error');
  requestAnimationFrame(() => errorEl.classList.add('visible'));
}

function clearCardError(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const existing = card.querySelector('.validation-error');
  if (existing) existing.remove();
  card.classList.remove('has-error');
}

function validateForm() {
  const errors = [];
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) clearCardError(`q${i}-card`);

  // Q1: Both dropdowns required
  if (!document.getElementById('q1-grade').value || !document.getElementById('q1-role').value) {
    showCardError('q1-card', 'Please select both your grade band and role.');
    errors.push('q1');
  }

  // Q2: At least one device + frequency
  const q2Devs = document.querySelectorAll('input[name="q2dev"]:checked');
  const q2Other = document.getElementById('q2-other').value.trim();
  const q2Freq = document.querySelector('input[name="q2freq"]:checked');
  if (q2Devs.length === 0 && !q2Other) {
    showCardError('q2-card', 'Please select at least one device or type one in the Other field.');
    errors.push('q2');
  } else if (!q2Freq) {
    showCardError('q2-card', 'Please select how frequently students use devices.');
    errors.push('q2');
  }

  // Q3: At least one use
  if (document.querySelectorAll('input[name="q3use"]:checked').length === 0) {
    showCardError('q3-card', 'Please select at least one way students use devices.');
    errors.push('q3');
  }

  // Q4: At least one platform
  const q4Plats = document.querySelectorAll('input[name="q4plat"]:checked');
  const q4Other = document.getElementById('q4-other').value.trim();
  if (q4Plats.length === 0 && !q4Other) {
    showCardError('q4-card', 'Please select at least one platform or type one in the Other field.');
    errors.push('q4');
  }

  // Q5: Differentiation rating required
  if (!document.querySelector('input[name="q5diff"]:checked')) {
    showCardError('q5-card', 'Please rate how well devices support differentiated instruction.');
    errors.push('q5');
  }

  // Q6: At least one challenge
  const q6Chals = document.querySelectorAll('input[name="q6chal"]:checked');
  const q6Other = document.getElementById('q6-other').value.trim();
  if (q6Chals.length === 0 && !q6Other) {
    showCardError('q6-card', 'Please select at least one challenge or type your own.');
    errors.push('q6');
  }

  // Q7: At least one PD need
  const q7PDs = document.querySelectorAll('input[name="q7pd"]:checked');
  const q7Other = document.getElementById('q7-other').value.trim();
  if (q7PDs.length === 0 && !q7Other) {
    showCardError('q7-card', 'Please select at least one professional development need.');
    errors.push('q7');
  }

  // Q8: Device preference + meaningful recommendation
  const q8Dev = document.querySelector('input[name="q8dev"]:checked');
  const q8Rec = document.getElementById('q8-recommendation').value.trim();
  if (!q8Dev) {
    showCardError('q8-card', 'Please select your preferred device type.');
    errors.push('q8');
  } else if (!q8Rec) {
    showCardError('q8-card', 'Please describe your top recommendation for improving technology integration.');
    errors.push('q8');
  } else if (q8Rec.length < 15) {
    showCardError('q8-card', 'Your recommendation is too brief. Please write at least a short sentence (15+ characters).');
    errors.push('q8');
  } else if (isGibberish(q8Rec)) {
    showCardError('q8-card', 'This doesn\'t appear to be a meaningful response. Please describe a real recommendation.');
    errors.push('q8');
  } else {
    const rel = checkRelevance(q8Rec);
    if (!rel.relevant) {
      showCardError('q8-card', 'Your response doesn\'t seem related to technology or education. Please suggest a relevant improvement.');
      errors.push('q8');
    }
  }

  return { valid: errors.length === 0, errors };
}


/* ============================================================
   SECTION 8 — SUBMIT HANDLER + CONFETTI
   ============================================================ */

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast visible' + (type ? ` toast-${type}` : '');
  setTimeout(() => toast.classList.remove('visible'), 4500);
}

async function handleSubmit() {
  const btn = document.getElementById('submitBtn');

  const validation = validateForm();
  if (!validation.valid) {
    showToast(`Please fix ${validation.errors.length} issue${validation.errors.length > 1 ? 's' : ''} before submitting.`, 'error');
    const firstErrorCard = document.querySelector('.q-card.has-error');
    if (firstErrorCard) {
      firstErrorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorCard.classList.add('shake');
      setTimeout(() => firstErrorCard.classList.remove('shake'), 600);
    }
    return;
  }

  const data = collectFormData();

  btn.disabled = true;
  btn.textContent = 'Submitting…';

  // Use iframe (most reliable for Apps Script redirects), fall back sequentially
  try {
    await submitViaIframe(data);
  } catch (err) {
    console.warn('[Survey] iframe failed, trying image beacon', err);
    try {
      await submitViaImageBeacon(data);
    } catch (err2) {
      console.warn('[Survey] image beacon failed, trying fetch', err2);
      await submitViaFetchGet(data);
    }
  }

  // Show success
  setTimeout(() => {
    btn.textContent = '✓ Submitted!';
    btn.classList.add('success');
    showToast('Thank you! Your response has been recorded.', 'success');
    document.getElementById('successOverlay').classList.add('visible');
    fireConfetti();
    setTimeout(() => resetForm(), 1500);
  }, 600);
}

function resetForm() {
  // Uncheck all checkboxes and radios
  document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
    input.checked = false;
    input.closest('.option-item')?.classList.remove('selected');
  });

  // Clear text inputs and textareas
  document.querySelectorAll('#q2-other, #q4-other, #q6-other, #q7-other, #q8-recommendation').forEach(el => {
    el.value = '';
  });

  // Reset dropdowns
  const grade = document.getElementById('q1-grade');
  if (grade) grade.selectedIndex = 0;
  const role = document.getElementById('q1-role');
  if (role) role.selectedIndex = 0;

  // Reset slider
  const slider = document.getElementById('q5-slider');
  if (slider) {
    slider.value = 5;
    document.getElementById('q5-val').textContent = '5';
  }

  // Reset submit button
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submit Survey';
  btn.classList.remove('success');
  btn.disabled = true;

  // Reset card completion states
  document.querySelectorAll('.q-card').forEach(card => {
    card.classList.remove('completed');
  });

  updateProgress();
  console.log('[Survey] Form reset for new submission.');
}


/* ============================================================
   CONFETTI ANIMATION
   ============================================================ */

function fireConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];
  const count = 150;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 60,
      w: 4 + Math.random() * 4,
      h: 6 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });
  }

  let frame = 0;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.rotSpeed;
      if (frame > 100) p.opacity -= 0.015;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (frame < 180) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  tick();
}


/* ============================================================
   SECTION 9 — INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAutoComplete();
  initSlider();
  styleOptionItems();

  // Listen for all input changes to update progress
  document.addEventListener('input', updateProgress);
  document.addEventListener('change', updateProgress);

  // Real-time validation: clear errors when user interacts
  document.getElementById('q1-grade')?.addEventListener('change', () => clearCardError('q1-card'));
  document.getElementById('q1-role')?.addEventListener('change', () => clearCardError('q1-card'));

  document.querySelectorAll('input[name="q2dev"]').forEach(cb => {
    cb.addEventListener('change', () => clearCardError('q2-card'));
  });
  document.getElementById('q2-other')?.addEventListener('input', () => clearCardError('q2-card'));
  document.querySelectorAll('input[name="q2freq"]').forEach(rb => {
    rb.addEventListener('change', () => clearCardError('q2-card'));
  });

  document.querySelectorAll('input[name="q3use"]').forEach(cb => {
    cb.addEventListener('change', () => clearCardError('q3-card'));
  });

  document.querySelectorAll('input[name="q4plat"]').forEach(cb => {
    cb.addEventListener('change', () => clearCardError('q4-card'));
  });
  document.getElementById('q4-other')?.addEventListener('input', () => clearCardError('q4-card'));

  document.querySelectorAll('input[name="q5diff"]').forEach(rb => {
    rb.addEventListener('change', () => clearCardError('q5-card'));
  });

  document.querySelectorAll('input[name="q6chal"]').forEach(cb => {
    cb.addEventListener('change', () => clearCardError('q6-card'));
  });
  document.getElementById('q6-other')?.addEventListener('input', () => clearCardError('q6-card'));

  document.querySelectorAll('input[name="q7pd"]').forEach(cb => {
    cb.addEventListener('change', () => clearCardError('q7-card'));
  });
  document.getElementById('q7-other')?.addEventListener('input', () => clearCardError('q7-card'));

  document.querySelectorAll('input[name="q8dev"]').forEach(rb => {
    rb.addEventListener('change', () => clearCardError('q8-card'));
  });
  document.getElementById('q8-recommendation')?.addEventListener('input', () => clearCardError('q8-card'));

  updateProgress();

  document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    handleSubmit();
  });

  document.getElementById('successOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.target.classList.remove('visible');
    }
  });

  console.log('[Survey] EdTech Capstone Survey loaded (8-question version). Auto-complete + validation active.');
});
