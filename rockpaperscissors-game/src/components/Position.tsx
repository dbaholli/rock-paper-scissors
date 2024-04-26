import { GameChoice } from '@/types/enums';
import { getColorClasses } from '@/utils/getColorClasses';

type PositionProps = {
  onClick: () => void;
  position: GameChoice;
  selected: boolean;
  positionBetAmount: number;
};

const Position = ({
  onClick,
  position,
  selected,
  positionBetAmount,
}: PositionProps) => {
  const colorClasses = getColorClasses(position);

  return (
    <article
      onClick={onClick}
      className={`relative flex flex-col items-center rounded-md text-center justify-center border-4 py-12 px-24 cursor-pointer ${colorClasses} 
      w-[150px] transition-colors duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-lg ${
        selected && positionBetAmount > 0 ? 'animate-pulse w-[175px] border-8' : ''
      }`}
    >
      <p
        className={
          selected && positionBetAmount > 0 ? `font-bold mb-3` : 'font-regular'
        }
      >
        {position.toUpperCase()}
      </p>
      {selected && positionBetAmount !== 0 && (
        <div className='absolute bottom-[-30px] flex flex-col items-center'>
          <div className='h-[45px] w-[45px] flex items-center justify-center bg-gray-300 rounded-full'>
            <span className='text-black text-sm'>{positionBetAmount}</span>
          </div>
        </div>
      )}
    </article>
  );
};

export default Position;
