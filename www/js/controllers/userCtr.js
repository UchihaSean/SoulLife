/**
 * Created by chengaoxing on 16/4/24.
 */

angular.module('controllers.userCtr',['services'])
  .controller('userCtr',function ($scope,$http,$window,checkUser,$state,testService) {

    /*testService.GetReport('13302010055@fudan.edu.cn',25).then(function(response){
        console.log("response");
        $scope.response = response;
    });*/
    $scope.set=function(){
        $state.go('tabsController.set');
    }
    $scope.login=function(){
          $state.go('tabsController.login');
      }
    $scope.out=function(){
        $window.sessionStorage["user"]="";
        $scope.user={
            'username':'请登录',
            'description': '您还未登录'
        }
    }

      if ($window.sessionStorage["user"]) {
          $scope.user = JSON.parse($window.sessionStorage["user"]);
          $scope.haslog=true;
          console.log($scope.user);
          if($scope.user.description==""){
              //alert();
              $scope.user.description='这家伙很懒，什么都没写';
          }
          console.log($scope.user.description);
      }else{
          $scope.user={
              'username':'请登录',
              'description': '您还未登录'
          }
      }

  })
  .controller('setCtr',function($scope,$state,$http,$window,$ionicPopup){
      if($window.sessionStorage["user"]){

          $scope.setForm=JSON.parse($window.sessionStorage["user"]);
          if($scope.setForm.gender==0){
              $scope.setForm.sex="女";
          }else{
              $scope.setForm.sex="男";
          }
          console.log($scope.setForm);
          $scope.myset=function(){
              var sex=0;
              var servurl='http://139.129.10.20:8080/Soul/userUpdate';
              if($scope.setForm.sex=='男'){
                  sex=1;
              }
              var config={params: {uid:$scope.setForm.uid,height:$scope.setForm.height,weight:$scope.setForm.weight,age:$scope.setForm.age,gender:sex,description:$scope.setForm.description}};
              $http.get(servurl,config).success(function(data){

                  if(data.err){
                      console.log(data.err);
                  }else{
                      console.log(data);
                      //$scope.setForm=data.user;
                      $window.sessionStorage["user"] = JSON.stringify(data.user);
                      $state.go('tabsController.user');
                  }

              }).error(function(data){

                  console.log(data);
                  $scope.msg='未知错误，请重试';
                  //$scope.appear=true;

              });
          };
      }else{
          $ionicPopup.alert({
              title: '请登录',
              template: '您还未登录请登录'
          }).then(function(res) {
             $state.go('tabsController.login');
          });

      }


  })
  .controller('loginCtr',function($scope,$http,$window,$state,checkUser){
      var servurl='http://139.129.10.20:8080/Soul';
      $scope.logForm={};
      $scope.message={};
      $scope.apper=false;
      $scope.login=function(){


          var err=checkUser($scope.logForm,'signin');
          if(false){
              $scope.msg=err;
              $scope.appear=true;

          }else{
              var url=servurl+'/userLogin';
              var postData = {text:'long blob of text'};
              var config;
              //$scope.$apply(function() {
                  config = {params: {account: $scope.logForm.account,password:$scope.logForm.password}};
              $http.get('http://139.129.10.20:8080/Soul/userLogin',config).success(function(data){

                  if(data.err){
                      console.log(data.err.message);
                      $scope.msg=data.err.message;
                      $scope.appear=true;
                      alert($scope.msg);
                  }
                  else{
                      console.log(data.user);
                      $window.sessionStorage["user"] = JSON.stringify(data.user);
                      $state.go('tabsController.user');
                  }
              }).error(function(data){
                  $scope.msg='未知错误，请重试';
                  $scope.appear=true;

              });
          }

      };

      $scope.regist=function(){
          $state.go('tabsController.regist');
      }

  })
  .controller('registCtr',function($scope,$http,$state,checkUser){

      $scope.regForm={};
      $scope.message={};
      $scope.apper=false;
      $scope.regist=function(){

          var err=checkUser($scope.regForm,'signup');
          if(err){
              $scope.msg=err;
              $scope.appear=true;
          }else{
              var servurl='http://139.129.10.20:8080/Soul/userRegister';
              var config = {params: {username:$scope.regForm.username, account:$scope.regForm.account,password:$scope.regForm.password}};
              $http.get(servurl,config).success(function(data){
                  console.log(data);
                  console.log($scope.regForm);
                  if(data.err){
                      alert(data)
                      $scope.msg=data.err.message;
                      $scope.appear=true;

                  }else{
                      $scope.msg='注册成功，请登陆';
                      $scope.appear=true;
                      $state.go('tabsController.login');
                      //console.log($scope.regForm);
                      //console.log();
                  }
              }).error(function(data){
                $scope.msg='未知错误，请重试';
                alert($scope.msg);
                $scope.appear=true;
                });
          }
      };
  });
