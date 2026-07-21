'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Download, ChevronRight, ChevronLeft, X, Box, Zap } from 'lucide-react';
import { printableBasesData, PrintableBase } from '@/data/basesData';
import confetti from 'canvas-confetti';

interface BasesSectionProps {
  isLoggedIn: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export default function BasesSection({ isLoggedIn, setShowLoginModal }: BasesSectionProps) {
  const [activeBaseModal, setActiveBaseModal] = useState<PrintableBase | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
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

  const handleDownloadBase = async (base: PrintableBase, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setDownloadingId(base.id);

    try {
      // Fetch signed URL
      const signRes = await fetch(`/api/download/${base.id}/sign`, {
        headers: {
          'Authorization': 'Bearer AETHER_PRO_KEY'
        }
      });

      if (!signRes.ok) {
        throw new Error('Falha na autorização de download.');
      }

      const signData = await signRes.json();

      // Download file blob
      const fileRes = await fetch(signData.downloadUrl);
      if (!fileRes.ok) {
        throw new Error('Erro ao baixar arquivo da base.');
      }

      const blob = await fileRes.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const cleanFileName = `${base.nome}.zip`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', cleanFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);

      // Confetti celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.85 },
        colors: ['#3b82f6', '#10b981', '#ffffff']
      });

    } catch (err: any) {
      console.error(err);
    } finally {
      setDownloadingId(null);
    }
  };

  const getSocketBadge = (socketType: string) => {
    switch (socketType) {
      case 'E14':
        return 'text-purple-300 bg-purple-950/90 border-purple-500/40';
      case 'LED':
        return 'text-emerald-300 bg-emerald-950/90 border-emerald-500/40';
      case 'E26/E27':
        return 'text-amber-300 bg-amber-950/90 border-amber-500/40';
      default:
        return 'text-cyan-300 bg-cyan-950/90 border-cyan-500/40';
    }
  };

  return (
    <div className="w-full mb-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Section Title with Carousel Navigation Buttons */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Box className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
            Bases Imprimíveis (E27 / E14 / LED)
          </h2>
          <span className="text-[9px] text-zinc-500 font-mono hidden sm:inline">
            ({printableBasesData.length} projetos)
          </span>
        </div>

        {/* Scroll Nav Buttons */}
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
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex overflow-x-auto gap-3 -mx-4 px-4 py-1 scroll-smooth"
      >
        {printableBasesData.map((base) => (
          <div
            key={base.id}
            onClick={() => {
              setActiveBaseModal(base);
              setActiveImageIndex(0);
            }}
            className="w-[220px] md:w-[240px] flex-shrink-0 glass-card rounded-2xl overflow-hidden flex flex-col border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer shadow-lg relative h-[290px]"
          >
            {/* Image Thumbnail */}
            <div className="relative w-full h-36 bg-zinc-950 overflow-hidden flex-shrink-0">
              <Image
                src={base.thumbnailUrl}
                alt={base.nome}
                fill
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <span className={`absolute top-2 left-2 text-[8px] font-extrabold uppercase tracking-wider border px-2 py-0.5 rounded backdrop-blur-md ${getSocketBadge(base.socketType)}`}>
                {base.socketType === 'LED' ? '⚡ MÓDULO LED' : `SOQUETE ${base.socketType}`}
              </span>
            </div>

            {/* Base Details */}
            <div className="p-3 flex-1 flex flex-col justify-between space-y-2 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                  {base.nome}
                </h3>
                <p className="text-[9px] text-zinc-500 font-mono">
                  {base.tamanhoDoArquivo} • {base.qtdArquivos3D} STL
                </p>
              </div>

              <button
                onClick={(e) => handleDownloadBase(base, e)}
                disabled={downloadingId === base.id}
                className="w-full h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 hover:from-cyan-400 hover:to-blue-500 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10 active:scale-95 transition-all cursor-pointer mt-auto"
              >
                <Download className="w-3.5 h-3.5 text-zinc-950" />
                {downloadingId === base.id ? 'Baixando...' : 'Baixar Base (.ZIP)'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail for Base */}
      {activeBaseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg bg-zinc-900 border border-cyan-500/40 rounded-2xl p-5 space-y-4 max-h-[90vh] flex flex-col shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Box className="w-5 h-5" />
                <h3 className="text-sm font-bold text-zinc-100">{activeBaseModal.nome}</h3>
              </div>
              <button
                onClick={() => setActiveBaseModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Image Display */}
            <div className="relative w-full h-56 bg-zinc-950 rounded-xl overflow-hidden border border-white/5">
              <Image
                src={activeBaseModal.imagens[activeImageIndex]}
                alt={`${activeBaseModal.nome} imagem ${activeImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Selectors */}
            {activeBaseModal.imagens.length > 1 && (
              <div className="flex gap-2 justify-center overflow-x-auto py-1">
                {activeBaseModal.imagens.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-lg relative overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-cyan-400 scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeBaseModal.descricao}
            </p>

            <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 text-[10px] font-mono space-y-1 text-zinc-400">
              <div className="flex justify-between">
                <span>Tipo de Encaixe:</span>
                <span className="text-cyan-300 font-semibold">{activeBaseModal.socketType}</span>
              </div>
              <div className="flex justify-between">
                <span>Compatibilidade:</span>
                <span className="text-zinc-200">{activeBaseModal.compatibilidade}</span>
              </div>
              <div className="flex justify-between">
                <span>Tamanho do Pacote:</span>
                <span className="text-zinc-200">{activeBaseModal.tamanhoDoArquivo}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={(e) => handleDownloadBase(activeBaseModal, e)}
                disabled={downloadingId === activeBaseModal.id}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-zinc-950" />
                {downloadingId === activeBaseModal.id ? 'Baixando...' : 'Baixar Base Completa (.ZIP)'}
              </button>
              <button
                onClick={() => setActiveBaseModal(null)}
                className="px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
