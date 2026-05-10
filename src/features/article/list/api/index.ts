import { apiClient } from 'app/api';
import {
  type ArticlePreview,
  mapRawArticleToPreview,
  type RawArticlePreview,
} from 'entities/article';

type RawArticlesResponse = {
  articles: RawArticlePreview[];
  articlesCount: number;
};

export type ArticlesResult = {
  articles: ArticlePreview[];
  articlesCount: number;
};

export type ArticlesFilter = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};

/** Fetch articles list */
export const getArticles = async (filter: ArticlesFilter = {}): Promise<ArticlesResult> => {
  const { limit = 20, offset = 0, ...rest } = filter;
  const response = await apiClient.get<RawArticlesResponse>('/articles', {
    params: { limit, offset, ...rest },
  });
  return {
    articles: response.data.articles.map(mapRawArticleToPreview),
    articlesCount: response.data.articlesCount,
  };
};

/** Fetch feed for current user */
export const getFeedArticles = async (limit = 20, offset = 0): Promise<ArticlesResult> => {
  const response = await apiClient.get<RawArticlesResponse>('/articles/feed', {
    params: { limit, offset },
  });
  return {
    articles: response.data.articles.map(mapRawArticleToPreview),
    articlesCount: response.data.articlesCount,
  };
};

/** Toggle favorite state for article */
export const toggleFavorite = async (slug: string, favorited: boolean): Promise<ArticlePreview> => {
  const method = favorited ? 'delete' : 'post';
  const response = await apiClient[method]<{ article: RawArticlePreview }>(
    `/articles/${slug}/favorite`,
  );
  return mapRawArticleToPreview(response.data.article);
};
