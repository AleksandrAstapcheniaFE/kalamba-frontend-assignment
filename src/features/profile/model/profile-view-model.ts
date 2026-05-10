import type { ArticlePreview } from 'entities/article';

export type ProfileArticlesTab = 'articles' | 'favorites';

export type ProfileViewProps =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'ready';
      /** Username from URL */
      routeUsername: string;
      /** Username from API (used for display) */
      displayUsername: string;
      bio?: string;
      imageSrc: string;
      following: boolean;
      articlesTab: ProfileArticlesTab;
      isOwnProfile: boolean;
      followDisabled: boolean;
      followLoading: boolean;
      articles: ArticlePreview[];
      articlesLoading: boolean;
      articlesFetching: boolean;
      articlesError: boolean;
      /** Slug of article being favorited right now */
      pendingFavoriteSlug: string | null;
      onFollow: () => void;
      onToggleFavorite: (slug: string, favorited: boolean) => void;
    };
