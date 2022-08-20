import fs, { loadStdlib, stdlibRoot } from "./browser-fs/fs";
import grainc from "./grain/grainc.bc.mjs";
import constants from "constants-browserify/constants.json";
import * as Grain from "./js-runner/grain-runner-browser.js";
import { Buffer } from "buffer";

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

let ogConsoleLog = console.log;
let ogConsoleError = console.error;

function restoreConsole() {
  console.log = ogConsoleLog;
  console.error = ogConsoleError;
}

function processStdout(stdout) {
  return stdout.join("\n").trim();
}

function processStderr(stderr) {
  // Because we throw the an error in exit to bail out of JSOO,
  // we need to process filter the internal error lines
  const sliceEnd = stderr.findIndex((line) =>
    line.startsWith("grain: internal error")
  );
  return stderr
    .slice(0, sliceEnd)
    .join("\n")
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
    const stdout = [];
    const stderr = [];

    fs.writeFileSync("/test.gr", data.content);
    fs.writeFileSync("/test.gr.wasm", "");
    console.error = function (txt) {
      stderr.push(txt);
    };
    try {
      grainc(globalThis);

      console.log = function (txt) {
        stdout.push(txt);
      };
      const locator = Grain.defaultURLLocator(["/", stdlibRoot]);
      const GrainRunner = Grain.buildGrainRunner(locator);
      const wasm = fs.readFileSync("/test.gr.wasm");
      try {
        // Wait for the program to complete before posting the output back to the main thread
        await GrainRunner.runBuffer(wasm);
        postMessage({ stdout: processStdout(stdout) });
      } catch (err) {
        // TODO: deal with err
      }
    } catch (err) {
      postMessage({ stderr: processStderr(stderr) });
    } finally {
      restoreConsole();
    }
  }
});
