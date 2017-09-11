'use strict';

var myApp = angular.module('todoapp', []);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};

    $http.get('/task').success(function (data) {
        $scope.todos = data;
        console.log(data);
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    $scope.find = function () {
        $http.get('/task').success(function (data) {
            $scope.todos = data;
            console.log(data);
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.create = function () {
        console.log($scope.formData);
        $http.post('/task', $scope.formData).success(function (data) {
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        }).error(function (data) {
            console.log('Error:' + data);
        });
    };

    $scope.delete = function (id) {
        $http.delete('/task/' + id).success(function (data) {
            $scope.todos = data;
            console.log(data);
        }).error(function (data) {
            console.log('Error:' + data);
        });
    };

    $scope.update = function (id) {
        $http.put('/task/' + id).success(function (data) {
            $scope.todos = data;
            console.log(data);
        }).error(function (data) {
            console.log('Error:' + data);
        });
    };
}]);
//# sourceMappingURL=app.js.map