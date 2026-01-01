/* ============================================================
   NUMBER INCRESE LOGIC
   ============================================================ */
function parseStatValue(raw) {
  const number = parseFloat(raw.replace(/[^0-9.]/g, ""));
  const suffix = raw.replace(/[0-9.,]/g, "").trim();
  return { number, suffix };
}

function animateCounter(el, target, duration = 1500, onComplete) {
  let startTime = null;

  function tick(now) {
    if (!startTime) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);

    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentValue = Math.floor(eased * target);
    
    el.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  }

  requestAnimationFrame(tick);
}

let statsAnimated = false;

function initStatsAnimation() {
  if (statsAnimated) return;

  const section = document.getElementById("stats");
  if (!section) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;

      statsAnimated = true;
      observer.disconnect();

      const items = section.querySelectorAll(".stat-item");

      items.forEach((item, index) => {
        const valueEl = item.querySelector(".stat-value");
        const labelEl = item.querySelector(".stat-label");
        const { number, suffix } = parseStatValue(valueEl.dataset.value);

        if (prefersReducedMotion) {
          valueEl.textContent = number.toLocaleString() + suffix;
          labelEl.classList.remove("opacity-0", "translate-y-2");
          return;
        }

        setTimeout(() => {
          animateCounter(valueEl, number, 2000, () => {
            valueEl.innerHTML = `${number.toLocaleString()}<span class="opacity-0 transition-opacity duration-300">${suffix}</span>`;
            requestAnimationFrame(() => {
              valueEl.querySelector('span')?.classList.remove('opacity-0');
            });
          });
          
          setTimeout(() => {
            labelEl.classList.remove("opacity-0", "translate-y-2");
          }, 300);
        }, index * 150);
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}


/* ============================================================
   TYPEWRITER LOGIC
   ============================================================ */

function initTypewriter(options) {
  const {
    target,
    phrases = [],
    loop = true,
    typeSpeed = 65,
    eraseSpeed = 35,
    holdAfterType = 900,
    holdAfterErase = 400
  } = options;

  const container = document.querySelector(target);
  if (!container || !phrases.length) return;

  const textEl = container.querySelector(".type-text");
  const cursorEl = container.querySelector(".type-cursor");

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reduced motion: static random phrase
  if (prefersReducedMotion) {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    textEl.textContent = phrases[randomIndex];
    if (cursorEl) cursorEl.style.display = "none";
    return;
  }

  const STATE = {
    TYPING: "typing",
    HOLD_AFTER_TYPE: "hold_after_type",
    DELETING: "deleting",
    HOLD_AFTER_DELETE: "hold_after_delete"
  };

  let state = STATE.TYPING;
  let phraseIndex = 0;
  let charIndex = 0;
  let timeoutId = null;
  let pauseRequested = false;

  let current = phrases[phraseIndex];
  let next = phrases[(phraseIndex + 1) % phrases.length];

  textEl.textContent = "";

  function clearTimer() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function schedule(fn, delay) {
    clearTimer();
    timeoutId = setTimeout(fn, delay);
  }

  function commonPrefixLength(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  }

  function run() {

    switch (state) {
      case STATE.TYPING: {
        textEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          state = STATE.HOLD_AFTER_TYPE;
          schedule(run, holdAfterType);
        } else {
          schedule(run, typeSpeed);
        }
        break;
      }

      case STATE.HOLD_AFTER_TYPE:
        if (pauseRequested) return;
        state = STATE.DELETING;
        run();
        break;

      case STATE.DELETING: {
        const common = commonPrefixLength(current, next);

        if (charIndex > common) {
          charIndex--;
          textEl.textContent = current.slice(0, charIndex);
          schedule(run, eraseSpeed);
        } else {
          state = STATE.HOLD_AFTER_DELETE;
          schedule(run, holdAfterErase);
        }
        break;
      }

      case STATE.HOLD_AFTER_DELETE:
        phraseIndex = (phraseIndex + 1) % phrases.length;
        current = phrases[phraseIndex];
        next = phrases[(phraseIndex + 1) % phrases.length];
        state = STATE.TYPING;
        run();
        break;
    }
  }

  function setPause(val) {
    pauseRequested = val;
    if (!val) run();
  }

  // Desktop
  container.addEventListener("mouseenter", () => setPause(true));
  container.addEventListener("mouseleave", () => setPause(false));
  container.addEventListener("focusin", () => setPause(true));
  container.addEventListener("focusout", () => setPause(false));

  // Mobile: pause on anywhere touch why->(Long-press = text selection / copy menu | and text hides below finger)
  document.addEventListener("touchstart", () => setPause(true), { passive: true });
  document.addEventListener("touchend", () => setPause(false));
  run();
}

window.initTypewriter = initTypewriter;

window.initStatsAnimation = initStatsAnimation;