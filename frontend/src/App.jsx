import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Monsters from './pages/Monsters';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monsters" element={<Monsters />} />
        <Route path="/battles" element={<div className="p-6">Batallas</div>} />
        <Route path="/start-battle" element={<div className="p-6">Iniciar Batalla</div>} />
      </Routes>
    </Router>
  );
}