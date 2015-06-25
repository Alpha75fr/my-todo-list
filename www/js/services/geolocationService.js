'use strict';

angular.module('myTodoList')
    .factory('geolocationService', function ($log, $cordovaGeolocation) {
			var geolocation = {latitude: '', longitude: ''}

			var posOptions = {timeout: 10000, enableHighAccuracy: false};
			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function (position) {
					geolocation.latitude = position.coords.latitude;
					geolocation.longitude = position.coords.longitude;
				}, function (err) {
					$log.error("Erreur dans getCurrentPosition de geolocationService ", err);
				});

			var watchOptions = {
				frequency: 1000,
				timeout: 3000,
				enableHighAccuracy: false // may cause errors if true
			};

			var watch = $cordovaGeolocation.watchPosition(watchOptions);
			watch.then(
				null,
				function (err) {
					$log.error("Erreur dans watchPosition de geolocationService ", err);
				},
				function (position) {
					geolocation.latitude = position.coords.latitude;
					geolocation.longitude = position.coords.longitude;
				});

			$cordovaGeolocation.clearWatch(watch);


			var getLatitude = function() {
				return geolocation.latitude;
			};

			var getLongitude = function() {
				return geolocation.longitude;
			};

			return {
				getLocation: function() {
					return geolocation;
				},
				getLatitude: function() {
					return getLatitude();
				},
				getLongitude: function() {
					return getLongitude();
				}
			}
		});