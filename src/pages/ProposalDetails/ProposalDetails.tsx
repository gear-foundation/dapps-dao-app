import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'components/Spinner/Spinner';
import { ContractResponse, ProposalInfo } from 'pages/types';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { useApi } from 'hooks';
import daoMeta from 'out/dao.meta.wasm';

import './ProposalDetails.scss'

const ProposalDetails = () => {
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
      {proposal ? (
        <>
          <header>
            <h2>{proposal.isMembershipProposal ? "Membership proposal" : "Funding proposal"}</h2>
            
          </header>
          <div className="proposal-info-block">
            {Object.entries(proposal).map(([key, value], index) => {
              if (typeof value === 'string' || typeof value === 'boolean') {
                return (
                  <div className="row" key={index}>
                    <div className="title">{key}</div>
                    <div className="proposal-info">{value.toString()}</div>
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export { ProposalDetails };
