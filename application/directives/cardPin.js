module.directive('cardPin', ['$window', '$timeout', function ($window, $timeout) {
    return function (scope, element) {
        var timeoutID;

        element.masonry({
            columnWidth: 366,
            itemSelector: '.card-pin'
        });

        function _set() {
            element.masonry();
        }

        angular.element($window)
            .on('resize', function () {
                $timeout.cancel(timeoutID);
                timeoutID = $timeout(_set, 1000);
            });
        element
            .find('img')
            .on('load', function () {
                element.masonry();
            });
        setTimeout(_set, 1000);
    };
}]);
