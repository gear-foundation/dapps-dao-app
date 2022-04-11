export type ProposalInfo = {
  proposer: string;
  applicant: string;
  sharesRequested: string;
  yesVotes: string;
  noVotes: string;
  quorum: string;
  isMembershipProposal: boolean;
  amount: string;
  processed: boolean;
  didPass: boolean;
  cancelled: boolean;
  aborted: boolean;
  tokenTribute: string;
  details: string;
  startingPeriod: string;
  endedAt: string;
  maxTotalSharesAtYesVote: string;
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