type AddFundsProps = {
  addFunds: (amount: number) => void;
  onClose: () => void;
};

const AddFundsModal = ({ addFunds, onClose }: AddFundsProps) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white p-8 rounded-lg shadow-lg'>
      <div className='flex flex-row justify-between'>
        <h2 className='text-2xl font-bold mb-4'>Out of Balance</h2>
        <button
          type='button'
          className='font-bold text-red-500 text-2xl'
          onClick={onClose}
        >
          X
        </button>
      </div>
      <p className='mb-6'>
        Your balance is below 5000. Add funds to continue playing.
      </p>
      <div className='grid grid-cols-3 gap-4'>
        <button
          className='bg-yellow-500 font-semibold text-white px-4 py-2 rounded-md'
          onClick={() => addFunds(1000)}
        >
          Add 1000
        </button>
        <button
          className='bg-yellow-500 font-semibold text-white px-4 py-2 rounded-md'
          onClick={() => addFunds(2000)}
        >
          Add 2000
        </button>
        <button
          className='bg-yellow-500 font-semibold text-white px-4 py-2 rounded-md'
          onClick={() => addFunds(5000)}
        >
          Add 5000
        </button>
      </div>
    </div>
  </div>
);

export default AddFundsModal;
