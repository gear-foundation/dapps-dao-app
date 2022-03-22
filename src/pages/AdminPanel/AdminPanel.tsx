import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { WaitList } from './children/WaitList/WaitList';
import { NoWaitList } from './children/NoWaitList/NoWaitList';

import { DAO_CONTRACT_ADDRESS } from 'consts';
import { WaitListPrespons, WaitListType } from './types';
import { useApi, useStatus } from 'hooks';
import { useAlert } from 'react-alert';

import daoMeta from 'out/dao.meta.wasm';

const AdminPanel = () => {
  const { api } = useApi();
  const alert = useAlert();
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

    console.log({
      applicant,
      tokenTribute,
    });
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
