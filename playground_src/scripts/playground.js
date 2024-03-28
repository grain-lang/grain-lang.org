import CompilerWorker from "./compiler?worker";

const worker = new CompilerWorker();
worker.onerror = (err) => console.error(err);

async function start() {
  const { createGrainEditor } = await import("./editor");
  const editor = await createGrainEditor(
    "editor",
    'module Playground\n\nprint("hello world")\n'
  );

  const outputPanel = document.getElementById("output-panel");
  const output = document.getElementById("output");
  const runButton = document.getElementById("run");

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
        outputPanel.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        output.innerText = data.stderr;
        return;
      }

      outputPanel.style.backgroundColor = "rgba(0, 255, 0, 0.25)";
      if (data?.stdout) {
        output.innerText = data.stdout;
      } else {
        output.innerText = "< no program output >";
      }
    };

    worker.onerror = (err) => {
      console.error(err);
    };
  };
}

start();
