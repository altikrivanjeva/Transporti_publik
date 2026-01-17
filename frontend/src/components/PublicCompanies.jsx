import { useEffect, useState } from "react";
import axios from "axios";



export default function PublicCompanies({ onOpenCompany, onNavigate }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const API_URL = "http://localhost:5001/companies";

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setCompanies(res.data || []);
    } catch (err) {
      console.error("PublicCompanies fetch error:", err);
      alert(err.response?.data?.message || "Gabim gjatë marrjes së kompanive.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrimi i kompanive sipas search
  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="bg-[#fdfaf3] py-12 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Kompanitë e Autobusëve</h1>
          <div className="text-[#0a223a] mb-2">Transporti Publik &gt; Kompanitë e Autobusëve</div>
        </div>
      </div>

      <div>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Kërko kompani..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {loading ? (
          <p>Po ngarkohet...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-600">Nuk ka kompani që përputhen me kërkimin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <div key={c.id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-center">
                {/* Logo ose placeholder */}
                <div className="h-16 w-16 mb-3 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden text-[#0a223a]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">{c.name}</h2>
                <p className="text-sm text-gray-600">Telefon: {c.phone || "-"}</p>
                <p className="text-sm text-gray-600">Email: {c.email || "-"}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => onOpenCompany && onOpenCompany(c)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Shiko
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  );
}
