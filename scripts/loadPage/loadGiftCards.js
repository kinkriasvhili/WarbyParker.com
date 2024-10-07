import { loadFooter } from "./loadfooter.js";
import { loadHeader } from "./loadHeader.js";
import {
  loadProductsFetch,
  saveProductToStorage,
  products,
} from "../../data/products.js";
import { addToCart } from "../../data/cart.js";
let info = [];

async function giftCardShopLoad() {
  await loadProductsFetch();
  saveProductToStorage(products);
  getCardInfo();
  addToCart();

  let shopNowBtn = document.querySelector(".gifty-button");
  chooseOneAnswer();

  let giftCardContainer = document.querySelector(".gift-main-container");
  let shopNow = document.querySelector(".shop-now");
  shopNowBtn.addEventListener("click", () => {
    shopNow.classList.add("shop");
    giftCardContainer.classList.add("off-showGiftCard");
  });
}

function chooseOneAnswer() {
  let options = document.querySelectorAll(".option");

  options.forEach((optionContainer) => {
    optionContainer.addEventListener("click", (event) => {
      const qustionId = optionContainer.parentElement.getAttribute("optionsId");

      if (!optionContainer.classList.contains("choose-option")) {
        options.forEach((option) => {
          const removeQustionOptionId =
            option.parentElement.getAttribute("optionsId");
          if (qustionId == removeQustionOptionId) {
            console.log(qustionId);
            option.classList.remove("choose-option");
          }
        });
        optionContainer.classList.add("choose-option");
      }
    });
  });
}

function getCardInfo() {
  let inputs = document.querySelectorAll(".info-input");

  info.push({
    personalId: inputs[0].value,
    lastName: inputs[1].value,
    name: inputs[2].value,
    email: inputs[3].value,
  });

  let options = document.querySelectorAll(".option");
  let count = 0;
  let productName = "";
  let productPriceCents = "";
  options.forEach((option) => {
    if (option.classList.contains("choose-option")) {
      if (count == 0) {
        productName = option.children[0].innerHTML;
        count++;
      } else {
        productPriceCents =
          Number(option.children[0].innerHTML.replace("$", "")) * 100;
      }
    }
  });
  if (JSON.parse(localStorage.getItem("glassesproducts"))) {
    let jsonProducts = JSON.parse(localStorage.getItem("glassesproducts"));
    let productId = "1235-5689-5267-gift-card";
    let newProducts = [];
    jsonProducts.forEach((product) => {
      if (product.id == productId) {
        // console.log(product);
        product.name = productName;
        product.priceCents = productPriceCents;
      }
      newProducts.push(product);
    });
    saveProductToStorage(newProducts);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  giftCardShopLoad();
});
