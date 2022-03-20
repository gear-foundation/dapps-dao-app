import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { useApi } from 'hooks';
import daoMeta from 'out/dao.meta.wasm';

const AdminPanel = () => {
  const { api } = useApi();

  const [waitList, setWaitList] = useState<any | null>(null);

  useEffect(() => {
    const readState = async () => {
      const response = await fetch(daoMeta);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await Buffer.from(arrayBuffer);
 
      const decodedWaitlist = await api.programState.read(
        DAO_CONTRACT_ADDRESS,
        buffer,
        {
          WaitList: 'Null',
        },
      );

      const waitList = await decodedWaitlist.toHuman();
      console.log(waitList);
    };

    readState();
  }, []);

  return (
    <>
      {waitList ? (
        <>
          <header>
            <h2>Welcome to admin panel</h2>
          </header>
          <div className="proposal-info-block"></div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export { AdminPanel };
