import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useAccount, useApi } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { Modal } from 'components/Modal/Modal';
import { Form } from './Form/Form';

import { daoMeta } from 'out/metaTypes';

type Props = {
  proposalId: string;
  closeModal: () => void;
};

const VoteModal = ({ closeModal, proposalId }: Props) => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const [isSubmited, setIsSubmited] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>, vote: string) => {
    event.preventDefault();

    if (account) {
      setInProgress(true);
      sendMessageToProgram(
        api,
        DAO_CONTRACT_ADDRESS,
        {
          SubmitVote: {
            proposalId,
            vote,
          },
        },
        { handle_input: 'DaoAction', types: daoMeta.types },
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
    <Modal caption={`Vote for proposal ${proposalId}`} close={closeModal}>
      {isSubmited ? (
        <div className="center">Thank you for your Vote!</div>
      ) : (
        <Form handleSubmit={handleSubmit} inProgress={inProgress}/>
      )}
    </Modal>
  );
};

export { VoteModal };
