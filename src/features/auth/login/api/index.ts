import { apiClient } from 'app/api';
import { mapApiUserToModel, type RawApiUser, type User } from 'entities/user';
import { post } from 'shared/api/fetch';

type LoginPayload = {
  user: {
    email: string;
    password: string;
  };
};

type LoginApiResponse = {
  user: RawApiUser;
};

export type LoginResult = {
  user: User;
  token: string;
};

/** normalized `User` plus JWT string for `authStore`. */
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResult> => {
  const payload: LoginPayload = {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  };

  const response = await post<LoginApiResponse>(apiClient, '/users/login', payload);

  return {
    user: mapApiUserToModel(response.user),
    token: response.user.token,
  };
};
