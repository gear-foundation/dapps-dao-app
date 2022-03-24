import React, { useEffect, useState } from 'react';
import { useStatus, useApi } from 'hooks';
import { useAlert } from 'react-alert';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { NoProposals } from './children/NoProposals/NoProposals';
import { Proposal } from './children/Proposal/Proposal';
import { VoteModal } from 'components/VoteModal/VoteModal';
import { AllProposal, AllProposalResponse } from 'pages/types';
import { Spinner } from 'components/Spinner/Spinner';

import daoMeta from 'out/dao.meta.wasm';

import './ProposalList.scss';

export const ProposalList = () => {
  const {
    userStatus: { isMember },
  } = useStatus();
  const { api } = useApi();
  const alert = useAlert();

  const [proposals, setProposals] = useState<AllProposal | null | {}>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proposalId, setProposalId] = useState<any>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Open VoteModal and provide specific proposalId
  const handleVote = (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    if(!isMember){
      alert.error('Only Members Can Vote');
      return;
    }

    setProposalId(id);
    openModal();
  };

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

  return (
    <div className="proposal-block">
      <h4>Proposal list</h4>

      <div className="proposal-list scroll-pane">
        {proposals ? (
          <>
            {Object.keys(proposals).length === 0 ? (
              <NoProposals />
            ) : (
              <Proposal proposals={proposals} handleVote={handleVote} />
            )}
          </>
        ) : (
          <div className="spiner-wrapper">
            <Spinner />
          </div>
        )}
      </div>
      {isModalOpen && (
        <VoteModal closeModal={closeModal} proposalId={proposalId} />
      )}
    </div>
  );
};
