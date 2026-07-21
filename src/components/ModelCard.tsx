'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Archive } from 'lucide-react';

export interface ModelData {
  id: string;
  slug: string;
  nome: string;
  pastaOriginal?: string;
  descricao: string;
  categoria: string;
  tags: string[];
  thumbnailUrl: string;
  imagens: string[];
  stlUrl?: string;
  downloadUrl?: string;
  totalArquivos?: number;
  qtdArquivos3D?: number;
  tamanhoDoArquivo: string;
  downloads: number;
  destaque: boolean;
  isDriveOnly?: boolean;
  driveUrl?: string;
}

interface ModelCardProps {
  model?: ModelData;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
  isLoading?: boolean;
}

export default function ModelCard({ model, isFavorite = false, onToggleFavorite, isLoading = false }: ModelCardProps) {
  if (isLoading || !model) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-[270px]">
        {/* Shimmer Image Area */}
        <div className="w-full h-36 shimmer" />
        {/* Shimmer Content Area */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-3 w-1/3 rounded shimmer" />
            <div className="h-4 w-5/6 rounded shimmer" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-3 w-1/4 rounded shimmer" />
            <div className="h-6 w-1/4 rounded-full shimmer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col hover:border-[#ff7f1a]/30 active:scale-[0.98] transition-all duration-300 group h-[270px] relative">
      {/* Detail Link Wrapper */}
      <Link href={`/model/${model.slug}`} className="absolute inset-0 z-10" />

      {/* Image Area */}
      <div className="w-full h-36 relative bg-zinc-900 overflow-hidden">
        <Image
          src={model.thumbnailUrl}
          alt={model.nome}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 loading-lazy"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <span className="absolute top-2 left-2 z-20 text-[9px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/20 px-2 py-0.5 rounded-full backdrop-blur-md">
          {model.categoria}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite && onToggleFavorite(model.id, e)}
          className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-zinc-950/70 border border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-red-400 active:scale-90 transition-all cursor-pointer group/fav"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorite
                ? 'fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]'
                : 'text-zinc-400 group-hover/fav:text-zinc-200'
            }`}
          />
        </button>

        {/* Highlight Star Indicator */}
        {model.destaque && (
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 text-[8px] text-amber-400 font-bold bg-amber-950/80 border border-amber-500/30 px-1.5 py-0.5 rounded">
            ★ DESTAQUE
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 border-t border-white/5">
        <div>
          <h3 className="text-xs font-semibold text-zinc-200 line-clamp-2 tracking-wide group-hover:text-[#ff7f1a] transition-colors leading-tight">
            {model.nome}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* File Size & Downloads */}
          <div className="flex flex-col gap-0.5 text-zinc-500 font-mono text-[9px]">
            <span className="flex items-center gap-1">
              <Archive className="w-3.5 h-3.5 text-[#ff7f1a]" />
              {model.tamanhoDoArquivo}
            </span>
            <span className="text-[8px] text-zinc-600">
              {model.downloads.toLocaleString('pt-BR')} downloads
            </span>
          </div>

          {/* ZIP Badge */}
          <span className="text-[9px] text-[#ff7f1a] font-bold bg-[#ff7f1a]/10 border border-[#ff7f1a]/30 px-2 py-0.5 rounded flex items-center gap-1">
            ZIP
          </span>
        </div>
      </div>
    </div>
  );
}
