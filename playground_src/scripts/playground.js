import CompilerWorker from "./compiler?worker";

const worker = new CompilerWorker();
worker.onerror = (err) => console.error(err);

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

async function start() {
  const { createGrainEditor } = await import("./editor");
  const editor = await createGrainEditor(
    "editor",
    'module Playground\n\nprint("hello world")\n'
  );

  const outputPanel = document.getElementById("output-panel");
  const output = document.getElementById("output");
  const runButton = document.getElementById("run");
  const editorWrapper = document.getElementById("editor-wrapper");

  window.addEventListener(
    "resize",
    debounce(() => {
      const isTwoColumnLayout = document.body.clientWidth >= 1024;
      editor.layout({
        width: isTwoColumnLayout
          ? Math.floor(document.body.clientWidth / 2)
          : document.body.clientWidth,
        height: editor.getContentHeight(),
      });
    }, 100)
  );

  runButton.onclick = function compile() {
    runButton.disabled = true;
    outputPanel.style.backgroundColor = "#EFEFEF";
    output.innerText = "Compiling...";

    worker.postMessage({
      content: editor.getValue(),
    });

    worker.onmessage = ({ data }) => {
      runButton.disabled = false;

      if (data?.stderr) {
        outputPanel.style.backgroundColor = "#F9DCDE";
        output.innerText = data.stderr;
        return;
      }

      outputPanel.style.backgroundColor = "#E6EFE6";
      if (data?.stdout) {
        output.innerText = data.stdout;
      } else {
        output.innerText = "< no program output >";
      }
    };

    worker.onerror = (err) => {
      console.error(err);
    };

    editor.layout();
  };
}

start();
