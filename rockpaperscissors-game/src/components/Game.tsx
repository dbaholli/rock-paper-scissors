import { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { GameChoice } from '@/types/enums';
import { showToast } from '@/utils/showToast';
import Play from '@/components/Play';
import Position from '@/components/Position';
import GameInfo from '@/components/GameInfo';

const Game = () => {
  const {
    placeBet,
    winAmount,
    betAmount,
    isGameStarted,
    gameOutcome,
    computerChoice,
    playerPosition,
  } = useGame();
  const [selectedPositions, setSelectedPositions] = useState<GameChoice[]>([]);

  const options = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors];

  const handlePosition = (position: GameChoice) => {
    if (selectedPositions.length < 2 || selectedPositions.includes(position)) {
      placeBet(position);
      if (!selectedPositions.includes(position)) {
        setSelectedPositions((prevSelected) => [...prevSelected, position]);
      }
    } else {
      showToast('Only 2 positions are allowed to bet on!!', 'error');
    }
  };

  useEffect(() => {
    if (!isGameStarted && selectedPositions.length > 0) {
      setSelectedPositions([]);
    }
  }, [isGameStarted]);

  return (
    <>
      <GameInfo
        isGameStarted={isGameStarted}
        winAmount={winAmount}
        betAmount={betAmount}
        gameOutcome={gameOutcome}
        computerChoice={computerChoice}
        playerPosition={playerPosition}
      />

      <div className='flex justify-center gap-3'>
        {options.map((pos) => (
          <Position
            position={pos}
            key={pos}
            onClick={() => handlePosition(pos)}
            selected={selectedPositions.includes(pos)}
          />
        ))}
      </div>
      <Play disabled={isGameStarted} />
    </>
  );
};

export default Game;
