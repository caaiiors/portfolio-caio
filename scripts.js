
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

  // --- NOVAS ANIMAÇÕES: Círculos pulsantes e linhas orbitais ---

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
toggle.addEventListener('click', () => {
  // salva a preferencia do usuario
  localStorage.setItem('theme', document.body.classList.contains ('dark-mode') ? 'dark' : 'light');
})

// ao carregar a pagina, restaura o tema salvo
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}