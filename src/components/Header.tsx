import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl tracking-tighter text-gray-900 pointer-events-auto">
          [ LOGO DT BAT ]
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-gray-900 transition-colors">Accueil</Link>
          <Link href="#concept" className="hover:text-gray-900 transition-colors">Notre Concept</Link>
          <Link href="#expertises" className="hover:text-gray-900 transition-colors">Expertises</Link>
          <Link href="#aides" className="hover:text-gray-900 transition-colors">Aides Financières</Link>
          <Link href="#avis" className="hover:text-gray-900 transition-colors">Avis</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#contact" className="hidden sm:inline-block wire-btn py-3 px-6">
            Devis gratuit
          </Link>
          <button className="md:hidden p-2 text-gray-900" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
