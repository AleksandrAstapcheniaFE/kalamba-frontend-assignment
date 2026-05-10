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

export type ProfileArticlesResult = {
  articles: ArticlePreview[];
  articlesCount: number;
};

export const getArticlesByAuthor = async (
  username: string,
  limit = 20,
  offset = 0,
): Promise<ProfileArticlesResult> => {
  const response = await apiClient.get<RawArticlesResponse>('/articles', {
    params: { author: username, limit, offset },
  });

  return {
    articles: response.data.articles.map(mapRawArticleToPreview),
    articlesCount: response.data.articlesCount,
  };
};

export const getArticlesFavoritedBy = async (
  username: string,
  limit = 20,
  offset = 0,
): Promise<ProfileArticlesResult> => {
  const response = await apiClient.get<RawArticlesResponse>('/articles', {
    params: { favorited: username, limit, offset },
  });

  return {
    articles: response.data.articles.map(mapRawArticleToPreview),
    articlesCount: response.data.articlesCount,
  };
};
