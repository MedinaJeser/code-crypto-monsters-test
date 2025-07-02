import { useEffect, useState } from 'react';
import { getBattles, deleteBattle } from '../api/battles';

const Battles = () => {
    const [battles, setBattles] = useState([]);

    const fetchBattles = async () => {
        try {
            const battles = await getBattles();
            setBattles(battles.data);
        } catch (error) {
            console.error("Error fetching battles:", error);
        }
    }

    const fetchDeleteBattle = async (id) => {
        try {
            await deleteBattle(id);
            setBattles(battles.filter(b => b._id !== id));
        } catch (error) {
            console.error("Error deleting battle:", error);
        }
    }

    useEffect(() => {
        fetchBattles();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta batalla?")) {
            fetchDeleteBattle(id);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Batallas realizadas</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {battles.map(battle => (
                    <div key={battle._id} className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-gray-600">Fecha: {new Date(battle.createdAt).toLocaleString()}</p>
                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <p className="font-semibold">Participantes:</p>
                                {battle.monsters.map(m => (
                                    <p key={m._id}>• {m.name}</p>
                                ))}
                            </div>
                            <div>
                                <p className="font-semibold text-red-600">Ganador:</p>
                                <p>{battle.winner.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(battle._id)}
                            className="mt-4 w-full bg-red-600 text-white py-1 rounded hover:bg-red-800"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Battles;