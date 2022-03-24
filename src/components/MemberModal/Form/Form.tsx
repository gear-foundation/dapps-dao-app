import React, { useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { useDaoBalance } from 'components/hooks';

import './Form.scss';

type Props = {
  handleSubmit: (event: React.MouseEvent<HTMLElement>, amount: string) => void;
};

const Form = ({ handleSubmit }: Props) => {
  const daoBalance = useDaoBalance();
  const [amount, setAmount] = useState<null | string>(null);

  return (
    <form className="member-modal__form">
      <div className="member-modal__balance">
        Your Balance: <span>{daoBalance ? daoBalance : <Spinner />}</span>
      </div>
      <div className="member-modal__amount">
        <input
          type="text"
          placeholder="Enter tokens"
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <button
        className="btn btn-success"
        onClick={(event) => {
          if (amount) {
            handleSubmit(event, amount);
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};

export { Form };
