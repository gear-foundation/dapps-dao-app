import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useApi } from 'hooks';
import { Container } from 'layout';
import { Header } from 'components/Header/Header';
import { Loader } from './components/Loader/Loader';
import { Main } from './pages/Main/Main';
import { AddProposal } from './pages/AddProposal/AddProposal';
import { ProposalDetails } from './pages/ProposalDetails/ProposalDetails';

import { routes } from 'routes';
import './App.css';

const AppComponent: FC = () => {
  const { isApiReady } = useApi();

  return (
    <div className='wrapper'>
      {isApiReady ? (
        <>
          <Header />
          <div className='main-section-content'>
            <Container className='mainContainer'>
              <Routes>
                <Route path={routes.main} element={<Main />} />
                <Route path={routes.proposal} element={<ProposalDetails />} />
                <Route path={routes.add} element={<AddProposal />} />
              </Routes>
            </Container>
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
