import React, { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { useApi } from 'hooks';
import { ReactComponent as Logo } from './images/logo.svg';
import { Loader } from './components/Loader/Loader';
import { Wallet } from './components/Wallet/Wallet';
import { Main } from './pages/Main/Main';
import { ProposalInfo } from './pages/ProposalInfo/ProposalInfo';

import { routes } from 'routes';
import './App.css';

const AppComponent: FC = () => {
  const { isApiReady } = useApi();

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
            <div className="container">
              <Routes>
                <Route path={routes.main} element={<Main />} />
                <Route path={routes.proposal} element={<ProposalInfo />} />
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
