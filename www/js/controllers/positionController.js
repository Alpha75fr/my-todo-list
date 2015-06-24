'use strict';

angular.module('myTodoList').controller('positionController',
    function ($scope, $log) {

        $scope.lattitude = null;
        $scope.longitude = null;

        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        var onSuccess = function (position) {
            $scope.lattitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;


            $log.debug('Latitude: ', position.coords.latitude, '\n',
                'Longitude: ', $scope.lattitude, '\n',
                'Altitude: ', $scope.longitude, '\n',
                'Accuracy: ', position.coords.accuracy, '\n',
                'Altitude Accuracy: ', position.coords.altitudeAccuracy, '\n',
                'Heading: ', position.coords.heading, '\n',
                'Speed: ', position.coords.speed, '\n',
                'Timestamp: ', position.timestamp, '\n');
        };

        // onError Callback receives a PositionError object

        function onError(error) {
            $log.debug('code: ', error.code, '\n',
                'message: ', error.message, '\n');
        }

         navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });