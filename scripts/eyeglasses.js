import { loadHeader } from "./loadPage/loadheader.js";
import { filter } from "./filter.js";
import { loadProductsFetch } from "../data/products.js";
import { loadGlassesProducts } from "./loadPage/glassesShopLoad.js";
import { loadFooter } from "./loadPage/loadfooter.js";
import { loadFilteredProducts } from "./loadPage/filteredProductsLoad.js";
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  loadProductsFetch(loadGlassesProducts("eyeglasses"));
  filter("eyeglasses");
  loadFilteredProducts("eyeglasses");
});
