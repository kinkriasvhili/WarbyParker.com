import { getProduct } from "./products.js";
import { loadCartProducts } from "../scripts/loadPage/cartProductsLoad.js";
import { loadCartPayment } from "../scripts/loadPage/cartPaymentLoad.js";
import { loadHeader } from "../scripts/loadPage/loadheader.js";
import { addToCartAffect } from "../scripts/pageStyles/addToCartAffect.js";
import { generateUniqueId } from "./order.js";
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart() {
  let productId;
  let addedMessageTimeouts = {};
  document.querySelectorAll(".js-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      productId = button.getAttribute("data-productId");
      let product = getProduct(productId);
      let matchingItem;
      cart.forEach((cartItem) => {
        if (
          cartItem.productId == productId &&
          cartItem.productColor == product.color &&
          cartItem.productSize == product.size
        ) {
          matchingItem = true;
          cartItem.quantity++;
        }
      });
      let existingIds = new Set();
      let cartId = generateUniqueId(existingIds);
      if (!matchingItem) {
        cart.push({
          productColor: product.color,
          productSize: product.size,
          productId: product.id,
          quantity: 1,
          cartId: cartId,
        });
      }
      loadHeader();
      saveToCart();
      addToCartAffect(productId, addedMessageTimeouts);
    });
  });
}
export function removeFromCart() {
  let newCart = [];

  document.querySelectorAll(".js-remove-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      let productId = button.getAttribute("data-product-id");
      let product = getProduct(productId);
      let cartId = button.getAttribute("data-cart-id");
      cart.forEach((cartItem) => {
        if (cartItem.cartId != cartId) {
          newCart.push(cartItem);
        }
      });

      cart = newCart;
      saveToCart();
      loadHeader();
      loadCartProducts();
      loadCartPayment();
    });
  });
}

export function saveToCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
