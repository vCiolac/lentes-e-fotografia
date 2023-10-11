import { useState, useEffect } from 'react';
import { fetchImagesByAlbum } from '../../hooks/fetchImagesByAlbum';
import { imgProps } from '../../types';

export function useAlbums(albumname: string | undefined) {
  const [albums, setAlbums] = useState<imgProps[]>([]);

  useEffect(() => {
    if (albumname === undefined) return;
    async function loadAlbums() {
      const fetchedAlbums = await fetchImagesByAlbum(albumname);
      const formattedImages = fetchedAlbums.map((album) => ({
        nome: album.nome,
        fullPath: album.fullPath,
        url: album.url,
        exifData: {
          data: album.exifData.data || '',
          imageName: album.exifData.imageName || '',
          albumName: album.exifData.albumName || '',
          horario: album.exifData.horario || '',
        },
      }));
      setAlbums(formattedImages);
    }
    loadAlbums();
  }, [albumname]);

  return { albums, setAlbums };
}
