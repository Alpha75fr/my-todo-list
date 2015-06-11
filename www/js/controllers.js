angular.module('todoList.controllers', [])

	// Controlleur global
	.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $state) {

		// Ferme le menu de gauche
		$scope.toggleMenu = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};

		// change de page et ferme le menu de gauche
		$scope.pageView = function(state) {

			console.log(state);
			//$location.path(path);
			$state.go(state);
/*			$ionicSideMenuDelegate.toggleLeft();
			this.toggleMenu();*/
		};
	})
	// Controlleur de la vue todoList
	.controller('TodoCtrl', function($scope, TodoList) {
		// Charge la liste des todos
		$scope.todoList = TodoList.all();

		$scope.element = {produit: "", quantity: ""};

		$scope.addTodo = function (element, titi) {
			//TodoList.addElement(element);
		}


	})
	.controller('AddTodoCtrl', function($scope) {

		$scope.addElement = function () {
			console.log($scope.element);
			TodoList.addElement($scope.element.quantity, $scope.element.produit);
		}

	});