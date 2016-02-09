var ctrl = angular.module('MainController', []);

ctrl.controller('main', ['$scope', 'playdateApi', function ($scope, playdateApi) {
  $scope.message = "hi";

// puppies map
  var myMap = {};
    myMap.init = function () {

      this.map;
      this.currentLatLng;
      this.zoom;
      this.mapEl;

      // MAP SETTINGS
        this.zoom = 15;
        this.mapEl = document.querySelector('#map');
        console.log(this.map);

        this.currentLatLng = new google.maps.LatLng( 40.726755, -73.981617 );
        console.log(this.currentLatLng);

        this.map = new google.maps.Map( this.mapEl, {
          center: this.currentLatLng,
          zoom: this.zoom,
          styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#444444"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#46bcec"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ]
        });

      // MAP MARKER
        this.marker = new google.maps.Marker({
          position: this.currentLatLng,
          map: this.map,
          title: 'I am marker hurrderrr',
          icon: '/images/french.png',
          draggable: true,
          animation: google.maps.Animation.BOUNCE
        });

        //***********************************
        //************ GEOCODER *************
        //***********************************
        var geocoder = new google.maps.Geocoder();
        
        function getCoordinates( address, callback ) {
          var coordinates;
          geocoder.geocode({address: address}, function ( results, status) {
            coord_obj = results[0].geometry.location;
            coordinates = [coord_obj.nb, coord_obj.ob];
            callback(coordinates);
          });
        }
    };

    myMap.init();

    //********************************************************
    //**************** Playdate stuff ************************
    //********************************************************

    $scope.playdates = [];
    $scope.newPlaydate = {
      time: null,
      location: null
    };
    $scope.masterPlaydate = angular.copy( $scope.newPlaydate );

    // Get all from playdate factory
      $scope.updatePlaydates = function () {
        playdateApi.getAll().then(function (response) {
          $scope.playdates = response.data.playdates;
        });
      };

      $scope.createPlaydate = function () {
        playdateApi.createPlaydate( $scope.newPlaydate ).then(function () {
          console.log($scope.newPlaydate.location);
          // getCoordinates($scope.newPlaydate.location);
          $scope.updatePlaydates();
          $scope.newPlaydate = angular.copy( $scope.masterPlaydate );
        });
      };

  (function () {
    $scope.updatePlaydates();
  })();
}]);


ctrl.factory('playdateApi', ['$http', function ($http) {

  var baseUrl = '/api/playdates';
  var playdatesInterface = {};

    playdatesInterface.getAll = function () {
      return $http.get( baseUrl );
    };

    playdatesInterface.createPlaydate = function ( newPlaydate ) {
      var payload = { playdate: newPlaydate };
      return $http.post( baseUrl, payload );
    };

  return playdatesInterface;
}]);
