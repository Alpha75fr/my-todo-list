'use strict';

angular.module('myTodoList').controller('vibrateController',
    function ($log, $scope, vibrateService) {

        $scope.vibrate = function (delay) {
            return vibrateService.vibrate(delay);
        };
    });