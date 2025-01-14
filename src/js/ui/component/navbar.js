// Navbar
const navToggle = document.getElementById("nav-toggle"); // The nav menu icon
const navbar = document.getElementById("navbar-hamburger"); // The nav element

navToggle.addEventListener("click", () => {
  navbar.classList.toggle("hidden"); // Toggle the visibility of the nav bar
  navbar.classList.toggle("sm:flex"); // Make sure it appears as a row on small screens
});
