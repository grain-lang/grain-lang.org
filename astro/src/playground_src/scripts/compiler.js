import fs, { loadStdlib, stdlibRoot } from "./browser-fs/fs";
import grainc from "./grain/grainc.bc.mjs";
import constants from "constants-browserify/constants.json";
import { Buffer } from "buffer";
import { init, WASI } from "@wasmer/wasi";
import { tailCall, bulkMemory } from "wasm-feature-detect";

globalThis.Buffer = Buffer;

globalThis.require = (name) => {
  switch (name) {
    case "fs":
      return fs;
    case "constants":
      return constants;
  }
  throw new Error(`Unable to require '${name}'`);
};

globalThis.process = {
  versions: {
    node: "fake",
  },
  platform: "posix",
  env: {},
  exit(code) {
    throw `Forced exit with code ${code}`;
  },
  on(eventName, handler) {
    if (eventName === "unhandledRejection") {
      self.onunhandledrejection = handler;
    }
    // We throw away 'uncaughtException' :shrug:
  },
  cwd() {
    return "/";
  },
};

let ogConsoleError = console.error;

function restoreConsole() {
  console.error = ogConsoleError;
}

function processWasiStdout(stdout) {
  return stdout.trim();
}

function processStderr() {
  let buf = Buffer.alloc(16384);
  let nread = fs.readSync(2, buf, 0, 16384, 0);
  let stderr = buf.toString("utf8", 0, nread);

  // Because a JSOO error is thrown when the compiler exits,
  // we need to filter the internal error lines
  const sliceEnd = stderr.indexOf("grain: internal error");
  return stderr
    .slice(0, sliceEnd)
    .replace('File "test.gr",', "Error on")
    .trim();
}

async function grainInit() {
  await loadStdlib();
  const args = ["", "grain", "test.gr", "--stdlib", stdlibRoot]
  if (!(await tailCall())) args.push("--no-wasm-tail-call");
  if (!(await bulkMemory())) args.push("--no-bulk-memory");
  globalThis.process.argv = args;

  postMessage({ initialized: true });
}

grainInit();

addEventListener("message", async ({ data }) => {
  if (data) {
    // Clear stdout and stderr
    fs.truncateSync(1);
    fs.truncateSync(2);

    fs.writeFileSync("/test.gr", data.content);
    fs.writeFileSync("/test.gr.wasm", "");
    try {
      grainc(globalThis);

      try {
        await init();
        const wasm = fs.readFileSync("/test.gr.wasm");
        const wasi = new WASI({
          env: {},
          args: [],
        });
        const module = await WebAssembly.compile(wasm);
        await wasi.instantiate(module, {});
        // TODO: Do we actually want to handle the exitCode?
        wasi.start();
        postMessage({ stdout: processWasiStdout(wasi.getStdoutString()) });
      } catch (err) {
        // TODO: deal with err better?
        postMessage({ stderr: err.message });
      }
    } catch (err) {
      postMessage({ stderr: processStderr() });
    } finally {
      restoreConsole();
    }
  }
});
