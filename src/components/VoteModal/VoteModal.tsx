import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useAccount, useApi } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { Modal } from 'components/Modal/Modal';
import { Form } from './Form/Form';

type Props = {
  proposalId: string;
  closeModal: () => void;
};

const VoteModal = ({ closeModal, proposalId }: Props) => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const handleSubmit = (event: React.MouseEvent<HTMLElement>, vote: string) => {
    event.preventDefault();
  };

  return (
    <Modal caption={`Vote for proposal ${proposalId}`} close={closeModal}>
      <Form handleSubmit={handleSubmit} />
    </Modal>
  );
};

export { VoteModal };
