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

//controller to access users
.controller('UserCtrl', function($rootScope, $scope, UserModel, $state, Backand) {
  var cm = this;
  var userDetail;



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
  var userDetail;
  var sport;
  
  $scope.sport = {};
  
  
  $scope.submitForm = function(sport) {
    formData.updateForm(sport);
    console.log(sport);
    // console.log("Retrieving form from service", formData.getForm());
    $state.go('tab.sporteditor');
    
  }

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
  

  $scope.clicker = function(item){
    sport = getSport(item);
    $scope.submitForm(sport);
  };
  
  function getSport(item){
    sm.currentSport = item.name;
    return sm.currentSport;
  }

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
    $scope.getUserDetails();
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
  var user;
  
  $scope.user = {};
  $scope.users = {};
  var userId;

  $scope.sport = formData.getForm();
  //console.log($scope.sport)
  var sportId = $scope.sport.id;
  //console.log(sportId);
  
  getAll();
  
  $scope.submitForm = function(user) {
    console.log(formData.updateForm(user));
    console.log("Retrieving form from service", formData.getForm());
    userId = user.id;
    sm.newObject.user = userId;
    sm.newObject.sport = sportId;
    sm.create(sm.newObject);
    
    
  }  
  


  
  function getAll(){
    UserSportModel.all()
      .then(function (result) {
            sm.data = result.data.data
            
      });
  }
  

  // function getSelected() {
  //   for(var object in sm.data) {
  //     var current = sm.data[object];
  //     if(sportId == current.sport) {
  //       sm.data2.push(sm.data[object]);
  //     }
  //   }
  //   console.log(sm.data2);
  // }    

   function create(object){
    UserSportModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        //$state.go("tab.analysis");
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
    // getSelected();
  });
  
  initCreateForm();
  getAll();
  // getSelected();

})

//controller to populate sports_workouts
.controller('SportWorkoutCtrl', function($rootScope, $scope, SportWorkoutModel, $state, Backand, formData) {
  var swm = this;
  var user;
  
  $scope.workout = {};
  // $scope.users = {};
  // var userId;

  //$scope.workout = formData.getForm();
  //console.log($scope.sport)
 // var workoutId = $scope.workout.id;
  //console.log(sportId);
  
  getAll();
  
  $scope.submitForm = function(workout) {
    console.log(formData.updateForm(workout));
    console.log("Retrieving form from service", formData.getForm());
    //workoutId = user.id;
    //swm.newObject.workout = workoutId;
    // sm.newObject.sport = sportId;
    // sm.create(sm.newObject);
    
    
  };  
  


  
  function getAll(){
    SportWorkoutModel.all()
      .then(function (result) {
            swm.data = result.data.data;
            
      });
  }
  

  // function getSelected() {
  //   for(var object in sm.data) {
  //     var current = sm.data[object];
  //     if(sportId == current.sport) {
  //       sm.data2.push(sm.data[object]);
  //     }
  //   }
  //   console.log(sm.data2);
  // }    

   function create(object){
    SportWorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();

        //$state.go("tab.analysis");
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
    // getSelected();
  });
  
  initCreateForm();
  getAll();
  // getSelected();

})


//controller to access workouts
.controller('WorkoutCtrl', function($rootScope, $scope, WorkoutListModel, $state, Backand, formData) {
  var wlc = this;
  var userDetail;
  var workout;
  

  $scope.workout = {};
  
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
    console.log("Retrieving form from service", formData.getForm());
    $state.go('tab.analysis');
    
  }
  
  
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
  

  $scope.clicker = function(item){
    workout = getWorkout(item);
    $scope.submitForm(workout);
  };
  
  function getWorkout(item){
    wlc.currentWorkout = item.name;
    return wlc.currentWorkout;
  }

  function getAll(){
    WorkoutListModel.all()
      .then(function (result) {
            wlc.data = result.data.data;
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
    $scope.getUserDetails();
    wlc.newObject = {userId: '', sportId: ''}; 
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
  
  //console.log($scope.workout = formData.getForm());


/*
  var wte = this;
  var userDetail;
  var data2 = [];
  $scope.workout = {};
  
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
    console.log("Retrieving form from service", formData.getForm());
    //$state.go('tab.sporteditor');
    
  }
  

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
    WorkoutExerciseModel.all()
      .then(function (result) {
            wte.data = result.data.data;
            
      });
  }
  
  function getSelected(){
    WorkoutExerciseModel.all()
      .then(function (result) {
        for (var object in wte.allData) {
            var current = wte.allData[object];
            if (userDetail == current.user) {
              data2.push(wte.allData[object]);
            }
            
        }
        wte.data = data2;

      });
  }
  
  
  function create(object){
    WorkoutExerciseModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.analysis");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
    wte.newObject = { name: '', exercises: ''}; 
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
    getSelected();
  });
  
  initCreateForm();
  getAll();
  getSelected();

*/
})

//contoller create workouts
.controller('WorkoutEditorCtrl', function($rootScope, $scope, WorkoutModel, $state, Backand, formData) {
  var cm = this;
  var userDetail;
  var data2 = [];
  var workout;

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
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
    // console.log("Retrieving form from service", formData.getForm());
    $state.go('tab.sportworkout');
    
  }

  function getAll(){
    WorkoutModel.all()
      .then(function (result) {
            cm.data = result.data.data;
            
      });
  }
  
  function getSelected(){
    WorkoutModel.all()
      .then(function (result) {
        for (var object in cm.allData) {
            var current = cm.allData[object];
            if (userDetail == current.user) {
              data2.push(cm.allData[object]);
            }
            
        }
        cm.data = data2;

      });
  }
  
  
  function create(object){
    WorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        console.log(object);
        $scope.submitForm(object);
        //$state.go("tab.analysis");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
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
    getSelected();
  });
  
  initCreateForm();
  getAll();
  getSelected();
  

})

//contoller create exercises
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
            vm.data = result.data.data;
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
        //vm.data = data2;

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
    console.log(vm);
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



