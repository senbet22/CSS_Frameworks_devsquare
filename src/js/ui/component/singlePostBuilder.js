/**
 * Renders and structures HTML elements to display a post's content including title, body, image, author details, tags, and timestamps.
 *
 * This function creates a structured section of HTML to display key details of a given post, such as title, body, main image,
 * author information, and timestamps, and appends them to the "post-container" element in the DOM.
 * Additionally, it includes "Edit" and "Delete" buttons for the post, which are conditionally displayed
 * based on whether the logged-in user is the post author.
 *
 * @param {Object} post - The data object containing the post details to be displayed.
 */

import { timeSinceCreated } from "../../utilities/timeSinceCreated";
import { onDeletePost } from "../post/delete";

export function createPostContent(post) {
  const { id, title, body, media, author, tags, created } = post;

  const timeSince = timeSinceCreated(created);

  const postContainer = document.getElementById("post-container");

  const postSection = document.createElement("section");
  postSection.id = "post-content";
  postSection.className = "shadow my-6 px-10";

  const titleElement = document.createElement("h1");
  titleElement.textContent = title;
  titleElement.className = "text-2xl font-bold py-10";

  const postImg = document.createElement("img");
  postImg.src = media ? media.url : "";
  postImg.alt = media ? media.alt : "";
  postImg.className = "w-full sm:w-1/2 min-h-52 mb-5";

  const bodyDiv = document.createElement("div");
  const bodyParagraph = document.createElement("p");
  bodyParagraph.textContent = body;
  bodyDiv.appendChild(bodyParagraph);
  bodyDiv.className = "my-5 text-lg flex";

  const tagsElement = document.createElement("p");
  tagsElement.innerHTML = `Tags: <b> ${
    tags.length > 0 ? tags.join(", ") : "No tags available"
  }</b>`;

  const createdElement = document.createElement("p");
  createdElement.innerHTML = `Date: <b> ${created.slice(0, 10)}</b>`;

  const timeSinceElement = document.createElement("p");
  timeSinceElement.innerHTML = `Created since: <b>${timeSince} </b>`;

  tagsElement.className = "mb-2 text-lg";
  createdElement.className = "mb-2 text-lg";
  timeSinceElement.className = "pb-5 text-lg";

  postSection.appendChild(titleElement);
  postSection.appendChild(postImg);
  postSection.appendChild(bodyDiv);
  postSection.appendChild(tagsElement);
  postSection.appendChild(createdElement);
  postSection.appendChild(timeSinceElement);

  const authorSection = document.createElement("section");
  authorSection.id = "author-section";
  authorSection.className =
    "bg-background-50 flex items-center h-30 w-full max-w-5xl p-4 rounded-lg shadow";

  const authorLink = document.createElement("a");
  authorLink.classList.add("authorLink");
  authorLink.href = `/profile/?profile=${author.name}`;
  authorLink.className =
    "flex flex-col sm:flex-row w-fit items-center bg-secondary-200 hover:bg-secondary-300 py-4 pl-4 pr-10 text-lg font-medium rounded-lg space-x-2";

  const authorAvatar = document.createElement("img");
  authorAvatar.id = "profile-avatar";
  authorAvatar.src = author.avatar.url;
  authorAvatar.alt = `${author.name}'s avatar`;
  authorAvatar.className = " h-10 w-10 sm:h-16 sm:w-16 rounded-lg";

  const authorNameElement = document.createElement("p");
  authorNameElement.id = "profile-name";
  authorNameElement.textContent = author.name;
  authorSection.appendChild(authorLink);

  const localName = JSON.parse(localStorage.getItem("adminUser"));
  if (author.name === localName.name) {
    const editorDiv = document.createElement("div");
    editorDiv.id = "editorOptions";
    editorDiv.className =
      "sm:w-full justify-end flex flex-col sm:flex-row space-x-4 mt-4";
    // editorDiv.classList.add("hidden");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete post";
    deleteBtn.className =
      "bg-accent-400  px-4 py-2 rounded-lg hover:bg-accent-700 transition text-sm font-small sm:text-lg sm:font-medium";
    deleteBtn.id = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.setAttribute("data-id", id);
    deleteBtn.addEventListener("click", (event) => {
      const deletePost = confirm("Do you really want to delete this post?");
      if (!deletePost) return;

      onDeletePost(event);
    });

    const editBtn = document.createElement("a");
    editBtn.className =
      "bg-primary-400 mb-4 sm:mb-0 mx-4 px-4 py-2 rounded-lg hover:bg-primary-600 transition text-sm font-small sm:text-lg sm:font-medium";
    editBtn.classList.add("edit-btn");
    editBtn.href = `/post/edit/?post=${id}`;
    editBtn.textContent = "Edit post";

    editorDiv.appendChild(editBtn);
    editorDiv.appendChild(deleteBtn);

    authorSection.appendChild(editorDiv);
  }

  authorLink.appendChild(authorAvatar);
  authorLink.appendChild(authorNameElement);

  postContainer.appendChild(postSection);
  postContainer.appendChild(authorSection);

  return;
}
