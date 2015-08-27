module.controller('likeCtrl', ['$scope', 'hybinar', function ($scope, hybinar) {
    $scope.like = function (id) {
        hybinar.like(id, $scope);
    };
}]);
