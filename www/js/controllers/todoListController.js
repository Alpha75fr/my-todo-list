'use strict';

angular.module('myTodoList').controller('todoListController',
    function ($log, $scope, $rootScope, todoListService) {

        // Charge la liste des todos
        $scope.todoList = todoListService.getTodos();
        $log.debug("----> todoListController : ", $scope.todoList);

        // Ecoute une maj de la table
        $rootScope.$on('todo:listChanged', function () {
            $scope.todoList = todoListService.getTodos();
        });

        // Efface un todo de la liste
        $scope.removeTodo = function (todoId) {
            $log.debug("Supprime moi stp " + todoId);
            todoListService.removeTodo(todoId)
        }
    });
