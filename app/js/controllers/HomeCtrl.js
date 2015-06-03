angular.module('myApp.controllers', ['ngRoute'])
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.data = {};
  $scope.getData = function() {
    var urlString = window.location.origin + window.location.pathname + "backend/publicProjects.php";
    //console.log(urlString);
    $http({
      method: 'POST',
      url: urlString,
      data: {

      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      console.log("success");
      //console.log(data);
      $scope.data = {};
      //console.log(data);
      // php didnt want to give proper json back
      for (var i=0; i<data.length; i++) {
        var cur = data[i];
        cur = cur.split("/|");
        var obj = {};
        obj.name = cur[0];
        obj.notes = cur[1];
        obj.progress = cur[2];
        obj.votes = cur[3];
        obj.id = cur[4];
        obj.idx = i;
        obj.hasVoted = false;
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
  $scope.upvote  = function(d, idx) {
    console.log($scope.data[idx].hasVoted)
    if ($scope.data[idx].hasVoted == true) {
      return sweetAlert("Nice Try!", "You've already voted on this project.", "error");
    }
    d.votes++;
    var urlString = window.location.origin + window.location.pathname + "backend/voteProject.php";
    $http({
      method: 'POST',
      url: urlString,
      data: {
        "id": d.id,
        "votes": d.votes
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      $scope.data[idx].hasVoted = true;
    }).error(function(data, status, headers, config) {
      $scope.getData();
    });
  }
  $scope.downvote = function(d, idx) {
    console.log($scope.data[idx].hasVoted)
    if ($scope.data[idx].hasVoted == true) {
      return sweetAlert("Nice Try!", "You've already voted on this project.", "error");
    }
    d.votes--;
    var urlString = window.location.origin + window.location.pathname + "backend/voteProject.php";
    $http({
      method: 'POST',
      url: urlString,
      data: {
        "id": d.id,
        "votes": d.votes
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      $scope.data[idx].hasVoted = true;
    }).error(function(data, status, headers, config) {
      $scope.getData();
    });
  }
}]);
