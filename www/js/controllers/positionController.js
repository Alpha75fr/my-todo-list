'use strict';

angular.module('myTodoList').controller('positionController',
        function ($scope, $log, geolocationService) {

            $scope.$watch(function () { return geolocationService.getLatitude() }, function (latitude) {
                $log.debug("La latitude a été modifiée");
                $scope.latitude = latitude;
            });

            $scope.$watch(function () { return geolocationService.getLongitude() }, function (longitude) {
                $log.debug("La longitude a été modifiée");
                $scope.longitude = longitude;
            });

            $scope.location = geolocationService.getLocation();
    })