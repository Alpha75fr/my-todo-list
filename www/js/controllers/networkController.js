'use strict';

angular.module('myTodoList').controller('networkController',
    function ($log, $scope, networkService) {
/*
        document.addEventListener("offline", networkService.onOfflineCallback, false);
        document.addEventListener("online", networkService.onOfflineCallback, false);*/

        $scope.networkState = function () {
            return networkService.networkState();
        };
    });