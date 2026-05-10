import { createApiClient } from 'shared/api/client';
import { authStore } from 'stores/auth.store';

export const apiClient = createApiClient(
  () => authStore.getState().token,
  () => authStore.getState().logout(),
);
