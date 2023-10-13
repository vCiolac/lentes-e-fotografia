import { useContext, useEffect, useState } from 'react';
import { database, storage } from '../services/firebase';
import { ref, listAll } from 'firebase/storage'; 
import { collection, getDocs, query } from 'firebase/firestore';
import { Context } from '../context/Context';

const albumsData = async () => {
  const albumsRef = ref(storage, 'eventos');
  const albumsQuery = query(collection(database, 'albums'));

  try {
    const albums = await listAll(albumsRef);
    const albumNames = albums.prefixes.map((album) => album.name);
    // Busque as URLs das capas no Firestore
    const albumCovers: Record<string, string> = {};
    const albumSnapshot = await getDocs(albumsQuery);
    albumSnapshot.forEach((albumDoc) => {
      const albumData = albumDoc.data();
      albumCovers[albumData.name] = albumData.coverUrl;
    });
    
    return  { albumNames, albumCovers };
  } catch (error) {
    console.error('Erro ao buscar álbuns no Firebase Storage:', error);
    throw error;
  }
};

const FetchAlbums = () => {
  const [albums, setAlbums] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { setAlbumCovers } = useContext(Context);

  useEffect(() => {
    async function loadAlbums() {
      try {
        const { albumNames, albumCovers } = await albumsData();
        setAlbums(albumNames);
        setAlbumCovers(albumCovers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadAlbums();
  }, []);

  return { albums, loading };
};

export default FetchAlbums;
