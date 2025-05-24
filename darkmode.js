const darkToggle = document.getElementById("darkmode-toggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const thumb = darkToggle.querySelector(".toggle-thumb");
  thumb.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
