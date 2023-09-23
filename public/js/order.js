document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Retrieve product IDs from local storage
        const productIds = JSON.parse(localStorage.getItem('productIds'));
        

        if (!productIds || !Array.isArray(productIds)) {
            console.error('Product IDs not found in local storage.');
            return;
        }

        // Send a POST request to the Express.js route
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productIds }),
        });

        if (response.ok) {
            const data = await response.json();
            // Handle the response from the server if needed
            console.log('Order created:', data);
        } else {
            console.error('Failed to create order');
        }
    });
});