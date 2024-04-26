import { useCallback, useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { GameChoice } from '@/types/enums';
import { showToast } from '@/utils/showToast';
import Play from '@/components/Play';
import Position from '@/components/Position';
import GameInfo from '@/components/GameInfo';
import AddFundsModal from '@/components/ui/AddFundsModal';
import ClearBetButton from './ui/ClearBetButton';

const Game = () => {
  const {
    placeBet,
    addFunds,
    clearBetAmount,
    winAmount,
    positionBetAmounts,
    betAmount,
    isGameStarted,
    balance,
    gameOutcome,
    computerChoice,
  } = useGame();
  const [selectedPositions, setSelectedPositions] = useState<GameChoice[]>([]);
  const [showAddFundsModal, setShowAddFundsModal] = useState<boolean>(false);

  const options = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors];

  const handlePosition = useCallback(
    (position: GameChoice) => {
      if (
        selectedPositions.length < 2 ||
        selectedPositions.includes(position)
      ) {
        placeBet(position);
        if (!selectedPositions.includes(position)) {
          setSelectedPositions((prevSelected) => [...prevSelected, position]);
        }
      } else {
        showToast('Only 2 positions are allowed to bet on!!', 'error');
      }
    },
    [placeBet, selectedPositions]
  );

  const handleAddFunds = useCallback(
    (amount: number) => {
      addFunds(amount);
      setShowAddFundsModal(false);
    },
    [addFunds]
  );

  const handleClear = (): void => {
    clearBetAmount();
    setSelectedPositions([]);
  };

  useEffect(() => {
    if (!isGameStarted && selectedPositions.length > 0) {
      setSelectedPositions([]);
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (balance <= 0) {
      setShowAddFundsModal(true);
    }
  }, [balance]);

  return (
    <>
      {showAddFundsModal && (
        <AddFundsModal
          addFunds={handleAddFunds}
          onClose={() => setShowAddFundsModal(false)}
        />
      )}

      <GameInfo
        isGameStarted={isGameStarted}
        winAmount={winAmount}
        betAmount={betAmount}
        gameOutcome={gameOutcome}
        computerChoice={computerChoice}
        playerPosition={selectedPositions}
      />

      <div className='flex justify-center gap-3'>
        {options.map((pos: GameChoice) => (
          <Position
            position={pos}
            positionBetAmount={positionBetAmounts[pos] || 0}
            key={pos}
            onClick={() => handlePosition(pos)}
            selected={selectedPositions.includes(pos)}
          />
        ))}
      </div>
      {betAmount > 0 && <ClearBetButton clearBet={handleClear} />}
      <Play disabled={isGameStarted} />
    </>
  );
};

export default Game;
