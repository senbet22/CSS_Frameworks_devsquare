/**
 * Handles the display of sections based on selected radio buttons
 * and persists the selected state using sessionStorage.
 *
 * @param {string} user - The name of the user whose posts are being displayed.
 *
 * The function performs the following:
 * - Adds `change` event listeners to radio buttons to toggle section visibility.
 * - Saves the selected radio button value to sessionStorage.
 * - Restores the selected radio button and section visibility on page load.
 * - Updates a user-specific title element with the provided username.
 */

export function handleSectionDisplay(user) {
  const usersPostTitle = document.getElementById("visit-section");
  usersPostTitle.textContent = `View ${user}'s posts:`;

  const radioButtons = document.querySelectorAll('input[name="section"]');
  const sections = document.querySelectorAll(".content-section");

  const updateSections = () => {
    const selectedRadio = sessionStorage.getItem("selectedRadio");
    sections.forEach((section) => {
      if (section.id === selectedRadio) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
  };

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      sessionStorage.setItem("selectedRadio", radio.value);
      updateSections();
    });
  });

  const savedRadio = sessionStorage.getItem("selectedRadio");
  if (savedRadio) {
    const matchingRadio = document.querySelector(
      `input[name="section"][value="${savedRadio}"]`
    );
    if (matchingRadio) matchingRadio.checked = true;
  } else {
    radioButtons[0].checked = true;
    sessionStorage.setItem("selectedRadio", radioButtons[0].value);
  }

  updateSections();
}
