import { describe, it, expect } from 'vitest';
import { sortPostsByDate } from './posts';

describe('sortPostsByDate', () => {
  it('ordena posts del más reciente al más antiguo', () => {
    const posts = [
      { data: { pubDate: '2022-01-01' } },
      { data: { pubDate: '2026-03-12' } },
      { data: { pubDate: '2024-06-15' } },
    ];

    const sorted = sortPostsByDate(posts);

    expect(sorted[0].data.pubDate).toBe('2026-03-12');
    expect(sorted[1].data.pubDate).toBe('2024-06-15');
    expect(sorted[2].data.pubDate).toBe('2022-01-01');
  });

  it('devuelve un array nuevo sin mutar el original', () => {
    const posts = [
      { data: { pubDate: '2022-01-01' } },
      { data: { pubDate: '2026-03-12' } },
    ];

    const sorted = sortPostsByDate(posts);

    expect(sorted).not.toBe(posts);
    expect(posts[0].data.pubDate).toBe('2022-01-01');
  });

  it('maneja un array vacío', () => {
    expect(sortPostsByDate([])).toEqual([]);
  });
});
