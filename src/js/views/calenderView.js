import View from './views.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

/**

calendarView class extends the View class and is responsible for rendering the calendar,
handling events, and displaying the agenda for a selected date.
@class calendarView
@extends View
@property {HTMLElement} _parentElement - Parent element container for the agenda title.
@property {HTMLElement} _agendaList - Container element for the agenda list.
@property {HTMLElement} _date - Element to display the selected date.
@property {HTMLElement} _taskMenu - Container element for the task menu.
@property {HTMLElement} _calender - Calendar element.
*/

class calendarView extends View {
  _parentElement = document.querySelector('.agenda-title');
  _agendaList = document.querySelector('.agenda-list');
  _date = document.querySelector('.date');
  _taskMenu = document.querySelector('.task-menu');
  _calender = document.querySelector('.calendar');

  /**
Initializes and renders the calendar.
@function _showCalender
@private
*/

  _showCalender() {
    /**

Initializes the calendar element with options for the plugins, events, and layout.

@param {HTMLElement} calendarEl - The calendar element to be initialized.

@param {object} options - The options for the calendar.

@param {array} options.plugins - An array of plugins to be used in the calendar.

@param {string} options.initialView - The initial view of the calendar.

@param {array} options.events - An array of events to be displayed on the calendar.

@param {function} options.eventDidMount - A callback function that runs when an event is mounted.

@param {function} options.dateClick - A callback function that runs when a date is clicked.

@param {object} options.headerToolbar - An object containing the options for the header toolbar.
*/

    let calendar = this._calender;

    window.addEventListener('load', function () {
      const calendarEl = calendar;

      calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: 'http://localhost:8000/events', // API endpoint to fetch events from the backend

        eventDidMount: info => {
          const HTML = `<button class = "list-tab" data-date = ${info.event.startStr}> <a>View List</a> <i class="fa-solid fa-circle-info"></i></button>
          <button class = "delete-btn" data-date = ${info.event.startStr}  > <a>Delete List</a> <i class="fa-solid fa-circle-xmark"></i></button>`;
          info.el.insertAdjacentHTML('beforeend', HTML);
          info.el.addEventListener('click', handleButtonClick);

          function handleButtonClick(event) {
            const clickedElement = event.target.closest('.delete-btn');
            console.log(clickedElement);

            if (!clickedElement) {
              return;
            }

            const date = clickedElement.dataset.date;
            console.log(date);
            const events = info.view.calendar.getEvents();

            const eventToRemove = events.find(
              event => event.start.toISOString().substring(0, 10) === date
            );
            console.log(eventToRemove);
            console.log(events);

            if (eventToRemove) {
              eventToRemove.remove();
            }
          }
        },

        dateClick: function (info) {
          const existingEvent = calendar.getEvents().filter(function (event) {
            return event.start.toDateString() === info.date.toDateString();
          });

          if (existingEvent.length !== 0) {
            return;
          }

          const eventData = {
            title: 'Agenda',
            start: info.dateStr,
            end: info.dateStr,
          };

          console.log(eventData);
          calendar.addEvent(eventData);
        },

        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
        },
      });

      calendar.render();
    });
  }

  /**
Generates the markup for the agenda title.
@function _generateMarkUp
@private
@returns {string} - Generated markup for the agenda title.
*/

  _generateMarkUp() {
    return ` 
    <h1 class = "agenda-date" > Agenda for ${this._data.day} </h1>
    `;
  }

  /**
Adds a click event listener to the calendar and calls the handler function with the selected date.
@function addNewAgendaHandler
@param {function} handler - Function to be called when a date is selected.
*/

  addNewAgendaHandler(handler) {
    this._calender.addEventListener('click', function (e) {
      // Select daycontainer
      const daycontainer = e.target.closest('.fc-daygrid-day-top');
      if (!daycontainer) return;

      //Select date
      const dateEl = daycontainer.parentElement.parentElement.dataset.date;

      handler(dateEl);
    });
  }

  /**

Adds a click event listener to the calendar and calls the handler function with the selected date.
@function addSelectAgendaHandler
@param {function} handler - Function to be called when the view list button is clicked.
*/

  addSelectAgendaHandler(handler) {
    this._calender.addEventListener('click', function (e) {
      const listbtn = e.target.closest('.list-tab');

      if (!listbtn) return;

      //select date
      const date = listbtn.dataset.date;

      handler(date);
    });
  }

  addDeleteAgendaHandler(handler) {
    this._calender.addEventListener('click', function (e) {
      const deletebtn = e.target.closest('.delete-btn');

      if (!deletebtn) return;

      const date = deletebtn.dataset.date;

      handler(date);
    });
  }
}

export default new calendarView();
