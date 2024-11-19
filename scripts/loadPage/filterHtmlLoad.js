import { getClickedProductId } from "../../htmlComponents/product.js";

export async function loadFilter() {
  try {
    console.log("me");
    const response = await fetch("htmlComponents/filterLoad.html");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const headerHtml = await response.text();
    document.getElementById("filter").innerHTML = headerHtml;
    getClickedProductId();
  } catch (error) {
    console.error("Error loading header:", error);
  }
}

loadFilter();
