const _ = require('lodash')
const authors = require('./authors')

hexo.extend.helper.register('next', function (site, page) {
  let all = _.flatten(_.values(hexo.config.docs_groups))
  let path = page.path.replace(/\.html$/, '')
  let next = all[_.findIndex(all, p => p === path) + 1]
  return _.find(site.pages.data, p => p.path === next + '.html')
});

hexo.extend.helper.register('prev', function (site, page) {
  let all = _.flatten(_.values(hexo.config.docs_groups))
  let path = page.path.replace(/\.html$/, '')
  let prev = all[_.findIndex(all, p => p === path) - 1]
  return _.find(site.pages.data, p => p.path === prev + '.html')
});

hexo.extend.helper.register('getAuthor', function (name) {
  return authors[name]
});
