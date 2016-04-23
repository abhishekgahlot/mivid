'use strict';

/**
 * @ngdoc overview
 * @name mividApp
 * @description
 * # mividApp
 *
 * Main module of the application.
 */
angular
  .module('mividApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'
      })
      .when('/handle', {
        templateUrl: 'views/handle.html',
        controller: 'HandleCtrl',
        controllerAs: 'handle'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
