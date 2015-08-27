module.controller('eventCtrl', ['$scope', '$location', '$route', '$http','$timeout', 'types',
function ($scope, $location, $route, $http, $timeout, types) {

    $scope.id             = $route.current.params.id;
    $scope.action         = $route.current.params.action;
    $scope.eventModel     = {
        hourStart:        null,
        minuteStart:      null,
        hourDuration:     null,
        minuteDuration:   null,
        access:           'All',
        accessType:       'Link',
        list:             null,
        priceView:        0,
        pricePart:        0,
        hashTag:          null
    };
    $scope.listsModel     = null;
    $scope.tempModel      = {};
    $scope.eventForm      = null;
    $scope.files          = {
        fileImage:        [],
        files:            []
    };
    $scope.minDate        = Date.now();
    $scope.add            = false;
    $scope.past           = false;
    $scope.changed        = false;
    $scope.imageFileShow  = false;
    $scope.fileShow       = false;
    $scope.pickerShow     = false;
    $scope.loaderShow     = false;
    $scope.pageLoaderShow = true;
    $scope.types          = types;

    function watch () {
        $scope.$watch('eventModel', function (value, oldValue) {
            if (value != oldValue) {
                console.log($scope.eventModel);
                $scope.changed = true;
            }
        }, true);

        $scope.$watch('files.fileImage.length', function (value, oldValue) {
            if (value != oldValue) {
                $scope.changed = true;
            }
        });

        $scope.$watch('files.files.length', function (value, oldValue) {
            console.log($scope.files.files)
            if($scope.files.files.some(function (file, index) {
                return index != (value - 1) &&
                       file.name === $scope.files.files[value - 1].name &&
                       file.lastModified === $scope.files.files[value - 1].lastModified;
            })) {
                $scope.files.files.splice(value - 1, 1);
            }
        });

        $scope.$watch('eventModel.hourStart', function (value, oldValue) {
            if (value != oldValue) {
                if (!$scope.eventModel.minuteStart && value > 0) {
                    $scope.eventModel.minuteStart = 0;
                }
            }
        });

        $scope.$watch('eventModel.hourDuration', function (value, oldValue) {
            if (value != oldValue) {
                if (!$scope.eventModel.minuteDuration && value > 0) {
                    $scope.eventModel.minuteDuration = 0;
                }
            }
        });

        $scope.$watch('eventModel.date', function (value, oldValue) {
            if (value != oldValue) {
                $scope.pickerShow = false;
                $scope.pickerClosing = true;
            }
        });
    }

    if ($scope.id != 'add') {
        $scope.add = false;
        $http
            .get('cabinet/events/' + $scope.id)
            .success(function (data, status) {
                if (status === 200) {
                    $scope.eventModel = data;
                    $scope.past = $scope.eventModel.status === 2;
                    //$scope.past = false;

                    if ($scope.action === 'copy') {
                        $scope.eventModel.name = null;
                        $scope.eventModel.date = null;
                        $scope.eventModel.duration = null;
                        $scope.past = false;
                        $scope.add = true;
                    }

                    if ($scope.eventModel.date && $scope.eventModel.duration) {
                        $scope.eventModel.date = new Date($scope.eventModel.date);

                        $scope.eventModel.hourStart = $scope.eventModel.date.getHours();
                        $scope.eventModel.minuteStart = $scope.eventModel.date.getMinutes();
                        $scope.eventModel.hourDuration = Math.floor($scope.eventModel.duration/1000/60/60);
                        $scope.eventModel.minuteDuration = Math.floor($scope.eventModel.duration/1000/60 - $scope.eventModel.hourDuration*60);
                    }

                    if (!$scope.past) {
                        watch();
                    }

                    $scope.pageLoaderShow = false;

                    // testing
                    $scope.eventModel.image = 'images/card-pin__img3.png';
                    $scope.eventModel.materials = [{name: 'Презентация.pptx'}, {name: 'Документ.doc'}]

                    console.log($scope.eventModel);
                }
            })
            .error(function () {})
    } else {
        $scope.add = true;
        $scope.past = false;
        $scope.pageLoaderShow = false;
        watch();
    }

    $scope.close = function () {
        $location.path('events');
    };

    $scope.save = function () {
        if ($scope.changed) {
            $scope.eventForm.$setSubmitted(true);
            $timeout(function () {
                if ($scope.eventForm.$valid) {

                    $scope.loaderShow = true;
                    $scope.changed = false;

                    var eventModel = {
                        name: $scope.eventModel.name,
                        description: $scope.eventModel.description
                    };

                    function uploadFiles (id) {
                        //if ($scope.files.files.length > 0) {
                        //
                        //    $http
                        //        .post('cabinet/files/' + id, $scope.files.files[0])
                        //        .success(function (data, status) {
                        //            cosole.log(data)
                        //        })
                        //
                        //} else {
                            $scope.loaderShow = false;
                        //}
                    }

                    if ($scope.add) {
                        $http
                            .post('cabinet/events/', eventModel)
                            .success(function (data, status) {
                                if (status === 200) {
                                    //$location.path('events');
                                    uploadFiles(data.id);
                                }
                            })
                            .error(function () {});
                    } else {
                        $http
                            .put('cabinet/events/' + $scope.id, eventModel)
                            .success(function (data, status) {
                                if (status === 200) {
                                    uploadFiles(data.id);
                                }
                            })
                            .error(function () {});
                    }

                }
            }, 1);
        }
    };

    $scope.copy = function () {
        $location.path('events/' + $scope.id + '/copy')
    };

    $scope.delete = function () {
        $http
            .delete('cabinet/events/' + $scope.id)
            .success(function (data, status) {
                if (status === 200) {
                    $location.path('events');
                }
            })
            .error(function () {});
    };

    $scope.getLists = function () {
        if ($scope.listsModel) {
            return $scope.listsModel;
        } else {
            $http
                .get('cabinet/lists')
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.listsModel = data;
                    }
                })
                .then(function () {
                    return $scope.listModel;
                });

        }
    };

    $scope.getLists();

    $scope.pickerOpen = function () {
        if (!$scope.pickerShow && !$scope.pickerClosing) {
            $scope.pickerShow = true;
            $scope.pickerOpening = true;
        } else {
            $scope.pickerClosing = false;
        }
    };

    $scope.pickerClose = function () {
        if ($scope.pickerShow && !$scope.pickerOpening) {
            if (!$scope.pickerEnter) {
                $scope.pickerShow = false;
            }
        } else {
            $scope.pickerOpening = false;
        }
    };

    $scope.pickerMouseEnter = function () {
        $scope.pickerEnter = true;
    };

    $scope.pickerMouseLeave = function () {
        $scope.pickerEnter = false;
    };

}]);
