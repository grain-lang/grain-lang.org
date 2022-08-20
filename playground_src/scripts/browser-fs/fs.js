import { Volume, createFsFromVolume } from "memfs";
import path from "path";

const volume = new Volume();

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

  for (let [filename, url] of Object.entries(grainFiles)) {
    filename = filename.split("@grain/stdlib")[1];
    filename = path.join(stdlibRoot, filename);
    const content = await fetch(url).then((res) => res.text());
    volume.mkdirpSync(path.dirname(filename), { recursive: true });
    volume.writeFileSync(filename, content);
  }

  for (let [filename, url] of Object.entries(wasmFiles)) {
    filename = filename.split("@grain/stdlib")[1];
    filename = path.join(stdlibRoot, filename);
    const content = await fetch(url).then((res) => res.arrayBuffer());
    volume.mkdirpSync(path.dirname(filename), { recursive: true });
    volume.writeFileSync(filename, content);
  }
}
