const wrapper = document.querySelector('.wrapper');
const innerWrapper = document.querySelector('.inner-wrapper');
const sections = document.querySelectorAll('.section');
const paginationItems = document.querySelectorAll('.scroll__item');

const menuOpen = document.querySelector('.js-menu-open');
const mobileMenu = document.querySelector('.mobile-menu');
const headerMenu = document.querySelector('.header__menu'); 
const scrollElement = document.querySelector('.scroll');

let i = 0;
let inScroll = false;

wrapper.addEventListener("wheel", function(e) {
    if(!inScroll){
        inScroll = true;

        if(e.deltaY > 0 && i < sections.length -1) {
            i++;
        }
    
        if(e.deltaY < 0 && i > 0) {
            i--;
        }

        innerWrapper.style.cssText = `transform:translateY(${moveToSection(i)})`;
        activatePagination(i);
        changePaginationColor(i);

        setTimeout(() => {
            inScroll = false;
        }, 1000)
    }   
});


function moveToSection(sectionNum) {
    return `${sectionNum * -100}%`;
}

function activatePagination(index) {
    const activeItem =  document.querySelector('.scroll__item--active');

    if(activeItem !== null)
        activeItem.classList.remove('scroll__item--active');
       
    paginationItems[index].classList.add('scroll__item--active');
}



menuOpen.addEventListener('click', openMenu);

mobileMenu.addEventListener('click', function(e) {
    if(e.target.tagName == "A") {
        menuLinkClick(e);
        closeMenu(e);
    }
});

headerMenu.addEventListener('click', function(e){
    if(e.target.tagName == "A") 
        menuLinkClick(e);

});

scrollElement.addEventListener('click', function(e){
    if(e.target.tagName == "A") 
        menuLinkClick(e);

});

function openMenu() {
    mobileMenu.style.display = 'flex';
    mobileMenu.style.opacity = 1;
}

function closeMenu(event) {
    let target = event.target;

    if (!target.hasAttribute('close-menu')) {
        target = findParent(target, 'A');
    }

    if(target === null)
        return;

        mobileMenu.style.opacity = 0;

    setTimeout(function(){
        mobileMenu.style.display = 'none';
    }, 500);
}

function changePaginationColor(i){
    const bgColor = getComputedStyle(sections[i])["background-color"];

    if(bgColor == "rgba(0, 0, 0, 0)" || bgColor == "rgb(248, 250, 249)" )
        scrollElement.classList.add('scroll--green');
    else
        scrollElement.classList.remove('scroll--green');   
}

function menuLinkClick(e){
    e.preventDefault();
    let index;
    if(e.target.dataset.index !== undefined)
        index = Number(e.target.dataset.index);
    else
        index = Number(e.target.parentElement.dataset.index);
        
    i = index;
    innerWrapper.style.cssText = `transform:translateY(${moveToSection(index)})`;
    setTimeout(() => {
        activatePagination(index); 
        changePaginationColor(index);
    }, 1000);        
}

$(document).swipe( {   
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        
        if(direction == "up"  && i < sections.length -1)
            i++;

        if(direction == "down" < 0 && i > 0) 
            i--;


        innerWrapper.style.cssText = `transform:translateY(${moveToSection(i)})`;
        activatePagination(i);
        changePaginationColor(i);
    
        setTimeout(() => {
            inScroll = false;
        }, 1000)
    }
    
   
    
  });