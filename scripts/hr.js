hexo.extend.filter.register('marked:renderer', function (renderer) {
  renderer.prototype.heading = function (text, level, raw) {
    const id = raw
      .trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '')
      // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '-')
      .replace(/\s/g, '-');
    const header = `<h${level} id="${id}">${text}<a class="header-link" href="#${id}"><i class="fas fa-link"></i></a></h${level}>`
    if (level == 2) {
      return `<hr>${header}`
    } else {
      return header
    }
  }
})
