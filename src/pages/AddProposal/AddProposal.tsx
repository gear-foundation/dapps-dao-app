import { useState } from 'react';
import { useApi, useStatus, useAccount } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { BackButton } from 'components/BackButton/BackButton';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { ProposalValues } from 'pages/types';
import { Form } from './Form/Form';
import { useAlert } from 'react-alert';

import './AddProposal.scss';

const AddProposal = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { account } = useAccount();
  const {
    userStatus: { isMember },
  } = useStatus();

  const [isSubmited, setIsSubmited] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  // Submit proposal
  const handlePropose = (event: React.MouseEvent, values: ProposalValues) => {
    event.preventDefault();

    if (!isMember) {
      alert.error('Only members can make proposal');
      return;
    }

    const { applicant, amount, quorum, details } = values;

    if (account) {
      setInProgress(true);
      sendMessageToProgram(
        api,
        DAO_CONTRACT_ADDRESS,
        {
          SubmitFundingProposal: {
            applicant,
            amount,
            quorum,
            details,
          },
        },
        { handle_input: 'DaoAction', types: REGISTRY_TYPES },
        account,
        alert,
        () => {
          setIsSubmited(true);
        },
      );
    } else {
      alert.error('Wallet not connected');
    }
  };

  return (
    <>
      {isMember ? (
        <div className="add-proposal__block">
          <div className="add-proposal__header">
            <BackButton />
            <span className="add-proposal__title">Make new proposal</span>
          </div>
          {isSubmited ? (
            <div className="add-proposal__success">Your proposal has been submitted.</div>
          ) : (
            <Form handleSubmit={handlePropose} inProgress={inProgress} />
          )}
        </div>
      ) : (
        <p>Only members able to create proposals</p>
      )}
    </>
  );
};

export { AddProposal };
