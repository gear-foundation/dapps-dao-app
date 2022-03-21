import { createContext, Dispatch, SetStateAction } from 'react';
import { UserStatus } from '../types';

type Value = {
  userStatus: UserStatus;
  setUserStatus: Dispatch<SetStateAction<UserStatus>>;
};

const UserStatusContext = createContext({} as Value);

export { UserStatusContext };
