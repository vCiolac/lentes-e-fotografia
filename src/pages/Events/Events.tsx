import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFilters } from '../../components/Albums/useFilters';
import { RenderImages } from '../../components/Albums/RenderImages';
import { setAlbumCover } from '../../hooks/changeAlbumCover';
import { Context } from '../../context/Context';
import Notification from '../../components/Notification/Notification';
import { formatAlbumName } from '../../hooks/handleAlbumName';
import { Album } from '../../types';
import LoadingSpinner from '../../components/Loading/Loading';
import GoogleIcon from '../../assets/google.svg';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../services/firebase';
import StarRating from '../../components/Rating/Rating';

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

  const allTimeRanges = albums
    .map((album) => album.exifData.horario)
    .filter((horario) => horario !== '')
    .sort();

  const tittle = albumname ? formatAlbumName(albumname) : '';
  const eventCover = () => {
    if (albumname) {
      if (albumCovers) {
        return albumCovers[albumname]
      }
    }
  };
  const headerImg = eventCover();

  const displayLoginName = () => {
    let text = "LOGIN";
    if (user) {
      if (Object.keys(user).length !== 0) {
        text = "MINHA CONTA";
        if (user.uid === import.meta.env.VITE_REACT_APP_ADMIN_UID) {
          text = "ADMINISTRADOR";
        }
      }
    }
    return text;
  };

  const handleFavoriteButton = async () => {
    if (selectedImages.length === 0) {
      showNotification('Nenhuma imagem selecionada!');
      return;
    }
    try {
      if (user) {
        const favoritesRef = collection(database, "favorites");
        await addDoc(favoritesRef, {
          userId: user.uid,
          images: selectedImages.map(image => image.url)
        });
        showNotification('Imagens favoritadas com sucesso!');
        setSelectedImages([]);
      }
    } catch (error) {
      console.error(error);
      showNotification('É preciso fazer login para salvar as imagens no favoritos.');
      setSelectedImages([]);
    }
  };

  return (
    <main className='w-full'>
      <header className="flex-col self-stretch relative flex w-full max-md:max-w-full">
        <Link to="/" >
          <img
            loading="lazy"
            srcSet={headerImg}
            className="absolute h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t rounded from-gray-900 via-transparent to-transparent" />
          <div className="relative text-white text-3xl font-semibold uppercase self-stretch items-center w-full mt-32 pt-6 pb-2 px-5 max-md:max-w-full max-md:pl-2.5">
            {tittle}
          </div>
        </Link>
      </header>
      {user && user.uid === import.meta.env.VITE_REACT_APP_ADMIN_UID && (
        <div className='flex flex-col'>
          <div className="flex justify-center m-2">
            <span className="text-black text-base font-semibold mt-1 max-md:max-w-full">
              Bem-vindo administrador.
            </span>
          </div>
          <button onClick={handleOpenCoverSelection}
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2">
            Trocar Capa do Álbum
          </button>
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
        <div className="flex flex-row flex-wrap content-center max-md:justify-center align-middle my-6 w-full">
          <div>
            <label htmlFor="filterDate" className="text-[#535353] font-open-sans block text-center">
              Dia:
            </label>
            <select
              id="filterDate"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2"
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
          <div className='ml-2'>
            <label htmlFor="filterTimeRange" className="text-[#535353] font-open-sans block text-center">
              Horário:
            </label>
            <select
              id="filterTimeRange"
              value={filterTimeRange}
              onChange={(e) => setFilterTimeRange(e.target.value)}
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2"
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
      </div>
      {selectedImages.length > 0 && (
        <div className="bg-gray-100 p-4 mb-4 flex justify-center">
          <button
            disabled={selectedImages.length === 0}
            onClick={() => handleFavoriteButton()}
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2 border-gray-400 border-2 ${selectedImages.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Favoritar {selectedImages.length} imagem(ns) selecionada(s).
          </button>
        </div>
      )}
      {filteredAlbums.length === 0 && <LoadingSpinner msg='Carregando imagens...' />}
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
            {user && <StarRating imageId={album.nome} />}
          </li>
        ))}
      </ul>
      {message && <Notification message={message} />}
      <footer className={`bg-[#333E42]  ${filteredAlbums.length === 0 ? 'absolute' : 'relative'} h-8 w-full bottom-0 flex items-center justify-center text-white`}>
        <div className="flex items-center justify-center space-x-6">
          <span className="text-xs">COPYRIGHT © 2024 Victor Ciolac. TODOS OS DIREITOS RESERVADOS.</span>
          <span className="text-xs">|</span>
          <Link to="/login" className="flex items-center text-xs">
            <img src={GoogleIcon} alt="Google Icon" width="20" className="mr-2" />
            {displayLoginName()}
          </Link>
        </div>
      </footer>
    </main >
  );
}

export default Events;