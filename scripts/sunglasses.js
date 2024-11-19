import { loadHeader } from "./loadPage/loadheader.js";
import { loadProductsFetch, products } from "../data/products.js";
import { loadGlassesProducts } from "./loadPage/glassesShopLoad.js";
import { loadFooter } from "../scripts/loadPage/loadfooter.js";
import { filter } from "./filter.js";
import { loadFilteredProducts } from "./loadPage/filteredProductsLoad.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  loadProductsFetch(loadGlassesProducts("sunglasses"));
  filter("sunglasses");
  loadFilteredProducts("sunglasses");
});
