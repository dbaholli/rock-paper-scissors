import React, { ReactNode, useContext, useState } from 'react';
import { GameContext } from '@/context/ContextInstance';
import { GameChoice } from '@/types/enums';
import {
  BET_AMOUNT,
  DOUBLE_POSITION_WINNER,
  WINNER,
  WINNING_RATE_DOUBLE,
  WINNING_RATE_SINGLE,
} from '@/utils/constants';
import { showToast } from '@/utils/showToast';

type GameProviderProps = {
  children: ReactNode;
};

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
  const [playerPosition, setPlayerPosition] = useState<GameChoice[] | null>(
    null
  );
  const [computerChoice, setComputerChoice] = useState<GameChoice | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameOutcome, setGameOutcome] = useState('');

  const updateBalance = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  const placeBet = (position: GameChoice) => {
    if (balance >= BET_AMOUNT) {
      if (!playerPosition?.includes(position)) {
        setPlayerPosition((prevChoices) => [...(prevChoices || []), position]);
      }
      incrementBetAmount();
      showToast(`You placed a bet of ${BET_AMOUNT} on ${position}`, 'info');
    } else {
      showToast('Insufficient balance!', 'error');
    }
  };

  const incrementBetAmount = () => {
    setBetAmount((prevAmount) => prevAmount + BET_AMOUNT);
    updateBalance(-BET_AMOUNT);
  };

  const clearBetAmount = () => {
    if (betAmount > 0) {
      setBetAmount(0);
      setPlayerPosition(null);
      updateBalance(betAmount);
    }
  };

  const addFunds = (amount: number) => {
    updateBalance(amount);
    setIsGameEnded(false);
  };

  const generateComputerChoice = () => {
    const choices = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors];
    const randomisedComputerChoice = Math.floor(Math.random() * choices.length);
    return choices[randomisedComputerChoice];
  };

  const determineWinner = (
    playerChoice: GameChoice,
    compChoice: GameChoice
  ) => {
    let outcome = '';
    let winnings = 0;
    if (playerChoice === compChoice) {
      updateBalance(betAmount);
      showToast("It's a tie!", 'info');
      outcome = 'Tie';
    } else if (WINNER[playerChoice]?.includes(compChoice)) {
      winnings = betAmount * WINNING_RATE_SINGLE;
      updateBalance(winnings);
      showToast(`You win! ${playerChoice} beats ${compChoice}`, 'success');
      outcome = `${playerChoice} WON!`;
    } else {
      showToast(`You lose! ${compChoice} beats ${playerChoice}`, 'error');
      outcome = `${compChoice} WON!`;
    }
    return { outcome, winnings };
  };

  const startGame = () => {
    if (betAmount === 0) {
      showToast('Please place a bet first!', 'error');
      return;
    }

    setIsGameStarted(true);
    const compChoice = generateComputerChoice();
    setComputerChoice(compChoice);

    if (!playerPosition) {
      return;
    }

    if (playerPosition.length === 1) {
      const playerChoice = playerPosition[0];
      const { outcome, winnings } = determineWinner(playerChoice, compChoice);
      setGameOutcome(outcome);
      setWinAmount(winnings);
    } else if (playerPosition.length === 2) {
      const [firstChoice, secondChoice] = playerPosition;
      if (firstChoice === compChoice && secondChoice === compChoice) {
        showToast("It's a tie!", 'info');
        setGameOutcome("It's a tie!");
      } else if (
        DOUBLE_POSITION_WINNER[firstChoice]?.includes(compChoice) &&
        DOUBLE_POSITION_WINNER[secondChoice]?.includes(compChoice)
      ) {
        const winnings = betAmount * WINNING_RATE_DOUBLE;
        updateBalance(winnings);
        showToast('You win both choices!', 'success');
        setGameOutcome('You win both choices!');
        setWinAmount(winnings);
      } else {
        const combinedChoice = `${firstChoice} and ${secondChoice}`;
        const { outcome, winnings } = determineWinner(
          combinedChoice as GameChoice,
          compChoice
        );
        setGameOutcome(outcome);
        setWinAmount(winnings);
      }
    }

    setTimeout(() => {
      clearRound();
    }, 2000);
  };

  const clearRound = () => {
    setBetAmount(0);
    setWinAmount(0);
    setGameOutcome('');
    setPlayerPosition(null);
    setComputerChoice(null);
    setIsGameStarted(false);
    setIsGameEnded(true);
  };

  return (
    <GameContext.Provider
      value={{
        balance,
        betAmount,
        winAmount,
        playerPosition,
        computerChoice,
        isGameStarted,
        isGameEnded,
        gameOutcome,
        updateBalance,
        clearBetAmount,
        addFunds,
        placeBet,
        startGame,
        clearRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
