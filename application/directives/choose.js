module.directive('choose', ['$http', '$compile', function ($http, $compile){
    return {
        restrict: 'E',
        scope: {
            'ngModel': '=?'
        },
        controller: ['$scope', function ($scope) {

            $scope.items = [];
            $scope.itemSelected = null;
            $scope.menuShow = false;

            $scope.select = function (index) {
                angular.forEach($scope.items, function(item, key) {
                    if (index === key) {
                        item.default = true;

                        var value = item.value;
                        (value === 'false' || value === 'undefined' || value === 'null') && (value = false);
                        value === 'true' && (value = true);

                        $scope.ngModel = value;
                        $scope.itemSelected = item;
                    } else {
                        item.default = false;
                    }
                });
            };

            $scope.$watch('ngModel', function (value) {
                angular.forEach($scope.items, function(item) {
                    if (item.value === value.toString()) {
                        item.default = true;
                        $scope.itemSelected = item;
                    } else {
                        item.default = false;
                    }
                });
            });

        }],
        link: function (scope, element) {
            $http
                .get('templates/choose.html')
                .success(function (data, status) {
                    if (status === 200) {

                        angular.forEach(element.find('item'), function (item) {
                            var element = angular.element(item);
                            scope.items.push({
                                name: element.text(),
                                value: element.attr('value'),
                                default: element.attr('default') != undefined ? true : false
                            });

                            if (scope.items[scope.items.length - 1].default) {
                                scope.itemSelected = scope.items[scope.items.length - 1];
                            }
                        });

                        element.replaceWith($compile(data)(scope))
                    }
                });
        }
    };
}]);
