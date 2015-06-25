'use strict';

angular.module('myTodoList', ['ionic', 'ionic-utils'])

    .run(function ($log, $ionicPlatform, todoListService) {
        $ionicPlatform.ready(function () {
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

            // Initialise la base de donnée (true pour charger des données par défaut)
            todoListService.init(true);
            $log.debug('init data : ', todoListService.getTodos());

            /*            // Add event listener
             document.addEventListener("offline", networkService.onOfflineCallback, false);
             document.addEventListener("online", networkService.onOfflineCallback, false);*/
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
//				templateUrl: 'views/todolist-view.html',
//				controller: 'todoListController'
                views: {
                    'menuContent': {
                        templateUrl: 'views/todolist-view.html',
                        controller: 'todoListController',
                        onEnter: function($log) {
                            $log.debug("----> Entre le state todolist", todoListService.getTodos())
                        }
                    }
                },
                onEnter: function($log, todoListService) {
                    $log.debug("----> Entre le state todolist bis ",  todoListService.getTodos());
                }
            })
            .state('menu.todo', {
                url: '/todo/:todoId',
//              templateUrl: 'views/todo-view.html',
//  			controller: 'todoController'
                views: {
                    'menuContent': {
                        templateUrl: 'views/todo-view.html',
                        controller: 'todoController'
                    }
                },
                resolve: {
                    todo: function ($stateParams, todoListService) {
                        return todoListService.getTodo($stateParams.todoId)
                    }
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
            });

        $urlRouterProvider.otherwise('/menu/todolist');
    });

