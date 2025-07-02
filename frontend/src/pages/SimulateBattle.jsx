import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonsters } from "../api/monsters";
import { getBattleById } from "../api/battles";

const SimulateBattle = () => {
    const { id } = useParams();
    const [monsters, setMonsters] = useState([]);
    const [battle, setBattle] = useState(null);
    const [turnIndex, setTurnIndex] = useState(0);
    const [currentHps, setCurrentHps] = useState([]);

    const fetchData = async () => {
        try {
            const [monstersRes, battleRes] = await Promise.all([
                getMonsters(),
                getBattleById(id),
            ]);

            setMonsters(monstersRes.data);
            const battleData = battleRes.data;
            setBattle(battleData);

            console.log(battleData)

            const healthPoints = battleData.monsters.map((battleMonster) => {
                return {
                    monsterId: battleMonster._id,
                    hp: battleMonster.hp,
                }
            });

            setCurrentHps(healthPoints);
        } catch (error) {
            console.error("Error loading battle:", error);
        }
    };

    const getMonsterById = (id) => monsters.find((m) => m._id === id);

    const updateHealthPoints = () => {
        const currentTurnIndex = turnIndex < battle.battleTurns.length ? turnIndex : battle.battleTurns.length - 1;
        const turn = battle?.battleTurns[currentTurnIndex];
        if (!turn) return;

        setCurrentHps(prev => prev.map(hp =>
            hp.monsterId === turn.defender._id ? { ...hp, hp: turn.remainingHealthDefender } : hp
        ));
    };

    const nextTurn = () => {
        setTurnIndex(prev => prev + 1);
        updateHealthPoints();
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!battle || monsters.length === 0) return <p className="p-6">Cargando batalla...</p>;

    const currentTurn = battle.battleTurns[turnIndex];
    const attacker = getMonsterById(currentTurn?.attacker._id);
    const defender = getMonsterById(currentTurn?.defender._id);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Batalla</h2>

            <div className="flex gap-4 justify-center">
                {battle.monsters.map((m) => (
                    <div key={m._id} className="text-center">
                        <img
                            src={m.imageUrl}
                            alt={m.name}
                            className="h-32 w-32 object-cover rounded"
                        />
                        <p className="font-bold">{m.name}</p>
                        <p>
                            HP: {currentHps.find((hp) => hp.monsterId === m._id)?.hp}
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
                    <button
                        onClick={nextTurn}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        {turnIndex === battle.battleTurns.length - 1 ? "Finalizar" : "Siguiente"}
                    </button>
                ) : (
                    <p className="text-xl font-bold text-red-600">
                        ¡Ganador: {battle.winner?.name}!
                    </p>
                )}
            </div>
        </div>
    );
};

export default SimulateBattle;
