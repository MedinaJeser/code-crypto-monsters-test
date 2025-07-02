// src/pages/StartBattle.jsx
import { useEffect, useState } from "react";
import { getMonsters } from "../api/monsters";
import { createBattle } from "../api/battles";
import { useNavigate } from "react-router-dom";

const StartBattle = () => {
    const [monsters, setMonsters] = useState([]);
    const [selectedIds, setSelectedIds] = useState({ first: "", second: "" });
    const navigate = useNavigate();

    const fetchGetMonsters = async () => {
        try {
            const response = await getMonsters();
            setMonsters(response.data);
        } catch (error) {
            console.error("Error fetching monsters:", error);
        }
    };

    const startBattle = async () => {
        try {
            const response = await createBattle({
                monsters: [selectedIds.first, selectedIds.second],
            });
            const battleId = response.data._id;
            navigate(`/battle/${battleId}`);
        } catch (error) {
            console.error("Error creating battle:", error);
        }
    };

    useEffect(() => {
        fetchGetMonsters();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Selecciona 2 monstruos</h2>
            <div className="flex gap-4">
                <select
                    value={selectedIds.first}
                    onChange={(e) =>
                        setSelectedIds({ ...selectedIds, first: e.target.value })
                    }
                    className="border px-4 py-2 rounded"
                >
                    <option value="">Selecciona el primero</option>
                    {monsters.map((m) => (
                        <option key={m._id} value={m._id}>
                            {m.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedIds.second}
                    onChange={(e) =>
                        setSelectedIds({ ...selectedIds, second: e.target.value })
                    }
                    className="border px-4 py-2 rounded"
                >
                    <option value="">Selecciona el segundo</option>
                    {monsters.map((m) => (
                        <option key={m._id} value={m._id}>
                            {m.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                disabled={
                    !selectedIds.first ||
                    !selectedIds.second ||
                    selectedIds.first === selectedIds.second
                }
                onClick={startBattle}
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-red-600"
            >
                Iniciar batalla
            </button>
        </div>
    );
};

export default StartBattle;
