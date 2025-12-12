import { useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PublicCompanies from "./components/PublicCompanies";
import CompanyPage from "./components/CompanyPage";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // ✅ Lexo user nga localStorage në fillim
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPage("dashboard");
    }
  }, []);

  // Kur bëhet login
  const handleLogin = (loggedUser) => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setPage("dashboard");
  };

  // Kur bëhet logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  return (
    <div>
      {/* Header merr user + onLogout + onNavigate */}
      <Header onNavigate={setPage} user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto mt-10 px-6">
        {/* Nëse user është loguar → Dashboard */}
        {user && page === "dashboard" && <Dashboard onLogout={handleLogout} />}

        {/* Home page */}
        {page === "home" && <Home />}

        {/* Publike: lista e kompanive */}
        {page === "bus-companies" && (
          <PublicCompanies
            onOpenCompany={(company) => {
              setSelectedCompany(company);
              setPage("company");
            }}
          />
        )}

        {/* Faqe e kompanisë (detajet + bileta) */}
        {page === "company" && selectedCompany && (
          <CompanyPage company={selectedCompany} onBack={() => setPage("bus-companies")} />
        )}

        {/* Nëse s’është loguar → Login / Register */}
        {!user && page === "login" && <Login onLogin={handleLogin} />}
        {!user && page === "register" && <Register />}

        {/* Faqet e tjera (mund t’i shtosh me vonë) */}
        {page === "home" && <p className="text-center text-lg mt-20">Faqja kryesore</p>}
        {page === "lines" && <p className="text-center text-lg mt-20">Faqja e linjave</p>}
        {page === "contact" && <p className="text-center text-lg mt-20">Faqja e kontaktit</p>}
      </div>
    </div>
  );
}

export default App;
