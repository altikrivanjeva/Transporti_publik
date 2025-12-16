import React from "react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#0a2846] text-white pt-12 pb-4 mt-16 w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-bold text-[#e7c873]">Trafiku Urban</span>
            <span className="hover:text-[#e7c873] cursor-pointer" onClick={() => onNavigate && onNavigate("home")}>Ballina</span>
            <span className="hover:text-[#e7c873] cursor-pointer">Rreth nesh</span>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <span className="font-bold text-[#e7c873] mb-2">Kontakti</span>
          <span>Rruga Tahir Zajmi nr. 43, 10 000 Prishtinë</span>
          <span>Tel(Viber): +383 45 10 11 22</span>
          <span>info@transportipublik.com</span>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-[#e7c873] mb-2">Rrjetet Sociale</span>
          <div className="flex flex-col gap-2 text-white/90">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e7c873]"> Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e7c873]"> Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e7c873]"> Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e7c873]"> Youtube</a>
            <a href="https://maps.google.com/?q=Rruga+Tahir+Zajmi+nr.+43,+10+000+Prishtinë" target="_blank" rel="noopener noreferrer" className="hover:text-[#e7c873]"> Webmail</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-white/80 text-sm w-full">
        Copyright © 2022. Të gjitha të drejtat e rezervuara: Trafiku Urban
      </div>
    </footer>
  );
}
