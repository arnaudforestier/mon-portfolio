// main.js — MonPortfolio
// Vanilla JavaScript — no frameworks, no libraries

// ── Theme toggle ──────────────────────────────────────────────
const themeToggleBtn = document.querySelector('.header__theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) { applyTheme(saved); return; }
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

initTheme();

themeToggleBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});
// ─────────────────────────────────────────────────────────────

const header      = document.querySelector('.header');
const hamburger   = document.querySelector('.header__hamburger');
const mobileMenu  = document.querySelector('.header__mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

hamburger.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// ── Projects — chargement dynamique depuis data/projects.json ─────────────────
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(project => `
    <article class="project-card">
      <div class="project-card__banner"></div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.name}</h3>
        <p class="project-card__description">${project.description}</p>
        <ul class="project-card__tags">
          ${project.languages.map(lang => `<li class="project-card__tag">${lang}</li>`).join('')}
        </ul>
        <a href="${project.url}" class="project-card__link" target="_blank" rel="noopener noreferrer">Voir le projet →</a>
      </div>
    </article>
  `).join('');
}

function loadProjects() {
  fetch('data/projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Réponse réseau invalide');
      return res.json();
    })
    .then(renderProjects)
    .catch(() => {
      const grid = document.getElementById('projects-grid');
      grid.innerHTML = '<p class="projects__error">Impossible de charger les projets.</p>';
    });
}

loadProjects();
// ─────────────────────────────────────────────────────────────────────────────

// Scroll reveal — Intersection Observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.hero, .about, .projects, .contact, .footer').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
