import { createContext, Dispatch, SetStateAction } from 'react';

type Value = {
  isMember: boolean | undefined;
  setIsMember: Dispatch<SetStateAction<boolean>>;
};

const MemberContext = createContext({} as Value);

export { MemberContext };
