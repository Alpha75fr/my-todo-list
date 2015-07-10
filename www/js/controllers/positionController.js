'use strict';

angular.module('myTodoList').controller('positionController',
    function ($scope, $log, $ionicPlatform, geolocationService) {

//        $ionicPlatform.ready(function() {
        //$scope.location = geoLocation;
        //$scope.location = geolocationService.getLocation();
        //$scope.latitude = location.latitude;
        //$scope.longitude = location.longitude;

        // Utilisation d'un $watch
        /*        $scope.$watch(function () {
         return geolocationService.getLatitude()
         }, function (latitude) {
         $log.debug("La latitude a été modifiée");
         $scope.latitude = latitude;
         });

         $scope.$watch(function () {
         return geolocationService.getLongitude()
         }, function (longitude) {
         $log.debug("La longitude a été modifiée");
         $scope.longitude = longitude;
         });*/

        geolocationService.getLocation().then(
            function (pos) {
                $scope.location = pos
                $log.debug("succes dans le controleur de  position");
            },
            function () {
                $log.error("error dans le controleur de  position");
            }
        );

        // listen for location event
        $scope.$on('location:locationChanged', function (event, data) {
            $log.debug("Position - location:locationChanged ", data);
            if (data && data.geolocation) {
                $scope.latitude = data.geolocation.latitude;
                $scope.longitude = data.geolocation.longitude;
                $scope.location = data.geolocation;
                $log.debug("Position - La latitude et longitude ont été modifié ", $scope.latitude, " - ", $scope.longitude);
                //$scope.$apply();
            }
        })


        //$scope.location = geolocationService.getLocation();
    })