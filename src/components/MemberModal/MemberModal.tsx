import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useAccount, useApi } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { Modal } from 'components/Modal/Modal';
import { Form } from './Form/Form';

type Props = {
  closeModal: () => void;
};

const MemberModal = ({ closeModal }: Props) => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const [isSubmited, setIsSubmited] = useState(false);

  const HandleSubmit = (
    event: React.MouseEvent<HTMLElement>,
    amount: string,
  ) => {
    event.preventDefault();

    if (!amount) {
      alert.error('No amount');
    }

    if (account) {
      console.log('here');
      sendMessageToProgram(
        api,
        DAO_CONTRACT_ADDRESS,
        300_000_000,
        { RequestForMembership: amount },
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
    <Modal caption="become a member" close={closeModal}>
      {isSubmited ? (
        <p>Thank you for your participation, please wait for confirmation</p>
      ) : (
        <Form HandleSubmit={HandleSubmit} />
      )}
    </Modal>
  );
};

export { MemberModal };
