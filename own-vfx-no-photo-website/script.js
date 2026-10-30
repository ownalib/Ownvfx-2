const projects = [
  {type:'reel',title:'Reel Project 01',file:'media/reels/reel-01.mp4',symbol:'▶'},
  {type:'reel',title:'Reel Project 02',file:'media/reels/reel-02.mp4',symbol:'✺'},
  {type:'reel',title:'Reel Project 03',file:'media/reels/reel-03.mp4',symbol:'↗'},
  {type:'post',title:'Instagram Post 01',file:'media/posts/post-01.jpg',symbol:'✳'},
  {type:'post',title:'Instagram Post 02',file:'media/posts/post-02.jpg',symbol:'☺'},
  {type:'post',title:'Instagram Post 03',file:'media/posts/post-03.jpg',symbol:'★'},
  {type:'video',title:'Horizontal Video 01',file:'media/videos/video-01.mp4',symbol:'▶'},
  {type:'video',title:'Horizontal Video 02',file:'media/videos/video-02.mp4',symbol:'↗'},
  {type:'video',title:'Horizontal Video 03',file:'media/videos/video-03.mp4',symbol:'✦'},
];
const grid=document.getElementById('portfolioGrid');
const modal=document.getElementById('lightbox');
const modalContent=document.getElementById('lightboxContent');
const label={reel:'VERTICAL REEL',post:'INSTAGRAM POST',video:'HORIZONTAL VIDEO'};
const escapeHtml=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function placeholder(p){return `<div class="portfolio-placeholder"><span class="placeholder-symbol">${p.symbol}</span><strong>COMING SOON!</strong><small>${escapeHtml(p.file)}</small></div>`}
function checkMedia(p){return new Promise(resolve=>{if(p.type==='post'){const i=new Image();i.onload=()=>resolve(true);i.onerror=()=>resolve(false);i.src=p.file+'?v=1';}else{const v=document.createElement('video');v.preload='metadata';v.onloadedmetadata=()=>resolve(true);v.onerror=()=>resolve(false);v.src=p.file+'?v=1';}setTimeout(()=>resolve(false),5000)})}
async function renderProjects(){const exist=await Promise.all(projects.map(checkMedia));mediaAvailability=exist;grid.innerHTML=projects.map((p,i)=>{const avail=exist[i];const media=avail?(p.type==='post'?`<img src="${p.file}" alt="${p.title}" loading="lazy">`:`<video src="${p.file}#t=0.1" muted playsinline preload="metadata" aria-label="${p.title}"></video>`):placeholder(p);return `<article class="portfolio-card reveal visible" data-type="${p.type}" data-index="${i}" tabindex="0" role="button" aria-label="Preview ${p.title}"><div class="portfolio-visual is-${p.type}">${media}<span class="play-overlay">${avail?'↗':'+'}</span></div><div class="portfolio-meta"><strong>${p.title}</strong><span>${label[p.type]}</span></div></article>`}).join('');grid.querySelectorAll('.portfolio-card').forEach(card=>{const open=()=>openProject(Number(card.dataset.index),exist[Number(card.dataset.index)]);card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})})}
let currentProject=0;let mediaAvailability=[];
function openProject(i,available){currentProject=i;document.getElementById("modalCounter").textContent=String(i+1).padStart(2,"0")+" / 09";const p=projects[i];modalContent.innerHTML=available?(p.type==='post'?`<img src="${p.file}" alt="${p.title}"><h3>${p.title}</h3>`:`<video src="${p.file}" controls autoplay playsinline></video><h3>${p.title}</h3>`):`<div class="portfolio-placeholder"><span class="placeholder-symbol">${p.symbol}</span><h3>${p.title}</h3><p>Add your file at <strong>${p.file}</strong> and redeploy to show it here.</p></div>`;modal.showModal();document.body.classList.add('modal-open')}
function closeModal(){modal.close();modalContent.innerHTML='';document.body.classList.remove('modal-open')}
document.getElementById('closeLightbox').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});modal.addEventListener('close',()=>{modalContent.innerHTML='';document.body.classList.remove('modal-open')});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});button.classList.add('active');button.setAttribute('aria-pressed','true');const filter=button.dataset.filter;document.getElementById('portfolioResult').textContent=filter==='all'?'SHOWING ALL 9 PROJECT SLOTS':'SHOWING 3 '+({reel:'REELS',post:'INSTAGRAM POSTS',video:'HORIZONTAL VIDEOS'}[filter]);grid.querySelectorAll('.portfolio-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.type!==filter})}));
const toggle=document.getElementById('menuToggle'),nav=document.getElementById('nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('visible');observer.unobserve(item.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>{const available=document.documentElement.scrollHeight-innerHeight;document.getElementById('progress').style.width=(available>0?scrollY/available*100:0)+'%'},{passive:true});
renderProjects();

// Keyboard-ready portfolio explorer.
function stepProject(direction){let next=(currentProject+direction+projects.length)%projects.length;openProject(next,mediaAvailability[next]);}
document.getElementById('previousProject').addEventListener('click',()=>stepProject(-1));
document.getElementById('nextProject').addEventListener('click',()=>stepProject(1));
document.addEventListener('keydown',e=>{if(!modal.open)return;if(e.key==='ArrowRight')stepProject(1);if(e.key==='ArrowLeft')stepProject(-1)});

// Interactive service selector.
const serviceDetails=[['VIDEO EDITING','High-retention edits, sound design, captions and compelling pacing for social-first content.'],['SOCIAL MEDIA CONTENT','Strategic, eye-catching content built to help creators and brands show up consistently and stand out.'],['GRAPHIC DESIGN','Bold posts, carousels, posters and brand visuals designed to stop the scroll.'],['MOTION & 2D ANIMATION','Custom animated graphics, kinetic typography and expressive 2D motion for your brand.']];
document.querySelectorAll('.service-choice').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.service-choice').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});btn.classList.add('selected');btn.setAttribute('aria-pressed','true');const d=serviceDetails[Number(btn.dataset.service)];document.getElementById('serviceDetailTitle').textContent=d[0];document.getElementById('serviceDetailText').textContent=d[1]}));

// Live brief builder, no backend or data collection.
const briefForm=document.getElementById('briefForm');const briefService=document.getElementById('briefService');const briefBrand=document.getElementById('briefBrand');const briefGoal=document.getElementById('briefGoal');const briefNotes=document.getElementById('briefNotes');const briefFeedback=document.getElementById('briefFeedback');
function makeBrief(){return `Hello Own Ali,\n\nI'd like to discuss a creative project with own.vfx.\n\nService: ${briefService.value}\nName / Project: ${briefBrand.value.trim()||'[Your business name]'}\nGoal: ${briefGoal.value}\nNotes: ${briefNotes.value.trim()||'Happy to discuss the details.'}\n\nLooking forward to collaborating!`}
function updateBrief(){document.getElementById('previewService').textContent=briefService.value;document.getElementById('previewBrand').textContent=briefBrand.value.trim()||'FOR YOUR NEXT BIG THING.';document.getElementById('previewGoal').textContent=briefGoal.value}
[briefService,briefBrand,briefGoal,briefNotes].forEach(el=>el.addEventListener('input',updateBrief));
briefForm.addEventListener('submit',e=>{e.preventDefault();if(!briefForm.reportValidity())return;location.href='mailto:ownaleebhattie1@gmail.com?subject='+encodeURIComponent('Project inquiry — '+briefBrand.value.trim())+'&body='+encodeURIComponent(makeBrief());briefFeedback.textContent='Your email app should open with a pre-filled brief. Nothing was submitted from this website.'});
document.getElementById('copyBrief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(makeBrief());briefFeedback.textContent='Brief copied! Paste it into your message.'}catch(e){briefFeedback.textContent='Clipboard unavailable here. Use Prepare Email instead.'}});

// Lightweight motion: desktop-only, respects reduced-motion settings.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');const finePointer=window.matchMedia('(pointer: fine)');
if(!reduceMotion.matches&&finePointer.matches){
 const glow=document.getElementById('cursorGlow');let frame=0;document.addEventListener('pointermove',e=>{if(frame)return;frame=requestAnimationFrame(()=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;frame=0})},{passive:true});
 document.querySelectorAll('.service-card,.brief-preview').forEach(card=>{card.classList.add('tilt-card');card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rotate-x',(-y*6)+'deg');card.style.setProperty('--rotate-y',(x*6)+'deg')});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rotate-x','0deg');card.style.setProperty('--rotate-y','0deg')})});
 document.querySelector('.hero-art').addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--parallax-x',((e.clientX-r.left)/r.width-.5)*16+'px');e.currentTarget.style.setProperty('--parallax-y',((e.clientY-r.top)/r.height-.5)*16+'px')});document.querySelector('.hero-art').addEventListener('pointerleave',e=>{e.currentTarget.style.setProperty('--parallax-x','0px');e.currentTarget.style.setProperty('--parallax-y','0px')});
}
// Highlight active navigation item based on viewport.
const sections=[...document.querySelectorAll('main section[id]')];const navLinks=[...document.querySelectorAll('.nav a')];const activeObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;navLinks.forEach(a=>a.classList.toggle('nav-active',a.getAttribute('href')==='#'+entry.target.id))})},{rootMargin:'-25% 0px -65% 0px'});sections.forEach(section=>activeObserver.observe(section));
