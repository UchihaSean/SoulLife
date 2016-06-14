/**
 * Created by chengaoxing on 16/4/24.
 */
angular.module('app.routers',['controllers.serviceCtr','controllers.healthCtr','controllers.personCtr','controllers.userCtr'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('tabsController.service', {
        url: '/service',
        views: {
          'tab4': {
            templateUrl: 'templates/service.html',
            controller: 'serviceCtr'
          }
        }
      })

      .state('tabsController.health', {
        cache: false,
        url: '/health',
        views: {
          'tab2': {
            templateUrl: 'templates/health.html',
            controller: 'healthCtr'
          }
        }
      })

      .state('tabsController.evaluate',{
          cache: false,
          url:'/health-evaluate',
          views: {
              'tab2': {
                  templateUrl:'templates/evaluate.html',
                  controller: 'evaluateCtr'
              }

          }
      })

      .state('tabsController.clock',{
          cache: false,
          url:'/health-clock',
          views: {
              'tab2': {
                  templateUrl:'templates/clock.html',
                  controller: 'clockCtr'
              }

          }
      })

      .state('tabsController.person', {
        url: '/person',
        views: {
          'tab3': {
            templateUrl: 'templates/person.html',
            controller: 'personCtr'
          }
        }
      })

      .state('tabsController.user', {
        url: '/user',
        views: {
          'tab5': {
            templateUrl: 'templates/user.html',
            controller: 'userCtr'
          }
        }
      })

      .state('tabsController.login',{
          url: '/login',
          views: {
              'tab5': {
                  templateUrl: 'templates/login.html',
                  controller: 'loginCtr'
              }
          }
      })

      .state('tabsController.regist',{
          url: '/regist',
          views: {
              'tab5': {
                  templateUrl: 'templates/regist.html',
                  controller: 'registCtr'
              }
          }
      })

      .state('tabsController.set',{
          url:'/set',
          views:{
              'tab5':{
                  templateUrl:'templates/set.html',
                  controller:'setCtr'
              }
          }
      })



      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract:true
      })

    $urlRouterProvider.otherwise('/page1/health-evaluate')

  });
