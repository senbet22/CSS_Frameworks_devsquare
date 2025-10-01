/**
 * @module pagination
 *
 * Initializes pagination functionality for navigating through pages.
 *
 * @description
 * This module sets up event listeners and UI updates for pagination elements, allowing the user to navigate
 * between pages by clicking "next" and "previous" buttons or by entering a page number in input fields.
 * It also updates the pagination UI to reflect the current page and disables buttons appropriately
 * based on the current page and total page count.
 *
 * Pagination functions:
 * - `initializeHome`: Initializes the homepage with posts and updates the pagination controls.
 * - `nextPage`: Loads the next set of posts without a full page refresh.
 * - `prevPage`: Loads the previous set of posts without a full page refresh.
 * - `goToPage`: Loads posts from a specific page as entered by the user.
 *
 * @function initializeHome
 * @description
 * Fetches and displays posts for the current page and updates pagination controls.
 * This function calls the `updatePaginationControls` function to adjust the UI based on current pagination state.
 *
 */

import { readPosts } from "../../api/post/read";
import { renderPosts } from "./homePostsBuilder";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const urlSearch = new URLSearchParams(window.location.search);
let currentPage = urlSearch.get("page")
  ? parseInt(urlSearch.get("page"), 10)
  : 1;

if (isNaN(currentPage) || currentPage < 1) {
  currentPage = 1;
}

const limit = 12;
let metaData = null;

export async function initializeHome() {
  try {
    const { data, meta } = await readPosts(limit, currentPage);

    if (currentPage > meta.pageCount) {
      Toastify({
        text: "You have ventured too far. Taking you back to page 1.",
        duration: 2000,
      }).showToast();

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }

    if (!data && !meta) {
      throw new Error(
        "Posts from API was not found. Try again some other time"
      );
    }

    metaData = meta;

    renderPosts(data);

    updatePaginationControls();
    updateUrlWithPage(currentPage);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

function updateUrlWithPage(page) {
  const newUrl = new URL(window.location);
  newUrl.searchParams.set("page", page);
  window.history.pushState({}, "", newUrl);
}

function updatePaginationControls() {
  currentPage = metaData.currentPage;

  document.querySelectorAll(".prev-posts").forEach((button) => {
    button.disabled = metaData.isFirstPage;
  });
  document.querySelectorAll(".next-posts").forEach((button) => {
    button.disabled = metaData.isLastPage;
  });

  document.querySelectorAll(".go-to").forEach((input) => {
    input.value = currentPage;
  });

  document.querySelectorAll(".max-page").forEach((el) => {
    el.textContent = `of ${metaData.pageCount}`;
  });
}

export async function nextPage() {
  if (!metaData.isLastPage) {
    currentPage += 1;
    await initializeHome();
    updateUrlWithPage(currentPage);
  }
}

export async function prevPage() {
  if (!metaData.isFirstPage) {
    currentPage -= 1;
    await initializeHome();
    updateUrlWithPage(currentPage);
  }
}

export async function goToPage(pageInput) {
  if (!isNaN(pageInput) && pageInput >= 1 && pageInput <= metaData.pageCount) {
    currentPage = pageInput;
  }

  await initializeHome();
  updateUrlWithPage(currentPage);
}
