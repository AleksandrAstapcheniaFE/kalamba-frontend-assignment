import type { ComponentType } from 'react';
import { lazy } from 'react';

export type RouteGuard = 'public' | 'private' | 'guest';

export type AppRoute = {
  path: string;
  exact?: boolean;
  component: ComponentType;
  guard: RouteGuard;
};
export const routes: AppRoute[] = [
  {
    path: '/editor/:slug',
    guard: 'private',
    component: lazy(() => import('../../Editor')),
  },
  {
    path: '/editor',
    guard: 'private',
    component: lazy(() => import('../../Editor')),
  },
  {
    path: '/login',
    guard: 'guest',
    exact: true,
    component: lazy(() => import('../../pages/LoginPage')),
  },
  {
    path: '/register',
    guard: 'guest',
    exact: true,
    component: lazy(() => import('../../pages/RegisterPage')),
  },
  {
    path: '/logout',
    guard: 'public',
    exact: true,
    component: lazy(() => import('../../pages/LogoutPage')),
  },
  {
    path: '/settings',
    guard: 'private',
    exact: true,
    component: lazy(() => import('../../Settings')),
  },
  {
    /** One route for both tabs so switching tabs does not remount the profile page. */
    path: '/profile/:username/:articlesTab?',
    guard: 'public',
    exact: true,
    component: lazy(() => import('../../Profile')),
  },
  {
    path: '/:slug',
    exact: true,
    guard: 'public',
    component: lazy(() => import('../../Article')),
  },
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../../ArticleList')),
    guard: 'public',
  },
];
