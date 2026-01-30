import React from "react";
import busImg from "../assets/photo-1632276536839-84cad7fd03b0.avif";

export default function About() {
    return (
        <div className="mb-10">
            <div className="bg-[#fdfaf3] py-12 mb-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-2">Rreth Nesh</h1>
                    <div className="text-[#0a223a] mb-2">Transporti Publik &gt; About Us</div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Foto */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="rounded-2xl overflow-hidden shadow-lg mb-6 w-[350px] h-[350px] flex items-center justify-center bg-gray-100">
                            <img src={busImg} alt="Bus Driver" className="object-cover w-full h-full" />
                        </div>
                    </div>
                    {/* Teksti dhe statistikat */}
                    <div className="flex-1">
                        <div className="mb-4 text-xs font-bold text-[#6c63ff] tracking-widest">RRETH NESH</div>
                        <h2 className="text-4xl font-bold mb-2 text-[#23223a]">Udhëtime të paharrueshme <span className="text-[#6c63ff]">Perfeksion</span></h2>
                        <p className="mb-6 text-gray-700">Te Transporti Publik, jemi të specializuar në transport të sigurt, të besueshëm dhe komod për grupe. Nga eventet korporative te udhëtimet shkollore, autobusët modernë dhe shërbimi profesional sigurojnë që çdo udhëtim të jetë i lehtë dhe pa stres.</p>
                        <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
                            <ul className="space-y-2">
                                <li>✔️ Shërbim i besueshëm</li>
                                <li>✔️ Udhëtime komode</li>
                                <li>✔️ Çmime të përballueshme</li>
                            </ul>
                            <ul className="space-y-2">
                                <li>✔️ Shoferë profesionistë</li>
                                <li>✔️ Zgjidhje të personalizuara</li>
                                <li>✔️ Mbështetje e jashtëzakonshme</li>
                            </ul>
                        </div>
                        <div className="flex gap-6 mt-6">
                            <div className="bg-[#23223a] text-white rounded-lg px-8 py-6 flex flex-col items-center">
                                <div className="text-3xl font-bold">460+</div>
                                <div className="text-xs mt-2">SHOFERË AKTIVË</div>
                            </div>
                            <div className="bg-[#23223a] text-white rounded-lg px-8 py-6 flex flex-col items-center">
                                <div className="text-3xl font-bold">90%</div>
                                <div className="text-xs mt-2">KLIENTË TË KËNAQUR</div>
                            </div>
                            <div className="bg-[#23223a] text-white rounded-lg px-8 py-6 flex flex-col items-center">
                                <div className="text-3xl font-bold">15+</div>
                                <div className="text-xs mt-2">VITE PËRVOJË </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Testimonial më poshtë */}
                <div className="flex justify-center mt-12">
                    <div className="bg-[#23223a] text-white rounded-xl p-6 w-[320px] shadow-lg">
                        <span className="text-3xl text-[#ff9900] font-bold">“</span>
                        <p className="mb-4 text-sm">Te Transporti Publik, nuk transportojmë vetëm njerëz, ne lidhim destinacione dhe krijojmë udhëtime të paharrueshme.</p>
                        <div>
                            <span className="font-semibold">R.F</span>
                            <div className="text-xs text-gray-300">CEO Transporti Publik</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
