import { WaitListType } from '../../types';
import { toShortAddress } from 'utils'

import './WaitList.scss';

type Props = {
  list: WaitListType;
  handlePropose: (event: React.MouseEvent, applicant: string, tokenTribute: string) => void;
};

const WaitList = ({ list, handlePropose }: Props) => {
  return (
    <>
      {Object.entries(list).map(
        ([applicant, tokenTribute], index) => {
          return (
            <div className="waitlist-item" key={applicant}>
              <div className="tribute">{tokenTribute} DAO</div>
              <div className="applicant">{toShortAddress(applicant)}</div>
              <a
                href="#"
                className="btn btn-success btn-sm"
                onClick={(event) => {
                  handlePropose(event, applicant, tokenTribute);
                }}
              >
                Make proposal
              </a>
            </div>
          );
        },
      )}
    </>
  );
};

export { WaitList };
