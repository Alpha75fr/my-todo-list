'use strict';

angular.module('myTodoList').controller('addTodoController',
    function ($log, $scope, todoListService, $state) {

        $scope.element = {
            quantity: null,
            produit: null
        };

        $scope.addElement = function () {
            todoListService.addElement($scope.element.quantity, $scope.element.produit);

            // Emet un evenement vers le haut pour avertir du changement de la table
            $scope.$emit('todo:listChanged');

            $state.go('menu.todolist');
        }
    });