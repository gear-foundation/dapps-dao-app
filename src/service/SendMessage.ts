import { web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { GearApi, GearKeyring, getWasmMetadata } from '@gear-js/api';
import { InjectedExtension } from '@polkadot/extension-inject/types';

export const sendMessageToProgram = async (
  api: GearApi,
  destination: string,
  gas: number,
  payload: any,
  types: any,
  account: InjectedAccountWithMeta,
  alert: any,
  callback?: () => void,
) => {
  const injector: InjectedExtension = await web3FromSource(account.meta.source);

  try {
    const message = {
      destination,
      payload,
      gasLimit: gas,
      value: 0,
    };

    console.log(payload);

    await api.message.submit(message, types);
  } catch (error) {
    console.error(`${error}`);
  }

  try {
    await api.message.signAndSend(
      account.address,
      { signer: injector.signer },
      (data: any) => {
        if (data.status.isInBlock) {
          alert.info(`In block`);
        }

        if (data.status.isFinalized) {
          data.events.forEach((event: any) => {
            const { method } = event.event;

            if (method === 'DispatchMessageEnqueued') {
              alert.success(`Finalized`);
              if (callback) {
                callback();
              }
            }

            if (method === 'ExtrinsicFailed') {
              alert.error(`Extrinsic Failed`);
            }
          });
        }

        if (data.status.isInvalid) {
          alert.error(`Invalid Transaction`);
        }
      },
    );
  } catch (error) {
    alert.error(`${error}`);
    console.error('transaction failed', error);
  }
};

export const calculateGas = async (
  api: any,
  address: string,
  programId: string,
  payload: any,
  metaFile: any,
) => {
  const addressRaw = GearKeyring.decodeAddress(address);


  const gas = await fetch(metaFile)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => Buffer.from(arrayBuffer))
    .then((buffer) => getWasmMetadata(buffer))
    .then((metaData: any) =>
      api.program.gasSpent.handle(
        addressRaw,
        programId,
        payload,
        metaData,
      ),
    );

    console.log(gas)
};
