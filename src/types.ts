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

export type Album = {
  nome: string;
  url: string;
};

type ProviderData = {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
}

type StsTokenManager = {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export type UserFire = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}
