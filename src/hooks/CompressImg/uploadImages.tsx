import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";

const uploadImages = async (compressedFiles: File[], albumName: string): Promise<void> => {
  for (const file of compressedFiles) {
    const storagePath = `eventos/${albumName}/${file.name}`;
    const storageRef = ref(storage, storagePath);

    try {
      await uploadBytes(storageRef, file);
      console.log('Imagem enviada com sucesso para', storagePath);
    } catch (error) {
      console.error('Erro ao enviar imagem para o Firebase Storage:', error);
    }
  }
};

export default uploadImages;
