import View from './views.js';

class taskMenuView extends View {
  _taskMenu = document.querySelector('.task-menu');
  _report = document.getElementById('progress');
  _reportMessageBox = document.querySelector('.report-message-box');
  _agendaList = document.querySelector('.agenda-list');
  _agendaTitle = document.querySelector('.agenda-title');
  _closebutton = document.querySelector('.close-agenda-btn');
  _removeAllbtn = document.querySelector('.removeAllTask-btn');
  _sortValues = document.querySelector('#SortOptions');
  _filterMenuBtn = document.querySelector('.filterMenubtn');
  _filterMenu = document.querySelector('.filterMenu');

  //FilterValues
  _filterValue = document.querySelectorAll('.filterValue');
  _statusFilterValue = document.querySelector('.statusValue');
  _filterBtns = document.querySelectorAll('.filterBtns');
  _clearAllFilterBtn = document.querySelector('.clearAllFilterbtn');

  //FilterValueBtns
  _urgentFilterValue = document.querySelector('#urgent');
  _vryImportantFilterValue = document.querySelector('#vryImportant');
  _importantFilterValue = document.querySelector('#important');
  _ntFilterValue = document.querySelector('#ntimportant');

  constructor() {
    super();
    this._closeAgenda();
    this.showFilterMenu();
  }

  //Task Control Functions : Handles DOM Elements
  _closeAgenda() {
    this._closebutton.addEventListener('click', this.clearAgenda.bind(this));
  }

  clearAgenda() {
    this._agendaTitle.innerHTML = '';
    this._agendaList.innerHTML = '';
    this._report.innerHTML = '';
    this._reportMessageBox.innerHTML = '';
    this._taskMenu.classList.add('hidden');
  }

  showTaskControls() {
    this._taskMenu.classList.remove('hidden');
  }

  clearList() {
    this._agendaList.innerHTML = ' ';
  }

  removeTaskHandler(handler) {
    this._removeAllbtn.addEventListener('click', function () {
      handler();
    });
  }

  sortListHandler(handler) {
    const sortValues = this._sortValues;
    this._sortValues.addEventListener('change', function () {
      const value = sortValues.value;

      handler(value);
    });
  }

  //Filter Event Listeners : Handles HTML Input for Filter Values
  showFilterMenu() {
    this._filterMenuBtn.addEventListener(
      'click',
      this.toggleFilterMenu.bind(this)
    );
  }

  toggleFilterMenu() {
    this._filterMenu.classList.toggle('hidden');
  }

  addUrgentFilterListHander(handler) {
    const urgentValue = this._urgentFilterValue;
    this._urgentFilterValue.addEventListener('change', function () {
      const value = urgentValue.value;

      if (urgentValue.checked) {
        handler(value);
      }
    });
  }

  addVryImportantFilterListHander(handler) {
    const vryimportantValue = this._vryImportantFilterValue;
    this._vryImportantFilterValue.addEventListener('change', function () {
      const value = vryimportantValue.value;

      if (vryimportantValue.checked) {
        handler(value);
      }
    });
  }

  addImportantFilterListHander(handler) {
    const importantValue = this._importantFilterValue;
    this._importantFilterValue.addEventListener('change', function () {
      const value = importantValue.value;

      if (importantValue.checked) {
        handler(value);
      }
    });
  }

  addNotImportantFilterListHander(handler) {
    const ntImportantValue = this._ntFilterValue;
    this._ntFilterValue.addEventListener('change', function () {
      const value = ntImportantValue.value;

      if (ntImportantValue.checked) {
        handler(value);
      }
    });
  }

  addCompleteFilterHandler(handler) {
    const statusValue = this._statusFilterValue;
    this._statusFilterValue.addEventListener('change', function () {
      const value = statusValue.value;
      if (statusValue.checked) {
        handler(value);
      }
    });
  }

  deleteCompleteFilterHandler(handler) {
    const statusValue = this._statusFilterValue;
    this._statusFilterValue.addEventListener('change', function () {
      if (statusValue.checked === false) {
        handler();
      }
    });
  }

  deleteAllFilters(handler) {
    const filterBtns = this._filterBtns;
    this._clearAllFilterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      filterBtns.forEach(btn => {
        btn.checked = false;
      });
      handler();
    });
  }

  deleteFilterListHander(handler) {
    this._filterValue.forEach(filterValue =>
      filterValue.addEventListener('change', function () {
        const value = filterValue.value;

        if (filterValue.checked === false) {
          handler(value);
        }
      })
    );
  }

  //Handle Filter Errors
  renderUrgentFilterError(err) {
    this.renderErrorMessage(err);
    this._urgentFilterValue.checked = false;
  }

  renderVeryImporantFilterError(err) {
    this.renderErrorMessage(err);
    this._vryImportantFilterValue.checked = false;
  }

  renderImporantFilterError(err) {
    this.renderErrorMessage(err);
    this._importantFilterValue.checked = false;
  }

  renderNotImportantFilterError(err) {
    this.renderErrorMessage(err);
    this._ntFilterValue.checked = false;
  }

  renderCompleteFilterError(err) {
    this.renderErrorMessage(err);
    this._statusFilterValue.checked = false;
  }
}

export default new taskMenuView();
