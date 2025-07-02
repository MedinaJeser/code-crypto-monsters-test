import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { getMonsterById } from '../api/monsters';

const MonsterForm = ({ isOpen, onClose, onSave, monster }) => {
    const [form, setForm] = useState({ name: '', hp: '', attack: '', defense: '', speed: '', imageUrl: '' });

    const fetchMonster = async (id) => {
        try {
            const monster = await getMonsterById(id);
            setForm(monster.data);
        } catch (error) {
            console.error('Error fetching monster:', error);
        }
    }

    useEffect(() => {
        if (monster) {
            fetchMonster(monster._id);
        } else {
            setForm({ name: '', hp: '', attack: '', defense: '', speed: '', imageUrl: '' });
        }
    }, [monster]);

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-black bg-opacity-30 fixed inset-0" aria-hidden="true" />
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl z-50 w-96">
                <Dialog.Title className="text-xl font-bold mb-4">{monster ? 'Editar' : 'Agregar'} Monstruo</Dialog.Title>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onSave(form);
                    }}
                    className="space-y-3"
                >
                    {['name', 'hp', 'attack', 'defense', 'speed', 'imageUrl'].map(field => (
                        <input
                            key={field}
                            type={field === 'imageUrl' || field === 'name' ? 'text' : 'number'}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={form[field]}
                            onChange={e => setForm({ ...form, [field]: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    ))}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-red-600">Guardar</button>
                    </div>
                </form>
            </Dialog.Panel>
        </Dialog>
    );
};

export default MonsterForm;