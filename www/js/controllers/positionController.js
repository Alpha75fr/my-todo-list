'use strict';

angular.module('myTodoList').controller('positionController',
        function ($scope, $log, geolocationService) {

            $scope.$watch(function () { return geolocationService.getLatitude() }, function (latitude) {
                $log.debug("La valeur a été modifié");
                $scope.latitude = latitude;
            });

            $scope.$watch(function () { return geolocationService.getLongitude() }, function (longitude) {
                $log.debug("La valeur a été modifié");
                $scope.longitude = longitude;
            });


            //$scope.latitude = geolocationService.getLatitude();
            //$scope.longitude = geolocationService.getLongitude();

            $scope.location = geolocationService.getLocation();
    })