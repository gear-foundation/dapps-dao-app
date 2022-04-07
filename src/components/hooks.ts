import { useEffect, useState } from 'react';
import { ERC20_CONTRACT_ADDRESS, DAO_CONTRACT_ADDRESS } from 'consts';
import { GearKeyring } from '@gear-js/api';
import { DaoBalanceResponse, MemberPowerResponse } from './types';
import { useApi, useAccount } from 'hooks';
import erc20Meta from 'out/fungible_token.meta.wasm';
import daoMeta from 'out/dao.meta.wasm';

export const useDaoBalance = () => {
  const { api } = useApi();
  const { account } = useAccount();
  const [daoBalance, setDaoBalance] = useState<null | string>(null);

  useEffect(() => {
    if (account) {
      const { address } = account;

      const addressRaw = GearKeyring.decodeAddress(address);

      fetch(erc20Meta)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => Buffer.from(arrayBuffer))
        .then((buffer) =>
          api.programState.read(ERC20_CONTRACT_ADDRESS, buffer, {
            BalanceOf: `${addressRaw}`,
          }),
        )
        .then((state) => state.toHuman() as DaoBalanceResponse)
        .then(({ Balance }) => setDaoBalance(Balance));
    }
  }, [api, account]);

  return daoBalance;
};

export const useMemberPower = () => {
  const { api } = useApi();
  const { account } = useAccount();
  const [memberPower, setMemberPower] = useState<null | string>(null);

  useEffect(() => {
    if (account) {
      const { address } = account;

      const addressRaw = GearKeyring.decodeAddress(address);

      fetch(daoMeta)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => Buffer.from(arrayBuffer))
        .then((buffer) =>
          api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
            MemberPower: `${addressRaw}`,
          }),
        )
        .then((state) => state.toHuman() as MemberPowerResponse)
        .then(({ MemberPower }) => setMemberPower(MemberPower));
    }
  }, [api, account]);

  return memberPower;
};
