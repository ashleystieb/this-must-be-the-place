/**
 * Created by ashley on 4/12/17.
 */

    /* Keys
    JS PLACES API KEY = AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY
    MAPS API KEY = AIzaSyCpkXptIGyLa_jIaStEFTxw3oO7Dq-nQbU
    JS MAPS API KEY = AIzaSyDfwZii7p9ZyqnlQmx8vDgq4Oh_D7h9ZvU
    GEOCODE API KEY = AIzaSyAgvTmt9cQWZpT5im88n6_exM9zVEzopwo

    */

$(document).ready(function() {
    console.log('hello javascript');
    if(jQuery){
        console.log('jQuery');
    }

/*
    function geoCodeLocation(latitude, longitude) {
        $.ajax({
            type: 'GET',
            url: 'https://developer.trimet.org/ws/V1/stops?ll=' + longitude + ',' + latitude + '&meters=500&appID=823A27BED3E0A66DABBD63446&json=true',
            success: function(response) {
                var myLoc = response.resultSet.location;
                var lat = [];
                var lng = [];
                var info = [];
                var markers = [];
                $.each(myLoc, function (i) {
                    // Add latitude to array
                    lat.push(myLoc[i].lat);
                    // Add longitude to array
                    lng.push(myLoc[i].lng);
                    info.push(myLoc[i].desc);
                });
                // Adds latitude and longitude to array
                markers.push(lat, lng);
                // Adds markers to map
                addMarker(markers, latitude, longitude, info);
                // Console logs latitude and longitude
                console.log(markers);
            },
            error: function () {
                alert('Error loading page request');
            }
        });
    }*/

function getLatLong(address){
    console.log('clicked');
        // Takes user input to get address
        // var $cuisine = $('#cuisine').val();
        // var $price = $('#price').val();
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAgvTmt9cQWZpT5im88n6_exM9zVEzopwo';
        $.ajax({
            async: 'false',
            type: 'GET',
            url: url,
            success: function(response){
                // Gets latitude and longitude
                var lat = response.results[0].geometry.location.lat;
                var long = response.results[0].geometry.location.lng;
                // Plugs latitude and longitude into function
                console.log(lat,long);
                $('#latitude').html(lat);
                $('#longitude').html(long);
            }
        });
}
function getRestaurant(latitude,longitude,cuisine) {
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=5000&type=restaurant&keyword=' + cuisine + '&key=AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY';
    $.ajax({
        type: 'GET',
        url: url,
        success: function (response) {
            var name = response.results[0].name;
            console.log(name);
        }
    });
}

    $('#submit').on('click', function(){
        var $address = $('#location').val();
        getLatLong($address);
    });

    $('#restaurant').on('click', function(){
        //var $cuisine = $('#cuisine').val();
        getRestaurant('45.5230622','-122.6764816','mexican');

    });

});

