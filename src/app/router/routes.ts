import type { ComponentType } from 'react';
import { lazy } from 'react';

export type AppRoute = {
  path: string;
  exact?: boolean;
  component: ComponentType;
};
export const routes: AppRoute[] = [
  {
    path: '/editor/:slug',
    component: lazy(() => import('../../Editor')),
  },
  { path: '/editor', component: lazy(() => import('../../Editor')) },
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../LoginRegister')),
  },
  {
    path: '/register',
    exact: true,
    component: lazy(() => import('../../LoginRegister')),
  },
  {
    path: '/logout',
    exact: true,
    component: lazy(() => import('../../Logout')),
  },
  {
    path: '/settings',
    exact: true,
    component: lazy(() => import('../../Settings')),
  },
  {
    /** One route for both tabs so switching tabs does not remount the profile page. */
    path: '/profile/:username/:articlesTab?',
    exact: true,
    component: lazy(() => import('../../Profile')),
  },
  {
    path: '/:slug',
    exact: true,
    component: lazy(() => import('../../Article')),
  },
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../../ArticleList')),
  },
];
