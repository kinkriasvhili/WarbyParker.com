import { loadProductsFetch, products } from "../../data/products.js";
import {
  productHtml as productComponent,
  getClickedProductId,
} from "../../htmlComponents/product.js";
import { loadHeader } from "./loadheader.js";
import { addToCart } from "../../data/cart.js";
import { addToFavourite } from "../../data/faovurite.js";
import { loadAccessories } from "./accessories.js";
import { loadBestSelling } from "./loadBestProduct.js";
let productDescribtions = JSON.parse(
  localStorage.getItem("storageProductDescribtion")
);

async function loadQuizProducts(quizProducts) {
  await loadBestSelling();
  let productsHtml = ``;
  let pageTitle = document.querySelector(".page-title");
  let pageDescribtion = document.querySelector(".page-description");

  quizProducts.forEach((quizProduct) => {
    let { size, color } = quizProduct;
    productsHtml += productComponent(quizProduct);
  });
  if (productsHtml == ``) {
    pageDescribtion.innerHTML = "Products Like That does not exist";
    pageTitle.innerHTML = ``;
  }
  document.querySelector(".quizProducts").innerHTML = productsHtml;

  addToCart();
}

async function findQuizProducts() {
  await loadProductsFetch();
  let quizProducts = [];
  let sizeIn;
  let colorIn;

  products.forEach((product, index) => {
    if (productDescribtions[4]) {
      colorIn = product.colors.find(
        (color) => color.name == productDescribtions[4].color
      );
    }
    if (productDescribtions[2]) {
      sizeIn = product.sizes.find(
        (size) => size.name === productDescribtions[2].size
      );
    }
    if (
      (productDescribtions[0] == null ||
        productDescribtions[0].gender == product.gender) &&
      (productDescribtions[1] == null ||
        productDescribtions[1].type == product.type) &&
      (sizeIn || productDescribtions[2] == null) &&
      (productDescribtions[3] == null ||
        productDescribtions[3].shape == product.shape) &&
      (colorIn || productDescribtions[4] == null) &&
      (productDescribtions[5] == null ||
        productDescribtions[5].material == product.material) &&
      product.type != "accessories"
    ) {
      quizProducts.push(product);
    }
  });
  loadQuizProducts(quizProducts);
  addToFavourite();
  getClickedProductId();
}

document.addEventListener("DOMContentLoaded", () => {
  findQuizProducts();

  loadAccessories();
});
