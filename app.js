/* ============ EDITABLE CONTENT — replace placeholders with verified details ============ */
const SITE={
  name:"PS Polypack",tagline:"Packaging for a brighter tomorrow",
  contact:{phone:"",email:"",address:"",hours:""},          // fill in verified details; empty = shown as "to be added"
  formEndpoint:""                                            // e.g. a Formspree/Getform URL or your own API. Empty = form is not connected.
};
/* Product data. image: set to a path such as "images/products/xyz.jpg" to replace the placeholder.
   The categories below are PLACEHOLDERS — rename/replace with the real range. kind picks the illustrative silhouette only. */
const PRODUCTS=[
  {slug:"category-01",name:"Category 01",blurb:"Product category — name and description to be confirmed.",kind:"bottle",image:"",specs:[]},
  {slug:"category-02",name:"Category 02",blurb:"Product category — name and description to be confirmed.",kind:"jar",image:"",specs:[]},
  {slug:"category-03",name:"Category 03",blurb:"Product category — name and description to be confirmed.",kind:"tub",image:"",specs:[]},
  {slug:"category-04",name:"Category 04",blurb:"Product category — name and description to be confirmed.",kind:"closure",image:"",specs:[]}
];
const CAPS=[["Materials","To be confirmed with PS Polypack"],["Manufacturing processes","To be confirmed with PS Polypack"],["Customisation & branding","To be confirmed with PS Polypack"],["Quality control","To be confirmed with PS Polypack"],["Order quantities & lead times","To be confirmed with PS Polypack"]];
const INDUSTRIES=null; // e.g. ["Cosmetics","Personal care"] once verified. null = section shows a confirmation notice.
const IMG={manufacturing:"" /* e.g. images/manufacturing/floor.jpg */};

/* ============ helpers ============ */
const $=s=>document.querySelector(s);
const arrow='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5"/></svg>';
const NAV=[["#/products","Products"],["#/capabilities","Capabilities"],["#/about","About"],["#/contact","Contact"]];
const G="#0f3d27",G2="#1d5a3c",G3="#6f8f78";
/* Illustrative silhouettes: line-drawn forms, not products */
function shape(k,x=0,y=0,s=1,st=G){const a=`stroke="${st}" stroke-width="${1.6/s}" fill="none" stroke-linejoin="round"`;
 const m={
 bottle:`<path ${a} d="M-14 -70h28v14c0 8 22 14 22 36v78a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-78c0-22 22-28 22-36z"/><path ${a} d="M-16 -56h32M-30 -6h60M-30 40h60" opacity=".45"/>`,
 jar:`<path ${a} d="M-44 -50h88v-14h-88z"/><path ${a} d="M-40 -50v10c-6 8-6 14-6 22v60a8 8 0 0 0 8 8h76a8 8 0 0 0 8-8v-60c0-8 0-14-6-22v-10"/><path ${a} d="M-46 0h92" opacity=".45"/>`,
 tub:`<path ${a} d="M-60 -34h120l-12 84a6 6 0 0 1-6 5h-84a6 6 0 0 1-6-5z"/><path ${a} d="M-64 -34h128v-8h-128z"/><path ${a} d="M-52 14h104" opacity=".45"/>`,
 closure:`<ellipse ${a} cx="0" cy="-14" rx="44" ry="12"/><path ${a} d="M-44 -14v34c0 7 20 13 44 13s44-6 44-13v-34M-28 -6v34M-10 -3v37M10 -3v37M28 -6v34" opacity=".9"/>`};
 return `<g transform="translate(${x} ${y}) scale(${s})">${m[k]||m.bottle}</g>`}
function pimg(p,ph=true){return p.image?`<div class="pimg"><img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"></div>`:
 `<div class="pimg" role="img" aria-label="Image placeholder for ${p.name}"><svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice"><g opacity=".12" stroke="${G}" stroke-width=".5"><path d="M0 150h200M0 50h200M50 0v200M150 0v200"/></g>${shape(p.kind,100,106,1.05)}</svg>${ph?'<span class="ph">Product Photography — To Be Added</span>':''}</div>`}
function contactVal(v,l){return v?v:`<span class="tbc">${l} to be added</span>`}
function reveal(){const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}

/* ============ hero art: construction-drawing composition ============ */
const heroArt=`<svg viewBox="0 0 400 460" role="img" aria-label="Illustrative line drawing of packaging forms on a drawing grid"><defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="${G}" stroke-width=".4" opacity=".14"/></pattern></defs>
<rect width="400" height="460" fill="url(#g)"/>
<path d="M30 372h340" stroke="${G}" stroke-width="1.2"/><path d="M30 366v12M370 366v12M200 366v12" stroke="${G}" stroke-width="1"/>
<rect x="228" y="70" width="120" height="302" fill="${G}"/>
<path d="M228 70L348 150V70z" fill="${G3}" opacity=".5"/>
${shape("bottle",288,232,1.9,"#e9efe9")}
${shape("jar",116,300,1.7,G)}
${shape("tub",136,150,1.15,G)}
<g stroke="${G}" stroke-width=".8" fill="none" opacity=".7"><path d="M60 410h140M60 404v12M200 404v12"/><path d="M228 52v-0M228 56h120M228 50v12M348 50v12"/></g>
<g font-family="Hanken Grotesk,sans-serif" font-size="9" letter-spacing="1.4" fill="${G}" opacity=".75"><text x="60" y="430">ILLUSTRATIVE FORMS</text><text x="228" y="42">DRAWING STUDY</text></g></svg>`;

/* ============ views ============ */
const V={};
V.home=()=>`
<div class="wrap hero">
  <div><span class="label">Plastic packaging manufacturer</span>
  <h1>Packaging, <em>made</em> with precision.</h1>
  <p class="lead">PS Polypack manufactures plastic packaging for brand owners, distributors and procurement teams. Browse the range, then tell us what you need.</p>
  <div class="acts"><a class="btn" href="#/products">Explore Products ${arrow}</a><a class="btn ghost" href="#/contact">Request a Quote</a></div></div>
  <figure class="plate" style="margin:0">${heroArt}<span class="tag">Fig. 01</span><figcaption>Illustrative artwork — not a product listing</figcaption></figure>
</div>
<div class="strip"><div class="wrap"><span>Business-to-business supply</span><span>Enquiry-led ordering</span><span>Quotations on request</span></div></div>

<section class="s"><div class="wrap">
  <div class="head reveal"><div><span class="label">The range</span><h2>Find the right <em>packaging</em>.</h2></div><p class="lead">Each category opens a product page with specifications and a direct route to a quotation.</p></div>
  <div class="cat reveal">${PRODUCTS.map((p,i)=>`<a href="#/products/${p.slug}"><span class="n">0${i+1}</span><h3>${p.name}</h3><p>${p.blurb}</p>${arrow.replace('<svg','<svg class="ar"')}</a>`).join('')}</div>
</div></section>

<section class="s dark"><div class="wrap two">
  <div class="reveal"><span class="label">Capabilities</span><h2 style="margin:16px 0 24px">Built around <em>your</em> requirements.</h2><p class="lead">Production details are being compiled and will appear here once confirmed.</p><p style="margin-top:28px"><a class="btn light" href="#/capabilities">View capabilities ${arrow}</a></p></div>
  <div class="reveal"><div class="mfg" role="img" aria-label="Placeholder for manufacturing photography"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g stroke="#a9c4b2" fill="none" opacity=".35" stroke-width="1"><path d="M0 220h400M0 180h400"/><path d="M60 220V120h80v100M200 220V90h120v130M230 90V60h60v30"/></g></svg><span>Manufacturing Photography — To Be Added</span></div></div>
</div></section>

<section class="s"><div class="wrap">
  <div class="head reveal"><div><span class="label">Industries</span><h2>Who we <em>supply</em>.</h2></div><p class="lead">${INDUSTRIES?'Sectors PS Polypack currently serves.':'We will list the industries PS Polypack serves once they are confirmed, so this page only states what is true.'}</p></div>
  ${INDUSTRIES?`<div class="cat">${INDUSTRIES.map((x,i)=>`<a href="#/contact"><span class="n">0${i+1}</span><h3>${x}</h3><p></p>${arrow.replace('<svg','<svg class="ar"')}</a>`).join('')}</div>`:`<p class="note reveal">Industries served — <b>to be confirmed</b>. Edit the <code>INDUSTRIES</code> list at the top of the script.</p>`}
</div></section>

<section class="s" style="background:var(--paper-2)"><div class="wrap">
  <div class="head reveal"><div><span class="label">Working with us</span><h2>A direct, <em>enquiry-led</em> process.</h2></div></div>
  <div class="pr reveal">
    <div><h3>Tell us what you need</h3><p>Share the packaging type, quantities and any requirements through the enquiry form.</p></div>
    <div><h3>Review the details</h3><p>We respond to your enquiry with the information needed to move forward.</p></div>
    <div><h3>Discuss specifics</h3><p>Technical and commercial points are agreed directly with the PS Polypack team.</p></div>
    <div><h3>One point of contact</h3><p>Business customers deal with the company directly, without intermediaries on the website.</p></div>
  </div>
</div></section>

<section class="s dark"><div class="wrap cta reveal"><div><span class="label">Enquiries</span><h2 style="margin-top:16px">Discuss your <em>requirements</em>.</h2></div><div><p class="lead" style="margin-bottom:28px">Tell us what you are looking to source and we will come back to you.</p><a class="btn light" href="#/contact">Request a Quote ${arrow}</a></div></div></section>`;

V.products=()=>`<div class="wrap"><div class="ph1"><span class="label">Products</span><h1>The <em>range</em>.</h1><p class="lead">Packaging categories manufactured by PS Polypack. Categories shown are placeholders pending confirmation of the full range.</p></div>
<div style="padding:clamp(40px,5vw,72px) 0 clamp(64px,8vw,120px)"><div class="pgrid">${PRODUCTS.map(p=>`<a class="pcard reveal" href="#/products/${p.slug}">${pimg(p)}<h3>${p.name}</h3><p>${p.blurb}</p></a>`).join('')}</div></div></div>`;

V.product=slug=>{const i=PRODUCTS.findIndex(p=>p.slug===slug);if(i<0)return V.notfound();const p=PRODUCTS[i];
return `<div class="wrap"><div class="ph1" style="border:0;padding-bottom:0"><p class="crumb"><a href="#/products">Products</a> / ${p.name}</p></div>
<div class="detail"><div>${pimg(p)}</div><div><span class="label">Product category</span><h1 style="font-size:clamp(40px,5vw,72px);margin:16px 0 20px">${p.name}</h1><p class="lead">${p.blurb}</p>
<h3 style="margin:36px 0 14px;font-size:24px">Specifications</h3>
${p.specs.length?`<dl>${p.specs.map(s=>`<div><dt>${s[0]}</dt><dd>${s[1]}</dd></div>`).join('')}</dl>`:`<dl>${["Material","Capacity / size","Closure options","Customisation","Minimum order"].map(k=>`<div><dt>${k}</dt><dd><span class="tbc">To be confirmed</span></dd></div>`).join('')}</dl>`}
<p style="margin-top:32px"><a class="btn" href="#/contact?product=${encodeURIComponent(p.name)}">Request a Quote for this ${arrow}</a></p></div></div></div>`};

V.capabilities=()=>`<div class="wrap"><div class="ph1"><span class="label">Capabilities</span><h1>What we <em>can make</em>.</h1><p class="lead">This page will present verified manufacturing capabilities. Details below are placeholders and will be replaced once supplied.</p></div>
<div style="padding:clamp(40px,5vw,72px) 0 clamp(64px,8vw,120px)" class="two"><div><div class="mfg" style="background:var(--paper-2);border-color:var(--line)" role="img" aria-label="Placeholder for manufacturing photography"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g stroke="${G}" fill="none" opacity=".35"><path d="M0 220h400M0 180h400"/><path d="M60 220V120h80v100M200 220V90h120v130M230 90V60h60v30"/></g></svg><span style="color:var(--mute)">Manufacturing Photography — To Be Added</span></div></div>
<div class="rows light-rows">${CAPS.map(c=>`<div><h3>${c[0]}</h3><p><span class="tbc">${c[1]}</span></p></div>`).join('')}</div></div></div>`;

V.about=()=>`<div class="wrap"><div class="ph1"><span class="label">About</span><h1>PS <em>Polypack</em>.</h1><p class="lead">A plastic packaging manufacturer serving businesses. Company background will be added here once confirmed.</p></div>
<div class="detail"><div style="background:#fff;border:1px solid var(--line);padding:clamp(24px,5vw,56px);display:flex;align-items:center;justify-content:center"><img src="images/brand/logo-lockup.png" alt="PS Polypack logo — Packaging for a brighter tomorrow" width="520" style="mix-blend-mode:multiply;width:100%;max-width:520px;height:auto"></div>
<div><h3 style="margin-bottom:14px">Our approach</h3><p class="lead" style="margin-bottom:28px">PS Polypack's stated purpose is <i>packaging for a brighter tomorrow</i>. The company story, leadership, location and history will be written with verified details.</p><span class="tbc">Company story — to be added</span><p style="margin-top:32px"><a class="btn ghost" href="#/contact">Contact PS Polypack ${arrow}</a></p></div></div></div>
<div style="height:clamp(40px,6vw,80px)"></div>`;

V.contact=q=>{const pre=new URLSearchParams(q||'').get('product')||'';const c=SITE.contact;
return `<div class="wrap"><div class="ph1"><span class="label">Contact</span><h1>Request a <em>quote</em>.</h1><p class="lead">Describe your packaging requirement and the PS Polypack team will respond.</p></div>
<div class="detail" style="grid-template-columns:minmax(0,1.3fr) minmax(0,.8fr)">
<div><form id="enq" novalidate aria-describedby="status">
<div class="f2"><div><label for="name">Full name *</label><input id="name" name="name" autocomplete="name" required><div class="err" id="e-name"></div></div><div><label for="company">Company *</label><input id="company" name="company" autocomplete="organization" required><div class="err" id="e-company"></div></div></div>
<div class="f2"><div><label for="email">Work email *</label><input id="email" name="email" type="email" autocomplete="email" required><div class="err" id="e-email"></div></div><div><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div></div>
<div class="f2"><div><label for="product">Product of interest</label><select id="product" name="product"><option value="">Not sure yet</option>${PRODUCTS.map(p=>`<option ${p.name===pre?'selected':''}>${p.name}</option>`).join('')}</select></div><div><label for="qty">Approximate quantity</label><input id="qty" name="qty" placeholder="e.g. units per order"></div></div>
<div><label for="msg">Your requirements *</label><textarea id="msg" name="message" required></textarea><div class="err" id="e-msg"></div></div>
<div><button class="btn" type="submit">Send enquiry ${arrow}</button></div>
<div id="status" role="status" aria-live="polite"></div></form></div>
<aside><h3 style="margin-bottom:16px">Direct contact</h3><dl><div><dt>Phone</dt><dd>${contactVal(c.phone,'Phone')}</dd></div><div><dt>Email</dt><dd>${contactVal(c.email,'Email')}</dd></div><div><dt>Address</dt><dd>${contactVal(c.address,'Address')}</dd></div><div><dt>Hours</dt><dd>${contactVal(c.hours,'Hours')}</dd></div></dl></aside></div></div><div style="height:clamp(40px,6vw,80px)"></div>`};

V.notfound=()=>`<div class="wrap"><div class="ph1"><span class="label">404</span><h1>Page not <em>found</em>.</h1><p><a class="btn" href="#/">Back to home</a></p></div></div>`;

function bindForm(){const f=$('#enq');if(!f)return;
 f.addEventListener('submit',async e=>{e.preventDefault();const st=$('#status');st.innerHTML='';let ok=true;
  const chk=(id,eid,msg,test)=>{const el=$('#'+id),er=$('#'+eid);const bad=!test(el.value.trim());el.setAttribute('aria-invalid',bad);el.setAttribute('aria-describedby',eid);er.textContent=bad?msg:'';if(bad&&ok){el.focus();ok=false}};
  chk('name','e-name','Please enter your name.',v=>v);chk('company','e-company','Please enter your company name.',v=>v);
  chk('email','e-email','Please enter a valid email address.',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));chk('msg','e-msg','Please describe your requirements.',v=>v.length>9);
  if(!ok)return;
  if(!SITE.formEndpoint){st.innerHTML='<p class="note bad"><b>This enquiry was not sent.</b> The form is validated and ready, but no submission service is connected yet. Set <code>SITE.formEndpoint</code> to enable sending, or add verified contact details.</p>';return}
  try{const r=await fetch(SITE.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
   if(!r.ok)throw 0;st.innerHTML='<p class="note"><b>Thank you.</b> Your enquiry has been sent.</p>';f.reset()}
  catch{st.innerHTML='<p class="note bad"><b>Sorry, your enquiry could not be sent.</b> Please try again shortly.</p>'}})}

/* ============ shell + router ============ */
function shell(){
 $('#menu').innerHTML=NAV.map(n=>`<li><a class="l" href="${n[0]}">${n[1]}</a></li>`).join('')+`<li class="mob-cta" style="border:0;padding-top:16px"><a class="btn sm" href="#/contact" style="display:inline-flex">Request a Quote</a></li>`;
 const c=SITE.contact;
 $('#foot').innerHTML=`<div><div class="logo"><img src="images/brand/logo-lockup.png" alt="PS Polypack" width="172" height="auto" style="height:auto"></div><p style="margin:20px 0 0;color:#b7c9bc;max-width:36ch;font-size:15px">Plastic packaging manufacturing for businesses.</p></div>
 <div><h4>Products</h4><ul>${PRODUCTS.map(p=>`<li><a href="#/products/${p.slug}">${p.name}</a></li>`).join('')}</ul></div>
 <div><h4>Company</h4><ul>${NAV.slice(1).map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div>
 <div><h4>Contact</h4><ul><li>${c.phone||'Phone — to be added'}</li><li>${c.email||'Email — to be added'}</li><li>${c.address||'Address — to be added'}</li></ul></div>`;
 $('#yr').textContent=new Date().getFullYear()}
function route(){const h=location.hash.replace(/^#/,'')||'/';const[path,q]=h.split('?');const seg=path.split('/').filter(Boolean);
 let html,title='PS Polypack — Plastic Packaging Manufacturing';
 if(!seg.length)html=V.home();
 else if(seg[0]==='products'&&seg[1]){html=V.product(seg[1]);const p=PRODUCTS.find(x=>x.slug===seg[1]);if(p)title=p.name+' — PS Polypack'}
 else if(V[seg[0]]){html=V[seg[0]](q);title=seg[0][0].toUpperCase()+seg[0].slice(1)+' — PS Polypack'}
 else html=V.notfound();
 $('#main').innerHTML=html;document.title=title;
 document.querySelectorAll('.nav a.l').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')==='#/'+(seg[0]||'')));
 $('#menu').classList.remove('open');$('#mbtn').setAttribute('aria-expanded','false');
 window.scrollTo(0,0);$('#main').focus({preventScroll:true});bindForm();reveal()}
$('#mbtn').addEventListener('click',()=>{const o=$('#menu').classList.toggle('open');$('#mbtn').setAttribute('aria-expanded',o)});
window.addEventListener('hashchange',route);shell();route();
