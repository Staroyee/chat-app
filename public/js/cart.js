if (typeof document !== 'undefined') {
    const addToCartButtons = document.querySelectorAll(".addToCart");

    const viewCartButton = document.getElementById("viewCart");

    const cartProducts = JSON.parse(localStorage.getItem("cartProduct")) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute("data-product-id");
            cartProducts.push(productId);
            localStorage.setItem("cartProduct", JSON.stringify(cartProducts));
        });
    });

    viewCartButton.addEventListener("click", function () {
        window.location.href = `/cart?productIds=${JSON.stringify(cartProducts)}`;
    });



    // const removeFromCartButtons = document.querySelectorAll(".removeFromCart");

    // //const viewCartButton = document.getElementById("viewCart");

    // //const cartProducts = JSON.parse(localStorage.getItem("cartProduct")) || [];

    // removeFromCartButtons.addEventListener("click", function () {
    //     console.log('Yooo')
    //     const productId = button.getAttribute("data-product-id");
    //     cartProducts.push(productId);
    //     var filtered = someArray.filter(function (el) { return el.Name != "Kristian"; });
    //     localStorage.removeItem("cartProduct", JSON.stringify(cartProducts));
    // });


    // Remove from Cart
    const removeButtons = document.querySelectorAll('.remove-button');

    async function removeFromCart(productId) {

        const updatedCart = cartProducts.filter(function (toRemove) {
            return toRemove !== productId; // Remove items matching the productId
        });

        localStorage.setItem("cartProduct", JSON.stringify(updatedCart)); // Update the entire "cartProduct" key

        cartProducts = updatedCart; // Update the cartProducts variable
    }

    removeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const productId = this.id;
            removeFromCart(productId);
        });
    });

}