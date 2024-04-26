import { GameChoice } from '@/types/enums';

export type GameContextType = {
    balance: number;
    positionBetAmounts: { [key in GameChoice]?: number | undefined };
    betAmount: number;
    winAmount: number;
    isGameStarted: boolean;
    isGameEnded: boolean;
    playerPosition: GameChoice[] | null;
    computerChoice: GameChoice | null;
    gameOutcome: string;
    updateBalance: (amount: number) => void;
    clearBetAmount: () => void;
    addFunds: (amount: number) => void;
    placeBet: (position: GameChoice) => void;
    startGame: () => void;
    clearRound: () => void;
};