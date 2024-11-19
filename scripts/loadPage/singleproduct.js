import { loadFooter } from "../loadPage/loadfooter.js";
import { loadHeader } from "../loadPage/loadheader.js";
import { saveToCart, cart } from "../../data/cart.js";
import { generateUniqueId } from "../../data/order.js";
import { productHtml } from "../../htmlComponents/product.js";
import {
  getProduct,
  loadProductsFetch,
  saveProductToStorage,
  products,
} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addToCart } from "../../data/cart.js";
import { addToFavourite } from "../../data/faovurite.js";
import { getClickedProductId } from "../../htmlComponents/product.js";
async function loadSingleProduct() {
  await loadProductsFetch();
  let productId = JSON.parse(localStorage.getItem("singleProductId"));
  let product = getProduct(productId);
  // url start
  // Check if the URL already has a product ID
  const url = new URL(window.location.href);
  let productUrl = url.searchParams.get("product");

  if (!productUrl && productId) {
    // If no product ID is in the URL but we have one from localStorage, redirect
    const productIdUrl = productId;
    window.location.href = `singleproduct.html?product=${productIdUrl}`;
  } else {
    console.log(`Current product in URL: ${productUrl}`);
    productId = productUrl;
    product = getProduct(productUrl);
  }
  // url end
  const singleProductCotainer = document.querySelector(
    ".singleProductCotainer"
  );
  let colorHtml = ``;
  product.colors.forEach((color) => {
    if (product.color == color.name) {
      colorHtml += `<div style="border: 3px solid ${color.name};" class="colorSelect buttonActive">${color.name}</div>`;
    } else {
      colorHtml += `<div class="colorSelect">${color.name}</div>`;
    }
  });
  let sizerHtml = ``;
  product.sizes.forEach((size) => {
    if (product.size == size.name) {
      sizerHtml += `<div class="sizeSelect buttonActive">${size.name}</div>`;
    } else {
      sizerHtml += `<div class="sizeSelect">${size.name}</div>`;
    }
  });
  singleProductCotainer.innerHTML = `
        <div class="singleProductImage-container">
          <img
            src="${product.image}"
            width="100%"
            id="mainImg"
            class="singleProductImage"
            alt=""
          />
        </div>
        <div class="singleProductDetails-container">
          <div class="info-container">
            <div>Name: ${product.name}</div>
            <div>Brand: ${product.brand}</div>
            <div>Price: $${formatCurrency(product.priceCents)}</div>
            <div>Rating Stars: <img src="images/ratings/rating-${
              product.ratings.stars * 10
            }.png" class="star-rating"> - <span class="count-rating">
            ${product.ratings.stars} (${product.ratings.count})
            </span> </div>

          </div>
          <div class="sizeSelect-container">
            ${sizerHtml}
          </div>
          <div class="colorSelect-container">
            ${colorHtml}
          </div>
          <div class="addButtons">

            <div class="update-quantity">
              <i class="fa-solid fa-chevron-left chervon"></i>
              <span class="quantity">1</span>
              <i class="fa-solid fa-chevron-right chervon"></i>
            </div>

            <div class="product-add-cart-single">
              <button class="js-cart-btn" data-productId="${product.id}">
                <img
                  class="js-cart-btn-${product.id}"
                  src="images/icons/cart.svg"
                  alt=""
                />
              </button>
            </div>
            
          </div>
        </div>`;
  let count = 0;
  let relatedProducts = ``;
  let productItem;
  for (let i = 0; i <= products.length; i++) {
    if (products[i]) {
      productItem = products[i];
    }
    if (
      productItem != product &&
      productItem.brand == product.brand &&
      product.priceCents == productItem.priceCents &&
      productItem.type == product.type &&
      product.ratings.stars == productItem.ratings.stars
    ) {
      count++;
      relatedProducts += productHtml(productItem);
      if (count == 4) {
        document.querySelector(".relatedProducts").innerHTML = relatedProducts;
        if (product.type == "contact-lenes") {
          document
            .querySelector(".relatedProducts")
            .classList.add("contact-lences-related-products");
        }
        break;
      }
    }
  }

  const colors = document.querySelectorAll(".colorSelect");
  const sizes = document.querySelectorAll(".sizeSelect");
  const cartButton = document.querySelector(".js-cart-btn");
  sizes.forEach((size) => {
    if (product.size == size.innerHTML) {
      sizes.forEach((s) => {
        s.classList.remove("buttonActive");
      });
      size.classList.add("buttonActive");
    }
  });

  const idProduct = product.id;
  changeQuantity();
  getClickedProductId();
  selectOneBtn(colors, product, "color");
  selectOneBtn(sizes, product, "size");
  addToSinglePageCart(idProduct, cartButton);
  addToCart();
  addToFavourite();
}
function changeQuantity() {
  const chervons = document.querySelectorAll(".chervon");
  let quantityElement = document.querySelector(".quantity");
  chervons.forEach((chervon) => {
    chervon.addEventListener("click", () => {
      if (
        chervon.classList.contains("fa-chevron-left") &&
        quantityElement.innerHTML > 1
      ) {
        quantityElement.innerHTML--;
      } else if (chervon.classList.contains("fa-chevron-right")) {
        quantityElement.innerHTML++;
      }
    });
  });
  let quantity = Number(quantityElement.innerHTML);
  return Number(quantity);
}
function addToSinglePageCart(productId, button) {
  button.addEventListener("click", () => {
    let quantity = Number(document.querySelector(".quantity").innerText);
    let product = getProduct(productId);

    let matchingItem;

    cart.forEach((cartItem) => {
      if (
        cartItem.productId == productId &&
        cartItem.productColor == product.color &&
        cartItem.productSize == product.size
      ) {
        matchingItem = true;
        quantity = quantity - 1;
        cartItem.quantity += quantity;
      }
    });
    let existingIds = new Set();
    let cartId = generateUniqueId(existingIds);
    if (!matchingItem) {
      cart.push({
        productColor: product.color,
        productSize: product.size,
        productId: product.id,
        quantity: quantity - 1,
        cartId: cartId,
      });
    }
    loadHeader();
    saveToCart();
  });
}

let newProducts = [];
function selectOneBtn(buttonName, product, detail) {
  buttonName.forEach((colorSize) => {
    colorSize.addEventListener("click", () => {
      buttonName.forEach((c) => {
        if (c.classList.contains("buttonActive")) {
          c.classList.remove("buttonActive");
          c.style.border = ""; // Reset previous inline border styles
        }
      });

      colorSize.classList.add("buttonActive");

      if (detail == "color") {
        product.color = colorSize.innerHTML;
        // Set the border color to the clicked color name
        colorSize.style.border = `3px solid ${product.color}`;
      } else if (detail == "size") {
        product.size = colorSize.innerHTML;
      }

      products.forEach((p) => {
        if (p.id == product.id) {
          newProducts.push(product);
        } else {
          newProducts.push(p);
        }
      });
      saveProductToStorage(newProducts);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSingleProduct();
});
