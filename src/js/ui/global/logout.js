/**
 * Sets event listeners for logout functionality for both desktop and mobile buttons,
 * ensuring they work even when the mobile navbar is toggled dynamically.
 */
import { onLogout } from "../auth/logout";

export function setLogoutListener() {
  const desktopLogoutButton = document.getElementById("logout-button");
  const mobileNavbar = document.getElementById("navbar-hamburger");

  // Attach to desktop logout button
  if (desktopLogoutButton) {
    desktopLogoutButton.addEventListener("click", onLogout);
  }

  // Attach to mobile logout button dynamically
  const attachMobileLogoutListener = () => {
    const mobileLogoutButton = mobileNavbar.querySelector("#logout-button");

    if (mobileLogoutButton && !mobileLogoutButton.dataset.listenerAttached) {
      mobileLogoutButton.addEventListener("click", onLogout);
      // Prevent attaching multiple listeners
      mobileLogoutButton.dataset.listenerAttached = true;
    }
  };

  // Run the listener attachment immediately if the navbar is already expanded
  attachMobileLogoutListener();
}
