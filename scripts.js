
(() => {
  /* ---------------------------
     Canvas Particles (lightweight)
     --------------------------- */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const particles = [];
  const PARTICLE_COUNT = Math.round((W * H) / 70000) + 25; // scales with screen
  const TAU = Math.PI * 2;

  function rand(min, max){ return Math.random() * (max - min) + min; }

  class Particle {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0, W);
      this.y = rand(0, H);
      this.vx = rand(-0.25, 0.25);
      this.vy = rand(-0.1, 0.1);
      this.r = rand(0.6, 2.1); // radius
      this.alpha = rand(0.06, 0.3);
      this.phase = rand(0, TAU);
    }
    update(){
      this.x += this.vx;
      this.y += this.vy + Math.sin((this.phase += 0.002)) * 0.15;
      // wrap around
      if(this.x < -10) this.x = W + 10;
      if(this.x > W + 10) this.x = -10;
      if(this.y < -20) this.y = H + 20;
      if(this.y > H + 20) this.y = -20;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, TAU);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles(){
    particles.length = 0;
    for(let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());
  }

  function drawConnections(){
    // connect close particles with thin lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx*dx + dy*dy;
        if(d2 < 10000){ // distance threshold (~100px)
          const alpha = (1 - d2 / 10000) * 0.06;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }


  // Círculos pulsantes
  function drawPulsingCircles(time) {
    const centerX = W / 2;
    const centerY = H / 2;
    for (let i = 0; i < 3; i++) {
      const radius = 120 + i * 60 + Math.sin(time / 900 + i) * 18;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TAU);
      ctx.strokeStyle = `rgba(151,162,180,${0.18 + i * 0.07})`; // #97a2b4
      ctx.lineWidth = 2.2;
      ctx.setLineDash([8, 12]);
      ctx.shadowColor = 'rgba(151,162,180,0.25)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
    }
  }

  // Linhas orbitais animadas
  function drawOrbitLines(time) {
    const centerX = W / 2;
    const centerY = H / 2;
    for (let i = 0; i < 5; i++) {
      const angle = (time / 1200) + i * (TAU / 5);
      const orbitRadius = 80 + i * 32;
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;
      ctx.beginPath();
      ctx.arc(x, y, 22 + Math.sin(time / 600 + i) * 10, 0, TAU);
      ctx.strokeStyle = `rgba(151,162,180,0.18)`; // #97a2b4
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(151,162,180,0.18)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  // --- BOLINHAS QUICANDO ---

  const bouncingBalls = [];
  const BALL_COUNT = 18;

  class BouncingBall {
    constructor() {
      this.r = rand(10, 28);
      this.x = rand(this.r, W - this.r);
      this.y = rand(this.r, H - this.r);
      this.vx = rand(-1.2, 1.2);
      this.vy = rand(-1.2, 1.2);
      // cor #97a2b4 com alpha variando
      this.color = `rgba(151,162,180,${rand(0.10,0.22)})`;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Bounce on edges
      if (this.x < this.r) { this.x = this.r; this.vx *= -1; }
      if (this.x > W - this.r) { this.x = W - this.r; this.vx *= -1; }
      if (this.y < this.r) { this.y = this.r; this.vy *= -1; }
      if (this.y > H - this.r) { this.y = H - this.r; this.vy *= -1; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, TAU);
      ctx.fillStyle = this.color;
      ctx.shadowColor = 'rgba(151,162,180,0.18)';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initBouncingBalls() {
    bouncingBalls.length = 0;
    for (let i = 0; i < BALL_COUNT; i++) {
      bouncingBalls.push(new BouncingBall());
    }
  }

  function loop(time){
    ctx.clearRect(0,0,W,H);
    // vignette mais sutil
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, 'rgba(0,0,0,0.0)');
    g.addColorStop(1, 'rgba(0,0,0,0.18)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    // Bolinhas quicando
    bouncingBalls.forEach(b => {
      b.update();
      b.draw();
    });

    // Novas animações de fundo
    drawPulsingCircles(time || 0);
    drawOrbitLines(time || 0);

    particles.forEach(p=>{
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(loop);
  }

  // resize handling
  function onResize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    initParticles();
    initBouncingBalls();
  }
  addEventListener('resize', onResize, {passive:true});

  // init
  initParticles();
  initBouncingBalls();
  loop();

  /* ---------------------------
     Scroll reveal (vanilla)
     --------------------------- */
  const revealElems = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerY = innerHeight * 0.85;
    revealElems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top <= triggerY){
        el.classList.add('visible');
      }
    });
  };
  addEventListener('scroll', revealOnScroll, {passive:true});
  // initial
  setTimeout(revealOnScroll, 200);

  /* ---------------------------
     Simple interactions
     --------------------------- */
  // Menu button (mobile) - toggles nav links
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn){
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });
  }

  // Year in footer
  document.getElementById('year').innerText = new Date().getFullYear();

  /* Accessibility: reduce motion */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    // stop animations if user prefers reduced motion
    cancelAnimationFrame(loop);
    particles.length = 0;
    canvas.style.display = 'none';
  }

})();

/* darkmode & lightmode */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
});

const toggle = document.getElementById('toggle-dark');
if (toggle) {
  toggle.addEventListener('click', () => {
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
  });
}


// ao carregar a pagina, restaura o tema salvo
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

/* ---------------------------
   Tradução (PT ↔ EN)
   --------------------------- */
(function setupI18n() {
  const translations = {
    pt: {
      navAbout: "Sobre",
      navProjects: "Projetos",
      navContact: "Contato",
      sobreMim: "Sobre mim",
      heroTitle: "Olá, eu sou <span class='accent'>Caio</span>.",
      heroSubtitle: "Desenvolvedor · Criador de interfaces futuristas · UI/UX",
      heroBtnProjects: "Ver Projetos",
      heroBtnContact: "Entrar em contato",
      aboutTitle: "Sobre mim",
      aboutText:
        "Meu nome é Caio Rissa Silveira e sou do Rio Grande do Sul. Sou um desenvolvedor front-end que gosta de interfaces limpas, animações sutis e experiências com muita presença visual — tudo em preto e branco para foco total no conteúdo.",
      skillsTitle: "Skills",
      skillsHTML: "Criação da estrutura base das páginas e componentes web.",
      skillsCSS: "Estilização moderna com animações e design responsivo.",
      skillsJS: "Criação de interatividade e lógicas dinâmicas.",
      skillsREACT: "Biblioteca JavaScript para criar interfaces web rápidas e interativas.",
      skillsTAILWIND: "Framework CSS moderno e responsivo para criar layouts personalizados com agilidade.",
      projectTitle: "Projetos",
      project1Desc: "Jogo da velha, desenvolvido com HTML, CSS e JS.",
      project2Desc: "Mini quiz interativo feito em HTML, CSS e JS.",
      project3Desc: "Esse projeto foi feito em HTML, CSS e JS.",
      project4Desc: "Esse projeto foi feito em React, JS, TailwindCSS, HTMl e CSS.",
      contactText: "Quer conversar ou trabalhar comigo? Manda um e-mail direto 👇",
      contactBtn: "✉️ Enviar por e-mail",
      connectTitle: "Let’s connect",
      connectText: "Envia uma mensagem ou me segue nessas redes sociais.",
      footer: "© {year} Caio Rissa Silveira — Todos os direitos reservados"
    },
    en: {
      navAbout: "About",
      navProjects: "Projects",
      navContact: "Contact",
      sobreMim: "About me",
      heroTitle: "Hi, I'm <span class='accent'>Caio</span>.",
      heroSubtitle: "Developer · Futuristic interface creator · UI/UX",
      heroBtnProjects: "View Projects",
      heroBtnContact: "Get in touch",
      aboutTitle: "About me",
      aboutText:
        "My name is Caio Rissa Silveira and I'm from Rio Grande do Sul, Brazil. I'm a front-end developer who loves clean interfaces, subtle animations, and strong visual experiences — all in black and white for full focus on content.",
      skillsTitle: "Skills",
      skillsHTML: "Creation of the basic structure of pages and web components.",
      skillsCSS: "Modern styling with animations and responsive design.",
      skillsJS: "Creation of interactivity and dynamic logic.",
      skillsREACT: "JavaScript library for building fast, interactive, and component-based web interfaces.",
      skillsTAILWIND: "Utility-first CSS framework for creating modern, responsive, and customizable designs quickly.",
      projectTitle: "Projects",
      project1Desc: "Tic-tac-toe game developed with HTML, CSS, and JS.",
      project2Desc: "Mini interactive quiz built with HTML, CSS, and JS.",
      project3Desc: "This project was created using HTML, CSS, and JS.",
      project4Desc: "This project was built using React, JavaScript, TailwindCSS, HTML, and CSS.",
      contactText: "Want to chat or work with me? Send me an email 👇",
      contactBtn: "✉️ Send Email",
      connectTitle: "Let’s connect",
      connectText: "Send a message or follow me on these social networks.",
      footer: "© {year} Caio Rissa Silveira — All rights reserved"
    }
  };

  const langToggle = document.getElementById("langToggle");
  if (!langToggle) return;

  const elements = {
    navAbout: document.querySelector("a[href='#about']"),
    navProjects: document.querySelector("a[href='#projects']"),
    navContact: document.querySelector("a[href='#contato']"),
    sobreMim: document.querySelector(".sobreMim"),
    heroTitle: document.querySelector(".hero-left h1"),
    heroSubtitle: document.querySelector(".hero-left .lead"),
    heroBtnProjects: document.querySelector(".actions a.btn.primary"),
    heroBtnContact: document.querySelector(".actions a.btn.ghost"),
    aboutTitle: document.querySelector("#about .section-title"),
    aboutText: document.querySelector("#about .panel p"),
    skillsTitle: document.querySelector(".skills-grid h3"),
    skillsHTML: document.querySelectorAll(".skill-info p")[0],
    skillsCSS: document.querySelectorAll(".skill-info p")[1],
    skillsJS: document.querySelectorAll(".skill-info p")[2],
    skillsREACT: document.querySelectorAll(".skill-info p")[3],
    skillsTAILWIND: document.querySelectorAll(".skill-info p")[4],
    projectTitle: document.querySelector("#projects .section-title"),
    project1Desc: document.querySelectorAll(".project-card p")[0],
    project2Desc: document.querySelectorAll(".project-card p")[1],
    project3Desc: document.querySelectorAll(".project-card p")[2],
    project4Desc: document.querySelectorAll(".project-card p")[3],
    contactText: document.querySelector(".contato-card p"),
    contactBtn: document.querySelector(".botao-email"),
    connectTitle: document.querySelector(".connect-card h3"),
    connectText: document.querySelector(".connect-card p"),
    footer: document.querySelector(".footer small")
  };

  function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return console.warn("Idioma não encontrado:", lang);

    elements.navAbout && (elements.navAbout.textContent = t.navAbout);
    elements.navProjects && (elements.navProjects.textContent = t.navProjects);
    elements.navContact && (elements.navContact.textContent = t.navContact);
    elements.sobreMim &&(elements.sobreMim.textContent = t.sobreMim)
    elements.heroTitle && (elements.heroTitle.innerHTML = t.heroTitle);
    elements.heroSubtitle && (elements.heroSubtitle.textContent = t.heroSubtitle);
    elements.heroBtnProjects && (elements.heroBtnProjects.textContent = t.heroBtnProjects);
    elements.heroBtnContact && (elements.heroBtnContact.textContent = t.heroBtnContact);
    elements.aboutTitle && (elements.aboutTitle.textContent = t.aboutTitle);
    elements.aboutText && (elements.aboutText.textContent = t.aboutText);
    elements.skillsTitle && (elements.skillsTitle.textContent = t.skillsTitle);
    elements.skillsHTML && (elements.skillsHTML.textContent = t.skillsHTML);
    elements.skillsCSS && (elements.skillsCSS.textContent = t.skillsCSS);
    elements.skillsJS && (elements.skillsJS.textContent = t.skillsJS);
    elements.skillsREACT && (elements.skillsREACT.textContent = t.skillsREACT);
    elements.skillsTAILWIND && (elements.skillsTAILWIND.textContent = t.skillsTAILWIND);
    elements.projectTitle && (elements.projectTitle.textContent = t.projectTitle);
    elements.project1Desc && (elements.project1Desc.textContent = t.project1Desc);
    elements.project2Desc && (elements.project2Desc.textContent = t.project2Desc);
    elements.project3Desc && (elements.project3Desc.textContent = t.project3Desc);
    elements.project4Desc && (elements.project4Desc.textContent = t.project4Desc);
    elements.contactText && (elements.contactText.textContent = t.contactText);
    elements.contactBtn && (elements.contactBtn.textContent = t.contactBtn);
    elements.connectTitle && (elements.connectTitle.textContent = t.connectTitle);
    elements.connectText && (elements.connectText.textContent = t.connectText);

    if (elements.footer) {
      elements.footer.innerHTML = t.footer.replace("{year}", new Date().getFullYear());
    }

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }

  langToggle.addEventListener("change", (e) => setLanguage(e.target.value));
  const savedLang = localStorage.getItem("lang") || "pt";
  langToggle.value = savedLang;
  setLanguage(savedLang);
})();
