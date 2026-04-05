(function () {
  document.documentElement.classList.add('js');

  var header = document.getElementById('site-header');
  if (!header) return;

  var nav = header.querySelector('nav');
  var menu = document.getElementById('nav-menu');
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var brand = document.getElementById('nav-brand');
    var brandSub = document.querySelector('.nav-brand-sub');
    var badge = document.getElementById('nav-badge');
    if (!menu) return;
    if (y > 60) {
      header.classList.add('bg-white/95', 'shadow-md', 'backdrop-blur-md');
      header.classList.remove('bg-transparent');
      if (nav) nav.classList.add('md:py-2');
      menu.querySelectorAll('.nav-link').forEach(function (a) {
        a.classList.remove('text-white', 'hover:text-orange-200', 'hover:bg-white/10');
        a.classList.add('text-slate-700', 'hover:bg-slate-100', 'hover:text-brand-orange');
      });
      if (brand) {
        brand.classList.remove('text-white');
        brand.classList.add('text-brand-blue-dark');
      }
      if (brandSub) {
        brandSub.classList.remove('text-white/80');
        brandSub.classList.add('text-slate-500');
      }
      if (badge) {
        badge.className =
          'flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange font-bold text-white shadow-md ring-0 transition';
      }
    } else {
      header.classList.remove('bg-white/95', 'shadow-md', 'backdrop-blur-md');
      header.classList.add('bg-transparent');
      if (nav) nav.classList.remove('md:py-2');
      menu.querySelectorAll('.nav-link').forEach(function (a) {
        a.classList.add('text-white', 'hover:text-orange-200', 'hover:bg-white/10');
        a.classList.remove('text-slate-700', 'hover:bg-slate-100', 'hover:text-brand-orange');
      });
      if (brand) {
        brand.classList.add('text-white');
        brand.classList.remove('text-brand-blue-dark');
      }
      if (brandSub) {
        brandSub.classList.add('text-white/80');
        brandSub.classList.remove('text-slate-500');
      }
      if (badge) {
        badge.className =
          'flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 font-bold text-white shadow ring-1 ring-white/30 transition';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  reveals.forEach(function (el) {
    obs.observe(el);
  });

  /* Service Booking timeline */
  var bookingSection = document.getElementById('booking-process');
  if (bookingSection) {
    var timelineObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            bookingSection.classList.add('is-timeline-visible');
            timelineObs.unobserve(bookingSection);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    timelineObs.observe(bookingSection);
  }

  /* Fleet slider */
  var slides = document.querySelectorAll('.fleet-slide');
  var captions = [
    'Premium sedans for corporate travel',
    'Spacious SUVs for teams & executives',
    'Efficient hatchbacks for city routes',
  ];
  var captionEl = document.getElementById('fleet-caption');
  var dotsWrap = document.getElementById('fleet-dots');
  var idx = 0;
  var timer;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (s, j) {
      s.classList.toggle('opacity-100', j === idx);
      s.classList.toggle('opacity-0', j !== idx);
    });
    if (captionEl) captionEl.textContent = captions[idx];
    if (dotsWrap) {
      dotsWrap.querySelectorAll('button').forEach(function (b, j) {
        b.classList.toggle('bg-brand-orange', j === idx);
        b.classList.toggle('bg-white/40', j !== idx);
      });
    }
  }

  if (slides.length && dotsWrap) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className =
        'h-2.5 w-2.5 rounded-full bg-white/40 transition-all hover:bg-white/60' + (i === 0 ? ' bg-brand-orange w-6' : '');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', function () {
        show(i);
        resetTimer();
      });
      dotsWrap.appendChild(b);
    });

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        show(idx + 1);
      }, 5500);
    }

    var fleetPrev = document.getElementById('fleet-prev');
    var fleetNext = document.getElementById('fleet-next');
    if (fleetPrev) {
      fleetPrev.addEventListener('click', function () {
        show(idx - 1);
        resetTimer();
      });
    }
    if (fleetNext) {
      fleetNext.addEventListener('click', function () {
        show(idx + 1);
        resetTimer();
      });
    }
    resetTimer();
  }

  /* Contact form validation */
  var form = document.getElementById('contact-form');
  if (form) {
    function showErr(id, msg) {
      var p = form.querySelector('[data-error-for="' + id + '"]');
      var input = document.getElementById(id);
      if (p) {
        p.textContent = msg || '';
        p.classList.toggle('hidden', !msg);
      }
      if (input) input.classList.toggle('border-red-400', !!msg);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successEl = document.getElementById('form-success');
      if (successEl) successEl.classList.add('hidden');
      var name = document.getElementById('cf-name');
      var email = document.getElementById('cf-email');
      var phone = document.getElementById('cf-phone');
      var message = document.getElementById('cf-message');
      var ok = true;

      showErr('cf-name', '');
      showErr('cf-email', '');
      showErr('cf-phone', '');
      showErr('cf-message', '');

      if (!name.value.trim() || name.value.trim().length < 2) {
        showErr('cf-name', 'Please enter your name (at least 2 characters).');
        ok = false;
      }
      var em = email.value.trim();
      if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        showErr('cf-email', 'Please enter a valid email address.');
        ok = false;
      }
      if (phone.value.trim() && !/^[\d+\s-]{10,}$/.test(phone.value.trim())) {
        showErr('cf-phone', 'Enter a valid phone number or leave blank.');
        ok = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        showErr('cf-message', 'Please enter a message (at least 10 characters).');
        ok = false;
      }

      if (ok && successEl) {
        successEl.classList.remove('hidden');
        form.reset();
      }
    });
  }

  document.querySelectorAll('#hero .reveal').forEach(function (el) {
    el.classList.add('visible');
  });
})();
