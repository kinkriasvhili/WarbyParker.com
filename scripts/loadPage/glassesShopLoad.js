import { loadHeader } from "./loadheader.js";
import { products, loadProductsFetch } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addToFavourite } from "../../data/faovurite.js";
import { addToCart } from "../../data/cart.js";
import {
  productHtml,
  getClickedProductId,
} from "../../htmlComponents/product.js";
export async function loadGlassesProducts(type) {
  await loadProductsFetch();

  const productsContainerElement = document.querySelector(".products");
  let productsHtml = ``;
  products.forEach((product) => {
    // eyeglasses
    if (product.type == type) {
      productsHtml += productHtml(product);
    }
  });
  productsContainerElement.innerHTML = productsHtml;
  getClickedProductId();
  addToFavourite();
  addToCart();
}
