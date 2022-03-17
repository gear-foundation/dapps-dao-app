import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContractResponse, ProposalInfo } from 'pages/types';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { useApi } from 'hooks';
import daoMeta from 'out/dao.meta.wasm';

const ProposalInfo = () => {
  const { api } = useApi();
  const { ProposalId } = useParams();

  const [proposal, setProposal] = useState<ProposalInfo | null>(null);

  useEffect(() => {
    fetch(daoMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) =>
        api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
          ProposalInfo: `${ProposalId}`,
        }),
      )
      .then((state) => state.toHuman() as ContractResponse)
      .then(({ ProposalInfo }) => setProposal(ProposalInfo));
  }, []);

  return (
    <>
      <h1>Proposal {ProposalId}</h1>
      {proposal}
    </>
  );
};

export { ProposalInfo };
