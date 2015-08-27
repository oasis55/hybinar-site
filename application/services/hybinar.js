module.service('hybinar', ['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
    var user = null,
        hybinar = Object.create($rootScope, {
            user: {
                get: function () {
                    return user;
                },
                set: function (value) {
                    user = value;
                    hybinar.$emit('userChange');
                }
            },
            isUser: {
                value: function () {
                    if (user) {
                        return true;
                    } else {
                        this.$emit('login');
                        return false;
                    }
                }
            },
            like: {
                value: function (id, $scope) {
                    if (this.isUser())
                        $http
                            .get('/like/' + id)
                            .success(function (data, status) {
                                if (status === 200) {
                                    $scope.likes = data.count;
                                    $scope.active = data.active;
                                }
                            });

                    return this;
                }
            },
            subscribe: {
                value: function (order, $scope) {
                    if (this.isUser()) {
                        if (order.id) {
                            // event subscription

                            if (order.price) {
                                $window.subscribe.orderDetails.value = JSON.stringify({id: order.id});
                                $window.subscribe.sum.value = order.price + '.00';
                                $window.subscribe.submit();
                            } else {
                                $http
                                    .post('/subscribe/' + order.id)
                                    .success(function (data, status) {
                                        console.log('asd', data, status)
                                        if (status === 200) {
                                            $scope.active = true;
                                        }
                                    });
                            }
                        } else if (order.subscription) {
                            // customer subscription

                            $window.subscribe.orderDetails.value = JSON.stringify({subscription: order.subscription});
                            $window.subscribe.sum.value = order.price + '.00';
                            $window.subscribe.submit();
                        }
                    }

                    return this;
                }
            },
            saveProfile: {
                value: function (model, form) {
                    hybinar.crop(model.file, function (blob) {
                        var formData = new FormData();

                        if (blob) {
                            model.file = blob;
                        }

                        for (var key in model) {
                            formData.append(key, model[key]);
                        }

                        $http
                            .post('/auth/user', formData, {
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                            })
                            .success(function (data, status) {
                                location.reload();
                                // status === 200 && (hybinar.user = data);
                            })
                            .error(function (data, status) {
                                console.log('error');
                                status === 401 && (form.passwordErr = true);
                            });

                        return this;
                    });
                }
            },
            post: {
                value: function (url, model, form, cb) {
                    $http
                        .post(url, model)
                        .success(function (data, status) {
                            if (status === 200) {
                                if (!data.err) {
                                    form.success = true;
                                    cb && cb(data);
                                } else {
                                    form.error = true;
                                }
                            }
                        })
                        .error(function () {
                            form.error = true;
                        });
                    return this;
                }
            },
            logout: {
                value: function () {
                    $http
                        .get('/auth/logout')
                        .success(function (data, status) {
                            if (status === 200) {
                                hybinar.user = null;
                            }
                        });

                    return this;
                }
            },
            login: {
                value: function (user, form) {
                    $http
                        .get('/auth/login', {params: user})
                        .success(function (data, status) {
                            if (data.returnTo) {
                                $window.location = data.returnTo;
                            } else {
                                hybinar.user = data;
                            }
                        })
                        .error(function (data, status) {
                            status === 401 && (form.authErr = true);
                        })

                    return this;
                }
            },
            popup: {
                value: function (url, title, width, height) {
                    width = width || 300;
                    height = height || 500;
                    return $window.open(url, title, [
                        'width=' + width,
                        'height=' + height,
                        'left=' + ($window.screen.width / 2 - width / 2),
                        'top=' + ($window.screen.height / 2 - height / 2)
                    ].join(','));
                }
            },
            crop: {
                value: function (file, callback) {
                    if (!file || !URL) {
                        callback(file);
                    }

                    var url = URL.createObjectURL(file),
                        image = new Image(),
                        canvas = document.createElement('canvas'),
                        context = canvas.getContext('2d');

                    if (!context) {
                        callback(file);
                    }

                    image.addEventListener('load', function () {
                        URL.revokeObjectURL(url);

                        var size = Math.min(image.width, image.height),
                            x = image.width > size ? (image.width - size) / 2 : 0,
                            y = image.height > size ? (image.height - size) / 2 : 0;

                        canvas.width = canvas.height = size;

                        context.drawImage(image, x, y, size, size, 0, 0, size, size);

                        var data = atob(canvas.toDataURL().split(',')[1])
                        array = new Uint8Array(data.length);

                        for (var i = 0, len = data.length; i < len; i++) {
                            array[i] = data.charCodeAt(i);
                        }

                        callback(new Blob([array], {type: 'image/png'}));
                    });

                    image.src = url;
                }
            }
        });

    return hybinar;
}]);
