import { loadProductsFetch } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { makeOrderList, saveOrder } from "../../data/order.js";

export async function loadCartPayment(deliveryPriceCents) {
  await loadProductsFetch();
  let paymentHtml = ``;
  let productPriceCents = 0;
  let itemQuantity = 0;
  let shippingCents = 500;
  let estimatedTaxPercent = 10;
  cart.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    itemQuantity += cartItem.quantity;
  });
  if (cart.length == 0) {
    shippingCents = 0;
  }
  let totalBeforeTaxCents = shippingCents + productPriceCents;
  let estimatedTax = (productPriceCents * estimatedTaxPercent) / 100;
  let totalPriceCents = 0;
  if (deliveryPriceCents) {
    totalPriceCents = estimatedTax + totalBeforeTaxCents + deliveryPriceCents;
  } else {
    totalPriceCents = estimatedTax + totalBeforeTaxCents;
  }

  paymentHtml = `        
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="items-price">
            <p>Items(${itemQuantity})</p>
            <p class="price">$${formatCurrency(productPriceCents)}</p>
          </div>
          <div>
            <p>Shipping & handling:</p>
            <p class="price">$${formatCurrency(shippingCents)}</p>
          </div>
          <div>
            <p>Total before tax:</p>
            <p class="price">$${formatCurrency(totalBeforeTaxCents)}  </p>
          </div>
          <div>
            <p>Estimated tax (${estimatedTaxPercent}%)</p>
            <p class="price">$${formatCurrency(estimatedTax)}</p>
          </div>
        </div>
        <div class="order-total">
          <div>
            <p>Order total:</p>
            <p class="price">$${formatCurrency(totalPriceCents)}</p>
          </div>
        </div>
        <div class="place-order-button-container">
          <a href="placeOrder.html">
            <button class="js-placeOrder-button">Place Your Order</button>
          </a>

        </div>`;
  document.querySelector(".payment-order-container").innerHTML = paymentHtml;
  const placeOrderButton = document.querySelector(".js-placeOrder-button");
  const linkOfotherPage = document.querySelector(
    ".place-order-button-container a"
  );
  if (cart.length == 0) {
    placeOrderButton.disabled = true;
    placeOrderButton.classList.add("placeOrderButtonOff");
    linkOfotherPage.style.pointerEvents = "none";
    document
      .querySelector(".delivery-container-js")
      .classList.add("deliveryOff");
  } else {
    placeOrderButton.classList.remove("placeOrderButtonOff");
    document
      .querySelector(".delivery-container-js")
      .classList.remove("deliveryOff");
    linkOfotherPage.style.pointerEvents = "pointer";
  }
  /**
   *
   */
  placeOrderButton.addEventListener("click", () => {
    //
    makeOrderList(formatCurrency(totalPriceCents));
    loadCartPayment();
    localStorage.removeItem("cart");
  });
}
