import { h } from "hastscript";
import { fromHtml } from "hast-util-from-html";
import fs from "node:fs";

const hashSvg = fs.readFileSync("./src/images/hash.svg");

export default {
  behavior: "after",
  group: h("div", { class: "relative group" }),
  properties: { class: "absolute top-2 -left-8 pr-2 opacity-0 group-hover:opacity-100" },
  content: h(
    "span",
    {
      class: "w-6 h-6 flex items-center justify-center border rounded bg-white dark:bg-color-dimmer border-color-dimmer dark:border-color-dim-1 stroke-gray-40 dark:stroke-color-primary"
    },
    fromHtml(hashSvg)
  )
};
