'use strict';

angular.module('myTodoList')

    .factory('rssService', function ($log, $http) {
			//$log.debug("----> states", );

		var localHeaders = {
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

			return {
				getRss: function(url, number) {

					$log.debug("urlurlurlurlurl ", url);

					//return $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": url, "num": nimber } });
					return $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { headers: {
												'Access-Control-Allow-Origin' : '*'}, params: {  "v": "1.0", "q": url, "num": number  } });
				}
			}
    });