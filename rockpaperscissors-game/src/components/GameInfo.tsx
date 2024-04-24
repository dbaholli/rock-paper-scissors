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
  return (
    <>
      {isGameStarted ? (
        <div className='flex flex-row border-1 border-red-500'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl text-white font-bold text-center mt-10 uppercase'>
              {computerChoice} vs {playerPosition}
            </h1>
            <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
              {gameOutcome}
            </h1>
            {!gameOutcome.includes(computerChoice!) && gameOutcome !== 'Tie' ? (
              <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
                YOU WON {winAmount} of your balance{' '}
                <span className='text-3xl'> 🥳</span>
              </h1>
            ) : (
              <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
                YOU LOST {betAmount} of your balance
              </h1>
            )}
          </div>
        </div>
      ) : (
        <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
          PICK YOUR POSITION
        </h1>
      )}
    </>
  );
};

export default GameInfo;
