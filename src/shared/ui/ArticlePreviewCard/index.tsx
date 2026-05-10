import type { ArticlePreview } from 'entities/article';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_AVATAR } from 'shared/config/avatar';

export const ArticlePreviewCard = memo(function ArticlePreviewCard({
  slug,
  title,
  description,
  author,
  createdAt,
  favoritesCount,
  favorited,
  onToggleFavorite,
  isFavoritePending = false,
}: ArticlePreview & {
  onToggleFavorite: (slug: string, favorited: boolean) => void;
  isFavoritePending?: boolean;
}) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${author.username}`} aria-label={`View profile of ${author.username}`}>
          <img src={author.image || DEFAULT_AVATAR} alt="" width={32} height={32} />
        </Link>

        <div className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{createdAt}</span>
        </div>

        <button
          className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
          type="button"
          onClick={() => onToggleFavorite(slug, favorited)}
          disabled={isFavoritePending}
          aria-busy={isFavoritePending}
          aria-label={
            favorited
              ? `Remove from favorites, ${favoritesCount} favorites`
              : `Add to favorites, ${favoritesCount} favorites`
          }
          aria-pressed={favorited}
        >
          <i className="ion-heart" aria-hidden="true" /> {favoritesCount}
        </button>
      </div>

      <Link to={`/${slug}`} className="preview-link" aria-label={`Read article: ${title}`}>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>Read more…</span>
      </Link>
    </div>
  );
});
