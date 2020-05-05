const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar-mobile');
const content = document.getElementById('all-content-wrapper');
if (sidebarToggle) sidebarToggle.addEventListener('click', () => {
  if (sidebar.classList.contains('sidebar-toggled') || content.classList.contains('sidebar-toggled')) {
    sidebar.classList.remove('sidebar-toggled');
    content.classList.remove('sidebar-toggled');
  } else {
    sidebar.classList.add('sidebar-toggled');
    content.classList.add('sidebar-toggled');
  }
});

new ActiveMenuLink.default('.sidebar.toc', { activeClass: 'current', headerHeight: 0 });

const snackbar = document.querySelector('.grain-snackbar');
const closeSnackbar = () => {
  snackbar.classList.remove('open');
};
const grainNotify = (content, duration) => {
  snackbar.textContent = content
  snackbar.classList.add('open')
  setTimeout(closeSnackbar, duration)
};

const codeCopied = () => grainNotify('Code copied to clipboard!', 3000);

document.querySelectorAll('.tm-highlight').forEach((code) => {
  const copy = code.querySelector('.code-copy');
  const text = code.querySelector('.code');
  copy.addEventListener('click', () => {
    navigator.clipboard.writeText(text.innerText);
    grainNotify('Code copied to clipboard!', 3000);
  });
});
