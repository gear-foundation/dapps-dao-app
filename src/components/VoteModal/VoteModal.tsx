import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useAccount, useApi } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { Modal } from 'components/Modal/Modal';

type Props = {
  proposalId: string,
  closeModal: () => void;
};

const VoteModal = ({ closeModal, proposalId }: Props) => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const [isSubmited, setIsSubmited] = useState(false);

  const HandleSubmit = (
    event: React.MouseEvent<HTMLElement>,
    amount: string,
  ) => {
    event.preventDefault();

    
  };

  return (
    <Modal caption="Vote now" close={closeModal}>
      <p>Vote now for {proposalId}</p>
    </Modal>
  );
};

export { VoteModal }
