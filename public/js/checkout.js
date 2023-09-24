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
    console.log('hello', response);
  });