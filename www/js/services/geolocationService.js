'use strict';

angular.module('myTodoList')
    .factory('geolocationService',
    function ($log, $rootScope, $cordovaGeolocation, $q) {

        var geolocation = {latitude: '', longitude: '', state: '', new: '', update: 0};

        /*        var posOptions = {timeout: 10000, enableHighAccuracy: false};
         $cordovaGeolocation.getCurrentPosition(posOptions)
         .then(function (position) {
         $log.debug("getCurrentPosition update", position);
         setLocation(position);
         }, function (err) {
         geolocation.state = 'fail';
         $log.error("Erreur dans getCurrentPosition de geolocationService ", err);
         },
         function (position) {
         $log.debug("getCurrentPosition notify ", position);
         setLocation(position);
         }
         );*/

        var setLocation = function (position) {
            geolocation.latitude = position.coords.latitude;
            geolocation.longitude = position.coords.longitude;
            geolocation.state = 'succes';
            geolocation.new = 'false';
            geolocation.update++;
            $rootScope.$broadcast("location:locationChanged", {
                position: position,
                geolocation: geolocation,
                text2: "titi"
            });
            $log.debug("geolocationService setLocation", geolocation);
        };

        var getCurrentLocation = function () {
            var deferred = $q.defer();

            var posOptions = {timeout: 5000, enableHighAccuracy: false};
            var current = $cordovaGeolocation.getCurrentPosition(posOptions);
            current.then(function (position) {
                    $log.debug("succes dans getCurrentPosition de geolocationService", position.coords);

                    geolocation.latitude = position.coords.latitude;
                    geolocation.longitude = position.coords.longitude;
                    geolocation.state = 'succes';
                    geolocation.new = true;
                    geolocation.update = 1;

                    deferred.resolve(geolocation);
                }
                , function (err) {
                    $log.error("Erreur dans getCurrentPosition de geolocationService ", err);

                    geolocation.state = 'fail';
                    geolocation.new = false;

                    deferred.reject(geolocation);
                }
            );

            return deferred.promise;
        }

        var watchOptions = {
            frequency: 1000,
            timeout: 3000,
            enableHighAccuracy: false // may cause errors if true
        };

        var watch = null;
        var startWatcher = function () {
            $log.debug("ici --------------> ");

            if (watch)
                watch.clearWatch();

            watch = $cordovaGeolocation.watchPosition(watchOptions);
            watch.then(
                function (position) {
                    $log.debug("WatchPosition succes ", position);
                    $log.debug("succes startWatcher, id ", watch.watchID);
                },
                function (err) {
                    geolocation.state = 'fail';
                    $log.error("Erreur dans watchPosition de geolocationService ", err);

                    $log.debug("error, startWatcher, id ", watch.watchID);
                },
                function (position) {
                    $log.debug("watchPosition notify ");
                    setLocation(position);

                    $log.debug("notify startWatcher, id ", watch.watchID);
                });
        };

        return {
            getLocation: function () {
                var deferred = $q.defer();
                $log.debug("------------> geolocation : ", geolocation);

                var currentLocation = getCurrentLocation();
                currentLocation.then(function (data) {
                        $log.debug("succes dans getLocation de geolocationService ", data);
                        deferred.resolve(data);

                        $log.debug("succes dans getLocation watch ", watch);
                        startWatcher();
                    }
                    , function (err) {
                        $log.error("error dans getLocation de geolocationService ", err);
                        //deferred.reject(err);

                        $log.debug("error dans getLocation watch ", watch);

                        startWatcher();
                    }
                )

                $log.debug("info current location ", currentLocation);

                return deferred.promise;
            },
            clearGeolocation: function () {
                $log.debug("Stop le watch, id : ", watch.watchID);
                if (watch)
                    watch.clearWatch();

                $log.debug("Stop le watch 2, id : ", watch);
            }
        }
    })
;