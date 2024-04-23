import { useGame } from '@/context/GameContext';

type PlayProps = {
  disabled: boolean;
};

const Play = ({ disabled }: PlayProps) => {
  const { startGame, isGameEnded } = useGame();

  const handleGame = () => {
    startGame();
  };

  return (
    <button
      className='bg-[#161616] border-4 rounded-3xl py-2 px-8 border-yellow-500 
    text-white text-2xl font-medium uppercase'
      onClick={handleGame}
      disabled={disabled}
    >
      {isGameEnded ? 'Play Again' : 'Play'}
    </button>
  );
};

export default Play;
