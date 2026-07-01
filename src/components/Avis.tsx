export default function Avis() {
  return (
    <section id="avis" className="bg-white py-32 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-bold mb-10">Avis Clients</h2>
          <p className="text-gray-600 mb-12 text-xl leading-relaxed">
            Découvrez l'avis des propriétaires de Lorient et Morbihan sur nos chantiers.
          </p>
          <div className="flex gap-8">
            <div className="w-28 h-20 wire-img text-xs flex-col gap-2">
              <span>LOGO</span>
              <span className="font-bold">QUALIBAT</span>
            </div>
            <div className="w-28 h-20 wire-img text-xs flex-col gap-2">
              <span>LOGO</span>
              <span className="font-bold">RGE</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-10">
          
          <div className="wire-box p-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <span className="font-bold text-xl text-gray-900">Loïc G. - Lanester</span>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              "Excellente prestation pour l'ITE de notre maison. Économies visibles dès le premier hiver et finitions parfaites."
            </p>
          </div>

          <div className="wire-box p-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <span className="font-bold text-xl text-gray-900">Nathalie S. - Lorient</span>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              "Ravalement très propre. Le chef d'équipe était disponible pour répondre à nos questions. Artisan de confiance à recommander."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
