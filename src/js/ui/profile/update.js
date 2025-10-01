/**
 * Handles the profile update form submission and sends the updated data to the server.
 *
 * This function is triggered when a user submits the profile update form. It collects the
 * input values for bio, avatar, and banner, and constructs a profile data object. If at least
 * one field is filled, it sends the updated profile data to the server using the `updateProfile`
 * function. If the update is successful, the page is reloaded. If no fields are filled or an error occurs,
 * an alert is displayed to the user.
 *
 * @param {Event} event - The event object representing the form submission.
 */

import { updateProfile } from "../../api/profile/update";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const urlSearch = new URLSearchParams(window.location.search);
  const profileName = urlSearch.get("profile");

  const bio = event.target.bio.value.trim();
  const avatarSrc = event.target.avatarSrc.value.trim();
  const avatarAlt = event.target.avatarAlt.value.trim();
  const bannerSrc = event.target.bannerSrc.value.trim();
  const bannerAlt = event.target.bannerAlt.value.trim();

  const profileData = {};

  if (bio) {
    profileData.bio = bio;
  }

  if (avatarSrc || avatarAlt) {
    profileData.avatar = {
      url: avatarSrc || "",
      alt: avatarAlt || "",
    };
  }

  if (bannerSrc || bannerAlt) {
    profileData.banner = {
      url: bannerSrc || "",
      alt: bannerAlt || "",
    };
  }

  if (Object.keys(profileData).length === 0) {
    Toastify({
      text: "At least one field must be filled out.",
      duration: 2000,
    }).showToast();

    return;
  }

  try {
    const result = await updateProfile(profileName, profileData);
    if (result) {
      window.scrollTo({ top: -500, left: -500, behavior: "smooth" });
      setTimeout(() => {
        location.reload();
      }, 710);
    } else {
      throw new Error(
        "Couldn't update profile this time, try again in a couple minutes."
      );
    }
  } catch (error) {
    const errorUpdateMsg = document.getElementById("error-update-msg");
    errorUpdateMsg.innerHTML = `<p>${error.message}</p>`;
    console.error("Failed to update profile:", error);
    Toastify({
      text: "Failed to update profile. Please check the inputs are valid.",
      duration: 2000,
    }).showToast();

    setTimeout(() => {
      errorUpdateMsg.innerHTML = "";
    }, 8000);
  }
}
