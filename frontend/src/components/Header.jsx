function Header({ onNavigate, user, onLogout }) {
  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat text-white shadow-lg h-[110px]"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
  
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>


      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
  
        <h1
          onClick={() => onNavigate("home")}
          className="text-3xl font-bold tracking-wide cursor-pointer hover:text-teal-400 transition-colors"
        >
          Transporti Publik
        </h1>

      
        <nav className="space-x-9 hidden md:flex items-center">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-teal-400 transition-colors"
          >
            Stacionet
          </button>
          <button
            onClick={() => onNavigate("lines")}
            className="hover:text-teal-400 transition-colors"
          >
            Linjat
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="hover:text-teal-400 transition-colors"
          >
            Kontakt
          </button>

        
          {!user && (
            <>
              <button
                onClick={() => onNavigate("login")}
                className="hover:text-teal-400 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("register")}
                className="hover:text-teal-400 transition-colors"
              >
                Register
              </button>
            </>
          )}

       
          {user && (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                onLogout();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Dil (Logout)
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
