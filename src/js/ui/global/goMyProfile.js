/**
 * Navigates the logged user to their own profile page using localStorage.
 * Ensures the event listener is attached to both desktop and mobile buttons.
 */
export function goToProfilePage() {
  const user = JSON.parse(localStorage.getItem("adminUser"));

  const desktopProfileBtn = document.getElementById("go-profile-btn");
  const mobileNavbar = document.getElementById("navbar-hamburger");
  const mobileProfileBtn = mobileNavbar.querySelector('[href="/profile/"]');

  // Attach to desktop button
  if (desktopProfileBtn) {
    desktopProfileBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default navigation
      window.location.href = `/profile/?profile=${user.name}`;
    });
  }

  // Attach to mobile button
  if (mobileProfileBtn) {
    mobileProfileBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default navigation
      window.location.href = `/profile/?profile=${user.name}`;
    });
  }
}
