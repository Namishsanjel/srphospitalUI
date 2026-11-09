(() => {
  const header = document.querySelector('.everwell-navigation');
  if (!header) return;

  const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-right"/></svg>';
  const menus = {
    services: {
      eyebrow: 'DIAGNOSTIC SERVICES', title: 'Clear answers. Connected care.',
      links: [
        ["2D Echo", "heart", "2d-echo.html"],
        ["CT-Scan", "diagnostics", "ct-scan.html"],
        ["ECG", "ecg", "ecg.html"],
        ["Tread Mill Test", "movement", "tread-mill-test.html"],
        ["USG", "ultrasound", "usg.html"],
        ["X-Ray", "x-ray", "x-ray.html"],
      ],
      footer: [['Visiting neurosurgery', 'services.html#neurosurgery'], ['Patient support', 'services.html#patient-support'], ['View all services', 'services.html']],
      image: 'assets/approved-specialty.png', imagePosition: 'center',
      feature: 'Here for your\nnext step.', featureLink: 'Talk to our team', featureHref: 'contact.html#contact-form',
    },
    departments: {
      eyebrow: 'OUR DEPARTMENTS', title: 'Find care that fits.',
      links: [
        ["General Surgery", "surgery", "general-surgery.html"],
        ["Obstetrics and Gynaecology", "womens-health", "obstetrics-gynaecology.html"],
        ["Anesthesiology", "anesthesiology", "anesthesiology.html"],
        ["Orthopedics", "orthopedics", "orthopedics.html"],
        ["Paediatrics", "paediatrics", "paediatrics.html"],
        ["Urology", "urology", "urology.html"],
      ],
      footer: [['Visiting neurosurgery', 'departments.html#neurosurgery'], ['View all departments', 'departments.html']],
      image: 'assets/consultation-hero.jpg', imagePosition: 'center',
      feature: 'The right care.\nThe right people.', featureLink: 'Explore our departments', featureHref: 'departments.html',
    },
    about: {
      eyebrow: 'OUR HOSPITAL', title: 'Get to know our hospital.',
      links: [
        ['About our hospital', 'hospital', 'about.html#about'],
        ['Mission, vision & objectives', 'primary-care', 'about.html#approach'],
        ['Our people', 'team', 'about.html#team'],
        ['Quality & safety', 'shield', 'quality-safety.html'],
        ['NABH certification', 'accreditation', 'quality-safety.html#accreditation'],
        ['Contact & visiting', 'conversation', 'contact.html#contact-details'],
      ],
      footer: [['Contact us', 'contact.html'], ['Explore our hospital', 'about.html']],
      image: 'assets/space-atrium-clean.webp', imagePosition: '25% center',
      feature: 'Space to feel\nat ease.', featureLink: 'Discover our hospital', featureHref: 'about.html',
    },
  };

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const panelContainer = header.querySelector('.navigation-menus');
  panelContainer.innerHTML = Object.entries(menus).map(([key, menu]) => `
    <section class="mega-panel" id="mega-${key}" aria-labelledby="nav-${key}-trigger" hidden>
      <button class="mega-close" type="button" aria-label="Close ${escapeHtml(key === 'wellness' ? 'health and wellness' : key)} menu">Close <svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button>
      <div class="mega-layout">
        <div class="mega-main">
          <p class="mega-eyebrow">${escapeHtml(menu.eyebrow)}</p>
          <h2 class="mega-title">${escapeHtml(menu.title)}</h2>
          <div class="mega-links">${menu.links.map(([label, icon, href]) => `
            <a class="mega-link" href="${escapeHtml(href)}"><img class="mega-link-art" src="assets/navigation/${icon}.svg" alt="" width="54" height="54"><span>${escapeHtml(label)}</span>${arrow}</a>`).join('')}
          </div>
          <div class="mega-footer">${menu.footer.map(([label, href], index) => `<a class="${index === menu.footer.length - 1 ? 'mega-overview' : ''}" href="${escapeHtml(href)}">${escapeHtml(label)} ${arrow}</a>`).join('')}</div>
        </div>
        <aside class="mega-feature">
          <img class="mega-feature-photo" src="${escapeHtml(menu.image)}" alt="" style="object-position:${menu.imagePosition}" width="420" height="255">
          <h3>${escapeHtml(menu.feature).replace(/\n/g, '<br>')}</h3>
          <a class="mega-feature-link" href="${escapeHtml(menu.featureHref)}">${escapeHtml(menu.featureLink)} ${arrow}</a>
        </aside>
      </div>
    </section>`).join('');

  const triggers = [...header.querySelectorAll('.mega-trigger')];
  const panels = [...header.querySelectorAll('.mega-panel')];
  const mobileMenu = header.querySelector('#mobile-nav');
  const mobileToggle = header.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.mega-backdrop');
  const mobileViewport = matchMedia('(max-width: 1180px)');
  let activeMenu = null;
  let activeTrigger = null;

  function updateViewportPosition() {
    header.style.setProperty('--navigation-bottom', `${Math.max(0, header.getBoundingClientRect().bottom)}px`);
  }

  function updateOverlay() {
    const mobileOpen = !mobileMenu.hidden;
    const open = Boolean(activeMenu) || mobileOpen;
    document.documentElement.classList.toggle('navigation-open', open);
    header.classList.toggle('has-open-menu', open);
    backdrop.hidden = !open;
    updateViewportPosition();
  }

  function closeSubmenu(returnFocus = false) {
    const previousTrigger = activeTrigger;
    panels.forEach(panel => { panel.hidden = true; });
    triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    activeMenu = null;
    activeTrigger = null;
    updateOverlay();
    if (returnFocus) previousTrigger?.focus();
  }

  function closeMobileMenu(returnFocus = false) {
    closeSubmenu();
    mobileMenu.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open menu');
    mobileToggle.querySelector('use').setAttribute('href', '#i-menu');
    updateOverlay();
    if (returnFocus) mobileToggle.focus();
  }

  function openSubmenu(key, trigger, focusFirstLink = false) {
    closeSubmenu();
    const panel = document.getElementById(`mega-${key}`);
    const container = mobileViewport.matches ? header.querySelector(`[data-mobile-slot="${key}"]`) : panelContainer;
    container.append(panel);
    panel.setAttribute('aria-labelledby', trigger.id);
    panel.hidden = false;
    activeMenu = key;
    activeTrigger = trigger;
    triggers.filter(item => item.dataset.menu === key).forEach(item => item.setAttribute('aria-expanded', 'true'));
    updateOverlay();
    if (focusFirstLink) panel.querySelector('.mega-link').focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (activeMenu === trigger.dataset.menu) closeSubmenu();
      else openSubmenu(trigger.dataset.menu, trigger);
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openSubmenu(trigger.dataset.menu, trigger, true);
      }
    });
  });

  header.querySelectorAll('.mega-close').forEach(button => button.addEventListener('click', () => closeSubmenu(true)));
  header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMobileMenu();
    const destination = new URL(link.href, location.href);
    const pagePath = path => path.replace(/\.html$/, '').replace(/\/index$/, '/');
    if (destination.origin === location.origin && pagePath(destination.pathname) === pagePath(location.pathname) && destination.hash) {
      window.dispatchEvent(new CustomEvent('everwell:navigate-section', { detail: destination.hash }));
    }
  }));
  mobileToggle.addEventListener('click', () => {
    if (!mobileMenu.hidden) {
      closeMobileMenu(true);
      return;
    }
    closeSubmenu();
    mobileMenu.hidden = false;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.setAttribute('aria-label', 'Close menu');
    mobileToggle.querySelector('use').setAttribute('href', '#i-close');
    updateOverlay();
  });

  backdrop.addEventListener('click', () => {
    if (mobileViewport.matches) closeMobileMenu(true);
    else closeSubmenu(true);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (activeMenu) {
      event.preventDefault();
      closeSubmenu(true);
    } else if (!mobileMenu.hidden) {
      event.preventDefault();
      closeMobileMenu(true);
    }
  });

  document.addEventListener('focusin', event => {
    if (header.contains(event.target)) return;
    closeMobileMenu();
  });

  document.addEventListener('pointerdown', event => {
    if (!header.contains(event.target) && !backdrop.contains(event.target)) closeMobileMenu();
  });

  mobileViewport.addEventListener('change', () => {
    closeMobileMenu();
    panels.forEach(panel => panelContainer.append(panel));
  });
  window.addEventListener('resize', updateViewportPosition);
  window.addEventListener('pageshow', event => {
    if (event.persisted) closeMobileMenu();
  });
})();
