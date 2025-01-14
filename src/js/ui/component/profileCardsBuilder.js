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
    const message = document.createElement("p");
    message.textContent = emptyMessage;
    targetContainer.appendChild(message);
  }

  profiles.forEach((profile) => {
    const link = document.createElement("a");
    link.classList.add("user-profile");
    link.href = `/profile/?profile=${profile.name}`;

    const img = document.createElement("img");
    img.src = profile.avatar.url;
    img.alt = profile.name;

    const paragraph = document.createElement("p");
    paragraph.textContent = profile.name;

    link.appendChild(img);
    link.appendChild(paragraph);

    targetContainer.appendChild(link);
  });
}
