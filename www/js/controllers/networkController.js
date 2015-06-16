'use strict';

angular.module('myTodoList').controller('networkController',
    function ($log, $scope, networkService) {
        $log.debug("networkController init");
/*
        document.addEventListener("offline", networkService.onOfflineCallback, false);
        document.addEventListener("online", networkService.onOfflineCallback, false);*/

        $scope.networkState = function () {
            $log.debug("networkStateCtrl");
            return networkService.networkState();
        };
    });