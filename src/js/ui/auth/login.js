import { login } from "../../api/auth/login.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export async function onLogin(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const data = await login({ email, password });

    const { accessToken, ...userData } = data.data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("adminUser", JSON.stringify(userData));

    Toastify({
      text: "Login successful! Redirecting...",
      duration: 2000,
    }).showToast();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    console.error("Login failed:", error);
    Toastify({
      text: error.message || "Login failed",
      duration: 2000,
    }).showToast();
  }
}
