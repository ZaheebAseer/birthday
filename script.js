const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const gifts = [
  {emoji:"🧸",name:"tiny teddy",title:"A tiny teddy hug",message:"Madam jii, jab words kam pad jaayein na, toh meri taraf se ek lamba sa teddy hug. 🤗"},
  {emoji:"💌",name:"little note",title:"A little love note",message:"Aapki smile ka reason banna — honestly, that would be such a cute little privilege. ❤️"},
  {emoji:"🐰",name:"sleepy bunny",title:"Sleepy bunny",message:"Official notice: aaj overthinking ki chhutti hai. Bunny ne approve kar diya. 🐰"},
  {emoji:"🌷",name:"blooming flower",title:"A flower for you",message:"Har mausam mein tera dil khilta rahe, aur teri zindagi mein narmi bani rahe. 🌷"},
  {emoji:"😂",name:"silly surprise",title:"One silly surprise",message:"Birthday girl ko aaj tang nahi karenge… bas 19 gifts khulwaane jitna toh karenge. 🤭"},
  {emoji:"⭐",name:"pocket stars",title:"A pocketful of stars",message:"May your dreams find room to grow, and may you never feel too small for the sky. ✨"},
  {emoji:"🧸",name:"teddy hug",title:"Another teddy hug",message:"Teddy hug subscription: lifetime. Renewal charges? Bas ek si smile. ❤️"},
  {emoji:"🎀",name:"tiny crown",title:"Birthday princess",message:"Crown seedha rakhiye, Madam jii. Aaj toh poori duniya ka royal treatment banta hai. 👑"},
  {emoji:"🦋",name:"little butterfly",title:"A little butterfly",message:"May life surprise you with colours you never even knew you were missing. 🦋"},
  {emoji:"🍰",name:"mini cake",title:"A tiny cake",message:"Cake ka ek virtual bite meri taraf se. Calories zero, sweetness unlimited. 🎂"},
  {emoji:"🐻",name:"sleepy bear",title:"Sleepy bear",message:"Reminder from sleepy bear: har cheez ka answer aaj hi dhoondhna zaroori nahi. Rest too, okay? 😴"},
  {emoji:"💗",name:"heart in a box",title:"A heart for you",message:"Kuch logon ki jagah explain nahi hoti — bas dil jaanta hai ke woh khaas hain. 💗"},
  {emoji:"🌙",name:"moonlit wish",title:"A moonlit wish",message:"Teri raaton ko sukoon mile, subahon ko nayi umeed, aur dil ko be-wajah si khushi. 🌙"},
  {emoji:"🐱",name:"tiny kitten",title:"A tiny kitten",message:"Complaint file karni padegi: itni cuteness ek hi insaan ko kaise mil gayi? 😭"},
  {emoji:"🎈",name:"birthday balloon",title:"A birthday balloon",message:"Aaj ka tiny plan: smile, cake, gifts, repeat. Baaki duniya kal handle kar lenge. 🎈"},
  {emoji:"🌹",name:"little rose",title:"A little rose",message:"Tere husn ka zikr karun toh lafz kam padte hain; teri fitrat ka likhun toh dil bhar aata hai. 🌹"},
  {emoji:"🫶",name:"warm hug",title:"A warm hug",message:"Distance can keep people apart, but some people still feel close in the softest corners of the heart. 🫶"},
  {emoji:"✨",name:"a wish",title:"A wish just for you",message:"May the world meet your gentle heart with gentleness of its own. ✨"},
  {emoji:"💝",name:"the last gift",title:"The nineteenth surprise",message:"Yeh box khaali bhi hota, toh bhi ek baat ismein aa jaati: I genuinely wish you a life that feels kind, safe, and beautifully yours. Happy 19th, Madam jii. ❤️"}
];

const giftGrid = $("#giftGrid");
gifts.forEach((gift, index) => {
  const btn = document.createElement("button");
  btn.className = "gift-box reveal";
  btn.type = "button";
  btn.dataset.gift = index;
  btn.setAttribute("aria-label", `Open gift ${index+1}: ${gift.name}`);
  btn.innerHTML = `<span class="gift-emoji">${gift.emoji}</span><span class="gift-number">GIFT ${String(index+1).padStart(2,"0")}</span><span class="gift-name">${gift.name}</span>`;
  giftGrid.appendChild(btn);
});

let opened = new Set();
let activeGiftIndex = -1;
let allGiftsCelebrated = false;
const dialog = $("#giftDialog");
function openGift(index) {
  const gift = gifts[index];
  if (!gift) return;
  activeGiftIndex = index;
  const wasOpened = opened.has(index);
  opened.add(index);
  const button = $(`[data-gift="${index}"]`);
  if (button) button.classList.add("opened");
  $("#openedCount").textContent = opened.size;
  $("#giftProgress").style.width = `${opened.size / gifts.length * 100}%`;
  $(".count-track").setAttribute("aria-valuenow", String(opened.size));
  $("#giftRevealArt").textContent = gift.emoji;
  $("#giftRevealArt").classList.remove("gift-pop-again");
  void $("#giftRevealArt").offsetWidth;
  $("#giftRevealArt").classList.add("gift-pop-again");
  dialog.classList.toggle("last-gift", index === gifts.length - 1);
  $("#giftDialogDone").textContent = index === gifts.length - 1 ? "READ MY LAST WISH ✦" : "AWWW, NEXT ✦";
  $("#giftRevealTitle").textContent = gift.title;
  $("#giftRevealMessage").textContent = gift.message;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  if (!wasOpened && opened.size === gifts.length && !allGiftsCelebrated) {
    allGiftsCelebrated = true;
    setTimeout(() => { showToast("All 19 little surprises opened. One last wish is waiting for you. ♡"); burstConfetti(35); }, 450);
  }
}
giftGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-gift]");
  if (button) openGift(Number(button.dataset.gift));
});
function closeGift() { if (dialog.open) dialog.close(); else dialog.removeAttribute("open"); }
$("#closeGift").addEventListener("click", closeGift);
$("#giftDialogDone").addEventListener("click", () => {
  const isLastGift = activeGiftIndex === gifts.length - 1;
  closeGift();
  if (isLastGift) {
    $("#finale").scrollIntoView({behavior:reduceMotion?"auto":"smooth"});
    showToast("For you, Madam jii — with all my heart. ♡");
  }
});
dialog.addEventListener("click", e => { if (e.target === dialog) closeGift(); });

$$(".blessing-card").forEach(card => card.addEventListener("click", () => {
  const open = card.getAttribute("aria-expanded") === "true";
  $$(".blessing-card").forEach(other => other.setAttribute("aria-expanded", "false"));
  card.setAttribute("aria-expanded", String(!open));
}));

$$(".world-toy").forEach(toy => toy.addEventListener("click", () => {
  $("#worldMessage").textContent = toy.dataset.message;
  toy.animate([{transform:"scale(1)"},{transform:"scale(1.28) rotate(-8deg)"},{transform:"scale(1)"}], {duration:500,easing:"ease-out"});
  showToast(toy.dataset.message);
}));

const bearLines = {
  wave:["HIII MADAM JII 👋🥹","Maine practice kiya hai 😭","Aapne mujhe dekha na? Ab main famous."],
  dance:["Dekho mera dance 😂","Mujhe bas cake ke liye energy aati hai.","Okay bas, chakkar aa gaye 😵‍💫"],
  surprise:["CAKE KAHAN HAI??? 😭","Surprise! Main hi gift hoon. 🤭","Ek aur hug? 🥹"]
};
let bearClicks = {wave:0,dance:0,surprise:0};
Object.entries({wave:"#bearWave",dance:"#bearDance",surprise:"#bearSurprise"}).forEach(([key,selector])=>{
  $(selector).addEventListener("click",()=>{
    const list=bearLines[key]; const line=list[bearClicks[key]++%list.length];
    $("#bearSpeech").textContent=`“${line}”`;
    $(".mini-bear").animate([{transform:"translateY(0) rotate(0)"},{transform:"translateY(-18px) rotate(-5deg)"},{transform:"translateY(0) rotate(0)"}],{duration:600,easing:"ease-out"});
  });
});

$("#enterButton").addEventListener("click",()=>{
  $("#world").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  showToast("Welcome to your little world, Madam jii ♡");
});

function showToast(message){
  const toast=$("#toast"); toast.textContent=message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600);
}

// Ambient stars: modest count and capped DPR for mobile performance.
const canvas=$("#stars"), ctx=canvas.getContext("2d");
let starList=[], w=0, h=0, dpr=1;
function resizeStars(){
  dpr=Math.min(window.devicePixelRatio||1,1.5); w=window.innerWidth; h=window.innerHeight;
  canvas.width=Math.floor(w*dpr); canvas.height=Math.floor(h*dpr); canvas.style.width=w+"px"; canvas.style.height=h+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const count=Math.min(100,Math.max(45,Math.floor(w*h/12500)));
  starList=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.25,a:Math.random()*.65+.2,s:Math.random()*.012+.003,p:Math.random()*Math.PI*2}));
}
let animationFrame=0;
function drawStars(time=0){
  if(document.hidden){animationFrame=0;return}
  ctx.clearRect(0,0,w,h);
  for(const s of starList){s.p+=s.s;const alpha=s.a*(.7+.3*Math.sin(s.p));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(245,222,173,${alpha})`;ctx.fill()}
  if(!reduceMotion) animationFrame=requestAnimationFrame(drawStars);
}
resizeStars(); drawStars();
window.addEventListener("resize",resizeStars);
document.addEventListener("visibilitychange",()=>{if(document.hidden){if(animationFrame)cancelAnimationFrame(animationFrame);animationFrame=0}else if(!reduceMotion&&!animationFrame)drawStars()});

// Scene reveals and reading progress.
$("#home").classList.add("section-arrived");
if("IntersectionObserver" in window && !reduceMotion){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
  $$(".reveal").forEach(el=>observer.observe(el));
  const sceneObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("section-arrived");sceneObserver.unobserve(entry.target)}}),{threshold:.22});
  $$("main > section").forEach(section=>sceneObserver.observe(section));
}else $$(".reveal").forEach(el=>el.classList.add("visible"));
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  $("#readingProgress").style.width=(max>0?window.scrollY/max*100:0)+"%";
},{passive:true});

// Tiny original ambient tones using Web Audio; starts only after explicit user action.
let audioCtx=null, soundOn=false, musicTimer=null, noteIndex=0;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46];
function playNote(freq, duration=.55, volume=.035){
  if(!audioCtx||!soundOn)return;
  const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.type="sine"; osc.frequency.value=freq; gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume,audioCtx.currentTime+.08);
  gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+duration);
  osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+duration+.05);
}
function melody(){if(!soundOn)return;playNote(notes[noteIndex++%notes.length],.62,.022);musicTimer=setTimeout(melody,720)}
$("#soundButton").addEventListener("click",async()=>{
  if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==="suspended")await audioCtx.resume();
  soundOn=!soundOn;
  $("#soundButton").setAttribute("aria-pressed",String(soundOn));
  $("#soundButton span").textContent=soundOn?"sound on":"sound off";
  if(soundOn)melody();else clearTimeout(musicTimer);
});

// Birthday cake: nineteen candles for her nineteenth birthday.
const candles=$("#candles");
for(let i=0;i<19;i++){
  const candle=document.createElement("button"); candle.type="button";candle.className="candle";candle.setAttribute("aria-label",`Candle ${i+1} of 19`);
  candle.innerHTML='<span class="flame"></span><span class="wick"></span>';
  candle.style.left=`${3+i*5.2}%`;candle.style.setProperty("--delay",`${i*.04}s`);
  candle.addEventListener("click",()=>{candle.classList.toggle("lit")});
  candles.appendChild(candle);
}
$("#lightCandles").addEventListener("click",()=>{
  $$(".candle").forEach((c,i)=>setTimeout(()=>c.classList.add("lit"),reduceMotion?0:i*65));
  $("#cakeMessage").textContent="Aankhein band karo… wish maango, Madam jii. 🥹";
  $("#blowCandles").disabled=false;
});
$("#blowCandles").addEventListener("click",()=>{
  $$(".candle").forEach(c=>c.classList.remove("lit"));
  $("#cakeMessage").textContent="Wish maang li? Ab woh sitaaron ke paas hai. ✨";
  burstConfetti(45);
});

function burstConfetti(amount=65){
  const layer=$("#confetti");layer.innerHTML="";
  const bits=["✦","♡","✧","❀","✨","💗"];
  for(let i=0;i<amount;i++){
    const p=document.createElement("span");p.className="confetti-piece";p.textContent=bits[Math.floor(Math.random()*bits.length)];
    p.style.setProperty("--x",`${Math.random()*100}%`);p.style.setProperty("--fall",`${2.2+Math.random()*2.8}s`);
    p.style.left=`${Math.random()*100}%`;p.style.color=["#e9c982","#f1a9c0","#fff4e5","#a9c7e8"][i%4];
    layer.appendChild(p);
  }
  setTimeout(()=>layer.innerHTML="",5200);
}

$("#celebrateButton").addEventListener("click",()=>{burstConfetti(100);showToast("Happy Birthday, Madam jii! ❤️🎉")});

// Memory scrapbook cards: placeholders are explicit until real memories/photos are supplied.
$$(".memory-card").forEach(card=>card.addEventListener("click",()=>showToast(card.dataset.memory)));

// Sadiya constellation: points connect into a stylized name when the button is pressed.
const constellationCanvas=$("#constellationCanvas");
function drawConstellation(connect=false){
  if(!constellationCanvas)return;
  const rect=constellationCanvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,1.5);
  constellationCanvas.width=Math.floor(rect.width*dpr);constellationCanvas.height=Math.floor(rect.height*dpr);
  const c=constellationCanvas.getContext("2d");c.setTransform(dpr,0,0,dpr,0,0);
  const width=rect.width,height=rect.height;
  c.clearRect(0,0,width,height);
  const points=[[.08,.55],[.19,.25],[.29,.63],[.39,.36],[.50,.57],[.61,.27],[.71,.62],[.82,.37],[.93,.53]];
  for(let i=0;i<55;i++){const x=(i*79%997)/997*width,y=(i*137%991)/991*height;c.fillStyle=`rgba(245,222,173,${.2+(i%5)*.12})`;c.beginPath();c.arc(x,y,i%7===0?1.6:.7,0,Math.PI*2);c.fill()}
  if(connect){
    c.strokeStyle="#e9c982";c.lineWidth=1.4;c.shadowBlur=9;c.shadowColor="#e9c982";
    c.beginPath();points.forEach((p,i)=>i===0?c.moveTo(p[0]*width,p[1]*height):c.lineTo(p[0]*width,p[1]*height));c.stroke();c.shadowBlur=0;
  }
  points.forEach((p,i)=>{c.beginPath();c.fillStyle=i%2?"#fff0ce":"#f1c8d8";c.arc(p[0]*width,p[1]*height,i%3===0?3.2:2.1,0,Math.PI*2);c.fill()});
  if(connect){c.font="italic 26px Georgia";c.textAlign="center";c.fillStyle="#fff4e5";c.fillText("S A D I Y A",width/2,height-20)}
}
if(constellationCanvas){
  drawConstellation(false);
  window.addEventListener("resize",()=>drawConstellation($("#connectStars")?.dataset.connected==="true"));
  $("#connectStars").addEventListener("click",()=>{
    $("#connectStars").dataset.connected="true";drawConstellation(true);
    showToast("Some people deserve their own constellation. ♡");
  });
}


/* Restored 3D Birthday Teddy — adapted from the earlier animated companion. */
(async function restoreTeddy3D(){
  const host = document.querySelector('#bear3D');
  if(!host) return;
  const stage = host.closest('.bear-stage');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let THREE;
  try { THREE = await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js'); }
  catch(err) { console.warn('3D teddy unavailable; showing illustrated fallback.', err); return; }
  try {
    const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.setSize(host.clientWidth||360,host.clientHeight||340,false);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000,0);
    host.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,2.1,8.6);camera.lookAt(0,1.75,0);
    scene.add(new THREE.HemisphereLight(0xfff5e4,0x0d1e36,1.55));
    const key=new THREE.DirectionalLight(0xffe2b8,2.2);key.position.set(3,5,5);scene.add(key);
    const rim=new THREE.DirectionalLight(0xd98f83,2);rim.position.set(-4,3,-4);scene.add(rim);
    const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extra});
    const fur=mat(0xc98e5a), furDark=mat(0xb57d4c), cream=mat(0xfff0dc), dark=mat(0x291b22,{roughness:.28}), blush=mat(0xe8a9a0,{transparent:true,opacity:.8}), gold=mat(0xddbd73,{metalness:.3,roughness:.4}), coral=mat(0xd98f83,{roughness:.35}), white=new THREE.MeshBasicMaterial({color:0xffffff});
    const sphere=(r,w=28,h=20)=>new THREE.SphereGeometry(r,w,h);
    const mesh=(g,m,pos=[0,0,0],scale=[1,1,1])=>{const o=new THREE.Mesh(g,m);o.position.set(...pos);o.scale.set(...scale);return o;};
    const bear=new THREE.Group();scene.add(bear);
    const body=mesh(sphere(1),fur,[0,1.05,0],[1,1.1,.9]);bear.add(body);
    bear.add(mesh(sphere(.62),cream,[0,.95,.6],[1,1.1,.5]));
    [-1,1].forEach(side=>{bear.add(mesh(sphere(.4),furDark,[side*.5,.28,.35],[1,.8,1.15]));bear.add(mesh(sphere(.2),blush,[side*.5,.26,.78],[1,1,.3]));});
    const makeArm=side=>{const pivot=new THREE.Group();pivot.position.set(side*.82,1.6,.05);pivot.add(mesh(new THREE.CapsuleGeometry(.21,.55,8,16),furDark,[0,-.4,0]));pivot.rotation.z=side*.6;bear.add(pivot);return pivot;};
    const armL=makeArm(-1),armR=makeArm(1);
    const head=new THREE.Group();head.position.set(0,2.4,0);bear.add(head);
    head.add(mesh(sphere(.86),fur,[0,0,0],[1.05,.95,.95]));
    [-1,1].forEach(side=>{head.add(mesh(sphere(.3),fur,[side*.62,.6,-.05]));head.add(mesh(sphere(.17),blush,[side*.62,.6,.12],[1,1,.5]));});
    head.add(mesh(sphere(.36),cream,[0,-.22,.7],[1.2,.85,.8]));head.add(mesh(sphere(.11),dark,[0,-.1,.99],[1.4,1,1]));
    const smile=mesh(new THREE.TorusGeometry(.09,.02,8,16,Math.PI),dark,[0,-.32,.98]);smile.rotation.z=Math.PI;head.add(smile);
    const ooh=mesh(new THREE.TorusGeometry(.06,.022,8,16),dark,[0,-.34,.98]);ooh.visible=false;head.add(ooh);
    const eyes=[-1,1].map(side=>{const eye=new THREE.Group();eye.position.set(side*.32,.1,.76);eye.add(mesh(sphere(.1,16,12),dark));eye.add(mesh(sphere(.035,8,6),white,[.03,.04,.08]));head.add(eye);return eye;});
    [-1,1].forEach(side=>head.add(mesh(sphere(.13,16,12),blush,[side*.56,-.2,.62],[1,.6,.3])));
    const hat=new THREE.Group();hat.position.set(.08,.8,-.05);hat.rotation.z=-.22;head.add(hat);
    const hatMat=mat(0xddbd73,{metalness:.2});hat.add(mesh(new THREE.ConeGeometry(.38,.95,24,1,true),hatMat,[0,.45,0]));hat.add(mesh(sphere(.13,16,12),cream,[0,.95,0]));
    const balloon=new THREE.Group();balloon.position.set(-1.75,3.6,-.3);bear.add(balloon);balloon.add(mesh(sphere(.55),coral,[0,0,0],[1,1.18,1]));balloon.add(mesh(new THREE.ConeGeometry(.08,.12,12),coral,[0,-.68,0]));
    const stringGeo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]);bear.add(new THREE.Line(stringGeo,new THREE.LineBasicMaterial({color:0xfff5e4,transparent:true,opacity:.65})));
    const cake=new THREE.Group();cake.position.set(1.55,0,.7);scene.add(cake);cake.add(mesh(new THREE.CylinderGeometry(.42,.42,.36,28),cream,[0,.18,0]));cake.add(mesh(new THREE.CylinderGeometry(.44,.44,.08,28),coral,[0,.38,0]));cake.add(mesh(new THREE.CylinderGeometry(.03,.03,.22,8),gold,[0,.53,0]));
    const flameMat=new THREE.SpriteMaterial({color:0xffd078,transparent:true,opacity:.8});const flame=new THREE.Sprite(flameMat);flame.position.set(0,.7,0);flame.scale.set(.25,.35,1);cake.add(flame);
    const shadow=mesh(new THREE.CircleGeometry(1.9,32),new THREE.MeshBasicMaterial({color:0x020713,transparent:true,opacity:.28,depthWrite:false}),[0,.015,.2]);shadow.rotation.x=-Math.PI/2;scene.add(shadow);
    let state='idle',stateTime=0,idleTime=0,blinkAt=2,blinkTime=-1,elapsed=0,raf=0;const pointer={x:0,y:0};
    const react=kind=>{state=kind==='surprise'?'surprised':kind;stateTime=0;idleTime=0;};
    host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;});
    host.addEventListener('click',()=>{react(['happy','wave','surprised','dance'][Math.floor(Math.random()*4)]);});
    host.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();react('happy');}});
    document.querySelector('#bearWave')?.addEventListener('click',()=>react('wave'));
    document.querySelector('#bearDance')?.addEventListener('click',()=>react('dance'));
    document.querySelector('#bearSurprise')?.addEventListener('click',()=>react('surprised'));
    const resize=()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
    new ResizeObserver(resize).observe(host);resize();stage?.classList.add('is-3d');
    let last=performance.now();
    function frame(now){if(document.hidden){raf=0;return;}const dt=Math.min((now-last)/1000,.05);last=now;elapsed+=dt;stateTime+=dt;idleTime+=dt;
      const durations={happy:1.4,wave:2.4,dance:4.5,surprised:1.4};if(durations[state]&&stateTime>durations[state]){state='idle';stateTime=0;}
      if(state==='idle'&&idleTime>16){state='sleepy';stateTime=0;}if(state==='sleepy'&&idleTime<1)state='idle';
      const k=reduced?.25:1;let y=0,rotY=0,rotZ=Math.sin(elapsed*.8)*.03*k,aL=-.6,aR=.6,eyeS=1,headZ=0,headX=0;
      body.scale.y=1.1*(1+Math.sin(elapsed*(state==='sleepy'?1.2:2.2))*.018);
      if(state==='happy'){y=Math.abs(Math.sin(stateTime*7))*.4*k;aL=-1.6;aR=1.6;}
      if(state==='wave'){aR=2.5+Math.sin(stateTime*10)*.35;headZ=-.12;}
      if(state==='dance'){rotY=Math.sin(stateTime*4)*.5*k;y=Math.abs(Math.sin(stateTime*8))*.22*k;aL=-1.9+Math.sin(stateTime*8)*.6;aR=1.9+Math.sin(stateTime*8+Math.PI)*.6;headZ=Math.sin(stateTime*4)*.15;}
      if(state==='surprised'){y=Math.sin(Math.min(stateTime/.5,1)*Math.PI)*.55*k;eyeS=1.45;aL=-1.2;aR=1.2;}
      if(state==='sleepy'){eyeS=.15;headZ=.22;headX=.18;}
      smile.visible=state!=='surprised';ooh.visible=state==='surprised';if(state!=='sleepy'){blinkAt-=dt;if(blinkAt<0&&blinkTime<0){blinkTime=0;blinkAt=2.5+Math.random()*2.5;}if(blinkTime>=0){blinkTime+=dt;if(blinkTime<.14)eyeS=.1;else blinkTime=-1;}}
      eyes.forEach(e=>{e.scale.y+=(eyeS-e.scale.y)*.4;e.scale.x=e.scale.z=eyeS>1?eyeS:1;});const ease=Math.min(dt*10,1);bear.position.y+=(y-bear.position.y)*(state==='happy'||state==='dance'||state==='surprised'?1:ease);bear.rotation.y+=(rotY+pointer.x*.3-bear.rotation.y)*ease;bear.rotation.z=rotZ;armL.rotation.z+=(aL-armL.rotation.z)*ease;armR.rotation.z+=(aR-armR.rotation.z)*ease;head.rotation.z+=(headZ-head.rotation.z)*ease;head.rotation.x+=(headX+pointer.y*.25-head.rotation.x)*ease;head.rotation.y=pointer.x*.35;
      balloon.position.y=3.6+Math.sin(elapsed*1.3)*.1;balloon.rotation.z=Math.sin(elapsed*.9)*.08;const p=stringGeo.attributes.position;p.setXYZ(0,Math.sin(armL.rotation.z)*.85+armL.position.x,armL.position.y-Math.cos(armL.rotation.z)*.85,armL.position.z+.1);p.setXYZ(1,balloon.position.x,balloon.position.y-.72,balloon.position.z);p.needsUpdate=true;flame.scale.y=.35+Math.sin(elapsed*18)*.03;renderer.render(scene,camera);raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);document.addEventListener('visibilitychange',()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}else if(!document.hidden&&!raf){last=performance.now();raf=requestAnimationFrame(frame);}});
  } catch(err){console.error('Could not start 3D teddy; using fallback.',err);}
})();


/* Cute ambient gestures in every scene: tiny balloons, blooming flowers,
   soft-toy cameos and heart sparkles. These are decorative and never cover
   the main controls. Tapping one creates a little burst of affection. */
(function initSceneGestures(){
  const sceneIds = ['home','world','bear','blessings','memories','gifts','poem','promise','cake','constellation','finale'];
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  /* Positions sit in the breathing space along the sides, not in all four corners. */
  const desktopLayouts = [
    [{e:'🎈',c:'gesture-balloon',x:14,y:24},{e:'🌸',c:'gesture-flower',x:84,y:68},{e:'♡',c:'gesture-heart',x:70,y:15}],
    [{e:'🌷',c:'gesture-flower',x:13,y:65},{e:'🎈',c:'gesture-balloon',x:85,y:30},{e:'✦',c:'gesture-heart',x:68,y:82}],
    [{e:'🧸',c:'gesture-toy',x:13,y:28},{e:'🌼',c:'gesture-flower',x:86,y:69}],
    [{e:'🌸',c:'gesture-flower',x:14,y:28},{e:'♡',c:'gesture-heart',x:86,y:70}],
    [{e:'🌷',c:'gesture-flower',x:13,y:28},{e:'🎈',c:'gesture-balloon',x:86,y:68}],
    [{e:'🎈',c:'gesture-balloon',x:14,y:29},{e:'🌸',c:'gesture-flower',x:85,y:70}],
    [{e:'🌹',c:'gesture-flower',x:13,y:27},{e:'♡',c:'gesture-heart',x:86,y:70}],
    [{e:'🌷',c:'gesture-flower',x:14,y:68},{e:'🎈',c:'gesture-balloon',x:85,y:28}],
    [{e:'🎈',c:'gesture-balloon',x:14,y:27},{e:'🌼',c:'gesture-flower',x:85,y:69}],
    [{e:'🌸',c:'gesture-flower',x:14,y:29},{e:'🎈',c:'gesture-balloon',x:85,y:69}],
    [{e:'🌹',c:'gesture-flower',x:14,y:27},{e:'♡',c:'gesture-heart',x:85,y:68}]
  ];
  const mobileLayouts = [
    [{e:'🎈',c:'gesture-balloon',x:7,y:28},{e:'🌸',c:'gesture-flower',x:88,y:72}],
    [{e:'🌷',c:'gesture-flower',x:7,y:72},{e:'🎈',c:'gesture-balloon',x:88,y:28}],
    [{e:'🧸',c:'gesture-toy',x:7,y:30},{e:'🌼',c:'gesture-flower',x:88,y:70}],
    [{e:'🌸',c:'gesture-flower',x:7,y:30},{e:'♡',c:'gesture-heart',x:88,y:70}],
    [{e:'🌷',c:'gesture-flower',x:7,y:30},{e:'🎈',c:'gesture-balloon',x:88,y:70}],
    [{e:'🎈',c:'gesture-balloon',x:7,y:30},{e:'🌸',c:'gesture-flower',x:88,y:70}],
    [{e:'🌹',c:'gesture-flower',x:7,y:30},{e:'♡',c:'gesture-heart',x:88,y:70}],
    [{e:'🌷',c:'gesture-flower',x:7,y:70},{e:'🎈',c:'gesture-balloon',x:88,y:30}],
    [{e:'🎈',c:'gesture-balloon',x:7,y:30},{e:'🌼',c:'gesture-flower',x:88,y:70}],
    [{e:'🌸',c:'gesture-flower',x:7,y:30},{e:'🎈',c:'gesture-balloon',x:88,y:70}],
    [{e:'🌹',c:'gesture-flower',x:7,y:30},{e:'♡',c:'gesture-heart',x:88,y:70}]
  ];
  sceneIds.forEach((id, i) => {
    const scene = document.getElementById(id);
    if (!scene || scene.querySelector('.scene-gestures')) return;
    if (getComputedStyle(scene).position === 'static') scene.style.position = 'relative';
    const layer = document.createElement('div');
    layer.className = 'scene-gestures';
    layer.setAttribute('aria-label','Little floating birthday decorations');
    layer.setAttribute('aria-hidden','false');
    const items = (mobile ? mobileLayouts : desktopLayouts)[i] || desktopLayouts[0];
    items.forEach((item, j) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'gesture ' + item.c;
      if (item.c.includes('balloon')) {
        el.innerHTML = '<span class="balloon-body"><i class="balloon-glint"></i></span><span class="balloon-knot"></span><span class="balloon-string"></span>';
      } else if (item.c.includes('flower')) {
        el.innerHTML = '<span class="flower-stem"></span><span class="flower-leaf"></span><span class="flower-leaf leaf-right"></span><span class="flower-head">' +
          Array.from({length:8},()=>'<i class="petal"></i>').join('') + '<i class="flower-center"></i></span>';
      } else {
        el.textContent = item.e;
      }
      el.style.left = item.x + '%';
      el.style.top = item.y + '%';
      el.style.animationDelay = reduced ? '0s' : (-j * 1.15) + 's';
      el.setAttribute('aria-label', item.c.includes('flower') ? 'Make a little flower bloom' :
        item.c.includes('balloon') ? 'Send a tiny balloon floating' :
        item.c.includes('toy') ? 'Give the tiny teddy a cuddle' : 'Send a little heart');
      el.addEventListener('click', () => {
        el.classList.remove('gesture-bloom','gesture-pop');
        void el.offsetWidth;
        el.classList.add(item.c.includes('flower') ? 'gesture-bloom' : 'gesture-pop');
        if (item.c.includes('flower')) el.classList.toggle('is-bloomed');
        const burst = document.createElement('span');
        burst.className = 'gesture-burst';
        burst.textContent = item.c.includes('flower') ? '✦' : item.c.includes('balloon') ? '✧' : item.c.includes('toy') ? '💗' : '✨';
        burst.style.left = item.x + '%';
        burst.style.top = item.y + '%';
        layer.appendChild(burst);
        window.setTimeout(() => burst.remove(), 1200);
        if (item.c.includes('toy')) {
          const bearMessage = document.getElementById('bearMessage');
          if (bearMessage) bearMessage.textContent = 'A tiny cuddle, specially for Madam jii. 🧸';
          const bearStage = document.querySelector('.bear-stage');
          if (bearStage) bearStage.classList.add('is-loved');
          window.setTimeout(() => bearStage && bearStage.classList.remove('is-loved'), 900);
        }
      });
      layer.appendChild(el);
    });
    scene.appendChild(layer);
  });
})();

/* A small, gentle flower bloom on interactive controls, plus floating hearts
   after meaningful actions. Delegation means newly-created gift controls work too. */
document.addEventListener('click', function(e){
  const target = e.target.closest('button:not(.gesture)');
  if (!target || target.disabled || target.closest('dialog')) return;
  const rect = target.getBoundingClientRect();
  const petal = document.createElement('span');
  petal.className = 'gesture-burst';
  petal.textContent = ['🌸','♡','✨'][Math.floor(Math.random()*3)];
  petal.style.position = 'fixed';
  petal.style.left = Math.min(window.innerWidth-24, Math.max(8, rect.left + rect.width/2)) + 'px';
  petal.style.top = Math.max(8, rect.top + rect.height/2) + 'px';
  petal.style.zIndex = '9999';
  petal.style.pointerEvents = 'none';
  document.body.appendChild(petal);
  window.setTimeout(()=>petal.remove(), 1350);
});
