/**

View class is responsible for rendering the data and handling error messages.
@class View
@property {object} _data - Data to be rendered.
@property {HTMLElement} _errorMessage - Error message container element.
*/

export default class View {
  /*
Renders the data to the parent element.
@function render
@param {object} data - Data to be rendered.
*/

  _data;
  _errorMessage = document.querySelector('.errorMessage');

  render(data) {
    this._data = data;
    const markup = this._generateMarkUp(); //*
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup); //*
  }

  /**

Clears the content of the parent element.
@function _clear
@private
*/
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**

Renders an error message and shows it for 1.5 seconds.
@function renderErrorMessage
@param {string} message - Error message to be displayed.
*/
  renderErrorMessage(message) {
    this._errorMessage.classList.remove('hidden');

    this._errorMessage.innerHTML = '';

    const markup = `

    
   
    <p>${message}</p>
 `;
    this._errorMessage.insertAdjacentHTML('afterbegin', markup);

    setTimeout(() => {
      this.closerenderErrorMessage();
    }, 1500);
  }

  /**

Hides the error message.
@function closerenderErrorMessage
*/
  closerenderErrorMessage() {
    this._errorMessage.classList.add('hidden');
  }
}
