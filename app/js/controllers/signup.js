'use strict';

angular.module('myApp.signup', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignupCtrl'
  });
}])
.controller('SignupCtrl',['$scope', '$http','$location', '$route', function($scope, $http,$location, $route) {
  $scope.lastForm = {};
  var urlString = window.location.origin + window.location.pathname + "backend/newUser.php";

  $scope.sendForm = function(form) {
    $scope.lastForm = angular.copy(form);
    $http({
      method: 'POST',
      url: urlString,
      data: {
        'name':$scope.form.name,
        'email':$scope.form.email,
        'password':$scope.form.password,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      $scope.resultData = data;
      console.log(data);
      if (data == "dup") {
        sweetAlert("Uh Oh.", $scope.form.email + " is being used by another user. Try another email address!", "error");
      }
      if (data == "ok") {
        sweetAlert("Awesome!", "Account Created! Please login.", "success");
        $location.path('login');
      }

    }).error(function(data, status, headers, config) {
      $scope.resultData = data;
      console.log(data);
    });
  };

  $scope.resetForm = function() {
    $scope.form = angular.copy($scope.lastForm);
  };
}]);
