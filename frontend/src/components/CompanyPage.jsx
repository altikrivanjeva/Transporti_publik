
import { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";

export default function CompanyPage({ company, onBack }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ passenger_name: "", seat: "", travel_date: "" });
  const [editingTicket, setEditingTicket] = useState(null);
  const [editForm, setEditForm] = useState({ passenger_name: "", seat: "", travel_date: "" });
  const API_TICKETS = "http://localhost:5001/tickets";

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_TICKETS}?companyId=${company.id}`);
      setTickets(res.data || []);
    } catch (err) {
      console.error("fetchTickets error:", err);
      alert(err.response?.data?.message || "Gabim gjatë marrjes së biletave.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    if (!form.passenger_name || !form.travel_date) {
      alert("Plotëso emrin e udhëtarit dhe datën.");
      return;
    }
    try {
      const payload = {
        company_id: company.id,
        passenger_name: form.passenger_name,
        seat: form.seat || null,
        travel_date: form.travel_date,
      };
      await axios.post(API_TICKETS, payload);
      setForm({ passenger_name: "", seat: "", travel_date: "" });
      fetchTickets();
      alert("Bileta u krijua");
    } catch (err) {
      console.error("handleBuy error:", err);
      alert(err.response?.data?.message || "Gabim gjatë blerjes së biletës.");
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setEditForm({
      passenger_name: ticket.passenger_name,
      seat: ticket.seat || "",
      travel_date: ticket.travel_date ? ticket.travel_date.slice(0, 10) : ""
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.passenger_name || !editForm.travel_date) {
      alert("Plotëso emrin e udhëtarit dhe datën.");
      return;
    }
    try {
      const payload = {
        passenger_name: editForm.passenger_name,
        seat: editForm.seat || null,
        travel_date: editForm.travel_date,
      };
      await axios.put(`${API_TICKETS}/${editingTicket.id}`, payload);
      setEditingTicket(null);
      setEditForm({ passenger_name: "", seat: "", travel_date: "" });
      fetchTickets();
      alert("Bileta u përditësua");
    } catch (err) {
      console.error("update ticket error:", err);
      alert(err.response?.data?.message || "Gabim gjatë përditësimit të biletës.");
    }
  };

  const handleCancelEdit = () => {
    setEditingTicket(null);
    setEditForm({ passenger_name: "", seat: "", travel_date: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Je i sigurt që dëshiron ta fshish biletën?")) return;
    try {
      await axios.delete(`${API_TICKETS}/${id}`);
      fetchTickets();
    } catch (err) {
      console.error("delete ticket error:", err);
      alert(err.response?.data?.message || "Gabim gjatë fshirjes.");
    }
  };

  return (
    <>
    <div>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-sm text-blue-600 hover:underline">← Kthehu tek kompanitë</button>
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <div />
      </div>

      <div className="mb-6 p-4 border rounded bg-white">
        <p><strong>Telefon:</strong> {company.phone || '-'}</p>
        <p><strong>Email:</strong> {company.email || '-'}</p>
      </div>

      <div className="mb-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded bg-white">
          <h2 className="font-semibold mb-3">Bli Biletë</h2>
          {editingTicket ? (
            <form onSubmit={handleUpdate} className="space-y-3">
              <input className="w-full border px-3 py-2 rounded" placeholder="Emri i udhëtarit" value={editForm.passenger_name} onChange={(e) => setEditForm({ ...editForm, passenger_name: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded" placeholder="Emri i vendit" value={editForm.seat} onChange={(e) => setEditForm({ ...editForm, seat: e.target.value })} />
              <input type="date" className="w-full border px-3 py-2 rounded" value={editForm.travel_date} onChange={(e) => setEditForm({ ...editForm, travel_date: e.target.value })} />
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Ruaj</button>
                <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handleCancelEdit}>Anulo</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleBuy} className="space-y-3">
              <input className="w-full border px-3 py-2 rounded" placeholder="Emri i udhëtarit" value={form.passenger_name} onChange={(e) => setForm({ ...form, passenger_name: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded" placeholder="Emri i vendit" value={form.seat} onChange={(e) => setForm({ ...form, seat: e.target.value })} />
              <input type="date" className="w-full border px-3 py-2 rounded" value={form.travel_date} onChange={(e) => setForm({ ...form, travel_date: e.target.value })} />
              <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Bli</button>
            </form>
          )}
        </div>

        <div className="p-4 border rounded bg-white">
          <h2 className="font-semibold mb-3">Biletat ({tickets.length})</h2>
          {loading ? (
            <p>Po ngarkohet...</p>
          ) : tickets.length === 0 ? (
            <p className="text-gray-600">Nuk ka bileta për këtë kompani.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Emri</th>
                  <th className="text-left p-2">Vendi</th>
                  <th className="text-left p-2">Data</th>
                  {/* Heqim çmimin */}
                  <th className="p-2">Veprime</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2">{t.id}</td>
                    <td className="p-2">{t.passenger_name}</td>
                    <td className="p-2">{t.seat || '-'}</td>
                    <td className="p-2">{t.travel_date}</td>
                    {/* Heqim çmimin */}
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(t)} className="bg-blue-500 text-white px-2 py-1 rounded">Ndrysho</button>
                      <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white px-2 py-1 rounded">Fshi</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
}
