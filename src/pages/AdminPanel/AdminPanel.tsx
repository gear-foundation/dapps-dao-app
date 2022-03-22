import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { WaitList } from './children/WaitList/WaitList';
import { NoWaitList } from './children/NoWaitList/NoWaitList';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { WaitListPrespons, WaitListType } from './types';
import { useApi, useStatus, useAccount } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { useAlert } from 'react-alert';

import daoMeta from 'out/dao.meta.wasm';

const AdminPanel = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { account } = useAccount();
  const {
    userStatus: { isMember, isAdmin },
  } = useStatus();

  const [waitList, setWaitList] = useState<WaitListType | null>(null);

  // Init membership proposal for new candidate
  const handlePropose = (
    event: React.MouseEvent,
    applicant: string,
    tokenTribute: string,
  ) => {
    event.preventDefault();

    if (!isMember) {
      alert.error('Only members can make proposal');
      return;
    }

    if (account) {
      sendMessageToProgram(
        api,
        DAO_CONTRACT_ADDRESS,
        300_000_000,
        {
          SubmitMembershipProposal: {
            applicant,
            tokenTribute: tokenTribute.replaceAll(',', ''),
            sharesRequested: tokenTribute.replaceAll(',', ''),
            quorum: '3',
            details: `Membership proposal for ${applicant}`,
          },
        },
        { handle_input: 'DaoAction', types: REGISTRY_TYPES },
        account,
        alert,
      );
    } else {
      alert.error('Wallet not connected');
    }
  };

  useEffect(() => {
    fetch(daoMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) =>
        api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
          WaitList: 'Null',
        }),
      )
      .then((state) => state.toHuman() as WaitListPrespons)
      .then(({ WaitList }) => setWaitList(WaitList));
  }, []);

  return (
    <>
      {isAdmin ? (
        <>
          {waitList ? (
            <div className="admin-block">
              <header>
                <h2>Welcome to admin panel</h2>
              </header>
              <div className="waitlist">
                <>
                  {Object.keys(waitList).length === 0 ? (
                    <NoWaitList />
                  ) : (
                    <WaitList list={waitList} handlePropose={handlePropose} />
                  )}
                </>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <p>Permission denied</p>
      )}
    </>
  );
};

export { AdminPanel };
