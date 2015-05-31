'use strict';

/* Directives */


angular.module('myApp.directives', ['ngRoute']).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
