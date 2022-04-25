import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
  className?: string | null;
};

const Container = ({ children, className }: Props) => {
  const classes = clsx(styles.container, className);

  return <div className={classes}>{children}</div>;
};

export { Container };
