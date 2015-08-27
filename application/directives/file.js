module.directive('file', [function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, element) {
            element.bind('change', function (event) {
                scope.$apply(function () {
                    scope.file = event.target.files[0];
                });
            });
        }
    }
}]);