import { useState } from "react";
import Stops from "./Stops";
import Users from "./Users";
import Kompanite from "./Kompanite";

function Dashboard({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activePage, setActivePage] = useState("stops");

  return (
    <div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setActivePage("stops")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activePage === "stops"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Stacionet
        </button>

        <button
          onClick={() => setActivePage("users")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activePage === "users"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Përdoruesit
        </button>

        <button
          onClick={() => setActivePage("companies")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activePage === "companies"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Kompanitë e Autobusëve
        </button>

      </div>

      <div className="p-8">
        {activePage === "stops" && <Stops />}
        {activePage === "users" && <Users />}
        {activePage === "companies" && <Kompanite />}
      </div>
    </div>
  );
}

export default Dashboard;
