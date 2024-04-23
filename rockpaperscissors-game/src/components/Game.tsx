import { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { GameChoice } from '@/types/enums';
import Play from '@/components/Play';
import Position from '@/components/Position';
import GameInfo from '@/components/GameInfo';

const Game = () => {
  const {
    placeBet,
    winner,
    winAmount,
    betAmount,
    isGameStarted,
    gameOutcome,
    computerChoice,
    playerPosition,
  } = useGame();
  const [selectedPosition, setSelectedPosition] = useState<GameChoice | null>(
    null
  );

  const options = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors];

  const handlePosition = (position: GameChoice) => {
    placeBet(position);
    setSelectedPosition(position);
  };

  useEffect(() => {
    if (!isGameStarted && selectedPosition !== null) {
      setSelectedPosition(null);
    }
  }, [isGameStarted]);

  return (
    <>
      <GameInfo
        isGameStarted={isGameStarted}
        winner={winner}
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
            selected={selectedPosition === pos}
          />
        ))}
      </div>
      <Play disabled={isGameStarted} />
    </>
  );
};

export default Game;
