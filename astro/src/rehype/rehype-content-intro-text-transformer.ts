import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Element } from "hast";
import { fromHtml } from "hast-util-from-html";
import { h } from "hastscript";
import fs from "node:fs";
import path from "node:path";

const githubSvg = fs.readFileSync("./src/icons/github.svg");

const rehypeContentIntroTextTransformer: RehypePlugin = () => (tree, file) => {
  if (file.dirname!.split(path.sep).includes("docs")) {
    const sectionIntroElement = tree.children[0] as Element;
    sectionIntroElement.properties.className = "text-xl text-color-primary font-light";

    const editOnGithub = h(
      "a",
      {
        role: "button",
        class: "flex gap-2 my-10 text-color-accent fill-color-accent hover:text-orange-70 hover:fill-orange-70 no-underline"
      },
      fromHtml(githubSvg),
      h("span", "Edit on GitHub")
    );

    tree.children.splice(1, 0, editOnGithub, h("hr"))
  }
}

export default rehypeContentIntroTextTransformer;
