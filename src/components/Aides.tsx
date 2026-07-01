export default function Aides() {
  return (
    <section id="aides" className="bg-gray-50 py-32 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="mb-24">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Aides Financières (État)</h2>
          <p className="text-gray-600 text-xl max-w-2xl leading-relaxed">
            En tant qu'artisan RGE, nos prestations ouvrent droit aux dispositifs de financement pour la rénovation énergétique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="wire-box p-10 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 wire-img rounded-full mb-8">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">MaPrimeRénov’</h3>
              <p className="text-base text-gray-600 mb-10 leading-relaxed">
                Aide universelle de l'ANAH calculée selon vos revenus.
              </p>
            </div>
            <span className="text-base font-bold text-gray-900 uppercase tracking-wider">Jusqu'à 75€ / m²</span>
          </div>

          <div className="wire-box p-10 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 wire-img rounded-full mb-8">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Primes CEE</h3>
              <p className="text-base text-gray-600 mb-10 leading-relaxed">
                Prime versée par les fournisseurs d'énergie.
              </p>
            </div>
            <span className="text-base font-bold text-gray-900 uppercase tracking-wider">Cumulable</span>
          </div>

          <div className="wire-box p-10 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 wire-img rounded-full mb-8">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Éco-PTZ</h3>
              <p className="text-base text-gray-600 mb-10 leading-relaxed">
                Prêt bancaire à taux 0% pour le reste à charge.
              </p>
            </div>
            <span className="text-base font-bold text-gray-900 uppercase tracking-wider">Sans intérêts</span>
          </div>

          <div className="wire-box p-10 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 wire-img rounded-full mb-8">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">TVA Réduite</h3>
              <p className="text-base text-gray-600 mb-10 leading-relaxed">
                Taux à 5.5% au lieu de 20% directement sur facture.
              </p>
            </div>
            <span className="text-base font-bold text-gray-900 uppercase tracking-wider">Appliquée</span>
          </div>

        </div>

        <div className="mt-20 wire-box p-12 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div>
            <h4 className="text-3xl font-bold mb-4">Accompagnement Administratif Inclus</h4>
            <p className="text-lg text-gray-600">Nous montons l'intégralité de vos dossiers de subventions pour vous simplifier la vie.</p>
          </div>
          <button type="button" className="wire-btn">
            Estimer mes aides
          </button>
        </div>

      </div>
    </section>
  );
}
