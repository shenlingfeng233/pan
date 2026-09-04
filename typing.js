const typingTitles = [...document.querySelectorAll(".typing-title, #gender-hero-title")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const timers = new WeakMap();

function setupTypingTitle(title) {
  const lines = [...title.querySelectorAll(".typing-line")];
  const texts = lines.map((line) => line.dataset.text || "");
  const totalCharacters = texts.reduce((total, text) => total + text.length, 0);
  let characterCount = 0;
  let deleting = false;

  lines.forEach((line, index) => {
    line.style.width = "auto";
    line.textContent = texts[index];
    line.style.width = `${line.getBoundingClientRect().width}px`;
    line.textContent = "";
  });

  if (reducedMotion) {
    lines.forEach((line, index) => { line.textContent = texts[index]; });
    return;
  }

  function render() {
    let remaining = characterCount;
    lines.forEach((line, index) => {
      const visible = Math.min(Math.max(remaining, 0), texts[index].length);
      line.textContent = texts[index].slice(0, visible);
      remaining -= texts[index].length;
    });
  }

  function tick() {
    render();
    if (!deleting && characterCount < totalCharacters) {
      characterCount += 1;
      timers.set(title, window.setTimeout(tick, 105));
    } else if (!deleting) {
      deleting = true;
      timers.set(title, window.setTimeout(tick, 1000));
    } else if (characterCount > 0) {
      characterCount -= 1;
      timers.set(title, window.setTimeout(tick, 58));
    } else {
      deleting = false;
      timers.set(title, window.setTimeout(tick, 350));
    }
  }

  tick();
}

function resetTypingTitles() {
  typingTitles.forEach((title) => {
    const timer = timers.get(title);
    if (timer) window.clearTimeout(timer);
    setupTypingTitle(title);
  });
}

window.resetTypingTitles = resetTypingTitles;
typingTitles.forEach(setupTypingTitle);

if (document.fonts) {
  document.fonts.ready.then(resetTypingTitles);
}
