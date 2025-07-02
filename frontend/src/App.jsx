import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Monsters from './pages/Monsters';
import Home from './pages/Home';
import Battles from './pages/Battles';
import StartBattle from './pages/StartBattle';
import SimulateBattle from './pages/SimulateBattle';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monsters" element={<Monsters />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/start-battle" element={<StartBattle />} />
        <Route path="/battle/:id" element={<SimulateBattle />} />
      </Routes>
    </Router>
  );
}