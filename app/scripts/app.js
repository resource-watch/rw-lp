(function() {
    'use strict';

    angular.module('app', []);
    angular.module('app').controller('StatusController', ['$http', StatusController]);
    angular.module('app').controller('PerformanceController', ['$http', PerformanceController]);

    function StatusController($http) {
        var vm = this;

        vm.status = null;

        $http({
            method: 'GET',
            url: 'http://production-api.globalforestwatch.org/api/v1/microservice/status'
            }).then(function successCallback(response) {
                vm.status = response.data;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
        });

    }

    function PerformanceController($http) {
        var vm = this;

        vm.statistics = null;

        $http({
            method: 'GET',
            url: 'http://staging-api.globalforestwatch.org/api/v1/stadistic/avgByRequest'
            }).then(function successCallback(response) {
                vm.statistics = response.data;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
        });

    }


})();
