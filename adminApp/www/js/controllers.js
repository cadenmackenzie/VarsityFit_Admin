angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, Backand) {
  
  var login = this;
    
  function signin() {
    var appName = 'varsityfit'
    LoginService.signin(login.email, login.password, appName)
      .then (function() {
        $rootScope.$broadcast("authorized");
        $state.go("tab.editor");
        
      }, function(error){
        console.log(error)
        
      })
  }

  login.signin = signin;

})

.controller('AnalysisCtrl', function($scope) {})

.controller('EditorCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {});
