import { useEffect, useState } from 'react';
import { storage } from '../services/firebase';
import { ref, listAll } from 'firebase/storage'; 

const albumsData = async () => {
  const albumsRef = ref(storage, 'eventos');

  try {
    const albums = await listAll(albumsRef);
    return albums.prefixes.map((album) => album.name);
  } catch (error) {
    console.error('Erro ao buscar álbuns no Firebase Storage:', error);
    throw error;
  }
};

const FetchAlbums = () => {
  const [albums, setAlbums] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlbums() {
      try {
        const albumList = await albumsData();
        setAlbums(albumList);
        setLoading(false);
      } catch (error) {
        // Lidar com erros aqui
        setLoading(false);
      }
    }

    loadAlbums();
  }, []);

  return { albums, loading };
};

export default FetchAlbums;
