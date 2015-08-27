module.controller('eventsCtrl', ['$scope', '$http', '$location', '$filter', function ($scope, $http, $location, $filter) {

    $scope.totalItems = 0;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.orderBy = 'date';
    $scope.filter = 'all';
    $scope.reverse = true;
    $scope.total = 0;
    $scope.orderByShow = false;
    $scope.filterShow = false;
    $scope.pageLoaderShow = true;

    $http
        .get('cabinet/events')
        .success(function (data, status) {
            if (status === 200) {
                $scope.events = data;
                angular.forEach($scope.events, function (value, key) {
                    value.summary = value.price * value.students.length;
                });
                $scope.totalItems = $scope.events.length;
                $scope.pageLoaderShow = false;
            }
        })
        .error(function () {
        });

    $scope.create = function () {
        $location.path('events/add')
    };

    $scope.sort = function (str) {
        $scope.orderByShow = true;
        $scope.orderBy = str;
        $scope.reverse = !$scope.reverse;
    };

    $scope.edit = function (id) {
        $location.path('events/' + id)
    };

    $scope.getEvents = function () {
        if (!$scope.events) return false;

        $scope.events = $filter('orderBy')($scope.events, $scope.orderBy, $scope.reverse);

        var indexStart = ($scope.currentPage - 1) * $scope.itemsPerPage,
            indexEnd = indexStart + $scope.itemsPerPage,
            render = $scope.events.slice(indexStart, indexEnd);

        if ($scope.filter != 'all') {
            render = render.filter(function (event) {
                if ($scope.filter === 'past') {
                    return event.date < Date.now();
                }
                if ($scope.filter === 'future') {
                    return event.date >= Date.now();
                }
                if ($scope.filter === 'paid') {
                    return event.price > 0;
                }
                if ($scope.filter === 'free') {
                    return event.price === 0;
                }
                return false;
            });
        }

        $scope.total = 0;

        angular.forEach(render, function (value, key) {
            $scope.total += value.summary;
        });

        $scope.totalItems = render.length;

        return render;
    };

}]);
