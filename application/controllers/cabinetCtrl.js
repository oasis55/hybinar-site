module.controller('cabinetCtrl', ['$scope', '$route', function ($scope, $route) {
    $scope.$route = $route;

    $scope.$watch('$route.current.$$route.originalPath', function () {
        if ($scope.$route.current) {
            $scope.page = $scope.$route.current.$$route.originalPath.split('/')[1];
        }
    })
}]);