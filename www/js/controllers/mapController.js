'use strict';

angular.module('myTodoList').controller('mapController',
    function ($scope, $log, $ionicPlatform, geolocationService) {

        $scope.geolocation = {};

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

        var initialise = function () {
            // load the first position
            geolocationService.getLocation().then(
                function (pos) {
                    var currentLocation = new google.maps.LatLng(pos.latitude, pos.longitude);

                    $log.debug("succes dans le controleur de  map ", pos.latitude);
                    $log.debug("Map - init location 1 ", currentLocation);

                    $scope.geolocation.latitude = pos.latitude;
                    $scope.geolocation.longitude = pos.longitude;
                    $scope.geolocation.state = pos.state;

                    map.setCenter(currentLocation);
                    marker.setPosition(currentLocation);
                },
                function (err) {
                    $log.error("error dans le controleur de  map", err);
                }
            )

            // listen for location event update
            $scope.$on('location:locationChanged', function (event, data) {
                $log.debug("Map - location:locationChanged ", data);
                if (data && data.geolocation) {

                    $log.debug("--------->  location:locationChanged ", event, " - ", data.geolocation);

                    $scope.geolocation.latitude = data.geolocation.latitude;
                    $scope.geolocation.longitude = data.geolocation.longitude;
                    $scope.geolocation.state = data.geolocation.state;
                    $scope.geolocation.update = data.geolocation.update;

                    $log.debug("--------->  $scope.geolocation.latitude ", $scope.geolocation.latitude);

                    var currentLocation = new google.maps.LatLng(data.geolocation.latitude, data.geolocation.longitude);
                    map.setCenter(currentLocation);
                    marker.setPosition(currentLocation);
                }
            })

            $scope.map = map;
        }

        google.maps.event.addDomListener(document.getElementById("map"), 'load', initialise());
    });
