import type { ArticlePreview } from 'entities/article';
import { ArticlePreviewList } from 'shared/ui/ArticlePreviewList';

export type ArticleListViewProps = {
  isAuthenticated: boolean;
  isFeed: boolean;
  setFeedTab: (next: boolean) => void;
  articles: ArticlePreview[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  pendingFavoriteSlug: string | null;
  onToggleFavorite: (slug: string, favorited: boolean) => void;
};

const TAGS = ['programming', 'javascript', 'react', 'node', 'rails'] as const;

export const ArticleListView = ({
  isAuthenticated,
  isFeed,
  setFeedTab,
  articles,
  isLoading,
  isFetching,
  isError,
  pendingFavoriteSlug,
  onToggleFavorite,
}: ArticleListViewProps) => {
  return (
    <div className="home-page">
      <header className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </header>

      <main className="container page" id="main-content">
        <div className="row">
          <div className="col-md-9">
            <nav className="feed-toggle" aria-label="Article feed source">
              <div className="nav nav-pills outline-active" role="tablist">
                {isAuthenticated && (
                  <div className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${isFeed ? 'active' : ''}`}
                      onClick={() => setFeedTab(true)}
                      type="button"
                      role="tab"
                      aria-selected={isFeed}
                      id="home-tab-feed"
                      aria-controls="home-feed-panel"
                    >
                      Your Feed
                    </button>
                  </div>
                )}
                <div className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${!isFeed ? 'active' : ''}`}
                    onClick={() => setFeedTab(false)}
                    type="button"
                    role="tab"
                    aria-selected={!isFeed}
                    id="home-tab-global"
                    aria-controls="home-feed-panel"
                  >
                    Global Feed
                  </button>
                </div>
              </div>
            </nav>

            <section
              id="home-feed-panel"
              role="tabpanel"
              aria-labelledby={isFeed ? 'home-tab-feed' : 'home-tab-global'}
              aria-busy={isFetching && !isLoading}
            >
              <ArticlePreviewList
                articles={articles}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                pendingFavoriteSlug={pendingFavoriteSlug}
                onToggleFavorite={onToggleFavorite}
              />
            </section>
          </div>

          <aside className="col-md-3" aria-labelledby="popular-tags-heading">
            <div className="sidebar">
              <p id="popular-tags-heading">Popular Tags</p>
              <ul className="tag-list">
                {TAGS.map((tag) => (
                  <li key={tag} className="tag-pill tag-default">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
