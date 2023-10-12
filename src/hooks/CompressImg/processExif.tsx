import { ExifData } from "ts-exif-parser";
import { extractExifData } from "../extractExifData";
import { saveExifData } from "../saveExifData";

const uploadMetadados = async (files: File[], albumName: string): Promise<void> => {
  for (const file of files) {

    const exifData = await extractExifData(file) as ExifData;

    if (exifData && exifData.tags) {
      const imageDate = exifData.tags.DateTimeOriginal;
      const imageName = file.name
      saveExifData(imageDate, imageName, albumName);
    } else {
      console.log('Informações EXIF não encontradas na imagem:', file.name);
    }
  }
}

export default uploadMetadados;
