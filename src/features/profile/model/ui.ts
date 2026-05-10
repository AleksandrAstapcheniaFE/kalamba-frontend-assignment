export const getFollowLabel = (following: boolean, username: string) =>
  following ? `Unfollow ${username}` : `Follow ${username}`;

export const getProfileTabsState = (articlesTab: 'articles' | 'favorites') => {
  const isFavorites = articlesTab === 'favorites';

  return {
    isFavorites,
    activeTabId: isFavorites ? 'fav' : 'mine',
  };
};
