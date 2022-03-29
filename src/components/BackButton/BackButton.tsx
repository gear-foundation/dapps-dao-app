import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from 'images/arrow_back.svg';
import { Button, ButtonProps } from '@gear-js/ui';

import './BackButton.scss';

type OmittedProps = 'text' | 'icon' | 'color' | 'size' | 'onClick';

const BackButton = (props: Omit<ButtonProps, OmittedProps>) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Button
      icon={arrow}
      color="transparent"
      onClick={handleClick}
      {...props}
      className="back-button"
    />
  );
};

export { BackButton };
