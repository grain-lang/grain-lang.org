import CompilerWorker from "./compiler?worker";

const runButton = document.getElementById("run");

const worker = new CompilerWorker();
worker.onerror = (err) => console.error(err);
worker.onmessage = ({ data }) => {
  if (data?.initialized) {
    runButton.disabled = false;
    return;
  }
};

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
    'module Playground\n\nprint("Hello, world!")\n'
  );

  const outputPanel = document.getElementById("output-panel");
  const output = document.getElementById("output");

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
