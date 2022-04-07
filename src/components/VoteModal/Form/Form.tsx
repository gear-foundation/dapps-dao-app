import React, { useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { Radio, Button } from '@gear-js/ui';
import { useMemberPower } from 'components/hooks';

import './Form.scss';

type Props = {
  handleSubmit: (event: React.MouseEvent<HTMLElement>, vote: string) => void;
  inProgress: boolean;
};

const Form = ({ handleSubmit, inProgress }: Props) => {
  const memberPower = useMemberPower();
  const [selectedValue, setSelectedValue] = useState('Yes');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <form className="vote-modal__form">
      <div className="vote-modal__balance">
        Your Power: <span>{memberPower ? memberPower : <Spinner />}</span>
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
        text={inProgress ? "...Broadcasting" : "Submit"}
        disabled={inProgress}
        className="btn btn-success"
        onClick={(event) => {
          handleSubmit(event, selectedValue);
        }}
      />
    </form>
  );
};

export { Form };
