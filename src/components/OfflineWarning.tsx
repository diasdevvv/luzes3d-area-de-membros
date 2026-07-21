'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, X } from 'lucide-react';

export default function OfflineWarning() {
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Initial state check
    setIsOffline(!navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-[343px] mx-auto bg-zinc-900/95 border border-red-500/30 rounded-xl p-3 flex items-center justify-between shadow-2xl backdrop-blur-md animate-[fadeIn_0.3s_ease-out] text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
          <WifiOff className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-red-400">Modo Offline</h4>
          <p className="text-[10px] text-zinc-400">
            Você está desconectado. Visualizações 3D indisponíveis.
          </p>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer"
        aria-label="Dismiss offline alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
