$(document).ready(onReady);

function onReady() {
    console.log ('linked jq'); 
    clickHandlers();
    refreshTasks()
}

function clickHandlers() {
    $('#submit').on('click', handleSubmit);
    $(document).on('click', '.delete', handleDelete);
    $(document).on('click', '.done', handleDone);
}

function handleSubmit(){
    console.log('Submit button clicked.');
    let task = {};
    task.task = $('#taskInput').val();
    addTask(task);
}

function addTask(task){
    $.ajax({
        type: 'POST',
        url: '/list',
        data: task,
        }).then(function(response) {
          console.log('Response from server.', response);
          refreshTasks();
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
    //update true in database
    // delete check button 
}
function handleDelete(){
    console.log('Delete button clicked.');
    const taskId = $(this).parents('tr').data('task-id');
    console.log('in handleDelete()', taskId);
  $.ajax({
      method: 'DELETE',
      url: `/list/${taskId}`,       
  })
      .then(() => {
        refreshTasks();
        console.log('DELETE success');
      })
      .catch((err) => {
          alert('Failed to delete.');
          console.log('DELETE failed:', err);
      });
}

function renderTasks(tasks){
    $('#taskOut').empty();

    for(let i = 0; i < tasks.length; i += 1) {
        let task = tasks[i];

    $('#taskOut').append(`
      <tr data-task-id="${task.id}">
        <td>${task.task}</td>
        <td class=read>
        <button type="button" class="done">✅</button>
        <button type="button" class="delete">❌</button>
        </td>
      </tr>
    `);
  }
}
