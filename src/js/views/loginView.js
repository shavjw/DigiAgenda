import View from './views.js';

class loginView extends View {
  _signUpBtn = document.querySelector('#signup-btn');
  _signUpForm = document.querySelector('#signup-form');

  constructor() {
    super();
    this._openSignUpForm();
  }

  //Task Control Functions : Handles DOM Elements
  _openSignUpForm() {
    this._signUpBtn.addEventListener('click', this.toggleSignUpForm());
  }

  // this.clearAgenda.bind(this)

  toggleSignUpForm() {
    //this._signUpForm.classList.remove('hidden');
    console.log('It works');
  }
}

export default new loginView();
