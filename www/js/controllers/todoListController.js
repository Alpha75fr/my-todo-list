'use strict';

angular.module('myTodoList').controller('todoListController',
    function ($log, $scope, $rootScope, todoListService, todos) {

        // Charge la liste des todos
        //$scope.todoList = todoListService.getTodos();
        $log.debug("----> todoListController : ", todos);
        $scope.todoList = todos;

        // Ecoute une maj de la table
        // le scope ne se met pas automatiquement a jour comme pour la géolocalisation !!!
        $rootScope.$on('todo:listChanged', function () {
            $scope.todoList = todoListService.getTodos();
        });

        // Efface un todo de la liste
        $scope.removeTodo = function (todoId) {
            $log.debug("Supprime moi stp " + todoId);
            todoListService.removeTodo(todoId);

            // il faut mettre a jour le scope
            $scope.todoList = todoListService.getTodos();
        }
    });
