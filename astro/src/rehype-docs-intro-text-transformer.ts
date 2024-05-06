import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Root, Element } from "hast";
import { fromHtml } from "hast-util-from-html";
import { h } from "hastscript";
import fs from "node:fs";
import path from "node:path";

const githubSvg = fs.readFileSync("./src/icons/github.svg");

const rehypeDocsIntroTextTransformer: RehypePlugin = () => (tree: Root, file) => {
  if (file.dirname!.split(path.sep).includes("docs")) {
    const sectionIntroElement = tree.children[0] as Element;
    sectionIntroElement.properties.className = "text-xl text-gray-60 font-light";

    const editOnGithub = h(
      "a",
      {
        role: "button",
        class: "flex gap-2 my-10 text-orange-50 fill-orange-50 hover:text-orange-70 hover:fill-orange-70 no-underline"
      },
      fromHtml(githubSvg),
      h("span", "Edit on GitHub")
    );

    tree.children.splice(1, 0, editOnGithub, h("hr"))
  }
}

export default rehypeDocsIntroTextTransformer;
