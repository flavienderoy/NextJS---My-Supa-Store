import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="py-32 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start">
          <div className="flex gap-4 mb-10">
            <span className="inline-block px-4 py-2 border border-gray-300 text-xs font-bold text-gray-600 uppercase tracking-wider">
              Artisan RGE
            </span>
            <span className="inline-block px-4 py-2 border border-gray-300 text-xs font-bold text-gray-600 uppercase tracking-wider">
              Garantie Décennale
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
            Rénover avec exigence,<br />
            isoler avec performance.
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-xl">
            DT BAT réinvente l'habitat breton. Rénovation thermique globale, Isolation Thermique par l'Extérieur (ITE) et ravalement de façades à Lorient et Morbihan (56).
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="#contact" className="wire-btn">
              Estimer mon projet
            </Link>
            <Link href="#expertises" className="wire-btn-outline">
              Voir les expertises
            </Link>
          </div>
        </div>

        <div className="w-full aspect-video lg:aspect-square wire-img rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-lg font-bold">[ VISUEL PRINCIPAL HERO ]</span>
            <span className="text-sm font-normal">Image de maison ou équipe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
