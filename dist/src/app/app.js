'use strict';

var todoapp = angular.module('todoapp', []);

todoapp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};

    $http.get('/task').success(function (data) {
        console.log(data);
        $scope.todos = data;
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

    $scope.edit = function (todo) {
        $scope.formData.name = todo.name;
        $scope.formData.description = todo.description;
        $scope.formData.duedate = moment(todo.duedate).format("YYYY-MM-DD");
        $scope.formData.priority = todo.priority;
    };
}]);

todoapp.directive('myCustomer', function () {
    return {
        template: 'Name: {{formData.name}} Address: {{formData.description}}'
    };
});

var dateTimePicker = function dateTimePicker() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function link(scope, element, attrs, ngModelCtrl) {
            var parent = $(element).parent();
            var dtp = element.datetimepicker({
                format: "YYYY-MM-DD",
                showTodayButton: true
            });

            dtp.on("dp.change", function (e) {
                ngModelCtrl.$setViewValue(moment(e.date).format("YYYY-MM-DD"));
                scope.$apply();
            });
        }
    };
};

todoapp.directive('dateTimePicker', dateTimePicker);
//# sourceMappingURL=app.js.map