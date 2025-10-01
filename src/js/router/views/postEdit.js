import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";
import { readPost } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { goToProfilePage } from "../../ui/global/goMyProfile";
import { onDeletePost } from "../../ui/post/delete";
import { populateEditForm } from "../../ui/component/populateEditForm";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

authGuard();
setLogoutListener();
goToProfilePage();

const form = document.forms.editPost;
form.addEventListener("submit", onUpdatePost);

const urlSearch = new URLSearchParams(window.location.search);
const postId = urlSearch.get("post");

const headTitle = document.getElementById("headTitle");
headTitle.textContent = `DevSquare - Editing post ${postId}`;

initEditPost(postId);
async function initEditPost(id) {
  try {
    const postData = await readPost(id);

    if (!postData || !postData.data) {
      throw new Error("Post does not exist");
    }

    await populateEditForm(postData);
  } catch (error) {
    console.error("Error fetching post data:", error);
    Toastify({
      text: "This post no longer exists or an error occurred. Redirecting......",
      duration: 2000,
    }).showToast();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }
}

document.querySelector(".delete-post").addEventListener("click", onDeletePost);
