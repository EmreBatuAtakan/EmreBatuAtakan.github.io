/* Theme toggle, resume viewer, and gallery lightbox. No dependencies. */

(function () {
  'use strict';

  // --- theme -----------------------------------------------------
  // No stored value means "follow the system"; the toggle writes an
  // explicit choice that then wins in both directions.

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // --- resume viewer ---------------------------------------------

  var resumeToggle = document.getElementById('resume-toggle');
  var resumeViewer = document.getElementById('resume-viewer');

  if (resumeToggle && resumeViewer) {
    resumeToggle.addEventListener('click', function () {
      var open = resumeViewer.hasAttribute('hidden');
      if (open) {
        resumeViewer.removeAttribute('hidden');
      } else {
        resumeViewer.setAttribute('hidden', '');
      }
      resumeToggle.setAttribute('aria-expanded', String(open));
      resumeToggle.textContent = open ? 'Hide resume' : 'View inline';
    });
  }

  // --- gallery lightbox ------------------------------------------

  var gallery = document.getElementById('gallery');
  var lightbox = document.getElementById('lightbox');

  if (gallery && lightbox) {
    var lightboxImg = document.getElementById('lightbox-img');
    var shots = Array.prototype.slice.call(gallery.querySelectorAll('.shot img'));
    var index = 0;
    var lastFocused = null;

    function show(i) {
      index = (i + shots.length) % shots.length;
      lightboxImg.src = shots[index].src;
      lightboxImg.alt = shots[index].alt;
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    }

    function close() {
      lightbox.setAttribute('hidden', '');
      lightboxImg.src = '';
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    gallery.addEventListener('click', function (event) {
      var button = event.target.closest('.shot');
      if (!button) return;
      open(shots.indexOf(button.querySelector('img')));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(index - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(index + 1); });

    // Clicking the backdrop (but not the image or arrows) closes it.
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', function (event) {
      if (lightbox.hasAttribute('hidden')) return;
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') show(index - 1);
      else if (event.key === 'ArrowRight') show(index + 1);
    });
  }
})();
