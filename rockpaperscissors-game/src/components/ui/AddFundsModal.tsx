import React, { useEffect } from 'react';
import AddFundsButton from '@/components/ui/AddFundsButton';

type AddFundsProps = {
  addFunds: (amount: number) => void;
  onClose: () => void;
};

const AddFundsModal = ({ addFunds, onClose }: AddFundsProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleClickBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      data-testid='AddFundsModal'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleClickBackdrop}
    >
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <div className='flex flex-row justify-between'>
          <h2 className='text-2xl font-bold mb-4'>Out of Balance</h2>
          <button
            type='button'
            className='font-bold text-red-500 text-2xl mb-4'
            onClick={onClose}
          >
            X
          </button>
        </div>
        <p className='mb-6'>
          Your balance is below 5000. Add funds to continue playing.
        </p>
        <div className='grid grid-cols-3 gap-4'>
          <AddFundsButton amount={1000} onClick={() => addFunds(1000)} />
          <AddFundsButton amount={2000} onClick={() => addFunds(2000)} />
          <AddFundsButton amount={5000} onClick={() => addFunds(5000)} />
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
