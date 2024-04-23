import React, { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { GameChoice } from '@/types/enums';
import {
  BET_AMOUNT,
  WINNER,
  WINNING_RATE_DOUBLE,
  WINNING_RATE_SINGLE,
} from '@/utils/constants';

type GameContextType = {
  balance: number;
  betAmount: number;
  winAmount: number;
  isGameStarted: boolean;
  isGameEnded: boolean;
  winner: string;
  playerPosition: GameChoice[] | null;
  computerChoice: GameChoice | null;
  gameOutcome: string;
  updateBalance: (amount: number) => void;
  placeBet: (position: GameChoice) => void;
  incrementBetAmount: () => void;
  startGame: () => void;
  clearRound: () => void;
};

type GameProviderProps = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState(5000);
  const [betAmount, setBetAmount] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const [winner, setWinner] = useState<string>('');
  const [playerPosition, setPlayerPosition] = useState<GameChoice[] | null>([]);
  const [computerChoice, setComputerChoice] = useState<GameChoice | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameOutcome, setGameOutcome] = useState('');

  const updateBalance = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  const incrementBetAmount = () => {
    setBetAmount((prevAmount) => prevAmount + BET_AMOUNT);
    setBalance((prevBalance) => prevBalance - BET_AMOUNT);
  };

  const generateComputerChoice = () => {
    const choices = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors];
    const randomisedComputerChoice = Math.floor(Math.random() * choices.length);
    return choices[randomisedComputerChoice];
  };

  const placeBet = (position: GameChoice) => {
    if (balance >= BET_AMOUNT) {
      if (!playerPosition?.includes(position)) {
        setPlayerPosition((prevChoices) => [...(prevChoices || []), position]);
      }
      incrementBetAmount();
      toast.info(`You placed a bet of ${BET_AMOUNT} on ${position}`);
    } else {
      toast.error('Insufficient balance!');
    }
  };

  const startGame = () => {
    if (betAmount === 0) {
      toast.error('Please place a bet first!');
    } else {
      setIsGameStarted(true);

      const compChoice = generateComputerChoice();
      setComputerChoice(compChoice);

      let winner: GameChoice | null = null;
      if (playerPosition && playerPosition.length === 1) {
        const playerChoice = playerPosition[0];
        if (playerChoice === compChoice) {
          updateBalance(betAmount);
          toast.info("It's a tie!");
          setWinner('Tie');
          setGameOutcome('Tie');
          setTimeout(() => {
            clearRound();
          }, 5000);
        } else if (WINNER[playerChoice]?.includes(compChoice)) {
          winner = playerChoice;
          const winnings = betAmount * WINNING_RATE_SINGLE;
          updateBalance(winnings);
          setWinAmount(winnings);
          toast.success(`You win! ${playerChoice} beats ${compChoice}`);
          setWinner(playerChoice);
          setGameOutcome(`${playerChoice} WON!`);
          setTimeout(() => {
            clearRound();
          }, 5000);
        } else {
          toast.error(`You lose! ${compChoice} beats ${playerChoice}`);
          updateBalance(-betAmount);
          setWinAmount(0);
          setWinner(compChoice);
          setGameOutcome(`${compChoice} WON!`);
          setTimeout(() => {
            clearRound();
          }, 5000);
        }
      } else if (playerPosition && playerPosition.length === 2) {
        const [firstChoice, secondChoice] = playerPosition;
        if (firstChoice === compChoice && secondChoice === compChoice) {
          updateBalance(betAmount);
          toast.info("It's a tie!");
          setWinner('Its a tie!!!');
          setTimeout(() => {
            clearRound();
          }, 5000);
        } else if (
          (firstChoice === compChoice && secondChoice !== compChoice) ||
          (firstChoice !== compChoice && secondChoice === compChoice)
        ) {
          const winnings = betAmount * WINNING_RATE_DOUBLE;
          updateBalance(winnings);
          setWinAmount(winnings);
          setWinner(`${firstChoice} and ${secondChoice}`);
          setGameOutcome(`${firstChoice} and ${secondChoice} WON!`);
          toast.success(
            `You win! ${firstChoice} and ${secondChoice} beats ${compChoice}`
          );

          setTimeout(() => {
            clearRound();
          }, 5000);
        } else {
          setWinner(`${compChoice}`);
          toast.error(
            `You lose! ${compChoice} beats ${firstChoice} and ${secondChoice}`
          );
          updateBalance(-betAmount);
          setWinAmount(0);

          setTimeout(() => {
            clearRound();
          }, 5000);
        }
      }
    }
  };

  const clearRound = () => {
    setBetAmount(0);
    setPlayerPosition(null);
    setComputerChoice(null);
    setIsGameStarted(false);
    setWinner('');
    setIsGameEnded(true);
  };

  return (
    <GameContext.Provider
      value={{
        balance,
        betAmount,
        winAmount,
        winner,
        playerPosition,
        computerChoice,
        isGameStarted,
        isGameEnded,
        updateBalance,
        incrementBetAmount,
        placeBet,
        startGame,
        clearRound,
        gameOutcome,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
