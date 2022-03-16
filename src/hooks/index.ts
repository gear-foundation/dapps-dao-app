import { useContext } from 'react';
import { ApiContext } from 'context/api';
import { AccountContext } from 'context/account';
import { MemberContext } from 'context/member';

const useApi = () => useContext(ApiContext);
const useAccount = () => useContext(AccountContext);
const useMember = () => useContext(MemberContext);

export { useApi, useAccount, useMember };
