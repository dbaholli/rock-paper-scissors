import { GameChoice } from '@/types/enums';
import { getColorClasses } from '@/utils/getColorClasses';

type PositionProps = {
  position: GameChoice;
  onClick: () => void;
  selected: boolean;
};

const Position = ({ position, onClick, selected }: PositionProps) => {
  const colorClasses = getColorClasses(position);

  return (
    <article
      onClick={onClick}
      className={`flex rounded-md text-center justify-center border-4 py-12 px-24 cursor-pointer ${colorClasses} 
      w-[150px] transition-colors duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-lg ${
        selected ? 'animate-pulse w-[175px] border-8' : 'mb-0'
      }`}
    >
      <p className={selected ? `font-bold` : 'font-regular'}>
        {position.toUpperCase()}
      </p>
    </article>
  );
};

export default Position;
