import { useState } from 'react';
import { Props } from '../types';
import { MemberContext } from './Context';

const { Provider } = MemberContext;

const useMember = () => {
  const [isMember, setIsMember] = useState<boolean>(false);

  return { isMember, setIsMember };
};

const MemberProvider = ({ children }: Props) => (
  <Provider value={useMember()}>{children}</Provider>
);

export { MemberProvider };
