import React from "react";




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
                    className="rounded-md bg-[#e7c873] hover:bg-[#000000] px-5 py-2.5 text-sm font-medium text-white transition-colors shadow-md"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => onNavigate("register")}
                    className="rounded-md bg-[#e7c873] hover:bg-[#000000] px-5 py-2.5 text-sm font-medium text-white transition-colors shadow-md hidden sm:block"
                  >
                    Regjistro
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