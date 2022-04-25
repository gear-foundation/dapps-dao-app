import React from 'react';
import { Container } from 'layout';
import { ReactComponent as Logo } from 'images/logo.svg';
import { Wallet } from 'components/Wallet/Wallet';
import { MintButton } from 'components/MintButton/MintButton';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <section className={styles.header}>
      <Container className={styles.headerContainer}>
        <a href='/' className='logo'>
          <Logo />
        </a>
        <MintButton />
        <Wallet />
      </Container>
    </section>
  );
};

export { Header };
