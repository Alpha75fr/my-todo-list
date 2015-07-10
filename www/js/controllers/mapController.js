'use strict';

angular.module('myTodoList').controller('mapController',
    function ($scope, $log, $ionicPlatform, geolocationService) {

        $scope.initialise = function () {

            var mapOptions = {
//            center: currentLocation,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);;
            var marker = new google.maps.Marker({
                map: map,
                title: "My Location"
            });

            geolocationService.getLocation().then(
                function (pos) {
                    var currentLocation = new google.maps.LatLng(pos.latitude, pos.longitude);

                    $log.debug("succes dans le controleur de  map ", pos.latitude);
                    $log.debug("Map - init location 1 ", currentLocation);

                    map.setCenter(currentLocation);
                    marker.setPosition(currentLocation);

                    geolocationService.startGeolocation
                },
                function () {
                    $log.error("error dans le controleur de  map");
                }
            )

            // listen for location event update
            $scope.$on('location:locationChanged', function (event, data) {
                $log.debug("Map - location:locationChanged ", data);
                if (data && data.geolocation) {

                    $log.debug("--------->  ", event, " - ", data.geolocation);
                    $scope.location = data.geolocation;
                    map.setCenter(new google.maps.LatLng((data.geolocation.latitude, data.geolocation.longitude)));
                    marker.setPosition(new google.maps.LatLng((data.geolocation.latitude, data.geolocation.longitude)));
                }
            })

            $scope.map = map;
        }

        google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
    });
