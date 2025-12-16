import React, { useState, useRef, useEffect } from "react";

const locations = [
  "Qendra",
  "Dardania",
  "Aktash",
  "Qafa",
  "Rruga B",
  "Rruga C",
  "Ulpianë",
  "Bregu i Diellit",
  "Lakrishte",
  "Kalabria",
  "Lagja e Muhaxherëve",
  "Tasligje",
  "Mati 1",
  "Mati 2",
  "Kodra e Diellit",
  "Veternik"
];

export default function LocationDropdown({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className="w-full border rounded px-4 py-2 text-left bg-white focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        {value || <span className="text-gray-400">{placeholder}</span>}
        <span className="float-right">▼</span>
      </button>
      {open && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto shadow-lg">
          {locations.map((loc) => (
            <li
              key={loc}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${value === loc ? "bg-blue-200" : ""}`}
              onClick={() => {
                onChange(loc);
                setOpen(false);
              }}
            >
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
