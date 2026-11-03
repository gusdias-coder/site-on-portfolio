const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('is-open', open);
  });

  navigation.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('is-open');
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const progressBar = document.querySelector('.reading-progress');
let progressFrame = 0;
const updateReadingProgress = () => {
  if (!progressBar) return;
  progressFrame = 0;
  const pageRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageRange > 0 ? Math.min(100, (window.scrollY / pageRange) * 100) : 0;
  progressBar.style.width = `${progress}%`;
};

if (progressBar) {
  updateReadingProgress();
  window.addEventListener('scroll', () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(updateReadingProgress);
  }, { passive: true });
  window.addEventListener('resize', updateReadingProgress, { passive: true });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const processSteps = document.querySelectorAll('.steps li');
if (!reducedMotion && 'IntersectionObserver' in window && processSteps.length) {
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.55, rootMargin: '-10% 0px -20% 0px' });
  processSteps.forEach((step) => stepObserver.observe(step));
}

const sectionLinks = [...document.querySelectorAll('#navigation a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (!reducedMotion && 'IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    sectionLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${current.target.id}`;
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -45% 0px' });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
