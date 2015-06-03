'use strict';

angular.module('myApp.login', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'localStorageService', function($scope, $http, $location, localStorageService) {

  $scope.lastForm = {};
  console.log(window.location.origin + window.location.pathname + "backend/login.php");

  $scope.sendForm = function(form) {
    $scope.lastForm = angular.copy(form);
    $http({
      method: 'POST',
      url: window.location.origin + window.location.pathname + "backend/login.php",
      data: {
        'email':$scope.form.email,
        'password':$scope.form.password,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      // $scope.resultData = data;
      // console.log(data);
      // if (JSON.parse(data) == "Password_Accepted") {
      //   console.log("U may enter");
      //
      // }
      console.log("success data");
      console.log(data);
      var ndata = data.split("\\|");
      console.log(ndata);

      if (ndata[0] == "Password_Accepted") {
        $scope.resultData = ndata;
        console.log("U may enter");

        localStorageService.set("name", ndata[1]);
        localStorageService.set("email", ndata[2]);
        localStorageService.set("id", ndata[3]);

        // let them inside
        $location.path('list');

      } else {
        sweetAlert("Uh Oh.", "Your email or password didn't work. Are you sure you've created an account?", "error");
      }
    }).error(function(data, status, headers, config) {
      console.log("err");
      $scope.resultData = data;
      console.log(data);
      sweetAlert("Uh Oh.", "There was an error, please try again.", "error");

    });
  };

  $scope.resetForm = function() {
    $scope.form = angular.copy($scope.lastForm);
  };
}]);
