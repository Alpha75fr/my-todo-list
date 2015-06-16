'use strict';

angular.module('myTodoList').controller('menuController',
    function ($log, $scope, $ionicSideMenuDelegate, $state) {

        // Ferme le menu de gauche
        $scope.toggleMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        // change de page et ferme le menu de gauche
        $scope.pageView = function(state) {

            $log.debug(state);
            //$location.path(path);
            $state.go(state);
            /*			$ionicSideMenuDelegate.toggleLeft();
             this.toggleMenu();*/
        };
    });