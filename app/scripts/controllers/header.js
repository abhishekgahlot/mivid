'use strict';
/* global Mivid */
/**
 * @ngdoc function
 * @name mividApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the mividApp
 */
angular.module('mividApp')
  .controller('HeaderCtrl', ['$location','$rootScope', function ($location, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.handle = Mivid.user.handle;
    console.log($rootScope.handle);
  }]);
