// Single-page layout: every page lives in index.html as a <section data-page="...">.
// This script adds the header/footer and shows one section at a time based on the URL hash.
const PAGES = [
  ['home', 'Home'],
  ['research', 'Research'],
  ['people', 'People'],
  ['publications', 'Publications'],
  ['news', 'News'],
  ['join', 'Join'],
  ['contact', 'Contact'],
];
const SITE = '(PIXEL)² Lab';

document.documentElement.classList.add('js');

const links = PAGES.map(([id, label]) => `<a href="#${id}" data-link="${id}">${label}</a>`).join('');

document.body.insertAdjacentHTML('afterbegin', `
  <header class="site"><div class="wrap">
    <a class="brand" href="#home" aria-label="${SITE}">
      <img src="assets/img/logo-wordmark.webp" alt="PIXEL" width="80" height="40"><span>Lab</span>
    </a>
    <nav aria-label="Main">${links}</nav>
  </div></header>`);

document.body.insertAdjacentHTML('beforeend', `
  <footer class="site"><div class="wrap">
    © ${new Date().getFullYear()} (PIXEL)<sup>2</sup> Lab — People and Players: Interaction and
    Intelligence eXperience, XR Embodiment, Emotion and Language Learning Lab.
  </div></footer>`);

const sections = [...document.querySelectorAll('section[data-page]')];

function show() {
  const wanted = location.hash.slice(1);
  const id = PAGES.some(([p]) => p === wanted) ? wanted : 'home';

  sections.forEach((s) => { s.hidden = s.dataset.page !== id; });
  document.querySelectorAll('nav a').forEach((a) => {
    if (a.dataset.link === id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  const active = sections.find((s) => s.dataset.page === id);
  document.title = id === 'home' ? SITE : `${active.dataset.title} · ${SITE}`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', show);
show();
