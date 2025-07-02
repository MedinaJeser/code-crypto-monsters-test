
const MonsterCard = ({ monster, onEdit, onDelete }) => (
    <div className="bg-white text-black shadow-lg rounded-2xl p-4 w-full sm:w-64">
        <img src={monster.imageUrl} alt={monster.name} className="w-full h-32 object-cover rounded-xl mb-4" />
        <h3 className="text-xl font-bold mb-2">{monster.name}</h3>
        <p>Vida: {monster.hp}</p>
        <p>Ataque: {monster.attack}</p>
        <p>Defensa: {monster.defense}</p>
        <p>Velocidad: {monster.speed}</p>
        <div className="flex justify-between mt-4">
            <button className="text-white bg-black px-3 py-1 rounded hover:bg-red-600" onClick={() => onEdit(monster._id)}>Editar</button>
            <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-800" onClick={() => onDelete(monster._id)}>Eliminar</button>
        </div>
    </div>
);

export default MonsterCard;