import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilters } from '../../components/Albums/useFilters';
import { RenderImages } from '../../components/Albums/RenderImages';
import { setAlbumCover } from '../../hooks/changeAlbumCover';
import { Context } from '../../context/Context';
import Notification from '../../components/Notification/Notification';
import { formatAlbumName } from '../../hooks/handleAlbumName';
import Footer from '../../components/Footer/Footer';
import { Album } from '../../types';

function Events() {
  const { albumname } = useParams();
  const { albums } = RenderImages(albumname);
  const {
    filterDate,
    setFilterDate,
    filterTimeRange,
    setFilterTimeRange,
    filteredAlbums,
  } = useFilters(albums);
  const [isCoverSelectionOpen, setIsCoverSelectionOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState<string>('');
  const { message, showNotification, user, albumCovers } = useContext(Context);
  const [selectedImages, setSelectedImages] = useState<Album[]>([]);

  const handleImageClick = (album: Album) => {
    const isImageSelected = selectedImages.includes(album);

    if (isImageSelected) {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== album));
    } else {
      setSelectedImages([...selectedImages, album]);
    }
  };

  console.log(albumCovers)

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
  const eventCover = () => {
    if (albumname) {
      if (albumCovers) {
        return albumCovers[albumname]
      }
    }
  }
  const headerImg = eventCover();

    return (
      <main className='w-full'>
        <header className="flex-col self-stretch relative flex w-full max-md:max-w-full">
          <img
            loading="lazy"
            srcSet={headerImg}
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
          <div className="flex flex-row flex-wrap content-center max-md:justify-center align-middle my-6 w-full">
            <div>
              <label htmlFor="filterDate" className="text-[#535353] font-open-sans mr-2">
                Dia:
              </label>
              <select
                id="filterDate"
                className="md:pl-1 md:pr-5 border border-gray-500 rounded py-1 text-gray-700 focus:outline-none md:mr-6"
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
                className="pl-1 border border-gray-500 rounded py-1 text-gray-700 focus:outline-none mt-2 md:mt-0"
              >
                <option value="">Filtrar por hora</option>
                {allTimeRanges.map((timeRange) => (
                  <option key={timeRange} value={timeRange}>
                    {timeRange}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:relative md:right-36 md:flex-row md:space-x-6 md:ml-1 mt-3 md:mt-0 justify-between md:justify-start flex-wrap pt-2 md:pt-0 pr-4">
            {/* <button className="bg-[#3FB8DE] hover:bg-[#45889e] rounded-lg px-3 py-1 shadow font-opens-sans" onClick={applyFilter}>Aplicar Filtro</button> */}
            {/* <button className="bg-red-400 hover:bg-red-500 rounded-lg px-3 py-1 shadow font-opens-sans" onClick={clearFilters}>Limpar Filtros</button> */}
          </div>
        </div>
        {filteredAlbums.length === 0 && <p>Nenhuma imagem encontrado</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 justify-items-center mx-10">
          {filteredAlbums.map((album) => (
            <li key={album.nome} className="bg-white p-2 rounded shadow w-full relative group">
              <div onClick={() => handleImageClick(album)} className="relative">
                <div className="w-full h-80 relative">
                  <img
                    src={album.url}
                    alt={album.nome}
                    className={`w-full h-full object-cover rounded shadow group-hover:opacity-80 transition duration-500 ease-in-out ${selectedImages.includes(album) ? 'border-[0.5rem] border-solid border-[#3Fb8dE]' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
                </div>
                <span className="absolute bottom-0 left-0 right-0 p-2 font-bold text-center text-white group-active:text-red-300 font-open-sans">
                  {album.exifData.data}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {message && <Notification message={message} />}
        <Footer />
      </main >
    );
  }

  export default Events;