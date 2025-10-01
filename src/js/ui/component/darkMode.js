// Icons
const sunIcons = document.querySelectorAll(".sun");
const moonIcons = document.querySelectorAll(".moon");

// Theme Vars
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Icon Toggling
const iconToggle = () => {
  moonIcons.forEach((icon) => icon.classList.toggle("hidden"));
  sunIcons.forEach((icon) => icon.classList.toggle("hidden"));
};

// Initial Theme Check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcons.forEach((icon) => icon.classList.add("hidden"));
    return;
  }
  sunIcons.forEach((icon) => icon.classList.add("hidden"));
};

// Manual Theme Switch
const ThemeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};

// Add event listeners to all dark mode toggle buttons (desktop and mobile)
sunIcons.forEach((icon) => {
  icon.addEventListener("click", ThemeSwitch);
});

moonIcons.forEach((icon) => {
  icon.addEventListener("click", ThemeSwitch);
});

// Invoke theme check on initial load
themeCheck();
