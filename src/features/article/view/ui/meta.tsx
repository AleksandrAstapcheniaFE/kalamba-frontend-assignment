import type { ArticleDetail } from 'entities/article';
import { Link } from 'react-router-dom';
import { DEFAULT_AVATAR } from 'shared/config/avatar';
import {
  getFavoriteDisabled,
  getFavoriteLabel,
  getFavoriteTitle,
  getFollowDisabled,
  getFollowLabel,
  getFollowTitle,
} from '../model';

export const ArticleMeta = ({
  article,
  onToggleFavorite,
  onToggleFollow,
  isFollowLoading,
  isFavoriteLoading,
  isAuthenticated,
  isOwnArticle,
}: {
  article: ArticleDetail;
  onToggleFavorite: (slug: string, favorited: boolean) => void;
  onToggleFollow: (following: boolean) => void;
  isFollowLoading: boolean;
  isFavoriteLoading: boolean;
  isAuthenticated: boolean;
  isOwnArticle: boolean;
}) => {
  const followDisabled = getFollowDisabled(isAuthenticated, isFollowLoading, isOwnArticle);

  const favoriteDisabled = getFavoriteDisabled(isAuthenticated, isFavoriteLoading, isOwnArticle);

  const followLabel = getFollowLabel(article.author.username, article.author.following);

  const favoriteLabel = getFavoriteLabel(article.favorited, article.favoritesCount);

  const followTitle = getFollowTitle(isOwnArticle, isAuthenticated);
  const favoriteTitle = getFavoriteTitle(isOwnArticle, isAuthenticated);

  return (
    <div className="article-meta">
      <Link
        to={`/profile/${article.author.username}`}
        aria-label={`View profile of ${article.author.username}`}
      >
        <img src={article.author.image || DEFAULT_AVATAR} alt="" width={32} height={32} />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <time className="date" dateTime={article.createdAt}>
          {article.createdAt}
        </time>
      </div>
      <button
        className={`btn btn-sm ${
          article.author.following ? 'btn-secondary' : 'btn-outline-secondary'
        }`}
        type="button"
        onClick={() => onToggleFollow(article.author.following)}
        disabled={followDisabled}
        aria-pressed={article.author.following}
        aria-busy={isFollowLoading}
        aria-label={followLabel}
        title={followTitle}
      >
        <i className="ion-plus-round" aria-hidden="true" />
        &nbsp;
        {followLabel}
      </button>
      &nbsp;&nbsp;
      <button
        className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
        type="button"
        onClick={() => onToggleFavorite(article.slug, article.favorited)}
        disabled={favoriteDisabled}
        aria-pressed={article.favorited}
        aria-busy={isFavoriteLoading}
        aria-label={favoriteLabel}
        title={favoriteTitle}
      >
        <i className="ion-heart" aria-hidden="true" />
        &nbsp; Favorite Post&nbsp;
        <span className="counter" aria-hidden="true">
          ({article.favoritesCount})
        </span>
      </button>
    </div>
  );
};
