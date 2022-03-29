import React, { useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { Radio, Button } from '@gear-js/ui';
import { useDaoBalance } from 'components/hooks';

import './Form.scss';

type Props = {
  handleSubmit: (event: React.MouseEvent<HTMLElement>, vote: string) => void;
};

const Form = ({ handleSubmit }: Props) => {
  const daoBalance = useDaoBalance();
  const [selectedValue, setSelectedValue] = useState('Yes');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <form className="vote-modal__form">
      <div className="vote-modal__balance">
        Your Power: <span>{daoBalance ? daoBalance : <Spinner />}</span>
      </div>
      <div className="vote-modal__radio">
        <Radio
          label="Yes"
          value="Yes"
          onChange={handleChange}
          checked={selectedValue === 'Yes'}
          name="vote"
        />
        <Radio
          label="No"
          value="No"
          onChange={handleChange}
          checked={selectedValue === 'No'}
          name="vote"
        />
      </div>
      <Button
        text="Submit"
        className="btn btn-success"
        onClick={(event) => {
          handleSubmit(event, selectedValue);
        }}
      />
    </form>
  );
};

export { Form };
