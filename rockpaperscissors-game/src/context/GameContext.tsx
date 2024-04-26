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
  const [balance, setBalance] = useState<number>(5000);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [playerPosition, setPlayerPosition] = useState<GameChoice[] | null>(
    null
  );
  const [positionBetAmounts, setPositionBetAmounts] = useState<{
    [key in GameChoice]?: number;
  }>({});
  const [computerChoice, setComputerChoice] = useState<GameChoice | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameOutcome, setGameOutcome] = useState<string>('');

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
      setPositionBetAmounts((prevAmounts) => ({
        ...prevAmounts,
        [position]: (prevAmounts[position] || 0) + BET_AMOUNT,
      }));
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
      setPositionBetAmounts({});
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

  const determineGameOutcome = (
    playerPosition: GameChoice[],
    compChoice: GameChoice
  ) => {
    let outcome = '';
    let winnings = 0;

    if (playerPosition.length === 1) {
      const playerChoice = playerPosition[0];
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
    } else if (playerPosition.length === 2) {
      const [firstChoice, secondChoice] = playerPosition;
      if (firstChoice === compChoice && secondChoice === compChoice) {
        showToast("It's a tie!", 'info');
        outcome = "It's a tie!";
      } else if (
        DOUBLE_POSITION_WINNER[firstChoice]?.includes(compChoice) &&
        DOUBLE_POSITION_WINNER[secondChoice]?.includes(compChoice)
      ) {
        winnings = betAmount * WINNING_RATE_DOUBLE;
        updateBalance(winnings);
        showToast('You win both choices!', 'success');
        outcome = 'You win both choices!';
      } else {
        const combinedChoice = `${firstChoice} and ${secondChoice}`;
        if (WINNER[combinedChoice as GameChoice]?.includes(compChoice)) {
          winnings = betAmount * WINNING_RATE_SINGLE;
          updateBalance(winnings);
          showToast(
            `You win! ${combinedChoice} beats ${compChoice}`,
            'success'
          );
          outcome = `${combinedChoice} WON!`;
        } else {
          showToast(`You lose! ${compChoice} beats ${combinedChoice}`, 'error');
          outcome = `${compChoice} WON!`;
        }
      }
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

    const { outcome, winnings } = determineGameOutcome(
      playerPosition,
      compChoice
    );
    setGameOutcome(outcome);
    setWinAmount(winnings);

    setTimeout(() => {
      clearRound();
    }, 2500);
  };

  const clearRound = () => {
    setBetAmount(0);
    setWinAmount(0);
    setPositionBetAmounts({});
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
        positionBetAmounts,
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
