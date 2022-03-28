import { useApi, useStatus, useAccount } from 'hooks';
import { sendMessageToProgram } from 'service/SendMessage';
import { ProposalValues } from 'pages/types';
import { DAO_CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { Form } from './children/Form/Form';
import { useAlert } from 'react-alert';

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
        300_000_000,
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
          <header>
            <h2>Make new proposal</h2>
          </header>
          <Form handleSubmit={handlePropose} />
        </div>
      ) : (
        <p>Only members able to create proposals</p>
      )}
    </>
  );
};

export { AddProposal };
