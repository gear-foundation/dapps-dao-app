import { Link } from 'react-router-dom';
import { Button } from '@gear-js/ui';
import { toDate } from 'utils';
import { ProposalStatus } from 'components/ProposalStatus/ProposalStatus';
import { AllProposal } from 'pages/types';
import voteIcon from 'images/vote-icon.svg';
import moreInfoIcon from 'images/more-info-icon.svg';

import './Proposal.scss';

type Props = {
  handleVote: (event: React.MouseEvent, proposalID: string) => void;
  proposals: AllProposal;
};

const Proposal = ({ proposals, handleVote }: Props) => {
  const isExpired = (_timestamp: string) => {
    const now = Date.now();
    const formated_timestamp = _timestamp.replaceAll(',', '');
    if (now >= Number(formated_timestamp)) return true;

    return false;
  };

  return (
    <>
      {Object.entries(proposals).map(([proposalId, proposal], index) => {
        return (
          <div className="proposal" key={index}>
            <div className="title">Proposal #{proposalId}</div>
            <ProposalStatus proposal={proposal} />
            <div className="rating-box">
              <div className="like">{proposal.yesVotes}</div>
              <div className="unlike">{proposal.noVotes}</div>
            </div>
            {console.log(isExpired(proposal.endedAt))}
            <div className="time">Expires: {toDate(proposal.endedAt)}</div>

            <Button
              text="Vote"
              icon={voteIcon}
              disabled={isExpired(proposal.endedAt)}
              className="btn btn-success btn-sm"
              onClick={(event) => {
                handleVote(event, proposalId);
              }}
            />

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
      })}
    </>
  );
};

export { Proposal };
