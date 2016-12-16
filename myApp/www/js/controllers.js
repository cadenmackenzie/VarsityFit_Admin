angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, Backand) {
    
    var login = this;
    
    function signin() {
      var appName = 'varsityfit';
      LoginService.signin(login.email, login.password, appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          $state.go("tab.analysis");
          
        }, function(error){
          console.log(error);
          
        });
    }

    login.signin = signin;


}) 

//controller to access users
.controller('UserCtrl', function($rootScope, $scope, UserModel, $state, Backand) {
  var cm = this;

  function getAll(){
    UserModel.all()
      .then(function (result) {
            cm.data = result.data.data;
            
      });
  
  }

  function create(object){
    UserModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.analysis");
      });
  }
  
  function initCreateForm() {
    cm.newObject = { name: '', exercises: ''}; 
  }
  
  function setEdited(object) {
    cm.edited = angular.copy(object);
    cm.isEditing = true;
  }
  
  function isCurrent(id) {
    return cm.edited !== null && cm.edited.id === id;
  }
  
  function cancelEditing() {
    cm.edited = null;
    cm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    cm.isCreating = false;
  }
  
  cm.objects = [];
  cm.edited = null;
  cm.isEditing = false;
  cm.isCreating = false;
  cm.getAll = getAll;
  cm.create = create;
  cm.setEdited = setEdited;
  cm.isCurrent = isCurrent;
  cm.cancelEditing = cancelEditing;
  cm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();


})

//controller to access sports
.controller('SportCtrl', function($rootScope, $scope, SportModel, $state, Backand, formData) {
  var sm = this;
  
  $scope.sport = {};
  
  
  $scope.submitForm = function(sport) {
    formData.updateForm(sport);
    console.log(sport);
    // console.log("Retrieving form from service", formData.getForm());
    $state.go('tab.sporteditor');
    
  };
  
  function getAll(){
    SportModel.all()
      .then(function (result) {
            sm.data = result.data.data;
        //else {
          
        //}
      });
  }
  
  function create(object){
    SportModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.analysis");
      });
  }
  
  function initCreateForm() {
    sm.newObject = {userId: '', sportId: ''}; 
  }
  
  function setEdited(object) {
    sm.edited = angular.copy(object);
    sm.isEditing = true;
  }
  
  function isCurrent(id) {
    console.log(sm);
    return sm.edited !== null && sm.edited.id === id;
  }
  
  function cancelEditing() {
    sm.edited = null;
    sm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    sm.isCreating = false;
  }
  
  sm.objects = [];
  sm.edited = null;
  sm.isEditing = false;
  sm.isCreating = false;
  sm.getAll = getAll;
  sm.create = create;
  sm.setEdited = setEdited;
  sm.isCurrent = isCurrent;
  sm.cancelEditing = cancelEditing;
  sm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();


})

//controller to populate sports_users
.controller('SportEditorCtrl', function($rootScope, $scope, UserSportModel, $state, Backand, formData) {
  var sm = this;

  $scope.user = {};
  $scope.users = {};
  var userId;

  $scope.sport = formData.getForm();
  var sportId = $scope.sport.id;

  getAll();
  
  $scope.submitForm = function(user) {
    formData.updateForm(user);
    console.log("Retrieving form from service", formData.getForm());
    userId = user.id;
    sm.newObject.user = userId;
    sm.newObject.sport = sportId;
    sm.create(sm.newObject);
    
    
  };
  
  function getAll(){
    UserSportModel.all()
      .then(function (result) {
            sm.data = result.data.data;
            
      });
  }
  
  function create(object){
    UserSportModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
      });
  }
  
  function initCreateForm() {
    sm.newObject = { userId: '', sportId: ''}; 
  }
  
  function setEdited(object) {
    sm.edited = angular.copy(object);
    sm.isEditing = true;
  }
  
  function isCurrent(id) {
    return sm.edited !== null && sm.edited.id === id;
  }
  
  function cancelEditing() {
    sm.edited = null;
    sm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    sm.isCreating = false;
  }
  sm.objects = [];
  sm.edited = null;
  sm.isEditing = false;
  sm.isCreating = false;
  sm.getAll = getAll;
  sm.create = create;
  sm.setEdited = setEdited;
  sm.isCurrent = isCurrent;
  sm.cancelEditing = cancelEditing;
  sm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();
})

//controller to populate sports_workouts
.controller('SportWorkoutCtrl', function($rootScope, $scope, SportWorkoutModel, $state, Backand, formData) {
  var swm = this;

  $scope.workout = {};
  getAll();
  
  $scope.submitForm = function(workout) {
    console.log(formData.updateForm(workout));
    console.log("Retrieving form from service", formData.getForm());
  };  

  function getAll(){
    SportWorkoutModel.all()
      .then(function (result) {
            swm.data = result.data.data;
            
      });
  }

  function create(object){
    SportWorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();

      });
  }
  
  function initCreateForm() {
    swm.newObject = { sportId: '', workoutId: ''}; 
  }
  
  function setEdited(object) {
    swm.edited = angular.copy(object);
    swm.isEditing = true;
  }
  
  function isCurrent(id) {
    return swm.edited !== null && swm.edited.id === id;
  }
  
  function cancelEditing() {
    swm.edited = null;
    swm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    swm.isCreating = false;
  }
  
  swm.objects = [];
  swm.edited = null;
  swm.isEditing = false;
  swm.isCreating = false;
  swm.getAll = getAll;
  swm.create = create;
  swm.setEdited = setEdited;
  swm.isCurrent = isCurrent;
  swm.cancelEditing = cancelEditing;
  swm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();

})

//controller to access workouts
.controller('WorkoutCtrl', function($rootScope, $scope, WorkoutListModel, $state, Backand, formData) {
  var wlc = this;
  var userDetail;
  var workouts;
  

  $scope.workouts = {};
  
  
  $scope.submitForm = function(workouts) {
    formData.updateForm(workouts);
    console.log("Retrieving form from service", formData.getForm());
    $state.go('tab.workoutsexercises');
    
  }

  


  function getAll(){
    WorkoutListModel.all()
      .then(function (result) {
            wlc.data = result.data.data;
            console.log(wlc.data);
        //else {
          
        //}
      });
  }

 

  function create(object){
    WorkoutListModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();

        // $state.go("tab.analysis");
      });
  }
  function initCreateForm() {
    wlc.newObject = {name: ''}; 
  }
  function setEdited(object) {
    wlc.edited = angular.copy(object);
    wlc.isEditing = true;
  }
  
  function isCurrent(id) {
    console.log(wlc);
    return wlc.edited !== null && wlc.edited.id === id;
  }
  
  function cancelEditing() {
    wlc.edited = null;
    wlc.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    wlc.isCreating = false;
  }
  
  wlc.objects = [];
  wlc.edited = null;
  wlc.isEditing = false;
  wlc.isCreating = false;
  wlc.getAll = getAll;
  wlc.create = create;
  wlc.setEdited = setEdited;
  wlc.isCurrent = isCurrent;
  wlc.cancelEditing = cancelEditing;
  wlc.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();



})

//contoller to populate workouts_exercises
.controller('WorkoutExerciseCtrl', function($rootScope, $scope, WorkoutExerciseModel, $state, Backand, formData) {
  var wte = this;

  $scope.exercise = {};
  //$scope.users = {};
  var exerciseId;

  $scope.workouts = formData.getForm();
  var workoutId = $scope.workouts.id;
  console.log(workoutId)

  //getAll();
  
  $scope.submitForm = function(exercise) {
    formData.updateForm(exercise);
    console.log("Retrieving form from service", formData.getForm());
    exerciseId = exercise.id;
    wte.newObject.exercise = exerciseId;
    wte.newObject.workout = workoutId;
    wte.create(wte.newObject);
    
    
  };
  
  function getAll(){
    WorkoutExerciseModel.all()
      .then(function (result) {
            wte.data = result.data.data;
            
      });
  }
  
  function create(object){
    WorkoutExerciseModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
      });
  }
  
  function initCreateForm() {
    wte.newObject = { exerciseId: '', workoutId: ''}; 
  }
  
  function setEdited(object) {
    wte.edited = angular.copy(object);
    wte.isEditing = true;
  }
  
  function isCurrent(id) {
    return wte.edited !== null && wte.edited.id === id;
  }
  
  function cancelEditing() {
    wte.edited = null;
    wte.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    wte.isCreating = false;
  }
  wte.objects = [];
  wte.edited = null;
  wte.isEditing = false;
  wte.isCreating = false;
  wte.getAll = getAll;
  wte.create = create;
  wte.setEdited = setEdited;
  wte.isCurrent = isCurrent;
  wte.cancelEditing = cancelEditing;
  wte.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();
})

//contoller create workouts
.controller('WorkoutEditorCtrl', function($rootScope, $scope, WorkoutModel, $state, Backand, formData) {
  
  var cm = this;
  //var workout;

  // $scope.submitForm = function(workout) {
  //   formData.updateForm(workout);
  //   console.log("Retrieving form from service", formData.getForm());
  //   $state.go('tab.sportworkout');
    
  // };

  function getAll(){
    WorkoutModel.all()
      .then(function (result) {
            cm.data = result.data.data;
            
      });
  }
  
  function create(object){
    WorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        console.log(object);
        // $scope.submitForm(object);
        $state.go("tab.analysis");
      });
  }
  
  function initCreateForm() {
    cm.newObject = { name: ''}; 
  }
 
  function setEdited(object) {
    cm.edited = angular.copy(object);
    cm.isEditing = true;
  }
  
  function isCurrent(id) {
    return cm.edited !== null && cm.edited.id === id;
  }
  
  function cancelEditing() {
    cm.edited = null;
    cm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    cm.isCreating = false;
  }
  
  cm.objects = [];
  cm.edited = null;
  cm.isEditing = false;
  cm.isCreating = false;
  cm.getAll = getAll;
  cm.create = create;
  cm.setEdited = setEdited;
  cm.isCurrent = isCurrent;
  cm.cancelEditing = cancelEditing;
  cm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();

})

//contoller create exercises
.controller('ExerciseEditorCtrl', function($rootScope, $scope, ExerciseModel, $state, Backand) {
  var vm = this;

  function getAll(){
    ExerciseModel.all()
      .then(function (result) {
            vm.data = result.data.data;
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
  });
  
  initCreateForm();
  getAll();

})

//controller to access exercises
.controller('ExercisesCtrl', function($rootScope, $scope, ExerciseListModel, $state, Backand) {
  var ec = this;

  function getAll(){
    ExerciseListModel.all()
      .then(function (result) {
            ec.data = result.data.data;
            
      });
  
  }

  function create(object){
    ExerciseListModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.analysis");
      });
  }
  
  function initCreateForm() {
    ec.newObject = { name: '', exercises: ''}; 
  }
  
  function setEdited(object) {
    ec.edited = angular.copy(object);
    ec.isEditing = true;
  }
  
  function isCurrent(id) {
    return ec.edited !== null && ec.edited.id === id;
  }
  
  function cancelEditing() {
    ec.edited = null;
    ec.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    ec.isCreating = false;
  }
  
  ec.objects = [];
  ec.edited = null;
  ec.isEditing = false;
  ec.isCreating = false;
  ec.getAll = getAll;
  ec.create = create;
  ec.setEdited = setEdited;
  ec.isCurrent = isCurrent;
  ec.cancelEditing = cancelEditing;
  ec.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();


})

.controller('AnalysisCtrl', function($rootScope, $scope, Backand, $state) {
  
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



