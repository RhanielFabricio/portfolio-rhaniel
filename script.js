/* =============================================
   PORTFOLIO — Rhaniel Fabricio
   script.js
   ============================================= */

/* ---------- PARTICLES ---------- */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.life = Math.random();
    this.color = Math.random() > 0.6 ? '#c9a84c' : '#00c853';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life += 0.003;

    const outOfBounds =
      this.x < 0 || this.x > canvas.width ||
      this.y < 0 || this.y > canvas.height;

    if (this.life > 1 || outOfBounds) this.reset();
  }

  draw() {
    const alpha = Math.floor((1 - this.life) * 120).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + alpha;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 80) {
        const alpha = Math.floor((1 - dist / 80) * 30).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#00c853' + alpha;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

animateParticles();

/* ---------- TYPEWRITER ---------- */
const phrases = [
  'Java Backend Developer',
  'Spring Boot',
  'API REST',
  'Transformando lógica em solução',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typewriterEl.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typewrite, 1800);
      return;
    }
  } else {
    typewriterEl.textContent = phrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typewrite, deleting ? 55 : 90);
}

typewrite();

/* ---------- TEMA CLARO / ESCURO ---------- */
const themeBtn = document.getElementById('theme-btn');
let isDark = true;

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});

/* ---------- MENU MOBILE ---------- */
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fechar menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- BOTÃO ENVIAR MENSAGEM ---------- */
// Para ativar o envio real, integre com Formspree ou EmailJS.
// Exemplo com Formspree: substitua a URL abaixo pela sua.
const sendBtn = document.getElementById('send-btn');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    alert('Configure Formspree ou EmailJS para receber as mensagens!\nAcesse: https://formspree.io');
  });
}
