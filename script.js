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

const moodLines=[
  'soft and sunny ☼',
  'pink-cloud kind of day ♡',
  'tiny bit chaotic, still cute ✦',
  'quietly doing your best',
  'main-character-with-a-snack energy',
  'today deserves a little sparkle'
];
let moodIndex=Math.floor(Math.random()*moodLines.length);
const moodButton=document.getElementById('moodButton');
const moodText=document.getElementById('moodText');
moodButton.addEventListener('click',()=>{
  moodIndex=(moodIndex+1)%moodLines.length;
  moodText.textContent=moodLines[moodIndex];
});

document.getElementById('wishButton').addEventListener('click',(event)=>{
  for(let i=0;i<7;i++){
    const star=document.createElement('span');
    star.className='wish-star';
    star.textContent=['✦','·','♡'][Math.floor(Math.random()*3)];
    star.style.left=(event.clientX-6+(Math.random()*34-17))+'px';
    star.style.top=(event.clientY-6+(Math.random()*24-12))+'px';
    star.style.setProperty('--dx',(Math.random()*160-80)+'px');
    star.style.animationDelay=(Math.random()*.12)+'s';
    document.body.appendChild(star);
    setTimeout(()=>star.remove(),2100);
  }
});

const visitKey='softy-surprises-opened';
let visitCount=Number(localStorage.getItem(visitKey)||0);
function bumpSurpriseCount(){
  visitCount++;
  localStorage.setItem(visitKey,String(visitCount));
  const el=document.getElementById('visitCount');
  if(el) el.textContent=visitCount;
}
document.getElementById('visitCount').textContent=visitCount;
document.querySelectorAll('#surpriseBtn,#messageButton,.open-card,#newBouquet,#letterButton').forEach(el=>{
  el.addEventListener('click',bumpSurpriseCount);
});


/* Scroll-driven editorial sequence */
const progressBar=document.getElementById('scrollProgress');
const story=document.querySelector('.scroll-story');
const storyFlower=document.querySelector('.story-flower');
const orbitOne=document.querySelector('.orbit-one');
const orbitTwo=document.querySelector('.orbit-two');
const storyCopy=document.querySelector('.story-copy');
const storyTitle=document.getElementById('storyTitle');
const storyText=document.getElementById('storyText');
const storyNumber=document.getElementById('storyNumber');
const storySteps=[
  ['It starts<br><em>with a feeling.</em>','Scroll slowly. The page will carry the story forward with you.'],
  ['Then it becomes<br><em>a little memory.</em>','Small moments deserve a place that feels as considered as the memories themselves.'],
  ['Then a collection of<br><em>little things.</em>','Words, photographs, music and details — all in one quiet corner.'],
  ['And it keeps becoming<br><em>more yours.</em>','This is only the beginning.']
];
function clamp(v,a=0,b=1){return Math.min(b,Math.max(a,v))}
function updateScrollMotion(){
  const y=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progressBar.style.width=(max?y/max*100:0)+'%';
  document.querySelector('.topbar').classList.toggle('scrolled',y>80);
  if(story){
    const rect=story.getBoundingClientRect();
    const p=clamp(-rect.top/(rect.height-window.innerHeight));
    const eased=p*p*(3-2*p);
    const step=Math.min(3,Math.floor(p*4));
    const local=(p*4)%1;
    storyFlower.style.transform='translate(-50%,-50%) rotate('+(p*280)+'deg) scale('+(1+.45*Math.sin(p*Math.PI))+')';
    storyFlower.style.left=(50+Math.sin(p*Math.PI*2)*23)+'%';
    storyFlower.style.top=(50+Math.cos(p*Math.PI*2)*13)+'%';
    orbitOne.style.transform='translate(-50%,-50%) rotate('+(p*180)+'deg) scale('+(1+.22*p)+')';
    orbitTwo.style.transform='translate(-50%,-50%) rotate('+(-p*120)+'deg) scale('+(1-.18*p)+')';
    storyCopy.style.transform='translateY('+(Math.sin(p*Math.PI*4)*14)+'px)';
    storyCopy.style.opacity=String(.72+.28*Math.sin(p*Math.PI));
    if(p>.03){
      storyTitle.innerHTML=storySteps[step][0];
      storyText.textContent=storySteps[step][1];
      storyNumber.textContent=String(step+1).padStart(2,'0');
    }
  }
}
let scrollTick=false;
window.addEventListener('scroll',()=>{if(!scrollTick){requestAnimationFrame(()=>{updateScrollMotion();scrollTick=false});scrollTick=true}},{passive:true});
updateScrollMotion();

/* Subtle pointer light — restrained, not game-like */
const cursorGlow=document.getElementById('cursorGlow');
if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{cursorGlow.style.left=e.clientX+'px';cursorGlow.style.top=e.clientY+'px';cursorGlow.style.opacity='.75'});
}

/* Photo archive + music collection */
const photoNames=["photo-001","photo-002","photo-003","photo-004","photo-005","photo-006","photo-007","photo-008","photo-009","photo-010","photo-011","photo-012","photo-013","photo-014","photo-015","photo-016","photo-017","photo-018","photo-019","photo-020","photo-021","photo-022","photo-023","photo-024","photo-025","photo-026","photo-027","photo-028","photo-029","photo-030","photo-031","photo-032","photo-033","photo-034","photo-035","photo-036","photo-037","photo-038","photo-039","photo-040","photo-041","photo-042","photo-043","photo-044","photo-045","photo-046","photo-047","photo-048","photo-049","photo-050","photo-051","photo-052","photo-053","photo-054","photo-055","photo-056","photo-057","photo-058","photo-059","photo-060","photo-061","photo-062","photo-063","photo-064","photo-065","photo-066","photo-067","photo-068","photo-069","photo-070","photo-071","photo-072","photo-073","photo-074","photo-075","photo-076","photo-077","photo-078","photo-079","photo-080","photo-081","photo-082","photo-083","photo-084","photo-085","photo-086","photo-087","photo-088","photo-089","photo-090","photo-091"];
const memoryGrid=document.getElementById('memoryGrid');
if(memoryGrid){
  memoryGrid.innerHTML='';
  photoNames.forEach((name,index)=>{
    const card=document.createElement('figure');
    card.className='memory-photo reveal';
    card.innerHTML='<img src="assets/photos/'+name+'.jpg" alt="Memory '+(index+1)+'" loading="lazy"><figcaption>'+String(index+1).padStart(2,'0')+'</figcaption>';
    memoryGrid.appendChild(card);
  });
}

const playlist=[{"title":"Until I Found You — Solo","src":"assets/music/until-i-found-you-solo.mp3"},{"title":"Until I Found You — Em Beihold Version","src":"assets/music/until-i-found-you-em-beihold-version.mp3"},{"title":"Here With Me","src":"assets/music/here-with-me.mp3"},{"title":"Young Dumb & Broke","src":"assets/music/young-dumb-broke.mp3"},{"title":"With You — AP Dhillon","src":"assets/music/with-you-ap-dhillon.mp3"},{"title":"I Wanna Be Yours","src":"assets/music/i-wanna-be-yours.mp3"},{"title":"Die For You","src":"assets/music/die-for-you.mp3"},{"title":"I Like the Way You Kiss Me — Sped Up","src":"assets/music/i-like-the-way-you-kiss-me-sped-up.mp3"},{"title":"Me Gustas Tu — Sped Up","src":"assets/music/me-gustas-tu-sped-up.mp3"},{"title":"Good Luck, Charm","src":"assets/music/good-luck-charm.mp3"},{"title":"Just the Two of Us","src":"assets/music/just-the-two-of-us.mp3"},{"title":"Put Your Head on My Shoulder","src":"assets/music/put-your-head-on-my-shoulder.mp3"},{"title":"We Fell in Love in October","src":"assets/music/we-fell-in-love-in-october.mp3"},{"title":"Double Take","src":"assets/music/double-take.mp3"},{"title":"Jo Tum Mere Ho","src":"assets/music/jo-tum-mere-ho.mp3"},{"title":"Teenage Dream","src":"assets/music/teenage-dream.mp3"},{"title":"Make You Mine","src":"assets/music/make-you-mine.mp3"},{"title":"This Is What Autumn Feels Like","src":"assets/music/this-is-what-autumn-feels-like.mp3"},{"title":"Die With A Smile","src":"assets/music/die-with-a-smile.mp3"},{"title":"Wildest Dreams","src":"assets/music/wildest-dreams.mp3"},{"title":"Lover — Shawn Mendes Version","src":"assets/music/lover-shawn-mendes-version.mp3"},{"title":"Her","src":"assets/music/her.mp3"},{"title":"Next to You","src":"assets/music/next-to-you.mp3"},{"title":"O Rangrez","src":"assets/music/o-rangrez.mp3"},{"title":"SAILOR SONG","src":"assets/music/sailor-song.mp3"},{"title":"No. 1 Party Anthem","src":"assets/music/no-1-party-anthem.mp3"},{"title":"My Love All Mine","src":"assets/music/my-love-all-mine.mp3"},{"title":"Number 1 Girl","src":"assets/music/number-1-girl.mp3"},{"title":"Gosh She Looks Pretty","src":"assets/music/gosh-she-looks-pretty.mp3"},{"title":"Valleys","src":"assets/music/valleys.mp3"},{"title":"I Love You So","src":"assets/music/i-love-you-so.mp3"},{"title":"Eenie Meenie","src":"assets/music/eenie-meenie.mp3"},{"title":"You Belong With Me","src":"assets/music/you-belong-with-me.mp3"},{"title":"Say Yes to Heaven","src":"assets/music/say-yes-to-heaven.mp3"},{"title":"Chaar Kadam","src":"assets/music/chaar-kadam.mp3"},{"title":"Dooron Dooron","src":"assets/music/dooron-dooron.mp3"},{"title":"Bairaiyya","src":"assets/music/bairaiyya.mp3"},{"title":"Rang Jo Lagyo","src":"assets/music/rang-jo-lagyo.mp3"},{"title":"Tere Bina","src":"assets/music/tere-bina.mp3"},{"title":"Thinking of You — AP Dhillon","src":"assets/music/thinking-of-you-ap-dhillon.mp3"},{"title":"Laavan","src":"assets/music/laavan.mp3"}];
const audio=document.createElement('audio');
audio.preload='metadata';
document.body.appendChild(audio);
let trackIndex=0;
const trackTitle=document.getElementById('trackTitle');
const trackArtist=document.getElementById('trackArtist');
const playButton=document.getElementById('playTrack');
const playerProgress=document.getElementById('playerProgress');
const currentTime=document.getElementById('currentTime');
const duration=document.getElementById('duration');
function fmt(t){if(!Number.isFinite(t))return '0:00';return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0')}
function loadTrack(i,autoplay=false){trackIndex=(i+playlist.length)%playlist.length;const track=playlist[trackIndex];trackTitle.textContent=track.title;trackArtist.textContent='Softy playlist · '+(trackIndex+1)+' / '+playlist.length;audio.src=track.src;audio.load();if(autoplay)audio.play().catch(()=>{});playButton.textContent='▶'}
loadTrack(0);
playButton.addEventListener('click',()=>{if(audio.paused){audio.play().then(()=>playButton.textContent='Ⅱ').catch(()=>{});}else{audio.pause();playButton.textContent='▶'}});
document.getElementById('prevTrack').addEventListener('click',()=>loadTrack(trackIndex-1,true));
document.getElementById('nextTrack').addEventListener('click',()=>loadTrack(trackIndex+1,true));
audio.addEventListener('timeupdate',()=>{playerProgress.style.width=(audio.duration?audio.currentTime/audio.duration*100:0)+'%';currentTime.textContent=fmt(audio.currentTime);duration.textContent=fmt(audio.duration)});
audio.addEventListener('play',()=>playButton.textContent='Ⅱ');audio.addEventListener('pause',()=>playButton.textContent='▶');audio.addEventListener('ended',()=>loadTrack(trackIndex+1,true));
document.querySelector('.player-progress').addEventListener('click',e=>{if(!audio.duration)return;const r=e.currentTarget.getBoundingClientRect();audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration});
const musicPlayer=document.getElementById('musicPlayer');
document.getElementById('playerToggle').addEventListener('click',()=>musicPlayer.classList.toggle('open'));document.getElementById('playerClose').addEventListener('click',()=>musicPlayer.classList.remove('open'));
