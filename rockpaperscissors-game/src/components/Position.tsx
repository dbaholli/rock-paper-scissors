import { GameChoice } from '@/types/enums';
import { getColorClasses } from '@/utils/getColorClasses';

type PositionProps = {
  onClick: () => void;
  clearBetAmount: () => void;
  position: GameChoice;
  selected: boolean;
  betAmount: number;
};

const Position = ({
  onClick,
  clearBetAmount,
  position,
  selected,
  betAmount,
}: PositionProps) => {
  const colorClasses = getColorClasses(position);

  return (
    <article
      onClick={onClick}
      className={`relative flex flex-col items-center rounded-md text-center justify-center border-4 py-12 px-24 cursor-pointer ${colorClasses} 
      w-[150px] transition-colors duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-lg ${
        (selected && betAmount > 0) ? 'animate-pulse w-[175px] border-8' : ''
      }`}
    >
      <p className={(selected && betAmount > 0) ? `font-bold mb-3` : 'font-regular'}>
        {position.toUpperCase()}
      </p>
      {selected && betAmount !== 0 && (
        <div className='absolute bottom-[-30px] flex flex-col items-center'>
          <div className='h-[45px] w-[45px] flex items-center justify-center bg-gray-300 rounded-full'>
            <span className='text-black text-sm'>{betAmount}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearBetAmount();
            }}
            className='mt-1 bg-red-500 text-white font-bold py-1 px-2 rounded'
          >
            CLEAR
          </button>
        </div>
      )}
    </article>
  );
};

export default Position;
