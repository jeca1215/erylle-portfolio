/* ==========================================================================
   main.js
   Handles: page loader, sticky nav shadow, scroll-spy + sliding pill indicator,
   mobile menu toggle, scroll-reveal animations, highlight-sweep trigger.
   No dependencies.
   ========================================================================== */


/* ==========================================================================
   PAGE LOADER
   ========================================================================== */

const pageLoader = document.getElementById('pageLoader');
const loaderCount = document.getElementById('loaderCount');

if (pageLoader && loaderCount) {
  document.body.classList.add('is-loading');

  const progressSteps = [
  1,
  7,
  13,
  22,
  31,
  43,
  54,
  66,
  76,
  84,
  91,
  96,
  100
];
  let currentStep = 0;

  const updateLoader = () => {
    const value = progressSteps[currentStep];

    loaderCount.textContent = value === 1 ? '01' : value;

    if (currentStep < progressSteps.length - 1) {
      currentStep++;

      setTimeout(updateLoader, 70);
    } else {
      setTimeout(() => {
        pageLoader.classList.add('is-done');
        document.body.classList.remove('is-loading');

        setTimeout(() => {
          pageLoader.remove();
        }, 750);

      }, 400);
    }
  };

  updateLoader();
}

/* ==========================================================================
   CUSTOM CURSOR
   ========================================================================== */

const cursor = document.getElementById('cursor');
const cursorDot = document.querySelector('.cursor__dot');
const cursorRing = document.querySelector('.cursor__ring');

if (
  cursor &&
  cursorDot &&
  cursorRing &&
  window.innerWidth >= 900 &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches
) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;

  /* ---------- Mouse position ---------- */
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Black dot stays directly on the mouse */
    cursorDot.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  /* ---------- Smooth ring movement ---------- */
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.transform =
      `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  /* ---------- Hover effect ---------- */

  const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, select, .chip, .fun-fact, .project-card'
  );

  interactiveElements.forEach((element) => {

    element.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
    });

    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
    });

  });


  /* ---------- Hide when mouse leaves page ---------- */

  document.addEventListener('mouseleave', () => {
    cursor.classList.add('is-hidden');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('is-hidden');
  });
}
/* ==========================================================================
   MAIN WEBSITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const navIndicator = document.getElementById('navIndicator');

  const links = Array.from(
    document.querySelectorAll('[data-nav-link]')
  );

  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);


  /* ---------- Sticky nav border on scroll ---------- */

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle(
        'is-scrolled',
        window.scrollY > 8
      );
    };

    onScroll();

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );
  }


  /* ---------- Mobile menu toggle ---------- */

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {

      const isOpen = nav.classList.toggle('is-open');

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    });
  }


  links.forEach(link => {

    link.addEventListener('click', () => {

      if (nav) {
        nav.classList.remove('is-open');
      }

      if (navToggle) {
        navToggle.setAttribute(
          'aria-expanded',
          'false'
        );
      }

    });

  });


  /* ---------- Sliding pill indicator ---------- */

  function moveIndicatorTo(link) {

    if (
      !link ||
      !navLinks ||
      !navIndicator ||
      window.innerWidth < 900
    ) {
      return;
    }

    const linkRect =
      link.getBoundingClientRect();

    const listRect =
      navLinks.getBoundingClientRect();

    navIndicator.style.width =
      `${linkRect.width}px`;

    navIndicator.style.transform =
      `translateX(${linkRect.left - listRect.left}px)`;
  }


  /* ---------- Scroll-spy ---------- */

  function setActiveLink(id) {

    links.forEach(link => {

      const isActive =
        link.getAttribute('href') === `#${id}`;

      link.classList.toggle(
        'is-active',
        isActive
      );

      if (isActive) {
        moveIndicatorTo(link);
      }

    });

  }


  if (sections.length > 0) {

    const spyObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {
              setActiveLink(entry.target.id);
            }

          });

        },

        {
          rootMargin: '-45% 0px -50% 0px',
          threshold: 0
        }

      );

    sections.forEach(section => {
      spyObserver.observe(section);
    });

  }


  /* ---------- Initialize nav indicator ---------- */

  window.addEventListener('load', () => {

    const activeLink =
      document.querySelector(
        '[data-nav-link].is-active'
      ) || links[0];

    moveIndicatorTo(activeLink);

  });


  window.addEventListener('resize', () => {

    const activeLink =
      document.querySelector(
        '[data-nav-link].is-active'
      );

    moveIndicatorTo(activeLink);

  });


  /* ---------- Scroll-reveal + highlight-sweep ---------- */

  const revealTargets =
    document.querySelectorAll(
      '.reveal, .highlight'
    );

  if (revealTargets.length > 0) {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'in-view'
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.2
        }

      );

    revealTargets.forEach(el => {
      revealObserver.observe(el);
    });

  }

});