import React, { useState } from "react";

function Header({ onNavigate, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State për menunë mobile
  const bgColor = '#0a223a';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="shadow-lg sticky top-0 z-50" style={{ background: bgColor }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <a onClick={() => onNavigate("home")} className="flex items-center cursor-pointer">
              <span className="h-10 w-10 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="19" stroke="#e7c873" strokeWidth="2" fill="white" />
                  <rect x="11" y="10" width="18" height="14" rx="3" fill="#e7c873" />
                  <rect x="13.5" y="13" width="13" height="7" rx="1.5" fill="white" />
                  <rect x="17" y="21" width="2.5" height="3" rx="1" fill="#e7c873" />
                  <rect x="20.5" y="21" width="2.5" height="3" rx="1" fill="#e7c873" />
                  <circle cx="15.5" cy="25.5" r="1.5" fill="#e7c873" />
                  <circle cx="24.5" cy="25.5" r="1.5" fill="#e7c873" />
                </svg>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-base">
                <li><button onClick={() => onNavigate("lines")} className="text-white hover:text-yellow-400 font-medium transition">Linjat</button></li>
                <li><button onClick={() => onNavigate("bus-companies")} className="text-white hover:text-yellow-400 font-medium transition">Kompanitë</button></li>
                <li><button onClick={() => onNavigate("about")} className="text-white hover:text-yellow-400 font-medium transition">Rreth Nesh</button></li>
                <li><button onClick={() => onNavigate("contact")} className="text-white hover:text-yellow-400 font-medium transition">Kontakti</button></li>
                {user && user.role === 'admin' && (
                  <li><button onClick={() => onNavigate("dashboard")} className="text-white hover:text-yellow-400 font-bold border-b-2 border-yellow-400">Dashboard</button></li>
                )}
              </ul>
            </nav>
          </div>

          {/* Auth Buttons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:gap-4">
              {!user ? (
                <>
                  <button onClick={() => onNavigate("login")} className="rounded-md bg-[#f97316] hover:bg-[#ea580c] px-5 py-2 text-sm font-medium text-white transition shadow-md">Login</button>
                  <button onClick={() => onNavigate("register")} className="rounded-md bg-[#f97316] hover:bg-[#ea580c] px-5 py-2 text-sm font-medium text-white transition shadow-md">Regjistro</button>
                </>
              ) : (
                <button onClick={() => { localStorage.removeItem("user"); onLogout(); }} className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 transition shadow-md">Log Out</button>
              )}
            </div>

            {/* Hamburger Button */}
            <div className="block md:hidden">
              <button 
                onClick={toggleMenu}
                className="rounded bg-gray-700 p-2 text-white transition hover:bg-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-700" style={{ background: bgColor }}>
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <button onClick={() => { onNavigate("lines"); toggleMenu(); }} className="text-left text-white text-lg font-medium">Linjat</button>
            <button onClick={() => { onNavigate("bus-companies"); toggleMenu(); }} className="text-left text-white text-lg font-medium">Kompanitë</button>
            <button onClick={() => { onNavigate("about"); toggleMenu(); }} className="text-left text-white text-lg font-medium">Rreth Nesh</button>
            <button onClick={() => { onNavigate("contact"); toggleMenu(); }} className="text-left text-white text-lg font-medium">Kontakti</button>
            
            {user && user.role === 'admin' && (
              <button onClick={() => { onNavigate("dashboard"); toggleMenu(); }} className="text-left text-yellow-400 text-lg font-bold">Dashboard</button>
            )}

            <div className="pt-4 border-t border-gray-700 sm:hidden">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { onNavigate("login"); toggleMenu(); }} className="w-full rounded-md bg-[#f97316] py-2 text-white">Login</button>
                  <button onClick={() => { onNavigate("register"); toggleMenu(); }} className="w-full rounded-md border border-[#f97316] py-2 text-[#f97316]">Regjistro</button>
                </div>
              ) : (
                <button onClick={() => { localStorage.removeItem("user"); onLogout(); toggleMenu(); }} className="w-full rounded-md bg-red-600 py-2 text-white">Dil (Logout)</button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;