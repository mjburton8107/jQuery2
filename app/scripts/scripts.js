
$(document).ready(function(){

  // var listo = [];

  var listo = JSON.parse(localStorage.getItem('tasks')) || []
  console.log("this is listo", listo)
  listo.forEach(function(item) {
    var test = '#newList';
    if(item.id === 'inProgress') {
      test = '#currentList';
    }
    if (item.id === 'archived') {
      test = '#archivedList'
    }
    $(test).append(
      '<a href="#finish" class="" id="item">' +
                  '<li class="list-group-item">' +
                  '<h3>' + item.task + '</h3>'+
                  '<span class="arrow pull-right">' +
                  '<i class="glyphicon glyphicon-arrow-right">' +
                  '</span>' +
                  '</li>' +
                  '</a>'
    );
  })

  var Task = function(task){
    this.task = task;
    this.id = 'new';
  }

  var advanceTask = function(task) {
  var modified = task.innerText.trim().toLowerCase()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
        localStorage.setItem('tasks', JSON.stringify(listo));
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
        localStorage.setItem('tasks', JSON.stringify(listo));
      } else {
        listo.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(listo));
      }
      break;
    }
  }

  task.remove();
};

$(document).on('click', '#item', function(e) {
    e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
});

$(document).on('click', '#inProgress', function (e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});


  $('#newTaskForm').hide();

  var addTask = function(task){
    if(task){
      task = new Task(task);
      listo.push(task);
      localStorage.setItem('tasks', JSON.stringify(listo));

      $('#newItemInput').val('');

       $('#newList').append(
         '<a href="#finish" class="" id="item">' +
                     '<li class="list-group-item">' +
                     '<h3>' + task.task + '</h3>'+
                     '<span class="arrow pull-right">' +
                     '<i class="glyphicon glyphicon-arrow-right">' +
                     '</span>' +
                     '</li>' +
                     '</a>'
       );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  //open form
  $('#add-todo').on('click', function(){
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  //close form
  $('#cancel').on('click', function(e){
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

// localStorage.setItem('listo');

})
