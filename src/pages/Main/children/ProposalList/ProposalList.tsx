import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMember, useApi } from 'hooks';
import { useAlert } from 'react-alert';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { AllProposal, AllProposalResponse } from 'pages/types';
import { Spinner } from 'components/Spinner/Spinner';
import voteIcon from 'images/vote-icon.svg';
import moreInfoIcon from 'images/more-info-icon.svg';
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
            {Object.entries(proposals).map(
              ([proposalID, { yesVotes, noVotes }], index) => {
                return (
                  <div className="proposal" key={index}>
                    <div className="title">Proposal {proposalID}</div>
                    <div className="rating-box">
                      <div className="like">{yesVotes}</div>
                      <div className="unlike">{noVotes}</div>
                    </div>
                    <div className="time">Expires in 5 days</div>
                    <a
                      href="#"
                      className="btn btn-success btn-sm"
                      onClick={(event) => {
                        HandleVote(event, proposalID);
                      }}
                    >
                      <i>
                        <img src={voteIcon} alt=""></img>
                      </i>
                      Vote
                    </a>
                    <Link
                      to={`proposal/${proposalID}`}
                      className="btn btn-outline-border btn-sm"
                    >
                      <i>
                        <img src={moreInfoIcon} alt=""></img>
                      </i>
                      More info
                    </Link>
                  </div>
                );
              },
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
