angular.module('myApp.controllers', ['ngRoute'])
.controller("ListCtrl",['$scope', '$http','$location', 'localStorageService', function($scope, $http, $location, localStorageService) {

  if (localStorageService.get("name") === null || localStorageService.get("id") === null) {
    console.log("No Authorization");
    $location.path('/login');
  }
  $scope.data = {};
  $scope.modalData = {};
  $scope.user = {};

  $scope.getData = function() {
    var urlString = window.location.origin + window.location.pathname + "backend/allProjects.php";
    console.log(urlString);
    $http({
      method: 'POST',
      url: urlString,
      data: {
        'owner': localStorageService.get("id")
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      console.log("success");
      var dataObj = [];
      //console.log(data);
      // php didnt want to give proper json back
      for (var i=0; i<data.length; i++) {
        var cur = data[i];
        cur = cur.split("/|");
        var obj = {};
        obj.name = cur[0];
        obj.start = cur[1];
        obj.length = cur[2];
        obj.progress = cur[3];
        obj.notes = cur[4];
        obj.id = cur[5];
        obj.public = Number(cur[6]);
        obj.votes = Number(cur[7]);
        obj.idx = i;
        data[i] = obj;
      }

      $scope.data = data;
      console.log(data);

    }).error(function(data, status, headers, config) {
      $scope.resultData = data;
      console.log("err");
      console.log(data, status, headers);
    });
  };
  $scope.delete = function(proj) {
    // console.log($scope.form.name);
    //   console.log($scope.form.start);
    //     console.log($scope.form.projLength);
    //       console.log($scope.form.notes);
    var urlString = window.location.origin + window.location.pathname + "backend/deleteProject.php";

    $http({
      method: 'POST',
      url: urlString,
      data: {
        'name': proj.name
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      console.log("success");
      $scope.getData();

    }).error(function(data, status, headers, config) {
      $scope.getData();
    });
  };
  $scope.getData();
  $scope.setModalData = function(d, idx) {
    console.log(d);
    $scope.modalData.name = d.name;
    $scope.modalData.start = new Date(d.start);
    $scope.modalData.dateCheck = d.start;
    $scope.modalData.length = d.length;
    $scope.modalData.notes = d.notes;
    $scope.modalData.progress = d.progress;
    $scope.modalData.id  = d.id;
    console.log(d.public);
    if (d.public) {
      $scope.modalData.public = true;
    } else {
      $scope.modalData.public = false;
    }

    $scope.modalData.idx = idx;
    console.log($scope.modalData);

  };
  $scope.updateProject = function(modalData) {
    console.log("from updateProject: " + modalData.public);
    if ($scope.modalData.public) {
      $scope.modalData.public = 1;
    } else {
      $scope.modalData.public = 0;
    }

    if (modalData.name == $scope.data[modalData.idx].name &&
      modalData.dateCheck == $scope.data[modalData.idx].start &&
      modalData.notes == $scope.data[modalData.idx].notes &&
      modalData.progress == $scope.data[modalData.idx].progress &&
      modalData.notes == $scope.data[modalData.idx].notes &&
      modalData.public == $scope.data[modalData.idx].public) {
        return sweetAlert("Success", "Nothing changed.", "success");
      }

      if (Number(modalData.length) < 1) {
        return sweetAlert("Uh Oh.", "Project lengths must be greater than 1!", "error");
      }

      var urlString = window.location.origin + window.location.pathname + "backend/updateProject.php";

      $http({
        method: 'POST',
        url: urlString,
        data: {
          'name': modalData.name,
          'start':modalData.start,
          'notes': modalData.notes,
          'progress': modalData.progress,
          'length': modalData.length,
          'id': modalData.id,
          'public': modalData.public,
          'owner': localStorageService.get("id")
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status, headers, config) {
        console.log("success");
        //  console.log(data);
        if (data === "dup") {
          sweetAlert("Uh Oh.", "Project names have to be unique!", "error");
        }
        $scope.getData();

      }).error(function(data, status, headers, config) {
        $scope.getData();
      });
      $scope.modalData = {};
      return;
    };
  $scope.Logout = function() {
    localStorageService.remove("name");
    localStorageService.remove("id");
    localStorageService.remove("email");
  };
  $scope.user.name = localStorageService.get("name");
}]);
