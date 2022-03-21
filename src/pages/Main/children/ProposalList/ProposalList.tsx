import React, { useEffect, useState } from 'react';

import { useMember, useApi } from 'hooks';
import { useAlert } from 'react-alert';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { NoProposals } from './children/NoProposals/NoProposals';
import { Proposal } from './children/Proposal/Proposal';
import { AllProposal, AllProposalResponse } from 'pages/types';
import { Spinner } from 'components/Spinner/Spinner';

import daoMeta from 'out/dao.meta.wasm';

import './ProposalList.scss';

export const ProposalList = () => {
  const { isMember } = useMember();
  const { api } = useApi();
  const alert = useAlert();

  const [proposals, setProposals] = useState<AllProposal | null | {}>(null);

  // Get all Proposals from program state
  useEffect(() => {
    fetch(daoMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) =>
        api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
          AllProposals: 'Null',
        }),
      )
      .then((state) => state.toHuman() as AllProposalResponse)
      .then(({ AllProposals }) => setProposals(AllProposals));
  }, []);

  // Vote for specific Proposal
  const HandleVote = (event: React.MouseEvent, proposalID: string) => {
    event.preventDefault();

    if (!isMember) {
      alert.error('Only members can vote');
      return;
    }

    console.log(proposalID);
  };

  return (
    <div className="proposal-block">
      <h4>Proposal list</h4>

      <div className="proposal-list scroll-pane">
        {proposals ? (
          <>
            {Object.keys(proposals).length === 0 ? (
              <NoProposals />
            ) : (
              <Proposal proposals={proposals} handleVote={HandleVote} />
            )}
          </>
        ) : (
          <div className="spiner-wrapper">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
