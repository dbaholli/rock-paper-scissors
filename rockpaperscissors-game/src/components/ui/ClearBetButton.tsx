import { MouseEvent } from 'react';

type ClearBetButtonProps = {
  clearBet: () => void;
};

const ClearBetButton = ({ clearBet }: ClearBetButtonProps) => (
  <button
    onClick={(e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      clearBet();
    }}
    className='mt-1 bg-red-500 text-white font-bold py-1 px-2 rounded'
  >
    CLEAR BET
  </button>
);

export default ClearBetButton;
