import { simpleFormatDate } from 'shared/lib/helpers/format';
import type { ArticleAuthor, ArticleDetail, ArticlePreview } from './model';

export type RawArticlePreview = {
  slug: string;
  title: string;
  description: string;
  createdAt: string; // ISO 8601 string from API
  favoritesCount: number;
  favorited: boolean;
  author: {
    username: string;
    image: string | null;
    following: boolean;
  };
};

export type RawArticleDetail = RawArticlePreview & {
  body: string;
};

const mapAuthor = (raw: RawArticlePreview['author']): ArticleAuthor => {
  return {
    username: raw.username,
    image: raw.image ?? undefined,
    following: raw.following,
  };
};

/**
 * Maps API article to UI preview model.
 * Formats createdAt for display.
 */
export const mapRawArticleToPreview = (raw: RawArticlePreview): ArticlePreview => {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    createdAt: simpleFormatDate(new Date(raw.createdAt)),
    favoritesCount: raw.favoritesCount,
    favorited: raw.favorited,
    author: mapAuthor(raw.author),
  };
};

/**
 * Full article model (includes body).
 */
export const mapRawArticleToDetail = (raw: RawArticleDetail): ArticleDetail => {
  return {
    ...mapRawArticleToPreview(raw),
    body: raw.body,
  };
};
