
// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: GenericViewCtrl});
    $routeProvider.when('/project_a', {templateUrl: 'partials/project_a.html', controller: GenericViewCtrl});
    $routeProvider.when('/project_b', {templateUrl: 'partials/project_b.html', controller: GenericViewCtrl});
    $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: ContactViewCtrl});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl});
    $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: SignupCtrl});
    // secure
    $routeProvider.when('/app/create', {templateUrl: 'partials/secure/create.html', controller: CreateCtrl});
    $routeProvider.when('/app/list', {templateUrl: 'partials/secure/list.html', controller: ListCtrl});

    // default
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
