import { getCollection } from "astro:content";

/**
 * Posts publicados (sin drafts), ordenados por fecha de publicación descendente.
 */
export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}
