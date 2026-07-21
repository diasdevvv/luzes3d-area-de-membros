'use client';

import React, { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Box, Download, Heart, Tag, AlertTriangle, KeyRound, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import ModelCard, { ModelData } from '@/components/ModelCard';
import { useFavorites } from '@/hooks/useFavorites';
import modelsDataRaw from '@/data/models.json';

const modelsData = modelsDataRaw as ModelData[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ModelDetailPage({ params }: PageProps) {
  // Unwrap Next.js 15+ params
  const { slug } = use(params);
  
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [modalError, setModalError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Favorites logic
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find model by slug
  const model = useMemo(() => {
    return modelsData.find((m) => m.slug === slug);
  }, [slug]);

  // Sync login status
  useEffect(() => {
    const checkPremium = () => {
      const isPremium = localStorage.getItem('aether_premium_user') === 'true';
      setIsPremiumUser(isPremium);
    };
    checkPremium();
    window.addEventListener('storage', checkPremium);
    return () => window.removeEventListener('storage', checkPremium);
  }, []);

  // Filter related models (same category, excluding current model)
  const relatedModels = useMemo(() => {
    if (!model) return [];
    return modelsData
      .filter((m) => m.categoria === model.categoria && m.id !== model.id)
      .slice(0, 4);
  }, [model]);

  if (!model) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center text-zinc-100">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
        <h2 className="text-sm font-bold">Modelo não encontrado</h2>
        <Link href="/" className="mt-4 px-5 py-2 rounded-full bg-[#ff7f1a] text-zinc-950 font-bold text-xs">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  const images = model.imagens && model.imagens.length > 0 ? model.imagens : [model.thumbnailUrl];

  const handleDownloadClick = async () => {
    if (!isPremiumUser) {
      setShowAuthModal(true);
      return;
    }

    if (model.isDriveOnly) {
      const targetUrl = model.driveUrl || "https://drive.google.com/drive/folders/1av-7-0sjreIW1_BNaI0nkWHTA37qnUUd?usp=sharing";
      window.open(targetUrl, '_blank', 'noopener,noreferrer');

      // Confetti Celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.85 },
        colors: ['#ff7f1a', '#f59e0b', '#ffffff']
      });
      return;
    }

    setIsDownloading(true);
    setDownloadError('');

    try {
      // Fetch signed premium download URL
      const res = await fetch(`/api/download/${model.id}/sign`, {
        headers: {
          'Authorization': 'Bearer AETHER_PRO_KEY'
        }
      });

      if (!res.ok) {
        throw new Error('Erro ao obter autorização de download.');
      }

      const data = await res.json();
      
      // Fetch the binary file blob directly to enforce clean filename in all browsers
      const fileRes = await fetch(data.downloadUrl);
      if (!fileRes.ok) {
        throw new Error('Erro ao transferir o arquivo 3D.');
      }

      const blob = await fileRes.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const cleanFileName = `${model.nome}.zip`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', cleanFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);

      // Confetti Celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.85 },
        colors: ['#ff7f1a', '#f59e0b', '#ffffff']
      });

    } catch (err: any) {
      setDownloadError(err.message || 'Falha ao processar download.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim() === 'AETHER2026') {
      setIsPremiumUser(true);
      localStorage.setItem('aether_premium_user', 'true');
      setShowAuthModal(false);
      setModalError('');
      setAccessCode('');
      
      window.dispatchEvent(new Event('storage'));

      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#ff7f1a', '#ffffff']
      });
    } else {
      setModalError('Código inválido. Use "AETHER2026" para testar.');
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-zinc-950 pb-28 flex flex-col items-center">
      {/* Centered layout on desktop */}
      <div className="w-full max-w-[375px] md:max-w-4xl flex-1 flex flex-col md:px-4 relative">
        
        {/* Navigation Header */}
        <header className="sticky top-0 z-30 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 pt-safe px-4 pb-3 flex items-center justify-between">
          <Link 
            href="/" 
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 hover:text-white active:scale-90 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          
          <span className="text-xs font-bold font-mono tracking-widest text-zinc-500 uppercase">
            Galeria do Modelo
          </span>

          <button
            onClick={() => toggleFavorite(model.id)}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-300 hover:text-red-400 active:scale-90 transition-all cursor-pointer"
          >
            <Heart 
              className={`w-4 h-4 transition-all ${
                isFavorite(model.id) ? 'fill-red-500 text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]' : ''
              }`} 
            />
          </button>
        </header>

        {/* Premium Image Carousel Viewport */}
        <div className="w-full h-80 md:h-[450px] relative md:rounded-2xl overflow-hidden shadow-2xl bg-zinc-950/40 border border-white/5 flex items-center justify-center group/carousel">
          <Image
            src={images[activeImageIndex]}
            alt={`${model.nome} - Imagem ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover transition-all duration-500 fade-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-3 w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:scale-90 transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm z-20"
              aria-label="Imagem Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:scale-90 transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm z-20"
              aria-label="Próxima Imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Dots Indicator Overlay */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5 pointer-events-auto">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'bg-[#ff7f1a] w-4 shadow-sm shadow-orange-500/20' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ir para imagem ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Model Meta information */}
        <main className="flex-1 px-4 mt-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-950/80 border border-emerald-500/20 px-2 py-0.5 rounded">
                {model.categoria}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                {model.tamanhoDoArquivo}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                {model.downloads.toLocaleString('pt-BR')} downloads
              </span>
            </div>
            
            <h1 className="text-lg font-bold text-zinc-100 tracking-wide leading-tight">
              {model.nome}
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
              Descrição do Modelo
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              {model.descricao}
            </p>
          </div>

          {/* Print specs */}
          <div className="glass-card rounded-2xl p-4 grid grid-cols-2 gap-3 text-[10px] font-mono text-zinc-400">
            <div className="space-y-1">
              <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">Formato:</span>
              <span className="text-[#ff7f1a] font-semibold font-sans">
                Pacote ZIP Completo (.zip)
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">Conteúdo:</span>
              <span className="text-zinc-200 font-semibold font-sans">
                {model.totalArquivos || 1} arquivos inclusos
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">Material Recomendado:</span>
              <span className="text-zinc-200 font-semibold font-sans">PLA / Resina</span>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">Resolução:</span>
              <span className="text-zinc-200 font-semibold font-sans">0.12 - 0.20 mm</span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
              <Tag className="w-3 h-3" />
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {model.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[9px] text-zinc-400 bg-zinc-900 border border-white/5 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Models */}
          {relatedModels.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
                Modelos Relacionados
              </h2>
              
              <div className="no-scrollbar flex overflow-x-auto gap-3 -mx-4 px-4 py-1">
                {relatedModels.map((item) => (
                  <div key={item.id} className="w-[140px] flex-shrink-0">
                    <ModelCard
                      model={item}
                      isFavorite={isFavorite(item.id)}
                      onToggleFavorite={toggleFavorite}
                      isLoading={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Large Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-t border-white/5 p-4 flex flex-col items-center">
          <div className="w-full max-w-[343px] md:max-w-md flex flex-col gap-2">
            
            {downloadError && (
              <p className="text-[9px] text-red-400 font-semibold text-center leading-tight bg-red-950/20 border border-red-500/20 py-1.5 px-3 rounded-lg">
                {downloadError}
              </p>
            )}

            <button
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-[#ff7f1a] to-amber-600 text-zinc-950 hover:from-orange-400 hover:to-amber-500 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-orange-500/10"
            >
              <Download className="w-4 h-4 text-zinc-950" />
              {isDownloading 
                ? 'Gerando Pacote ZIP...' 
                : 'Baixar Pacote Completo (ZIP)'}
            </button>
            
            <p className="text-[8px] text-zinc-500 text-center uppercase tracking-widest font-mono">
              {isPremiumUser ? 'Acesso Premium Ativo' : 'Acesso Premium Necessário'}
            </p>
          </div>
        </div>

        {/* Premium Authentication Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-full max-w-[320px] bg-zinc-900 border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl relative">
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#ff7f1a]/10 border border-[#ff7f1a]/20 flex items-center justify-center text-[#ff7f1a] mx-auto">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-100 font-mono">
                  {model.stlUrl ? 'Desbloquear STL Premium' : 'Desbloquear Projeto 3MF Premium'}
                </h3>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Este é um arquivo {model.stlUrl ? 'STL' : '3MF'} premium. Insira o seu código de acesso de assinante para baixá-lo.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Código de Acesso (Ex: AETHER2026)"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full h-10 bg-zinc-950 border border-white/10 rounded-xl px-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#ff7f1a]"
                />
                
                {modalError && (
                  <p className="text-[9px] text-red-400 font-medium text-center">{modalError}</p>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setModalError('');
                    }}
                    className="flex-1 h-10 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-semibold hover:bg-zinc-700 transition-colors active:scale-95 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-[#ff7f1a] text-zinc-950 text-xs font-bold hover:bg-orange-400 transition-colors active:scale-95 cursor-pointer"
                  >
                    Desbloquear
                  </button>
                </div>
              </form>

              <div className="text-[8px] text-zinc-500 text-center font-mono pt-1">
                * Dica: Utilize o código <strong className="text-[#ff7f1a]">AETHER2026</strong>.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
