// FORM HANDLER FOR LOGGIN IN
const loginFormHandler = async (event) => {
  event.preventDefault();

  // COLLECT VALUES FROM LOGIN FORM
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // SEND A POST REQUEST TO THE API ENDPOINT
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // IF SUCCESSFUL, REDIRECT THE USER TO THE HOME PAGE
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

// FORM HANDLER FOR SIGNING UP
const signupFormHandler = async (event) => {
  event.preventDefault();

  // COLLECT VALUES FROM SIGNUP FORM
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const phone = document.querySelector('#phone-signup').value.trim();
  const address = document.querySelector('#address-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && phone && address && password) {
    // SEND A POST REQUEST TO THE API ENDPOINT
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, address, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // IF SUCCESSFUL, REDIRECT THE BROWSER TO THE HOME PAGE
    if (response.ok) {
      console.log('okay');
      document.location.replace('/');
    } else {
      console.log('Not okay');
      alert(response.statusText);
    }
  }
};

// EVENT LISTENER ON LOGIN FORM SUBMIT
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
// EVENT LISTENER ON SIGNUP FORM SUBMIT
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
