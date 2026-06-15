const PASS = 'admin123';
const loginBtn = document.getElementById('login-btn');
const panel = document.getElementById('panel');
const loginDiv = document.getElementById('login');

function $(id){return document.getElementById(id)}

loginBtn.addEventListener('click',()=>{
  const val = $('admin-pass').value;
  if(val === PASS){
    loginDiv.style.display='none';
    panel.style.display='block';
    loadValues();
  } else {
    alert('စကားဝှက် မမှန်ပါ');
  }
});

function loadValues(){
  ['chicken_large','chicken_medium','chicken_small','duck_large','duck_medium','duck_small','century_per_egg','century_per_box','market_price_per_kg','duck_20kg','duck_21kg','duck_23kg'].forEach(k=>{
    const v = localStorage.getItem(k);
    if(v!==null) $(k).value = v;
  });
}

document.getElementById('save-btn').addEventListener('click',()=>{
  ['chicken_large','chicken_medium','chicken_small','duck_large','duck_medium','duck_small','century_per_egg','century_per_box','market_price_per_kg','duck_20kg','duck_21kg','duck_23kg'].forEach(k=>{
    const el = $(k);
    if(el){
      localStorage.setItem(k, el.value);
    }
  });
  document.getElementById('msg').textContent='Saved';
  setTimeout(()=>document.getElementById('msg').textContent='',1500);
});

document.getElementById('logout-btn').addEventListener('click',()=>{
  panel.style.display='none';
  loginDiv.style.display='block';
  $('admin-pass').value='';
});
