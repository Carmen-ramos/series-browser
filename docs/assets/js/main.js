"use strict";const inputEl=document.querySelector(".js-input"),buttonEl=document.querySelector(".js-button"),ulShowList=document.querySelector(".js-showList"),ulFavList=document.querySelector(".js-favList"),sectShowList=document.querySelector(".js-section-showlist");let imgDefault="././assets/images/tvSeries.jpg",showsList=[],favoritesList=[];function getApiData(){getFromLocalStorage();const t=inputEl.value;fetch("http://api.tvmaze.com/search/shows?q="+t).then(t=>t.json()).then(t=>{showsList=[];for(let s=0;s<t.length;s++)showsList.push(t[s].show);paintList()})}buttonEl.addEventListener("click",getApiData);const formElement=document.querySelector(".js-form");function handleForm(t){t.preventDefault()}function paintList(){let t="";for(const s of showsList){let i;i=isShowFav(s)?"favourite":"",t+=`<li class = "js-shows ${i} showli" id=${s.id}>`,t+=`<h3 class="showli__title">${s.name}</h2>`,null===s.image?t+=`<img src= ${imgDefault} class= "showli__image" title="image default">`:t+=`<img src= ${s.image.medium} class= "showli__image" title="show image">`,t+="</li>"}ulShowList.innerHTML=t,paintFavList(),listenShowsEvents()}function isShowFav(t){return void 0!==favoritesList.find(s=>s.id===t.id)}function listenShowsEvents(){const t=document.querySelectorAll(".js-shows");for(const s of t)s.addEventListener("click",handleShow)}function handleShow(t){const s=parseInt(t.currentTarget.id),i=showsList.find(t=>t.id===s),e=favoritesList.findIndex(t=>t.id===s);-1===e?favoritesList.push(i):favoritesList.splice(e,1),setInLocalStorage(),paintFavList(),paintList()}function paintFavList(){let t="";for(const s of favoritesList)t+='<div class= "favli-container">',t+=`<li class = "js-shows favli" id=${s.id}>`,t+=`<h3 class="favli__title">${s.name}</h2>`,null===s.image?t+=`<img src= ${imgDefault} class= "favli__img">`:t+=`<img src= ${s.image.medium} class= "favli__img">`,t+="<button class='favli__button'>Eliminar</button>",t+="</li>",t+="</div>";ulFavList.innerHTML=t,listenShowsEvents()}function setInLocalStorage(){localStorage.setItem("listFavLocal",JSON.stringify(favoritesList))}function getFromLocalStorage(){const t=localStorage.getItem("listFavLocal");null!==t&&(favoritesList=JSON.parse(t),console.log(favoritesList),paintFavList())}formElement.addEventListener("submit",handleForm),getFromLocalStorage();