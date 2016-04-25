var app = angular.module('Task2', []);

app.controller('BehindCurtain', ['$http', function($http){
  var vm = this;
  vm.taskList = [];
  vm.oneTask = {};
  vm.doneList = [];

  vm.getAll = function(){
    $http.get('/tasks').then(function(response){
      vm.taskList = response.data;
    });
  };

  vm.newTask = function(){
    vm.oneTask.task_status = false;
    $http.post('/tasks', {task_content: vm.oneTask.task_content, task_status: vm.oneTask.task_status, due_date: vm.oneTask.due_date})
    .then(function(serverResponse){
      console.log('newTask is working!' + serverResponse);
      vm.getAll();
    });

  };


  vm.beGone = function(id){
    $http.post('/tasks/remove', {id:id});
    vm.getAll();
  };

  vm.markDone = function(){
    if (vm.oneTask.task_status === false){
      vm.oneTask.task_status = true;
      console.log('task status changed to true/done');
    } else {
      vm.oneTask.task_status = false;
      console.log('task status changed to false/undone');
    }
  };

  vm.clear = function(){
    vm.taskContent = '';
  };

  vm.getAll();

}]); // :::::::::::::: close controller ::::::::::::::: //
