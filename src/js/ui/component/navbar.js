// Navbar Toggle
const navToggle = document.getElementById("nav-toggle");
const navbar = document.getElementById("navbar-hamburger");

navToggle.addEventListener("click", () => {
  navbar.classList.toggle("hidden");
  navbar.classList.toggle("sm:flex");
});

// Active Link Underline
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll("#navbar a, #navbar-hamburger a");

navLinks.forEach((link) => {
  const linkPath = new URL(link.href).pathname;

  // Check if link matches current path
  if (
    linkPath === currentPath ||
    (currentPath.startsWith(linkPath) && linkPath !== "/")
  ) {
    link.classList.add("border-b-4", "border-secondary-400");
  }
});
