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
    
