'use strict';

angular.module('myTodoList', ['ionic', 'ionic-utils', 'ngCordova'])

    .run(function ($log, $ionicPlatform, todoListService) {
        $ionicPlatform.ready(function () {

            $log.debug("app.js ready");

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if (navigator.connection) {
                $log.debug('PLUGIN NETWORK INSTALLE')

                // Add event listener
                document.addEventListener("offline", onOfflineCallback);
                document.addEventListener("online", onOfflineCallback);

                var onOfflineCallback = function () {
                    $log.debug('TEST CALLBACK OFF LINE');
                }
            } else {
                $log.debug('PAS DE PLUGIN NETWORK');
            }

            if (navigator.vibrate) {
                $log.debug('PLUGIN VIBRATE INSTALLE');
            } else {
                $log.debug('PAS DE PLUGIN VIBRATE');
            }
        });
    })
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
                onEnter: function($log) {
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
                onEnter: function($log, todoListService) {
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
                }
            })
            .state('menu.rss', {
                url: "/position",
                views: {
                    'menuContent': {
                        templateUrl: 'views/rss-view.html',
                        controller: 'rssController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/menu/todolist');
    })