// Helpers
function readPrice(key){
  const v=localStorage.getItem(key);
  if(!v || v==='') return '— ကျပ်';
  return Number(v).toLocaleString('en-US') + ' ကျပ်';
}

function displayRetail(){
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key=el.getAttribute('data-key');
    el.textContent = readPrice(key);
  });
}

function displayWholesale(){
  const market=localStorage.getItem('market_price_per_kg');
  document.getElementById('market-price').textContent = market? Number(market).toLocaleString('en-US')+' ကျပ်' : '— ကျပ်';
  ['duck-20kg','duck-21kg','duck-23kg'].forEach(id=>{
    const key = id.replace(/-/g,'_');
    const v = localStorage.getItem(key);
    document.getElementById(id).textContent = v? Number(v).toLocaleString('en-US')+' ကျပ်' : '— ကျပ်';
  });
}

// Calculator
document.getElementById('calc-btn').addEventListener('click',()=>{
  const totalWeight=parseFloat(document.getElementById('calc-weight').value)||0;
  const cards=parseInt(document.getElementById('calc-cards').value)||0;
  const size = document.querySelector('input[name=cardSize]:checked').value;
  const cardWeight = parseFloat(size);
  const market = parseFloat(localStorage.getItem('market_price_per_kg'))||0;

  let remainder = totalWeight - (cardWeight * cards);
  if(remainder < 0) remainder = 0;
  const totalCost = remainder * market;

  const totalCostDisplay = totalCost>0 ? Number(totalCost).toLocaleString('en-US')+' ကျပ်' : '— ကျပ်';
  document.getElementById('total-cost').textContent = totalCostDisplay;

  const eggs = 30 * cards;
  const avg = (eggs>0) ? (totalCost / eggs) : 0;
  document.getElementById('avg-per-egg').textContent = (eggs>0 && avg>0) ? Number(avg).toFixed(0)+' ကျပ်' : '— ကျပ်';
});

// Initial render
displayRetail();
displayWholesale();

// Observe storage changes (in case admin updates in another tab)
window.addEventListener('storage',()=>{ displayRetail(); displayWholesale(); });

// Hide nav after hero section is scrolled past
const nav = document.querySelector('.tabs');
const hero = document.querySelector('.hero-section');
function updateNavVisibility(){
  if(!nav || !hero) return;
  const heroBottom = hero.getBoundingClientRect().bottom;
  if(heroBottom <= 0) nav.classList.add('hidden');
  else nav.classList.remove('hidden');
}
window.addEventListener('scroll', updateNavVisibility);
window.addEventListener('resize', updateNavVisibility);
updateNavVisibility();
