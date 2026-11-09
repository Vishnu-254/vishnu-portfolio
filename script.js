(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
  var hd = $('#hd'), menu = $('#menu'), burger = $('#burger'), top = $('#top');
  var HB = burger.innerHTML, XB = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  function setMenu(o) { menu.classList.toggle('open', o); burger.innerHTML = o ? XB : HB; burger.setAttribute('aria-expanded', o); hd.classList.toggle('on', o || scrollY > 8); }
  burger.onclick = function () { setMenu(!menu.classList.contains('open')); };
  menu.onclick = function () { setMenu(false); };
  addEventListener('scroll', function () { hd.classList.toggle('on', scrollY > 8 || menu.classList.contains('open')); top.classList.toggle('show', scrollY > 600); }, { passive: true });
  top.onclick = function () { scrollTo({ top: 0 }); };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) $$('[data-n]').forEach(function (a) { a.classList.toggle('cur', a.dataset.n === e.target.id); }); }); }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section').forEach(function (s) { io.observe(s); });
  }
  $$('[data-open]').forEach(function (b) { b.onclick = function () { document.getElementById(b.dataset.open).showModal(); document.body.style.overflow = 'hidden'; }; });
  $$('dialog').forEach(function (d) {
    d.addEventListener('close', function () { document.body.style.overflow = ''; });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $('[data-close]', d).onclick = function () { d.close(); };
  });
  $$('[data-years]').forEach(function (el) { el.textContent = Math.floor((Date.now() - new Date(el.dataset.start)) / 31557600000) + '+'; });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
