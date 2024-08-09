import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";
import grainc from "./scripts/grain/grainc.bc.mjs";

globalThis.require = createRequire(import.meta.url);

const stdlibEntry = require.resolve("@grain/stdlib");
const stdlibDir = path.dirname(stdlibEntry);

// <ImportIdent, FilepathSegment>
const grainFiles = new Map();

async function collectGrainFiles(...segments) {
  const dir = await fs.opendir(path.join(stdlibDir, ...segments));

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      await collectGrainFiles(...segments, dirent.name);
    } else {
      if (dirent.name.endsWith(".gr")) {
        const importPathSegments = [
          ...segments,
          dirent.name.replace(".gr", ""),
        ];
        const contents = await fs.readFile(
          path.join(stdlibDir, ...segments, dirent.name)
        );
        const importIdent = contents.toString().match(/.*?^module\s+(\w+)/m)[1];
        const filepathSegment = importPathSegments.join("/");
        grainFiles.set(importIdent, filepathSegment);
      }
    }
  }
}

await collectGrainFiles();

let outputStr = "module Stdlib\n\n";
for (const [importIdent, filepathSegment] of grainFiles.entries()) {
  outputStr += `from "${filepathSegment}" include ${importIdent}\n`;
}

const entryFile = "stdlib.gr";

await fs.writeFile(entryFile, outputStr, "utf8");

process.argv.push("--stdlib", stdlibDir, entryFile);

grainc(globalThis);

// Cleanup the file we wrote and the wasm file it generates
await fs.rm(entryFile);
await fs.rm(entryFile + ".wasm");
