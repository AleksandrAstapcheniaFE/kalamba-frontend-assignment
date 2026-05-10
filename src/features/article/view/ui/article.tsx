import { ErrorState, LoadingState } from 'shared/ui/states';
import { useArticlePage } from '../model';
import { ArticlePageView } from './article-page-view';

export const Article = () => {
  const vm = useArticlePage();
  if (vm.status === 'loading') return <LoadingState />;

  if (vm.status === 'error') return <ErrorState error="Unable to load article." />;

  return (
    <ArticlePageView
      isOwnArticle={vm.isOwnArticle}
      isFavoriteLoading={vm.isFavoriteLoading}
      isAuthenticated={vm.isAuthenticated}
      onToggleFavorite={vm.onToggleFavorite}
      article={vm.article}
      onToggleFollow={vm.onToggleFollow}
      isFollowLoading={vm.isFavoriteLoading}
    />
  );
};
