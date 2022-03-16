import React from 'react';
import { useApi, useMember } from 'hooks';
import { ReactComponent as Logo } from './images/logo.svg';
import { Loader } from './components/Loader/Loader';
import { Wallet } from './components/Wallet/Wallet';
import { DAO } from './components/DAO/DAO';
import './App.css';

function App() {
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
            <div className="container">
              <DAO />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
