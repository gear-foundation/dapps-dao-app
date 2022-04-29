export type ProposalInfo = {
  proposer: string;
  applicant: string;
  yesVotes: string;
  noVotes: string;
  quorum: string;
  amount: string;
  processed: boolean;
  didPass: boolean;
  cancelled: boolean;
  details: string;
  startingPeriod: string;
  endedAt: string;
  votesByMember: string;
};

export type ContractResponse = {
  ProposalInfo: ProposalInfo;
};

export type AllProposalResponse = {
  AllProposals: AllProposal | {};
};

export type AllProposal = {
  [key: string]: ProposalInfo;
};

export type ProposalValues = {
  applicant: string;
  amount: string;
  quorum: string;
  details: string;
};

export type MemberEvent = {
  Deposit: {
    member: string;
    share: string;
  };
};
