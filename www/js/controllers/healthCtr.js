/**
 * Created by chengaoxing on 16/4/24.
 */

angular.module('controllers.healthCtr',[])
  .controller('healthCtr',function ($scope,$state,$window,$soap,$ionicHistory) {
      $ionicHistory.nextViewOptions({
          disableBack: true
      });
      if($window.sessionStorage["user"]){
          var url="http://139.129.10.20:8080/axis2/services/SoulService";
          var user=JSON.parse($window.sessionStorage["user"]);
          var sex='man';
          if(user.gender==0){
              sex='woman';
          }
          console.log({args0:user.age,args1:sex,args2:user.height,args3:user.weight});
          $soap.post(url,'getPrimaryHealthReport',{args0:user.age,args1:sex,args2:user.height,args3:user.weight}).then(function(response){
             $scope.response=response;
             $scope.eva=response.split(" ");
          });
          $('.mmshow').show();
      }else{
          $scope.eva=['您还未登录，请登录',''];
          $('.mmshow').hide();
      }

      $scope.health=function(){
          $state.go('tabsController.health');
      };
      $scope.evaluate=function(){
          $state.go('tabsController.evaluate');
      };
      $scope.clock=function(){
          $state.go('tabsController.clock');
      }
  })
  .controller('evaluateCtr',function($scope,$state,$window,$soap,$ionicHistory){

      $ionicHistory.nextViewOptions({
          disableBack: true
      });
          var url1="http://139.129.10.20:8080/axis2/services/SoulService";
          var url2="http://139.129.10.20:8080/axis2/services/SoulService";
          var day=(new Date()).getDate();
          var month=(new Date()).getMonth()+1;
          //var jieqi={jieqi:'6666'};

          $soap.post(url1,'getJieQi',{args0:month,args1:day}).then(function(response){
             $scope.response=response;
             $soap.post(url1,'getMeal',{args0:response}).then(function(response1){
                $scope.response1=response1;
             });
          });




          $scope.getmy=function(){
              if($scope.day&&scope.month){

                  $soap.post(url1,'getJieQi',{args0:$scope.month,args1:$scope.day}).then(function(response){
                     $scope.response=response;
                     $soap.post(url1,'getMeal',{args0:response}).then(function(response1){
                        $scope.response1=response1;
                     });
                  });


              }
          }
          $scope.myfood={};
          $scope.description=[];
          $scope.getFood=function(){

              if($scope.myfood.food){
                    console.log($scope.myfood);
                    console.log($scope.myfood.food);
                      $soap.post(url1,'getBaike',{args0:$scope.myfood.food}).then(function(description){
                          console.log(description);

                          $scope.description.push(description);

                      });

              }

              $('.show1').hide();
              $('.show2').show();
          }
        $scope.get=function(){
            $scope.myfood.food="";
            $scope.description=[];
            $('.show2').hide();
            $('.show1').show();
        }

      $scope.health=function(){
          $state.go('tabsController.health');
      };
      $scope.evaluate=function(){
          $state.go('tabsController.evaluate');
      };
      $scope.clock=function(){
          $state.go('tabsController.clock');
      }
  })
  .controller('clockCtr',function($scope,$window,$state,$soap,$ionicHistory){
      $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $scope.responses_list=[];
      $scope.health_add=function(){
          $scope.responses_list.push({"text":$scope.health.input,"number":$scope.responses_list.length+1});
          $soap.post(url,'setHealthRemind',{args0:user.uid,args1:$scope.health.input}).then(function(response){
              console.log(response);

          });
          $scope.health.input="";

      }
      if($window.sessionStorage["user"]){
          var url="http://139.129.10.20:8080/axis2/services/SoulService";
          var user=JSON.parse($window.sessionStorage["user"]);
          $soap.post(url,'getHealthRemind',{args0:user.uid}).then(function(response1){
              var lrt=response1.split('。');
              for(var i=0;i<lrt.length;i++){
                  $scope.responses_list.push({"text":lrt[i],"number":i+1});
              }

          });
      }else{
          $scope.response1='您还未登录，请登录';
      }
      $scope.health=function(){
          $state.go('tabsController.health');
      };
      $scope.evaluate=function(){
          $state.go('tabsController.evaluate');
      };
      $scope.clock=function(){
          $state.go('tabsController.clock');
      }
  });
