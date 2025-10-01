/**
 * Handles posting a comment by extracting data from the event and making an API request.
 * If the comment is posted successfully, the page reloads; otherwise, an error message is shown.
 *
 * @async
 * @function onCommentPost
 * @param {Event} event - The event object from the form submission.
 * @returns {Promise<void>} - Resolves when the function completes.
 */
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { commentPost } from "../../api/post/comment";

export async function onCommentPost(event) {
  event.preventDefault();

  const comment = event.target.commentBox?.value.trim();
  if (!comment) {
    console.error("No comment provided.");

    Toastify({
      text: "Please enter a comment before posting.",
      duration: 2000,
    }).showToast();
    return;
  }

  const postId = new URLSearchParams(window.location.search).get("post");

  try {
    const response = await commentPost(postId, comment);

    if (response) {
      location.reload();
    } else {
      console.warn("Comment was not posted.");
      Toastify({
        text: "Something went wrong. Comment was not posted. Try again!",
        duration: 2000,
      }).showToast();
    }
  } catch (error) {
    console.error("An error occurred while posting the comment:", error);
    Toastify({
      text: "Something went wrong. Please try again later.",
      duration: 2000,
    }).showToast();
  }
}
