import { useEffect, useState } from "react";
import axios from "axios";

function Stops() {
  const [stops, setStops] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    try {
      const res = await axios.get("http://localhost:5001/stops");
      setStops(res.data);
    } catch (err) {
      console.error("❌ Gabim gjatë marrjes së stacioneve:", err);
    }
  };

  const addStop = async () => {
    if (!name.trim()) return alert("Shkruaj emrin e stacionit!");
    try {
      const res = await axios.post("http://localhost:5001/stops", { name });
      setStops([...stops, res.data]);
      setName("");
    } catch (err) {
      console.error("❌ Gabim gjatë shtimit:", err);
    }
  };

  const deleteStop = async (id) => {
    if (!window.confirm("A je i sigurt që dëshiron ta fshish këtë stacion?")) return;
    try {
      await axios.delete(`http://localhost:5001/stops/${id}`);
      setStops(stops.filter((s) => s.id !== id));
    } catch (err) {
      console.error("❌ Gabim gjatë fshirjes:", err);
    }
  };

  const startEdit = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) return alert("Shkruaj emrin e ri!");
    try {
      await axios.put(`http://localhost:5001/stops/${id}`, { name: editName });
      setStops(
        stops.map((s) => (s.id === id ? { ...s, name: editName } : s))
      );
      setEditId(null);
      setEditName("");
    } catch (err) {
      console.error("❌ Gabim gjatë përditësimit:", err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Shto Stacionet
        </h1>

        <div className="flex items-center gap-2 mb-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Emri i stacionit"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
          <button
            onClick={addStop}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Shto
          </button>
        </div>

        {stops.length === 0 ? (
          <p className="text-gray-500 text-center">Nuk ka stacione ende...</p>
        ) : (
          <ul className="space-y-2">
            {stops.map((s) => (
              <li
                key={s.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-2 px-3 flex justify-between items-center hover:shadow-md transition"
              >
                {editId === s.id ? (
                  <div className="flex gap-2 items-center w-full">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
                    />
                    <button
                      onClick={() => saveEdit(s.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Ruaj
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Anulo
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{s.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(s.id, s.name)}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Ndrysho
                      </button>
                      <button
                        onClick={() => deleteStop(s.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Fshi
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Stops;
