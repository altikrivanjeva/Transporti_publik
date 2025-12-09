import React from "react";


const LOGO_URL = "https://cdn0.iconfinder.com/data/icons/citycons/150/Citycons_bus-512.png"; 

function Header({ onNavigate, user, onLogout }) {
  
  const bgColor = 'white'; 
  const textColor = 'gray-800'; 
  const hoverColor = 'green-600'; 
  const accentColor = 'blue-700'; 

  return (
    
    <header className={`bg-${bgColor} shadow-lg`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          
          <div className="md:flex md:items-center md:gap-4">
            <a 
              onClick={() => onNavigate("home")}
              className="flex items-center cursor-pointer" 
            >
              <img 
                src={LOGO_URL} 
                alt="Urban Transit Connect Logo" 
                className="h-10 w-auto" 
              />
              
            </a>
          </div>

         
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-base ">
                
                <li>
                  <button
                    onClick={() => onNavigate("stations")}
                    
                    className={`text-${textColor} transition hover:text-${hoverColor} font-medium`}
                  >
                    Stacionet
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => onNavigate("lines")}
                    className={`text-${textColor} transition hover:text-${hoverColor} font-medium`}
                  >
                    Linjat
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => onNavigate("bus-companies")}
                    className={`text-${textColor} transition hover:text-${hoverColor} font-medium`}
                  >
                    Kompanitë e Autobusëve
                  </button>
                </li>
                
                {user && (
                  <li>
                    <button
                      onClick={() => onNavigate("dashboard")}
                      className={`text-${accentColor} transition hover:text-green-600 font-bold`}
                    >
                      Dashboard
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>

         
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!user ? (
                <>
                  <button
                    onClick={() => onNavigate("login")}
                    className={`rounded-md bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors shadow-md`}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => onNavigate("register")}
                    className={`rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors shadow-md hidden sm:block`}
                  >
                    Register
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    onLogout();
                  }}
                  className={`rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors shadow-md`}
                >
                  Dil (Logout)
                </button>
              )}
            </div>

            
            <div className="block md:hidden">
              <button 
                className={`rounded-sm bg-gray-200 p-2 text-gray-600 transition hover:bg-gray-300`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;