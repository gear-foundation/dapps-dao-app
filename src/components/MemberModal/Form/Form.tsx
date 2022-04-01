import React, { useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { Input, Button } from '@gear-js/ui';
import { useDaoBalance } from 'components/hooks';

import './Form.scss';

type Props = {
  handleSubmit: (event: React.MouseEvent<HTMLElement>, amount: string) => void;
  inProgress: boolean;
};

const Form = ({ handleSubmit, inProgress }: Props) => {
  const daoBalance = useDaoBalance();
  const [amount, setAmount] = useState<null | string>(null);

  return (
    <form className="member-modal__form">
      <div className="member-modal__balance">
        Your Balance: <span>{daoBalance ? daoBalance : <Spinner />}</span>
      </div>
      <div className="member-modal__amount">
        <Input
          placeholder="Enter tokens"
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <Button
        text={inProgress ? "...Broadcasting" : "Submit"}
        disabled={inProgress}
        className="btn btn-success"
        onClick={(event) => {
          if (amount) {
            handleSubmit(event, amount);
          }
        }}
      />
    </form>
  );
};

export { Form };
