import type { User } from 'entities/user';

export type ArticleAuthor = Pick<User, 'username' | 'image'> & {
  following: boolean;
};

// Domain model for an article

export type ArticlePreview = {
  slug: string;
  title: string;
  description: string;
  author: ArticleAuthor;
  createdAt: string;
  favoritesCount: number;
  favorited: boolean;
};

export type ArticleDetail = ArticlePreview & {
  body: string;
};
