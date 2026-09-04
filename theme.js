(function () {
  const key = "self-lab-theme";
  const saved = localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");

  document.documentElement.dataset.theme = theme;

  function updateButton(button) {
    const dark = document.documentElement.dataset.theme === "dark";
    button.innerHTML = dark ? "☼ <span>浅色模式</span>" : "☾ <span>深色模式</span>";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute("aria-label", dark ? "切换到浅色模式" : "切换到深色模式");
  }

  function setup() {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    updateButton(button);
    button.addEventListener("click", function () {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem(key, next);
      updateButton(button);
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#17181c" : "#f1efe9");
      document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    });
  }

  document.addEventListener("DOMContentLoaded", setup);
}());
