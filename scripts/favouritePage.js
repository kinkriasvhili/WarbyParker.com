import { loadHeader } from "./loadPage/loadheader.js";
import { loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { addToFavourite, favourite } from "../data/faovurite.js";
import { loadFooter } from "./loadPage/loadfooter.js";
import { addToCart } from "../data/cart.js";
import { productHtml, getClickedProductId } from "../htmlComponents/product.js";

export async function loadFavouriteProducts() {
  await loadProductsFetch();

  const productsContainerElement = document.querySelector(".favouriteProducts");
  const favouriteInfoText = document.querySelector(".favourite-info-container");
  let productsHtml = ``;
  if (favourite.length == 0 && favouriteInfoText) {
    favouriteInfoText.classList.add("favouriteInfoTextNone");
    favouriteInfoText.innerHTML = `
    <div class="favouriteEmpty">
      <h3>Your favorite list is empty. Start adding items that you love!</h3>
    </div>

    `;
  } else {
    if (favouriteInfoText) {
      favouriteInfoText.classList.remove("favouriteInfoTextNone");
      favouriteInfoText.innerHTML = `

      <h1>Favourite</h1>
      <p>
        Your curated collection of must-haves—discover the items you love and
        can’t live without, all in one place.
      </p>

    `;
    }
  }
  favourite.forEach((product) => {
    // eyeglasses
    productsHtml += productHtml(product);
  });
  if (productsContainerElement) {
    productsContainerElement.innerHTML = productsHtml;
  }
  getClickedProductId();
  addToFavourite();
  addToCart();
  loadHeader();
  loadFooter();
}
loadFavouriteProducts();
