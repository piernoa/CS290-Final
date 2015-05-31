// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html' , controller: "GenericViewCtrl"});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: "LoginCtrl"});
    $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: "SignupCtrl"});

    // secure
    $routeProvider.when('/app/create', {templateUrl: 'partials/secure/create.html', controller: "CreateCtrl"});
    $routeProvider.when('/app/list', {templateUrl: 'partials/secure/list.html', controller: "ListCtrl"});

    // default
     $routeProvider.otherwise({redirectTo: '/home'});
  }]);
