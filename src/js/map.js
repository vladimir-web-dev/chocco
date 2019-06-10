function initMap(){ 
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
    myMap.behaviors.disable('scrollZoom');
    console.log
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        const placemark = new ymaps.Placemark(coords,{},{
            iconLayout: 'default#image',
            iconImageHref: '../../src/img/content/placemark.png'
        });

        myMap.geoObjects
        .add(placemark);
    });
}

