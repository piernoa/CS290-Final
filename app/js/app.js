// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngAnimate',
  'ngRoute',
  'myApp.home',
  'myApp.login',
  'myApp.signup',
  'myApp.create',
  'myApp.list',
  'LocalStorageModule',
])
.config(['$routeProvider', function($routeProvider) {
  // default
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('AP');
}]);
