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