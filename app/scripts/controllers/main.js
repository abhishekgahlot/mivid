'use strict';
/* global Mivid */
/**
 * @ngdoc function
 * @name mividApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mividApp
 */
angular.module('mividApp')
  .controller('MainCtrl', ['$location', '$scope', '$http', '$routeParams', function ($location, $scope, $http, $routeParams) {
    if (Mivid.user.email && !Mivid.user.handle) {
      $location.path('/handle');
    }
    if ($routeParams.handle) {
      if (Mivid.user) {
        var url = "/api/user/" + $routeParams.handle;
        $http.get(url)
          .then(function (response) {
            $scope.user = response.data.user;
          });
      }
    } else if (Mivid.user) {
      var url = "/api/user/"+Mivid.user.handle;
      $http.get(url)
        .then(function (response) {
          $scope.user = response.data.user;
        });
    } else {
      $location.path("/");
    }
  }]);
