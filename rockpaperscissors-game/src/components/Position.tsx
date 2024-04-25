import { GameChoice } from '@/types/enums';
import { getColorClasses } from '@/utils/getColorClasses';

type PositionProps = {
  onClick: () => void;
  position: GameChoice;
  selected: boolean;
  betAmount: number;
};

const Position = ({
  onClick,
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
        selected ? 'animate-pulse w-[175px] border-8' : 'mb-0'
      }`}
    >
      <p className={selected ? `font-bold` : 'font-regular'}>
        {position.toUpperCase()}
      </p>
      {selected && betAmount !== 0 && (
        <div className='absolute bottom-[-30px]'>
          <div className='h-[60px] w-[60px] flex items-center justify-center bg-gray-300 rounded-full'>
            <span className='text-black font-bold'>{betAmount}</span>
          </div>
        </div>
      )}
    </article>
  );
};

export default Position;
