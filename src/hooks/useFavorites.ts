'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load favorites from local storage on mount
    try {
      const stored = localStorage.getItem('aether_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        next = [...prev, id];
      }
      try {
        localStorage.setItem('aether_favorites', JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save favorites", e);
      }
      return next;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
    isLoaded
  };
}
