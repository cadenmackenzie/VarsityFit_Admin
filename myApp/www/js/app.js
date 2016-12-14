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

/*  
  var appName = 'varsityfit';
  $httpProvider.interceptors.push(httpInterceptor);
  
  BackandProvider.setAppName('varsityfit'); // change here to your app name
  BackandProvider.setSignUpToken('4ce88904-75c5-412c-8365-df97d9e18a8f'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
  BackandProvider.setAnonymousToken('85e64ce8-9e56-4543-b071-961ae65a4f28'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
    function httpInterceptor($q, $log, $cookieStore) {
       return {
         request: function(config) {
           config.headers['Authorization'] = 
             $cookieStore.get('backand_token');
           return config;
         }
       };
    }
*/

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
/*
 
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
    controller: 'LoginCtrl as login'
  })
*/
  // Each tab has its own nav history stack:
/*
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl as login'
      }
    }
  })

*/



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
      url: '/sporteditor',
      views: {
        'tab-sport': {
          templateUrl: 'templates/tab-sporteditor.html',
          controller: 'SportEditorCtrl as sm'
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

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/login');
  $urlRouterProvider.otherwise('/login');

  $httpProvider.interceptors.push('APIInterceptor');
    
});

/*
  .run(function ($rootScope, $state, LoginService, Backand) {

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('login');
        }

      //  function signout() {
        //    LoginService.signout();
        //}

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name == 'login') {
                signout();
            }
            else if (toState.name != 'login' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });

    })
*/