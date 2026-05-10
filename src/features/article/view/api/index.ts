import { apiClient } from 'app/api';
import { type ArticleDetail, mapRawArticleToDetail, type RawArticleDetail } from 'entities/article';

type SingleArticleResponse = {
  article: RawArticleDetail;
};

/** Load article for detail page */
export const getArticleDetail = async (slug: string): Promise<ArticleDetail> => {
  const response = await apiClient.get<SingleArticleResponse>(`/articles/${slug}`);
  return mapRawArticleToDetail(response.data.article);
};
