import { useGame } from '@/context/GameContext';
import Button from '@/components/ui/Button';

type PlayProps = {
  disabled: boolean;
};

const Play = ({ disabled }: PlayProps) => {
  const { startGame, isGameEnded } = useGame();

  const handleGame = () => {
    startGame();
  };

  return (
    <Button onClick={handleGame} disabled={disabled}>
      {isGameEnded ? 'Play Again' : 'Play'}
    </Button>
  );
};

export default Play;
