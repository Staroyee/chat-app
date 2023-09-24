document.getElementById('checkout-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const productIds = cartProducts;
    console.log(productIds);
    // Send a POST request to create an order
    const response = await fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productIds }),
    });
    if (response.ok) {
      // No need for document.location.replace; the server-side redirection is sufficient
    }
  });