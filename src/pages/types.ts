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
  maxTotalSharesAtYesVote: string;
  votesByMember: string;
};

export type ProposalKeys = { [key: string]: ProposalInfo }

export type ContractResponse = {
  ProposalInfo: ProposalInfo;
};
