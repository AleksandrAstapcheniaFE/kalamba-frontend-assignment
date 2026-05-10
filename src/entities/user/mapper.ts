import type { User } from './model';

export type RawApiUser = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
};

/**
 * Full user model
 */
export const mapApiUserToModel = (raw: RawApiUser): User => {
  return {
    email: raw.email,
    username: raw.username,
    bio: raw.bio ?? undefined,
    image: raw.image ?? undefined,
  };
};
