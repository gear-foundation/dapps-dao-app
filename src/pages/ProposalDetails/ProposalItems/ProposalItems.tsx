import { ProposalInfo } from 'pages/types';

import './ProposalItems.scss';

type Props = {
  proposal: ProposalInfo;
};

const ProposalItems = ({
  proposal: { proposer, applicant, yesVotes, noVotes, amount, quorum, details },
}: Props) => {
  return (
    <div className="proposal-info-block">
      <div className="row">
        <div className="title">Proposer:</div>
        <div className="proposal-info">{proposer}</div>
      </div>
      <div className="row">
        <div className="title">Applicant:</div>
        <div className="proposal-info">{applicant}</div>
      </div>
      <div className="row">
        <div className="title">Yes votes:</div>
        <div className="proposal-info">{yesVotes}</div>
      </div>
      <div className="row">
        <div className="title">No votes:</div>
        <div className="proposal-info">{noVotes}</div>
      </div>

      <div className="row">
        <div className="title">Amount:</div>
        <div className="proposal-info">{amount} DAO</div>
      </div>

      <div className="row">
        <div className="title">Quorum:</div>
        <div className="proposal-info">{quorum}%</div>
      </div>
      <div className="row">
        <div className="title">Details:</div>
        <div className="proposal-info">{details}</div>
      </div>
    </div>
  );
};

export { ProposalItems };
