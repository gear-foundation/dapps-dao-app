import './Title.scss';

type Props = {
  proposalId: string | undefined;
};

const Title = ({ proposalId }: Props) => {
  return <span className="proposal-title">Funding proposal #{proposalId}</span>;
};

export { Title };
