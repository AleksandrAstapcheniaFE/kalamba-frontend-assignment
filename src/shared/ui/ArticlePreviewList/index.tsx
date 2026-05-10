import type { ArticlePreview } from 'entities/article';
import { ArticlePreviewCard } from '../ArticlePreviewCard';
import { EmptyState, ErrorState, LoadingState } from '../states';

export const ArticlePreviewList = ({
  articles,
  isLoading = false,
  isFetching = false,
  isError = false,
  pendingFavoriteSlug = null,
  onToggleFavorite,
}: {
  articles: ArticlePreview[];
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  pendingFavoriteSlug?: string | null;
  onToggleFavorite: (slug: string, favorited: boolean) => void;
}) => {
  if (isLoading) return <LoadingState />;

  if (isError) return <ErrorState />;

  if (articles.length === 0) return <EmptyState text={'articles'} />;

  return (
    <div aria-busy={isFetching}>
      {articles.map((article) => (
        <ArticlePreviewCard
          key={article.slug}
          {...article}
          isFavoritePending={pendingFavoriteSlug === article.slug}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
