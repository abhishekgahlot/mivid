'use strict';
/* global Mivid */
/**
 * @ngdoc function
 * @name mividApp.controller:HandleCtrl
 * @description
 * # HandleCtrl
 * Controller of the mividApp
 */
angular.module('mividApp')
  .controller('HandleCtrl', ['$location', function ($location) {
    if(!Mivid.user.email || Mivid.user.handle !== "") {
      $location.path('/');
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
