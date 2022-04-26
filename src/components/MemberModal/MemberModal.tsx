import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useAccount, useApi } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { DAO_CONTRACT_ADDRESS } from 'consts';
import { Modal } from 'components/Modal/Modal';
import { Form } from './Form/Form';

import { daoMeta } from 'out/metaTypes';

type Props = {
  closeModal: () => void;
};

const MemberModal = ({ closeModal }: Props) => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const [isSubmited, setIsSubmited] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = (
    event: React.MouseEvent<HTMLElement>,
    amount: string,
  ) => {
    event.preventDefault();

    if (!amount) {
      alert.error('No amount');
    }

    if (account) {
      setInProgress(true);
      sendMessageToProgram(
        api,
        DAO_CONTRACT_ADDRESS,
        {
          Deposit: {
            amount,
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
    <Modal caption="Deposit funds" close={closeModal}>
      {isSubmited ? (
        <div className="center">
          Congratulations! Now you are DAO member. You can vote for proposals or create your own.
        </div>
      ) : (
        <Form handleSubmit={handleSubmit} inProgress={inProgress} />
      )}
    </Modal>
  );
};

export { MemberModal };
