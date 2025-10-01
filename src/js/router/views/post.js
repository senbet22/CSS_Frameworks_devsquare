import { readPost } from "../../api/post/read";
import { createComment } from "../../ui/component/commentsBuilder";
import { createPostContent } from "../../ui/component/singlePostBuilder";
import { setLogoutListener } from "../../ui/global/logout";
import { onCommentPost } from "../../ui/post/comment";
import { authGuard } from "../../utilities/authGuard";
import { getMainComments } from "../../utilities/commentsSorter";
import { goToProfilePage } from "../../ui/global/goMyProfile";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

authGuard();
setLogoutListener();
goToProfilePage();

const urlSearch = new URLSearchParams(window.location.search);
const idFromParams = urlSearch.get("post");

initSinglePost(idFromParams);

async function initSinglePost(id) {
  try {
    const postData = await readPost(id);

    if (!postData || !postData.data) {
      throw new Error("Post does not exist");
    }

    createPostContent(postData.data);

    const filteredMainComments = getMainComments(postData.data.comments);
    await createComment(filteredMainComments);
  } catch (error) {
    console.error("Error initializing single post:", error);
    Toastify({
      text: "This post no longer exists or an error occurred. Redirecting......",
      duration: 2000,
    }).showToast();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }
}

const commentForm = document.forms.comment;
commentForm.addEventListener("submit", onCommentPost);
