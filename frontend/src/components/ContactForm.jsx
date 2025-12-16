import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    let newErrors = {};
    // Telefoni duhet të jetë vetëm numra dhe jo bosh
    if (!form.phone || !/^[0-9]+$/.test(form.phone)) {
      newErrors.phone = "Numri i telefonit duhet të përmbajë vetëm numra.";
    }
    // Ankesa duhet të ketë më shumë se 10 karaktere
    if (!form.message || form.message.length <= 10) {
      newErrors.message = "Ankesa duhet të ketë më shumë se 10 karaktere.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSending(true);
    try {
      const res = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Mesazhi u dërgua me sukses!');
        setForm({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        setSuccess(data.message || 'Gabim gjatë dërgimit.');
      }
    } catch (err) {
      setSuccess('Gabim gjatë dërgimit.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2930.073964479836!2d21.14607331544119!3d42.65433797916737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ecb1e2e2e2d%3A0x7e7e7e7e7e7e7e7e!2sTrafiku%20Urban!5e0!3m2!1sen!2s!4v1670000000000!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '8px', minWidth: '300px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-8 flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0a223a]">Forma Kontaktuese</h2>
        <input
          type="text"
          name="name"
          placeholder="Emri dhe Mbiemri"
          value={form.name}
          onChange={handleChange}
          className="bg-[#fdfaf3] border-none rounded px-4 py-3 focus:ring-2 focus:ring-[#e7c873]"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="bg-[#fdfaf3] border-none rounded px-4 py-3 focus:ring-2 focus:ring-[#e7c873]"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefoni"
          value={form.phone}
          onChange={handleChange}
          className="bg-[#fdfaf3] border-none rounded px-4 py-3 focus:ring-2 focus:ring-[#e7c873]"
          required
        />
        {errors.phone && <div className="text-red-600 text-sm">{errors.phone}</div>}
        <textarea
          name="message"
          placeholder="Ankesa"
          value={form.message}
          onChange={handleChange}
          className="bg-[#fdfaf3] border-none rounded px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-[#e7c873]"
          required
        />
        {errors.message && <div className="text-red-600 text-sm">{errors.message}</div>}
        <button
          type="submit"
          className="bg-[#e7c873] hover:bg-[#f7d87c] text-[#0a223a] font-semibold px-10 py-3 rounded mt-2 mx-auto transition"
          disabled={sending}
        >
          {sending ? "Duke dërguar..." : "Dërgo"}
        </button>
        {success && <div className="text-green-600 text-center mt-2">{success}</div>}
      </form>
    </div>
  );
}
