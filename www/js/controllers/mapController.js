'use strict';

angular.module('myTodoList').controller('mapController',
    function ($scope, $log, geolocationService, $cordovaGeolocation) {

        console.log("mapController");

        $scope.id = -1;
        $scope.watchId = -1;
        $scope.latitude = -1;
        $scope.longitude = -1;

        $scope.initialise = function () {

            var mapOptions = {
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var marker = null;

            var setPosition = function (pos) {
                $scope.latitude = pos.coords.latitude;
                $scope.longitude = pos.coords.longitude;
                map.setCenter(new google.maps.LatLng($scope.latitude, $scope.longitude));
            }

            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation.getCurrentPosition(posOptions).then( function (pos) {
//            navigator.geolocation.getCurrentPosition(
                setPosition(pos);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.latitude, $scope.longitude),
                    map: map,
                    title: "My Location"
                });
            });


            var watchOptions = {
                frequency : 1000,
                timeout : 3000,
                enableHighAccuracy: false // may cause errors if true
            };

            $scope.watchId = $cordovaGeolocation.watchPosition(watchOptions);
            //$scope.id = navigator.geolocation.watchPosition(function (pos) {
            $scope.watchId.then (function (pos) {
                setPosition(pos);
                marker.setPosition(new google.maps.LatLng($scope.latitude, $scope.longitude));
            });
            $log.debug("id ", $scope.id);

            $scope.map = map;
        };

        google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
    }
);
