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

let opt = {
  initialText: "Add to Cart",
  textOnClick: "Item Added",
  interval: 1000,
};

addToCartButtons.forEach(addToCartButtons => {
  addToCartButtons.addEventListener("click", function () {;
    addToCartButtons.innerHTML = opt.textOnClick;
  let reinit = () => {
    addToCartButtons.innerHTML = opt.initialText;
  };
  setTimeout(reinit, opt.interval);
  })
});



