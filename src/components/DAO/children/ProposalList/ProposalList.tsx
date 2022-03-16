import React, { useEffect, useState } from 'react';
import { useMember, useApi } from 'hooks';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import voteIcon from 'images/vote-icon.svg';
import moreInfoIcon from 'images/more-info-icon.svg';
import daoMeta from 'out/dao.meta.wasm';

import './ProposalList.scss';

type proposalInfo = {
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

export const ProposalList = () => {
  const { isMember } = useMember();
  const { api } = useApi();

  const [proposals, setProposals] = useState<proposalInfo | null>(null);

  useEffect(() => {
    fetch(daoMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) =>
        api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
          ProposalInfo: '1',
        }),
      )
      .then((state) => state.toHuman() as proposalInfo)
      .then((proposal) => setProposals(proposal));
  }, []);

  console.log(proposals);

  return (
    <div className="proposal-block">
      <h4>Proposal list</h4>

      <div className="proposal-list scroll-pane">
        {proposals ? (
          <div className="proposal">
            <div className="title">Proposal 20</div>
            <div className="rating-box">
              <div className="like">1259959235</div>
              <div className="unlike">2432145</div>
            </div>
            <div className="time">Expires in 5 days</div>
            <a href="#" className="btn btn-success btn-sm">
              <i>
                <img src={voteIcon} alt=""></img>
              </i>
              Vote
            </a>
            <a href="#" className="btn btn-outline-border btn-sm">
              <i>
                <img src={moreInfoIcon} alt=""></img>
              </i>
              More info
            </a>
          </div>
        ) : (
          <p>Loading proposals...</p>
        )}
      </div>
    </div>
  );
};
