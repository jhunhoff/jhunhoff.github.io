const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px' });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');
let stars = [];

function resizeStars() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = reducedMotion ? 45 : Math.min(110, Math.floor(window.innerWidth / 7));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.25 + .15,
    alpha: Math.random() * .55 + .18,
    speed: Math.random() * .008 + .002,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawStars(time = 0) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  stars.forEach((star) => {
    const pulse = reducedMotion ? star.alpha : star.alpha + Math.sin(time * star.speed + star.phase) * .18;
    context.beginPath();
    context.fillStyle = `rgba(248, 240, 238, ${Math.max(.08, pulse)})`;
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fill();
  });
  if (!reducedMotion) requestAnimationFrame(drawStars);
}

resizeStars();
drawStars();
window.addEventListener('resize', () => {
  resizeStars();
  if (reducedMotion) drawStars();
});

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const celebration = document.getElementById('celebration');
let noAttempts = 0;

noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('touchstart', (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });
noButton.addEventListener('click', moveNoButton);

function moveNoButton() {
  noAttempts += 1;
  if (noAttempts < 3) {
    const x = (Math.random() - .5) * 120;
    const y = (Math.random() - .5) * 90;
    noButton.style.transform = `translate(${x}px, ${y}px)`;
  } else {
    noButton.style.opacity = '.32';
    noButton.textContent = 'Tem certeza?';
  }
}

yesButton.addEventListener('click', () => {
  celebration.classList.add('visible');
  celebration.setAttribute('aria-hidden', 'false');
  if (!reducedMotion) launchCelebration();
});

function launchCelebration() {
  const colors = ['#e4a0b7', '#fff8f6', '#d6bc8b', '#9d3d67'];
  const amount = window.innerWidth < 600 ? 55 : 90;

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = i % 5 === 0 ? '♥' : '';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.color = colors[i % colors.length];
    piece.style.background = i % 5 === 0 ? 'transparent' : colors[i % colors.length];
    piece.style.width = i % 5 === 0 ? 'auto' : `${Math.random() * 7 + 4}px`;
    piece.style.height = i % 5 === 0 ? 'auto' : `${Math.random() * 11 + 7}px`;
    piece.style.fontSize = `${Math.random() * 10 + 12}px`;
    piece.style.setProperty('--duration', `${Math.random() * 2.8 + 3.2}s`);
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * .6}s`;
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}
