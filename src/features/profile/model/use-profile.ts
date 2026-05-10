import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { articleQueryKeys } from 'entities/article';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'shared/lib/hooks/use-auth';

import { followProfile, getProfile, unfollowProfile } from '../api';

export const useProfileQuery = (username: string) => {
  const profileKey = ['profile', username] as const;

  return useQuery({
    queryKey: profileKey,
    queryFn: () => getProfile(username),
    enabled: Boolean(username),
  });
};

export const useFollowMutation = (username: string) => {
  const queryClient = useQueryClient();
  const profileKey = ['profile', username] as const;

  return useMutation({
    mutationKey: ['profile', 'follow', username] as const,
    mutationFn: ({ following }: { following: boolean }) =>
      following ? unfollowProfile(username) : followProfile(username),

    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileKey }),
        queryClient.invalidateQueries({
          queryKey: articleQueryKeys.homeListsPrefix,
        }),
        queryClient.invalidateQueries({
          queryKey: articleQueryKeys.profileListsPrefix,
        }),
        queryClient.invalidateQueries({
          queryKey: articleQueryKeys.allDetails,
        }),
      ]);
    },
  });
};

/** Profile info with follow/unfollow logic */

export const useProfile = (username: string) => {
  const auth = useAuth();
  const history = useHistory();

  const profileQuery = useProfileQuery(username);

  const followMutation = useFollowMutation(username);

  const requestFollow = useCallback(
    (following: boolean) => {
      if (!auth.isAuthenticated) {
        history.push('/login');
        return;
      }
      followMutation.mutate({ following });
    },
    [auth.isAuthenticated, history, followMutation],
  );

  return { profileQuery, followMutation, requestFollow };
};
