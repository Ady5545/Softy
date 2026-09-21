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
const photoNames=["Copy of 20250414_205158.jpg","610.jpg","771.jpg","Copy of 20250418_065929.jpg","1018.jpg","413.jpg","1193.jpg","836.jpg","565.jpg","940.jpg","982.jpg","1225.jpg","570.jpg","564.jpg","558.jpg","835.jpg","1194.jpg","945.jpg","986.jpg","950.jpg","944.jpg","1168.jpg","1237.jpg","1009.jpg","263.jpg","1091.jpg","1000001011.jpg","923.jpg","Copy of IMG_20250415_215058_524.jpg","922.jpg","Copy of Snapchat-211457099.jpg","1108.jpg","517.jpg","1083.jpg","1256.jpg","1242.jpg","1281.jpg","1243.jpg","1257.jpg","516.jpg","879.jpg","1123.jpg","1094.jpg","925.jpg","449.jpg","Copy of 20250414_205315.jpg","1311.jpg","450.jpg","1073.jpg","518.jpg","915.jpg","1265.jpg","1072.jpg","451.jpg","Copy of 20250401_180856.jpg","Copy of 20250319_184735.jpg","1312.jpg","447.jpg","1266.jpg","1267.jpg","917.jpg","1071.jpg","330.jpg","1061.jpg","912.jpg","1060.jpg","325.jpg","496.jpg","Copy of Snapchat-415738145.jpg","Copy of Snapchat-510064617.jpg","508.jpg","497.jpg","1010.jpg","Copy of 20250208_155121.jpg","1206.jpg","Copy of Snapchat-1870040060.jpg","Copy of Snapchat-1152265864.jpg","Copy of 20250418_065842.jpg","1007.jpg","1204.jpg","1006.jpg","756.jpg","Copy of Snapchat-430357962.jpg","Copy of 20250418_065924.jpg","Copy of 20250414_205222.jpg","1203.jpg","Copy of 20250208_155124.jpg","782.jpg","1174.jpg","609.jpg"];
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
let trackIndex=Math.floor(Math.random()*playlist.length);
const trackTitle=document.getElementById('trackTitle');
const trackArtist=document.getElementById('trackArtist');
const playButton=document.getElementById('playTrack');
const playerProgress=document.getElementById('playerProgress');
const currentTime=document.getElementById('currentTime');
const duration=document.getElementById('duration');
function fmt(t){if(!Number.isFinite(t))return '0:00';return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0')}
function loadTrack(i,autoplay=false){trackIndex=(i+playlist.length)%playlist.length;const track=playlist[trackIndex];trackTitle.textContent=track.title;trackArtist.textContent='Softy playlist · '+(trackIndex+1)+' / '+playlist.length;audio.src=track.src;audio.load();if(autoplay)audio.play().catch(()=>{});playButton.textContent='▶'}
loadTrack(trackIndex);
playButton.addEventListener('click',()=>{if(audio.paused){audio.play().then(()=>playButton.textContent='Ⅱ').catch(()=>{});}else{audio.pause();playButton.textContent='▶'}});
document.getElementById('prevTrack').addEventListener('click',()=>loadTrack(trackIndex-1,true));
document.getElementById('nextTrack').addEventListener('click',()=>loadTrack(trackIndex+1,true));
audio.addEventListener('timeupdate',()=>{playerProgress.style.width=(audio.duration?audio.currentTime/audio.duration*100:0)+'%';currentTime.textContent=fmt(audio.currentTime);duration.textContent=fmt(audio.duration)});
audio.addEventListener('play',()=>playButton.textContent='Ⅱ');audio.addEventListener('pause',()=>playButton.textContent='▶');audio.addEventListener('ended',()=>loadTrack(trackIndex+1,true));
document.querySelector('.player-progress').addEventListener('click',e=>{if(!audio.duration)return;const r=e.currentTarget.getBoundingClientRect();audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration});
const musicPlayer=document.getElementById('musicPlayer');
document.getElementById('playerToggle').addEventListener('click',()=>musicPlayer.classList.toggle('open'));document.getElementById('playerClose').addEventListener('click',()=>musicPlayer.classList.remove('open'));

/* Heart cursor */
const heartCursor=document.getElementById('heartCursor');
if(heartCursor && window.matchMedia('(pointer:fine)').matches){document.body.classList.add('has-heart-cursor');window.addEventListener('pointermove',e=>{heartCursor.style.left=e.clientX+'px';heartCursor.style.top=e.clientY+'px';},{passive:true});}

/* Unlock My Heart */
const unlockButton=document.getElementById('unlockButton');
const unlockModal=document.getElementById('unlockModal');
const unlockHeart=document.getElementById('unlockHeart');
const lockStatus=document.getElementById('lockStatus');
if(unlockButton)unlockButton.addEventListener('click',()=>openModal('unlockModal'));
if(unlockHeart)unlockHeart.addEventListener('click',()=>{document.getElementById('lockIcon').textContent='💗';lockStatus.textContent='Unlocked. Welcome to the softest part of Softy. ♡';unlockHeart.textContent='heart unlocked ♡';unlockHeart.disabled=true;document.querySelector('.lock-paper').classList.add('unlocked');});
document.querySelectorAll('[data-close="unlock"]').forEach(el=>el.addEventListener('click',()=>closeModal('unlockModal')));

/* Scroll-grown SVG garden */
const garden=document.getElementById('garden');
const gardenCanvas=document.getElementById('gardenCanvas');
if(gardenCanvas){
  const paths=[...gardenCanvas.querySelectorAll('.garden-stem,.bloom path,.bloom circle')];
  paths.forEach(p=>{const len=p.getTotalLength?p.getTotalLength():100;p.style.strokeDasharray=len;p.style.strokeDashoffset=len;});
  const growGarden=()=>{const r=garden.getBoundingClientRect();const p=Math.min(1,Math.max(0,(window.innerHeight-r.top)/(r.height+window.innerHeight*.35)));gardenCanvas.style.setProperty('--garden-progress',p);paths.forEach((path,i)=>{const len=path.getTotalLength?path.getTotalLength():100;path.style.strokeDashoffset=String(len*(1-p));path.style.opacity=String(Math.min(1,p*1.8));});};
  window.addEventListener('scroll',growGarden,{passive:true});growGarden();
}
