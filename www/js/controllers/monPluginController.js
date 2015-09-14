'use strict';

angular.module('myTodoList').controller('monPluginController',
    function($log, $scope, $window, $ionicPlatform){
        $log.debug("showAlert - init");

        $scope.showAlert = function() {
            $log.debug("showAlert - call")
            $ionicPlatform.ready(function () {
                $window.cordova.plugins.Alert.alert('Hello Ionic !');
            });
        }
    });