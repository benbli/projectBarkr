var api = angular.module('playdateApi', []);

api.factory('playdateApi', ['$http', function ($http) {

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
