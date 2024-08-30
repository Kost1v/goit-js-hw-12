import{a as b,S as v,i as c}from"./assets/vendor-CRwkH7JT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const S="https://pixabay.com/api/",g=(s,e)=>{const o={params:{key:"45540083-4d95202277f3d237cb6fcfd23",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}};return b.get(`${S}`,o)},y=s=>`
  <li class="gallery-card">
    <a class="gallery-link" href="${s.largeImageURL}">
      <img
        class="gallery-img"
        src="${s.webformatURL}"
        alt="${s.tags}"
      />
    </a>
    <div>
      <ul class="img-info">
        <li class="box-info">
          <h4>Likes</h4>
          <p>${s.likes}</p>
        </li>
        <li class="box-info">
          <h4>Views</h4>
          <p>${s.views}</p>
        </li>
        <li class="box-info">
          <h4>Comments</h4>
          <p>${s.comments}</p>
        </li>
        <li class="box-info">
          <h4>Downloads</h4>
          <p>${s.downloads}</p>
        </li>
      </ul>
    </div>
  </li>
  `,d=document.querySelector(".form"),f=document.querySelector(".gallery"),i=document.querySelector(".loader"),l=document.querySelector(".load-btn");let p=1,h="",u=0,n=0,L=new v(".gallery-link",{captionsData:"alt",captionDelay:250});const w=async s=>{try{if(s.preventDefault(),h=d.elements.search_query.value.trim(),h==""){c.warning({title:"",message:"Введи запит на пошук",messageSize:"18",position:"topRight"});return}p=1,u=0,n=0,i.classList.add("is-load");const e=await g(h,p);if(e.data.hits.length===0){c.error({title:"",message:"Введи запит на пошук",messageSize:"18",position:"topRight"}),i.classList.remove("is-load"),l.classList.add("is-hidden"),f.innerHTML="",d.reset();return}u=e.data.totalHits,n=e.data.hits.length;const o=e.data.hits.map(a=>y(a)).join("");f.innerHTML=o,L.refresh(),n<u?l.classList.remove("is-hidden"):(c.info({title:"",message:`"We're sorry, but you've reached the end of search results."`,messageSize:"18",position:"topRight"}),l.classList.add("is-hidden")),i.classList.remove("is-load"),d.reset();return}catch(e){console.log(e)}},x=async s=>{try{p++,i.classList.add("is-load");const e=await g(h,p);n+=e.data.hits.length;const o=e.data.hits.map(a=>y(a)).join("");f.insertAdjacentHTML("beforeend",o),L.refresh(),i.classList.remove("is-load"),scrollBy({top:640,behavior:"smooth"}),n>=u&&(c.info({title:"",message:`"We're sorry, but you've reached the end of search results."`,messageSize:"18",position:"topRight"}),l.classList.add("is-hidden"))}catch(e){console.log(e)}};d.addEventListener("submit",w);l.addEventListener("click",x);
//# sourceMappingURL=index.js.map
