module.controller('mainCtrl', ['$scope', '$window', 'hybinar', function ($scope, $window, hybinar) {
    $scope.hybinar  = hybinar;
    $window.hybinar = hybinar;
}]);
