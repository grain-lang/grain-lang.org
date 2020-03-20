const fs = require('fs');
const vsctm = require('vscode-textmate');

const registry = new vsctm.Registry({
  loadGrammar: (scopeName) => {
    if (scopeName === 'source.grain') {
      let path = './vscode-grain/syntaxes/grain.json'
      let grammar = fs.readFileSync(path)
      return vsctm.parseRawGrammar(grammar.toString(), path)
    }
    console.log(`Unknown scope name: ${scopeName}`);
    return null;
  }
});

registry.loadGrammar('source.grain').then(grammar => {
  function makeGutter(numLines) {
    let line = (num) => `<span class="line">${num}</span><br>`
    let lines = []
    for (let i = 1; i <= numLines; i++) {
      lines.push(line(i))
    }
    return `<td class="gutter"><pre>${lines.join('')}</pre></td>`
  }
  
  hexo.extend.filter.register('marked:renderer', function(renderer) {
    renderer.prototype.code = function(code, info, escaped) {
      let text = code.split('\n')
    
      let ruleStack = vsctm.INITIAL;
      let result = []
      for (let i = 0; i < text.length; i++) {
        const line = text[i];
        const lineTokens = grammar.tokenizeLine(line, ruleStack);
        const lineRes = []
        for (let j = 0; j < lineTokens.tokens.length; j++) {
          const token = lineTokens.tokens[j];
          const tokenString = line.substring(token.startIndex, token.endIndex)
          const classString = token.scopes.map(scope => scope.replace(/\./g, ' ')).join(' ')
          lineRes.push(`<span class="${classString}">${tokenString}</span>`)
        }
        result.push(`<span class="line">${lineRes.join('')}</span><br>`)
        ruleStack = lineTokens.ruleStack;
      }

      return `<figure class="tm-highlight"><table><tbody><tr>${makeGutter(text.length)}<td class="code"><pre>${result.join('')}</pre></td></tr></tbody></table></figure>`;
    }
  })
})
