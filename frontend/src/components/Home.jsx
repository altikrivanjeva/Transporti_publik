import React from "react";
import heroImg from "../assets/bus.avif";

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="relative rounded-lg overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${heroImg})`, height: 360}}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-full p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Udhëto Qytetin, Lehtësi!</h1>
              <p className="text-white/90 mb-6 max-w-xl">Gjej stacionet, shiko linjat dhe zgjidh kompaninë më të përshtatshme për udhëtimin tënd.</p>

              <div className="w-full md:w-3/4 bg-white rounded-md shadow-md p-4">
                <div className="flex gap-3">
                  <input className="flex-1 border rounded px-4 py-2" placeholder="Nisja" />
                  <input className="flex-1 border rounded px-4 py-2" placeholder="Destinacioni" />
                  <input type="date" className="border rounded px-4 py-2" />
                  <button className="bg-blue-500 text-white px-6 py-2 rounded">Kërko</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold mb-2">Gjej Stacione</h3>
              <p className="text-gray-600">Të dhëna të plota për stacionet, oraret dhe afërsinë me vendndodhjen tuaj.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="font-semibold mb-2">Eksploro Linjat</h3>
              <p className="text-gray-600">Shiko hartën e linjave dhe zgjedh rrugën më të mirë për udhëtimin.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold mb-2">Zbulo Kompanitë</h3>
              <p className="text-gray-600">Krahaso kompanitë sipas çmimeve, orareve dhe vlerësimeve.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
