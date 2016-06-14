/**
 * Created by chengaoxing on 16/4/24.
 */

angular.module('controllers.userCtr',['services'])
  .controller('userCtr',function ($scope,$http,$window,checkUser,$state,testService) {

    testService.HelloWorld().then(function(response){
        $scope.response = response;
    });

     /* $scope.login=function(){
          $state.go('tabsController.login');
      }

      if ($window.sessionStorage["user"]) {
          $scope.user = JSON.parse($window.sessionStorage["user"]);
          $scope.haslog=true;
      }else{
          $scope.user={
              'username':'请登录',
              'description': '您还未登录'
          }
      }



      /*var servurl='http://139.129.10.20:8080/Soul';
      $scope.regForm={};
      $scope.logForm={};
      $scope.message={};
      $scope.apper=false;
      $scope.haslog=false;
      if ($window.sessionStorage["user"]) {
          $scope.user = JSON.parse($window.sessionStorage["user"]);
          $scope.haslog=true;
      }else{
          $scope.description='';
          $scope.username='请登录';
      }
      $scope.regist=function(){
          var err=checkUser($scope.regForm,'signup');
          if(err){
              $scope.msg=err;
              $scope.appear=true;
          }else{
              var url=servurl+'/userRegister?account='+$scope.regForm.account+'&password='+$scope.regForm.password+'&username='+$scope.regForm.username;
              $http.post(url).success(function(data){
                  if(data.err){
                      $scope.msg=data.err.message;
                      $scope.appear=true;
                  }else{
                      $scope.msg='注册成功，请登陆';
                      $scope.appear=true;
                      $scope.logForm.account=$scope.regForm.account;
                      $scope.logForm.password=$scope.regForm.password;
                  }
              }).error(function(data){
                $scope.msg='未知错误，请重试';
                $scope.appear=true;
                });
          }
      };
      $scope.login=function(){
          var err=checkUser($scope.logForm,'signin');
          if(err){
              $scope.msg=err;
              $scope.appear=true;
          }else{
              var url=servurl+'/userLogin';
              $http.post(url,$scope.logForm.account,$scope.logForm.password).success(function(data){
                  if(data.err){
                      console.log(data.err.message);
                      $scope.msg=data.err.message;
                      $scope.appear=true;
                  }
                  else{
                      $scope.user=data.user;
                      $window.sessionStorage["user"] = JSON.stringify(user);
                  }
              }).error(function(data){
                  $scope.msg='未知错误，请重试';
                  $scope.appear=true;
              });
          }

      };*/


  })
  .controller('loginCtr',function($scope,$http,$window,$state,checkUser){
      var servurl='http://139.129.10.20:8080/Soul';
      $scope.account="123";
      $scope.password="123"
      $scope.message={};
      $scope.apper=false;
      $scope.login=function(){

          var err=checkUser($scope.logForm,'signin');
          if(err){
              $scope.msg=err;
              $scope.appear=true;

          }else{
              var url=servurl+'/userLogin';
              var postData = {text:'long blob of text'};

              var config = {params: {account: $scope.account,password:$scope.password}};


              $http.get('http://139.129.10.20:8080/Soul/userLogin',config).success(function(data){

                  if(data.err){
                      console.log(data.err.message);
                      $scope.msg=data.err.message;
                      $scope.appear=true;
                      alert($scope.msg);
                  }
                  else{

                      var user=data.user;
                      $window.sessionStorage["user"] = JSON.stringify(user);
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
  .controller('registCtr',function($scope,$http,checkUser){

      $scope.regForm={};
      $scope.message={};
      $scope.apper=false;
      $scope.regist=function(){
          var url=servurl+'/userRegister';
          var err=checkUser($scope.regForm,'signup');
          if(err){
              $scope.msg=err;
              $scope.appear=true;
          }else{
              var servurl='http://139.129.10.20:8080/Soul';
              var config = {params: {username:'haha', account:'111',password:'111'}};
              $http.get(url,config).success(function(data){
                  if(data.err){
                      alert(data)
                      $scope.msg=data.err.message;
                      $scope.appear=true;

                  }else{
                      $scope.msg='注册成功，请登陆';
                      $scope.appear=true;
                      $scope.regForm.account=$scope.regForm.account;
                      $scope.regForm.password=$scope.regForm.password;
                      $state.go('tabsController.login');
                  }
              }).error(function(data){
                $scope.msg='未知错误，请重试';
                alert($scope.msg);
                $scope.appear=true;
                });
          }
      };
  });
