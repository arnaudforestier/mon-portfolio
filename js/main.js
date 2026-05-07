// main.js — MonPortfolio
// Vanilla JavaScript — no frameworks, no libraries

// ── Theme toggle ──────────────────────────────────────────────
const themeToggleBtn = document.querySelector('.header__theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}
// ─────────────────────────────────────────────────────────────

const header      = document.querySelector('.header');
const hamburger   = document.querySelector('.header__hamburger');
const mobileMenu  = document.querySelector('.header__mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

if (header && hamburger && mobileMenu) {
  function closeMenu() {
    header.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    mobileLinks.forEach(l => l.setAttribute('tabindex', '-1'));
    hamburger.focus();
  }

  function openMenu() {
    header.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mobileLinks.forEach(link => link.setAttribute('tabindex', '0'));
    mobileLinks[0].focus();
  }

  hamburger.addEventListener('click', () => {
    header.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Fermeture sur Échap + focus trap
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const focusable = Array.from(mobileLinks);
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) closeMenu();
  });
}

// ── Projects — chargement dynamique depuis data/projects.json ─────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(project => `
    <article class="project-card">
      <div class="project-card__banner"></div>
      <div class="project-card__body">
        <h3 class="project-card__title">${escapeHtml(project.name)}</h3>
        <p class="project-card__description">${escapeHtml(project.description)}</p>
        <ul class="project-card__tags">
          ${project.languages.map(lang => `<li class="project-card__tag">${escapeHtml(lang)}</li>`).join('')}
        </ul>
        <a href="${escapeHtml(project.url)}" class="project-card__link" target="_blank" rel="noopener noreferrer" aria-label="Voir le projet ${escapeHtml(project.name)} (ouvre dans un nouvel onglet)">Voir le projet →</a>
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

// ── Formulaire — validation accessible ───────────────────────────────────────
const contactForm = document.querySelector('.contact__form');
const formStatus  = document.getElementById('form-status');

if (contactForm && formStatus) contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.className = 'form__status';
  formStatus.textContent = '';

  const name    = contactForm.querySelector('#name').value.trim();
  const email   = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    formStatus.className = 'form__status form__status--error';
    formStatus.textContent = 'Veuillez remplir tous les champs obligatoires.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.className = 'form__status form__status--error';
    formStatus.textContent = 'Veuillez entrer une adresse email valide.';
    return;
  }

  formStatus.className = 'form__status form__status--success';
  formStatus.textContent = 'Message envoyé avec succès !';
  contactForm.reset();
});
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
