import { Volume, createFsFromVolume } from "memfs";
import path from "path";

const volume = new Volume();

// We create files for stdout and stderr to read after compilation
let stdoutLink = volume.createLink();
let stdoutNode = volume.createNode();
stdoutLink.setNode(stdoutNode);
let stdoutFile = new volume.props.File(stdoutLink, stdoutNode, 2, 1);
volume.fds[1] = stdoutFile;
let stderrLink = volume.createLink();
let stderrNode = volume.createNode();
stderrLink.setNode(stderrNode);
let stderrFile = new volume.props.File(stderrLink, stderrNode, 2, 2);
volume.fds[2] = stderrFile;

export default createFsFromVolume(volume);

export const stdlibRoot = "/stdlib";

export async function loadStdlib() {
  const grainFiles = import.meta.glob("@grain/stdlib/**/*.gr", {
    as: "url",
    eager: true,
  });
  const wasmFiles = import.meta.glob("@grain/stdlib/**/*.wasm", {
    as: "url",
    eager: true,
  });

  const fileContents = {};

  for (let [filename, url] of Object.entries(grainFiles)) {
    filename = filename.split("@grain/stdlib")[1];
    filename = path.join(stdlibRoot, filename);
    fileContents[filename] = fetch(url)
      .then((res) => res.text())
      .then((content) => {
        volume.mkdirSync(path.dirname(filename), { recursive: true });
        volume.writeFileSync(filename, content);
      });
  }

  for (let [filename, url] of Object.entries(wasmFiles)) {
    filename = filename.split("@grain/stdlib")[1];
    filename = path.join(stdlibRoot, filename);
    fileContents[filename] = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((content) => {
        volume.mkdirSync(path.dirname(filename), { recursive: true });
        volume.writeFileSync(filename, content);
      });
  }

  await Promise.all(Object.values(fileContents));
}
