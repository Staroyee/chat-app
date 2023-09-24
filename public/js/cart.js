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



const removeFromCartButtons = document.querySelectorAll(".addToCart");

//const viewCartButton = document.getElementById("viewCart");

//const cartProducts = JSON.parse(localStorage.getItem("cartProduct")) || [];

addToCartButtons.forEach(button => {
  button.addEventListener("click", function () {
    const productId = button.getAttribute("data-product-id");
    cartProducts.push(productId);
    localStorage.removeItem("cartProduct", JSON.stringify(cartProducts));
  });
});

viewCartButton.addEventListener("click", function () {
  window.location.href = `/cart?productIds=${JSON.stringify(cartProducts)}`;
});

