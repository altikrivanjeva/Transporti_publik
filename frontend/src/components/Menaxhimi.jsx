import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menaxhimi = () => {
  const [aeroporti, setAeroporti] = useState([]);
  const [fluturimet, setFluturimet] = useState([]);
  const [formL, setFormL] = useState({ EmriAeroportit: '', Qyteti: ''});
  const [formLe, setFormLe] = useState({ NrFluturimit: '', Destinacionet: '', AeroportiID: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const resL = await axios.get('http://localhost:5001/aeroporti'); 
    const resLe = await axios.get('http://localhost:5001/fluturimi');
    setAeroporti(resL.data);
    setFluturimet(resLe.data);
  };

  const handleSaveFluturimi = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5001/aeroporti/${editId}`, formL);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/aeroporti', formL);
    }
    setFormL({ EmriAeroportit: '', Qyteti: '' });
    fetchData();
  };

  const handleAddFluturimi = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/fluturimi', {
      NrFluturimit: formLe.NrFluturimit,
      Destinacionet: formLe.Destinacionet,
      AeroportiID: formLe.AeroportiID
    });
    setFormLe({ NrFluturimit: '', Destinacionet: '', AeroportiID: '' });
    fetchData();
  };

  const deleteFluturimi = async (id) => {
    if (window.confirm("A jeni i sigurt?")) {
      await axios.delete(`http://localhost:5001/fluturimi/${id}`);
      fetchData();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Aerporti dhe fluturimet</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSaveFluturimi} className="space-y-4 border p-4 rounded">
          <h3 className="font-semibold">{editId ? "Përditëso" : "Shto"} Aerportin</h3>
          <input className="w-full border p-2 rounded" placeholder="Emri" value={formL.EmriAeroportit} onChange={e => setFormL({ ...formL, EmriAeroportit: e.target.value })} required />
          <input className="w-full border p-2 rounded" placeholder="Qyteti" value={formL.Qyteti} onChange={e => setFormL({ ...formL, Qyteti: e.target.value })} required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">{editId ? "Përditëso" : "Ruaj"}</button>
        </form>

        <form onSubmit={handleAddFluturimi} className="space-y-4 border p-4 rounded">
          <h3 className="font-semibold">Shto Fluturimet e Re</h3>
          <input className="w-full border p-2 rounded" placeholder="Numri i Fluturimit" value={formLe.NrFluturimit} onChange={e => setFormLe({ ...formLe, NrFluturimit: e.target.value })} required />
          <input className="w-full border p-2 rounded" placeholder="Destinacionet" value={formLe.Destinacionet} onChange={e => setFormLe({ ...formLe, Destinacionet: e.target.value })} required />
          <select className="w-full border p-2 rounded" value={formLe.AeroportiID} onChange={e => setFormLe({ ...formLe, AeroportiID: e.target.value })} required>
            <option value="">Zgjidh Aerportin</option>
            {aeroporti.map(a => <option key={a.AeroportiID} value={a.AeroportiID}>{a.EmriAeroportit}</option>)}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Shto Fluturimin</button>
        </form>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Aerporti</th>
              <th className="border p-2">Qyteti</th>
              <th className="border p-2">Fluturimet</th>
              <th className="border p-2">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {aeroporti.map(a => (
              <tr key={a.AeroportiID} className="text-center">
                <td className="border p-2">{a.EmriAeroportit}</td>
                <td className="border p-2">{a.Qyteti}</td>
                <td className="border p-2">
                  {fluturimet.filter(f => f.AeroportiID === a.AeroportiID).map(f => (
                    <div key={f.FluturimiID} className="flex justify-between items-center bg-gray-50 mb-1 px-2 py-1 rounded">
                      <span>{f.NrFluturimit} - {f.Destinacionet}</span>
                      <button onClick={() => deleteFluturimi(f.FluturimiID)} className="text-red-500 text-sm font-bold ml-4">Fshi</button>
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  <button onClick={() => { setEditId(a.AeroportiID); setFormL({ EmriAeroportit: a.EmriAeroportit, Qyteti: a.Qyteti }); }} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
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



// CREATE TABLE Aeroporti (
//     AeroportiID INT PRIMARY KEY AUTO_INCREMENT,
//     EmriAeroportit VARCHAR(255) NOT NULL,
//     Qyteti VARCHAR(255)
// );

// CREATE TABLE Fluturimi (
//     FluturimiID INT PRIMARY KEY AUTO_INCREMENT,
//     NrFluturimit INT,
//     Destinacionet VARCHAR(255), 
//     AeroportiID INT,           
//     FOREIGN KEY (AeroportiID) REFERENCES Aeroporti(AeroportiID) ON DELETE CASCADE
// );