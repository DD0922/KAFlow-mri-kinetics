document.querySelectorAll('.code-copy').forEach(button => {
  button.addEventListener('click', async () => {
    const lines = [...button.closest('.code-pane').querySelectorAll('.code-line')];
    const code = lines.map(line => line.textContent).join('\n');
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Copy failed';
    }
    window.setTimeout(() => { button.textContent = 'Copy code'; }, 1800);
  });
});
