import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { imgProps } from '../../types';
import { useFilters } from '../../components/Albums/useFilters';
import { RenderImages } from '../../components/Albums/RenderImages';
import { setAlbumCover } from '../../hooks/changeAlbumCover';
import { Context } from '../../context/Context';
import Notification from '../../components/Notification/Notification';

function Events() {
  const { albumname } = useParams();
  const { albums } = RenderImages(albumname);
  const {
    filterDate,
    setFilterDate,
    filterTimeRange,
    setFilterTimeRange,
    filteredAlbums,
    applyFilter,
    clearFilters
  } = useFilters(albums);
  const [isCoverSelectionOpen, setIsCoverSelectionOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState<string>('');
  const { message, showNotification } = useContext(Context);

  const handleOpenCoverSelection = () => {
    setIsCoverSelectionOpen(true);
  };

  const handleCoverSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCover(e.target.value);
  };  

  const handleSaveCover = async () => {
    if (selectedCover !== '') {
      const message = await setAlbumCover(albumname, selectedCover);
      setIsCoverSelectionOpen(false); 
      showNotification(message);
    }
  };
  
  const uniqueDates = Array.from(new Set(albums
    .map((album) => album.exifData.data)
    .filter((date) => date !== '')
  ));

  function generateTimeRanges() {
    const timeRanges = [];
    for (let hour = 0; hour < 24; hour++) {
      const startHour = `${hour.toString().padStart(2, '0')}:00:00`;
      const endHour = `${(hour + 1).toString().padStart(2, '0')}:00:00`;
      timeRanges.push(`${startHour}~${endHour}`);
    }
    return timeRanges;
  }

  const allTimeRanges = generateTimeRanges();

  return (
    <div>
      <h1>Álbuns</h1>
      <button onClick={handleOpenCoverSelection}>Trocar Capa do Álbum</button>
      {isCoverSelectionOpen && (
        <div>
          <select value={selectedCover} onChange={handleCoverSelection}>
            <option value="">Escolha uma capa</option>
            {albums.map((album) => (
              <option key={album.nome} value={album.url}>
                {album.nome}
              </option>
            ))}
          </select>
          <button onClick={handleSaveCover}>Salvar Capa</button>
        </div>
      )}

      <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
        <option value="">Selecione o dia</option>
        {uniqueDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <select
        value={filterTimeRange}
        onChange={(e) => setFilterTimeRange(e.target.value)}
      >
        <option value="">Filtrar por hora</option>
        {allTimeRanges.map((timeRange) => (
          <option key={timeRange} value={timeRange}>
            {timeRange}
          </option>
        ))}
      </select>
      <button onClick={applyFilter}>Aplicar Filtro</button>
      <button onClick={clearFilters}>Limpar Filtros</button>
      {filteredAlbums.length === 0 && <p>Nenhuma imagem encontrado</p>}
      <ul>
        {filteredAlbums.map((album: imgProps) => (
          <li key={album.nome}>
            <img height={'320px'} src={album.url} alt={album.nome} />
            {album.exifData && (
              <ul>
                <p>{album.exifData.data}</p>
                <p>{album.exifData.horario}</p>
              </ul>
            )}
          </li>
        ))}
      </ul>
      {message && <Notification message={message} />}
    </div>
  );
}

export default Events;