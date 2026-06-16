/* PawPantry Docs — shared JS */
(function () {
  'use strict';

  /* ── Mobile sidebar ── */
  const toggle = document.querySelector('.nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:oklch(17% 0.038 265 / 0.4);z-index:49;display:none;backdrop-filter:blur(2px);';
  document.body.appendChild(overlay);

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.style.display = 'block';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
  }

  toggle && toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay.addEventListener('click', closeSidebar);

  /* ── highlight.js ── */
  if (window.hljs) {
    hljs.configure({ cssSelector: 'pre code' });
    hljs.highlightAll();
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── Build TOC from headings ── */
  const tocList = document.querySelector('.toc-list');
  if (tocList) {
    const headings = document.querySelectorAll('.article h2, .article h3');
    headings.forEach(h => {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
      }
      const li = document.createElement('li');
      li.className = h.tagName === 'H3' ? 'toc-h3' : '';
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/#$/, '').trim();
      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  /* ── Scroll spy (TOC) ── */
  const allHeadings = Array.from(document.querySelectorAll('.article h2, .article h3'));
  const allTocLinks = Array.from(document.querySelectorAll('.toc-list a'));

  if (allHeadings.length && allTocLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          allTocLinks.forEach(a => a.classList.remove('toc-active'));
          const active = allTocLinks.find(a => a.getAttribute('href') === '#' + entry.target.id);
          if (active) active.classList.add('toc-active');
        }
      });
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

    allHeadings.forEach(h => h.id && observer.observe(h));
  }

  /* ── Anchor links on headings ── */
  document.querySelectorAll('.article h2[id], .article h3[id]').forEach(h => {
    const a = document.createElement('a');
    a.className = 'anchor';
    a.href = '#' + h.id;
    a.textContent = '#';
    h.appendChild(a);
  });
})();
