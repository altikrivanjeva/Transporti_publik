import { useEffect, useState, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy loading components
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
const Menaxhimi = lazy(() => import("./components/Menaxhimi")); // Sigurohu që ky skedar ekziston në /components

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 text-gray-500">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p>Po ngarkohet...</p>
  </div>
);

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = (loggedUser) => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  return (
    <div>
      <Header onNavigate={setPage} user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto mt-10 px-6 min-h-[calc(100vh-340px)]">
        <Suspense fallback={<PageLoader />}>
          {user && page === "dashboard" && <Dashboard onLogout={handleLogout} />}
          
          {/* Faqja e re për CRUD-in e Fabrikave dhe Punëtorëve */}
          {page === "menaxhimi" && <Menaxhimi />}

          {page === "home" && <Home onNavigate={setPage} />}
          {page === "about" && <About />}
          {page === "bus-companies" && (
            <PublicCompanies
              onOpenCompany={(company) => { setSelectedCompany(company); setPage("company"); }}
              onNavigate={setPage}
            />
          )}
          {page === "company" && selectedCompany && (
            <CompanyPage company={selectedCompany} onBack={() => setPage("bus-companies")} />
          )}
          {!user && page === "login" && <Login onLogin={handleLogin} />}
          {!user && page === "register" && <Register />}
          {page === "lines" && <Linjat />}
          {page === "contact" && <><ContactInfo /><ContactForm /></>}
          {page === "student-discount" && <StudentDiscountForm />}
        </Suspense>
      </div>
      <Footer onNavigate={setPage} />
    </div>
  );
}

export default App;