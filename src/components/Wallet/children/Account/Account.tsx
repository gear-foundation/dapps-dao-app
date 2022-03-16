import React, {useEffect } from 'react';
import Identicon from '@polkadot/react-identicon';
import { GearKeyring } from '@gear-js/api';
import { ReactComponent as Logout } from 'images/logout.svg';
import { LOCAL_STORAGE, DAO_CONTRACT_ADDRESS } from 'consts';
import { useAccount, useMember, useApi } from 'hooks';
import { useBalance } from './hooks';
import daoMeta from 'out/dao.meta.wasm';

import './Account.scss';

type Props = {
  openModal: () => void;
  closeModal: () => void;
};

type Member = {
  IsMember: boolean;
};

const Account = ({ openModal, closeModal }: Props) => {
  const { api } = useApi();
  const { account, setAccount } = useAccount();
  const { setIsMember } = useMember();

  const balance = useBalance();

  const logOut = () => {
    setAccount(undefined);
    localStorage.removeItem(LOCAL_STORAGE.ACCOUNT);
  };

  const handleClick = () => {
    logOut();
    closeModal();
  };

  // Chech membership stat us of chosen account and set it globally

  useEffect(() => {
    if (account) {
      const { address } = account;

      const addressRaw = GearKeyring.decodeAddress(address);

      fetch(daoMeta)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => Buffer.from(arrayBuffer))
        .then((buffer) =>
          api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
            IsMember: `${addressRaw}`,
          }),
        )
        .then((state) => state.toHuman() as Member)
        .then(({IsMember}) => setIsMember(IsMember))
    }

  }, [api, account]);

  return (
    <div className="user-wallet__wrapper">
      {account ? (
        <>
          <div className="user-wallet__balance">{balance}</div>
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
