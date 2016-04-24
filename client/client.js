var app = angular.module('Task2', []);

app.controller('BehindCurtain', ['$http', function($http){
  var vm = this;
  vm.taskList = [];
  vm.oneTask = {};
  // vm.taskContent = '';
  vm.listShow = false;

  vm.getAll = function(){
    $http.get('/tasks').then(function(response){
      vm.taskList = response.data;
    });
  };

  vm.newTask = function(){

    $http.post('/tasks', {task_text: vm.taskContent})
    .then(function(serverResponse){
      console.log('newTask message: ' + serverResponse);
      vm.listShow = true;
      vm.getAll();
    });

  };

//   [{"id":101,"task_text":"Buy a trampoline"}]
//   INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)
// { {;INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)}* ;}

  vm.beGone = function(){

  };

  vm.markDone = function(){

  };

  vm.clear = function(){
    vm.taskContent = '';
  };

  vm.getAll();

}]); // :::::::::::::: close controller ::::::::::::::: //
