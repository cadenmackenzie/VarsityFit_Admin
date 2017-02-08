angular.module('starter.controllers', ['ionic'])

.filter('userFilter', function(){
  return function(user, searchText){
    var filteredUsers = []
    
    //console.log("userinfilt", JSON.stringify(user));
    
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
  var temp_array = [];
  var temp_array2 = [];
  
  if(!angular.isDefined($scope.searchText)){
    console.log("init");
    $scope.searchText = {};
    $scope.searchText.val='';  
  } 

  function getAll(){
    var notuser = [];
    UserModel.getUsers($scope.sport.id)
    .then(function (result) {
      //console.log("baba", JSON.stringify(result.data));
      //console.log("gup", JSON.stringify(result.data.relatedObjects.users));
      var tempo_users = result.data.relatedObjects.users;
      for (var user in tempo_users){
        var b = tempo_users[user];
        //b.check = true;
        temp_array.push(tempo_users[user]);
      }
      
      UserModel.all()
      .then(function(result){
        var da = result.data.data;
       
          var fake_array = []
          var bu;
          for (var baduser in da){
          bu = da[baduser];
        //  console.log("bu da", angular.toJson(bu));
          
           // console.log("temp_user", JSON.stringify(temp_array[temp_user]));
           //console.log("just checkin", JSON.stringify(temp_array[temp_user].id == bu.id));
           var a = !angular.toJson(notuser).includes(angular.toJson(bu));
           var b =  !angular.toJson(temp_array).includes(bu);
          // console.log("a, b", JSON.stringify(a), JSON.stringify(b));
           
            if (!(notuser.includes(angular.toJson(bu))) && !angular.toJson(temp_array).includes(angular.toJson(bu))){
              notuser.push(bu);
          }
        }
      });
        cm.data = temp_array;
        cm.data2 = notuser;
    });
    
   
    
  

    // UserModel.all()
    //   .then(function (result) {
    //         //console.log("sport done", JSON.stringify($scope.sport));
    //         cm.data = result.data.data;

    //         cm.data.forEach(function(__metadata){
    //         var added = false;
    //           var s_arr = __metadata.users_sports.split(",");
    //           s_arr.forEach(function(sport_id){
    //             if ($scope.sport.id == parseInt(sport_id)){
    //               temp_array.push({"firstName": __metadata.firstName , 
    //               "lastName": __metadata.lastName, 
    //               "id": __metadata.id, 
    //               "check": true});
    //               added = true;
    //             }
    //           });
    //           if (!added){
    //             temp_array2.push({"firstName": __metadata.firstName , 
    //             "lastName": __metadata.lastName, 
    //             "id": __metadata.id, 
    //             "check": false});
    //           }
    //         });
    //         cm.data = temp_array;
    //         cm.data2 = temp_array2;
    //       // console.log("cm", JSON.stringify(cm.data));
    // });
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
  
  initCreateForm();
  getAll();
})

//controller to access sports
.controller('SportCtrl', function($rootScope, $scope, SportModel, $state, Backand, formData) {
  var sm = this;
  
  //$scope.sport = {};
  
  
  $scope.submitForm = function(sport) {
    formData.updateForm(sport);
    //console.log("sportsubmit", JSON.stringify(sport));
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
  
  $scope.submitForm = function(user, check) {
    console.log("check", JSON.stringify(check));  
    console.log("hi", JSON.stringify(user.id));
    var ul, li;
    
    ul = document.getElementById("users");
    console.log("ul", JSON.stringify(ul));
    
    li = ul.getElementsByTagName('li');
   // console.log("2li", JSON.stringify(li[user.firstName].firstElementChild.attributes.item(1).value = false));
   // console.log("ul", JSON.stringify(document.documentElement.innerHTML));
    
    formData.updateForm(user);
    console.log(JSON.stringify(document.getElementsByName(user.id)));
    //console.log("user", JSON.stringify(user));
    console.log("is it tho", JSON.stringify(!angular.isDefined(li[user.firstName].firstElementChild.attributes.item(1))));
    
    if (check){
      console.log("Add user to sport", JSON.stringify(formData.getForm()));
      userId = user.id;
      usm.newObject.user = userId;
      usm.newObject.sport = sportId; 
      usm.create(usm.newObject);
      var typ = document.createAttribute("class")
      typ.value = true;
      li[user.firstName].firstElementChild.attributes.setNamedItem(typ);
      //li[user.firstName].firstElementChild.attributes.item(1).value = true;
    }
    else{
      console.log("Remove user from sport", JSON.stringify(formData.getForm()));
      usm.data.forEach(function(apple){
            if ((parseInt(apple.user) == user.id && (parseInt(apple.sport) == sportId)) ){
              console.log("deleted", apple.id);
              var remove_p = usm.remove(apple.id);
              li[user.firstName].firstElementChild.attributes.item(1).value = false;
            }
      });
    }
    
      var p = SportModel.fetch(parseInt(sportId));
      p.then(function(sport){
        //console.log("sport info", JSON.stringify(sport));
        var p1 = $state.go('tab.sport');
        p1.then(function(result){
          $scope.sport = sport;
          formData.updateForm(sport.data);
          $state.go('tab.sporteditor');
        });
      });
  };
  
  function getAll(){
    UserSportModel.all()
      .then(function (result) {
            usm.data = result.data.data;
            
      });
  }
  
  function create(object){
    UserSportModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        return result;
      });
  }
  
  function remove(object){
    var usp_p = UserSportModel.delete(object);
    usp_p.then(function (result) {
        cancelCreate();
        getAll();
      });
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
.controller('SportWorkoutCtrl', function($rootScope, $scope, SportWorkoutModel, $state, Backand, formData) {
  var swm = this;

  //$scope.workout = {};
  getAll();
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
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
  var temp_workouts;
  
  console.log("in workoutctrl");

  $scope.workouts = {};
  
  $scope.submitForm = function(workouts) {
    formData.updateForm(workouts);
    console.log("Retrieving form from wlc service", JSON.stringify(formData.getForm()));
    $state.go('tab.workoutsexercises');
    
  };

  function getAll(){
    WorkoutListModel.all()
      .then(function (result) {
            wlc.data = result.data.data;
      });
    console.log("got all");
  }
  
  function getWorkouts(){
    var workoutlist_p = WorkoutListModel.getWorkouts(parseInt($scope.sport.id));
    workoutlist_p.then(function (result){
      var temp_array = [];
      var tempo_workouts = result.data.relatedObjects.workouts;
      for (var workout in tempo_workouts){
        temp_array.push(tempo_workouts[workout]);
      }
      wlc.workouts = temp_array;
      
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
    console.log("Retrieving form from ex service", JSON.stringify(formData.getForm()));
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
  var workout;
  console.log("in workedit");
  
  $scope.submitForm = function(workout) {
    formData.updateForm(workout);
    console.log("Retrieving form from workout service", formData.getForm());
    $state.go('tab.sportworkout');
    
  };
  
  function getAll(){
    console.log("WorkoutEdit Getall");
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
    console.log("create form");
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
.controller('ExercisesCtrl', function($ionicHistory, $rootScope, $scope, ExerciseListModel, WorkoutExerciseModel, $state, Backand) {
  var ec = this;

  function getAll(){
    ExerciseListModel.all()
      .then(function (result) {
            ec.data = result.data.data;
      });
  
  }
  console.log("backview", JSON.stringify($ionicHistory.backView()));
  function getEx(){
    var temp_ex = [];
    var exlist_p = WorkoutExerciseModel.getEx(parseInt($scope.workouts.workout));
    exlist_p.then(function (result){
          console.log("check", JSON.stringify(result.data));
          for (var ex in result.data.data){
            var ex_p = ExerciseListModel.fetch(parseInt(result.data.data[ex].exercise));
            ex_p.then(function (result){
              console.log("ex_p result", JSON.stringify(result.data));
              temp_ex.push(result.data);
            });
          }
          ec.check = temp_ex;
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
  getEx();


})

.controller('AnalysisCtrl', function($rootScope, $scope, Backand, $state) {
  
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