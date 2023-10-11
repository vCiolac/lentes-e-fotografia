import { ref, uploadBytes } from "firebase/storage";
import { ExifData } from "ts-exif-parser";
import { extractExifData } from "../../hooks/extractExifData";
import { saveExifData } from "../../hooks/saveExifData";
import { storage } from "../../services/firebase";

const uploadImagesWithMetadata = async (files: File[], albumName: string): Promise<void> => {
  for (const file of files) {
    const storagePath = `eventos/${albumName}/${file.name}`;
    const storageRef = ref(storage, storagePath);

    try {
      // Processar informações EXIF
      const exifData = await extractExifData(file) as ExifData;

      if (exifData && exifData.tags) {
        const imageDate = exifData.tags.DateTimeOriginal;
        const imageName = file.name
        saveExifData(imageDate, imageName, albumName);
      } else {
        console.log('Informações EXIF não encontradas na imagem:', file.name);
      }

      // Fazer upload da imagem para o Firebase Storage
      await uploadBytes(storageRef, file);
      console.log('Imagem enviada com sucesso para', storagePath);
    } catch (error) {
      console.error('Erro ao processar informações EXIF para a imagem', file.name, error);
    }
  }
};

export default uploadImagesWithMetadata;
