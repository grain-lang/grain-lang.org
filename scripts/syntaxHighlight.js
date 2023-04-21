const fs = require("fs");
const vsctm = require("vscode-textmate");
const onig = require("onigasm");
const onigWasm = require.resolve("onigasm/lib/onigasm.wasm");

const wasm = fs.readFileSync(onigWasm).buffer;

hexo.extend.filter.register("after_init", initialize);
hexo.extend.filter.register("marked:renderer", hookRenderer);

function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag] || tag)
  );
}

async function initialize() {
  await onig.loadWASM(wasm);

  const registry = new vsctm.Registry({
    onigLib: Promise.resolve({
      createOnigScanner: (sources) => new onig.OnigScanner(sources),
      createOnigString: (str) => new onig.OnigString(str),
    }),
    loadGrammar: async (scopeName) => {
      let path;
      switch (scopeName) {
        case "source.grain": {
          path =
            "./grain-language-server/editor-extensions/vscode/syntaxes/grain.json";
          break;
        }
        case "source.ebnf": {
          path = "./grammars/EBNF.tmLanguage";
          break;
        }
        default: {
          console.log(`Unknown scope name: ${scopeName}`);
          return null;
        }
      }
      let grammar = fs.readFileSync(path);
      return vsctm.parseRawGrammar(grammar.toString(), path);
    },
  });

  const [grain, ebnf] = await Promise.all([
    registry.loadGrammar("source.grain"),
    registry.loadGrammar("source.ebnf"),
  ]);

  this.grammars = {
    grain,
    gr: grain,
    ebnf,
  };
}

function makeGutter(numLines) {
  let line = (num) => `<span class="line">${num}</span><br>`;
  let lines = [];
  for (let i = 1; i <= numLines; i++) {
    lines.push(line(i));
  }
  return `<td class="gutter"><pre>${lines.join("")}</pre></td>`;
}

function hookRenderer(renderer) {
  renderer.code = (code, lang) => {
    let result = [];
    let text = code.split("\n");

    if (this.grammars[lang]) {
      let ruleStack = vsctm.INITIAL;
      for (let i = 0; i < text.length; i++) {
        const line = text[i];
        const lineTokens = this.grammars[lang].tokenizeLine(line, ruleStack);
        const lineRes = [];
        for (let j = 0; j < lineTokens.tokens.length; j++) {
          const token = lineTokens.tokens[j];
          const tokenString = line.substring(token.startIndex, token.endIndex);
          const classString = token.scopes
            .map((scope) => scope.replace(/\./g, " "))
            .join(" ");
          lineRes.push(`<span class="${classString}">${tokenString}</span>`);
        }
        result.push(`<span class="line">${lineRes.join("")}</span><br>`);
        ruleStack = lineTokens.ruleStack;
      }
    } else {
      result = text.map(
        (line) => `<span class="line">${escapeHTML(line)}</span><br>`
      );
    }

    return `<figure class="tm-highlight"><table><tbody><tr>${makeGutter(
      text.length
    )}<td class="code"><pre>${result.join(
      ""
    )}</pre></td><td class="code-tools"><a class="code-copy" role="button" alt="copy code"><i class="far fa-clone"></i></a></td></tr></tbody></table></figure>`;
  };
}
