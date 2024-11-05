import type { RehypePlugin } from "@astrojs/markdown-remark";
import { h } from "hastscript";
import { visit } from "unist-util-visit";

const rehypeTableWrapper: RehypePlugin = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName === 'table') {
      const container = h(
        "div",
        {
          class: "overflow-x-auto"
        },
        node,
      );

      if (parent && typeof index === "number") {
        parent.children[index] = container;
      }
    }
  });
}

export default rehypeTableWrapper;
