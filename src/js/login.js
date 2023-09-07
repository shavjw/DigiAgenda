const signUpBtn = document.querySelector('#signup-btn');
const signUpForm = document.querySelector('#signup-section');
const signUpCloseBtn = document.querySelector('#close-btn');

const openSignUpForm = function () {
  signUpForm.classList.remove('hidden');
};

const closeSignUpForm = function () {
  signUpForm.classList.add('hidden');
};

signUpBtn.addEventListener('click', openSignUpForm);
signUpCloseBtn.addEventListener('click', closeSignUpForm);
