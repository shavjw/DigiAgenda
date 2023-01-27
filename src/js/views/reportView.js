import View from './views.js';
var ProgressBar = require('progressbar.js');

/**

ReportView class extends the View class and is responsible for rendering the progress report
and handling the report message.
@class ReportView
@extends View
@property {HTMLElement} _parentElement - Parent element container for the progress report and message.
*/

class ReportView extends View {
  _parentElement = document.querySelector('.report-message-box');

  /**

Renders the progress report using the ProgressBar library.
@function loadProgressReport
@param {object} data - Data containing the progress percentage and the number of tasks.
*/

  loadProgressReport(data) {
    const container = document.getElementById('progress');

    container.innerHTML = ' ';

    var bar = new ProgressBar.Circle(container, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false,
      },
      from: { color: '#F4E053', width: 2 },
      to: { color: '#5fb017', width: 6 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100) + '%';
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      },
    });
    bar.text.style.fontSize = '2em';
    bar.text.style.fontFamily = 'Lato';
    bar.text.style.color = '#f4f4f4';

    bar.animate(data); // Number from 0.0 to 1.0
  }

  /**
Generates the markup for the progress report and message.
@function _generateMarkUp
@private
@returns {string} - Generated markup for the progress report and message.
*/
  _generateMarkUp() {
    return `<h3 class="report-message">${this._data.message}</h3> <p class= "report-numbers">${this._data.comOfTask}/${this._data.numOfTask}</p> `;
  }

  /**
Adds a load event listener to the window and calls the handler function.
@function addReportMessageHandler
@param {function} handler - Function to be called when the window is loaded.
*/
  addReportMessageHandler(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
}

export default new ReportView();
