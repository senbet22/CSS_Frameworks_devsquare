/**
 * Displays a list of posts in a specified container with options to view or edit each post.
 *
 * @function displayPostsListStyle
 * @description
 * This function dynamically generates and appends post elements to a container element with the ID "profile-user-posts".
 * Each post element includes a title and a link that either allows viewing or editing the post, depending on
 * whether the currently logged-in user matches the profile being viewed. The link redirects the user to
 * the appropriate page when clicked.
 */

import { compareUsers } from "../../utilities/compareProfiles";

export function displayPostsListStyle(posts, name) {
  const postContainer = document.getElementById("profile-user-posts");
  postContainer.innerHTML = "";

  if (!posts || posts.length === 0) {
    postContainer.textContent = `${name} has not created any posts yet.`;
    return;
  }

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add(
      "bg-background-100",
      "flex",
      "justify-between",
      "items-center",
      "p-4",
      "rounded-lg",
      "shadow-md"
    );

    const postTitle = document.createElement("p");
    postTitle.textContent = post.title;
    postTitle.classList.add(
      "text-text-950",
      "font-medium",
      "text-lg",
      "truncate"
    );

    const postBtnWrapper = document.createElement("div");
    postBtnWrapper.classList.add("flex", "gap-4");

    const goToPost = document.createElement("a");
    goToPost.classList.add(
      "bg-secondary-200",
      "rounded-lg",
      "hover:bg-secondary-400",
      "text-lg",
      "px-3"
    );
    goToPost.textContent = "👁️";
    goToPost.href = `/post/?post=${post.id}`;
    postBtnWrapper.appendChild(goToPost);

    const userToCompare = compareUsers(post.owner);
    if (userToCompare === true) {
      const editBtn = document.createElement("a");
      const pencil = document.createElement("i");
      pencil.className = "fas fa-pencil";
      editBtn.appendChild(pencil);
      editBtn.href = `/post/edit/?post=${post.id}`;
      postBtnWrapper.appendChild(editBtn);
      pencil.classList.add(
        "bg-secondary-200",
        "rounded-lg",
        "hover:bg-secondary-400",
        "text-lg",
        "px-3"
      );
    }

    postElement.appendChild(postTitle);
    postElement.appendChild(postBtnWrapper);

    postContainer.appendChild(postElement);
  });
}
