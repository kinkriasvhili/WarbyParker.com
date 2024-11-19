import { products, getProduct, saveProductToStorage } from "./products.js";
import { loadHeader } from "../scripts/loadPage/loadheader.js";
import { loadFavouriteProducts } from "../scripts/favouritePage.js";

export let favourite = JSON.parse(localStorage.getItem("favourite")) || [];

function saveFavouriteProduct() {
  localStorage.setItem("favourite", JSON.stringify(favourite));
}
console.log();
export function addToFavourite() {
  const faovuriteButtons = document.querySelectorAll(".favouriteBtn");
  faovuriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("fa-regular")) {
        button.classList.remove("fa-regular");
        button.classList.add("fa-solid");
        let productId = button.parentElement.getAttribute("data-productId");
        favourite.push(getProduct(productId));

        //favourite change
        products.forEach((product) => {
          if (product.id == productId) {
            product.favourite = true;
          }
        });
        loadHeader();
        saveProductToStorage();
        saveFavouriteProduct();
      } else {
        button.classList.remove("fa-solid");
        button.classList.add("fa-regular");
        let productId = button.parentElement.getAttribute("data-productId");

        const newFavourite = [];
        favourite.forEach((favProduct) => {
          if (favProduct.id != productId) {
            newFavourite.push(favProduct);
          }
        });
        favourite = newFavourite;

        // favourite change
        products.forEach((product) => {
          if (product.id == productId) {
            product.favourite = false;
          }
        });
        loadFavouriteProducts();
        loadHeader();
        saveProductToStorage();
        saveFavouriteProduct();
      }
    });
  });
  if (favourite) {
    favourite.forEach((product) => {
      if (product) {
        if (product.favourite == true) {
          let favbutton = document.querySelector(`.fav-btn-${product.id}`);
          if (favbutton) {
            favbutton.classList.remove("fa-regular");
            favbutton.classList.add("fa-solid");
          }
        }
      }
    });
  }
}
