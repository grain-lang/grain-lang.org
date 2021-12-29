const _ = require("lodash");
const authors = require("./authors");

hexo.extend.helper.register("next", function (site, page) {
  let all = _.flatMap(_.flatten(_.values(hexo.config.docs_groups)), (page) => {
    if (typeof page === "string") {
      return [page];
    } else {
      let key = Object.keys(page)[0];
      return [key, ...page[key]];
    }
  });
  let path = page.path.replace(/(\/index)?\.html$/, "");
  let next = all[_.findIndex(all, (p) => p === path) + 1];
  return _.find(
    site.pages.data,
    (p) => p.path === next + ".html" || p.path === next + "/index.html"
  );
});

hexo.extend.helper.register("prev", function (site, page) {
  let all = _.flatMap(_.flatten(_.values(hexo.config.docs_groups)), (page) => {
    if (typeof page === "string") {
      return [page];
    } else {
      let key = Object.keys(page)[0];
      return [key, ...page[key]];
    }
  });
  let path = page.path.replace(/(\/index)?\.html$/, "");
  let prev = all[_.findIndex(all, (p) => p === path) - 1];
  return _.find(
    site.pages.data,
    (p) => p.path === prev + ".html" || p.path === prev + "/index.html"
  );
});

hexo.extend.helper.register("getAuthor", function (name) {
  return authors[name];
});
