import { describe, expect, it } from 'vitest';

import { mapRawArticleToDetail, mapRawArticleToPreview, type RawArticleDetail } from './mapper';

const rawBase = {
  slug: 'how-to-train',
  title: 'How to train',
  description: 'Desc',
  createdAt: '2020-06-15T12:00:00.000Z',
  favoritesCount: 5,
  favorited: true,
  author: {
    username: 'alice',
    image: null as string | null,
    following: true,
  },
};

describe('mapRawArticleToPreview', () => {
  it('maps API author null image to undefined and keeps follow/favorite flags', () => {
    const p = mapRawArticleToPreview(rawBase);
    expect(p.author.image).toBeUndefined();
    expect(p.author.username).toBe('alice');
    expect(p.author.following).toBe(true);
    expect(p.favorited).toBe(true);
    expect(p.favoritesCount).toBe(5);
  });

  it('formats ISO createdAt for list display', () => {
    const p = mapRawArticleToPreview(rawBase);
    expect(p.createdAt).toMatch(/June/);
    expect(p.createdAt).toMatch(/15/);
  });
});

describe('mapRawArticleToDetail', () => {
  it('extends preview mapping with article body', () => {
    const raw: RawArticleDetail = { ...rawBase, body: 'Hello **world**' };
    const d = mapRawArticleToDetail(raw);
    expect(d.body).toBe('Hello **world**');
    expect(d.slug).toBe(raw.slug);
    expect(d.favorited).toBe(true);
  });
});
