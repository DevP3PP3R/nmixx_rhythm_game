import { Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import LilyGame from './pages/LilyGame';
import HaewonGame from './pages/HaewonGame';
import SullyoonGame from './pages/SullyoonGame';
import BaeGame from './pages/BaeGame';
import JiwooGame from './pages/JiwooGame';
import KyujinGame from './pages/KyujinGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/lily" element={<LilyGame />} />
      <Route path="/haewon" element={<HaewonGame />} />
      <Route path="/sullyoon" element={<SullyoonGame />} />
      <Route path="/bae" element={<BaeGame />} />
      <Route path="/jiwoo" element={<JiwooGame />} />
      <Route path="/kyujin" element={<KyujinGame />} />
    </Routes>
  );
}

export default App;
