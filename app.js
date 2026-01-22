// app.js (sem inline, atualiza ARIA e fecha menu com segurança)
(function () {
  const menu = document.getElementById('mobileMenu');
  const toggleBtn = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('closeMenu');

  if (!menu || !toggleBtn || !closeBtn) return;

  function setMenuState(isOpen) {
    menu.classList.toggle('active', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

    // bônus: trava o scroll quando o menu está aberto (melhor UX)
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains('active');
    setMenuState(!isOpen);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuState(false);
  });

  // Fecha clicando fora do menu
  document.addEventListener('click', (event) => {
    const isOpen = menu.classList.contains('active');
    if (!isOpen) return;

    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggleBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) setMenuState(false);
  });

  // Fecha com ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });
})();
