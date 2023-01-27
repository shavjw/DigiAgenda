import View from './views.js';

class quoateView extends View {
  _parentElement = document.querySelector('.quote-container');

  addQuoteHandler(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  _generateMarkUp() {
    console.log(this._data);
    return `<h2 class = "daily-quote">Quote of the day: "${this._data.quote}" by ${this._data.author}</h2>`;
  }
}

export default new quoateView();
