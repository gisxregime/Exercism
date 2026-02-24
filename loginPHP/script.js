const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUp');

function showSignIn() {
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
}

function showSignUp() {
  signInForm.style.display = 'none';
  signUpForm.style.display = 'block';
}

signUpButton.addEventListener('click', showSignUp);
signInButton.addEventListener('click', showSignIn);

// Auto-open the correct form based on URL param
// e.g. index.php?form=signup  or  index.php?registered=1
const params = new URLSearchParams(window.location.search);

if (params.get('form') === 'signup') {
  showSignUp();
} else if (params.get('registered') === '1') {
  // Show sign-in with a success message after registration
  showSignIn();
  const msg = document.createElement('p');
  msg.textContent = 'Registration successful! Please sign in.';
  msg.style.cssText = 'color:green; text-align:center; font-weight:bold; margin-bottom:1rem;';
  signInForm.querySelector('form').insertAdjacentElement('beforebegin', msg);
} else {
  showSignIn(); // default view
}