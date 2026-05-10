import { useArticleList } from '../model/use-article-list';
import { ArticleListView } from './article-list-view';

export const ArticleList = () => {
  const vm = useArticleList();
  return (
    <ArticleListView
      isAuthenticated={vm.isAuthenticated}
      isFeed={vm.isFeed}
      setFeedTab={vm.setFeedTab}
      articles={vm.articles}
      isLoading={vm.isLoading}
      isFetching={vm.isFetching}
      isError={vm.isError}
      pendingFavoriteSlug={vm.pendingFavoriteSlug}
      onToggleFavorite={vm.onToggleFavorite}
    />
  );
};
