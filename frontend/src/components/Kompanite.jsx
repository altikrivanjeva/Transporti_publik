import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const API_URL = "http://localhost:5001/companies";

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(API_URL);
      setCompanies(res.data);
    } catch (err) {
      console.error("fetchCompanies error:", err);
      alert(err.response?.data?.message || "Gabim gjatë marrjes së kompanive!");
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) {
      alert("Plotëso emrin!");
      return;
    }
    if (!newPhone.trim()) {
      alert("Plotëso numrin e telefonit!");
      return;
    }

    // pas trim checks për name
    const phoneClean = String(newPhone).trim();
    // lejo formatin: opcional + në fillim, pastaj 7-15 shifra
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phoneClean)) {
      return (
        <>
          <div>
            <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
              <h1 className="text-2xl font-bold mb-6 text-center">Kompanitë e Autobusëve</h1>
              <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-end">
                {/* ...existing code... */}
              </div>
              <table className="w-full border mt-4">
                {/* ...existing code... */}
              </table>
            </div>

            {companies.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Nuk ka kompanitë. Shto një të re!
              </p>
            )}
          </div>
          <Footer />
        </>
      );
      alert(err.response?.data?.message || "Gabim gjatë shtimit!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Je i sigurt që dëshiron ta fshish?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setCompanies(companies.filter((c) => c.id !== id));
      alert("Kompania u fshi!");
    } catch (err) {
      console.error("handleDelete error:", err);
      alert(err.response?.data?.message || "Gabim gjatë fshirjes!");
    }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      alert("Plotëso emrin!");
      return;
    }
    if (!editPhone.trim()) {
      alert("Plotëso numrin e telefonit!");
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        name: editName,
        phone: editPhone,
        email: editEmail,
      });
      setCompanies(companies.map((c) => (c.id === id ? res.data : c)));
      setEditingId(null);
      alert("Kompania u përditësua!");
    } catch (err) {
      console.error("handleUpdate error:", err);
      alert(err.response?.data?.message || "Gabim gjatë përditësimit!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> Kompanitë e Autobusëve</h2>

      {/* ➕ FORMA PËR SHTIM */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Shto Kompani të Re</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Emri i kompanisë"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Telefoni"
            value={newPhone}
            onChange={(e) => {
              // lejo + vetëm në fillim, hiq çdo gjë tjetër që nuk është shifër ose +
              let v = e.target.value;
              // heq karakteret të gjitha përveç shifrave dhe +
              v = v.replace(/[^\d+]/g, "");
              // nëse ka + më shumë se një, lë vetëm të parin
              if ((v.match(/\+/g) || []).length > 1) {
                v = v.replace(/\+/g, "");
                v = "+" + v;
              }
              // siguro që + mund të jetë vetëm në fillim
              if (v.indexOf("+") > 0) v = v.replace(/\+/g, "");
              setNewPhone(v);
            }}
            className="border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
           Shto
        </button>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Emri</th>
              <th className="border p-3 text-left">Telefoni</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-center">Veprime</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-100">
                <td className="border p-3">{company.id}</td>
                {editingId === company.id ? (
                  <>
                    <td className="border p-3">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => handleUpdate(company.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition"
                      >
                         Ruaj
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                      >
                         Anulo
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-3">{company.name}</td>
                    <td className="border p-3">{company.phone || "-"}</td>
                    <td className="border p-3">{company.email || "-"}</td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => {
                          setEditingId(company.id);
                          setEditName(company.name);
                          setEditPhone(company.phone || "");
                          setEditEmail(company.email || "");
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                      >
                         Ndrysho
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                         Fshi
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {companies.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          Nuk ka kompanitë. Shto një të re!
        </p>
      )}
    </div>
  );
}

export default Companies;