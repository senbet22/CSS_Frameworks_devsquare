/**
 * @description
 * This function clears the content of the element with ID "posts-container" and
 * appends a new set of post elements. Each post element includes the post's media image,
 * author's avatar and name, comment count, and creation date.
 *
 */

import { timeSinceCreated } from "../../utilities/timeSinceCreated";

export function renderPosts(posts, pageCount) {
  const maxPageLimit = document.querySelectorAll(".max-page");
  maxPageLimit.forEach((element) => {
    element.textContent = `of ${pageCount}`;
  });

  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const timeAgo = timeSinceCreated(post.created);
    const imgSrc = post.media?.url || "/images/noroff-logo.png";
    const imgAlt = post.media?.alt || "Post image";

    const postElement = document.createElement("a");
    postElement.href = `/post/?post=${post.id}`;
    postElement.className = `
      post-article flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden
      w-full max-w-xl mx-auto my-6 cursor-pointer hover:shadow-xl transition
    `;

    // Image wrapper
    const imgWrapper = document.createElement("div");
    imgWrapper.className =
      "w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden";
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    img.className = "w-full h-full object-cover"; // fixed height, consistent card size
    imgWrapper.appendChild(img);

    // Content wrapper
    const content = document.createElement("div");
    content.className = "p-6 flex flex-col gap-4";

    // Title
    const titleEl = document.createElement("div");
    titleEl.textContent = post.title;
    titleEl.className = "text-xl font-bold line-clamp-2";
    content.appendChild(titleEl);

    // Author & comments
    const infoDiv = document.createElement("div");
    infoDiv.className = "flex justify-between items-center";

    const authorDiv = document.createElement("div");
    authorDiv.className = "flex items-center gap-3";
    const avatar = document.createElement("img");
    avatar.src = post.author.avatar.url;
    avatar.alt = post.author.avatar.alt;
    avatar.className = "w-10 h-10 rounded-full object-cover";
    const authorName = document.createElement("p");
    authorName.textContent = post.author.name;
    authorName.className = "font-medium text-lg";
    authorDiv.appendChild(avatar);
    authorDiv.appendChild(authorName);

    const comments = document.createElement("p");
    comments.innerHTML = `💬 <b>${post.comments.length}</b>`;
    comments.className = "text-lg font-medium";

    infoDiv.appendChild(authorDiv);
    infoDiv.appendChild(comments);

    content.appendChild(infoDiv);

    // Dates
    const dateDiv = document.createElement("div");
    dateDiv.className = "flex justify-between text-text-700 mt-2";
    const createdDate = document.createElement("p");
    createdDate.textContent = post.created.slice(0, 10);
    const timeStamp = document.createElement("p");
    timeStamp.textContent = timeAgo;
    dateDiv.appendChild(createdDate);
    dateDiv.appendChild(timeStamp);

    content.appendChild(dateDiv);

    postElement.appendChild(imgWrapper);
    postElement.appendChild(content);

    postsContainer.appendChild(postElement);
  });
}
