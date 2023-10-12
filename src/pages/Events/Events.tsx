import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { imgProps } from '../../types';
import { useFilters } from '../../components/Albums/useFilters';
import { RenderImages } from '../../components/Albums/RenderImages';
import { setAlbumCover } from '../../hooks/changeAlbumCover';
import { Context } from '../../context/Context';
import Notification from '../../components/Notification/Notification';
import { formatAlbumName } from '../../hooks/handleAlbumName';

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
  const { message, showNotification, user } = useContext(Context);


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
  const tittle = albumname ? formatAlbumName(albumname) : '';

  return (
    <main className='w-full'>
      <header className="flex-col self-stretch relative flex w-full max-md:max-w-full">
        <img
          loading="lazy"
          srcSet='https://firebasestorage.googleapis.com/v0/b/marazularts-51f63.appspot.com/o/eventos%2FPulsar_2023%2FCaptura%20de%20tela%20de%202023-10-12%2004-25-37.png?alt=media&token=a1f405a4-a8f5-4c33-aeb5-7f51dbe5e06f'
          className="absolute h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
        <div className="relative text-white text-3xl font-semibold uppercase self-stretch items-center w-full mt-32 pt-6 pb-2 px-5 max-md:max-w-full max-md:pl-2.5">
          {tittle}
        </div>
      </header>
      {user && user.uid === import.meta.env.VITE_REACT_APP_ADMIN_UID && (
        <div className='flex flex-col'>
          <span className="text-black text-base font-semibold mt-1 max-md:max-w-full">
            Bem-vindo administrador.
          </span>
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
        </div>
      )}
    <div className='mt-6 ml-6'>
  <span className='text-black text-base font-semibold'>
    Descrição sobre como achar o horário de quando as fotos foram tiradas.
  </span>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-1 w-full mt-6">
    <div className="flex flex-col md:flex-row">
      <div>
        <label htmlFor="filterDate" className="text-[#535353] font-open-sans mr-2">
          Dia:
        </label>
        <select
          id="filterDate"
          className="pl-1 pr-5 border border-gray-500 rounded py-2 text-gray-700 focus:outline-none mr-6"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        >
          <option value="">Selecione o dia</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filterTimeRange" className="text-[#535353] font-open-sans mr-2">
          Horário:
        </label>
        <select
          id="filterTimeRange"
          value={filterTimeRange}
          onChange={(e) => setFilterTimeRange(e.target.value)}
          className="pl-1 border border-gray-500 rounded py-2 text-gray-700 focus:outline-none"
        >
          <option value="">Filtrar por hora</option>
          {allTimeRanges.map((timeRange) => (
            <option key={timeRange} value={timeRange}>
              {timeRange}
            </option>
          ))}
        </select>
      </div>
      {/* <button className="ml-10 border-2 border-dotted bg-[#3FB8DE] hover:bg-[#45889e] rounded-lg px-3 py-1 shadow font-opens-sans" onClick={applyFilter}>Aplicar Filtro</button> */}
      {/* <button className="ml-10 border-2 border-dotted bg-red-400 hover:bg-red-500 rounded-lg px-3 py-1 shadow font-opens-sans" onClick={clearFilters}>Limpar Filtros</button> */}
    </div>
    <div className="flex flex-col justify-between justify-items-start flex-wrap  w-full mt-4 py-2 pr-4">
      <button className="border-2 border-dotted bg-[#3FB8DE] hover:bg-[#45889e] rounded-lg px-3 py-1 shadow font-opens-sans" onClick={applyFilter}>Aplicar Filtro</button>
      <button className="border-2 border-dotted bg-red-400 hover:bg-red-500 rounded-lg px-3 py-1 shadow font-opens-sans" onClick={clearFilters}>Limpar Filtros</button>
    </div>
  </div>
</div>
      {filteredAlbums.length === 0 && <p>Nenhuma imagem encontrado</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 justify-items-center mx-10">
        {filteredAlbums.map((album) => (
          <li key={album.nome} className="bg-white p-2 rounded shadow w-[22rem] md:w-96 relative group">
            <div className="relative">
              <div className="w-full h-60 relative">
                <img
                  src={album.url}
                  alt={album.nome}
                  className="w-full h-full object-cover rounded shadow group-hover:opacity-50 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
              </div>
              <span className="absolute bottom-0 left-0 right-0 p-2 font-bold text-center text-white group-hover:text-gray-300 font-open-sans">
                {album.nome}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {message && <Notification message={message} />}
    </main >
  );
}

export default Events;