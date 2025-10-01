/**
 * Sends request to deletePost with parameter ID.
 */
import { deletePost } from "../../api/post/delete";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function onDeletePost(event) {
  event.preventDefault();

  const postDataId = event.target.getAttribute("data-id");

  if (postDataId) {
    const deleteThisPost = confirm("Wanna delete this post?");

    if (deleteThisPost) {
      deletePost(postDataId);
      Toastify({
        text: "Post successfully deleted! Redirecting...",
        duration: 2000,
      }).showToast();

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      Toastify({
        text: "Post deletion cancelled",
        duration: 2000,
      }).showToast();
      return;
    }
  }
}
