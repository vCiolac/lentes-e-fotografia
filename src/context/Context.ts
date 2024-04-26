import { createContext } from 'react';
import { User } from 'firebase/auth';
import { UserFire } from '../types';


export type ContextType = {
  user: UserFire | User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  message: string;
  showNotification: React.Dispatch<React.SetStateAction<string>>;
  albumCovers: Record<string, string>;
  setAlbumCovers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const Context = createContext({} as ContextType);