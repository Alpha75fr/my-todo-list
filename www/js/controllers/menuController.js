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
                }
            })
            .state('menu.addtodo', {
                url: "/addtodo",
                views: {
                    'menuContent': {
                        templateUrl: 'views/addtodo-view.html',
                        controller: 'addTodoController'
                    }
                }
            })
            .state('menu.network', {
                url: "/network",
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
                        , resolve: {
                            geoLocation: function ($log, geolocationService) {
/*                                var location = {};
                                geolocationService.getLocation().then(
                                    function (pos) {
                                        $log.debug("succes dans le resolver de position", pos);
                                        location = {latitude: pos.latitude, longitude: pos.longitude, state: 'succes'};
                                        $log.debug("----> position resolve ", location);
                                        return location;
                                    },
                                    function () {
                                        $log.error("error dans le resolver de position")
                                        location = {latitude: '', longitude: '', state: 'fail'};
                                        $log.debug("----> position resolve ", location);
                                        return location;
                                    }
                                )*/
                                return geolocationService.getLocation();
                            }
                        }
                    }
                },
                onEnter: function ($log) {
                    $log.debug("----> Enter position");
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
/*                        , resolve: {
                            geoLocation: function ($log, geolocationService) {
                                var location = {};
/!*                                geolocationService.getLocation().then(
                                    function (pos) {
                                        $log.debug("succes dans le resolver de map", pos);
                                        location = {latitude: pos.latitude, longitude: pos.longitude, state: 'succes'};
                                        $log.debug("----> map resolve ", location);
                                        return location;
                                    }
                                    ,
                                    function () {
                                        $log.error("error dans le resolver de map")
                                        location = {latitude: '', longitude: '', state: 'fail'};
                                        $log.debug("----> map resolve ", location);
                                        return location;
                                    }
                                )*!/
                                return geolocationService.getLocation();
                            }
                        }*/
                    }
                },
                onEnter: function ($log) {
                    $log.debug("----> Enter map");
                },
                onExit: function ($log, geolocationService) {
                    $log.debug("----> Exit map");
                    geolocationService.clearGeolocation();
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
            })
            .state('menu.slidebox', {
                url: "/slidebox",
                views: {
                    'menuContent': {
                        templateUrl: 'views/slidebox-view.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/menu/todolist');
    })
    .controller('menuController',
    function () {
    }
);