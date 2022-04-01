import { useApi, useStatus, useAccount } from 'hooks';
import { sendMessageToProgram, calculateGas } from 'service/SendMessage';
import { BackButton } from 'components/BackButton/BackButton';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { ProposalValues } from 'pages/types';
import { Form } from './children/Form/Form';
import { useAlert } from 'react-alert';

import daoMeta from 'out/dao.meta.wasm';

import './AddProposal.scss';

const AddProposal = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { account } = useAccount();
  const {
    userStatus: { isMember },
  } = useStatus();

  // Submit proposal (Membership or Funding)
  const handlePropose = (
    event: React.MouseEvent,
    type: string,
    values: ProposalValues,
  ) => {
    event.preventDefault();

    if (!isMember) {
      alert.error('Only members can make proposal');
      return;
    }

    const {
      applicant,
      tokenTribute,
      sharesRequested,
      amount,
      quorum,
      details,
    } = values;

    let payload: Object;

    if (type === 'membership') {
      payload = {
        SubmitMembershipProposal: {
          applicant,
          tokenTribute,
          sharesRequested,
          quorum,
          details,
        },
      };
    }

    if (type === 'funding') {
      payload = {
        SubmitFundingProposal: {
          applicant,
          amount,
          quorum,
          details,
        },
      };
    }

    if (account) {
      sendMessageToProgram(
        api,
        DAO_CONTRACT_ADDRESS,
        payload!,
        { handle_input: 'DaoAction', types: REGISTRY_TYPES },
        account,
        alert,
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

          <Form handleSubmit={handlePropose} />
        </div>
      ) : (
        <p>Only members able to create proposals</p>
      )}
    </>
  );
};

export { AddProposal };
