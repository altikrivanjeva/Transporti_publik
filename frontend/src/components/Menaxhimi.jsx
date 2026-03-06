import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menaxhimi = () => {
  const [fabrikat, setFabrikat] = useState([]);
  const [punetoret, setPunetoret] = useState([]);
  
  // State për format
  const [formF, setFormF] = useState({ EmriFabrikes: '', Lokacioni: '' });
  const [formP, setFormP] = useState({ Emri: '', Mbiemri: '', Pozita: '', ID_Fabrika: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const resF = await axios.get('http://localhost:5001/fabrikat');
    const resP = await axios.get('http://localhost:5001/punetoret');
    setFabrikat(resF.data);
    setPunetoret(resP.data);
  };

  // CRUD për Fabrikën
  const handleSaveFabrika = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5001/fabrikat/${editId}`, formF);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/fabrikat', formF);
    }
    setFormF({ EmriFabrikes: '', Lokacioni: '' });
    fetchData();
  };

  // CRUD për Punëtorin
  const handleAddPunetori = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/punetoret', formP);
    setFormP({ Emri: '', Mbiemri: '', Pozita: '', ID_Fabrika: '' });
    fetchData();
  };

  const deletePunetori = async (id) => {
    if (window.confirm("A jeni i sigurt që dëshironi ta fshini këtë punëtor?")) {
      await axios.delete(`http://localhost:5001/punetoret/${id}`);
      fetchData();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Menaxhimi i Fabrikave & Punëtorëve</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formular Fabrika */}
        <form onSubmit={handleSaveFabrika} className="space-y-4 border p-4 rounded">
          <h3 className="font-semibold">{editId ? "Përditëso" : "Shto"} Fabrikë</h3>
          <input className="w-full border p-2 rounded" placeholder="Emri i Fabrikës" value={formF.EmriFabrikes} onChange={e => setFormF({ ...formF, EmriFabrikes: e.target.value })} required />
          <input className="w-full border p-2 rounded" placeholder="Lokacioni" value={formF.Lokacioni} onChange={e => setFormF({ ...formF, Lokacioni: e.target.value })} required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">{editId ? "Përditëso" : "Ruaj Fabrikën"}</button>
        </form>

        {/* Formular Punëtori */}
        <form onSubmit={handleAddPunetori} className="space-y-4 border p-4 rounded">
          <h3 className="font-semibold">Shto Punëtor të Ri</h3>
          <input className="w-full border p-2 rounded" placeholder="Emri" value={formP.Emri} onChange={e => setFormP({ ...formP, Emri: e.target.value })} required />
          <input className="w-full border p-2 rounded" placeholder="Mbiemri" value={formP.Mbiemri} onChange={e => setFormP({ ...formP, Mbiemri: e.target.value })} required />
          <input className="w-full border p-2 rounded" placeholder="Pozita" value={formP.Pozita} onChange={e => setFormP({ ...formP, Pozita: e.target.value })} required />
          <select className="w-full border p-2 rounded" value={formP.ID_Fabrika} onChange={e => setFormP({ ...formP, ID_Fabrika: e.target.value })} required>
            <option value="">Zgjidh Fabrikën</option>
            {fabrikat.map(f => <option key={f.ID} value={f.ID}>{f.EmriFabrikes}</option>)}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Shto Punëtor</button>
        </form>
      </div>

      {/* Tabela */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Fabrika</th>
              <th className="border p-2">Lokacioni</th>
              <th className="border p-2">Punëtorët (Emri, Pozita)</th>
              <th className="border p-2">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {fabrikat.map(f => (
              <tr key={f.ID} className="text-center">
                <td className="border p-2 font-bold">{f.EmriFabrikes}</td>
                <td className="border p-2">{f.Lokacioni}</td>
                <td className="border p-2">
                  {punetoret.filter(p => p.ID_Fabrika === f.ID).map(p => (
                    <div key={p.ID} className="flex justify-between items-center bg-gray-50 mb-1 px-2 py-1 rounded">
                      <span>{p.Emri} {p.Mbiemri} - ({p.Pozita})</span>
                      <button onClick={() => deletePunetori(p.ID)} className="text-red-500 text-sm font-bold ml-4">Fshi</button>
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  <button onClick={() => { setEditId(f.ID); setFormF(f); }} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit Fabrikën</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menaxhimi;