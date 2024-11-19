import { loadHeader } from "./loadPage/loadheader.js";
import { loadFooter } from "./loadPage/loadfooter.js";
import {
  loadFavouriteSearches,
  loadSearchedProducts,
} from "../scripts/loadPage/searchLoad.js";
import { products } from "../data/products.js";
function findProduct() {
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");
  let filteredProducts = products;
  if (search) {
    filteredProducts = products.filter((product) => {
      let filteredName = product.name.toUpperCase().replace(/[-:]/g, "");
      let filteredSearch = search.toUpperCase().replace(/[-:]/g, "");
      return filteredName.includes(filteredSearch);
    });
    localStorage.setItem("searchedProducts", JSON.stringify(filteredProducts));
  }
}
function search() {
  let searchValue = document.querySelector(".search-box").value;
  const newUrl = `search.html?search=${searchValue}`;
  window.history.pushState(null, null, newUrl);
  findProduct();
  loadSearchedProducts();
}
search();
function searchProduct() {
  document.querySelector(".search-btn").addEventListener("click", () => {
    search();
  });
  document.querySelector(".search-box").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      search();
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  loadFavouriteSearches();
  searchProduct();
});
