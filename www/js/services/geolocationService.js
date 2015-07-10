'use strict';

angular.module('myTodoList')
    .factory('geolocationService',
    function ($log, $rootScope, $cordovaGeolocation, $q) {

        var geolocation = {latitude: '', longitude: '', state: ''}



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
            $rootScope.$broadcast("location:locationChanged", {
                position: position,
                geolocation: geolocation,
                text2: "titi"
            });
            $log.debug("geolocationService setLocation", geolocation);
        };

        var posOptions = {timeout: 5000, enableHighAccuracy: false};
        var current = $cordovaGeolocation.getCurrentPosition(posOptions)

        var watchOptions = {
            frequency: 1000,
            timeout: 3000,
            enableHighAccuracy: false // may cause errors if true
        };

        var watch = null;
        var startWatcher = function () {
            $log.debug("ici --------------> ");

            watch = $cordovaGeolocation.watchPosition(watchOptions);
            watch.then(
                function () {
                    $log.debug("WatchPosition update");
                    setLocation(position);

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
        // je dois l'executer dès le début
        //startWatcher();

        return {
            getLocation: function () {
                var deferred = $q.defer();
                $log.debug("------------> 1 ", current);
                $log.debug("------------> geolocation : ", geolocation);

                if (geolocation.state != "succes") {
                    current.then(function (position) {
                            $log.debug("getCurrentPosition getLocation", position.coords);
                            deferred.resolve(position.coords);
                        }
                        , function (err) {
                            $log.error("Erreur dans getCurrentPosition de getLocation de geolocationService ", err);
                            deferred.reject("Erreur dans getCurrentPosition de getLocation de geolocationService " + err);
                        }
                    );
                } else {
                    $log.debug("----------> else");
                    deferred.resolve(geolocation);
                }

                return deferred.promise;
            },
            /*            getLocation: function () {
             $log.debug("getLocation de geolocationService", geolocation);

             return geolocation;
             },*/
            startGeolocation: function () {
                startWatcher(); // Premier watch de $cordovaGeolocation.getCurrentPosition

                if (watch)
                    $log.debug("Start le watch, id ", watch.watchID);
                else
                    $log.debug("Start le watch id null ", watch);
            },
            clearGeolocation: function () {
                if (watch) {
                    $log.debug("Stop le watch, id : ", watch.watchID);
                    $cordovaGeolocation.clearWatch(watch);
                }
            }/*,
             updateGeolocation: function () {
             if (geolocation)
             $rootScope.$broadcast("location:locationChanged");
             }*/
        }
    })
;