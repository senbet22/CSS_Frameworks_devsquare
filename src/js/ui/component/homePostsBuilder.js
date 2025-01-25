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
    const postElement = document.createElement("a");
    postElement.className =
      "post-article bg-background-200  w-full mx-auto shadow-md my-6 px-6";
    postElement.href = `/post/?post=${post.id}`;

    const imgSrc = post.media && post.media.url ? post.media.url : "";
    const imgAlt = post.media && post.media.alt ? post.media.alt : "";

    const timeAgo = timeSinceCreated(post.created);

    postElement.innerHTML = `
            <h2 class="text-2xl break-words py-8"> ${post.title} </h2>   
            <div class="temp-bg">
                <img class="post-img rounded w-full max-h-64 object-contain" 
                src="${imgSrc ? imgSrc : "/images/noroff-logo.png"}" 
                alt="${imgSrc ? imgAlt : "noroff logo"}">
            </div>
            <div class="intel-wrapper flex items-start justify-between space-x-4 mt-4">
                <div class="profile-user py-2">
                    <img class="avatar w-10 h-10 rounded" 
                    src="${post.author.avatar.url}" 
                    alt="${post.author.avatar.alt}">
                    <p class="font-bold text-lg">${post.author.name}</p>
                </div>
                <p class="" id="comments-length"><span>💬</span><b>${
                  post.comments.length
                }</b></p>                
            </div>
            <div class="post-info mt-4 flex justify-between">
                <p class="text-lg font-medium">${post.created.slice(0, 10)}</p>
                <p class="time-stamp mb-5 text-lg font-normal">${timeAgo}</p>
            </div>
            
        `;

    postsContainer.appendChild(postElement);
  });
}
