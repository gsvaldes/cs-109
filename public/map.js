$(document).ready(function() {

    var language = "english";
    var currentId;
    $("#english").click(function() {
        language = "english";
	    console.log("the language is now " + language);
	    switchToEnglish();
    });
	$("#spanish").click(function() {
		language = "spanish";
        console.log("the language is now " + language);
		switchToSpanish();
	});
		
		
	// create a tile layer sourced from mapbox
	var basemap = L.tileLayer('https://{s}.tiles.mapbox.com/v4/gsvaldes.lc42jp9d/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3N2YWxkZXMiLCJhIjoia1R4QjhCVSJ9.dT6pDZZcysDY3zifgWGhVg#6')
		

	var points;
	$.getJSON('data/det-centers.json', function (data){
		var map = L.map('map').setView([30.260, -97.770], 7);
		basemap.addTo(map);
		   var geojson = L.geoJson(data, {
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.name);
			    layer.on('mouseover', function (e){
					this.openPopup();
				});
				layer.on('mouseout', function (e){
					this.closePopup();
				});
					
				layer.on('click', function (e) {              // add click event to every feature
					markerClick(feature);
				    getCenterData(feature.properties.id);
                });
					

            }
            });
		geojson.addTo(map);
	});	
		
		
		
	function markerClick(feature){
		console.log('a marker has been clicked' + feature.properties.name);
		$('#some_text').text(feature.properties.name);
	}
		
	function getCenterData(id){
		$.getJSON('data/' + id + '.json', function (data){
			$("#info-1").text(data[language].par1);
		    $("#info-2").text(data[language].par2);
			$("#det-img").attr('src', 'images/' + data[language].img);
			currentId = id;
			console.log(data[language].par1);
		    console.log('images/' + data[language].img);
			console.log(data.spanish)	
        });			
	}
		
	function switchToEnglish(){
		$("#lead").text("Texas Immigrant Detention Centers");
	    getCenterData(currentId);
	}
		
	function switchToSpanish(){
		$("#lead").text("Centros de detención de inmigrantes");
	    getCenterData(currentId);
	}

});