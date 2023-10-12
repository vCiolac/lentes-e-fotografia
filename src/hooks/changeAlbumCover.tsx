import { addDoc, collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../services/firebase';
import { AlbumData } from '../types';

async function setAlbumCover(albumName: string | undefined, coverUrl: string) {
  try {
    if (!albumName) return 'Erro ao definir/atualizar a capa do álbum.';
    
    const albumQuery = query(collection(database, 'albums'), where('name', '==', albumName));
    const albumQuerySnapshot = await getDocs(albumQuery);

    const promises = [];

    if (!albumQuerySnapshot.empty) {
      albumQuerySnapshot.forEach((docSnapshot) => {
        const albumDocRef = doc(database, 'albums', docSnapshot.id);
        promises.push(setDoc(albumDocRef, { coverUrl }, { merge: true }));
      });
    } else {
      const albumData: AlbumData = {
        name: albumName,
        coverUrl: coverUrl,
      };
      promises.push(addDoc(collection(database, 'albums'), albumData));
    }

    await Promise.all(promises);

    return 'Capa do álbum atualizada com sucesso.';
  } catch (error) {
    console.error('Erro ao definir/atualizar a capa do álbum:', error);
    return 'Erro ao definir/atualizar a capa do álbum.';
  }
}

export { setAlbumCover };
