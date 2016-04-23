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
  .controller('MainCtrl', ['$location', function ($location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if (Mivid.user.email && !Mivid.user.handle) {
      $location.path('/handle');
    }

  }]);
