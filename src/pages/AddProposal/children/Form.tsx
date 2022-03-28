import React, { useState } from 'react';
import { Radio, Input, Button } from '@gear-js/ui';
import { ProposalValues } from 'pages/types'

import './Form.scss';

type Props = {
  handleSubmit: (
    event: React.MouseEvent<HTMLElement>,
    type: string,
    payload: ProposalValues,
  ) => void;
};

const Form = ({ handleSubmit }: Props) => {
  const [proposalType, setProposalType] = useState<string>('member');

  const [values, setValues] = useState<ProposalValues>({
    applicant: '',
    amount: '',
    tokenTribute: '',
    sharesRequested: '',
    quorum: '',
    details: '',
  });

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProposalType(e.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form className="add-proposal__form">
      <div className="add-proposal__radio">
        <Radio
          label="Member proposal"
          value="member"
          onChange={handleRadioChange}
          checked={proposalType === 'member'}
          name="type"
        />
        <Radio
          label="Funding proposal"
          value="funding"
          onChange={handleRadioChange}
          checked={proposalType === 'funding'}
          name="type"
        />
      </div>
      <fieldset className="add-proposal__body">
        <Input
          label="Applicant (type: ActorId)"
          name="applicant"
          value={values.applicant}
          onChange={handleInputChange}
        />
        {proposalType === 'member' ? (
          <>
            <Input
              label="TokenTribute (type: u128)"
              name="tokenTribute"
              value={values.tokenTribute}
              onChange={handleInputChange}
            />
            <Input
              label="SharesRequested (type: u128)"
              name="sharesRequested"
              value={values.sharesRequested}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <Input
            label="Amount (type: u128)"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
          />
        )}
        <Input
          label="Quorum (type: u128)"
          name="quorum"
          value={values.quorum}
          onChange={handleInputChange}
        />
        <Input
          label="Details (type: Text)"
          name="details"
          value={values.details}
          onChange={handleInputChange}
        />
      </fieldset>

      <Button
        className="btn btn-success"
        text="Submit"
        onClick={(event) => handleSubmit(event, proposalType, values)}
      />
    </form>
  );
};

export { Form };
