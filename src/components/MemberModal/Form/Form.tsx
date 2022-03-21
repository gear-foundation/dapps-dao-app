import React, { useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';

import { useDaoBalance } from '../hooks';

import './Form.scss';

type Props = {
  HandleSubmit: (event: React.MouseEvent<HTMLElement>, amount: string) => void;
};

const Form = ({ HandleSubmit }: Props) => {
  const daoBalance = useDaoBalance();
  const [amount, setAmount] = useState<null | string>(null);

  return (
    <form action="#">
      <div className="balance-info">
        Your Balance: <span>{daoBalance ? daoBalance : <Spinner />}</span>
      </div>
      <div className="form-holder">
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
            HandleSubmit(event, amount);
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};

export { Form };
