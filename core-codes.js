const codeTabs = [...document.querySelectorAll('.codes-tab')];
const codePanels = codeTabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

function showCodeSection(index, moveFocus = false) {
  codeTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    codePanels[tabIndex].hidden = !active;
  });
  if (moveFocus) codeTabs[index].focus();
}

codeTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showCodeSection(index));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % codeTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + codeTabs.length) % codeTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = codeTabs.length - 1;
    else return;
    event.preventDefault();
    showCodeSection(nextIndex, true);
  });
});

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
