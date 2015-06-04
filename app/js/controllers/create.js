'use strict';

angular.module('myApp.create', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'partials/secure/create.html',
    controller: 'CreateCtrl'
  });
}])
.controller("CreateCtrl",['$scope', '$http', '$location', 'localStorageService', function($scope, $http, $location, localStorageService) {
  $scope.Logout = function() {
    localStorageService.remove("name");
    localStorageService.remove("id");
    localStorageService.remove("email");
  }

  if (localStorageService.get("name") === null || localStorageService.get("id") === null) {
    console.log("No Authorization");
    $location.path('/login');
  }

  $scope.lastForm = {};

  var urlString = window.location.origin + window.location.pathname + "backend/createProject.php";
  console.log(urlString);

  $scope.sendForm = function(form) {
    // console.log($scope.form.name);
    //   console.log($scope.form.start);
    //     console.log($scope.form.projLength);
    //       console.log($scope.form.notes);
    //console.log($scope.form.public);
    if ($scope.form.public) {
      $scope.form.public = 1;
    } else {
      $scope.form.public = 0;
    }
    $scope.lastForm = angular.copy(form);
    $http({
      method: 'POST',
      url: urlString,
      data: {
        'name':$scope.form.name,
        'start':$scope.form.start,
        'length':$scope.form.projLength,
        'notes': $scope.form.notes,
        'progress': 0,
        'public': $scope.form.public,
        'owner': localStorageService.get('id')
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      console.log(data);
      $scope.resultData = data;
      $scope.resetForm();
      sweetAlert("Awesome!", "Project Created Successfully", "success");
      $location.path('list');
    }).error(function(data, status, headers, config) {
      $scope.resultData = data;
      //console.log(data);
    });
  };

  $scope.resetForm = function() {
    $scope.form = angular.copy($scope.lastForm);
  };
}]);
