import React, { useEffect, useState } from 'react';
import { Welcome } from './children/index';
import { ProposalList } from './children/index';

const Main = () => {

  return (
    <>
      <Welcome />
      <ProposalList />
    </>
  );
};

export { Main };