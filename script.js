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

qsa('[data-close]').forEach(el=>el.addEventListener('click',event=>{
  event.preventDefault();
  event.stopPropagation();
  const type=el.dataset.close;
  if(type) closeModal(type+'Modal');
}));
const unlockClose=document.getElementById('unlockClose');
if(unlockClose) unlockClose.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();closeModal('unlockModal');});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    document.querySelectorAll('.modal.open').forEach(modal=>closeModal(modal.id));
    closePhotoModal();
    if(musicPlayer) musicPlayer.open=false;
  }
});

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
const garden=document.getElementById('garden');
const gardenCanvas=document.getElementById('gardenCanvas');

function pageProgress(element){
  if(!element) return 0;
  const absoluteTop=element.getBoundingClientRect().top+window.scrollY;
  const travel=Math.max(1,element.offsetHeight-window.innerHeight);
  return clamp((window.scrollY-absoluteTop)/travel);
}

function updateGlobalScroll(){
  const y=window.scrollY||window.pageYOffset||0;
  const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
  if(progressBar) progressBar.style.width=(y/max*100)+'%';
  const topbar=document.querySelector('.topbar');
  if(topbar) topbar.classList.toggle('scrolled',y>80);
}
let scrollTick=false;
window.addEventListener('scroll',()=>{
  if(scrollTick) return;
  scrollTick=true;
  requestAnimationFrame(()=>{updateGlobalScroll();scrollTick=false;});
},{passive:true});
window.addEventListener('resize',updateGlobalScroll,{passive:true});
updateGlobalScroll();




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

const photoNames=Array.from({length:90},(_,i)=>'photo-'+String(i+1).padStart(3,'0')+'.jpg');
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
  return ['/assets/photos/'+encodeURIComponent(name)];
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
  const existing=qsa('.story-photo',memoryScene);
  if(existing.length) return;
  photoNames.forEach((name,index)=>{
    const card=document.createElement('figure');
    card.className='story-photo';
    card.dataset.index=String(index);
    card.innerHTML='<img alt="Memory '+String(index+1)+'" loading="lazy" decoding="async"><figcaption>'+String(index+1).padStart(2,'0')+'</figcaption>';
    const image=card.querySelector('img');
    setPhotoSource(image,name);
    card.addEventListener('click',()=>openPhotoModal(index));
    memoryScene.appendChild(card);
  });
}

function updateMemoryStory(){
  if(!memoryScene) return;
  const cards=qsa('.story-photo',memoryScene);
  if(!cards.length) return;
  const mobile=window.innerWidth<=560;
  const tablet=window.innerWidth>560&&window.innerWidth<=900;
  const cols=mobile?5:(tablet?7:9);
  const rows=Math.ceil(cards.length/cols);
  cards.forEach((card,index)=>{
    if(!card.dataset.scattered || card.dataset.scatterCols!==String(cols)){
      const row=Math.floor(index/cols);
      const col=index%cols;
      const colStep=mobile?18.8:(tablet?14.2:11.1);
      const rowStep=mobile?9.9:(tablet?10.4:10.2);
      const jitterX=((index*17)%7)-3;
      const jitterY=((index*29)%6)-3;
      const x=6+(col*colStep)+jitterX;
      const y=5+(row*rowStep)+jitterY;
      const rotation=-13+((index*17)%27);
      const scale=(.84+(((index*23)%25)/100)).toFixed(2);
      card.style.setProperty('--photo-x',x+'%');
      card.style.setProperty('--photo-y',y+'%');
      card.style.setProperty('--rotation',rotation+'deg');
      card.style.setProperty('--base-scale',scale);
      card.dataset.scattered='true';
      card.dataset.scatterCols=String(cols);
    }
    card.style.opacity='1';
    card.style.filter='none';
    card.style.pointerEvents='auto';
  });
}
buildMemoryStory();
requestAnimationFrame(()=>updateMemoryStory());
document.addEventListener('click',event=>{
  const card=event.target.closest('.story-photo');
  if(card && memoryScene && memoryScene.contains(card)){
    const index=Number(card.dataset.index||0);
    openPhotoModal(index);
  }
});
qsa('.story-photo',memoryScene).forEach((card,index)=>{
  const img=card.querySelector('img');
  if(img && !img.dataset.bound){
    img.dataset.bound='true';
    img.addEventListener('error',()=>card.classList.add('is-missing'),{once:true});
    if(!card.dataset.boundClick){card.addEventListener('click',()=>openPhotoModal(index));card.dataset.boundClick='true';}
  }
});

let lightboxIndex=0;
const photoModal=document.getElementById('photoModal');
const photoModalImage=document.getElementById('photoModalImage');
const photoModalCaption=document.getElementById('photoModalCaption');
function openPhotoModal(index){
  lightboxIndex=(index+photoNames.length)%photoNames.length;

  const card=document.querySelector('.story-photo[data-index="'+lightboxIndex+'"]');
  const source=card?.querySelector('img')?.currentSrc || card?.querySelector('img')?.src;

  if(photoModalImage){
    if(source){
      photoModalImage.src=source;
    }else{
      setPhotoSource(photoModalImage,photoNames[lightboxIndex]);
    }
    photoModalImage.alt='Memory '+String(lightboxIndex+1);
  }

  if(photoModalCaption){
    photoModalCaption.textContent='memory '+String(lightboxIndex+1).padStart(2,'0')+' / '+String(photoNames.length).padStart(2,'0');
  }

  if(photoModal){
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
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
if(photoModal) photoModal.addEventListener('click',e=>{
  if(e.target===photoModal || e.target.classList.contains('photo-modal')){
    closePhotoModal();
  }
});

const playlist=[
  ["Me Gustas Tu — Sped Up","manu-chao-me-gustas-tu-sped-up-version-official-audio-128kbps.mp3"],
  ["Thinking of You — AP Dhillon — Alternate","thinking-of-you-official-audio-ap-dhillon-256kbps.webm"],

  ["Until I Found You — Solo","stephen-sanchez-until-i-found-you-official-video-256kbps.webm"],
  ["Until I Found You — Em Beihold Version","until-i-found-you-em-beihold-version-256kbps.webm"],
  ["Here With Me","d4vd-here-with-me-official-music-video-128kbps.mp4"],
  ["Young Dumb & Broke","khalid-young-dumb-broke-lyrics-256kbps.webm"],
  ["With You — AP Dhillon","with-you-ap-dhillon-official-music-video-256kbps.webm"],
  ["I Wanna Be Yours","arctic-monkeys-i-wanna-be-yours-256kbps.webm"],
  ["Die For You","the-weeknd-die-for-you-128kbps.mp4"],
  ["Good Luck, Charm","ks-makhan-good-luck-charm-320-kbps.mp3"],
  ["Just the Two of Us","grover-washington-jr-just-the-two-of-us-feat-bill-withers-256-kbps.mp3"],
  ["We Fell in Love in October","girl-in-red-we-fell-in-love-in-october-lyrics.mp3"],
  ["Double Take","dhruv-double-take-lyrics.mp3"],
  ["Jo Tum Mere Ho","anuv-jain-jo-tum-mere-ho-lyrics.mp3"],
  ["Teenage Dream","stephen-dawes-teenage-dream-lyric-video.mp3"],
  ["Make You Mine","public-make-you-mine-official-lyric-video.mp3"],
  ["This Is What Autumn Feels Like","jvke-this-is-what-autumn-feels-like-official-lyric-video.mp3"],
  ["Wildest Dreams","taylor-swift-wildest-dreams-lyrics.mp3"],
  ["Lover — Shawn Mendes Version","taylor-swift-lover-remix-feat-shawn-mendes-lyric-video.mp3"],
  ["Her","jvke-her-official-lyric-video.mp3"],
  ["Next to You","jvke-next-to-you-official-lyric-video.mp3"],
  ["O Rangrez","o-rangrez-lyrical-video-bhaag-milkha-bhaag-farhan-sonam-shreya-ghoshal-javed-bashir.mp3"],
  ["SAILOR SONG","gigi-perez-sailor-song-lyrics-256kbps.webm"],
  ["No. 1 Party Anthem","arctic-monkeys-no-1-party-anthem-lyrics.mp3"],
  ["My Love All Mine","mitski-my-love-mine-all-mine-official-lyric-video.mp3"],
  ["Number 1 Girl","rose-number-one-girl-lyrics.mp3"],
  ["Gosh She Looks Pretty","nato-kitch-gosh-she-looks-pretty-visualizer.mp3"],
  ["Valleys","woah-valleys-lyrics.mp3"],
  ["I Love You So","the-walters-i-love-you-so-lyrics-256kbps.webm"],
  ["Eenie Meenie","sean-kingston-justin-bieber-eenie-meenie-lyrics.mp3"],
  ["You Belong With Me","taylor-swift-you-belong-with-me-lyrics.mp3"],
  ["Dooron Dooron","dooron-dooron-lyrics-paresh-pahuja-feat-harleen-sethi-shiv-tandan-meghdeep-bose-vaibhav-raj.mp3"],
  ["Bairaiyya","bairiyaa-atif-aslam-shreya-ghoshal-lyrics-lyrical-bam-hindi.mp3"],
  ["Rang Jo Lagyo","rang-jo-lagyo-lyrical-ramaiya-vastavaiya-girish-kumar-shruti-haasan-atif-aslam-shreya-ghoshal.mp3"],
  ["Tere Bina","a-r-rahman-tere-bina-lyrical-song-aishwarya-rai-abhishek-bachchan-guru-gulzar.mp3"],
  ["Thinking of You — AP Dhillon","thinking-of-you-official-audio-ap-dhillon.mp3"],
  ["Laavan","laavan-music-video-jasmine-sandlas-mofusion-pro-media.mp3"],
  ["Salvatore","lana-del-rey-salvatore-lyrics.mp3"],
  ["Gehra Hua","gehra-hua-lyrics-arijit-singh-armaan-khan-dhurandhar.mp3"],
  ["I Love You Baby","frank-sinatra-i-love-you-baby-256kbps.webm"],
  ["We Fell in Love in October — alternate file","girl-in-red-we-fell-in-love-in-october-lyrics-1.mp3"]
];

function shuffle(items){
  const arr=[...items];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
/* ================= SOFTY FINAL INTERACTION REPAIR =================
   This pass intentionally overrides the earlier experimental scroll/photo/music
   implementations instead of stacking another dependency on top of them.
==================================================================== */

(function softyFinalRepair(){
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));

  /* ---------- REAL SCROLL STORY ---------- */
  const chapterSection = $('#chapters');
  const chapterCards = $$('.chapter-card', chapterSection);
  if (chapterSection && chapterCards.length) {
    chapterSection.classList.add('softy-scroll-story');
    chapterCards.forEach((card,i)=>{
      card.classList.add('softy-story-card');
      card.style.setProperty('--story-index', i);
    });

    let storyRaf = 0;
    function updateChapterStory(){
      storyRaf = 0;
      const rect = chapterSection.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const p = clamp(-rect.top / travel);
      const n = chapterCards.length;
      chapterCards.forEach((card,i)=>{
        const center = (i + 0.5) / n;
        const distance = Math.abs(p - center);
        const active = distance < 0.18;
        const local = clamp((distance - 0.04) / 0.16);
        const y = active ? (p < center ? 18 : -18) * local : (i < p*n ? -34 : 34);
        const scale = active ? 1 : 0.92;
        const opacity = active ? 1 : 0.72;
        card.style.setProperty('--story-y', y.toFixed(2)+'px');
        card.style.setProperty('--story-scale', scale);
        card.style.setProperty('--story-opacity', opacity);
        card.classList.toggle('is-active', active);
      });
    }
    function scheduleChapterStory(){
      if(storyRaf) return;
      storyRaf = requestAnimationFrame(updateChapterStory);
    }
    window.addEventListener('scroll', scheduleChapterStory, {passive:true});
    window.addEventListener('resize', scheduleChapterStory, {passive:true});
    scheduleChapterStory();
  }

  /* ---------- PHOTO ARCHIVE: deterministic scattered positions ---------- */
  const scene = $('#memoryScene');
  const photos = $$('.story-photo', scene || document);
  const colsFor = () => {
    if(window.innerWidth <= 560) return 4;
    if(window.innerWidth <= 900) return 6;
    return 8;
  };
  function scatterPhotos(){
    if(!scene || !photos.length) return;
    const cols = colsFor();
    const rows = Math.ceil(photos.length / cols);
    photos.forEach((card,i)=>{
      const row = Math.floor(i/cols), col = i%cols;
      const x = 6 + (col/(Math.max(1,cols-1)))*88 + ((i*37)%9-4);
      const y = 4 + (row/(Math.max(1,rows-1)))*92 + ((i*19)%7-3);
      const rotation = -13 + ((i*17)%27);
      const scale = 0.84 + ((i*23)%18)/100;
      card.style.setProperty('--photo-x', x+'%');
      card.style.setProperty('--photo-y', y+'%');
      card.style.setProperty('--rotation', rotation+'deg');
      card.style.setProperty('--base-scale', scale.toFixed(2));
      card.style.zIndex = String(10 + (i%7));
      card.classList.add('softy-photo-ready');
    });
  }
  scatterPhotos();
  window.addEventListener('resize', scatterPhotos, {passive:true});

  /* ---------- EXACT PHOTO LIGHTBOX ---------- */
  let currentPhoto = 0;
  const photoModal = $('#photoModal');
  const modalImg = $('#photoModalImage');
  const modalCaption = $('#photoModalCaption');
  const names = Array.from({length:90},(_,i)=>'photo-'+String(i+1).padStart(3,'0')+'.jpg');

  function showPhoto(index){
    if(!photoModal || !modalImg) return;
    currentPhoto = (index + names.length) % names.length;
    modalImg.src = names[currentPhoto];
    modalImg.alt = 'Memory '+String(currentPhoto+1);
    if(modalCaption) modalCaption.textContent = String(currentPhoto+1).padStart(2,'0')+' / '+String(names.length).padStart(2,'0');
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
  function hidePhoto(){
    if(!photoModal) return;
    photoModal.classList.remove('open');
    photoModal.setAttribute('aria-hidden','true');
    if(!$$('.modal.open, .photo-modal.open').length) document.body.classList.remove('modal-open');
  }
  window.openPhotoModal = showPhoto;
  window.closePhotoModal = hidePhoto;

  $$('.story-photo').forEach(card=>{
    if(card.dataset.finalPhotoBound) return;
    card.dataset.finalPhotoBound = 'true';
    card.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      showPhoto(Number(card.dataset.index || 0));
    });
  });
  const closePhoto = $('#photoModalClose');
  const prevPhoto = $('#photoModalPrev');
  const nextPhoto = $('#photoModalNext');
  if(closePhoto) closePhoto.addEventListener('click',hidePhoto);
  if(prevPhoto) prevPhoto.addEventListener('click',()=>showPhoto(currentPhoto-1));
  if(nextPhoto) nextPhoto.addEventListener('click',()=>showPhoto(currentPhoto+1));
  if(photoModal) photoModal.addEventListener('click',e=>{
    if(e.target===photoModal || e.target.matches('.photo-modal-backdrop')) hidePhoto();
  });
  document.addEventListener('keydown',e=>{
    if(!photoModal || !photoModal.classList.contains('open')) return;
    if(e.key==='Escape') hidePhoto();
    if(e.key==='ArrowLeft') showPhoto(currentPhoto-1);
    if(e.key==='ArrowRight') showPhoto(currentPhoto+1);
  });

  /* ---------- MUSIC PLAYER: reliable open/close + graceful audio ---------- */
  const player = $('#musicPlayer');
  const toggle = $('#playerToggle');
  const close = $('#playerClose');
  const play = $('#playTrack');
  const audio = document.querySelector('audio');
  function setPlayer(open){
    if(!player) return;
    player.classList.toggle('open',open);
    if(toggle) toggle.setAttribute('aria-expanded',String(open));
  }
  if(toggle){
    toggle.onclick = e=>{ e.preventDefault(); e.stopPropagation(); setPlayer(!player.classList.contains('open')); };
    toggle.onpointerdown = e=>e.stopPropagation();
  }
  if(close) close.onclick = e=>{e.preventDefault();e.stopPropagation();setPlayer(false);};
  if(play && audio){
    play.onclick = async e=>{
      e.preventDefault();
      if(audio.paused || audio.muted){
        try{ audio.muted=false; await audio.play(); }
        catch(err){
          try{ audio.muted=true; await audio.play(); }
          catch(_){}
        }
      }else audio.pause();
    };
  }

  /* Browser autoplay policies may block sound until interaction; never let that
     prevent the UI from opening. */
  document.addEventListener('pointerdown',()=>{
    if(audio && audio.muted){
      audio.muted=false;
      if(audio.paused && audio.src) audio.play().catch(()=>{});
    }
  },{once:true,passive:true});

  /* Don't pause the user's music just because the tab briefly loses focus. */
  window.removeEventListener('blur', window.__softyOldBlurHandler || (()=>{}));

  /* Keep the player usable even if an external audio URL dies. */
  if(audio){
    audio.addEventListener('error',()=>{
      const artist = $('#trackArtist');
      if(artist) artist.textContent='music file unavailable · the player itself is working ♡';
    });
  }
})();





/* ================= SOFTY STATIC ARCHIVE + MUSIC FINAL ================= */
(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const scene=$('#memoryScene');
  const table=scene?.closest('.memory-table');

  /* STATIC SCATTER: never tied to scroll position. */
  function seed(n){
    const x=Math.sin(n*127.1+311.7)*43758.5453;
    return x-Math.floor(x);
  }
  function scatter(){
    if(!scene) return;
    const cards=$$('.story-photo',scene);
    const mobile=window.innerWidth<=560;
    const tablet=window.innerWidth>560&&window.innerWidth<=900;
    const cols=mobile?5:(tablet?7:9);
    const colStep=mobile?18.8:(tablet?14.2:11.1);
    const rowStep=mobile?9.9:(tablet?10.4:10.2);
    const height=mobile?2300:(tablet?1700:1400);

    if(table){
      table.style.setProperty('height',height+'px','important');
      table.style.setProperty('min-height',height+'px','important');
    }
    scene.style.setProperty('height',height+'px','important');

    cards.forEach((card,i)=>{
      const row=Math.floor(i/cols);
      const col=i%cols;
      const jitterX=((i*17)%7)-3;
      const jitterY=((i*29)%6)-3;
      const x=6+(col*colStep)+jitterX;
      const y=5+(row*rowStep)+jitterY;
      const rotation=-13+((i*17)%27);
      const scale=(0.84+(((i*23)%25)/100)).toFixed(2);

      card.style.setProperty('--photo-x',x+'%');
      card.style.setProperty('--photo-y',y+'%');
      card.style.setProperty('--rotation',rotation+'deg');
      card.style.setProperty('--base-scale',scale);
      card.style.removeProperty('left');
      card.style.removeProperty('top');
      card.style.removeProperty('width');
      card.style.removeProperty('height');
      card.style.setProperty('opacity','1','important');
      card.style.setProperty('visibility','visible','important');
      card.style.setProperty('display','block','important');
      card.style.setProperty('pointer-events','auto','important');
      card.style.setProperty('z-index',String(10+(i%7)),'important');
      card.classList.add('softy-photo-ready');

      const img=$('img',card);
      if(img) img.loading='eager';
    });
  }
  scatter();
  addEventListener('resize',scatter,{passive:true});

  /* Exact photo lightbox. */
  const modal=$('#photoModal'), modalImg=$('#photoModalImage'), caption=$('#photoModalCaption');
  let current=0;
  function show(i){
    const cards=$$('.story-photo',scene||document);
    if(!modal||!modalImg||!cards.length)return;
    current=(i+cards.length)%cards.length;
    const img=$('img',cards[current]);
    modalImg.src=img?.currentSrc||img?.src||('/assets/photos/photo-'+String(current+1).padStart(3,'0')+'.jpg');
    modalImg.alt='Memory '+(current+1);
    if(caption)caption.textContent='memory '+String(current+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  }
  function hide(){
    if(!modal)return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open');
  }
  window.openPhotoModal=show; window.closePhotoModal=hide;
  $$('.story-photo',scene||document).forEach(card=>{
    card.onclick=e=>{e.preventDefault();e.stopPropagation();show(Number(card.dataset.index||0));};
  });
  $('#photoModalClose')?.addEventListener('click',hide);
  $('#photoModalPrev')?.addEventListener('click',()=>show(current-1));
  $('#photoModalNext')?.addEventListener('click',()=>show(current+1));
  modal?.addEventListener('click',e=>{if(e.target===modal||e.target.matches('.photo-modal-backdrop'))hide();});
  document.addEventListener('keydown',e=>{
    if(!modal?.classList.contains('open'))return;
    if(e.key==='Escape')hide();
    if(e.key==='ArrowLeft')show(current-1);
    if(e.key==='ArrowRight')show(current+1);
  });

  /* MUSIC: one persistent audio engine */
  const player=$('#musicPlayer'), toggle=$('#playerToggle'), close=$('#playerClose');
  const play=$('#playTrack'), prev=$('#prevTrack'), next=$('#nextTrack');
  const title=$('#trackTitle'), artist=$('#trackArtist'), bar=$('#playerProgress');
  const now=$('#currentTime'), dur=$('#duration'), trackBar=$('.player-progress');

  /* Remove every audio element created by earlier experiments. */
  $$('audio').forEach(node=>node.remove());

  const audio=document.createElement('audio');
  audio.preload='auto';
  audio.setAttribute('playsinline','');
  audio.setAttribute('aria-label','Softy music');
  audio.muted=false;
  document.body.appendChild(audio);

  const defaultTrack='stephen-sanchez-until-i-found-you-official-video-256kbps.webm';
  const files=[
    defaultTrack,
    ...shuffle(playlist.map(track=>track[1]).filter(file=>file!==defaultTrack))
  ];

  let ti=0;
  let sourceIndex=0;
  let playIntent=0;
  let switching=false;

  function formatTrackName(file){
    return file
      .replace(/\.(mp3|webm|mp4|m4a)$/i,'')
      .replace(/[-_]+/g,' ')
      .replace(/\b\d{2,3}\s*kbps\b/gi,'')
      .replace(/\b(?:official\s+audio|official\s+video|music\s+video|lyric\s+video|lyrical\s+video|visualizer)\b/gi,'')
      .replace(/\b(?:official|lyrics?|lyrical|audio|video)\b/gi,'')
      .replace(/\s{2,}/g,' ')
      .trim()
      .replace(/\b\w/g,ch=>ch.toUpperCase());
  }

  function sources(file){
    const encoded=encodeURIComponent(file);
    return [
      'https://vpl0zcyuaj7poz7d.public.blob.vercel-storage.com/'+encoded,
      'https://media.githubusercontent.com/media/Ady5545/Softy/main/assets/music/'+encoded
    ];
  }

  function fmt(v){
    return Number.isFinite(v)
      ? Math.floor(v/60)+':'+String(Math.floor(v%60)).padStart(2,'0')
      : '0:00';
  }

  function renderTrack(){
    title.textContent=formatTrackName(files[ti]);
    artist.textContent='music corner · '+(ti+1)+' / '+files.length;
    if(bar)bar.style.width='0%';
    if(now)now.textContent='0:00';
    if(dur)dur.textContent='0:00';
    if(play)play.textContent='▶';
  }

  function hardStop(){
    playIntent++;
    switching=true;
    audio.pause();
    try{audio.currentTime=0;}catch(_){}
    audio.removeAttribute('src');
    audio.load();
  }

  function loadFile(){
    const list=sources(files[ti]);
    audio.src=list[sourceIndex];
    audio.load();
  }

  async function playCurrent(){
    const intent=playIntent;

    try{
      await audio.play();
      if(intent!==playIntent) audio.pause();
      return true;
    }catch(firstError){
      const list=sources(files[ti]);
      if(intent!==playIntent || sourceIndex>=list.length-1) return false;

      sourceIndex++;
      hardStop();
      /* hardStop increments the intent, so capture it again */
      const retryIntent=playIntent;
      loadFile();

      try{
        await audio.play();
        if(retryIntent!==playIntent) audio.pause();
        return true;
      }catch(_){
        return false;
      }
    }
  }

  async function switchTrack(index){
    hardStop();

    ti=(index+files.length)%files.length;
    sourceIndex=0;
    renderTrack();
    loadFile();

    const switchIntent=playIntent;
    switching=false;

    try{
      await audio.play();
      if(switchIntent!==playIntent) audio.pause();
    }catch(error){
      artist.textContent='tap play again to start ♡';
      if(play)play.textContent='▶';
      console.warn('Softy track switch failed',error);
    }
  }

  toggle?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    if(player)player.open=!player.open;
    toggle.setAttribute('aria-expanded',String(!!player?.open));
  });

  close?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    if(player)player.open=false;
    if(toggle)toggle.setAttribute('aria-expanded','false');
  });

  play?.addEventListener('click',async event=>{
    event.preventDefault();
    event.stopPropagation();

    if(audio.paused){
      switching=false;
      playIntent++;
      await playCurrent();
    }else{
      playIntent++;
      audio.pause();
    }
  });

  prev?.addEventListener('click',async event=>{
    event.preventDefault();
    event.stopPropagation();
    await switchTrack(ti-1);
  });

  next?.addEventListener('click',async event=>{
    event.preventDefault();
    event.stopPropagation();
    await switchTrack(ti+1);
  });

  audio.addEventListener('loadedmetadata',()=>{
    if(dur)dur.textContent=fmt(audio.duration);
  });

  audio.addEventListener('timeupdate',()=>{
    const p=audio.duration?(audio.currentTime/audio.duration)*100:0;
    if(bar)bar.style.width=p+'%';
    if(now)now.textContent=fmt(audio.currentTime);
  });

  audio.addEventListener('play',()=>{
    if(play)play.textContent='Ⅱ';
    player?.classList.add('playing');
  });

  audio.addEventListener('pause',()=>{
    if(play)play.textContent='▶';
    player?.classList.remove('playing');
  });

  audio.addEventListener('ended',()=>{
    if(playIntent<=0) return;
    switchTrack(ti+1);
  });

  audio.addEventListener('error',()=>{
    if(!switching && play) play.textContent='▶';
    if(!switching) artist.textContent='tap play again to start ♡';
  });

  trackBar?.addEventListener('click',event=>{
    if(!Number.isFinite(audio.duration))return;
    const rect=trackBar.getBoundingClientRect();
    audio.currentTime=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width))*audio.duration;
  });

  player?.addEventListener('toggle',()=>{
    toggle?.setAttribute('aria-expanded',String(!!player.open));
  });

  $('.player-note')?.replaceChildren(
    document.createTextNode('Your songs live here · Until I Found You starts first.')
  );

  renderTrack();
  sourceIndex=0;
  loadFile();
})();



/* ================= GARDEN CLICK SAFETY NET ================= */
(function(){
  const garden=document.getElementById('garden');
  const canvas=document.getElementById('gardenCanvas');
  if(!garden || !canvas) return;

  const blooms=Array.from(canvas.querySelectorAll('.bloom'));
  if(!blooms.length) return;

  const labels=['a little hello ♡','just because ♡','for your happy days ♡','one more for you ♡'];

  function bloom(index){
    const flower=blooms[index];
    if(!flower) return;

    flower.style.setProperty('opacity','1','important');
    flower.style.setProperty('transform','scale(1.18)','important');
    flower.classList.add('garden-flower-pop');

    const old=document.getElementById('gardenFlowerMessage');
    if(old) old.remove();

    const note=document.createElement('div');
    note.id='gardenFlowerMessage';
    note.className='garden-flower-message';
    note.textContent=labels[index]||'just for you ♡';
    garden.appendChild(note);

    window.setTimeout(()=>{
      flower.style.setProperty('transform','scale(1)','important');
      note.remove();
    },900);
  }

  canvas.style.pointerEvents='auto';
  canvas.addEventListener('click',event=>{
    const direct=event.target.closest?.('.bloom');
    if(direct){
      const index=Math.max(0,blooms.indexOf(direct));
      bloom(index);
      return;
    }

    /* Fallback: if the SVG itself swallows the target, choose the
       nearest flower to the click location in SVG coordinates. */
    const rect=canvas.getBoundingClientRect();
    if(!rect.width||!rect.height) return;

    const x=((event.clientX-rect.left)/rect.width)*1200;
    const y=((event.clientY-rect.top)/rect.height)*420;
    const points=[
      {x:275,y:68},{x:525,y:75},{x:795,y:62},{x:1082,y:70}
    ];

    let best=0, bestDistance=Infinity;
    points.forEach((point,index)=>{
      const dx=x-point.x, dy=y-point.y;
      const distance=dx*dx+dy*dy;
      if(distance<bestDistance){bestDistance=distance;best=index;}
    });

    bloom(best);
  });
})();



/* ================= NIGHT SKY MEMORY SECTION ================= */
(function nightSkyMemories(){
  const stage=document.getElementById('nightSkyStage');
  const starsRoot=document.getElementById('nightSkyStars');
  const note=document.getElementById('nightSkyNote');
  const noteText=document.getElementById('nightSkyNoteText');
  const close=document.getElementById('nightSkyNoteClose');
  if(!stage||!starsRoot||!note||!noteText) return;

  const memories=[
    'Some of the nicest moments are the ones that looked completely ordinary at first.',
    'There are little things I remember simply because they made the day feel softer.',
    'Sometimes one song can turn into a whole memory by itself.',
    'A tiny laugh can stay with you much longer than you expect.',
    'Not every favourite moment needs a big story. Some are lovely just because they happened.',
    'There are photos you keep for the picture — and photos you keep for everything around it.',
    'Some days are made memorable by one very small thing.',
    'It is funny how the smallest details can end up becoming the ones you keep.',
    'A quiet moment can still deserve a place in the night sky.',
    'Some memories feel brighter every time you come back to them.'
  ];

  const positions=[
    [10,18],[18,34],[26,16],[33,46],[41,24],[49,14],[57,37],[64,20],
    [72,31],[81,17],[88,43],[15,64],[25,78],[36,61],[46,83],[57,69],
    [68,79],[78,62],[89,74],[94,54],[8,48],[21,53],[31,29],[54,54],
    [63,12],[74,48],[85,27],[43,68],[58,88],[70,91]
  ];

  let activeStar=null;

  positions.forEach((pos,index)=>{
    const star=document.createElement('button');
    star.type='button';
    star.className='night-star';
    star.style.left=pos[0]+'%';
    star.style.top=pos[1]+'%';
    star.style.setProperty('--star-scale',(0.7+((index*17)%60)/100).toFixed(2));
    star.setAttribute('aria-label','Open night memory '+(index+1));
    star.addEventListener('click',()=>{
      activeStar?.classList.remove('is-picked');
      activeStar=star;
      star.classList.add('is-picked');
      noteText.textContent=memories[index%memories.length];
      note.classList.add('open');
      note.setAttribute('aria-hidden','false');
    });
    starsRoot.appendChild(star);
  });

  close?.addEventListener('click',()=>{
    note.classList.remove('open');
    note.setAttribute('aria-hidden','true');
    activeStar?.classList.remove('is-picked');
    activeStar=null;
  });
})();




/* ================= SOFTY LIVE CHAT — FINAL =================
   Real-time two-person chat over a PeerJS WebRTC data connection.
   The room code identifies the temporary peer-to-peer room.
=============================================================== */
(function softyLiveChat(){
  'use strict';

  const chat=document.getElementById('softyChat');
  const fab=document.getElementById('softyChatFab');
  const panel=document.getElementById('softyChatPanel');
  const closeBtn=document.getElementById('softyChatClose');
  const intro=document.getElementById('softyChatIntro');
  const room=document.getElementById('softyChatRoom');
  const status=document.getElementById('softyChatStatus');
  const statusLabel=status?.querySelector('span:last-child');
  const nameInput=document.getElementById('softyChatName');
  const createBtn=document.getElementById('softyChatCreate');
  const showJoinBtn=document.getElementById('softyChatShowJoin');
  const joinBox=document.getElementById('softyChatJoinBox');
  const roomInput=document.getElementById('softyChatRoomCodeInput');
  const joinBtn=document.getElementById('softyChatJoin');
  const errorBox=document.getElementById('softyChatError');
  const roomCodeDisplay=document.getElementById('softyChatRoomCodeDisplay');
  const roomState=document.getElementById('softyChatRoomState');
  const copyBtn=document.getElementById('softyChatCopy');
  const leaveBtn=document.getElementById('softyChatLeave');
  const waiting=document.getElementById('softyChatWaiting');
  const messages=document.getElementById('softyChatMessages');
  const typing=document.getElementById('softyChatTyping');
  const compose=document.getElementById('softyChatCompose');
  const input=document.getElementById('softyChatInput');
  const sendBtn=compose?.querySelector('.softy-chat-send');
  const heart=document.getElementById('softyChatHeart');
  const unread=document.getElementById('softyChatUnread');

  if(!chat||!fab||!panel||!intro||!room) return;

  let peer=null;
  let connection=null;
  let displayName=localStorage.getItem('softy-chat-name')||'';
  let roomCode='';
  let isHost=false;
  let connected=false;
  let typingTimer=null;
  let unseen=0;
  let roomHistory=[];
  const historyKeyPrefix='softy-chat-history:';

  if(nameInput) nameInput.value=displayName;

  function setOpen(open){
    chat.classList.toggle('open',open);
    fab.setAttribute('aria-expanded',String(open));
    panel.setAttribute('aria-hidden',String(!open));
    if(open){
      unseen=0;
      updateUnread();
      window.setTimeout(()=> (connected ? input : nameInput)?.focus(),120);
    }
  }
  fab.addEventListener('click',()=>setOpen(!chat.classList.contains('open')));
  closeBtn?.addEventListener('click',()=>setOpen(false));

  function setStatus(text,live=false){
    status?.classList.toggle('live',live);
    if(statusLabel) statusLabel.textContent=text;
  }

  function setError(message=''){
    if(errorBox) errorBox.textContent=message;
  }

  function updateUnread(){
    if(!unread)return;
    unread.textContent=String(unseen);
    unread.classList.toggle('show',unseen>0);
    unread.setAttribute('aria-hidden',String(unseen===0));
  }

  function cleanName(){
    const value=(nameInput?.value||displayName||'You').trim().replace(/\s+/g,' ').slice(0,18);
    return value||'You';
  }

  function makeRoomCode(){
    const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out='';
    for(let i=0;i<6;i++) out+=alphabet[Math.floor(Math.random()*alphabet.length)];
    return out;
  }

  function peerIdFor(code){ return 'softy-'+code.toLowerCase(); }

  function nowLabel(timestamp){
    try{return new Date(timestamp).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});}catch(_){return '';}
  }

  function loadLocalHistory(){
    roomHistory=[];
    if(!roomCode)return;
    try{
      const parsed=JSON.parse(localStorage.getItem(historyKeyPrefix+roomCode)||'[]');
      if(Array.isArray(parsed)) roomHistory=parsed.slice(-80);
    }catch(_){}
  }

  function saveLocalHistory(){
    if(roomCode){
      try{localStorage.setItem(historyKeyPrefix+roomCode,JSON.stringify(roomHistory.slice(-80)));}catch(_){}
    }
  }

  function clearRenderedMessages(){
    if(messages) messages.innerHTML='';
  }

  function renderMessage(message){
    if(!messages||!message?.text)return;
    const me=message.senderId===peer?.id;
    const wrap=document.createElement('div');
    wrap.className='softy-chat-bubble-wrap '+(me?'me':'them');

    const bubble=document.createElement('article');
    bubble.className='softy-chat-bubble';

    const sender=document.createElement('span');
    sender.className='softy-chat-sender';
    sender.textContent=me?'you':(message.senderName||'them');

    const text=document.createElement('p');
    text.className='softy-chat-text';
    text.textContent=String(message.text).slice(0,500);

    const time=document.createElement('span');
    time.className='softy-chat-time';
    time.textContent=nowLabel(message.ts);

    bubble.append(sender,text,time);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
  }

  function renderHistory(){
    clearRenderedMessages();
    const unique=[];
    const seen=new Set();
    for(const item of roomHistory){
      const key=[item.senderId,item.ts,item.text].join('|');
      if(seen.has(key)) continue;
      seen.add(key);
      unique.push(item);
    }
    unique.slice(-80).forEach(renderMessage);
    if(messages) messages.scrollTop=messages.scrollHeight;
    waiting?.classList.toggle('hidden',connected||roomHistory.length>0);
  }

  function saveMessage(message){
    roomHistory=[...roomHistory,message].slice(-80);
    saveLocalHistory();
  }

  function setRoomScreen(show){
    if(show){
      intro.setAttribute('hidden','');
      room.removeAttribute('hidden');
    }else{
      room.setAttribute('hidden','');
      intro.removeAttribute('hidden');
    }
  }

  function setComposerEnabled(enabled){
    connected=!!enabled;
    if(input) input.disabled=!connected;
    if(sendBtn) sendBtn.disabled=!connected;
    if(heart) heart.disabled=!connected;
    room.classList.toggle('live',connected);
    waiting?.classList.toggle('hidden',connected);
    if(connected){
      roomState.textContent='connected · say something ♡';
      setStatus('live together',true);
      input?.focus();
    }else{
      roomState.textContent='waiting for the other person…';
      setStatus(isHost?'waiting for them…':'connecting…',false);
    }
  }

  function addMessage(text){
    const clean=String(text||'').trim().slice(0,500);
    if(!clean||!connection?.open||!peer)return;

    const message={
      type:'message',
      text:clean,
      senderName:displayName,
      senderId:peer.id,
      ts:Date.now()
    };

    saveMessage(message);
    renderMessage(message);
    if(messages)messages.scrollTop=messages.scrollHeight;

    try{connection.send(message);}catch(_){}
  }

  function handleIncomingHistory(list){
    if(!Array.isArray(list))return;
    list.slice(-80).forEach(message=>{
      if(!message||message.type!=='message'||!message.text)return;
      const exists=roomHistory.some(item=>item.senderId===message.senderId&&item.ts===message.ts&&item.text===message.text);
      if(!exists) roomHistory.push(message);
    });
    roomHistory=roomHistory.slice(-80);
    saveLocalHistory();
    renderHistory();
  }

  function sendRoomState(){
    if(!connection?.open)return;
    try{
      connection.send({
        type:'history',
        messages:roomHistory.slice(-80),
        senderName:displayName
      });
    }catch(_){}
  }

  function bindConnection(conn){
    connection=conn;
    setComposerEnabled(false);
    setError('');
    setStatus('connecting…',false);

    conn.on('open',()=>{
      setComposerEnabled(true);
      setError('');
      try{conn.send({type:'hello',senderName:displayName});}catch(_){}
      sendRoomState();
    });

    conn.on('data',data=>{
      if(!data||typeof data!=='object')return;

      if(data.type==='hello'){
        if(roomState) roomState.textContent=(data.senderName||'the other person')+' is here · say something ♡';
        sendRoomState();
        return;
      }

      if(data.type==='history'){
        handleIncomingHistory(data.messages);
        return;
      }

      if(data.type==='message'){
        saveMessage(data);
        renderHistory();
        if(!chat.classList.contains('open')){
          unseen++;
          updateUnread();
        }
        return;
      }

      if(data.type==='typing'){
        typing?.classList.toggle('show',!!data.value);
        if(typing) typing.textContent=data.value ? (data.senderName||'them')+' is typing…' : '';
        clearTimeout(typingTimer);
        if(data.value) typingTimer=setTimeout(()=>{
          typing?.classList.remove('show');
          if(typing)typing.textContent='';
        },1600);
      }
    });

    conn.on('close',()=>{
      connection=null;
      setComposerEnabled(false);
      setError('The other person left the room. Share the code again to reconnect.');
    });

    conn.on('error',()=>{
      setComposerEnabled(false);
      setStatus('connection error',false);
      setError('The live connection could not be opened. Check the room code and try again.');
    });
  }

  function cleanPeer(){
    try{connection?.close();}catch(_){}
    try{peer?.destroy();}catch(_){}
    connection=null;
    peer=null;
    setComposerEnabled(false);
  }

  function ensureName(){
    displayName=cleanName();
    localStorage.setItem('softy-chat-name',displayName);
  }

  function showJoin(){
    joinBox?.removeAttribute('hidden');
    setError('');
    roomInput?.focus();
  }

  function createRoom(){
    ensureName();
    cleanPeer();
    isHost=true;
    roomCode=makeRoomCode();
    roomCodeDisplay.textContent=roomCode;
    loadLocalHistory();
    renderHistory();
    setRoomScreen(true);
    setError('Creating your room…');
    chat.setAttribute('aria-busy','true');
    if(createBtn)createBtn.disabled=true;

    if(typeof window.Peer!=='function'){
      chat.removeAttribute('aria-busy');
      if(createBtn)createBtn.disabled=false;
      setRoomScreen(false);
      setError('The live chat connector did not load. Refresh the page and try again.');
      return;
    }

    peer=new Peer(peerIdFor(roomCode),{debug:0});

    peer.on('open',()=>{
      chat.removeAttribute('aria-busy');
      if(createBtn)createBtn.disabled=false;
      setRoomScreen(true);
      roomCodeDisplay.textContent=roomCode;
      setComposerEnabled(false);
      setStatus('waiting for them…',false);
      setError('');
    });

    peer.on('connection',conn=>{
      if(connection?.open){conn.close();return;}
      bindConnection(conn);
    });

    peer.on('error',error=>{
      chat.removeAttribute('aria-busy');
      if(createBtn)createBtn.disabled=false;

      if(error?.type==='unavailable-id'){
        setRoomScreen(false);
        setError('That room code was already in use. Tap create again for a fresh one.');
      }else{
        setRoomScreen(false);
        setError('The live chat service could not create that room. Try again in a moment.');
      }
    });

    peer.on('disconnected',()=>setStatus('reconnecting…',false));
  }

  function joinRoom(){
    ensureName();
    const code=(roomInput?.value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);

    if(code.length!==6){
      setError('Enter the full 6-character room code.');
      return;
    }

    cleanPeer();
    isHost=false;
    roomCode=code;
    roomCodeDisplay.textContent=code;
    loadLocalHistory();
    renderHistory();
    setRoomScreen(true);
    setError('Connecting to the room…');
    chat.setAttribute('aria-busy','true');
    if(joinBtn)joinBtn.disabled=true;

    if(typeof window.Peer!=='function'){
      chat.removeAttribute('aria-busy');
      if(joinBtn)joinBtn.disabled=false;
      setRoomScreen(false);
      setError('The live chat connector did not load. Refresh the page and try again.');
      return;
    }

    peer=new Peer(undefined,{debug:0});

    peer.on('open',()=>{
      const conn=peer.connect(peerIdFor(code),{reliable:true});
      bindConnection(conn);
    });

    peer.on('error',error=>{
      chat.removeAttribute('aria-busy');
      if(joinBtn)joinBtn.disabled=false;
      setComposerEnabled(false);
      if(error?.type==='peer-unavailable'){
        setRoomScreen(false);
        setError('That room is not open. Have the other person create the room first.');
      }else{
        setRoomScreen(false);
        setError('The live connection could not be started. Try the code again.');
      }
    });

    peer.on('disconnected',()=>setStatus('reconnecting…',false));
  }

  showJoinBtn?.addEventListener('click',showJoin);
  createBtn?.addEventListener('click',createRoom);
  joinBtn?.addEventListener('click',joinRoom);

  copyBtn?.addEventListener('click',async()=>{
    if(!roomCode)return;
    try{
      await navigator.clipboard.writeText(roomCode);
      copyBtn.textContent='copied ♡';
      setTimeout(()=>{copyBtn.textContent='copy code';},1200);
    }catch(_){
      setError('Copy this room code: '+roomCode);
    }
  });

  leaveBtn?.addEventListener('click',()=>{
    cleanPeer();
    roomCode='';
    roomCodeDisplay.textContent='------';
    roomHistory=[];
    if(messages)messages.innerHTML='';
    setRoomScreen(false);
    setError('');
    setStatus('not connected',false);
    if(joinBox)joinBox.setAttribute('hidden','');
  });

  compose?.addEventListener('submit',event=>{
    event.preventDefault();
    if(!connected)return;
    const value=input?.value||'';
    addMessage(value);
    if(input)input.value='';
    if(connection?.open){
      try{connection.send({type:'typing',value:false,senderName:displayName});}catch(_){}
    }
  });

  input?.addEventListener('input',()=>{
    if(!connection?.open)return;
    try{connection.send({type:'typing',value:true,senderName:displayName});}catch(_){}
    clearTimeout(typingTimer);
    typingTimer=setTimeout(()=>{
      try{connection?.send({type:'typing',value:false,senderName:displayName});}catch(_){}
    },900);
  });

  heart?.addEventListener('click',()=>addMessage('♡'));

  window.addEventListener('beforeunload',()=>cleanPeer());

  setComposerEnabled(false);
  setStatus('not connected',false);
  setRoomScreen(false);
})();