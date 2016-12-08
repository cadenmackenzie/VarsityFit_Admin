angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, Backand) {
    
    var login = this;
    
    function signin() {
      var appName = 'varsityfit'
      LoginService.signin(login.email, login.password, appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          $state.go("tab.workouteditor");
          
        }, function(error){
          console.log(error)
          
        })
    }

    login.signin = signin;


}) 



.controller('WorkoutEditorCtrl', function($rootScope, $scope, WorkoutModel, $state, Backand) {
  var vm = this;
  var userDetail;
  var data2 = [];

  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
    }
    else {
      $scope.currentUser = null;
    }
  };
  



  function getAll(){
    WorkoutModel.all()
      .then(function (result) {
            vm.allData = result.data.data;
        //else {
          
        //}
      });
  }
  
  function getSelected(){
    WorkoutModel.all()
      .then(function (result) {
        for (var object in vm.allData) {
            var current = vm.allData[object];
            if (userDetail == current.user) {
              data2.push(vm.allData[object]);
            }
            
        }
        vm.data = data2;

      });
  }
  
  
  function create(object){
    WorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.analysis");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
    vm.newObject = { name: '', exercises: ''}; 
  }
  function setEdited(object) {
    vm.edited = angular.copy(object);
    vm.isEditing = true;
  }
  
  function isCurrent(id) {
    return vm.edited !== null && vm.edited.id === id;
  }
  
  function cancelEditing() {
    vm.edited = null;
    vm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    vm.isCreating = false;
  }
  
  vm.objects = [];
  vm.edited = null;
  vm.isEditing = false;
  vm.isCreating = false;
  vm.getAll = getAll;
  vm.create = create;
  vm.setEdited = setEdited;
  vm.isCurrent = isCurrent;
  vm.cancelEditing = cancelEditing;
  vm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
    getSelected();
  });
  
  initCreateForm();
  getAll();
  getSelected();
  

})

.controller('ExerciseEditorCtrl', function($rootScope, $scope, ExerciseModel, $state, Backand) {
  var vm = this;
  var userDetail;
  var data2 = [];

  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
    }
    else {
      $scope.currentUser = null;
    }
  };
  



  function getAll(){
    ExerciseModel.all()
      .then(function (result) {
            vm.allData = result.data.data;
        //else {
          
        //}
      });
  }
  
  function getSelected(){
    ExerciseModel.all()
      .then(function (result) {
        for (var object in vm.allData) {
            var current = vm.allData[object];
            if (userDetail == current.user) {
              data2.push(vm.allData[object]);
            }
            
        }
        vm.data = data2;

      });
  }
  
  
  function create(object){
    ExerciseModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.analysis");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
    vm.newObject = { name: '', reps: '', sets: ''}; 
  }
  function setEdited(object) {
    vm.edited = angular.copy(object);
    vm.isEditing = true;
  }
  
  function isCurrent(id) {
    return vm.edited !== null && vm.edited.id === id;
  }
  
  function cancelEditing() {
    vm.edited = null;
    vm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    vm.isCreating = false;
  }
  
  vm.objects = [];
  vm.edited = null;
  vm.isEditing = false;
  vm.isCreating = false;
  vm.getAll = getAll;
  vm.create = create;
  vm.setEdited = setEdited;
  vm.isCurrent = isCurrent;
  vm.cancelEditing = cancelEditing;
  vm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
    getSelected();
  });
  
  initCreateForm();
  getAll();
  getSelected();
  

})



.controller('AnalysisCtrl', function($rootScope, $scope, Backand, $state) {})




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



