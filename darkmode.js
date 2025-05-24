const darkToggle = document.getElementById("darkmode-toggle");
const thumb = darkToggle.querySelector(".toggle-thumb");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  thumb.textContent = isDark ? "🌑" : "️☀️";

  if (isDark) {
    darkToggle.classList.add("active");
  } else {
    darkToggle.classList.remove("active");
  }
});