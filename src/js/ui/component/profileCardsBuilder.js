/**
 * Creates an array of link elements with nested div, image, and paragraph,
 * or appends a message element if the provided array is empty, directly to a specified container.
 *
 * @param {Array} profiles - Array of profile objects.
 * @param {string} emptyMessage - Message to display if the array is empty.
 * @param {string} container - ID of the container to append elements to ("followers" or "following").
 */
export async function createProfileLink(profiles, emptyMessage, container) {
  const targetContainer = document.getElementById(
    container === "followers" ? "followers-list" : "following-list"
  );

  targetContainer.innerHTML = "";

  if (!targetContainer) {
    console.error(
      `Container with ID "${
        container === "followers" ? "followers-list" : "following-list"
      }" not found.`
    );
    return;
  }

  if (profiles.length === 0) {
    targetContainer.innerHTML = `<p class=\"text-gray-500 text-center mt-4\">${emptyMessage}</p>`;
    return;
  }

  profiles.forEach((profile) => {
    const linkTemplate = `
      <a href=\"/profile/?profile=${profile.name}\" class=\"user-profile flex items-center space-x-4  my-4 border rounded\">
        <img src=\"${profile.avatar.url}\" alt=\"${profile.name}\" class=\"w-8 h-8 rounded-full\" />
        <p class=\"text-lg text-gray-700\">${profile.name}</p>
      </a>
    `;

    targetContainer.insertAdjacentHTML("beforeend", linkTemplate);
  });
}
