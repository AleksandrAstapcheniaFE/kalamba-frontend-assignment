import type { ArticleDetail } from 'entities/article';
import { ArticleComment } from './comment';
import { ArticleMeta } from './meta';

export type ArticleViewProps = {
  article: ArticleDetail;
  isAuthenticated: boolean;
  isOwnArticle: boolean;
  onToggleFavorite: (slug: string, favorited: boolean) => void;
  isFavoriteLoading: boolean;
};
export const ArticlePageView = ({
  article,
  isAuthenticated,
  isOwnArticle,
  onToggleFavorite,
  isFavoriteLoading,
}: ArticleViewProps) => {
  return (
    <div className="article-page">
      <header className="banner">
        <div className="container">
          <h1 id="article-page-title">{article.title}</h1>
          <ArticleMeta
            article={article}
            isAuthenticated={isAuthenticated}
            isOwnArticle={isOwnArticle}
            onToggleFavorite={onToggleFavorite}
            onToggleFollow={() => {}} //TODO: need relise profile
            isFollowLoading={false} //TODO: need relise profile
            isFavoriteLoading={isFavoriteLoading}
          />
        </div>
      </header>

      <main className="container page" id="article-main">
        <article className="row article-content" aria-labelledby="article-page-title">
          <div className="col-md-12">
            <p
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              {article.body}
            </p>
          </div>
        </article>
      </main>

      <hr />

      <div className="article-actions">
        <ArticleMeta
          article={article}
          isAuthenticated={isAuthenticated}
          isOwnArticle={isOwnArticle}
          onToggleFavorite={onToggleFavorite}
          onToggleFollow={() => {}} //TODO: need relise profile
          isFollowLoading={false} //TODO: need relise profile
          isFavoriteLoading={isFavoriteLoading}
        />
      </div>

      <ArticleComment />
    </div>
  );
};
