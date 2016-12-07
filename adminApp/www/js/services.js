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
      service.signout = function() {
          return Backand.signout();
      };
  });