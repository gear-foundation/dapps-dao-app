import React, { useEffect, useState } from 'react';
import { Welcome } from './children';
import { ProposalList } from './children';

const DAO = () => {

  return (
    <>
      <Welcome />
      <ProposalList />
    </>
  );
};

export { DAO };