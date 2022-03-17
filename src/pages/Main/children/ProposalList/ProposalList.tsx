import React, { useEffect, useState } from 'react';
import { useMember, useApi } from 'hooks';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { ProposalInfo, ContractResponse } from 'pages/types';
import { Spinner } from 'components/Spinner/Spinner';
import voteIcon from 'images/vote-icon.svg';
import moreInfoIcon from 'images/more-info-icon.svg';
import daoMeta from 'out/dao.meta.wasm';

import './ProposalList.scss';

export const ProposalList = () => {
  const { isMember } = useMember();
  const { api } = useApi();

  const [proposals, setProposals] = useState<ProposalInfo | null>(null);

  useEffect(() => {
    fetch(daoMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) =>
        api.programState.read(DAO_CONTRACT_ADDRESS, buffer, {
          ProposalInfo: '1',
        }),
      )
      .then((state) => state.toHuman() as ContractResponse)
      .then(({ ProposalInfo }) => setProposals(ProposalInfo));
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
          <div className="spiner-wrapper">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
