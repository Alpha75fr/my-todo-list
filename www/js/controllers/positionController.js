'use strict';

angular.module('myTodoList').controller('positionController',
    function ($scope, $log, $ionicPlatform, geolocationService, geoLocation) {

        $scope.location = geoLocation;
    })