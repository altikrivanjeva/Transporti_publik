import React from "react";

export default function About() {
    return (
        <div className="py-12 bg-white mb-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#0a223a]">Rreth Nesh</h1>

                <div className="prose prose-lg text-gray-700">
                    <p className="mb-6">
                        Transporti Publik është platforma kryesore për informim rreth linjave të autobusëve në Prishtinë dhe rrethinë.
                        Synimi ynë është të ofrojmë një përvojë të thjeshtë dhe efikase për të gjithë udhëtarët.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4 text-[#0a223a]">Misioni Ynë</h2>
                    <p className="mb-6">
                        Ne punojmë çdo ditë për të përmirësuar cilësinë e transportit publik duke ofruar informacion të saktë dhe në kohë reale.
                        Platforma jonë u mundëson qytetarëve të planifikojnë udhëtimet e tyre me lehtësi, duke kursyer kohë dhe duke reduktuar pritjet e panevojshme.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4 text-[#0a223a]">Çfarë Ofroni?</h2>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Informacion të detajuar për linjat dhe stacionet.</li>
                        <li>Orearet e sakta të nisjeve dhe mbërritjeve.</li>
                        <li>Mundësinë për të blerë bileta online.</li>
                        <li>Zbritje për studentë dhe kategori të veçanta.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 text-[#0a223a]">Kontakti</h2>
                    <p>
                        Për çdo pyetje apo sugjerim, jemi këtu për t'ju ndihmuar.
                        Na vizitoni në zyrat tona ose na kontaktoni përmes telefonit dhe emailit.
                    </p>
                </div>
            </div>
        </div>
    );
}
