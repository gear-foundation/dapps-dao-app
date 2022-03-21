import { useContext } from 'react';
import { ApiContext } from 'context/api';
import { AccountContext } from 'context/account';
import { UserStatusContext } from 'context/status';

const useApi = () => useContext(ApiContext);
const useAccount = () => useContext(AccountContext);
const useStatus = () => useContext(UserStatusContext);

export { useApi, useAccount, useStatus };
