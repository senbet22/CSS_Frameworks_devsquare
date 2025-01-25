/**
 * Creates and returns a profile update form for users.
 *
 * @function createUpdateProfileForm
 * @returns {HTMLElement} A section element containing the profile update form.
 *
 * @description Dynamically generates a profile update form, including inputs for updating bio, avatar, and banner details.
 * This form is made to be used on a user's own profile page. It includes text inputs, a textarea for the bio,
 * and placeholders to guide the user. Additionally, the function appends an error message container for validation feedback.
 */

export function createUpdateProfileForm() {
  const section = document.createElement("section");
  section.id = "update-profile";
  section.className =
    "flex flex-col items-center justify-center min-h-screen bg-background-50 text-text-950 px-6";

  const container = document.createElement("div");
  container.className =
    "max-small-container bg-secondary-50 rounded-lg p-8 shadow-md w-full max-w-5xl";
  section.appendChild(container);

  const h4 = document.createElement("h4");
  h4.textContent = "Update Profile";
  h4.className = "text-2xl font-bold text-secondary-500 mb-6";
  container.appendChild(h4);

  const form = document.createElement("form");
  form.name = "updateProfile";
  form.className = "space-y-6";

  const hiddenDiv = document.createElement("div");
  const inputUsername = document.createElement("input");
  inputUsername.id = "profile-editor";
  inputUsername.type = "hidden";
  inputUsername.name = "username";
  inputUsername.value = "";
  hiddenDiv.appendChild(inputUsername);
  form.appendChild(hiddenDiv);

  const createInputGroup = (
    labelText,
    inputType,
    inputName,
    inputId,
    placeholder,
    maxLength = null
  ) => {
    const groupDiv = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    label.className = "block text-text-950 text-md font-medium mb-2";
    groupDiv.appendChild(label);

    const input = document.createElement(
      inputType === "textarea" ? "textarea" : "input"
    );
    input.name = inputName;
    input.id = inputId;
    input.placeholder = placeholder;
    input.className =
      "w-full p-3 border rounded-lg bg-background-50 text-text-900 focus:ring-2 focus:ring-accent-200 focus:outline-none";
    if (inputType !== "textarea") input.type = inputType;
    if (maxLength) input.maxLength = maxLength;
    if (inputType === "textarea") input.rows = 4;

    groupDiv.appendChild(input);
    return groupDiv;
  };

  form.appendChild(
    createInputGroup(
      "Bio:",
      "textarea",
      "bio",
      "bio",
      "Write your bio here...",
      280
    )
  );
  form.appendChild(
    createInputGroup(
      "Avatar Image Source (URL):",
      "text",
      "avatarSrc",
      "avatarSrc",
      "Enter avatar image URL"
    )
  );
  form.appendChild(
    createInputGroup(
      "Avatar Image Alt Text:",
      "text",
      "avatarAlt",
      "avatarAlt",
      "Enter avatar alt text",
      120
    )
  );
  form.appendChild(
    createInputGroup(
      "Banner Image Source (URL):",
      "text",
      "bannerSrc",
      "bannerSrc",
      "Enter banner image URL"
    )
  );
  form.appendChild(
    createInputGroup(
      "Banner Image Alt Text:",
      "text",
      "bannerAlt",
      "bannerAlt",
      "Enter banner alt text",
      120
    )
  );

  const submitButton = document.createElement("button");
  submitButton.className =
    "common-btn w-full bg-secondary-300 text-text-950 font-bold py-3 rounded-lg hover:bg-secondary-400 transition duration-300";
  submitButton.type = "submit";
  submitButton.textContent = "Submit";

  form.appendChild(submitButton);
  container.appendChild(form);

  const errorMsgDiv = document.createElement("div");
  errorMsgDiv.id = "error-update-msg";
  errorMsgDiv.className = "error-container text-center text-accent-500 mt-4";
  container.appendChild(errorMsgDiv);

  return section;
}
