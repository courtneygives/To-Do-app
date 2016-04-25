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

  // vm.checkedStatus = false;

  vm.beGone = function(id){
    $http.post('/tasks/remove', {id:id});
    vm.getAll();
  };

  vm.update = function(item){
    $http.put('/tasks/' + item.id, {task_content: item.task_content, task_status: item.task_status, id:item.id}).then(function(response){
      vm.getAll();
    });
  };

  vm.clear = function(){
    vm.oneTask = {};
  };

  vm.getAll();

}]); // :::::::::::::: close controller ::::::::::::::: //
