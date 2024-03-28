import fs, { loadStdlib, stdlibRoot } from "./browser-fs/fs";
import grainc from "./grain/grainc.bc.mjs";
import constants from "constants-browserify/constants.json";
import { Buffer } from "buffer";
import { init, WASI } from "@wasmer/wasi";

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
  argv: ["", "grain", "--stdlib", stdlibRoot, "test.gr"],
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

  // Because we throw the an error in exit to bail out of JSOO,
  // we need to filter the internal error lines
  const sliceEnd = stderr.indexOf("grain: internal error");
  return stderr
    .slice(0, sliceEnd)
    .replace('File "test.gr",', "Error on")
    .trim();
}

let stdlibLoaded = false;

addEventListener("message", async ({ data }) => {
  if (!stdlibLoaded) {
    await loadStdlib();
    stdlibLoaded = true;
  }

  if (data) {
    // Clear stdout and stderr
    fs.truncateSync(1);
    fs.truncateSync(2);

    fs.writeFileSync("/test.gr", data.content);
    fs.writeFileSync("/test.gr.wasm", "");
    console.error = function (txt) {
      // stderr.push(txt);
    };
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
