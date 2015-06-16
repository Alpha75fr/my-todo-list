'use strict';

angular.module('myTodoList').controller('vibrateController',
    function ($log, $scope, vibrateService) {
        $log.debug("vibrateController init");

        $scope.vibrate = function (delay) {
            $log.debug("fonction vibrate");
            return vibrateService.vibrate(delay);
        };
    });