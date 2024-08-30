import{a as g,i as u,S as y}from"./assets/vendor-DOgVoBmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const L="https://pixabay.com/api/",m=(s,t)=>{const r={params:{key:"45540083-4d95202277f3d237cb6fcfd23",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}};return g.get(`${L}`,r)},f=s=>`
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
  `,i=document.querySelector(".form"),p=document.querySelector(".gallery"),l=document.querySelector(".loader"),c=document.querySelector(".load-btn");let n=1,h="";const b=async s=>{try{if(s.preventDefault(),i.firstElementChild.value.trim()==""){u.warning({title:"",message:"Введи запит на пошук",messageSize:"18",position:"topRight"});return}h=i.elements.search_query.value,n=1,l.classList.add("is-load");const t=await m(h,n);if(console.log(t),t.data.hits.length===0){u.error({title:"",message:"Введи запит на пошук",messageSize:"18",position:"topRight"}),l.classList.remove("is-load"),c.classList.add("is-hidden"),p.innerHTML="",i.reset();return}const r=t.data.hits.map(e=>f(e)).join("");p.innerHTML=r,l.classList.remove("is-load"),c.classList.remove("is-hidden"),new y(".gallery-link",{captionsData:"alt",captionDelay:250}).on("show.simplelightbox"),i.reset();return}catch(t){console.log(t)}},v=async s=>{try{s.preventDefault(),n++,l.classList.add("is-load");const t=await m(h,n),r=t.data.hits.map(a=>f(a)).join("");p.insertAdjacentHTML("beforeend",r),l.classList.remove("is-load"),scrollBy({top:640,behavior:"smooth"}),console.log(n),t.data.hits.length===0&&(c.classList.add("is-hidden"),u.info({title:"",message:`"We're sorry, but you've reached the end of search results."`,messageSize:"18",position:"topRight"}))}catch(t){console.log(t)}};i.addEventListener("submit",b);c.addEventListener("click",v);
//# sourceMappingURL=index.js.map
