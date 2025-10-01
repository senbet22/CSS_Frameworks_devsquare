/**
 * Sends request to deletePost with parameter ID.
 */

import { deletePost } from "../../api/post/delete";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function onDeletePost(event) {
  event.preventDefault();
  const postDataId = event.target.getAttribute("data-id");
  if (!postDataId) return;

  const modal = document.getElementById("confirm-modal");
  const yesBtn = document.getElementById("confirm-yes");
  const noBtn = document.getElementById("confirm-no");

  modal.classList.remove("hidden"); // show modal

  yesBtn.onclick = async () => {
    modal.classList.add("hidden"); // hide modal
    await deletePost(postDataId);
    Toastify({
      text: "Post successfully deleted! Redirecting...",
      duration: 2000,
    }).showToast();
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  noBtn.onclick = () => {
    modal.classList.add("hidden"); // hide modal
    Toastify({ text: "Post deletion cancelled", duration: 2000 }).showToast();
  };
}
