import sys, json, os
sys.stdout.reconfigure(encoding='utf-8')

with open('image_data.json','r',encoding='utf-8') as f:
    IMG = json.load(f)

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lesson 8-2: Draw Geometric Figures | Envision Math 7</title>
<meta name="description" content="Interactive lesson on drawing geometric figures with given conditions using rulers, protractors, and technology.">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--blue:#0066FF;--orange:#FF6B00;--green:#00B853;--purple:#7C3AED;--red:#EF4444;--bg:#F8FAFC;--card:#FFFFFF;--text:#1E293B;--muted:#64748B;--border:#E2E8F0;--shadow:0 4px 24px rgba(0,0,0,0.08)}}
body{{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);overflow:hidden;height:100vh}}
.progress-bar{{position:fixed;top:0;left:0;height:5px;background:linear-gradient(90deg,var(--blue),var(--purple));z-index:1000;transition:width .4s ease}}
.slide-counter{{position:fixed;top:12px;right:24px;font-size:14px;font-weight:700;color:var(--muted);z-index:1000;background:rgba(255,255,255,.9);padding:4px 14px;border-radius:20px;backdrop-filter:blur(8px);box-shadow:0 2px 8px rgba(0,0,0,.06)}}
nav{{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);display:flex;gap:12px;z-index:1000}}
nav button{{padding:12px 32px;border:none;border-radius:12px;font-family:'Inter',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:all .2s ease;box-shadow:0 4px 12px rgba(0,0,0,.1)}}
nav button:hover{{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.15)}}
#prevBtn{{background:#fff;color:var(--blue);border:2px solid var(--blue)}}
#nextBtn{{background:var(--blue);color:#fff}}
.slide{{position:absolute;top:0;left:0;width:100%;height:100%;padding:32px 48px 90px;overflow-y:auto;opacity:0;pointer-events:none;transition:opacity .4s ease,transform .4s ease;transform:translateX(60px)}}
.slide.active{{opacity:1;pointer-events:all;transform:translateX(0)}}
.slide.exit{{opacity:0;transform:translateX(-60px)}}
.bloom-tag{{display:inline-block;padding:6px 16px;border-radius:8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}}
.bloom-remember{{background:#DBEAFE;color:#1D4ED8}}
.bloom-understand{{background:#D1FAE5;color:#047857}}
.bloom-apply{{background:#FEF3C7;color:#B45309}}
.bloom-analyze{{background:#EDE9FE;color:#6D28D9}}
.bloom-evaluate{{background:#FCE7F3;color:#BE185D}}
.bloom-create{{background:#FFEDD5;color:#C2410C}}
h1{{font-size:clamp(28px,4vw,48px);font-weight:900;line-height:1.15;margin-bottom:16px}}
h2{{font-size:clamp(22px,3vw,36px);font-weight:800;margin-bottom:12px}}
h3{{font-size:clamp(18px,2.2vw,26px);font-weight:700;margin-bottom:10px}}
p,.desc{{font-size:clamp(16px,1.8vw,22px);line-height:1.6;color:var(--muted);margin-bottom:12px}}
.card{{background:var(--card);border-radius:16px;padding:24px;box-shadow:var(--shadow);margin-bottom:16px}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}}
.grid3{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}}
@media(max-width:900px){{.grid2,.grid3{{grid-template-columns:1fr}}}}
.guiding-box{{background:linear-gradient(135deg,#EEF2FF,#E0E7FF);border-left:5px solid var(--blue);border-radius:0 12px 12px 0;padding:20px 24px;margin:16px 0}}
.guiding-box h3{{color:var(--blue);font-size:18px;margin-bottom:6px}}
.guiding-box p{{color:#3730A3;font-size:17px;margin:0}}
.vocab-card{{text-align:center;padding:20px;border-radius:14px;border:2px solid var(--border);transition:transform .2s,box-shadow .2s}}
.vocab-card:hover{{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.1)}}
.vocab-card .icon{{font-size:40px;margin-bottom:8px}}
.vocab-card h3{{font-size:18px;margin-bottom:6px}}
.vocab-card p{{font-size:15px;color:var(--muted);margin:0}}
.quiz-grid{{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:16px 0}}
.quiz-opt{{padding:16px 20px;border-radius:12px;border:3px solid var(--border);font-size:clamp(15px,1.6vw,20px);font-weight:600;cursor:pointer;transition:all .2s;background:#fff;text-align:center}}
.quiz-opt:hover{{border-color:var(--blue);background:#EEF2FF}}
.quiz-opt.correct{{border-color:var(--green);background:#D1FAE5;color:#047857}}
.quiz-opt.wrong{{border-color:var(--red);background:#FEE2E2;color:#B91C1C}}
.quiz-opt.disabled{{pointer-events:none}}
.img-frame{{border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08);margin:12px 0}}
.img-frame img{{width:100%;height:auto;display:block}}
.step-row{{display:flex;gap:16px;align-items:flex-start;margin:10px 0}}
.step-num{{min-width:36px;height:36px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;flex-shrink:0;margin-top:2px}}
.step-content{{flex:1}}
.step-content p{{font-size:17px;margin:0}}
.ai-input-area{{display:flex;gap:12px;margin:16px 0}}
.ai-input-area input{{flex:1;padding:14px 20px;border-radius:12px;border:2px solid var(--border);font-size:17px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s}}
.ai-input-area input:focus{{border-color:var(--blue)}}
.ai-input-area button{{padding:14px 28px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--blue),var(--purple));color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap;transition:transform .2s}}
.ai-input-area button:hover{{transform:scale(1.03)}}
.ai-response{{background:#F0F4FF;border-radius:14px;padding:20px;margin-top:12px;min-height:80px;font-size:17px;line-height:1.6;white-space:pre-wrap;border:2px solid #C7D2FE}}
.ai-response.loading{{color:var(--muted);font-style:italic}}
.hero-img{{max-height:220px;border-radius:16px;object-fit:cover;width:100%}}
.textbook-img{{max-height:300px;width:auto;max-width:100%}}
.practice-grid{{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px}}
.practice-card{{background:#fff;border-radius:14px;padding:20px;border:2px solid var(--border)}}
.practice-card h4{{font-size:16px;font-weight:700;color:var(--blue);margin-bottom:8px}}
.practice-card p{{font-size:15px;margin:0;line-height:1.5}}
.key-concept-box{{background:linear-gradient(135deg,#FEF3C7,#FDE68A);border-radius:16px;padding:24px;border:2px solid #F59E0B;margin:16px 0}}
.key-concept-box h3{{color:#92400E;margin-bottom:8px}}
.key-concept-box p{{color:#78350F;font-size:17px;margin:0;line-height:1.6}}
.task-card{{background:linear-gradient(135deg,#ECFDF5,#D1FAE5);border-radius:14px;padding:20px;border:2px solid var(--green);margin:12px 0}}
.task-card h4{{color:#047857;margin-bottom:8px}}
.animate-in{{animation:fadeUp .5s ease both}}
@keyframes fadeUp{{from{{opacity:0;transform:translateY(20px)}}to{{opacity:1;transform:translateY(0)}}}}
.delay1{{animation-delay:.1s}}.delay2{{animation-delay:.2s}}.delay3{{animation-delay:.3s}}.delay4{{animation-delay:.4s}}
.tag{{display:inline-block;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:700;margin-right:6px}}
.tag-blue{{background:#DBEAFE;color:#1D4ED8}}.tag-orange{{background:#FFEDD5;color:#C2410C}}.tag-green{{background:#D1FAE5;color:#047857}}
.sub-slide{{display:none}}.sub-slide.active{{display:block}}
.q-nav{{display:flex;gap:8px;margin:12px 0}}
.q-dot{{width:36px;height:36px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s}}
.q-dot.active{{background:var(--blue);color:#fff;border-color:var(--blue)}}
.q-dot.done{{background:var(--green);color:#fff;border-color:var(--green)}}
.hw-list{{list-style:none;padding:0}}
.hw-list li{{padding:12px 16px;background:#fff;border-radius:10px;margin-bottom:8px;font-size:17px;border-left:4px solid var(--blue);box-shadow:0 2px 8px rgba(0,0,0,.04)}}
.hw-list li span{{font-weight:700;color:var(--blue)}}
.reveal-btn{{padding:10px 24px;border-radius:10px;border:2px solid var(--green);background:#fff;color:var(--green);font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;font-size:15px;transition:all .2s}}
.reveal-btn:hover{{background:var(--green);color:#fff}}
.hidden{{display:none}}
.answer-reveal{{background:#D1FAE5;border-radius:10px;padding:14px 18px;margin-top:10px;font-weight:600;color:#047857;font-size:17px}}
</style>
</head>
<body>
<div class="progress-bar" id="progressBar"></div>
<div class="slide-counter" id="slideCounter">1 / 12</div>

<!-- ==================== SLIDE 1: TITLE ==================== -->
<div class="slide active" id="slide1">
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center">
<span class="bloom-tag bloom-remember animate-in">Remember &amp; Understand</span>
<h1 class="animate-in delay1" style="background:linear-gradient(135deg,var(--blue),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px">Lesson 8-2: Draw Geometric Figures</h1>
<p class="animate-in delay2" style="font-size:clamp(16px,2vw,24px);max-width:700px">Envision Math 7 &bull; Volume 1 &bull; Topic 8 &bull; Pages 421&ndash;426</p>
<img src="{IMG['hero_shapes']}" class="hero-img animate-in delay3" alt="Geometric shapes" style="max-width:500px;margin:20px auto">
<div class="animate-in delay4" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:12px">
<span class="tag tag-blue">Quadrilaterals</span><span class="tag tag-orange">Scale Drawings</span><span class="tag tag-green">Ruler &amp; Protractor</span>
</div>
</div>
</div>

<!-- ==================== SLIDE 2: WARM-UP INTRO ==================== -->
<div class="slide" id="slide2">
<span class="bloom-tag bloom-remember">Remember</span>
<h1>&#127922; Warm-Up: Guess the Shape!</h1>
<p>Read each clue, then click the correct shape. Let&rsquo;s see how well you know your quadrilaterals!</p>
<div id="quizContainer">
<div class="sub-slide active" data-q="1">
<div class="card" style="border-top:4px solid var(--blue)">
<h3>Question 1</h3>
<p style="font-size:19px;color:var(--text);font-weight:600">A quadrilateral has <strong>four right angles</strong>, and its adjacent sides are <strong>not the same length</strong>. What shape could it be?</p>
<div class="quiz-grid">
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">A. Square</div>
<div class="quiz-opt" data-answer="correct" onclick="checkQuiz(this)">B. Rectangle</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">C. Parallelogram</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">D. Rhombus</div>
</div>
</div>
</div>
<div class="sub-slide" data-q="2">
<div class="card" style="border-top:4px solid var(--orange)">
<h3>Question 2</h3>
<p style="font-size:19px;color:var(--text);font-weight:600">A quadrilateral has <strong>exactly one pair of parallel sides</strong>. What shape could it be?</p>
<div class="quiz-grid">
<div class="quiz-opt" data-answer="correct" onclick="checkQuiz(this)">A. Trapezoid</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">B. Rhombus</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">C. Parallelogram</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">D. Rectangle</div>
</div>
</div>
</div>
<div class="sub-slide" data-q="3">
<div class="card" style="border-top:4px solid var(--green)">
<h3>Question 3</h3>
<p style="font-size:19px;color:var(--text);font-weight:600">A shape has <strong>all sides equal</strong>, but its angles are <strong>NOT 90&deg;</strong>. What shape fits this description?</p>
<div class="quiz-grid">
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">A. Rectangle</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">B. Square</div>
<div class="quiz-opt" data-answer="correct" onclick="checkQuiz(this)">C. Rhombus</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">D. Parallelogram</div>
</div>
</div>
</div>
<div class="sub-slide" data-q="4">
<div class="card" style="border-top:4px solid var(--purple)">
<h3>Question 4</h3>
<p style="font-size:19px;color:var(--text);font-weight:600">A quadrilateral has <strong>two pairs of opposite sides parallel</strong>, and <strong>opposite angles are equal</strong>, but the sides are <strong>NOT all equal</strong>. Which shape?</p>
<div class="quiz-grid">
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">A. Trapezoid</div>
<div class="quiz-opt" data-answer="correct" onclick="checkQuiz(this)">B. Parallelogram</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">C. Square</div>
<div class="quiz-opt" data-answer="wrong" onclick="checkQuiz(this)">D. Rhombus</div>
</div>
</div>
</div>
</div>
<div class="q-nav" id="qNav">
<div class="q-dot active" onclick="goToQ(1)">1</div>
<div class="q-dot" onclick="goToQ(2)">2</div>
<div class="q-dot" onclick="goToQ(3)">3</div>
<div class="q-dot" onclick="goToQ(4)">4</div>
</div>
</div>

<!-- ==================== SLIDE 3: VOCABULARY ==================== -->
<div class="slide" id="slide3">
<span class="bloom-tag bloom-understand">Understand</span>
<h1>&#128218; Vocabulary</h1>
<p>Master these key terms before we dive into problems.</p>
<div class="grid2" style="grid-template-columns:1fr 1fr;margin-top:16px">
<div class="vocab-card animate-in" style="border-color:#DBEAFE">
<div class="icon">&#10010;</div>
<h3 style="color:var(--blue)">Perpendicular</h3>
<p>Lines that meet at a <strong>90&deg; angle</strong>.</p>
<svg width="80" height="80" viewBox="0 0 80 80" style="margin-top:8px"><line x1="10" y1="60" x2="70" y2="60" stroke="#0066FF" stroke-width="3"/><line x1="40" y1="20" x2="40" y2="60" stroke="#0066FF" stroke-width="3"/><rect x="40" y="48" width="12" height="12" fill="none" stroke="#0066FF" stroke-width="2"/></svg>
</div>
<div class="vocab-card animate-in delay1" style="border-color:#D1FAE5">
<div class="icon">&#9552;</div>
<h3 style="color:var(--green)">Parallel</h3>
<p>Lines that will <strong>never meet</strong>.</p>
<svg width="80" height="60" viewBox="0 0 80 60" style="margin-top:8px"><line x1="10" y1="20" x2="70" y2="20" stroke="#00B853" stroke-width="3"/><line x1="10" y1="40" x2="70" y2="40" stroke="#00B853" stroke-width="3"/><text x="72" y="24" font-size="10" fill="#00B853">&#8594;</text><text x="72" y="44" font-size="10" fill="#00B853">&#8594;</text></svg>
</div>
<div class="vocab-card animate-in delay2" style="border-color:#FFEDD5">
<div class="icon">&#9997;</div>
<h3 style="color:var(--orange)">Sketch</h3>
<p>A simple, quickly-made drawing <strong>without many details</strong>.</p>
</div>
<div class="vocab-card animate-in delay3" style="border-color:#EDE9FE">
<div class="icon">&#9001;&#9002;</div>
<h3 style="color:var(--purple)">Non-Adjacent Angles</h3>
<p>Angles that do <strong>not share</strong> a common vertex and/or a common side.</p>
</div>
</div>
</div>

<!-- ==================== SLIDE 4: EXAMPLE 1 INTRO ==================== -->
<div class="slide" id="slide4">
<span class="bloom-tag bloom-apply">Apply</span>
<h1>&#127981; Example 1: The Patio Project</h1>
<div class="grid2">
<div>
<div class="card">
<p style="font-size:18px;color:var(--text);line-height:1.7">The school&rsquo;s landscaping club is designing a <strong>4-sided patio</strong> and garden. The patio has:</p>
<ul style="font-size:17px;line-height:2;padding-left:20px;color:var(--text)">
<li><strong>2 perpendicular sides</strong> each measuring <strong>4 yards</strong></li>
<li>A third side <strong>perpendicular</strong> to one of the equal sides but <strong>twice as long (8 yards)</strong></li>
<li>One angle measures <strong>135&deg;</strong></li>
</ul>
<p style="margin-top:12px"><span class="tag tag-blue">Scale: 1 cm = 1 yd</span></p>
</div>
<div class="guiding-box">
<h3>&#128161; Guiding Questions</h3>
<p>&bull; Which tools do we need to draw this accurately?<br>&bull; How does the 135&deg; angle connect the shape?<br>&bull; What does the final shape look like?</p>
</div>
</div>
<div>
<img src="{IMG['patio_hero']}" style="width:100%;border-radius:14px;box-shadow:var(--shadow)" alt="Patio project">
</div>
</div>
</div>

<!-- ==================== SLIDE 5: EXAMPLE 1 SOLUTION ==================== -->
<div class="slide" id="slide5">
<span class="bloom-tag bloom-apply">Apply</span>
<h2>&#128208; Patio Project &mdash; Step-by-Step Solution</h2>
<div class="grid2">
<div>
<div class="step-row animate-in">
<div class="step-num">1</div>
<div class="step-content">
<h3>Draw 3 sides using a ruler</h3>
<p>Draw the sides that meet the given conditions: two perpendicular 4-yard sides and one 8-yard side.</p>
</div>
</div>
<div class="img-frame animate-in delay1"><img src="{IMG['patio_step1']}" alt="Step 1 diagram" class="textbook-img"></div>
<div class="img-frame animate-in delay1"><img src="{IMG['patio_step2']}" alt="Step 1 labels" class="textbook-img"></div>
<div class="step-row animate-in delay2">
<div class="step-num">2</div>
<div class="step-content">
<h3>Use a protractor for the 135&deg; angle</h3>
<p>Draw a 135&deg; angle that connects and completes the shape.</p>
</div>
</div>
<div class="img-frame animate-in delay3"><img src="{IMG['patio_step3']}" alt="Step 2 protractor" class="textbook-img"></div>
</div>
<div>
<div class="card" style="border:2px solid var(--green);margin-top:12px">
<h3 style="color:var(--green)">&#128736; Try It! (Work in pairs)</h3>
<p style="font-size:17px;color:var(--text)">Use a ruler and protractor to draw a quadrilateral with <strong>two equal sides</strong> that meet at a <strong>right angle</strong>, and <strong>two nonadjacent angles of the same measure</strong>.</p>
<p style="font-size:16px;color:var(--muted);margin-top:8px">What is the name of the quadrilateral you drew?</p>
<button class="reveal-btn" onclick="this.nextElementSibling.classList.toggle('hidden');this.textContent=this.textContent==='Show Answer'?'Hide Answer':'Show Answer'">Show Answer</button>
<div class="answer-reveal hidden">&#9989; This is a <strong>Square</strong>!</div>
</div>
<div style="margin-top:16px">
<svg viewBox="0 0 300 300" width="260" style="display:block;margin:0 auto">
<rect x="50" y="50" width="200" height="200" fill="none" stroke="var(--blue)" stroke-width="3"/>
<line x1="50" y1="50" x2="50" y2="250" stroke="var(--blue)" stroke-width="3"/>
<text x="25" y="155" font-size="14" fill="var(--blue)" font-weight="700">4 yd</text>
<text x="130" y="270" font-size="14" fill="var(--blue)" font-weight="700">4 yd</text>
<text x="255" y="155" font-size="14" fill="var(--orange)" font-weight="700">8 yd</text>
<path d="M 62 50 L 50 50 L 50 62" fill="none" stroke="var(--green)" stroke-width="2"/>
<text x="140" y="40" font-size="13" fill="var(--purple)" font-weight="600">135&deg;</text>
</svg>
</div>
</div>
</div>
</div>

<!-- ==================== SLIDE 6: EXAMPLE 2 ==================== -->
<div class="slide" id="slide6">
<span class="bloom-tag bloom-analyze">Analyze</span>
<h1>&#128186; Example 2: Mr. Miller&rsquo;s Desks</h1>
<div class="grid2">
<div>
<div class="card">
<p style="font-size:18px;color:var(--text);line-height:1.7">Mr. Miller&rsquo;s classroom has desks shaped like <strong>equilateral triangles</strong>. He is planning to arrange the desks for a <strong>lunch for 10 people</strong>.</p>
<p style="font-size:17px;color:var(--text)">If <strong>one person can sit at each edge</strong> of each desk, make a sketch to show how many desks he needs.</p>
</div>
<div class="guiding-box">
<h3>&#128161; Guiding Questions</h3>
<p>&bull; When triangles are pushed together, which edges are &ldquo;lost&rdquo;?<br>&bull; How many exposed edges does each arrangement create?<br>&bull; Is there more than one correct answer?</p>
</div>
<div class="img-frame"><img src="{IMG['desk_hero']}" alt="Desk arrangement illustration" style="width:100%;border-radius:12px"></div>
</div>
<div>
<div class="card" style="border:2px solid var(--purple)">
<h3 style="color:var(--purple)">Solution: Single Row &mdash; 8 Desks</h3>
<p>Arranging 8 triangular desks in a single row creates exactly 10 exposed edges for seating.</p>
<svg viewBox="0 0 480 100" width="100%" style="margin:12px 0">
<polygon points="10,80 40,20 70,80" fill="#EEF2FF" stroke="var(--blue)" stroke-width="2"/>
<polygon points="70,80 40,20 100,20" fill="#F0FDF4" stroke="var(--green)" stroke-width="2"/>
<polygon points="70,80 100,20 130,80" fill="#EEF2FF" stroke="var(--blue)" stroke-width="2"/>
<polygon points="130,80 100,20 160,20" fill="#F0FDF4" stroke="var(--green)" stroke-width="2"/>
<polygon points="130,80 160,20 190,80" fill="#EEF2FF" stroke="var(--blue)" stroke-width="2"/>
<polygon points="190,80 160,20 220,20" fill="#F0FDF4" stroke="var(--green)" stroke-width="2"/>
<polygon points="190,80 220,20 250,80" fill="#EEF2FF" stroke="var(--blue)" stroke-width="2"/>
<polygon points="250,80 220,20 280,20" fill="#F0FDF4" stroke="var(--green)" stroke-width="2"/>
</svg>
</div>
<div class="card" style="border:2px solid var(--orange);margin-top:12px">
<h3 style="color:var(--orange)">Another Way: 2 Rows &mdash; 14 Desks</h3>
<div class="img-frame"><img src="{IMG['desk_arrangement']}" alt="14 desk arrangement from textbook" class="textbook-img" style="max-height:260px"></div>
</div>
<div class="card" style="border:2px solid var(--green);margin-top:12px">
<h3 style="color:var(--green)">&#128736; Try It! (Work in pairs)</h3>
<p>Make a sketch to show <strong>another way</strong> Mr. Miller can arrange the desks to seat 10 people.</p>
</div>
</div>
</div>
</div>

<!-- ==================== SLIDE 7: EXAMPLE 3 ==================== -->
<div class="slide" id="slide7">
<span class="bloom-tag bloom-apply">Apply</span>
<h1>&#127959; Example 3: The Engineer&rsquo;s Floorplan</h1>
<div class="grid2">
<div>
<div class="card">
<p style="font-size:18px;color:var(--text);line-height:1.7">An engineer makes a scale drawing of a building floor:</p>
<ul style="font-size:17px;line-height:2;padding-left:20px;color:var(--text)">
<li><strong>Two pairs of parallel sides</strong>: 50 ft and 80 ft</li>
<li><strong>Two angles</strong> measure <strong>60&deg;</strong></li>
</ul>
<p style="font-size:17px;margin-top:8px"><strong>What is the name of the floor&rsquo;s shape?</strong></p>
</div>
<div class="img-frame"><img src="{IMG['engineer_step1']}" alt="Step 1: Draw two segments at 60 degrees" class="textbook-img"></div>
</div>
<div>
<div class="img-frame"><img src="{IMG['engineer_step2']}" alt="Step 2: Complete the parallelogram" class="textbook-img"></div>
<div class="card" style="border:2px solid var(--green);margin-top:14px">
<h3 style="color:var(--green)">Answer: Parallelogram</h3>
<p>The floor shape is a <strong>parallelogram</strong> with sides of 50 ft and 80 ft, and angles of 60&deg; and 120&deg;.</p>
</div>
<div class="card" style="border:2px solid var(--orange);margin-top:12px">
<h3 style="color:var(--orange)">&#128736; Try It! Why technology over freehand?</h3>
<button class="reveal-btn" onclick="this.nextElementSibling.classList.toggle('hidden');this.textContent=this.textContent==='Show Answer'?'Hide Answer':'Show Answer'">Show Answer</button>
<div class="answer-reveal hidden">Engineers use technology because it gives <strong>high accuracy</strong> and <strong>exact measurements</strong> &mdash; critical for construction!</div>
</div>
</div>
</div>
</div>

<!-- ==================== SLIDE 8: KEY CONCEPT ==================== -->
<div class="slide" id="slide8">
<span class="bloom-tag bloom-understand">Understand</span>
<h1>&#128273; Key Concept</h1>
<div style="max-width:800px;margin:0 auto">
<div class="key-concept-box animate-in">
<h3>&#11088; Drawing Geometric Figures</h3>
<p>You can draw shapes that meet given conditions <strong>freehand</strong>, with a <strong>ruler and protractor</strong>, or with <strong>technology</strong>.</p>
<p style="margin-top:10px">The given conditions may include properties of geometric figures and relationships between parts of the figures.</p>
</div>
<div class="grid3 animate-in delay1" style="margin-top:20px">
<div class="card" style="text-align:center;border-top:4px solid var(--blue)">
<div style="font-size:36px">&#9997;</div>
<h3>Freehand</h3>
<p style="font-size:15px">Quick sketches to explore ideas</p>
</div>
<div class="card" style="text-align:center;border-top:4px solid var(--orange)">
<div style="font-size:36px">&#128207;</div>
<h3>Ruler &amp; Protractor</h3>
<p style="font-size:15px">Precise measurements and angles</p>
</div>
<div class="card" style="text-align:center;border-top:4px solid var(--green)">
<div style="font-size:36px">&#128187;</div>
<h3>Technology</h3>
<p style="font-size:15px">Exact accuracy for professional work</p>
</div>
</div>
<div style="text-align:center;margin-top:20px" class="animate-in delay2">
<img src="{IMG['key_concept']}" alt="Key concept illustration" style="max-height:150px;border-radius:12px">
</div>
</div>
</div>

<!-- ==================== SLIDE 9: PRACTICE ==================== -->
<div class="slide" id="slide9">
<span class="bloom-tag bloom-apply">Apply</span>
<h1>&#9999; Practice (Work in Groups)</h1>
<div class="grid2">
<div>
<div class="card" style="border-top:4px solid var(--blue)">
<h3>Question 4</h3>
<p style="font-size:17px;color:var(--text)">Draw, <strong>freehand</strong>, a quadrilateral with exactly <strong>one pair of parallel sides</strong> and at least <strong>one angle measuring 45&deg;</strong>.</p>
<div class="img-frame" style="margin-top:10px"><img src="{IMG['practice_q4']}" alt="Practice Q4 GeoGebra solution" class="textbook-img"></div>
</div>
</div>
<div>
<div class="card" style="border-top:4px solid var(--orange)">
<h3>Question 5</h3>
<p style="font-size:17px;color:var(--text)">Use a ruler and protractor to draw a quadrilateral with <strong>four right angles</strong>, two sides of <strong>3 inches</strong>, and two sides of <strong>4 inches</strong>.</p>
<p style="font-size:16px;color:var(--muted)">What is the most descriptive name?</p>
<button class="reveal-btn" onclick="this.nextElementSibling.classList.toggle('hidden');this.textContent=this.textContent==='Show Answer'?'Hide Answer':'Show Answer'">Show Answer</button>
<div class="answer-reveal hidden">&#9989; This is a <strong>Rectangle</strong>!</div>
<div class="img-frame" style="margin-top:10px"><img src="{IMG['practice_q5']}" alt="Practice Q5 GeoGebra solution" class="textbook-img"></div>
</div>
</div>
</div>
</div>

<!-- ==================== SLIDE 10: MORE PRACTICE ==================== -->
<div class="slide" id="slide10">
<span class="bloom-tag bloom-apply">Apply</span>
<h1>&#128221; More Practice Questions</h1>
<div class="img-frame animate-in" style="max-width:900px;margin:0 auto"><img src="{IMG['practice_answers']}" alt="Practice questions 7-12 from textbook" style="width:100%;border-radius:12px"></div>
<div class="grid3 animate-in delay1" style="margin-top:16px">
<div class="card" style="border-left:4px solid var(--blue)"><h4 style="color:var(--blue);font-size:14px">Q7</h4><p style="font-size:14px">Rectangle, Square</p></div>
<div class="card" style="border-left:4px solid var(--orange)"><h4 style="color:var(--orange);font-size:14px">Q8</h4><p style="font-size:14px">Rectangle</p></div>
<div class="card" style="border-left:4px solid var(--green)"><h4 style="color:var(--green);font-size:14px">Q9</h4><p style="font-size:14px">Trapezoid</p></div>
<div class="card" style="border-left:4px solid var(--purple)"><h4 style="color:var(--purple);font-size:14px">Q10</h4><p style="font-size:14px">Quadrilateral</p></div>
<div class="card" style="border-left:4px solid var(--red)"><h4 style="color:var(--red);font-size:14px">Q11</h4><p style="font-size:14px">Rectangle, Parallelogram</p></div>
<div class="card" style="border-left:4px solid #0891B2"><h4 style="color:#0891B2;font-size:14px">Q12</h4><p style="font-size:14px">Rhombus</p></div>
</div>
</div>

<!-- ==================== SLIDE 11: AI INTERACTION ==================== -->
<div class="slide" id="slide11">
<span class="bloom-tag bloom-evaluate">Evaluate</span>
<h1>&#129302; Live AI Interaction: The Engineer&rsquo;s Challenge</h1>
<p>Let&rsquo;s use AI to explore the Engineer&rsquo;s Floorplan problem! Ask the AI a question and evaluate its response together as a class.</p>
<div class="grid2">
<div>
<div class="card" style="border:2px solid var(--purple)">
<h3 style="color:var(--purple)">&#128172; Ask the AI</h3>
<p style="font-size:15px;color:var(--muted);margin-bottom:12px">Try prompts like: &ldquo;A building floor has two pairs of parallel sides (50ft and 80ft) with two 60&deg; angles. What shape is it and why?&rdquo;</p>
<div class="ai-input-area">
<input type="text" id="aiInput" placeholder="Type your question for the AI..." value="A building floor has two pairs of parallel sides of 50 feet and 80 feet. Two of the four angles measure 60 degrees. What is the shape of the floor? Explain why.">
<button onclick="sendToAI()" id="aiSendBtn">&#128640; Send to AI</button>
</div>
<div class="ai-response" id="aiResponse">AI response will appear here...</div>
</div>
</div>
<div>
<div class="guiding-box" style="background:linear-gradient(135deg,#FCE7F3,#FBCFE8);border-left-color:#BE185D">
<h3 style="color:#BE185D">&#129504; Evaluate the AI&rsquo;s Response</h3>
<p style="color:#831843">&bull; Is the AI&rsquo;s answer mathematically correct?<br>&bull; Did it identify the shape correctly?<br>&bull; What details did it include or miss?<br>&bull; Would you trust this for an engineering project?</p>
</div>
<img src="{IMG['engineer_hero']}" style="width:100%;border-radius:14px;margin-top:12px;box-shadow:var(--shadow)" alt="Engineer with blueprint">
</div>
</div>
</div>

<!-- ==================== SLIDE 12: CREATE & HOMEWORK ==================== -->
<div class="slide" id="slide12">
<span class="bloom-tag bloom-create">Create</span>
<h1>&#127912; Your Turn: Create!</h1>
<div class="grid2">
<div>
<img src="{IMG['student_create']}" style="width:100%;border-radius:16px;box-shadow:var(--shadow)" alt="Students creating geometric figures">
<div class="task-card animate-in delay1" style="margin-top:16px">
<h4>&#127919; Your Design Challenge</h4>
<p style="font-size:16px;color:#065F46">Using your ruler and protractor, design a <strong>floor plan</strong> for a dream room. It must include:</p>
<ul style="font-size:15px;padding-left:20px;line-height:1.8;color:#065F46">
<li>At least <strong>2 different quadrilateral shapes</strong></li>
<li>Label all <strong>side lengths</strong> and <strong>angle measures</strong></li>
<li>Include at least one <strong>pair of parallel sides</strong></li>
<li>Include at least one <strong>perpendicular pair</strong></li>
</ul>
</div>
</div>
<div>
<div class="card" style="border-top:4px solid var(--orange)">
<h3>&#128218; Homework</h3>
<ul class="hw-list">
<li><span>1.</span> Review the vocabulary and key concepts</li>
<li><span>2.</span> Complete Exercise <strong>13, 14, 15, 16, 17</strong> on pages <strong>425&ndash;426</strong></li>
</ul>
</div>
<div class="card animate-in delay2" style="border-top:4px solid var(--green);margin-top:16px">
<h3>&#128214; What We Learned Today</h3>
<ul style="font-size:16px;line-height:1.8;padding-left:20px">
<li>How to draw geometric figures with <strong>given conditions</strong></li>
<li>Using <strong>rulers</strong> and <strong>protractors</strong> for precise drawings</li>
<li>The value of <strong>technology</strong> for accuracy</li>
<li>Properties of quadrilaterals: sides, angles, and relationships</li>
</ul>
</div>
<div class="key-concept-box animate-in delay3">
<h3>&#128170; Remember</h3>
<p>You can draw shapes freehand, with tools, or with technology. The method depends on the <strong>accuracy</strong> you need!</p>
</div>
</div>
</div>
</div>

<nav>
<button id="prevBtn" onclick="prevSlide()">&#9664; Previous</button>
<button id="nextBtn" onclick="nextSlide()">Next &#9654;</button>
</nav>

<script>
const GEMINI_API_KEY = "YOUR_KEY_HERE";

let currentSlide = 1;
const totalSlides = 12;

function updateUI() {{
    document.querySelectorAll('.slide').forEach((s, i) => {{
        s.classList.remove('active', 'exit');
        if (i + 1 === currentSlide) s.classList.add('active');
    }});
    document.getElementById('progressBar').style.width = ((currentSlide / totalSlides) * 100) + '%';
    document.getElementById('slideCounter').textContent = currentSlide + ' / ' + totalSlides;
    document.getElementById('prevBtn').style.opacity = currentSlide === 1 ? '0.4' : '1';
    document.getElementById('nextBtn').style.opacity = currentSlide === totalSlides ? '0.4' : '1';
}}

function nextSlide() {{
    if (currentSlide < totalSlides) {{ currentSlide++; updateUI(); }}
}}

function prevSlide() {{
    if (currentSlide > 1) {{ currentSlide--; updateUI(); }}
}}

document.addEventListener('keydown', (e) => {{
    if (e.key === 'ArrowRight' || e.key === ' ') {{ e.preventDefault(); nextSlide(); }}
    if (e.key === 'ArrowLeft') {{ e.preventDefault(); prevSlide(); }}
}});

function checkQuiz(el) {{
    const parent = el.closest('.quiz-grid');
    parent.querySelectorAll('.quiz-opt').forEach(o => {{
        o.classList.add('disabled');
        o.classList.add(o.dataset.answer === 'correct' ? 'correct' : '');
    }});
    if (el.dataset.answer === 'wrong') el.classList.add('wrong');
    const qNum = parseInt(el.closest('.sub-slide').dataset.q);
    document.querySelectorAll('.q-dot')[qNum - 1].classList.add('done');
    setTimeout(() => {{ if (qNum < 4) goToQ(qNum + 1); }}, 1200);
}}

function goToQ(n) {{
    document.querySelectorAll('.sub-slide').forEach(s => s.classList.remove('active'));
    document.querySelector('.sub-slide[data-q="' + n + '"]').classList.add('active');
    document.querySelectorAll('.q-dot').forEach((d, i) => {{
        if (!d.classList.contains('done')) d.classList.remove('active');
        if (i + 1 === n && !d.classList.contains('done')) d.classList.add('active');
    }});
}}

async function sendToAI() {{
    const input = document.getElementById('aiInput').value.trim();
    if (!input) return;
    const responseEl = document.getElementById('aiResponse');
    const btn = document.getElementById('aiSendBtn');
    responseEl.textContent = '&#129504; Thinking...';
    responseEl.classList.add('loading');
    btn.disabled = true;
    btn.textContent = '&#8987; Sending...';
    try {{
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${{GEMINI_API_KEY}}`,
            {{
                method: 'POST',
                headers: {{ 'Content-Type': 'application/json' }},
                body: JSON.stringify({{
                    contents: [{{ parts: [{{ text: "You are a helpful math tutor for Grade 7 students. Keep answers clear and educational. " + input }}] }}]
                }})
            }}
        );
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {{
            responseEl.textContent = data.candidates[0].content.parts[0].text;
        }} else if (data.error) {{
            responseEl.textContent = '\\u26a0\\ufe0f Error: ' + data.error.message;
        }} else {{
            responseEl.textContent = '\\u26a0\\ufe0f No response received. Check your API key.';
        }}
    }} catch (err) {{
        responseEl.textContent = '\\u26a0\\ufe0f Connection error: ' + err.message + '\\n\\nMake sure you have set a valid GEMINI_API_KEY at the top of the script.';
    }}
    responseEl.classList.remove('loading');
    btn.disabled = false;
    btn.textContent = '\\ud83d\\ude80 Send to AI';
}}

updateUI();
</script>
</body>
</html>'''

with open('7v0.1.html', 'w', encoding='utf-8') as f:
    f.write(html)

size = os.path.getsize('7v0.1.html')
print(f"Done! File size: {size} bytes ({size/1024/1024:.2f} MB)")
