import React, { useEffect, useState } from "react";
import axios from "axios";

const Sporti = () => {
    // 1. Deklarimi i States
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [playerForm, setPlayerForm] = useState({
        Name: "",
        Number: "",
        BirthYear: "",
        TeamId: ""
    });

    const [editTeamId, setEditTeamId] = useState(null);
    const [newTeamName, setNewTeamName] = useState("");

    // 2. Funksioni për të marrë ekipet (Pika a)
    const fetchTeams = async () => {
        try {
            console.log("Duke u lidhur me serverin për ekipet...");
            const res = await axios.get("http://localhost:5001/teams");
            console.log("Ekipet u ngarkuan:", res.data);
            setTeams(res.data);
        } catch (err) {
            console.error("GABIM: Nuk po merren ekipet. Kontrollo nëse serveri po punon në portin 5001!", err);
        }
    };

    // 3. Funksioni për të marrë lojtarët (Pika c)
    const fetchPlayers = async () => {
        try {
            const res = await axios.get("http://localhost:5001/players");
            setPlayers(res.data);
        } catch (err) {
            console.error("Gabim te lojtarët:", err);
        }
    };

    // 4. Thirri funksionet sapo hapet faqja
    useEffect(() => {
        fetchTeams();
        fetchPlayers();
    }, []);

    // 5. Shtimi i lojtarit (Pika b)
    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/players", playerForm);
            alert("Lojtari u shtua me sukses!");
            setPlayerForm({ Name: "", Number: "", BirthYear: "", TeamId: "" });
            fetchPlayers();
        } catch (err) {
            alert("Gabim gjatë shtimit!");
        }
    };

    // 6. Fshirja e lojtarit (Pika d)
    const handleDeletePlayer = async (id) => {
        if (window.confirm("A dëshironi ta fshini lojtarin?")) {
            try {
                await axios.delete(`http://localhost:5001/players/${id}`);
                fetchPlayers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    // 7. Përditësimi i ekipit (Pika e)
    const handleUpdateTeam = async (id) => {
        try {
            await axios.put(`http://localhost:5001/teams/${id}`, { Name: newTeamName });
            setEditTeamId(null);
            fetchTeams();
            fetchPlayers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Menaxhimi i Sportit</h1>

            {/* FORMA E SHTIMIT */}
            <div className="mb-10 bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h2 className="font-bold text-orange-700 mb-4 text-lg">Regjistro Lojtar të Ri</h2>
                <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Emri i Lojtarit" className="border p-2 rounded" value={playerForm.Name} 
                        onChange={(e) => setPlayerForm({...playerForm, Name: e.target.value})} required />
                    
                    <input type="number" placeholder="Numri në Fanellë" className="border p-2 rounded" value={playerForm.Number} 
                        onChange={(e) => setPlayerForm({...playerForm, Number: e.target.value})} required />
                    
                    <input type="number" placeholder="Viti i Lindjes" className="border p-2 rounded" value={playerForm.BirthYear} 
                        onChange={(e) => setPlayerForm({...playerForm, BirthYear: e.target.value})} required />

                    {/* DROPDOWN - PIKA B */}
                    <select className="border p-2 rounded bg-white" value={playerForm.TeamId} 
                        onChange={(e) => setPlayerForm({...playerForm, TeamId: e.target.value})} required>
                        <option value="">-- Zgjidh Ekipin (Dropdown) --</option>
                        {teams && teams.length > 0 ? (
                            teams.map((t) => (
                                <option key={t.TeamId} value={t.TeamId}>
                                    {t.Name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Duke u ngarkuar ekipet...</option>
                        )}
                    </select>

                    <button type="submit" className="bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600 md:col-span-2 transition">
                        SHTO LOJTARIN
                    </button>
                </form>
            </div>

            {/* TABELA - PIKA C & D */}
            <div className="mb-10">
                <h2 className="font-bold text-gray-700 mb-3 italic">Lista e Lojtarëve (JOIN SQL)</h2>
                <table className="w-full border-collapse border shadow-sm">
                    <thead>
                        <tr className="bg-blue-900 text-white text-sm">
                            <th className="p-2 border">Emri</th>
                            <th className="p-2 border">Nr.</th>
                            <th className="p-2 border">Ekipi</th>
                            <th className="p-2 border">Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.length > 0 ? players.map(p => (
                            <tr key={p.PlayerId} className="hover:bg-gray-50 border-b">
                                <td className="p-2 border">{p.Name}</td>
                                <td className="p-2 border text-center">{p.Number}</td>
                                <td className="p-2 border font-bold text-blue-800">{p.TeamName}</td>
                                <td className="p-2 border text-center">
                                    <button onClick={() => handleDeletePlayer(p.PlayerId)} className="text-red-600 font-bold hover:underline">Fshij</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="4" className="p-4 text-center text-gray-400">Nuk ka lojtarë.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* EDITIMI I EKIPEVE - PIKA E */}
            <div className="border-t pt-4">
                <h2 className="font-bold text-gray-600 mb-3">Përditëso Emrat e Ekipeve</h2>
                <div className="flex flex-wrap gap-3">
                    {teams.map(t => (
                        <div key={t.TeamId} className="bg-gray-100 p-2 rounded flex items-center gap-2 border">
                            {editTeamId === t.TeamId ? (
                                <>
                                    <input className="border p-1 text-sm rounded" defaultValue={t.Name} onChange={(e) => setNewTeamName(e.target.value)} />
                                    <button onClick={() => handleUpdateTeam(t.TeamId)} className="text-green-600 font-bold text-xs">Ruaj</button>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm font-semibold">{t.Name}</span>
                                    <button onClick={() => setEditTeamId(t.TeamId)} className="text-blue-500 text-xs italic">Ndrysho</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sporti;