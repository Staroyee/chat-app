document
  .getElementById('checkout-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const productId = document.getElementById('product-id').value;
    console.log('hello', productId);
    const response = await fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      // Redirect to /profile if the POST request was successful
      window.location.href = '/profile';
    } else {
      console.error('Failed to checkout:', response);
    }
  });
