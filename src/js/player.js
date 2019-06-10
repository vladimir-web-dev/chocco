const player = document.querySelector('#player');
const btnPlay = document.querySelector('#btnPlay');
const btnPlayBig = document.querySelector('#btnPlayBig');
const btnMute = document.querySelector('#btnMute');
const volume = document.querySelector('#volume');
const duration = document.querySelector('#duration');

duration.setAttribute('max', player.duration);
player.volume = .3;


btnPlay.addEventListener('click', e => {
    stopStartVideo();
});

btnPlayBig.addEventListener('click', e => {
    stopStartVideo();
});

btnMute.addEventListener('click', e => player.muted = !player.muted);

volume.addEventListener('change', e =>  {
    player.volume = e.target.value / 100;
});



duration.addEventListener('change', e => {
    player.currentTime = e.target.value
});

player.addEventListener("timeupdate", e =>  duration.value = e.target.currentTime);

player.addEventListener("ended", e => {
    duration.value = 0;
    btnPlayBig.style.opacity = 1;

});


function stopStartVideo(){
    if(player.paused || player.ended) {
        player.play();
        btnPlayBig.style.opacity = 0;
    }
    else {
        player.pause();
        btnPlayBig.style.opacity = 1;
    }
}