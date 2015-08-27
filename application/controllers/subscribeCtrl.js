module.controller('subscribeCtrl', ['$scope', 'hybinar', function ($scope, hybinar) {
    $scope.subscribe = function (order) {
        hybinar.subscribe(order, $scope);
    };
}]);
