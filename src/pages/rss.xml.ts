import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../utils/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: "irvb.dev",
    description: "Blog personal sobre desarrollo web y tecnología",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
    })),
    customData: "<language>es</language>",
  });
}
