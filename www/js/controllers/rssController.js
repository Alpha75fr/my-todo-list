'use strict';

angular.module('myTodoList').controller('rssController',
    function ($scope, $log, $ionicLoading, rssService, settings) {

        $log.debug(rssService.getRss());


        $scope.rssTitle = '';
        $scope.rssUrl = '';
        $scope.rssSiteUrl = '';
        $scope.entries = '';

        $ionicLoading.show({
            template: 'Loading...'
        });

        rssService.getRss(settings.urlRss, settings.nbRss)
            .success(function (data) {
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;

                $log.debug("rssTitle ", $scope.rssTitle);
                $log.debug("rssUrl ", $scope.rssUrl);
                $log.debug("rssSiteUrl ", $scope.rssSiteUrl);

                window.localStorage["entries"] = JSON.stringify(data.responseData.feed.entries);

                $ionicLoading.hide();
            })
            .error(function (data) {
                console.log("ERROR: " + data);

                console.log("ERROR: " + data);
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }

                $ionicLoading.hide();
            });


        $scope.browse = function(v) {
            window.open(v, "_system", "location=yes");
        }
    });