import React, { useEffect } from 'react';
import Identicon from '@polkadot/react-identicon';
import { GearKeyring } from '@gear-js/api';
import { ReactComponent as Logout } from 'images/logout.svg';
import { LOCAL_STORAGE, DAO_CONTRACT_ADDRESS } from 'consts';
import { useAccount, useStatus, useApi } from 'hooks';
import { UserStatusResponse } from 'components/types';
import { useBalance } from './hooks';
import { useDaoBalance } from 'components/hooks';
import daoMeta from 'out/dao.meta.wasm';

import './Account.scss';

type Props = {
  openModal: () => void;
  closeModal: () => void;
};

const Account = ({ openModal, closeModal }: Props) => {
  const { api } = useApi();
  const { account, setAccount } = useAccount();
  const { setUserStatus } = useStatus();

  const balance = useBalance();
  const daoBalance = useDaoBalance();

  const logOut = () => {
    setAccount(undefined);
    localStorage.removeItem(LOCAL_STORAGE.ACCOUNT);
  };

  const handleClick = () => {
    logOut();
    closeModal();
  };

  // Check membership state us of chosen account and set it globally

  useEffect(() => {
    if (account) {
      const { address } = account;

      const addressRaw = GearKeyring.decodeAddress(address);

      fetch(daoMeta)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => Buffer.from(arrayBuffer))
        .then((buffer) =>
          api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
            UserStatus: `${addressRaw}`,
          }),
        )
        .then((state) => state.toHuman() as UserStatusResponse)
        .then(({ UserStatus }) => setUserStatus(UserStatus));
    }
  }, [api, account]);

  return (
    <div className="user-wallet__wrapper">
      {account ? (
        <>
          <div className="user-wallet__balance">
            {balance} / {daoBalance} DAO
          </div>
          <button
            type="button"
            className="user-wallet__user-info"
            onClick={openModal}
          >
            <Identicon value={account.address} size={25} theme="polkadot" />
            <span className="user-wallet__name">{account.meta.name}</span>
          </button>
          <button
            type="button"
            className="user-wallet__logout"
            aria-label="menuLink"
            onClick={handleClick}
          >
            <Logout />
          </button>
        </>
      ) : (
        <button
          className="user-wallet__connect-button"
          type="button"
          onClick={openModal}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export { Account };
