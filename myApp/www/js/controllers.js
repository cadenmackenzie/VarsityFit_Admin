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



.controller('EditorCtrl', function($rootScope, $scope, $state, PreSurveysModel, Backand) {})



.controller('AnalysisCtrl', function($rootScope, $scope, Backand, $state, PostSurveysModel) {})




.controller('WorkoutCtrl', function($scope) {

})


.controller('ReferencesCtrl', function($scope) {
  //$state.go('referenceslinks');

})


.controller('ReferencesLinksCtrl', function($scope) {
  
})

.controller('AccountCtrl', function($scope, Backand, $state) {

  var vm = this;
  
  function userDetails() {
    var user = Backand.getUserDetails();
    console.log(user);
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      vm.firstName = user.$$state.value.firstName;
      vm.lastName = user.$$state.value.lastName;
      vm.username = user.$$state.value.username;
      vm.fullName = user.$$state.value.fullName;
    }
    else {
      $scope.currentUser = null;
    }    
  }
  
  userDetails();
  
  
  function changePassword() {
    
  };
  

  
  $scope.signout = function () {
    return Backand.signout()
      .then(function (response) {
        $scope.getUserDetails();
        $state.go('login');
        return response;

    });
  };

});



