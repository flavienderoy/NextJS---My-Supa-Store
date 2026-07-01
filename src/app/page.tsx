"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, animate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// DATA CONSTANTS & IMAGE URLS
// ==========================================
const EXPERTISES = [
  { id: '01', title: 'Isolation\nThermique (ITE)', desc: "L'enveloppement isolant total de la maison pour supprimer les ponts thermiques et réduire vos factures.", imgBefore: "/avant2.jpg", imgAfter: "/apres2.png" },
  { id: '02', title: 'Ravalement\nde Façade', desc: "Nettoyage en profondeur, traitement des fissures et imperméabilisation face au climat breton.", imgBefore: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop", imgAfter: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop" },
  { id: '03', title: 'Peinture\nInt. & Ext.', desc: "Finitions soignées et peintures éco-responsables pour valoriser votre patrimoine.", imgBefore: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop", imgAfter: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop" }
];

const AIDES = [
  { title: "MaPrimeRénov'", desc: "Subventions d'État jusqu'à 75€ / m² pour vos travaux d'isolation.", bigText: "75€" },
  { title: "Primes CEE", desc: "Primes Énergie cumulables directement déduites de votre devis.", bigText: "CEE" },
  { title: "Éco-PTZ", desc: "Empruntez jusqu'à 50 000€ à taux zéro pour financer le reste à charge.", bigText: "0%" },
  { title: "TVA Réduite", desc: "Bénéficiez d'une TVA avantageuse appliquée directement sur la facture.", bigText: "5.5" }
];

const REVIEWS = [
  { name: "Loïc G.", city: "Lanester", text: "Une équipe rigoureuse. L'ITE a complètement changé notre confort d'hiver. Gestion des aides au top." },
  { name: "Nathalie S.", city: "Lorient", text: "Ravalement de façade impeccable. Des artisans ponctuels et un chantier laissé parfaitement propre." }
];

const HERO_IMG = "/hero-bretagne.jpg";

// ==========================================
// CUSTOM HOOKS & WRAPPERS
// ==========================================
const MotionWrapper = ({ children, className = "", stagger = true }: { children: React.ReactNode, className?: string, stagger?: boolean }) => {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: stagger ? 0.1 : 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const MotionItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  return <motion.div variants={variants} className={className}>{children}</motion.div>;
};

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(value).toString();
        }
      }
    });
    return () => controls.stop();
  }, [from, to, duration, isInView]);

  return <span ref={nodeRef}>{from}</span>;
};

const SectionTag = ({ text, className = "" }: { text: string, className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-8 h-[1px] bg-[#FF3100]"></div>
    <span className="text-sm font-semibold text-[#FF3100] tracking-widest uppercase">{text}</span>
  </div>
);

const ParallaxImage = ({ src, alt, className = "", priority = false }: { src: string, alt: string, className?: string, priority?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`absolute inset-0 w-full h-full overflow-hidden z-0 ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[20%] -bottom-[20%] w-full h-[140%]">
        <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
      </motion.div>
    </div>
  );
};

const ArrowButton = ({ href, text, variant = "primary", className = "" }: { href: string, text: string, variant?: "primary" | "white" | "glass", className?: string }) => {
  const isPrimary = variant === "primary";
  const isWhite = variant === "white";
  const isGlass = variant === "glass";

  const baseClass = "group flex items-center justify-between gap-4 pl-6 pr-2 py-2 rounded-full font-semibold transition-all duration-300 w-fit cursor-pointer";

  let colorClass = "";
  let circleClass = "flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 group-hover:-rotate-45 shrink-0 ";

  if (isGlass) {
    colorClass = "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20";
    circleClass += "bg-white text-[#1B263B]";
  } else if (isWhite) {
    colorClass = "bg-white text-[#1B263B] hover:bg-[#F8F7F4]";
    circleClass += "bg-[#1B263B] text-white";
  } else {
    // primary
    colorClass = "bg-[#1B263B] text-white hover:bg-[#1B263B]/90";
    circleClass += "bg-white text-[#1B263B]";
  }

  return (
    <Link href={href} className={`${baseClass} ${colorClass} ${className}`}>
      <span>{text}</span>
      <div className={circleClass}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
};

const ArrowSubmitButton = ({ text, className = "" }: { text: string, className?: string }) => {
  const baseClass = "group flex items-center justify-between gap-4 pl-6 pr-2 py-2 rounded-full font-semibold transition-all duration-300 w-full cursor-pointer";
  const colorClass = "bg-white text-[#1B263B] hover:bg-[#F8F7F4]";
  const circleClass = "flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 group-hover:-rotate-45 shrink-0 bg-[#1B263B] text-white";

  return (
    <button type="submit" className={`${baseClass} ${colorClass} ${className}`}>
      <span className="mx-auto">{text}</span>
      <div className={circleClass}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </button>
  );
};


// ==========================================
// SECTIONS
// ==========================================

const Header = () => {
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }
  });

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-colors duration-300 border-b ${isAtTop
          ? "bg-transparent text-white border-transparent"
          : "bg-[#F8F7F4] text-[#1B263B] border-gray-200"
        }`}
    >
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="DT BAT" 
          width={150} 
          height={50} 
          className="w-auto h-10 transition-all duration-300"
          style={{ filter: isAtTop ? "brightness(0) invert(1)" : "none" }}
          priority
        />
      </Link>
      <nav className="hidden md:flex gap-8">
        {["Accueil", "Notre Concept", "Expertises", "Aides Financières", "Avis"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, '-').replace(/[éèê]/g, 'e')}`}
            className="font-medium nav-link"
          >
            {item}
          </Link>
        ))}
      </nav>
      <ArrowButton
        href="#contact"
        text="Devis gratuit"
        variant={isAtTop ? "glass" : "primary"}
      />
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.975]);
  const borderRadius = useTransform(scrollY, [0, 500], ["0rem", "1.5rem"]);

  return (
    <section id="accueil" className="relative w-full bg-[#F8F7F4] flex justify-center items-start">
      <motion.div
        style={{ scale, borderRadius }}
        className="relative w-full min-h-[100vh] flex flex-col justify-end pb-24 pt-32 px-6 md:px-12 origin-top overflow-hidden"
      >
        <ParallaxImage src={HERO_IMG} alt="Rénovation Bretonne" priority />
        {/* Dark gradient overlay so white text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]"></div>
        <div className="absolute inset-0 bg-black/20 z-[1]"></div>

        {/* Content */}
        <MotionWrapper className="relative z-10 w-full lg:w-1/2 flex flex-col gap-6 mt-16" stagger>
          <MotionItem className="flex flex-wrap gap-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg">Artisan RGE</span>
            <span className="bg-white/10 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg">Garantie Décennale</span>
          </MotionItem>
          <MotionItem>
            <h1 className="text-white drop-shadow-md">Rénover avec exigence, isoler avec performance.</h1>
          </MotionItem>
          <MotionItem>
            <p className="text-white/90 text-xl font-medium drop-shadow-sm pr-12">
              DT BAT réinvente l'habitat breton. Rénovation thermique globale, Isolation Thermique par l'Extérieur (ITE) et ravalement de façades à Lorient et Morbihan (56).
            </p>
          </MotionItem>
          <MotionItem className="flex flex-col sm:flex-row gap-4 mt-6">
            <ArrowButton href="#contact" text="Estimer mon projet" variant="white" />
            <ArrowButton href="#expertises" text="Voir les expertises" variant="glass" />
          </MotionItem>
        </MotionWrapper>

        {/* Floating Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-40 right-6 md:right-12 hidden lg:flex items-center gap-4 bg-black/40 border border-white/20 p-5 rounded-2xl backdrop-blur-md max-w-xs z-20 shadow-xl"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 border border-white/10">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Garanties & Sécurité</h4>
            <p className="text-xs text-white/80 mt-0.5">Décennale SMABTP & RGE Qualibat</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Concept = () => {
  return (
    <section id="notre-concept" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#F8F7F4] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

        {/* Left Col: Text (Now Right on Desktop) */}
        <MotionWrapper className="flex flex-col gap-8 order-1 lg:order-2" stagger>
          <MotionItem>
            <SectionTag text="Notre ADN" />
          </MotionItem>
          <MotionItem>
            <h2 className="text-5xl md:text-6xl font-light leading-tight text-[#1B263B]">
              L'expertise bretonne,<br />
              <span className="font-bold">la rigueur technique.</span>
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="text-[#557596] text-xl max-w-lg leading-relaxed mt-4">
              Notre conviction est simple : la rénovation énergétique ne doit pas seulement économiser de l’argent, elle doit aussi protéger durablement l’architecture face au climat breton. Basée à Lorient, DT BAT est le partenaire de confiance pour une rénovation esthétique et performante.
            </p>
          </MotionItem>
        </MotionWrapper>

        {/* Bottom Right: Stats (Now Left on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 lg:pr-12 order-2 lg:order-1">
          <MotionWrapper className="flex flex-col gap-4" stagger>
            <MotionItem>
              <div className="text-7xl md:text-8xl font-sans font-medium tracking-tighter text-[#1B263B] flex items-baseline">
                <Counter to={10} duration={2} />
                <span className="text-4xl md:text-5xl ml-1 font-light tracking-normal text-[#557596] font-sans">ans</span>
              </div>
            </MotionItem>
            <MotionItem>
              <h4 className="text-xl font-bold text-[#1B263B]">Garantie chantiers</h4>
              <p className="text-[#557596] mt-2 leading-relaxed">Une tranquillité d'esprit totale sur le long terme.</p>
            </MotionItem>
          </MotionWrapper>

          <MotionWrapper className="flex flex-col gap-4" stagger>
            <MotionItem>
              <div className="text-7xl md:text-8xl font-sans font-medium tracking-tighter text-[#1B263B] flex items-baseline">
                <Counter to={100} duration={2.5} />
                <span className="text-4xl md:text-5xl ml-1 font-light tracking-normal text-[#557596] font-sans">%</span>
              </div>
            </MotionItem>
            <MotionItem>
              <h4 className="text-xl font-bold text-[#1B263B]">Gestion des aides</h4>
              <p className="text-[#557596] mt-2 leading-relaxed">Dossiers administratifs intégralement gérés.</p>
            </MotionItem>
          </MotionWrapper>

          <MotionWrapper className="flex flex-col gap-4" stagger>
            <MotionItem>
              <div className="text-7xl md:text-8xl font-sans font-medium tracking-tighter text-[#1B263B] flex items-baseline">
                <Counter to={150} duration={3} />
                <span className="text-4xl md:text-5xl ml-1 font-light tracking-normal text-[#557596] font-sans">+</span>
              </div>
            </MotionItem>
            <MotionItem>
              <h4 className="text-xl font-bold text-[#1B263B]">Chantiers livrés</h4>
              <p className="text-[#557596] mt-2 leading-relaxed">Maisons rénovées avec succès dans le Morbihan.</p>
            </MotionItem>
          </MotionWrapper>

          <MotionWrapper className="flex flex-col gap-4" stagger>
            <MotionItem>
              <div className="text-7xl md:text-8xl font-sans font-medium tracking-tighter text-[#1B263B] flex items-baseline">
                <span className="font-sans text-[#557596] tracking-normal mr-1 text-5xl">#</span><Counter to={1} duration={1.5} />
              </div>
            </MotionItem>
            <MotionItem>
              <h4 className="text-xl font-bold text-[#1B263B]">Interlocuteur unique</h4>
              <p className="text-[#557596] mt-2 leading-relaxed">Un suivi de A à Z sans sous-traitance opaque.</p>
            </MotionItem>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

const Expertises = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Only run on desktop/tablet to avoid weird mobile scroll behaviors
    if (window.innerWidth < 768) return;

    const blocks = gsap.utils.toArray<HTMLElement>('.expertise-block');

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80px",
      end: "bottom bottom",
      pin: rightColRef.current,
      scrub: true,
      onUpdate: (self) => {
        let index = Math.floor(self.progress * EXPERTISES.length);
        if (index >= EXPERTISES.length) index = EXPERTISES.length - 1;
        setActiveIndex(index);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="expertises" ref={containerRef} className="relative hidden md:flex h-[300vh] bg-[#F8F7F4]">
      {/* Left Col (Scrolling) */}
      <div ref={leftColRef} className="w-1/2 px-12 relative z-10">
        {EXPERTISES.map((exp, i) => (
          <div key={exp.id} className="expertise-block h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTag text={`${exp.id} / Performance`} className="mb-6" />
              <h2 className="whitespace-pre-line mb-8">{exp.title}</h2>
              <p className="text-[#557596] text-xl mb-10 max-w-md">{exp.desc}</p>
              <ArrowButton href="#" text="En savoir plus" variant="primary" />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Right Col (Pinned) */}
      <div className="w-1/2 h-[calc(100vh-80px)] mt-[80px] p-6 relative">
        <div ref={rightColRef} className="w-full h-full rounded-3xl overflow-hidden relative bg-[#9CB4CC]">
          {EXPERTISES.map((exp, i) => (
            <motion.div
              key={`img-${exp.id}`}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
                scale: activeIndex === i ? 1.05 : 1,
                pointerEvents: activeIndex === i ? "auto" : "none"
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <BeforeAfterSlider beforeImage={exp.imgBefore} afterImage={exp.imgAfter} alt={exp.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertisesMobile = () => (
  <section className="md:hidden py-24 px-6 bg-[#F8F7F4]">
    <SectionTag text="Nos Expertises" className="mb-6" />
    <h2 className="mb-12">Solutions globales de rénovation</h2>
    <div className="flex flex-col gap-12">
      {EXPERTISES.map(exp => (
        <MotionWrapper key={`mob-${exp.id}`} className="flex flex-col gap-6" stagger>
          <MotionItem className="w-full h-[40vh] rounded-3xl overflow-hidden relative">
            <BeforeAfterSlider beforeImage={exp.imgBefore} afterImage={exp.imgAfter} alt={exp.title} />
          </MotionItem>
          <MotionItem>
            <SectionTag text={exp.id} className="mb-4" />
            <h3 className="whitespace-pre-line mb-4">{exp.title}</h3>
            <p className="text-[#557596] mb-6">{exp.desc}</p>
            <ArrowButton href="#" text="En savoir plus" variant="primary" className="w-full" />
          </MotionItem>
        </MotionWrapper>
      ))}
    </div>
  </section>
);

const Aides = () => (
  <section id="aides-financieres" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#F8F7F4] text-[#1B263B] overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
      
      {/* Left Col (Sticky, now Right on Desktop) */}
      <div className="lg:col-span-5 relative order-1 lg:order-2">
        <div className="sticky top-40">
          <MotionWrapper className="flex flex-col items-start" stagger>
            <MotionItem>
              <SectionTag text="Aides de l'État" className="mb-8" />
            </MotionItem>
            <MotionItem>
              <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8">
                Financer votre rénovation n'a jamais été aussi <span className="font-bold">simple.</span>
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="text-[#557596] text-lg mb-12 max-w-md">
                Oubliez la complexité administrative. Nous identifions les aides auxquelles vous êtes éligible et montons vos dossiers de A à Z.
              </p>
            </MotionItem>
            <MotionItem>
              <ArrowButton href="#contact" text="Estimer mes aides" variant="primary" />
            </MotionItem>
          </MotionWrapper>
        </div>
      </div>

      {/* Right Col (Cards, now Left on Desktop) */}
      <div className="lg:col-span-7 flex flex-col gap-8 lg:mt-32 order-2 lg:order-1">
        <MotionWrapper className="flex flex-col gap-8" stagger>
          {AIDES.map((aide, i) => (
            <MotionItem key={i} className="group relative bg-white border border-gray-100 rounded-3xl p-10 md:p-14 overflow-hidden">
              {/* Giant background typography */}
              <div className="absolute -right-8 -bottom-12 text-9xl md:text-[14rem] font-bold text-[#9CB4CC] opacity-20 pointer-events-none select-none tracking-tighter leading-none">
                {aide.bigText}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-medium mb-4">{aide.title}</h3>
                <p className="text-[#557596] text-lg leading-relaxed max-w-md">{aide.desc}</p>
              </div>
            </MotionItem>
          ))}
        </MotionWrapper>
      </div>

    </div>
  </section>
);

const UnifiedFooter = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.975, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["2.5rem", "0rem"]);

  return (
    <section ref={ref} className="w-full bg-[#F8F7F4] flex flex-col justify-end">
      <motion.div 
        style={{ scale, borderRadius }}
        className="w-full origin-bottom overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Avis Section (Light Blue) */}
        <div id="avis" className="py-24 px-6 md:px-12 bg-[#9CB4CC] text-[#1B263B]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <MotionWrapper stagger>
              <MotionItem>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-[#1B263B]"></div>
                  <span className="text-sm font-semibold text-[#1B263B] tracking-widest uppercase">Avis Clients</span>
                </div>
              </MotionItem>
              <MotionItem>
                <h2 className="mb-6 text-[#1B263B]">Ce qu'ils pensent de nous</h2>
              </MotionItem>
              <MotionItem>
                <p className="text-[#1B263B]/80 mb-12 max-w-md">Découvrez l'avis des propriétaires de Lorient et Morbihan sur nos chantiers de rénovation énergétique.</p>
              </MotionItem>
              <MotionItem className="flex gap-4">
                {/* Qualibat SVG Logo simulation */}
                <div className="h-12 flex items-center gap-2 px-4 border border-[#1B263B]/30 rounded-lg text-[#1B263B]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="font-bold text-xs tracking-widest">QUALIBAT</span>
                </div>
                {/* RGE SVG Logo simulation */}
                <div className="h-12 flex items-center gap-2 px-4 border border-[#1B263B]/30 rounded-lg text-[#1B263B]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="font-bold text-xs tracking-widest">RGE</span>
                </div>
              </MotionItem>
            </MotionWrapper>

            <MotionWrapper className="flex flex-col gap-6" stagger>
              {REVIEWS.map((review, i) => (
                <MotionItem key={i} className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-white/30">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-5 h-5 text-[#1B263B]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-xl font-medium mb-8 leading-snug">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1B263B] flex items-center justify-center text-white font-bold">{review.name.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-[#1B263B]">{review.name}</div>
                      <div className="text-sm text-[#1B263B]/70">{review.city}</div>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </MotionWrapper>
          </div>
        </div>

        {/* Footer Section (Dark Blue) */}
        <div id="contact" className="py-24 px-6 md:px-12 bg-[#1B263B] text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">

      {/* Form (Now Right on Desktop) */}
      <MotionWrapper className="order-1 md:order-2" stagger>
        <MotionItem><h2 className="mb-12">Demande de devis</h2></MotionItem>
        <MotionItem>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input type="text" placeholder="Nom Complet *" required className="bg-transparent border-b border-white/30 py-4 focus:border-white outline-none w-full placeholder-white/50" />
              <input type="tel" placeholder="Téléphone *" required className="bg-transparent border-b border-white/30 py-4 focus:border-white outline-none w-full placeholder-white/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input type="email" placeholder="Email *" required className="bg-transparent border-b border-white/30 py-4 focus:border-white outline-none w-full placeholder-white/50" />
              <input type="text" placeholder="Ville (56) *" required className="bg-transparent border-b border-white/30 py-4 focus:border-white outline-none w-full placeholder-white/50" />
            </div>
            <select className="bg-transparent border-b border-white/30 py-4 focus:border-white outline-none w-full text-white/50 appearance-none rounded-none">
              <option value="">Sélectionnez un projet *</option>
              <option value="ite" className="text-black">Isolation Thermique (ITE)</option>
              <option value="ravalement" className="text-black">Ravalement de façade</option>
              <option value="peinture" className="text-black">Peinture</option>
            </select>
            <textarea rows={4} placeholder="Votre message" className="bg-transparent border-b border-white/30 py-4 focus:border-white outline-none w-full placeholder-white/50 resize-none"></textarea>

            <ArrowSubmitButton text="Envoyer la demande" className="mt-8" />
          </form>
        </MotionItem>
      </MotionWrapper>

      {/* Info & Map (Now Left on Desktop) */}
      <MotionWrapper className="flex flex-col order-2 md:order-1" stagger>
        <MotionItem>
          <h3 className="mb-8">Agence de Lorient</h3>
          <ul className="space-y-6 text-lg text-white/80">
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#9CB4CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              7 Pl. François Mitterrand, 56100 Lorient
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#9CB4CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              07 82 67 73 21
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#9CB4CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              contact@dtbat.fr
            </li>
          </ul>
        </MotionItem>
        <MotionItem className="w-full aspect-square rounded-2xl mt-12 overflow-hidden border border-white/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.164393282431!2d-3.36440652309191!3d47.75883207120769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48105e6b4122d203%3A0xc3c5180f684cf042!2s7%20Pl.%20Fran%C3%A7ois%20Mitterrand%2C%2056100%20Lorient!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1)" }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MotionItem>
      </MotionWrapper>
    </div>

    <div className="border-t border-white/20 mt-24 pt-8 flex flex-col sm:flex-row justify-between text-sm text-white/50 max-w-7xl mx-auto gap-4">
      <div className="font-bold tracking-wider text-white">DT BAT RENOVATION</div>
      <div className="flex gap-8">
        <Link href="#" className="hover:text-white transition-colors">Mentions Légales</Link>
        <span>&copy; 2026 DT BAT. Tous droits réservés.</span>
      </div>
    </div>
        </div>
      </motion.div>
    </section>
  );
};

// ==========================================
// MAIN EXPORT & FLOATING CTA
// ==========================================

const FloatingCTA = () => {
  const { scrollY } = useScroll();
  const [isHero, setIsHero] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.7 : 500;
    setIsHero(latest < threshold);
  });

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed bottom-8 right-8 z-50 hidden md:block"
    >
      <div
        className={`relative flex flex-col gap-5 p-6 rounded-3xl shadow-2xl transition-colors duration-500 w-80 ${isHero
            ? "bg-black/30 backdrop-blur-md border border-white/20 text-white"
            : "bg-[#F8F7F4] border border-gray-200 text-[#1B263B]"
          }`}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <svg className={`w-4 h-4 ${isHero ? "text-white/60 hover:text-white" : "text-[#557596] hover:text-[#1B263B]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          <h4 className="font-bold text-lg mb-2 pr-6 leading-tight">Projet de rénovation dans le Morbihan ?</h4>
          <p className={`text-sm ${isHero ? "text-white/80" : "text-[#557596]"}`}>
            Bénéficiez d'une isolation thermique haute performance et déléguez-nous la gestion complète de vos aides financières.
          </p>
        </div>
        <ArrowButton
          href="#contact"
          text="Mon devis gratuit"
          variant={isHero ? "white" : "primary"}
          className="w-full"
        />
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Expertises />
        <ExpertisesMobile />
        <Aides />
        <UnifiedFooter />
      </main>
      <FloatingCTA />
    </>
  );
}
