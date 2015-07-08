'use strict';

angular.module('myTodoList').controller('mapController',
    function ($scope, $log, $ionicPlatform, geolocationService, location) {

        $scope.location = location;

//            $scope.location = geolocationService.getLocation();
//            $scope.latitude = location.latitude;
//            $scope.longitude = location.longitude;


        $log.debug("Map - init location ", location);

        // Fonctions privees à la classe
        var getLatLngPosition = function (pos) {
            return new google.maps.LatLng(pos.latitude, pos.longitude)
        }

        var mapOptions = {
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            map: map,
            title: "My Location"
        });

        $log.debug("Map - init location ", location);



        // listen for location event update
        $scope.$on('location:locationChanged', function (event, data) {
            $log.debug("Map - location:locationChanged ", data);
            if (data && data.geolocation) {
                $log.debug("--------->  ", event, " - ", data.geolocation);
                $scope.location = data.geolocation;
//                     $scope.latitude = data.geolocation.latitude;
//                     $scope.longitude = data.geolocation.longitude;
                map.setCenter(getLatLngPosition(data.geolocation));
                marker.setPosition(getLatLngPosition(data.geolocation));
//                    $log.debug("Map - La latitude et longitude ont été modifié ", $scope.latitude, " - ", $scope.longitude);
            }
        })

        $scope.map = map;

        google.maps.event.addDomListener(window, 'load', function() {
            map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
            marker.setPosition(getLatLngPosition(location));
        });
    }
);
