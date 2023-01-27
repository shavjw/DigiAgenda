import View from './views';

class taskViews extends View {
  _parentElement = document.querySelector('.agenda-list');

  _generateMarkUp() {
    console.log(this._data);

    return this._data
      .map(
        task =>
          `<li class="task ${task.completed ? 'completed' : ''}" data-id= ${
            task.id
          } >       
          
          <div class="task-info">
            <h4 class="inputName">${
              task.name
            } <span><i class="fa-solid fa-circle-info"></i></span></h4>
           
            <p class ="inputDate">Due Date: <span class ="date">${
              task.date
            }</span></p>

          <p class= "PriorityInput">Priority:  <span class = "${
            task.priority === 'Urgent'
              ? 'urgent'
              : task.priority === 'Very Important'
              ? 'vryImp'
              : task.priority === 'Important'
              ? 'important'
              : task.priority === 'Not Important'
              ? 'ntImp'
              : ''
          } priority" >   ${task.priority}  </span> 
          </p>
          
        </div>

        <div class ="task-status">
        <p class = "status">${
          task.completed
            ? 'Completed <i class="fa-solid fa-square-check"></i>'
            : 'Pending <i class="fa-solid fa-circle-xmark"></i> '
        }</p>
        </div>

        <div class = "task-controls">
        <button class="checkmarkBtn "><i class= " fa-solid fa-circle 
        " ></i></button>
        <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>`
      )
      .join('');
  }

  deleteTaskHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const deletebtn = e.target.closest('.deleteBtn');
      if (!deletebtn) return;

      const id = deletebtn.parentElement.parentElement.dataset.id;
      console.log(id);

      const task = deletebtn.parentElement.parentElement;
      task.remove(task);

      handler(id);
    });
  }

  editTaskHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const editbtn = e.target.closest('.checkmarkBtn');
      if (!editbtn) return;

      const id = editbtn.parentElement.parentElement.dataset.id;
      console.log(id);

      handler(id);
    });
  }
}

export default new taskViews();
