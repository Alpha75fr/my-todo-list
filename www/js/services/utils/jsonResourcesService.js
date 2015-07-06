'use strict';

angular.module('ionic-utils')
    .factory('jsonResourcesService', function ($resource, $log) {
        return {
            getJsonResources: function () {
                $log.debug("getJsonResources entree");
                return $resource('./datas.json');
            }
    }
})
