import React from "react";

export default function ContactInfo() {
  return (
    <div className="mb-10">
      <div className="bg-[#fdfaf3] py-12 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Kontakti</h1>
          <div className="text-[#0a223a] mb-2">Transporti Publik &gt; Kontakti</div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Informatat për kontakt me<br/>N.P.K. ``Transporti Publik`` Sh.A.</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="bg-white rounded shadow p-8 flex flex-col items-center border-b-4 border-[#e7c873]">
          <div className="text-4xl mb-2 text-[#e7c873]">
            {/* Location icon */}
            <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" stroke="#e7c873" strokeWidth="1.5" fill="none"/><circle cx="12" cy="9" r="2.5" fill="none"/></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Adresa</h3>
          <div className="text-gray-700 text-center text-sm">
            Rruga Tahir Zajmi nr. 43<br/>10 000 Prishtinë
          </div>
        </div>
        <div className="bg-white rounded shadow p-8 flex flex-col items-center border-b-4 border-[#e7c873]">
          <div className="text-4xl mb-2 text-[#e7c873]">
            {/* Filled email icon */}
            <svg width="44" height="44" fill="#e7c873" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 7 8-7V18z"/></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <div className="text-gray-700 text-center text-sm">
            info@transportipublik-pr.com
          </div>
        </div>
        <div className="bg-white rounded shadow p-8 flex flex-col items-center border-b-4 border-[#e7c873]">
          <div className="text-4xl mb-2 text-[#e7c873]">
            {/* Outlined email icon */}
            <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#e7c873" strokeWidth="1.5" fill="none"/><path d="M3 7l9 6 9-6" stroke="#e7c873" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Numri i Telefonit</h3>
          <div className="text-gray-700 text-center text-sm">
            +383 44 122 344
          </div>
        </div>
        <div className="bg-white rounded shadow p-8 flex flex-col items-center border-b-4 border-[#e7c873]">
          <div className="text-4xl mb-2 text-[#e7c873]">
            {/* Info icon */}
            <svg width="44" height="44" fill="#e7c873" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e7c873"/><g><circle cx="12" cy="8" r="1" fill="#fff"/><rect x="11" y="10" width="2" height="6" rx="1" fill="#fff"/></g></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Zyrtar për Informim</h3>
          <div className="text-gray-700 text-center text-sm">
            +383 45 201 604
          </div>
        </div>
      </div>
    </div>
  );
}
