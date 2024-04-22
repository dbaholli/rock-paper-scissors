import { GameChoice } from '@/types/enums';
import Play from '@/components/Play';
import Position from '@/components/Position';

const Game = () => {
  const options = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors];

  return (
    <>
      <h1 className='text-xl text-white font-bold text-center mt-10 uppercase'>
        PICK YOUR POSITION
      </h1>
      <div className='flex justify-center gap-3'>
        {options.map((pos, idx) => (
          <Position position={pos} key={idx} />
        ))}
      </div>
      <Play />
    </>
  );
};

export default Game;
