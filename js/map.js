var map = {
    initMap: function(){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 48.856614, lng: 2.352222},
            zoom: 12
        });
        this.initMarkers();
    },
    initMarkers: function(){
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=539f0abd81237b56d47a706d12df977c7fc78888", function(reponse){
            var velibs = JSON.parse(reponse);
            var markers = [];
            velibs.forEach(function(velib){
                var lat = velib.position.lat,
                    lng = velib.position.lng,
                    latLng = new google.maps.LatLng(lat,lng),
                    marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        url: "#block-details"
                    }),
                    blockElt = $("#block-details"),
                    stationDetails = $("#station-details"),
                    p1Elt = $("#adresse"),
                    p2Elt = $("#number-stand"),
                    p3Elt = $("#number-velib"),
                    spanElt = $("#station-name"),
                    status = velib.status,
                    address = velib.address.toLowerCase(),
                    standsAvailable = velib.available_bike_stands + " place(s) disponible(s)",
                    bikesAvailable = velib.available_bikes + " vélo(s) disponible(s)";
                markers.push(marker);
                marker.addListener("click", function(){
                    blockElt.css("display", "block");
                    if (status === "CLOSED") {
                        p1Elt.css("display", "block");
                        $("#reserver, #confirmer, #confirm-signature, #station-details *:not(#adresse)").css("display", "none");
                        p1Elt.text("La station " + address + " est fermée");
                    } else if (velib.available_bikes === 0){
                        $("#reserver, #confirmer, #confirm-signature").css("display", "none");
                        $("#station-details *:not(#reserver, #confirmer, #confirm-signature)").css("display", "inline-block");
                        p1Elt.text("Aucun vélo n'est disponible");
                        p1Elt.css("display", "block");
                        spanElt.text(address);
                        p2Elt.text(standsAvailable);
                        p3Elt.text(bikesAvailable);
                    } else {
                        $("#adresse, #confirmer, #confirm-signature").css("display", "none");
                        $("#station-details *:not(#adresse, #confirmer, #confirm-signature)").css("display", "inline-block");
                        spanElt.text(address);
                        p2Elt.text(standsAvailable);
                        p3Elt.text(bikesAvailable);
                        $("#reserver").css("display", "block");
                    }
                    window.location.href = marker.url;
                });
            });
            var markerCluster = new MarkerClusterer(map, markers, {imagePath: "images/m"});
        });
    }
};