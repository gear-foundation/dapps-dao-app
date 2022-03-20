import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useApi, useMember } from 'hooks';
import { ReactComponent as Logo } from './images/logo.svg';
import { Loader } from './components/Loader/Loader';
import { Wallet } from './components/Wallet/Wallet';
import { AdminLink } from './components/AdminLink/AdminLink';
import { Main } from './pages/Main/Main';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { ProposalDetails } from './pages/ProposalDetails/ProposalDetails';

import { routes } from 'routes';
import './App.css';

const AppComponent: FC = () => {
  const { isApiReady } = useApi();
  const { isMember } = useMember();

  return (
    <div className="wrapper">
      {isApiReady ? (
        <>
          <section className="header-section">
            <div className="container">
              <a href="/" className="logo">
                <Logo />
              </a>
              <Wallet />
            </div>
          </section>

          <div className="main-section-content">
            {isMember && <AdminLink />}
            <div className="container">
              <Routes>
                <Route path={routes.main} element={<Main />} />
                <Route path={routes.proposal} element={<ProposalDetails />} />
                <Route path={routes.admin} element={<AdminPanel />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export const App = () => (
  <BrowserRouter>
    <AppComponent />
  </BrowserRouter>
);
