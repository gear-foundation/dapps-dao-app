import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from 'utils'
import { AllProposal } from 'pages/types';
import voteIcon from 'images/vote-icon.svg';
import moreInfoIcon from 'images/more-info-icon.svg';

import './Proposal.scss';

type Props = {
  handleVote: (event: React.MouseEvent, proposalID: string) => void,
  proposals: AllProposal;
};

const Proposal = ({ proposals, handleVote }: Props) => {

  return (
    <>
      {Object.entries(proposals).map(
        ([proposalId, { yesVotes, noVotes, endedAt }], index) => {
          return (
            <div className="proposal" key={index}>
              <div className="title">Proposal #{proposalId}</div>
              <div className="rating-box">
                <div className="like">{yesVotes}</div>
                <div className="unlike">{noVotes}</div>
              </div>
              <div className="time">Expires: {toDate(endedAt)}</div>
              <a
                href="#"
                className="btn btn-success btn-sm"
                onClick={((event) => {
                  handleVote(event, proposalId)
                })}
              >
                <i>
                  <img src={voteIcon} alt=""></img>
                </i>
                Vote
              </a>
              
              <Link
                to={`proposal/${proposalId}`}
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
  );
};

export { Proposal };
