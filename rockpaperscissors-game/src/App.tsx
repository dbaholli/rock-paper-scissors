import { GameProvider } from '@/context/GameContext';
import { ToastContainer } from 'react-toastify';
import Game from '@/components/Game';
import Layout from '@/components/ui/Layout';
import Header from '@/components/Header';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <GameProvider>
      <Layout>
        <Header />
        <Game />
        <ToastContainer autoClose={1000} />
      </Layout>
    </GameProvider>
  );
}

export default App;
