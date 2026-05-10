import { useQuery } from '@tanstack/react-query';
import { type ArticleDetail, articleQueryKeys } from 'entities/article';
import { useToggleFavorite } from 'features/article/list/model/use-toggle-favorite';
import { useProfile } from 'features/profile/model';
import { useParams } from 'react-router-dom';
import { useAuth } from 'shared/lib/hooks/use-auth';
import { getArticleDetail } from '../api';

/** Article page state */
export type ArticlePageViewModel =
  | { status: 'loading' }
  | { status: 'error' }
  | {
      status: 'ready';
      article: ArticleDetail;
      isAuthenticated: boolean;
      isOwnArticle: boolean;
      onToggleFavorite: (slug: string, favorited: boolean) => void;
      isFavoriteLoading: boolean;
      onToggleFollow: (following: boolean) => void;
      isFollowLoading: boolean;
    };

/** Article page hook */
export const useArticlePage = (): ArticlePageViewModel => {
  const { slug = '' } = useParams<{ slug: string }>();
  const auth = useAuth();

  const detailQuery = useQuery<ArticleDetail>({
    queryKey: articleQueryKeys.detail(slug),
    queryFn: () => getArticleDetail(slug),
    enabled: Boolean(slug),
    staleTime: 30_000,
  });

  const article = detailQuery.data;

  const { toggleFavorite, isLoading: favoriteLoading } = useToggleFavorite();

  const authorName = article?.author.username ?? '';
  const { followMutation, requestFollow } = useProfile(authorName);

  if (detailQuery.isLoading) return { status: 'loading' };
  if (detailQuery.isError || !article) return { status: 'error' };

  const isOwnArticle = auth.isAuthenticated && auth.user.username === article.author.username;

  return {
    status: 'ready',
    article,
    isAuthenticated: auth.isAuthenticated,
    isOwnArticle,
    onToggleFavorite: toggleFavorite,
    isFavoriteLoading: favoriteLoading,
    onToggleFollow: requestFollow,
    isFollowLoading: followMutation.isPending,
  };
};
