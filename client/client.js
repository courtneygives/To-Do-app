var app = angular.module('Task2', []);

app.controller('BehindCurtain', ['$http', function($http){
  var vm = this;
  vm.taskList = [];
  vm.oneTask = {};
  vm.listShow = false;

  vm.getAll = function(){
    $http.get('/tasks').then(function(response){
      vm.taskList = response.data;
    });
  };

  vm.newTask = function(){

    $http.post('/tasks', {task_content: vm.oneTask.task_content, task_status: vm.oneTask.task_status, due_date: vm.oneTask.due_date})
    .then(function(serverResponse){
      console.log('newTask message: ' + serverResponse);
      vm.listShow = true;
      vm.getAll();
    });

  };


  vm.beGone = function(){

  };

  vm.markDone = function(){

  };

  vm.clear = function(){
    vm.taskContent = '';
  };

  vm.getAll();

}]); // :::::::::::::: close controller ::::::::::::::: //
