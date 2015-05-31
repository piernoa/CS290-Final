'use strict';

/* Controllers */

// example
// perhaps use window.location
// var request = $http({
//   method: "post",
//    url: window.location + "/backend/addVideo.php",
//   //url: "http://web.engr.oregonstate.edu/~piernoa/webDev/wk_9/final_proj/app/backend/addVideo.php",
//   data: {name:"hello word!", category:"happy", length: 500},
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//   });.call(context, arguments)
//
//   request.success(function (data) {
//       //document.getElementById("message").textContent = "You have login successfully with email "+data;
//       console.log(data);
//   });

function GenericViewCtrl($scope, $http) {

  $scope.testPut = function() {
    console.log(window.location.origin + window.location.pathname)
    var request = $http({
    method: "post",
    url: window.location.origin + window.location.pathname + "/backend/addVideo.php",
    data: {name:"hello word!", category:"happy", length: 500},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    /* Check whether the HTTP Request is successful or not. */
    request.success(function (data) {
        //document.getElementById("message").textContent = "You have login successfully with email "+data;
        console.log(data);
    });

  };
}
GenericViewCtrl.$inject = ['$scope', '$http'];

function LoginCtrl($scope, $http, $route, $state) {

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
              $scope.resultData = data;
              console.log(data);
              if (JSON.parse(data) == "Password_Accepted") {
                console.log("U may enter");
                $state.go('#/app/create');
              }

          }).error(function(data, status, headers, config) {
              $scope.resultData = data;
              console.log(data);
          });
  };

  $scope.resetForm = function() {
      $scope.form = angular.copy($scope.lastForm);
  };
}
LoginCtrl.$inject = ['$scope', '$http', '$route', '$state'];

function SignupCtrl($scope, $http, $route) {

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
              //alert("Message sent successfully. We'll get in touch with you soon.");

      }).error(function(data, status, headers, config) {
          $scope.resultData = data;
          console.log(data);
      });
  };

  $scope.resetForm = function() {
      $scope.form = angular.copy($scope.lastForm);
  };
}
SignupCtrl.$inject = ['$scope', '$http', '$route'];

function ContactViewCtrl($scope, $http) {

    $scope.lastForm = {};

    $scope.sendForm = function(form) {
        $scope.lastForm = angular.copy(form);
        $http({
            method: 'POST',
            url: "/backend/login.php",
            data: {
                'contactname':$scope.form.name,
                'weburl':$scope.form.website,
                'email':$scope.form.email,
                'app':$scope.form.project,
                'subject':$scope.form.subject,
                'message':$scope.form.message
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status, headers, config) {
                $scope.resultData = data;
                alert("Message sent successfully. We'll get in touch with you soon.");

            }).error(function(data, status, headers, config) {
                $scope.resultData = data;
                alert("Sending message failed.");
            });
    };

    $scope.resetForm = function() {
        $scope.form = angular.copy($scope.lastForm);
    }

}

ContactViewCtrl.$inject = ['$scope', '$http'];

/***************************************** App *********************************************** */
/* /secure/create Controller */
function CreateCtrl($scope, $http) {

  $scope.lastForm = {};

  var urlString = window.location.origin + window.location.pathname + "backend/createProject.php";
  console.log(urlString);

  $scope.sendForm = function(form) {
    // console.log($scope.form.name);
    //   console.log($scope.form.start);
    //     console.log($scope.form.projLength);
    //       console.log($scope.form.notes);
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
              'owner': 1

          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status, headers, config) {
          console.log("success");
          $scope.resultData = data;
          console.log(data);
          $scope.resetForm();
          //alert("Message sent successfully. We'll get in touch with you soon.");

      }).error(function(data, status, headers, config) {
          $scope.resultData = data;
          console.log(data);
      });
  };

  $scope.resetForm = function() {
      $scope.form = angular.copy($scope.lastForm);
  };
}

CreateCtrl.$inject = ['$scope', '$http'];

/* /secure/list Controller */
function ListCtrl($scope, $http) {

  $scope.data = {};
  $scope.modalData = {};



  $scope.getData = function() {
    // console.log($scope.form.name);
    //   console.log($scope.form.start);
    //     console.log($scope.form.projLength);
    //       console.log($scope.form.notes);
    var urlString = window.location.origin + window.location.pathname + "backend/allProjects.php";
    console.log(urlString);
      $http({
          method: 'POST',
          url: urlString,
          data: {
              'owner': 1
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status, headers, config) {
          console.log("success");
          var dataObj = [];

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
  $scope.setModalData = function(d) {
      $scope.modalData.name = d.name;
      $scope.modalData.start = d.start;
      $scope.modalData.length = d.length;
      $scope.modalData.notes = d.notes;
      $scope.modalData.progress = d.progress;
      $scope.modalData.id  = d.id;
  };
  $scope.updateProject = function(modalData) {
    console.log($scope.modalData)
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
              'owner': 1
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status, headers, config) {
          console.log("success");
          console.log(data);
          $scope.getData();

      }).error(function(data, status, headers, config) {
          //$scope.getData();
      });
  };
}

ListCtrl.$inject = ['$scope', '$http'];
