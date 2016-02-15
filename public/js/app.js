console.log('app loaded');
var app = angular.module('BarkrApp', [
  'MainController',
  'playdateApi'
]);


// ngROUTES
//   app.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//   .when('/', {
//     templateUrl: '/views/partials/sign_login', //taco.html
//     controller: 'main'
//   })
//   .when('/puppies/:id', {
//     templateUrl: '/views/partials/country-detail.html',
//     controller: 'CountryDetailController'
//   })
//   .otherwise({
//     redirectTo: '/'
//   });
// }]);
