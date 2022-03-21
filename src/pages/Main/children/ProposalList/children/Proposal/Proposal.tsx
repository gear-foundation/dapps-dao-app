import { Link } from 'react-router-dom';
import { AllProposal } from 'pages/types';
import voteIcon from 'images/vote-icon.svg';
import moreInfoIcon from 'images/more-info-icon.svg';
import './Proposal.scss';

type Props = {
  proposals: AllProposal;
  handleVote: (event: React.MouseEvent, proposalID: string) => void;
};

const Proposal = ({ proposals, handleVote }: Props) => {
  return (
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
                  handleVote(event, proposalID);
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
  );
};

export { Proposal };
