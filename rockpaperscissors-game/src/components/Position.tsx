import { GameChoice } from '@/types/enums';
import { getColorClasses } from '@/utils/getColorClasses';

type Props = {
  position: GameChoice;
};

const Position = ({ position }: Props) => {
  const colorClasses = getColorClasses(position);

  return (
    <article
      className={`flex rounded-md text-center justify-center border-4 py-12 px-24 cursor-pointer ${colorClasses} w-[150px] transition-colors duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-lg`}
    >
      {position.toUpperCase()}
    </article>
  );
};

export default Position;
