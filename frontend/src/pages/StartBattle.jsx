import { useEffect, useState } from "react";
import { getMonsters } from "../api/monsters";
import { createBattle } from "../api/battles";

const StartBattle = () => {
    const [monsters, setMonsters] = useState([]);
    const [selectedIds, setSelectedIds] = useState({ first: "", second: "" });
    const [battle, setBattle] = useState(null);
    const [turnIndex, setTurnIndex] = useState(0);
    const [currentHps, setCurrentHps] = useState([]);

    const fetchGetMonsters = async () => {
        try {
            const monsters = await getMonsters();
            setMonsters(monsters.data);
        } catch (error) {
            console.error("Error fetching monsters:", error);
        }
    };

    const fetchCreateBattle = async (data) => {
        try {
            const newBattle = await createBattle(data);
            setBattle(newBattle.data);
            setTurnIndex(0);

            const healthPoints = [
                {
                    monsterId: data.monsters[0],
                    hp: monsters.find((m) => m._id === data.monsters[0])?.hp,
                },
                {
                    monsterId: data.monsters[1],
                    hp: monsters.find((m) => m._id === data.monsters[1])?.hp,
                },
            ];

            setCurrentHps(healthPoints);
        } catch (error) {
            console.error("Error creating battle:", error);
        }
    };

    useEffect(() => {
        fetchGetMonsters();
    }, []);

    const startBattle = async () => {
        fetchCreateBattle({
            monsters: [selectedIds.first, selectedIds.second],
        });
    };

    const updateHealthPoints = () => {
        const currentTurnIndex = turnIndex < battle.battleTurns.length ? turnIndex : battle.battleTurns.length - 1;
        const turn = battle?.battleTurns[currentTurnIndex];
        if (!turn) return;

        setCurrentHps(prev => prev.map(hp =>
            hp.monsterId === turn.defender ? { ...hp, hp: turn.remainingHealthDefender } : hp
        ));
    };

    const nextTurn = () => {
        setTurnIndex(prev => prev + 1);
        updateHealthPoints();
    };


    const getMonsterById = (id) => monsters.find((m) => m._id === id);

    const currentTurn = battle?.battleTurns[turnIndex];
    const attacker = getMonsterById(currentTurn?.attacker);
    const defender = getMonsterById(currentTurn?.defender);
    const selected = [
        getMonsterById(selectedIds.first),
        getMonsterById(selectedIds.second),
    ];

    return (
        <div className="p-6 space-y-6">
            
            {!battle ? (
                <>
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
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold">Batalla</h2>
                    
                    <div className="flex gap-4 justify-center">
                        {selected.map((m) => (
                            <div key={m._id} className="text-center">
                                <img
                                    src={m.imageUrl}
                                    alt={m.name}
                                    className="h-32 w-32 object-cover rounded"
                                />
                                <p className="font-bold">{m.name}</p>
                                <p>
                                    HP:{" "}
                                    {currentHps.find((hp) => hp.monsterId === m._id)?.hp}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center my-4">
                        {attacker && defender && (
                            <>
                                <p className="text-lg">Turno {turnIndex + 1}</p>
                                <p className="text-lg">
                                    {attacker.name} inflige {currentTurn.damage} de daño a{" "}
                                    {defender.name}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="text-center">
                        {turnIndex < battle.battleTurns.length ? (
                            <>
                                <button
                                    onClick={nextTurn}
                                    className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    {turnIndex === battle.battleTurns.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </button>
                            </>

                        ) : (
                            <p className="text-xl font-bold text-red-600">¡Ganador: {getMonsterById(battle.winner)?.name}!</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default StartBattle;
