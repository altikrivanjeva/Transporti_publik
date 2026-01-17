import React from "react";
import heroImg from "../assets/bus.avif";
import trafikUrban from "../assets/Trafik-urban.webp";

import LocationDropdown from "./LocationDropdown";

function Home({ onNavigate }) {
  const [nisja, setNisja] = React.useState("");
  const [destinacioni, setDestinacioni] = React.useState("");
  return (
    <div>
      {/* HERO */}
      <section className="bg-white mb-16">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="relative rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})`, height: 360 }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-full p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Udhëto Qytetin me Lehtësi!</h1>
              <p className="text-white/90 mb-6 max-w-xl">Gjej stacionet, shiko linjat dhe zgjidh kompaninë më të përshtatshme për udhëtimin tënd.</p>

              <div className="w-full md:w-3/4 bg-white rounded-md shadow-md p-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <LocationDropdown value={nisja} onChange={setNisja} placeholder="Nisja" />
                  </div>
                  <div className="flex-1">
                    <LocationDropdown value={destinacioni} onChange={setDestinacioni} placeholder="Destinacioni" />
                  </div>
                  <input type="date" className="border rounded px-4 py-2" />
                  <button className="bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] px-6 py-2 rounded transition font-semibold">Kërko</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 bg-gray-50 mb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center cursor-pointer transition hover:bg-[#0a223a] hover:text-white group">
              <div className="flex justify-center mb-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a223a] group-hover:text-white">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-white" style={{ color: '#e7c873' }}>Gjej Stacione</h3>
              <p className="text-gray-600 group-hover:text-white">Të dhëna të plota për stacionet, oraret dhe afërsinë me vendndodhjen tuaj.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center cursor-pointer transition hover:bg-[#0a223a] hover:text-white group">
              <div className="flex justify-center mb-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a223a] group-hover:text-white">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-white" style={{ color: '#e7c873' }}>Eksploro Linjat</h3>
              <p className="text-gray-600 group-hover:text-white">Shiko hartën e linjave dhe zgjedh rrugën më të mirë për udhëtimin.</p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow text-center cursor-pointer transition hover:bg-[#0a223a] hover:text-white group"
              onClick={() => onNavigate && onNavigate("bus-companies")}
            >
              <div className="flex justify-center mb-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a223a] group-hover:text-white">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M8 6h.01"></path>
                  <path d="M16 6h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M8 14h.01"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-white" style={{ color: '#e7c873' }}>Zbulo Kompanitë</h3>
              <p className="text-gray-600 group-hover:text-white">Krahaso kompanitë sipas çmimeve dhe orareve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT DISCOUNT SECTION */}
      <section className="bg-white py-16 mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">A je student?</h2>
            <p className="mb-2 text-gray-700">Për të përfituar zbritje në çdo biletë, duhet të dërgosh:</p>
            <ul className="mb-6 ml-4 list-disc text-gray-600">
              <li>Letërnjoftimin studentor nga një universitet në Kosovë.</li>
            </ul>
            <div className="flex items-center bg-blue-50 text-blue-700 rounded px-4 py-2 mb-6 text-sm gap-2">
              <svg width="18" height="18" fill="currentColor" className="text-blue-400" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="8" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <text x="9" y="13" textAnchor="middle" fontSize="11" fill="#3b82f6">i</text>
              </svg>
              Ne do të verifikojmë të dhënat dhe do të dërgojmë kodin e zbritjes.
            </div>
            <button
              className="bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] font-semibold rounded-full px-8 py-3 shadow transition"
              onClick={() => (typeof onNavigate === 'function') && onNavigate('student-discount')}
            >
              Na dërgo email
            </button>
          </div>
          <div className="flex-1 flex justify-center min-w-[300px]">
            {/* SVG illustration: city, bus, station */}
            <svg width="420" height="160" viewBox="0 0 420 160" fill="none">
              {/* City silhouette */}
              <rect x="0" y="40" width="120" height="60" rx="6" fill="url(#city)" opacity="0.13" />
              <rect x="100" y="30" width="90" height="70" rx="6" fill="url(#city)" opacity="0.13" />
              <rect x="200" y="50" width="60" height="50" rx="6" fill="url(#city)" opacity="0.13" />
              <rect x="270" y="35" width="100" height="65" rx="6" fill="url(#city)" opacity="0.13" />
              {/* Bus */}
              <rect x="90" y="90" width="120" height="36" rx="10" fill="url(#bus)" />
              <rect x="110" y="104" width="28" height="14" rx="3" fill="#fff" fillOpacity="0.7" />
              <rect x="150" y="104" width="28" height="14" rx="3" fill="#fff" fillOpacity="0.7" />
              <rect x="190" y="104" width="28" height="14" rx="3" fill="#fff" fillOpacity="0.7" />
              <circle cx="120" cy="132" r="8" fill="#d1d5db" />
              <circle cx="200" cy="132" r="8" fill="#d1d5db" />
              {/* Station */}
              <rect x="250" y="110" width="60" height="14" rx="4" fill="#e5e7eb" />
              <rect x="250" y="124" width="60" height="8" rx="3" fill="#e5e7eb" opacity="0.7" />
              <rect x="305" y="90" width="8" height="38" rx="4" fill="url(#pole)" />
              <rect x="260" y="90" width="40" height="18" rx="4" fill="#fff" opacity="0.7" />
              <defs>
                <linearGradient id="city" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#888" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="bus" x1="90" y1="90" x2="210" y2="126" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#bbb" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="pole" x1="0" y1="0" x2="0" y2="38" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f43f5e" />
                  <stop offset="1" stopColor="#f59e42" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <section className="py-16 mb-16 text-white" style={{ background: 'linear-gradient(90deg, #0a223a 0%, #193a5a 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow">Destinacionet më të preferuara
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <div
              key={"Prishtina"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Qendra
            </div>
            <div
              key={"Tirana"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Dardania
            </div>
            <div
              key={"Skopje"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Aktash
            </div>
            <div
              key={"Podgorica"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Qafa
            </div>
            <div
              key={"Saranda"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Rruga B
            </div>
            <div
              key={"Shkoder"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Rruga C
            </div>
            <div
              key={"Durres"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Ulpianë
            </div>
            <div
              key={"Prizren"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Bregu i Diellit
            </div>
            <div
              key={"Peja"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Lakrishte
            </div>
            <div
              key={"Gjakova"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Kalabria
            </div>
            <div
              key={"Budva"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Lagja e Muhaxherëve
            </div>
            <div
              key={"Ulcinj"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Tasligje
            </div>
            <div
              key={"Thessaloniki"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Mati 1
            </div>
            <div
              key={"Zagreb"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Mati 2
            </div>
            <div
              key={"Munich"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Kodra e Diellit
            </div>
            <div
              key={"Zürich"}
              className="bg-white/90 rounded-xl shadow px-3 py-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:scale-105 transition-all duration-200 border border-orange-100"
              style={{ minHeight: 48 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-500"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.9 2.27l-1.07 4.27c-.24.959-.24 1.962 0 2.92L1 17h2"></path><path d="M14 17H9"></path><path d="M8 21h8"></path><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg> Veternik
            </div>
          </div>
        </div>
      </section>

      {/* TICKET PRICES SECTION */}
      <section className="py-20 mb-16" style={{ background: 'linear-gradient(120deg, #f8fafc 60%, #e9f1f7 100%)', borderRadius: '2.5rem' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">Çmimet e Biletave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bileta për një drejtim */}
            <div className="bg-[#0a223a] rounded-xl shadow-lg flex flex-col items-center p-8 border border-gray-100">
              <div className="text-lg font-semibold mb-2 text-white">Biletë për një drejtim</div>
              <div className="text-4xl font-bold mb-4 text-white">0.50€</div>
              <div className="text-white/90 text-center mb-6">Një biletë e rregullt autobusi, e cila mund të përdoret vetëm për një drejtim.</div>
              <button className="mt-auto px-6 py-2 bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] rounded-lg font-medium transition">Më shumë </button>
            </div>
            {/* Bileta Ditore */}
            <div className="bg-[#0a223a] rounded-xl shadow-lg flex flex-col items-center p-8 border border-gray-100">
              <div className="text-lg font-semibold mb-2 text-white">Bileta Ditore</div>
              <div className="text-4xl font-bold mb-4 text-white">0.80€</div>
              <div className="text-white/90 text-center mb-6">Përfshin udhëtime vajtje-ardhje pa limit. Përdoret për të gjitha linjat e Komunës së Prishtinës.</div>
              <button className="mt-auto px-6 py-2 bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] rounded-lg font-medium transition">Më shumë</button>
            </div>
            {/* Bileta Javore */}
            <div className="bg-[#0a223a] rounded-xl shadow-lg flex flex-col items-center p-8 border border-gray-100">
              <div className="text-lg font-semibold mb-2 text-white">Bileta Javore</div>
              <div className="text-4xl font-bold mb-4 text-white">4.00€</div>
              <div className="text-white/90 text-center mb-6">Përfshin udhëtime vajtje-ardhje pa limit. Përdoret për të gjitha linjat e Komunës së Prishtinës. Bileta Javore kushton 4.00€</div>
              <button className="mt-auto px-6 py-2 bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] rounded-lg font-medium transition">Më shumë </button>
            </div>
            {/* Bileta Mujore */}
            <div className="bg-[#0a223a] rounded-xl shadow-lg flex flex-col items-center p-8 border border-gray-100">
              <div className="text-lg font-semibold mb-2 text-white">Bileta Mujore</div>
              <div className="text-4xl font-bold mb-4 text-white">13.50€</div>
              <div className="text-white/90 text-center mb-6">Përdoret për të gjitha linjat e Trafikut Urban. Gjithashtu - Bileta Mujore e Linjës Mund të përdoret vetëm për një linjë të caktuar.<br />Bileta Mujore e Linjës – Për nxënës dhe studentë është 10€.</div>
              <button className="mt-auto px-6 py-2 bg-[#e7c873] hover:bg-[#d6b24c] text-[#0a223a] rounded-lg font-medium transition">Më shumë </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          {/* Image */}
          <div className="flex-1 flex justify-center items-center min-w-[320px] relative">
            <img src={trafikUrban} alt="Autobus Urban" className="rounded-xl shadow-lg object-cover w-full max-w-xl" style={{ height: 340 }} />
          </div>
          {/* Text/Reasons */}
          <div className="flex-1 min-w-[320px]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#e7c873]">Pse duhet</span> ta përdorim<br />Transportin Publik?
            </h2>
            <div className="w-24 h-1 mb-6 border-b-2 border-dashed border-gray-300"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl" style={{ color: '#e7c873' }}>
                  {/* Shield icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2C7 2 2 6 2 11c0 5.25 7.5 11 10 11s10-5.75 10-11c0-5-5-9-10-9z" stroke="#e7c873" strokeWidth="2" /><path d="M12 13a2 2 0 100-4 2 2 0 000 4z" fill="#e7c873" /></svg>
                </span>
                <span className="text-lg font-medium text-gray-800">Sigurt dhe komod</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl" style={{ color: '#e7c873' }}>
                  {/* Traffic light icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#e7c873" strokeWidth="2" /></svg>
                </span>
                <span className="text-lg font-medium text-gray-800">Redukton trafikun</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl" style={{ color: '#e7c873' }}>
                  {/* Leaf icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#e7c873" /></svg>
                </span>
                <span className="text-lg font-medium text-gray-800">Ndihmon në ruajtjen e ambientit</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl" style={{ color: '#e7c873' }}>
                  {/* Euro icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e7c873" /></svg>
                </span>
                <span className="text-lg font-medium text-gray-800">Çmim i arsyeshëm</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer is now globally in App.jsx */}
    </div>
  );

}

export default Home;
