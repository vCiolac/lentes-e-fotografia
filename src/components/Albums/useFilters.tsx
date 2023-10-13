import { useState, useEffect, useCallback } from 'react';
import { imgProps } from '../../types';

export function useFilters(albums: imgProps[]) {
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterTimeRange, setFilterTimeRange] = useState<string>('');
  const [filteredAlbums, setFilteredAlbums] = useState<imgProps[]>([]);

  const applyFilter = useCallback(() => {
    let filtered = albums;

    // Filtrar por data
    if (filterDate) {
      filtered = filtered.filter((album) => album.exifData.data === filterDate);
    }

    // Filtrar por faixa de horário
    if (filterTimeRange) {
      filtered = filtered.filter((album) => album.exifData.horario === filterTimeRange);
    }
    
    setFilteredAlbums(filtered);
  }, [albums, filterDate, filterTimeRange]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const clearFilters = () => {
    setFilterDate('');
    setFilterTimeRange('');
    setFilteredAlbums(albums);
  };

  return {
    filterDate,
    setFilterDate,
    filterTimeRange,
    setFilterTimeRange,
    filteredAlbums,
    applyFilter,
    clearFilters,
  };
}