export default class NavigationComponent{constructor(){this.dropdownMenu=document.querySelector(".dropdown-menu"),this.navigationSections=document.querySelectorAll(".navigation-section")}init(){this.clearExistingNavigation(),this.renderNavigationItems(),this.setupEventListeners()}clearExistingNavigation(){this.dropdownMenu.innerHTML=""}renderNavigationItems(){this.navigationSections.forEach(t=>{t=this.createNavigationItem({href:t.id,title:t.getAttribute("data-title")||t.id,iconLight:"images/star-dark.svg"});this.dropdownMenu.appendChild(t)})}createNavigationItem({href:t,title:e,iconLight:i}){var n=document.createElement("a");return n.className="dropdown-item",n.href="#"+t,n.innerHTML=`
        <img class="star star--small star--dark" 
             src="${i}" 
             alt="Navigation icon"
             title="Navigation icon">
        ${e}
      `,n}setupEventListeners(){this.dropdownMenu.addEventListener("click",t=>{var e;t.target.closest(".dropdown-item")&&(e=t.target.closest(".dropdown-item").getAttribute("href").slice(1),e=document.getElementById(e))&&(t.preventDefault(),e.scrollIntoView({behavior:"smooth"}))}),window.addEventListener("scroll",this.debounce(()=>{this.updateActiveNavigationItem()},100))}updateActiveNavigationItem(){let e=window.scrollY+100,i=null;var t;this.navigationSections.forEach(t=>{t.offsetTop<=e&&(i=t)}),i&&((t=this.dropdownMenu.querySelector(".active"))&&t.classList.remove("active"),t=this.dropdownMenu.querySelector(`[href="#${i.id}"]`))&&t.classList.add("active")}debounce(e,i){let n;return function(...t){clearTimeout(n),n=setTimeout(()=>{clearTimeout(n),e(...t)},i)}}}