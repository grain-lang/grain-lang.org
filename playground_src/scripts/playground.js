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
  const editor = await createGrainEditor("editor", 'print("hello world")\n');

  const outputPanel = document.getElementById("output-panel");
  const wastPanel = document.getElementById("wast-panel");
  const output = document.getElementById("output");
  const runButton = document.getElementById("run");
  const showWastCheckbox = document.getElementById("show-wast-checkbox");
  const editorWrapper = document.getElementById("editor-wrapper");

  const onShowWastCheckboxChange = () => {
    if (showWastCheckbox.checked) {
      editorWrapper.style.gridTemplateColumns = "2fr 1fr 1fr";
      wastPanel.style.display = "flex";
      return;
    }
    editorWrapper.style.gridTemplateColumns = "2fr 1fr";
    wastPanel.style.display = "none";
  };
  showWastCheckbox.addEventListener("change", onShowWastCheckboxChange);
  onShowWastCheckboxChange();

  window.addEventListener("resize", debounce(
   () => {
    const isThreeColumnLayout = document.body.clientWidth >= 1024;
    editor.layout({
      width: isThreeColumnLayout ? Math.floor(document.body.clientWidth / 2) : document.body.clientWidth,
      height: editor.getContentHeight()
    });
  }, 100));

  runButton.onclick = function compile() {
    runButton.disabled = true;
    outputPanel.style.backgroundColor = "#EFEFEF";
    output.innerText = "Compiling...";
    wastPanel.querySelector('pre').innerText = "";

    worker.postMessage({
      content: editor.getValue(),
      showWast: showWastCheckbox.checked,
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
      wastPanel.querySelector('pre').innerText = data?.wast || "";
    };

    worker.onerror = (err) => {
      console.error(err);
    };

    editor.layout();
  };
}

start();
