import { GameChoice } from '@/types/enums';

export type GameContextType = {
    balance: number;
    betAmount: number;
    winAmount: number;
    isGameStarted: boolean;
    isGameEnded: boolean;
    playerPosition: GameChoice[] | null;
    computerChoice: GameChoice | null;
    gameOutcome: string;
    updateBalance: (amount: number) => void;
    addFunds: (amount: number) => void;
    placeBet: (position: GameChoice) => void;
    startGame: () => void;
    clearRound: () => void;
};