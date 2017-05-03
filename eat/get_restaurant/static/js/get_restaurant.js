/**
 * Created by ashley on 4/12/17.
 */

/* Keys
 JS PLACES API KEY = AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY
 MAPS API KEY = AIzaSyCpkXptIGyLa_jIaStEFTxw3oO7Dq-nQbU
 JS MAPS API KEY = AIzaSyDfwZii7p9ZyqnlQmx8vDgq4Oh_D7h9ZvU
 GEOCODE API KEY = AIzaSyAgvTmt9cQWZpT5im88n6_exM9zVEzopwo

 */

$(document).ready(function () {


    // Global variables
    var lat;
    var long;
    var restaurantsLow = [];
    var restaurantsMed = [];
    var restaurantsHigh = [];


    console.log('JavaScript detected');
    if (jQuery) {
        console.log('jQuery detected');
    }


    // Converts addresses to latitude longitude coordinates

    function getLatLong(address) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAgvTmt9cQWZpT5im88n6_exM9zVEzopwo';
        return $.ajax({
            type: 'GET',
            url: url,
            success: function (response) {
                // Gets latitude and longitude

                lat = response.results[0].geometry.location.lat;
                long = response.results[0].geometry.location.lng;
                // Plugs latitude and longitude into function
            }
        });
    }

    function getRestaurant(lat, long, keyword) {
        // var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&type=restaurant&keyword=mexican&key=AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY';
        var params = {
            'location': new google.maps.LatLng(lat, long),
<<<<<<< HEAD
            'radius': '10000',
=======
            'radius': '16000',
>>>>>>> 89bfaac996c1587c47a9a60f56890af16dee09ea
            'type': 'restaurant',
            'keyword': keyword,
            'key': 'AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY',
        };
        service = new google.maps.places.PlacesService($('#blank').get(0));
        service.nearbySearch(params, function (results, status) {

            //console.log(results);

            // Checks price range for each result and adds to corresponding list

            console.log(results);


            for (i in results) {

                if (results[i].price_level === 1 || results[i].price_level === 2) {
                    restaurantsLow.push(results[i]);

                } else if (results[i].price_level === 2 || results[i].price_level === 3) {
                    restaurantsMed.push(results[i]);

                } else if (results[i].price_level === 3 || results[i].price_level === 4) {
                    restaurantsHigh.push(results[i]);

                } else {
                    restaurantsMed.push(results[i]);
                }
            }

            console.log(restaurantsLow);
            console.log(restaurantsMed);
            console.log(restaurantsHigh);



            // Randomly chooses restaurant based on desired price range

            var $price = $('#price').val();
            var place = getResult($price);

            // Gets photo from randomly chosen restaurant

            var photo = place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
            $('#image').attr('src', photo);
            console.log(photo);

            var placeid = place.place_id;
            getPlaceDetails(placeid);

            var lat = place.geometry.location.lat();
            var long = place.geometry.location.lng();

            $('#googleMap').css({'display':'block'});
            getMap(lat,long);

        });
    }

    // Gets details of randomly selected restaurant
    function getPlaceDetails(placeid) {
        var params = {
            'placeId': placeid,
            'key': 'AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY'
        };
        service = new google.maps.places.PlacesService($('#blank2').get(0));
        service.getDetails(params, function (results, status) {

            console.log(results);

            // Adds address to website
            if (results.hasOwnProperty('adr_address')) {
                $('#address').html(results.adr_address);
            } else {
                $('#address').html('No address listed');
            }

            // Adds website link
            if (results.hasOwnProperty('website')) {
                $("#web").attr("href", results.website);
                $('#website').css({'display':'block'});
            } else {
                $("#web").attr("href", results.url);
                $('#website').css({'display':'block'});
            }

            if (results.hasOwnProperty('rating')) {
                $("#rating").html(results.rating);
                $('#rate').css({'display':'inline'});
            } else {
                $('#rating').html('No rating');
                $('#rate').css({'display':'inline'});
            }
    });
    }


    function getResult(price) {

        // Checks price entered and length of array

        if (price === '$' && restaurantsLow.length > 0) {

            // Chooses random restaurant and adds it to HTML

            var lowChoice = (restaurantsLow[Math.floor(Math.random() * restaurantsLow.length)]);
            //var random = (Math.floor(Math.random() * restaurantsLow.length) + 1) - 1;
            //var lowChoice = restaurantsLow[random];
            $('#name').html(lowChoice.name);
            //console.log(restaurantsLow);
            return lowChoice;

        } else if (price === '$$' && restaurantsMed.length > 0) {
            var medChoice = (restaurantsMed[Math.floor(Math.random() * restaurantsMed.length)]);
            $('#name').html(medChoice.name);
            //console.log(restaurantsMed);
            return medChoice;

        } else if (price === '$$$' && restaurantsHigh.length > 0) {
            var highChoice = (restaurantsHigh[Math.floor(Math.random() * restaurantsHigh.length)]);
            $('#name').html(highChoice.name);
            //console.log(restaurantsHigh);
            return highChoice;

        } else {
            $('#name').html('No results.');
            return 'None';
        }
    }


    $('#submit').on('click', function () {
        var $address = $('#location').val();
        // Changes location to latitude and longitude
        $.when(getLatLong($address)).done(function () {
            var $cuisine = $('#cuisine').val();
            // Compiles a list of restaurants based on criteria
            getRestaurant(lat, long, $cuisine);
        });
    });

});

function getMap(lat, long){
    // Shows map centered on Portland, OR
    var place = {lat: lat, lng: long};
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: place,
<<<<<<< HEAD
        zoom: 12
=======
        zoom: 16
>>>>>>> 89bfaac996c1587c47a9a60f56890af16dee09ea

    });
    var marker = new google.maps.Marker({
        position: place,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 10
          },
        map: map

    });
}


