document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton?.addEventListener("click", function () {
    mobileMenu.style.display =
      mobileMenu?.style.display === "none" || mobileMenu?.style.display === ""
        ? "block"
        : "none";
  });
});
  