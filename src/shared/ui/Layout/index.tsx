import type { ReactNode } from 'react';
import { Header } from 'widgets/header';
import { Footer } from '../Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <a className="app-skip-link" href="#app-main">
        Skip to main content
      </a>
      <Header />
      <div id="app-main" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
};
