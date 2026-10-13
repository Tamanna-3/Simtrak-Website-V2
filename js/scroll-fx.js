(() => {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  /* Split headings into words for a masked rise animation */
  document.querySelectorAll("[data-split]").forEach((el) => {
    const nodes = [...el.childNodes];
    el.textContent = "";
    let i = 0;
    const addWords = (text, target) => {
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { target.appendChild(document.createTextNode(" ")); return; }
        const w = document.createElement("span");
        w.className = "w";
        const inner = document.createElement("span");
        inner.style.setProperty("--i", i++);
        inner.textContent = part;
        w.appendChild(inner);
        target.appendChild(w);
      });
    };
    nodes.forEach((node) => {
      if (node.nodeType === 3) addWords(node.textContent, el);
      else if (node.nodeName === "BR") el.appendChild(node.cloneNode());
      else if (node.nodeType === 1) {
        const clone = node.cloneNode(false);
        addWords(node.textContent, clone);
        el.appendChild(clone);
      }
    });
    el.classList.add("split");
  });

  /* Reveal on view */
  const revealTargets = document.querySelectorAll(".reveal, .split");
  if (reduce || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealTargets.forEach((el) => io.observe(el));
  }

  /* Stagger children of grids */
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    [...group.children].forEach((child, idx) => child.style.setProperty("--d", `${idx * 90}ms`));
  });

  /* Counters */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    if (reduce) { el.textContent = target; return; }
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const t = clamp((now - start) / dur);
      el.textContent = Math.round(ease(t) * target);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runCounter(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  } else counters.forEach(runCounter);

  /* Hero parallax */
  const heroImg = document.querySelector(".hero-visual > img");
  if (heroImg && !reduce) {
    let q = false;
    window.addEventListener("scroll", () => {
      if (q) return; q = true;
      requestAnimationFrame(() => { q = false; if (window.scrollY < window.innerHeight) heroImg.style.translate = `0 ${window.scrollY * -0.06}px`; });
    }, { passive: true });
  }

  /* Pointer tilt for hero visual */
  const visual = document.querySelector(".hero-visual");
  if (visual && !reduce && window.matchMedia("(pointer: fine)").matches) {
    const chips = visual.querySelectorAll(".chip");
    window.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      chips.forEach((chip, i) => {
        const depth = (i % 2 ? 16 : 26);
        chip.style.setProperty("--px", `${x * depth}px`); chip.style.setProperty("--py", `${y * depth}px`);
      });
    }, { passive: true });
  }
})();
