import { collection, getDocs, query, where } from 'firebase/firestore';
import { database, storage } from '../services/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ExifData } from '../types';

export async function fetchImagesByAlbum(albumId: string | undefined) {
  if (!albumId) {
    return [];
  }
  const path = `eventos/${albumId}`;
  const festivalRef = ref(storage, path);

  try {
    const result = await listAll(festivalRef);
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const nome = itemRef.name;
        const fullPath = itemRef.fullPath;
        const url = await getDownloadURL(itemRef);
        // Consulta ao Firestore para recuperar os dados exif
        const firestoreQuery = query(
          collection(database, 'exif_data'),
          where('imageName', '==', nome)
        );
        const exifSnapshot = await getDocs(firestoreQuery);

        let exifData = {
          data: '',
          imageName: '',
          albumName: '',
          horario: '',
        } as ExifData;
        exifSnapshot.forEach((doc) => {
          exifData = doc.data() as ExifData;
        });

        return { nome, fullPath, url, exifData };
      })
    );
    return files;
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    return [];
  }
}
