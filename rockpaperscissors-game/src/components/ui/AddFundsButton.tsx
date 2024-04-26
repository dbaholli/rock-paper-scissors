type FundsButtonProps = {
  amount: number;
  onClick: () => void;
};

const AddFundsButton = ({ amount, onClick }: FundsButtonProps) => {
  return (
    <button
      className='bg-yellow-500 font-semibold text-white px-4 py-2 rounded-md'
      onClick={onClick}
    >
      Add {amount}
    </button>
  );
};

export default AddFundsButton;
