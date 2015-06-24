'use strict';

angular.module('myTodoList')

    .factory('networkService', function ($log) {

		if (navigator.connection) {
			var networkState = null;
			var networkType = navigator.connection.type;

			$log.debug("----> navigator.connection.type ", navigator.connection.type);
			/*$log.debug("----> Connection.UNKNOWN ", Connection.UNKNOWN);*/


			var states = {};
/*			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';*/
/*
			states[navigator.connection.UNKNOWN]  = 'Unknown connection';
			states[navigator.connection.ETHERNET] = 'Ethernet connection';
			states[navigator.connection.WIFI]     = 'WiFi connection';
			states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
			states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
			states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
			states[navigator.connection.CELL]     = 'Cell generic connection';
			states[navigator.connection.NONE]     = 'No network connection';*/


			$log.debug("----> states", states);
		}


        return {
            networkState: function ($log) {

				// L'état du réseau
				if (states) {
					networkState = states[networkType];
				} else {
					networkState = 'Les informations concernant l\'état du réseau sont indisponibles.';
				}

				return networkState;
            }
        };
    });