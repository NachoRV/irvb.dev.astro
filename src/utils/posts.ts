export function sortPostsByDate<T extends { data: { pubDate: Date | string } }>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}
