import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from 'images/arrow_back.svg';
import { Button } from '@gear-js/ui';

import './BackButton.scss'

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return <Button icon={arrow} onClick={handleClick} className="back-button"/>;
};

export { BackButton };
