import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProposalInfo = () => {

  const { ProposalId }  = useParams();

  return (
    <>
      <h1>Proposal {ProposalId}</h1>
    </>
  );
};

export { ProposalInfo };