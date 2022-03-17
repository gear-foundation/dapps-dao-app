import React from 'react';
import { useMember } from 'hooks';

import memberIcon from 'images/member-icon.svg';
import './Welcome.scss';

export const Welcome = () => {
  const { isMember } = useMember();

  return (
    <header className="welcome">
      <h1>The DAO</h1>
      <p>
        Digital decentralized autonomous organization, which is a crowdfunding
        platform based on a system of smart contracts and GEAR platform.
      </p>

      {isMember ? (
        <div className="btn-line">
          <a href="#" className="btn btn-success">
            Submit Proposal
          </a>
        </div>
      ) : (
        <div className="btn-line">
          <a href="#" className="btn btn-success">
            <i>
              <img src={memberIcon} alt=""></img>
            </i>
            Become a member
          </a>
        </div>
      )}
    </header>
  );
};
