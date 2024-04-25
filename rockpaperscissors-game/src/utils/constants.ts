import { GameChoice } from '@/types/enums';

export const WINNING_RATE_SINGLE = 14 as number;
export const WINNING_RATE_DOUBLE = 3 as number;
export const BET_AMOUNT = 500 as number;

export const WINNER: Record<GameChoice, GameChoice[]> = {
    [GameChoice.Rock]: [GameChoice.Scissors],
    [GameChoice.Paper]: [GameChoice.Rock],
    [GameChoice.Scissors]: [GameChoice.Paper],
};

export const DOUBLE_POSITION_WINNER = {
    [GameChoice.Rock]: [GameChoice.Scissors, GameChoice.Paper],
    [GameChoice.Paper]: [GameChoice.Rock, GameChoice.Scissors],
    [GameChoice.Scissors]: [GameChoice.Paper, GameChoice.Rock],
};