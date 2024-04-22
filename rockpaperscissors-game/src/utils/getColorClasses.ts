import { GameChoice } from '@/types/enums';

export const getColorClasses = (position: GameChoice): string => {
    switch (position) {
        case GameChoice.Rock:
            return 'border-blue-500 bg-blue-100 text-blue-500';
        case GameChoice.Paper:
            return 'border-yellow-500 bg-yellow-100 text-yellow-500';
        case GameChoice.Scissors:
            return 'border-red-500 bg-red-100 text-red-500';
        default:
            return '';
    }
};
