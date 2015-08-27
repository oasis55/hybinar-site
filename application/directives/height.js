module.directive('height', [function (){
    return {
        scope: {
            'height': '=?',
            'heightAction': '=?'
        },
        link: function (scope, element) {

            scope.resize = function () {
                scope.height = element.outerHeight(true);
            };

            scope.resize();

            element.on('$destroy', function () {
                element.off('DOMSubtreeModified propertychange', scope.resize);
            });
            element.on('DOMSubtreeModified propertychange', scope.resize);
        }
    };
}]);
