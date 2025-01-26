import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  // Reset error messages
  const errorContainer = document.querySelector(".error-container");
  const errorMessage = document.querySelector("#error-msg");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  errorContainer.classList.add("hidden");
  errorMessage.textContent = "";
  nameError.classList.add("hidden");
  emailError.classList.add("hidden");
  passwordError.classList.add("hidden");

  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  let valid = true;

  // Validate the name field
  if (!name) {
    nameError.textContent = "Name is required!";
    nameError.classList.remove("hidden");
    valid = false;
  } else if (!/^[\w]+$/.test(name)) {
    nameError.textContent =
      "Invalid username. Only letters, numbers, and the underscore (_) are permitted.";
    nameError.classList.remove("hidden");
    valid = false;
  }

  // Validate the email field
  if (!email) {
    emailError.textContent = "Email is required!";
    emailError.classList.remove("hidden");
    valid = false;
  } else if (!/^[\w\-.]+@(stud\.)?noroff\.no$/.test(email)) {
    emailError.textContent =
      "Please enter a valid email address (noroff.no or stud.noroff.no).";
    emailError.classList.remove("hidden");
    valid = false;
  }

  // Validate the password field
  if (!password) {
    passwordError.textContent = "Password is required!";
    passwordError.classList.remove("hidden");
    valid = false;
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long.";
    passwordError.classList.remove("hidden");
    valid = false;
  }

  // If any validation fails, stop submission
  if (!valid) {
    errorContainer.classList.remove("hidden");
    errorMessage.textContent = "Please fix the errors above and try again.";
    return;
  }

  // If validation passes, call the API
  try {
    const data = await register({
      name,
      email,
      password,
    });

    if (!data) {
      throw new Error(
        "Sorry for the inconvenience, couldn't register new user."
      );
    }

    const goLogin = confirm(
      `User, ${data.data.name}, was successfully registered. Do you want to continue to login?`
    );

    if (goLogin) {
      window.location.href = "/auth/login/";
    }
  } catch (error) {
    console.error("Registration failed:", error);
    errorContainer.classList.remove("hidden");
    errorMessage.textContent =
      error.message || "An error occurred during registration.";
  }
}
