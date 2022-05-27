$(document).ready(onReady);

function onReady() {
    console.log ('linked jq'); 
    clickHandlers();
}

function clickHandlers() {
    $('#submit').on('click', handleSubmit);
    $(document).on('click', '.delete', handleDelete);
    $(document).on('click', '.done', handleDone);
    refreshTasks()
}

function handleSubmit(){
    console.log('Submit button clicked.');
    let task = {};
    task = $('#taskInput').val();
    addTask(task);
}

function addTask(taskToAdd){
    $.ajax({
        type: 'POST',
        url: '/list',
        data: taskToAdd,
        }).then(function(response) {
          console.log('Response from server.', response);
        }).catch(function(error) {
          console.log('Error in POST', error)
          alert('Unable to add task at this time. Please try again later.');
        });
}

function refreshTasks() {
    $.ajax({
      type: 'GET',
      url: '/list'
    }).then(function(response) {
      console.log(response);
      renderTasks(response);
    }).catch(function(error){
      console.log('error in GET', error);
    });
}

function handleDone(){
    console.log('Done button clicked.');
    // mark as done
    // delete check button 
}
function handleDelete(){
    console.log('Delete button clicked.');
    //delete tr
}

function renderTasks(tasks){
    // $('#taskOut').empty();

    for(let i = 0; i < tasks.length; i += 1) {
        let task = tasks[i];

    $('#taskOut').append(`
      <tr data-task-id="${task.id}">
        <td>${task.task}</td>
        <td class=read>
          ${task.isDone}
        <button type="button" class="done">✅</button>
        <button type="button" class="delete">❌</button>
        </td>
      </tr>
    `);
  }
}
