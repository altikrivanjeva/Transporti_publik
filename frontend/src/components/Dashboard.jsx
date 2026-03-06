import { useState } from "react";
import Stops from "./Stops";
import Users from "./Users";
import Kompanite from "./Kompanite";
import Sporti from "./Sporti";

function Dashboard({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("stacionet");

  return (
    <div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setActiveTab("stacionet")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "stacionet"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Stacionet
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "users"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Përdoruesit
        </button>

        <button
          onClick={() => setActiveTab("companies")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "companies"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Kompanitë e Autobusëve
        </button>

        <button
          onClick={() => setActiveTab("sporti")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "sporti"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Sporti
        </button>

      </div>

      <div className="p-8">
        {activeTab === "stacionet" && <Stops />}
        {activeTab === "users" && <Users />}
        {activeTab === "companies" && <Kompanite />}
        {activeTab === "sporti" && <Sporti />}
      </div>
    </div>
  );
}

export default Dashboard;
/*CREATE TABLE IF NOT EXISTS team (
    TeamId INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Player (
    PlayerId INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Number INT NOT NULL,
    BirthYear INT NOT NULL,
    TeamId INT,
    FOREIGN KEY (TeamId) REFERENCES team(TeamId) ON DELETE CASCADE
);

-- Shto ekipet fillestare
INSERT INTO team (Name) VALUES ('FC Barcelona'), ('Paris Saint-Germain')