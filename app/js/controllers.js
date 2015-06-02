'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngRoute'])
.controller('HomeCtrl', function ($scope, $http) {
  $scope.data = {};
  $scope.getData = function() {
    var urlString = window.location.origin + window.location.pathname + "backend/publicProjects.php";
    console.log(urlString);
      $http({
          method: 'POST',
          url: urlString,
          data: {

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
              obj.notes = cur[1];
              obj.progress = cur[2];
              obj.idx = i;
              data[i] = obj;
          }

          $scope.data = data;
          //console.log(data);

      }).error(function(data, status, headers, config) {
          $scope.resultData = data;
          console.log("err");
          console.log(data, status, headers);
      });
  };
  $scope.getData();
})
.controller("LoginCtrl", function LoginCtrl($scope, $http, $location, localStorageService) {

  $scope.lastForm = {};

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
})
.controller("SignupCtrl", function ($scope, $http,$location, $route) {

  $scope.lastForm = {};
  var urlString = window.location.origin + window.location.pathname + "backend/newUser.php";
  console.log(urlString);

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
              //alert("Message sent successfully. We'll get in touch with you soon.");

      }).error(function(data, status, headers, config) {
          $scope.resultData = data;
          console.log(data);
      });
  };

  $scope.resetForm = function() {
      $scope.form = angular.copy($scope.lastForm);
  };
})

// /***************************************** App *********************************************** */
/* /secure/create Controller */
 .controller("CreateCtrl", function CreateCtrl($scope, $http, $location, localStorageService) {
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
    console.log($scope.form.public);
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
          console.log("success");
          $scope.resultData = data;
          console.log(data);
          $scope.resetForm();
          sweetAlert("Awesome!", "Project Created Successfully", "success");
          $location.path('list');
          //alert("Message sent successfully. We'll get in touch with you soon.");

      }).error(function(data, status, headers, config) {
          $scope.resultData = data;
          console.log(data);
      });
  };

  $scope.resetForm = function() {
      $scope.form = angular.copy($scope.lastForm);
  };
})
/* /secure/list Controller */
 .controller("ListCtrl",function ListCtrl($scope, $http, $location, localStorageService) {

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
              obj.idx = i;
              data[i] = obj;
          }

          $scope.data = data;
          //console.log(data);

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

    if (modalData.name == $scope.data[modalData.idx].name
      && modalData.dateCheck == $scope.data[modalData.idx].start
      && modalData.notes == $scope.data[modalData.idx].notes
      && modalData.progress == $scope.data[modalData.idx].progress
      && modalData.notes == $scope.data[modalData.idx].notes
      && modalData.public == $scope.data[modalData.idx].public) {
        return sweetAlert("Success", "Nothing changed.", "success");
    }

    if (Number(modalData.length) < 1) {
      sweetAlert("Uh Oh.", "Project lengths must be greater than 1!", "error");
      return 0;
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
          //$scope.getData();
      });
      return $scope.modalData = {};
  };
  $scope.Logout = function() {
    localStorageService.remove("name");
    localStorageService.remove("id");
    localStorageService.remove("email");
  }
  $scope.user.name = localStorageService.get("name");
  $scope.checkBox = function() {
    //console.log($scope.modalData.public);
    // if ($scope.modalData.public) {
    //   $scope.modalData.public = 0;
    // } else {
    //   $scope.modalData.public = 1;
    // }
  }
});
