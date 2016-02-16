var ctrl = angular.module('MainController', []);

ctrl.controller('main', ['$scope', 'playdateApi', '$q', function ($scope, playdateApi, $q) {

    //***********************************
    //******** MAP & GEOCODER ***********
    //***********************************

      var myMap ={};
      var markers = [];
      var infowindows = [];
      var icon = {
          url: '/images/french.png',
          scaledSize: new google.maps.Size(40, 40)
      };

        myMap.init = function () {
          // MAP SETTINGS
            this.zoom = 14;
            this.mapEl = document.querySelector('#map');
            $scope.currentLatLng = new google.maps.LatLng( 40.7398848,-73.9922705 );
            $scope.map = new google.maps.Map( this.mapEl, {
              center: $scope.currentLatLng,
              zoom: this.zoom,
              styles: mapStyle
            });
        };

        $scope.recenterMap = function (coords) {
          // console.log(coords);
          $scope.map.setZoom(16);
          $scope.currentLatLng = new google.maps.LatLng(coords[1], coords[0]);
          $scope.map.panTo( $scope.currentLatLng );
        };

        $scope.clearMarkers = function () {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
        };

        $scope.getCoordinates = function( address, callback ) {
          var geocoder = new google.maps.Geocoder();
          var coordinates;

          geocoder.geocode( {address: address}, function ( results, status) {
            console.log(results);
            coords_obj = results[0].geometry.location;
            coordinates = [coords_obj.lng(), coords_obj.lat()];
            callback(coordinates);
          });
        };

    //********************************************************
    //**************** Playdates *****************************
    //********************************************************

    $scope.playdates = [];
    $scope.newPlaydate = {
      time: null,
      location: null,
      coordinates: null
    };
    $scope.masterPlaydate = angular.copy( $scope.newPlaydate );

    $scope.createPlaydate = function () {
      var deferred = $q.defer();

      $scope.getCoordinates( $scope.newPlaydate.location, function( coords ) {
        deferred.resolve( coords );
      });

        deferred.promise.then(function( coordinates ) {
        $scope.newPlaydate.coordinates = coordinates || [];
        playdateApi.createPlaydate( $scope.newPlaydate ).then(function () {
          $scope.clearMarkers();
          $scope.updatePlaydates();
          $scope.newPlaydate = angular.copy( $scope.masterPlaydate );
        });
      });
    };
    // Get all from playdate factory and render markers
    $scope.updatePlaydates = function () {
      playdateApi.getAll().then(function (response) {
        $scope.playdates = response.data.playdates;

          for (var i = 0; i < $scope.playdates.length; i++) {

            var contentInfo = '<span>' + $scope.playdates[i].location + '</span></br><img class="puppy-picture" src="http://www.thepuppyapi.com/puppy?format=src">';

            infowindows[i] = new google.maps.InfoWindow({
              content: contentInfo
            });

            var lng = $scope.playdates[i].coordinates[0];
            var lat = $scope.playdates[i].coordinates[1];
            $scope.markersLatLng = new google.maps.LatLng(lat, lng);
            // MAP MARKERS
            markers[i] = new google.maps.Marker({
                     position: $scope.markersLatLng,
                     map: $scope.map,
                     icon: icon,
                     draggable: false,
                     clickable: true,
                     animation: google.maps.Animation.BOUNCE
            });
            google.maps.event.addListener(markers[i], 'click', (function (marker, i) {
              return function () {
                infowindows[i].open($scope.map, markers[i]);
              };
            })(markers[i], i));
          }
          console.log(markers);
        });
      };

  (function () {
    myMap.init();
    $scope.updatePlaydates();

    //animate.css
    $.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            $(this).addClass('animated zoomOutRight').one(animationEnd, function () {
              $(this).removeClass('animated zoomOutRight');
            });
        });
      }
    });

    $('.button-primary').click(function () {
      // e.preventDefault();
      var thoughtPicture = $('#thought-picture');
      thoughtPicture.show();
      thoughtPicture.animateCss('wobble');
    });

  })();
}]);
