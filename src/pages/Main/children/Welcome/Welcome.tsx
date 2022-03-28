import React, { useState } from 'react';
import { useStatus } from 'hooks';
import { MemberModal } from 'components/MemberModal/MemberModal'
import memberIcon from 'images/member-icon.svg';
import './Welcome.scss';

export const Welcome = () => {
  const {
    userStatus: { isMember, isAdmin },
  } = useStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="welcome">
      <h1>The DAO</h1>
      <p>
        Digital decentralized autonomous organization, which is a crowdfunding
        platform based on a system of smart contracts and GEAR platform.
      </p>

      {isMember || isAdmin ? (
        <div className="btn-line">
          <a href="/add" className="btn btn-success">
            Submit Proposal
          </a>
        </div>
      ) : (
        <div className="btn-line">
          <a href="#" className="btn btn-success" onClick={openModal}>
            <i>
              <img src={memberIcon} alt=""></img>
            </i>
            Become a member
          </a>
        </div>
      )}
      {isModalOpen &&  <MemberModal closeModal={closeModal}/>}
    </header>
  );
};
