angular.module('starter.services', [])

    .service('SurveyService', function($http, Backand){
       var service = this,
        baseUrl = '/1/objects/',
        objectName = 'completed/';
        
        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;   
        }
        
         function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl(), { 
                params: {
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
        };
        
        service.userSurveys = function(id){
            return $http.get(getUrl(),{
                params: {
                    pageSize: '1000',
                    exclude: 'metadata',
                    filter: [{"fieldName": "user", "operator": "in", "value": id}],
                }
            });
        };
        
        service.sportSurveys = function(id){
            return $http.get(getUrl(),{
                params: {
                    pageSize:'1000',
                    exclude:'metadata',
                    filter:[{"fieldName":"sport", "operator": "in", "value": id}],
                }
            });
        };
        
        service.exerciseSurveys = function(id){
            return $http.get(getUrl(),{
                params: {
                    pageSize: '1000',
                    exclude: 'metadata',
                    filter:[{"fieldName":"exercise", "operator": "in", "value": id}]
                }
            });
        };
    })
    
    .service('ExerciseSurveyModel', function($http, Backand){
       var service = this,
        baseUrl = '/1/objects/',
        objectName = 'exercise_survey/';
        
        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;   
        }
        
         function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl(), { 
                params: {
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
        };
        
        service.exerciseSurveys = function(id){
            return $http.get(getUrl(),{
                params: {
                    pageSize: '1000',
                    exclude: 'metadata',
                    deep: true,
                    relatedObjects: true,
                    filter: [{"fieldName": "exercise", "operator": "in", "value": id}],
                }
            });
        };
    })

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
            return $http.get(getUrl(), { 
                params: {
                    pageSize: '1000'
                }
                
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.getEx = function (id) {
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + baseUrl + objectName,
              params: {
                  pageSize: '1000',
                  pageNumber: '1',
                  deep: true,
                  relatedObjects: true,
                  filter: [{"fieldName": "workout", "operator": "in", "value": id}],
                  exclude: "metadata, totalrows"
              }
            });
        };
        
        service.delete = function (id) {
            console.log("url", getUrl());
            return $http({
                method: 'DELETE',
                url : Backand.getApiUrl() + '/1/objects/' + "workouts_exercises" + '/' + id
            });
        };
        
        service.update = function(objecto){
            console.log("serviceo", JSON.stringify(objecto));
             return $http({
          method: 'PUT',
          url : "https://api.backand.com/1/objects/workouts/" + objecto.id,
          data: {
            	"name": objecto.name,
                },
            });
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
            return $http.get(getUrl(), { 
                params: {
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.update = function(objecto){
             return $http({
          method: 'PUT',
          url : getUrl() + objecto.id,
          data: {
                "id": objecto.id,
            	"name": objecto.name,
            	"sets": objecto.sets,
            	"reps": objecto.reps,
            	"url": objecto.url
          },
      });
        };
        
        service.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : getUrl() + id
            });
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
            return $http.get(getUrl(),  { 
                params: {
                    pageSize: '1000'
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : getUrl() + id
            });
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
            return $http.get(getUrl(),{
                params:{
                    pageSize: "1000",
                    exclude: "metadata, totalrows"
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.getUsers = function (id) {
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + baseUrl + 'users_sports/',
              params: {
                  pageSize: '200',
                  pageNumber: '1',
                  filter: [{"fieldName": "sport", "operator": "in", "value": id}],
                  deep: true,
                  relatedObjects: true,
                  exclude: "metadata, totalrows"
              }
            });
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
            return $http.get(getUrl(),{
                params:{
                    pageSize: "1000",
                    exclude: "metadata, totalrows"
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.getWorkouts = function (id) {
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + baseUrl + 'sports_workouts/',
              params: {
                  pageSize: '1000',
                  pageNumber: '1',
                  filter: [{"fieldName": "sport", "operator": "in", "value": id}],
                  deep: true,
                  relatedObjects: true,
                  exclude: "metadata, totalrows"
              }
            });
        };
        
         service.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : getUrl() + id
            });
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
            return $http.get(getUrl(), { 
                params: {
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
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
            return $http.get(getUrl(),  { 
                params: {
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.delete = function (id) {
            console.log("url", getUrl());
          return $http({
          method: 'DELETE',
          url : Backand.getApiUrl() + '/1/objects/' + "users_sports" + '/' + id
      })
        };
        
         service.update = function(objecto){
            console.log("serviceo", JSON.stringify(objecto));
             return $http({
          method: 'PUT',
          url : "https://api.backand.com/1/objects/sports/" + objecto.id,
          data: {
            	"name": objecto.name,
                },
            });
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
            return $http.get(getUrl(),  { 
                params: {
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
        
        service.delete = function (id) {
            console.log("url", getUrl());
            return $http({
                method: 'DELETE',
                url : Backand.getApiUrl() + '/1/objects/' + "sports_workouts" + '/' + id
            });
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
            return $http.get(getUrl(),{
                params:{
                    pageSize: '1000',
                    exclude: "metadata, totalrows"
                }
            });
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

    .service('LoginService', function ($http, Backand) {
        var service = this;
        service.signin = function (email, password, appName) {
            Backand.setAppName(appName);
            console.log("login service");
            return Backand.signin(email, password);
        };

        service.signout = function () {
            return Backand.signOut();
        };
        
        service.resetPassword = function (resetToken, newPassword) {
          return $http({
              method: 'POST',
              url : Backand.getApiUrl() + '/1/user/resetPassword',
              data: 
                {
                  "resetToken": resetToken,
                  "newPassword": newPassword
                }
          });
      };
            service.requestResetPassword = function (userName) {
             return $http({
                  method: 'POST',
                  url : Backand.getApiUrl() + '/1/user/requestResetPassword',
                  data: 
                    {
                      "appName": 'varsityfit',
                      "username": userName
                    }
             });
            };
         service.changePassword = function (oldPassword, newPassword) {
          return $http({
              method: 'POST',
              url : Backand.getApiUrl() + '/1/user/changePassword',
              data: 
                {
                  "oldPassword": oldPassword,
                  "newPassword": newPassword
                }
          })
      };
    })
    
    .service('AccountService', function(Backand){
        var service = this;

        service.signout = function() {
            return Backand.signout();
        };
        

        
    });
