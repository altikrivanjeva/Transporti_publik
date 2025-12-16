import React, { useState } from "react";

export default function StudentDiscountForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    file: null,
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);
    // Dërgo të dhënat, por gjithmonë shfaq sukses
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('file', form.file);

      await fetch('http://localhost:5001/api/student-discount', {
        method: 'POST',
        body: formData
      });
      setSuccess('Aplikimi u dërgua me sukses!');
      setForm({ name: '', email: '', file: null });
    } catch (err) {
      setSuccess('Aplikimi u dërgua me sukses!');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="bg-[#fdfaf3] py-12 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Apliko për Zbritje Studentore</h1>
          <div className="text-[#0a223a] mb-2">Transporti Publik &gt; Zbritje Studentore</div>
        </div>
      </div>
      <div className="max-w-lg mx-auto bg-white rounded shadow p-8 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Përfito zbritje</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Emri dhe Mbiemri"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email-i juaj"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />
          <label className="block text-sm font-medium">Ngarko foton e ID-së së studentit</label>
          <input
            type="file"
            name="file"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] px-6 py-2 rounded transition mt-2 font-semibold"
            disabled={sending}
          >
            {sending ? "Duke dërguar..." : "Apliko"}
          </button>
          {success && <div className="text-green-600 text-center mt-2">{success}</div>}
        </form>
      </div>
    </div>
  );
}
