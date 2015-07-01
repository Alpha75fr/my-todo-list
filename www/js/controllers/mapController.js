'use strict';

angular.module('myTodoList').controller('mapController',
    function ($scope, $log) {
        $scope.map = { center: { latitude: 48.858278, longitude: 2.2942540000000236 }, zoom: 16 };
    }
);
