// This version uses plain browser JavaScript, so it works when index.html is opened directly.
// Add your Supabase Project URL and anon key here to activate contact-message storage.
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

const root = document.getElementById('root');
const skills = ['Vibe Coding', 'C', 'C++', 'HTML', 'Problem Solving', 'Teamwork'];
const projects = [
  ['01', 'SOLO BUILD', 'Rule-Based Chatbot', 'A logic-driven conversational assistant that maps user input to meaningful, pre-defined responses.', ['Logic', 'C++', 'Conversational UI']],
  ['02', 'TEAM BUILD', 'Disaster Management System', 'A collaborative concept for organizing critical information and response during disaster situations.', ['Teamwork', 'Systems Thinking', 'Impact']]
];

root.innerHTML = `
  <div class="noise"></div>
  <header class="nav"><button class="brand" data-jump="home" aria-label="Go home">AV<span>.</span></button><button class="menu-button" id="menu-toggle">MENU <i></i></button><nav id="nav-links"><button data-jump="home">home</button><button data-jump="about">about</button><button data-jump="work">work</button><button data-jump="contact">contact</button></nav></header>
  <main>
    <section id="home" class="hero"><div class="hero-copy"><p class="eyebrow"><span></span> BE IT STUDENT · SVIT VASAD</p><h1>BUILDING<br><em>THE NEXT</em><br>SIGNAL.</h1><p class="hero-intro">I’m <strong>Anush Vernekar</strong> — an IT student exploring code, systems, and ideas with a pulse.</p><div class="hero-actions"><button class="primary" data-jump="work">EXPLORE WORK <b>↘</b></button><button class="text-button" data-jump="contact">START A CONVERSATION</button></div></div><div class="orbit-zone" aria-hidden="true"><div class="orb"><div class="orb-core">AV</div></div><span class="orbit-label one">SYSTEM<br>ONLINE</span><span class="orbit-label two">2029<br>GRAD</span><span class="cross x1">+</span><span class="cross x2">+</span></div><p class="scroll">SCROLL TO DECODE <span>↓</span></p></section>
    <section id="about" class="about section-grid"><p class="section-index">01 / ABOUT</p><div class="about-content"><p class="massive">CURIOUS MIND.<br><span>EARLY BUILDER.</span></p><div class="about-bottom"><p>I’m pursuing a Bachelor of Engineering in Information Technology at <strong>SVIT Vasad</strong>, graduating in 2029. I enjoy turning rough ideas into things people can actually use.</p><div class="stat"><b>04+</b><span>LANGUAGES<br>SPOKEN</span></div></div></div></section>
    <section class="education"><div class="section-heading"><p class="section-index">02 / PATHWAY</p><h2>THE<br><em>ORIGIN LOG.</em></h2></div><div class="timeline"><article><span>2025 — 2029</span><h3>BE · INFORMATION TECHNOLOGY</h3><p>SVIT Vasad</p><i>NOW</i></article><article><span>2023 — 2025</span><h3>CLASS 11 & 12 · CBSE</h3><p>Shannen School</p></article><article><span>2019 — 2023</span><h3>CLASS 6 TO 10</h3><p>Global Discovery School, Sevasi</p></article><article><span>2014 — 2019</span><h3>CLASS 1 TO 5 · CBSE</h3><p>Shannen School</p></article></div></section>
    <section class="skills-section"><p class="section-index">03 / ARSENAL</p><div class="skill-wall">${skills.map(skill => `<span>${skill}<b>✦</b></span>`).join('')}</div><div class="languages"><p>HUMAN LANGUAGES</p><span>Konkani <i>Native</i></span><span>Hindi · English <i>Fluent</i></span><span>Kannada · Gujarati <i>Understanding</i></span></div></section>
    <section id="work" class="work"><div class="section-heading"><p class="section-index">04 / SELECTED WORK</p><h2>CONCEPTS<br><em>IN MOTION.</em></h2></div><div class="project-grid">${projects.map(([number, type, title, text, tags]) => `<article class="project"><div class="project-top"><span>${number}</span><span>${type}</span></div><div class="project-visual"><div class="scanline"></div><span>AV//${number}</span><b>↗</b></div><h3>${title}</h3><p>${text}</p><div class="tags">${tags.map(tag => `<i>${tag}</i>`).join('')}</div></article>`).join('')}</div></section>
    <section id="contact" class="contact"><p class="section-index">05 / CONTACT</p><div class="contact-layout"><div><p class="contact-lead">GOT AN IDEA<br>THAT NEEDS A<br><em>SPARK?</em></p><p class="contact-caption">Send a signal. I’m open to learning, collaborating, and building something interesting.</p></div><form id="contact-form"><label>YOUR NAME<input name="name" required placeholder="Enter your name"></label><label>YOUR EMAIL<input name="email" required type="email" placeholder="you@example.com"></label><label>YOUR MESSAGE<textarea name="message" required minlength="10" placeholder="What’s on your mind?"></textarea></label><button class="primary submit">SEND SIGNAL <b>↗</b></button><p class="form-status" id="form-status" aria-live="polite"></p></form></div></section>
  </main>
  <footer><span>© 2026 ANUSH VERNEKAR</span><span>DESIGNED IN THE STATIC</span><button data-jump="home">BACK TO TOP ↑</button></footer>`;

const jumpTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); document.getElementById('nav-links').classList.remove('open'); };
document.querySelectorAll('[data-jump]').forEach(button => button.addEventListener('click', () => jumpTo(button.dataset.jump)));
document.getElementById('menu-toggle').addEventListener('click', () => document.getElementById('nav-links').classList.toggle('open'));

const navigation = document.querySelectorAll('#nav-links button');
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navigation.forEach(button => button.classList.toggle('selected', button.dataset.jump === entry.target.id)); }), { rootMargin: '-40% 0px -52% 0px' });
document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

document.getElementById('contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const status = document.getElementById('form-status');
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) { status.textContent = 'Transmission offline — add your Supabase details in app.js to activate it.'; return; }
  const form = Object.fromEntries(new FormData(event.currentTarget));
  status.textContent = 'Transmitting…';
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/messages`, { method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(form) });
    if (!response.ok) throw new Error(await response.text());
    status.textContent = 'Signal received. Thank you — I’ll get back to you soon.';
    event.currentTarget.reset();
  } catch (error) { status.textContent = 'Transmission failed. Check your Supabase setup and try again.'; }
});
