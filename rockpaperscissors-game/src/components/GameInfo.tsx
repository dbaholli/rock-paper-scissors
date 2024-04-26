import { useState, useEffect } from 'react';
import { GameChoice } from '@/types/enums';
import { getColorClasses } from '@/utils/getColorClasses';

type GameInfoProps = {
  isGameStarted: boolean;
  winAmount: number;
  betAmount: number;
  gameOutcome: string;
  computerChoice: GameChoice | null;
  playerPosition: GameChoice[] | null;
};

const GameInfo = ({
  isGameStarted,
  winAmount,
  betAmount,
  gameOutcome,
  computerChoice,
  playerPosition,
}: GameInfoProps) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      setAnimationStarted(true);
    }

    return () => {
      setAnimationStarted(false);
    };
  }, [isGameStarted]);

  const computerColorClasses = computerChoice ? getColorClasses(computerChoice) : '';
  const playerColorClasses = playerPosition ? playerPosition.map(getColorClasses).join(' ') : '';

  const won = !gameOutcome.includes(computerChoice!) && gameOutcome !== 'Tie';
  const tie = gameOutcome === 'Tie';
  const message = won ? `YOU WON ${winAmount} 🥳🥳🥳` : !tie ? `YOU LOST ${betAmount} from your balance 😭😭😭` : '';

  if (!isGameStarted) {
    return (
      <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
        PICK YOUR POSITIONS
      </h1>
    );
  }

  return (
    <div className={`flex flex-col items-center w-full justify-center border-1 border-red-500 ${animationStarted ? 'animate-slide-in' : ''}`} data-testid="game-info">
      <h1 className='text-4xl text-white font-bold text-center mt-10 uppercase'>
        <span className={`border-4 px-4 py-2 rounded-full mr-5 ${computerColorClasses}`}>{computerChoice}</span> vs 
        <span className={`border-4 px-4 py-2 rounded-full ml-5 ${playerColorClasses}`}>{playerPosition && playerPosition.join(' and ')}</span>
      </h1>
      <h1 className='text-xl text-green-500 font-bold text-center mt-10 uppercase'>
        {gameOutcome}
      </h1>
      <h1 className='text-2xl text-white font-bold text-center mt-10 uppercase'>
        {message}
      </h1>
    </div>
  );
};

export default GameInfo;
