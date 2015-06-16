'use strict';

angular.module('myTodoList')

    .factory('vibrateService', function ($log) {

        $log.debug("vibrateService init navigator.vibrate : ", navigator.vibrate);

        return {
            vibrate: function (delay) {
                $log.debug("vibrateService vibrate function : ", delay );

                // Lance une vibration
				navigator.vibrate(delay);
            }
        };
    });