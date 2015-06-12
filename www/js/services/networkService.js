'use strict';

angular.module('myTodoList')

    .factory('networkService', function ($log) {

        $log.debug("networkState init navigator.connection : ", navigator.connection);

        var networkState = null;
        var networkType = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';



        return {
            networkState: function () {
                $log.debug("networkState function");

                // L'etat du réseau
                networkState = states[networkType];
                return networkState;
//                return "toto";
            }
        };
    });