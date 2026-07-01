"use client";

import { useEffect, useRef, useState } from 'react';

export default function Expertises() {
  const [activeStep, setActiveStep] = useState<string>('ite');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const textBlocks = document.querySelectorAll(".step-text-block");

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0.15
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const step = entry.target.getAttribute("data-step");
          if (step) {
            setActiveStep(step);
          }
        }
      });
    }, observerOptions);

    textBlocks.forEach(block => observerRef.current?.observe(block));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="expertises" className="bg-white py-32 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="mb-24">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-6">Nos Expertises</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Solutions globales de rénovation
          </h2>
          <p className="text-gray-600 max-w-2xl text-xl leading-relaxed">
            Défilez pour découvrir nos trois domaines d'intervention.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20 items-start pb-24">
          
          <div className="flex flex-col gap-[40vh] py-12 lg:pb-[30vh]">
            
            <div data-step="ite" className={`step-text-block transition-opacity duration-300 flex flex-col justify-center scroll-mt-40 ${activeStep === 'ite' ? 'opacity-100' : 'opacity-40'}`}>
              <span className="text-gray-500 text-sm font-bold uppercase mb-6 block tracking-widest">01 / Performance</span>
              <h3 className="text-4xl font-bold mb-8">Isolation Thermique (ITE)</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                Enveloppez votre maison d'un manteau isolant. Suppression des ponts thermiques sans toucher à la surface intérieure.
              </p>
              <button type="button" className="wire-btn-outline self-start">
                En savoir plus
              </button>
            </div>

            <div data-step="facade" className={`step-text-block transition-opacity duration-300 flex flex-col justify-center scroll-mt-40 ${activeStep === 'facade' ? 'opacity-100' : 'opacity-40'}`}>
              <span className="text-gray-500 text-sm font-bold uppercase mb-6 block tracking-widest">02 / Protection</span>
              <h3 className="text-4xl font-bold mb-8">Ravalement de Façade</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                Nettoyage, traitement anti-mousse et réparation des fissures. Application de revêtements hydrofuges et enduits protecteurs.
              </p>
              <button type="button" className="wire-btn-outline self-start">
                En savoir plus
              </button>
            </div>

            <div data-step="peinture" className={`step-text-block transition-opacity duration-300 flex flex-col justify-center scroll-mt-40 ${activeStep === 'peinture' ? 'opacity-100' : 'opacity-40'}`}>
              <span className="text-gray-500 text-sm font-bold uppercase mb-6 block tracking-widest">03 / Esthétique</span>
              <h3 className="text-4xl font-bold mb-8">Peinture Int. & Ext.</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                Finitions soignées pour façades, boiseries et intérieurs. Peintures éco-responsables et préparation minutieuse des supports.
              </p>
              <button type="button" className="wire-btn-outline self-start">
                En savoir plus
              </button>
            </div>

          </div>

          <div className="sticky top-40 h-[50vh] w-full border border-gray-300 bg-gray-50 p-6 shadow-sm">
            <div className="relative w-full h-full">
              
              {/* Visual Layer 1: Isolation ITE */}
              <div className={`absolute inset-0 transition-opacity duration-300 wire-img flex-col gap-6 ${activeStep === 'ite' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <div>
                  <span className="text-2xl font-bold text-gray-900 block mb-3">[ VISUEL ISOLATION ITE ]</span>
                  <span className="text-base font-normal text-gray-500">Coupe technique du mur isolant</span>
                </div>
              </div>
              
              {/* Visual Layer 2: Ravalement */}
              <div className={`absolute inset-0 transition-opacity duration-300 wire-img flex-col gap-6 ${activeStep === 'facade' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="text-2xl font-bold text-gray-900 block mb-3">[ VISUEL RAVALEMENT ]</span>
                  <span className="text-base font-normal text-gray-500">Avant / Après façade réparée</span>
                </div>
              </div>
              
              {/* Visual Layer 3: Peinture */}
              <div className={`absolute inset-0 transition-opacity duration-300 wire-img flex-col gap-6 ${activeStep === 'peinture' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div>
                  <span className="text-2xl font-bold text-gray-900 block mb-3">[ VISUEL PEINTURE ]</span>
                  <span className="text-base font-normal text-gray-500">Nuancier et application peinture</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 text-sm text-gray-400">
        <span className="font-bold text-gray-500">Note technique :</span> Section interactive Sticky Scroll (Animation React via IntersectionObserver)
      </div>
    </section>
  );
}
