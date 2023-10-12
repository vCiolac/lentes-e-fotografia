export type ExifData = {
  data: string;
  imageName: string;
  albumName: string;
  horario: string;
};

export type imgProps = {
  nome: string;
  fullPath: string;
  url: string;
  exifData: ExifData;
};

export type ErrorMessageProps = {
  message: string;
};

export interface AlbumData {
  name: string;
  coverUrl: string;
}
