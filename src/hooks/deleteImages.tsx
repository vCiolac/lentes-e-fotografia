import { ref, deleteObject } from 'firebase/storage';
import { database, storage } from '../services/firebase';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  DocumentData,
  DocumentReference
} from 'firebase/firestore';

const deleteImageFromStorage = async (albumName: string, imageName: string) => {
  const storagePath = `eventos/${albumName}/${imageName}`;
  const storageRef = ref(storage, storagePath);

  try {
    await deleteObject(storageRef);
    console.log('Imagem excluída com sucesso:', storagePath);
  } catch (error) {
    console.error('Erro ao excluir imagem:', error);
  }
};


const deleteExifData = async (imageName: string) => {
  const exifCollection = collection(database, 'exif_data');
  const querySnapshot = await getDocs(query(exifCollection, where('imageName', '==', imageName)));

  querySnapshot.forEach((doc: DocumentData) => {
    const docRef = doc as DocumentReference;
    deleteDoc(docRef).then(() => {
      console.log(`Documento Exif com a imagem ${imageName} foi excluído com sucesso.`);
    }).catch((error) => {
      console.error(`Erro ao excluir o documento Exif: ${error}`);
    });
  });
};

export { deleteImageFromStorage, deleteExifData };
