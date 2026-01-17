import { useEffect, useState } from "react";

import linja1a from "../assets/linja1a.jpg";
import linja3c from "../assets/linja3c.jpg";
import linja7c from "../assets/linja7c.jpg";

const API = "http://localhost:5001/linjat";

const images = [
  { src: linja1a, name: "Linja1a" },
  { src: linja3c, name: "Linja3c" },
  { src: linja7c, name: "Linja7c" }
];

export default function Linjat() {
  const [form, setForm] = useState({
    emri: "",
    mbiemri: "",
    linja: "Linja1a",
    stops: 0,
    email: ""
  });

  const [price, setPrice] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [lastTicket, setLastTicket] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedTicket");
    if (saved) {
      setLastTicket(JSON.parse(saved));
    }
  }, []);
  const [successMsg, setSuccessMsg] = useState("");

  // Validim
  const [emailError, setEmailError] = useState(false);
  const [emriError, setEmriError] = useState(false);
  const [mbiemriError, setMbiemriError] = useState(false);

  // -1 shfaqet vetëm pasi ke klikuar +1
  const [canDecrease, setCanDecrease] = useState(false);

  useEffect(() => {
    setPrice((0.5 + form.stops * 0.2).toFixed(2));
  }, [form.stops]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    const hasEmri = form.emri.trim().length > 0;
    const hasMbiemri = form.mbiemri.trim().length > 0;
    const hasEmail = form.email.trim().length > 0;

    setEmriError(!hasEmri);
    setMbiemriError(!hasMbiemri);
    setEmailError(!hasEmail);

    if (!hasEmri || !hasMbiemri || !hasEmail) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    if (isEditing && lastTicket) {
      // UPDATE LOGIC
      const res = await fetch(API + "/" + lastTicket.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(price)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Gabim: " + data.message);
        return;
      }

      setSuccessMsg("🎉 Bileta u përditësua me sukses!");
      const updatedTicket = { ...lastTicket, ...form, price: Number(price) };
      setLastTicket(updatedTicket);
      localStorage.setItem("savedTicket", JSON.stringify(updatedTicket));
      // Reset after update
      setIsEditing(false);
      setForm({ emri: "", mbiemri: "", linja: "Linja1a", stops: 0, email: "" });
      setCanDecrease(false);

    } else {
      // CREATE LOGIC
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(price)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Gabim: " + data.message);
        return;
      }

      setSuccessMsg("🎉 Bileta u ble me sukses!");
      setLastTicket(data);
      localStorage.setItem("savedTicket", JSON.stringify(data));

      // reset
      setForm({ emri: "", mbiemri: "", linja: "Linja1a", stops: 0, email: "" });
      setCanDecrease(false);
    }
  };

  const handleDelete = async () => {
    if (!lastTicket) return;

    await fetch(API + "/" + lastTicket.id, { method: "DELETE" });

    setLastTicket(null);
    localStorage.removeItem("savedTicket");
    setSuccessMsg("Bileta u fshi me sukses!");
    // Harroje modin e editimit nese fshihet bileta
    setIsEditing(false);
    setForm({ emri: "", mbiemri: "", linja: "Linja1a", stops: 0, email: "" });
  };

  const handleUpdate = () => {
    if (!lastTicket) return;

    // Fill form with ticket data
    setForm({
      emri: lastTicket.emri,
      mbiemri: lastTicket.mbiemri,
      linja: lastTicket.linja,
      stops: lastTicket.stops,
      email: lastTicket.email || ""
    });
    setCanDecrease(lastTicket.stops > 0);
    setIsEditing(true);
    setSuccessMsg("Jeni duke përditësuar biletën...");
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-10 p-8 max-w-7xl mx-auto">
        {/* FORM */}
        <form onSubmit={handleSubmit} className={`bg-white shadow-xl p-6 rounded-xl space-y-4 ${isEditing ? "border-2 border-yellow-400" : ""}`}>
          <h2 className="text-2xl font-bold">{isEditing ? "Përditëso Të Dhënat" : "Zgjedh Linjën"}</h2>

          <div className="grid grid-cols-1 gap-0 border border-gray-300 rounded-xl overflow-hidden">
            <div className="border-b border-gray-300 p-4">
              <label className="block font-semibold mb-1">Emri</label>
              <input
                value={form.emri}
                placeholder="Shkruaj emrin"
                className={`w-full outline-none ${emriError ? "border border-red-500" : ""}`}
                onChange={(e) => {
                  setForm({ ...form, emri: e.target.value });
                  setEmriError(false);
                }}
              />
            </div>

            <div className="border-b border-gray-300 p-4">
              <label className="block font-semibold mb-1">Mbiemri</label>
              <input
                value={form.mbiemri}
                placeholder="Shkruaj mbiemrin"
                className={`w-full outline-none ${mbiemriError ? "border border-red-500" : ""}`}
                onChange={(e) => {
                  setForm({ ...form, mbiemri: e.target.value });
                  setMbiemriError(false);
                }}
              />
            </div>

            <div className="border-b border-gray-300 p-4">
              <label className="block font-semibold mb-1">Email (klienti)</label>
              <input
                value={form.email}
                placeholder="Shkruaj emailin"
                className={`w-full outline-none ${emailError ? "border border-red-500" : ""}`}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setEmailError(false);
                }}
              />
            </div>

            <div className="border-b border-gray-300 p-4">
              <label className="block font-semibold mb-1">Zgjidh Linjën</label>
              <select
                value={form.linja}
                className="w-full outline-none"
                onChange={(e) => setForm({ ...form, linja: e.target.value })}
              >
                <option value="Linja1a">Linja 1a</option>
                <option value="Linja3c">Linja 3c</option>
                <option value="Linja7c">Linja 7c</option>
              </select>
            </div>

            <div className="p-4">
              <label className="block font-semibold mb-1">
                Numri i stacioneve (Stops)
                <span className="text-gray-500 text-sm"> (0.20€ për çdo stop)</span>
              </label>

              <div className="flex items-center gap-2">
                {canDecrease && (
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                    onClick={() => {
                      setForm((prev) => {
                        const newStops = Math.max(0, prev.stops - 1);
                        return { ...prev, stops: newStops };
                      });
                    }}
                  >
                    -1
                  </button>
                )}

                <input
                  type="number"
                  value={form.stops}
                  className="w-full outline-none"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setForm({ ...form, stops: value });
                    if (value > 0) setCanDecrease(true);
                  }}
                />

                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, stops: prev.stops + 1 }));
                    setCanDecrease(true);
                  }}
                >
                  +1
                </button>
              </div>
            </div>
          </div>

          <div className="text-green-600 font-bold text-lg">
            Çmimi i biletës: {price} €
          </div>

          <div className="flex gap-2">
            <button className={`flex-1 text-white py-2 rounded-lg ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}>
              {isEditing ? "Ruaj Ndryshimet" : "Bli Biletën"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setForm({ emri: "", mbiemri: "", linja: "Linja1a", stops: 0, email: "" });
                  setSuccessMsg("Anuluat përditësimin.");
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Anulo
              </button>
            )}
          </div>

          {successMsg && (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg">
              {successMsg}
            </div>
          )}
        </form>

        {/* FOTO */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex gap-3 mb-4">
            {images.map((img, idx) => (
              <div
                key={img.name}
                onClick={() => setImgIndex(idx)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-200
                  ${imgIndex === idx
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                <div className="font-semibold text-sm">{img.name}</div>
              </div>
            ))}
          </div>

          <img
            src={images[imgIndex].src}
            alt={images[imgIndex].name}
            className="w-full h-[380px] object-contain rounded-xl shadow-lg cursor-pointer"
            onClick={() => setShowModal(true)}
          />

          <div className="text-center text-xs text-gray-500 mt-2">
            Kliko për ta zmadhuar
          </div>
        </div>
      </div>

      {/* UPDATE / DELETE */}
      {lastTicket && (
        <div className="max-w-7xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">Përditëso ose Fshi biletën</h2>

          <div className="mb-3 p-4 rounded-xl border border-gray-200">
            <div className="font-bold">{lastTicket.emri} {lastTicket.mbiemri}</div>
            <div className="text-sm text-gray-500">
              Linja: {lastTicket.linja} | Stops: {lastTicket.stops} | Çmimi: {lastTicket.price} €
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-1 bg-yellow-400 rounded-lg"
                onClick={handleUpdate}
              >
                Përditëso
              </button>

              <button
                className="px-4 py-1 bg-red-500 text-white rounded-lg"
                onClick={handleDelete}
              >
                Fshi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <img
            src={images[imgIndex].src}
            alt="Linja e madhe"
            className="max-w-[98%] max-h-[98%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
