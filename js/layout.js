(() => {
  "use strict";

  const path = location.pathname.split("/").pop() || "index.html";
  const isIndex = path === "index.html" || path === "";
  const to = (hash) => (isIndex ? hash : `index.html${hash}`);
  const arrow = '<svg class="i" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6l-6 6"/></svg>';
  const legal = ["privacy-policy.html", "terms-and-conditions.html", "cookie-policy.html", "404.html"];
  const blogPage = path === "blogs.html" || path === "blog.html" || path.startsWith("blog-");
  const servicePage = !isIndex && path !== "careers.html" && !blogPage && !legal.includes(path) && !path.startsWith("career-");

  const items = [
    [isIndex ? "#home" : "index.html", "Home", false],
    [to("#about"), "About", false],
    [to("#services"), "Our Services", servicePage],
    ["blogs.html", "Blogs", blogPage],
    ["careers.html", "Careers", path === "careers.html" || path.startsWith("career-")],
    [to("#contact"), "Contact Us", false]
  ];
  const links = items.map(([href, label, active]) => `<a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`).join("");

  /* NAVBAR */
  const header = document.querySelector("[data-site-header]") || document.querySelector(".site-header");
  if (header) {
    header.classList.add("site-header");
    header.id = header.id || "top";
    header.innerHTML = `
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="${isIndex ? "#home" : "index.html"}" aria-label="Simtrak Solutions home"><img src="assets/logo/simtrak-logo.png" alt="Simtrak Solutions" width="300" height="95"></a>
        <div class="desktop-nav">${links}</div>
        <a class="button button-primary nav-cta" href="${to("#contact")}"><span>Get A Quote</span>${arrow}</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation"><span></span><span></span><span></span></button>
      </nav>
      <div class="nav-progress" aria-hidden="true"><span></span></div>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true"><div class="mobile-menu-inner">${links}<a class="mobile-quote" href="${to("#contact")}">Get A Quote</a></div></div>`;
  }

  /* FOOTER */
  const footer = document.querySelector("[data-site-footer]") || document.querySelector(".site-footer");
  if (footer) {
    footer.classList.add("site-footer");
    const pin = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></svg>';
    footer.innerHTML = `
      <div class="footer-main">
        <div class="footer-brand"><a href="${isIndex ? "#home" : "index.html"}" aria-label="Simtrak Solutions home"><img src="assets/logo/simtrak-logo-white.png" alt="Simtrak Solutions" width="2048" height="682" loading="lazy"></a><p>Professional business services supporting operations, people, branding, marketing and growth.</p><div class="footer-address">${pin}<span>Garg House, 11A/1D, E Topsia Road, Mirania Gardens, East Topsia, Kolkata, West Bengal 700046</span></div></div>
        <div class="footer-column"><span class="footer-title">Explore</span><div class="footer-links footer-explore-links"><a href="${isIndex ? "#home" : "index.html"}">Home</a><a href="${to("#about")}">About Simtrak</a><a href="${to("#services")}">Our Services</a><a href="blogs.html">Blogs</a><a href="careers.html">Careers</a><a href="${to("#contact")}">Contact Us</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-and-conditions.html">Terms and Conditions</a><a href="cookie-policy.html">Cookie Policy</a><a href="assets/documents/simtrak-solutions-brochure.pdf" download>Company Brochure</a></div></div>
        <div class="footer-column"><span class="footer-title">Services</span><div class="footer-links footer-service-links"><a href="recruitment-management.html">Recruitment Management</a><a href="graphic-designing.html">Graphic Designing</a><a href="task-management.html">Task Management</a><a href="social-media-management.html">Social Media Management</a><a href="${to("#services")}">Lead Generation</a><a href="webinar-management.html">Webinar Management</a><a href="${to("#services")}">Customer Feedback</a><a href="${to("#services")}">Web Development</a><a href="${to("#services")}">Market Research</a><a href="social-media-management.html">Digital Marketing</a></div></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Simtrak Solutions. All rights reserved.</span><div class="footer-meta"><span>Established in 2021</span><div class="footer-socials">
        <a href="https://www.instagram.com/simtraksolutions" target="_blank" rel="noopener noreferrer" aria-label="Simtrak on Instagram"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm6-3.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/></svg></a>
        <a href="https://www.linkedin.com/company/simtraksolutions/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="Simtrak on LinkedIn"><svg viewBox="0 0 24 24"><path d="M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 10h4v11H3Zm7 0h4v1.6c1-1.3 2.3-2 4-2 3 0 4 2 4 5.3V21h-4v-5.5c0-1.5-.5-2.5-1.9-2.5-1.5 0-2.1 1.1-2.1 2.8V21h-4Z"/></svg></a>
        <a href="https://api.whatsapp.com/send/?phone=919555299371" target="_blank" rel="noopener noreferrer" aria-label="Chat with Simtrak on WhatsApp"><svg viewBox="0 0 24 24"><path d="M20.5 3.5A11 11 0 0 0 3.2 16.8L2 22l5.3-1.2A11 11 0 0 0 20.5 3.5Zm-8.5 16a8.5 8.5 0 0 1-4.3-1.2l-.3-.2-3.1.7.7-3-.2-.3A8.5 8.5 0 1 1 12 19.5Zm4.7-6.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.2l-.8 1c-.1.2-.3.2-.6.1-1.5-.7-2.5-1.4-3.5-3.1-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9 2.1.9 2.9 1 3.9.8 1.2-.2 1.6-1 1.8-1.9.2-.8.2-1.5.1-1.6-.2-.2-.4-.3-.7-.4Z"/></svg></a>
      </div></div></div>`;
  }

  /* MOBILE MENU */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.classList.toggle("active", open);
      menu.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      menu.setAttribute("aria-hidden", String(!open));
      if (open) header.classList.remove("is-hidden");
    };
    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); toggle.focus(); } });
    window.addEventListener("resize", () => { if (window.innerWidth > 980 && menu.classList.contains("open")) setOpen(false); });
  }

  /* NAVBAR SCROLL BEHAVIOUR + SCROLL CARD PROGRESS */
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bar = header && header.querySelector(".nav-progress span");
  const cards = [...document.querySelectorAll("[data-xp], .xp")];
  let lastY = window.scrollY;
  let queued = false;

  const update = () => {
    queued = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (header) {
      header.classList.toggle("scrolled", y > 24);
      const menuOpen = menu && menu.classList.contains("open");
      if (!menuOpen) {
        if (y > lastY + 6 && y > 160) header.classList.add("is-hidden");
        else if (y < lastY - 6 || y < 160) header.classList.remove("is-hidden");
      }
    }
    if (bar) bar.style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh))})`;
    cards.forEach((section) => {
      const stage = section.querySelector(".xp-stage");
      if (!stage) return;
      const rect = section.getBoundingClientRect();
      const raw = clamp(-rect.top / Math.max(1, rect.height - vh));
      const p = reduce ? 1 : ease(clamp(raw / 0.5));
      stage.style.setProperty("--p", p.toFixed(4));
    });
    lastY = y;
  };
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
