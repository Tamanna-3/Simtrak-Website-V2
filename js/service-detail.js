(() => {
  "use strict";
  document.querySelectorAll('a[href*="1FAIpQLSc"]').forEach(link => { link.href = "https://docs.google.com/forms/d/1kBnEpLv2b-nOMh9k_-PNIQaXnUQmE8ydAgq4OlA5EJE/viewform"; });
  const stage = document.querySelector("[data-portfolio-stage]");
  const articleGrid = document.querySelector('.article-grid');
  if (articleGrid) articleGrid.insertAdjacentHTML('beforeend','<a class="article-card article-violet" data-category="Business Productivity" href="https://simtrak.in/strategies-for-improving-business-productivity/" target="_blank" rel="noopener noreferrer"><div class="article-card-visual"><span>Productivity</span><b>↗</b></div><div class="article-card-copy"><span>Business Productivity · 6 min read</span><h2>Strategies for Improving Business Productivity</h2><p>Practical ways to help teams work with greater focus, structure and efficiency.</p><b>Read article →</b></div></a><a class="article-card article-blue" data-category="Business Growth" href="https://simtrak.in/ways-to-expand-your-business/" target="_blank" rel="noopener noreferrer"><div class="article-card-visual"><span>Growth</span><b>＋</b></div><div class="article-card-copy"><span>Business Growth · 6 min read</span><h2>Ways to Expand Your Business</h2><p>Explore practical routes to reach new customers, markets and growth opportunities.</p><b>Read article →</b></div></a>');
  if (stage && !stage.children.length) {
    const designs = Array.from({length:10},(_,i)=>`assets/portfolio/graphic-design/design-${String(i+1).padStart(2,"0")}.png`);
    const storewise = Array.from({length:56},(_,i)=>`assets/portfolio/graphic-design/storewise/storewise-${String(i+1).padStart(2,"0")}.webp`);
    stage.innerHTML = [...designs,...storewise].map((src,index)=>`<figure class="portfolio-card"><img src="${src}" alt="Graphic design portfolio work ${index+1}"${index > 4 ? ' loading="lazy"' : ''}></figure>`).join('');
  }
  if (!stage) return;
  const cards = [...stage.querySelectorAll(".portfolio-card")];
  cards.forEach(card => {
    const poster = card.querySelector("img");
    const fitCard = () => {
      if (poster.naturalWidth && poster.naturalHeight) card.style.setProperty("--poster-ratio", String(poster.naturalWidth / poster.naturalHeight));
    };
    poster.complete ? fitCard() : poster.addEventListener("load", fitCard, { once: true });
  });
  let active = 0;
  const render = () => cards.forEach((card,index) => {
    let position = index - active;
    if (position > cards.length / 2) position -= cards.length;
    if (position < -cards.length / 2) position += cards.length;
    card.dataset.position = Math.abs(position) > 2 ? "hidden" : String(position);
  });
  const move = direction => { active = (active + direction + cards.length) % cards.length; render(); };
  document.querySelector("[data-portfolio-prev]")?.addEventListener("click",()=>move(-1));
  document.querySelector("[data-portfolio-next]")?.addEventListener("click",()=>move(1));
  stage.addEventListener("keydown",event=>{ if(event.key === "ArrowLeft") move(-1); if(event.key === "ArrowRight") move(1); });
  render();
})();
