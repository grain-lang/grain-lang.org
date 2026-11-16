const authors = require('./authors')

hexo.extend.helper.register('next', function (site, page) {
  const all = Object.values(hexo.config.docs_groups).flat();
  const path = page.path.replace(/\.html$/, '');
  const nextIndex = all.findIndex(p => p === path) + 1;
  const next = all[nextIndex];
  return site.pages.data.find(p => p.path === next + '.html');
});

hexo.extend.helper.register('prev', function (site, page) {
  const all = Object.values(hexo.config.docs_groups).flat();
  const path = page.path.replace(/\.html$/, '');
  const prevIndex = all.findIndex(p => p === path) - 1;
  const prev = all[prevIndex];
  return site.pages.data.find(p => p.path === prev + '.html');
});

hexo.extend.helper.register('getAuthor', function (name) {
  return authors[name]
});
