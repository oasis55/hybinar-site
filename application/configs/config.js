module.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/events', {
            templateUrl: 'templates/events.html',
            controller: 'eventsCtrl'
        })
        .when('/events/:id', {
            templateUrl: 'templates/event.html',
            controller: 'eventCtrl'
        })
        .when('/events/:id/:action', {
            templateUrl: 'templates/event.html',
            controller: 'eventCtrl'
        })
        .when('/lists', {
            templateUrl: 'templates/lists.html',
            controller: 'listsCtrl'
        })
        .when('/lists/:id', {
            templateUrl: 'templates/list.html',
            controller: 'listCtrl'
        })
        .when('/lists/:id/:action', {
            templateUrl: 'templates/list.html',
            controller: 'listCtrl'
        })
        .when('/tariffs', {
            templateUrl: 'templates/tariffs.html',
            controller: 'tariffsCtrl'
        })
        .when('/payments', {
            templateUrl: 'templates/payments.html',
            controller: 'paymentsCtrl'
        })
        .when('/payments/:id', {
            templateUrl: 'templates/payments.html',
            controller: 'paymentsCtrl'
        });

}]);