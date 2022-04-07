import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ProposalInfo } from 'pages/types';

import './ProposalStatus.scss';

type Props = {
  proposal: ProposalInfo;
};

const ProposalStatus = ({
  proposal: { cancelled, didPass, aborted },
}: Props) => {
  const [status, setStatus] = useState<string>();

  const STATUS = Object.freeze({
    IN_VOTE: 'voting',
    CANCELED: 'cancelled',
    PASSED: 'passed',
    ABORDED: 'aborded',
  });

  useEffect(() => {
    if (cancelled) setStatus(STATUS.CANCELED);
    else if (didPass) setStatus(STATUS.PASSED);
    else if (aborted) setStatus(STATUS.ABORDED);
    else setStatus(STATUS.IN_VOTE);
  }, []);

  return (
    <div className={clsx(`proposal-status`, status)}>
      <span>{status}</span>
    </div>
  );
};

export { ProposalStatus };
