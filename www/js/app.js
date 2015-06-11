
angular.module('myAppTest', ['ionic', 'todoList.controllers', 'todoList.services'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('todolist', {
                url: '/todolist',
                templateUrl: 'templates/todolist-view.html',
                controller: 'TodoCtrl'
            })
            .state('addtodo', {
                url: '/addtodo',
                templateUrl: 'templates/addtodo-view.html',
                controller: 'TodoCtrl'
            })
            .state('reseau', {
                url: '/reseau',
                templateUrl: 'templates/reseau-view.html'
            });
        $urlRouterProvider.otherwise('/todolist');
    });

