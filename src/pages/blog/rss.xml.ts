import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import type { APIRoute } from "astro";
const parser = new MarkdownIt();

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");
  return rss({
    title: "Grain Blog",
    description: "News for the Grain Programming Language",
    site: `${context.site}/blog`,
    items: blog
      .toSorted((x, y) => y.data.date.getTime() - x.data.date.getTime())
      .map((post) => ({
        link: `/blog/${post.id}/`,
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.subtitle,
        categories: post.data.tags ?? undefined,
        author: post.data.author,
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
        }),
      })),
  });
}
