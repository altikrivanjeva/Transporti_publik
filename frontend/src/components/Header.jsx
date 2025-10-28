function Header() {
  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat text-white shadow-lg h-[110px]"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Overlay (errësim i lehtë për ta bërë tekstin të dukshëm) */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Përmbajtja e header-it */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        {/* Logo / Emri */}
        <h1 className="text-3xl font-bold tracking-wide">
          Transporti Publik
        </h1>

        {/* Navigation */}
        <nav className="space-x-9 hidden md:flex">
          <a href="#" className="hover:text-teal-400 transition-colors">
            Stacionet
          </a>
          <a href="#" className="hover:text-teal-400 transition-colors">
            Linjat
          </a>
          <a href="#" className="hover:text-teal-400 transition-colors">
            Kontakt
          </a>
        </nav>
      </div>

      {/* Gradient poshtë për estetikë */}
     
    </header>
  );
}

export default Header;
