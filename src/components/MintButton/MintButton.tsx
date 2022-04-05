import { useState } from 'react';
import { u64 } from '@polkadot/types';
import { ERC20_CONTRACT_ADDRESS } from 'consts';
import { ISubmittableResult } from '@polkadot/types/types';
import { EventRecord } from '@polkadot/types/interfaces';
import { GearKeyring } from '@gear-js/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useAccount, useApi } from 'hooks';
import { useAlert } from 'react-alert';
import { Button } from '@gear-js/ui';

import { erc20Meta } from 'out/metaTypes';

const message = {
  destination: ERC20_CONTRACT_ADDRESS,
  payload: {
    mint: '10000',
  },
  gasLimit: '300000000',
  value: '0',
};

const MintButton = () => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error: Error) => {
    console.log(error);
    alert.error(error.message);
  };

  const calculateGas = () => {
    if (account) {
      const { address } = account;
      const { payload, value, destination } = message;
      const decodedAddress = GearKeyring.decodeAddress(address);

      return api.program.gasSpent.handle(
        decodedAddress,
        destination,
        payload,
        value,
        erc20Meta || 'String',
      );
    }
  };

  const handleEventsStatus = (events: EventRecord[]) => {
    events.forEach(({ event: { method } }) => {
      if (method === 'DispatchMessageEnqueued') {
        alert.success('Send message: Finalized');
      } else if (method === 'ExtrinsicFailed') {
        alert.error('Extrinsic failed');
      }
    });
  };

  const handleStatus = (result: ISubmittableResult) => {
    const { status, events } = result;
    const { isInBlock, isInvalid, isFinalized } = status;

    if (isInvalid) {
      setIsLoading(false);
      alert.error('Invalid Transaction');
    } else if (isInBlock) {
      alert.success('Send message: In block');
    } else if (isFinalized) {
      setIsLoading(false);
      handleEventsStatus(events);
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (account) {
      const { address } = account;
      const { source } = account.meta;

      setIsLoading(true);

      calculateGas()!
        .then((limit: u64) => (message.gasLimit = limit.toString()))
        .then(() => api.message.submit(message, erc20Meta))
        .then(() => web3FromSource(source))
        .then(({ signer }) => ({ signer }))
        .then((options) =>
          api.message.signAndSend(address, options, handleStatus),
        )
        .catch(handleError);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="btn btn-success"
      text={isLoading ? 'Minting...' : 'Get tokens'}
      disabled={isLoading}
    />
  );
};

export { MintButton };
