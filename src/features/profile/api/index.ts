import { apiClient } from 'app/api';
import { mapRawProfile, type Profile, type RawProfile } from 'entities/profile';

type RawProfileResponse = {
  profile: RawProfile;
};

export const getProfile = async (username: string): Promise<Profile> => {
  const response = await apiClient.get<RawProfileResponse>(`/profiles/${username}`);
  return mapRawProfile(response.data.profile);
};

export const followProfile = async (username: string): Promise<Profile> => {
  const response = await apiClient.post<RawProfileResponse>(`/profiles/${username}/follow`);
  return mapRawProfile(response.data.profile);
};

export const unfollowProfile = async (username: string): Promise<Profile> => {
  const response = await apiClient.delete<RawProfileResponse>(`/profiles/${username}/follow`);
  return mapRawProfile(response.data.profile);
};
