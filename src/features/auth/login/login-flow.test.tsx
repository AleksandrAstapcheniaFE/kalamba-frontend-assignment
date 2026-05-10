import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Login } from './index';

vi.mock('./api', () => ({
  loginUser: vi.fn(),
}));

import { loginUser } from './api';
import { LOGIN_GENERIC_ERROR } from './model';

const loginUserMock = vi.mocked(loginUser);

const renderLogin = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('Login flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits README credentials to login API', async () => {
    loginUserMock.mockResolvedValue({
      user: {
        email: 'alice@example.com',
        username: 'alice',
        bio: undefined,
        image: undefined,
      },
      token: 'test-token',
    });
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/^email$/i), 'alice@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'I_<3-R0ber7');
    await user.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => expect(loginUserMock).toHaveBeenCalledTimes(1));
    expect(loginUserMock).toHaveBeenCalledWith({
      email: 'alice@example.com',
      password: 'I_<3-R0ber7',
    });
  });

  it('surfaces generic error when login API rejects', async () => {
    loginUserMock.mockRejectedValueOnce(new Error('unauthorized'));
    const user = userEvent.setup();

    renderLogin();

    await user.type(screen.getByLabelText(/^email$/i), 'bob@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'wrong-pass');
    await user.click(screen.getByRole('button', { name: /^sign in$/i }));

    expect(await screen.findByText(LOGIN_GENERIC_ERROR)).toBeInTheDocument();
  });
});
