import { useState, useEffect } from "react";

const API_URL = "http://localhost:5001/linjat";

export default function Linjat() {
  const [linjat, setLinjat] = useState([]);
  const [form, setForm] = useState({ id: "", emri: "", nisja: "", destinacioni: "", next_stop_id: null });
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routeResult, setRouteResult] = useState(null);

  // READ ALL linjat
  const fetchLinjat = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setLinjat(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLinjat(); }, []);

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await fetch(`${API_URL}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setForm({ id: "", emri: "", nisja: "", destinacioni: "", next_stop_id: null });
      fetchLinjat();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("A jeni të sigurt që doni të fshini këtë linjë?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchLinjat();
  };

  // EDIT
  const handleEdit = (l) => setForm(l);

  // Gjej rrugën nga pika A → B
  const handleFindRoute = async () => {
    if (!from || !to) return;
    try {
      const res = await fetch(`${API_URL}/route?from=${from}&to=${to}`);
      if (!res.ok) throw new Error("Rruga nuk u gjet");
      const data = await res.json();
      setRouteResult(data);
    } catch (err) {
      alert(err.message);
      setRouteResult(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Linjat</h1>

      {/* Form Create / Edit */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="block font-medium mb-1">Emri</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Emri"
            value={form.emri}
            onChange={(e) => setForm({ ...form, emri: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Nisja</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nisja"
            value={form.nisja}
            onChange={(e) => setForm({ ...form, nisja: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Destinacioni</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Destinacioni"
            value={form.destinacioni}
            onChange={(e) => setForm({ ...form, destinacioni: e.target.value })}
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            {form.id ? "Përditëso" : "Shto"}
          </button>
        </div>
      </form>

      {/* Lista e linjave */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Emri</th>
                <th className="py-2 px-4 border-b">Nisja</th>
                <th className="py-2 px-4 border-b">Destinacioni</th>
                <th className="py-2 px-4 border-b">Veprime</th>
              </tr>
            </thead>
            <tbody>
              {linjat.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{l.id}</td>
                  <td className="py-2 px-4 border-b">{l.emri}</td>
                  <td className="py-2 px-4 border-b">{l.nisja}</td>
                  <td className="py-2 px-4 border-b">{l.destinacioni}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(l)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {linjat.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Nuk ka linja të regjistruara.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Gjej rrugën nga pika A → B */}
      <div className="mb-8 p-6 bg-gray-50 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Gjej Rrugën nga pika A → B</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            placeholder="Nisja"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            placeholder="Destinacioni"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleFindRoute}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Gjej Rrugën
          </button>
        </div>

        {routeResult && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">Rruga:</h3>
            <ul className="list-disc pl-5 mb-2">
              {routeResult.route.map((r) => (
                <li key={r.id}>
                  {r.emri}: {r.nisja} → {r.destinacioni} | {r.distance_km} km | {r.ticket_price} €
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">
              Total Distance: {routeResult.totalDistance} km, Total Price: {routeResult.totalPrice} €
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
