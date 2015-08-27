module.controller('tariffsCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    $scope.$sce = $sce;
    $scope.tariffs = [];
    $scope.specification = [];

    $http
        .get('data/tariffs.json')
        .success(function (data, status) {
            if (status === 200) {
                $scope.tariffs = data;
            }
        });

    $http
        .get('data/specification.json')
        .success(function (data, status) {
            if (status === 200) {
                $scope.specification = data;
            }
        });

}]);
