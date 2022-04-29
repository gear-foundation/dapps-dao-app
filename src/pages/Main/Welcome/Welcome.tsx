import React, { useState, useEffect, useRef } from 'react';
import { useStatus, useAccount, useApi } from 'hooks';
import { GearKeyring, CreateType } from '@gear-js/api';
import { MemberEvent } from 'pages/types';
import { useAlert } from 'react-alert';
import { Button } from '@gear-js/ui';
import { Link } from 'react-router-dom';
import { MemberModal } from 'components/MemberModal/MemberModal';
import { DAO_CONTRACT_ADDRESS } from 'consts';

import memberIcon from 'images/member-icon.svg';
import { daoMeta } from 'out/metaTypes';

import './Welcome.scss';

export const Welcome = () => {
  const { account } = useAccount();
  const { api } = useApi();
  const alert = useAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userStatus, setUserStatus } = useStatus();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (account) {
      const { address } = account;
      const decodedAddress = GearKeyring.decodeAddress(address);

      const unsub = api.gearEvents.subscribeToLogEvents(({ data }) => {
        if (
          data.source.toHex() === DAO_CONTRACT_ADDRESS &&
          data.destination.toHex() === decodedAddress
        ) {
          const createType = new CreateType(api);
          const payload = createType
            .create('DaoEvent', data.payload, { types: daoMeta.types })
            .toHuman();

          const {
            Deposit: { member },
          } = payload as MemberEvent;

          if (member === decodedAddress) {
            setUserStatus({
              ...userStatus,
              isMember: true,
            });
          }
        }
      });

      return () => {
        if (unsub) {
          unsub.then((u) => u());
        }
      };
    }
  }, [api, account]);

  return (
    <header className="welcome">
      <h1>The DAO</h1>
      <p>
        Welcome to the example of DAO (Decentralized Autonomous Organization)
        <br />
        implementation based on Gear platform.
      </p>

      <div className="btn-line">
        {userStatus.isMember ? (
          <Link to="/add">
            <Button text="Submit Proposal" className="btn btn-success" />
          </Link>
        ) : (
          <Button
            text="Become a member"
            className="btn btn-success"
            onClick={() => {
              if (account) openModal();
              else alert.error('Wallet not connected');
            }}
            icon={memberIcon}
          />
        )}
      </div>

      {isModalOpen && <MemberModal closeModal={closeModal} />}
    </header>
  );
};
