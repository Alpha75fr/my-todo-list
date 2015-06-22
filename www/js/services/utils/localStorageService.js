'use strict';

angular.module('ionic-utils', ['ionic'])
    .factory('$localstorage', ['$window', '$log', function($window, $log) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || 'false');
            },
            isEmpty: function(key) {
                return !this.getObject(key);
            }
        }
    }]);
