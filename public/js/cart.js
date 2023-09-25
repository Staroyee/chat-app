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

function deleteProduct(productId) {
  const index = cartProducts.indexOf(productId);
  if (index !== -1) {
    cartProducts.splice(index, 1);
    localStorage.setItem("cartProduct", JSON.stringify(cartProducts));
  }

  // Remove the deleted item from the query string
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('productIds');
  if (cartProducts.length > 0) {
    urlParams.set('productIds', JSON.stringify(cartProducts));
  }

  // Update the URL without refreshing the page
  window.history.replaceState({}, document.title, `?${urlParams.toString()}`);
}

// Add a click event listener to all delete buttons
document.querySelectorAll(".delete-button").forEach(deleteButton => {
  deleteButton.addEventListener("click", function () {
    const productId = deleteButton.getAttribute("data-product-id");
    deleteProduct(productId);
    
    // Remove the deleted item from the DOM
    deleteButton.closest("li").remove();
  });
});







