function Header({ onNavigate, user, onLogout }) {
  return (
    <header className="bg-orange-400 shadow-xl ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a 
              onClick={() => onNavigate("home")}
              className="block cursor-pointer" 
            >
              <h1 className="text-white">Logo</h1>
            </a>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-base ">
                <li>
                  <button
                    onClick={() => onNavigate("home")}
                    className="text-gray-500 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-900"
                  >
                    Stacionet
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => onNavigate("lines")}
                    className="text-gray-500 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-900"
                  >
                    Linjat
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="text-gray-500 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-900"
                  >
                    Kontakt
                  </button>
                </li>

                {user && (
                  <li>
                    <button
                      onClick={() => onNavigate("dashboard")}
                      className="text-gray-500 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-500 font-medium"
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
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-orange-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => onNavigate("register")}
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-orange-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
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
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-orange-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
                >
                  Dil (Logout)
                </button>
              )}
            </div>

            <div className="block md:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
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
