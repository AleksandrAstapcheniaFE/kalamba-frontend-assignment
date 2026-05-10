import { useParams } from 'react-router-dom';

import type { ProfileArticlesTab } from './profile-view-model';

/** Profile route params (username + tab) */
export const useProfileArticlesTab = () => {
  const { username = '', articlesTab: tabParam } = useParams<{
    username: string;
    articlesTab?: string;
  }>();
  const articlesTab: ProfileArticlesTab = tabParam === 'favorites' ? 'favorites' : 'articles';

  return { routeUsername: username, articlesTab };
};
