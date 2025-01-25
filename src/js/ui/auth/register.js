import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const errorContainer = document.querySelector(".error-container");
  const errorMessage = document.querySelector("#error-msg");

  // Initially hide the error container and clear all error messages
  errorContainer.classList.add("hidden");
  errorMessage.textContent = "";
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  // Get form values
  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  let valid = true;

  // Validate the name field
  if (!name) {
    document.getElementById("nameError").textContent = "Name is required!";
    valid = false;
  } else if (!/^[\w]+$/.test(name)) {
    document.getElementById("nameError").textContent =
      "Invalid username. Only letters, numbers, and the underscore (_) are permitted.";
    valid = false;
  }

  // Validate the email field
  if (!email) {
    document.getElementById("emailError").textContent = "Email is required!";
    valid = false;
  } else if (!/^[\w\-.]+@(stud\.)?noroff\.no$/.test(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email address (noroff.no or stud.noroff.no).";
    valid = false;
  }

  // Validate the password field
  if (!password) {
    document.getElementById("passwordError").textContent =
      "Password is required!";
    valid = false;
  } else if (password.length < 8) {
    document.getElementById("passwordError").textContent =
      "Password must be at least 8 characters long.";
    valid = false;
  }

  // If any validation fails, show the error container with a general message
  if (!valid) {
    errorContainer.classList.remove("hidden");
    errorMessage.textContent = "Please fix the errors above and try again.";
    return;
  }

  // If validation passes, proceed with API call
  try {
    const data = await register({ name, email, password });

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
