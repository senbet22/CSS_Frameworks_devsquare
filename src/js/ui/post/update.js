/**
 * Passses data to the createPost function in api/post and handles the response
 */

import { updatePost } from "../../api/post/update";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const errorContainer = document.querySelector(".error-container");

export async function onUpdatePost(event) {
  event.preventDefault();
  const id = event.target.id.value.trim();
  const title = event.target.title.value.trim();
  const body = event.target.body.value.trim();
  const tags = event.target.tags.value
    ? event.target.tags.value.split(",").map((tag) => tag.trim())
    : [];
  const media = {
    url: event.target.mediaUrl.value.trim() || "",
    alt: event.target.mediaAlt.value.trim() || "",
  };

  try {
    const response = await updatePost(id, { title, body, tags, media });

    if (response.success === false) {
      errorContainer.innerHTML = "";
      response.errors.forEach((error) => {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("error-message");

        const errorTxt = document.createElement("p");
        errorTxt.classList.add("error-txt");
        errorTxt.textContent = error.message;

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
        closeBtn.addEventListener("click", () => {
          errorMsg.remove();
        });

        errorMsg.appendChild(errorTxt);
        errorMsg.appendChild(closeBtn);
        errorContainer.appendChild(errorMsg);
      });
    }

    if (response.success === true) {
      Toastify({
        text: "Successfully updated post!",
        duration: 2000,
      }).showToast();

      setTimeout(() => {
        window.location.href = `/post/?post=${id}`;
      }, 2000);
    } else {
      Toastify({
        text: "Something went wrong, failed to update post.",
        duration: 2000,
      }).showToast();
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
