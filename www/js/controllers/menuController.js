'use strict';

angular.module('myTodoList')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "views/menu-view.html",
                controller: 'menuController'
            })
            .state('menu.todolist', {
                url: "/todolist",
                views: {
                    'menuContent': {
                        templateUrl: 'views/todolist-view.html',
                        controller: 'todoListController',
                        resolve: {
                            todoListResource: 'todoListService',
                            todos: function (todoListResource) {
                                // Indique s'il faut initialiser ou non les valeurs par défaut si le localStorage est vide
                                todoListResource.initDefaultValue(true);
                                return todoListResource.getTodos();
                            }
                        }
                    }
                },
                onEnter: function ($log) {
                    //$log.debug("----> Entre dans le state todolist bis ");
                }
            })
            .state('menu.todo', {
                url: '/todo/:todoId',
                views: {
                    'menuContent': {
                        templateUrl: 'views/todo-view.html',
                        controller: 'todoController',
                        resolve: {
                            todo: function ($stateParams, todoListService) {
                                return todoListService.getTodo($stateParams.todoId);
                            }
                        }
                    }
                },
                onEnter: function ($log, todoListService) {
                    $log.debug("----> Entre dans le state todo");
                }
            })
            .state('menu.addtodo', {
                url: "/addtodo",
//				templateUrl: 'views/addtodo-view.html',
//				controller: 'addTodoController'
                views: {
                    'menuContent': {
                        templateUrl: 'views/addtodo-view.html',
                        controller: 'addTodoController'
                    }
                }
            })
            .state('menu.network', {
                url: "/network",
//				templateUrl: 'views/reseau-view.html',
//				controller: 'networkController'
                views: {
                    'menuContent': {
                        templateUrl: 'views/reseau-view.html',
                        controller: 'networkController'
                    }
                }
            })
            .state('menu.position', {
                url: "/position",
                views: {
                    'menuContent': {
                        templateUrl: 'views/position-view.html',
                        controller: 'positionController'
                    }
                },
                onExit: function ($log, geolocationService) {
                    $log.debug("----> Exit position");
                    geolocationService.clearGeolocation();
                }
            }).
            state('menu.map', {
                url: "/map",
                views: {
                    'menuContent': {
                        templateUrl: 'views/map-view.html',
                        controller: 'mapController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/menu/todolist');
    })
    .controller('menuController',
        function () {
        }
    );