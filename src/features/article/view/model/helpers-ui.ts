export const getFollowDisabled = (
  isAuthenticated: boolean,
  isLoading: boolean,
  isOwnArticle: boolean,
) => !isAuthenticated || isLoading || isOwnArticle;

export const getFavoriteDisabled = (
  isAuthenticated: boolean,
  isLoading: boolean,
  isOwnArticle: boolean,
) => !isAuthenticated || isLoading || isOwnArticle;

export const getFollowLabel = (username: string, following: boolean) =>
  following ? `Unfollow ${username}` : `Follow ${username}`;

export const getFavoriteLabel = (favorited: boolean, count: number) =>
  favorited
    ? `Remove article from favorites, ${count} favorites`
    : `Add article to favorites, ${count} favorites`;

export const getFollowTitle = (isOwnArticle: boolean, isAuthenticated: boolean) => {
  if (isOwnArticle) return 'You cannot follow your own profile';
  if (!isAuthenticated) return 'Sign in to follow authors';
  return undefined;
};

export const getFavoriteTitle = (isOwnArticle: boolean, isAuthenticated: boolean) => {
  if (isOwnArticle) return 'You cannot favorite your own article';
  if (!isAuthenticated) return 'Sign in to favorite articles';
  return undefined;
};
