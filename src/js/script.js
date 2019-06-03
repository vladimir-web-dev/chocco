//VARIABLES
let interval;
let activeSlideIndex = 0;
let flag = false;
// let right = 0;
//sections
const secTeamElement = document.querySelector('#sec-team');
const secMenuElement = document.querySelector('#sec-menu');
const secReasonsElement = document.querySelector('#sec-reasons');
const secReviewElement = document.querySelector('#sec-reviews');
const secOrderElement = document.querySelector('#sec-order');
const secLocationElement = document.querySelector('#sec-locations');
const secSliderElement = document.querySelector('#sec-slider');



const menuOpen = document.querySelector('.js-menu-open');
const menuElement = document.querySelector('.mobile-menu');
const scrollLinksArray = document.querySelectorAll('.js-scroll');
const scrollElement = document.querySelector('.scroll');
const sectionsArray = document.querySelectorAll('.section');

//reviews
const reviewImgEl = document.querySelector('.review__avatar-img');
const reviewHeadingEl = document.querySelector('.review__heading');
const reviewDescriptionEl = document.querySelector('.review__description');
const reviewSignaturegEl = document.querySelector('.review__signature');

//form
const reviewsFormEl = document.forms['formOrder'];
//modal
const modalEl = document.querySelector('.js-modal');
const btnCloseModalEl = document.querySelector('.js-close-modal');

(function(){
    getReviews();
})();

//EVENT LISTENERS
window.addEventListener('scroll', onScrollEvents);
secTeamElement.addEventListener('click', toggleContent);
secMenuElement.addEventListener('click', toggleContent);
menuOpen.addEventListener('click', openMenu);
menuElement.addEventListener('click', closeMenu);
reviewsFormEl.addEventListener('submit', sendOrder)
btnCloseModalEl.addEventListener('click', toggleModal);
secSliderElement.addEventListener('click', moveSlider);

//FUCNTIONS
function openMenu() {
    menuElement.style.display = 'flex';
    menuElement.style.opacity = 1;
}

function closeMenu(event) {
    const target = event.target;

    if (!target.hasAttribute('close-menu')) {
        target = findParent(target, 'A');
    }

    if(target === null)
        return;

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


function toggleContent(event) {
    let target = event.target;
    event.preventDefault();

    if (!target.hasAttribute('toggle-content')) {
        target = findParent(target, 'A');
    }

    if(target === null)
        return;

    const parentLiElement = findParent(target, 'LI');
    parentLiElement.classList.toggle('show-content');

}

function findParent(el, targetEl) {
    const parentEl = el.parentElement;

    if(parentEl === null)
        return null;

    if(parentEl.tagName == targetEl)
        return parentEl;

    return findParent(parentEl,targetEl);  
}

function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../src/js/reviews.json');
    xhr.responseType = 'json';
    xhr.send();

    xhr.addEventListener('load', function(event){
        if(xhr.status < 400)
            initClendar(xhr.response);
    });;
}

function initClendar(data){
    const reviewsListElement = document.querySelector('.reviews__list');
    data.forEach(function(item){
        const itemElement = document.createElement('LI');
        itemElement.className = "avatar reviews__item";
        itemElement.setAttribute("data-index", item.index);

        const linkElement = document.createElement('A');
        linkElement.className = "avatar reviews__link";
        linkElement.innerHTML = `<img src="src/img/content/${item.img}" alt="Avatar" class="avatar__img">`;
        linkElement.addEventListener('click', function(event){
            event.preventDefault();

            activateReview(data, item.index);
            launchCalendar(data, item.index++);
        });

        itemElement.appendChild(linkElement);
        reviewsListElement.appendChild(itemElement);

    });

    launchCalendar(data);
}
function launchCalendar(data, index = 0) {
    if(interval !== undefined)
        clearInterval(interval);

    interval = setInterval(function() {
        activateReview(data, index);
        
        index++;
        if(index > data.length - 1)
            index = 0;
    }, 3000); 
}

function activateReview(data, index) {
    const activeAvatarElement = document.querySelector('.reviews__item--active');
    const avatarElement = document.querySelectorAll('.reviews__item')[index];
    const activeReview = data[index];

    reviewImgEl.src = `src/img/content/photo${index + 1}.png`;
    reviewHeadingEl.innerText = activeReview.heading;
    reviewDescriptionEl.innerText = activeReview.content;
    reviewSignaturegEl.innerText = activeReview.name;

    if(activeAvatarElement !== null)
        activeAvatarElement.classList.remove('reviews__item--active');

    avatarElement.classList.add('reviews__item--active');
}

function sendOrder(e) {
    e.preventDefault();
    const form = this;   
    const formData = new FormData(form);
    const to = "test.email@gmail.com";  

    formData.append('to', to);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);

    xhr.addEventListener('load', function() {
        if(xhr.status < 400) {
            toggleModal("Сообщение отправлено");
            form.reset(); 
        }
        else
            toggleModal("Произошла ошибка! Попробуйте снова");
    });
}

function toggleModal(heading = "") {
    modalEl.querySelector('.modal__heading').textContent = heading;
    modalEl.classList.toggle('visible');
}

function moveSlider(e) {
    e.preventDefault();
    let target = e.target;
    

    if (!target.hasAttribute('data-move')) {
        target = findParent(target, 'A');
    }

    if(target === null)
        return;

    const list = e.currentTarget.querySelector('.carousel__list');
    if(!flag) {
        list.style.transform="translateX(-100%)";
    } else 
        list.style.transform="translateX(0)";

    flag = !flag;
    // if (target.hasAttribute('data-move-right')) {
    //     console.log("right")
    // }

    // if (target.hasAttribute('data-move-left')) {
    //     console.log("left")

    // }
}

