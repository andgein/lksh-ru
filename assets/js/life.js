$(document).ready(function(){
	ymaps.ready(function () {
	    var locations_map = new ymaps.Map('map', {
	            center: [57.734479, 41.485365],
	            zoom: 9,
	            controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'rulerControl']
	        }, {
	            searchControlProvider: 'yandex#search'
	        });
	    var electronic = new ymaps.Placemark([57.556069, 41.089867], {
	            hintContent: '«Электроник»',
	            balloonContent: 'ЛКШ.Июль пройдёт в санаторие «Электроник»'
	        }, {
	            iconLayout: 'default#image',
	            iconImageHref: 'images/life/pin_orange.png',
	            iconImageSize: [24, 36],
	            iconImageOffset: [-5, -38]
	        });
	    var berendeevy_polyany = new ymaps.Placemark([57.857420, 41.710189], {
	    	hintContent: '«Берендеевы поляны»',
	    	balloonContent: 'ЛКШ.Август пройдёт на базе отдыха «Берендеевы поляны»'
	    }, {
			iconLayout: 'default#image',
	        iconImageHref: 'images/life/pin_red.png',
	        iconImageSize: [24, 36],
	        iconImageOffset: [-5, -38]
	    })

	    locations_map.geoObjects.add(electronic);
	    locations_map.geoObjects.add(berendeevy_polyany);
	});
});