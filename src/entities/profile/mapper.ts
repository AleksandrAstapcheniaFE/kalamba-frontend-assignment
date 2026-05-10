import type { Profile } from './model';

export type RawProfile = {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
};

export const mapRawProfile = (raw: RawProfile): Profile => {
  return {
    username: raw.username,
    bio: raw.bio ?? undefined,
    image: raw.image ?? undefined,
    following: raw.following,
  };
};
