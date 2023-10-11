import { ExifParserFactory } from "ts-exif-parser";

const extractExifData = async (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = (error) => {
      reject(error);
    };

    reader.onload = (e) => {
      if (e.target && e.target.result instanceof ArrayBuffer && e.target.result !== null) {
        const arrayBuffer = e.target.result;
        const exifParser = ExifParserFactory.create(arrayBuffer);

        try {
          const exifData = exifParser.parse();
          resolve(exifData);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error("Event target is null or not an ArrayBuffer"));
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

export { extractExifData };