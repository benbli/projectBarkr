var ctrl = angular.module('MainController', []);

ctrl.controller('main', ['$scope', 'playdateApi', '$q', function ($scope, playdateApi, $q) {

    //********************************************************
    //**************** Playdates *****************************
    //********************************************************

    $scope.markers = [];
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
          $scope.updatePlaydates();
        $scope.newPlaydate = angular.copy( $scope.masterPlaydate );
        });
      });
    };
    // Get all from playdate factory and render markers
    $scope.updatePlaydates = function () {
      playdateApi.getAll().then(function (response) {
        $scope.playdates = response.data.playdates;
          var marker, i;
          var icon = {
              url: '/images/french.png',
              scaledSize: new google.maps.Size(40, 40)
          };
          for (i = 0; i < $scope.playdates.length; i++) {

            var lng = $scope.playdates[i].coordinates[0];
            var lat = $scope.playdates[i].coordinates[1];
            $scope.markersLatLng = new google.maps.LatLng(lat, lng);
            // MAP MARKERS
            marker = new google.maps.Marker({
                     position: $scope.markersLatLng,
                     map: $scope.map,
                     icon: icon,
                     draggable: false,
                     animation: google.maps.Animation.BOUNCE
            });
          }
        });
      };

  //***********************************
  //******** GEOCODER & MAP ***********
  //***********************************

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

    var myMap ={};
      myMap.init = function () {
        // MAP SETTINGS
          this.zoom = 14;
          this.mapEl = document.querySelector('#map');
          $scope.currentLatLng = new google.maps.LatLng( 40.7398848,-73.9922705 );
          console.log("map init latlng "+$scope.currentLatLng);
          $scope.map = new google.maps.Map( this.mapEl, {
            center: $scope.currentLatLng,
            zoom: this.zoom,
            styles: mapStyle
          });
      };

      $scope.recenterMap = function (coords) {
        console.log(coords);
        $scope.map.setZoom(myMap.zoom);
        $scope.currentLatLng = new google.maps.LatLng(coords[1], coords[0]);
        $scope.map.panTo( $scope.currentLatLng );
      };

      // $scope.clearMarkers = function () {
      //   $scope.marker.setMap(null);
      // }

  (function () {
    myMap.init();
    $scope.updatePlaydates();
  })();
}]);
