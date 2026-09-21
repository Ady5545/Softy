const flowerColors = ['#f72585','#ff5b9a','#d81b60','#ff8fbd','#c2185b','#f58bb6'];
const captions = [
  'picked especially for you',
  'this one felt very you',
  'a tiny pink explosion of happiness',
  'freshly assembled from the flower department',
  'no two bouquets are allowed to match',
  'okay, this one is ridiculously pretty'
];

function qs(selector, root=document){ return root.querySelector(selector); }
function qsa(selector, root=document){ return [...root.querySelectorAll(selector)]; }
function clamp(v,min=0,max=1){ return Math.min(max,Math.max(min,v)); }

function makeFlower(x,y,scale,tilt,color,delay){
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

function bouquet(targetId,compact=false){
  const target=document.getElementById(targetId);
  if(!target) return;
  target.innerHTML='';
  const count=compact?5:9;
  const positions=Array.from({length:count},(_,i)=>({
    x:compact?20+i*15:18+Math.random()*64,
    y:compact?25+Math.random()*35:20+Math.random()*35,
    scale:compact?.58+Math.random()*.22:.72+Math.random()*.45,
    tilt:-18+Math.random()*36,
    color:flowerColors[Math.floor(Math.random()*flowerColors.length)],
    delay:(Math.random()*-4).toFixed(2)
  })).sort((a,b)=>a.y-b.y);
  positions.forEach(p=>target.appendChild(makeFlower(p.x,p.y,p.scale,p.tilt,p.color,p.delay)));
  if(!compact){
    const wrap=document.createElement('div');
    wrap.className='wrapped';
    wrap.innerHTML='<div class="ribbon"></div>';
    target.appendChild(wrap);
    const caption=document.getElementById('bouquetCaption');
    if(caption) caption.textContent=captions[Math.floor(Math.random()*captions.length)];
  }
}
bouquet('heroBouquet',true);
bouquet('bouquetCanvas');
const newBouquet=document.getElementById('newBouquet');
if(newBouquet) newBouquet.addEventListener('click',()=>{ bouquet('bouquetCanvas'); bumpSurpriseCount(); });

const jarMessages=[
  "Hiiieee myy bobluu poplluuu...i hopee youurr dayyy is going well.....ii lovvvee youuuuuuu soooooo mucchhhhhh<3333 🩷🎀💗",
  "Heyyy!!! youuu....YESS YOUU MISS....you aree verryy beautifull!!<333.... i waavuuuuu 💗🎀🥹",
  "Missss sundarii with bigg eyes...pretty smiilee...silky hairr...soothing smell...andd cutee voicee..I DO LOVE YOUU AND YOU ARE MINE ONLY!...DONT FORGET THAT EVEN FOR A SECOND 🩷🎀💗",
  "Myyy cutuu putuuu pucchuu pucchuu lovelyyy cutieee beautifulll preettyyy sweeeett darlinng honeeyy sweetheasrttt popluuuu sundaruuu wifeeyyyy muwaahhhhhh i lovvveee youuuuuuu usooooooooo mucccccchhhhhh!!! AAO JORR SE DABALUU TUMHEE 🎀💗🩷🥹",
  "I DONT WANTT 8TH KI ANANYA I LOVE MY CURRENT ANANYA😭 🩷🎀",
  "Fallen in love with the name ananya since 8th🫠 💗🎀",
  "I LOVVEE YOUU BABBYYY ANDD IF IT'SS QUITEEE ALRIGGHTTTT!!! I NEED YOUU BABBYY TO WARMM THESE LONELYY NIGHTTTS....<333 🩷🎀💗",
  "I WOULDD NEVERR FALL IN LOVEE AGAIN UNTILL I FOUNDD HER.....I SAID!! I WOULDD NEVER FALL IN LOVE UNTILL I FOUNDD HERRR I FOUNDDD YOUUUUU!!!!!!!!! YES YOU MY LOVEE...YOU ARE A VERY LOVELY CREATURE OF GOD AND I LOVE THIS CREATURE SO MUCH 💗🎀🩷",
  "III DONNNTT CAREEE HOWWW LONGGG IT TAKESSS....AS LONGG AS I'M WITHH YOUU I'VE GOT A SMILLEE ONNN MYYY FACCEEEEE.....SAVVEE YOUURR TEARSSS IT'LLL BEE OKKKKKAAYYYYYYY....ALL I KNOWW....ISS YOU ARE....HEREEEEE....WITHH MEE!!!! YAYAYAY YIPPEPEEEEE 🩷🎀💗",
  "TUM MERI HO...MERI THI...MERI HI RAHOGI MISS ACHECHEWD QWEENN....AAYI BADHII...JOR SE PICCHE SE PAKAD KE EK HUG KARUNGA YAHI SAARA ATTITUDE NIKL JAYEGA 💗🎀🩷",
  "w...woo aapki kamar to badhiya haii hehehe 🎀💗",
  "TUMHAREEE CHHOTUU SEE PYAREE SEE KUCHUU PUCCHU CHEHREE HOO KUCHI MUCHII KARKKEEE DABADUNGAA JORRR SEEEE!!!!! 🩷🎀💗",
  "\"Ananya baal khol na\" 🎀💗",
  "\"Ayy Ananya baal khol na pleaseee\" 🩷🎀",
  "\"AREYY HAATH HI TO CHHUA HAI ITNA KYU PAGAL HORHI HAI....KISI DIN HUG KRDIYA TO MAR HI JAYEGI\" 💗🎀🥹",
  "KHANA KHALO! 🍽️🩷🎀💗"
];

const surpriseMessages=[
  'you found the secret-ish button ♡',
  'yes, I made the flowers random on purpose',
  'this website is going to get much more ridiculous',
  'you are officially allowed one tiny smile',
  'there are definitely more surprises coming'
];

function openModal(id){
  const modal=document.getElementById(id);
  if(!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeModal(id){
  const modal=document.getElementById(id);
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  if(!document.querySelector('.modal.open,.photo-modal.open')) document.body.classList.remove('modal-open');
}
function showMessage(text){
  const target=document.getElementById('modalMessage');
  if(target) target.textContent=text;
  openModal('messageModal');
  bumpSurpriseCount();
}

const surpriseBtn=document.getElementById('surpriseBtn');
if(surpriseBtn) surpriseBtn.addEventListener('click',()=>showMessage(surpriseMessages[Math.floor(Math.random()*surpriseMessages.length)]));
const messageButton=document.getElementById('messageButton');
if(messageButton) messageButton.addEventListener('click',()=>showMessage(jarMessages[Math.floor(Math.random()*jarMessages.length)]));
const letterButton=document.getElementById('letterButton');
if(letterButton) letterButton.addEventListener('click',()=>{openModal('letterModal');bumpSurpriseCount()});

qsa('[data-close]').forEach(el=>el.addEventListener('click',()=>{
  const type=el.dataset.close;
  if(type) closeModal(type+'Modal');
}));

qsa('.open-card').forEach(card=>card.addEventListener('click',()=>{
  const messages={
    bad:'Hey. You do not have to fix the entire day right now. Take one small breath, do one small thing, and be gentle with yourself. Tomorrow gets its own chance.',
    happy:'YES. Keep this exact energy. Go enjoy your happy little moment and do not let yourself minimise it.',
    miss:'Then this is your tiny digital hug. The rest of this page is full of things waiting to remind you of good moments.',
    random:'Excellent reason. No reason is sometimes the best reason. Here is a completely unnecessary amount of affection in website form: ♡'
  };
  showMessage(messages[card.dataset.open]||'A tiny thought, saved here for you. ♡');
}));

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeModal('letterModal');
    closeModal('unlockModal');
    closeModal('messageModal');
    closePhotoModal();
  }
});

function fallingPetal(){
  const layer=document.getElementById('petals');
  if(!layer) return;
  const p=document.createElement('span');
  p.className='petal-float';
  p.textContent=['♥','♡','✦','·'][Math.floor(Math.random()*4)];
  p.style.left=Math.random()*100+'vw';
  p.style.fontSize=(10+Math.random()*14)+'px';
  p.style.animationDuration=(7+Math.random()*7)+'s';
  layer.appendChild(p);
  setTimeout(()=>p.remove(),15000);
}
setInterval(fallingPetal,900);
for(let i=0;i<4;i++) setTimeout(fallingPetal,i*500);

const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animationPlayState='running';
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12}):null;
qsa('.reveal').forEach(el=>{
  if(!observer) return;
  el.style.animationPlayState='paused';
  observer.observe(el);
});

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
if(moodText) moodText.textContent=moodLines[moodIndex];
if(moodButton) moodButton.addEventListener('click',()=>{
  moodIndex=(moodIndex+1)%moodLines.length;
  moodText.textContent=moodLines[moodIndex];
});

const wishButton=document.getElementById('wishButton');
if(wishButton) wishButton.addEventListener('click',event=>{
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
  bumpSurpriseCount();
});

const visitKey='softy-surprises-opened';
let visitCount=Number.parseInt(localStorage.getItem(visitKey)||'0',10)||0;
function bumpSurpriseCount(){
  visitCount++;
  localStorage.setItem(visitKey,String(visitCount));
  const el=document.getElementById('visitCount');
  if(el) el.textContent=String(visitCount);
}
const visitCountEl=document.getElementById('visitCount');
if(visitCountEl) visitCountEl.textContent=String(visitCount);

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

const garden=document.getElementById('garden');
const gardenCanvas=document.getElementById('gardenCanvas');
let gardenPaths=[];
if(gardenCanvas){
  gardenPaths=qsa('.garden-stem,.bloom path',gardenCanvas);
  gardenPaths.forEach(path=>{
    if(typeof path.getTotalLength==='function'){
      const len=path.getTotalLength();
      path.style.strokeDasharray=String(len);
      path.style.strokeDashoffset=String(len);
    }
  });
}

function pageProgress(element){
  if(!element) return 0;
  const absoluteTop=element.getBoundingClientRect().top+window.scrollY;
  const travel=Math.max(1,element.offsetHeight-window.innerHeight);
  return clamp((window.scrollY-absoluteTop)/travel);
}
function updateScrollMotion(){
  const y=window.scrollY||window.pageYOffset||0;
  const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
  if(progressBar) progressBar.style.width=(y/max*100)+'%';

  const topbar=document.querySelector('.topbar');
  if(topbar) topbar.classList.toggle('scrolled',y>80);

  if(story&&storyFlower&&orbitOne&&orbitTwo&&storyCopy&&storyTitle&&storyText&&storyNumber){
    const p=pageProgress(story);
    const step=Math.min(3,Math.floor(p*4));
    const pulse=Math.sin(p*Math.PI);
    storyFlower.style.transform='translate(-50%,-50%) rotate('+(p*300)+'deg) scale('+(1+pulse*.35)+')';
    storyFlower.style.left=(50+Math.sin(p*Math.PI*2)*24)+'%';
    storyFlower.style.top=(50+Math.cos(p*Math.PI*2)*14)+'%';
    orbitOne.style.transform='translate(-50%,-50%) rotate('+(p*180)+'deg) scale('+(1+p*.22)+')';
    orbitTwo.style.transform='translate(-50%,-50%) rotate('+(-p*150)+'deg) scale('+(1-p*.16)+')';
    storyCopy.style.transform='translateY('+(Math.sin(p*Math.PI*4)*16)+'px)';
    storyCopy.style.opacity=String(.72+.28*Math.sin(p*Math.PI));
    storyTitle.innerHTML=storySteps[step][0];
    storyText.textContent=storySteps[step][1];
    storyNumber.textContent=String(step+1).padStart(2,'0');
  }

  if(garden&&gardenPaths.length){
    const p=pageProgress(garden);
    gardenPaths.forEach(path=>{
      const len=path.getTotalLength();
      path.style.strokeDasharray=String(len);
      path.style.strokeDashoffset=String(len*(1-p));
      path.style.opacity=String(Math.min(1,Math.max(.08,p*1.7)));
    });
    qsa('.bloom',gardenCanvas).forEach((bloom,index)=>{
      const local=clamp((p-index*.08)/.55);
      bloom.style.transform='scale('+(0.45+local*.55)+')';
      bloom.style.opacity=String(local);
    });
  }

  updateMemoryStory();
}
let scrollTick=false;
window.addEventListener('scroll',()=>{
  if(scrollTick) return;
  scrollTick=true;
  requestAnimationFrame(()=>{updateScrollMotion();scrollTick=false;});
},{passive:true});
window.addEventListener('resize',updateScrollMotion,{passive:true});
updateScrollMotion();

const cursorGlow=document.getElementById('cursorGlow');
const heartCursor=document.getElementById('heartCursor');
if(window.matchMedia&&window.matchMedia('(pointer:fine)').matches){
  document.body.classList.add('has-heart-cursor');
  window.addEventListener('pointermove',e=>{
    if(heartCursor){heartCursor.style.left=e.clientX+'px';heartCursor.style.top=e.clientY+'px';}
    if(cursorGlow){cursorGlow.style.left=e.clientX+'px';cursorGlow.style.top=e.clientY+'px';cursorGlow.style.opacity='.7';}
  },{passive:true});
}

const unlockHeart=document.getElementById('unlockHeart');
const lockStatus=document.getElementById('lockStatus');
document.addEventListener('click',event=>{
  const unlockButton=event.target.closest('#unlockButton');
  if(unlockButton){
    event.preventDefault();
    openModal('unlockModal');
    bumpSurpriseCount();
  }
});
if(unlockHeart) unlockHeart.addEventListener('click',()=>{
  const lockIcon=document.getElementById('lockIcon');
  if(lockIcon) lockIcon.textContent='💗';
  if(lockStatus) lockStatus.textContent='Unlocked. Welcome to the softest part of Softy. ♡';
  unlockHeart.textContent='heart unlocked ♡';
  unlockHeart.disabled=true;
  const paper=document.querySelector('.lock-paper');
  if(paper) paper.classList.add('unlocked');
});

const photoNames=["Copy of 20250414_205158.jpg","610.jpg","771.jpg","Copy of 20250418_065929.jpg","1018.jpg","413.jpg","1193.jpg","836.jpg","565.jpg","940.jpg","982.jpg","1225.jpg","570.jpg","564.jpg","558.jpg","835.jpg","1194.jpg","945.jpg","986.jpg","950.jpg","944.jpg","1168.jpg","1237.jpg","1009.jpg","263.jpg","1091.jpg","1000001011.jpg","923.jpg","Copy of IMG_20250415_215058_524.jpg","922.jpg","Copy of Snapchat-211457099.jpg","1108.jpg","517.jpg","1083.jpg","1256.jpg","1242.jpg","1281.jpg","1243.jpg","1257.jpg","516.jpg","879.jpg","1123.jpg","1094.jpg","925.jpg","449.jpg","Copy of 20250414_205315.jpg","1311.jpg","450.jpg","1073.jpg","518.jpg","915.jpg","1265.jpg","1072.jpg","451.jpg","Copy of 20250401_180856.jpg","Copy of 20250319_184735.jpg","1312.jpg","447.jpg","1266.jpg","1267.jpg","917.jpg","1071.jpg","330.jpg","1061.jpg","912.jpg","1060.jpg","325.jpg","496.jpg","Copy of Snapchat-415738145.jpg","Copy of Snapchat-510064617.jpg","508.jpg","497.jpg","1010.jpg","Copy of 20250208_155121.jpg","1206.jpg","Copy of Snapchat-1870040060.jpg","Copy of Snapchat-1152265864.jpg","Copy of 20250418_065842.jpg","1007.jpg","1204.jpg","1006.jpg","756.jpg","Copy of Snapchat-430357962.jpg","Copy of 20250418_065924.jpg","Copy of 20250414_205222.jpg","1203.jpg","Copy of 20250208_155124.jpg","782.jpg","1174.jpg","609.jpg"];
const memoryStory=[
  ['One little moment.','Keep it.','The kind you almost scroll past before realizing you want to keep it forever.'],
  ['Then another.','Find it.','The gallery is not a wall of thumbnails anymore — it is a little world you can wander through.'],
  ['And another.','Keep moving.','The next memory is waiting somewhere unexpected.'],
  ['Then somehow…','Something changes.','They stop feeling like separate pictures.'],
  ['They become','a collection of us.','Tiny pieces begin to feel connected.'],
  ['And at the end,','all together.','Every little frame gets to exist in the same place.']
];
const memoryScene=document.getElementById('memoryScene');
const memoryStorySection=document.getElementById('memories');
const memoryStorySticky=document.querySelector('.memory-story-sticky');
const memoryStoryTitle=document.getElementById('memoryStoryTitle');
const memoryStoryText=document.getElementById('memoryStoryText');
const memoryStoryNumber=document.getElementById('memoryStoryNumber');
const memoryStoryTotal=document.getElementById('memoryStoryTotal');
const memoryStoryCopy=document.getElementById('memoryStoryCopy');
const memoryStoryFinale=document.getElementById('memoryStoryFinale');

function seeded(i,salt){
  const x=Math.sin(i*12.9898+salt*78.233)*43758.5453;
  return x-Math.floor(x);
}
function photoCandidates(name){
  return [encodeURI(name),'assets/photos/'+encodeURI(name)];
}
function setPhotoSource(img,name){
  const candidates=photoCandidates(name);
  let attempt=0;
  const tryNext=()=>{
    if(attempt>=candidates.length){
      img.closest('.story-photo')?.classList.add('is-missing');
      return;
    }
    img.src=candidates[attempt++];
  };
  img.addEventListener('error',tryNext);
  tryNext();
}
function buildMemoryStory(){
  if(!memoryScene) return;
  memoryScene.innerHTML='';
  if(memoryStoryTotal) memoryStoryTotal.textContent=String(photoNames.length);
  photoNames.forEach((name,index)=>{
    const card=document.createElement('figure');
    card.className='story-photo';
    const left=4+seeded(index,1)*82;
    const top=6+seeded(index,2)*78;
    const rotation=-16+seeded(index,3)*32;
    const scale=.72+seeded(index,4)*.32;
    card.style.left=left+'vw';
    card.style.top=top+'vh';
    card.style.setProperty('--rotation',rotation+'deg');
    card.style.setProperty('--base-scale',String(scale));
    card.dataset.index=String(index);
    card.innerHTML='<img alt="Memory '+String(index+1)+'" loading="lazy" decoding="async"><figcaption>'+String(index+1).padStart(2,'0')+'</figcaption>';
    const image=card.querySelector('img');
    setPhotoSource(image,name);
    card.addEventListener('click',()=>openPhotoModal(index));
    memoryScene.appendChild(card);
  });
}
function updateMemoryStory(){
  if(!memoryStorySection||!memoryScene) return;
  const p=pageProgress(memoryStorySection);
  const cards=qsa('.story-photo',memoryScene);
  if(!cards.length) return;
  const center=p*(cards.length-1);
  const finale=clamp((p-.9)/.1);

  cards.forEach((card,index)=>{
    const dist=Math.abs(index-center);
    const isActive=dist<.55;
    const near=dist<4.8;
    const baseScale=parseFloat(card.style.getPropertyValue('--base-scale')||'1');
    const opacity=Math.max(near?(1-dist/5.2):0,finale*.32);
    const blur=Math.max(0,(dist-1.8)*1.6);
    const scale=isActive?baseScale*1.18:baseScale*(.9+Math.max(0,1-dist/8)*.05);
    card.style.opacity=String(Math.min(1,opacity));
    card.style.filter='blur('+blur.toFixed(2)+'px)';
    card.style.transform='rotate(var(--rotation)) scale('+scale.toFixed(3)+')';
    card.style.zIndex=String(20+Math.round((8-dist)*8)+(isActive?80:0));
    card.classList.toggle('is-active',isActive);
  });

  const chapter=Math.min(memoryStory.length-1,Math.floor(p*memoryStory.length));
  const stageCopy=memoryStory[chapter];
  if(memoryStoryTitle) memoryStoryTitle.innerHTML=stageCopy[0]+'<br><em>'+stageCopy[1]+'</em>';
  if(memoryStoryText) memoryStoryText.textContent=stageCopy[2];
  if(memoryStoryNumber) memoryStoryNumber.textContent=String(Math.min(cards.length,Math.floor(center)+1)).padStart(2,'0');
  if(memoryStoryCopy){
    memoryStoryCopy.style.transform='translateY('+(Math.sin(p*Math.PI*4)*10)+'px) scale('+(1-finale*.04)+')';
    memoryStoryCopy.style.opacity=String(finale>.65?.15:1);
  }
  if(memoryStorySticky) memoryStorySticky.classList.toggle('is-finale',finale>.4);
  if(memoryStoryFinale) memoryStoryFinale.style.opacity=String(finale);
}
buildMemoryStory();

let lightboxIndex=0;
const photoModal=document.getElementById('photoModal');
const photoModalImage=document.getElementById('photoModalImage');
const photoModalCaption=document.getElementById('photoModalCaption');
function openPhotoModal(index){
  lightboxIndex=(index+photoNames.length)%photoNames.length;
  const name=photoNames[lightboxIndex];
  if(photoModalImage){
    setPhotoSource(photoModalImage,name);
    photoModalImage.alt='Memory '+String(lightboxIndex+1);
  }
  if(photoModalCaption) photoModalCaption.textContent='memory '+String(lightboxIndex+1).padStart(2,'0')+' / '+String(photoNames.length).padStart(2,'0');
  if(photoModal){photoModal.classList.add('open');photoModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
}
function closePhotoModal(){
  if(!photoModal) return;
  photoModal.classList.remove('open');
  photoModal.setAttribute('aria-hidden','true');
  if(!document.querySelector('.modal.open,.photo-modal.open')) document.body.classList.remove('modal-open');
}
function stepPhoto(delta){openPhotoModal(lightboxIndex+delta)}
const photoModalClose=document.getElementById('photoModalClose');
const photoModalPrev=document.getElementById('photoModalPrev');
const photoModalNext=document.getElementById('photoModalNext');
if(photoModalClose) photoModalClose.addEventListener('click',closePhotoModal);
if(photoModalPrev) photoModalPrev.addEventListener('click',()=>stepPhoto(-1));
if(photoModalNext) photoModalNext.addEventListener('click',()=>stepPhoto(1));
if(photoModal) photoModal.addEventListener('click',e=>{if(e.target===photoModal) closePhotoModal()});

const playlist=[
  ["Until I Found You — Solo","until-i-found-you-solo.mp3"],
  ["Until I Found You — Em Beihold Version","until-i-found-you-em-beihold-version.mp3"],
  ["Here With Me","here-with-me.mp3"],
  ["Young Dumb & Broke","young-dumb-broke.mp3"],
  ["With You — AP Dhillon","with-you-ap-dhillon.mp3"],
  ["I Wanna Be Yours","i-wanna-be-yours.mp3"],
  ["Die For You","die-for-you.mp3"],
  ["I Like the Way You Kiss Me — Sped Up","i-like-the-way-you-kiss-me-sped-up.mp3"],
  ["Me Gustas Tu — Sped Up","me-gustas-tu-sped-up.mp3"],
  ["Good Luck, Charm","good-luck-charm.mp3"],
  ["Just the Two of Us","just-the-two-of-us.mp3"],
  ["Put Your Head on My Shoulder","put-your-head-on-my-shoulder.mp3"],
  ["We Fell in Love in October","we-fell-in-love-in-october.mp3"],
  ["Double Take","double-take.mp3"],
  ["Jo Tum Mere Ho","jo-tum-mere-ho.mp3"],
  ["Teenage Dream","teenage-dream.mp3"],
  ["Make You Mine","make-you-mine.mp3"],
  ["This Is What Autumn Feels Like","this-is-what-autumn-feels-like.mp3"],
  ["Die With A Smile","die-with-a-smile.mp3"],
  ["Wildest Dreams","wildest-dreams.mp3"],
  ["Lover — Shawn Mendes Version","lover-shawn-mendes-version.mp3"],
  ["Her","her.mp3"],
  ["Next to You","next-to-you.mp3"],
  ["O Rangrez","o-rangrez.mp3"],
  ["SAILOR SONG","sailor-song.mp3"],
  ["No. 1 Party Anthem","no-1-party-anthem.mp3"],
  ["My Love All Mine","my-love-all-mine.mp3"],
  ["Number 1 Girl","number-1-girl.mp3"],
  ["Gosh She Looks Pretty","gosh-she-looks-pretty.mp3"],
  ["Valleys","valleys.mp3"],
  ["I Love You So","i-love-you-so.mp3"],
  ["Eenie Meenie","eenie-meenie.mp3"],
  ["You Belong With Me","you-belong-with-me.mp3"],
  ["Say Yes to Heaven","say-yes-to-heaven.mp3"],
  ["Chaar Kadam","chaar-kadam.mp3"],
  ["Dooron Dooron","dooron-dooron.mp3"],
  ["Bairaiyya","bairaiyya.mp3"],
  ["Rang Jo Lagyo","rang-jo-lagyo.mp3"],
  ["Tere Bina","tere-bina.mp3"],
  ["Thinking of You — AP Dhillon","thinking-of-you-ap-dhillon.mp3"],
  ["Laavan","laavan.mp3"]
];

function shuffle(items){
  const arr=[...items];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
const queue=shuffle(playlist);
const audio=document.createElement('audio');
audio.preload='auto';
audio.autoplay=true;
audio.playsInline=true;
audio.setAttribute('aria-hidden','true');
document.body.appendChild(audio);
let trackIndex=0;
let musicProblem=false;
let soundUnlocked=false;
let mutedAutoplayFallback=false;
const trackTitle=document.getElementById('trackTitle');
const trackArtist=document.getElementById('trackArtist');
const playButton=document.getElementById('playTrack');
const playerProgress=document.getElementById('playerProgress');
const currentTime=document.getElementById('currentTime');
const duration=document.getElementById('duration');
const playerProgressBar=document.querySelector('.player-progress');

function fmt(t){ return Number.isFinite(t)?Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0'):'0:00'; }

function loadTrack(index,autoplay=false){
  trackIndex=(index+queue.length)%queue.length;
  const [title,file]=queue[trackIndex];
  musicProblem=false;
  if(trackTitle) trackTitle.textContent=title;
  if(trackArtist) trackArtist.textContent='shuffle · '+String(trackIndex+1)+' / '+String(queue.length);
  audio.muted=false;
  mutedAutoplayFallback=false;
  audio.src='assets/music/'+file;
  audio.load();
  if(playerProgress) playerProgress.style.width='0%';
  if(currentTime) currentTime.textContent='0:00';
  if(duration) duration.textContent='0:00';
  if(playButton) playButton.textContent='▶';
  if(autoplay) attemptPlay();
}

function attemptPlay(){
  audio.muted=false;
  return audio.play().then(()=>{
    soundUnlocked=true;
    mutedAutoplayFallback=false;
    if(playButton) playButton.textContent='Ⅱ';
    if(trackArtist) trackArtist.textContent='shuffle · '+String(trackIndex+1)+' / '+String(queue.length);
  }).catch(()=>{
    if(musicProblem) return;
    mutedAutoplayFallback=true;
    audio.muted=true;
    audio.play().then(()=>{
      if(playButton) playButton.textContent='Ⅱ';
      if(trackArtist) trackArtist.textContent='playing quietly · tap once for sound ♡';
    }).catch(()=>{
      if(trackArtist) trackArtist.textContent='tap play to start your music ♡';
    });
  });
}

function unlockSound(){
  if(soundUnlocked || musicProblem) return;
  soundUnlocked=true;
  audio.muted=false;
  audio.play().then(()=>{
    mutedAutoplayFallback=false;
    if(playButton) playButton.textContent='Ⅱ';
    if(trackArtist) trackArtist.textContent='shuffle · '+String(trackIndex+1)+' / '+String(queue.length);
  }).catch(()=>{});
}

loadTrack(0,true);
window.addEventListener('pointerdown',unlockSound,{once:true,passive:true});
window.addEventListener('touchstart',unlockSound,{once:true,passive:true});
window.addEventListener('keydown',unlockSound,{once:true});

if(playButton) playButton.addEventListener('click',()=>{
  if(audio.paused || audio.muted){
    unlockSound();
    attemptPlay();
  } else {
    audio.pause();
  }
});

const prevTrack=document.getElementById('prevTrack');
const nextTrack=document.getElementById('nextTrack');
if(prevTrack) prevTrack.addEventListener('click',()=>loadTrack(trackIndex-1,true));
if(nextTrack) nextTrack.addEventListener('click',()=>loadTrack(trackIndex+1,true));
audio.addEventListener('loadedmetadata',()=>{if(duration) duration.textContent=fmt(audio.duration)});
audio.addEventListener('timeupdate',()=>{
  const pct=audio.duration?audio.currentTime/audio.duration*100:0;
  if(playerProgress) playerProgress.style.width=pct+'%';
  if(currentTime) currentTime.textContent=fmt(audio.currentTime);
  if(duration) duration.textContent=fmt(audio.duration);
});
audio.addEventListener('play',()=>{if(playButton) playButton.textContent='Ⅱ'});
audio.addEventListener('pause',()=>{if(playButton) playButton.textContent='▶'});
audio.addEventListener('ended',()=>loadTrack(trackIndex+1,true));
audio.addEventListener('error',()=>{
  musicProblem=true;
  if(playButton) playButton.textContent='▶';
  if(trackArtist) trackArtist.textContent='audio file missing · add it to assets/music/';
});
if(playerProgressBar) playerProgressBar.addEventListener('click',e=>{
  if(!Number.isFinite(audio.duration)) return;
  const r=e.currentTarget.getBoundingClientRect();
  audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration;
});
const musicPlayer=document.getElementById('musicPlayer');
const playerToggle=document.getElementById('playerToggle');
const playerClose=document.getElementById('playerClose');
if(playerToggle) playerToggle.addEventListener('click',()=>musicPlayer&&musicPlayer.classList.toggle('open'));
if(playerClose) playerClose.addEventListener('click',()=>musicPlayer&&musicPlayer.classList.remove('open'));

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'&&photoModal?.classList.contains('open')) stepPhoto(-1);
  if(e.key==='ArrowRight'&&photoModal?.classList.contains('open')) stepPhoto(1);
});

window.addEventListener('blur',()=>{if(audio&&!audio.paused) audio.pause();});
