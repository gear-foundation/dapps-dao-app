import { useState } from 'react';
import { Props, UserStatus } from '../types';
import { UserStatusContext } from './Context';

const { Provider } = UserStatusContext;

const useStatus = () => {
  const [userStatus, setUserStatus] = useState<UserStatus>({
    isAdmin: false,
    isMember: false,
    isInWaitlist: false,
    waitForDecision: false,
  });

  return { userStatus, setUserStatus };
};

const UserStatusProvider = ({ children }: Props) => (
  <Provider value={useStatus()}>{children}</Provider>
);

export { UserStatusProvider };
