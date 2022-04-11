import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useApi, useStatus } from 'hooks';
import { ReactComponent as Logo } from './images/logo.svg';
import { Loader } from './components/Loader/Loader';
import { Wallet } from './components/Wallet/Wallet';
import { MintButton } from './components/MintButton/MintButton';
import { Main } from './pages/Main/Main';
import { AddProposal } from './pages/AddProposal/AddProposal';
import { ProposalDetails } from './pages/ProposalDetails/ProposalDetails';

import { routes } from 'routes';
import './App.css';

const AppComponent: FC = () => {
  const { isApiReady } = useApi();
  const { userStatus } = useStatus();
  const { isAdmin } = userStatus;

  return (
    <div className="wrapper">
      {isApiReady ? (
        <>
          <section className="header-section">
            <div className="container">
              <a href="/" className="logo">
                <Logo />
              </a>
              <MintButton />
              <Wallet />
            </div>
          </section>

          <div className="main-section-content">
            <div className="container">
              <Routes>
                <Route path={routes.main} element={<Main />} />
                <Route path={routes.proposal} element={<ProposalDetails />} />
                <Route path={routes.add} element={<AddProposal />} />
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
