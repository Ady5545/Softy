const flowerColors = ['#f72585','#ff5b9a','#d81b60','#ff8fbd','#c2185b','#f58bb6'];
const captions = [
  'picked especially for you',
  'this one felt very you',
  'a tiny pink explosion of happiness',
  'freshly assembled from the flower department',
  'no two bouquets are allowed to match',
  'okay, this one is ridiculously pretty'
];

function makeFlower(x, y, scale, tilt, color, delay){
  const el=document.createElement('div');
  el.className='flower';
  el.style.left=x+'%';
  el.style.bottom=y+'px';
  el.style.setProperty('--tilt',tilt+'deg');
  el.style.setProperty('--flower',color);
  el.style.transform='scale('+scale+')';
  el.style.animationDelay=delay+'s';
  el.innerHTML='<div class="stem"></div><div class="flower-head"><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="petal"></i><b class="center"></b></div>';
  return el;
}

function bouquet(targetId, compact=false){
  const target=document.getElementById(targetId);
  target.innerHTML='';
  const count=compact?5:9;
  const positions=Array.from({length:count},(_,i)=>({
    x: compact ? 20+i*15 : 18+Math.random()*64,
    y: compact ? 25+Math.random()*35 : 20+Math.random()*35,
    scale: compact ? .58+Math.random()*.22 : .72+Math.random()*.45,
    tilt: -18+Math.random()*36,
    color: flowerColors[Math.floor(Math.random()*flowerColors.length)],
    delay:(Math.random()*-4).toFixed(2)
  })).sort((a,b)=>a.y-b.y);
  positions.forEach(p=>target.appendChild(makeFlower(p.x,p.y,p.scale,p.tilt,p.color,p.delay)));
  if(!compact){
    const wrap=document.createElement('div');
    wrap.className='wrapped';
    wrap.innerHTML='<div class="ribbon"></div>';
    target.appendChild(wrap);
    document.getElementById('bouquetCaption').textContent=captions[Math.floor(Math.random()*captions.length)];
  }
}

bouquet('heroBouquet',true);
bouquet('bouquetCanvas');

document.getElementById('newBouquet').addEventListener('click',()=>bouquet('bouquetCanvas'));
document.getElementById('surpriseBtn').addEventListener('click',()=>{
  const messages=['you found the secret-ish button ♡','yes, I made the flowers random on purpose','this website is going to get much more ridiculous','you are officially allowed one tiny smile','there are definitely more surprises coming'];
  showMessage(messages[Math.floor(Math.random()*messages.length)]);
});

const jarMessages=[
  'I hope something unexpectedly nice happens to you today.',
  'Tiny reminder: you are very, very easy to be proud of.',
  'If this message found you at the wrong time, come back later. I saved another one.',
  'Drink some water. Then continue being wonderful.',
  'You have permission to have a slow day.',
  'Somewhere on this website there is probably another thing I forgot to tell you.',
  'This is your official reminder that you deserve soft days too.'
];

function showMessage(text){
  document.getElementById('modalMessage').textContent=text;
  openModal('messageModal');
}
document.getElementById('messageButton').addEventListener('click',()=>showMessage(jarMessages[Math.floor(Math.random()*jarMessages.length)]));

function openModal(id){const m=document.getElementById(id);m.classList.add('open');m.setAttribute('aria-hidden','false')}
function closeModal(id){const m=document.getElementById(id);m.classList.remove('open');m.setAttribute('aria-hidden','true')}
document.getElementById('letterButton').addEventListener('click',()=>openModal('letterModal'));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close==='letter'?'letterModal':'messageModal')));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal('letterModal');closeModal('messageModal')}});

const openWhen={
  bad:'Hey. You do not have to fix the entire day right now. Take one small breath, do one small thing, and be gentle with yourself. Tomorrow gets its own chance.',
  happy:'YES. Keep this exact energy. Go enjoy your happy little moment and do not let yourself minimise it.',
  miss:'Then this is your tiny digital hug. The rest of this page is full of things waiting to remind you of good moments.',
  random:'Excellent reason. No reason is sometimes the best reason. Here is a completely unnecessary amount of affection in website form: ♡'
};
document.querySelectorAll('.open-card').forEach(card=>card.addEventListener('click',()=>showMessage(openWhen[card.dataset.open])));

function fallingPetal(){
  const p=document.createElement('span');
  p.className='petal-float';
  p.textContent=['♥','♡','✦','·'][Math.floor(Math.random()*4)];
  p.style.left=Math.random()*100+'vw';
  p.style.fontSize=(10+Math.random()*14)+'px';
  p.style.animationDuration=(7+Math.random()*7)+'s';
  document.getElementById('petals').appendChild(p);
  setTimeout(()=>p.remove(),15000);
}
setInterval(fallingPetal,900);
for(let i=0;i<4;i++) setTimeout(fallingPetal,i*500);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.animationPlayState='running';observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{el.style.animationPlayState='paused';observer.observe(el)});