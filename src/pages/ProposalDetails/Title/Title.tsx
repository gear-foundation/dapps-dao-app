import './Title.scss';

type Props = {
  isMembershipProposal: boolean;
  proposalId: string | undefined;
};

const Title = ({ isMembershipProposal, proposalId }: Props) => {
  return (
    <span className="proposal-title">
      {isMembershipProposal ? 'Membership proposal' : 'Funding proposal'} #
      {proposalId}
    </span>
  );
};

export { Title };
