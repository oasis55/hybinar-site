module.controller('eventUsersCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {

    $scope.blockShow = false;
    $scope.users = [];
    $scope.limit = 8;
    $scope.maxIndex = $scope.limit;
    $scope.itemsLength = 0;

    function get (url) {
        if (!$scope.blockShow) {
            $scope.maxIndex = $scope.limit;
            $http
                .get(url)
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.users = data;
                        $scope.blockShow = true;
                    }
                });
        } else {
            $scope.blockShow = false;
        }
    }

    $scope.showLikes = function (id) {
        get('cabinet/events/' + id + '/likes');
    };

    $scope.showStudents = function (id) {
        get('cabinet/events/' + id + '/users');
    };

    $scope.showSummary = function (id) {
        $location.path('payments/' + id);
    };

    $scope.more = function () {
        $scope.maxIndex += $scope.limit;
    }

}]);
