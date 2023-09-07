'strict mode';

import * as model from './model.js';
import weatherView from './views/weatherView.js';
import calenderView from './views/calenderView.js';
import addTaskView from './views/addTaskView.js';
import taskView from './views/taskView.js';
import reportView from './views/reportView.js';
import quoteView from './views/quoteView.js';
import taskMenuview from './views/taskMenuview.js';

const controlQuote = async function () {
  try {
    await model.loadQuote();

    quoteView.render(model.state.quote);
  } catch (err) {
    console.log(`${err}`);
  }
};

const controlWeather = async function () {
  try {
    await model.loadWeatherData();

    weatherView.render(model.state.weather);
  } catch (err) {
    console.log(`${err}`);
  }
};

const controlAddNewList = function (date) {
  try {
    model.createNewList(date);

    calenderView.renderErrorMessage(`List has been created for ${date}`);

    calenderView.render(model.state.agenda);

    taskView.render(model.state.agenda.list);

    model.loadReportData();
    reportView.loadProgressReport(model.state.agenda.report.progress);

    model.loadReportMessage();
    reportView.render(model.state.agenda.report);

    taskMenuview.showTaskControls();
  } catch (err) {
    calenderView.renderErrorMessage(err);
  }
};

const controlDeleteList = function (date) {
  try {
    model.deleteList(date);

    taskMenuview.clearAgenda();
  } catch (err) {
    calenderView.renderErrorMessage(err);
  }
};

const controlSelectList = function (date) {
  model.selectList(date);

  calenderView.render(model.state.agenda);
  taskView.render(model.state.agenda.list);

  reportView.loadProgressReport(model.state.agenda.report.progress);

  model.loadReportMessage();
  reportView.render(model.state.agenda.report);

  taskMenuview.showTaskControls();
};

const controlAddNewTask = function () {
  const date = addTaskView.getTaskDate();
  const name = addTaskView.getTaskName();
  const priority = addTaskView.getTaskPriority();
  const description = addTaskView.getTaskDescription();

  model.addnewTask(name, description, date, priority);

  taskView.render(model.state.agenda.list);

  reportView.loadProgressReport(model.state.agenda.report.progress);

  model.loadReportMessage();
  reportView.render(model.state.agenda.report);
};

const controlDeleteTask = function (id) {
  model.deleteTask(id);

  reportView.loadProgressReport(model.state.agenda.report.progress);

  model.loadReportMessage();
  reportView.render(model.state.agenda.report);
};

const controlDeleteAllTask = function () {
  try {
    model.deleteAllTask();

    taskMenuview.clearList();

    reportView.loadProgressReport(model.state.agenda.report.progress);

    model.loadReportMessage();

    reportView.render(model.state.agenda.report);
  } catch (err) {
    taskMenuview.renderErrorMessage(err);
  }
};

const controlSortList = function (sortType) {
  try {
    const sortedList = model.sortList(sortType);

    taskView.render(sortedList);
  } catch (err) {
    taskMenuview.renderErrorMessage(err);
  }
};

const controlPriorityAddFilter = function (priority) {
  try {
    model.addPriorityFilter(priority);

    const filteredList = model.multfilter(model.state.agenda.list, [
      ...model.state.agenda.pritorityFilters,
      ...model.state.agenda.statusFilters,
    ]);

    taskView.render(filteredList);
  } catch (err) {
    if (priority === 'Urgent') {
      taskMenuview.renderUrgentFilterError(err);
    }

    if (priority === 'Very Important') {
      taskMenuview.renderVeryImporantFilterError(err);
    }

    if (priority === 'Important') {
      taskMenuview.renderImporantFilterError(err);
    }

    if (priority === 'Not Important') {
      taskMenuview.renderNotImportantFilterError(err);
    }
  }
};

const controlCompletedAddFilter = function (status) {
  try {
    model.addStatusFilter(status);

    const filteredList = model.multfilter(model.state.agenda.list, [
      ...model.state.agenda.pritorityFilters,
      ...model.state.agenda.statusFilters,
    ]);

    taskView.render(filteredList);
  } catch (err) {
    taskMenuview.renderCompleteFilterError(err);
  }
};

const controlDeletePritorityFilter = function (priority) {
  if (model.state.agenda.pritorityFilters.includes(priority)) {
    model.deletePritorityFilter(priority);

    const filteredList = model.multfilter(model.state.agenda.list, [
      ...model.state.agenda.pritorityFilters,
      ...model.state.agenda.statusFilters,
    ]);

    taskView.render(filteredList);
  }
};

const controlDeleteAllFilter = function () {
  model.deleteAllFilters();

  taskView.render(model.state.agenda.list);
};

const controlCompleteDeleteFilter = function () {
  model.deleteStatusFilter();

  const filteredList = model.multfilter(model.state.agenda.list, [
    ...model.state.agenda.pritorityFilters,
    ...model.state.agenda.statusFilters,
  ]);

  taskView.render(filteredList);
};

const controlEditTask = function (id) {
  try {
    model.editTask(id);

    model.loadReportMessage();
    reportView.render(model.state.agenda.report);

    reportView.loadProgressReport(model.state.agenda.report.progress);

    taskView.render(model.state.agenda.list);
  } catch (err) {
    taskView.renderErrorMessage(err);
  }
};

const init = function () {
  //API Controls
  quoteView.addQuoteHandler(controlQuote);
  weatherView.addWeatherHandlerRendler(controlWeather);

  //Calender Controls
  calenderView._showCalender();
  calenderView.addNewAgendaHandler(controlAddNewList);
  calenderView.addSelectAgendaHandler(controlSelectList);
  calenderView.addDeleteAgendaHandler(controlDeleteList);

  //Task Controls
  addTaskView.addNewTaskHandler(controlAddNewTask);
  taskView.deleteTaskHandler(controlDeleteTask);
  taskView.editTaskHandler(controlEditTask);
  taskMenuview.sortListHandler(controlSortList);
  taskMenuview.removeTaskHandler(controlDeleteAllTask);

  //Add Filter Controls
  taskMenuview.addUrgentFilterListHander(controlPriorityAddFilter);
  taskMenuview.addVryImportantFilterListHander(controlPriorityAddFilter);
  taskMenuview.addImportantFilterListHander(controlPriorityAddFilter);
  taskMenuview.addNotImportantFilterListHander(controlPriorityAddFilter);
  taskMenuview.addCompleteFilterHandler(controlCompletedAddFilter);

  //Delete Filter Controls
  taskMenuview.deleteFilterListHander(controlDeletePritorityFilter);
  taskMenuview.deleteCompleteFilterHandler(controlCompleteDeleteFilter);
  taskMenuview.deleteAllFilters(controlDeleteAllFilter);
};

init();
