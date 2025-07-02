import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-bold">Battle Monsters</h1>
    <div className="space-x-4">
      <Link to="/" className="hover:text-red-500">Inicio</Link>
      <Link to="/monsters" className="hover:text-red-500">Monstruos</Link>
      <Link to="/battles" className="hover:text-red-500">Batallas</Link>
      <Link to="/start-battle" className="hover:text-red-500">Iniciar batalla</Link>
    </div>
  </nav>
);

export default Navbar;