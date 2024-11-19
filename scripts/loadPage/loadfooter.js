export async function loadFooter() {
  try {
    const response = await fetch("../../htmlComponents/footer.html");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const headerHtml = await response.text();
    document.getElementById("footer-placeholder").innerHTML = headerHtml;
  } catch (error) {
    console.error("Error loading header:", error);
  }
}

loadFooter();
