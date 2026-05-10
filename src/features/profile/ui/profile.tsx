import type { ArticlePreview } from 'entities/article';
import { Link } from 'react-router-dom';
import { ArticlePreviewList } from 'shared/ui/ArticlePreviewList';
import { getFollowLabel, getProfileTabsState, type ProfileArticlesTab } from '../model';

const EMPTY_BIO = 'This user has not added a bio yet.';

const tabIds = {
  mine: 'profile-tab-my-articles',
  fav: 'profile-tab-favorited',
} as const;

export type ProfileViewProps = {
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

export const ProfileView = ({
  routeUsername,
  displayUsername,
  bio,
  imageSrc,
  following,
  articlesTab,
  isOwnProfile,
  followDisabled,
  followLoading,
  articles,
  articlesLoading,
  articlesFetching,
  articlesError,
  pendingFavoriteSlug,
  onFollow,
  onToggleFavorite,
}: ProfileViewProps) => {
  const { isFavorites, activeTabId } = getProfileTabsState(articlesTab);
  const followLabel = getFollowLabel(following, displayUsername);

  return (
    <main className="profile-page">
      <section className="user-info" aria-labelledby="profile-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1 text-xs-center">
              <img
                src={imageSrc}
                className="user-img"
                alt={`Profile of ${displayUsername}`}
                width={100}
                height={100}
              />
              <h4 id="profile-heading">{displayUsername}</h4>
              <p>{bio?.trim() ? bio : EMPTY_BIO}</p>
              <button
                type="button"
                className={`btn btn-sm action-btn ${
                  following ? 'btn-secondary' : 'btn-outline-secondary'
                }`}
                onClick={onFollow}
                disabled={followDisabled}
                aria-pressed={following}
                aria-busy={followLoading}
                aria-label={followLabel}
                title={isOwnProfile ? 'You cannot follow your own profile' : undefined}
              >
                <i className="ion-plus-round" aria-hidden="true" />
                &nbsp;
                {followLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active" aria-label="Profile articles">
                <li className="nav-item">
                  <Link
                    id={tabIds.mine}
                    role="tab"
                    to={`/profile/${routeUsername}`}
                    aria-selected={!isFavorites}
                    aria-controls="profile-articles-panel"
                    className={`nav-link ${!isFavorites ? 'active' : ''}`}
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    id={tabIds.fav}
                    role="tab"
                    to={`/profile/${routeUsername}/favorites`}
                    aria-selected={isFavorites}
                    aria-controls="profile-articles-panel"
                    className={`nav-link ${isFavorites ? 'active' : ''}`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <div id="profile-articles-panel" role="tabpanel" aria-labelledby={activeTabId}>
              <ArticlePreviewList
                articles={articles}
                isLoading={articlesLoading}
                isFetching={articlesFetching}
                isError={articlesError}
                pendingFavoriteSlug={pendingFavoriteSlug}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
