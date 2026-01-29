import { useEffect, useState, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy loading components for code splitting
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Home = lazy(() => import("./components/Home"));
const PublicCompanies = lazy(() => import("./components/PublicCompanies"));
const CompanyPage = lazy(() => import("./components/CompanyPage"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const StudentDiscountForm = lazy(() => import("./components/StudentDiscountForm"));
const ContactInfo = lazy(() => import("./components/ContactInfo"));
const Linjat = lazy(() => import("./components/Linjat"));
const About = lazy(() => import("./components/About"));

// Simple Fallback Loader
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-vh-50 py-20 text-gray-500">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p>Po ngarkohet...</p>
  </div>
);

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setPage("login");
  };

  return (
    <div>
      {/* Header merr user + onLogout + onNavigate */}
      <Header onNavigate={setPage} user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto mt-10 px-6 min-h-[calc(100vh-340px)]">
        <Suspense fallback={<PageLoader />}>
          {/* Nëse user është loguar → Dashboard */}
          {user && page === "dashboard" && <Dashboard onLogout={handleLogout} />}

          {/* Home page */}
          {page === "home" && <Home onNavigate={setPage} />}

          {/* About page */}
          {page === "about" && <About />}

          {/* Publike: lista e kompanive */}
          {page === "bus-companies" && (
            <PublicCompanies
              onOpenCompany={(company) => {
                setSelectedCompany(company);
                setPage("company");
              }}
              onNavigate={setPage}
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
          {page === "lines" && <Linjat />}
          {page === "contact" && <>
            <ContactInfo />
            <ContactForm />
          </>}
          {page === "student-discount" && <StudentDiscountForm />}
        </Suspense>
      </div>

      {/* Footer jashtë container-it për full width */}
      <Footer onNavigate={setPage} />
    </div>
  );
}

export default App;
