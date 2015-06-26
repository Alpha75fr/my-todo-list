'use strict';

angular.module('myTodoList').controller('todoController',
    function($log, $scope, todo) {

        // Charge le todo spécifique grace au resolver
        $scope.todo = todo;
    });
