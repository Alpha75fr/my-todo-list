'use strict';

angular.module('myTodoList').controller('todoController',
    function($log, $scope, $stateParams, todoListService, todo) {

        // Charge le todo spécifique
        $scope.todo = todo
    });
