'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Gift, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  Globe, 
  ChevronRight, 
  ChevronLeft,
  X,
  DollarSign,
  Download,
  Box,
  Percent,
  BookOpen
} from 'lucide-react';

interface BonusSectionProps {
  isLoggedIn: boolean;
  setShowLoginModal: (show: boolean) => void;
  hideHeader?: boolean;
  variant?: 'grid' | 'carousel';
}

// SECTION 1: Standard "Bônus" (The 2 New Guides from public/bonus 1)
export function BonusSection({ 
  isLoggedIn, 
  setShowLoginModal, 
  hideHeader = false,
  variant = 'grid' 
}: BonusSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  const isCarousel = variant === 'carousel';

  const containerClass = isCarousel 
    ? "no-scrollbar flex overflow-x-auto gap-3 -mx-4 px-4 py-1 w-full scroll-smooth"
    : "w-full max-w-[343px] md:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5 px-1";

  const cardClass = isCarousel
    ? "w-[240px] flex-shrink-0 glass-card rounded-2xl overflow-hidden flex flex-col border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 group shadow-xl"
    : "glass-card rounded-2xl overflow-hidden flex flex-col border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 group shadow-xl";

  return (
    <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out] my-2">
      
      {/* Title Header with Nav Buttons */}
      <div className="w-full max-w-[343px] md:max-w-4xl flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-[#ff7f1a]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
            Bônus
          </h2>
        </div>

        {isCarousel && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollLeft}
              className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer shadow-sm"
              aria-label="Navegar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer shadow-sm"
              aria-label="Navegar para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bonus Container */}
      <div ref={isCarousel ? scrollRef : undefined} className={containerClass}>

        {/* NEW BONUS 1: Guia Rápido Como Vender */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-guia-lucrar-luminarias.webp"
              alt="Guia Rápido para Lucrar com Luminárias 3D"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/90 border border-amber-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              📈 E-BOOK VENDAS
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-amber-400 transition-colors leading-snug">
                Guia Rápido: Como Vender Luminárias 3D
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Aprenda a vender online no Mercado Livre, Shopee e Instagram mesmo do zero.
              </p>
            </div>

            <a
              href="/bonus 1/Como vender.pdf"
              download="Guia-Como-Vender-Luminarias-3D.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Download className="w-3.5 h-3.5 text-zinc-950" />
              Baixar PDF (Vendas)
            </a>
          </div>
        </div>

        {/* NEW BONUS 2: Guia Técnico Como Imprimir */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-guia-imprimir-luminarias.webp"
              alt="Guia Técnico: Como Imprimir Luminárias 3D"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              🖨️ GUIA IMPRESSÃO
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors leading-snug">
                Guia Técnico: Como Imprimir Luminárias 3D
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Passo a passo com configurações de fatiador, retração, temperatura e acabamento.
              </p>
            </div>

            <a
              href="/bonus 1/Como Imprimir.pdf"
              download="Guia-Como-Imprimir-Luminarias-3D.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 rounded-xl bg-cyan-500 text-zinc-950 hover:bg-cyan-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Download className="w-3.5 h-3.5 text-zinc-950" />
              Baixar PDF (Impressão)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// SECTION 2: "Bônus Exclusivos VIP" (All VIP Drive Packs & Tools)
export function BonusVIPSection({ 
  isLoggedIn, 
  setShowLoginModal, 
  hideHeader = false,
  variant = 'grid' 
}: BonusSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // 4-Day Secret Bonus Timer Logic
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isSecretLocked, setIsSecretLocked] = useState<boolean>(true);
  const [showLockedModal, setShowLockedModal] = useState<boolean>(false);

  // 7-Day Top Luminárias Timer Logic
  const [topTimeRemaining, setTopTimeRemaining] = useState<number>(0);
  const [isTopLocked, setIsTopLocked] = useState<boolean>(true);
  const [showTopLockedModal, setShowTopLockedModal] = useState<boolean>(false);

  useEffect(() => {
    const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000;
    let unlockTime = localStorage.getItem('bonus_secreto_unlock_timestamp');

    if (!unlockTime) {
      const futureTime = Date.now() + FOUR_DAYS_MS;
      localStorage.setItem('bonus_secreto_unlock_timestamp', futureTime.toString());
      unlockTime = futureTime.toString();
    }

    const targetTimestamp = parseInt(unlockTime, 10);

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setIsSecretLocked(false);
        setTimeRemaining(0);
      } else {
        setIsSecretLocked(true);
        setTimeRemaining(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    let unlockTime = localStorage.getItem('bonus_top_luminarias_unlock_timestamp');

    if (!unlockTime) {
      const futureTime = Date.now() + SEVEN_DAYS_MS;
      localStorage.setItem('bonus_top_luminarias_unlock_timestamp', futureTime.toString());
      unlockTime = futureTime.toString();
    }

    const targetTimestamp = parseInt(unlockTime, 10);

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setIsTopLocked(false);
        setTopTimeRemaining(0);
      } else {
        setIsTopLocked(true);
        setTopTimeRemaining(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // State for 3D Pricing Calculator
  const [filamentWeight, setFilamentWeight] = useState<number>(120);
  const [filamentPrice, setFilamentPrice] = useState<number>(110);
  const [printHours, setPrintHours] = useState<number>(6);
  const [powerWatts, setPowerWatts] = useState<number>(150);
  const [kwhPrice, setKwhPrice] = useState<number>(0.85);
  const [profitMargin, setProfitMargin] = useState<number>(100);

  const materialCost = (filamentWeight / 1000) * filamentPrice;
  const energyCost = (printHours * (powerWatts / 1000)) * kwhPrice;
  const maintenanceCost = printHours * 1.5;
  const baseCost = materialCost + energyCost + maintenanceCost;
  const finalPrice = baseCost * (1 + profitMargin / 100);
  const netProfit = finalPrice - baseCost;

  const secretSitesList = [
    { name: "Printables by Prusa", url: "https://www.printables.com", desc: "A maior comunidade de modelos 3D grátis de altíssima qualidade com selo de verificação de testes." },
    { name: "Cults3D", url: "https://cults3d.com", desc: "Plataforma francesa líder em modelos 3D artísticos, luminárias, geek e projetos criativos." },
    { name: "MyMiniFactory", url: "https://www.myminifactory.com", desc: "Especializado em colecionáveis, miniaturas de RPG e esculturas 3D pré-suportadas." },
    { name: "Thingiverse", url: "https://www.thingiverse.com", desc: "O acervo histórico da MakerBot com milhões de arquivos STL 100% gratuitos." },
    { name: "CGTrader", url: "https://www.cgtrader.com", desc: "Gigante internacional com modelos 3D profissionais para engenharia, arquitetura e impressão." },
    { name: "Yeggi 3D Search Engine", url: "https://www.yeggi.com", desc: "O maior buscador do mundo que varre mais de 25 repositórios de arquivos STL simultaneamente." },
    { name: "Thangs 3D", url: "https://thangs.com", desc: "Ferramenta avançada de busca geométrica e colaboração 3D." },
    { name: "Gambody", url: "https://www.gambody.com", desc: "Loja especializada em réplicas 3D ultradetalhadas de filmes, games e cultura pop." },
    { name: "GrabCAD Library", url: "https://grabcad.com/library", desc: "Comunidade de engenheiros com arquivos CAD, STEP e STL industriais de alta fidelidade." },
    { name: "Instructables 3D", url: "https://www.instructables.com", desc: "Projetos completos passo a passo com robótica, eletrônica e impressão 3D." },
    { name: "Pinshape", url: "https://pinshape.com", desc: "Comunidade com foco em utensílios domésticos, brinquedos e acessórios para escritório." },
    { name: "Sketchfab 3D", url: "https://sketchfab.com", desc: "Plataforma interativa para visualização e download de modelos 3D escaneados." },
    { name: "TurboSquid", url: "https://www.turbosquid.com", desc: "Biblioteca profissional de ativos 3D para designers e prototipagem." },
    { name: "Free3D", url: "https://free3d.com", desc: "Repositório leve com milhares de modelos livres em formatos STL e OBJ." },
    { name: "Patreon 3D Makers Hub", url: "https://www.patreon.com", desc: "Comunidade dos criadores independentes mais talentosos com lançamentos mensais." }
  ];

  const profitableNiches = [
    "1. Luminárias Decorativas & Abajures 3D (Altíssima Margem)",
    "2. Setup Gamer (Suportes de Headset, Controles & Organizadores)",
    "3. Vasos Facetados & Cachepots Autorrigáveis",
    "4. Moldes & Cortadores de Biscoito Personalizados",
    "5. Action Figures & Colecionáveis Geek",
    "6. Peças de Reposição Automotivas & Acessórios de Carro",
    "7. Porta-Canetas & Utensílios de Escritório Modulares",
    "8. Itens de Cosplay & Máscaras Temáticas",
    "9. Suportes Ergonômicos para Notebook & Celulares",
    "10. Acessórios para Café (Porta-Cápsulas e Dosadores)",
    "11. Miniaturas & Cenários de RPG de Mesa",
    "12. Moldes para Saboaria & Vela Artesanal",
    "13. Chaveiros & Brindes Corporativos Personalizados",
    "14. Enfeites & Topos de Bolo de Aniversário",
    "15. Artigos Pet (Tag Coleira e Comedouros Elevados)",
    "16. Quadros e Placas com Relevo Topográfico 3D",
    "17. Acessórios de Fotografia (Parasóis e Adaptadores)",
    "18. Organizadores de Gaveta & Caixas de Ferramentas",
    "19. Puxadores e Ganchos Decorativos para Móveis",
    "20. Troféus & Medalhas Esportivas Personalizadas",
    "21. Caixas e Estojos para Instrumentos Musicais",
    "22. Peças para Drones e Aeromodelismo",
    "23. Brinquedos Educativos e Quebra-Cabeças Geométricos"
  ];

  const isCarousel = variant === 'carousel';

  const containerClass = isCarousel 
    ? "no-scrollbar flex overflow-x-auto gap-3 -mx-4 px-4 py-1 w-full scroll-smooth"
    : "w-full max-w-[343px] md:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5 px-1";

  const cardClass = isCarousel
    ? "w-[240px] flex-shrink-0 glass-card rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-orange-500/40 transition-all duration-300 group shadow-xl"
    : "glass-card rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-orange-500/40 transition-all duration-300 group shadow-xl";

  return (
    <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out] my-2">
      
      {/* Title Header with Nav Buttons */}
      <div className="w-full max-w-[343px] md:max-w-4xl flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-[#ff7f1a]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
            Bônus Exclusivos
          </h2>
        </div>

        {isCarousel && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollLeft}
              className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer shadow-sm"
              aria-label="Navegar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer shadow-sm"
              aria-label="Navegar para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bonus VIP Container */}
      <div ref={isCarousel ? scrollRef : undefined} className={containerClass}>

        {/* BONUS 1: BONUS SECRETO 90K STL (4-DAY LOCK TIMER) */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-secreto-90k.webp"
              alt="Bônus Secreto Oficina 3D +90K STL"
              fill
              className={`object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 ${isSecretLocked ? 'grayscale opacity-75' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            
            {isSecretLocked ? (
              <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-950/90 border border-amber-500/50 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg flex items-center gap-1 animate-pulse">
                <Lock className="w-3 h-3 text-amber-400" />
                DESBLOQUEIA EM {formatTime(timeRemaining)}
              </span>
            ) : (
              <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/90 border border-emerald-500/50 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                BÔNUS LIBERADO!
              </span>
            )}
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/80 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-black text-cyan-300 tracking-wide leading-snug flex items-center gap-1">
                {isSecretLocked && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                Oficina 3D — Acervo +90.000 STL
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                {isSecretLocked 
                  ? `Bônus trancado temporariamente. Será liberado em ${formatTime(timeRemaining)}.` 
                  : 'Todos os arquivos separados e organizados em pastas no portal exclusivo.'}
              </p>
            </div>

            {isSecretLocked ? (
              <button
                onClick={() => setShowLockedModal(true)}
                className="w-full h-10 rounded-xl bg-zinc-800/80 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Trancado (Libera em 4 Dias)
              </button>
            ) : (
              <a
                href="https://acesso-oficina3dstlpro.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                Acessar Portal +90K →
              </a>
            )}
          </div>
        </div>

        {/* BONUS 2: Top Luminárias 3D STL (7-DAY LOCK TIMER) */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-top-luminarias.webp"
              alt="Top Luminárias 3D STL"
              fill
              className={`object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 ${isTopLocked ? 'grayscale opacity-75' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            
            {isTopLocked ? (
              <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-950/90 border border-amber-500/50 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg flex items-center gap-1 animate-pulse">
                <Lock className="w-3 h-3 text-amber-400" />
                DESBLOQUEIA EM {formatTime(topTimeRemaining)}
              </span>
            ) : (
              <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/90 border border-amber-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
                💡 TOP LUMINÁRIAS
              </span>
            )}
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-amber-400 transition-colors leading-snug flex items-center gap-1">
                {isTopLocked && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                Top Luminárias 3D STL
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                {isTopLocked
                  ? `Acervo no Drive trancado. Será liberado em ${formatTime(topTimeRemaining)}.`
                  : 'Pasta completa no Drive com mais de 250 modelos 3D de luminárias e abajures.'}
              </p>
            </div>

            {isTopLocked ? (
              <button
                onClick={() => setShowTopLockedModal(true)}
                className="w-full h-10 rounded-xl bg-zinc-800/80 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Trancado (Libera em 7 Dias)
              </button>
            ) : (
              <a
                href="https://drive.google.com/drive/folders/1_WtKIT9raCWa2CP2jIqqVnW6mV6MMfph?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                Acessar no Drive <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
              </a>
            )}
          </div>
        </div>

        {/* BONUS 3: 15 Sites Secretos */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-15-sites.webp"
              alt="15 Sites Secretos Modelos 3D"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              🌟 LISTA EXCLUSIVA
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors leading-snug">
                15 Sites Secretos de Modelos 3D
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Guia em E-book PDF com os melhores repositórios para baixar arquivos STL inéditos.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <a
                href="/bonus/15-sites-secretos.pdf"
                download="15-Sites-Secretos-Modelos-3D.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-9 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <Download className="w-3.5 h-3.5 text-zinc-950" />
                Baixar PDF
              </a>

              <button
                onClick={() => setActiveModal('sites')}
                className="w-full h-8 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Globe className="w-3 h-3" />
                Ver no App
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* BONUS 4: 23 Nichos Lucrativos */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-23-nichos.webp"
              alt="23 Nichos Mais Lucrativos 3D"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/90 border border-amber-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              🏆 GUIA DOURADO
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-amber-400 transition-colors leading-snug">
                23 Nichos Mais Lucrativos 3D
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                E-book estratégico sobre os segmentos mais rentáveis de impressão 3D em 2026.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <a
                href="/bonus/23-nichos-lucrativos.pdf"
                download="Guia-23-Nichos-Lucrativos-3D-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-9 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <Download className="w-3.5 h-3.5 text-zinc-950" />
                Baixar PDF
              </a>

              <button
                onClick={() => setActiveModal('nichos')}
                className="w-full h-8 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <TrendingUp className="w-3 h-3" />
                Ver no App
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* BONUS 5: Precificação 3D */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-precificacao.webp"
              alt="Precificação 3D Guia Definitivo"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-orange-300 bg-orange-950/90 border border-orange-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              🧮 PRECIFICAÇÃO
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-[#ff7f1a] transition-colors leading-snug">
                Precificação 3D — Guia & Calc.
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Guia em PDF + Calculadora interativa para precificar filamento e margem.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="/bonus/calculadora-precificacao.pdf"
                  download="Guia-Precificacao-3D-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 rounded-xl bg-[#ff7f1a] text-zinc-950 hover:bg-orange-400 text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Download className="w-3 h-3 text-zinc-950" />
                  PDF
                </a>

                <a
                  href="https://3dprime.com.br/calculadora-de-custo-de-impressao-3d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 rounded-xl bg-zinc-900 border border-[#ff7f1a]/40 text-[#ff7f1a] hover:bg-[#ff7f1a]/10 text-[10px] font-bold flex items-center justify-center gap-0.5 transition-all cursor-pointer"
                >
                  Online <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <button
                onClick={() => setActiveModal('calculadora')}
                className="w-full h-8 rounded-xl bg-[#ff7f1a]/10 hover:bg-[#ff7f1a]/20 border border-[#ff7f1a]/30 text-[#ff7f1a] text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Calculator className="w-3 h-3" />
                Calc no App
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* BONUS 6: +100 Arquivos Famosos de Decoração STL */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-100-decoracao.webp"
              alt="+100 Arquivos Famosos de Decoração STL"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-rose-300 bg-rose-950/90 border border-rose-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              ✨ DECORAÇÃO PREMIUM
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-rose-400 transition-colors leading-snug">
                +100 Decoração Famosos STL
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Acervo exclusivo com esculturas, quadros, suportes e peças decorativas.
              </p>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1RWTQn27b-7KnM4SXoo0kWWq1bADrcrXz?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-xl bg-rose-500 text-zinc-950 hover:bg-rose-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-rose-500/10"
            >
              Acessar no Drive <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
            </a>
          </div>
        </div>

        {/* BONUS 7: +120 STL Vasos 3D Validados */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-120-vasos.webp"
              alt="+120 STL Vasos 3D Validados"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              🪴 VASOS APROVADOS
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors leading-snug">
                +120 Vasos 3D Validados STL
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Coleção com 120 vasos facetados e espirais prontos para impressão 3D.
              </p>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1dq5ou4MjAOsWPnQ4D5I9dffyp_w88sFo?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              Acessar Vasos <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
            </a>
          </div>
        </div>

        {/* BONUS 8: +100 Carros Famosos 3D STL */}
        <div className={cardClass}>
          <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
            <Image
              src="/images/bonus/bonus-100-carros.webp"
              alt="+100 Carros Famosos 3D STL"
              fill
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-3 left-3 z-20 text-[9px] font-extrabold uppercase tracking-wider text-blue-300 bg-blue-950/90 border border-blue-500/40 px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg">
              🏎️ CARROS FAMOSOS
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">
                +100 Carros Famosos 3D STL
              </h3>
              <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                Réplicas 3D de supercarros, corrida e veículos icônicos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <a
                href="https://drive.google.com/drive/folders/1s7-9_YVy_LuS-galrP1mNVeYp735GnqQ"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 rounded-xl bg-blue-600 text-white hover:bg-blue-500 text-[10px] font-bold flex items-center justify-center gap-0.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-blue-500/10"
              >
                Drive 1 <ExternalLink className="w-3 h-3 text-white" />
              </a>

              <a
                href="https://drive.google.com/drive/folders/1x8y9bJOxa7iCUyTuCdhgSp_Q4e2TZT4q"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 rounded-xl bg-zinc-900 border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 text-[10px] font-bold flex items-center justify-center gap-0.5 transition-all active:scale-95 cursor-pointer"
              >
                Drive 2 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL 1: 15 Sites Secretos */}
      {activeModal === 'sites' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg bg-zinc-900 border border-emerald-500/30 rounded-2xl p-5 space-y-4 max-h-[85vh] flex flex-col shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Globe className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-100">15 Sites Secretos de Modelos 3D</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {secretSitesList.map((site, index) => (
                <div key={index} className="p-3 rounded-xl bg-zinc-950 border border-white/5 space-y-1 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 text-[10px] flex items-center justify-center border border-emerald-500/30">
                        {index + 1}
                      </span>
                      {site.name}
                    </span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-zinc-300 hover:text-emerald-400 flex items-center gap-1 bg-zinc-900 border border-white/10 px-2.5 py-1 rounded-lg"
                    >
                      Acessar <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal pl-6">
                    {site.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <a
                href="/bonus/15-sites-secretos.pdf"
                download="15-Sites-Secretos-Modelos-3D.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Baixar E-book PDF
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 23 Nichos Lucrativos */}
      {activeModal === 'nichos' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg bg-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 max-h-[85vh] flex flex-col shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <TrendingUp className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-100">23 Nichos Mais Lucrativos na Impressão 3D</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {profitableNiches.map((niche, index) => (
                <div key={index} className="p-3 rounded-xl bg-zinc-950 border border-white/5 text-xs font-semibold text-zinc-200 flex items-center gap-2 hover:border-amber-500/30 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {niche}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <a
                href="/bonus/23-nichos-lucrativos.pdf"
                download="Guia-23-Nichos-Lucrativos-3D-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Baixar PDF Guia
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Calculadora de Precificação */}
      {activeModal === 'calculadora' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-zinc-900 border border-[#ff7f1a]/40 rounded-2xl p-5 space-y-4 max-h-[90vh] flex flex-col shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#ff7f1a]">
                <Calculator className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-100">Calculadora de Precificação 3D</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              
              {/* Material */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    <Box className="w-3 h-3 text-[#ff7f1a]" />
                    Peso Filamento (g):
                  </label>
                  <input
                    type="number"
                    value={filamentWeight}
                    onChange={(e) => setFilamentWeight(Number(e.target.value))}
                    className="w-full h-9 bg-zinc-950 border border-white/10 rounded-xl px-3 text-zinc-100 font-bold focus:border-[#ff7f1a] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-[#ff7f1a]" />
                    Preço Carretel (R$/kg):
                  </label>
                  <input
                    type="number"
                    value={filamentPrice}
                    onChange={(e) => setFilamentPrice(Number(e.target.value))}
                    className="w-full h-9 bg-zinc-950 border border-white/10 rounded-xl px-3 text-zinc-100 font-bold focus:border-[#ff7f1a] focus:outline-none"
                  />
                </div>
              </div>

              {/* Time & Energy */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    Tempo de Impressão (h):
                  </label>
                  <input
                    type="number"
                    value={printHours}
                    onChange={(e) => setPrintHours(Number(e.target.value))}
                    className="w-full h-9 bg-zinc-950 border border-white/10 rounded-xl px-3 text-zinc-100 font-bold focus:border-[#ff7f1a] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    <Percent className="w-3 h-3 text-[#ff7f1a]" />
                    Margem de Lucro (%):
                  </label>
                  <input
                    type="number"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(Number(e.target.value))}
                    className="w-full h-9 bg-zinc-950 border border-white/10 rounded-xl px-3 text-zinc-100 font-bold focus:border-[#ff7f1a] focus:outline-none"
                  />
                </div>
              </div>

              {/* Breakdown Box */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 space-y-2 text-[10px] font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Custo de Filamento:</span>
                  <span className="text-zinc-200">R$ {materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Custo de Energia ({printHours}h @ {powerWatts}W):</span>
                  <span className="text-zinc-200">R$ {energyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxa Manutenção / Máquina:</span>
                  <span className="text-zinc-200">R$ {maintenanceCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-300 pt-1 border-t border-white/5">
                  <span>Custo Total de Produção:</span>
                  <span>R$ {baseCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Final Result Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-950/60 to-amber-950/60 border border-[#ff7f1a]/40 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff7f1a]">
                  Preço Sugerido de Venda
                </span>
                <div className="text-2xl font-black text-white">
                  R$ {finalPrice.toFixed(2)}
                </div>
                <p className="text-[10px] text-emerald-400 font-bold">
                  Lucro Líquido: +R$ {netProfit.toFixed(2)} ({profitMargin}%)
                </p>
              </div>

            </div>

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <a
                href="/bonus/calculadora-precificacao.pdf"
                download="Guia-Precificacao-3D-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#ff7f1a] text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-zinc-950" /> Baixar PDF
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Bônus Secreto Trancado */}
      {showLockedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-sm bg-zinc-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 text-center shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-100">Bônus Secreto Trancado</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Este portal exclusivo com mais de <strong className="text-cyan-400">+90.000 arquivos STL</strong> é liberado automaticamente 4 dias após seu primeiro acesso!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30 font-mono text-amber-400 font-bold text-xs">
              ⏳ Libera em: {formatTime(timeRemaining)}
            </div>

            <button
              onClick={() => setShowLockedModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Bônus Top Luminárias 3D STL Trancado */}
      {showTopLockedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-sm bg-zinc-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 text-center shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-100">Top Luminárias 3D STL Trancado</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Este acervo exclusivo com mais de <strong className="text-amber-400">250 modelos 3D no Drive</strong> é liberado automaticamente 7 dias após seu primeiro acesso!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30 font-mono text-amber-400 font-bold text-xs">
              ⏳ Libera em: {formatTime(topTimeRemaining)}
            </div>

            <button
              onClick={() => setShowTopLockedModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default BonusSection;
