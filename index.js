const typingLines = [...document.querySelectorAll(".typing-line")];
const fullTexts = typingLines.map((line) => line.dataset.text);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function reserveLineWidths() {
  typingLines.forEach((line, index) => {
    line.style.width = "auto";
    line.textContent = fullTexts[index];
    line.style.width = `${line.getBoundingClientRect().width}px`;
    line.textContent = reducedMotion ? fullTexts[index] : "";
  });
}

reserveLineWidths();

if (reducedMotion) {
  typingLines.forEach((line, index) => {
    line.textContent = fullTexts[index];
  });
} else {
  let characterCount = 0;
  let deleting = false;

  function renderTitle() {
    let remaining = characterCount;

    typingLines.forEach((line, index) => {
      const text = fullTexts[index];
      const visibleCharacters = Math.min(Math.max(remaining, 0), text.length);
      line.textContent = text.slice(0, visibleCharacters);
      remaining -= text.length;
    });
  }

  function typeTitle() {
    const totalCharacters = fullTexts.reduce((total, text) => total + text.length, 0);
    renderTitle();

    if (!deleting && characterCount < totalCharacters) {
      characterCount += 1;
      window.setTimeout(typeTitle, 105);
      return;
    }

    if (!deleting) {
      deleting = true;
      window.setTimeout(typeTitle, 1000);
      return;
    }

    if (characterCount > 0) {
      characterCount -= 1;
      window.setTimeout(typeTitle, 58);
      return;
    }

    deleting = false;
    window.setTimeout(typeTitle, 350);
  }

  typeTitle();
}

if (document.fonts) {
  reserveLineWidths();
}
