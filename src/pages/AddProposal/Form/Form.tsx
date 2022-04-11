import React, { useState } from 'react';
import { Radio, Input, Button } from '@gear-js/ui';
import { ProposalValues } from 'pages/types';

import './Form.scss';

type Props = {
  handleSubmit: (
    event: React.MouseEvent<HTMLElement>,
    payload: ProposalValues,
  ) => void;
  inProgress: boolean;
};

const Form = ({ handleSubmit, inProgress }: Props) => {

  const [values, setValues] = useState<ProposalValues>({
    applicant: '',
    amount: '',
    quorum: '',
    details: '',
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form className="add-proposal__form">
      <fieldset className="add-proposal__body">
        <Input
          label="Applicant (type: ActorId)"
          name="applicant"
          value={values.applicant}
          onChange={handleInputChange}
        />
      
          <Input
            label="Amount (type: u128)"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
          />

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
        text={inProgress ? '...Broadcasting' : 'Submit'}
        disabled={inProgress}
        onClick={(event) => handleSubmit(event, values)}
      />
    </form>
  );
};

export { Form };
