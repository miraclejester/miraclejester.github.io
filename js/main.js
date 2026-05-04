/* ============================================================
   Jose Montenegro — Game Dev Portfolio
   js/main.js — vanilla JS: nav, lightbox, smooth scroll, lazy load
   ============================================================ */

(function () {
  'use strict';

  // ---- Mobile nav toggle ----
  var hamburger = document.querySelector('.nav__hamburger');
  var navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Lightbox ----
  // The lightbox image element starts with no src; JS sets it at open time.
  var lightbox      = document.getElementById('lightbox');
  var lightboxImg   = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', alt || '');
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
    if (lightboxImg) {
      lightboxImg.removeAttribute('src');
      lightboxImg.removeAttribute('alt');
    }
  }

  if (lightbox) {
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  // Attach to all screenshot thumbnails
  document.querySelectorAll('.screenshot-thumb').forEach(function (thumb) {
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('role', 'button');

    thumb.addEventListener('click', function () {
      var img = thumb.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });

    thumb.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var img = thumb.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      }
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        var navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
        ) || 64;
        var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- Active nav highlight on scroll ----
  var sections   = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle(
              'nav__link--active',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

})();
