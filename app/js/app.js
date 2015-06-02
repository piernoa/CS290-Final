// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.controllers', 'LocalStorageModule'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html' , controller: "HomeCtrl"});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: "LoginCtrl"});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: "SignupCtrl"});

  // secure
  $routeProvider.when('/create', {templateUrl: 'partials/secure/create.html', controller: "CreateCtrl"});
  $routeProvider.when('/list', {templateUrl: 'partials/secure/list.html', controller: "ListCtrl"});

  // default
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('AP');
})
.run(function($rootScope) {
  $rootScope.typeOf = function(value) {
    return typeof value;
  };
})

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});
