module.controller('listsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.listsModel     = [];
    $scope.pageLoaderShow = true;

    $http
        .get('cabinet/lists')
        .success(function (data, status) {
            if (status === 200) {
                $scope.listsModel = data;
                $scope.pageLoaderShow = false;
                console.log($scope.listsModel);
            }
        });

    $scope.create = function () {
        $location.path('lists/add');
    };

    $scope.import = function () {};

    $scope.getLetters = function () {
        var letters = [];

        angular.forEach($scope.listsModel, function (value) {
            var letter = value.name.slice(0, 1).toUpperCase();

            if( !letters.some(function (element) {
                    return element === letter
                }) ) {
                letters.push(letter);
            }
        });

        return letters;
    };

    $scope.getLists = function (letter) {
        var lists = [];

        angular.forEach($scope.listsModel, function (value) {
            if (value.name.slice(0, 1).toUpperCase() === letter) {
                lists.push(value);
            }
        });

        lists.sort(function (a, b) {
            return a.name > b.name;
        });

        return lists;
    };

}]);
