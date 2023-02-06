import { getJSON, findINDEX } from './helpers.js';
import { QUOTE_API_URL, WEATHER_API_URL } from './config.js';

/**

@module state
@typedef {Object} State
@property {Object} agenda - Object containing information about the current agenda, including the date, task list, completed tasks, and report details
@property {Array} database - Array of all agendas created
@property {Object} weather - Object containing information about the current weather
@property {Object} quote - Object containing a quote and its author
*/

export const state = {
  agenda: {},
  database: [],
  weather: {},
  quote: {},
};

/**

Retrieves a quote from the specified API and updates the state

@async

@throws {Error} if there is a problem fetching the data
*/

export const loadQuote = async function () {
  try {
    const data = await getJSON(QUOTE_API_URL);

    state.quote = {
      quote: data.quote,
      author: data.author,
    };
  } catch (err) {
    throw err;
  }
};

/**

Retrieves weather data from the specified API using the user's current location and updates the state

@async

@throws {Error} if there is a problem fetching the data or accessing the user's location
*/

export const loadWeatherData = async function () {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const data = await getJSON(WEATHER_API_URL(latitude, longitude));
    console.log(data);

    state.weather = {
      city: data.name,
      maintemp: data.main.temp,
      description: data.weather[0].main,
      maxtemp: data.main.temp_max,
      mintemp: data.main.temp_min,
    };
  } catch (err) {
    throw err;
  }
};

/**

Creates a new task list for the specified date and adds it to the state

@param {string} date - The date the task list is associated with

@throws {Error} if a task list for the specified date already exists
*/
export const createNewList = function (date) {
  try {
    if (state.database.find(list => list.day === date)) {
      throw new Error('List has already been created');
    }

    state.agenda = {
      day: date,
      list: [],
      completed: [],

      pritorityFilters: [],
      statusFilters: [],
      report: {
        progress: '',
        message: '',
        numOfTask: '',
        comOfTask: '',
      },
    };

    state.database.push(state.agenda);
  } catch (err) {
    throw err;
  }
};

/**
*

@param {string} date - The date of the list to be selected
This function selects the list with the given date
*/

export const selectList = function (date) {
  const index = findINDEX(state.database, list => list.day === date);
  state.agenda = state.database[index];
};

/**
*

@param {string} name - The name of the task
@param {string} description - The description of the task
@param {string} date - The date of the task
@param {string} priority - The priority of the task
This function adds a new task to the current list with the given name, description, date, and priority
*/

export const addnewTask = function (name, description, date, priority) {
  const task = {
    id: Math.floor(Math.random() * 100),
    name: name,
    description: description,
    date: date,
    priority: priority,
    completed: false,
    created: `${new Date()}`,
  };

  state.agenda.list.push(task);

  state.agenda.report.progress =
    ((state.agenda.completed.length / state.agenda.list.length) * 100) / 100;
};

/**
*

@param {number} id - The id of the task to be deleted
This function deletes the task with the given id from the current list
*/
export const deleteTask = function (id) {
  const index = findINDEX(state.agenda.list, task => task.id === Number(id));
  const completeindex = findINDEX(
    state.agenda.completed,
    task => task.id === Number(id)
  );

  state.agenda.list.splice(index, 1);
  state.agenda.completed.splice(completeindex, 1);

  state.agenda.report.progress =
    ((state.agenda.completed.length / state.agenda.list.length) * 100) / 100;

  if (state.agenda.list.length === 0) {
    state.agenda.report.progress = 0;
  }
};

/**

Deletes all tasks in the current agenda's list and completed list

@throws Will throw an error if no task has been added yet
*/

export const deleteAllTask = function () {
  try {
    if (state.agenda.list.length === 0) {
      throw new Error(`No task has been added yet`);
    }

    state.agenda.list.splice(0, state.agenda.list.length);
    state.agenda.completed.splice(0, state.agenda.completed.length);

    state.agenda.report.progress =
      ((state.agenda.completed.length / state.agenda.list.length) * 100) / 100;

    if (state.agenda.list.length === 0) {
      state.agenda.report.progress = 0;
    }
  } catch (err) {
    throw err;
  }
};

/**

Deletes all status filters in the current agenda's statusFilters array
*/
export const deleteStatusFilter = function () {
  const findStatus = findINDEX(
    state.agenda.statusFilters,
    filter => filter === true
  );

  state.agenda.statusFilters.splice(
    findStatus,
    state.agenda.statusFilters.length
  );
};

/**

@function
@param {string} priority - The priority value of the task that needs to be removed from the priority filter.
This function is used to remove a priority filter from the list of filters. It finds the index of the filter in the priorityFilters array and removes it.
It also applies the remaining filters on the task list and logs the filtered list.
*/
export const deletePritorityFilter = function (priority) {
  const filterValue = findINDEX(
    state.agenda.pritorityFilters,
    filterValue => filterValue === priority
  );

  state.agenda.pritorityFilters.splice(filterValue, 1);
};

/**

@function
This function is used to remove all filters from the list of filters. It removes all elements from the priorityFilters and statusFilters arrays.
It also applies the remaining filters on the task list and logs the filtered list.
*/
export const deleteAllFilters = function () {
  state.agenda.pritorityFilters.splice(0, state.agenda.pritorityFilters.length);

  state.agenda.statusFilters.splice(0, 1);
};

/**
*

@function

@param {string} status - The status of the task that needs to be filtered

@throws Will throw an error if no task has the status specified

The function takes in the status of the task that needs to be filtered, it checks if there is any task with the specified status, if not it throws an error.

It pushes the status of the task to the array of status filters, and also filters the list based on the filters applied.
*/

export const addStatusFilter = function (status) {
  try {
    const findStatus = state.agenda.list.find(task => task.completed === true);
    if (!findStatus) {
      throw new Error(`No task have been ${status} in this list`);
    }

    if (status === 'Completed') {
      state.agenda.statusFilters.push(true);
    }
  } catch (err) {
    throw err;
  }
};

/**
*

@function

@param {string} priority - The priority of the task that needs to be filtered

@throws Will throw an error if no task has the priority specified

@throws Will throw an error if filter is not applicable

The function takes in the priority of the task that needs to be filtered, it checks if there is any task with the specified priority, if not it throws an error.

It pushes the priority of the task to the array of priority filters, also filters the list based on the filters applied.

If no task is found based on the filter, it will throw an error.
*/

export const addPriorityFilter = function (priority) {
  try {
    const status = state.agenda.list.find(task => task.priority === priority);

    const statusPrio = findINDEX(
      state.agenda.pritorityFilters,
      filterValue => filterValue === priority
    );

    if (!status) {
      throw new Error(
        `No task with the status ${priority} is found in this list`
      );
    }

    state.agenda.pritorityFilters.push(priority);

    const filteredList = multfilter(state.agenda.list, [
      ...state.agenda.pritorityFilters,
      ...state.agenda.statusFilters,
    ]);

    if (filteredList.length === 0) {
      state.agenda.pritorityFilters.splice(statusPrio, 1);

      throw new Error(`Filter Not Applicable`);
    }
  } catch (err) {
    throw err;
  }
};

/**

@function sortList
@param {string} type - type of sorting to be done
@throws {Error} if filtered list is empty
@returns {Array} - sorted array of filtered list
*/

export const sortList = function (type) {
  try {
    const filteredList = multfilter(state.agenda.list, [
      ...state.agenda.pritorityFilters,
      ...state.agenda.statusFilters,
    ]);

    if (filteredList.length === 0) {
      throw new Error('No task has been added yet');
    }

    if (type === 'date') {
      const sortByDate = [...filteredList].sort((a, b) => {
        let x = new Date(a.date),
          y = new Date(b.date);
        return y - x;
      });
      return sortByDate;
    }

    if (type === 'none') {
      const originalArray = filteredList;

      return originalArray;
    }
  } catch (err) {
    throw err;
  }
};

/**

@function multfilter
@param {Array} array - array to be filtered
@param {Array} filters - array of filters to be applied
@returns {Array} - filtered array of tasks
*/

export const multfilter = function (array, filters) {
  const result = array.filter(task => {
    const pritorityFilter =
      state.agenda.pritorityFilters.includes(task.priority) ||
      state.agenda.pritorityFilters.length === 0;
    const statusFilter =
      state.agenda.statusFilters.includes(task.completed === true) ||
      state.agenda.statusFilters.length === 0;

    return pritorityFilter && statusFilter;
  });

  return result;
};

/**

@function editTask
@param {Number} id - Id of the task to be edited
@description Edit a task by toggling its completed status and moving it between the list of completed and non-completed tasks
*/

export const editTask = function (id) {
  try {
    const index = findINDEX(state.agenda.list, task => task.id === Number(id));
    const completeindex = findINDEX(
      state.agenda.completed,
      task => task.id === Number(id)
    );

    // add 'checked' property to task
    state.agenda.list[index].completed = !state.agenda.list[index].completed;

    // add 'checked' task to completed list
    if (state.agenda.list[index].completed) {
      state.agenda.completed.push(state.agenda.list[index]);
    } else {
      state.agenda.completed.splice(completeindex, 1);
    }

    loadReportData();
  } catch (err) {
    throw err;
  }
};

/**

@function loadReportMessage
@description Determine the appropriate message to display in the report based on the progress of the task list
*/

export const loadReportMessage = function () {
  if (state.agenda.report.progress === 0) {
    state.agenda.report.message = 'No progress has been made';
  }

  if (state.agenda.report.progress > 0 && state.agenda.report.progress < 0.5) {
    state.agenda.report.message = 'Progress has been made';
  }

  if (
    state.agenda.report.progress >= 0.5 &&
    state.agenda.report.progress < 0.75
  ) {
    state.agenda.report.message = ' Your halfway there! keep up the great work';
  }

  if (
    state.agenda.report.progress >= 0.75 &&
    state.agenda.report.progress < 1
  ) {
    state.agenda.report.message =
      ' Your almost done all your tasks for the day! Keep up the great work';
  }
  if (state.agenda.report.progress === 1) {
    state.agenda.report.message = ' Your all done!';
  }

  state.agenda.report.numOfTask = state.agenda.list.length;
  state.agenda.report.comOfTask = state.agenda.completed.length;
};

/**

Loads the report data for the current agenda and updates the state with the progress percentage.
If the progress percentage is not a number, it will be set to 0.
*/

export const loadReportData = function () {
  state.agenda.report.progress =
    ((state.agenda.completed.length / state.agenda.list.length) * 100) / 100;
  if (isNaN(state.agenda.report.progress)) state.agenda.report.progress = 0;
};
