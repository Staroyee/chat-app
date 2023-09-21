const logout = async () => {
  alert("response.statusText");
  console.log('Logout button clicked');
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // If successful, redirect the browser to the account page
    if (response.ok) {
      console.log('okay')
      document.location.replace('/');
    } else {
      console.log('Not okay')
      console.error('Logout failed:', response.statusText);
      alert(response.statusText);
    };
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


document.querySelector('#logout').addEventListener('click', logout)
