$(document).ready(onReady);

function onReady() {
    console.log ('linked jq'); 
    clickHandlers();
    refreshTasks()
}

function clickHandlers() {
    $('#submit').on('click', handleSubmit);
    $(document).on('click', '#delete', handleDelete);
    $(document).on('click', '.checkbox', handleDone);
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

function handleDelete(){
    console.log('Delete button clicked.');
    const taskId = $(this).parents('tr').data('task-id');
    console.log('in handleDelete()', taskId);
    //this is sweet alert, gods its cumbersome.
    Swal.fire({
      title: 'Are you sure you want to delete this task?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5A87DF',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
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
    });
}

function renderTasks(tasks){
  $('#taskOut').empty();
    for(let i = 0; i < tasks.length; i += 1) {
      let task = tasks[i];
      if (task.isDone === true){
        console.log('task.isDone === true');
        $('#taskOut').append(`
          <tr class="datarows" data-task-id="${task.id}">
            <td>
              <label class="container">
                <input type="checkbox" class="checkbox" checked="checked">
                <span class="checkmark"></span>
              </label>
            </td>
            <td>${task.task}</td>
            <td class=read>
            <button type="button" class="buttons" id="delete">Delete</button>
            </td>
          </tr>
        `);
      } else if (task.isDone === false) {
        console.log('task.isDone === false');
        $('#taskOut').append(`
          <tr class="datarows" data-task-id="${task.id}">
            <td>
              <label class="container">
                <input type="checkbox" class="checkbox">
                <span class="checkmark"></span>
              </label>
            </td>
            <td>${task.task}</td>
            <td class=read>
            <button type="button" class="buttons" id="delete">Delete</button>
            </td>
          </tr>
        `);
      }
    }
}

function handleDone() {
  const taskId = $(this).parents('tr').data('task-id');
  console.log('in updateisDone()', taskId);

    if ($(this).is(':checked')) {
      console.log("Checkbox is checked..");
      $.ajax({
        method: 'PUT',
        url: `/list/${taskId}`,       
      })
        .then(() => {
          // refreshTasks();
          console.log('PUT /tasks success');
        })
          .catch((err) => {
            console.log('PUT /tasks failed:', err);
          });
    } else {
      console.log("Checkbox is unchecked..")
    }
}
  