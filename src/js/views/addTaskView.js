import View from './views.js';

class addTaskView extends View {
  //Btn Elements
  _addTaskbtn = document.querySelector('.createTaskBtn');
  _form = document.querySelector('.form-submit-container');
  _parentElement = document.querySelector('.agenda');
  _submitBtn = document.querySelector('.submitbtn');
  _closeBtn = document.querySelector('.closeBtn');

  //Form Values
  _taskName = document.querySelector('.taskName');
  _taskDes = document.querySelector('.taskDescription');
  _taskDate = document.querySelector('.taskDate');
  _taskPriority = document.querySelector('.taskPriority');

  constructor() {
    super();
    this._openForm();
    this._closeform();
  }

  //*
  getTaskName() {
    const name = this._taskName.value;
    return name;
  }

  getTaskDate() {
    const dueDate = this._taskDate.value;
    return dueDate;
  }

  getTaskPriority() {
    const pritory = this._taskPriority.value;
    return pritory;
  }

  getTaskDescription() {
    const description = this._taskDes.value;
    return description;
  }

  _openForm() {
    this._addTaskbtn.addEventListener('click', this.toggleform.bind(this));
  }

  _closeform() {
    this._closeBtn.addEventListener('click', this.toggleform.bind(this));
  }

  toggleform() {
    this._form.classList.toggle('hidden');
  }

  addNewTaskHandler(handler) {
    this._submitBtn.addEventListener('click', function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new addTaskView();
