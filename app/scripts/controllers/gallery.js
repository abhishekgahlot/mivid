'use strict';
/**
 * @ngdoc function
 * @name mividApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the mividApp
 */
angular.module('mividApp')
  .controller('GalleryCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    var videoId = $routeParams.videoId, videoUrl;
    console.log('Hello from GalleryCtrl, url param is:', videoId);
    $http.get('/api/video/' + videoId)
    .then((response) => {
      videoUrl = response.data.videoUrl;
      console.log('Got response ', videoUrl);
    });
  }]);
