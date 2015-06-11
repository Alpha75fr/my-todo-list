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

            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    alert("Internet Disconnected");
                } else {
                    alert("Internet Connected");
                }
            }
        });

    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('todolist', {
                url: '/todolist',
                templateUrl: 'views/todolist-view.html',
                controller: 'todoListController'
            })
            .state('addtodo', {
                url: '/addtodo',
                templateUrl: 'views/addtodo-view.html'

            })
            .state('reseau', {
                url: '/reseau',
                templateUrl: 'views/reseau-view.html',
                controller: 'networkController'
            });
        $urlRouterProvider.otherwise('/todolist');
    });

