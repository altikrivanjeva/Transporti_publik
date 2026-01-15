import { useState, useEffect } from "react";

const LINJAT_API = "http://localhost:5001/linjat";
const CLIENTS_API = "http://localhost:5001/clients";

export default function ClientBooking() {
  const [linjat, setLinjat] = useState([]);
  const [form, setForm] = useState({
    emri: "",
    mbiemri: "",
    data_nisjes: "",
    nisja: "",
    destinacioni: "",
    linja_id: null,
  });
  const [routeResult, setRouteResult] = useState(null);

  useEffect(() => {
    fetch(LINJAT_API)
      .then(res => res.json())
      .then(data => setLinjat(data));
  }, []);

  // Gjej rrugën nga pika A → B automatikisht
  const handleFindRoute = async () => {
    if (!form.nisja || !form.destinacioni) return;
    try {
      const res = await fetch(`${LINJAT_API}/route?from=${form.nisja}&to=${form.destinacioni}`);
      if (!res.ok) throw new Error("Rruga nuk u gjet");
      const data = await res.json();
      setRouteResult(data);
      // e ruajmë linja_id të fundit për rezervim
      if (data.route.length > 0) {
        setForm(prev => ({ ...prev, linja_id: data.route[data.route.length - 1].id }));
      }
    } catch (err) {
      alert(err.message);
      setRouteResult(null);
    }
  };

  // Submit rezervim
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(CLIENTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Rezervimi u krye me sukses!");
      setForm({ emri: "", mbiemri: "", data_nisjes: "", nisja: "", destinacioni: "", linja_id: null });
      setRouteResult(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Rezervimi i Linjës</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          placeholder="Emri"
          value={form.emri}
          onChange={(e) => setForm({ ...form, emri: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Mbiemri"
          value={form.mbiemri}
          onChange={(e) => setForm({ ...form, mbiemri: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={form.data_nisjes}
          onChange={(e) => setForm({ ...form, data_nisjes: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Nisja"
          value={form.nisja}
          onChange={(e) => setForm({ ...form, nisja: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Destinacioni"
          value={form.destinacioni}
          onChange={(e) => setForm({ ...form, destinacioni: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="button"
          onClick={handleFindRoute}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Gjej Rrugën
        </button>

        {routeResult && (
          <div className="bg-gray-50 p-4 rounded shadow mt-2">
            <p className="font-semibold mb-2">Rruga e zgjedhur:</p>
            <ul className="list-disc pl-5">
              {routeResult.route.map(r => (
                <li key={r.id}>{r.emri}: {r.nisja} → {r.destinacioni} | {r.distance_km} km | {r.ticket_price} €</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Distanca totale: {routeResult.totalDistance} km, Çmimi total: {routeResult.totalPrice} €</p>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
          Rezervo
        </button>
      </form>
    </div>
  );
}
