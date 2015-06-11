'use strict';

angular.module('myTodoList').controller('addTodoController',
	function($log, $scope) {

		$scope.addElement = function () {
			$log.debug($scope.element);
			TodoList.addElement($scope.element.quantity, $scope.element.produit);
		}
	});