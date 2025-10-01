/**
 * Creates and displays comments for a post.
 *
 * @async
 * @function createComment
 * @param {Array} comments - An array of comment objects. Each comment should include `author` (with `avatar.url` and `name`), `body`, and `created`.
 * @returns {void} Returns early with a message if no comments are provided or the array is empty.
 *
 * @description This function dynamically generates and displays comment elements within the "comments-area" section of the DOM.
 * It clears the current content, checks for empty or missing comments, and populates the section with styled elements
 * representing each comment, including the author's profile picture, name, time since creation, and the comment body.
 */

import { timeSinceCreated } from "../../utilities/timeSinceCreated";

export async function createComment(comments) {
  const commentsArea = document.getElementById("comments-area");
  commentsArea.textContent = "";

  if (!comments || comments.length === 0) {
    commentsArea.textContent = "This post has no comments";
    return;
  }

  comments.forEach((comment) => {
    const { author, body } = comment;

    const commentWrapper = document.createElement("div");
    commentWrapper.classList.add("comment-wrapper");
    commentWrapper.className =
      "bg-background-50 flex flex-col max-w-6xl shadow-md";

    const profileCommenter = document.createElement("div");
    profileCommenter.classList.add("profile-commenter");
    profileCommenter.className = "m-4";

    const img = document.createElement("img");
    img.src = author.avatar.url;
    img.alt = `${author.name}'s profile picture`;
    img.className = "h-16 w-16 rounded shadow-md";

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = author.name;
    nameParagraph.className = "font-medium text-lg";

    const timeAgo = timeSinceCreated(comment.created);
    const timeCreated = document.createElement("p");
    timeCreated.id = "time";
    timeCreated.textContent = timeAgo;
    timeCreated.className = "ml-auto m-4";

    profileCommenter.appendChild(img);
    profileCommenter.appendChild(nameParagraph);

    const commentParagraph = document.createElement("p");
    commentParagraph.classList.add("comment");
    commentParagraph.className = "ml-4";
    commentParagraph.innerHTML = body.replace(/\n/g, "<br>");

    commentWrapper.appendChild(profileCommenter);
    commentWrapper.appendChild(commentParagraph);
    commentWrapper.appendChild(timeCreated);

    commentsArea.appendChild(commentWrapper);
  });
}
