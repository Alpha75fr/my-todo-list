'use strict';

angular.module('myTodoList')

    .factory('vibrateService', function ($log) {

        return {
            vibrate: function (delay) {
                // Lance une vibration
				navigator.vibrate(delay);
            }
        };
    });