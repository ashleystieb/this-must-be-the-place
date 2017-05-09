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
    var restaurantsHigh = [];
    var saved = [];

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

    function getRestaurant(lat, long, radius, keyword) {
        // var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&type=restaurant&keyword=mexican&key=AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY';
        var params = {
            'location': new google.maps.LatLng(lat, long),
            'radius': radius,
            'type': 'restaurant',
            'keyword': keyword,
            'key': 'AIzaSyD64gDwd84RCIDl3eNnpmzsvPD8u2u_UpY'
        };
        service = new google.maps.places.PlacesService($('#blank').get(0));
        service.nearbySearch(params, function (results, status) {


            // Checks price range for each result and adds to corresponding list


            for (i in results) {

                if (results[i].price_level === 0 || results[i].price_level === 1) {
                    restaurantsLow.push(results[i]);

                } else if (results[i].price_level === 2 || results[i].price_level === 3) {
                    restaurantsHigh.push(results[i]);


                } else {
                    restaurantsLow.push(results[i]);
                }
            }

            // console.log(restaurantsLow);
            // console.log(restaurantsHigh);


            // Randomly chooses restaurant based on desired price range

            var $price = $('#price').val();
            var place = getResult($price);



            // Gets photo from randomly chosen restaurant

            var photo = place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
            $('#image').attr('src', photo);
            // console.log(photo);

            // Displays location on map
            var placeid = place.place_id;
            getPlaceDetails(placeid);

            var lat = place.geometry.location.lat();
            var long = place.geometry.location.lng();

            $('#googleMap').css({'display': 'block'});
            getMap(lat, long);


        });
    }

    // Adds autocomplete to the location input
    function autocompleteLocation() {

        var input = document.getElementById('location');
        var autocomplete = new google.maps.places.Autocomplete(input);
    }

    google.maps.event.addDomListener(window, 'load', autocompleteLocation);

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
                $('#website').css({'display': 'block'});
            } else {
                $("#web").attr("href", results.url);
                $('#website').css({'display': 'block'});
            }

            // Adds one review
            if (results.hasOwnProperty('reviews')) {
                $('#review').html('"' + results.reviews[0].text + '"');
            } else {
                $('#review').html('No reviews yet.');
            }

            // Adds phone number
            if (results.hasOwnProperty('formatted_phone_number')) {
                $('#phone').html(results.formatted_phone_number);
            }

            var rating = results.rating;

        if (results.hasOwnProperty('rating')) {


            console.log(rating);

            if (rating === 0 && rating <= parseFloat(1.4)) {
                $('#rating').attr('src', "/static/img/one.png");

            } else if (rating > parseFloat(1.5) && rating <= parseFloat(2.4)) {
                $('#rating').attr('src', "/static/img/two.png");

            } else if (rating > parseFloat(2.5) && rating <= parseFloat(3.4)) {
                $('#rating').attr('src', "/static/img/three.png");

            } else if (rating > parseFloat(3.5) && rating <= parseFloat(4.4)) {
                $('#rating').attr('src', "/static/img/four.png");

            } else if (rating > parseFloat(4.5) && rating <= 5) {
                $('#rating').attr('src', "/static/img/five.png");
            }

        } else {
            $('#ratings').html('No rating.');
        }

        });
    }

    function getRadius(miles) {

        // Converts miles to meters
        var meters = (miles * 1609.34);
        return meters
    }

    // function getRating(rating) {
    //
    //     if (results.hasOwnProperty('rating')) {
    //
    //         console.log(rating);
    //
    //         if (rating === 0 || rating <= 1) {
    //             $('#rating').attr('src', "{% static one.png %}");
    //
    //         } else if (rating > 1 || rating <= 2) {
    //             $('#rating').attr('src', "{% static two.png %}");
    //
    //         } else if (rating > 2 || rating <= 3) {
    //             $('#rating').attr('src', "{% static three.png %}");
    //
    //         } else if (rating > 3 || rating <= 4) {
    //             $('#rating').attr('src', "{% static four.png %}");
    //
    //         } else if (rating > 4 || rating <= 5) {
    //             $('#rating').attr('src', "{% static five.png %}");
    //         }
    //
    //     } else {
    //         $('#ratings').html('No rating.');
    //
    //     }
    // }

    function getResult(price) {

        // Checks price entered and length of array

        if (price === '$' && restaurantsLow.length > 0) {

            // Chooses random restaurant and adds it to HTML

            var lowChoice = (restaurantsLow[Math.floor(Math.random() * restaurantsLow.length)]);
            //var lowChoice = restaurantsLow[random];
            $('#name').html(lowChoice.name);
            //console.log(restaurantsLow);
            return lowChoice;


        } else if (price === '$$' && restaurantsHigh.length > 0) {
            var highChoice = (restaurantsHigh[Math.floor(Math.random() * restaurantsHigh.length)]);
            $('#name').html(highChoice.name);
            //console.log(restaurantsHigh);
            return highChoice;

        } else {
            $('#name').html('No results.');
            return 'None';
        }
    }


    $('#search').on('click', function () {
        getMap(lat, long);
        var $address = $('#location').val();
        // Changes location to latitude and longitude
        $.when(getLatLong($address)).done(function () {
            var $cuisine = $('#cuisine').val();
            var miles = $('#radius').val();
            var radius = getRadius(miles);
            // Compiles a list of restaurants based on criteria
            getRestaurant(lat, long, radius, $cuisine);
        });
    });

    // Shows next result on modal
    $('#next').on('click', function () {
        getMap(lat, long);
        var $address = $('#location').val();
        // Changes location to latitude and longitude
        $.when(getLatLong($address)).done(function () {
            var $cuisine = $('#cuisine').val();
            var miles = $('#radius').val();
            var radius = getRadius(miles);
            // Compiles a list of restaurants based on criteria
            getRestaurant(lat, long, radius, $cuisine);
        });
    });

    // Submits form with Enter key
    $("#form").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#search").click();
        }
    });

    // Datalist storage
    var cuisineList = document.getElementById('cuisines');
    var cuisineInput = document.getElementById('cuisine');
    var request = new XMLHttpRequest();

    // Handle state changes for the request.
    request.onreadystatechange = function (response) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // Parse the JSON
                var jsonOptions = JSON.parse(request.responseText);

                // Loop over the JSON array.
                jsonOptions.forEach(function (item) {
                    // Create a new <option> element.
                    var option = document.createElement('option');
                    // Set the value using the item in the JSON array.
                    option.value = item;
                    // Add the <option> element to the <datalist>.
                    cuisineList.appendChild(option);
                });

                // Update the placeholder text.
                cuisineInput.placeholder = "Mexican, Thai, Pizza, etc.";
            } else {
                // An error occurred
                cuisineInput.placeholder = "Couldn't load datalist options";
            }
        }
    };

});

function getMap(lat, long) {
    // Shows map centered on Portland, OR
    var place = {lat: lat, lng: long};
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: place,
        zoom: 12

    });
    var marker = new google.maps.Marker({
        position: place,
        map: map

    });
}
