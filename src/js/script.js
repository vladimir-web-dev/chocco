
//VARIABLES
const menuOpen = document.querySelector('.js-menu-open');
const menuClose = document.querySelector('.js-menu-close');
const menuElement = document.querySelector('.mobile-menu');
const menuLinksArray = document.querySelectorAll('.js-nav-link');

const scrollLinksArray = document.querySelectorAll('.js-scroll');
const scrollElement = document.querySelector('.scroll');

const sectionsArray = document.querySelectorAll('.section');
const secReasonsElement = document.querySelector('#sec-reasons');
const secMenuElement = document.querySelector('#sec-menu');
const secReviewElement = document.querySelector('#sec-reviews');
const secOrderElement = document.querySelector('#sec-order');
const secLocationElement = document.querySelector('#sec-locations');


 


//EVENT LISTENERS
menuOpen.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuLinksArray.forEach(function (el) {
    el.addEventListener('click', closeMenu);
});

window.onscroll = onScrollEvents;


//FUCNTIONS
function openMenu() {
    menuElement.style.display = 'flex';
    menuElement.style.opacity = 1;
}

function closeMenu() {
    menuElement.style.opacity = 0;

    setTimeout(function(){
        menuElement.style.display = 'none';
    }, 500);
}

function onScrollEvents() {
    const activeSection = getActiveSection();
    const bgColor = getComputedStyle(activeSection)["background-color"];
    const activeLink = [...scrollLinksArray].find(function(el) {
        return el.dataset.rel == activeSection.id;
    });

    if(bgColor == "rgba(0, 0, 0, 0)" || bgColor == "rgb(248, 250, 249)" )
        scrollElement.classList.add('scroll--green');
    else
        scrollElement.classList.remove('scroll--green');   

    setActiveScrollLink(activeLink);
}

function changeScrollColor(fn) {
    scrollElement.classList.fn('scroll--greens')
}

function getActiveSection () {
    return [...sectionsArray].find(function(el){
        const rect = el.getBoundingClientRect();
        return rect.y < 100 && (rect.y * -1) < rect.height - 100;
    });
}

function setActiveScrollLink (el, arr){
    const cName = 'scroll__item--active';
    const prevActiveEl = document.querySelector('.scroll__item--active');
    
    prevActiveEl.classList.remove(cName);
    el.classList.add(cName);

}