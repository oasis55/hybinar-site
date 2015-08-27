module.controller('userCtrl', ['$scope', 'hybinar', function ($scope, hybinar) {
    $scope.hybinar = hybinar;
    $scope.user = hybinar.user;
    $scope.login = function () {
        hybinar.$emit('login');
    };
    $scope.logout = function () {
        hybinar.logout();
    };
    hybinar.$on('userChange', function () {
        $scope.user = hybinar.user;
        if (!$scope.$$phase) $scope.$apply();
    });
}]);
