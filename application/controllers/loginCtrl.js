module.controller('loginCtrl', ['$scope', 'hybinar', '$window', '$timeout', '$location', function ($scope, hybinar, $window, $timeout, $location) {
    $scope.hybinar = hybinar;
    $scope.login = function (model, form) {
        $timeout(function () {
            form.$valid && hybinar.login(model, form);
        }, 1);
    };
    $scope.register = function (model, form) {
        $timeout(function () {
            form.$valid && hybinar.post('/auth/register', model, form, function(data) {
                if (data.returnTo) {
                    $window.location = data.returnTo;
                } else {
                    hybinar.user = data;
                }
            });
        }, 1);
    };
    $scope.recover = function (model, form) {
        $timeout(function () {
            form.$valid && hybinar.post('/auth/recover', model, form);
        }, 1);
    };
    $scope.loginFB = function () {
        hybinar.popup('/auth/fb', 'login with facebook');
    };
    $scope.loginVK = function () {
        hybinar.popup('/auth/vk', 'login with vkontakte');
    };
    hybinar.$on('login', function () {
        $scope.show = !$scope.show;
    });
    $scope.$watch('hybinar.user', function (value) {
        value && ($scope.show = false);
    });
    $scope.$watch('show', function (value) {
        $scope.$parent.show = value;
    });

    if ($location.$$path === '/login/') {
        $scope.show = true;
    }
    if ($location.$$path === '/registration/') {
        $scope.show = true;
        $scope.registration = true;
    }
}]);
