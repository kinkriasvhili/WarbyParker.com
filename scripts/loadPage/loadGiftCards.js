import { loadFooter } from "./loadfooter.js";
import { loadHeader } from "./loadheader.js";
import {
  loadProductsFetch,
  saveProductToStorage,
  products,
} from "../../data/products.js";
import { addToCart } from "../../data/cart.js";
let info = [];
let addCartBtn = document.querySelector(".gift-cart-add");
let inputsElement = document.querySelectorAll(".info-input");
let options = document.querySelectorAll(".option");
let inputsCenterContainer = document.querySelector(".center-container");
let allFilled;

async function giftCardShopLoad() {
  await loadProductsFetch();
  saveProductToStorage(products);
  let shopNowBtn = document.querySelector(".gifty-button");
  chooseOneAnswer();

  let giftCardContainer = document.querySelector(".gift-main-container");
  let shopNow = document.querySelector(".shop-now");
  shopNowBtn.addEventListener("click", () => {
    shopNow.classList.add("shop");
    giftCardContainer.classList.add("off-showGiftCard");
  });
}

function addToButtonWorking(stateOfBtn) {
  allFilled = stateOfBtn;
  addCartBtn.disabled = !stateOfBtn;
  addCartBtn.classList.remove("giftCardOff");
  if (!stateOfBtn) {
    addCartBtn.classList.add("giftCardOff");
  }
}

function chooseOneAnswer() {
  options.forEach((optionContainer) => {
    optionContainer.addEventListener("click", (event) => {
      const qustionId = optionContainer.parentElement.getAttribute("optionsId");
      if (!optionContainer.classList.contains("choose-option")) {
        options.forEach((option) => {
          const removeQustionOptionId =
            option.parentElement.getAttribute("optionsId");
          if (qustionId == removeQustionOptionId) {
            // console.log(qustionId);
            option.classList.remove("choose-option");
          }
        });
        if (!optionContainer.classList.contains("choose-option")) {
          optionContainer.classList.add("choose-option");
        }
      }
      checkAnswers();
    });
  });
}

function checkInpits() {
  addCartBtn.disabled = true;
  addCartBtn.classList.add("giftCardOff");
  //  choose-option
  inputsElement.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      addToButtonWorking(true);

      inputsElement.forEach((input) => {
        if (input.value.trim() === "") {
          addCartBtn.disabled = true;
          addCartBtn.classList.add("giftCardOff");
          allFilled = false;
        }
      });
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

function checkAnswers() {
  addToButtonWorking(false);
  let count = 0;
  options.forEach((option) => {
    if (option.classList.contains("choose-option")) {
      count++;
    }
    if (count >= 2) {
      addToButtonWorking(true);
      checkInpits();
      inputsCenterContainer.classList.remove("inputs-off");
      getCardInfo();
    } else {
      addToButtonWorking(false);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  giftCardShopLoad();
  checkInpits();
  let timoutId;

  addCartBtn.addEventListener("click", () => {
    document.querySelector(".added").classList.remove("added-off");
    if (timoutId) {
      clearTimeout(timoutId);
    }
    timoutId = setTimeout(() => {
      document.querySelector(".added").classList.add("added-off");
    }, 1000);
  });
});
