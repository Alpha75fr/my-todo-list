'use strict';

angular.module('myTodoList').controller('todoListController',
    function ($log, $scope, $rootScope, todoListService, todos, $ionicActionSheet, $timeout) {

        // Charge la liste des todos
        $scope.todoList = todos;

        // Ecoute une maj de la table
        // le scope ne se met pas automatiquement a jour comme pour la géolocalisation !!!
/*        $rootScope.$on('todo:listChanged', function () {
            $scope.todoList = todoListService.getTodos();
        })*/

        // Efface un todo de la liste
        $scope.removeTodo = function (todoId) {
            $log.debug("Supprime moi stp " + todoId);
            todoListService.removeTodo(todoId);
        }
    }
)
