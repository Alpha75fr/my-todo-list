'use strict';

angular.module('myTodoList', ['ionic', 'ionic-utils', 'ngCordova', 'uiGmapgoogle-maps'])
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


