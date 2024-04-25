import { GameChoice } from '@/types/enums';

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
  const won = !gameOutcome.includes(computerChoice!) && gameOutcome !== 'Tie';
  const tie = gameOutcome === 'Tie';
  const message = won 
    ? `YOU WON ${winAmount} 🥳`
    : !tie ? `YOU LOST ${betAmount} of your balance` : '';

  if (!isGameStarted) {
    return (
      <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
        PICK YOUR POSITIONS
      </h1>
    );
  }

  return (
    <div className='flex flex-col items-center border-1 border-red-500'>
      <h1 className='text-4xl text-white font-bold text-center mt-10 uppercase'>
        {computerChoice} vs {playerPosition && playerPosition.join(' and ')}
      </h1>
      <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
        {gameOutcome}
      </h1>
      <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
        {message}
      </h1>
    </div>
  );
};

export default GameInfo;
