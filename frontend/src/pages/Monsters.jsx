import { useEffect, useState } from 'react';
import MonsterCard from '../components/MonsterCard';
import MonsterForm from '../components/MonsterForm';
import { getMonsters, createMonster, updateMonster, deleteMonster } from '../api/monsters';

const Monsters = () => {
    const [monsters, setMonsters] = useState([]);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchGetMonsters = async () => {
        try {
            const monsters = await getMonsters()
            setMonsters(monsters.data);
        } catch (error) {
            console.log('Error fetching monsters:', error);
        }
    }

    const fetchCreateMonster = async (monsterData) => {
        try {
            const newMonster = await createMonster(monsterData);
            setMonsters([...monsters, newMonster.data]);
        } catch (error) {
            console.log('Error creating monster:', error);
        }
    }

    const fetchUpdateMonster = async (id, monsterData) => {
        try {
            const updatedMonster = await updateMonster(id, monsterData);
            setMonsters(monsters.map(m => (m._id === id ? updatedMonster.data : m)));
        } catch (error) {
            console.log('Error updating monster:', error);
        }
    }

    const fetchDeleteMonster = async (id) => {
        try {
            await deleteMonster(id);
            setMonsters(monsters.filter(m => m._id !== id));
        } catch (error) {
            console.log('Error deleting monster:', error);
        }
    }

    useEffect(() => {
        fetchGetMonsters();
    }, []);

    const handleSave = (monsterData) => {
        if (selected) {
            fetchUpdateMonster(selected._id, monsterData);
        } else {
            fetchCreateMonster(monsterData);
        }
        setOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este monstruo?')) {
            fetchDeleteMonster(id);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <button onClick={() => { setSelected(null); setOpen(true); }} className="bg-black text-white px-4 py-2 rounded hover:bg-red-600">
                Agregar monstruo
            </button>
            <div className="flex flex-wrap gap-6">
                {monsters.map(monster => (
                    <MonsterCard
                        key={monster._id}
                        monster={monster}
                        onEdit={(id) => {
                            const found = monsters.find(m => m._id === id);
                            setSelected(found);
                            setOpen(true);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <MonsterForm
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                monster={selected}
            />
        </div>
    );
};

export default Monsters;