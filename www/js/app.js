'use strict';

angular.module('myTodoList', ['ionic'])

    .run(function ($ionicPlatform) {
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
                console.log('PLUGIN NETWORK INSTALLE')

                // Add event listener
                document.addEventListener("offline", onOfflineCallback);
                document.addEventListener("online", onOfflineCallback);

                var onOfflineCallback = function () {
                    console.log('TEST CALLBACK OFF LINE')
                }
            } else {
                console.log('PAS DE PLUGIN NETWORK')
            }

            if (navigator.vibrate) {
                console.log('PLUGIN VIBRATE INSTALLE')
            } else {
                console.log('PAS DE PLUGIN VIBRATE')
            }

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
                        controller: 'todoListController'
                    }
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

