export default function Concept() {
  return (
    <section id="concept" className="bg-gray-50 py-32 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-5">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-6">Ancrage Local</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-10 leading-tight">
              L'expertise bretonne,<br />la rigueur technique.
            </h2>
            
            <div className="wire-box p-10 mt-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 wire-img shrink-0 rounded-full">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Garanties & Sécurité</h4>
                  <p className="text-base text-gray-600 mt-3 leading-relaxed">
                    Couverture Décennale SMABTP et certification RGE Qualibat pour l'obtention des aides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-10 text-gray-700">
            <p className="text-2xl font-medium text-gray-900 leading-relaxed">
              Basée à Lorient, DT BAT est le partenaire de confiance pour une rénovation esthétique et performante dans le Morbihan (56).
            </p>
            
            <p className="text-lg leading-relaxed text-gray-600">
              Notre conviction est simple : la rénovation énergétique ne doit pas seulement économiser de l’argent, elle doit aussi protéger durablement l’architecture face au climat breton.
            </p>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gray-200 mt-8">
              <div>
                <span className="block text-5xl font-bold mb-3 text-gray-900">10 ans</span>
                <span className="text-sm uppercase text-gray-500 font-bold tracking-wider">Garantie chantiers</span>
              </div>
              <div>
                <span className="block text-5xl font-bold mb-3 text-gray-900">100%</span>
                <span className="text-sm uppercase text-gray-500 font-bold tracking-wider">Gestion administrative</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
