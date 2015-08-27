module.controller('profileCtrl', ['$scope', 'hybinar', '$timeout', '$window', function ($scope, hybinar, $timeout, $window) {
    $scope.hybinar = hybinar;
    $scope.save = function (model, form) {
        $timeout(function () {
            form.$valid && hybinar.saveProfile(model, form);
        }, 1);
    };

    /**
     * Переход после logout из профиля на главную страницу
     * */
    $scope.$watch('hybinar.user', function (value, oldValue) {
        if(!value && oldValue) {
            $window.location = '/';
        }
    });
}]);
