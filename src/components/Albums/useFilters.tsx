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
      filtered = filtered.filter((album) => {
        const time = album.exifData.horario;
        const [filterStart, filterEnd] = filterTimeRange.split('~');
        const [filterStartHour, filterStartMinute] = filterStart.split(':');
        const [filterEndHour, filterEndMinute] = filterEnd.split(':');
        const [hour, minute] = time.split(':');

        const filterStartTimeInSeconds = parseInt(filterStartHour) * 3600 + parseInt(filterStartMinute) * 60;
        const filterEndTimeInSeconds = parseInt(filterEndHour) * 3600 + parseInt(filterEndMinute) * 60;
        const timeInSeconds = parseInt(hour) * 3600 + parseInt(minute) * 60;

        return timeInSeconds >= filterStartTimeInSeconds && timeInSeconds < filterEndTimeInSeconds;
      });
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