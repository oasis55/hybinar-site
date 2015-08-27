module.controller('gaCtrl', ['$scope', function ($scope) {
    $scope.send = function () {
        if (ga) {
            ga(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }
}]);
