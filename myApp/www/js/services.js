angular.module('starter.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('WorkoutExerciseModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'workouts_exercises/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })

    .service('ExerciseModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'exercises/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })
    
    .service('WorkoutModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'workouts/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })
    
    .service('UserModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'users/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })  
    
    .service('WorkoutListModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'workouts/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    }) 
    
    .service('SportModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'sports/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })   
    
    .service('UserSportModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'users_sports/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })

    .service('SportWorkoutModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'sports_workouts/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })

    .service('ExerciseListModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'exercises/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })  

    .service('formData', function() {
        
        return {
            form: {},
            getForm: function() {
                return this.form;
            },
            updateForm: function(form) {
                this.form = form;
            }
        };
    })

    .service('LoginService', function (Backand) {
        var service = this;
        service.signin = function (email, password, appName) {
            Backand.setAppName(appName);
            return Backand.signin(email, password);
        };

        service.signout = function () {
            return Backand.signOut();
        };
        
        
    })
    
    .service('AccountService', function(Backand){
        var service = this;

        service.signout = function() {
            return Backand.signout();
        };
        

        
    });
    
