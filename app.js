const KEY="zie-project-apps-v1";
const seed=[
 {id:crypto.randomUUID(),name:"ZIE Project",url:"https://example.com",cat:"Tools",icon:"",favorite:true}
];
let apps=JSON.parse(localStorage.getItem(KEY)||"null")||seed;
const $=s=>document.querySelector(s);
const grid=$("#grid"), empty=$("#empty"), tpl=$("#cardTpl"), dialog=$("#appDialog"), form=$("#appForm");

function save(){localStorage.setItem(KEY,JSON.stringify(apps));render()}
function categories(){return [...new Set(apps.map(x=>x.cat||"Lainnya").filter(Boolean))].sort()}
function render(){
 const q=$("#search").value.toLowerCase().trim(), c=$("#category").value;
 $("#category").innerHTML='<option value="all">Semua kategori</option>'+categories().map(x=>`<option>${esc(x)}</option>`).join("");
 if(c!=="all") $("#category").value=c;
 const list=apps.filter(x=>(!q||(x.name+" "+x.url+" "+x.cat).toLowerCase().includes(q))&&(c==="all"||x.cat===c))
   .sort((a,b)=>Number(b.favorite)-Number(a.favorite)||a.name.localeCompare(b.name));
 grid.innerHTML="";
 list.forEach(x=>{
  const el=tpl.content.cloneNode(true), card=el.querySelector(".card"), icon=el.querySelector(".app-icon");
  if(x.icon){const im=new Image();im.src=x.icon;im.onerror=()=>icon.textContent=x.name[0].toUpperCase();icon.append(im)}else icon.textContent=x.name[0].toUpperCase();
  el.querySelector("h3").textContent=x.name; el.querySelector("p").textContent=x.cat||"Lainnya"; el.querySelector(".open").href=x.url;
  const fav=el.querySelector(".fav");fav.textContent=x.favorite?"★":"☆";fav.classList.toggle("on",x.favorite);
  fav.onclick=()=>{x.favorite=!x.favorite;save()}; el.querySelector(".edit").onclick=()=>openForm(x);
  grid.append(card)
 });
 empty.hidden=list.length>0;
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function iconFromUrl(url){
 try{const origin=new URL(url).origin;return `https://www.google.com/s2/favicons?sz=128&domain=${encodeURIComponent(origin)}`}
 catch{return ""}
}
function openForm(x=null){
 $("#dialogTitle").textContent=x?"Edit aplikasi":"Tambah aplikasi"; $("#appId").value=x?.id||"";
 $("#name").value=x?.name||"";$("#url").value=x?.url||"";$("#cat").value=x?.cat||"";$("#favorite").checked=!!x?.favorite;$("#deleteBtn").hidden=!x;
 dialog.showModal(); $("#name").focus()
}
$("#addBtn").onclick=()=>openForm(); $("#search").oninput=render; $("#category").onchange=render;
form.onsubmit=e=>{e.preventDefault();const url=$("#url").value.trim();const data={id:$("#appId").value||crypto.randomUUID(),name:$("#name").value.trim(),url,cat:$("#cat").value.trim()||"Lainnya",icon:iconFromUrl(url),favorite:$("#favorite").checked};
 const i=apps.findIndex(x=>x.id===data.id); if(i<0)apps.push(data);else apps[i]=data; save();dialog.close()};
$("#deleteBtn").onclick=()=>{const id=$("#appId").value;if(confirm("Hapus aplikasi ini?")){apps=apps.filter(x=>x.id!==id);save();dialog.close()}};
let deferred;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;$("#installBtn").hidden=false});
$("#installBtn").onclick=async()=>{if(!deferred)return;deferred.prompt();deferred=null;$("#installBtn").hidden=true};
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
render();
