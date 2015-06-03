'use strict';

angular.module('myApp.home', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl', ['$scope', '$http', 'publicList', function ($scope, $http, publicList) {
  $scope.data = {};
  $scope.getData = function() {
    publicList.getPublic()
    .then(function(data) {
      $scope.data = {};
      $scope.data = data;
    });
  };
  $scope.getData();
  $scope.upvote  = function(d, idx) {
    // console.log($scope.data[idx].hasVoted)
    if ($scope.data[idx].hasVoted === true) {
      return sweetAlert("Nice Try!", "You've already voted on this project.", "error");
    }
    d.votes++;
    publicList.vote(d.id,d.votes)
    .then(function(data){
      $scope.data[idx].hasVoted = true;
      //$scope.getData();
    });
  };
  // $scope.upvote  = function(d, idx) {
  //   console.log($scope.data[idx].hasVoted)
  //   if ($scope.data[idx].hasVoted == true) {
  //     return sweetAlert("Nice Try!", "You've already voted on this project.", "error");
  //   }
  //   d.votes++;
  //   var urlString = window.location.origin + window.location.pathname + "backend/voteProject.php";
  //   $http({
  //     method: 'POST',
  //     url: urlString,
  //     data: {
  //       "id": d.id,
  //       "votes": d.votes
  //     },
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //   }).success(function(data, status, headers, config) {
  //     $scope.data[idx].hasVoted = true;
  //   }).error(function(data, status, headers, config) {
  //     $scope.getData();
  //   });
  // };
  $scope.downvote = function(d, idx) {
    //console.log($scope.data[idx].hasVoted)
    if ($scope.data[idx].hasVoted == true) {
      return sweetAlert("Nice Try!", "You've already voted on this project.", "error");
    }
    d.votes--;
    publicList.vote(d.id,d.votes)
    .then(function(data){
      $scope.data[idx].hasVoted = true;
    });
  };
}])
.factory('publicList', ["$http", "$q", function($http, $q) {

  return({
    getPublic: getPublic,
    vote: vote
  });
  // ---
  // PUBLIC METHODS.
  function getPublic() {
    var request = $http({
      method: 'POST',
      url: window.location.origin + window.location.pathname + "backend/publicProjects.php",
      data: {},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    return( request.then( handleListSuccess, handleError ) );
  }
  function vote(id, votes) {
    var urlString = window.location.origin + window.location.pathname + "backend/voteProject.php";
    var request = $http({
      method: 'POST',
      url: urlString,
      data: {
        "id": id,
        "votes": votes
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    return( request.then( handleSuccess, handleError ) );
  }

  // PRIVATE METHODS.
  function handleError( response ) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (
      ! angular.isObject( response.data ) ||
      ! response.data.message
    ) {
      return( $q.reject( "An unknown error occurred." ) );
    }
    // Otherwise, use expected error message.
    return( $q.reject( response.data.message ) );
  }
  // I transform the successful response, unwrapping the application data
  // from the API response payload.
  function handleSuccess( response ) {
    return( response.data );
  }
  function handleListSuccess(response) {
    var data = response.data;
    for (var i=0; i<data.length; i++) {
      var cur = data[i];
      cur = cur.split("/|");
      var obj = {};
      obj.name = cur[0];
      obj.notes = cur[1];
      obj.progress = cur[2];
      obj.votes = Number(cur[3]);
      obj.id = cur[4];
      obj.idx = i;
      obj.hasVoted = false;
      data[i] = obj;
    }
    var order = [];
    order = data.sort(function(a,b) {
      if (a.votes >= b.votes) {
        return b.votes-a.votes;
      }
    });
    return order;

  }
}]);
