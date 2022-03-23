import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ProposalInfo } from 'pages/types';

import './ProposalStatus.scss';

type Props = {
  proposal: ProposalInfo;
};

const ProposalStatus = ({
  proposal: { cancelled, didPass, processed, aborted },
}: Props) => {
  const [status, setStatus] = useState<string>();

  const STATUS = Object.freeze({
    IN_VOTE: 'voting',
    CANCELED: 'canceled',
    PASSED: 'passed',
    PROCESSED: 'processed',
    ABORDED: 'aborded',
  });

  useEffect(() => {
    if (cancelled) setStatus(STATUS.CANCELED);
    else if (didPass) setStatus(STATUS.CANCELED);
    else if (processed) setStatus(STATUS.CANCELED);
    else if (aborted) setStatus(STATUS.CANCELED);
    else setStatus(STATUS.IN_VOTE);
  }, []);

  return <div className={clsx(`proposal-status`, status)}>Status: <span>{status}</span></div>
};

export { ProposalStatus };
