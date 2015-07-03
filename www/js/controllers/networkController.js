'use strict';

angular.module('myTodoList').controller('networkController',
    function ($log, $rootScope, $scope, $cordovaNetwork) {


        $scope.networkState = 'Les informations concernant l\'état du réseau sont indisponibles.';;

        document.addEventListener("deviceready", function () {

            // Initialise l'etat du reseau
            if ($cordovaNetwork) {
                $scope.networkState = $cordovaNetwork.getNetwork();
            }

            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                $scope.networkState = networkState;
            })

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                $scope.networkState = networkState;
            })

        }, false);
    });