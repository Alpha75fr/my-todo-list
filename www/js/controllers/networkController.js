'use strict';

angular.module('myTodoList').controller('networkController',
    function ($log, $scope, networkService) {
        $log.debug("networkController init");

        $scope.networkState = function () {
            $log.debug("networkStateCtrl");
            //return networkService.networkState();
            return "L'état du réseau n'est pas disponible"
        };
    });