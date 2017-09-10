var myApp = angular.module('todoapp', []);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};

    $http.get('/task')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.create = function () {
        console.log($scope.formData);
        $http.post('/task/create', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };

    $scope.delete = function (id) {
        $http.delete('/task/destroy/' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };

    $scope.update = function (id) {
        $http.delete('/task/update' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };

}]);

var dateTimePicker = myApp.directive('myCustomer', function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModelCtrl) {
            console.log(element);
            var parent = $(element).parent();
            var dtp = parent.datetimepicker({
                format: "YYYY-MM-DD",
                showTodayButton: true
            });
            dtp.on("dp.change", function (e) {
                ngModelCtrl.$setViewValue(moment(e.date).format("LL"));
                scope.$apply();
            });
        }
    };
});