import type { RehypePlugin } from "@astrojs/markdown-remark";
import { h } from "hastscript";
import { type Child } from "hastscript";
import { visit } from "unist-util-visit";
import { type Element, type Literal } from "hast";
import * as R from "ramda";

const childrenElems = (elem: Element) => elem.children?.filter(x => x.type === "element") ?? [];

const rehypeTableWrapper: RehypePlugin = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName === 'table') {
      // Wrap the table with a horizontal scroll container to avoid overflow
      const container = h(
        "div",
        {
          class: "hidden md:block overflow-x-auto"
        },
        R.over(
          R.lensPath(["properties", "class"]),
          x => `${x ?? ""} my-0`.trim(),
          node,
        ),
        // { ...node, properties: {...node.properties, class: `${node.properties.class} my-0` } },
      );

      const children = childrenElems(node);

      const thead = children[0] as Element;
      const tbody = children[1];

      const cols = childrenElems(childrenElems(thead)[0]).map(x => (x.children[0] as Literal).value);

      // Also remove tables entirely for mobile, converting them in this manner:
      //
      // Before:
      //
      // | heading1 | heading2 |
      // |----------|----------|
      // | value1   | value2   |
      // | value3   | value4   |
      //
      // After:
      //
      // heading1: value1
      // heading2: value2
      //
      // heading1: value3
      // heading2: value4
      const convertedToRows = h(
        "div",
        { class: "md:hidden" },
        ...childrenElems(tbody).map(tr => {
          const tds = childrenElems(tr);

          let content: Child[];

          if (R.equals(cols, ["param", "type", "description"])) {
            // Special case: function parameter tables. Strip the type on mobile to condense output: type still available in function overview
            content = [...tds[0].children, { type: "text", value: ": " }, ...tds[2].children];
          } else if (R.equals(cols, ["type", "description"])) {
            // Special case: function return tables
            content = [...tds[0].children, { type: "text", value: ": " }, ...tds[1].children];
          } else {
            content = tds.map((td, i) => (
              h(
                "div",
                {},
                h("b", {}, cols[i] + ": "),
                h("span", {}, ...td.children)
              )
            ))
          }

          return h(
            "div",
            { class: "mb-1.5" },
            ...content
          );
        })
      );

      if (parent && typeof index === "number") {
        parent.children[index] = h(
          "div",
          {},
          container,
          convertedToRows
        );
      }
    }
  });
}

export default rehypeTableWrapper;
