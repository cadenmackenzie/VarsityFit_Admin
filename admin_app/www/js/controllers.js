angular.module('starter.controllers', ['ionic'])

.filter('userFilter', function(){
  return function(user, searchText){
    var filteredUsers = [];
    searchText = searchText || '' ;
    
    if (searchText.val == ''){
      return user;
    }
    searchText.val = searchText.val.toLowerCase();
    console.log("filt", JSON.stringify(searchText)); 
    for (var obj in user){
      var a_user = user[obj];
      if ((a_user.firstName.toLowerCase().includes(searchText.val)) || (a_user.lastName.toLowerCase().includes(searchText.val))){
        filteredUsers.push(a_user);
      }
    }
    return filteredUsers;
  };
})

.filter('exerciseFilter', function(){
  return function(exercise, searchText){
    
    var filteredExercises = [];
    searchText = searchText || '' ;
    console.log("ex_text", JSON.stringify(searchText));
    
    if (searchText.val == ''){
      return exercise;
    }
    searchText.val = searchText.val.toLowerCase();
    console.log("filt", JSON.stringify(searchText)); 
    for (var obj in exercise){
      var an_exercise = exercise[obj];
      if ((an_exercise.name.toLowerCase().includes(searchText.val))){
        filteredExercises.push(an_exercise);
      }
    }
    return filteredExercises;
  };
})

.filter('surveyFilter', function(){
  return function(surveys, searchText){
    console.log("typeof", JSON.stringify(typeof searchText));
    searchText = searchText || '';
    if (searchText != ''){
      //searchText = searchText.toString().toLowerCase();
      console.log("surveys", JSON.stringify(searchText));
      var filteredSurveys = [];
      surveys.forEach(function(a_survey){
        console.log(JSON.stringify(a_survey), typeof a_survey.firstName, JSON.stringify(searchText), searchText.val);
        if(a_survey.firstName.toLowerCase().includes(searchText.val) || a_survey.lastName.toLowerCase().includes(searchText.val) || a_survey.date.includes(searchText.val)){
          filteredSurveys.push(a_survey);
        }
      });
      return filteredSurveys;
    }
    
    else{
      return surveys;
    }
  };
})

.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, Backand, $ionicPopup) {
    
    var login = this;
    var token;
    function signin() {
      var appName = 'varsityfit';
      LoginService.signin(login.email, login.password, appName)
        .then (function() {
          console.log("login.signin");
          $rootScope.$broadcast("authorized");
          $state.go("tab.analysis");
          
        }, function(error){
          console.log(JSON.stringify(error));
        });
    }

    login.signin = signin;

    
    // function requestResetPassword() {
    //   LoginService.requestResetPassword(login.userName)
    //     .then(function() {
    //       token = Backand.getToken();
    //       $rootScope.$broadcast("successful");
    //       $state.go("resetPassword");
    //     }, function(error){
    //       console.log(error);
    //     });
    // }
    
    // login.requestResetPassword = requestResetPassword;
    
    // function resetPassword() {
    //   LoginService.resetPassword(login.resetToken, login.newPassword)
    //     .then (function() {
    //       $rootScope.$broadcast("authorized");
    //       alert('Your password was successfully changed');
    //       $state.go("login");
    //     }, function(error) {
    //       console.log(error);
    //     });
    // }
    
    // login.resetPassword = resetPassword;

    // function changePassword() {
    //   if (login.newPassword == login.newPassword2) {
    //     LoginService.changePassword(login.oldPassword, login.newPassword)
    //       .then(function() {
    //         $rootScope.$broadcast("successful");
    //         $state.go("tab.account");
    //       }, function(error) {
    //         console.log(error);
    //       });
    //   }
    // }
    
    // login.changePassword = changePassword;

}) 

//controller to access users
.controller('UserCtrl', function($rootScope, $scope, UserModel, $state, Backand) {
  var cm = this;
  var temp_array2 = [];
  
  if(!angular.isDefined($scope.searchText)){
    console.log("init");
    $scope.searchText = {};
    $scope.searchText.val='';  
  } 
  
  function getAll(){
    console.log("getAll Users");
    cm.data = [];
    cm.data2 = [];
    var notuser = [];
    var temp_array = [];
    UserModel.getUsers($scope.sport.id)
    .then(function (result) {
      var tempo_users = result.data.relatedObjects.users;
      for (var user in tempo_users){
        if (!angular.toJson(temp_array).includes(angular.toJson(user))){
          temp_array.push(tempo_users[user]);
        }
      }
      cm.data = temp_array;
      
      UserModel.all()
      .then(function(result){
        var da = result.data.data;
        var fake_array = []
        var bu;
        
        for (var baduser in da){
          bu = da[baduser];
          if (!(notuser.includes(angular.toJson(bu))) && 
              !angular.toJson(temp_array).includes(angular.toJson(bu))){
            notuser.push(bu);
          }
        }
        cm.data2 = notuser;
      });

        
        console.log("cm.data", JSON.stringify(cm.data));
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
  //cm.oninput = $scope.userfilter();
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  $scope.$on("changedUsers", function(event){
    console.log("changedUsers Listener");
    getAll();
    //$scope.$apply();
  });
  
  initCreateForm();
  getAll();
})

//controller to access sports
.controller('SportCtrl', function($rootScope, $scope, SportModel, $state, Backand, formData) {
  var sm = this;
  
  //$scope.sport = {};
  
  
  $scope.submitForm = function(sport) {
    console.log("sport submit");
    formData.updateForm(sport);
    $state.go('tab.sporteditor');
  };
  
  function getAll(){
    SportModel.all()
      .then(function (result) {
            sm.data = result.data.data;
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
.controller('SportEditorCtrl', function($rootScope, $scope, UserSportModel, $state, Backand, formData, SportModel) {
  var usm = this;

  $scope.user = {};
  $scope.users = {};
  var userId;
  
  $scope.sport = formData.getForm();
  var sportId = $scope.sport.id;

  getAll();
  
  $scope.addUser = function(user){
     console.log("Add user to sport", JSON.stringify(formData.getForm()));
      userId = user.id;
      usm.newObject.user = userId;
      usm.newObject.sport = sportId; 
      var add_p = usm.create(usm.newObject);
      add_p.then(function(){
        $rootScope.$broadcast("changedUsers"); 
      });
  };
  
  $scope.removeUser = function(user){
    console.log("removing user", JSON.stringify(user));
    usm.data.forEach(function(apple){
      console.log("apple.sport?", JSON.stringify(apple));
      if ((parseInt(apple.user) == user.id && (parseInt(apple.sport) == sportId))){
        console.log("deleted", apple.id);
        var remove_p = usm.remove(apple.id);
        remove_p.then(function(){
          $rootScope.$broadcast("changedUsers");
        });
      }
    });
  };
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
    console.log("sporteditor formsubmit");
    $state.go('tab.workoutsexercises');
    
  };
  
  function getAll(){
    UserSportModel.all()
      .then(function (result) {
            usm.data = result.data.data;
      });
  }
  
  function create(object){
    var create_p = UserSportModel.create(object);
      create_p.then(function (result) {
        cancelCreate();
        getAll();
      });
    return create_p;
  }
  
  function remove(object){
    var remove_p = UserSportModel.delete(object);
    remove_p.then(function (result) {
        cancelCreate();
        getAll();
      });
    return remove_p;
  }
  function initCreateForm() {
    usm.newObject = { userId: '', sportId: ''}; 
  }
  
  function setEdited(object) {
    usm.edited = angular.copy(object);
    usm.isEditing = true;
  }
  
  function isCurrent(id) {
    return usm.edited !== null && usm.edited.id === id;
  }
  
  function cancelEditing() {
    usm.edited = null;
    usm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    usm.isCreating = false;
  }
  usm.objects = [];
  usm.edited = null;
  usm.isEditing = false;
  usm.isCreating = false;
  usm.getAll = getAll;
  usm.create = create;
  usm.remove = remove;
  usm.setEdited = setEdited;
  usm.isCurrent = isCurrent;
  usm.cancelEditing = cancelEditing;
  usm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();
})

//controller to populate sports_workouts
.controller('SportWorkoutCtrl', function($timeout, $rootScope, $scope, SportWorkoutModel, $state, Backand, formData) {
  var swm = this;

  //$scope.workout = {};
  getAll();
  
  $scope.submitForm = function(workout) {
    console.log("sportworkout submit");
    formData.updateForm(workout);
    console.log("Retrieving form from service", formData.getForm());
  };  

  function getAll(){
    SportWorkoutModel.all()
      .then(function (result) {
            swm.data = result.data.data;
            
      });
  }
  
  function addWorkout(workout){
    console.log("addWorkout", JSON.stringify($scope.sport.id));
    swm.newObject.workout = workout.id;
    swm.newObject.sport = $scope.sport.id;
    var added_p = swm.create(swm.newObject);
    added_p.then(function (result){
      $rootScope.$broadcast('changedWorkouts', []); 
    });
  }
  
  function removeWorkout(workout){
     swm.data.forEach(function(a_workout){
      if ((parseInt(a_workout.workout) == workout.id && (parseInt(a_workout.sport) == $scope.sport.id)) ){
        console.log("deleted", a_workout.id);
        var removed_p = swm.removeW(a_workout.id);
        removed_p.then(function (result){
          $rootScope.$broadcast('changedWorkouts', []);
          });
        }
      });
  };
  function create(object){
    var swm_p = SportWorkoutModel.create(object);
      swm_p.then(function (result) {
        cancelCreate();
        //getAll();
      });
    return swm_p;
  }
  
   function removeW(id){
    var workout_p = SportWorkoutModel.delete(id);
    workout_p.then(function (result) {
      console.log("removedW", JSON.stringify(id));
        cancelCreate();
        //getAll();
      });
    return workout_p;
  }
  
  function initCreateForm() {
    swm.newObject = { sport: '', workout: ''}; 
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
  swm.removeW = removeW;
  swm.addWorkout = addWorkout;
  swm.removeWorkout = removeWorkout;
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
  var temp_workouts;

  //$scope.workouts = {};
  
  $scope.createWorkout = function(){
    $state.go('tab.workouteditor');
  };
  
  $scope.submitForm = function(workouts) {
    formData.updateForm(workouts);
    console.log("WorkoutCtrl Submit");
    $state.go('tab.workoutsexercises');
    
  };
  function getAll(){
    WorkoutListModel.all()
      .then(function (result) {
            wlc.data = result.data.data;
      });
    console.log("WorkoutCtrl.getAll");
  }
  
  function getWorkouts(){
    console.log("Get workouts");
    var workoutlist_p = WorkoutListModel.getWorkouts(parseInt($scope.sport.id));
    workoutlist_p.then(function (result){
      var temp_array = [];
      var tempo_workouts = result.data.relatedObjects.workouts;
      for (var workout in tempo_workouts){
        temp_array.push(tempo_workouts[workout]);
      }
      wlc.workouts = temp_array;
      $scope.workouts = wlc.workouts;
      
       WorkoutListModel.all()
      .then(function(result){
        var workoutdata = result.data.data;
       
          var fake_array = [];
          var a_workout;
          for (var bad_workout in workoutdata){
            a_workout = workoutdata[bad_workout];
            //console.log("deez logs", JSON.stringify(angular.toJson(a_workout)), angular.toJson(wlc.workouts));
            if (!(fake_array.includes(angular.toJson(a_workout))) && !angular.toJson(wlc.workouts).includes(angular.toJson(a_workout))){
              fake_array.push(a_workout);
          }
        }
          wlc.workouts2 = fake_array;
          $scope.workouts2 = wlc.workouts2;
      });
    }),
    (function (error){
      console.log("workout error", JSON.stringify(error));
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
  
  $scope.$on("changedWorkouts", function(event, workouts){
    console.log("changedWorkouts Listener");
    getWorkouts();
    //$scope.$apply();
  });
  initCreateForm();
  
  if (angular.isDefined($scope.sport)){
    getWorkouts();
  }
  else{
    getAll(); 
  }


})

//contoller to populate workouts_exercises
.controller('WorkoutExerciseCtrl', function($rootScope, $scope, WorkoutExerciseModel, $state, Backand, formData) {
  var wte = this;

  $scope.exercise = {};
  //$scope.users = {};
  var exerciseId;

  $scope.workouts = formData.getForm();
  var workoutId = $scope.workouts.id;

  //getAll();
  
  $scope.submitForm = function(exercise) {
    formData.updateForm(exercise);
    console.log("WorkoutExercise Submit");
    exerciseId = exercise.id;
    wte.newObject.exercise = exerciseId;
    wte.newObject.workout = workoutId;
    wte.create(wte.newObject);
  };
  
   $scope.addExercise = function(exercise){
     console.log("wte-addExercise", JSON.stringify(formData.getForm()));
      wte.newObject.exercise = exercise.id;
      wte.newObject.workout = workoutId; 
      var add_p = wte.create(wte.newObject);
      add_p.then(function(){
        $rootScope.$broadcast("changedExercises"); 
      });
  };
  
  $scope.removeExercise = function(exercise){
    getAll();
    console.log("removing exercise", JSON.stringify(exercise));
    wte.data.forEach(function(wo_ex){
      //console.log("wo_ex.sport?", JSON.stringify(wo_ex));
      console.log(wo_ex.exercise, exercise.id, "|", wo_ex.workout, workoutId);
      if ((parseInt(wo_ex.exercise) == exercise.id && (parseInt(wo_ex.workout) == workoutId))){
        console.log("deleted", wo_ex.id);
        var remove_p = wte.remove(wo_ex.id);
        remove_p.then(function(){
          $rootScope.$broadcast("changedExercises");
        });
      }
    });
  };
  
  function getAll(){
    WorkoutExerciseModel.all()
      .then(function (result) {
            wte.data = result.data.data;
            
      });
  }
  
  function create(object){
    return WorkoutExerciseModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
      });
  }
  
  function remove(object){
    return WorkoutExerciseModel.delete(object)
      .then(function (result) {
        cancelCreate();
        getAll();
      });
  }
  
  function initCreateForm() {
    wte.newObject = { exercise: '', workout: ''}; 
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
  wte.remove = remove;
  $rootScope.$on("authorized", function() {
    getAll();
    console.log("WorkoutExercise.authorized");
  });
  
  initCreateForm();
  getAll();
})

//contoller create workouts
.controller('WorkoutEditorCtrl', function($rootScope, $scope, WorkoutModel, $state, Backand, formData) {
  
  var cm = this;
  console.log("in workedit");
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
    console.log("WorkoutEditorCtrl.Submit");
    $state.go('tab.workout');
    
  };
  
  function getAll(){
    console.log("WorkoutEdit.Getall");
    WorkoutModel.all()
      .then(function (result) {
            cm.data = result.data.data;
      });
  }
  
  function create(object){
    console.log("WorkoutEdit.createObj");
    WorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        $state.go("tab.workout");
      });
  }
  
  function initCreateForm() {
    console.log("WorkoutEditor.createForm");
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
    console.log("WorkoutEdit.authorized");
    getAll();
  });
  
  initCreateForm();
  getAll();
})

//contoller create exercises  
.controller('ExerciseEditorCtrl', function($rootScope, $scope, ExerciseModel, $state, Backand) {
  var vm = this;
  
  
  $scope.createExercise = function(){
    $state.go('tab.exerciseeditor');
  };
  
  function getAll(){
    console.log("ExerciseEdit.getAll");
    ExerciseModel.all()
      .then(function (result) {
            vm.data = result.data.data;
      });
  }

  function create(object){
    console.log("ExerciseEdit.createObj");
    ExerciseModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        $state.go("tab.analysis");
      });
  }
  
  function initCreateForm() {
    console.log("ExerciseEdit.createForm");
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
.controller('ExercisesCtrl', function($ionicHistory, $rootScope, $scope, ExerciseListModel, WorkoutExerciseModel, $state, Backand) {
  var ec = this;

  if(!angular.isDefined($scope.searchText)){
    console.log("init");
    $scope.searchText = {};
    $scope.searchText.val='';  
  } 
  
  function getAll(){
    ExerciseListModel.all()
      .then(function (result) {
            ec.data = result.data.data;
      });
  
  }
  //console.log("backview", JSON.stringify($ionicHistory.backView()));
  function getEx(){
    console.log("getEx");
    var temp_ex = [];
    //console.log(JSON.stringify($scope.workouts));
    var exlist_p = WorkoutExerciseModel.getEx(parseInt($scope.workouts.id));
    exlist_p.then(function (result){
      //console.log(JSON.stringify(result.data.relatedObjects.exercises));
      var exercises = result.data.relatedObjects.exercises;
      for (var index in exercises)
        temp_ex.push(exercises[index]);
        
       ExerciseListModel.all()
      .then(function(result){
        var all_ex = result.data.data;
        var not_ex = []
        var curr_ex;
        
        for (var baduser in all_ex){
          curr_ex = all_ex[baduser];
          console.log("curr_ex", JSON.stringify(curr_ex));
          if (!(not_ex.includes(angular.toJson(curr_ex))) && 
              !angular.toJson(temp_ex).includes(angular.toJson(curr_ex))){
            not_ex.push(curr_ex);
          }
        }
        ec.check2 = not_ex;
      });

    });
    
    ec.check = temp_ex;
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
  
  $scope.$on("changedExercises", function(event){
    console.log("changedExercises Listener");
    getEx();
    //$scope.$apply();
  });
  initCreateForm();
  getAll();
  getEx();


})

.controller('AnalysisCtrl', function($rootScope, $scope, Backand, $state, SurveyService, UserModel) {
  var sv = this;
  $scope.date = null;
  $scope.init = function(value) {
    $scope.date = value;
  };
  
  if (typeof sv.surveys == 'undefined'){
    sv.surveys = []; 
  }
  if (typeof sv.dates == 'undefined'){
    console.log("mic_check");
    sv.dates = [];
  }

  function getAll() {
    console.log(JSON.stringify($scope.date), JSON.stringify(sv.date));
    SurveyService.all()
    .then(function(result){
      var counter = 0;
      var temp_surveys = [];
      for(var survey2 in result.data.data){
        //console.log("onetwo", JSON.stringify(result.data.data[survey2]));
        var loop_date = '';
       // console.log(JSON.stringify(temp_surveys));
        loop_date = result.data.data[survey2].user;
          if (!temp_surveys.includes(angular.toJson(result.data.data[survey2]))){
              temp_surveys.push(result.data.data[survey2]);
          }
        //console.log("loop", loop_date);
        counter++;
      }
    
    temp_surveys.forEach(function(survey_obj){
      var user_id = survey_obj.user;
          UserModel.fetch(user_id).then(function(results){
            survey_obj.lastName = results.data.lastName;
            survey_obj.firstName = results.data.firstName;
            survey_obj.date = survey_obj.date.slice(0, 10);
            // result.data.data[survey2].lastName = results.data.lastName;
            // result.data.data[survey2].firstName = results.data.firstName;
          }
        );
    });
    sv.surveys = temp_surveys;
    });
    
    
    
  }
  getAll();
})



.controller('AccountCtrl', function($scope, Backand, $state) {

  var vm = this;
  
  function userDetails() {
    var user = Backand.getUserDetails();
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