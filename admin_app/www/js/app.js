// VarsityFit App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'varsityfit' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'varsityfit.services' is found in services.js
angular.module('starter', ['ionic', 'backand', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})



.config(function(BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  var appName = 'varsityfit';

  BackandProvider.setAppName('varsityfit'); 


  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as login'
  })
  

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })




  .state('tab.analysis', {
      url: '/analysis',
      views: {
        'tab-analysis': {
          templateUrl: 'templates/tab-analysis.html',
          controller: 'AnalysisCtrl'
        }
      }
    })
    
    .state('tab.workouteditor', {
      url: '/workouteditor',
      views: {
        'tab-workouteditor': {
          templateUrl: 'templates/tab-workouteditor.html',
          controller: 'WorkoutEditorCtrl as cm'
        }
      }
    })
    
    .state('tab.sportworkout', {
      url: '/sportworkout',
      views: {
        'tab-workouteditor': {
          templateUrl: 'templates/tab-sportworkout.html',
          controller: 'SportWorkoutCtrl as swc'
        }
      }
    })

    .state('tab.workout', {
      url: '/workout',
      views: {
        'tab-workout': {
          templateUrl: 'templates/tab-workout.html',
          controller: 'WorkoutCtrl as wlc'
        }
      }
    })      
    
    .state('tab.workoutsexercises', {
      url: '/workoutsexercises',
      views: {
        'tab-workout': {
          templateUrl: 'templates/tab-workoutsexercises.html',
          controller: 'WorkoutExerciseCtrl as wte'
        }
      }
    })    

    .state('tab.exerciseeditor', {
      url: '/exerciseeditor',
      views: {
        'tab-exerciseeditor': {
          templateUrl: 'templates/tab-exerciseeditor.html',
          controller: 'ExerciseEditorCtrl as vm'
        }
      }
    })
    
    .state('tab.sport', {
      url: '/sport',
      views: {
        'tab-sport': {
          templateUrl: 'templates/tab-sport.html',
          controller: 'SportCtrl as sm',
        }
      }
    })     
    .state('tab.sporteditor', {
      cache: false,
      url: '/sporteditor',
      views: {
        'tab-sport': {
          templateUrl: 'templates/tab-sporteditor.html',
          controller: 'SportEditorCtrl as usm'
        }
      }
    }) 

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl as vm'
      }
    }
  })  
  .state('tab.accountdetails', {
    url: '/accountdetails',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-accountdetails.html',
        controller: 'AccountCtrl as vm'
      }
    }
  });
  
  //   .state('requestResetPassword', {
  //   url: '/requestResetPassword',
  //   templateUrl: 'templates/requestResetPassword.html',
  //   controller: 'LoginCtrl as login'
  // })
  
  // .state('resetPassword', {
  //   url: '/resetPassword',
  //   templateUrl: 'templates/resetPassword.html',
  //   controller: 'LoginCtrl as login'
    
  // })
  
  //   .state('tab.changepassword', {
  //   url: '/changepassword', 
  //   views: {
  //     'tab-account': {
  //         templateUrl: 'templates/tab-changepassword.html',
  //         controller: 'LoginCtrl as login'  
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/login');
  $urlRouterProvider.otherwise('/login');

  $httpProvider.interceptors.push('APIInterceptor');
    
});

