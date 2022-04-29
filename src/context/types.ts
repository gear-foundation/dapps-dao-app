import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};

export type UserStatus = {
  isAdmin: boolean,
  isMember: boolean
};