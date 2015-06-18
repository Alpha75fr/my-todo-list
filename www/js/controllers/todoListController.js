'use strict';

angular.module('myTodoList').controller('todoListController',
	function($log, $scope, todoListService) {

		$log.debug('todoListController');

		// Charge la liste des todos
		$scope.todoList = todoListService.getTodos();
		
		$scope.element = {produit: "", quantity: ""};

		$scope.addTodo = function (element, titi) {
			//TodoList.addElement(element);
		}
	});
