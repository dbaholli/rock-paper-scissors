import { useGame } from '@/context/GameContext';

const Header = () => {
  const { balance, betAmount, winAmount } = useGame();

  return (
    <div className='flex justify-center w-full gap-3 p-1 bg-amber-500'>
      <p className='font-semibold'>BALANCE: {balance}</p>
      <p className='font-semibold'>BET: {betAmount}</p>
      <p className='font-semibold'>WIN: {winAmount}</p>
    </div>
  );
};

export default Header;
