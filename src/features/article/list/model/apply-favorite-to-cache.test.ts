import { QueryClient } from '@tanstack/react-query';
import { type ArticleDetail, type ArticlePreview, articleQueryKeys } from 'entities/article';
import { describe, expect, it } from 'vitest';

import { applyFavoriteServerResult } from './apply-favorite-to-cache';

const author = (following: boolean) => ({
  username: 'author1',
  image: undefined as string | undefined,
  following,
});

const preview = (over: Partial<ArticlePreview> = {}): ArticlePreview => ({
  slug: 's1',
  title: 'T',
  description: 'D',
  author: author(false),
  createdAt: 'Jan 1st',
  favoritesCount: 3,
  favorited: false,
  ...over,
});

describe('applyFavoriteServerResult', () => {
  it('merges favorite response into a home list row without touching other slugs', () => {
    const qc = new QueryClient();
    const key = articleQueryKeys.home('global', 0);
    qc.setQueryData(key, {
      articles: [preview({ slug: 'a' }), preview({ slug: 'b', favoritesCount: 9 })],
      articlesCount: 2,
    });

    const updated = preview({
      slug: 'b',
      favorited: true,
      favoritesCount: 10,
      title: 'Server title',
    });
    applyFavoriteServerResult(qc, 'b', updated);

    const list = qc.getQueryData<{ articles: ArticlePreview[]; articlesCount: number }>(key);
    expect(list?.articles.find((a) => a.slug === 'a')).toMatchObject({ favorited: false });
    expect(list?.articles.find((a) => a.slug === 'b')).toMatchObject({
      favorited: true,
      favoritesCount: 10,
      title: 'Server title',
    });
  });

  it('removes an unfavorited article from profile favorites list and decrements count', () => {
    const qc = new QueryClient();
    const key = articleQueryKeys.profileFavorites('alice', 0);
    qc.setQueryData(key, {
      articles: [preview({ slug: 'x' }), preview({ slug: 'y' })],
      articlesCount: 2,
    });

    applyFavoriteServerResult(qc, 'x', preview({ slug: 'x', favorited: false, favoritesCount: 0 }));

    const list = qc.getQueryData<{ articles: ArticlePreview[]; articlesCount: number }>(key);
    expect(list?.articles.map((a) => a.slug)).toEqual(['y']);
    expect(list?.articlesCount).toBe(1);
  });

  it('updates article detail cache while preserving body', () => {
    const qc = new QueryClient();
    const slug = 'detail-slug';
    const detail: ArticleDetail = {
      ...preview({ slug, favorited: false, favoritesCount: 1 }),
      body: '**markdown** body',
    };
    qc.setQueryData(articleQueryKeys.detail(slug), detail);

    applyFavoriteServerResult(qc, slug, preview({ slug, favorited: true, favoritesCount: 2 }));

    const next = qc.getQueryData<ArticleDetail>(articleQueryKeys.detail(slug));
    expect(next?.favorited).toBe(true);
    expect(next?.favoritesCount).toBe(2);
    expect(next?.body).toBe('**markdown** body');
  });
});
