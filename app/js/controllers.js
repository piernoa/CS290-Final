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

function LoginCtrl($scope, $http, $route) {

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
LoginCtrl.$inject = ['$scope', '$http', '$route'];

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
