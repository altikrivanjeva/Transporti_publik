import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menaxhimi = () => {
  const [ligjeruesit, setLigjeruesit] = useState([]);
  const [ligjeratat, setLigjeratat] = useState([]);
  const [formL, setFormL] = useState({ LecturerName: '', Department: '', Email: '' });
  const [formLe, setFormLe] = useState({ LectureName: '', LecturerID: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const resL = await axios.get('http://localhost:5001/ligjeruesit');
    const resLe = await axios.get('http://localhost:5001/ligjeratat');
    setLigjeruesit(resL.data);
    setLigjeratat(resLe.data);
  };

  const handleSaveLecturer = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5001/ligjeruesit/${editId}`, formL);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/ligjeruesit', formL);
    }
    setFormL({ LecturerName: '', Department: '', Email: '' });
    fetchData();
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/ligjeratat', formLe);
    fetchData();
  };

  const deleteLecture = async (id) => {
    if (window.confirm("A jeni i sigurt?")) {
      await axios.delete(`http://localhost:5001/ligjeratat/${id}`);
      fetchData();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Menaxhimi i Ligjëruesve & Ligjëratave</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formular Ligjeruesi */}
        <form onSubmit={handleSaveLecturer} className="space-y-4 border p-4 rounded">
          <h3 className="font-semibold">{editId ? "Përditëso" : "Shto"} Ligjërues</h3>
          <input className="w-full border p-2 rounded" placeholder="Emri" value={formL.LecturerName} onChange={e => setFormL({ ...formL, LecturerName: e.target.value })} required />
          <input className="w-full border p-2 rounded" placeholder="Departamenti" value={formL.Department} onChange={e => setFormL({ ...formL, Department: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Email" value={formL.Email} onChange={e => setFormL({ ...formL, Email: e.target.value })} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">{editId ? "Përditëso" : "Ruaj"}</button>
        </form>

        {/* Formular Ligjerata */}
        <form onSubmit={handleAddLecture} className="space-y-4 border p-4 rounded">
          <h3 className="font-semibold">Shto Ligjëratë të Re</h3>
          <input className="w-full border p-2 rounded" placeholder="Emri i Ligjëratës" value={formLe.LectureName} onChange={e => setFormLe({ ...formLe, LectureName: e.target.value })} required />
          <select className="w-full border p-2 rounded" value={formLe.LecturerID} onChange={e => setFormLe({ ...formLe, LecturerID: e.target.value })} required>
            <option value="">Zgjidh Ligjëruesin (Dropdown)</option>
            {ligjeruesit.map(l => <option key={l.LecturerID} value={l.LecturerID}>{l.LecturerName}</option>)}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Shto Ligjëratë</button>
        </form>
      </div>

      {/* Tabela e të dhënave */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Ligjëruesi</th>
              <th className="border p-2">Departamenti</th>
              <th className="border p-2">Ligjëratat</th>
              <th className="border p-2">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {ligjeruesit.map(l => (
              <tr key={l.LecturerID} className="text-center">
                <td className="border p-2">{l.LecturerName}</td>
                <td className="border p-2">{l.Department}</td>
                <td className="border p-2">
                  {ligjeratat.filter(le => le.LecturerID === l.LecturerID).map(le => (
                    <div key={le.LectureID} className="flex justify-between items-center bg-gray-50 mb-1 px-2 py-1 rounded">
                      <span>{le.LectureName}</span>
                      <button onClick={() => deleteLecture(le.LectureID)} className="text-red-500 text-sm font-bold ml-4">Fshi</button>
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  <button onClick={() => { setEditId(l.LecturerID); setFormL(l); }} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
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